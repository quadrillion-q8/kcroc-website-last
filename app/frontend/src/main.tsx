// File: app/frontend/src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.tsx';
import './index.css';

// Dev-only Knowledge Graph Validation.
// We explicitly check typeof window so it doesn't crash during SSG
if (import.meta.env.DEV && typeof window !== 'undefined') {
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

// 🚀 NATIVE SSG ENTRY POINT
// ViteReactSSG automatically handles document.getElementById('root') 
// on the client, and safely bypasses it on the server.
export const createRoot = ViteReactSSG(
  { routes, basename: '/' }
);
