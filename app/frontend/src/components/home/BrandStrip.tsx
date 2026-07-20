// File: app/frontend/src/components/home/BrandStrip.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const BrandStrip = () => {
  // Pull real brand entities from the graph, sorted by navigationPriority
  const brands = [...KCROC_GRAPH.brands].sort(
    (a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0)
  );

  const { trackConversion } = useAnalytics();

  if (brands.length === 0) return null;

  return (
    <section
      aria-label="Brands we service"
      className="w-full border-y border-slate-800/50 bg-slate-900/20 py-4 sm:py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3 sm:mb-6">
          Trusted Repair Partner For Every Major Brand
        </p>
        {/* Mobile: horizontal touch-scroll strip. Desktop (sm+): wrapped, centered pills. */}
        <div className="scroll-row gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:items-center sm:justify-center sm:overflow-visible">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={`/${brand.slug}`}
              onClick={() => trackConversion('cta_click', { cta_name: 'brand_strip_click', button_position: 'brand_strip', brand: brand.brandName })}
              className="scroll-row-item text-sm font-semibold text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 rounded-full px-4 py-2 transition-all whitespace-nowrap"
            >
              {brand.brandName}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
