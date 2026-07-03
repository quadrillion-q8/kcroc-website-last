import { KCROC_GRAPH } from '../../src/data/graph';
import { GraphEntity, RelationshipType } from '../../src/knowledge/graph.contract';

const ALLOWED_REL_TYPES: RelationshipType[] = [
  'RELATED_TO', 'AVAILABLE_AT', 'SERVES', 'FIXES', 'SUPPORTS', 'HAS_FAQ'
];

export async function validateGraph() {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Convert Record to Array for iteration
  const entities = Object.values(KCROC_GRAPH.entities) as GraphEntity[];
  const idSet = new Set<string>();
  const canonicalSet = new Set<string>();
  const incomingMap = new Map<string, string[]>();

  entities.forEach((entity) => {
    // 1. Strict Schema Enforcement
    if (!entity.id || !entity.title || !entity.slug) {
      errors.push(`Structural error in [${entity.id || 'Unknown'}]: Missing ID, Title, or Slug.`);
    }

    // 2. SEO & Canonical Uniqueness
    if (entity.seo?.canonicalUrl) {
      if (canonicalSet.has(entity.seo.canonicalUrl)) {
        errors.push(`Duplicate canonical URL detected: ${entity.seo.canonicalUrl}`);
      }
      canonicalSet.add(entity.seo.canonicalUrl);
    }

    // 3. Graph Integrity (Build incoming map for Orphan detection)
    entity.relationships?.forEach(rel => {
      // Validate Type Whitelist
      if (!ALLOWED_REL_TYPES.includes(rel.type)) {
        errors.push(`Invalid relationship type [${rel.type}] in [${entity.id}]`);
      }
      
      // Track incoming edges
      const arr = incomingMap.get(rel.targetId) || [];
      arr.push(entity.id);
      incomingMap.set(rel.targetId, arr);
    });
  });

  // 4. Integrity Post-Process (Orphans)
  entities.forEach(e => {
    if (!incomingMap.has(e.id) && e.relationships?.length === 0) {
      warnings.push(`Orphan entity detected (no incoming/outgoing links): ${e.id}`);
    }
  });

  return { passed: errors.length === 0, errors, warnings };
}
