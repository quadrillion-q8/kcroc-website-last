// File: src/components/seo/FAQSchema.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KCROC_GRAPH } from '../../data/graph';

export default function FAQSchema() {
  // Defensive check: if no FAQs exist, don't render an empty script tag
  if (!KCROC_GRAPH.faqs || KCROC_GRAPH.faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": KCROC_GRAPH.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.title, // Maps from your Knowledge Graph
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.description // Maps from your Knowledge Graph
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
