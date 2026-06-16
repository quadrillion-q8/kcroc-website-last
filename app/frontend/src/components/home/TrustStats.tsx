import React from 'react';
import { TRUST_STATS } from '../../constants/data';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function TrustStats() {
  return (
    <section className="w-full py-16 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/10 relative z-10">
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {TRUST_STATS.map((stat, idx) => {
          const { ref, visible } = useFadeIn();
          return (
            <div key={stat.label} ref={ref} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">{stat.value}</div>
              <div className="text-xs md:text-sm text-cyan-400 mt-2 uppercase tracking-widest font-bold">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.subtext}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
