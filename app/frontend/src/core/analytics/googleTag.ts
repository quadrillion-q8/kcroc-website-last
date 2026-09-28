// File: app/frontend/src/core/analytics/googleTag.ts
// Google Analytics 4 / Google tag loader for KCROC.
//
// This site uses a basic-consent implementation: the Google tag is not
// loaded until the visitor grants optional analytics consent. The measurement
// ID is public website configuration, not a secret.

const GOOGLE_ANALYTICS_MEASUREMENT_ID = 'G-H2BXCZJ8NX';
const GOOGLE_TAG_SCRIPT_ID = 'kcroc-google-tag-script';

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

const ensureGoogleTagQueue = (): void => {
  if (!isBrowser()) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: any[]) => {
    window.dataLayer!.push(args);
  });
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    __kcrocGoogleTagConfigured?: boolean;
  }
}

/**
 * Loads and configures the GA4 Google tag once.
 *
 * Pageviews are disabled at config time because KCROC is an SPA and the app
 * sends route-change page_view events itself. This avoids duplicate pageviews.
 */
export const loadGoogleTag = (): void => {
  if (!isBrowser()) return;
  if (window.__kcrocGoogleTagConfigured) return;

  ensureGoogleTagQueue();

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GOOGLE_ANALYTICS_MEASUREMENT_ID,
    )}`;
    document.head.appendChild(script);
  }

  // These calls are queued immediately, before the async script necessarily
  // finishes downloading. Any consent update queued before this point is
  // therefore preserved in the same dataLayer sequence.
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    send_page_view: false,
  });

  window.__kcrocGoogleTagConfigured = true;
};

