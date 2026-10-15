// File: app/frontend/src/core/components/RouteErrorBoundary.tsx
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

// 🩹 FIX: "Unexpected Application Error! Unexpected token 'T', "The page c"...
// is not valid JSON".
//
// vite-react-ssg fetches a build-time `static-loader-data-manifest-<hash>.json`
// during client-side navigation. Every deploy produces a new hash, so a tab
// (or cached HTML) from the previous deploy asks for a manifest that no
// longer exists. Vercel answers with a plain-text "The page could not be
// found", `response.json()` throws a SyntaxError, and React Router — having
// no `errorElement` configured — rendered its default developer error screen.
//
// That error is thrown *inside* the router, so the window-level handlers in
// main.tsx (and the class ErrorBoundary inside RootLayout) never see it. This
// component is mounted as the top-level route `errorElement` so the router
// hands it that error. For stale-deploy failures it reloads once to pick up
// the fresh HTML and manifest; anything else gets a normal branded fallback.
//
// NOTE: this file must stay in the main bundle (do not lazy-load it). If the
// chunk that failed is the one that would render the error screen, recovery
// would be impossible.

const RELOAD_AT_KEY = 'kcroc:route-error-reload-at';
// A reload that lands back on the same error within this window is treated as
// a genuine failure, not a stale deploy — show the fallback instead of looping.
const RELOAD_WINDOW_MS = 30_000;

const getErrorText = (error: unknown): string => {
  if (error instanceof Error) {
    return [error.name, error.message].filter(Boolean).join(' ');
  }
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const candidate = error as { message?: unknown; statusText?: unknown };
    return [candidate.message, candidate.statusText].filter(Boolean).map(String).join(' ');
  }
  return String(error ?? '');
};

// Errors that mean "the HTML/JS in this tab belongs to an older deploy":
//  - a manifest / loader-data JSON fetch that 404'd and failed to parse
//  - a lazy route chunk whose hashed filename no longer exists
// Only evaluated for errors that reached the router's errorElement, so a
// generic JSON parse failure elsewhere in the app cannot trigger a reload.
const isStaleDeployError = (error: unknown): boolean =>
  /static-loader-data|manifest|unexpected token|not valid json|json\.parse|unexpected end of json|failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|loading chunk .* failed/i.test(
    getErrorText(error)
  );

// Returns true if a reload was started. Never reloads twice inside the window,
// and never reloads if sessionStorage is unavailable (can't prove no loop).
const reloadOnceForStaleDeploy = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_AT_KEY));
    if (last && Date.now() - last < RELOAD_WINDOW_MS) return false;
    window.sessionStorage.setItem(RELOAD_AT_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
};

const WA_LINK = buildWhatsAppLink();

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const stale = !isRouteErrorResponse(error) && isStaleDeployError(error);
  const [reloading, setReloading] = React.useState(stale);

  React.useEffect(() => {
    console.error('Route error:', error);
    if (!stale) return;
    // If the guard blocks the reload (already tried recently), fall back to
    // the manual UI below.
    if (!reloadOnceForStaleDeploy()) setReloading(false);
  }, [error, stale]);

  const heading = reloading
    ? 'Updating the site…'
    : stale
      ? 'This page needs a refresh.'
      : 'Something went wrong.';

  const body = reloading
    ? "We've just shipped an update and this page is reloading to load it."
    : stale
      ? 'The site was updated while this tab was open. Please reload to get the latest version.'
      : 'We experienced a technical issue loading this page.';

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-brand-dark text-slate-50"
    >
      <h1 className="text-2xl font-extrabold text-cyan-400 mb-4">{heading}</h1>
      <p className="text-slate-300 mb-6 max-w-md">{body}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {stale && !reloading && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Reload page
          </button>
        )}
        <a href="/" className="px-6 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
          Return Home
        </a>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Contact via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default RouteErrorBoundary;
