// File: src/utils/schema/schemaRegistry.ts
import { SchemaBuilder } from './schemaUtils';
import { buildLocalBusiness } from './builders/localBusiness';
import { buildService } from './builders/service';
import { buildWebPage } from './builders/webpage';
import { buildFAQ } from './builders/faq';               
import { buildBreadcrumb } from './builders/breadcrumb'; 
import { buildImageObject } from './builders/imageObject'; 
import { buildReview } from './builders/review';           // ✅ Imported
import { buildVideoObject } from './builders/videoObject'; // ✅ Imported

export const SCHEMA_REGISTRY: Record<string, SchemaBuilder> = {
  'LocalBusiness': buildLocalBusiness,
  'Service': buildService,
  'WebPage': buildWebPage,
  'FAQPage': buildFAQ,               
  'BreadcrumbList': buildBreadcrumb, 
  'ImageObject': buildImageObject,   
  'Review': buildReview,             // ✅ Registered and active
  'VideoObject': buildVideoObject,   // ✅ Registered and active
};
