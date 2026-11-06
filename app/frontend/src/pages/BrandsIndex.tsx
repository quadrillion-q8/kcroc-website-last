// File: app/frontend/src/pages/BrandsIndex.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ChevronRight, Tag } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

export default function BrandsIndex() {
  const brands = KCROC_GRAPH.brands;

  return (
    <>
      <SEOEngine entityId="page-brands" />

      <div className="min-h-screen bg-transparent text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Device and repair coverage</p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Laptop Brands We Repair in Kuwait</h1>
              <p className="text-lg leading-8 text-slate-400">
                Explore supported model families, common hardware symptoms and the repair routes KCROC already provides. We confirm the exact model and fault before recommending parts or paid work.
              </p>
            </div>
            <Link to="/pricing" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">
              View repair pricing <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => {
              const modelPreview = (brand.commonModels ?? []).slice(0, 3);
              const issuePreview = (brand.commonIssues ?? []).slice(0, 2);

              return (
                <Link
                  key={brand.id}
                  to={`/${brand.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/65 p-7 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-brand-dark">
                    <Cpu className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                  </div>

                  <h2 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
                    {brand.brandName}
                  </h2>
                  <p className="mb-5 text-sm leading-6 text-slate-400">{brand.description}</p>

                  {modelPreview.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Example model families</p>
                      <div className="flex flex-wrap gap-2">
                        {modelPreview.map((model) => (
                          <span key={model} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-300">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {issuePreview.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Common repair symptoms</p>
                      <ul className="space-y-2">
                        {issuePreview.map((issue) => (
                          <li key={issue.id} className="flex items-start gap-2 text-sm leading-5 text-slate-300">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                            {issue.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto border-t border-slate-800 pt-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Tag className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Starting price reference</span>
                        <span className="font-bold text-cyan-200">{brand.pricing?.displayLabel ?? 'Quote after diagnosis'}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-bold text-cyan-400 transition-colors group-hover:text-cyan-300">
                      Explore {brand.brandName} repair details <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-8 max-w-4xl text-xs leading-6 text-slate-500">
            Brand prices are general starting references for selected repair work, not a quote for every model or symptom. Parts, model compatibility and the confirmed fault can change the total. The final price is explained before paid repair begins.
          </p>
        </div>
      </div>
    </>
  );
}
