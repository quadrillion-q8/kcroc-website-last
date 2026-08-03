// File: app/frontend/src/main.tsx
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Dev-only Knowledge Graph Validation.
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

const rootElement = document.getElementById('root')!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// 🚀 HYDRATION LOGIC: 
// If the HTML is already pre-rendered by Vite (has child nodes), we hydrate it.
// Otherwise (like in local dev mode), we render it from scratch.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
