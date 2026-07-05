// File: app/frontend/src/types/knowledgeGraph.ts

export enum RELATIONSHIP {
  AVAILABLE_AT = 'AVAILABLE_AT',
  HAS_FAQ = 'HAS_FAQ',
  REPAIRS_BRAND = 'REPAIRS_BRAND',
  HAS_DEVICE = 'HAS_DEVICE'
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
}

export interface BuildMetadata {
  lastReviewed: string;
  contentVersion: string;
  schemaVersion: string;
  validationStatus: string;
  isDeprecated: boolean;
}

/**
 * THE UNIVERSAL BASE
 */
export interface GraphEntity {
  id: string;
  slug: string;
  entityType: 'Location' | 'Service' | 'FAQ' | 'Brand' | 'Device';
  isActive: boolean;
  title: string;
  description: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  synonyms?: string[];
  aliases?: string[];
  seo: SEOMetadata;
  build?: BuildMetadata;
  schemaTypes?: string[];
  relationships?: Array<{ targetId: string; type: RELATIONSHIP; weight: number }>;
  media?: Array<{ imageId: string; altText: string; role: string; priority: string }>;
}

export interface BrandEntity extends GraphEntity {
  entityType: 'Brand';
}

export interface DeviceEntity extends GraphEntity {
  entityType: 'Device';
  brandId: string; 
}

export interface FAQEntity extends GraphEntity {
  entityType: 'FAQ';
  answer: string; // 👈 NEW: Dedicated answer field for clearer content modeling
}

// 👇 NEW: Strict Types for the Graph Engine
export type EntityMap = Record<string, GraphEntity>;

export interface RawGraphData {
  metadata: {
    version: string;
    lastUpdated: string;
    environment: string;
  };
  entities: EntityMap;
}
