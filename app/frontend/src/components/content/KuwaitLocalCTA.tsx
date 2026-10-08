// File: src/components/content/KuwaitLocalCTA.tsx
import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';
import { trackLead } from '../../utils/analytics';

const business = KCROC_GRAPH.business!;

/**
 * Detects a visitor browsing from Kuwait using only browser signals
 * (no IP lookup, no third-party calls, nothing stored). Most Windows-tutorial
 * traffic is international and will never book a repair; Kuwait visitors are
 * the ones who can, so only they see this local call-to-action.
 */
const isKuwaitVisitor = (): boolean => {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kuwait') return true;
  } catch {
    /* ignore */
  }
  try {
    return typeof navigator !== 'undefined' && /-KW$/i.test(navigator.language || '');
  } catch {
    return false;
  }
};

interface KuwaitLocalCTAProps {
  /** What the reader is looking at, used to pre-fill the WhatsApp message. */
  topic: string;
  /** Short label for analytics, e.g. "blog_post" or "gamebar_guide". */
  placement: string;
}

/**
 * Kuwait-only repair CTA for informational pages. Renders nothing during
 * prerender and on the first client paint (so SSG output and hydration stay
 * identical for everyone), then appears only for Kuwait visitors.
 */
export const KuwaitLocalCTA: React.FC<KuwaitLocalCTAProps> = ({ topic, placement }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isKuwaitVisitor());
  }, []);

  if (!show) return null;

  const waLink = buildWhatsAppLink(
    `Hi KCROC, I'm in Kuwait and was reading "${topic}". I'd like help with my device.`,
  );

  return (
    <aside
      aria-label="Computer repair in Kuwait"
      className="my-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 sm:p-6"
    >
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-cyan-300">
        <MapPin size={16} aria-hidden="true" /> In Kuwait? We can fix this in person
      </p>
      <p className="mt-2 text-base text-slate-200">
        Free pickup &amp; drop anywhere in Kuwait, No Fix No Fee, and a 30-day warranty. Our Hawalli
        lab is open daily 10 AM to 10 PM.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead('Kuwait_Local_CTA_WhatsApp', { placement })}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 transition-colors hover:bg-cyan-400"
        >
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp for a free quote
        </a>
        <a
          href={`tel:+965${business.telephone.replace(/\D/g, '').replace(/^965/, '')}`}
          onClick={() => trackLead('Kuwait_Local_CTA_Call', { placement })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-5 py-3 font-black text-white transition-colors hover:bg-slate-700"
        >
          <Phone size={18} aria-hidden="true" /> Call now
        </a>
      </div>
    </aside>
  );
};

export default KuwaitLocalCTA;
