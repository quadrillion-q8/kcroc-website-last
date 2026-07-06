// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

// ... (keep all your existing schemas here: SEOSchema, CoreNodeSchema, etc.)

// 🆕 ADD THESE NEW SCHEMAS
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

// 2. Add them to the AllEntities union
const AllEntities = z.union([
  ServiceSchema, LocationSchema, FAQSchema, BrandSchema, DeviceSchema, WebPageSchema, 
  BusinessSchema, USPSchema, TrustBadgeSchema, ProcessSchema, 
  StatsSchema, FooterSchema // 👈 Registering the new types
]);

// ... (keep the rest of your exports)
