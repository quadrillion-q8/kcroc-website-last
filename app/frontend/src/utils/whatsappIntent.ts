// File: src/utils/whatsappIntent.ts
import { BUSINESS_INFO } from '../constants/data';

type IntentContext = "blog" | "faq" | "location" | "service" | "general";

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

  return `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(message)}`;
};
