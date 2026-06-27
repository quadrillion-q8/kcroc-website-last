// File: src/utils/schema/schemaRegistry.ts
import { SchemaBuilder } from './schemaUtils';
import { buildLocalBusiness } from './builders/localBusiness';
import { buildService } from './builders/service';
import { buildWebPage } from './builders/webpage';
// Import future builders here (buildFAQ, buildImage, etc.)

export const SCHEMA_REGISTRY: Record<string, SchemaBuilder> = {
  'LocalBusiness': buildLocalBusiness,
  'Service': buildService,
  'WebPage': buildWebPage,
  // 'FAQPage': buildFAQ,
  // 'ImageObject': buildImageObject,
};
