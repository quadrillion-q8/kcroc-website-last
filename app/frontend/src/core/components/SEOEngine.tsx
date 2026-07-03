// File: app/frontend/src/core/components/SEOEngine.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KCROC_GRAPH } from '../../data/graph';
import { 
  KCROCEntity, 
  ServiceEntity, 
  LocationEntity, 
  FAQEntity 
} from '../../types/knowledgeGraph';

interface SEOEngineProps {
  entityId: string;
}

export const SEOEngine: React.FC<SEOEngineProps> = ({ entityId }) => {
  // 1. Fetch the exact entity from our Master Graph
  const entity = KCROC_GRAPH.entities[entityId] as KCROCEntity | undefined;

  // 2. Fallback to default SEO if the entity is missing
  if (!entity || !entity.seo) {
    return (
      <Helmet>
        <title>KCROC | Premium Computer Repair Kuwait</title>
        <meta name="description" content="Expert computer, laptop, and gaming PC repair in Kuwait. Free pickup and delivery." />
        <meta name="robots" content="index, follow" />
      </Helmet>
    );
  }

  const { title, description, canonicalUrl, robots, openGraph } = entity.seo;
  const fullCanonicalUrl = `https://computerrepairkuwait.com${canonicalUrl}`;

  // 3. Dynamic Schema Generator based on Entity Type
  let schemaJSON: any = null;

  if (entity.entityType === 'Service') {
    const service = entity as ServiceEntity;
    schemaJSON = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call",
        "telephone": "+96555301913",
        "image": "https://computerrepairkuwait.com/logo.png"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kuwait"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KWD",
        "price": service.basePrice || 0,
        "availability": "https://schema.org/InStock",
        "warranty": service.warranty
      }
    };
  } else if (entity.entityType === 'Location') {
    const location = entity as LocationEntity;
    schemaJSON = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": location.title,
      "description": location.description,
      "telephone": "+96555301913",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hawalli",
        "addressCountry": "KW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.coords.lat,
        "longitude": location.coords.lng
      }
    };
  } else if (entity.entityType === 'FAQ') {
    const faq = entity as FAQEntity;
    schemaJSON = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": faq.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.description
        }
      }]
    };
  }

  // 4. Inject into the DOM safely using Helmet
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="robots" content={robots || 'index, follow'} />
      
      {/* OpenGraph / Social Meta Tags */}
      <meta property="og:title" content={openGraph?.title || title} />
      <meta property="og:description" content={openGraph?.description || description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={openGraph?.type || 'website'} />

      {/* JSON-LD Structured Data for Google Rich Snippets */}
      {schemaJSON && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJSON)}
        </script>
      )}
    </Helmet>
  );
};
