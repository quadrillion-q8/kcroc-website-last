// File: app/frontend/src/core/analytics/types.ts

export type AnalyticsEvent =
  | 'page_view'
  | 'service_view'
  | 'problem_view'
  | 'brand_view'
  | 'location_view'
  | 'blog_view'
  | 'faq_expand'
  | 'gallery_image_open'
  | 'gallery_video_play'
  | 'whatsapp_click'
  | 'phone_call_click'
  | 'book_pickup_click'
  | 'contact_submit'
  | 'internal_search'
  | 'cta_click';

export type BookingEvent = 'begin_booking' | 'booking_complete' | 'booking_cancelled';

export type EntityType = 'Service' | 'Brand' | 'Problem' | 'Location' | 'Blog' | 'General';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type CTAName =
  | 'hero_primary'
  | 'hero_secondary'
  | 'sticky_mobile'
  | 'floating_whatsapp'
  | 'footer_call'
  | 'header_book'
  | 'header_phone'
  | 'mega_menu_card'
  | 'mega_menu_link'
  | 'mobile_menu_service'
  | 'mobile_menu_whatsapp'
  | 'mobile_menu_call'
  | 'body_embedded';

export type ButtonPosition = 'header' | 'mobile_menu' | 'hero' | 'footer' | 'floating' | 'body';

export interface EntityMetadata {
  entity_id: string;
  entity_type: EntityType;
  entity_slug: string;
  primary_keyword?: string;
  location_context?: string;
  brand_context?: string;
  problem_context?: string;
}

export interface SystemMetadata {
  page_title: string;
  page_location: string;
  page_url: string;
  device_type: DeviceType;
  language: string;
}

export interface BaseEventPayload extends Partial<SystemMetadata>, Partial<EntityMetadata> {
  [key: string]: any;
}
