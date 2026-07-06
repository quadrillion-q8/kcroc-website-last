import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export default function FAQSection() {
  const faqs = KCROC_GRAPH.faqs;

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black text-white text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-2">{faq.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
