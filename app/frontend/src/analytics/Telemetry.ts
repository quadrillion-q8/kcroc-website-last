// File: app/frontend/src/analytics/Telemetry.ts

// 1. We strictly define the types of events so developers don't make spelling mistakes
export type EventCategory = 'Contact' | 'Navigation' | 'Service' | 'Booking';

export interface TrackingEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

// 2. The master function that all buttons will call
export const trackEvent = ({ category, action, label, value }: TrackingEvent) => {
  // Always log to the console for developer testing
  console.log(`📊 [Telemetry] ${category} | ${action} | ${label || 'N/A'}`);

  // Future-proofing: If Google Analytics (gtag) is installed, send the data to Google!
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Future-proofing: If Meta/Facebook Pixel (fbq) is installed, send the data to Meta!
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', action, {
      category: category,
      label: label,
      value: value,
    });
  }
};
