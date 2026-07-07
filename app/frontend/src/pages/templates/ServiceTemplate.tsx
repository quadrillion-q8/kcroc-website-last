// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ShieldCheck, Clock } from 'lucide-react';
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
  const business = KCROC_GRAPH.business;

  return (
    <>
      <SEOEngine entityId={entity.id} />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-16">
        {/* HEADER SECTION */}
        <header className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
              <ServiceIcon className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">{entity.title}</h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            {entity.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {entity.warranty && (
              <div className="bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Warranty</span>
                  <span className="font-semibold text-white">{entity.warranty.duration}</span>
                </div>
              </div>
            )}

            {entity.pricing?.displayLabel && (
              <div className="bg-cyan-900/20 px-5 py-3 rounded-xl border border-cyan-500/30 flex items-center gap-3">
                <span className="font-bold text-cyan-400">{entity.pricing.displayLabel}</span>
              </div>
            )}
          </div>
        </header>

        {/* CORE FEATURES */}
        {entity.coreFeatures && entity.coreFeatures.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50">
            <h2 className="text-2xl font-bold mb-8 text-white">Service Capabilities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {entity.coreFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-200 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Ready to fix your device?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Our technicians are ready to trace the fault. Send us your symptoms via WhatsApp for a fast, free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {business?.telephone && (
              <a 
                href={`https://wa.me/${business.telephone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 duration-200"
              >
                Message on WhatsApp
              </a>
            )}
            {entity.warranty?.noFixNoFee && (
              <div className="flex items-center justify-center px-8 py-4 border border-slate-800 rounded-xl bg-slate-900 text-slate-300 font-medium">
                <ShieldCheck className="w-5 h-5 text-cyan-400 mr-2" />
                No Fix, No Fee Guarantee
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
