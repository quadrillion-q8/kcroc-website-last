// File: app/frontend/src/components/home/PricingTable.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

export const PricingTable = () => {
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );

  
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-brand-dark/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="No Hidden Fees"
          title="Transparent Pricing"
          description="Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee."
          align="center"
          className="mb-4 sm:mb-16"
        />

        {/* Mobile: horizontal pricing cards. Desktop (sm+): stacked list. */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {services.map((service) => {
            const thumb = service.contentImages?.[0];
            const whatsappLink = buildWhatsAppLink(`Hi KCROC, I'd like to ask about ${service.title}. What is the starting price and what do you need to confirm the exact quote?`);
            return (
              <div
              key={service.id}
              className="flex items-center justify-between gap-3 bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 rounded-xl px-3.5 py-3 sm:px-6 sm:py-5 transition-all"
            >
              <Link
                to={`/${service.slug}`}
                onClick={() => trackConversion('cta_click', { cta_name: 'pricing_service_card', button_position: 'pricing_table', service_id: service.id })}
                className="min-w-0 flex flex-1 items-center gap-3 sm:gap-4"
              >
                {thumb && (
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                )}
                <div>
                  <p className="text-slate-200 font-semibold text-xs sm:text-base">{service.title}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    {service.estimatedTurnaround}
                  </p>
                </div>
              </div>
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <p className="hidden sm:block text-sm sm:text-lg font-black text-cyan-400 whitespace-nowrap">
                {/* 🩹 FIX: the old fallback interpolated
                  `From ${service.pricing?.startingFrom} ${service.pricing?.currency}`
                  even when `service.pricing` was undefined entirely — the
                  Zod schema (ServiceSchema in knowledgeGraph.ts) marks
                  `pricing` as a fully optional object, so an active service
                  legitimately CAN have no pricing at all (e.g. quote-only
                  work). That produced the literal string
                  "From undefined undefined" instead of a deliberate state.
                  All 12 currently active services do have complete pricing
                  data (verified against the graph directly), so this branch
                  isn't firing today — but it's a landmine for the next
                  service added without pricing. Now falls through three
                  explicit, valid states instead of ever interpolating
                  undefined. */}
                  {service.pricing?.displayLabel?.split(' — ')[0] ??
                    (service.pricing?.startingFrom != null && service.pricing?.currency
                      ? `From ${service.pricing.startingFrom} ${service.pricing.currency}`
                      : 'Contact us')}
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask KCROC about ${service.title}`}
                  onClick={() => trackConversion('whatsapp_click', { cta_name: 'pricing_service_whatsapp', button_position: 'pricing_table', service_id: service.id })}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/15 sm:px-3"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline text-xs font-black">Ask</span>
                </a>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-10 text-center">
          <a
            href={buildWhatsAppLink('Hi KCROC, I would like a free repair quote. Can you advise me on the next step?')}
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
