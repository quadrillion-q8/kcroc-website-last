import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../constants/data';

const FAQItem = ({ id, q, a }: { id: string; q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm mb-3 hover:border-slate-700 transition-colors">
      <button 
        id={`${id}-button`}
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        aria-controls={`${id}-panel`} 
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <span className="font-bold text-white pr-4 text-sm tracking-wide">{q}</span>
        <ChevronDown size={18} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div 
        id={`${id}-panel`} 
        role="region" 
        aria-labelledby={`${id}-button`} 
        hidden={!open} 
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100 border-t border-slate-800/50' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="px-6 text-slate-400 text-sm leading-relaxed overflow-hidden">
          <div className="py-5">{a}</div>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="w-full py-24 flex justify-center px-6 relative z-10">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Service Protocol</h2>
          <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Frequently Asked Questions</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const faqId = faq.q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return <FAQItem key={faqId} id={faqId} q={faq.q} a={faq.a} />;
          })}
        </div>
      </div>
    </section>
  );
}
