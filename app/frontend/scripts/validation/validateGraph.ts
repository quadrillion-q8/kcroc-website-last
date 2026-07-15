// File: app/frontend/scripts/validation/validateGraph.ts
import { KCROC_GRAPH } from '../../src/data/graph';

export async function validateGraph() {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const entities = Object.values(KCROC_GRAPH.entities);
  const allEntityIds = new Set(Object.keys(KCROC_GRAPH.entities));
  
  const slugSet = new Set<string>();
  const canonicalSet = new Set<string>();
  const incomingMap = new Map<string, string[]>();

  // The actual relational arrays used in the Knowledge Graph
  const relationalKeys = [
    'relatedServiceIds', 
    'featuredFAQIds', 
    'featuredUSPIds'
  ];

  entities.forEach((entity: any) => {
    // 1. Strict Schema Enforcement (Core Fields for ALL entities)
    if (!entity.id || !entity.title || !entity.entityType) {
      errors.push(`Structural error in [${entity.id || 'Unknown'}]: Missing ID, Title, or EntityType.`);
    }

    // Determine if the entity is meant to generate a page/URL
    const isRoutable = 'seo' in entity && 'slug' in entity;

    // 2. SEO, Slug & Canonical Validation (Routable Entities ONLY)
    if (isRoutable) {
      if (typeof entity.slug !== 'string') {
        errors.push(`[${entity.id}] Routable entity missing a valid slug.`);
      } else {
        if (slugSet.has(entity.slug)) {
          errors.push(`[${entity.id}] Duplicate slug detected: /${entity.slug}`);
        }
        slugSet.add(entity.slug);
      }

      if (!entity.seo?.canonicalUrl) {
        errors.push(`[${entity.id}] Routable entity missing canonicalUrl.`);
      } else {
        if (canonicalSet.has(entity.seo.canonicalUrl)) {
          errors.push(`[${entity.id}] Duplicate canonical URL detected: ${entity.seo.canonicalUrl}`);
        }
        canonicalSet.add(entity.seo.canonicalUrl);
      }
    }

    // 3. Graph Integrity & Broken Link Validation
    let hasOutgoingLinks = false;
    
    relationalKeys.forEach(key => {
      if (Array.isArray(entity[key])) {
        entity[key].forEach((targetId: string) => {
          hasOutgoingLinks = true;
          
          // Validate that the ID it points to actually exists in the graph
          if (!allEntityIds.has(targetId)) {
            errors.push(`[${entity.id}] Broken reference: '${key}' points to non-existent ID '${targetId}'.`);
          }
          
          // Track incoming edges for orphan detection
          const arr = incomingMap.get(targetId) || [];
          arr.push(entity.id);
          incomingMap.set(targetId, arr);
        });
      }
    });
    
    entity._hasOutgoing = hasOutgoingLinks;
  });

  // 4. Integrity Post-Process (Orphan Detection)
  entities.forEach((e: any) => {
    // Root level configurations and singletons are naturally unlinked, exclude them from orphan warnings
    const isSingletonOrRoot = ['Business', 'WebPage', 'Stats', 'Footer', 'Reviews'].includes(e.entityType);
    
    if (!isSingletonOrRoot && !incomingMap.has(e.id) && !e._hasOutgoing) {
      warnings.push(`Orphan entity detected (no incoming/outgoing links): ${e.id} (${e.entityType})`);
    }
  });

  return { passed: errors.length === 0, errors, warnings };
}
