// File: src/utils/graphQueries.ts
import { KCROC_GRAPH, GRAPH_INDEXES } from '../data/graph';
import { KCROCEntity, EntityType, RelationshipType, ServiceEntity } from '../types/knowledgeGraph';

/**
 * ============================================================================
 * 1. O(1) GENERIC RETRIEVAL
 * Instant lookups using IDs or the pre-computed indexes.
 * ============================================================================
 */

export const getEntityById = <T extends KCROCEntity>(id: string): T | undefined => {
  return KCROC_GRAPH.entities[id] as T | undefined;
};

export const getEntityBySlug = <T extends KCROCEntity>(slug: string): T | undefined => {
  const id = GRAPH_INDEXES.bySlug.get(slug);
  return id ? getEntityById<T>(id) : undefined;
};

export const getEntitiesByType = <T extends KCROCEntity>(type: EntityType): T[] => {
  const ids = GRAPH_INDEXES.byType.get(type) || [];
  return ids.map(id => getEntityById<T>(id)).filter((e): e is T => e !== undefined);
};

/**
 * ============================================================================
 * 2. RELATIONSHIP ENGINE
 * Navigates the graph based on relationship definitions and weights.
 * ============================================================================
 */

export const getRelatedEntities = <T extends KCROCEntity>(
  sourceId: string, 
  relationshipType?: RelationshipType,
  targetEntityType?: EntityType
): T[] => {
  const source = getEntityById(sourceId);
  if (!source) return [];

  let relations = source.relationships;

  // Filter by relationship type if provided (e.g., 'related', 'nearby')
  if (relationshipType) {
    relations = relations.filter(r => r.relationshipType === relationshipType);
  }

  // Sort by weight (highest priority first)
  relations.sort((a, b) => (b.weight || 0) - (a.weight || 0));

  let results = relations
    .map(r => getEntityById<T>(r.targetId))
    .filter((e): e is T => e !== undefined && e.isActive);

  // Filter by target entity type if provided (e.g., only return 'Service' entities)
  if (targetEntityType) {
    results = results.filter(e => e.entityType === targetEntityType);
  }

  return results;
};

/**
 * SPECIFIC ENGINE: RELATED SERVICES
 * Helper specifically for service discovery.
 */
export const getRelatedServices = (entityId: string): ServiceEntity[] => {
  return getRelatedEntities<ServiceEntity>(entityId, 'related', 'Service');
};

/**
 * ============================================================================
 * 3. ADVANCED SEARCH (AI/AutoLink Helpers)
 * ============================================================================
 */

export const searchEntities = (query: string): KCROCEntity[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // 1. Direct O(1) Keyword Match
  const exactMatchIds = GRAPH_INDEXES.byKeyword.get(normalizedQuery) || [];
  if (exactMatchIds.length > 0) {
    return exactMatchIds.map(id => getEntityById(id)!);
  }

  // 2. Fuzzy/Partial Match Fallback (O(N) search)
  const results: KCROCEntity[] = [];
  for (const [keyword, ids] of GRAPH_INDEXES.byKeyword.entries()) {
    if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
      ids.forEach(id => {
        const entity = getEntityById(id);
        if (entity && !results.includes(entity)) results.push(entity);
      });
    }
  }

  return results;
};

/**
 * ============================================================================
 * 4. BUILD VALIDATION HELPERS
 * Ensures the graph is perfectly structured for SEO and routing.
 * ============================================================================
 */

export const validateGraph = () => {
  const errors: string[] = [];
  const slugs = new Set<string>();

  Object.values(KCROC_GRAPH.entities).forEach(entity => {
    // Check Duplicate Slugs
    if (slugs.has(entity.slug)) {
      errors.push(`Duplicate slug detected: ${entity.slug} on ID: ${entity.id}`);
    }
    slugs.add(entity.slug);

    // Check Broken Relationships
    entity.relationships.forEach(rel => {
      if (!KCROC_GRAPH.entities[rel.targetId]) {
        errors.push(`Broken relationship on ${entity.id}: Target ${rel.targetId} does not exist.`);
      }
    });

    // Check Missing SEO Metadata
    if (!entity.seo.canonicalUrl) {
      errors.push(`Missing Canonical URL on ${entity.id}`);
    }
  });

  return {
    isValid: errors.length === 0,
    totalEntities: Object.keys(KCROC_GRAPH.entities).length,
    errors
  };
};
