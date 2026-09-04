// File: app/frontend/src/components/seo/SchemaMarkup.tsx
import React from 'react';

interface SchemaMarkupProps {
  schema?: Record<string, any>;
}

export default function SchemaMarkup({ schema = {} }: SchemaMarkupProps) {
  // Safely extract incoming schema arrays or objects
  const additionalGraph = schema["@graph"] 
    ? schema["@graph"] 
    : (Object.keys(schema).length > 0 ? [schema] : []);

  // If no specific graph nodes are passed, do not render an empty script block.
  // SEOEngine.tsx is handling the base LocalBusiness schema globally; self-hosted AggregateRating markup is intentionally not emitted.
  if (additionalGraph.length === 0) return null;

  const mergedSchema = {
    "@context": "https://schema.org",
    "@graph": additionalGraph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedSchema) }}
    />
  );
}
