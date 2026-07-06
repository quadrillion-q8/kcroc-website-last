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
    <section className="w-full bg-slate-900 py-24 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-16 text-center">Why KCROC vs. Mall Shops?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp) => {
            const Icon = ICON_MAP[usp.iconKey] || ShieldCheck;
            return (
              <div key={usp.id} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
                <Icon className="w-10 h-10 text-emerald-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{usp.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{usp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
