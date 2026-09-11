// File: app/frontend/src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.tsx';
import './index.css';

// 🩹 FIX: "Failed to fetch dynamically imported module: .../DesktopMegaMenu...js"
// (and the same error for any other React.lazy()-loaded chunk).
//
// Root cause: nearly every route/component in this app (App.tsx, Header.tsx,
// RootLayout.tsx, ...) is React.lazy()-loaded, each in its own content-hashed
// chunk file. Each new production deploy replaces the entire dist/ output,
// so any hashed chunk filename referenced by a PREVIOUSLY built HTML page
// (one a visitor already has open, has bfcache'd, or that a CDN/browser is
// still serving from cache) no longer exists once a new build goes live.
// The browser's dynamic `import()` then 404s with exactly this error, and
// since nothing here caught it, the visitor was stuck on a dead page (or a
// generic ErrorBoundary crash screen) until they manually hard-refreshed.
//
// Vite's build output wraps dynamic imports so that any such failure fires a
// `vite:preloadError` event on `window` (see Vite docs: "Load Error Handling
// for Preload"). We listen for it here, at the top of the entry point,
// before the SSG app even mounts, and force a real navigation reload to pull
// the fresh HTML + current chunk manifest — turning a dead page into a
// single, invisible refresh for the visitor.
//
// Guarded with sessionStorage so a *genuinely* broken deploy (chunk missing
// even after a fresh reload) reloads once and then falls through to the
// ErrorBoundary instead of reload-looping the visitor forever.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    const RELOAD_GUARD_KEY = 'kcroc:chunk-reload-attempted';
    if (sessionStorage.getItem(RELOAD_GUARD_KEY)) {
      // Already tried once this session — a hard reload didn't fix it, so
      // let the error surface normally (ErrorBoundary) rather than loop.
      return;
    }
    event.preventDefault();
    sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
    window.location.reload();
  });

  // Clear the guard once a page has loaded cleanly, so a stale chunk error
  // days from now doesn't get silently swallowed by a guard left over from
  // an old session.
  window.addEventListener('load', () => {
    sessionStorage.removeItem('kcroc:chunk-reload-attempted');
  });
}

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
