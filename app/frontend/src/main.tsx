// File: app/frontend/src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.tsx';
import './index.css';
import { initializeGoogleConsent } from './core/privacy/consent';

// Consent defaults must be queued before the React app mounts so future
// Google measurement/advertising tags cannot observe optional signals before
// the visitor has made a choice.
initializeGoogleConsent();

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
  const CHUNK_RELOAD_GUARD_KEY = 'kcroc:chunk-reload-attempted';
  const SSG_MANIFEST_RELOAD_GUARD_KEY = 'kcroc:ssg-manifest-reload-attempted';

  const getErrorText = (value: unknown): string => {
    if (value instanceof Error) {
      return [value.name, value.message, value.stack].filter(Boolean).join(' ');
    }

    if (typeof value === 'string') return value;

    if (value && typeof value === 'object') {
      const candidate = value as { message?: unknown; stack?: unknown; cause?: unknown };
      return [
        candidate.message,
        candidate.stack,
        candidate.cause instanceof Error ? candidate.cause.message : candidate.cause
      ]
        .filter(Boolean)
        .map(String)
        .join(' ');
    }

    return String(value ?? '');
  };

  const isStaleSsgManifestError = (value: unknown): boolean => {
    const text = getErrorText(value);
    const mentionsManifest = /static-loader-data-manifest(?:-[^\s/'"]+)?/i.test(text);
    const looksLikeInvalidManifestJson = /unexpected token|not valid json|json\.parse/i.test(text) && /manifest/i.test(text);
    return mentionsManifest || looksLikeInvalidManifestJson;
  };

  const reloadOnce = (guardKey: string): boolean => {
    if (sessionStorage.getItem(guardKey)) return false;
    sessionStorage.setItem(guardKey, '1');
    window.location.reload();
    return true;
  };

  window.addEventListener('vite:preloadError', (event) => {
    if (sessionStorage.getItem(CHUNK_RELOAD_GUARD_KEY)) {
      // Already tried once this session — a hard reload didn't fix it, so
      // let the error surface normally (ErrorBoundary) rather than loop.
      return;
    }
    event.preventDefault();
    reloadOnce(CHUNK_RELOAD_GUARD_KEY);
  });

  // vite-react-ssg can fetch build-time loader data from a generated manifest
  // during client-side navigations. If a browser or intermediary has retained
  // HTML from an older deployment, that HTML can point at a manifest filename
  // that is no longer present in the current deployment. Recover from that
  // narrowly-targeted failure with one reload instead of leaving the visitor
  // on an "Unexpected Application Error" screen.
  const handleStaleSsgManifestError = (event: PromiseRejectionEvent | ErrorEvent) => {
    const value = event instanceof PromiseRejectionEvent ? event.reason : event.error ?? event.message;
    if (!isStaleSsgManifestError(value)) return;

    event.preventDefault?.();
    reloadOnce(SSG_MANIFEST_RELOAD_GUARD_KEY);
  };

  window.addEventListener('unhandledrejection', (event) => handleStaleSsgManifestError(event));
  window.addEventListener('error', (event) => handleStaleSsgManifestError(event));

  // Clear the guards once a page has loaded cleanly, so a later, unrelated
  // stale-build event is not blocked by a guard left behind from an old load.
  window.addEventListener('load', () => {
    sessionStorage.removeItem(CHUNK_RELOAD_GUARD_KEY);
    sessionStorage.removeItem(SSG_MANIFEST_RELOAD_GUARD_KEY);
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
