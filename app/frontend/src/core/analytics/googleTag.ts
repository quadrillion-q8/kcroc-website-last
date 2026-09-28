// File: app/frontend/src/core/analytics/googleTag.ts
// Google tag (GA4) is now loaded directly from index.html with Consent Mode v2
// (defaults denied, upgraded by the cookie banner). This module is kept only
// so existing imports keep working; loading here would double-configure GA4.

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Intentionally a no-op: the tag is loaded and configured in index.html.
export const loadGoogleTag = (): void => {};
