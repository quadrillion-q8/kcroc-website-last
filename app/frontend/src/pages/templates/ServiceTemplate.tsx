// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ShieldCheck, Truck, Clock } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';

// Local UI mapping for icons based on the graph's string keys
const ICON_MAP: Record<string, React.ElementType> = {
  'apple': Apple,
  'laptop': Laptop,
  'gaming': Gamepad2,
  'cpu': Cpu,
};

interface ServiceTemplateProps {
  entityId?: string;
}

export default function ServiceTemplate({ entityId }: ServiceTemplateProps) {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();

  // 1. Safe Lookup: Uses the pre-filtered .services array
  const entity = KCROC_GRAPH.services.find((e) => {
    if (entityId) return e.id === entityId;
    if (serviceSlug) return e.slug.toLowerCase() === serviceSlug.toLowerCase();
    return false;
  });

  if (!entity) {
    console.warn(`[Template Router] Service missing. ID: ${entityId}, Slug: ${serviceSlug}`);
    return <Navigate to="/404" replace />;
  }

  const ServiceIcon = ICON_MAP[entity.iconKey] || Wrench;
  
  // 2. Auxiliary Lookups for Trust/Location data
  const hqLocation = KCROC_GRAPH.locations.find(e => e.id === 'loc-hawalli');
  const business = KCROC_GRAPH.business;

  return (
    <>
      <SEOEngine entityId={entity.id} />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-16">
        {/* HEADER SECTION */}
        <header className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
              <ServiceIcon className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">{entity.title}</h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            {entity.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <div className="bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-500" />
              <div>
                <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Warranty</span>
                <span className="font-semibold text-white">{entity.warranty.duration}</span>
              </div>
            </div>

            {entity.pricing.displayLabel && (
              <div className="bg-emerald-900/20 px-5 py-3 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                <span className="font-bold text-emerald-400">{entity.pricing.displayLabel}</span>
              </div>
            )}
          </div>
        </header>

        {/* CORE FEATURES */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50">
          <h2 className="text-2xl font-bold mb-8 text-white">Service Capabilities</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {entity.coreFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-3 bg-slate-900 p-5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-200 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PROBLEM DIAGNOSTIC (Data-Driven) */}
        {entity.commonProblems && entity.commonProblems.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-black mb-8 text-white">Identify Your Hardware Fault</h2>
            <div className="grid grid-cols-1 gap-6">
              {entity.commonProblems.map((problem) => (
                <div key={problem.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row gap-8 justify-between items-start hover:border-emerald-500/30 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">{problem.title}</h3>
                    <p className="text-slate-400 mb-4"><strong>Likely Cause:</strong> {problem.likelyCause}</p>
                    <div className="flex flex-wrap gap-2">
                      {problem.symptoms.map((symptom, idx) => (
                        <span key={idx} className="text-xs font-bold bg-slate-950 px-3 py-1.5 rounded-md text-emerald-400 border border-slate-800">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-xl min-w-[220px] border border-slate-800">
                    <div className="mb-4">
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Turnaround</span> 
                      <span className="text-white font-medium">{problem.expectedTurnaround}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Est. Cost</span> 
                      <span className="text-emerald-400 font-bold text-lg">{problem.approxPriceRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESS */}
        {entity.process && entity.process.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50">
            <h2 className="text-2xl font-bold mb-8 text-white">The Repair Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {entity.process.map((step, idx) => (
                <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute -right-4 -top-8 text-8xl font-black text-slate-800/50 pointer-events-none select-none">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">{step.title}</h3>
                  <p className="text-slate-400 relative z-10 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Ready to fix your device?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Our technicians are ready to trace the fault. Send us your symptoms via WhatsApp for a fast, free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {business?.telephone && (
              <a 
                href={`https://wa.me/${business.telephone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
              >
                Message on WhatsApp
              </a>
            )}
            {entity.warranty.noFixNoFee && (
              <div className="flex items-center justify-center px-8 py-4 border border-slate-800 rounded-xl bg-slate-900 text-slate-300 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
                No Fix, No Fee Guarantee
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
