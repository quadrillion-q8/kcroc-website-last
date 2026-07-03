// File: scripts/validation/validateGraph.ts
import { ValidationReport, ValidationError, SeverityLevel } from './types';
import { validationConfig } from './validation.config';

// ✅ Using the exact types path confirmed from your GitHub screenshot
import { KCROCEntity, Relationship } from '../../app/frontend/src/knowledge/types';

// ⚠️ DATA IMPORT:
// Based on your previous code, you were importing 'SERVICES' from 'registry.ts'.
// If you have fully migrated to exporting 'KCROC_GRAPH', update this import statement accordingly!
import { SERVICES } from '../../app/frontend/src/knowledge/registry'; 

export async function validateGraph(): Promise<ValidationReport> {
  const issues: ValidationError[] = [];
  let totalChecks = 0;
  let failedChecks = 0;

  // Single Source of Truth
  // (If you updated 'registry.ts' to export KCROC_GRAPH, change this to KCROC_GRAPH.entities)
  const entities: KCROCEntity[] = Array.isArray(SERVICES) ? SERVICES : Object.values(SERVICES);
  
  const idSet = new Set<string>();
  const slugSet = new Set<string>();
  const canonicalSet = new Set<string>();

  // Helper to log errors & track metrics dynamically
  const addIssue = (entityId: string, ruleKey: string, message: string, field?: string) => {
    const severity = validationConfig.severityOverrides[ruleKey] || 'WARNING';
    issues.push({ entityId, field, message, severity });
    
    // Only CRITICAL and ERROR impact the failure count / build status
    if (severity === 'ERROR' || severity === 'CRITICAL') {
      failedChecks++;
    }
  };

  entities.forEach((entity: KCROCEntity) => {
    const type = entity.entityType;
    totalChecks++;

    // 1. Validate Entity Type Extensibility
    if (!type || !validationConfig.allowedEntityTypes.includes(type)) {
      addIssue(entity.id || 'UNKNOWN', 'INVALID_ENTITY_TYPE', `Unknown or missing entityType: "${type}"`);
      return; // Skip further checks if the base type is entirely broken
    }

    // 2. Config-Driven Required Fields Verification
    const requiredFields = validationConfig.requiredFieldsByType[type] || ['id', 'name'];
    requiredFields.forEach((field: string) => {
      totalChecks++;
      // Safe type assertion to check dynamic fields
      const entityData = entity as Record<string, unknown>;
      if (!entityData[field]) {
        addIssue(entity.id, 'MISSING_REQUIRED_FIELD', `Missing structural field: "${field}"`, field);
      }
    });

    // 3. Uniqueness Enforcement (IDs, Slugs, Canonicals)
    totalChecks += 3;
    if (entity.id) {
      if (idSet.has(entity.id)) addIssue(entity.id, 'DUPLICATE_ID', `Collision detected on ID: "${entity.id}"`);
      idSet.add(entity.id);
    }

    if (entity.slug) {
      if (slugSet.has(entity.slug)) addIssue(entity.id, 'DUPLICATE_SLUG', `Duplicate slug found: "/${entity.slug}"`);
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

    // 5. Context-Aware Schema/SEO Rules
    if (type === 'Location') {
      totalChecks += 2;
      const entityData = entity as Record<string, any>;
      const lat = entityData.lat;
      const lng = entityData.lng;
      
      if (typeof lat !== 'number' || lat < -90 || lat > 90) {
        addIssue(entity.id, 'INVALID_COORDINATES', `Latitude coordinate out of bounds: ${lat}`);
      }
      if (typeof lng !== 'number' || lng < -180 || lng > 180) {
        addIssue(entity.id, 'INVALID_COORDINATES', `Longitude coordinate out of bounds: ${lng}`);
      }
    }

    // FAQ validation for specific entity types
    if ((type === 'Service' || type === 'Location')) {
      const entityData = entity as Record<string, any>;
      if (!entityData.faq || entityData.faq.length === 0) {
        totalChecks++;
        addIssue(entity.id, 'MISSING_FAQ', `Entity lacks FAQ nodes needed for rich search snippets.`);
      }
    }
  });

  // 6. Pipeline Resolution
  const hasCriticalFailures = issues.some(i => i.severity === 'CRITICAL' || i.severity === 'ERROR');
  const passed = !hasCriticalFailures;
  
  // Calculate score purely based on checked constraints vs passed constraints
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
