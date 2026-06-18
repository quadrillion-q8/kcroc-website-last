import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../constants/data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <div key={index} className="border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  id={buttonId}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <span className="text-lg font-bold text-white">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
