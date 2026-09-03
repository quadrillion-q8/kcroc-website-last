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
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur px-4 pt-3 flex gap-3"
      style={{ paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom)))' }}
    >
      <a
        href={`tel:+${phone}`}
        onClick={() => trackConversion('phone_call_click', { cta_name: 'sticky_mobile_call', button_position: 'bottom_bar' })}
        className="flex-1 text-center rounded-full border border-slate-700 text-slate-200 font-semibold py-3"
      >
        Call
      </a>
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversion('whatsapp_click', { cta_name: 'sticky_mobile_wa', button_position: 'bottom_bar' })}
        className="flex-[2] text-center rounded-full bg-cyan-500 text-slate-950 font-bold py-3"
      >
        WhatsApp a Technician
      </a>
    </div>
  );
};
