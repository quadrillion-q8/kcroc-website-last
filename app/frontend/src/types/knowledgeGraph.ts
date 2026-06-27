// File: src/types/knowledgeGraph.ts

/**
 * ============================================================================
 * SHARED METADATA INTERFACES
 * Extracted to ensure zero duplication across the architecture.
 * ============================================================================
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
}

export interface OpenGraphMetadata {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogLocale?: string;
}

export interface TwitterMetadata {
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCreator?: string;
}

export type SchemaType = 
  | 'LocalBusiness' 
  | 'Organization' 
  | 'WebSite' 
  | 'WebPage' 
  | 'CollectionPage' 
  | 'ContactPage' 
  | 'AboutPage' 
  | 'Service' 
  | 'Article' 
  | 'BlogPosting' 
  | 'FAQPage' 
  | 'BreadcrumbList' 
  | 'ImageObject'
  | 'VideoObject'
  | 'Review'
  | 'AggregateRating'
  | 'Offer'
  | 'OfferCatalog'
  | 'HowTo';

export interface SchemaMetadata {
  schemaTypes: SchemaType[];
  customSchemaId?: string; // Stable @id for linking schema nodes
}

export interface AIMetadata {
  searchIntent: 'informational' | 'navigational' | 'transactional' | 'commercial' | 'local';
  semanticKeywords: string[]; // Internal only — never rendered as <meta name="keywords">
  primaryQuestion?: string;
  suggestedFollowUpQuestions?: string[];
}

export interface AnalyticsMetadata {
  trackLeadSource?: string;
  eventCategory?: string;
  conversionValue?: number;
}

export interface ImageMetadata {
  url: string;
  altText: string;
  width: number;
  height: number;
  caption?: string;
  aspectRatio?: string;
  isHero?: boolean;
}

export interface VideoMetadata {
  videoUrl: string;
  duration?: string; // ISO 8601 format (e.g., PT1M30S)
  thumbnailUrl?: string;
  uploadDate?: string;
}

/**
 * ============================================================================
 * RELATIONSHIP MAPS
 * All string[] in EntityRelationships are entity IDs (BaseEntity.id values).
 * TypeScript cannot enforce this at compile time — validated in BuildValidationReport.
 * ============================================================================
 */

export interface EntityRelationships {
  parentEntity?: string;
  childEntities?: string[];
  relatedServices?: string[];
  relatedBrands?: string[];
  relatedLocations?: string[];
  relatedIssues?: string[];
  relatedDevices?: string[];
  relatedBlogs?: string[];
  relatedFAQs?: string[];
  relatedImages?: string[];
  relatedVideos?: string[];
  relatedReviews?: string[];
}

/**
 * ============================================================================
 * CORE BASE ENTITY
 * Every node in the Knowledge Graph extends this base interface.
 * ============================================================================
 */

export type EntityType = 
  | 'Service' 
  | 'Brand' 
  | 'Device' 
  | 'Location' 
  | 'Issue' 
  | 'Category'
  | 'Blog'
  | 'FAQ'
  | 'Review'
  | 'Image'
  | 'Video'
  | 'Pricing'
  | 'Author'
  | 'Testimonial'
  | 'Route';

export interface BaseEntity {
  id: string;               // Unique stable ID (e.g., 'srv-macbook-screen')
  slug: string;             // URL-friendly slug
  title: string;            // Display title (For FAQs, this is the Question)
  entityType: EntityType;
  synonyms: string[];       // Used heavily by the AutoLink engine
  aliases: string[];        // Common misspellings or alternative names
  isActive: boolean;        // Toggle visibility across the site

  // Universal Metadata
  seo: SEOMetadata;
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
  schema: SchemaMetadata;
  ai?: AIMetadata;
  analytics?: AnalyticsMetadata;

  // Universal Relationships
  relationships?: EntityRelationships;
}

/**
 * ============================================================================
 * SPECIFIC ENTITY DEFINITIONS (15+ Types)
 * ============================================================================
 */

export interface ServiceEntity extends BaseEntity {
  entityType: 'Service';
  serviceCategory: 
    | 'Hardware Repair' 
    | 'Logic Board Diagnostics' 
    | 'Screen Replacement' 
    | 'Thermal Management' 
    | 'Software Troubleshooting'
    | 'Battery Replacement'
    | 'Keyboard Replacement'
    | 'Storage Upgrade'
    | 'Virus Removal';
  repairWorkflowSteps?: string[]; 
  estimatedDurationHours?: number;
  basePriceId?: string;
  isPickAndDropEligible: boolean;
}

export interface BrandEntity extends BaseEntity {
  entityType: 'Brand';
  officialWebsite?: string;
  brandLogoId?: string;
  establishedYear?: number;
}

export interface DeviceEntity extends BaseEntity {
  entityType: 'Device';
  formFactor: 'Laptop' | 'Desktop' | 'All-in-One' | 'Console';
  modelNumbers: string[];
  releaseYear?: number;
  isDiscontinued?: boolean;
}

export interface LocationEntity extends BaseEntity {
  entityType: 'Location';
  landmark: string;
  coords: {
    lat: number;
    lng: number;
  };
  populationDensity?: 'High' | 'Medium' | 'Low';
  serviceRadiusKm?: number;
}

export interface IssueEntity extends BaseEntity {
  entityType: 'Issue';
  symptoms: string[];
  severity: 'Minor' | 'Moderate' | 'Critical';
  causes?: string[];
  preventionTips?: string[];
}

export interface CategoryEntity extends BaseEntity {
  entityType: 'Category';
  description: string;
  iconName?: string;
}

export interface BlogEntity extends BaseEntity {
  entityType: 'Blog';
  authorId: string;
  publishDate: string;
  modifiedDate: string;
  readTimeMinutes: number;
  excerpt: string;
  contentPath: string; // e.g., '/content/blog/laptop-repair-kuwait-2026.mdx'
  isPillar: boolean;
}

export interface FAQEntity extends BaseEntity {
  entityType: 'FAQ';
  // BaseEntity.title serves as the question
  answer: string;
  helpfulVotes?: number;
}

export interface ReviewEntity extends BaseEntity {
  entityType: 'Review';
  authorName: string;
  rating: number; // 1–5, supports 0.5 increments for AggregateRating
  reviewText: string;
  publishDate: string;
  verifiedRepair?: boolean;
}

export interface ImageEntity extends BaseEntity {
  entityType: 'Image';
  metadata: ImageMetadata;
}

export interface VideoEntity extends BaseEntity {
  entityType: 'Video';
  metadata: VideoMetadata;
}

export interface PricingEntity extends BaseEntity {
  entityType: 'Pricing';
  currency: 'KWD';
  minPrice: number;
  maxPrice?: number;
  priceUnit?: 'per repair' | 'per hour' | 'flat rate';
  isDiagnosticOnly?: boolean;
}

export interface AuthorEntity extends BaseEntity {
  entityType: 'Author';
  fullName: string;
  bio: string;
  profileImageId?: string;
  socialLinks?: Record<string, string>;
}

export interface TestimonialEntity extends BaseEntity {
  entityType: 'Testimonial';
  clientName: string;
  clientRole?: string;
  quote: string;
  beforeAfterImageIds?: string[];
}

export interface RouteEntity extends BaseEntity {
  entityType: 'Route';
  path: string;
  templateId: 'ServiceTemplate' | 'LocationTemplate' | 'BlogTemplate' | 'BrandTemplate' | 'IssueTemplate';
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * ============================================================================
 * MASTER KNOWLEDGE GRAPH COLLECTIONS
 * ============================================================================
 */

export interface KnowledgeGraphData {
  services: Record<string, ServiceEntity>;
  brands: Record<string, BrandEntity>;
  devices: Record<string, DeviceEntity>;
  locations: Record<string, LocationEntity>;
  issues: Record<string, IssueEntity>;
  categories: Record<string, CategoryEntity>;
  blogs: Record<string, BlogEntity>;
  faqs: Record<string, FAQEntity>;
  reviews: Record<string, ReviewEntity>;
  images: Record<string, ImageEntity>;
  videos: Record<string, VideoEntity>;
  pricing: Record<string, PricingEntity>;
  authors: Record<string, AuthorEntity>;
  testimonials: Record<string, TestimonialEntity>;
  routes: Record<string, RouteEntity>;
}

/**
 * ============================================================================
 * BUILD & VALIDATION METADATA
 * ============================================================================
 */

export interface BuildValidationReport {
  totalEntities: number;
  orphanNodes: string[]; // No inbound links AND not a root-level route entity
  missingSchema: string[];
  missingSeoTags: string[];
  duplicateSlugs: string[];
  brokenRelationships: Array<{ sourceId: string; targetId: string }>;
  inactiveEntityReferences: Array<{ sourceId: string; targetId: string }>; // Prevents 404s
  timestamp: string;
}
