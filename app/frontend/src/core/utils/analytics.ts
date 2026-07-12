// File: app/frontend/src/core/utils/analytics.ts

// Declare the gtag function globally so TypeScript recognizes it on the window object
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Standardized GA4 Conversion Tracking for KCROC Enterprise
 * This ensures all "Money" events carry identical metadata structure.
 */
export const trackConversion = (
  eventName: 'whatsapp_click' | 'phone_call_click' | 'book_pickup_click',
  details: {
    button_position: 'header' | 'mobile_menu' | 'hero' | 'footer' | 'floating';
    service_id?: string;   // Maps to KCROC_GRAPH node ID
    service_name?: string; // Human-readable service title
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...details,
      // Automatically pull the exact page location at the time of click
      page_location: window.location.pathname, 
    });
  }
};
