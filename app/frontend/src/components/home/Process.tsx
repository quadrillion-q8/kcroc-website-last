// File: app/frontend/src/components/home/Process.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const Process = () => {
  const processData = KCROC_GRAPH.processes.find(p => p.id === 'proc-standard');
  if (!processData) return null;

  return (
    <section className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white mb-4 sm:mb-16 text-center">How Our Repair Process Works</h2>

        {/* Mobile: compact vertical numbered list — order matters, so no carousel here.
            Desktop (md+): original 3-column layout. */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
          {processData.steps.map((item, idx) => (
            <div key={item.step} className="flex gap-4 md:block md:text-center relative">
              <div className="shrink-0 flex flex-col items-center md:hidden">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                {idx < processData.steps.length - 1 && (
                  <div className="w-px flex-1 bg-slate-800 mt-1" />
                )}
              </div>
              <div className="text-6xl font-black text-slate-800 mb-4 hidden md:block">0{item.step}</div>
              <div className="pb-4 md:pb-0">
                <h3 className="text-white mb-1 md:mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
