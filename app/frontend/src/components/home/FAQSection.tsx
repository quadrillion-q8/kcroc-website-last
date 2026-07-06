// File: app/frontend/src/components/home/FAQSection.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import FAQSchema from '../seo/FAQSchema';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Filter FAQs to only those featured on the homepage
  const homePage = KCROC_GRAPH.pages.find(p => p.id === 'page-home');
  const featuredFaqs = KCROC_GRAPH.faqs.filter(faq => homePage?.featuredFAQIds.includes(faq.id));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6 bg-slate-950 relative">
      <FAQSchema />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-black text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {featuredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <div key={faq.id} className="border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  id={buttonId}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <span className="text-lg font-bold text-white">{faq.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true" 
                  />
                </button>
                <div
                  id={faqId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="p-6 bg-slate-950 text-slate-400 leading-relaxed border-t border-slate-800"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
