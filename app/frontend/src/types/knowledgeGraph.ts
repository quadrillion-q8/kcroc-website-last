// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

/* --- ADVANCED ASSET SCHEMAS (Phase 1 Image Pipeline) --- */
export const ImageVariantsSchema = z.object({
  raw: z.string(),       // Original source (e.g., /assets/raw/dell-hero.png)
  webp: z.string(),      // Auto-generated WebP path
  avif: z.string(),      // Auto-generated AVIF path
  width: z.number().optional(),
  height: z.number().optional(),
});

export const ImageAssetSchema = z.object({
  thumbnail: ImageVariantsSchema.optional(),
  hero: ImageVariantsSchema.optional(),
  ogImage: z.string().optional(),   // Explicit 1200x630 fallback format for social sharing
  altText: z.string().optional()
});

/* --- BASE SCHEMAS --- */
export const CoreNodeSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  title: z.string(),
});

export const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonicalUrl: z.string(),
  ogType: z.string().optional(),
  schemaTypes: z.array(z.string()).optional(),
});

export const RoutableEntitySchema = CoreNodeSchema.extend({
  slug: z.string(),
  description: z.string(),
  seo: SEOSchema,
  featuredImage: ImageAssetSchema.optional(), 
  
  navigationPriority: z.number().optional(),
  isFeatured: z.boolean().optional(),
  shortDescription: z.string().optional(),
});

/* --- ENTITY SCHEMAS --- */
export const BusinessSchema = CoreNodeSchema.extend({
  entityType: z.literal('Business'),
  legalName: z.string(),
  alternateName: z.string().optional(),
  telephone: z.string(),
  streetAddress: z.string(),
  addressLocality: z.string(),
  addressRegion: z.string(),
  addressCountry: z.string(),
  coords: z.object({ lat: z.number(), lng: z.number() }),
  websiteUrl: z.string(),
  logoUrl: z.string(),
  email: z.string(),
  priceRange: z.string(),
  openingHours: z.string(),
  schemaOpeningHours: z.object({
    dayOfWeek: z.array(z.string()),
    opens: z.string(),
    closes: z.string()
  }),
  aggregateRating: z.object({
    ratingValue: z.string(),
    reviewCount: z.number(),
    bestRating: z.number().optional()
  }),
  socialLinks: z.record(z.string(), z.string()),
  aiSummary: z.string(),
});

export const USPSchema = CoreNodeSchema.extend({
  entityType: z.literal('USP'),
  iconKey: z.string(),
  description: z.string(),
  differentiator: z.string().optional(),
});

export const TrustBadgeSchema = CoreNodeSchema.extend({
  entityType: z.literal('TrustBadge'),
  iconKey: z.string(),
});

export const ProcessSchema = CoreNodeSchema.extend({
  entityType: z.literal('Process'),
  steps: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
});

export const StatsSchema = CoreNodeSchema.extend({
  entityType: z.literal('Stats'),
  items: z.array(z.object({ label: z.string(), value: z.string(), sub: z.string() }))
});

export const FooterSchema = CoreNodeSchema.extend({
  entityType: z.literal('Footer'),
  links: z.object({
    services: z.array(z.object({ label: z.string(), path: z.string() })),
    company: z.array(z.object({ label: z.string(), path: z.string() })),
    areas: z.array(z.object({ label: z.string(), path: z.string() }))
  })
});

export const ReviewsSchema = CoreNodeSchema.extend({
  entityType: z.literal('Reviews'),
  aggregateRating: z.object({
    ratingValue: z.string(),
    reviewCount: z.number()
  }),
  items: z.array(z.object({ 
    name: z.string(),
    location: z.string(),
    time: z.string(),
    rating: z.number(), 
    device: z.string(),
    text: z.string() 
  }))
});

export const ServiceSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Service'),
  iconKey: z.string(),
  repairLevel: z.string(),
  estimatedTurnaround: z.string(),
  pricing: z.object({ startingFrom: z.number(), currency: z.string(), quoteRequired: z.boolean(), displayLabel: z.string() }).optional(),
  coreFeatures: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  commonIssues: z.array(z.object({
    id: z.string(),
    title: z.string(),
    severity: z.string(),
    description: z.string()
  })).optional(),
  warranty: z.object({ duration: z.string(), coverage: z.string(), noFixNoFee: z.boolean() }).optional(),
});

export const LocationSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Location'),
  landmark: z.string(),
  coords: z.object({ lat: z.number(), lng: z.number() }).optional(),
  serviceRadiusKm: z.number().optional(),
  serviceAreas: z.array(z.string()),
});

export const FAQSchema = RoutableEntitySchema.extend({
  entityType: z.literal('FAQ'),
  answer: z.string(),
});

export const WebPageSchema = RoutableEntitySchema.extend({
  entityType: z.literal('WebPage'),
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    description: z.string(),
    primaryCTA: z.object({ text: z.string(), route: z.string() }),
    secondaryCTA: z.object({ text: z.string(), route: z.string() })
  }).optional(),
  featuredFAQIds: z.array(z.string()).optional(),
  featuredUSPIds: z.array(z.string()).optional(),
});

/* --- NEW ENTITY SCHEMAS FOR SEO EXPANSION --- */

export const BrandSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Brand'),
  brandName: z.string(),
  officialWebsite: z.string(),
  commonModels: z.array(z.string()),
  commonIssues: z.array(z.object({
    id: z.string(),
    title: z.string(),
    severity: z.string(),
    description: z.string()
  })),
  pricing: z.object({ 
    startingFrom: z.number(), 
    currency: z.string(), 
    quoteRequired: z.boolean(), 
    displayLabel: z.string() 
  }).optional(),
});

export const ProblemSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Problem'),
  symptom: z.string(),
  causes: z.array(z.string()),
  doNotDo: z.string().optional(),
  solution: z.string(),
  urgency: z.string(),
  relatedServiceIds: z.array(z.string()),
});

export const CaseStudySchema = RoutableEntitySchema.extend({
  entityType: z.literal('CaseStudy'),
  device: z.string(),
  location: z.string(),
  symptom: z.string(),
  diagnosis: z.string(),
  repair: z.string(),
  outcome: z.string(),
  timeToRepair: z.string(),
  costVsReplacement: z.string(),
  publishDate: z.string(),
});

/* --- MASTER SCHEMA (DISCRIMINATED UNION) --- */
export const RawGraphSchema = z.object({
  metadata: z.object({ version: z.string(), lastUpdated: z.string(), environment: z.string() }),
  entities: z.record(z.string(), z.discriminatedUnion('entityType', [
    ServiceSchema, LocationSchema, FAQSchema, BusinessSchema, 
    USPSchema, TrustBadgeSchema, ProcessSchema, WebPageSchema, 
    StatsSchema, FooterSchema, ReviewsSchema,
    BrandSchema, ProblemSchema, CaseStudySchema
  ])),
});

/* --- EXPORTED TYPES --- */
export type RoutableEntity = {
  id: string;
  isActive: boolean;
  title: string;
  slug: string;
  description: string;
  seo: any;
  featuredImage?: any;
  navigationPriority?: number;
  isFeatured?: boolean;
  shortDescription?: string;
};

export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type ServiceEntity = z.infer<typeof ServiceSchema>;
export type LocationEntity = z.infer<typeof LocationSchema>;
export type FAQEntity = z.infer<typeof FAQSchema>;
export type WebPageEntity = z.infer<typeof WebPageSchema>;
export type BusinessEntity = z.infer<typeof BusinessSchema>;
export type USPEntity = z.infer<typeof USPSchema>;
export type TrustBadgeEntity = z.infer<typeof TrustBadgeSchema>;
export type ProcessEntity = z.infer<typeof ProcessSchema>;
export type StatsEntity = z.infer<typeof StatsSchema>;
export type FooterEntity = z.infer<typeof FooterSchema>;
export type ReviewsEntity = z.infer<typeof ReviewsSchema>;

export type BrandEntity = z.infer<typeof BrandSchema>;
export type ProblemEntity = z.infer<typeof ProblemSchema>;
export type CaseStudyEntity = z.infer<typeof CaseStudySchema>;
export type RawGraphData = z.infer<typeof RawGraphSchema>;

export type EntityType = 
  | 'Service' | 'Location' | 'FAQ' | 'Business' 
  | 'USP' | 'TrustBadge' | 'Process' | 'WebPage' 
  | 'Stats' | 'Footer' | 'Reviews'
  | 'Brand' | 'Problem' | 'CaseStudy';
