// File: app/frontend/src/utils/analytics.ts

/**
 * Reusable utility to track lead generation events across the KCROC website.
 * Unified under GA4's native 'generate_lead' event for seamless Google Ads conversion mapping.
 */
export const trackLead = (buttonName: string, additionalParams?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: buttonName,
      ...additionalParams
    });
    console.log(`[Analytics] Tracked Lead: ${buttonName}`, additionalParams || '');
  }
};

/**
 * Specialized tracking hook for WhatsApp interaction conversion paths.
 * @param location - Where the click occurred (e.g., "Sticky Floating Button", "Hero Section", "Footer")
 */
export const trackWhatsAppClick = (location: string) => {
  trackLead(`WhatsApp Click - ${location}`, {
    lead_type: 'whatsapp',
    action_location: location
  });
};

/**
 * Specialized tracking hook for Direct Voice Call interaction conversion paths.
 * @param location - Where the click occurred (e.g., "Navbar Call Button", "Hero Section", "Contact Card")
 */
export const trackCallClick = (location: string) => {
  trackLead(`Phone Call Click - ${location}`, {
    lead_type: 'phone_call',
    action_location: location
  });
};

/**
 * Reusable utility to manually report page views to Google Analytics.
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
