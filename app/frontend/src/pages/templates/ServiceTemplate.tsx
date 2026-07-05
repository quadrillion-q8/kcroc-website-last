// File: app/frontend/src/pages/templates/ServiceTemplate.tsx

import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import { KCROC_GRAPH } from '../../data/graph';
import { ServiceEntity, ICON_MAP, LocationEntity } from '../../knowledge/graph.contract';
import { SEOEngine } from '../../core/components/SEOEngine';

interface ServiceTemplateProps {
  entityId?: string;
}

export default function ServiceTemplate({ entityId }: ServiceTemplateProps) {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();

  const entity = KCROC_GRAPH.entities.find((e) => {
    if (e.entityType !== 'Service') return false;
    if (entityId) return e.id === entityId;
    
    // 👇 FIX: Case-insensitive slug matching to prevent 404s
    if (serviceSlug) return e.slug.toLowerCase() === serviceSlug.toLowerCase();
    
    return false;
  }) as ServiceEntity | undefined;

  if (!entity) {
    console.warn(`[Template Router] Entity missing. ID: ${entityId}, Slug: ${serviceSlug}`);
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  const ServiceIcon = ICON_MAP[entity.iconKey];
  const hqLocation = KCROC_GRAPH.entities.find(e => e.id === 'loc-hawalli') as LocationEntity;

  return (
    <>
      <SEOEngine entityId={entity.id} />

      <main className="min-h-screen bg-neutral-900 text-white pt-32 pb-16">
        <header className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            {ServiceIcon && <ServiceIcon className="w-12 h-12 text-emerald-500" />}
            <h1 className="text-4xl md:text-5xl font-bold">{entity.title}</h1>
          </div>
          
          <p className="text-xl text-neutral-300 max-w-3xl mb-8">
            {entity.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <div className="bg-neutral-800 px-4 py-2 rounded-md border border-neutral-700">
              <span className="block text-sm text-neutral-400">Turnaround</span>
              <span className="font-semibold">{entity.estimatedTurnaround}</span>
            </div>
            
            <div className="bg-neutral-800 px-4 py-2 rounded-md border border-neutral-700">
              <span className="block text-sm text-neutral-400">Level</span>
              <span className="font-semibold capitalize">{entity.repairLevel.replace('-', ' ')}</span>
            </div>

            {entity.pricing.displayLabel && (
              <div className="bg-emerald-900/30 px-4 py-2 rounded-md border border-emerald-800">
                <span className="block text-sm text-emerald-400">Pricing</span>
                <span className="font-semibold text-emerald-300">{entity.pricing.displayLabel}</span>
              </div>
            )}
          </div>
        </header>

        {entity.idealCustomer && (
          <section className="max-w-7xl mx-auto px-4 py-8 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-emerald-500 mb-2">Is this service for you?</h2>
            <p className="text-neutral-300 max-w-3xl">{entity.idealCustomer}</p>
            {entity.deviceTypes && (
              <p className="mt-3 text-sm text-neutral-400">
                <strong>Devices Covered:</strong> {entity.deviceTypes.join(', ')}
              </p>
            )}
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Service Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entity.coreFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-3 bg-neutral-800/50 p-4 rounded-lg">
                <span className="text-emerald-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {entity.commonProblems && entity.commonProblems.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Identify Your Problem</h2>
            <div className="space-y-4">
              {entity.commonProblems.map((problem) => (
                <div key={problem.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                    <p className="text-sm text-neutral-400 mb-3"><strong>Likely Cause:</strong> {problem.likelyCause}</p>
                    <div className="flex flex-wrap gap-2">
                      {problem.symptoms.map((symptom, idx) => (
                        <span key={idx} className="text-xs bg-neutral-700 px-2 py-1 rounded text-neutral-300">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-neutral-900 p-4 rounded-lg min-w-[200px] text-sm border border-neutral-800">
                    <div className="mb-2"><span className="text-neutral-500 block">Turnaround:</span> {problem.expectedTurnaround}</div>
                    <div><span className="text-neutral-500 block">Est. Cost:</span> <span className="text-emerald-400 font-bold">{problem.approxPriceRange}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why KCROC vs. Mall Shops?</h2>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">✓</span> 
                <div><strong>Free Pick & Drop:</strong> Save the drive; we collect from {hqLocation?.serviceAreas?.slice(0, 3).join(', ')} and beyond.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">✓</span> 
                <div><strong>Component-Level Repair:</strong> Kiosks swap expensive boards. We micro-solder chips to save you money.</div>
              </li>
              {entity.warranty?.noFixNoFee && (
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold mt-1">✓</span> 
                  <div><strong>No Fix, No Fee:</strong> If we can't restore it, you pay nothing.</div>
                </li>
              )}
            </ul>
          </div>

          {entity.testimonials && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Real Local Fixes</h2>
              {entity.testimonials.map((test, idx) => (
                <blockquote key={idx} className="bg-neutral-800/50 p-4 rounded-lg border-l-4 border-emerald-500 italic text-neutral-300">
                  "{test.text}"
                  <footer className="mt-2 text-sm text-neutral-500 not-italic">— {test.author}, {test.location}</footer>
                </blockquote>
              ))}
            </div>
          )}
        </section>

        {entity.process && entity.process.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12 border-t border-neutral-800">
            <h2 className="text-2xl font-bold mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {entity.process.map((step, idx) => (
                <div key={idx} className="bg-neutral-800/30 p-6 rounded-lg">
                  <span className="text-emerald-500 font-bold text-lg mb-2 block">Step {step.step}</span>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-400">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.faqs && entity.faqs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12 border-t border-neutral-800">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {entity.faqs.map((faq, idx) => (
                <div key={idx} className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-sm text-neutral-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.conversion.showCall && (
          <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-neutral-800">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Request {entity.pricing.quoteRequired ? 'Quote' : 'Booking'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
