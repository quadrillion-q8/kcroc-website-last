import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-16 px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Service Areas</h2>
        <div className="flex flex-wrap gap-3">
          {areas.map((area: string) => (
            <span key={area} className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 border border-slate-700">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
