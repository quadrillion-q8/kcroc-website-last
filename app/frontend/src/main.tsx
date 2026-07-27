// File: app/frontend/src/main.tsx
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Imported to enable SEO management
import App from './App.tsx';
import './index.css';

// Dev-only Knowledge Graph Validation.
// Validates rawGraphData (the exact { metadata, entities } shape RawGraphSchema
// describes) rather than KCROC_GRAPH, which layers many derived properties
// (business, services, pages, etc.) on top that aren't part of the schema.
if (import.meta.env.DEV) {
  Promise.all([
    import('./types/knowledgeGraph'),
    import('./data/graph'),
  ]).then(([{ RawGraphSchema }, { rawGraphData }]) => {
    const result = RawGraphSchema.safeParse(rawGraphData);
    if (!result.success) {
      console.error('🚨 graph.ts failed Zod schema validation:\n', result.error.format());
    } else {
      console.log('✅ Knowledge Graph schema validated successfully.');
    }
  }).catch((err) => {
    console.error('Failed to load graph validation schema:', err);
  });
}

createRoot(document.getElementById('root')!).render(
  <HelmetProvider> {/* Application wrapped to provide SEO context */}
    <App />
  </HelmetProvider>
);
