// File: app/frontend/src/components/home/FAQSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';
import { ROUTES } from '../../constants/routes';

/**
 * Homepage FAQ preview. The Knowledge Graph remains the source of truth for
 * which FAQs appear here and for each question/answer's content.
 */
export default function FAQSection() {
  const { trackConversion } = useAnalytics();
  const [openId, setOpenId] = useState<string | null>(null);

  const homePage = KCROC_GRAPH.pages?.find((page) => page.id === 'page-home');
  const featuredIds = homePage?.featuredFAQIds ?? [];
  const faqs = featuredIds.length > 0
    ? featuredIds
        .map((id) => KCROC_GRAPH.faqs.find((faq) => faq.id === id))
        .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq))
    : KCROC_GRAPH.faqs.slice(0, 8);

  if (faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="homepage-faq-heading"
      className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-20"
    >
      <SectionHeader
        title="Frequently Asked Questions"
        align="center"
        className="mb-3 sm:mb-5"
      />
      <h2 id="homepage-faq-heading" className="sr-only">
        Computer repair questions answered by KCROC
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-6 text-slate-400 sm:mb-10 sm:text-base">
        Clear answers about repair costs, pickup and delivery, turnaround times,
        and how we protect your device.
      </p>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const answerId = `homepage-faq-answer-${faq.id}`;

          return (
            <article
              key={faq.id}
              className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 transition-colors hover:border-slate-700 sm:rounded-2xl"
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={`homepage-faq-question-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 sm:min-h-14 sm:px-6"
                >
                  <span className="text-sm font-semibold leading-6 text-white sm:text-base">
                    {faq.title}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>
              <div
                id={answerId}
                role="region"
                aria-labelledby={`homepage-faq-question-${faq.id}`}
                hidden={!isOpen}
                className="px-4 pb-4 sm:px-6 sm:pb-5"
              >
                <p className="m-0 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  {faq.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-7 text-center sm:mt-10">
        <Link
          to={ROUTES.FAQ}
          onClick={() => trackConversion('cta_click', {
            cta_name: 'faq_view_all',
            button_position: 'faq_section',
          })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-cyan-400 underline decoration-cyan-400/50 underline-offset-4 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          View all FAQs
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
