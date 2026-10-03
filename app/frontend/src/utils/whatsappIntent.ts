// File: src/utils/whatsappIntent.ts
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;

type IntentContext = "blog" | "faq" | "location" | "service" | "general";

/**
 * 🩹 Single authoritative WhatsApp link builder. Every wa.me link on the site
 * should route through this (directly or via getIntentWhatsAppLink below)
 * instead of hand-rolling `https://wa.me/${phone}?text=...` inline — those
 * ad-hoc versions had drifted into real bugs (hardcoded phone numbers that
 * wouldn't update if business.telephone ever changes, and one file
 * with a fragile regex trying to re-derive the country code).
 *
 * Normalizes the phone number the same way everywhere (defaults to
 * business.telephone — the graph's single source of truth, see graph.ts
 * 'biz-kcroc' — strips any non-digits from a custom phone, and de-dupes a
 * leading "965" so it's never doubled).
 */
export const buildWhatsAppLink = (message?: string, phone?: string): string => {
  const digits = (phone ?? business.telephone).replace(/\D/g, '');
  const withCountryCode = digits.startsWith('965') ? digits : `965${digits}`;
  return message
    ? `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${withCountryCode}`;
};

/**
 * Dynamically generates WhatsApp links based on user context
 * for hyper-targeted sales conversions.
 */
export const getIntentWhatsAppLink = (context: IntentContext, entityName?: string): string => {
  let message = "";

  switch (context) {
    case "service":
      message = `Hi KCROC, I need help with ${entityName || 'my computer'}. Can I get a free quote?`;
      break;
    case "location":
      message = `Hi KCROC, I'm located in ${entityName || 'Kuwait'} and need to arrange a free pickup for my device.`;
      break;
    case "blog":
      message = `Hi KCROC, I was reading your guide on "${entityName}" and I'd like some professional help with this issue.`;
      break;
    case "faq":
      message = `Hi KCROC, I checked your FAQ regarding "${entityName}" but have a specific question about my repair.`;
      break;
    default:
      message = "Hi KCROC, I have a device that needs professional repair. Can you help?";
  }

  return buildWhatsAppLink(message);
};

/**
 * Context-aware WhatsApp entry point for the global mobile CTA.
 * It reads the current route so visitors on a service or location page start
 * a conversation with useful context instead of a generic message.
 */
export const getPageWhatsAppLink = (pathname: string): string => {
  const path = `/${pathname.replace(/^\/+|\/+$/g, '')}`;

  if (path === '/ar' || path.startsWith('/ar/')) {
    const slug = path.replace(/^\/ar\//, '');
    const arabicNames: Record<string, string> = {
      'laptop-repair-kuwait': 'تصليح لابتوب في الكويت',
      'computer-repair-kuwait': 'تصليح كمبيوتر في الكويت',
      'motherboard-repair-kuwait': 'تصليح المذربورد واللوحة الأم في الكويت',
      'gaming-pc-repair-kuwait': 'تصليح Gaming PC في الكويت',
      'laptop-screen-repair-kuwait': 'تبديل شاشة اللابتوب في الكويت',
      'macbook-repair-kuwait': 'تصليح MacBook في الكويت',
      'macbook-screen-replacement-kuwait': 'تبديل شاشة MacBook في الكويت',
      'battery-replacement-kuwait': 'تبديل بطارية اللابتوب في الكويت',
      'ssd-ram-upgrade-kuwait': 'ترقية SSD وRAM في الكويت',
      'gaming-laptop-repair-kuwait': 'تصليح Gaming Laptop في الكويت',
      'computer-repair-hawalli': 'تصليح كمبيوتر حولي',
    };
    const name = arabicNames[slug] ?? 'تصليح كمبيوتر ولابتوب في الكويت';
    return buildWhatsAppLink(`السلام عليكم KCROC، أحتاج ${name}. أريد أعرف طريقة الاستلام والتشخيص.`);
  }

  const service = KCROC_GRAPH.services.find((item) => `/${item.slug}` === path);
  if (service) return getIntentWhatsAppLink('service', service.title);

  const location = KCROC_GRAPH.locations.find((item) => `/location/${item.slug}` === path);
  if (location) return getIntentWhatsAppLink('location', location.title);

  const entity = KCROC_GRAPH.routableEntities.find((item) => {
    const canonicalPath = item.seo?.canonicalUrl?.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '';
    return canonicalPath === path;
  });

  if (entity && (path.startsWith('/blog/') || path.startsWith('/guides/') || path.startsWith('/case-studies/'))) {
    return getIntentWhatsAppLink('blog', entity.title);
  }

  return buildWhatsAppLink('Hi KCROC, I need help with a computer or laptop repair. Can you advise me on the next step?');
};
