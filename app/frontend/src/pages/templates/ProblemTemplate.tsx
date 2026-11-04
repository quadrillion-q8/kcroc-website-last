// File: app/frontend/src/pages/templates/ProblemTemplate.tsx
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { buildWhatsAppLink, getIntentWhatsAppLink } from '../../utils/whatsappIntent';
import { AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight, Wrench, MapPin, HelpCircle, BookOpen, Clock3, ExternalLink } from 'lucide-react';


const THERMAL_TRIAGE_OPTIONS = [
  {
    id: 'warm-under-load',
    label: 'Warm only under load',
    title: 'Warm but stable during heavy work',
    urgent: false,
    guidance: 'Higher fan speed and warmth can be normal during gaming, rendering or updates. Use a hard, ventilated surface, check the exact model guidance, and watch for a repeatable loss of performance, abnormal sounds or shutdowns.'
  },
  {
    id: 'hot-at-idle',
    label: 'Hot while idle',
    title: 'Find out whether the laptop is actually idle',
    urgent: false,
    guidance: 'If the laptop is otherwise stable, check Task Manager (Windows) or Activity Monitor (macOS) for a recognised process using CPU resources. If utilisation stays low but heat and fan activity remain abnormal, airflow, fan control, firmware or sensors may need inspection.'
  },
  {
    id: 'slowdown',
    label: 'Slowdown or FPS drops',
    title: 'Correlate temperature with performance',
    urgent: false,
    guidance: 'A thermal limit is one possibility, not a diagnosis. Compare the same workload and power mode while observing temperature, clocks, utilisation and fan response. Power limits, drivers, background work or the application can also cause slowdown.'
  },
  {
    id: 'charging',
    label: 'Mainly while charging',
    title: 'Check power mode and charging context',
    urgent: false,
    guidance: 'Charging and performance modes can change power use and fan behaviour. If there are no battery or electrical safety warning signs, note the correct charger and compare like-for-like workloads. Unusual localised battery heat, swelling, smell or deformation means stop using and charging the device.'
  },
  {
    id: 'fan-shutdown',
    label: 'Grinding fan or shutdown',
    title: 'Stop heavy workloads and arrange diagnosis',
    urgent: true,
    guidance: 'A grinding fan, weak or absent airflow while very hot, thermal warning or repeated shutdown is not a reason to keep stress-testing. Power the laptop down if safe and arrange assessment of the fan, airflow, power and cooling path.'
  },
  {
    id: 'battery-safety',
    label: 'Swelling, smoke or burning smell',
    title: 'Treat this as a safety issue',
    urgent: true,
    guidance: 'Stop using and charging the laptop immediately. Disconnect power only if it is safe to do so. Do not press, open, bend, puncture or try to remove a swollen battery; keep the device out of routine testing and arrange professional safety handling.'
  }
] as const;

const LIQUID_TYPES = [
  { id: 'water', label: 'Plain water', message: 'plain water' },
  { id: 'coffee-tea', label: 'Coffee / tea', message: 'coffee or tea' },
  { id: 'sweet-drink', label: 'Sweet drink / soda', message: 'a sweet drink or soda' },
  { id: 'milk-latte', label: 'Milk / latte', message: 'milk or a latte' },
] as const;

const LIQUID_DEVICE_TYPES = [
  { id: 'windows', label: 'Windows laptop' },
  { id: 'macbook', label: 'MacBook' },
  { id: 'gaming', label: 'Gaming laptop' },
] as const;

const ProblemTemplate: React.FC = () => {
  const location = useLocation();
  const [thermalPattern, setThermalPattern] = React.useState('warm-under-load');
  const [selectedLiquid, setSelectedLiquid] = React.useState<(typeof LIQUID_TYPES)[number]['id']>('water');
  const [selectedLiquidDevice, setSelectedLiquidDevice] = React.useState<(typeof LIQUID_DEVICE_TYPES)[number]['id']>('windows');
  const selectedThermalGuidance = THERMAL_TRIAGE_OPTIONS.find((option) => option.id === thermalPattern) ?? THERMAL_TRIAGE_OPTIONS[0];
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);

  if (!problem) return <Navigate to="/404" replace />;

  const isOverheating = problem.id === 'problem-overheating';
  const isLiquidSpill = problem.id === 'problem-liquid-spill';
  const selectedLiquidOption = LIQUID_TYPES.find((option) => option.id === selectedLiquid) ?? LIQUID_TYPES[0];
  const selectedLiquidDeviceOption = LIQUID_DEVICE_TYPES.find((option) => option.id === selectedLiquidDevice) ?? LIQUID_DEVICE_TYPES[0];
  const liquidTriageWhatsAppHref = buildWhatsAppLink(
    `Hi KCROC, I spilled ${selectedLiquidOption.message} on my ${selectedLiquidDeviceOption.label}. Please advise the safest next step and whether free pickup can be arranged.`
  );
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
      <section className={problem.emergencySteps?.length ? "pt-10 pb-12 px-6 bg-slate-900/40 backdrop-blur-md border-b border-slate-800" : "pt-24 pb-16 px-6 bg-slate-900/40 backdrop-blur-md border-b border-slate-800"}>
        <div className="max-w-3xl mx-auto text-center">
          {!problem.emergencySteps?.length && <AlertOctagon className="w-16 h-16 text-rose-500 mx-auto mb-6" />}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {problem.title}
          </h1>
          {problem.emergencySteps && problem.emergencySteps.length > 0 && (
            <div role="alert" aria-labelledby="liquid-emergency-title" className="mb-7 rounded-2xl border-2 border-rose-500/80 bg-rose-950/80 p-5 text-left shadow-2xl md:p-7">
              <div className="flex items-start gap-3">
                <ShieldAlert aria-hidden="true" className="mt-1 h-7 w-7 flex-shrink-0 text-rose-300" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-300">Emergency — act before trying to restart</p>
                  <h2 id="liquid-emergency-title" className="mt-1 text-xl font-black text-white md:text-2xl">Switch off and isolate power now</h2>
                  <p className="mt-2 text-sm leading-6 text-rose-100/90">Do not plug the laptop in or press the power button again to test it, even if it appears to work.</p>
                </div>
              </div>
              <ol className="mt-5 grid gap-3 md:grid-cols-2">
                {problem.emergencySteps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-3 rounded-xl border border-rose-800/70 bg-black/20 p-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/15 text-sm font-black text-rose-200">{index + 1}</span>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-rose-100/85">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {problem.emergencyCaution && (
                <p className="mt-4 rounded-xl border border-rose-400/40 bg-rose-900/35 p-4 text-sm font-semibold leading-6 text-rose-100">{problem.emergencyCaution}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={buildWhatsAppLink('Hi KCROC, liquid has spilled on my laptop. I have kept it off and need advice on safe pickup.')} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-rose-300 px-5 py-3 font-black text-rose-950 transition-colors hover:bg-rose-200">
                  WhatsApp KCROC now
                </a>
                <Link to="/book" className="inline-flex items-center justify-center rounded-full border border-rose-300/50 px-5 py-3 font-bold text-white transition-colors hover:bg-rose-900/40">
                  Arrange free pickup
                </Link>
                {isLiquidSpill && (
                  <Link to="/laptop-liquid-damage-repair-kuwait" className="inline-flex items-center justify-center rounded-full border border-slate-500/70 px-5 py-3 text-sm font-bold text-slate-100 transition-colors hover:border-cyan-300 hover:text-cyan-200">
                    View liquid-damage repair pricing and lab process (from 35 KWD)
                  </Link>
                )}
              </div>
            </div>
          )}
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

          {isLiquidSpill && (
            <section aria-labelledby="liquid-triage-title" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Quick contact helper</p>
                <h2 id="liquid-triage-title" className="mt-2 text-2xl font-black text-white md:text-3xl">What did you spill, and what device is affected?</h2>
                <p className="mt-3 leading-7 text-slate-400">Choose the closest options to prepare a useful WhatsApp message. This is not a damage assessment; keep the laptop switched off and disconnected.</p>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-bold text-white">Liquid type</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LIQUID_TYPES.map((option) => {
                    const active = selectedLiquid === option.id;
                    return (
                      <button key={option.id} type="button" aria-pressed={active} onClick={() => setSelectedLiquid(option.id)} className={active
                        ? 'rounded-full border border-cyan-300 bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'
                        : 'rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-bold text-slate-300 hover:border-cyan-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-bold text-white">Device type</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LIQUID_DEVICE_TYPES.map((option) => {
                    const active = selectedLiquidDevice === option.id;
                    return (
                      <button key={option.id} type="button" aria-pressed={active} onClick={() => setSelectedLiquidDevice(option.id)} className={active
                        ? 'rounded-full border border-cyan-300 bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'
                        : 'rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-bold text-slate-300 hover:border-cyan-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-300">Message: “I spilled {selectedLiquidOption.message} on my {selectedLiquidDeviceOption.label}.”</p>
                <a href={liquidTriageWhatsAppHref} target="_blank" rel="noreferrer" className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300">
                  Send details on WhatsApp <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </a>
              </div>
            </section>
          )}

          {isOverheating && (
            <section aria-labelledby="thermal-triage-title" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Quick symptom triage</p>
                <h2 id="thermal-triage-title" className="mt-2 text-2xl font-black text-white md:text-3xl">Choose the pattern that best matches your laptop</h2>
                <p className="mt-3 leading-7 text-slate-400">This selects a safer next step—not a remote diagnosis or a promise that one repair will fix the cause. Skip testing if you see a battery or electrical warning.</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {THERMAL_TRIAGE_OPTIONS.map((option) => {
                  const active = thermalPattern === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setThermalPattern(option.id)}
                      className={active
                        ? option.urgent
                          ? 'rounded-2xl border border-rose-500/70 bg-rose-950/40 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'
                          : 'rounded-2xl border border-cyan-400/60 bg-cyan-950/40 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'
                        : 'rounded-2xl border border-slate-700 bg-slate-950/50 p-4 text-left transition-colors hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-bold text-white">{option.label}</span>
                        {active && <span className={option.urgent ? 'text-xs font-bold uppercase tracking-wide text-rose-300' : 'text-xs font-bold uppercase tracking-wide text-cyan-300'}>Selected</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div
                role="status"
                aria-live="polite"
                className={selectedThermalGuidance.urgent
                  ? 'mt-5 rounded-2xl border border-rose-800/60 bg-rose-950/30 p-5 md:p-6'
                  : 'mt-5 rounded-2xl border border-cyan-900/60 bg-cyan-950/20 p-5 md:p-6'}
              >
                <h3 className={selectedThermalGuidance.urgent ? 'text-lg font-black text-rose-200' : 'text-lg font-black text-white'}>{selectedThermalGuidance.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{selectedThermalGuidance.guidance}</p>
              </div>
            </section>
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
                {isLiquidSpill ? 'Safe checks while keeping the laptop closed' : isOverheating ? 'Safe checks before opening your laptop' : 'Safe checks before opening the device'}
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

          {problem.liquidRiskMatrix && problem.liquidRiskMatrix.length > 0 && (
            <section aria-labelledby="liquid-risk-matrix">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Liquid comparison</p>
                <h2 id="liquid-risk-matrix" className="mt-2 text-3xl font-black text-white">Different drinks leave different residues</h2>
                <p className="mt-3 max-w-3xl text-slate-400">The table compares common contamination patterns, not fixed corrosion times or survival rates. The actual outcome depends on the amount spilled, where it travelled, whether power was present and the laptop's design.</p>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-950 text-slate-200">
                    <tr>
                      <th scope="col" className="p-4 font-black">Liquid</th>
                      <th scope="col" className="p-4 font-black">Possible residue</th>
                      <th scope="col" className="p-4 font-black">Main concern</th>
                      <th scope="col" className="p-4 font-black">What to do</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {problem.liquidRiskMatrix.map((item) => (
                      <tr key={item.liquid}>
                        <th scope="row" className="p-4 align-top font-bold text-white">{item.liquid}</th>
                        <td className="p-4 align-top leading-6 text-slate-400">{item.residue}</td>
                        <td className="p-4 align-top leading-6 text-slate-400">{item.risk}</td>
                        <td className="p-4 align-top leading-6 text-slate-300">{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

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
                  <h2 id="kcroc-solution" className="mt-2 text-3xl font-black text-white">{isLiquidSpill ? 'We fix the board where repair is viable — not just default to a swap.' : 'Diagnose first. Repair the failed stage.'}</h2>
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
              <span>Technical guidance by KCROC • Hawalli, Kuwait</span>
              <Link to="/author/imran" className="text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-cyan-300">
                Technical background: Imran Natiq, Hardware Repair Engineer
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProblemTemplate;
