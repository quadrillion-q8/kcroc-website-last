// File: scripts/validation/validateGraph.ts
import { ValidationReport } from './types';

// ⚠️ Adjust this import to point to your actual knowledge graph registry
// Assuming it exports an array of entities or a Record<string, Entity>
import { SERVICES } from '../../app/frontend/src/knowledge/registry'; 

export async function validateGraph(): Promise<ValidationReport> {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Convert to array if your registry is an object/Record
  const entities = Array.isArray(SERVICES) ? SERVICES : Object.values(SERVICES);
  
  const idSet = new Set<string>();
  const slugSet = new Set<string>();

  entities.forEach((entity: any) => {
    // 1. Check Required Fields
    if (!entity.id) errors.push(`Entity missing ID: ${JSON.stringify(entity).substring(0, 50)}...`);
    if (!entity.slug) errors.push(`Entity [${entity.id}] missing slug.`);
    if (!entity.name) errors.push(`Entity [${entity.id}] missing name.`);
    
    // 2. Uniqueness Checks (IDs and Slugs must be globally unique)
    if (entity.id) {
      if (idSet.has(entity.id)) errors.push(`Duplicate ID found: [${entity.id}]`);
      idSet.add(entity.id);
    }
    if (entity.slug) {
      if (slugSet.has(entity.slug)) errors.push(`Duplicate slug found: /${entity.slug}`);
      slugSet.add(entity.slug);
    }

    // 3. Relational Integrity (Broken Links)
    // If an entity defines related services, ensure they actually exist in the graph
    if (entity.relatedServices && Array.isArray(entity.relatedServices)) {
      entity.relatedServices.forEach((relatedId: string) => {
        const targetExists = entities.some((e: any) => e.id === relatedId);
        if (!targetExists) {
          errors.push(`Broken Relationship: [${entity.id}] references non-existent entity [${relatedId}]`);
        }
      });
    }

    // 4. Data Quality Warnings (Optional but highly recommended for SEO)
    if (!entity.faq || entity.faq.length === 0) {
      warnings.push(`[${entity.id}] has no FAQs. Recommended for rich snippets.`);
    }
    if (!entity.keywords || entity.keywords.length === 0) {
      warnings.push(`[${entity.id}] has no target keywords defined.`);
    }
  });

  // 5. Orphan Check (Is this entity linked to by anything?)
  // Useful for finding pages that have no internal links pointing to them
  entities.forEach((entity: any) => {
    const isLinked = entities.some((other: any) => 
      other.id !== entity.id && 
      other.relatedServices && 
      other.relatedServices.includes(entity.id)
    );
    // You might ignore root/pillar pages here, but for standard services, it should be linked.
    if (!isLinked) {
      warnings.push(`Orphan Entity: [${entity.id}] is not referenced by any other entity.`);
    }
  });

  const passed = errors.length === 0;
  const score = passed ? 100 : Math.max(0, 100 - (errors.length * 10));

  return {
    moduleName: 'Graph Integrity',
    passed,
    score,
    totalItems: entities.length,
    errors,
    warnings
  };
}
