// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

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
    bestRating: z.number()
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
  shortDescription: z.string(),
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

/* --- MASTER SCHEMA (DISCRIMINATED UNION) --- */
export const RawGraphSchema = z.object({
  metadata: z.object({ version: z.string(), lastUpdated: z.string(), environment: z.string() }),
  entities: z.record(z.string(), z.discriminatedUnion('entityType', [
    ServiceSchema, LocationSchema, FAQSchema, BusinessSchema, 
    USPSchema, TrustBadgeSchema, ProcessSchema, WebPageSchema, 
    StatsSchema, FooterSchema, ReviewsSchema
  ])),
});

/* --- TYPES --- */
export type RoutableEntity = z.infer<typeof RoutableEntitySchema>;
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
export type RawGraphData = z.infer<typeof RawGraphSchema>;
