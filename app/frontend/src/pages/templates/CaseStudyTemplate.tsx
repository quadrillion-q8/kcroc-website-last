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
  ChevronRight,
  Microscope,
  ShieldCheck,
  TestTube2,
  Image as ImageIcon,
} from 'lucide-react';
import { SEOEngine } from '../../core/components/SEOEngine';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { KCROC_POLICY } from '../../constants/businessPolicy';

const entityHref = (entity: { slug: string; entityType: string; seo?: { canonicalUrl?: string } }) => {
  if (entity.seo?.canonicalUrl) {
    return entity.seo.canonicalUrl.replace(/^https?:\/\/[^/]+/, '') || '/';
  }
  switch (entity.entityType) {
    case 'Location': return `/location/${entity.slug}`;
    default: return `/${entity.slug}`;
  }
};

export default function CaseStudyTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { trackConversion } = useAnalytics();

  const caseStudy = KCROC_GRAPH.caseStudies.find(cs => cs.slug === slug);
  const business = KCROC_GRAPH.business;

  if (!caseStudy || !business) return null;

  const relatedBrand = caseStudy.brandId
    ? KCROC_GRAPH.brands?.find(brand => brand.id === caseStudy.brandId)
    : undefined;
  const relatedServices = (caseStudy.serviceIds ?? [])
    .map(id => KCROC_GRAPH.services.find(service => service.id === id))
    .filter(Boolean);
  const relatedProblems = (caseStudy.problemIds ?? [])
    .map(id => KCROC_GRAPH.problems?.find(problem => problem.id === id))
    .filter(Boolean);
  const relatedLocation = caseStudy.locationId
    ? KCROC_GRAPH.locations.find(location => location.id === caseStudy.locationId)
    : undefined;
  const relatedCases = KCROC_GRAPH.caseStudies
    .filter(cs => cs.id !== caseStudy.id && (
      (caseStudy.brandId && cs.brandId === caseStudy.brandId) ||
      (caseStudy.locationId && cs.locationId === caseStudy.locationId) ||
      (caseStudy.serviceIds ?? []).some(id => (cs.serviceIds ?? []).includes(id))
    ))
    .slice(0, 3);

  const warrantyDays = caseStudy.warranty?.durationDays ?? KCROC_POLICY.warranty.durationDays;
  const warrantyCoverage = caseStudy.warranty?.coverage ?? KCROC_POLICY.warranty.coverage;

  const waLink = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    `Hi KCROC, I saw the ${caseStudy.device} case study and need help with a similar issue.`
  )}`;

  const hasNarrative = Boolean(caseStudy.narrative);
  const evidence = [...(caseStudy.evidence ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <main className="w-full min-h-screen bg-transparent">
      <SEOEngine entityId={caseStudy.id} />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-slate-300 truncate">{caseStudy.title}</span>
        </nav>

        <header className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 mb-5">
            Repair Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {caseStudy.title}
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">{caseStudy.description}</p>
          {caseStudy.narrative?.clientContext && (
            <p className="text-slate-500 text-sm italic mt-3">{caseStudy.narrative.clientContext}</p>
          )}
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider block mb-2">Device</span>
            <span className="text-white font-bold text-sm leading-snug">{caseStudy.deviceModel ?? caseStudy.device}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <MapPin size={12} className="text-cyan-400" aria-hidden="true" /> Location
            </span>
            <span className="text-white font-bold text-sm">{relatedLocation?.title ?? caseStudy.location}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <Clock size={12} className="text-cyan-400" aria-hidden="true" /> Turnaround
            </span>
            <span className="text-white font-bold text-sm">{caseStudy.repairDuration ?? caseStudy.timeToRepair}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 mb-2">
              <Wallet size={12} className="text-cyan-400" aria-hidden="true" /> Cost vs. Replacement
            </span>
            <span className="text-emerald-400 font-bold text-sm leading-snug">{caseStudy.costVsReplacement}</span>
          </div>
        </div>

        {caseStudy.featuredImage?.hero && (
          <figure className="mb-14">
            <img
              src={caseStudy.featuredImage.hero.webp}
              alt={caseStudy.featuredImage.altText ?? caseStudy.title}
              width={caseStudy.featuredImage.hero.width}
              height={caseStudy.featuredImage.hero.height}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-slate-800"
            />
            {caseStudy.featuredImage.altText && (
              <figcaption className="text-xs text-slate-500 mt-2">{caseStudy.featuredImage.altText}</figcaption>
            )}
          </figure>
        )}

        {(relatedBrand || relatedServices.length || relatedProblems.length || relatedLocation) && (
          <section aria-labelledby="case-context" className="mb-14">
            <h2 id="case-context" className="text-2xl font-black text-white mb-5">Case Context</h2>
            <div className="flex flex-wrap gap-2">
              {relatedBrand && <Link to={entityHref(relatedBrand)} className="px-3 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-cyan-300 hover:border-cyan-500/40">{relatedBrand.brandName}</Link>}
              {relatedLocation && <Link to={entityHref(relatedLocation)} className="px-3 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-cyan-300 hover:border-cyan-500/40">{relatedLocation.title}</Link>}
              {relatedServices.map(service => service && <Link key={service.id} to={entityHref(service)} className="px-3 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-cyan-300 hover:border-cyan-500/40">{service.title}</Link>)}
              {relatedProblems.map(problem => problem && <Link key={problem.id} to={entityHref(problem)} className="px-3 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-cyan-300 hover:border-cyan-500/40">{problem.title}</Link>)}
            </div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
            <AlertTriangle size={22} className="text-orange-400" aria-hidden="true" />
            The Problem
          </h2>
          <p className="text-slate-300 leading-relaxed">{hasNarrative ? caseStudy.narrative!.hook : caseStudy.symptom}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5">
            <Stethoscope size={22} className="text-cyan-400" aria-hidden="true" />
            The Diagnosis
          </h2>
          {hasNarrative ? (
            <ol className="space-y-4">
              {caseStudy.narrative!.diagnosisSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4 text-slate-300 leading-relaxed">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : <p className="text-slate-300 leading-relaxed">{caseStudy.diagnosis}</p>}
        </section>

        {caseStudy.diagnosticTools.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5"><Microscope size={22} className="text-cyan-400" aria-hidden="true" /> Diagnostic Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.diagnosticTools.map(tool => <div key={tool} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-slate-300">{tool}</div>)}
            </div>
          </section>
        )}

        {(caseStudy.partsReplaced.length > 0 || caseStudy.componentsTested.length > 0) && (
          <section className="mb-14 grid md:grid-cols-2 gap-6">
            {caseStudy.componentsTested.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4">Components Tested</h2>
                <ul className="space-y-2 text-slate-300 text-sm">{caseStudy.componentsTested.map(item => <li key={item}>• {item}</li>)}</ul>
              </div>
            )}
            {caseStudy.partsReplaced.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4">Parts Replaced</h2>
                <ul className="space-y-2 text-slate-300 text-sm">{caseStudy.partsReplaced.map(item => <li key={item}>• {item}</li>)}</ul>
              </div>
            )}
          </section>
        )}

        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5"><Wrench size={22} className="text-cyan-400" aria-hidden="true" /> The Repair Process</h2>
          {hasNarrative ? (
            <ol className="space-y-4">
              {caseStudy.narrative!.repairSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4 text-slate-300 leading-relaxed">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : <p className="text-slate-300 leading-relaxed">{caseStudy.repair}</p>}
        </section>

        {evidence.length > 0 && (
          <section className="mb-14" aria-labelledby="repair-evidence">
            <h2 id="repair-evidence" className="text-2xl font-black text-white mb-5 flex items-center gap-2.5"><ImageIcon size={22} className="text-cyan-400" aria-hidden="true" /> Repair Evidence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {evidence.map(asset => (
                <figure key={asset.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                  <img src={asset.src} alt={asset.alt} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                  <figcaption className="p-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">{asset.type}</span>
                    <p className="text-sm text-slate-400 mt-1">{asset.caption ?? asset.alt}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {caseStudy.testingPerformed.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5"><TestTube2 size={22} className="text-emerald-400" aria-hidden="true" /> Testing &amp; Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseStudy.testingPerformed.map(test => <div key={test} className="flex gap-3 items-start bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-slate-300"><CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />{test}</div>)}
            </div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2.5"><CheckCircle2 size={22} className="text-emerald-400" aria-hidden="true" /> The Outcome</h2>
          <p className="text-slate-300 leading-relaxed">{hasNarrative ? caseStudy.narrative!.closingOutcome : caseStudy.outcome}</p>
        </section>

        {hasNarrative && caseStudy.narrative!.urgentWarning && (
          <div className="mb-14 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <p className="text-red-300 text-sm leading-relaxed font-medium">{caseStudy.narrative!.urgentWarning}</p>
          </div>
        )}

        <section className="mb-14 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2"><ShieldCheck size={20} className="text-emerald-400" aria-hidden="true" /> Warranty</h2>
          <p className="text-slate-300 leading-relaxed">This repair is covered by KCROC's {warrantyDays}-day warranty. {warrantyCoverage}</p>
        </section>

        {relatedCases.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-black text-white mb-5">Related Repair Cases</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedCases.map(related => (
                <Link key={related.id} to={`/case-studies/${related.slug}`} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors">
                  <h3 className="font-bold text-white text-sm leading-snug mb-2">{related.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3">{related.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center">
          <h2 className="text-xl font-black text-white mb-3">Need a similar repair?</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Free diagnostic, free pick &amp; drop across Kuwait, and a {warrantyDays}-day warranty on every eligible repair.
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
