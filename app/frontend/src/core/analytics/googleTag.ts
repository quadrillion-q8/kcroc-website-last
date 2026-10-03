// File: app/frontend/src/core/analytics/googleTag.ts
// Google Analytics is currently loaded directly from index.html, while the
// GTM container is also installed there as the future tag-management layer.
// Keep this module as a stable compatibility shim for existing imports.

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// The GTM container is initialized by index.html. We intentionally do not
// load or configure another Google tag from this module, which prevents
// duplicate analytics initialization.
export const loadGoogleTag = (): void => {};
