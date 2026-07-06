// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

export enum RELATIONSHIP {
  AVAILABLE_AT = 'AVAILABLE_AT',
  HAS_FAQ = 'HAS_FAQ',
  REPAIRS_BRAND = 'REPAIRS_BRAND',
  HAS_DEVICE = 'HAS_DEVICE'
}

/**
 * ZOD SCHEMAS (Source of Truth)
 */
const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonicalUrl: z.string(),
});

// The absolute base for ALL graph nodes
const CoreNodeSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  title: z.string(),
});

// Routable Nodes (Pages that go in the sitemap)
const RoutableEntitySchema = CoreNodeSchema.extend({
  slug: z.string(),
  description: z.string(),
  seo: SEOSchema,
});

// Fragment Nodes (Reusable UI blocks, no URLs needed)
const FragmentEntitySchema = CoreNodeSchema.extend({
  description: z.string().optional(),
});

/* --- ROUTABLE ENTITIES --- */
export const LocationSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Location'),
  landmark: z.string(),
  coords: z.object({ lat: z.number(), lng: z.number() }),
  serviceAreas: z.array(z.string()),
});

export const ServiceSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Service'),
  iconKey: z.string(),
  pricing: z.object({ startingFrom: z.number(), currency: z.literal('KWD'), quoteRequired: z.boolean(), displayLabel: z.string() }),
  coreFeatures: z.array(z.string()),
  process: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
  warranty: z.object({ duration: z.string(), coverage: z.string(), noFixNoFee: z.boolean() }),
  commonProblems: z.array(z.object({ id: z.string(), title: z.string(), symptoms: z.array(z.string()), likelyCause: z.string(), expectedTurnaround: z.string(), approxPriceRange: z.string() })),
});

export const FAQSchema = RoutableEntitySchema.extend({
  entityType: z.literal('FAQ'),
  answer: z.string(),
});

export const BrandSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Brand'),
});

export const DeviceSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Device'),
  brandId: z.string(),
});

export const WebPageSchema = RoutableEntitySchema.extend({
  entityType: z.literal('WebPage'),
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    description: z.string(),
    primaryCTA: z.object({ text: z.string(), route: z.string() }),
    secondaryCTA: z.object({ text: z.string(), route: z.string() })
  }),
  featuredFAQIds: z.array(z.string()),
  featuredUSPIds: z.array(z.string()),
});

/* --- FRAGMENT ENTITIES --- */
export const BusinessSchema = FragmentEntitySchema.extend({
  entityType: z.literal('Business'),
  legalName: z.string(),
  telephone: z.string(),
  aiSummary: z.string(), // For LLM optimization
});

export const USPSchema = FragmentEntitySchema.extend({
  entityType: z.literal('USP'),
  iconKey: z.string(),
});

export const TrustBadgeSchema = FragmentEntitySchema.extend({
  entityType: z.literal('TrustBadge'),
  iconKey: z.string(),
});

export const ProcessSchema = FragmentEntitySchema.extend({
  entityType: z.literal('Process'),
  steps: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
});

// Master Wrapper
const AllEntities = z.union([
  ServiceSchema, LocationSchema, FAQSchema, BrandSchema, DeviceSchema, WebPageSchema, // Routables
  BusinessSchema, USPSchema, TrustBadgeSchema, ProcessSchema // Fragments
]);

export const RawGraphSchema = z.object({
  metadata: z.object({ version: z.string(), lastUpdated: z.string(), environment: z.string() }),
  entities: z.record(z.string(), AllEntities),
});

/**
 * EXPORTED TYPES
 */
export type RoutableEntity = z.infer<typeof RoutableEntitySchema>;
export type ServiceEntity = z.infer<typeof ServiceSchema>;
export type LocationEntity = z.infer<typeof LocationSchema>;
export type FAQEntity = z.infer<typeof FAQSchema>;
export type WebPageEntity = z.infer<typeof WebPageSchema>;
export type BusinessEntity = z.infer<typeof BusinessSchema>;
export type USPEntity = z.infer<typeof USPSchema>;
export type TrustBadgeEntity = z.infer<typeof TrustBadgeSchema>;
export type ProcessEntity = z.infer<typeof ProcessSchema>;

export type RawGraphData = z.infer<typeof RawGraphSchema>;
