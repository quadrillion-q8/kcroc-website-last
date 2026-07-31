// File: app/frontend/src/components/home/Process.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { ShieldCheck, Cpu, Truck } from 'lucide-react';

export const Process = () => {
  const processData = KCROC_GRAPH.processes.find(p => p.id === 'proc-standard');
  if (!processData) return null;

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">How Our Repair Process Works</h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            From free door-to-door collection to precision board-level diagnostics and rigorous stress testing.
          </p>
        </div>

        {/* Visual Diagnostic Process Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl relative group">
          <div className="aspect-[21/9] sm:aspect-[2.4/1] relative overflow-hidden">
            <img 
              src="/images/home/computer-repair-diagnostic-process.webp.webp" 
              alt="KCROC Computer Repair and Precision Diagnostic Process in Kuwait" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/30">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Thermal Imaging &amp; Logic Board Tracing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Data Privacy Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: compact vertical numbered list — order matters, so no carousel here.
            Desktop (md+): 3-column layout. */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {processData.steps.map((item, idx) => (
            <div 
              key={item.step} 
              className="flex gap-4 md:block md:text-center relative bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors"
            >
              <div className="shrink-0 flex flex-col items-center md:hidden">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                {idx < processData.steps.length - 1 && (
                  <div className="w-px flex-1 bg-slate-800 mt-1" />
                )}
              </div>
              <div className="text-5xl sm:text-6xl font-black text-cyan-500/20 mb-3 hidden md:block">0{item.step}</div>
              <div className="pb-2 md:pb-0">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
