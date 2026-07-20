// File: src/components/home/StatsRow.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const StatsRow = () => {
  const stats = KCROC_GRAPH.entities['stats-row']?.items || [];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-6 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {stats.map((s: any, i: number) => (
        <div key={i} className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl text-center">
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">{s.value}</div>
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">{s.label}</div>
          <div className="text-[10px] text-slate-500 mt-1 sm:mt-2">{s.sub}</div>
        </div>
      ))}
    </section>
  );
};
