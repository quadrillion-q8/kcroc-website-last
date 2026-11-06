// File: app/frontend/src/pages/GamingPCCooling.tsx
import { Head } from 'vite-react-ssg';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Cpu,
  Droplets,
  Fan,
  Gauge,
  Info,
  Layers,
  ShieldCheck,
  Thermometer,
  Wind,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const SITE_URL = KCROC_GRAPH.business!.websiteUrl;
const PAGE_URL = `${SITE_URL}/blog/gaming-pc-cooling`;
const PAGE_TITLE = 'Gaming PC Cooling Guide: Stop Overheating & Thermal Throttling | KCROC';
const PAGE_DESCRIPTION =
  'Why is your gaming PC overheating? Learn how to read CPU and GPU temperatures, diagnose thermal throttling, improve airflow, tune fan curves, and choose air or liquid cooling.';
const HERO_IMAGE = '/images/discover/custom-gaming-pc-teardown-and-diagnostics-workbench-1200x675.webp';
const PUBLISHED_DATE = '2026-06-22';
const UPDATED_DATE = '2026-11-06';

const quickChecks = [
  { value: '01', title: 'Measure', text: 'Log temperatures, clocks, power, fan speed and frame times during a repeatable game or workload.', icon: Thermometer },
  { value: '02', title: 'Compare', text: 'Check each sensor against the limit for the exact CPU, GPU, memory or storage model.', icon: Gauge },
  { value: '03', title: 'Isolate', text: 'Test airflow, fans, cooler contact, pump operation and software load before buying parts.', icon: Wrench },
];

const causes = [
  {
    title: 'Restricted case airflow',
    text: 'Blocked filters, poor intake paths, tangled cables or an unsuitable fan layout can trap warm air around the CPU and graphics card.',
    icon: Wind,
  },
  {
    title: 'Dust on filters, fans or fins',
    text: 'Dust reduces the amount of air that reaches the heatsink. A fan can still spin while the fin stack behind it is clogged.',
    icon: Layers,
  },
  {
    title: 'Fan or pump problems',
    text: 'A failed fan, worn bearing, disconnected header, incorrect fan direction or weak AIO pump circulation can reduce heat removal.',
    icon: Fan,
  },
  {
    title: 'Cooler fit or capacity',
    text: 'Loose mounting, uneven contact, an undersized cooler or a radiator with poor airflow can become visible during sustained loads.',
    icon: Cpu,
  },
  {
    title: 'Power and software behaviour',
    text: 'High CPU/GPU power, background tasks, overclocking and aggressive boost settings can raise heat output even when cooling hardware is healthy.',
    icon: Activity,
  },
  {
    title: 'Thermal interface condition',
    text: 'Paste, pads or other interface materials can contribute to poor heat transfer, but replacement should follow inspection and measurements—not a calendar.',
    icon: Droplets,
  },
];

const temperatureRows = [
  {
    part: 'CPU',
    sensors: 'CPU Package, Core, Tctl/Tdie or the sensor named by the platform',
    interpretation: 'Find the exact processor’s Tjmax or specified operating limit. Check whether it is actually reporting thermal throttling or reducing clocks under the same workload.',
  },
  {
    part: 'GPU core',
    sensors: 'GPU temperature / edge temperature, plus clock and power',
    interpretation: 'Use the exact graphics-card specification. Compare sustained temperature with clock behaviour, fan speed and power—not a generic internet temperature chart.',
  },
  {
    part: 'GPU hotspot',
    sensors: 'Hot Spot / Junction temperature, where exposed',
    interpretation: 'This is a different measurement from GPU edge temperature. Interpret the difference using the GPU vendor’s guidance and the exact card design.',
  },
  {
    part: 'GPU memory',
    sensors: 'Memory Junction temperature, when the card exposes it',
    interpretation: 'Memory temperature limits are model-specific. Do not assume the GPU core reading represents VRAM temperature.',
  },
  {
    part: 'NVMe SSD',
    sensors: 'Drive composite, controller and additional SMART sensors',
    interpretation: 'Check the drive manufacturer’s operating specification and whether sustained transfers cause the drive to throttle.',
  },
];

const symptomRows = [
  {
    symptom: 'CPU temperature rises quickly and CPU clocks fall',
    possibilities: 'Cooler contact, fan or pump operation, CPU power behaviour, background load or inadequate cooler capacity.',
    next: 'Check the exact CPU limit, cooler mounting, fan/pump RPM, package power and throttle flags.',
  },
  {
    symptom: 'GPU temperature rises and GPU clocks fall',
    possibilities: 'Restricted GPU intake, dust in the heatsink, fan trouble, case airflow or a power/thermal limit.',
    next: 'Log GPU edge temperature, hotspot, fan speed, board power and clock during the same game scene.',
  },
  {
    symptom: 'GPU hotspot behaves unusually compared with edge temperature',
    possibilities: 'A card-specific contact, paste or heatsink-pressure issue may be present.',
    next: 'Compare against the card maker’s guidance. Do not apply a universal hotspot-delta threshold or replace pads by guesswork.',
  },
  {
    symptom: 'CPU and GPU are both hotter than expected',
    possibilities: 'Case airflow, radiator placement, dust filters, fan direction or higher room temperature.',
    next: 'Inspect intake and exhaust paths, filters and fan orientation before changing either component cooler.',
  },
  {
    symptom: 'Fans are loud but temperatures remain high',
    possibilities: 'Blocked fins, an inefficient fan curve, a failing fan, poor heatsink contact or insufficient cooling capacity.',
    next: 'Confirm that air is moving through the heatsink/radiator and that the fans respond to the correct temperature sensor.',
  },
  {
    symptom: 'The PC shuts down, smells abnormal or shows electrical damage',
    possibilities: 'This is not proof of overheating; power delivery, a short, a failed component or another fault may be involved.',
    next: 'Shut the system down, disconnect power when safe and seek qualified hardware diagnosis. Never open a power supply.',
  },
];

const coolingTypes = [
  {
    name: 'Tower air cooler',
    bestFor: 'Most mainstream and many high-performance desktop builds',
    strengths: 'Straightforward design, no pump, low maintenance and strong performance when correctly sized.',
    tradeoffs: 'Check case height, RAM clearance, motherboard layout and airflow around the tower.',
  },
  {
    name: 'All-in-one (AIO) liquid cooler',
    bestFor: 'Builds that benefit from a radiator-based CPU cooling layout',
    strengths: 'Moves heat to a radiator that can be positioned away from the CPU socket; useful for some high-power and space-constrained layouts.',
    tradeoffs: 'Adds a pump, tubing and radiator. Check radiator fit, pump operation, fan direction and the manufacturer’s installation guidance.',
  },
  {
    name: 'Custom liquid loop',
    bestFor: 'Enthusiast systems where appearance, component coverage or specialised cooling justify the complexity',
    strengths: 'Can cool multiple components and offers considerable layout flexibility.',
    tradeoffs: 'Higher cost and complexity, with ongoing maintenance and leak-risk considerations. It is unnecessary for most gaming PCs.',
  },
];

const maintenanceItems = [
  { interval: 'Regular visual check', title: 'Inspect filters and intakes', text: 'Look for visible dust, blocked vents and objects too close to the case. How often this is needed depends on the room and environment.' },
  { interval: 'When dust builds up', title: 'Clean filters and accessible surfaces', text: 'Remove washable filters according to the case manual, let them dry completely, and clear dust from accessible fan grilles and vents.' },
  { interval: 'During troubleshooting', title: 'Verify fans and cooler operation', text: 'Check that every fan starts, spins smoothly and moves air in the intended direction. Investigate new pump noise or abnormal vibration.' },
  { interval: 'When evidence supports it', title: 'Service thermal interfaces', text: 'Replace CPU paste when the cooler is removed or testing points to a contact/interface problem. Do not repaste automatically every year.' },
];

const faqs = [
  {
    question: 'What is a safe CPU temperature while gaming?',
    answer: 'There is no single safe temperature for every CPU. Limits depend on the exact processor, firmware, cooler, power settings and workload. Check the processor manufacturer’s specification and look for actual thermal-throttling flags, clock reductions and sustained performance loss rather than judging one reading in isolation.',
  },
  {
    question: 'Is 90°C too hot for a gaming PC?',
    answer: 'A 90°C reading cannot be judged without knowing which component and model produced it. Some CPUs and GPUs have different operating limits, and a GPU hotspot or memory sensor is not the same as the GPU core sensor. Check the exact part specification and whether it is throttling.',
  },
  {
    question: 'Why does my gaming PC overheat only after 20 or 30 minutes?',
    answer: 'A system may need time for heat to build up in the case, radiator or heatsink. Dust-restricted airflow, a weak fan, an undersized cooler, high sustained power or an AIO circulation issue may become apparent only after a longer workload.',
  },
  {
    question: 'Will adding more case fans fix overheating?',
    answer: 'Not automatically. Fan direction, intake restrictions, radiator placement, case design and the balance between intake and exhaust matter more than the raw fan count. First find where air enters, where hot air leaves and whether it passes through the heatsinks.',
  },
  {
    question: 'Is liquid cooling better than air cooling for gaming?',
    answer: 'Neither is always better. A well-sized tower air cooler is an excellent choice for many systems and has no pump. An AIO can suit particular high-power CPUs or case layouts, but it adds a pump and radiator that must be installed and monitored correctly.',
  },
  {
    question: 'How often should I replace thermal paste?',
    answer: 'There is no universal annual replacement interval. Good paste can remain serviceable for years. Consider replacement when the cooler is removed or measured temperatures and inspection indicate a genuine contact or interface issue.',
  },
  {
    question: 'Can I replace GPU thermal pads with any thickness?',
    answer: 'No. Pad thickness, compressibility and material are specific to the graphics-card cooler and board. An incorrect pad can prevent proper GPU-die contact or apply damaging pressure. Verify the exact card revision and service documentation before disassembly.',
  },
  {
    question: 'Can I keep gaming if the PC is overheating?',
    answer: 'Do not ignore repeated thermal throttling, shutdowns, failed fans, liquid leaks, burning smells or electrical symptoms. Save your work, stop the workload and shut down when there is a safety concern. Never disable thermal protection to keep performance high.',
  },
];

const sources = [
  {
    label: 'Intel — Processor temperature and Tjunction guidance',
    url: 'https://www.intel.com/content/www/us/en/support/articles/000005597/memory-and-storage.html',
    note: 'Explains Tjunction max, thermal control and how to look up the specification for an exact Intel processor.',
  },
  {
    label: 'AMD — Troubleshooting CPU performance and temperature',
    url: 'https://www.amd.com/en/resources/support-articles/faqs/PIBRMATS3.html',
    note: 'Describes how CPU temperature depends on the cooler, airflow, ambient conditions, settings and workload.',
  },
  {
    label: 'Intel — PC cooling fundamentals',
    url: 'https://www.intel.com/content/www/us/en/gaming/resources/pc-cooling-the-importance-of-keeping-your-pc-cool.html',
    note: 'Covers heat generation, processor and GPU cooling, thermal paste and case airflow.',
  },
  {
    label: 'ASUS — Troubleshooting overheating and fan issues',
    url: 'https://www.asus.com/support/faq/1000672/',
    note: 'Hardware checks for heatsink mounting, fan operation, dust, airflow and case configuration.',
  },
  {
    label: 'MSI — Preventing thermal throttling',
    url: 'https://www.msi.com/blog/preventing-thermal-throttling-what-it-is-and-how-to-stop-it',
    note: 'Explains why CPU and GPU thermal behaviour differ and why GPU cooling involves several heat zones.',
  },
  {
    label: 'NVIDIA — GeForce graphics-card specifications',
    url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/compare/',
    note: 'A model-by-model reference for published GPU thermal and power specifications; board-partner models can differ.',
  },
];

export default function GamingPCCooling() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${PAGE_URL}#article` },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      },
      {
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        image: [`${SITE_URL}${HERO_IMAGE}`],
        datePublished: PUBLISHED_DATE,
        dateModified: UPDATED_DATE,
        inLanguage: 'en',
        articleSection: 'Gaming Hardware',
        author: {
          '@type': 'Organization',
          name: 'KCROC Technical Editorial Team',
          url: `${SITE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'KCROC',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
        },
        mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
        keywords: [
          'gaming PC cooling',
          'gaming PC overheating',
          'CPU overheating while gaming',
          'GPU overheating',
          'thermal throttling',
          'PC case airflow',
          'PC fan curves',
          'air cooling vs liquid cooling',
          'AIO liquid cooler',
          'GPU hotspot temperature',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Gaming PC Cooling', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30">
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content="gaming PC cooling, gaming PC overheating, CPU overheating while gaming, GPU overheating, thermal throttling, PC airflow, fan curves, air cooling vs liquid cooling" />
        <meta name="author" content="KCROC Technical Editorial Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="preload" as="image" href={HERO_IMAGE} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="KCROC" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${SITE_URL}${HERO_IMAGE}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="A desktop gaming PC opened for cooling-system inspection and thermal diagnostics" />
        <meta property="article:section" content="Gaming Hardware" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={UPDATED_DATE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}${HERO_IMAGE}`} />
      </Head>
      <SchemaMarkup schema={structuredData} />

      <header className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(6,182,212,0.16),transparent_42%),radial-gradient(circle_at_85%_68%,rgba(59,130,246,0.12),transparent_42%)]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-7 text-xs text-slate-400 sm:text-sm">
            <Link to="/" className="transition-colors hover:text-cyan-300">Home</Link>
            <span className="mx-2 text-slate-600">/</span>
            <Link to="/blog" className="transition-colors hover:text-cyan-300">Blog</Link>
            <span className="mx-2 text-slate-600">/</span>
            <span aria-current="page" className="text-slate-300">Gaming PC Cooling</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            <div>
              <Badge className="mb-5 border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-cyan-200">
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                PC Hardware · Practical Guide
              </Badge>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Gaming PC Cooling: How to Stop Overheating &amp; Thermal Throttling
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Learn how to interpret CPU and GPU temperatures, find the real cause of heat-related FPS drops, improve case airflow, tune fan curves and choose the right cooling system—without replacing parts by guesswork.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 sm:text-sm">
                <span>By KCROC Technical Editorial Team</span>
                <span>Published June 22, 2026</span>
                <span>Technically reviewed November 6, 2026</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-cyan-300" /> 10–12 min read</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#diagnostic-workflow" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300">
                  Start the diagnosis <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#temperature-guide" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200">
                  Understand temperatures
                </a>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900 shadow-2xl shadow-cyan-950/30">
              <img
                src={HERO_IMAGE}
                alt="Desktop gaming PC opened on a workbench for cooling inspection and thermal diagnosis"
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <figcaption className="border-t border-slate-800 px-4 py-3 text-xs leading-5 text-slate-400">
                Reliable cooling is a complete system: component contact, heatsinks, fans, radiator performance and clear case airflow.
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12 lg:py-14">
        <div className="min-w-0">
          <section aria-labelledby="quick-answer" className="mb-10">
            <Card className="overflow-hidden border-cyan-400/25 bg-gradient-to-br from-slate-900 to-slate-900/70">
              <CardHeader className="pb-3">
                <Badge className="w-fit border-emerald-400/25 bg-emerald-400/10 text-emerald-200">The quick answer</Badge>
                <CardTitle id="quick-answer" className="text-xl text-white sm:text-2xl">Measure first. Fix the cause—not the temperature number.</CardTitle>
                <CardDescription className="text-sm leading-7 text-slate-300 sm:text-base">
                  A hot reading does not automatically mean a component is failing. Confirm the exact sensor, compare it with the part’s own specification, and look for sustained throttling or performance loss under a repeatable workload.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 border-t border-slate-800 pt-5 sm:grid-cols-3">
                {quickChecks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.value} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">{item.value} · {item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>

          <section id="why-pcs-overheat" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Understand the cause</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Why gaming PCs overheat</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                CPUs and GPUs turn electrical power into heat. A cooler transfers that heat into a heatsink or radiator, and fans move it into and out of the case. A weakness at any point in that path can reduce sustained cooling performance.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {causes.map((cause) => {
                const Icon = cause.icon;
                return (
                  <Card key={cause.title} className="border-slate-700/80 bg-slate-900/70 transition-colors hover:border-cyan-400/35">
                    <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-5">
                      <div className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-200"><Icon className="h-5 w-5" /></div>
                      <div>
                        <CardTitle className="text-base text-white">{cause.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm leading-6 text-slate-300">{cause.text}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="thermal-throttling" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Recognise the signal</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">What thermal throttling actually looks like</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Thermal throttling is a protective control: a component reduces power, clock speed or both when its thermal control limit is reached. In a game, you may see performance fall after several minutes, uneven frame delivery or clocks that drop while the workload remains demanding.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Frame rates or 1% lows deteriorate as a session continues.',
                'CPU or GPU clocks fall while utilisation and workload remain comparable.',
                'A sensor reaches its model-specific thermal limit or a thermal-throttling flag appears.',
                'Fans run at high speed but the system cannot sustain its earlier performance.',
              ].map((text) => (
                <div key={text} className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/5 p-4">
              <p className="flex items-start gap-2 text-sm leading-6 text-amber-100">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <span><strong>Important:</strong> Modern processors can run at high temperatures during normal boost behaviour. A brief peak, a high fan speed or one screenshot is not enough to diagnose a fault. Look for model-specific limits and repeatable performance changes.</span>
              </p>
            </div>
          </section>

          <section id="temperature-guide" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Read the right sensor</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">What temperature is too hot for a gaming PC?</h2>
              <p className="mt-3 leading-7 text-slate-300">
                There is no universal safe-temperature chart for every desktop. Manufacturers publish limits for specific processors, graphics cards and drives. Sensor names also matter: CPU package, GPU edge, GPU hotspot and memory junction are different measurements.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-[720px] w-full border-collapse text-left text-sm">
                <thead className="bg-slate-800/90 text-cyan-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Component</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Sensors to monitor</th>
                    <th scope="col" className="px-4 py-3 font-semibold">How to interpret them</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {temperatureRows.map((row) => (
                    <tr key={row.part} className="align-top">
                      <th scope="row" className="px-4 py-4 font-semibold text-white">{row.part}</th>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.sensors}</td>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              For Intel CPUs, look up the exact Tjunction or maximum operating temperature in the processor specification. AMD also notes that operating temperature depends on the cooler, airflow, ambient conditions, settings and workload. GPU limits vary by model and board design.
            </p>
          </section>

          <section id="diagnostic-workflow" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">A repeatable method</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">How to diagnose an overheating gaming PC</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Change one variable at a time. Use the same game, scene, graphics settings and approximate room conditions before and after each check. This makes it easier to identify the change that actually improved cooling.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  number: '01',
                  title: 'Reproduce the problem',
                  text: 'Choose a game or repeatable benchmark that normally triggers the issue. Let the system reach its usual operating state, then record temperatures, CPU/GPU utilisation, clocks, power, fan RPM and frame-time behaviour.',
                },
                {
                  number: '02',
                  title: 'Identify the sensor and the component',
                  text: 'Confirm whether the reading is CPU package, GPU edge, hotspot, memory junction or SSD temperature. Check the exact component model and its manufacturer-published operating limit.',
                },
                {
                  number: '03',
                  title: 'Look for throttling—not just heat',
                  text: 'Compare temperature with clock speed, power and performance over time. A component that reaches a control limit and reduces clocks is different from one that briefly boosts to a high temperature without sustained performance loss.',
                },
                {
                  number: '04',
                  title: 'Inspect the case airflow path',
                  text: 'Check that intake filters and vents are clear, fans face the intended direction, cables do not block a major airflow path, and warm exhaust air has a clear route out of the case.',
                },
                {
                  number: '05',
                  title: 'Verify the cooler, fans and pump',
                  text: 'Check fan operation and RPM, heatsink mounting, cooler contact and radiator airflow. For an AIO, verify the pump is detected and operating according to the cooler manufacturer’s instructions.',
                },
                {
                  number: '06',
                  title: 'Test the suspected cause',
                  text: 'Clean a restricted filter, correct a reversed fan, fix a loose mounting point or adjust one fan curve. Repeat the same workload and compare the logs. Do not replace paste, fans or the cooler until the evidence points there.',
                },
              ].map((step) => (
                <Card key={step.number} className="border-slate-700 bg-slate-900/70">
                  <CardContent className="flex gap-4 p-5 sm:p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-sm font-black text-cyan-200">{step.number}</div>
                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{step.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="symptom-table" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Narrow down the fault</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Gaming PC overheating symptoms and what to check</h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-[800px] w-full border-collapse text-left text-sm">
                <thead className="bg-slate-800/90 text-cyan-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Symptom</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Possible explanations</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Next check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {symptomRows.map((row) => (
                    <tr key={row.symptom} className="align-top">
                      <th scope="row" className="px-4 py-4 font-semibold text-white">{row.symptom}</th>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.possibilities}</td>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="case-airflow" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Build the right air path</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">PC case airflow: intake, exhaust and fan direction</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Case airflow should carry cool room air across heat-producing components and move warmed air out. A common starting layout is front or side intake with rear and top exhaust, but the best arrangement depends on the case, radiator and component layout.
              </p>
            </div>
            <figure className="mb-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <img
                src="/images/evga-pc-case-dual-fan-interior.webp"
                alt="Interior of a desktop PC case showing installed cooling fans and component airflow space"
                loading="lazy"
                decoding="async"
                className="max-h-[440px] w-full object-cover"
              />
              <figcaption className="border-t border-slate-800 px-4 py-3 text-xs leading-5 text-slate-400">
                Think in terms of a complete intake-to-exhaust path rather than counting fans.
              </figcaption>
            </figure>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-slate-700 bg-slate-900/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white"><Wind className="h-5 w-5 text-cyan-300" /> Intake</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm leading-6 text-slate-300">
                  <p>Front, side or bottom fans usually bring cooler air in through filtered openings.</p>
                  <p>Keep filters clear and ensure the front panel or desk placement does not choke the intake.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-700 bg-slate-900/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white"><ArrowRight className="h-5 w-5 text-cyan-300" /> Exhaust</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm leading-6 text-slate-300">
                  <p>Rear and top fans commonly move warm air out of the case.</p>
                  <p>Check fan-frame direction arrows where available; do not assume every fan faces the same way.</p>
                </CardContent>
              </Card>
            </div>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-300">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Balance intake and exhaust so air passes through the case instead of short-circuiting between nearby fans.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Slight positive pressure can help reduce unfiltered dust entry when intake fans are filtered; it is not a substitute for cleaning.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Do not add fans blindly. Poor placement or opposing airflow can create turbulence without improving component temperatures.</li>
            </ul>
          </section>

          <section id="air-vs-liquid" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Choose for the system</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Air cooling vs. liquid cooling: which is better?</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Choose a cooler for the processor’s sustained power, case compatibility, noise target and maintenance preferences—not because one cooling type is automatically superior.
              </p>
            </div>
            <div className="grid gap-4">
              {coolingTypes.map((type) => (
                <Card key={type.name} className="border-slate-700 bg-slate-900/70">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">{type.name}</CardTitle>
                    <CardDescription className="text-cyan-200">{type.bestFor}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 pt-2 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-300">Advantages</p>
                      <p className="text-sm leading-6 text-slate-300">{type.strengths}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-300">Trade-offs</p>
                      <p className="text-sm leading-6 text-slate-300">{type.tradeoffs}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="fan-curves" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Control noise and temperature</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">How to set a gaming PC fan curve</h2>
              <p className="mt-3 leading-7 text-slate-300">
                A fan curve controls how quickly a fan speeds up as a selected temperature rises. A useful curve responds to sustained heat without making the fans constantly surge up and down during brief temperature spikes.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Select the right sensor', 'Use CPU temperature for the CPU cooler and an appropriate GPU or case sensor for case fans when your controller supports it.'],
                ['Make gradual changes', 'Increase fan speed progressively as sustained temperature rises. Avoid extreme settings that add noise without solving the bottleneck.'],
                ['Allow response smoothing', 'Use the motherboard or controller’s step-up/step-down delay or hysteresis options to reduce rapid fan hunting.'],
                ['Respect pump guidance', 'For an AIO, follow the maker’s recommended pump header, speed and control mode. Do not treat the pump like an ordinary case fan.'],
              ].map(([title, text]) => (
                <Card key={title} className="border-slate-700 bg-slate-900/70">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-white">{title}</CardTitle></CardHeader>
                  <CardContent className="pt-0"><p className="text-sm leading-6 text-slate-300">{text}</p></CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="thermal-paste" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Interface and contact</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Thermal paste, GPU pads and cooler contact</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Thermal paste fills microscopic gaps between a chip’s heat spreader and the cooler’s cold plate. Its job is to improve contact and heat transfer; it is not a universal cure for poor airflow, a failing fan or an undersized cooler.
              </p>
            </div>
            <figure className="mb-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <img
                src="/images/applying-thermal-paste-pc-cpu-build.webp"
                alt="Thermal compound being applied to a desktop processor before cooler installation"
                loading="lazy"
                decoding="async"
                className="max-h-[420px] w-full object-cover"
              />
              <figcaption className="border-t border-slate-800 px-4 py-3 text-xs leading-5 text-slate-400">
                Correct contact pressure and an appropriate thermal interface matter as much as the compound selected.
              </figcaption>
            </figure>
            <div className="space-y-3 text-sm leading-7 text-slate-300">
              <p><strong className="text-white">CPU paste:</strong> use a reputable compound and the application method recommended for the cooler or processor. Clean old material carefully if the cooler has been removed, and tighten the mounting hardware evenly.</p>
              <p><strong className="text-white">GPU paste:</strong> graphics cards use model-specific cooler assemblies. Disassembly may affect warranty coverage, so check the card maker’s terms and service instructions first.</p>
              <p><strong className="text-white">VRAM and VRM pads:</strong> thickness and compressibility matter. A pad that is too thick can prevent the GPU die from contacting the heatsink correctly; one that is too thin may not contact the component at all.</p>
              <p><strong className="text-white">Liquid metal:</strong> this is not a routine upgrade. Some formulations are electrically conductive and are unsuitable for some heatsink materials. Use only with confirmed material compatibility and appropriate protection by someone experienced with the process.</p>
            </div>
            <div className="mt-5 rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-4">
              <p className="flex items-start gap-2 text-sm leading-6 text-cyan-50">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <span><strong>Do not repaste by calendar.</strong> If temperatures and performance are stable, routine annual paste replacement is not automatically necessary. Use measured evidence, inspection and the manufacturer’s service guidance.</span>
              </p>
            </div>
          </section>

          <section id="safe-cleaning" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Maintenance without damage</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">How to clean a gaming PC safely</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <figure className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
                <img
                  src="/images/custom-pc-aio-liquid-cooler-installation.webp"
                  alt="Liquid cooling radiator and fans installed in a desktop gaming PC"
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-[240px] w-full object-cover"
                />
                <figcaption className="border-t border-slate-800 px-4 py-3 text-xs leading-5 text-slate-400">
                  Keep radiator fins and fan blades clear so air can move through the cooling surface.
                </figcaption>
              </figure>
              <Card className="border-slate-700 bg-slate-900/70">
                <CardContent className="p-5 sm:p-6">
                  <ol className="space-y-3 text-sm leading-6 text-slate-300">
                    <li className="flex gap-3"><span className="font-black text-cyan-300">1.</span><span>Shut the PC down, switch off the PSU and disconnect the power cable before cleaning.</span></li>
                    <li className="flex gap-3"><span className="font-black text-cyan-300">2.</span><span>Let hot components cool. Work in a dry, clean area and follow the case and component manufacturers’ instructions.</span></li>
                    <li className="flex gap-3"><span className="font-black text-cyan-300">3.</span><span>Use short, controlled bursts of suitable compressed air. Hold fan blades still so the airflow does not spin them excessively.</span></li>
                    <li className="flex gap-3"><span className="font-black text-cyan-300">4.</span><span>Remove washable dust filters only as directed and reinstall them when completely dry.</span></li>
                    <li className="flex gap-3"><span className="font-black text-cyan-300">5.</span><span>Never spray liquid into the PC, use a household vacuum against exposed electronics or open the power supply enclosure.</span></li>
                  </ol>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/5 p-4 text-sm leading-6 text-rose-100">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              <p>If an AIO or custom loop leaks, switch the system off, disconnect power when safe and do not try to boot it to “test” whether it still works. Liquid on powered electronics can cause further damage.</p>
            </div>
          </section>

          <section id="maintenance-plan" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Keep performance consistent</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">A sensible gaming PC cooling maintenance plan</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Maintenance frequency depends on dust, pets, room conditions, case filters and hours of use. Inspect condition rather than following a rigid schedule that forces unnecessary disassembly.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {maintenanceItems.map((item) => (
                <Card key={item.title} className="border-slate-700 bg-slate-900/70">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit border-cyan-400/20 bg-cyan-400/10 text-cyan-200">{item.interval}</Badge>
                    <CardTitle className="pt-1 text-base text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0"><p className="text-sm leading-6 text-slate-300">{item.text}</p></CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="monitoring-tools" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Make the test repeatable</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Tools for monitoring gaming PC temperatures</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Monitoring software is useful only when you know what each sensor represents. Use one logging tool for a consistent record, then compare the same workload before and after a change.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['HWiNFO', 'Detailed sensor logging for supported CPU, GPU, motherboard and storage readings.'],
                ['MSI Afterburner', 'GPU monitoring and on-screen overlays for temperature, clocks, fan speed and frame-rate behaviour.'],
                ['AMD Software: Adrenalin Edition', 'Monitoring and tuning options for supported Radeon graphics hardware.'],
                ['NVIDIA App / overlays', 'GPU performance information and supported in-game monitoring features for GeForce systems.'],
              ].map(([name, text]) => (
                <div key={name} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <h3 className="font-bold text-white">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <p className="text-sm leading-6 text-slate-300">
                Record CPU package temperature, GPU edge and hotspot (where available), clock speeds, utilisation, power draw, fan RPM and frame-time. Average FPS alone can hide stutter; 1% lows and a frame-time graph help show whether performance changes as the system heats up.
              </p>
            </div>
          </section>

          <section id="when-to-stop" className="scroll-mt-28 mb-14">
            <div className="rounded-2xl border border-rose-400/25 bg-gradient-to-br from-rose-400/10 to-slate-900 p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-rose-200" />
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">When to stop troubleshooting and get help</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Stop the workload if the PC repeatedly shuts down, a fan has stopped, an AIO is leaking, you smell burning or hear abnormal electrical noise, or you suspect a short or damaged connector. Do not open the PSU, bypass thermal protection or continue stress testing a system showing electrical or liquid-damage symptoms.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    For ordinary temperature problems, a qualified technician should be able to explain which sensor was measured, under what workload, what the relevant component limit is and why the proposed service addresses the observed cause.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-28 mb-14">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Clear answers</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Gaming PC cooling FAQs</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((item) => (
                <details key={item.question} className="group rounded-xl border border-slate-700 bg-slate-900/70 p-4 open:border-cyan-400/30 sm:p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-white marker:hidden">
                    <span>{item.question}</span>
                    <span className="text-cyan-300 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 border-t border-slate-800 pt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-28 mb-14">
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Further reading</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Manufacturer and technical references</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Use the documentation for the exact component in your system. Product generations and board-partner designs can have different thermal specifications.
              </p>
            </div>
            <div className="space-y-3">
              {sources.map((source) => (
                <div key={source.url} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-100">
                    {source.label} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{source.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="related-guides" className="scroll-mt-28">
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Keep learning</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Related PC gaming guides</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/blog/pc-gaming-graphics-settings-better-visuals-fps" className="group rounded-xl border border-slate-700 bg-slate-900/70 p-5 transition-colors hover:border-cyan-400/40">
                <h3 className="font-bold text-white group-hover:text-cyan-200">PC Gaming Graphics Settings: Better Visuals Without Maxing Everything</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Understand which graphics options affect image quality and GPU load most.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-300">Read the guide <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
              <Link to="/guides/windows-gaming-frame-time-stutter" className="group rounded-xl border border-slate-700 bg-slate-900/70 p-5 transition-colors hover:border-cyan-400/40">
                <h3 className="font-bold text-white group-hover:text-cyan-200">Gaming Stutter With High FPS: How to Read Frame Time</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Learn why average FPS can look healthy while frame delivery still feels uneven.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-300">Read the guide <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">In this guide</p>
            <nav aria-label="Article contents" className="space-y-1.5 text-sm">
              {[
                ['why-pcs-overheat', 'Why PCs overheat'],
                ['thermal-throttling', 'Thermal throttling'],
                ['temperature-guide', 'Temperature guide'],
                ['diagnostic-workflow', 'Diagnosis workflow'],
                ['symptom-table', 'Symptoms and checks'],
                ['case-airflow', 'Case airflow'],
                ['air-vs-liquid', 'Air vs. liquid cooling'],
                ['fan-curves', 'Fan curves'],
                ['thermal-paste', 'Paste and GPU pads'],
                ['safe-cleaning', 'Safe cleaning'],
                ['maintenance-plan', 'Maintenance plan'],
                ['monitoring-tools', 'Monitoring tools'],
                ['faqs', 'FAQs'],
                ['sources', 'Technical references'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="block rounded-lg px-2.5 py-2 text-slate-400 transition-colors hover:bg-cyan-400/10 hover:text-cyan-200">{label}</a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </article>
  );
}
