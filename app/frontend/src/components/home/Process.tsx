// File: app/frontend/src/components/home/Process.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { ShieldCheck, Cpu } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

export const Process = () => {
  const processData = KCROC_GRAPH.processes.find((p) => p.id === 'proc-standard');
  if (!processData) return null;

  const steps = processData.steps;

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="How It Works"
          title="How Our Repair Process Works"
          description="From free door-to-door collection to precision board-level diagnostics and rigorous stress testing."
          align="center"
        />

        {/* Visual Diagnostic Process Banner — unchanged */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl relative group">
          <div className="aspect-[21/9] sm:aspect-[2.4/1] relative overflow-hidden">
            <picture>
              <source media="(max-width: 640px)" srcSet="/images/home/computer-repair-diagnostic-process-640.webp" />
              <img
                src="/images/home/computer-repair-diagnostic-process-960.webp"
                alt="KCROC Computer Repair and Precision Diagnostic Process in Kuwait"
                width="960"
                height="524"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                loading="lazy"
              />
            </picture>
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

        {/* Mobile: compact bordered numbered list. Desktop: connected
            timeline — no card container, so it reads differently from the
            card grids above and below it on the page. */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-10">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative">
              {/* Mobile */}
              <div className="flex gap-4 md:hidden bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                  {idx < steps.length - 1 && <div className="w-px flex-1 bg-slate-800 mt-1" />}
                </div>
                <div>
                  <h3 className="mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:block text-center px-4">
                <div className="relative flex items-center justify-center mb-5">
                  {idx > 0 && (
                    <span className="absolute right-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-slate-800" />
                  )}
                  {idx < steps.length - 1 && (
                    <span className="absolute left-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-slate-800" />
                  )}
                  <span className="relative z-10 w-11 h-11 rounded-full bg-slate-950 border-2 border-cyan-500/50 text-cyan-400 font-black flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
