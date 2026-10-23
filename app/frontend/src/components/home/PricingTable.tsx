// File: app/frontend/src/components/home/PricingTable.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';
import { Link } from 'react-router-dom';
import { MessageCircle, Wrench } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

export const PricingTable = () => {
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section className="w-full border-t border-white/[0.08] bg-brand-dark/40 px-4 py-8 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="No Hidden Fees"
          title="Transparent Pricing"
          description="Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee."
          align="center"
          className="mb-6 sm:mb-12"
        />

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3 sm:gap-4">
          {services.map((service) => {
            const thumb = service.contentImages?.[0];
            const whatsappLink = buildWhatsAppLink(
              `Hi KCROC, I'd like to ask about ${service.title}. What is the starting price and what do you need to confirm the exact quote?`
            );
            const priceLabel =
              service.pricing?.displayLabel?.split(' — ')[0] ??
              (service.pricing?.startingFrom != null && service.pricing?.currency
                ? `From ${service.pricing.startingFrom} ${service.pricing.currency}`
                : 'Contact for quote');

            return (
              <article
                key={service.id}
                className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.035] transition-colors hover:border-white/20"
              >
                {thumb ? (
                  <div className="h-32 shrink-0 overflow-hidden border-b border-white/[0.08] bg-slate-900 sm:h-36">
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      width={thumb.width || 640}
                      height={thumb.height || 360}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 shrink-0 items-center justify-center border-b border-white/[0.08] bg-white/[0.025] sm:h-36">
                    <Wrench className="h-8 w-8 text-[#C4CDD1]" aria-hidden="true" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <Link
                    to={`/${service.slug}`}
                    onClick={() =>
                      trackConversion('cta_click', {
                        cta_name: 'pricing_service_card',
                        button_position: 'pricing_table',
                        service_id: service.id,
                      })
                    }
                    className="min-h-[3rem] text-base font-bold leading-snug text-white line-clamp-2 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] sm:text-lg"
                  >
                    {service.title}
                  </Link>

                  <p className="mt-2 min-h-[2.5rem] text-sm leading-5 text-[#C4CDD1] line-clamp-2">
                    {service.estimatedTurnaround || 'Timing confirmed after diagnosis'}
                  </p>

                  <div className="mt-4 flex min-h-12 items-center">
                    <span className="inline-flex min-h-10 max-w-full items-center rounded-lg border border-white/[0.12] bg-white/[0.045] px-3 py-2 text-sm font-extrabold leading-snug text-[#F2F4F5]">
                      {priceLabel}
                    </span>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask KCROC about pricing for ${service.title} on WhatsApp`}
                    onClick={() =>
                      trackConversion('whatsapp_click', {
                        cta_name: 'pricing_service_whatsapp',
                        button_position: 'pricing_table',
                        service_id: service.id,
                      })
                    }
                    className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-extrabold text-[#062B15] transition-colors hover:bg-[#4AE487] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BF0AD] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Ask about pricing
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:mt-10">
          <a
            href={buildWhatsAppLink('Hi KCROC, I would like a free repair quote. Can you advise me on the next step?')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConversion('whatsapp_click', {
                cta_name: 'pricing_whatsapp_cta',
                button_position: 'pricing_table',
              })
            }
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-center text-sm font-extrabold text-[#062B15] transition-colors hover:bg-[#4AE487] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BF0AD] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:px-8 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Get My Free Quote on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
