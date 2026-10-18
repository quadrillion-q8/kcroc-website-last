// File: app/frontend/src/pages/CaseStudiesIndex.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { canPublishCaseStudyPhotos, isCaseStudyPublishable } from '../utils/publicationEligibility';

const diagnosticMethods = [
  {
    number: '01',
    title: 'Motherboard fault diagnosis',
    description:
      'A no-power symptom can originate at several points in the power path. A careful diagnosis checks input power, standby rails, possible shorts and power-sequence behavior before deciding whether component-level repair is appropriate.',
    href: '/motherboard-repair-kuwait',
    linkLabel: 'Explore motherboard repair',
  },
  {
    number: '02',
    title: 'Liquid-damage assessment',
    description:
      'After a spill, switch the device off and avoid repeated power attempts. An assessment considers contamination, corrosion, affected circuits and whether a component-level repair is technically sensible before a repair quote is approved.',
    href: '/laptop-liquid-damage-repair-kuwait',
    linkLabel: 'Explore liquid-damage repair',
  },
  {
    number: '03',
    title: 'Laptop screen fault isolation',
    description:
      'A cracked or blank display does not always mean the panel is the only fault. Diagnosis can include the LCD panel, display cable, hinges and chassis, plus external-display behavior; final checks cover the replacement image and brightness.',
    href: '/laptop-screen-repair-kuwait',
    linkLabel: 'Explore screen repair',
  },
];

export default function CaseStudiesIndex() {
  // Customer-specific case studies appear only after the publication gate passes.
  const caseStudies = (KCROC_GRAPH.caseStudies || []).filter(isCaseStudyPublishable);

  return (
    <>
      <SEOEngine entityId="page-case-studies" />
      <div className="min-h-screen bg-transparent pt-32 pb-24 px-6 relative z-10">
        <header className="max-w-7xl mx-auto text-center mb-14">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
            Repair evidence &amp; diagnostic methods
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Repair Case Studies <span className="text-cyan-400">&amp; Methods</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Learn how hardware faults are assessed, how a repair path is selected, and what should be tested before a device is returned. Customer-specific case reports are published only when supporting records and the required permissions are confirmed.
          </p>
        </header>

        <section aria-labelledby="published-cases-heading" className="max-w-7xl mx-auto mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <div>
              <h2 id="published-cases-heading" className="text-2xl md:text-3xl font-black text-white">
                Published customer case studies
              </h2>
              <p className="text-slate-400 mt-2">
                Individual repair stories are shown here only after their publication checks are complete.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                      {study.description}
                    </p>
                    <div className="flex items-center text-sm font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Documented repair story
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">
                  Customer-specific reports are not currently available
                </h3>
                <p className="text-slate-400 max-w-3xl leading-relaxed">
                  We do not present an individual repair story as verified until the relevant technical record, supporting evidence and publication permissions have been confirmed. In the meantime, the diagnostic methods below explain the kinds of checks that help guide a repair decision without claiming a particular customer outcome.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/services" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400">
                    Explore repair services <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-200 hover:border-cyan-500/40">
                    Ask about a repair
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="diagnostic-methods-heading" className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">
              Diagnostic methods
            </p>
            <h2 id="diagnostic-methods-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
              How difficult repair decisions are made
            </h2>
            <p className="text-slate-400 leading-relaxed">
              These are general technical explanations, not claims about an individual customer job. The actual checks depend on the device, symptoms and diagnostic findings; KCROC provides a quote before paid repair work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diagnosticMethods.map((method) => (
              <article key={method.number} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 md:p-8 flex flex-col">
                <span className="text-sm font-black tracking-widest text-cyan-400 mb-5">{method.number}</span>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-grow">{method.description}</p>
                <Link to={method.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
                  {method.linkLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-500 leading-relaxed max-w-4xl">
            Photos, customer details, quotations and job-specific outcomes are included only when their use is appropriately documented and permitted. A diagnostic-method overview should not be read as proof that a specific repair was completed.
          </p>
        </section>
      </div>
    </>
  );
}
