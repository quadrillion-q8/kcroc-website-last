// File: app/frontend/src/core/components/SEOEngine.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KCROC_GRAPH } from '../../data/graph';
import { 
  ServiceEntity, 
  LocationEntity, 
  FAQEntity,
  RoutableEntity
} from '../../types/knowledgeGraph';

interface SEOEngineProps {
  entityId: string;
}

export const SEOEngine: React.FC<SEOEngineProps> = ({ entityId }) => {
  // 1. Fetch Core Graph Entities
  const entity = KCROC_GRAPH.entities[entityId] as RoutableEntity | undefined;
  const business = KCROC_GRAPH.business;
  const primaryLocation = KCROC_GRAPH.locations.find(l => l.id === 'loc-hawalli');
  const reviews = KCROC_GRAPH.reviews;

  // 2. Fallback to default SEO if entity is missing
  if (!entity || !entity.seo || !business) {
    return (
      <Helmet>
        <title>{business?.title || 'KCROC | Computer Repair Kuwait'}</title>
        <meta name="description" content={business?.aiSummary || 'Expert computer repair in Kuwait.'} />
        <meta name="robots" content="index, follow" />
      </Helmet>
    );
  }

  const { title, description, canonicalUrl, ogType } = entity.seo;
  const fullCanonicalUrl = `${business.websiteUrl}${canonicalUrl}`;

  // 3. Compute Aggregate Rating Dynamically
  const reviewItems = reviews?.items || [];
  const aggregateRating = reviewItems.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviewItems.reduce((sum, r) => sum + r.rating, 0) / reviewItems.length).toFixed(1),
    "reviewCount": reviewItems.length
  } : undefined;

  // 4. Build Universal LocalBusiness Schema (Always Emitted for NAP Consistency)
  const baseLocalBusiness: any = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${business.websiteUrl}/#business`,
    "name": business.legalName,
    "url": business.websiteUrl,
    "image": business.logoUrl,
    "telephone": `+${business.telephone}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": primaryLocation?.landmark,
      "addressLocality": "Hawalli",
      "addressRegion": business.addressRegion,
      "addressCountry": "KW"
    },
    "geo": primaryLocation?.coords ? {
      "@type": "GeoCoordinates",
      "latitude": primaryLocation.coords.lat,
      "longitude": primaryLocation.coords.lng
    } : undefined,
    "areaServed": primaryLocation?.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "openingHoursSpecification": business.schemaOpeningHours ? {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": business.schemaOpeningHours.dayOfWeek,
      "opens": business.schemaOpeningHours.opens,
      "closes": business.schemaOpeningHours.closes
    } : undefined,
    "sameAs": business.socialLinks ? Object.values(business.socialLinks) : []
  };

  if (aggregateRating) {
    baseLocalBusiness.aggregateRating = aggregateRating;
  }

  // 5. Build Page-Specific Schema Extensions
  const schemaGraph: any[] = [baseLocalBusiness];

  if (entity.entityType === 'Service') {
    const service = entity as ServiceEntity;
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@id": `${business.websiteUrl}/#business` // Hard-links service to the business entity
      },
      "areaServed": primaryLocation?.serviceAreas.map(area => ({
        "@type": "City",
        "name": area
      })),
      "offers": service.pricing ? {
        "@type": "Offer",
        "priceCurrency": service.pricing.currency,
        "price": service.pricing.startingFrom,
        "availability": "https://schema.org/InStock"
      } : undefined
    });
  } else if (entity.entityType === 'FAQ') {
    const faq = entity as FAQEntity;
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": faq.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }]
    });
  }

  // 6. Inject into the DOM safely using Helmet
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="robots" content="index, follow" />
      
      {/* OpenGraph / Social Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType || 'website'} />

      {/* JSON-LD Structured Data for Google Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemaGraph
        })}
      </script>
    </Helmet>
  );
};
