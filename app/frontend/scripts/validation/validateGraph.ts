// File: scripts/validation/validateGraph.ts
import { ValidationReport, ValidationError, SeverityLevel } from './types';
import { validationConfig } from './validation.config';

// ⚠️ Imports from your actual project schema and master graph
import { KCROC_GRAPH } from '../../app/frontend/src/knowledge/graph';
import { KCROCEntity, Relationship } from '../../app/frontend/src/types/graph';

export async function validateGraph(): Promise<ValidationReport> {
  const issues: ValidationError[] = [];
  let totalChecks = 0;
  let failedChecks = 0;

  const entities: KCROCEntity[] = KCROC_GRAPH.entities;
  
  const idSet = new Set<string>();
  const slugSet = new Set<string>();
  const canonicalSet = new Set<string>();

  // Helper to log errors & track metrics dynamically
  const addIssue = (entityId: string, ruleKey: string, message: string, field?: string) => {
    const severity = validationConfig.severityOverrides[ruleKey] || 'WARNING';
    issues.push({ entityId, field, message, severity });
    if (severity === 'ERROR' || severity === 'CRITICAL') {
      failedChecks++;
    }
  };

  entities.forEach((entity: KCROCEntity) => {
    const type = entity.entityType;
    totalChecks++;

    // 1. Validate Entity Type Extensibility
    if (!validationConfig.allowedEntityTypes.includes(type)) {
      addIssue(entity.id, 'INVALID_ENTITY_TYPE', `Unknown entity type: "${type}"`);
    }

    // 2. Config-Driven Required Fields Verification
    const requiredFields = validationConfig.requiredFieldsByType[type] || ['id', 'name'];
    requiredFields.forEach(field => {
      totalChecks++;
      if (!Reflect.get(entity, field)) {
        addIssue(entity.id, 'MISSING_REQUIRED_FIELD', `Missing structural field: "${field}"`, field);
      }
    });

    // 3. Uniqueness Enforcement (IDs, Slugs, Canonicals)
    totalChecks += 3;
    if (idSet.has(entity.id)) addIssue(entity.id, 'DUPLICATE_ID', `Collision detected on ID: "${entity.id}"`);
    idSet.add(entity.id);

    if (entity.slug) {
      if (slugSet.has(entity.slug)) addIssue(entity.slug, 'DUPLICATE_SLUG', `Duplicate slug found: "/${entity.slug}"`);
      slugSet.add(entity.slug);
    }

    if (entity.seo?.canonicalUrl) {
      if (canonicalSet.has(entity.seo.canonicalUrl)) {
        addIssue(entity.id, 'DUPLICATE_CANONICAL', `SEO Risk: Duplicate Canonical URL [${entity.seo.canonicalUrl}]`);
      }
      canonicalSet.add(entity.seo.canonicalUrl);
    }

    // 4. Generic Graph Relationship Integrity
    if (entity.relationships && Array.isArray(entity.relationships)) {
      entity.relationships.forEach((rel: Relationship) => {
        totalChecks += 2;
        
        // Target existence check
        const targetExists = entities.some(e => e.id === rel.targetId);
        if (!targetExists) {
          addIssue(entity.id, 'BROKEN_RELATIONAL_LINK', `References missing entity target: "${rel.targetId}"`);
        }

        // Relationship type spelling/enum check
        if (!validationConfig.allowedRelationshipTypes.includes(rel.type)) {
          addIssue(entity.id, 'INVALID_RELATIONSHIP_TYPE', `Invalid edge descriptor type: "${rel.type}"`);
        }
      });
    }

    // 5. Context-Aware Schema/SEO Rules (e.g., Location Coordinates & FAQs)
    if (type === 'Location') {
      totalChecks += 2;
      const lat = (entity as any).lat;
      const lng = (entity as any).lng;
      if (typeof lat !== 'number' || lat < -90 || lat > 90) addIssue(entity.id, 'INVALID_COORDINATES', `Latitude coordinate out of bounds: ${lat}`);
      if (typeof lng !== 'number' || lng < -180 || lng > 180) addIssue(entity.id, 'INVALID_COORDINATES', `Longitude coordinate out of bounds: ${lng}`);
    }

    if ((type === 'Service' || type === 'Location') && (!entity.faqs || entity.faqs.length === 0)) {
      totalChecks++;
      addIssue(entity.id, 'MISSING_FAQ', `Entity lacks FAQ nodes needed for rich search snippets.`);
    }
  });

  // Determine block status based on CRITICAL or ERROR severities
  const hasCriticalFailures = issues.some(i => i.severity === 'CRITICAL' || i.severity === 'ERROR');
  const passed = !hasCriticalFailures;
  const score = totalChecks > 0 ? Math.max(0, Math.round(((totalChecks - failedChecks) / totalChecks) * 100)) : 100;

  return {
    moduleName: 'Graph Integrity',
    passed,
    score,
    totalChecks,
    failedChecks,
    issues
  };
}
