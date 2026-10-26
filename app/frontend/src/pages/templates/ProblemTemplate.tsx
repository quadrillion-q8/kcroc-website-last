// File: app/frontend/src/pages/templates/ProblemTemplate.tsx
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { getIntentWhatsAppLink } from '../../utils/whatsappIntent';
import { AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight, Wrench, MapPin, HelpCircle, BookOpen, Clock3, ExternalLink } from 'lucide-react';

const ProblemTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);

  if (!problem) return <Navigate to="/404" replace />;

  const isOverheating = problem.id === 'problem-overheating';
  const problemLabel = problem.title
    .replace(/\s+in Kuwait$/i, '')
    .replace(/\s+Kuwait$/i, '')
    .trim();
  const updatedLabel = problem.seo?.lastModified
    ? new Date(problem.seo.lastModified).toLocaleDateString('en-KW', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kuwait',
      })
    : null;

  const relatedServices = (problem.relatedServiceIds ?? [])
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const relatedBrands = (problem.relatedBrandIds ?? [])
    .map((id) => KCROC_GRAPH.brands.find((brand) => brand.id === id))
    .filter((brand): brand is NonNullable<typeof brand> => Boolean(brand));

  const getContentImage = (placement: 'causes' | 'solution') =>
    problem.contentImages?.find((img) => img.placement === placement);

  const relatedGuideHref = problem.relatedGuideSlug ? `/guides/${problem.relatedGuideSlug}` : null;

  const ContentImage = ({ image }: { image: NonNullable<typeof problem.contentImages>[number] }) => (
    <Link
      to="/gallery"
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
    </Link>
  );

  return (
    // ✅ FIXED: Changed bg-brand-dark to bg-transparent
    <div className="bg-transparent min-h-screen text-slate-200">
      <SEOEngine entityId={problem.id} />
      
      {/* Hero Section - Added glass effect */}
      <section className="pt-24 pb-16 px-6 bg-slate-900/40 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <AlertOctagon className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {problem.title}
          </h1>
          <div className="p-4 bg-brand-dark/60 backdrop-blur-md rounded-xl border border-slate-700 text-left inline-block shadow-inner">
            <span className="text-sm font-bold text-rose-400 uppercase tracking-wider block mb-1">Symptom</span>
            <p className="text-slate-300">{problem.symptom}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10">
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
                <h2 id="diagnostic-path" className="text-3xl font-black text-white mt-2">
                  {isOverheating ? 'Identify the overheating pattern' : 'Start by identifying the symptom'}
                </h2>
                <p className="mt-3 text-slate-400 max-w-3xl">
                  {isOverheating
                    ? 'Heat, fan noise and slowdown are clues, not proof of a failed part. Match the pattern below to the safest next step before assuming the laptop needs new thermal paste or a full cleaning.'
                    : 'Match the symptoms below to a likely next step. Different faults can look alike, so do not choose a replacement part based on one symptom alone.'}
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
              <h2 id="safe-checks" className="text-3xl font-black text-white mt-2">
                {isOverheating ? 'Safe checks before opening your laptop' : 'Safe checks before opening the device'}
              </h2>
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
              <h2 id="common-causes" className="text-3xl font-black text-white mt-2">
                {isOverheating ? 'Common causes of laptop overheating' : 'Possible underlying causes'}
              </h2>
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
                    <p key={idx} className="rounded-2xl border border-slate-800 bg-brand-dark/40 p-5 text-sm leading-6 text-slate-300">{item}</p>
                  ))}
                </div>
              </div>
            </section>
          )}

          {problem.expertNotes && problem.expertNotes.length > 0 && (
            <section aria-labelledby="expert-notes">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Technical context</p>
                <h2 id="expert-notes" className="mt-2 text-3xl font-black text-white">What a reliable diagnosis should account for</h2>
                <p className="mt-3 max-w-3xl text-slate-400">
                  These distinctions help prevent unnecessary part replacement. The correct procedure and limits depend on the exact laptop model.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {problem.expertNotes.map((note) => (
                  <article key={note.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <h3 className="font-bold text-white">{note.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{note.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {problem.technicianMethod && problem.technicianMethod.length > 0 && (
            <section id="technician-diagnosis" aria-labelledby="technician-diagnosis-title">
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Inside the lab</p>
                <h2 id="technician-diagnosis-title" className="mt-2 text-3xl font-black text-white">
                  {isOverheating ? 'How KCROC diagnoses a laptop cooling fault' : 'How KCROC investigates the fault'}
                </h2>
                <p className="mt-3 max-w-3xl text-slate-400">
                  {isOverheating
                    ? 'The goal is to confirm whether heat is caused by restricted airflow, fan hardware, thermal contact, software load or another model-specific issue. Cleaning and re-pasting are not assumed to be the answer before inspection.'
                    : 'The goal is to identify where the fault occurs and verify the evidence before recommending a repair, rather than replacing an expensive part based on symptoms alone.'}
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
                  <Link to={relatedGuideHref} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-7 py-4 font-bold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-200">
                    <BookOpen className="h-5 w-5" /> Read the full troubleshooting guide
                  </Link>
                )}
              </div>
            </div>
          </section>

          {((problem.coveredBrands && problem.coveredBrands.length > 0) || relatedBrands.length > 0) && (
            <section aria-labelledby="brands-covered">
              <h2 id="brands-covered" className="text-2xl font-black text-white">Brands and devices covered</h2>
              <p className="mt-2 text-slate-400">The diagnostic approach applies across major laptop designs; the exact hardware path varies by model.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedBrands.map((brand) => (
                  <Link key={brand.id} to={`/${brand.slug}`} className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-bold text-cyan-300 hover:border-cyan-500/40">
                    {brand.brandName}
                  </Link>
                ))}
                {(problem.coveredBrands ?? []).filter((name) => !relatedBrands.some((brand) => brand.brandName.toLowerCase() === name.toLowerCase())).map((brand) => (
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
                  <Link key={service.id} to={`/${service.slug}`} className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-bold text-cyan-300 hover:border-cyan-500/40">
                    {service.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {problem.relatedResourcePaths && problem.relatedResourcePaths.length > 0 && (
            <section aria-labelledby="related-resources">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Continue the diagnosis</p>
                <h2 id="related-resources" className="mt-2 text-2xl font-black text-white">Related guides and repair resources</h2>
                <p className="mt-2 text-slate-400">Use the most specific guide or service page for the symptom you are actually seeing.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {problem.relatedResourcePaths.map((resource) => (
                  <Link key={resource.path} to={resource.path} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-cyan-500/40 transition-colors">
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{resource.label}</span>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {problem.technicalReferences && problem.technicalReferences.length > 0 && (
            <section aria-labelledby="technical-references">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Evidence & further reading</p>
                <h2 id="technical-references" className="mt-2 text-2xl font-black text-white">Manufacturer guidance and technical references</h2>
                <p className="mt-2 max-w-3xl text-slate-400">
                  These manufacturer resources support the general guidance above. Exact operating limits, diagnostics and service procedures vary by model; follow the documentation for your device.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {problem.technicalReferences.map((reference) => (
                  <a
                    key={reference.url}
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-cyan-500/40"
                  >
                    <span className="flex items-start justify-between gap-4 font-bold text-white group-hover:text-cyan-300">
                      <span>{reference.label}</span>
                      <ExternalLink aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{reference.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {problem.faqs && problem.faqs.length > 0 && (
            <section aria-labelledby="faq">
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Questions customers ask</p>
                <h2 id="faq" className="mt-2 text-3xl font-black text-white">
                  {isOverheating ? 'Laptop overheating in Kuwait: frequently asked questions' : `${problemLabel}: frequently asked questions`}
                </h2>
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

                    <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
              {updatedLabel && (
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> Updated {updatedLabel}</span>
              )}
              <span>Technical guidance by <Link to="/about" className="text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-cyan-300">KCROC</Link> • Hawalli, Kuwait</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProblemTemplate;
