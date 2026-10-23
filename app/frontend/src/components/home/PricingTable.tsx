import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

/**
 * Keep the turnaround cell scannable. Long qualifiers
 * ("Same day when a compatible display is in stock; otherwise ...") are cut at
 * the first clause — the full wording lives on the dedicated service page.
 */
const conciseTurnaround = (value?: string): string => {
  const text = value?.trim();
  if (!text) return 'Confirmed after diagnosis';
  const firstClause = text.split(/[;]/)[0].trim();
  return firstClause.length > 60 ? `${firstClause.slice(0, 57).trimEnd()}…` : firstClause;
};

export const PricingTable = () => {
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section
      aria-labelledby="pricing-heading"
      className="w-full border-t border-white/[0.08] bg-brand-dark/40 px-4 py-8 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader
          eyebrow="No Hidden Fees"
          title="Transparent Pricing"
          description="Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee."
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0f1417]">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">
              Starting prices and typical turnaround time for each KCROC repair service in Kuwait
            </caption>
            <colgroup>
              <col className="w-[40%] sm:w-[44%]" />
              <col className="w-[25%] sm:w-[23%]" />
              <col className="w-[24%] sm:w-[20%]" />
              <col className="w-[11%] sm:w-[13%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th scope="col" className="px-3 py-3 text-[11px] font-extrabold uppercase tracking-wider text-[#E4E9EB] sm:px-5 sm:text-xs">Service</th>
                <th scope="col" className="px-2 py-3 text-[11px] font-extrabold uppercase tracking-wider text-[#E4E9EB] sm:px-4 sm:text-xs">Turnaround</th>
                <th scope="col" className="px-2 py-3 text-[11px] font-extrabold uppercase tracking-wider text-[#E4E9EB] sm:px-4 sm:text-xs">Starting price</th>
                <th scope="col" className="px-1 py-3 sm:px-4">
                  <span className="sr-only">Ask on WhatsApp</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                const whatsappLink = buildWhatsAppLink(
                  `Hi KCROC, I'd like to ask about ${service.title}. What is the starting price and what do you need to confirm the exact quote?`
                );
                const priceLabel =
                  service.pricing?.displayLabel?.split(' — ')[0] ??
                  (service.pricing?.startingFrom != null && service.pricing?.currency
                    ? `From ${service.pricing.startingFrom} ${service.pricing.currency}`
                    : 'Contact for quote');

                return (
                  <tr
                    key={service.id}
                    className="border-b border-white/[0.08] align-middle transition-colors last:border-b-0 even:bg-white/[0.025] hover:bg-white/[0.05]"
                  >
                    <th scope="row" className="px-3 py-3 text-left align-middle sm:px-5">
                      <Link
                        to={`/${service.slug}`}
                        onClick={() =>
                          trackConversion('cta_click', {
                            cta_name: 'pricing_service_card',
                            button_position: 'pricing_table',
                            service_id: service.id,
                          })
                        }
                        className="inline-flex min-h-12 items-center break-words text-[13px] font-bold leading-snug text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] sm:text-base"
                      >
                        {service.title}
                      </Link>
                    </th>
                    <td className="px-2 py-3 text-xs leading-snug text-[#D4DBDE] sm:px-4 sm:text-sm">
                      {conciseTurnaround(service.estimatedTurnaround)}
                    </td>
                    <td className="px-2 py-3 text-xs font-extrabold leading-snug text-[#F2D2B0] sm:px-4 sm:text-sm">
                      {priceLabel}
                    </td>
                    <td className="px-1 py-1 text-center sm:px-4">
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
                        className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-2 text-sm font-extrabold text-[#062B15] transition-colors hover:bg-[#4AE487] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BF0AD] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:px-3"
                      >
                        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                        <span className="hidden lg:inline">Ask</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-sm leading-relaxed text-[#C4CDD1]">
          Prices shown are starting rates. The exact quote is confirmed after the free diagnosis, before any paid work.
        </p>

        <div className="mt-6 text-center sm:mt-8">
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
