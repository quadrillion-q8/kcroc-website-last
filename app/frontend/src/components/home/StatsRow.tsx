// File: src/components/home/StatsRow.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const StatsRow = () => {
  const stats = KCROC_GRAPH.entities['stats-row']?.items || [];
  if (stats.length === 0) return null;

  return (
    <section className="py-5 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section 8: four numbers don't need four separate cards — one
          container with internal dividers reads as a single trust strip
          instead of four competing boxes. */}
      <div className="grid grid-cols-4 divide-x divide-slate-800/80 rounded-xl border border-slate-800/80 bg-slate-900/20 overflow-hidden">
        {stats.map((s: any, i: number) => (
          <div key={i} className="text-center px-1.5 py-3 sm:px-4 sm:py-8">
            <div className="text-lg sm:text-3xl font-black text-white mb-0.5 sm:mb-1">{s.value}</div>
            <div className="text-[8px] sm:text-xs font-bold text-emerald-500 uppercase tracking-wider leading-tight">{s.label}</div>
            <div className="hidden sm:block text-[10px] text-slate-500 mt-1 sm:mt-2">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
