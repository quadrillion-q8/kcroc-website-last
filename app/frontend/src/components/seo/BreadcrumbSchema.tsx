// src/components/seo/BreadcrumbSchema.tsx
import React from 'react';
import { SEO } from '../../constants/seo';

interface BreadcrumbProps {
  items: { name: string; url: string }[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SEO.siteUrl}${item.url}`
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
