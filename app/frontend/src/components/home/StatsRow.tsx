// File: src/components/home/StatsRow.tsx
import React from 'react';
import { useHomeLocale } from './homeLocale';
import { KCROC_GRAPH } from '../../data/graph';

export const StatsRow = () => {
  const { ar } = useHomeLocale();
  const statsEntity = KCROC_GRAPH.entities['stats-row'];
  const stats = statsEntity?.entityType === 'Stats' ? statsEntity.items : [];
  if (stats.length === 0) return null;

  return (
    <section className="py-5 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section 8: four numbers don't need four separate cards — one
          container with internal dividers reads as a single trust strip
          instead of four competing boxes. */}
      <div className="kcroc-home-stats-grid grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-slate-800/80 bg-slate-900/20 overflow-hidden">
        {stats.map((s: any, i: number) => (
          <div key={i} className="text-center px-1.5 py-3 sm:px-4 sm:py-8">
            <div className="text-lg sm:text-3xl font-black text-white mb-0.5 sm:mb-1">{ar ? (["مجاني","السعر أول","30 يوم","مجاني"][i] ?? s.value) : s.value}</div>
            <div className="flex min-h-[2.25em] items-center justify-center text-[9px] sm:text-xs font-bold text-[#dfa86f] uppercase tracking-wider leading-tight">{ar ? (["الفحص الأولي","عرض السعر","ضمان الإصلاح","الاستلام والتوصيل"][i] ?? s.label) : s.label}</div>
            <div className="hidden sm:block text-[10px] text-slate-400 mt-1 sm:mt-2">{ar ? (["بدون التزام","موافقتك قبل العمل","للإصلاح المكتمل","بكل الكويت"][i] ?? s.sub) : s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
