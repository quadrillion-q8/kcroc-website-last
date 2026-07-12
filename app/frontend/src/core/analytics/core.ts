// File: app/frontend/src/core/analytics/core.ts
import { AnalyticsEvent, BaseEventPayload, DeviceType, SystemMetadata, BookingEvent } from './types';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ANALYTICS_DEBUG = import.meta.env?.DEV || false;

/**
 * Uses CSS media queries to accurately classify device categories,
 * accounting for zoom states and orientations better than innerWidth.
 */
const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia('(max-width: 767px)').matches) return 'mobile';
  if (window.matchMedia('(max-width: 1023px)').matches) return 'tablet';
  return 'desktop';
};

export const getSystemMetadata = (): SystemMetadata => {
  return {
    page_title: typeof document !== 'undefined' ? document.title : '',
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    device_type: getDeviceType(),
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
  };
};

export const trackEvent = (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload = {}): void => {
  // TODO: Future integration point for Consent Management (e.g., if (!hasConsent) return;)

  try {
    const fullyCompiledPayload = {
      ...getSystemMetadata(),
      ...payload,
    };

    if (ANALYTICS_DEBUG) {
      console.groupCollapsed(`📊 [Analytics Event]: ${event}`);
      console.table(fullyCompiledPayload);
      console.groupEnd();
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, fullyCompiledPayload);
    }
  } catch (error) {
    if (ANALYTICS_DEBUG) {
      console.warn('⚠️ [Analytics Error]: Failed to dispatch event', error);
    }
  }
};
