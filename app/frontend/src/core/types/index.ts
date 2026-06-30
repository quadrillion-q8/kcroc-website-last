// File: app/frontend/src/core/types/index.ts

/**
 * ==========================================
 * 1. ENUMS & CONSTANTS
 * ==========================================
 */
export enum EntityStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum EntityType {
  Organization = 'Organization',
  Service = 'Service',
  Location = 'Location',
  FAQ = 'FAQ',
  Blog = 'Blog',
  Brand = 'Brand',
  Category = 'Category',
  Issue = 'Issue',
  Device = 'Device',
  Testimonial = 'Testimonial',
  Review = 'Review',
  Offer = 'Offer',
  Image = 'Image',
  Video = 'Video',
  Author = 'Author',
  Page = 'Page',
  Tag = 'Tag',
  Collection = 'Collection'
}

/**
 * ==========================================
 * 2. COMPONENT METADATA INTERFACES
 * ==========================================
 */
// Strict typing for Schema.org JSON-LD to completely eliminate `any`
export type JsonLd = Record<string, unknown>;

export interface ImageMetadata {
  url: string;
  alt: string;
  type?: string;     // e.g., 'image/jpeg'
  width?: number;
  height?: number;
  caption?: string;
  secureUrl?: string; // Important for strict OpenGraph implementations
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  robots?: string;
  author?: string;
  publisher?: string;
  language?: string;
  ogImage?: ImageMetadata;
  twitterImage?: ImageMetadata;
  themeColor?: string;
  priority?: number;          // For sitemap.xml
  changeFrequency?: string;   // For sitemap.xml
  lastModified?: string;
  noArchive?: boolean;
  noSnippet?: boolean;
  alternateLanguages?: Record<string, string>;
  structuredData?: JsonLd | JsonLd[]; // Replaces the generic 'schema: any'
}

export interface SearchMetadata {
  keywords: string[];
  synonyms: string[];
  boost: number;              // Allows prioritizing high-value services in search
}

export interface AnalyticsMetadata {
  category: string;
  label: string;
  conversion: string;
}

export interface SemanticMetadata {
  embeddingId?: string;       // Vector DB reference for RAG/AI Pipelines
  topics?: string[];
  intent?: string[];
}

export interface ValidationMetadata {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface EntityRelationships {
  services?: string[];
  locations?: string[];
  blogs?: string[];
  faqs?: string[];
  categories?: string[];
  issues?: string[];
  brands?: string[];
  images?: string[];
  devices?: string[];
}

/**
 * ==========================================
 * 3. CORE ENTITY ARCHITECTURE
 * ==========================================
 */
export interface BaseEntity {
  id: string;
  slug: string;
  entityType: EntityType;
  status: EntityStatus;
  
  // Content
  title: string;
  description: string;
  featuredImage?: ImageMetadata;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Metadata Engines
  seo?: SEOMetadata;
  search?: SearchMetadata;
  analytics?: AnalyticsMetadata;
  semantic?: SemanticMetadata;
  validation?: ValidationMetadata;

  // Graph Relationships
  relationships?: EntityRelationships;
}

/**
 * ==========================================
 * 4. SPECIFIC DOMAIN ENTITIES
 * ==========================================
 */
export interface ServiceEntity extends BaseEntity {
  entityType: EntityType.Service;
  features: string[];
  basePrice?: number;
  serviceCategory?: string;
  isPickAndDropEligible: boolean;
}

export interface LocationEntity extends BaseEntity {
  entityType: EntityType.Location;
  landmark: string;
  coords: {
    lat: number;
    lng: number;
  };
  serviceRadiusKm: number;
  phone?: string;
}

export interface FAQEntity extends BaseEntity {
  entityType: EntityType.FAQ;
  question: string;
  answer: string;
}

/**
 * ==========================================
 * 5. REPOSITORY ARCHITECTURE
 * ==========================================
 */
export interface PaginationOptions {
  limit?: number;
  offset?: number;
  sort?: string;
  filter?: Record<string, unknown>;
}

// Enterprise pagination envelope for scalable data fetching
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

// Global contract for all Data Repositories
export interface IRepository<T extends BaseEntity> {
  // Returns either a raw array (legacy fallback) or a PaginatedResult (enterprise standard)
  findAll(options?: PaginationOptions): Promise<T[] | PaginatedResult<T>>;
  findById(id: string): Promise<T | undefined>;
  findBySlug(slug: string): Promise<T | undefined>;
  search(query: string, options?: PaginationOptions): Promise<T[] | PaginatedResult<T>>;
}
