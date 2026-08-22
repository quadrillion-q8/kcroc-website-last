// File: app/frontend/src/pages/BrandsIndex.tsx
//
// 🩹 FIX: "/brands" previously had no route at all — it fell through to the
// dynamic `:slug` handler (DynamicRoutes.tsx), which only matches slugs that
// exist as Services/Brands/Problems in KCROC_GRAPH, so it 404'd. It was also
// missing from the Brands mega menu dropdown (see NavigationCompiler.ts).
// This page + its route in App.tsx fixes both.
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ChevronRight } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

export default function BrandsIndex() {
  const brands = KCROC_GRAPH.brands;

  return (
    <>
      <SEOEngine entityId="page-brands" />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Supported Brands</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              We repair every major laptop brand at the component level. Select yours below for
              model-specific issues and pricing.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/${brand.slug}`}
                className="group block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Cpu className="w-7 h-7 text-cyan-400" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {brand.brandName}
                </h2>

                <p className="text-slate-400 mb-6 line-clamp-2">{brand.description}</p>

                <div className="flex items-center text-sm font-bold text-cyan-500 group-hover:text-cyan-400">
                  Repair Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
