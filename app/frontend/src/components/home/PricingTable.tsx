import React from 'react';
import { homepagePricingImage } from './homeImagePlan';
import { useHomeLocale } from './homeLocale';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';
import { Link } from 'react-router-dom';
import { MessageCircle, Wrench } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

const conciseTurnaround = (value?: string): string => {
  const text = value?.trim();
  if (!text) return 'Confirmed after diagnosis';
  const firstClause = text.split(/[;]/)[0].trim();
  return firstClause.length > 60 ? `${firstClause.slice(0, 57).trimEnd()}…` : firstClause;
};

export const PricingTable = () => {
  const { ar, t, path, serviceCopy, priceLabel: localizedPrice, trackName } = useHomeLocale();
  const services = [...KCROC_GRAPH.services].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );
  const { trackConversion } = useAnalytics();

  if (services.length === 0) return null;

  return (
    <section
      aria-label={t("Transparent Pricing","أسعار واضحة")}
      className="kcroc-section-light kcroc-editorial-section w-full border-y border-[#e7ded3] px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow={t("No Hidden Fees","بدون رسوم مخفية")}
          tone="ink"
          title={t("Transparent Pricing","أسعار التصليح بكل وضوح")}
          description={t("Free diagnostic. Fixed quote before we touch a tool. No Fix, No Fee.","الفحص مجاني، والسعر واضح قبل لا نبدأ. إذا ما صلحناه، ما تدفع.")}
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {services.map((service) => {
            const thumb = homepagePricingImage(service.id);
            const whatsappLink = buildWhatsAppLink(
              ar ? `هلا KCROC، أبي أسأل عن ${serviceCopy(service)?.title ?? service.title}. شنو سعر البداية وشنو تحتاجون عشان تأكدون السعر النهائي؟` : `Hi KCROC, I'd like to ask about ${service.title}. What is the starting price and what do you need to confirm the exact quote?`
            );
            const priceLabel =
              service.pricing?.displayLabel?.split(' — ')[0] ??
              (service.pricing?.startingFrom != null && service.pricing?.currency
                ? `From ${service.pricing.startingFrom} ${service.pricing.currency}`
                : 'Contact for quote');

            return (
              <article
                key={service.id}
                className="flex h-full min-h-[25rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e3dace] bg-white shadow-sm transition-[border-color,box-shadow] hover:border-[#c9804d]/45 hover:shadow-md"
              >
                <div className="flex aspect-[16/9] w-full shrink-0 items-center justify-center overflow-hidden border-b border-[#e8e0d6] bg-[#f4efe7]">
                  {thumb ? (
                    <img
                      src={thumb.src}
                      alt={ar ? `فحص وتصليح ${serviceCopy(service)?.title ?? service.title}` : thumb.alt}
                      width={thumb.width || 640}
                      height={thumb.height || 360}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Wrench className="h-8 w-8 text-[#8f4f2c]" aria-hidden="true" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
                  <h3 className="min-h-12 text-base font-bold leading-snug text-[#172022] sm:text-lg">
                    <Link
                      to={path(`/${service.slug}`)}
                      onClick={() =>
                        trackConversion('cta_click', {
                          cta_name: trackName('pricing_service_card'),
                          button_position: 'pricing_table',
                          service_id: service.id,
                        })
                      }
                      className="inline-flex min-h-12 w-full items-center break-words underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                    >
                      {serviceCopy(service)?.title ?? service.title}
                    </Link>
                  </h3>

                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#5b6669]">
                      {t("Typical turnaround","مدة التصليح المتوقعة")}
                    </p>
                    <p className="mt-1 min-h-10 text-sm leading-5 text-[#566467] line-clamp-2">
                      {ar ? 'نأكد المدة بعد الفحص وتوفر القطع' : conciseTurnaround(service.estimatedTurnaround)}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#5b6669]">
                      {t("Starting price","سعر البداية")}
                    </p>
                    <span className="mt-1 flex min-h-12 max-w-full items-center rounded-lg border border-[#e3dace] bg-[#f7f3ed] px-3 py-2 text-sm font-extrabold leading-snug text-[#172022]">
                      {localizedPrice(service, priceLabel)}
                    </span>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ar ? `اسأل عن سعر ${serviceCopy(service)?.title ?? service.title} على واتساب` : `Ask KCROC about pricing for ${service.title} on WhatsApp`}
                    onClick={() =>
                      trackConversion('whatsapp_click', {
                        cta_name: trackName('pricing_service_whatsapp'),
                        button_position: 'pricing_table',
                        service_id: service.id,
                      })
                    }
                    className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-extrabold text-[#062B15] transition-colors hover:bg-[#4AE487] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BF0AD] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {t("Ask about pricing","اسأل عن السعر")}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-4 text-center text-sm leading-relaxed text-[#5b6669]">
          {t("Prices shown are starting rates. The exact quote is confirmed after the free diagnosis, before any paid work.","الأسعار المعروضة أسعار بداية وليست السعر النهائي. نأكد السعر بعد الفحص المجاني وقبل أي عمل مدفوع.")}
        </p>

        <div className="mt-6 text-center sm:mt-8">
          <a
            href={buildWhatsAppLink(t('Hi KCROC, I would like a free repair quote. Can you advise me on the next step?', 'هلا KCROC، أبي عرض سعر مجاني للتصليح. شنو الخطوة التالية؟'))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConversion('whatsapp_click', {
                cta_name: trackName('pricing_whatsapp_cta'),
                button_position: 'pricing_table',
              })
            }
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-center text-sm font-extrabold text-[#062B15] transition-colors hover:bg-[#4AE487] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BF0AD] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:px-8 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {t("Get My Free Quote on WhatsApp","اطلب عرض سعر مجاني على واتساب")}
          </a>
        </div>
      </div>
    </section>
  );
};
