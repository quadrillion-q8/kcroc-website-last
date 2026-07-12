// File: app/frontend/src/core/analytics/entityHelpers.ts
import { EntityMetadata, EntityType } from './types';

/**
 * Transforms a raw KCROC_GRAPH node into a standardized GA4 Entity Payload.
 */
export const buildEntityPayload = (entity: any, type: EntityType = 'General'): Partial<EntityMetadata> => {
  if (!entity) return {};
  
  return {
    entity_id: entity.id,
    entity_type: type,
    entity_slug: entity.slug,
    primary_keyword: entity.primaryKeyword || (entity.title ? entity.title.toLowerCase() : undefined),
    brand_context: entity.brand,
    location_context: entity.location,
  };
};
