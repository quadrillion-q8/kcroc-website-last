// src/components/seo/LocalBusinessSchema.tsx
import React from 'react';
import { SEO } from '../../constants/seo';
import { BUSINESS_INFO } from '../../constants/data';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "name": SEO.siteName,
    "url": SEO.siteUrl,
    "telephone": BUSINESS_INFO.phone,
    "priceRange": "15 KD - 500 KD",
    "image": `${SEO.siteUrl}${SEO.defaultImage}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
      "addressLocality": "Hawalli",
      "addressRegion": "Hawalli Governorate",
      "addressCountry": "KW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS_INFO.coords.lat,
      "longitude": BUSINESS_INFO.coords.lng
    },
    "areaServed": ["Hawalli", "Salmiya", "Farwaniya", "Kuwait City", "Mahboula", "Mangaf", "Fahaheel"],
    "openingHours": "Mo-Sa 10:00-22:00"
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
