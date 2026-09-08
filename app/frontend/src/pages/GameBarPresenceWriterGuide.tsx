// File: app/frontend/src/pages/GameBarPresenceWriterGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle, CheckCircle2, ChevronRight, CircleHelp, Cpu, Gamepad2,
  Gauge, HardDrive, MonitorCog, Network, Power, RotateCcw, ShieldAlert,
  Terminal, Thermometer, Wrench, XCircle
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const business = KCROC_GRAPH.business!;
const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent('I need gaming PC performance diagnostics in Kuwait')}`;
const PAGE_URL = `${business.websiteUrl}/guides/gamebar-presence-writer-fix`;

const registryPath = 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\WindowsRuntime\\ActivatableClassId\\Windows.Gaming.GameBar.PresenceServer.Internal.PresenceWriter';

// Microsoft's own DevNotes page documents what Presence Writer *does* (the
// COM contract, the focus/close events) and the *registration* path for a
// custom implementation (WindowsRuntime\Server\...\PresenceWriterServer).
// It does not document the ActivatableClassId ownership-override tweak
// below — that's a community-discovered workaround, not an MS-sanctioned
// disable method. Cited for the "what it does" claim only; the registry
// section is explicit that the override itself is unofficial.
const MS_DOCS_URL = 'https://learn.microsoft.com/en-us/windows/win32/devnotes/gamebar-presencewriter';

const LAST_REVIEWED = 'August 23, 2026';

const toc = [
  { id: 'what-it-is', label: 'What It Is' },
  { id: 'diagnose', label: 'Diagnose First' },
  { id: 'safe-method', label: 'Low-Risk Method' },
  { id: 'registry', label: 'Registry Override' },
  { id: 'command-line', label: 'Command Line' },
  { id: 'taskkill', label: 'Task Isolation' },
  { id: 'other-causes', label: 'Other Stutter Causes' },
  { id: 'kuwait', label: 'Kuwait Heat' },
  { id: 'faq', label: 'FAQ' },
];

const symptoms = [
  { symptom: 'High FPS but uneven motion', likely: 'Frame-time spikes, overlays, DPC/driver activity, shader compilation, or CPU scheduling.', check: 'Watch frame-time, not only the FPS counter.' },
  { symptom: 'Stutter starts when Game Bar opens', likely: 'Game Bar/capture/overlay activity is a plausible contributor.', check: 'Reproduce with Game Bar disabled and compare the same scene.' },
  { symptom: 'FPS falls after 10–30 minutes', likely: 'Thermal throttling or power limits are more likely than Presence Writer.', check: 'Log CPU/GPU clocks and temperatures over time.' },
  { symptom: 'Only one game stutters', likely: 'Game engine, shader cache, driver profile, or game-specific settings.', check: 'Compare with a second game before changing Windows internals.' },
  { symptom: 'Stutter follows alt-tab or overlays', likely: 'Windows/Game Bar/Discord/Steam/NVIDIA/AMD overlay interaction.', check: 'Disable one overlay at a time and retest.' },
];

const faqs = [
  { q: 'What is GameBarPresenceWriter.exe?', a: 'It is associated with Windows Game Bar presence functionality. Microsoft documents Presence Writer as a component notified when a game gains focus, loses focus, or closes, and describes its role in updating Xbox Live game presence when the relevant Xbox features are enabled.' },
  { q: 'Does GameBarPresenceWriter.exe definitely cause gaming stutter?', a: 'No. Its presence alone does not prove a performance problem. Stutter has many possible causes, including GPU/CPU limits, thermal throttling, drivers, overlays, shader compilation, storage, and background software. Treat this process as a testable variable rather than the default culprit.' },
  { q: 'Should I change the registry before testing anything else?', a: 'No. Start with the least invasive Game Bar and capture settings, reproduce the problem, and measure frame-time. Registry ownership changes should be a last-resort experiment for an experienced Windows user.' },
  { q: 'Will disabling Game Bar remove Steam or Discord overlays?', a: 'No. Xbox Game Bar is separate from Steam Overlay, Discord Overlay, and third-party capture applications such as OBS. Those applications have their own settings and processes.' },
  { q: 'Can I just use taskkill?', a: 'You can terminate a currently running process, but that is not a guaranteed permanent disable mechanism. Windows or the application stack can start a component again when its activation conditions are met.' },
  { q: 'What should I check if disabling Game Bar does not fix stutter?', a: 'Check frame-time consistency, CPU/GPU utilization, temperatures, clock speeds, RAM pressure, storage activity, graphics-driver behavior, overlays, shader compilation, and DPC/ISR latency. Hardware instability should also be considered.' },
  { q: 'Is this especially relevant to gaming laptops and handhelds?', a: 'It can be worth testing on constrained systems such as gaming laptops and Windows handhelds because background activity competes within a tighter thermal and power budget. But thermal and power-limit behavior should be investigated first when symptoms appear after sustained gaming.' },
  { q: 'Can I undo the registry change?', a: 'Yes, if you made a backup and documented the original value. The safest recovery path is to restore the original registry value and ownership rather than assuming a hard-coded value applies identically to every Windows build.' },
];

// 🚀 Self-contained TechArticle + Person + HowTo + FAQPage + BreadcrumbList
// schema, rendered directly via SchemaMarkup rather than through SEOEngine's
// `schemaTypes` path. Two independent reasons this page opts out of
// SEOEngine's auto-generation instead of just the FAQPage piece:
//
// 1. FAQPage: SEOEngine's WebPage->FAQPage branch falls back to
//    `KCROC_GRAPH.faqs` (every FAQ on the entire site) whenever the entity
//    has no `featuredFAQIds` — this page's 8 FAQs aren't registered as
//    global FAQ entities, so enabling that schemaType on the graph entity
//    would have silently attached every site-wide FAQ to this page instead
//    of just these 8. Same pattern already used on ScreenProtectionTips.tsx
//    and GamingPCCooling.tsx.
// 2. Article/BreadcrumbList/Person: the graph entity for this page used to
//    carry `schemaTypes: ['Article','BreadcrumbList','ImageObject']`, which
//    made SEOEngine ALSO push its own generic `Article` node at the exact
//    same `#article` @id as this file's hand-rolled `TechArticle`, plus a
//    second, redundant `BreadcrumbList` node — two competing type
//    declarations for one @id is an invalid/ambiguous graph, not just
//    wasted bytes. Fixed by trimming the entity's `schemaTypes` down to
//    `['WebPage']` in graph.ts (keeps the `#webpage` node this page's
//    `mainEntityOfPage` and `HowTo` reference, drops the colliding
//    Article/Breadcrumb/Person auto-emission) and hand-rolling the Person
//    node below instead, using the same canonical `AUTHOR_ID` shape
//    SEOEngine uses elsewhere so it resolves consistently site-wide.
const AUTHOR_ID = `${business.websiteUrl}/author/imran#person`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": AUTHOR_ID,
      "name": "Imran Natiq",
      "url": `${business.websiteUrl}/author/imran`,
      "jobTitle": "Founder & Lead Technician",
      "worksFor": { "@id": `${business.websiteUrl}/#business` }
    },
    {
      "@type": "TechArticle",
      "@id": `${PAGE_URL}#article`,
      "headline": "GameBarPresenceWriter.exe: What It Does, How to Fix Performance Issues, and How to Disable It",
      "description": "What is GameBarPresenceWriter.exe? A measured, evidence-first guide to what the Windows Game Bar component does, whether it's causing high CPU use or stutter, and how to disable related Game Bar activity.",
      "url": PAGE_URL,
      "isPartOf": { "@id": `${business.websiteUrl}/#website` },
      "mainEntityOfPage": { "@id": `${PAGE_URL}#webpage` },
      "about": { "@id": `${business.websiteUrl}/#business` },
      "author": { "@id": AUTHOR_ID },
      "publisher": { "@id": `${business.websiteUrl}/#business` },
      "image": IMAGES.gaming.rgbLighting.src,
      "articleSection": "Guides",
      "dateModified": "2026-08-23"
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      "name": "How to test and fix GameBarPresenceWriter.exe-related stutter",
      "description": "A measure-first sequence for isolating whether Game Bar Presence Writer is contributing to gaming stutter, from least to most invasive.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Diagnose before you modify anything", "text": "Reproduce the stutter in a repeatable scene and log frame-time, temperatures, and background load to identify what's actually correlated with the symptom.", "url": `${PAGE_URL}#diagnose` },
        { "@type": "HowToStep", "position": 2, "name": "Disable Xbox Game Bar and capture settings", "text": "Turn off Game Bar and background captures in Settings, reboot, and compare frame-time in the same scene. This is the lowest-risk step and doesn't touch the registry.", "url": `${PAGE_URL}#safe-method` },
        { "@type": "HowToStep", "position": 3, "name": "Back up before touching the registry", "text": "If the safe method doesn't resolve it, create a restore point and export the ActivatableClassId registry key before changing any permissions or values.", "url": `${PAGE_URL}#registry` },
        { "@type": "HowToStep", "position": 4, "name": "Test the ActivationType value", "text": "Change the ActivationType DWORD from an elevated terminal, retest, and keep the documented original value so you can restore it exactly.", "url": `${PAGE_URL}#command-line` },
        { "@type": "HowToStep", "position": 5, "name": "Confirm with a targeted taskkill test", "text": "Terminate the running process for a quick before/after comparison — this confirms correlation for the current session but isn't a permanent disable.", "url": `${PAGE_URL}#taskkill` }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": business.websiteUrl },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${business.websiteUrl}/guides` },
        { "@type": "ListItem", "position": 3, "name": "GameBarPresenceWriter.exe Fix", "item": PAGE_URL }
      ]
    }
  ]
};

const sectionClass = 'border-b border-slate-800/80 px-4 py-10 sm:px-6 sm:py-16';
const proseClass = 'text-sm leading-7 text-slate-300 sm:text-base';

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-cyan-200 sm:text-sm">
      <code>{children}</code>
    </pre>
  );
}

function Callout({ title, children, danger = false }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${danger ? 'border-red-500/30 bg-red-500/5' : 'border-cyan-500/20 bg-cyan-500/5'}`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-xl p-2 ${danger ? 'bg-red-500/10' : 'bg-cyan-500/10'}`}>
          {danger ? <ShieldAlert className="h-5 w-5 text-red-400" /> : <CircleHelp className="h-5 w-5 text-cyan-400" />}
        </div>
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <div className="mt-2 text-sm leading-6 text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function GameBarPresenceWriterGuide() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      <SEOEngine entityId="guide-gamebar-presence-writer" />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-10 pt-24 sm:px-6 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,0.14),transparent_42%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
            <div>
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Windows Gaming Performance Guide
              </Badge>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                GameBarPresenceWriter.exe:
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  What It Does, How to Fix Performance Issues, and How to Disable It
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                GameBarPresenceWriter.exe is a Windows gaming component tied to Xbox Game Bar's game-presence functionality. Seeing it in Task Manager does not by itself mean it is causing stutter or high CPU use — the safest approach is to check whether Game Bar activity actually correlates with the problem, test the least invasive settings first, and treat the registry override as a last resort.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="w-full bg-cyan-500 px-6 py-6 font-bold text-slate-950 hover:bg-cyan-400 sm:w-auto">
                  <a href={`tel:+${business.telephone}`}>Book a Gaming Diagnostic</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full border-slate-700 px-6 py-6 text-slate-200 hover:bg-slate-800 sm:w-auto">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp a Technician</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-[11px] text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-300">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-2xl shadow-amber-950/20 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-amber-500/10 p-3"><Gauge className="h-6 w-6 text-amber-400" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Performance rule</p>
                  <h2 className="mt-1 text-xl font-bold text-white">Measure before you modify</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                A process appearing in Task Manager while a game runs does not prove it is causing latency. Compare frame-time and system behavior before and after each change so you know which change actually helped.
              </p>
              <a href="#diagnose" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">Start with diagnosis <ChevronRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="quick-answer" className="border-b border-slate-800/80 px-4 py-8 sm:px-6 sm:py-10">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-7">
            <h2 className="text-lg font-bold text-white sm:text-xl">What is GameBarPresenceWriter.exe?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              It's a Windows component associated with Xbox Game Bar's presence functionality. Microsoft documents it as reacting to a game gaining focus, losing focus, or closing, and — when the relevant Xbox features are enabled — updating Xbox Live game presence for the running title. It is not, by itself, proof of a CPU, GPU, or network problem; treat it as one variable to test rather than an automatic culprit.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/80 px-4 py-8 sm:px-6 sm:py-10">
        <div className="container mx-auto max-w-5xl">
          <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={IMAGES.gaming.rgbLighting.src} alt={IMAGES.gaming.rgbLighting.alt} width={IMAGES.gaming.rgbLighting.width} height={IMAGES.gaming.rgbLighting.height} loading="eager" decoding="async" className="h-auto max-h-[420px] w-full object-cover" />
            <figcaption className="border-t border-slate-800/60 bg-slate-950/80 p-3 text-xs text-slate-400">A high-performance gaming system still needs clean software scheduling, stable drivers, and adequate thermal headroom.</figcaption>
          </figure>
        </div>
      </section>

      <section id="what-it-is" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr]">
            <div>
              <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">What it actually does</Badge>
              <h2 className="text-2xl font-bold sm:text-4xl">The “ghost” is real — the bottleneck is not automatically proven.</h2>
              <p className={`mt-4 ${proseClass}`}>
                <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200">Microsoft's own developer documentation</a> describes Game Bar Presence Writer as a Windows component that receives game presence events such as focus gained, focus lost, and game close. When the relevant Xbox functionality is enabled, the default implementation can update Xbox Live presence for the running game. That is a much narrower and more defensible description than saying the executable is inherently a telemetry process that steals gaming network bandwidth.
              </p>
              <p className={`mt-4 ${proseClass}`}>
                That distinction matters. If your frame-time graph shows a reproducible improvement after Game Bar activity is removed, the tweak may be worthwhile on your particular system. If nothing changes, restore the defaults and investigate the actual source instead.
              </p>
            </div>
            <Callout title="Microsoft's documented role">
              Presence Writer is part of the Windows gaming stack and reacts to a game's foreground presence state. It is not evidence by itself of GPU saturation, network congestion, or CPU bottlenecking.
            </Callout>
          </div>
        </div>
      </section>

      <section id="diagnose" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 max-w-3xl">
            <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Step 1</Badge>
            <h2 className="text-2xl font-bold sm:text-4xl">Diagnose the stutter before touching the registry</h2>
            <p className={`mt-3 ${proseClass}`}>Use a repeatable scene, record frame-time, and change one variable at a time. The goal is to identify causation rather than collect “gaming tweaks.”</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {symptoms.map((item) => (
              <div key={item.symptom} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <h3 className="font-bold text-white">{item.symptom}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400"><span className="font-semibold text-cyan-300">Likely:</span> {item.likely}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400"><span className="font-semibold text-emerald-300">Check:</span> {item.check}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Frame-time', 'Look for spikes and uneven delivery, not only average FPS.', Gauge],
              ['Temperatures', 'Log CPU/GPU temperatures and clock speeds during the same test.', Thermometer],
              ['Background load', 'Check CPU, disk, network, overlays, and capture activity.', MonitorCog],
            ].map(([title, text, Icon]) => {
              const I = Icon as React.ElementType;
              return <div key={title as string} className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><I className="h-5 w-5 text-cyan-400" /><h3 className="mt-3 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></div>;
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            Not sure which background processes are worth auditing first? See our{' '}
            <Link to="/guides/windows-11-background-services-audit" className="font-semibold text-cyan-300 hover:text-cyan-200">Windows 11 Background Services Audit</Link>{' '}
            for an evidence-first look at WHESVC, DiagTrack, SysMain and MapsBroker.
          </p>
        </div>
      </section>

      <section id="safe-method" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">Step 2 — lowest risk</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Start with Xbox Game Bar and capture settings</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3"><Power className="h-5 w-5 text-emerald-400" /><h3 className="font-bold">Disable what you do not use</h3></div>
              <ol className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                <li><span className="font-bold text-white">1.</span> Open <strong>Settings → Gaming → Xbox Game Bar</strong> and turn off Game Bar if you do not use it.</li>
                <li><span className="font-bold text-white">2.</span> Review <strong>Settings → Gaming → Captures</strong> and disable background recording if you do not need it.</li>
                <li><span className="font-bold text-white">3.</span> Reboot, reproduce the same stutter, and compare frame-time.</li>
              </ol>
            </div>
            <Callout title="What you give up">
              Disabling Game Bar/capture features can remove Xbox Game Bar widgets, Game Bar recording and related capture shortcuts. It does not disable Steam Overlay, Discord Overlay, OBS, or your GPU vendor's separate overlay/capture features.
            </Callout>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            Looking for more Settings-app changes worth making? See our{' '}
            <Link to="/guides/windows-11-settings-tweaks" className="font-semibold text-cyan-300 hover:text-cyan-200">18 Windows 11 Settings Worth Changing</Link>{' '}
            for privacy, startup, power and security tweaks beyond Game Bar.
          </p>
        </div>
      </section>

      <section id="registry" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Step 3 — advanced</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Registry override: use only when you understand the trade-off</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            The commonly circulated tweak targets the Windows Runtime ActivatableClassId registration for Presence Writer. Because this is a protected system area, changing ownership or permissions is materially more invasive than turning off Game Bar.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="font-bold text-white">1. Back up the key first</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Create a restore point and export the registry key before changing permissions or values.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="font-bold text-white">2. Navigate to the ActivatableClassId</h3>
                <CodeBlock>{registryPath}</CodeBlock>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="font-bold text-white">3. Change permissions only if necessary</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">If the key is owned by TrustedInstaller and your build blocks modification, do not blindly replace ownership. Export the key first, understand the recovery path, and change only the minimum permission required.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="font-bold text-white">4. Test the ActivationType value</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">If your Windows build exposes the documented DWORD as <code className="text-cyan-300">ActivationType</code>, record its original value before testing an alternative. Do not assume a value of 0 or 1 is universal across every Windows release.</p>
              </div>
            </div>
            <Callout title="Important: this is not an official Microsoft gaming optimization" danger>
              Microsoft documents what Presence Writer does and how a developer registers a <em>replacement</em> implementation — a different registry path than the ActivatableClassId override shown here. This override is a community-discovered workaround, not something Microsoft documents or recommends as a disable method. Treat it as an advanced troubleshooting experiment and keep a clean rollback path.
            </Callout>
          </div>
        </div>
      </section>

      <section id="command-line" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-violet-500/30 bg-violet-500/10 text-violet-300">Step 4 — command line</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Automate the registry test from an elevated terminal</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>If you have already backed up the key and verified that the value exists on your Windows build, an elevated Command Prompt can change the DWORD without navigating the GUI.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-bold"><Terminal className="h-5 w-5 text-violet-400" /> Test command</h3>
              <CodeBlock>{`reg add "${registryPath}" /v ActivationType /t REG_DWORD /d 0 /f`}</CodeBlock>
              <p className="mt-3 text-xs leading-5 text-slate-500">Only use this if the value is present and you have documented the original state.</p>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-bold"><RotateCcw className="h-5 w-5 text-emerald-400" /> Example rollback</h3>
              <CodeBlock>{`reg add "${registryPath}" /v ActivationType /t REG_DWORD /d 1 /f`}</CodeBlock>
              <p className="mt-3 text-xs leading-5 text-slate-500">Do not use a hard-coded rollback value if your original configuration was different; restore your exported key when possible.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="taskkill" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-sky-500/30 bg-sky-500/10 text-sky-300">Step 5 — targeted test</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Terminate the current process — but don't confuse that with a permanent disable</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>For a quick A/B test, you can terminate the currently running executable from an elevated terminal. This tells you whether the current process instance correlates with the symptom, but it does not guarantee that Windows will not start it again.</p>
          <div className="mt-6 max-w-3xl"><CodeBlock>{'taskkill /f /im gamebarpresencewriter.exe'}</CodeBlock></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Useful for', 'A quick before/after experiment.', CheckCircle2],
              ['Not proof of', 'A permanent Windows configuration change.', CircleHelp],
              ['If it returns', 'Investigate its activation path instead of repeatedly killing it.', RotateCcw],
            ].map(([title, text, Icon]) => { const I = Icon as React.ElementType; return <div key={title as string} className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><I className="h-5 w-5 text-cyan-400" /><h3 className="mt-3 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></div>; })}
          </div>
        </div>
      </section>

      <section id="other-causes" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Don't stop at Windows tweaks</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">If the stutter survives, investigate the real bottleneck</h2>
          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-800">
            <div className="grid grid-cols-[1fr_1.4fr_1.2fr] bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 sm:px-5"><span>Symptom</span><span>Possible cause</span><span>Next test</span></div>
            {[
              ['Stutter after sustained play', 'CPU/GPU thermal throttling', 'Log temperature + clock speed'],
              ['GPU pinned at 95–100%', 'GPU-limited workload', 'Lower resolution/settings and compare'],
              ['CPU spikes with low GPU use', 'CPU bottleneck/background process', 'Check per-core utilization and background tasks'],
              ['One game only', 'Game engine/shader/driver issue', 'Update driver and compare another title'],
              ['Random latency spikes', 'DPC/ISR driver activity', 'Use a latency diagnostic tool'],
              ['Crashes + visual artifacts', 'GPU/VRAM/power instability', 'Hardware diagnostics before software tweaks'],
            ].map(([a,b,c]) => <div key={a} className="grid grid-cols-[1fr_1.4fr_1.2fr] border-t border-slate-800 px-4 py-4 text-sm text-slate-300 sm:px-5"><span className="font-semibold text-white">{a}</span><span>{b}</span><span className="text-slate-400">{c}</span></div>)}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            If thermal throttling is the real story, our{' '}
            <Link to="/blog/gaming-pc-cooling" className="font-semibold text-cyan-300 hover:text-cyan-200">gaming PC cooling guide</Link>{' '}
            covers dust buildup, fan wear, and heatsink service before you reach for another software tweak.
          </p>
        </div>
      </section>

      <section id="kuwait" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <Badge className="mb-3 border-orange-500/30 bg-orange-500/10 text-orange-300"><Thermometer className="mr-2 h-4 w-4" /> Kuwait-specific reality</Badge>
              <h2 className="text-2xl font-bold sm:text-4xl">A software tweak cannot beat thermal physics</h2>
              <p className={`mt-4 ${proseClass}`}>
                When Kuwait's summer ambient temperature climbs into the mid-40s°C or higher, a gaming PC, laptop, or Windows handheld starts with far less thermal headroom before it even loads a game — and that gap widens further when filters are dusty, heatsinks are clogged, fans are degraded, or thermal interfaces have aged. If performance degrades as the system heats up, prioritize cooling and hardware diagnostics over registry tweaking.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                {['Ambient 45–50°C in summer', 'Thermal throttling', 'Dust buildup', 'Aged thermal paste', 'VRM instability', 'GPU memory errors', 'Power-limit behavior'].map((x) => <span key={x} className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5">{x}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
              <div className="flex items-center gap-3"><Cpu className="h-6 w-6 text-orange-400" /><h3 className="text-lg font-bold">When software is not enough</h3></div>
              <p className="mt-3 text-sm leading-6 text-slate-300">Persistent stutter, crashes, artifacting, overheating, or unstable power behavior can require board-level diagnosis rather than another Windows tweak.</p>
              <Link to="/gaming-pc-repair-kuwait" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200">See KCROC gaming PC repair in Kuwait <ChevronRight className="h-4 w-4" /></Link>
              <Link to="/laptop-repair-kuwait" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200">See KCROC laptop repair in Kuwait <ChevronRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">FAQ</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">GameBarPresenceWriter questions answered</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => <details key={faq.q} className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><summary className="cursor-pointer list-none pr-6 font-bold text-white marker:hidden"><span className="flex items-start justify-between gap-4">{faq.q}<ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400 transition-transform group-open:rotate-90" /></span></summary><p className="mt-4 text-sm leading-7 text-slate-400">{faq.a}</p></details>)}
          </div>
        </div>
      </section>

      <section id="cta" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="container mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300">KCROC Gaming Diagnostics</Badge>
              <h2 className="mt-4 text-2xl font-black sm:text-4xl">Still chasing the stutter after the Windows tweaks?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">KCROC diagnoses the full system: thermals, motherboard power delivery, GPU behavior, RAM, storage, drivers, and software. When the fault is on the board, we work at component level instead of simply replacing the entire machine.</p>
              <p className="mt-4 text-sm font-semibold text-cyan-300">Free Pick &amp; Drop across Kuwait • {business.streetAddress} • {business.telephone.slice(3)}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button size="lg" asChild className="bg-cyan-500 px-7 py-6 font-bold text-slate-950 hover:bg-cyan-400"><a href={`tel:+${business.telephone}`}>Call {business.telephone.slice(3)}</a></Button>
              <Button size="lg" variant="outline" asChild className="border-slate-700 px-7 py-6 text-slate-200 hover:bg-slate-800"><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp KCROC</a></Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 pt-6 text-xs sm:text-sm">
            <Link to="/gaming-pc-repair-kuwait" className="text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1.5 transition-colors">
              Gaming PC Repair Kuwait
            </Link>
            <Link to="/motherboard-repair-kuwait" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Motherboard Repair Kuwait
            </Link>
            <Link to="/near-me" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Computer Repair Near Me
            </Link>
            <Link to="/services" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LAST REVIEWED / AUTHOR (E-E-A-T signal) ─── */}
      <section className="border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-4xl px-4 py-10 text-xs sm:text-sm text-slate-500 sm:px-6">
          <p>
            <strong className="text-slate-300">Last reviewed:</strong> {LAST_REVIEWED} by{' '}
            <Link to="/author/imran" className="text-cyan-400 hover:text-cyan-300 underline">Imran Natiq</Link>, Hardware Repair Engineer, KCROC. Windows behavior can vary by Windows release, installed Xbox components, and device configuration — always keep a rollback path before modifying protected system configuration. What Presence Writer does is sourced from{' '}
            <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Microsoft's developer documentation</a>; the disable methods themselves are community workarounds, not Microsoft-recommended optimizations.
          </p>
        </div>
      </section>
    </div>
  );
}
