// File: src/utils/schema/schemaUtils.ts
import { BUSINESS_INFO } from '../../constants/data';
import { KCROCEntity } from '../../types/knowledgeGraph';

/**
 * STRICT SCHEMA TYPING
 * Eliminates `any` and ensures all nodes have standard Schema.org footprints.
 */
export interface SchemaNode {
  '@type': string | string[];
  '@id': string;
  [key: string]: unknown; // Allows specific builders to attach custom properties safely
}

export type SchemaBuilder = (entity: KCROCEntity, context?: any) => SchemaNode | SchemaNode[] | null;

/**
 * CENTRALIZED @ID GENERATION
 * Guarantees that cross-references never break.
 */
export const generateSchemaId = (entity: KCROCEntity | null, type: string): string => {
  const base = BUSINESS_INFO.url;
  if (!entity) return `${base}/#${type}`;
  return `${base}${entity.seo.canonicalUrl}#${type}`;
};

// Global stable anchors
export const ORG_ID = generateSchemaId(null, 'organization');
export const LOCAL_BIZ_ID = generateSchemaId(null, 'local-business');
export const WEBSITE_ID = generateSchemaId(null, 'website');
