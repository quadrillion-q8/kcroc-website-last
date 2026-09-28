// File: app/frontend/src/components/home/StickyMobileCTA.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const StickyMobileCTA = () => {
  const business = KCROC_GRAPH.business;
  const phone = business!.telephone;
  
  const { trackConversion } = useAnalytics();

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
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message KCROC on WhatsApp"
        onClick={() => trackConversion('whatsapp_click', { cta_name: 'sticky_mobile_wa', button_position: 'bottom_bar' })}
        className="flex-[2] text-center rounded-xl bg-[#25D366] text-slate-950 font-bold py-2.5 min-h-[44px] whatsapp-pulse touch-manipulation transition-transform active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        WhatsApp a Technician
      </a>
    </div>
  );
};
