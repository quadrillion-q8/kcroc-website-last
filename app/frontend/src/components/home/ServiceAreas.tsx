// File: app/frontend/src/components/home/ServiceAreas.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { MapPin, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOVERNORATES = [
  { name: 'Capital', arabic: 'العاصمة', path: '/location/kuwait-city', note: 'Kuwait City & nearby business districts' },
  { name: 'Hawalli', arabic: 'حولي', path: '/location/hawalli', note: 'Central lab & nearby residential areas' },
  { name: 'Farwaniya', arabic: 'الفروانية', path: '/location/farwaniya', note: 'Farwaniya, Khaitan & Riggae' },
  { name: 'Ahmadi', arabic: 'الأحمدي', path: '/location/ahmadi', note: 'Ahmadi, Fahaheel & coastal areas' },
  { name: 'Jahra', arabic: 'الجهراء', path: '/location/jahra', note: 'Jahra and surrounding areas' },
  { name: 'Mubarak Al-Kabeer', arabic: 'مبارك الكبير', path: '/location/mubarak-al-kabeer', note: 'Adan, Qurain & Sabah Al-Salem' },
];

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-900/40 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Kuwait-Wide Pickup
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">Free Pickup &amp; Delivery Across Kuwait</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              Based in Hawalli (Al-Mulla Complex), KCROC collects laptops, MacBooks, gaming PCs and other computers from homes and offices across Kuwait. Repairs are completed at the central lab, then the device is returned after testing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {GOVERNORATES.map((gov) => (
                <Link
                  key={gov.name}
                  to={gov.path}
                  className="group rounded-2xl border border-slate-800 bg-slate-950/35 p-3.5 transition hover:border-cyan-500/40 hover:bg-cyan-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white group-hover:text-cyan-300">{gov.name}</span>
                        <span className="text-xs text-slate-500">{gov.arabic}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-5 text-slate-500">{gov.note}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 group-hover:text-cyan-400" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
              <Link to="/near-me" className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/15">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Find computer repair near you
              </Link>
              <Link to="/location/hawalli" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300">
                Computer Repair Hawalli <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 mt-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <Truck className="w-4 h-4 text-cyan-400" aria-hidden="true" /> Free Door-to-Door Collection
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Secure Transport
              </div>
            </div>
          </div>

          <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-brand-dark shadow-2xl">
            <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden">
              <picture>
                <source media="(max-width: 640px)" srcSet="/images/kcroc-laptop-repair-technicians-hawalli-kuwait.webp" />
                <img
                  src="/images/kcroc-laptop-repair-technicians-hawalli-kuwait.webp"
                  alt="KCROC computer repair technicians serving customers across Kuwait from the Hawalli lab"
                  width="960"
                  height="524"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-xs font-bold text-cyan-400 bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30">
                <span className="truncate">Hawalli Lab · Pickup &amp; Delivery</span>
                <span className="text-emerald-400">Kuwait-wide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {areas.map((area: string) => (
            <span key={area} className="px-3 py-2 bg-slate-800/80 rounded-xl text-sm text-cyan-100 border border-slate-700 hover:border-cyan-500 transition-colors whitespace-nowrap">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
