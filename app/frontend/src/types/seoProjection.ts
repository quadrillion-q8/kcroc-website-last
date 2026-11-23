// Explicit contract for the SEO-only generated projection (not the entire graph).
import type { z } from 'zod';
import type {
  BusinessEntity, FAQEntity, ServiceEntity, BrandEntity, ProblemEntity,
  LocationEntity, RoutableEntity,
} from './knowledgeGraph';
import { SEOSchema } from './knowledgeGraph';

type ProjectedPage = Omit<RoutableEntity, 'seo'> & { seo: z.infer<typeof SEOSchema> };
type ProjectedBusiness = Pick<BusinessEntity,
  'websiteUrl'|'logoUrl'|'legalName'|'telephone'|'email'|'priceRange'|
  'streetAddress'|'addressLocality'|'addressRegion'|'addressCountry'|
  'schemaOpeningHours'|'socialLinks'>;

export type SEOProjectionGraph = {
  routableEntities: ProjectedPage[];
  faqs: Array<Pick<FAQEntity, 'id'|'title'|'answer'>>;
  business: ProjectedBusiness | null;
  related: {
    services: Array<Pick<ServiceEntity, 'id'|'title'|'description'>>;
    brands: Array<Pick<BrandEntity, 'id'|'slug'|'brandName'|'title'|'officialWebsite'|'seo'>>;
    problems: Array<Pick<ProblemEntity, 'id'|'title'>>;
    locations: Array<Pick<LocationEntity, 'id'|'title'|'landmark'|'coords'|'serviceAreas'>>;
  };
};
