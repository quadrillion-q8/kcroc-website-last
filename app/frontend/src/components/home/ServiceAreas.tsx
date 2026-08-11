// File: app/frontend/src/components/home/ServiceAreas.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { MapPin, ShieldCheck, Truck } from 'lucide-react';

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" /> Nationwide Coverage
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">We Serve Across Kuwait</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              Based in Hawalli (Al-Mulla Complex), our certified technicians provide free pick-up and drop-off services across all major governorates and residential areas in Kuwait.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <Truck className="w-4 h-4 text-cyan-400" /> Free Door-to-Door Collection
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure Transport
              </div>
            </div>
          </div>

          {/* Kuwait City / Service Area Illustration Card */}
          <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <div className="aspect-[16/10] relative overflow-hidden">
              {/* 🚀 PERF FIX: was serving the full 1600x873 (81 KB) source into a
                  ~380x237 mobile slot. Responsive <picture> now serves a
                  pre-sized variant instead. */}
              <picture>
                <source media="(max-width: 640px)" srcSet="/images/home/computer-repair-service-kuwait-city-640.webp" />
                <img 
                  src="/images/home/computer-repair-service-kuwait-city-960.webp" 
                  alt="KCROC Computer Repair Service Across Kuwait City and Governorates" 
                  width="960"
                  height="524"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-cyan-400 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30">
                <span>Shop 19, Al-Mulla Complex, Hawally</span>
                <span className="text-emerald-400">● Active Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal touch-scroll strip. Desktop (sm+): wrapped pills. */}
        <div className="scroll-row gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          {areas.map((area: string) => (
            <span key={area} className="scroll-row-item px-4 py-2.5 bg-slate-800/80 rounded-xl text-sm text-cyan-100 border border-slate-700 hover:border-cyan-500 transition-colors whitespace-nowrap">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
