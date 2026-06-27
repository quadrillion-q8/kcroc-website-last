// File: src/types/knowledgeGraph.ts

/**
 * ============================================================================
 * 1. MODULAR METADATA INTERFACES
 * Reusable composition blocks to prevent duplication.
 * ============================================================================
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    imageId?: string; // Reference to an Image Entity
    type?: 'website' | 'article' | 'profile' | 'local.business';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    creator?: string;
  };
}

export interface AIMetadata {
  shortSummary: string;
  longSummary?: string;
  searchIntent: 'informational' | 'navigational' | 'transactional' | 'commercial' | 'local';
  semanticKeywords: string[]; // Internal vector/semantic matching
  commonQuestions?: string[]; // IDs of FAQ entities
  troubleshootingSteps?: string[];
  repairDifficulty?: 'Low' | 'Medium' | 'High' | 'Expert';
  estimatedRepairTimeMinutes?: number;
}

export interface AnalyticsMetadata {
  trackingId?: string;
  conversionType?: 'lead' | 'sale' | 'inquiry' | 'view';
  eventCategory?: string;
  campaignTags?: string[];
}

export interface RouteMetadata {
  path: string;
  routeName: string;
  navigationGroup?: 'Services' | 'About' | 'Legal' | 'Locations' | 'Hidden';
  parentRouteId?: string;
  breadcrumbLabel: string;
  priority: number; // 0.0 to 1.0 for sitemaps
}

export interface BuildMetadata {
  lastReviewed: string; // ISO Date
  contentVersion: string;
  schemaVersion: string;
  validationStatus: 'Valid' | 'Warning' | 'Error';
  isDeprecated: boolean;
}

/**
 * ============================================================================
 * 2. MEDIA & CONTENT REFERENCES
 * ============================================================================
 */

export interface MediaReference {
  imageId: string;
  altText: string;
  caption?: string;
  priority: 'eager' | 'lazy';
  role: 'hero' | 'thumbnail' | 'gallery' | 'diagram' | 'before-after';
}

/**
 * ============================================================================
 * 3. ADVANCED RELATIONSHIP ENGINE
 * Supports weighted, directional relationships between any entities.
 * ============================================================================
 */

export type RelationshipType = 
  | 'parent' | 'child' | 'related' | 'prerequisite' | 'followUp' 
  | 'compatible' | 'required' | 'crossSell' | 'nearby';

export interface RelationshipNode {
  targetId: string;
  relationshipType: RelationshipType;
  weight?: number; // 1-10 scale for sorting priority
  confidence?: number; // For future AI/ML relationship generation
}

/**
 * ============================================================================
 * 4. CORE ENTITY ARCHITECTURE
 * ============================================================================
 */

export type EntityType = 
  | 'Service' | 'Brand' | 'Device' | 'Location' | 'Issue' | 'Category' 
  | 'FAQ' | 'BlogPost' | 'Image' | 'Video' | 'Review' | 'Testimonial' 
  | 'Offer' | 'Technician' | 'Software' | 'OperatingSystem' | 'Component' 
  | 'Accessory' | 'Manufacturer' | 'ErrorCode' | 'RepairProcess' | 'Tool';

export interface BaseEntity {
  id: string;
  slug: string;
  entityType: EntityType;
  isActive: boolean;
  
  // Display Data
  title: string;
  shortTitle?: string;
  description: string;
  
  // Search & Taxonomy
  primaryKeyword: string;
  secondaryKeywords: string[];
  synonyms: string[];
  aliases: string[];
  
  // Modularity
  seo: SEOMetadata;
  ai?: AIMetadata;
  route?: RouteMetadata;
  analytics?: AnalyticsMetadata;
  build: BuildMetadata;
  
  // Relationships & Content
  relationships: RelationshipNode[];
  media?: MediaReference[];
  schemaTypes: string[]; // e.g., ['Service', 'WebPage']
}

/**
 * ============================================================================
 * 5. SPECIFIC ENTITY EXTENSIONS
 * ============================================================================
 */

export interface ServiceEntity extends BaseEntity {
  entityType: 'Service';
  basePrice?: number;
  isPickAndDropEligible: boolean;
  warrantyDays?: number;
}

export interface LocationEntity extends BaseEntity {
  entityType: 'Location';
  coords: { lat: number; lng: number };
  serviceRadiusKm: number;
}

// ... Additional specific extensions (BrandEntity, IssueEntity, etc.) can be added here following the same pattern.

export type KCROCEntity = BaseEntity | ServiceEntity | LocationEntity; // Union of all specific types

export interface KnowledgeGraphData {
  entities: Record<string, KCROCEntity>;
}
