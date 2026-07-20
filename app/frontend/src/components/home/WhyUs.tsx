// File: app/frontend/src/components/home/WhyUs.tsx
import React from 'react';
import { Cpu, ShieldCheck, Truck, Lock } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, ShieldCheck, Truck, Lock
};

export const WhyUs = () => {
  const homePage = KCROC_GRAPH.pages.find(p => p.id === 'page-home');
  const usps = KCROC_GRAPH.usps.filter(usp => homePage?.featuredUSPIds.includes(usp.id));

  return (
    <section className="w-full bg-slate-900 py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white mb-4 sm:mb-16 text-center">Why KCROC vs. Mall Shops?</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {usps.map((usp) => {
            const Icon = ICON_MAP[usp.iconKey] || ShieldCheck;
            return (
              <div key={usp.id} className="bg-slate-950 p-4 sm:p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
                <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-500 mb-2 sm:mb-6" />
                <h3 className="text-white mb-1 sm:mb-3 text-sm sm:text-xl">{usp.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{usp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
