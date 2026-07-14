// File: app/frontend/src/components/home/LeadMagnet.tsx
import React, { useState } from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const LeadMagnet = () => {
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');
  
  const whatsappNumber = KCROC_GRAPH.business?.telephone ?? '96555301913';
  const { trackConversion } = useAnalytics();

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi KCROC, I need help with my ${device || 'device'}. Issue: ${
      issue || 'not sure yet'
    }`
  )}`;

  return (
    <section className="w-full py-24 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
          Not Sure What's Wrong?
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Get an Instant Price Estimate
        </h2>
        <p className="mt-4 text-slate-400">
          Tell us your device and symptom — we'll reply on WhatsApp with a
          ballpark price range, no commitment.
        </p>

        <form
          className="mt-10 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            // Fire the tracking event right before opening WhatsApp
            trackConversion('whatsapp_click', { cta_name: 'lead_magnet_submit', button_position: 'lead_magnet' });
            window.open(waLink, '_blank', 'noopener,noreferrer');
          }}
        >
          <input
            type="text"
            placeholder="e.g. MacBook Pro 2021"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
          <input
            type="text"
            placeholder="e.g. Won't turn on"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-colors text-slate-950 font-bold px-6 py-4"
          >
            Get My Free Estimate on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};
