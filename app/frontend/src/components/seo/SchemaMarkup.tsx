// File: app/frontend/src/components/seo/SchemaMarkup.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

interface SchemaMarkupProps {
  schema?: Record<string, any>;
}

export default function SchemaMarkup({ schema = {} }: SchemaMarkupProps) {
  const business = KCROC_GRAPH.business;
  const primaryLocation = KCROC_GRAPH.locations.find(l => l.id === 'loc-hawalli');
  const reviews = KCROC_GRAPH.reviews;

  // Compute aggregate rating dynamically
  const aggregateRating = reviews && reviews.items.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviews.items.reduce((sum, r) => sum + r.rating, 0) / reviews.items.length).toFixed(1),
    "reviewCount": reviews.items.length
  } : undefined;

  const baseLocalBusiness = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${business?.websiteUrl}/#business`,
    "name": business?.legalName,
    "url": business?.websiteUrl,
    "image": business?.logoUrl,
    "telephone": `+${business?.telephone}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": primaryLocation?.landmark,
      "addressLocality": "Hawalli",
      "addressRegion": business?.addressRegion,
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
    "openingHoursSpecification": business?.schemaOpeningHours ? {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": business.schemaOpeningHours.dayOfWeek,
      "opens": business.schemaOpeningHours.opens,
      "closes": business.schemaOpeningHours.closes
    } : undefined,
    ...(aggregateRating && { aggregateRating }),
    "sameAs": business?.socialLinks ? Object.values(business.socialLinks) : []
  };

  // Safely merge incoming schema arrays or objects
  const additionalGraph = schema["@graph"] 
    ? schema["@graph"] 
    : (Object.keys(schema).length > 0 ? [schema] : []);

  const mergedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      baseLocalBusiness,
      ...additionalGraph
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedSchema) }}
    />
  );
}
