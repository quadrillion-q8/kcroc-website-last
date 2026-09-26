// File: app/frontend/scripts/validation/validateGraph.ts
//
// Knowledge Graph structural validator.
// ----------------------------------------------------------------------------
// Runs cross-entity integrity checks over KCROC_GRAPH (the compiled,
// cross-referenced graph — see src/data/graph.ts) using the severities and
// required-field rules declared in validation.config.ts. Invoked by the
// scripts/validateGraph.ts build-time wrapper, which expects this module's
// `validateGraph()` export to resolve to `{ passed, errors, warnings }`.
//
// This complements scripts/validate-build.ts (Zod schema + duplicate
// canonical-URL checks) with checks that need the *compiled* graph:
// cross-entity relational links, duplicate ids/slugs, and required-field
// coverage.

import { KCROC_GRAPH } from '../../src/data/graph';
import { validationConfig } from './validation.config';
import { SeverityLevel, ValidationError } from './types';

interface GraphValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

type AnyEntity = Record<string, any> & { id: string; entityType: string };

/** Every relational field that points at other entity ids by their id string. */
const RELATIONAL_ID_FIELDS = [
  'relatedServiceIds',
  'relatedProblemIds',
  'relatedBrandIds',
  'relatedLocationIds',
  'relatedCaseStudyIds',
] as const;

function severityFor(code: string, fallback: SeverityLevel): SeverityLevel {
  return validationConfig.severityOverrides[code] ?? fallback;
}

function formatIssue(issue: ValidationError): string {
  const field = issue.field ? ` [${issue.field}]` : '';
  return `${issue.entityId}${field}: ${issue.message}`;
}

/**
 * Resolves a required-field name from validation.config.ts against the
 * actual entity shape. Some config field names predate a schema rename
 * (e.g. `name` -> `title`, flat `lat`/`lng` -> `coords.lat`/`coords.lng`,
 * top-level `schemaTypes` -> `seo.schemaTypes`) — this keeps those checks
 * meaningful instead of failing every entity on a stale field name.
 */
function resolveField(entity: AnyEntity, field: string): unknown {
  if (entity[field] !== undefined) return entity[field];
  switch (field) {
    case 'name':
      return entity.title;
    case 'lat':
      return entity.coords?.lat;
    case 'lng':
      return entity.coords?.lng;
    case 'schemaTypes':
      return entity.seo?.schemaTypes;
    default:
      return undefined;
  }
}

function checkDuplicateIds(entities: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  const seen = new Set<string>();
  for (const entity of entities) {
    // The graph is keyed by id, so a literal key collision can't reach this
    // list — this instead catches an entity whose own `id` field was typed
    // differently from the key it's registered under.
    if (seen.has(entity.id)) {
      issues.push({
        entityId: entity.id,
        message: `Duplicate entity id "${entity.id}".`,
        severity: severityFor('DUPLICATE_ID', 'CRITICAL'),
      });
    } else {
      seen.add(entity.id);
    }
  }
  return issues;
}

function checkDuplicateSlugs(routableEntities: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  const seenByType = new Map<string, Map<string, string>>();
  for (const entity of routableEntities) {
    if (typeof entity.slug !== 'string') continue;
    const bucket = seenByType.get(entity.entityType) ?? new Map<string, string>();
    const existingId = bucket.get(entity.slug);
    if (existingId) {
      issues.push({
        entityId: entity.id,
        field: 'slug',
        message: `Duplicate slug "${entity.slug}" also used by [${existingId}] (both ${entity.entityType}).`,
        severity: severityFor('DUPLICATE_SLUG', 'CRITICAL'),
      });
    } else {
      bucket.set(entity.slug, entity.id);
    }
    seenByType.set(entity.entityType, bucket);
  }
  return issues;
}

function checkDuplicateCanonicals(routableEntities: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  const seen = new Map<string, string>();
  for (const entity of routableEntities) {
    const url = entity.seo?.canonicalUrl;
    if (!url) continue;
    const existingId = seen.get(url);
    if (existingId) {
      issues.push({
        entityId: entity.id,
        field: 'seo.canonicalUrl',
        message: `Duplicate canonical URL "${url}" also used by [${existingId}].`,
        severity: severityFor('DUPLICATE_CANONICAL', 'CRITICAL'),
      });
    } else {
      seen.set(url, entity.id);
    }
  }
  return issues;
}

function checkRequiredFields(entitiesByType: Map<string, AnyEntity[]>): ValidationError[] {
  const issues: ValidationError[] = [];

  for (const [entityType, fields] of Object.entries(validationConfig.requiredFieldsByType)) {
    const entities = entitiesByType.get(entityType) ?? [];
    if (entities.length === 0) continue; // no entities of this type in the current graph

    for (const field of fields) {
      const missing = entities.filter((entity) => resolveField(entity, field) === undefined);
      if (missing.length === 0) continue;

      if (missing.length === entities.length) {
        // Every entity of this type lacks the field — most likely the config
        // references a field name the schema no longer has, rather than
        // every entity being broken. Surfaced as a warning so it gets
        // cleaned up without blocking deploys on a config/schema drift.
        issues.push({
          entityId: `<all ${entityType}>`,
          field,
          message: `No "${entityType}" entity resolves field "${field}" — check validation.config.ts against the current schema.`,
          severity: 'WARNING',
        });
        continue;
      }

      for (const entity of missing) {
        issues.push({
          entityId: entity.id,
          field,
          message: `Missing required field "${field}" for entity type "${entityType}".`,
          severity: severityFor('MISSING_REQUIRED_FIELD', 'ERROR'),
        });
      }
    }
  }

  return issues;
}

function checkBrokenRelationalLinks(
  entitiesById: Record<string, AnyEntity>,
  entities: AnyEntity[]
): ValidationError[] {
  const issues: ValidationError[] = [];
  for (const entity of entities) {
    for (const field of RELATIONAL_ID_FIELDS) {
      const ids = entity[field];
      if (!Array.isArray(ids)) continue;
      for (const targetId of ids) {
        if (typeof targetId !== 'string') continue;
        if (!entitiesById[targetId]) {
          issues.push({
            entityId: entity.id,
            field,
            message: `Broken relational link: "${targetId}" (via ${field}) does not exist in the graph.`,
            severity: severityFor('BROKEN_RELATIONAL_LINK', 'ERROR'),
          });
        }
      }
    }
  }
  return issues;
}

function checkMissingFaqs(services: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  for (const service of services) {
    const faqs = service.faqs;
    if (!Array.isArray(faqs) || faqs.length === 0) {
      issues.push({
        entityId: service.id,
        field: 'faqs',
        message: `Service "${service.title}" has no FAQs.`,
        severity: severityFor('MISSING_FAQ', 'WARNING'),
      });
    }
  }
  return issues;
}

// Generous bounding box around Kuwait — wide enough for every real service
// area while still catching a swapped lat/lng, a stray 0,0, or a typo.
const KUWAIT_LAT_RANGE: [number, number] = [28.5, 30.1];
const KUWAIT_LNG_RANGE: [number, number] = [46.5, 48.6];

function checkCoordinates(locations: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  for (const location of locations) {
    const coords = location.coords;
    if (!coords) continue; // coords are optional on service-area Location pages

    const { lat, lng } = coords;
    const inRange =
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      lat >= KUWAIT_LAT_RANGE[0] && lat <= KUWAIT_LAT_RANGE[1] &&
      lng >= KUWAIT_LNG_RANGE[0] && lng <= KUWAIT_LNG_RANGE[1];

    if (!inRange) {
      issues.push({
        entityId: location.id,
        field: 'coords',
        message: `Coordinates (${lat}, ${lng}) fall outside the expected Kuwait bounding box.`,
        severity: severityFor('INVALID_COORDINATES', 'CRITICAL'),
      });
    }
  }
  return issues;
}

function checkKeywordCoverage(problems: AnyEntity[]): ValidationError[] {
  const issues: ValidationError[] = [];
  const min = validationConfig.minKeywordCount;
  for (const problem of problems) {
    const total =
      (problem.primaryKeyword ? 1 : 0) +
      (Array.isArray(problem.secondaryKeywords) ? problem.secondaryKeywords.length : 0);
    if (total < min) {
      issues.push({
        entityId: problem.id,
        field: 'secondaryKeywords',
        message: `Only ${total} target keyword(s) defined; minimum is ${min}.`,
        severity: 'WARNING',
      });
    }
  }
  return issues;
}

export async function validateGraph(): Promise<GraphValidationResult> {
  const entitiesById = KCROC_GRAPH.entities as Record<string, AnyEntity>;
  const allEntities = Object.values(entitiesById);
  const routableEntities = KCROC_GRAPH.routableEntities as unknown as AnyEntity[];

  const entitiesByType = new Map<string, AnyEntity[]>();
  for (const entity of allEntities) {
    const bucket = entitiesByType.get(entity.entityType) ?? [];
    bucket.push(entity);
    entitiesByType.set(entity.entityType, bucket);
  }

  const issues: ValidationError[] = [
    ...checkDuplicateIds(allEntities),
    ...checkDuplicateSlugs(routableEntities),
    ...checkDuplicateCanonicals(routableEntities),
    ...checkRequiredFields(entitiesByType),
    ...checkBrokenRelationalLinks(entitiesById, allEntities),
    ...checkMissingFaqs(KCROC_GRAPH.services as unknown as AnyEntity[]),
    ...checkCoordinates(KCROC_GRAPH.locations as unknown as AnyEntity[]),
    ...checkKeywordCoverage(KCROC_GRAPH.problems as unknown as AnyEntity[]),
  ];

  const errors = issues
    .filter((issue) => issue.severity === 'ERROR' || issue.severity === 'CRITICAL')
    .map(formatIssue);
  const warnings = issues
    .filter((issue) => issue.severity === 'WARNING' || issue.severity === 'INFO')
    .map(formatIssue);

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}
