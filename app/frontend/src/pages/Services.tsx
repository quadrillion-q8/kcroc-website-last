// File: app/frontend/src/pages/Services.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ChevronRight } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

// Reusing the icon map we established for your template
const ICON_MAP: Record<string, React.ElementType> = {
  'apple': Apple,
  'laptop': Laptop,
  'gaming': Gamepad2,
  'cpu': Cpu,
};

export default function Services() {
  // Directly pull the strictly-typed services array from your new Graph
  const services = KCROC_GRAPH.services;

  return (
    <>
      <SEOEngine entityId="page-services" />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <header className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Expert Repair Services</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              We diagnose at the component level. Select your device below to see common problems, turnaround times, and pricing.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map((service) => {
              const ServiceIcon = ICON_MAP[service.iconKey] || Wrench;
              
              return (
                <Link 
                  key={service.id} 
                  to={`/${service.slug}`}
                  className="group block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-7 h-7 text-emerald-500" />
                    </div>
                    {service.pricing?.displayLabel && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-500/20">
                        {service.pricing.displayLabel}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h2>
                  
                  <p className="text-slate-400 mb-6 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center text-sm font-bold text-emerald-500 group-hover:text-emerald-400">
                    Explore Solutions <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
    </>
  );
}
