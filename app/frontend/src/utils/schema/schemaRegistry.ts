// File: src/utils/schema/schemaRegistry.ts
import { SchemaBuilder } from './schemaUtils';
import { buildLocalBusiness } from './builders/localBusiness';
import { buildService } from './builders/service';
import { buildWebPage } from './builders/webpage';
import { buildFAQ } from './builders/faq';               // ✅ Added
import { buildBreadcrumb } from './builders/breadcrumb'; // ✅ Added

export const SCHEMA_REGISTRY: Record<string, SchemaBuilder> = {
  'LocalBusiness': buildLocalBusiness,
  'Service': buildService,
  'WebPage': buildWebPage,
  'FAQPage': buildFAQ,               // ✅ Uncommented and active
  'BreadcrumbList': buildBreadcrumb, // ✅ Added to the registry
};
