// File: app/frontend/src/pages/CaseStudiesIndex.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { canPublishCaseStudyPhotos, isCaseStudyPublishable } from '../utils/publicationEligibility';

export default function CaseStudiesIndex() {
  // Pull case studies from your data graph, or default to an empty array if not yet populated
  const caseStudies = (KCROC_GRAPH.caseStudies || []).filter(isCaseStudyPublishable);

  return (
    <>
      <SEOEngine entityId="page-case-studies" />
      <div className="min-h-screen bg-transparent pt-32 pb-24 px-6 relative z-10">
        
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Repair <span className="text-cyan-400">Case Studies</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Deep dives into complex motherboard repairs, micro-soldering recoveries, and hardware diagnostics performed in our Hawalli lab.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.length > 0 ? (
            caseStudies.map((study) => (
              <Link 
                key={study.id} 
                to={`/case-studies/${study.slug}`}
                className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-48 bg-brand-dark border-b border-slate-800 relative overflow-hidden">
                  {canPublishCaseStudyPhotos(study) && study.featuredImage?.thumbnail ? (
                    <img
                      src={study.featuredImage.thumbnail.webp}
                      alt={study.featuredImage.altText ?? study.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute bottom-4 left-4 bg-brand-dark/80 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 uppercase">
                    {study.deviceCategory?.replace('-', ' ') || 'Hardware Repair'}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                    {study.description}
                  </p>
                  <div className="flex items-center text-sm font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Successful Repair
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-12 text-center">
              <h3 className="text-2xl font-bold text-slate-300 mb-2">Documentation in Progress</h3>
              <p className="text-slate-500">We publish detailed repair stories only after the supporting records and publication permissions have been confirmed.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/services" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400">Explore repair services <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-200 hover:border-cyan-500/40">Ask about a repair</Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
