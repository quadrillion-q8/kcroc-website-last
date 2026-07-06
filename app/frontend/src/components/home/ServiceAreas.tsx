// File: app/frontend/src/components/home/ServiceAreas.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { MapPin } from 'lucide-react';

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">We Serve Across Kuwait</h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {areas.map((area: string) => (
            <span key={area} className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-cyan-100 border border-slate-700 hover:border-cyan-500 transition-colors">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
