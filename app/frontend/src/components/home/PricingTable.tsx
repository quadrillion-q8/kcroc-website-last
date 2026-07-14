// File: app/frontend/src/components/home/PricingTable.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const PricingTable = () => {
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );

  const business = KCROC_GRAPH.business;
  const whatsappNumber = business?.telephone ?? '96555301913';
  
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section className="w-full py-24 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
            No Hidden Fees
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Transparent Pricing
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <a
              key={service.id}
              href={`/${service.slug}`}
              onClick={() => trackConversion('cta_click', { cta_name: 'pricing_service_card', button_position: 'pricing_table' })}
              className="flex items-center justify-between bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 rounded-2xl px-6 py-5 transition-all"
            >
              <div>
                <p className="text-slate-200 font-semibold">{service.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {service.estimatedTurnaround}
                </p>
              </div>
              <p className="text-lg font-black text-cyan-400 whitespace-nowrap ml-4">
                {service.pricing?.displayLabel?.split(' — ')[0] ??
                  `From ${service.pricing?.startingFrom} ${service.pricing?.currency}`}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('whatsapp_click', { cta_name: 'pricing_whatsapp_cta', button_position: 'pricing_table' })}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-colors text-slate-950 font-bold px-8 py-4"
          >
            Get My Free Quote on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
