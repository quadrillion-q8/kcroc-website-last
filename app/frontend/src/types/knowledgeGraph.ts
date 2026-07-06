// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

// ... Keep your existing SEOSchema and CoreNodeSchema ...

export const StatsSchema = CoreNodeSchema.extend({
  entityType: z.literal('Stats'),
  items: z.array(z.object({ label: z.string(), value: z.string(), sub: z.string() }))
});

export const FooterSchema = CoreNodeSchema.extend({
  entityType: z.literal('Footer'),
  links: z.object({
    services: z.array(z.string()),
    company: z.array(z.string()),
    areas: z.array(z.string())
  })
});

// Update ServiceSchema to make complex fields optional
export const ServiceSchema = RoutableEntitySchema.extend({
  entityType: z.literal('Service'),
  iconKey: z.string(),
  pricing: z.object({ startingFrom: z.number(), currency: z.string(), quoteRequired: z.boolean(), displayLabel: z.string() }).optional(),
  coreFeatures: z.array(z.string()).optional(),
  process: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })).optional(),
  warranty: z.object({ duration: z.string(), coverage: z.string(), noFixNoFee: z.boolean() }).optional(),
  commonProblems: z.array(z.object({ id: z.string(), title: z.string(), symptoms: z.array(z.string()), likelyCause: z.string(), expectedTurnaround: z.string(), approxPriceRange: z.string() })).optional(),
});

// Update the AllEntities union
const AllEntities = z.union([
  ServiceSchema, LocationSchema, FAQSchema, BrandSchema, DeviceSchema, WebPageSchema, 
  BusinessSchema, USPSchema, TrustBadgeSchema, ProcessSchema, StatsSchema, FooterSchema
]);

// Export types
export type StatsEntity = z.infer<typeof StatsSchema>;
export type FooterEntity = z.infer<typeof FooterSchema>;
// ... keep others ...
