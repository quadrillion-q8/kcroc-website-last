// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

export enum RELATIONSHIP {
  AVAILABLE_AT = 'AVAILABLE_AT',
  HAS_FAQ = 'HAS_FAQ',
  REPAIRS_BRAND = 'REPAIRS_BRAND',
  HAS_DEVICE = 'HAS_DEVICE'
}

/**
 * ZOD SCHEMAS (Source of Truth for Build-Time Validation)
 */

const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonicalUrl: z.string(),
});

const BaseEntitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  isActive: z.boolean(),
  title: z.string(),
  description: z.string(),
  seo: SEOSchema,
  media: z.array(z.object({ imageId: z.string(), altText: z.string(), role: z.string(), priority: z.string().optional() })).optional(),
});

export const LocationSchema = BaseEntitySchema.extend({
  entityType: z.literal('Location'),
  landmark: z.string(),
  coords: z.object({ lat: z.number(), lng: z.number() }),
  serviceAreas: z.array(z.string()),
});

export const ServiceSchema = BaseEntitySchema.extend({
  entityType: z.literal('Service'),
  iconKey: z.string(),
  pricing: z.object({
    startingFrom: z.number(),
    currency: z.literal('KWD'),
    quoteRequired: z.boolean(),
    displayLabel: z.string(),
  }),
  coreFeatures: z.array(z.string()),
  process: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
  warranty: z.object({ duration: z.string(), coverage: z.string(), noFixNoFee: z.boolean() }),
  commonProblems: z.array(z.object({ 
    id: z.string(), 
    title: z.string(), 
    symptoms: z.array(z.string()), 
    likelyCause: z.string(), 
    expectedTurnaround: z.string(), 
    approxPriceRange: z.string() 
  })),
});

export const FAQSchema = BaseEntitySchema.extend({
  entityType: z.literal('FAQ'),
  answer: z.string(),
});

export const BrandSchema = BaseEntitySchema.extend({
  entityType: z.literal('Brand'),
});

export const DeviceSchema = BaseEntitySchema.extend({
  entityType: z.literal('Device'),
  brandId: z.string(),
});

// Master Wrapper
export const RawGraphSchema = z.object({
  metadata: z.object({
    version: z.string(),
    lastUpdated: z.string(),
    environment: z.string(),
  }),
  entities: z.record(z.string(), z.union([ServiceSchema, LocationSchema, FAQSchema, BrandSchema, DeviceSchema])),
});

/**
 * EXPORTED TYPES (Inferred from Schemas)
 */
export type SEOMetadata = z.infer<typeof SEOSchema>;
export type ServiceEntity = z.infer<typeof ServiceSchema>;
export type LocationEntity = z.infer<typeof LocationSchema>;
export type FAQEntity = z.infer<typeof FAQSchema>;
export type BrandEntity = z.infer<typeof BrandSchema>;
export type DeviceEntity = z.infer<typeof DeviceSchema>;
export type GraphEntity = ServiceEntity | LocationEntity | FAQEntity | BrandEntity | DeviceEntity;

export type RawGraphData = z.infer<typeof RawGraphSchema>;
