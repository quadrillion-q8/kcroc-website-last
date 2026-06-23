import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
