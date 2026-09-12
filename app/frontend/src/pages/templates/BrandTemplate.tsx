// File: app/frontend/src/pages/templates/BrandTemplate.tsx
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { getIntentWhatsAppLink } from '../../utils/whatsappIntent';
import {
  Wrench,
  CheckCircle,
  AlertTriangle,
  MonitorSmartphone,
  ArrowRight,
  ShieldCheck,
  Thermometer,
  CircuitBoard,
  MapPin,
} from 'lucide-react';

const BrandTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, '');
  const brand = KCROC_GRAPH.brands.find((b) => b.slug === slug);

  if (!brand) return <Navigate to="/404" replace />;

  // NOTE: only 'brand-lenovo' currently has the full rich-brand-hub data set
  // (familyGroups, relatedServiceIds, relatedProblemIds, relatedGuidePaths,
  // repairProcess, technicalCapabilities, faqs). The KnowledgeGraph zod schema
  // marks these as defaulting to [] when absent, but that default is only
  // applied inside scripts/validate-build.ts's throwaway RawGraphSchema.parse()
  // call — it never gets written back onto the KCROC_GRAPH object that the app
  // actually renders from. So for every other brand (Dell, HP, Asus, Acer, MSI)
  // these fields are genuinely `undefined` at runtime, and calling `.map()` on
  // them crashes SSG. Default them here so the template degrades gracefully.
  const relatedServiceIds = brand.relatedServiceIds ?? [];
  const relatedProblemIds = brand.relatedProblemIds ?? [];
  const commonIssues = brand.commonIssues ?? [];
  const repairProcess = brand.repairProcess ?? [];
  const relatedGuidePaths = brand.relatedGuidePaths ?? [];
  const technicalCapabilities = brand.technicalCapabilities ?? [];
  const faqs = brand.faqs ?? [];
  const familyGroups = brand.familyGroups ?? [];

  const relatedServices = relatedServiceIds
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter(Boolean);

  const relatedProblems = relatedProblemIds
    .map((id) => KCROC_GRAPH.problems.find((problem) => problem.id === id))
    .filter(Boolean);

  const whatsappLink = getIntentWhatsAppLink('service', brand.title);
  const issueProblemMap: Record<string, string> = {
    'lenovo-no-power': 'problem-no-power',
    'lenovo-not-charging': 'problem-not-charging',
    'lenovo-overheating': 'problem-overheating',
    'lenovo-black-screen': 'problem-black-screen',
    'lenovo-hinge': 'problem-hinge-break',
    'lenovo-keyboard': 'problem-keyboard-fail',
    'lenovo-wifi': 'problem-wifi-fail',
    'lenovo-slow': 'problem-slow',
    'lenovo-boot': 'problem-windows-wont-boot',
    'lenovo-liquid': 'problem-liquid-spill',
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-200">
      <SEOEngine entityId={brand.id} />

      {/* Premium brand hero */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-brand-dark/55 px-6 pb-16 pt-24 backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_38%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/brands" className="hover:text-cyan-300">Brands</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-400">{brand.brandName}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-900/70 bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-300">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Independent {brand.brandName} repair in Kuwait
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                {brand.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                Component-level diagnosis and targeted repair for {brand.commonModels?.length
                  ? brand.commonModels.slice(0, 5).join(', ')
                  : `${brand.brandName} laptops`} — with the fault identified before repair
                is approved.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {['Free diagnosis first', 'Free Kuwait-wide pickup & delivery', 'No Fix, No Fee', '30-day warranty'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-200">
                    <CheckCircle className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 transition-colors hover:bg-cyan-400"
                >
                  WhatsApp a Technician
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/70 px-7 py-3.5 font-bold text-white hover:border-cyan-700 hover:text-cyan-300"
                >
                  Book a Repair
                </Link>
              </div>
            </div>

            {brand.contentImages?.[0] && (
              <figure className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl">
                <img
                  src={brand.contentImages[0].src}
                  alt={brand.contentImages[0].alt}
                  className="h-full min-h-72 w-full object-cover"
                  loading="eager"
                  width="1200"
                  height="800"
                />
                <figcaption className="border-t border-slate-800 px-5 py-3 text-sm text-slate-400">
                  {brand.contentImages[0].caption}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Brand families */}
        {familyGroups.length > 0 && (
          <section aria-labelledby="lenovo-families" className="mb-20">
            <div className="mb-9 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">{brand.brandName} portfolio</p>
              <h2 id="lenovo-families" className="text-3xl font-black text-white md:text-4xl">
                {brand.brandName} laptop families we repair
              </h2>
              <p className="mt-4 leading-7 text-slate-400">
                Different {brand.brandName} families use different chassis, thermal, charging and board
                designs. This page covers the major families without creating duplicate pages
                for every model.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {familyGroups.map((family) => (
                <article key={family.name} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white">{family.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{family.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {family.models.map((model) => (
                      <span key={model} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                        {model}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Repair focus</p>
                    <p className="text-sm leading-6 text-slate-300">{family.repairFocus.join(' · ')}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Problems */}
        {commonIssues.length > 0 && (
        <section aria-labelledby="lenovo-problems" className="mb-20">
          <div className="mb-9 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Repair coverage</p>
            <h2 id="lenovo-problems" className="text-3xl font-black text-white md:text-4xl">
              {brand.brandName} laptop problems we repair
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              We diagnose the symptom first, then follow the appropriate repair path. The links
              below point to KCROC's existing problem entities rather than creating thin,
              duplicate {brand.brandName} problem pages.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {commonIssues.map((issue) => {
              const relatedId = issueProblemMap[issue.id];
              const related = relatedProblems.find((problem) => problem?.id === relatedId);

              return (
                <article key={issue.id} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <AlertTriangle className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                    <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {issue.severity}
                    </span>
                  </div>
                  <h3 className="font-bold text-white">{issue.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{issue.description}</p>
                  {related && (
                    <Link to={`/${related.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-300 hover:text-cyan-200">
                      View diagnosis guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>
        )}

        {/* Technical expertise */}
        <section aria-labelledby="component-repair" className="mb-20 rounded-3xl border border-cyan-900/50 bg-cyan-950/20 p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Diagnosis before replacement</p>
              <h2 id="component-repair" className="text-3xl font-black text-white md:text-4xl">
                A {brand.brandName} motherboard fault does not automatically mean a new motherboard
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                A no-power, charging or intermittent fault can originate in a particular
                circuit or component. KCROC tests the hardware first and recommends the repair
                path supported by the diagnosis. Where technically practical, that can mean
                repairing the failed component rather than replacing the entire board.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                A complete motherboard replacement can still be the right answer when the board
                is not economically or technically repairable. The important step is diagnosing
                the actual fault before deciding.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {technicalCapabilities.map((capability) => (
                <div key={capability} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-brand-dark/50 p-4">
                  <CircuitBoard className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-6 text-slate-200">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        {relatedServices.length > 0 && (
        <section aria-labelledby="lenovo-services" className="mb-20">
          <div className="mb-9">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Related KCROC services</p>
            <h2 id="lenovo-services" className="text-3xl font-black text-white md:text-4xl">
              {brand.brandName} repair services
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => service && (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/55 p-6 transition-colors hover:border-cyan-900"
              >
                <Wrench className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-white group-hover:text-cyan-300">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{service.shortDescription || service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-300">
                  Explore service <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        )}

        {/* Process */}
        {repairProcess.length > 0 && (
        <section aria-labelledby="lenovo-process" className="mb-20">
          <div className="mb-9 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Repair workflow</p>
            <h2 id="lenovo-process" className="text-3xl font-black text-white md:text-4xl">
              How KCROC handles a {brand.brandName} repair
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repairProcess.map((step) => (
              <div key={step.step} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-6">
                <span className="text-sm font-black text-cyan-400">0{step.step}</span>
                <h3 className="mt-3 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Guides + evidence */}
        <section aria-labelledby="lenovo-resources" className="mb-20 grid gap-6 lg:grid-cols-2">
          {relatedGuidePaths.length > 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-7">
            <div className="flex items-center gap-3">
              <Thermometer className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              <h2 id="lenovo-resources" className="text-2xl font-black text-white">Useful repair guides</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              These existing KCROC guides support the problems covered on this brand hub.
            </p>
            <div className="mt-5 space-y-3">
              {relatedGuidePaths.map((guide) => (
                <Link key={guide.path} to={guide.path} className="flex items-center justify-between rounded-xl border border-slate-800 bg-brand-dark/50 p-4 font-semibold text-slate-200 hover:border-cyan-900 hover:text-cyan-300">
                  {guide.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          )}

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
            {brand.contentImages?.[1] && (
              <img
                src={brand.contentImages[1].src}
                alt={brand.contentImages[1].alt}
                className="h-64 w-full object-cover"
                loading="lazy"
                width="1200"
                height="800"
              />
            )}
            <div className="p-7">
              <h2 className="text-2xl font-black text-white">Real hardware context matters</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                KCROC's repair content is built around the actual hardware, symptoms and
                diagnostic path rather than generic brand descriptions.
              </p>
              <Link to="/gallery" className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">
                View repair gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Kuwait service */}
        <section aria-labelledby="lenovo-kuwait" className="mb-20 rounded-3xl border border-slate-800 bg-slate-900/55 p-7 md:p-10">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-7 w-7 flex-shrink-0 text-cyan-400" aria-hidden="true" />
            <div>
              <h2 id="lenovo-kuwait" className="text-3xl font-black text-white">{brand.brandName} laptop repair across Kuwait</h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                KCROC provides pickup and delivery service across Kuwait. If your {brand.brandName} has a
                power, charging, screen, hinge, thermal, battery or motherboard problem, start
                with the symptom and model; the repair path can then be determined from the diagnosis.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/near-me" className="rounded-full border border-slate-700 px-5 py-2.5 font-bold text-slate-200 hover:border-cyan-800 hover:text-cyan-300">
                  Computer repair near me
                </Link>
                <Link to="/laptop-repair-kuwait" className="rounded-full border border-slate-700 px-5 py-2.5 font-bold text-slate-200 hover:border-cyan-800 hover:text-cyan-300">
                  General laptop repair Kuwait
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section aria-labelledby="lenovo-faq" className="mb-20">
            <div className="mb-9 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Questions</p>
              <h2 id="lenovo-faq" className="text-3xl font-black text-white md:text-4xl">
                {brand.brandName} repair FAQs
              </h2>
            </div>
            <div className="divide-y divide-slate-800 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
              {faqs.map((faq) => (
                <details key={faq.id} className="group p-6">
                  <summary className="cursor-pointer list-none pr-8 font-bold text-white marker:hidden">
                    {faq.title}
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Final conversion */}
        <section className="rounded-3xl border border-cyan-900/60 bg-cyan-950/30 p-8 text-center md:p-12">
          <MonitorSmartphone className="mx-auto h-10 w-10 text-cyan-400" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Need {brand.brandName} laptop repair in Kuwait?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Tell us the {brand.brandName} model and what it is doing. KCROC can diagnose the fault first,
            explain the repair path and quote before repair work begins.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 hover:bg-cyan-400"
            >
              WhatsApp a Technician
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link to="/book" className="inline-flex items-center justify-center rounded-full border border-slate-600 px-7 py-3.5 font-bold text-white hover:border-cyan-700 hover:text-cyan-300">
              Book a Repair
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrandTemplate;
