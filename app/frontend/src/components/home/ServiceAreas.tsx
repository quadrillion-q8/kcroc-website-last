// File: app/frontend/src/components/home/ServiceAreas.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { MapPin } from 'lucide-react';

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-8">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          <h2 className="text-white">We Serve Across Kuwait</h2>
        </div>

        {/* Mobile: horizontal touch-scroll strip. Desktop (sm+): wrapped pills. */}
        <div className="scroll-row gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          {areas.map((area: string) => (
            <span key={area} className="scroll-row-item px-4 py-2 bg-slate-800 rounded-lg text-sm text-cyan-100 border border-slate-700 hover:border-cyan-500 transition-colors whitespace-nowrap">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
