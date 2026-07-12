// File: app/frontend/src/core/analytics/trackers.ts
import { trackEvent } from './core';
import { EntityMetadata, CTAName, ButtonPosition, AnalyticsEvent, BookingEvent } from './types';

export const trackPageView = (): void => {
  trackEvent('page_view'); // Title is now strictly managed by core.ts reading document.title
};

export const trackEntityView = (entityMetadata: Partial<EntityMetadata>): void => {
  const eventMap: Record<string, AnalyticsEvent> = {
    Service: 'service_view',
    Brand: 'brand_view',
    Problem: 'problem_view',
    Location: 'location_view',
    Blog: 'blog_view',
  };
  const resolvedEvent = entityMetadata.entity_type 
    ? (eventMap[entityMetadata.entity_type] || 'page_view') 
    : 'page_view';
    
  trackEvent(resolvedEvent, entityMetadata);
};

export const trackConversion = (
  event: 'whatsapp_click' | 'phone_call_click' | 'book_pickup_click' | 'cta_click',
  ctaDetails: { cta_name: CTAName; button_position: ButtonPosition },
  entityContext?: Partial<EntityMetadata>
): void => {
  trackEvent(event, {
    ...ctaDetails,
    ...entityContext,
  });
};

export const trackBookingStatus = (
  stage: BookingEvent, // ✅ Strict typing enforced
  details: { booking_type: 'pickup' | 'walk_in'; location_context?: string },
  entityContext?: Partial<EntityMetadata>
): void => {
  trackEvent(stage, {
    ...details,
    ...entityContext,
  });
};

export const trackUIInteraction = (
  event: 'faq_expand' | 'gallery_image_open' | 'gallery_video_play',
  elementLabel: string,
  entityContext?: Partial<EntityMetadata>
): void => {
  trackEvent(event, {
    element_label: elementLabel,
    ...entityContext,
  });
};
