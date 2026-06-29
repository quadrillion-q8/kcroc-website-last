import { ServiceEntity } from '../repositories/ServiceRepository';

export class SchemaService {
  /**
   * Generates a strict Schema.org Service Entity.
   * Business logic lives here, keeping React components purely visual.
   */
  public static generateServiceSchema(service: ServiceEntity) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call",
        "telephone": "+96555301913"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kuwait"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Included Features",
        "itemListElement": service.features.map((feature, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": feature
          },
          "position": index + 1
        }))
      }
    };
  }
}
