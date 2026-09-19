// File: app/frontend/src/core/privacy/consent.ts
// Centralized client-side consent state for optional analytics/advertising.
// This is intentionally separate from the UI so analytics cannot accidentally
// bypass the user's choice from another component.

export type ConsentState = 'unknown' | 'granted' | 'denied';

const CONSENT_STORAGE_KEY = 'kcroc-cookie-consent';
const CONSENT_EVENT = 'kcroc:consent-changed';

interface ConsentEventDetail {
  state: Exclude<ConsentState, 'unknown'>;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const isBrowser = (): boolean => typeof window !== 'undefined';

export const getConsentState = (): ConsentState => {
  if (!isBrowser()) return 'unknown';

  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return 'unknown';
};

export const hasAnalyticsConsent = (): boolean => getConsentState() === 'granted';
export const hasAdvertisingConsent = (): boolean => getConsentState() === 'granted';

const ensureGoogleTagQueue = (): void => {
  if (!isBrowser()) return;

  window.dataLayer = window.dataLayer || [];

  // Standard gtag queue stub. This is harmless until a Google tag is added,
  // and it ensures consent defaults are queued before any future Google tag
  // can send measurement or advertising signals.
  window.gtag = window.gtag || ((...args: any[]) => {
    window.dataLayer!.push(args);
  });
};

const consentSignalsFor = (state: 'granted' | 'denied') => ({
  analytics_storage: state,
  ad_storage: state,
  ad_user_data: state,
  ad_personalization: state,
});

export const applyGoogleConsent = (state: 'granted' | 'denied'): void => {
  if (!isBrowser()) return;

  ensureGoogleTagQueue();
  window.gtag?.('consent', 'update', consentSignalsFor(state));
};

export const initializeGoogleConsent = (): void => {
  if (!isBrowser()) return;

  ensureGoogleTagQueue();

  // Default to denied before any future Google measurement/advertising tag is
  // allowed to run. A previously saved explicit grant is applied immediately.
  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });

  const stored = getConsentState();
  if (stored === 'granted') applyGoogleConsent('granted');
}

export const setConsentState = (state: 'granted' | 'denied'): void => {
  if (!isBrowser()) return;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
  applyGoogleConsent(state);
  window.dispatchEvent(
    new CustomEvent<ConsentEventDetail>(CONSENT_EVENT, { detail: { state } })
  );
};

export const subscribeToConsentChanges = (
  listener: (state: Exclude<ConsentState, 'unknown'>) => void,
): (() => void) => {
  if (!isBrowser()) return () => undefined;

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ConsentEventDetail>;
    const state = customEvent.detail?.state;
    if (state === 'granted' || state === 'denied') listener(state);
  };

  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
};

export const openConsentPreferences = (): void => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { state: getConsentState() === 'granted' ? 'granted' : 'denied' } }));
  window.dispatchEvent(new CustomEvent('kcroc:open-consent-preferences'));
};
