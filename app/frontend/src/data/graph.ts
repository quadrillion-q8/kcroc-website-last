// File: src/data/graph.ts
import { KnowledgeGraphData, KCROCEntity } from '../types/knowledgeGraph';

/**
 * THE MASTER DATABASE
 * All entities across the entire application live here.
 */
const rawGraphData: KnowledgeGraphData = {
  entities: {
    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Services',
      description: 'Expert laptop repair in Kuwait.',
      primaryKeyword: 'laptop repair',
      secondaryKeywords: ['computer fix', 'pc repair'],
      synonyms: ['laptop fixing', 'notebook repair'],
      aliases: ['lap top repair'],
      seo: { title: 'Laptop Repair Kuwait', description: 'Expert laptop fix.', canonicalUrl: '/laptop-repair-kuwait' },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      relationships: [
        { targetId: 'loc-hawalli', relationshipType: 'related', weight: 10 }
      ],
      schemaTypes: ['Service'],
      isPickAndDropEligible: true
    } as KCROCEntity,
    // Add all other entities (Brands, Locations, Issues) here...
  }
};

/**
 * ============================================================================
 * O(1) INDEXING ENGINE
 * Automatically builds fast lookup maps so queries never have to loop.
 * ============================================================================
 */

interface GraphIndexes {
  bySlug: Map<string, string>; // Maps slug -> ID
  byType: Map<string, string[]>; // Maps EntityType -> Array of IDs
  byKeyword: Map<string, string[]>; // Maps keyword/synonym -> Array of IDs
}

const buildGraphIndexes = (data: KnowledgeGraphData): GraphIndexes => {
  const indexes: GraphIndexes = {
    bySlug: new Map(),
    byType: new Map(),
    byKeyword: new Map()
  };

  Object.values(data.entities).forEach(entity => {
    if (!entity.isActive) return;

    // 1. Slug Index
    indexes.bySlug.set(entity.slug, entity.id);

    // 2. Type Index
    const typeArr = indexes.byType.get(entity.entityType) || [];
    typeArr.push(entity.id);
    indexes.byType.set(entity.entityType, typeArr);

    // 3. Keyword/Synonym/Alias Index
    const searchTerms = [
      entity.primaryKeyword,
      ...entity.secondaryKeywords,
      ...entity.synonyms,
      ...entity.aliases
    ].map(t => t.toLowerCase().trim());

    searchTerms.forEach(term => {
      const keywordArr = indexes.byKeyword.get(term) || [];
      if (!keywordArr.includes(entity.id)) keywordArr.push(entity.id);
      indexes.byKeyword.set(term, keywordArr);
    });
  });

  return indexes;
};

// Export the raw data and the pre-computed indexes
export const KCROC_GRAPH = rawGraphData;
export const GRAPH_INDEXES = buildGraphIndexes(rawGraphData);
