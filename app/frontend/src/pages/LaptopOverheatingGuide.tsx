import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, CheckCircle2, ChevronRight, Cpu, Fan, Gauge,
  ShieldAlert, Thermometer, Wind, Wrench
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GUIDE_PATH = '/guides/why-is-my-laptop-so-hot';
const PAGE_URL = `https://www.computerrepairkuwait.com${GUIDE_PATH}`;

const symptoms = [
  { label: 'Very hot + fan constantly loud', value: 'fan' },
  { label: 'Hot + laptop becomes slow', value: 'slow' },
  { label: 'Hot + shuts down/restarts', value: 'shutdown' },
  { label: 'Hot mostly during gaming/heavy work', value: 'load' },
  { label: 'Hot even when mostly idle', value: 'idle' },
];

const ageOptions = [
  { label: 'Less than 1 year', value: 'new' },
  { label: '1–3 years', value: 'mid' },
  { label: 'More than 3 years', value: 'old' },
];

const environmentOptions = [
  { label: 'Hard desk / good airflow', value: 'desk' },
  { label: 'Bed / sofa / soft surface', value: 'soft' },
  { label: 'Docked / close to wall or blocked vents', value: 'blocked' },
];

const causes = [
  ['Restricted airflow', 'Vents blocked by a soft surface, wall placement, dust, or a chassis design with limited intake.'],
  ['Dust in the heatsink', 'Dust can reduce the amount of air moving through the fins and make the fan work harder.'],
  ['High CPU/GPU workload', 'Games, rendering, updates, browsers, or background processes can legitimately raise heat.'],
  ['Thermal throttling', 'When cooling cannot keep up, the processor can reduce frequency/power to control temperature.'],
  ['Fan failure', 'Grinding, clicking, or a fan that does not respond to load can indicate mechanical or electrical failure.'],
  ['Thermal interface problem', 'Aged or disturbed thermal interface material can contribute to poor heat transfer, but it should not be replaced blindly.'],
];

const faq = [
  {
    q: 'Why is my laptop so hot even when the fan is running?',
    a: 'A fan can be working normally while airflow through the heatsink is restricted, the workload is high, or the cooling system is no longer transferring heat efficiently. Check workload, airflow, and temperatures together rather than judging the fan alone.'
  },
  {
    q: 'What temperature is too hot for a laptop?',
    a: 'There is no single temperature that applies to every laptop. CPU limits vary by processor and system design, and workload matters. Use the manufacturer specifications for the exact CPU/laptop and look for sustained high temperature together with throttling, severe performance loss, or shutdowns.'
  },
  {
    q: 'Can dust make a laptop overheat?',
    a: 'Yes. Dust buildup can restrict airflow through the fan and heatsink. If the machine is older, the vents are visibly dirty, or the fan has become unusually loud, internal cooling inspection is reasonable.'
  },
  {
    q: 'Why does my laptop get hot while gaming?',
    a: 'Gaming can place sustained load on both CPU and GPU, so higher temperatures are expected. The important question is whether the system remains within its designed limits and maintains performance without repeated throttling or shutdowns.'
  },
  {
    q: 'Can overheating cause laptop stuttering?',
    a: 'Yes. Thermal throttling can reduce processor frequency and power, which can produce performance drops or inconsistent frame times. If stutter appears only after the laptop has been under load for several minutes, monitor temperature and clock speed over the same period.'
  },
  {
    q: 'Should I replace thermal paste if my laptop is hot?',
    a: 'Not automatically. Overheating can come from airflow, dust, fan failure, workload, power settings, or other hardware faults. Diagnose the cooling system first so the repair targets the actual cause.'
  },
  {
    q: 'Is a laptop that shuts down from heat dangerous?',
    a: 'Repeated thermal shutdowns are a fault symptom worth investigating. Modern processors have thermal protection, but repeated shutdowns can indicate inadequate cooling, a failed fan, blocked airflow, or another system problem.'
  },
  {
    q: 'Can Kuwait heat make laptop overheating worse?',
    a: 'Yes. Higher room temperature reduces the cooling system\'s temperature headroom. The laptop still needs to remain within its own design limits, so persistent overheating in a warm room should be investigated rather than attributed to weather alone.'
  },
];

export default function LaptopOverheatingGuide() {
  const business = KCROC_GRAPH.business!;
  const [symptom, setSymptom] = useState('');
  const [age, setAge] = useState('');
  const [environment, setEnvironment] = useState('');

  const result = useMemo(() => {
    if (!symptom || !age || !environment) return null;
    if (symptom === 'shutdown') return {
      level: 'High priority',
      icon: ShieldAlert,
      title: 'Check the cooling system before continuing heavy use',
      text: 'Repeated shutdowns are more important than a single temperature reading. Check airflow, fan operation and temperatures under load. If the shutdown repeats, professional inspection is appropriate.'
    };
    if (symptom === 'idle') return {
      level: 'Investigate', icon: Thermometer,
      title: 'Look for a background process or cooling fault',
      text: 'Heat while mostly idle is less likely to be explained by gaming load. Check Task Manager for sustained CPU/GPU activity, then verify that the fan and vents are operating normally.'
    };
    if (environment !== 'desk') return {
      level: 'First check', icon: Wind,
      title: 'Improve airflow before changing hardware',
      text: 'Move the laptop to a hard, flat surface and clear all intake/exhaust openings. Retest under the same workload before assuming the thermal paste or fan is defective.'
    };
    if (age === 'old') return {
      level: 'Likely maintenance', icon: Fan,
      title: 'Inspect the cooling path',
      text: 'On an older laptop, accumulated dust, a worn fan, or degraded thermal interface material become reasonable suspects. The exact fault should be confirmed before parts are replaced.'
    };
    if (symptom === 'slow') return {
      level: 'Measure', icon: Gauge,
      title: 'Check for thermal throttling',
      text: 'Monitor CPU/GPU temperature, clock speed and utilization while the slowdown happens. A temperature rise followed by a sustained clock-speed drop is a useful clue.'
    };
    return {
      level: 'Monitor', icon: Cpu,
      title: 'Compare temperature with workload and system limits',
      text: 'Higher temperatures under sustained work can be normal. Focus on whether performance drops, throttling appears, or the system reaches its documented thermal limits.'
    };
  }, [symptom, age, environment]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Why Is My Laptop So Hot? Overheating Causes, Diagnosis & Fixes',
        description: 'A practical laptop overheating diagnostic guide covering airflow, dust, fan problems, workload, thermal throttling, temperature interpretation and when to seek repair.',
        url: PAGE_URL,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${PAGE_URL}#webpage` },
        author: { '@type': 'Person', name: 'Imran Natiq', url: `${business.websiteUrl}/author/imran` },
        publisher: { '@type': 'Organization', name: business.legalName, url: business.websiteUrl },
        articleSection: 'Laptop Repair Guides',
        inLanguage: 'en-KW'
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question', name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      },
      {
        '@type': 'BreadcrumbList',
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
          <Link to="/" className="hover:text-cyan-300">Home</Link><span className="mx-2">/</span>
          <Link to="/guides" className="hover:text-cyan-300">Guides</Link><span className="mx-2">/</span>
          <span className="text-slate-200">Laptop Overheating</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <Badge className="mb-4 border-cyan-400/30 bg-cyan-400/10 text-cyan-300">Laptop Troubleshooting Guide</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Why Is My Laptop So Hot?</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Diagnose laptop overheating without guessing. Learn how to separate normal workload heat from restricted airflow, dust, fan faults, thermal throttling and other cooling problems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-slate-700 px-3 py-1">Windows & gaming laptops</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Evidence-first diagnosis</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Updated September 2026</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <img src="/images/laptop-fan-copper-heatpipe-closeup.webp" alt="Laptop cooling fan and copper heatpipe assembly" className="h-full w-full object-cover" width="1000" height="750" loading="eager" />
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Thermometer className="mt-1 h-7 w-7 shrink-0 text-cyan-300" />
            <div>
              <h2 className="text-2xl font-semibold">First: hot does not automatically mean overheating</h2>
              <p className="mt-3 leading-7 text-slate-300">
                CPU temperature depends on the processor, laptop design, workload, cooling system and room conditions. There is no universal “safe laptop temperature” number that applies to every model. The more useful question is whether the system is reaching its documented limits, throttling, losing performance, or shutting down.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14" id="diagnostic">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Free diagnostic</p>
            <h2 className="mt-2 text-3xl font-bold">What is most likely making your laptop hot?</h2>
            <p className="mt-3 text-slate-400">Choose the closest match. This is a triage tool, not a substitute for measuring the exact machine.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">1. Main symptom</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {symptoms.map(option => <button key={option.value} onClick={() => setSymptom(option.value)} className={`w-full rounded-lg border p-3 text-left text-sm transition ${symptom === option.value ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>{option.label}</button>)}
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">2. Laptop age</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {ageOptions.map(option => <button key={option.value} onClick={() => setAge(option.value)} className={`w-full rounded-lg border p-3 text-left text-sm transition ${age === option.value ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>{option.label}</button>)}
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/80">
              <CardHeader><CardTitle className="text-base">3. Where you use it</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {environmentOptions.map(option => <button key={option.value} onClick={() => setEnvironment(option.value)} className={`w-full rounded-lg border p-3 text-left text-sm transition ${environment === option.value ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>{option.label}</button>)}
              </CardContent>
            </Card>
          </div>
          {result && <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="flex gap-4">
              <result.icon className="mt-1 h-7 w-7 shrink-0 text-cyan-300" />
              <div>
                <Badge className="border-slate-700 bg-slate-800 text-slate-200">{result.level}</Badge>
                <h3 className="mt-3 text-xl font-semibold">{result.title}</h3>
                <p className="mt-2 max-w-3xl leading-7 text-slate-300">{result.text}</p>
              </div>
            </div>
          </div>}
        </section>

        <section className="mt-16" id="causes">
          <h2 className="text-3xl font-bold">The most common reasons a laptop gets hot</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {causes.map(([title, text]) => <Card key={title} className="border-slate-800 bg-slate-900/70"><CardContent className="p-6"><div className="flex gap-4"><Cpu className="h-6 w-6 shrink-0 text-cyan-300" /><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div></div></CardContent></Card>)}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2" id="diagnose">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader><CardTitle className="flex items-center gap-2"><Gauge className="h-5 w-5 text-cyan-300" /> How to diagnose it properly</CardTitle></CardHeader>
            <CardContent className="space-y-5 text-sm leading-7 text-slate-300">
              <div><strong>1. Check the workload.</strong> Open Task Manager and see whether CPU, GPU or another process is staying unusually busy when the laptop feels hot.</div>
              <div><strong>2. Check airflow.</strong> Use a hard, flat surface and make sure intake and exhaust openings are unobstructed.</div>
              <div><strong>3. Monitor temperature and clocks.</strong> Record what happens before, during and after the slowdown rather than relying on one instant reading.</div>
              <div><strong>4. Look for throttling.</strong> A sustained clock-speed drop that coincides with high temperature is a useful thermal clue.</div>
              <div><strong>5. Re-test after one change.</strong> Change one variable at a time so you know what actually affected the result.</div>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-cyan-300" /> Safe fixes to try first</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Move the laptop to a hard, flat surface.',
                'Clear the intake and exhaust vents.',
                'Close unnecessary high-CPU/GPU applications.',
                'Install pending Windows and manufacturer updates.',
                'Use the manufacturer\'s recommended power/thermal profile.',
                'If the problem persists, inspect the internal fan and heatsink rather than immediately changing thermal paste.'
              ].map(item => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" /><span>{item}</span></div>)}
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 sm:p-8">
          <div className="flex gap-4"><AlertTriangle className="h-6 w-6 shrink-0 text-amber-300" /><div><h2 className="text-2xl font-semibold">When not to keep experimenting</h2><p className="mt-3 leading-7 text-slate-300">Stop treating it as a software tweak if the laptop repeatedly shuts down, the fan is mechanically noisy or not spinning, the chassis is becoming unusually hot in one localized area, or basic airflow checks make no difference. Those symptoms justify a proper hardware inspection.</p></div></div>
        </section>

        <section className="mt-16" id="faq">
          <h2 className="text-3xl font-bold">Laptop overheating FAQ</h2>
          <div className="mt-6 grid gap-4">
            {faq.map(item => <details key={item.q} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"><summary className="cursor-pointer font-semibold">{item.q}</summary><p className="mt-3 leading-7 text-slate-400">{item.a}</p></details>)}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Continue troubleshooting</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link to="/guides/dell-laptop-overheating" className="rounded-lg border border-slate-700 p-4 hover:border-cyan-400"><span className="font-semibold">Dell laptop overheating guide</span><ChevronRight className="ml-2 inline h-4 w-4" /></Link>
            <Link to="/guides/laptop-battery-warning-signs" className="rounded-lg border border-slate-700 p-4 hover:border-cyan-400"><span className="font-semibold">Laptop battery warning signs</span><ChevronRight className="ml-2 inline h-4 w-4" /></Link>
            <Link to="/guides/gamebar-presence-writer-fix" className="rounded-lg border border-slate-700 p-4 hover:border-cyan-400"><span className="font-semibold">Windows gaming stutter / Game Bar guide</span><ChevronRight className="ml-2 inline h-4 w-4" /></Link>
            <Link to="/laptop-repair-kuwait" className="rounded-lg border border-slate-700 p-4 hover:border-cyan-400"><span className="font-semibold">Laptop repair in Kuwait</span><ChevronRight className="ml-2 inline h-4 w-4" /></Link>
          </div>
          <div className="mt-7"><Button asChild><a href={`https://wa.me/${business.telephone}?text=${encodeURIComponent('Hi KCROC, my laptop is overheating and I need a diagnostic.')}`}><Wrench className="mr-2 h-4 w-4" />Ask KCROC for a diagnostic</a></Button></div>
        </section>

        <section className="mt-12 border-t border-slate-800 pt-8 text-xs leading-6 text-slate-500">
          <p><strong className="text-slate-400">Technical references:</strong> Intel documents that processor thermal limits vary by product and that thermal protection can reduce power/frequency when temperatures become excessive. Microsoft documents Windows power and diagnostic utilities. This guide deliberately avoids a single universal “safe temperature” number.</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1"><a href="https://www.intel.com/content/www/us/en/support/articles/000005597/processors.html" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Intel processor temperature guidance</a><a href="https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Intel throttling guidance</a><a href="https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Microsoft PowerCfg documentation</a></div>
        </section>
      </main>
    </div>
  );
}
