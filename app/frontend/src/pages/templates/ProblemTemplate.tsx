// File: app/frontend/src/pages/templates/ProblemTemplate.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph'; 
import { SEOEngine } from '../../core/components/SEOEngine';
import { getIntentWhatsAppLink } from '../../utils/whatsappIntent';
import { AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight, Search, Wrench, MapPin, HelpCircle, BookOpen, Clock3 } from 'lucide-react';

const ProblemTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);

  if (!problem) return <Navigate to="/404" replace />;

  const relatedServices = (problem.relatedServiceIds ?? [])
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  // Real repairs already tagged with this exact problem — proof, not promises.
  const relatedCaseStudies = KCROC_GRAPH.caseStudies.filter((cs) =>
    cs.problemIds?.includes(problem.id)
  );

  const getContentImage = (placement: 'causes' | 'solution') =>
    problem.contentImages?.find((img) => img.placement === placement);

  const relatedGuideHref = problem.relatedGuideSlug ? `/guides/${problem.relatedGuideSlug}` : null;

  const ContentImage = ({ image }: { image: NonNullable<typeof problem.contentImages>[number] }) => (
    <a
      href="/gallery"
      className="group block mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-cyan-500/40 transition-colors"
      aria-label={`${image.alt} — view more repair photos in our gallery`}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full max-h-80 object-cover group-hover:opacity-90 transition-opacity"
      />
      {image.caption && (
        <p className="text-xs text-slate-400 px-5 py-3 border-t border-slate-800/70">
          {image.caption}
        </p>
      )}
    </a>
  );

  return (
    // ✅ FIXED: Changed bg-slate-950 to bg-transparent
    <div className="bg-transparent min-h-screen text-slate-200">
      <SEOEngine entityId={problem.id} />
      
      {/* Hero Section - Added glass effect */}
      <section className="pt-24 pb-16 px-6 bg-slate-900/40 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <AlertOctagon className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {problem.title}
          </h1>
          <div className="p-4 bg-slate-950/60 backdrop-blur-md rounded-xl border border-slate-700 text-left inline-block shadow-inner">
            <span className="text-sm font-bold text-rose-400 uppercase tracking-wider block mb-1">Symptom</span>
            <p className="text-slate-300">{problem.symptom}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto relative z-10">
        <div className="space-y-14">

          {problem.intro && (
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-8 text-slate-300">
                {problem.intro}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-900/60 bg-cyan-950/30 px-4 py-2 text-cyan-200">
                  <Wrench className="w-4 h-4" /> Technician-led diagnosis
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-slate-300">
                  <MapPin className="w-4 h-4" /> Kuwait-specific guidance
                </span>
              </div>
            </div>
          )}

          {problem.decisionTree && problem.decisionTree.length > 0 && (
            <section aria-labelledby="diagnostic-path">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Start here</p>
                <h2 id="diagnostic-path" className="text-3xl font-black text-white mt-2">First, identify what “won’t turn on” means</h2>
                <p className="mt-3 text-slate-400 max-w-3xl">
                  People often use the same phrase for a dead laptop, a black screen and a Windows boot failure. Choosing the correct path prevents unnecessary parts replacement.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {problem.decisionTree.map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="font-bold text-white">{item.symptom}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.direction}</p>
                    {item.href && item.linkLabel && (
                      <a href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
                        {item.linkLabel} <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="safe-checks">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Safe troubleshooting</p>
              <h2 id="safe-checks" className="text-3xl font-black text-white mt-2">What to check before opening the laptop</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(problem.diagnosticSteps ?? []).map((step) => (
                <article key={step.step} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-black text-cyan-300 border border-cyan-500/20">{step.step}</span>
                    <h3 className="font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="common-causes">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Root causes</p>
              <h2 id="common-causes" className="text-3xl font-black text-white mt-2">Common reasons a laptop has no power</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {getContentImage('causes') && <ContentImage image={getContentImage('causes')!} />}
              <div className="space-y-3">
                {problem.causes.map((cause, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span className="text-slate-300">{cause}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {problem.doNotDo && (
            <section aria-labelledby="safety">
              <div className="rounded-2xl border border-rose-900/50 bg-rose-950/25 p-6 md:p-8">
                <h2 id="safety" className="mb-3 flex items-center gap-2 text-2xl font-black text-rose-300">
                  <ShieldAlert className="h-6 w-6" /> What NOT to do
                </h2>
                <p className="leading-7 text-rose-100/80">{problem.doNotDo}</p>
                {problem.safetyNotes && (
                  <ul className="mt-5 grid gap-3 md:grid-cols-2">
                    {problem.safetyNotes.map((note, idx) => (
                      <li key={idx} className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 text-sm leading-6 text-rose-100/80">{note}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {problem.kuwaitContext && problem.kuwaitContext.length > 0 && (
            <section aria-labelledby="kuwait-context">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-7 md:p-9">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-7 w-7 flex-shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Local expertise</p>
                    <h2 id="kuwait-context" className="mt-2 text-3xl font-black text-white">What matters in Kuwait</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {problem.kuwaitContext.map((item, idx) => (
                    <p key={idx} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-sm leading-6 text-slate-300">{item}</p>
                  ))}
                </div>
              </div>
            </section>
          )}

          {problem.technicianMethod && problem.technicianMethod.length > 0 && (
            <section id="technician-diagnosis" aria-labelledby="technician-diagnosis-title">
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Inside the lab</p>
                <h2 id="technician-diagnosis-title" className="mt-2 text-3xl font-black text-white">How KCROC diagnoses a genuinely dead laptop</h2>
                <p className="mt-3 max-w-3xl text-slate-400">
                  When the external power path checks out but the laptop remains dead, the useful question is where power stops progressing through the board—not which expensive part to replace first.
                </p>
              </div>
              <div className="space-y-3">
                {problem.technicianMethod.map((step) => (
                  <div key={step.step} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:grid-cols-[56px_180px_1fr] md:items-start">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10 font-black text-cyan-300 border border-cyan-500/20">{step.step}</span>
                    <h3 className="pt-2 font-bold text-white">{step.title}</h3>
                    <p className="text-sm leading-6 text-slate-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="kcroc-solution">
            <div className="rounded-3xl border border-cyan-900/50 bg-cyan-950/20 p-7 shadow-2xl md:p-9">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-cyan-400" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">The KCROC approach</p>
                  <h2 id="kcroc-solution" className="mt-2 text-3xl font-black text-white">Diagnose first. Repair the failed stage.</h2>
                </div>
              </div>
              {getContentImage('solution') && <div className="mt-7"><ContentImage image={getContentImage('solution')!} /></div>}
              <p className="mt-6 text-lg leading-8 text-slate-300">{problem.solution}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={getIntentWhatsAppLink("service", problem.title)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-4 font-black text-slate-950 transition-colors hover:bg-cyan-300">
                  Book a Free Diagnostic <ArrowRight className="h-5 w-5" />
                </a>
                {relatedGuideHref && (
                  <a href={relatedGuideHref} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-7 py-4 font-bold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-200">
                    <BookOpen className="h-5 w-5" /> Read the full troubleshooting guide
                  </a>
                )}
              </div>
            </div>
          </section>

          {problem.coveredBrands && problem.coveredBrands.length > 0 && (
            <section aria-labelledby="brands-covered">
              <h2 id="brands-covered" className="text-2xl font-black text-white">Brands and devices covered</h2>
              <p className="mt-2 text-slate-400">The no-power diagnostic approach applies across major laptop designs; the exact power architecture varies by model.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {problem.coveredBrands.map((brand) => (
                  <span key={brand} className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">{brand}</span>
                ))}
              </div>
            </section>
          )}

          {relatedServices.length > 0 && (
            <section aria-labelledby="handled-under">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Repair services</p>
              <h2 id="handled-under" className="mt-2 text-2xl font-black text-white">Handled under</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <a key={service.id} href={`/${service.slug}`} className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-bold text-cyan-300 hover:border-cyan-500/40">
                    {service.title}
                  </a>
                ))}
              </div>
            </section>
          )}

          {relatedCaseStudies.length > 0 && (
            <section aria-labelledby="real-repairs">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">First-party proof</p>
                <h2 id="real-repairs" className="mt-2 text-3xl font-black text-white">A real no-power repair from our Hawalli lab</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {relatedCaseStudies.map((cs) => (
                  <a key={cs.id} href={`/case-studies/${cs.slug}`} className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">{cs.device} — {cs.location}</p>
                    <h3 className="mt-3 text-xl font-black text-white">{cs.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{cs.outcome}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">Read the repair case <ArrowRight className="h-4 w-4" /></p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {problem.faqs && problem.faqs.length > 0 && (
            <section aria-labelledby="faq">
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Questions customers ask</p>
                <h2 id="faq" className="mt-2 text-3xl font-black text-white">Laptop won't turn on: FAQ</h2>
              </div>
              <div className="divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
                {problem.faqs.map((faq, idx) => (
                  <details key={idx} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center gap-3 font-bold text-white">
                      <HelpCircle className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                      <span>{faq.question}</span>
                    </summary>
                    <p className="mt-4 pl-8 text-sm leading-7 text-slate-400">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {relatedCaseStudies.length > 0 && (
            <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/15 p-6 text-sm text-slate-300">
              <p className="font-bold text-emerald-300">Real repair evidence</p>
              <p className="mt-2">This page links to a documented KCROC repair case rather than using a generic “success story” claim. The linked case study records the device, diagnosis, repair method and outcome.</p>
            </div>
          )}

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> Updated September 10, 2026</span>
              <span>Technical guidance by KCROC • Hawalli, Kuwait</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProblemTemplate;
