import { ValidationReport, ValidationError } from './types.ts';
import { validationConfig } from './validation.config.ts';
import { KCROCEntity, Relationship } from '../../src/knowledge/types.ts';
import { KCROC_GRAPH } from '../../src/knowledge/registry.ts';

export async function validateGraph(): Promise<ValidationReport> {
  const issues: ValidationError[] = [];
  let totalChecks = 0;
  let failedChecks = 0;
  const entities: KCROCEntity[] = KCROC_GRAPH.entities;
  
  const idSet = new Set<string>();
  const slugSet = new Set<string>();
  const canonicalSet = new Set<string>();

  const addIssue = (entityId: string, ruleKey: string, message: string, field?: string) => {
    const severity = validationConfig.severityOverrides[ruleKey] || 'WARNING';
    issues.push({ entityId, field, message, severity });
    if (severity === 'ERROR' || severity === 'CRITICAL') failedChecks++;
  };

  entities.forEach((entity) => {
    const type = entity.entityType;
    totalChecks++;

    if (!type || !validationConfig.allowedEntityTypes.includes(type)) {
      addIssue(entity.id || 'UNKNOWN', 'INVALID_ENTITY_TYPE', `Unknown/missing type: "${type}"`);
      return;
    }

    const requiredFields = validationConfig.requiredFieldsByType[type] || ['id', 'name'];
    requiredFields.forEach(field => {
      totalChecks++;
      if (!(entity as any)[field]) addIssue(entity.id, 'MISSING_REQUIRED_FIELD', `Missing field: "${field}"`, field);
    });

    totalChecks += 3;
    if (idSet.has(entity.id)) addIssue(entity.id, 'DUPLICATE_ID', `Duplicate ID: "${entity.id}"`);
    idSet.add(entity.id);
    if (slugSet.has(entity.slug)) addIssue(entity.id, 'DUPLICATE_SLUG', `Duplicate slug: "/${entity.slug}"`);
    slugSet.add(entity.slug);
    if (entity.seo?.canonicalUrl && canonicalSet.has(entity.seo.canonicalUrl)) addIssue(entity.id, 'DUPLICATE_CANONICAL', `Duplicate Canonical: [${entity.seo.canonicalUrl}]`);
    if (entity.seo?.canonicalUrl) canonicalSet.add(entity.seo.canonicalUrl);

    if (entity.relationships) {
      entity.relationships.forEach((rel: Relationship) => {
        totalChecks += 2;
        if (!entities.some(e => e.id === rel.targetId)) addIssue(entity.id, 'BROKEN_RELATIONAL_LINK', `Missing target: "${rel.targetId}"`);
        if (!validationConfig.allowedRelationshipTypes.includes(rel.type)) addIssue(entity.id, 'INVALID_RELATIONSHIP_TYPE', `Invalid type: "${rel.type}"`);
      });
    }
  });

  return {
    moduleName: 'Graph Integrity',
    passed: !issues.some(i => i.severity === 'CRITICAL' || i.severity === 'ERROR'),
    score: totalChecks > 0 ? Math.round(((totalChecks - failedChecks) / totalChecks) * 100) : 100,
    totalChecks,
    failedChecks,
    issues
  };
}
