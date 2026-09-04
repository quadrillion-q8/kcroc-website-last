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

        {/* One semantic DOM tree is used for both breakpoints. The layout
            changes with CSS, but step text is rendered only once so the
            crawler and screen reader see a single process sequence. */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-10">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative">
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute right-1/2 top-[22px] -translate-y-1/2 w-full h-px bg-slate-800"
                />
              )}
              {idx < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute left-1/2 top-[22px] -translate-y-1/2 w-full h-px bg-slate-800"
                />
              )}

              <div className="flex gap-4 md:block rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 md:rounded-none md:border-0 md:bg-transparent md:p-4 md:text-center">
                <div className="shrink-0 flex flex-col items-center md:mb-5 md:block">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-900 text-sm font-bold text-cyan-400 md:h-11 md:w-11 md:mx-auto md:border-2 md:bg-slate-950 md:font-black">
                    {item.step}
                  </span>
                  {idx < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="w-px flex-1 bg-slate-800 mt-1 md:hidden"
                    />
                  )}
                </div>

                <div className="md:text-center">
                  <h3 className="mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed md:max-w-[240px] md:mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
