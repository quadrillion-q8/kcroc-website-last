// File: app/frontend/src/core/analytics/entityHelpers.ts
import { EntityMetadata, EntityType } from './types';

/**
 * Transforms a raw KCROC_GRAPH node into a standardized GA4 Entity Payload.
 * Formatted strictly for Phase 1 schema specifications.
 */
export const buildEntityPayload = (entity: any, type: EntityType = 'General'): Partial<EntityMetadata> => {
  if (!entity) return {};
  
  return {
    entity_id: entity.id || entity.slug || 'unknown',
    entity_type: type,
    entity_slug: entity.slug || '',
    primary_keyword: entity.title ? entity.title.toLowerCase() : undefined
  };
};
