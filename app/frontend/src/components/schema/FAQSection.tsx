import React from 'react';
import { KCROCEntity } from '../../types/knowledgeGraph';

export const FAQSection = ({ entity }: { entity: KCROCEntity }) => {
  if (!entity.faqs || entity.faqs.length === 0) return null;
  return (
    <section className="py-12">
      <h3 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {entity.faqs.map((faq, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-400 mb-2">{faq.question}</h4>
            <p className="text-slate-300 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
