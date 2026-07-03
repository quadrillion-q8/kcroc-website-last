// File: app/frontend/src/knowledge/context.ts
import { KCROC_GRAPH } from '../data/graph';

/**
 * Generates the System Prompt for the Gemini AI.
 * Dynamically pulls all data from the Knowledge Graph.
 * If graph.ts is updated, the AI learns it instantly on next deployment.
 */
export function getKnowledgeContext(userMessage: string): string {

  // ✅ Fixed: pull business identity from graph, not hardcoded strings
  const mainLocation = KCROC_GRAPH.entities?.['loc-hawalli'];
  const businessName = KCROC_GRAPH.businessName ?? 'Kuwait Computer Repair On Call';
  const phone        = KCROC_GRAPH.phone ?? '+96555301913';

  let context = `You are the KCROC Assistant, an expert AI for a professional computer repair company in Kuwait.
Business Name: ${businessName}
Phone: ${phone}
Location: ${mainLocation?.landmark ?? 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19'}
Service Area: All Kuwait governorates — free pickup and delivery included.

`;

  // ─── ACTIVE SERVICES & PRICING ───────────────────────────────────
  // ✅ Fixed: defensive field access — graph field names may differ from registry
  const activeServices = KCROC_GRAPH.services
    ?.filter(service => service.isActive)
    .map(s => {
      const name        = s.title ?? s.name ?? 'Service';
      const desc        = s.description ?? '';
      const price       = s.basePrice != null ? `${s.basePrice} KWD` : 'Free diagnostic — quote given before repair';
      const turnaround  = s.turnaroundTime ?? s.repairTime ?? 'Varies by repair';
      const warranty    = s.warranty ?? '30 days on all parts and labour';
      return `- ${name}: ${desc} (Starting from: ${price}, Turnaround: ${turnaround}, Warranty: ${warranty})`;
    })
    .join('\n') ?? 'Contact us for service information.';

  context += `ACTIVE SERVICES:\n${activeServices}\n\n`;

  // ─── STORE POLICIES ──────────────────────────────────────────────
  const policies = KCROC_GRAPH.faqs
    ?.filter(faq => faq.isActive)
    .map(f => {
      const q = f.title ?? f.question ?? '';
      const a = f.description ?? f.answer ?? '';
      return `Q: ${q}\nA: ${a}`;
    })
    .join('\n\n') ?? '';

  if (policies) {
    context += `STORE POLICIES & FAQS:\n${policies}\n\n`;
  }

  // ─── STRICT AI GUIDELINES ────────────────────────────────────────
  context += `STRICT GUIDELINES:
- Be concise, professional, and reassuring.
- NEVER invent prices. If a price is not listed above, say it requires a free diagnostic first.
- NEVER mention data recovery — this service has been discontinued.
- NEVER invent services. If a customer asks about something unrelated (plumbing, car repair, cooking), politely decline.
- Always encourage booking or calling ${phone} for liquid damage, dead devices, or urgent cases.
- Free pickup and delivery is always included — mention this proactively.
- All repairs carry a 30-day warranty — mention this when discussing pricing.
- Same-day service is available for eligible repairs booked before 11:00 AM.
- Current user message: "${userMessage}"`;

  return context;
}
