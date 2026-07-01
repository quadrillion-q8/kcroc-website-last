// File: app/frontend/src/analytics/Telemetry.ts

// 1. We strictly define the types of events so no one can make a spelling mistake
export type EventCategory = 'Contact' | 'Navigation' | 'Service' | 'Booking';

export interface TrackingEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

// 2. The master function that all buttons will talk to
export const trackEvent = ({ category, action, label, value }: TrackingEvent) => {
  // Always log to the console so we can see it working while developing
  console.log(`📊 [Telemetry] ${category} | ${action} | ${label || 'N/A'}`);

  // Future-proofing: Automatically sends to Google Analytics (GA4) if installed
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Future-proofing: Automatically sends to Meta/Facebook Pixel if installed
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', action, {
      category: category,
      label: label,
      value: value,
    });
  }
};
