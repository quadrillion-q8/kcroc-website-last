// File: src/utils/analytics.ts

/**
 * Reusable utility to track lead generation events across the KCROC website.
 */
export const trackLead = (buttonName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: buttonName
    });
    console.log(`[Analytics] Tracked Lead: ${buttonName}`);
  }
};

/**
 * NEW: Reusable utility to manually report page views to Google Analytics.
 * @param path - The current URL path (e.g., "/gallery" or "/services")
 */
export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-H2BXCZJ8NX', {
      page_path: path,
    });
    console.log(`[Analytics] Tracked Page View: ${path}`);
  }
};
