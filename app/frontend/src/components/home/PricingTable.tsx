// File: app/frontend/src/components/home/PricingTable.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';

export const PricingTable = () => {
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );

  const business = KCROC_GRAPH.business;
  const whatsappNumber = business?.telephone ?? '96555301913';
  
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="No Hidden Fees"
          title="Transparent Pricing"
          description="Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee."
          align="center"
          className="mb-4 sm:mb-16"
        />

        {/* Mobile: horizontal pricing cards. Desktop (sm+): stacked list. */}
        <div className="scroll-row snap-x snap-mandatory gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4">
          {services.map((service) => {
            const thumb = service.contentImages?.[0];
            return (
            
              key={service.id}
              href={`/${service.slug}`}
              onClick={() => trackConversion('cta_click', { cta_name: 'pricing_service_card', button_position: 'pricing_table' })}
              className="scroll-row-item snap-center w-[68%] sm:w-auto flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {thumb && (
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                )}
                <div>
                  <p className="text-slate-200 font-semibold text-sm sm:text-base">{service.title}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {service.estimatedTurnaround}
                  </p>
                </div>
              </div>
              <p className="text-lg font-black text-cyan-400 whitespace-nowrap mt-3 sm:mt-0 sm:ml-4">
                {service.pricing?.displayLabel?.split(' — ')[0] ??
                  `From ${service.pricing?.startingFrom} ${service.pricing?.currency}`}
              </p>
            </a>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-10 text-center">
          
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
