// File: app/frontend/src/types/knowledgeGraph.ts
import { z } from 'zod';

/* --- BASE SCHEMA --- */
// 🚀 FIX: entityType added to base to ensure all nodes validate
export const CoreNodeSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  title: z.string(),
  entityType: z.string(), 
});

export const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonicalUrl: z.string(),
});

export const RoutableEntitySchema = CoreNodeSchema.extend({
  slug: z.string(),
  description: z.string(), // 👈 Validates that all routable pages have a description
  seo: SEOSchema,
});

// ... (Rest of your schemas stay the same, but now they inherit entityType correctly)
