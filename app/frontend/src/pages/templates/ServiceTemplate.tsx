// File: app/frontend/src/pages/templates/LocationTemplate.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { MapPin, Truck, ShieldCheck, Clock, CheckCircle2, ChevronRight, MessageCircle, Laptop, Wrench, Navigation } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

interface LocationTemplateProps {
  entityId?: string;
}

export default function LocationTemplate({ entityId }: LocationTemplateProps) {
  const { trackConversion } = useAnalytics();
  
  const entity = KCROC_GRAPH.locations.find((e) => e.id === entityId);
  const business = KCROC_GRAPH.business;
  const topServices = KCROC_GRAPH.services.filter(s => s.isFeatured).slice(0, 4);

  if (!entity) {
    console.warn(`[LocationTemplate] No location found for entityId: ${entityId}`);
    return <Navigate to="/404" replace />;
  }

  const whatsappMessage = encodeURIComponent(
    `Hi KCROC, I am located in ${entity.title.replace(' Repair Center', '')} and need to book a repair.`
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <SEOEngine entity={entity} />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20">
              <MapPin className="w-8 h-8 text-cyan-400" />
            </div>
            <span className="text-cyan-400 font-bold tracking-wide uppercase text-sm">
              Service Area
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Computer Repair in <span className="text-cyan-400">{entity.title.replace(' Repair Center', '')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-medium mb-8 max-w-3xl leading-snug">
            {entity.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {business?.telephone && (
              <a 
                href={`https://wa.me/${business.telephone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion(
                  'whatsapp_click',
                  { cta_name: 'location_page_whatsapp', button_position: 'hero', entity_id: entity.id, entity_slug: entity.slug }
                )}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Book Free Pickup in {entity.title.replace(' Repair Center', '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Logistics & Trust Bar */}
      <div className="bg-slate-900/50 border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold">Free Local Collection</h4>
                <p className="text-sm text-slate-400">Direct from your door in {entity.title.replace(' Repair Center', '')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold">No Fix, No Fee</h4>
                <p className="text-sm text-slate-400">Risk-free diagnostic guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold">Fast Turnaround</h4>
                <p className="text-sm text-slate-400">Most repairs completed in 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Details Section */}
      <div className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Serving the Entire {entity.title.replace(' Repair Center', '')} Area</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                You don't need to drive through traffic to get your device fixed. KCROC provides dedicated pick and drop service for {entity.isPhysicalLocation ? 'visitors to our lab and ' : ''}residents across our {entity.serviceRadiusKm}km service radius. 
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-3">Coverage Zones</h3>
                  <div className="flex flex-wrap gap-2">
                    {entity.serviceAreas.map(area => (
                      <span key={area} className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-black text-cyan-500 uppercase tracking-wider mb-2">Location Status</h3>
                  <div className="flex items-start gap-3 mt-3">
                    <Navigation className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm leading-relaxed">{entity.landmark}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-transparent blur-2xl rounded-[3rem]"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-6">Expert Component-Level Services</h3>
                <div className="space-y-4">
                  {topServices.map(service => (
                    <a 
                      key={service.id}
                      href={`/${service.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <Wrench className="w-5 h-5 text-cyan-500/70 group-hover:text-cyan-400 transition-colors" />
                        <div>
                          <p className="text-white font-bold group-hover:text-cyan-400 transition-colors">{service.title}</p>
                          <p className="text-xs text-slate-500 hidden sm:block truncate max-w-[200px]">{service.shortDescription}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
                <a href="/services" className="inline-block mt-6 text-sm font-bold text-cyan-400 hover:text-cyan-300">
                  View all local services →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section (Tailored locally) */}
      <div className="py-20 bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white tracking-tight mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-xl mb-6 border border-cyan-500/20">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Book via WhatsApp</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Contact us describing the issue. We'll arrange a free collection from your location in {entity.title.replace(' Repair Center', '')}.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-xl mb-6 border border-cyan-500/20">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Lab Diagnostic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your device goes to our Hawalli lab for strict component-level testing. You receive a firm quote before we repair it.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-xl mb-6 border border-cyan-500/20">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Delivered Back to You</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Once stress-tested and verified, we deliver the repaired device back to your door with a 30-day warranty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
