import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SchemaMarkup({ schema }: { schema: object }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
