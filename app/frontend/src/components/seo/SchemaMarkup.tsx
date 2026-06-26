// File: src/components/seo/SchemaMarkup.tsx
import React from 'react';
import { BUSINESS_INFO } from '../../constants/data';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // ─── THE MASTER KCROC ENTITY GRAPH ───
  // This automatically injects the core business identity into EVERY page
  // so Google's Knowledge Graph explicitly ties all your content to your Hawalli lab.
  const baseLocalBusiness = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${BUSINESS_INFO.url}/#business`,
    "name": BUSINESS_INFO.name,
    "url": BUSINESS_INFO.url,
    "telephone": BUSINESS_INFO.phone,
    "image": `${BUSINESS_INFO.url}/logo.png`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
      "addressLocality": "Hawalli",
      "addressRegion": "Hawalli Governorate",
      "addressCountry": "KW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.3353,
      "longitude": 48.0146
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      // Add your actual social links here when you have them
      "https://www.instagram.com/kcroc_kuwait",
      "https://www.facebook.com/kcroc.kuwait"
    ]
  };

  // Merge the page-specific schema graph with the base business graph
  const mergedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      baseLocalBusiness,
      ...(schema["@graph"] || [schema]) // Support both @graph arrays and single objects
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedSchema) }}
    />
  );
}
