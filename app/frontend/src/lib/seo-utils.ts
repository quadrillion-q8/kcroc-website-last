import { BUSINESS_INFO } from '../constants/data';

export const generateServiceSchema = (serviceName: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url
    },
    "description": description,
    "areaServed": {
      "@type": "Country",
      "name": "Kuwait"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };
};
