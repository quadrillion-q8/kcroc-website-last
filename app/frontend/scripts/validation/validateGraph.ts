import { KCROC_GRAPH } from '../../src/knowledge/graph'; // Adjust path if needed to find your graph.ts

export async function validateGraph() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const entities = KCROC_GRAPH.entities;
  
  const idSet = new Set<string>();
  const slugSet = new Set<string>();
  const primaryKeywordSet = new Set<string>();

  entities.forEach((entity: any) => {
    // 1. Structural Validation (using your schema)
    if (!entity.id) errors.push(`Entity missing ID: ${JSON.stringify(entity).substring(0, 50)}`);
    if (!entity.title) errors.push(`Entity [${entity.id}] missing title.`);
    if (!entity.slug) errors.push(`Entity [${entity.id}] missing slug.`);
    
    // 2. SEO Integrity
    if (!entity.seo?.canonicalUrl) warnings.push(`[${entity.id}] missing canonical URL.`);
    if (!entity.primaryKeyword) warnings.push(`[${entity.id}] missing primary keyword.`);
    
    // 3. Uniqueness Checks
    if (entity.id) {
        if (idSet.has(entity.id)) errors.push(`Duplicate ID: ${entity.id}`);
        idSet.add(entity.id);
    }
    
    if (entity.slug) {
        if (slugSet.has(entity.slug)) errors.push(`Duplicate slug: ${entity.slug}`);
        slugSet.add(entity.slug);
    }

    if (entity.primaryKeyword) {
        if (primaryKeywordSet.has(entity.primaryKeyword)) {
            warnings.push(`Duplicate primary keyword: ${entity.primaryKeyword} in [${entity.id}]`);
        }
        primaryKeywordSet.add(entity.primaryKeyword);
    }

    // 4. Native Relationship Validation
    entity.relationships?.forEach((rel: any) => {
      const targetExists = entities.some((e: any) => e.id === rel.targetId);
      if (!targetExists) {
        errors.push(`Broken relationship: [${entity.id}] -> [${rel.targetId}]`);
      }
    });
  });

  return { passed: errors.length === 0, errors, warnings };
}
