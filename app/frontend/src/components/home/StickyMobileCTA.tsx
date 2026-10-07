// File: app/frontend/src/components/home/StickyMobileCTA.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_GRAPH } from '../../data/navGraph.generated';
import { getPageWhatsAppLink } from '../../utils/whatsappIntent';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const StickyMobileCTA = () => {
  const phone = NAV_GRAPH.business.telephone;
  const { pathname } = useLocation();
  const { trackConversion } = useAnalytics();
  const whatsappLink = getPageWhatsAppLink(pathname);

  // Keep the visible promise identical to the action behind it. The sticky
  // bar always opens WhatsApp, so location pages explicitly say "via WhatsApp"
  // rather than implying a direct booking-form submission.
  const ctaLabel =
    pathname === '/pricing' ? 'Get Exact Price' :
    pathname.includes('battery') ? 'Battery Help' :
    pathname.includes('screen') ? 'Screen Price' :
    pathname.includes('gaming') ? 'Gaming Help' :
    pathname.includes('motherboard') ? 'Board Repair' :
    pathname.includes('macbook') ? 'MacBook Help' :
    pathname.startsWith('/location/') ? 'Book Pickup via WhatsApp' :
    pathname.startsWith('/guides/') || pathname.startsWith('/blog/') ? 'Ask a Technician' :
    'WhatsApp a Technician';

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-brand-dark/95 backdrop-blur px-3 pt-2.5 flex gap-2.5"
      style={{ paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom)))' }}
    >
      <a
        href={`tel:+${phone}`}
        onClick={() => trackConversion('phone_call_click', { cta_name: 'sticky_mobile_call', button_position: 'bottom_bar' })}
        className="flex-1 text-center rounded-xl border border-slate-700 text-slate-200 font-semibold py-2.5 min-h-[44px] touch-manipulation transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Call KCROC"
      >
        Call
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message KCROC on WhatsApp"
        onClick={() => trackConversion('whatsapp_click', { cta_name: 'sticky_mobile_wa', button_position: 'bottom_bar' })}
        className="flex-[2] text-center rounded-lg bg-[#25D366] text-slate-950 font-bold py-2.5 min-h-[44px] touch-manipulation transition-transform active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        {ctaLabel}
      </a>
    </div>
  );
};
