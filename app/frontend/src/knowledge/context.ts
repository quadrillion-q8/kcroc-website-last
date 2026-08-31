// File: app/frontend/src/knowledge/context.ts
import { KCROC_GRAPH } from '../data/graph';
import { KCROC_POLICY } from '../constants/businessPolicy';

/**
 * Generates the System Prompt for the Gemini AI.
 * Dynamically pulls all data from the Knowledge Graph.
 * If graph.ts is updated, the AI learns it instantly on next deployment.
 */
export function getKnowledgeContext(userMessage: string): string {
  const business = KCROC_GRAPH.business;
  const mainLocation = KCROC_GRAPH.locations.find((l) => l.id === 'loc-hawalli');

  // 🚀 FIXED: real field names — business identity lives nested under
  // KCROC_GRAPH.business, not as top-level businessName/phone properties
  // (which don't exist and were silently always hitting the fallback).
  const businessName = business?.legalName ?? 'Kuwait Computer Repair On Call';
  const phone = business?.telephone ? `+${business.telephone}` : '+96555301913';

  let context = `You are the KCROC Assistant, an expert AI for a professional computer repair company in Kuwait.
Business Name: ${businessName}
Phone: ${phone}
Location: ${mainLocation?.landmark ?? 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19'}
Service Area: All Kuwait governorates — free pickup and delivery included.
`;

  // ─── ACTIVE SERVICES & PRICING ───────────────────────────────────
  // 🚀 FIXED: s.basePrice/turnaroundTime/repairTime don't exist on
  // ServiceEntity — real fields are s.pricing.startingFrom and
  // s.estimatedTurnaround. s.warranty is an object, not a string, so it
  // must be destructured, not interpolated directly (was producing
  // literal "[object Object]" in the prompt).
  const activeServices = KCROC_GRAPH.services
    ?.filter(service => service.isActive)
    .map(s => {
      const name = s.title ?? 'Service';
      const desc = s.description ?? '';
      const price = s.pricing
        ? `${s.pricing.displayLabel ?? `From ${s.pricing.startingFrom} ${s.pricing.currency}`}`
        : 'Free diagnostic — quote given before repair';
      const turnaround = s.estimatedTurnaround ?? 'Varies by repair';
      const warranty = s.warranty?.duration
        ? `${s.warranty.duration}${s.warranty.noFixNoFee ? ', No Fix No Fee' : ''}`
        : `${KCROC_POLICY.warranty.durationDays} days on all parts and labour`;
      return `- ${name}: ${desc} (Starting from: ${price}, Turnaround: ${turnaround}, Warranty: ${warranty})`;
    })
    .join('\n') ?? 'Contact us for service information.';
  context += `ACTIVE SERVICES:\n${activeServices}\n\n`;

  // ─── STORE POLICIES ──────────────────────────────────────────────
  // 🚀 FIXED: FAQEntity.description is a required one-line summary that
  // always exists, so `f.description ?? f.answer` never reached the real
  // answer field. Swapped to prefer the detailed answer, falling back to
  // the short description only if answer is somehow missing.
  const policies = KCROC_GRAPH.faqs
    ?.filter(faq => faq.isActive)
    .map(f => {
      const q = f.title ?? '';
      const a = f.answer ?? f.description ?? '';
      return `Q: ${q}\nA: ${a}`;
    })
    .join('\n\n') ?? '';
  if (policies) {
    context += `STORE POLICIES & FAQS:\n${policies}\n\n`;
  }

  // ─── STRICT AI GUIDELINES ────────────────────────────────────────
  context += `STRICT GUIDELINES:
- TOPIC FOCUS: Only answer questions about computers, laptops, hardware, software, tablets, and phones. Politely decline anything unrelated (plumbing, car repair, cooking, etc.).
- NO EXACT PRICING: Never invent or state an exact price. If asked, say exactly: "Prices vary based on your specific model, but we can give you a free estimate if you contact us on WhatsApp."
- NEVER mention data recovery — this service has been discontinued.
- ESCALATION: If the user describes physical damage (cracked screen, liquid spill, broken hinge, smoke/burning smell) or sounds frustrated or upset, immediately tell them to contact a human technician on WhatsApp — do not try to diagnose or troubleshoot it yourself.
- CONTACT INFO: Always remind the user they can reach a human technician directly by calling or messaging on WhatsApp at ${phone}.
- TONE: Be helpful, professional, and polite. Keep answers simple enough for a 4th grader to understand — avoid technical jargon, or explain it plainly if you must use it.
- Free pickup and delivery is always included — mention this proactively.
- All repairs carry a ${KCROC_POLICY.warranty.durationDays}-day warranty — mention this when discussing pricing.
- Same-day service is available for eligible repairs booked before 11:00 AM.
- Current user message: "${userMessage}"`;

  return context;
}
