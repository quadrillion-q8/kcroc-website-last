// File: app/frontend/src/core/analytics/trackers.ts
import { trackEvent } from './core';
import { EntityMetadata, CTAName, ButtonPosition, AnalyticsEvent } from './types';

/**
 * Tracks standard page views with system environment variables auto-resolved
 */
export const trackPageView = (customTitle?: string): void => {
  trackEvent('page_view', customTitle ? { page_title: customTitle } : {});
};

/**
 * Tracks specific entries into Knowledge Graph nodes (Services, Brands, Problems)
 */
export const trackEntityView = (entity: EntityMetadata): void => {
  const eventMap: Record<string, AnalyticsEvent> = {
    Service: 'service_view',
    Brand: 'brand_view',
    Problem: 'problem_view',
    Location: 'location_view',
    Blog: 'blog_view',
  };
  const resolvedEvent = eventMap[entity.entity_type] || 'page_view';
  trackEvent(resolvedEvent, entity);
};

/**
 * Captures all commercial call-to-action interactions across the storefront
 */
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

/**
 * Monitors booking workflow stages from initial setup through completion
 */
export const trackBookingStatus = (
  stage: 'begin_booking' | 'booking_complete' | 'booking_cancelled',
  details: { booking_type: 'pickup' | 'walk_in'; location_context?: string },
  entityContext?: Partial<EntityMetadata>
): void => {
  trackEvent(stage as any, {
    ...details,
    ...entityContext,
  });
};

/**
 * Records engagement metrics inside specialized UI blocks
 */
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
