// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ShieldCheck, Clock, MessageCircle, Users, Monitor, ChevronDown, AlertTriangle } from 'lucide-react';
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
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

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

  const severityStyles: Record<string, string> = {
    critical: 'border-red-500/40 bg-red-950/20 text-red-300',
    high: 'border-orange-500/40 bg-orange-950/20 text-orange-300',
    medium: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
    low: 'border-slate-600/40 bg-slate-900/40 text-slate-300',
  };

  return (
    <>
      <SEOEngine entityId={entity.id} />

      {/* ✅ FIXED: Changed bg-slate-950 to bg-transparent */}
      <main className="min-h-screen bg-transparent text-white pt-32 pb-16">
        
        {/* Added a subtle glass effect to the header so the background shines through beautifully */}
        <header className="max-w-7xl mx-auto px-6 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center shadow-inner">
              <ServiceIcon className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">{entity.title}</h1>
          </div>

          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            {entity.description}
          </p>

          {entity.idealCustomer && (
            <p className="flex items-start gap-3 text-sm text-slate-400 max-w-3xl mb-8">
              <Users className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span><span className="font-semibold text-slate-300">Built for:</span> {entity.idealCustomer}</span>
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            {entity.warranty && (
              <div className="bg-slate-950/80 px-5 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
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
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white">Service Capabilities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {entity.coreFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-200 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {((entity.deviceTypes && entity.deviceTypes.length > 0) || (entity.brands && entity.brands.length > 0)) && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            {entity.deviceTypes && entity.deviceTypes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-cyan-400" /> Devices We Cover
                </h2>
                <div className="flex flex-wrap gap-3">
                  {entity.deviceTypes.map((device, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-200 text-sm font-medium">
                      {device}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {entity.brands && entity.brands.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-4">Brands We Service</h3>
                <div className="flex flex-wrap gap-2">
                  {entity.brands.map((brand, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-cyan-900/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {entity.commonIssues && entity.commonIssues.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400" /> Common Problems We Fix
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {entity.commonIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-6 rounded-2xl border backdrop-blur-sm ${severityStyles[issue.severity] || severityStyles.low}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white">{issue.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-black/30 flex-shrink-0">
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">{issue.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.process && entity.process.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white">Our Repair Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entity.process.map((step) => (
                <div key={step.step} className="relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500 text-slate-950 font-black text-sm mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.faqs && entity.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {entity.faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        const nextOpen = isOpen ? null : faq.id;
                        setOpenFaqId(nextOpen);
                        if (nextOpen) {
                          trackConversion(
                            'faq_expand',
                            { cta_name: 'service_page_faq', button_position: 'faq_section', entity_id: entity.id, entity_type: 'Service', entity_slug: entity.slug }
                          );
                        }
                      }}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 text-left px-6 py-4"
                    >
                      <span className="text-white font-semibold">{faq.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-slate-400 text-sm leading-relaxed px-6 pb-4">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 text-center relative z-10">
          <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-3xl p-10 shadow-2xl">
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
                    { cta_name: 'service_page_whatsapp', button_position: 'bottom_cta', entity_id: entity.id, entity_type: 'Service', entity_slug: entity.slug }
                  )}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 duration-200 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </a>
              )}
              {entity.warranty?.noFixNoFee && (
                <div className="flex items-center justify-center px-8 py-4 border border-slate-800 rounded-xl bg-slate-950/80 text-slate-300 font-medium">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mr-2" />
                  No Fix, No Fee Guarantee
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
