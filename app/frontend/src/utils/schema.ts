// src/utils/schema.ts
import { SEO } from '../constants/seo';
import { SERVICES } from '../constants/services';

export const generateServiceSchema = (slug: string) => {
  const service = SERVICES.find(s => s.slug === slug);
  
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "image": `${SEO.siteUrl}${service.image}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": SEO.siteName,
      "url": SEO.siteUrl
    },
    "areaServed": "Kuwait"
  };
};
