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
      className="w-full border-y border-slate-800/50 bg-slate-900/20 py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-emerald-500 uppercase tracking-wider mb-6">
          Trusted Repair Partner For Every Major Brand
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={`/${brand.slug}`}
              onClick={() => trackConversion('cta_click', { cta_name: 'brand_strip_click', button_position: 'brand_strip', brand: brand.brandName })}
              className="text-sm font-semibold text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 rounded-full px-4 py-2 transition-all"
            >
              {brand.brandName}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
