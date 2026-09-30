import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, CheckCircle2, ChevronRight, Cpu, Gauge,
  HelpCircle, Monitor, ShieldAlert, Thermometer, Wind, Wrench
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandaloneRelatedLinks } from '../components/content/StandaloneRelatedLinks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IMAGES } from '../constants/images';

const GUIDE_PATH = '/guides/why-is-my-laptop-so-hot';
const PAGE_URL = `https://www.computerrepairkuwait.com${GUIDE_PATH}`;
const AUTHOR_ID = 'https://www.computerrepairkuwait.com/author/imran#person';
const DATE_MODIFIED = '2026-09-30';
const LAST_REVIEWED = 'September 30, 2026';

const symptoms = [
  { label: 'Hot + fan is constantly loud', value: 'fan' },
  { label: 'Hot + performance becomes slow', value: 'slow' },
  { label: 'Hot + FPS drops or stutters', value: 'gaming' },
  { label: 'Hot + shuts down or restarts', value: 'shutdown' },
  { label: 'Hot while mostly idle', value: 'idle' },
  { label: 'Hot mainly while charging', value: 'charging' },
];

const workloadOptions = [
  { label: 'Mostly idle / light work', value: 'idle' },
  { label: 'Web, video, office or calls', value: 'light' },
  { label: 'Gaming, compiling or heavy apps', value: 'heavy' },
  { label: 'Rendering / sustained professional workloads', value: 'sustained' },
];

const environmentOptions = [
  { label: 'Hard, open surface', value: 'clear' },
  { label: 'Bed, sofa, blanket or lap', value: 'soft' },
  { label: 'Docked / close to wall or obstruction', value: 'blocked' },
  { label: 'Hot room / poor ambient ventilation', value: 'ambient' },
];

const causes = [
  ['High workload or boost behaviour', 'Modern CPUs and GPUs can raise power, clocks and fan speed during demanding work. Heat by itself does not prove a fault.'],
  ['Restricted airflow', 'A soft surface, blocked intake/exhaust, dock placement or an obstructed chassis can reduce the cooling system’s ability to move heat away.'],
  ['Dust or a blocked heatsink', 'Dust accumulation can restrict airflow through the fins. The effect depends on the laptop design, environment and how much debris has accumulated.'],
  ['Fan or cooling hardware fault', 'Grinding, clicking, intermittent fan operation, abnormal fan behaviour or a fan that does not respond to load can point to a hardware problem.'],
  ['Thermal interface or heatsink-contact problem', 'Thermal paste or another thermal interface can degrade or be disturbed, but replacing it should follow diagnosis rather than being the default answer to every hot laptop.'],
  ['Power, firmware or control behaviour', 'BIOS/firmware, OEM performance modes and platform power-management systems can change fan behaviour, power limits and sustained performance.'],
  ['Background software activity', 'Updates, indexing, browsers, synchronization, malware or a runaway process can keep a system busy when the user expects it to be idle.'],
  ['Ambient temperature', 'A warmer room reduces the cooling system’s temperature headroom. The laptop still needs to be evaluated against its own design and manufacturer guidance.'],
];

const symptomMatrix = [
  ['Hot + loud fan', 'High workload, background activity, restricted airflow or fan-control behaviour', 'Check CPU/GPU usage, vents and fan response'],
  ['Hot + slow', 'Thermal throttling, power limiting, background load or another performance fault', 'Compare temperature, clocks, utilization and performance'],
  ['Hot + gaming stutter', 'CPU/GPU thermal or power limiting, airflow restriction or workload change', 'Record temperature, clocks, utilization and frame-time over the same session'],
  ['Hot at idle', 'Background process, update/indexing/sync activity or cooling problem', 'Check resource usage first; then investigate cooling if load stays low'],
  ['Hot while charging', 'Charging heat plus workload, AC power profile or battery/charger issue', 'Compare the same workload on AC and battery'],
  ['Hot + shutdown/restart', 'Thermal protection, power fault or another hardware problem', 'Stop repeated stress tests and investigate the cooling/power path'],
  ['Hot after cleaning', 'Fan/heatsink issue, disturbed thermal interface, incorrect reassembly or a different workload', 'Repeat a controlled before/after test and inspect the cooling assembly'],
  ['One area unusually hot', 'Localized component, battery, VRM or cooling-path problem', 'Stop if accompanied by swelling, smell, smoke or physical damage'],
];

const temperatureSensors = [
  ['CPU package/core', 'Processor sensor reading', 'Interpret with CPU utilization, clock speed, workload and the processor documentation'],
  ['GPU temperature', 'Primary graphics-processor sensor', 'Use the exact GPU/system specification rather than a generic chart'],
  ['GPU hotspot/junction', 'Localized maximum GPU sensor on supported hardware', 'Do not compare directly with the GPU core reading'],
  ['SSD temperature', 'Storage-device sensor', 'A storage thermal issue can cause its own throttling even when CPU/GPU temperatures look normal'],
  ['Battery temperature', 'Battery-management sensor', 'Treat unusual heat with charging changes, swelling or chassis deformation as a safety concern'],
  ['Chassis/surface temperature', 'Physical laptop enclosure', 'It is not equivalent to an internal CPU or GPU sensor'],
];

const toc = [
  ['quick-answer', 'Quick answer'],
  ['diagnostic', 'Interactive triage'],
  ['symptoms', 'Symptoms and warning signs'],
  ['causes', 'Common causes'],
  ['temperature', 'How hot is too hot?'],
  ['sensors', 'Which temperature are you seeing?'],
  ['measure', 'How to diagnose overheating'],
  ['platforms', 'Windows, macOS, Linux and ChromeOS'],
  ['workloads', 'Idle, charging and gaming'],
  ['safe-fixes', 'Safe ways to cool a laptop'],
  ['stop', 'When to stop using it'],
  ['faq', 'FAQ'],
  ['references', 'Technical references'],
];

const faq = [
  {
    q: 'Why is my laptop so hot even though the fan is running?',
    a: 'The fan can be operating normally while airflow is restricted, workload is high, the heatsink is obstructed, or the cooling system is not transferring heat efficiently. Check workload, airflow, temperature behaviour and performance together rather than judging the fan alone.'
  },
  {
    q: 'What temperature is too hot for a laptop?',
    a: 'There is no single temperature number that applies to every laptop. CPU limits vary by processor and system design, and normal behaviour depends on workload, power settings and ambient conditions. Use the exact processor or laptop manufacturer specifications and look for sustained throttling, abnormal performance loss, shutdowns or other symptoms.'
  },
  {
    q: 'Is 90°C or 100°C automatically dangerous for a laptop?',
    a: 'Not necessarily. A sensor reading near a processor’s documented limit can occur during demanding work, and modern processors use thermal-management mechanisms. The correct interpretation depends on the exact component, workload and system design. A repeated performance problem or shutdown is more useful evidence of a cooling issue than a universal temperature rule.'
  },
  {
    q: 'Can dust make a laptop overheat?',
    a: 'Yes. Dust can restrict airflow through the cooling path. If cleaning the external vents does not change the behaviour, the internal fan, heatsink and cooling assembly may need inspection.'
  },
  {
    q: 'Why does my laptop get hot while gaming?',
    a: 'Gaming can place sustained load on both the CPU and GPU, so higher temperatures and fan noise can be normal. Investigate when heat is accompanied by persistent throttling, major performance degradation, repeated stutter after warm-up, instability or shutdowns.'
  },
  {
    q: 'Can overheating cause stuttering or FPS drops?',
    a: 'Yes. Thermal management can reduce power or clock speed when a component approaches its thermal limits. If stutter becomes worse after several minutes of sustained load, compare temperature, clocks, utilization and frame-time behaviour over the same period.'
  },
  {
    q: 'Should I replace thermal paste because my laptop is hot?',
    a: 'Not automatically. Airflow restriction, dust, fan failure, workload, power settings, firmware behaviour and other hardware faults can produce similar symptoms. Diagnose the cooling path first and replace thermal interface material only when the evidence supports it.'
  },
  {
    q: 'Why is my laptop hot when it is doing almost nothing?',
    a: 'Check for unexpected CPU/GPU activity, updates, synchronization, browser processes or other background work. If utilization is genuinely low but temperatures and fan activity remain abnormal, investigate airflow, sensors and the cooling system.'
  },
  {
    q: 'Can a hot room make my laptop run hotter?',
    a: 'Yes. Cooling systems reject heat into the surrounding air, so higher ambient temperature reduces the available temperature headroom. The effect varies by laptop and workload.'
  },
  {
    q: 'Does this guide apply to MacBook, Windows, Linux and Chromebook laptops?',
    a: 'The diagnostic principles apply across laptop platforms: establish workload, check airflow, observe temperature and performance together, identify throttling or instability, and compare behaviour with the manufacturer’s specifications. The exact monitoring tools and thermal controls differ by operating system and model.'
  },
  {
    q: 'Can a laptop shut down because of overheating?',
    a: 'Yes. Thermal protection can reduce performance and, if temperature cannot be controlled, a system may shut down. Repeated thermal shutdowns should be treated as a fault symptom and investigated rather than repeatedly worked around.'
  },
];

export default function LaptopOverheatingGuide() {
  const business = KCROC_GRAPH.business!;
  const [symptom, setSymptom] = useState('');
  const [workload, setWorkload] = useState('');
  const [environment, setEnvironment] = useState('');

  const result = useMemo(() => {
    if (!symptom || !workload || !environment) return null;

    if (symptom === 'shutdown') return {
      level: 'Stop heavy use and investigate',
      icon: ShieldAlert,
      title: 'Repeated shutdowns need a cooling and hardware check',
      text: 'First confirm that vents are clear and the laptop is on a hard surface. If shutdowns continue, check fan operation, temperature behaviour and power/thermal logs rather than repeatedly stress-testing the machine.'
    };

    if (environment === 'soft' || environment === 'blocked') return {
      level: 'First check',
      icon: Wind,
      title: 'Remove the airflow restriction before changing hardware',
      text: 'Move the laptop to a hard, stable surface and leave every intake and exhaust opening unobstructed. Repeat the same workload and compare the result before assuming the fan, heatsink or thermal interface is defective.'
    };

    if (symptom === 'idle') return {
      level: 'Investigate background activity',
      icon: Monitor,
      title: 'Find out what is generating heat at idle',
      text: 'Check CPU/GPU activity, updates, synchronization and other background processes. If utilization stays low while fan activity and temperature remain abnormal, the cooling path, firmware or sensors may need investigation.'
    };

    if (symptom === 'slow' || symptom === 'gaming') return {
      level: 'Measure performance and thermals together',
      icon: Gauge,
      title: 'Check for thermal throttling',
      text: 'Record temperature, clock speed, utilization and performance while the slowdown or stutter occurs. A repeatable performance drop that coincides with thermal or power management is a stronger clue than a single peak temperature.'
    };

    if (symptom === 'charging') return {
      level: 'Compare charging vs. battery behaviour',
      icon: Thermometer,
      title: 'Check whether charging changes the workload or thermal profile',
      text: 'Some laptops change power limits or performance modes while plugged in. Compare the same workload on battery and AC power, and check the charger, charging settings and manufacturer performance profile if the difference is large.'
    };

    if (workload === 'heavy' || workload === 'sustained') return {
      level: 'Normal under load until proven otherwise',
      icon: Cpu,
      title: 'Judge sustained performance, not heat alone',
      text: 'Demanding workloads can produce substantial heat. Compare temperature with the exact processor/GPU limits, fan behaviour, clock speeds and whether performance remains stable over time.'
    };

    return {
      level: 'Monitor',
      icon: Cpu,
      title: 'Compare heat with workload and system behaviour',
      text: 'A warm laptop is not automatically overheating. Establish what the system is doing, verify airflow, monitor the thermal trend and look for throttling, instability or shutdowns.'
    };
  }, [symptom, workload, environment]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': AUTHOR_ID,
        name: 'Imran Natiq',
        url: `${business.websiteUrl}/author/imran`,
        jobTitle: 'Founder & Lead Technician',
        worksFor: { '@id': `${business.websiteUrl}/#business` }
      },
      {
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Why Is My Laptop So Hot? Universal Overheating Causes, Diagnosis & Fixes',
        description: 'A universal laptop overheating guide covering workload, airflow, dust, fan faults, thermal throttling, temperature interpretation, safe cooling checks and repair warning signs across Windows, macOS, Linux and ChromeOS.',
        url: PAGE_URL,
        mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
        isPartOf: { '@id': `${business.websiteUrl}/#website` },
        author: { '@id': AUTHOR_ID },
        publisher: { '@id': `${business.websiteUrl}/#business` },
        image: [
          `${business.websiteUrl}${IMAGES.laptopHardware.copperHeatsink1.src}`,
          `${business.websiteUrl}${IMAGES.laptopHardware.copperHeatsink3.src}`,
          `${business.websiteUrl}/images/laptop-fan-copper-heatpipe-closeup.webp`
        ],
        articleSection: 'Computer & Laptop Troubleshooting Guides',
        dateModified: DATE_MODIFIED,
        inLanguage: 'en'
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${business.websiteUrl}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Why Is My Laptop So Hot?', item: PAGE_URL }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SEOEngine entityId="guide-laptop-overheating" />
      <SchemaMarkup schema={schema} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-slate-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-cyan-300">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/guides" className="hover:text-cyan-300">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-200">Laptop Overheating</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <Badge className="mb-4 border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              Universal Laptop Troubleshooting Guide
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Why Is My Laptop So Hot?
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              A practical, platform-independent way to find out whether a hot laptop is behaving normally
              or showing signs of restricted airflow, excessive workload, dust, fan trouble, thermal
              throttling, power-management behaviour or another cooling fault.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-slate-700 px-3 py-1">Windows • macOS • Linux • ChromeOS</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Intel • AMD • Apple silicon</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Gaming • work • everyday use</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Updated September 2026</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <img
              src="/images/laptop-fan-copper-heatpipe-closeup.webp"
              alt="Laptop cooling fan and copper heatpipe assembly"
              className="h-full w-full object-cover"
              width="1000"
              height="750"
              loading="eager"
            />
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400" aria-label="Guide authorship and review information">
          <span>Written and technically reviewed by <Link to="/author/imran" className="font-semibold text-slate-200 hover:text-cyan-300">Imran Natiq</Link>, Founder &amp; Lead Technician at KCROC.</span>
          <span>Last reviewed: {LAST_REVIEWED}</span>
        </section>

        <nav className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6" aria-label="On this page">
          <h2 className="text-lg font-semibold text-white">On this page</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-sm text-cyan-300 hover:text-cyan-200">{label}</a>
            ))}
          </div>
        </nav>

        <section id="quick-answer" className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Quick answer: why is my laptop so hot?</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">A laptop can become hot because of normal CPU/GPU boost behaviour, sustained workload, restricted airflow, dust, a failing fan, background software, charging or power-management behaviour, high ambient temperature, or a cooling-system fault. Heat alone does not prove overheating. The useful clues are what the laptop is doing, which sensor is hot, whether clocks or performance change, and whether instability or shutdowns occur.</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead><tr className="border-b border-slate-700 text-slate-200"><th className="p-3">What you notice</th><th className="p-3">Check first</th></tr></thead>
              <tbody>
                {symptomMatrix.slice(0, 6).map(([symptomText, , check]) => (
                  <tr key={symptomText} className="border-b border-slate-800"><td className="p-3 font-medium text-slate-200">{symptomText}</td><td className="p-3 text-slate-400">{check}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Thermometer className="mt-1 h-7 w-7 shrink-0 text-cyan-300" />
            <div>
              <h2 className="text-2xl font-semibold">First: hot does not automatically mean overheating</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Laptop processors can intentionally increase power and clock speed during demanding work,
                and thermal-management systems can then adjust power, frequency and fan behaviour. There
                is no universal “safe laptop temperature” number that applies to every model. The useful
                question is whether the system stays within its documented limits and whether heat is
                accompanied by throttling, persistent performance loss, instability or shutdowns.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Always interpret a temperature reading in the context of the exact CPU/GPU, laptop design,
                workload, ambient conditions and manufacturer specifications.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14" id="diagnostic">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Interactive triage</p>
            <h2 className="mt-2 text-3xl font-bold">What should you check first?</h2>
            <p className="mt-3 text-slate-400">
              Select the closest description. This is a starting point for diagnosis, not a machine-specific
              temperature verdict.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">1. Main symptom</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {symptoms.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSymptom(option.value)}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                      symptom === option.value
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200'
                        : 'border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">2. What workload?</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {workloadOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setWorkload(option.value)}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                      workload === option.value
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200'
                        : 'border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">3. Cooling environment</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {environmentOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setEnvironment(option.value)}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                      environment === option.value
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200'
                        : 'border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {result && (
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="flex gap-4">
                <result.icon className="mt-1 h-7 w-7 shrink-0 text-cyan-300" />
                <div>
                  <Badge className="border-slate-700 bg-slate-800 text-slate-200">{result.level}</Badge>
                  <h3 className="mt-3 text-xl font-semibold">{result.title}</h3>
                  <p className="mt-2 max-w-3xl leading-7 text-slate-300">{result.text}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mt-16" id="symptoms">
          <h2 className="text-3xl font-bold">Start with the symptom, not the part</h2>
          <p className="mt-3 max-w-3xl text-slate-400">
            “Hot” is a symptom. The same symptom can come from normal boost behaviour, software load,
            blocked airflow, a failed fan, a cooling-assembly problem or a power-management issue.
            Diagnose the behaviour before buying a part.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['Hot + loud fan', 'Check whether CPU/GPU load is actually high. If load is low, investigate background activity, airflow and fan control.'],
              ['Hot + slow', 'Compare temperature and clock speed while the slowdown occurs. Sustained clock reduction under thermal stress is a useful throttling clue.'],
              ['Hot + gaming stutter', 'Measure temperature, GPU/CPU utilization, clocks and frame-time behaviour across the same gaming session.'],
              ['Hot + shutdown', 'Repeated shutdowns deserve hardware and thermal investigation rather than repeated stress testing.'],
              ['Hot at idle', 'Look for background processes, updates, synchronization or an abnormal cooling condition.'],
              ['Hot only while charging', 'Compare the same workload on AC and battery because laptops may change power and performance behaviour when plugged in.'],
            ].map(([title, text]) => (
              <Card key={title} className="border-slate-800 bg-slate-900/70">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-800" aria-labelledby="symptom-matrix-title">
          <div className="bg-slate-900 p-6"><h3 id="symptom-matrix-title" className="text-xl font-semibold">Symptoms → possible causes → first checks</h3><p className="mt-2 text-sm text-slate-400">Use this as a diagnostic starting point, not a substitute for model-specific testing.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b border-slate-700 bg-slate-900/60 text-slate-200"><th className="p-4">Symptom</th><th className="p-4">Possible causes</th><th className="p-4">First checks</th></tr></thead><tbody>{symptomMatrix.map(([symptomText, cause, check]) => <tr key={symptomText} className="border-b border-slate-800"><td className="p-4 font-medium text-slate-200">{symptomText}</td><td className="p-4 text-slate-400">{cause}</td><td className="p-4 text-slate-400">{check}</td></tr>)}</tbody></table>
          </div>
        </section>

        <section className="mt-16" id="causes">
          <h2 className="text-3xl font-bold">The major causes of laptop heat</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {causes.map(([title, text]) => (
              <Card key={title} className="border-slate-800 bg-slate-900/70">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Cpu className="h-6 w-6 shrink-0 text-cyan-300" />
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16" id="temperature">
          <h2 className="text-3xl font-bold">What temperature is too hot for a laptop?</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">There is no single temperature number that applies to every laptop. Processor and GPU limits vary by model, while laptop manufacturers also control power targets, fan curves and chassis cooling differently. A short boost near a documented limit is not automatically equivalent to a sustained thermal fault.</p>
          <p className="mt-3 max-w-4xl text-slate-400 leading-7">For diagnosis, record the exact component and sensor, workload, temperature trend, clock speed, utilization and performance. A repeatable relationship between rising temperature and falling clocks or performance is more informative than a generic “90°C is bad” or “100°C is fine” rule.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <img src={IMAGES.laptopHardware.copperHeatsink3.src} alt="Laptop copper heatsink showing dried thermal interface material" width="800" height="600" loading="lazy" className="w-full" />
              <p className="p-4 text-sm text-slate-400">Thermal-interface condition is one possible cause, but it should be assessed after airflow, workload and fan behaviour are considered.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold">A better thermal question</h3>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li><strong>1.</strong> What component and sensor are you measuring?</li>
                <li><strong>2.</strong> What workload was running?</li>
                <li><strong>3.</strong> How long did the temperature stay elevated?</li>
                <li><strong>4.</strong> Did clocks, power or performance change?</li>
                <li><strong>5.</strong> Does the behaviour match the exact manufacturer's specifications?</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mt-16" id="sensors">
          <h2 className="text-3xl font-bold">Which laptop temperature are you actually seeing?</h2>
          <p className="mt-3 max-w-4xl text-slate-400 leading-7">Monitoring software can expose several different sensors. They are not interchangeable, so a number should always be interpreted with its sensor name and the component it represents.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-900"><tr className="border-b border-slate-700 text-slate-200"><th className="p-4">Measurement</th><th className="p-4">What it represents</th><th className="p-4">Diagnostic note</th></tr></thead>
              <tbody>{temperatureSensors.map(([measurement, represents, note]) => <tr key={measurement} className="border-b border-slate-800 bg-slate-950/30"><td className="p-4 font-medium text-slate-200">{measurement}</td><td className="p-4 text-slate-400">{represents}</td><td className="p-4 text-slate-400">{note}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="mt-16" id="measure">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-cyan-300" />
                How to diagnose overheating without guessing
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 lg:grid-cols-2 text-sm leading-7 text-slate-300">
              <div className="space-y-5">
                <div>
                  <strong>1. Reproduce the symptom.</strong>
                  <p className="mt-1 text-slate-400">Note what you were doing, how long it took to appear and whether the problem is repeatable.</p>
                </div>
                <div>
                  <strong>2. Measure workload.</strong>
                  <p className="mt-1 text-slate-400">Use the operating system’s resource monitor or a manufacturer-supported utility to see whether CPU/GPU activity matches the heat.</p>
                </div>
                <div>
                  <strong>3. Measure temperature and clocks together.</strong>
                  <p className="mt-1 text-slate-400">A single peak number is less informative than the thermal trend alongside frequency, utilization and performance.</p>
                </div>
                <div>
                  <strong>4. Compare against the exact machine.</strong>
                  <p className="mt-1 text-slate-400">Check the laptop or processor manufacturer’s specifications instead of applying a generic internet temperature chart.</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <strong>5. Test airflow.</strong>
                  <p className="mt-1 text-slate-400">Use a stable, hard surface and make sure every intake and exhaust opening is unobstructed.</p>
                </div>
                <div>
                  <strong>6. Check for throttling.</strong>
                  <p className="mt-1 text-slate-400">If clocks or power fall as temperature rises and performance drops at the same time, thermal management may be limiting the system.</p>
                </div>
                <div>
                  <strong>7. Change one variable at a time.</strong>
                  <p className="mt-1 text-slate-400">Otherwise you cannot tell whether airflow, software load, power mode or another change actually affected the result.</p>
                </div>
                <div>
                  <strong>8. Record the before/after result.</strong>
                  <p className="mt-1 text-slate-400">A repeatable comparison is much more useful than “it feels cooler now.”</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2" id="platforms">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-cyan-300" />
                Windows, macOS, Linux and ChromeOS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-400">
              <p><strong className="text-slate-200">Windows:</strong> Task Manager can show CPU, GPU and other resource activity. Use it to establish whether unexpected workload is accompanying the heat.</p>
              <p><strong className="text-slate-200">macOS:</strong> Activity Monitor provides a way to investigate CPU activity and processes. Apple also recommends stable surfaces and unobstructed ventilation for Mac laptops.</p>
              <p><strong className="text-slate-200">Linux:</strong> Use the monitoring tools appropriate to your distribution and hardware to correlate workload, clocks and temperatures. Sensor names and available controls vary by hardware.</p>
              <p><strong className="text-slate-200">ChromeOS:</strong> Start with workload, ventilation and manufacturer guidance. The same diagnostic principle applies even though the available low-level controls differ from Windows or Linux.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-cyan-300" />
                Intel, AMD and Apple silicon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-400">
              <p><strong className="text-slate-200">Intel:</strong> thermal limits and throttling behaviour vary by processor and OEM laptop design. Intel specifically advises laptop users to refer to the system manufacturer for platform-specific thermal behaviour.</p>
              <p><strong className="text-slate-200">AMD:</strong> operating temperature depends on the cooler, airflow, ambient temperature, user settings and workload. AMD likewise advises evaluating CPU temperature in the context of the complete system.</p>
              <p><strong className="text-slate-200">Apple silicon:</strong> Mac laptops use platform-level thermal management and sensors. The exact monitoring and cooling behaviour is controlled differently from conventional Windows PCs.</p>
              <p className="text-slate-500">The rule is the same across platforms: use the exact machine’s specifications and observed behaviour rather than a one-size-fits-all temperature threshold.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16" id="workloads">
          <h2 className="text-3xl font-bold">Common situations: idle, charging and gaming</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/70"><CardHeader><CardTitle>Hot while idle</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-slate-400">Check CPU/GPU activity, updates, indexing, synchronization, browser processes and other background work. If utilization remains low while heat and fan activity stay abnormal, investigate airflow, sensors and the cooling system.</CardContent></Card>
            <Card className="border-slate-800 bg-slate-900/70"><CardHeader><CardTitle>Hot while charging</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-slate-400">Charging can add heat while AC power can also change performance behaviour. Compare the same workload on battery and AC. If heat is localized around the battery, charging port or chassis, especially with swelling or deformation, stop using the machine and seek inspection.</CardContent></Card>
            <Card className="border-slate-800 bg-slate-900/70"><CardHeader><CardTitle>Hot while gaming</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-slate-400">Sustained CPU/GPU load can make gaming laptops hot and loud. Investigate when FPS or frame-time behaviour deteriorates after warm-up, clocks fall with rising temperature, airflow is restricted, or instability/shutdowns occur.</CardContent></Card>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"><img src={IMAGES.laptopHardware.cloggedFan.src} alt="Dusty laptop cooling fan and heatsink airflow path" width="800" height="600" loading="lazy" className="w-full" /><p className="p-4 text-sm text-slate-400">Restricted airflow can increase fan noise and sustained temperatures. External airflow checks are the safest first step.</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><h3 className="text-xl font-semibold">Why is my laptop fan always running?</h3><p className="mt-3 text-sm leading-6 text-slate-400">A constantly audible fan does not automatically mean the laptop is overheating. The fan may be responding correctly to CPU/GPU workload, a performance profile, high ambient temperature or background activity. If the fan runs hard during light work, first identify the workload; then check airflow and fan behaviour before assuming the fan itself has failed.</p><p className="mt-4 text-sm leading-6 text-slate-400">If gaming heat is your main problem, continue to the <Link to="/guides/gamebar-presence-writer-fix" className="text-cyan-300 hover:text-cyan-200">Windows gaming guide</Link> where relevant, or use the <Link to="/guides/dell-laptop-overheating" className="text-cyan-300 hover:text-cyan-200">Dell overheating guide</Link> for model-family-specific checks.</p></div>
          </div>
        </section>

        <section className="mt-16" id="safe-fixes">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Safe checks to try first</h2>
            <p className="mt-3 text-slate-400">These checks are deliberately low-risk and do not require opening the laptop.</p>
            <p className="mt-3 text-sm text-slate-500">If heat is accompanied by swelling, charging changes or chassis deformation, see the <Link to="/guides/laptop-battery-warning-signs" className="text-cyan-300 hover:text-cyan-200">laptop battery warning-signs guide</Link> rather than treating it as ordinary cooling maintenance.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Move the laptop to a hard, stable surface.',
              'Clear visible intake and exhaust obstructions.',
              'Close unnecessary high-CPU/GPU applications.',
              'Install pending operating-system and manufacturer updates.',
              'Use the manufacturer’s normal or recommended thermal/performance profile.',
              'Compare the same workload before and after each change.',
            ].map(item => (
              <Card key={item} className="border-slate-800 bg-slate-900/70">
                <CardContent className="flex gap-3 p-6 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2" id="stop">
          <Card className="border-red-900/40 bg-red-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-300">
                <AlertTriangle className="h-5 w-5" /> When to stop experimenting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              {[
                'The laptop repeatedly shuts down or restarts under load.',
                'The fan grinds, clicks, fails to spin or behaves erratically.',
                'The chassis becomes unusually hot in one localized area.',
                'Performance collapses after the machine warms up and does not recover normally.',
                'External airflow checks make little or no difference.',
                'There is swelling, liquid exposure, burning smell, smoke or other physical damage.',
              ].map(item => (
                <div key={item} className="flex gap-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-900/40 bg-amber-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-300">
                <Wrench className="h-5 w-5" /> Things not to do blindly
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              {[
                'Do not replace thermal paste simply because a temperature looks high.',
                'Do not block vents with cushions, blankets or accessories.',
                'Do not repeatedly stress-test a machine that is already shutting down.',
                'Do not change BIOS power or voltage settings without understanding the model-specific consequences.',
                'Do not open a laptop if you are not prepared for model-specific connectors, battery safety and cooling hardware.',
                'Do not treat a generic “90°C is bad” or “100°C is fine” chart as a universal rule.',
              ].map(item => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Why generic temperature charts can mislead</h2>
          <p className="mt-3 leading-7 text-slate-300">
            Processor thermal limits are model-specific, and laptop manufacturers can set platform power,
            cooling and acoustic behaviour differently. A temperature that is expected during a short boost
            is not automatically equivalent to a sustained thermal fault. Look at the complete pattern:
            workload → temperature → clock/power behaviour → performance → stability.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Intel documents that thermal limits vary by processor and that thermal protection can reduce
            power/frequency or initiate shutdown. AMD likewise notes that operating temperature depends on
            cooling, airflow, ambient temperature, settings and workload. Apple documents that Mac laptops
            can become warm during normal use and recommends unobstructed ventilation.
          </p>
        </section>

        <section className="mt-16" id="faq">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-7 w-7 text-cyan-300" />
            <h2 className="text-3xl font-bold">Laptop overheating FAQ</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {faq.map(item => (
              <details key={item.q} className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <summary className="cursor-pointer list-none pr-8 font-semibold text-white">
                  {item.q}
                  <ChevronRight className="float-right h-5 w-5 text-slate-500 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">About this guide</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">This guide was written and technically reviewed by <Link to="/author/imran" className="font-semibold text-slate-200 hover:text-cyan-300">Imran Natiq</Link>, Founder &amp; Lead Technician at KCROC. It is designed as a platform-independent troubleshooting reference: manufacturer specifications and model-specific service procedures take precedence over generic temperature charts.</p>
          <p className="mt-3 text-xs text-slate-500">Last reviewed September 30, 2026. Significant future technical changes should be reflected in the review date and structured data.</p>
        </section>

        <section className="mt-16 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Need a model-specific diagnosis?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            If the universal checks point to a hardware cooling problem, the next step is to identify the
            exact laptop model, reproduce the symptom, inspect the fan and heatsink, and test the cooling
            path before replacing parts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400">
              <a href={buildWhatsAppLink('Hi KCROC, my laptop is overheating and I need a diagnostic.')} target="_blank" rel="noopener noreferrer">
                Book a KCROC diagnostic
              </a>
            </Button>
            <Button asChild variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              <Link to="/laptop-overheating-kuwait">Kuwait overheating service</Link>
            </Button>
          </div>
        </section>

        <StandaloneRelatedLinks
          title="Continue with a more specific path"
          intro="Use the universal guide first, then move to a brand, symptom or repair-specific page when you have stronger evidence."
          links={[
            { href: '/guides/dell-laptop-overheating', label: 'Dell laptop overheating guide', description: 'Model-family-specific troubleshooting and repair considerations for Dell laptops.' },
            { href: '/guides/laptop-battery-warning-signs', label: 'Laptop battery warning signs', description: 'Use this when heat is accompanied by swelling, charging changes or other battery symptoms.' },
            { href: '/guides/gamebar-presence-writer-fix', label: 'Windows gaming / Game Bar guide', description: 'Useful when heat and gaming stutter appear alongside Windows background activity.' },
            { href: '/laptop-overheating-kuwait', label: 'Laptop overheating service in Kuwait', description: 'Local diagnostic and repair path for customers who need bench inspection.' },
          ]}
        />

        <section className="mt-14 border-t border-slate-800 pt-8" id="references">
          <h2 className="text-lg font-semibold">Technical references</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This guide intentionally avoids a universal “safe temperature” number. Thermal limits and behaviour
            are platform- and model-dependent.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a className="text-cyan-300 hover:text-cyan-200" href="https://www.intel.com/content/www/us/en/support/articles/000005597/processors.html" target="_blank" rel="noopener noreferrer">Intel processor temperature guidance</a>
            <a className="text-cyan-300 hover:text-cyan-200" href="https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html" target="_blank" rel="noopener noreferrer">Intel throttling guidance</a>
            <a className="text-cyan-300 hover:text-cyan-200" href="https://www.amd.com/en/resources/support-articles/faqs/PIBRMATS3.html" target="_blank" rel="noopener noreferrer">AMD temperature guidance</a>
            <a className="text-cyan-300 hover:text-cyan-200" href="https://support.apple.com/en-la/102336" target="_blank" rel="noopener noreferrer">Apple Mac operating-temperature guidance</a>
            <a className="text-cyan-300 hover:text-cyan-200" href="https://support.microsoft.com/en-us/windows/experience/system-configuration-tools-in-windows" target="_blank" rel="noopener noreferrer">Microsoft Windows Task Manager guidance</a>
          </div>
        </section>
      </main>
    </div>
  );
}
