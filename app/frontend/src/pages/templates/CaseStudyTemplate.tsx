// File: app/frontend/src/pages/templates/CaseStudyTemplate.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Wallet,
  AlertTriangle,
  Stethoscope,
  Wrench,
  CheckCircle2,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { SEOEngine } from '../../core/components/SEOEngine';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export default function CaseStudyTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { trackConversion } = useAnalytics();

  const caseStudy = KCROC_GRAPH.caseStudies.find(cs => cs.slug === slug);
  const business = KCROC_GRAPH.business;

  if (!caseStudy || !business) return null;

  const waLink = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    `Hi KCROC, I saw the ${caseStudy.device} case study and need help with a similar issue.`
  )}`;

  const hasNarrative = Boolean(caseStudy.narrative);

  return (
    <main className="w-full min-h-screen bg-transparent">
      <SEOEngine entityId={caseStudy.id} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-slate-300 truncate">{caseStudy.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 mb-5">
            Repair Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {caseStudy.title}
          </h1>
          {hasNarrative && caseStudy.narrative?.clientContext && (
            <p className="text-slate-400 text-sm italic">{caseStudy.narrative.clientContext}</p>
          )}
        </header>

        {/* Quick facts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider block mb-2">Device</span>
            <span className="text-white font-bold text-sm leading-snug">{caseStudy.device}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <MapPin size={12} className="text-cyan-400" aria-hidden="true" /> Location
            </span>
            <span className="text-white font-bold text-sm">{caseStudy.location}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <Clock size={12} className="text-cyan-400" aria-hidden="true" /> Turnaround
            </span>
            <span className="text-white font-bold text-sm">{caseStudy.timeToRepair}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <Wallet size={12} className="text-cyan-400" aria-hidden="true" /> Cost vs. Replacement
            </span>
            <span className="text-emerald-400 font-bold text-sm leading-snug">{caseStudy.costVsReplacement}</span>
          </div>
        </div>

        {/* Placeholder: diagnostic/repair photo — wire up featuredImage on
            CaseStudyEntity once real repair photos are available */}
        {/* {caseStudy.featuredImage?.hero && (
          <img src={caseStudy.featuredImage.hero.webp} alt={caseStudy.featuredImage.altText ?? caseStudy.title} className="w-full rounded-2xl mb-14 border border-slate-800" />
        )} */}

        {hasNarrative ? (
          <>
            {/* The Problem */}
            <section className="mb-14">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
                <AlertTriangle size={22} className="text-orange-400" aria-hidden="true" />
                The Problem
              </h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.narrative!.hook}</p>
            </section>

            {/* The Diagnosis */}
            <section className="mb-14">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
                <Stethoscope size={22} className="text-cyan-400" aria-hidden="true" />
                The Diagnosis
              </h2>
              <ol className="space-y-4">
                {caseStudy.narrative!.diagnosisSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-slate-300 leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* The Repair Process */}
            <section className="mb-14">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
                <Wrench size={22} className="text-cyan-400" aria-hidden="true" />
                The Repair Process
              </h2>
              <ol className="space-y-4">
                {caseStudy.narrative!.repairSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-slate-300 leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* The Outcome */}
            <section className="mb-14">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
                <CheckCircle2 size={22} className="text-emerald-400" aria-hidden="true" />
                The Outcome
              </h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.narrative!.closingOutcome}</p>
            </section>

            {/* Urgent warning, if present */}
            {caseStudy.narrative!.urgentWarning && (
              <div className="mb-14 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                <p className="text-red-300 text-sm leading-relaxed font-medium">
                  {caseStudy.narrative!.urgentWarning}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Fallback: flat-field rendering for case studies without narrative content yet */}
            <section className="mb-10">
              <h2 className="text-xl font-black text-white mb-3">The Symptom</h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.symptom}</p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-black text-white mb-3">The Diagnosis</h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.diagnosis}</p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-black text-white mb-3">The Repair Process</h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.repair}</p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-black text-white mb-3">The Outcome</h2>
              <p className="text-slate-300 leading-relaxed">{caseStudy.outcome}</p>
            </section>
          </>
        )}

        {/* Closing CTA */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-black text-white mb-3">Need a similar repair?</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Free diagnostic, free pick &amp; drop across all Kuwait, and a 30-day warranty on every repair.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('whatsapp_click', { cta_name: 'case_study_cta', button_position: 'case_study_footer' })}
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp Us Now
          </a>
        </div>
      </article>
    </main>
  );
}
