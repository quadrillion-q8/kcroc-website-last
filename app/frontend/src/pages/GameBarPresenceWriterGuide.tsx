// File: app/frontend/src/pages/GameBarPresenceWriterGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { StandaloneRelatedLinks } from '@/components/content/StandaloneRelatedLinks';
import { HeadTermCallout } from '@/components/content/HeadTermCallout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle, CheckCircle2, ChevronRight, CircleHelp, Cpu, Gamepad2,
  Gauge, HardDrive, MonitorCog, Network, Power, RotateCcw, ShieldAlert,
  Terminal, Thermometer, Wrench, XCircle
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import StickyTOC from '@/components/blog/StickyTOC';
import { IMAGES } from '../constants/images';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KuwaitLocalCTA } from '@/components/content/KuwaitLocalCTA';

const business = KCROC_GRAPH.business!;
const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent('I need gaming PC or laptop performance diagnostics in Kuwait. Please arrange free pickup and delivery.')}`;
const PAGE_URL = `${business.websiteUrl}/guides/gamebar-presence-writer-fix`;
const GUIDE_IMAGE_URL = '/images/blog/windows-11-laptop-multitasking.webp';
const GUIDE_IMAGE_ALT = 'Windows 11 laptop multitasking and performance troubleshooting';

const registryPath = 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\WindowsRuntime\\ActivatableClassId\\Windows.Gaming.GameBar.PresenceServer.Internal.PresenceWriter';

// Microsoft's own DevNotes page documents what Presence Writer *does* (the
// COM contract, the focus/close events) and the *registration* path for a
// custom implementation (WindowsRuntime\Server\...\PresenceWriterServer).
// It does not document the ActivatableClassId ownership-override tweak
// below — that's a community-discovered workaround, not an MS-sanctioned
// disable method. Cited for the "what it does" claim only; the registry
// section is explicit that the override itself is unofficial.
const MS_DOCS_URL = 'https://learn.microsoft.com/en-us/windows/win32/devnotes/gamebar-presencewriter';
const MS_GAMEDVR_POLICY_URL = 'https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-applicationmanagement';

const LAST_REVIEWED = 'November 1, 2026';

const toc = [
  { id: 'what-it-is', label: 'What It Is' },
  { id: '10-second-test', label: '10-Second Test' },
  { id: 'diagnose', label: 'Symptom Triage' },
  { id: 'safe-method', label: 'Game Bar Settings' },
  { id: 'game-dvr-registry', label: 'Game DVR Registry' },
  { id: 'registry', label: 'Advanced Override' },
  { id: 'other-causes', label: 'Other Stutter Causes' },
  { id: 'cluster', label: 'Related Gaming Guides' },
  { id: 'kuwait', label: 'KCROC Repair in Kuwait' },
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
  { q: 'What is GameBarPresenceWriter.exe?', a: 'It is a Windows component associated with Xbox Game Bar presence. Microsoft documents it as receiving events when a game gains focus, loses focus, or closes. When the relevant Xbox features are enabled, the default implementation can update Xbox Live presence for the game.' },
  { q: 'Does GameBarPresenceWriter.exe definitely cause gaming stutter?', a: 'No. Its presence in Task Manager does not prove that it causes stutter. Use the process-isolation test above in Step 1 and compare the same scene more than once. Frame-time spikes can also come from drivers, overlays, shader compilation, CPU/GPU limits, thermal throttling, storage, or other background activity.' },
  { q: 'How do I test GameBarPresenceWriter.exe quickly?', a: 'Reproduce the hitch in a repeatable game scene, note the frame-time behavior, and run taskkill /f /im GameBarPresenceWriter.exe from Command Prompt. Compare the same scene again. A repeatable improvement suggests the process or related Game Bar activity may contribute; one test alone is not proof.' },
  { q: 'Does taskkill permanently disable GameBarPresenceWriter.exe?', a: 'No. The command ends the currently running process instance. Windows may start it again when the relevant activation conditions occur. Use the Settings method or a carefully backed-up advanced configuration test if you need to investigate persistent behavior.' },
  { q: 'Will disabling Xbox Game Bar remove Steam or Discord overlays?', a: 'No. Steam Overlay, Discord Overlay, OBS, and GPU-vendor capture tools have their own components and settings. Disabling Xbox Game Bar does not automatically disable those separate tools.' },
  { q: 'What does the AllowGameDVR policy change?', a: 'The AllowGameDVR policy controls Windows Game Recording and Broadcasting. A value of 0 disallows that policy-controlled recording and broadcasting; a value of 1 allows it. It is a configuration control, not a guaranteed FPS switch.' },
  { q: 'Will disabling Game DVR increase FPS?', a: 'Only a system where background recording is contributing to the workload may show a measurable improvement. Results vary by Windows build, game, hardware, and capture configuration. Compare the same scene and do not expect a fixed percentage increase.' },
  { q: 'Should I change the Presence Writer registry key?', a: 'Treat the ActivatableClassId ActivationType change as an optional community workaround, not an official Microsoft gaming optimization. It involves a protected system registry area and should be attempted only by an experienced user after creating a restore point and exporting the key.' },
  { q: 'What should I check if the test does not improve stutter?', a: 'Check frame-time consistency, CPU/GPU utilization, temperatures, clock speeds, RAM pressure, storage activity, drivers, overlays, shader compilation, and DPC/ISR latency. If performance worsens after the system heats up, investigate cooling and power limits.' },
  { q: 'Is this guide relevant to gaming laptops and handhelds?', a: 'The same isolation test can be used, but a hitch that appears only after sustained gaming points more strongly toward checking temperatures, clocks, and power limits. Do not assume Presence Writer is the cause based only on the device type.' },
  { q: 'How do I undo the registry changes?', a: 'Before editing, export each affected key and record its original values. Roll back by importing the saved key or restoring the exact values you recorded. Do not assume that a hard-coded default is correct for every Windows installation.' },
];

// 🚀 Self-contained TechArticle + Person + HowTo + FAQPage + BreadcrumbList
// schema, rendered directly via SchemaMarkup rather than through SEOEngine's
// `schemaTypes` path. Two independent reasons this page opts out of
// SEOEngine's auto-generation instead of just the FAQPage piece:
//
// 1. FAQPage: SEOEngine's WebPage->FAQPage branch falls back to
//    `KCROC_GRAPH.faqs` (every FAQ on the entire site) whenever the entity
//    has no `featuredFAQIds` — this page's 11 FAQs aren't registered as
//    global FAQ entities, so enabling that schemaType on the graph entity
//    would have silently attached every site-wide FAQ to this page instead
//    of just these 8. Same pattern used by the page-specific schema components
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
      "headline": "High FPS but Gaming Stutter? Test GameBarPresenceWriter.exe | KCROC",
      "description": "A practical guide to testing whether GameBarPresenceWriter.exe is related to gaming stutter, changing Xbox Game Bar settings, and understanding advanced registry risks.",
      "url": PAGE_URL,
      "isPartOf": { "@id": `${business.websiteUrl}/#website` },
      "mainEntityOfPage": { "@id": `${PAGE_URL}#webpage` },
      "about": { "@id": `${business.websiteUrl}/#business` },
      "author": { "@id": AUTHOR_ID },
      "publisher": { "@id": `${business.websiteUrl}/#business` },
      "image": GUIDE_IMAGE_URL,
      "articleSection": "Guides",
      "dateModified": "2026-11-01"
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      "name": "How to test GameBarPresenceWriter.exe and troubleshoot gaming stutter",
      "description": "A cautious four-tier sequence that starts with a reversible process test and escalates only when measurements justify it.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Run a targeted process-isolation test", "text": "Reproduce the hitch in a repeatable game scene, terminate the current GameBarPresenceWriter.exe process, and compare frame-time behavior in the same scene. Repeat the comparison before drawing a conclusion.", "url": `${PAGE_URL}#10-second-test` },
        { "@type": "HowToStep", "position": 2, "name": "Review Xbox Game Bar and capture settings", "text": "Turn off Game Bar or background capture features you do not use, restart Windows, and compare the same workload again.", "url": `${PAGE_URL}#safe-method` },
        { "@type": "HowToStep", "position": 3, "name": "Test the Game DVR policy only if needed", "text": "Back up the relevant registry areas, record original values, and test the Game DVR configuration as an advanced troubleshooting step rather than a guaranteed FPS optimization.", "url": `${PAGE_URL}#game-dvr-registry` },
        { "@type": "HowToStep", "position": 4, "name": "Consider the protected Presence Writer override only as a last resort", "text": "Create a restore point, export the ActivatableClassId key, record the existing ActivationType value, and proceed only if you understand how to restore the original state.", "url": `${PAGE_URL}#registry` }
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
    <pre className="min-w-0 max-w-full overflow-x-auto rounded-xl border border-slate-800 bg-brand-dark p-4 text-xs leading-6 text-cyan-200 sm:text-sm">
      <code>{children}</code>
    </pre>
  );
}

function Callout({ title, children, danger = false }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className={`min-w-0 rounded-2xl border p-5 ${danger ? 'border-red-500/30 bg-red-500/5' : 'border-cyan-500/20 bg-cyan-500/5'}`}>
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
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30">
      <SEOEngine entityId="guide-gamebar-presence-writer" />
      <SchemaMarkup schema={STRUCTURED_DATA} />
      <StickyTOC toc={toc} />

      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-10 pt-24 sm:px-6 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,0.14),transparent_42%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
            <div>
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Windows Gaming Performance & Frame-Time Diagnostics
              </Badge>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                High FPS but Gaming Stutter?{" "}
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Test GameBarPresenceWriter.exe
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                Your FPS counter can stay above 160 while the game still hitches when you flick the mouse, enter a fight, or switch windows. If GameBarPresenceWriter.exe is running at the same time, test it before changing Windows settings or touching protected registry permissions. The process is part of Windows Game Bar presence functionality; the quick test below helps you check whether it is actually related to your frame-time problem.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="w-full bg-cyan-500 px-6 py-6 font-bold text-slate-950 hover:bg-cyan-400 sm:w-auto">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">Book Free Gaming PC Pickup</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full border-slate-700 px-6 py-6 text-slate-200 hover:bg-slate-800 sm:w-auto">
                  <a href={`tel:+${business.telephone}`}>Call KCROC: {business.telephone.slice(3)}</a>
                </Button>
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
              <a href="#10-second-test" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">Run the quick test first <ChevronRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="what-it-is" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
            <div>
              <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">What it actually does</Badge>
              <h2 className="text-2xl font-bold sm:text-4xl">What is GameBarPresenceWriter.exe?</h2>
              <p className={`mt-4 ${proseClass}`}>
                <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200">Microsoft's developer documentation</a> describes Presence Writer as a component that receives game focus, focus-loss, and close events. When the relevant Xbox functionality is enabled, its default implementation can update Xbox Live presence for the running game.
              </p>
            </div>
            <Callout title="Important distinction">
              Seeing this process in Task Manager does not prove that it is causing stutter or that your CPU, GPU, or network is the bottleneck. Use the repeatable process-isolation test next, then measure before changing settings.
            </Callout>
          </div>
        </div>
      </section>

      <section id="10-second-test" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-sky-500/30 bg-sky-500/10 text-sky-300">Step 1 — 10-second live isolation test</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Test GameBarPresenceWriter.exe before touching the Registry</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            Save your game, reproduce the hitch in a repeatable scene, and note the frame-time behavior. Open Command Prompt or Windows Terminal and run the command below. Then repeat the same action and compare. If Windows denies access, reopen the terminal as Administrator.
          </p>
          <div className="mt-6 max-w-3xl">
            <h3 className="mb-2 flex items-center gap-2 font-bold"><Terminal className="h-5 w-5 text-sky-400" /> End the current process instance</h3>
            <CodeBlock>{'taskkill /f /im GameBarPresenceWriter.exe'}</CodeBlock>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Repeatable improvement', 'If the same scene becomes consistently smoother, Presence Writer or related Game Bar activity may be contributing. Continue to Step 2 and verify after a restart.', CheckCircle2],
              ['No measurable change', 'The process is less likely to be the main cause. Do not continue into registry changes just because the executable appears in Task Manager.', CircleHelp],
              ['The process returns', 'Taskkill ends only the current instance. Windows may start it again when activation conditions occur; this command is a test, not a permanent disable.', RotateCcw],
            ].map(([title, text, Icon]) => { const I = Icon as React.ElementType; return <div key={title as string} className="rounded-2xl border border-slate-800 bg-brand-dark p-5"><I className="h-5 w-5 text-cyan-400" /><h3 className="mt-3 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></div>; })}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-500">For a useful A/B comparison, use the same game, scene, settings, and background applications. A single before/after run is only a clue; repeat it before concluding that this process is involved.</p>
        </div>
      </section>



      <section className="px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <KuwaitLocalCTA topic="GameBarPresenceWriter.exe" placement="gamebar_guide" />
        </div>
      </section>

      <section className="border-b border-slate-800/80 px-4 py-8 sm:px-6 sm:py-10">
        <div className="container mx-auto max-w-5xl">
          <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={GUIDE_IMAGE_URL} alt={GUIDE_IMAGE_ALT} width={1376} height={768} loading="eager" decoding="async" className="h-auto max-h-[420px] w-full object-cover" />
            <figcaption className="border-t border-slate-800/60 bg-brand-dark/80 p-3 text-xs text-slate-400">A high-performance gaming system still needs clean software scheduling, stable drivers, and adequate thermal headroom.</figcaption>
          </figure>
        </div>
      </section>

      <section id="diagnose" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 max-w-3xl">
            <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">30-second symptom triage</Badge>
            <h2 className="text-2xl font-bold sm:text-4xl">Match the stutter pattern before changing Windows settings</h2>
            <p className={`mt-3 ${proseClass}`}>Use a repeatable scene, record frame-time, and change one variable at a time. The goal is to identify causation rather than collect “gaming tweaks.”</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {symptoms.map((item) => (
              <div key={item.symptom} className="rounded-2xl border border-slate-800 bg-brand-dark/70 p-5">
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
              return <div key={title as string} className="rounded-2xl border border-slate-800 bg-brand-dark p-5"><I className="h-5 w-5 text-cyan-400" /><h3 className="mt-3 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></div>;
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
              <ol className="mt-5 list-inside list-decimal space-y-4 text-sm leading-6 text-slate-300">
                <li>Open <strong>Settings → Gaming → Xbox Game Bar</strong> (called <strong>Game Bar</strong> on some Windows builds) and turn it off if you do not use it.</li>
                <li>Open <strong>Settings → Gaming → Captures</strong> and turn off background recording or <strong>Record what happened</strong> if you do not need it.</li>
                <li>Restart Windows, reproduce the same stutter, and compare frame-time again.</li>
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

      <section id="game-dvr-registry" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Step 3 — advanced Game DVR test</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Test the Game DVR policy through the Registry</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            If turning off Game Bar and background recording in Settings does not settle the question, power users can test the Game DVR configuration directly. This is more invasive than the Settings method, so back up first and measure the same game scene before and after.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">1. Back up before editing</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Create a restore point and export both affected registry areas. Write down the original value of <code className="text-cyan-300">GameDVR_Enabled</code> so the test is reversible.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">2. Disable the current-user Game DVR setting</h3>
                <CodeBlock>{'HKEY_CURRENT_USER\\System\\GameConfigStore'}</CodeBlock>
                <p className="mt-3 text-sm leading-6 text-slate-400">Locate <code className="text-cyan-300">GameDVR_Enabled</code> and set its value data to <code className="text-cyan-300">0</code>.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">3. Set the Game DVR policy</h3>
                <CodeBlock>{'HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows'}</CodeBlock>
                <p className="mt-3 text-sm leading-6 text-slate-400">Create a key named <code className="text-cyan-300">GameDVR</code>. Inside it, create a <strong>DWORD (32-bit) Value</strong> named <code className="text-cyan-300">AllowGameDVR</code> and set it to <code className="text-cyan-300">0</code>.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">4. Restart and measure</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Restart Windows, reproduce the same workload, and compare frame-time, FPS, CPU/GPU utilization, disk activity, temperatures, and clock speeds. Keep the change only if it produces a repeatable improvement without breaking a capture feature you need.</p>
              </div>
            </div>
            <div className="min-w-0 space-y-5">
              <Callout title="What this setting can — and cannot — tell you">
                The Game DVR policy controls Windows Game Recording and Broadcasting. It is not a guaranteed FPS switch. Test it only when you have reason to suspect capture activity, then compare the same game scene and restore the original settings if there is no repeatable benefit.
              </Callout>
              <Callout title="Microsoft policy note">
                Microsoft documents <code className="text-cyan-300">AllowGameDVR</code> as a policy for Windows Game Recording and Broadcasting: <code className="text-cyan-300">0</code> disallows it and <code className="text-cyan-300">1</code> allows it. See <a href={MS_GAMEDVR_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline hover:text-cyan-200">Microsoft's ApplicationManagement Policy CSP</a>. The current-user <code className="text-cyan-300">GameDVR_Enabled</code> value is a separate troubleshooting setting. Record its original value before testing and do not treat either setting as a certified FPS optimization.
              </Callout>
              <Callout title="Rollback">
                If the test causes an unwanted change, restore the exported registry keys and original values. If you created the <code className="text-cyan-300">GameDVR</code> policy key specifically for this experiment, remove it only after confirming that no existing policy depends on it.
              </Callout>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            This is the advanced path. For the safer Settings-based approach, start with{' '}
            <Link to="/guides/windows-11-settings-tweaks" className="font-semibold text-cyan-300 hover:text-cyan-200">18 Windows 11 Settings Worth Changing</Link>{' '}
            and return here only if you need a deeper Game DVR configuration test.
          </p>
        </div>
          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-bold text-white"><Terminal className="h-5 w-5 text-violet-400" /> Optional: apply the settings from Command Prompt</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">After exporting the affected registry keys, open Command Prompt as Administrator and run these commands. The first two change the signed-in user's Game DVR values; the third writes the computer-wide <code className="text-cyan-300">AllowGameDVR</code> policy value.</p>
            <div className="mt-4">
              <CodeBlock>{String.raw`reg add "HKCU\System\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f`}</CodeBlock>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">Restart Windows and repeat the same game-scene test. These settings change Game DVR/capture configuration; they do not promise an FPS increase. On a work-managed PC, an organization policy may reapply its configured value. Restore the original values from your backup if you need to reverse the test.</p>
          </div>
      </section>

      <section id="registry" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Step 4 — optional advanced override</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Advanced Presence Writer Registry Override</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            This community workaround targets the Windows Runtime ActivatableClassId registration for Presence Writer. It is substantially more invasive than changing Game Bar settings or testing Game DVR. Most users should stop at the earlier tiers.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">1. Create a restore point and export the key</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Back up the registry key before changing permissions or values. Keep the exported .reg file somewhere you can access if Windows behaves differently after the test.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">2. Open the ActivatableClassId key</h3>
                <CodeBlock>{registryPath}</CodeBlock>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">3. Do not take ownership casually</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">If TrustedInstaller protects the key, do not proceed unless you understand how to restore the original owner and permissions. Avoid changing ownership recursively; skip this tier if you are unsure.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">4. Record and test the ActivationType value</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Only consider the change if the key contains an <code className="text-cyan-300">ActivationType</code> DWORD. Record the exact original value before testing. The value and behavior may differ across Windows releases.</p>
              </div>
              <div className="min-w-0">
                <h3 className="mb-2 flex items-center gap-2 font-bold"><Terminal className="h-5 w-5 text-violet-400" /> Optional elevated-terminal test command</h3>
                <CodeBlock>{`reg add "${registryPath}" /v ActivationType /t REG_DWORD /d 0 /f`}</CodeBlock>
                <p className="mt-3 text-xs leading-5 text-slate-500">Use only after exporting the key and confirming the value exists. Restore the exact value you recorded, or import your backup; do not assume that setting it to 1 is correct for every system.</p>
              </div>
            </div>
            <Callout title="Unofficial and last-resort only" danger>
              Microsoft's developer documentation describes Presence Writer's purpose and the registration path for a custom implementation. It does not document or recommend this ActivatableClassId override as a gaming optimization or supported disable procedure. Because it changes protected system configuration, it should not be the first response to a process appearing in Task Manager.
            </Callout>
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

      <section id="cluster" className={`${sectionClass} bg-slate-950/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Windows gaming performance cluster</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">When Game Bar is only one piece of the stutter</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            This guide is the Game Bar-specific branch. When the measurements point somewhere else, use the matching KCROC technical guide instead of continuing to change Game Bar or registry settings.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              { href: '/guides/windows-gaming-performance-stutter-fix', title: 'Windows Gaming Stutter in 2026', text: 'The main decision tree for frame-time, overlays, drivers, shaders, thermals and hardware.' },
              { href: '/guides/windows-gaming-frame-time-stutter', title: 'Gaming Stutter With High FPS', text: 'Learn why a high average FPS can still hide long frame-time spikes.' },
              { href: '/guides/shader-compilation-stutter-windows', title: 'Shader Compilation Stutter', text: 'Check first-use shader and pipeline compilation before deleting caches or blaming the GPU.' },
              { href: '/guides/dpc-latency-gaming-stutter', title: 'DPC Latency & Gaming Stutter', text: 'Advanced driver-timing diagnosis for repeatable latency-sensitive hitches.' },
            ].map((item) => (
              <Link key={item.href} to={item.href} className="group rounded-2xl border border-slate-800 bg-brand-dark p-5 transition hover:border-cyan-500/40 hover:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-cyan-300">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                  <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                </div>
              </Link>
            ))}
          </div>
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
                {['Ambient 45–50°C in summer', 'Thermal throttling', 'Dust buildup', 'Aged thermal paste', 'VRM instability', 'GPU memory errors', 'Power-limit behavior'].map((x) => <span key={x} className="rounded-full border border-slate-800 bg-brand-dark px-3 py-1.5">{x}</span>)}
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

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <HeadTermCallout lead="If the stutter or high CPU use continues after these fixes," placement="GameBarPresenceWriterGuide" />
      </div>

      <StandaloneRelatedLinks
        title="GameBar performance: related troubleshooting paths"
        intro="If the executable is not the real bottleneck, move from software symptoms to the relevant gaming hardware or Windows diagnostic path."
        links={[
          { href: '/guides/windows-gaming-performance-stutter-fix', label: 'Windows Gaming Stutter Guide', description: 'The broader technical decision tree for frame-time, overlays, shaders, drivers and thermals.' },
          { href: '/guides/windows-gaming-frame-time-stutter', label: 'High FPS but Gaming Stutter', description: 'Measure frame-time spikes instead of relying on average FPS alone.' },
          { href: '/guides/shader-compilation-stutter-windows', label: 'Shader Compilation Stutter', description: 'Use when hitches follow first-use effects, materials or game areas.' },
          { href: '/guides/dpc-latency-gaming-stutter', label: 'DPC Latency & Gaming Stutter', description: 'Advanced driver-timing branch for repeatable latency-sensitive hitches.' },
          { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC & GPU Repair Kuwait', description: 'For persistent stutter, crashes, artifacting, thermals, GPU, RAM, or power instability.' },
          { href: '/blog/gaming-pc-cooling', label: 'Gaming PC Cooling Guide', description: 'Check cooling, dust, fans, thermal interfaces, and sustained-load behavior before registry tweaks.' },
          { href: '/laptop-overheating-kuwait', label: 'Laptop Overheating Problem', description: 'Useful when gaming performance falls as a laptop heats up.' },
          { href: '/windows-wont-boot-kuwait', label: "Windows Won't Boot", description: 'Use the Windows startup path when performance troubleshooting becomes a broader boot problem.' },
        ]}
      />

      <section id="faq" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">FAQ</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">GameBarPresenceWriter questions answered</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <h3 className="font-bold leading-6 text-white">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {faq.q === 'Does GameBarPresenceWriter.exe definitely cause gaming stutter?'
                    ? <>No. Its presence in Task Manager does not prove that it causes stutter. Use the <a href="#10-second-test" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">process-isolation test above in Step 1</a> and compare the same scene more than once. Frame-time spikes can also come from drivers, overlays, shader compilation, CPU/GPU limits, thermal throttling, storage, or other background activity.</>
                    : faq.a}
                </p>
              </article>
            ))}
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
      <section className="border-t border-slate-900 bg-brand-dark/60">
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
