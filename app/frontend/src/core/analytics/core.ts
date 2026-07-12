// File: app/frontend/src/core/analytics/core.ts
import { AnalyticsEvent, BaseEventPayload, DeviceType, SystemMetadata } from './types';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Evaluates viewports dynamically to accurately classify device categories
 */
const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Detects baseline acquisition channels based on referrer tokens
 */
const getTrafficSource = (): string => {
  if (typeof document === 'undefined' || !document.referrer) return 'direct';
  const ref = document.referrer.toLowerCase();
  if (ref.includes('google.') || ref.includes('bing.')) return 'organic';
  if (ref.includes('facebook.com') || ref.includes('instagram.com') || ref.includes('t.co')) return 'social';
  return 'referral';
};

/**
 * Gathers active system states automatically to clean up tracking payloads
 */
export const getSystemMetadata = (): SystemMetadata => {
  return {
    page_title: typeof document !== 'undefined' ? document.title : '',
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    device_type: getDeviceType(),
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
    traffic_source: getTrafficSource(),
  };
};

/**
 * Central event pipeline that feeds compiled records directly to GA4
 */
export const trackEvent = (event: AnalyticsEvent, payload: BaseEventPayload = {}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    const fullyCompiledPayload = {
      ...getSystemMetadata(),
      ...payload,
    };
    window.gtag('event', event, fullyCompiledPayload);
  }
};
