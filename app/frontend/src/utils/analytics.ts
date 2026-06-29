// File: app/frontend/src/utils/analytics.ts

/**
 * Reusable utility to track lead generation events across the KCROC website.
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
 * Automatically logs a tracked WhatsApp conversion action path.
 */
export const trackWhatsAppClick = (location: string) => {
  trackLead(`WhatsApp Click - Page: ${location}`, {
    lead_type: 'whatsapp',
    action_location: location
  });
};

/**
 * Automatically logs a tracked Voice Phone Call conversion action path.
 */
export const trackCallClick = (location: string) => {
  trackLead(`Phone Call Click - Page: ${location}`, {
    lead_type: 'phone_call',
    action_location: location
  });
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-H2BXCZJ8NX', {
      page_path: path,
    });
    console.log(`[Analytics] Tracked Page View: ${path}`);
  }
};
