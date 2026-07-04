// File: app/frontend/src/pages/templates/ServiceTemplate.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

// Import the graph and the mapped constants
import { KCROC_GRAPH } from '../../data/graph';
import { ServiceEntity, ICON_MAP } from '../../knowledge/graph.contract';
import { SEOEngine } from '../../core/components/SEOEngine';

interface ServiceTemplateProps {
  entityId: string;
}

export default function ServiceTemplate({ entityId }: ServiceTemplateProps) {
  // 1. O(1) Lookup (Assuming you have an index map, or fallback to find)
  // We explicitly cast it to ServiceEntity to leverage your strict contract
  const entity = KCROC_GRAPH.entities.find(
    (e) => e.id === entityId && e.entityType === 'Service'
  ) as ServiceEntity | undefined;

  // 2. Graceful Fallback
  if (!entity) {
    console.warn(`[Template Router] Entity ${entityId} missing from graph.`);
    // Depending on your migration phase, you could render children here 
    // to allow the wrapper to pass the static page as a fallback.
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  // 3. Resolve the UI-Agnostic Icon safely
  const ServiceIcon = ICON_MAP[entity.iconKey];

  // 4. Render the Data-Driven UI
  return (
    <>
      {/* Trigger your existing SEO Engine using the fully populated SEO sub-object */}
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

          {/* Conversion & Pricing Metadata Row */}
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

        {/* Core Features */}
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

        {/* Dynamic Common Issues (Replaces your old getRelatedIssuesForService logic) */}
        {entity.commonIssues && entity.commonIssues.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold mb-6">Common Symptoms We Fix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entity.commonIssues.map((issue) => (
                <div key={issue.id} className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                  <h3 className="text-xl font-medium mb-2">{issue.title}</h3>
                  <p className="text-neutral-400 mb-4">{issue.description}</p>
                  {issue.symptoms && (
                    <div className="flex flex-wrap gap-2">
                      {issue.symptoms.map((symptom, idx) => (
                        <span key={idx} className="text-xs bg-neutral-700 px-2 py-1 rounded text-neutral-300">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Conversion Logic */}
        {entity.conversion.showCall && (
          <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-neutral-800">
             {/* Replace with your actual styled CTA component */}
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Request {entity.pricing.quoteRequired ? 'Quote' : 'Booking'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
