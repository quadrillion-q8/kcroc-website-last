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
