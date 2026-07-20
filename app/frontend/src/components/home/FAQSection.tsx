// File: app/frontend/src/components/home/FAQSection.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export default function FAQSection() {
  const { trackConversion } = useAnalytics();
  const [openId, setOpenId] = useState<string | null>(null);

  // Scope to the curated homepage list (page-home.featuredFAQIds) instead of
  // dumping the entire FAQ array — this was rendering all ~20+ FAQs before.
  const homePage = KCROC_GRAPH.pages?.find((p) => p.id === 'page-home');
  const featuredIds = homePage?.featuredFAQIds ?? [];

  const faqs = featuredIds.length > 0
    ? featuredIds
        .map((id) => KCROC_GRAPH.faqs.find((f) => f.id === id))
        .filter((f): f is NonNullable<typeof f> => Boolean(f))
    : KCROC_GRAPH.faqs.slice(0, 8); // fallback so the section never renders empty if featuredFAQIds is ever cleared

  if (faqs.length === 0) return null;

  return (
    <section className="py-8 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      <h2 className="text-white text-center mb-4 sm:mb-12">
        Frequently Asked Questions
      </h2>
      {/* Collapsed by default — only the tapped question expands. Cuts initial
          scroll height dramatically vs. showing every answer at once. */}
      <div className="space-y-2 sm:space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 text-left px-4 sm:px-6 py-3.5 sm:py-4"
              >
                <h3 className="text-white font-semibold text-sm sm:text-base">{faq.title}</h3>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <p className="text-slate-400 text-sm leading-relaxed px-4 sm:px-6 pb-3.5 sm:pb-4">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6 sm:mt-10">
        <a
          href="/faq"
          onClick={() =>
            trackConversion('cta_click', {
              cta_name: 'faq_view_all',
              button_position: 'faq_section',
            })
          }
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline underline-offset-4"
        >
          View all FAQs →
        </a>
      </div>
    </section>
  );
}
