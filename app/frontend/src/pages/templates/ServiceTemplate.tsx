// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
// 1. Updated Import: Pulling from the context provider instead of a static function
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

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
  // 2. Initialize the hook
  const { trackConversion } = useAnalytics();

  const entity = KCROC_GRAPH.services.find((e) => e.id === entityId);

  if (!entity) {
    console.warn(`[ServiceTemplate] No service found for entityId: ${entityId}`);
    return <Navigate to="/404" replace />;
  }

  const ServiceIcon = ICON_MAP[entity.iconKey] || Wrench;
  const business = KCROC_GRAPH.business;

  const whatsappMessage = encodeURIComponent(
    `Hi KCROC, I'd like a free estimate for ${entity.title}.`
  );

  return (
    <>
      <SEOEngine entityId={entity.id} />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-16">
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

        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Ready to fix your device?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Our technicians are ready to trace the fault. Send us your symptoms via WhatsApp for a fast, free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {business?.telephone && (
              <a 
                href={`https://wa.me/${business.telephone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion(
                  'whatsapp_click',
                  { cta_name: 'service_page_whatsapp', button_position: 'bottom_cta' },
                  { entity_id: entity.id, entity_type: 'Service', entity_slug: entity.slug }
                )}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 duration-200 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
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
