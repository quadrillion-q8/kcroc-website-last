// File: app/frontend/src/components/home/FAQSection.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export default function FAQSection() {
  const { trackConversion } = useAnalytics();

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
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black text-white text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-2">{faq.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
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
