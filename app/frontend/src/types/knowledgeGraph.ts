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
 * Every entity in the KCROC Conversion Content Layer must extend this interface.
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

// Sub-Entities (ServiceEntity and LocationEntity are expanded in graph.contract.ts)

export interface BrandEntity extends GraphEntity {
  entityType: 'Brand';
}

export interface DeviceEntity extends GraphEntity {
  entityType: 'Device';
  brandId: string; // Links back to the BrandEntity
}

export interface FAQEntity extends GraphEntity {
  entityType: 'FAQ';
  // The answer/description is handled by the base description property
}
