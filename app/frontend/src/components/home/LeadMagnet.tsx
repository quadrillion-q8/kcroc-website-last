// File: app/frontend/src/components/home/LeadMagnet.tsx
import React, { useState } from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export const LeadMagnet = () => {
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');
  
  const whatsappNumber = KCROC_GRAPH.business!.telephone;
  const { trackConversion } = useAnalytics();

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi KCROC, I need help with my ${device || 'device'}. Issue: ${
      issue || 'not sure yet'
    }`
  )}`;

  return (
    <section className="w-full py-12 sm:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl flex flex-col lg:flex-row relative z-10">
        
        {/* Form Section */}
        <div className="p-8 sm:p-12 lg:w-1/2 flex flex-col justify-center">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Not Sure What's Wrong?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Get an Instant Price Estimate
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Tell us your device and symptom — we'll reply on WhatsApp with a
            ballpark price range, no commitment.
          </p>

          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Fire the tracking event right before opening WhatsApp
              trackConversion('whatsapp_click', { cta_name: 'lead_magnet_submit', button_position: 'lead_magnet' });
              window.open(waLink, '_blank', 'noopener,noreferrer');
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="e.g. MacBook Pro 2021"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                required
              />
              <input
                type="text"
                placeholder="e.g. Won't turn on"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 font-bold text-slate-950 py-4 px-6 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <MessageCircle className="w-5 h-5" /> Get WhatsApp Estimate
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[auto] overflow-hidden group border-t lg:border-t-0 lg:border-l border-slate-800">
          {/* 🚀 PERF FIX: was serving the full 1600x873 (55 KB) source into a
              ~380x163 mobile slot. Responsive <picture> now serves a
              pre-sized variant instead. */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/home/laptop-repair-success-restoration-640.webp" />
            <img 
              src="/images/home/laptop-repair-success-restoration-960.webp" 
              alt="Successful Laptop Hardware Restoration at KCROC" 
              width="960"
              height="524"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              loading="lazy"
            />
          </picture>
          {/* Gradients to blend the image seamlessly into the form card */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:hidden"></div>
          
          {/* Status Badge overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-end">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tested &amp; Ready for Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
