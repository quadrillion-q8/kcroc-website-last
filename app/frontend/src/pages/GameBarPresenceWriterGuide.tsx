// File: app/frontend/src/pages/GameBarPresenceWriterGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Check, CheckCircle2, ChevronRight, CircleHelp, Copy, Gamepad2,
  Gauge, MonitorCog, Power, RotateCcw, ShieldAlert, Terminal, Thermometer
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import StickyTOC from '@/components/blog/StickyTOC';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/guides/gamebar-presence-writer-fix`;
const GUIDE_IMAGE_URL = '/images/blog/windows-11-laptop-multitasking.webp';
const GUIDE_IMAGE_ALT = 'Windows 11 laptop multitasking and performance troubleshooting';
const ISOLATION_TEST_COMMAND = 'taskkill /f /im GameBarPresenceWriter.exe';

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
const MS_TASKKILL_URL = 'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill';
const MS_GAMEBAR_SUPPORT_URL = 'https://support.microsoft.com/en-us/accessibility/windows/use-a-screen-reader-to-record-your-screen-with-xbox-game-bar';
const PRESENTMON_URL = 'https://github.com/GameTechDev/PresentMon';

const PUBLISHED_DATE = 'August 23, 2026';
const LAST_REVIEWED = 'November 11, 2026';

const toc = [
  { id: 'quick-answer', label: '60-Second Answer' },
  { id: 'what-it-is', label: 'What It Is' },
  { id: 'methodology', label: 'Diagnostic Method' },
  { id: '10-second-test', label: 'Process Isolation' },
  { id: 'diagnose', label: 'Symptom Triage' },
  { id: 'test-results', label: 'Interpret the Test' },
  { id: 'safe-method', label: 'Game Bar Settings' },
  { id: 'controls', label: 'Settings vs Policy' },
  { id: 'game-dvr-registry', label: 'Game DVR Policy' },
  { id: 'registry', label: 'Advanced Override' },
  { id: 'other-causes', label: 'Other Stutter Causes' },
  { id: 'cluster', label: 'Related Gaming Guides' },
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
  { q: 'Does GameBarPresenceWriter.exe definitely cause gaming stutter?', a: 'No. Its presence in Task Manager does not prove that it causes stutter. Use the process-isolation test above in Step 5 and compare the same scene more than once. Frame-time spikes can also come from drivers, overlays, shader compilation, CPU/GPU limits, thermal throttling, storage, or other background activity.' },
  { q: 'How do I test GameBarPresenceWriter.exe quickly?', a: 'Reproduce the hitch in a repeatable game scene, note the frame-time behavior, and run taskkill /f /im GameBarPresenceWriter.exe from Command Prompt. Compare the same scene again. A repeatable improvement suggests the process or related Game Bar activity may contribute; one test alone is not proof.' },
  { q: 'Does taskkill permanently disable GameBarPresenceWriter.exe?', a: 'No. The command ends the currently running process instance. Windows may start it again when the relevant activation conditions occur. Use the Settings method or a carefully backed-up advanced configuration test if you need to investigate persistent behavior.' },
  { q: 'Will disabling Xbox Game Bar remove Steam or Discord overlays?', a: 'No. Steam Overlay, Discord Overlay, OBS, and GPU-vendor capture tools have their own components and settings. Disabling Xbox Game Bar does not automatically disable those separate tools.' },
  { q: 'What does the AllowGameDVR policy change?', a: 'The AllowGameDVR policy controls Windows Game Recording and Broadcasting. A value of 0 disallows that policy-controlled recording and broadcasting; a value of 1 allows it. It is a configuration control, not a guaranteed FPS switch.' },
  { q: 'Will disabling Game DVR increase FPS?', a: 'Only a system where background recording is contributing to the workload may show a measurable improvement. Results vary by Windows build, game, hardware, and capture configuration. Compare the same scene and do not expect a fixed percentage increase.' },
  { q: 'Should I change the Presence Writer registry key?', a: 'Treat the ActivatableClassId ActivationType change as an optional community workaround, not an official Microsoft gaming optimization. It involves a protected system registry area and should be attempted only by an experienced user after creating a restore point and exporting the key.' },
  { q: 'What should I check if the test does not improve stutter?', a: 'Check frame-time consistency, CPU/GPU utilization, temperatures, clock speeds, RAM pressure, storage activity, drivers, overlays, shader compilation, and DPC/ISR latency. If performance worsens after the system heats up, investigate cooling and power limits.' },
  { q: 'Is this guide relevant to gaming laptops and handhelds?', a: 'The same isolation test can be used, but a hitch that appears only after sustained gaming points more strongly toward checking temperatures, clocks, and power limits. Do not assume Presence Writer is the cause based only on the device type.' },
  { q: 'How do I undo the registry changes?', a: 'Before editing, export each affected key and record its original values. Roll back by importing the saved key or restoring the exact values you recorded. Do not assume that a hard-coded default is correct for every Windows installation.' },
  { q: 'Does the AllowGameDVR policy apply to Windows 11?', a: 'Do not assume that it does. Microsoft documents AllowGameDVR as a device policy for Windows Game Recording and Broadcasting and notes that the policy is enforced only on Windows 10 desktop. On Windows 11, start with the Settings controls and do not create the policy key as a universal FPS fix.' },
  { q: 'How can I measure frame-time instead of average FPS?', a: 'Use a consistent per-frame capture tool such as PresentMon and compare the same scene. PresentMon reports CPU, GPU and display frame durations and latency metrics. Keep the capture method identical before and after the test; no single metric proves that Presence Writer caused the hitch.' },
  { q: 'Should I set ActivationType to 0 to disable Presence Writer?', a: 'No universal value is documented by Microsoft for this workaround. The ActivatableClassId change is not a documented Game Bar performance setting. Most users should leave the protected key untouched; experts who have already changed it should restore their own recorded original value and permissions.' },

];

// 🚀 Self-contained TechArticle + Person + HowTo + FAQPage + BreadcrumbList
// schema, rendered directly via SchemaMarkup rather than through SEOEngine's
// `schemaTypes` path. Two independent reasons this page opts out of
// SEOEngine's auto-generation instead of just the FAQPage piece:
//
// 1. FAQPage: SEOEngine's WebPage->FAQPage branch falls back to
//    `KCROC_GRAPH.faqs` (every FAQ on the entire site) whenever the entity
//    has no `featuredFAQIds` — this page's 14 FAQs aren't registered as
//    global FAQ entities, so enabling that schemaType on the graph entity
//    would have silently attached every site-wide FAQ to this page instead
//    of just these 14. Same pattern used by the page-specific schema components
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
      "headline": "GameBarPresenceWriter.exe: Safe Testing, Game Bar Settings and Gaming Stutter | KCROC",
      "description": "A measurement-first Windows guide to testing GameBarPresenceWriter.exe, comparing frame-time, reviewing Xbox Game Bar capture settings, and understanding Game DVR policy and registry risks.",
      "url": PAGE_URL,
      "isPartOf": { "@id": `${business.websiteUrl}/#website` },
      "mainEntityOfPage": { "@id": `${PAGE_URL}#webpage` },
      "about": [
        { "@type": "Thing", "name": "Xbox Game Bar" },
        { "@type": "Thing", "name": "GameBarPresenceWriter.exe" },
        { "@type": "Thing", "name": "Windows Game Recording and Broadcasting" },
        { "@type": "Thing", "name": "PC gaming frame-time analysis" }
      ],
      "author": { "@id": AUTHOR_ID },
      "reviewedBy": { "@id": AUTHOR_ID },
      "publisher": { "@id": `${business.websiteUrl}/#business` },
      "image": GUIDE_IMAGE_URL,
      "articleSection": "Windows Gaming Performance",
      "keywords": ["GameBarPresenceWriter.exe", "Xbox Game Bar", "Windows Game DVR", "Windows 11 gaming stutter", "frame-time analysis", "AllowGameDVR policy", "PresentMon"],
      "proficiencyLevel": "Intermediate",
      "datePublished": "2026-08-23",
      "dateModified": "2026-11-11"
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      "name": "How to test GameBarPresenceWriter.exe and troubleshoot gaming stutter",
      "description": "A nine-step diagnostic workflow that starts with repeatable measurement, uses a reversible process test, and escalates only when the evidence justifies it.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Choose a repeatable game scene", "text": "Use the same save, location, camera movement, display mode, frame cap, graphics settings and background applications for each comparison.", "url": `${PAGE_URL}#methodology` },
        { "@type": "HowToStep", "position": 2, "name": "Record a baseline", "text": "Record frame-time behavior alongside average FPS, CPU and GPU load, temperatures and clock speeds before changing anything.", "url": `${PAGE_URL}#methodology` },
        { "@type": "HowToStep", "position": 3, "name": "Confirm the process identity", "text": "Confirm the executable resolves under the Windows System32 directory and has a valid Microsoft Windows Authenticode signature before targeting it.", "url": `${PAGE_URL}#methodology` },
        { "@type": "HowToStep", "position": 4, "name": "End only the current process instance", "text": "Run taskkill /f /im GameBarPresenceWriter.exe for a reversible, current-session isolation test.", "url": `${PAGE_URL}#10-second-test` },
        { "@type": "HowToStep", "position": 5, "name": "Repeat and interpret the comparison", "text": "Repeat the same scene and compare the frame-time pattern. Treat a single improvement as a clue, not proof of causation.", "url": `${PAGE_URL}#test-results` },
        { "@type": "HowToStep", "position": 6, "name": "Test Xbox Game Bar settings", "text": "Turn off only Game Bar features and capture options you do not use, one change at a time, then retest the same workload.", "url": `${PAGE_URL}#safe-method` },
        { "@type": "HowToStep", "position": 7, "name": "Separate user settings from device policy", "text": "Inspect current-user capture values and distinguish them from the device-scoped AllowGameDVR policy before changing configuration.", "url": `${PAGE_URL}#controls` },
        { "@type": "HowToStep", "position": 8, "name": "Check policy applicability", "text": "Microsoft documents AllowGameDVR policy enforcement only on Windows 10 desktop. Do not apply it as a universal Windows 11 performance tweak.", "url": `${PAGE_URL}#game-dvr-registry` },
        { "@type": "HowToStep", "position": 9, "name": "Leave the undocumented protected override to experts", "text": "The ActivatableClassId ActivationType workaround is not documented by Microsoft as a supported disable method. Most users should leave it untouched and preserve a rollback path.", "url": `${PAGE_URL}#registry` }
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

function AccessibleTable({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-2xl border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">{label}</caption>
        {children}
      </table>
    </div>
  );
}

export default function GameBarPresenceWriterGuide() {
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopyTestCommand = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(ISOLATION_TEST_COMMAND);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

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
                GameBarPresenceWriter.exe:{' '}
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Test Gaming Stutter Safely
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                High FPS does not rule out frame-time spikes. GameBarPresenceWriter.exe is one component you can isolate without editing the registry. Start with a repeatable test, compare frame-time rather than relying on average FPS, and change only one Game Bar setting at a time.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                <span>Published: {PUBLISHED_DATE}</span>
                <span>Technical review: {LAST_REVIEWED}</span>
                <span>12–14 min read</span>
                <span>Global Windows troubleshooting guide</span>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-500/30 bg-slate-950/90 p-5 shadow-2xl shadow-sky-950/30 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-300">Quick process-isolation test</p>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">No registry edits</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-white">Test GameBarPresenceWriter.exe</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Save your game. Run this command, return to the same scene, and compare whether the stutter changes.
              </p>
              <div className="mt-4 flex min-w-0 items-stretch overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-3 py-4 text-xs leading-5 text-sky-300 sm:text-sm">{ISOLATION_TEST_COMMAND}</code>
                <button
                  type="button"
                  onClick={handleCopyTestCommand}
                  aria-label={copyState === 'copied' ? 'Command copied' : 'Copy isolation test command'}
                  className="inline-flex shrink-0 items-center gap-2 border-l border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400"
                >
                  {copyState === 'copied' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copyState === 'copied' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-5 text-xs leading-5 text-slate-400">
                {copyState === 'copied'
                  ? 'Command copied. Paste it into Command Prompt or Windows Terminal.'
                  : copyState === 'error'
                    ? 'Clipboard access was blocked. Select the command and copy it manually.'
                    : 'Copy the command or select it manually.'}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                This ends only the current process instance. Windows may start it again; this is not a permanent disable.
              </p>
              <a href="#10-second-test" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">See the comparison steps <ChevronRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="quick-answer" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">60-second quick answer</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Does GameBarPresenceWriter.exe cause gaming stutter?</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>Its presence alone does not prove that it causes stutter. Microsoft documents it as a Windows Game Bar presence component that receives game focus, focus-loss and close events. The documentation does not establish that the process is a universal performance problem. Test it as one variable before changing Windows settings.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Callout title="Best first move">Reproduce the hitch in the same game scene, record a baseline, run the process-isolation command, then repeat the same scene. A repeatable frame-time improvement makes the Game Bar path worth investigating; it does not prove the executable was the only cause.</Callout>
            <Callout title="When to stop">If the same test shows no repeatable change, do not escalate to protected registry edits just because the process appears in Task Manager. Investigate overlays, shaders, drivers, CPU/GPU limits, storage, temperatures and power behavior instead.</Callout>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-400">The quick test ends only the current process instance. It does not permanently disable Xbox Game Bar or guarantee an FPS increase.</p>
        </div>
      </section>

      <section id="what-it-is" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
            <div>
              <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">What it actually does</Badge>
              <h2 className="text-2xl font-bold sm:text-4xl">What is GameBarPresenceWriter.exe?</h2>
              <p className={`mt-4 ${proseClass}`}>
                <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200">Microsoft's developer documentation</a> describes Presence Writer as a component notified when a game's foreground-presence state changes. Its default implementation can update Xbox Live presence when the Xbox app is installed, the user is signed in, and the relevant presence option is enabled. The documentation describes that contract; it does not say that the process itself causes stutter or consumes a fixed amount of CPU, GPU or network bandwidth.
              </p>
              <p className='mt-3 text-sm leading-7 text-slate-300 sm:text-base'>
                Microsoft specifies an out-of-process COM implementation and documents <code>GotFocus</code>, <code>LostFocus</code> and <code>AppClose</code> notifications. Game launch and focus transitions such as Alt+Tab are sensible moments to compare a frame-time trace. A presence update, network wait, or overlap with game initialization and overlay hooks could coincide with a hitch on some systems, but Microsoft documents the callbacks—not a frame-time penalty—so these remain hypotheses to test rather than established causes.
              </p>
            </div>
            <Callout title="Important distinction">
              Seeing this process in Task Manager does not prove that it is causing stutter or that your CPU, GPU, or network is the bottleneck. Use the repeatable process-isolation test next, then measure before changing settings.
            </Callout>
          </div>
        </div>
      </section>

      <section id="methodology" className={`${sectionClass} bg-slate-950/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Evidence-first diagnostic method</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">How We Diagnose Game Bar Presence and Gaming Stutter</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>The sequence moves from measurement to reversible isolation, then to supported settings. Registry policy and protected Windows Runtime configuration come last. Do not skip directly to a registry edit because a process name looks unfamiliar.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Layer 1 · Measure', 'Build a repeatable baseline with the same game scene, frame-time capture and hardware telemetry.'],
              ['Layer 2 · Isolate', 'End only the current Presence Writer process instance and repeat the matched test.'],
              ['Layer 3 · Settings', 'Test Xbox Game Bar and background capture separately, changing one setting at a time.'],
              ['Layer 4 · Escalate carefully', 'Check policy scope and device management. Treat the protected ActivationType override as undocumented and last-resort.'],
            ].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-800 bg-brand-dark p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}
          </div>
          <h3 className="mt-8 text-lg font-bold text-white">Nine-step troubleshooting workflow</h3>
          <AccessibleTable label="Nine-step GameBarPresenceWriter troubleshooting workflow">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Step</th><th scope="col" className="px-4 py-3">Action</th><th scope="col" className="px-4 py-3">Why it matters</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">1</th><td className="px-4 py-4 text-slate-300">Choose a repeatable game scene and save point.</td><td className="px-4 py-4 text-slate-400">A different map or changed game settings can invalidate the comparison.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">2</th><td className="px-4 py-4 text-slate-300">Keep resolution, display mode, frame cap and background applications constant.</td><td className="px-4 py-4 text-slate-400">Change one variable at a time so you can interpret the result.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">3</th><td className="px-4 py-4 text-slate-300">Capture a 60–120-second baseline with frame-time, average FPS, CPU/GPU load, temperatures and clocks.</td><td className="px-4 py-4 text-slate-400">Repeat the same run; compare frame-time percentiles as well as average FPS.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">4</th><td className="px-4 py-4 text-slate-300">Confirm the process name, System32 path and Microsoft Authenticode signature.</td><td className="px-4 py-4 text-slate-400">Stop if the file is elsewhere, missing or not validly signed by Microsoft Windows.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">5</th><td className="px-4 py-4 text-slate-300">Run the current-process isolation test below.</td><td className="px-4 py-4 text-slate-400">This is reversible and avoids a registry edit.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">6</th><td className="px-4 py-4 text-slate-300">Repeat matched captures and compare 1%/0.1% lows or 99th/99.9th-percentile frame durations.</td><td className="px-4 py-4 text-slate-400">Repeated captures help separate a real change from run-to-run variation.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">7</th><td className="px-4 py-4 text-slate-300">Test the Game Bar toggle and background-capture option separately.</td><td className="px-4 py-4 text-slate-400">This identifies whether the broader capture path matters.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">8</th><td className="px-4 py-4 text-slate-300">Check Windows version and policy management before inspecting AllowGameDVR.</td><td className="px-4 py-4 text-slate-400">Device policy is not a universal Windows 11 switch.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-bold text-white">9</th><td className="px-4 py-4 text-slate-300">Leave the protected ActivationType override to qualified experts.</td><td className="px-4 py-4 text-slate-400">Microsoft does not document this community workaround as a supported disable method.</td></tr>
            </tbody>
          </AccessibleTable>
          <div className='mt-6 grid gap-4 lg:grid-cols-2'>
            <Callout title='Capture an apples-to-apples baseline'>
              <p>Use PresentMon to record the same 60–120-second game sequence at least twice before and twice after the process-isolation test. Keep the save point, route, camera movement, resolution, display mode, frame cap and background applications unchanged.</p>
              <p className='mt-2'>Compare 1% and 0.1% low FPS, or the 99th and 99.9th percentile frame durations. Use <code>MsBetweenDisplayChange</code> when available to assess displayed-frame pacing, and inspect <code>MsBetweenPresents</code> alongside it for application present cadence.</p>
              <p className='mt-2'>Repeated spikes around 20–35 ms or higher are worth investigating when surrounding frames are much shorter and the same spikes shrink or disappear in matched post-test captures. This is a comparison cue, not a universal pass/fail threshold.</p>
            </Callout>
            <Callout title='Verify the executable and its signer' danger>
              <p>Expected location: <code>%windir%\System32\GameBarPresenceWriter.exe</code> (commonly <code>C:\Windows\System32\GameBarPresenceWriter.exe</code>).</p>
              <p className='mt-2'>Run this in PowerShell before targeting the process:</p>
              <CodeBlock>{'Get-AuthenticodeSignature "$env:windir\\System32\\GameBarPresenceWriter.exe" | Format-List Status,SignerCertificate'}</CodeBlock>
              <p className='mt-2'>Expected result: <code>Status</code> is <code>Valid</code> and the signer identifies Microsoft Windows / Microsoft Corporation. If the file is missing, resolves elsewhere, or has an invalid or non-Microsoft signature, do not run <code>taskkill</code> against it or change its registry configuration; investigate the file first.</p>
            </Callout>
          </div>
        </div>
      </section>

      <section id="10-second-test" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-sky-500/30 bg-sky-500/10 text-sky-300">Step 5 — reversible process-isolation test</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">End the current process instance before touching the Registry</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            Save your game and complete the baseline steps first. Open Command Prompt or Windows Terminal and run the command below. It ends the named process instance; it does not change its startup configuration. If access is denied, verify the process identity before deciding whether an elevated terminal is appropriate.
          </p>
          <div className="mt-6 max-w-3xl">
            <h3 className="mb-2 flex items-center gap-2 font-bold"><Terminal className="h-5 w-5 text-sky-400" /> End the current process instance</h3>
            <CodeBlock>{'taskkill /f /im GameBarPresenceWriter.exe'}</CodeBlock>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Repeatable improvement', 'If the same scene becomes consistently smoother, Presence Writer or related Game Bar activity may be contributing. Continue with Steps 6–7: repeat the matched scene, then test Xbox Game Bar and background-capture settings one at a time. Recheck after any restart needed to apply a persistent setting.', CheckCircle2],
              ['No measurable change', 'The process is less likely to be the main cause. Do not continue into registry changes just because the executable appears in Task Manager.', CircleHelp],
              ['The process returns', 'Taskkill ends only the current instance. Windows may start it again when activation conditions occur; this command is a test, not a permanent disable.', RotateCcw],
            ].map(([title, text, Icon]) => { const I = Icon as React.ElementType; return <div key={title as string} className="rounded-2xl border border-slate-800 bg-brand-dark p-5"><I className="h-5 w-5 text-cyan-400" /><h3 className="mt-3 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></div>; })}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-500">For a useful A/B comparison, use the same game, scene, settings, and background applications. A single before/after run is only a clue; repeat it before concluding that this process is involved.</p>
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
          <AccessibleTable label="Game stutter symptom triage matrix">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Symptom pattern</th><th scope="col" className="px-4 py-3">Possible direction</th><th scope="col" className="px-4 py-3">Next check</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              {symptoms.map((item) => <tr key={item.symptom}><th scope="row" className="px-4 py-4 text-left font-semibold text-white">{item.symptom}</th><td className="px-4 py-4 text-slate-300">{item.likely}</td><td className="px-4 py-4 text-slate-400">{item.check}</td></tr>)}
            </tbody>
          </AccessibleTable>

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
            for an evidence-first look at WHESVC (service name whesvc, Windows Health and Optimized Experiences), DiagTrack, SysMain and MapsBroker.
          </p>
        </div>
      </section>

      <section id="test-results" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Read the evidence</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Interpret the process-isolation test correctly</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>The command tests the current process instance. It cannot prove that the executable alone caused the hitch, because the scene, capture stack, overlays and other background activity may also vary. Repeat the same test before moving to a deeper setting.</p>
          <AccessibleTable label="How to interpret GameBarPresenceWriter process-isolation results">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Observed result</th><th scope="col" className="px-4 py-3">What it suggests</th><th scope="col" className="px-4 py-3">Next action</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Repeatable frame-time improvement</th><td className="px-4 py-4 text-slate-300">The current process or related Game Bar activity may contribute.</td><td className="px-4 py-4 text-slate-400">Repeat the test, then isolate Game Bar and capture settings one at a time.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">No meaningful change</th><td className="px-4 py-4 text-slate-300">The current process instance is less likely to be the main cause in that test.</td><td className="px-4 py-4 text-slate-400">Stop registry escalation and check overlays, drivers, shaders, CPU/GPU limits, storage and thermals.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">The process starts again</th><td className="px-4 py-4 text-slate-300">Windows or the application stack reactivated it.</td><td className="px-4 py-4 text-slate-400">Treat taskkill as a temporary isolation test, not a permanent disable.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">One run improves, later runs do not</th><td className="px-4 py-4 text-slate-300">The difference may be ordinary run-to-run variation.</td><td className="px-4 py-4 text-slate-400">Restore the baseline and repeat with the same scene, settings and capture method.</td></tr>
            </tbody>
          </AccessibleTable>
          <p className="mt-5 text-sm leading-6 text-slate-400">PresentMon records CPU, GPU and display frame-duration metrics. Use the same capture method before and after; a single metric does not prove causation.</p>
        </div>
      </section>

      <section id="safe-method" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">Steps 6–7 — supported Settings controls</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Test Xbox Game Bar and background capture separately</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3"><Power className="h-5 w-5 text-emerald-400" /><h3 className="font-bold">Disable what you do not use</h3></div>
              <ol className="mt-5 list-inside list-decimal space-y-4 text-sm leading-6 text-slate-300">
                <li>Open <strong>Settings → Gaming → Xbox Game Bar</strong> (called <strong>Game Bar</strong> on some Windows builds) and turn it off if you do not use it.</li>
                <li>Open <strong>Settings → Gaming → Captures</strong> and turn off background recording or <strong>Record what happened</strong> if you do not need it. The exact label can vary by Windows release and installed Game Bar version.</li>
                <li>Restart Windows if the setting requests it, reproduce the same scene, and compare frame-time again. Re-enable a feature you rely on if there is no repeatable benefit.</li>
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

      <section id="controls" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Do not mix these controls up</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Xbox Game Bar, per-user settings and device policy are different layers</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>The names are similar, but they do not all control the same thing or have the same scope. Inspect what already exists before changing anything. A device policy is not interchangeable with a current-user setting.</p>
          <AccessibleTable label="Comparison of Xbox Game Bar settings and Game DVR registry controls">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Control</th><th scope="col" className="px-4 py-3">Scope</th><th scope="col" className="px-4 py-3">What it controls</th><th scope="col" className="px-4 py-3">Guidance</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Xbox Game Bar Settings</th><td className="px-4 py-4 text-slate-300">Signed-in user's Windows experience</td><td className="px-4 py-4 text-slate-300">Opening Game Bar, widgets and related user features.</td><td className="px-4 py-4 text-slate-400">Use the Settings UI first when you do not use the feature.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Captures / Record what happened</th><td className="px-4 py-4 text-slate-300">Capture configuration</td><td className="px-4 py-4 text-slate-300">Background game recording and clip-capture behavior.</td><td className="px-4 py-4 text-slate-400">Disable only if you do not rely on background clips; test separately.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">GameDVR_Enabled / AppCaptureEnabled</th><td className="px-4 py-4 text-slate-300">Per-user registry values under HKCU</td><td className="px-4 py-4 text-slate-300">Current-user Game DVR and app-capture configuration values.</td><td className="px-4 py-4 text-slate-400">Inspect and record existing values. Behavior can vary by build; these are not the same as device policy.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">AllowGameDVR</th><td className="px-4 py-4 text-slate-300">Device policy under HKLM</td><td className="px-4 py-4 text-slate-300">Windows Game Recording and Broadcasting policy.</td><td className="px-4 py-4 text-slate-400">Use only where version and management scope support it. Microsoft notes desktop enforcement only on Windows 10.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Presence Writer ActivationType</th><td className="px-4 py-4 text-slate-300">Protected Windows Runtime class registration</td><td className="px-4 py-4 text-slate-300">A community workaround targeting the Presence Writer activation registration.</td><td className="px-4 py-4 text-slate-400">Undocumented by Microsoft as a disable procedure. Most users should leave it untouched.</td></tr>
            </tbody>
          </AccessibleTable>
        </div>
      </section>

      <section id="game-dvr-registry" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Step 8 — check policy scope before editing</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Inspect Game DVR configuration without assuming the policy applies</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            If turning off Game Bar and background recording in Settings does not settle the question, inspect the existing configuration before considering an advanced change. Current-user values and the formal AllowGameDVR device policy are separate. Microsoft currently notes that the policy is enforced only on Windows 10 desktop; do not create it as a general Windows 11 performance tweak.
          </p>
                    <AccessibleTable label="AllowGameDVR policy applicability by Windows environment">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Environment</th><th scope="col" className="px-4 py-3">Microsoft-documented scope</th><th scope="col" className="px-4 py-3">Recommended action</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Windows 10 desktop</th><td className="px-4 py-4 text-slate-300">Microsoft notes that the AllowGameDVR policy is enforced on Windows 10 desktop.</td><td className="px-4 py-4 text-slate-400">Use only when applicable and preserve the existing device-policy state.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Windows 11 desktop</th><td className="px-4 py-4 text-slate-300">The current policy documentation does not describe enforcement on Windows 11 desktop.</td><td className="px-4 py-4 text-slate-400">Use the Settings interface first; do not create the policy as a generic FPS tweak.</td></tr>
              <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Managed work or school PC</th><td className="px-4 py-4 text-slate-300">Group Policy or MDM may apply or reapply device-level settings.</td><td className="px-4 py-4 text-slate-400">Ask the administrator instead of overriding a managed policy locally.</td></tr>
            </tbody>
          </AccessibleTable>
<div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">1. Identify the Windows edition and management state</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Run <code className="text-cyan-300">winver</code> and note whether the PC is managed by an organization. Do not override a Group Policy or MDM setting on a work or school device.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">2. Inspect current-user values first</h3>
                <CodeBlock>{'HKEY_CURRENT_USER\\System\\GameConfigStore'}</CodeBlock>
                <p className="mt-3 text-sm leading-6 text-slate-400">If present, record <code className="text-cyan-300">GameDVR_Enabled</code> and <code className="text-cyan-300">AppCaptureEnabled</code>. Do not assume a universal default or change both values at once.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">3. Check whether AllowGameDVR is already configured</h3>
                <CodeBlock>{'HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR'}</CodeBlock>
                <p className="mt-3 text-sm leading-6 text-slate-400">If the value exists, note it and identify whether Group Policy or MDM manages it. Do not create this policy key on Windows 11 just to chase FPS.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-brand-dark p-5">
                <h3 className="font-bold text-white">4. Change only an applicable setting</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">On a managed PC, ask the administrator. Where a documented policy is supported, use the appropriate management interface and preserve the original state. Restart only when required, then repeat the same workload.</p>
              </div>
            </div>
            <div className="min-w-0 space-y-5">
              <Callout title="What this setting can — and cannot — tell you">
                The Game DVR policy controls Windows Game Recording and Broadcasting. It is not a guaranteed FPS switch. Test it only when you have reason to suspect capture activity, then compare the same game scene and restore the original settings if there is no repeatable benefit.
              </Callout>
              <Callout title="Microsoft policy note">
                The <code className="text-cyan-300">AllowGameDVR</code> policy is device-scoped. Microsoft documents <code className="text-cyan-300">0</code> as not allowed and <code className="text-cyan-300">1</code> as allowed, and notes that the policy is enforced only on Windows 10 desktop. See <a href={MS_GAMEDVR_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline hover:text-cyan-200">Microsoft's ApplicationManagement Policy CSP</a>. This is not a universal Windows 11 switch.
              </Callout>
              <Callout title="Rollback">
                Restore the exact values you recorded and remove only a key that you personally created for an isolated test. If Group Policy or MDM manages the device, use that same management layer to restore the configuration.
              </Callout>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            This is the advanced path. For the safer Settings-based approach, start with{' '}
            <Link to="/guides/windows-11-settings-tweaks" className="font-semibold text-cyan-300 hover:text-cyan-200">18 Windows 11 Settings Worth Changing</Link>{' '}
            and return here only if you need a deeper Game DVR configuration test.
          </p>
          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-bold text-white"><Terminal className="h-5 w-5 text-violet-400" /> Read-only check: inspect existing values</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">These commands query current configuration; they do not write registry values. A value may be absent on a particular Windows build.</p>
            <div className="mt-4">
              <CodeBlock>{'reg query "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled\nreg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled\nreg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR'}</CodeBlock>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">Save the output if you need to compare it later. Do not create a missing device-policy key to imitate a setting shown in a forum post.</p>
          </div>
        </div>
      </section>

      <section id="registry" className={`${sectionClass} bg-slate-900/40`}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Step 9 — expert-only, undocumented workaround</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Protected Presence Writer registry override: where most users should stop</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>
            This community workaround targets a protected Windows Runtime ActivatableClassId registration. Microsoft documents the Presence Writer component and the registration path for a custom implementation, but does not document this ActivationType change as a supported disable method. Most users should stop at the earlier tiers.
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
                <h3 className="font-bold text-white">4. Do not assume a universal ActivationType value</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">The presence of a DWORD does not establish that changing it is supported. Microsoft does not publish a universal 0 or 1 value for disabling Presence Writer. Do not copy a value from another Windows build.</p>
              </div>
              <div className="min-w-0">
                <h3 className="mb-2 flex items-center gap-2 font-bold"><Terminal className="h-5 w-5 text-violet-400" /> Safer inspection and backup commands</h3>
                <CodeBlock>{'reg query "' + registryPath + '" /v ActivationType'}</CodeBlock>
                <CodeBlock>{'reg export "' + registryPath + '" "%USERPROFILE%\\Desktop\\PresenceWriter-backup.reg"'}</CodeBlock>
                <p className="mt-3 text-xs leading-5 text-slate-500">The query reads the value and the export saves registry values. A .reg export does not preserve key ownership or ACL permissions. Do not take ownership unless you know how to restore the original owner and permissions; an export is not a backup of ACLs.</p>
              </div>
            </div>
            <Callout title="Unofficial and last-resort only" danger>
              Microsoft's developer documentation describes Presence Writer's purpose and the registration path for a custom implementation. It does not document or recommend this ActivatableClassId override as a gaming optimization or supported disable procedure. Because it changes protected system configuration, it should not be the first response to a process appearing in Task Manager.
            </Callout>
          </div>
            <AccessibleTable label="Rollback guidance for Game Bar and Presence Writer changes">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Change type</th><th scope="col" className="px-4 py-3">Rollback path</th><th scope="col" className="px-4 py-3">Important caution</th></tr></thead>
              <tbody className="divide-y divide-slate-800">
                <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Taskkill test</th><td className="px-4 py-4 text-slate-300">No persistent setting to restore; Windows may relaunch the component.</td><td className="px-4 py-4 text-slate-400">It is a current-session test, not a disable procedure.</td></tr>
                <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Game Bar / Captures Settings</th><td className="px-4 py-4 text-slate-300">Return the toggles to the states you recorded before the test.</td><td className="px-4 py-4 text-slate-400">Re-enable recording or shortcuts you still use.</td></tr>
                <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Per-user registry values</th><td className="px-4 py-4 text-slate-300">Restore the exact values from your export or notes.</td><td className="px-4 py-4 text-slate-400">Do not assume one fixed default is correct for every installation.</td></tr>
                <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">AllowGameDVR device policy</th><td className="px-4 py-4 text-slate-300">Use the same Group Policy or MDM layer that applied the setting.</td><td className="px-4 py-4 text-slate-400">Do not override a managed work or school policy locally.</td></tr>
                <tr><th scope="row" className="px-4 py-4 text-left font-semibold text-white">Protected ActivationType override</th><td className="px-4 py-4 text-slate-300">Restore the exact original value, owner and permissions from your recorded backup plan.</td><td className="px-4 py-4 text-slate-400">A .reg export does not restore ACLs. Skip this if you cannot confidently recover them.</td></tr>
              </tbody>
            </AccessibleTable>
        </div>
      </section>

      <section id="other-causes" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Don't stop at Windows tweaks</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">If the stutter survives, investigate the real bottleneck</h2>
                    <AccessibleTable label="Alternative causes of PC gaming stutter and recommended diagnostic checks">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-4 py-3">Symptom</th><th scope="col" className="px-4 py-3">Possible cause</th><th scope="col" className="px-4 py-3">Next test</th></tr></thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Stutter after sustained play', 'CPU/GPU thermal throttling or power limits', 'Log temperatures and effective clock speeds over time.'],
                ['GPU near full utilization', 'GPU-limited workload', 'Lower one graphics setting or resolution and compare the same scene.'],
                ['CPU spikes with low GPU use', 'CPU bottleneck or background process', 'Check per-core utilization and correlate spikes with background activity.'],
                ['Only one game stutters', 'Game engine, shader cache or driver profile', 'Compare another title and note whether hitches occur on first-use effects.'],
                ['Random latency spikes', 'Driver DPC/ISR activity', 'Use a latency diagnostic and correlate its timeline with the hitch.'],
                ['Crashes or visual artifacts', 'GPU, VRAM, power or thermal instability', 'Stop applying software tweaks and run appropriate hardware diagnostics.'],
              ].map(([symptom, cause, check]) => (
                <tr key={symptom}><th scope="row" className="px-4 py-4 text-left font-semibold text-white">{symptom}</th><td className="px-4 py-4 text-slate-300">{cause}</td><td className="px-4 py-4 text-slate-400">{check}</td></tr>
              ))}
            </tbody>
          </AccessibleTable>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            If thermal throttling is the real story, our{' '}
            <Link to="/blog/gaming-pc-cooling" className="font-semibold text-cyan-300 hover:text-cyan-200">gaming PC cooling guide</Link>{' '}
            covers dust buildup, fan wear, and heatsink service before you reach for another software tweak.
          </p>
        </div>
      </section>

      <section id='cluster' className='border-b border-slate-800/80 bg-slate-950/40 px-4 py-10 sm:px-6 sm:py-16'>
        <div className='container mx-auto max-w-5xl'>
          <Badge className='mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300'>Windows gaming performance cluster</Badge>
          <h2 className='text-2xl font-bold sm:text-4xl'>When Game Bar is only one piece of the stutter</h2>
          <p className='mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base'>
            Use the measurements to choose the next branch. These six guides cover software, driver and thermal causes without repeating the same links in a second grid.
          </p>
          <div className='mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {[
              { href: '/guides/windows-gaming-performance-stutter-fix', title: 'Windows Gaming Stutter in 2026', text: 'Start with the broad decision tree for frame-time, overlays, shaders, drivers and thermals.' },
              { href: '/guides/windows-gaming-frame-time-stutter', title: 'Gaming Stutter With High FPS', text: 'Trace uneven frame pacing when average FPS looks healthy.' },
              { href: '/guides/shader-compilation-stutter-windows', title: 'Shader Compilation Stutter', text: 'Check first-use shader and pipeline compilation before resetting caches.' },
              { href: '/guides/dpc-latency-gaming-stutter', title: 'DPC Latency & Gaming Stutter', text: 'Investigate driver-timing problems when the hitch pattern points to DPC/ISR activity.' },
              { href: '/blog/gaming-pc-cooling', title: 'Gaming PC Cooling Guide', text: 'Check dust, fans, thermal interfaces and sustained-load temperatures when performance degrades over time.' },
              { href: '/guides/why-is-my-laptop-so-hot', title: 'Laptop Overheating Guide', text: 'Measure laptop temperatures, clocks and thermal throttling when gaming performance falls as the system heats up.' },
            ].map((item) => (
              <Link key={item.href} to={item.href} className='group rounded-2xl border border-slate-800 bg-brand-dark p-5 transition hover:border-cyan-500/40 hover:bg-slate-900'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='font-bold text-white group-hover:text-cyan-300'>{item.title}</h3>
                    <p className='mt-2 text-sm leading-6 text-slate-400'>{item.text}</p>
                  </div>
                  <ChevronRight className='mt-0.5 h-5 w-5 shrink-0 text-cyan-400' />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="official-references" className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Primary documentation</Badge>
          <h2 className="text-2xl font-bold sm:text-4xl">Official Technical References</h2>
          <p className={`mt-4 max-w-3xl ${proseClass}`}>These sources support the Windows component description, the Game DVR policy scope, the process command and the frame-time measurement approach. None establishes that GameBarPresenceWriter.exe is a universal cause of gaming stutter.</p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
            <li><a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Microsoft Learn — Game Bar Presence Writer</a><p className="mt-1 text-slate-400">Documents the component's purpose, game-presence events and custom implementation contract.</p></li>
            <li><a href={MS_GAMEDVR_POLICY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Microsoft Learn — ApplicationManagement Policy CSP: AllowGameDVR</a><p className="mt-1 text-slate-400">Defines the Windows Game Recording and Broadcasting policy values, scope and enforcement note.</p></li>
            <li><a href={MS_TASKKILL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Microsoft Learn — taskkill command reference</a><p className="mt-1 text-slate-400">Explains how Windows ends processes by executable name or process ID.</p></li>
            <li><a href={MS_GAMEBAR_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Microsoft Support — Use Xbox Game Bar to record your screen</a><p className="mt-1 text-slate-400">Documents Game Bar access and capture workflows, including keyboard operation.</p></li>
            <li><a href={PRESENTMON_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Intel GameTechDev — PresentMon project and frame-time metrics</a><p className="mt-1 text-slate-400">Describes CPU, GPU and display frame durations and latency telemetry for Windows graphics applications.</p></li>
          </ul>
        </div>
      </section>

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
                    ? <>No. Its presence in Task Manager does not prove that it causes stutter. Use the <a href="#10-second-test" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">process-isolation test above in Step 5</a> and compare the same scene more than once. Frame-time spikes can also come from drivers, overlays, shader compilation, CPU/GPU limits, thermal throttling, storage, or other background activity.</>
                    : faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ─── LAST REVIEWED / AUTHOR (E-E-A-T signal) ─── */}
      <section className="border-t border-slate-900 bg-brand-dark/60">
        <div className="mx-auto max-w-4xl px-4 py-10 text-xs sm:text-sm text-slate-500 sm:px-6">
          <p>
            <strong className="text-slate-300">Published:</strong> {PUBLISHED_DATE} · <strong className="text-slate-300">Technically reviewed:</strong> {LAST_REVIEWED} by{' '}
            <Link to="/author/imran" className="text-cyan-400 hover:text-cyan-300 underline">Imran Natiq</Link>, Hardware Repair Engineer, KCROC. Windows behavior can vary by Windows release, installed Xbox components, and device configuration — always keep a rollback path before modifying protected system configuration. What Presence Writer does is sourced from{' '}
            <a href={MS_DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Microsoft's developer documentation</a>; the disable methods themselves are community workarounds, not Microsoft-recommended optimizations.
          </p>
        </div>
      </section>
    </div>
  );
}
