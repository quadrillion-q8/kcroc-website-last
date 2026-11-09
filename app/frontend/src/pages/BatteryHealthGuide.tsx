// File: app/frontend/src/pages/BatteryHealthGuide.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Battery, BatteryWarning, Thermometer, AlertTriangle, CheckCircle2, XCircle,
  Zap, Clock, Gauge, RefreshCw, Shield,
  Stethoscope, Wrench, HelpCircle, Moon, WifiOff, Terminal, Apple,
  ChevronRight, Sun, PowerOff, TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StandaloneRelatedLinks } from '@/components/content/StandaloneRelatedLinks';
import StickyTOC from '@/components/blog/StickyTOC';

import { SEOEngine } from '../core/components/SEOEngine';
import { IMAGES } from '../constants/images';

// Shared section wrapper styles keep every block visually consistent —
// bordered container, divided rows — matching the rest of the page.
const sectionBadge =
  'px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4';

// ── STATIC CONTENT (module scope: none of this depends on props/state,
// so it's defined once rather than re-created on every render) ──

// QUICK ANSWER: the core warning signs, for featured-snippet-style coverage
const quickSigns = [
  'Battery drains far faster than it used to',
  'Runtime has dropped dramatically from what it used to be',
  'Laptop shuts down unexpectedly while charge remains',
  "Battery won't charge, or charging stops early",
  'Battery percentage jumps, freezes, or behaves erratically',
  'Battery or laptop case is swollen, raised, or deformed',
  'Trackpad or keyboard is being pushed upward',
  'Unusual heat is concentrated around the battery area',
  'Battery health/wear report shows substantial capacity loss',
  'Windows, macOS, BIOS, or manufacturer diagnostics shows a battery or adapter warning',
  'Laptop works normally on AC but becomes unstable on battery',
  'Laptop only works when the charger is connected',
  'Battery drains unusually while sleeping or closed',
  'Charging pauses or behaves differently because of a charge-limit feature',
  'The BIOS reports an unknown power adapter, or performance drops while plugged in',
  'Battery cycle count or reported capacity has worsened alongside shorter runtime'
];

// SYMPTOM → MEANING → ACTION TABLE
const symptomTable = [
  {
    symptom: 'Fast drain',
    meaning: 'Reduced battery capacity, or a background process consuming power',
    action: 'Check the battery health report before assuming the battery is bad'
  },
  {
    symptom: 'Sudden shutdown',
    meaning: 'Battery can no longer maintain voltage under load, even at a nonzero charge',
    action: 'Run a battery diagnostic; this is a common sign of real wear'
  },
  {
    symptom: 'Not charging at all',
    meaning: 'Could be the charger, the port, the charging circuit, or the battery itself',
    action: 'Test with a known-good charger first, then get it diagnosed'
  },
  {
    symptom: 'Swelling or bulging',
    meaning: 'A lithium-ion cell that has physically failed',
    action: 'Stop using the laptop immediately — see the safety section below'
  },
  {
    symptom: 'Percentage stuck or jumping',
    meaning: 'Often a charging-management or software issue rather than pure wear',
    action: 'Update firmware/OS first, then diagnose the battery if it persists'
  },
  {
    symptom: 'Only works while plugged in',
    meaning: 'Usually a severely degraded battery, though a charging-circuit fault can look identical',
    action: 'Get a proper diagnosis before buying a replacement battery'
  },
  {
    symptom: 'Hot near the battery specifically',
    meaning: 'Different from general CPU/GPU heat — can indicate a battery under stress',
    action: 'Stop heavy use and have it checked, especially alongside other signs above'
  }
];

// WARNING SIGNS (expanded, detailed)
const warningSigns = [
  {
    title: 'Rapid Battery Drain',
    description: 'The battery percentage falls much faster than it used to, even during light, everyday use — not just during demanding tasks.',
    icon: BatteryWarning,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    points: [
      'Percentage drops noticeably within minutes of unplugging',
      'A full charge no longer lasts anywhere near as long as before',
      'Drains even while asleep or nearly idle',
      'Worth comparing against this laptop’s own history, not a generic number'
    ]
  },
  {
    title: 'Runtime Has Become Very Short',
    description: 'This is distinct from a sudden drop — it’s a gradual decline in how long the laptop lasts on a full charge compared to when it was new.',
    icon: Clock,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    points: [
      'Compare current runtime to this specific laptop’s original runtime',
      'A heavier workload today can also explain shorter runtime — see the drain-troubleshooting section',
      'Consistent decline over months points toward wear',
      'Battery health reports (below) give an objective number to check against'
    ]
  },
  {
    title: 'Unexpected Shutdowns',
    description: 'The laptop powers off suddenly, sometimes while still showing a non-zero battery percentage.',
    icon: PowerOff,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    points: [
      'Reported percentage becomes unreliable once the battery can’t sustain load',
      'Often happens under a sudden CPU/GPU demand spike',
      'A hardware sign worth taking seriously, especially if repeated',
      'Run a battery diagnostic rather than guessing'
    ]
  },
  {
    title: "Battery Won't Charge Properly",
    description: 'Charging stalls, stops early, or never starts — but the battery isn’t automatically the cause.',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    points: [
      'Could be the charger, the cable, or the charging port',
      'Could be the internal charging circuit on the motherboard',
      'Could be a firmware or power-management glitch',
      'Or it could genuinely be the battery — testing narrows it down'
    ]
  },
  {
    title: 'Battery Percentage Behaves Strangely',
    description: 'The reported charge level doesn’t match reality — a software or calibration symptom as often as a hardware one.',
    icon: Gauge,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    points: [
      'Sudden jumps, e.g. 40% to 10% with no obvious cause',
      'Stuck at one percentage for an unusually long time',
      'Shuts down despite showing meaningful charge remaining',
      'Can sometimes be corrected by a manufacturer-supported recalibration'
    ]
  },
  {
    title: 'Physical Swelling',
    description: 'The clearest, most urgent warning sign — the battery or the case around it visibly bulges or deforms.',
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    points: [
      'Visible bulge on the underside of the laptop',
      'Trackpad becomes raised, stiff, or hard to click',
      'Gaps appear between the case panels',
      'Keyboard feels uneven or pushed up in one area'
    ]
  },
  {
    title: 'Excessive Heat Near the Battery',
    description: 'Not the same as a hot CPU or GPU — this is heat specifically from the battery area, distinct from normal thermal load.',
    icon: Thermometer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    points: [
      'A generally hot laptop under load is often just CPU/GPU heat — normal',
      'Heat concentrated near the battery bay, especially at rest, is different',
      'Worth checking alongside swelling or drain symptoms, not on its own',
      'Stop use and get it checked if the area feels hot without heavy load'
    ]
  },
  {
    title: 'Battery Health/Wear Is Severely Degraded',
    description: 'Windows and macOS both expose an actual capacity figure — the most objective sign available, and the one to check first.',
    icon: TrendingDown,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    points: [
      'Windows: powercfg battery report (full guide below)',
      'macOS: Battery section in System Settings (full guide below)',
      'Manufacturer utilities (Dell, HP, Lenovo, ASUS, Acer) offer similar reports',
      'A single percentage isn’t an automatic verdict — read it in context'
    ]
  },
  {
    title: 'Battery-Related OS Warnings',
    description: 'Windows and macOS will sometimes surface an explicit battery warning rather than making you go looking for one.',
    icon: HelpCircle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    points: [
      'Windows: "Consider replacing your battery" notifications',
      'macOS: "Service Recommended" or "Replace Soon" battery status',
      'Manufacturer apps (Lenovo Vantage, MyASUS, HP Support Assistant) with similar alerts',
      'Worth investigating even if the laptop otherwise feels fine'
    ]
  },
  {
    title: 'Unstable Only on Battery Power',
    description: 'The laptop runs fine plugged in, but freezes, restarts, or throttles heavily as soon as it’s unplugged.',
    icon: RefreshCw,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    points: [
      'A sign the battery can’t deliver stable power under real load',
      'Different from simple short runtime — this is about stability, not duration',
      'Can also point to a power-delivery fault rather than the battery itself',
      'Worth a proper diagnosis rather than replacing the battery on a guess'
    ]
  },
  {
    title: 'Laptop Only Works While Connected to the Charger',
    description: 'If the laptop shuts off as soon as the adapter is removed, the battery may be unable to deliver power — but the fault can also lie in the pack-protection path, connector, fuse, or motherboard discharge circuit.',
    icon: PowerOff,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    points: [
      'Distinguish an instant power-off from general instability while on battery',
      'A deeply degraded or protected battery pack can cause this behavior',
      'A disconnected battery connector or fault in the motherboard battery path can look similar',
      'Have the battery and power path tested before ordering a replacement'
    ]
  },
  {
    title: 'Unusual Battery Drain While the Laptop Is Closed',
    description: 'A laptop that loses a large amount of charge during sleep may be remaining active in Modern Standby, waking for timers or devices, or using background tasks.',
    icon: Moon,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    points: [
      'Use Windows SleepStudy on supported Modern Standby systems to review sessions and top active components',
      'Check wake timers, power requests, and connected USB or network devices',
      'Compare sleep drain with a fully shut-down laptop; the two conditions are not equivalent',
      'If drain continues after a full shutdown, have battery self-discharge and hardware checked'
    ]
  },
  {
    title: 'Charging Pauses at a Fixed Percentage',
    description: 'A laptop that stops at 60%, 80%, or another chosen limit may be following a battery-protection setting rather than showing a fault.',
    icon: Battery,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    points: [
      'Check Lenovo Vantage, MyASUS, Dell Power Manager, HP tools, or macOS charging settings',
      'Optimized charging may temporarily hold charge below 100%',
      'If it stops at random values, heats abnormally, or reports a battery fault, investigate the charger, battery, and charging circuit',
      'Do not disable a charge limit just to force a full charge every day'
    ]
  },
  {
    title: 'BIOS, Pre-Boot, or Battery Diagnostics Shows a Warning',
    description: 'A BIOS message, manufacturer test result, or model-specific LED pattern can identify a battery or adapter problem before Windows starts.',
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    points: [
      'Record the exact message or blink sequence and laptop model',
      'Use the manufacturer\'s own diagnostic guidance; LED and POST codes differ by model',
      'A battery alert is useful evidence, but an adapter or charging-path alert does not automatically mean the battery is bad',
      'Check the manufacturer\'s pre-boot test before buying parts'
    ]
  },
  {
    title: 'The Charger Is Not Recognized or the Laptop Becomes Unusually Slow',
    description: 'Some laptops reduce performance or stop charging when the adapter\'s identity or available power is not recognized. This can be an adapter, cable, DC-in port, USB-C power-delivery, or motherboard fault — not a battery diagnosis by itself.',
    icon: Zap,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    points: [
      'Check the BIOS or manufacturer utility for adapter status or reported wattage',
      'Use a known-good, correctly rated adapter and cable for the exact model',
      'On some Dell systems, an Unknown adapter status can be associated with CPU throttling and charging failure',
      'Do not assume a fixed CPU clock speed or replace the battery before checking the input-power path'
    ]
  },
  {
    title: 'Cycle Count and Capacity Wear Have Increased Together',
    description: 'A high cycle count is more meaningful when it appears alongside lower full-charge capacity, shorter runtime, or service warnings. Battery cycle limits vary by model; age alone is not a failure test.',
    icon: TrendingDown,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    points: [
      'Check the model-specific design cycle count from the manufacturer',
      'Compare Full Charge Capacity with Design Capacity where the report exposes both',
      'Watch for short runtime, percentage jumps, or shutdown under load',
      'Treat cycle count as context, not a standalone replacement order'
    ]
  }
];

const brandGuide = [
  {
    brand: 'Dell',
    tool: 'Dell SupportAssist / BIOS diagnostics',
    signs: 'BIOS battery warnings and error codes (601–607 range) at boot.',
    replacement: 'Genuine or high-quality compatible, matched exactly by voltage (commonly 11.1V or 14.8V) and part number.',
    safety: 'Reputable compatible batteries are safe when specs match exactly — verify before buying.'
  },
  {
    brand: 'HP',
    tool: 'HP Support Assistant \u2192 Battery Check',
    signs: '"Replace Battery" status, or system performance throttling tied to battery state.',
    replacement: 'HP batteries carry specific part numbers — match the exact model, not just the laptop line.',
    safety: 'Third-party HP-compatible batteries are safe if certified and spec-matched.'
  },
  {
    brand: 'Lenovo',
    tool: 'Lenovo Vantage \u2192 Device \u2192 Battery',
    signs: 'Health reported below roughly 80%, or a direct "consider replacing" message.',
    replacement: 'Connector types differ across ThinkPad and IdeaPad lines — confirm exact model.',
    safety: 'Compatible batteries are safe once connector type and voltage are verified.'
  },
  {
    brand: 'Acer',
    tool: 'Acer Care Center',
    signs: 'Wear-level reporting, plus rapid drain and charging issues in Aspire/Predator/Swift lines.',
    replacement: 'Battery specs vary significantly by series — match the exact part number.',
    safety: 'Quality compatible batteries are safe with correct voltage matching.'
  },
  {
    brand: 'ASUS',
    tool: 'MyASUS \u2192 Customer Support \u2192 Battery Health',
    signs: 'Battery health percentage, plus performance throttling on ROG gaming models.',
    replacement: 'Consumer and ROG gaming series use different batteries — verify the exact model.',
    safety: 'Compatible batteries are safe if they meet original specs and carry proper certification.'
  },
  {
    brand: 'MacBook',
    tool: 'System Settings \u2192 Battery \u2192 Battery Health (full steps below)',
    signs: '"Service Recommended" or "Replace Soon" status; trackpad may raise if swollen.',
    replacement: 'Requires professional installation on nearly all modern MacBooks; genuine Apple batteries recommended.',
    safety: 'Third-party MacBook batteries carry more risk than most Windows equivalents — genuine strongly recommended.'
  }
];

const fastDrainCauses = [
  'Screen brightness set high',
  'CPU- or GPU-heavy apps running in the background',
  'Too many open browser tabs',
  'Pending Windows/macOS updates downloading or indexing',
  'Connected peripherals (external drives, dongles, high-draw USB devices)',
  'High refresh-rate displays and discrete GPUs active unnecessarily',
  'Poor sleep behavior keeping components partially awake',
  'Network wake events and background sync'
];

const careTips = [
  { title: 'Avoid Extreme Heat', description: "High ambient temperatures accelerate lithium-ion ageing. Avoid leaving a laptop in a hot vehicle or direct sunlight, and keep its cooling vents unobstructed.", icon: Thermometer },
  { title: 'Use Manufacturer Charge Limits', description: 'Many laptops now offer built-in charge-limiting or "optimized charging" — prefer these over manual habits.', icon: Battery },
  { title: 'Use the Original or Certified Charger', description: 'Mismatched chargers can affect charging behavior and, over time, battery condition.', icon: Zap },
  { title: 'Avoid Routine Deep Discharge', description: "Regularly draining to 0% isn't a maintenance step — it adds stress with no health benefit for modern batteries.", icon: RefreshCw },
  { title: 'Keep Firmware and OS Updated', description: 'Manufacturers periodically improve battery-management and power algorithms through updates.', icon: Shield },
  { title: "Don't Store at Full or Empty Charge", description: 'If storing a laptop for a long period, a mid-range charge (roughly 40–60%) is gentler than 0% or 100%.', icon: Battery }
];

// Decision guide — each "yes" branch now always resolves to a real
// destination (an in-page anchor or a genuine next action), so no link
// in this section is a dead "#" that just scrolls to the top.
const decisionSteps = [
  {
    question: 'Is the battery swollen or physically deformed?',
    yes: { label: 'Stop using the laptop immediately', tone: 'danger', to: '#battery-safety' }
  },
  {
    question: 'Does it shut down unexpectedly while on battery?',
    yes: { label: 'Compare battery and power-path symptoms', tone: 'warn', to: '#battery-vs-charging' }
  },
  {
    question: 'Has runtime dramatically decreased?',
    yes: { label: 'Check the battery health report', tone: 'warn', to: '#check-health' }
  },
  {
    question: 'Does the health report show severe wear?',
    yes: { label: 'Verify capacity loss against the design specification', tone: 'action', to: '#check-health' }
  },
  {
    question: 'Could the drain be explained by heavy software/workload?',
    yes: { label: 'Troubleshoot software first', tone: 'info', to: '#fast-drain' }
  }
];

const notReplaceReasons = [
  'A faulty charger or charging cable, not the battery itself',
  'A worn or damaged charging port',
  'A motherboard charging-circuit fault that mimics battery failure',
  'Heavy CPU/GPU workload draining the battery faster than expected',
  'Sleep/standby misconfiguration causing overnight drain',
  'An inaccurate battery percentage reading rather than real capacity loss'
];

const faq = [
  {
    q: 'How do I know if my laptop battery needs replacing?',
    a: 'Look at the pattern, not one symptom in isolation: fast drain, a battery health report showing severe wear, unexpected shutdowns, or swelling are the strongest indicators. A single odd reading is usually software, not a bad battery.'
  },
  {
    q: 'How do I check battery health in Windows 11?',
    a: 'Open Command Prompt or Terminal and run "powercfg /batteryreport", then open the generated HTML file. It shows Design Capacity vs Full Charge Capacity, plus recent usage and capacity history. Full walkthrough above.'
  },
  {
    q: 'How do I check MacBook battery health?',
    a: 'Go to System Settings \u2192 Battery \u2192 Battery Health. It shows a Maximum Capacity percentage and a Condition status such as Normal, Service Recommended, or Replace Soon.'
  },
  {
    q: 'What percentage of battery health means I should replace it?',
    a: 'There’s no single universal threshold across brands and models. As a general guide, health well below 80% combined with real-world symptoms (short runtime, shutdowns) is a reasonable point to consider replacement — treat it as one input, not a strict rule.'
  },
  {
    q: 'How many years does a laptop battery last?',
    a: "It varies with chemistry, charge cycles, heat exposure, and charging habits — commonly somewhere in the 2–4 year range for typical daily use, but a well-cared-for battery can last longer and a poorly treated one can degrade faster."
  },
  {
    q: 'How many charge cycles does a laptop battery have?',
    a: 'Cycle limits vary substantially by model, battery chemistry, and manufacturer. Apple, for example, publishes a model-specific maximum cycle count rather than one universal laptop number. A cycle represents cumulative battery usage equivalent to 100% of capacity, not necessarily one charging session.'
  },
  {
    q: 'Why is my laptop battery draining so fast?',
    a: "It isn't always the battery. Background apps, brightness, connected peripherals, and pending updates are common software causes — see the fast-drain section above before assuming the battery is bad."
  },
  {
    q: 'Why does my laptop shut down at 20% or higher?',
    a: 'This usually means the battery can no longer maintain voltage under load, so the reported percentage becomes unreliable near that threshold — a fairly reliable sign of real wear.'
  },
  {
    q: 'Why is my laptop battery not charging?',
    a: 'Could be the charger, the cable, the port, the internal charging circuit, or the battery itself. Test with a known-good charger first; if that doesn’t help, it needs a proper diagnosis rather than a battery swap on a guess.'
  },
  {
    q: 'Is it safe to use a laptop with a swollen battery?',
    a: 'No. Stop using it immediately, keep it away from heat, and arrange professional removal. A swollen lithium-ion cell can pose a fire risk — see the safety section above for what to do and what to avoid.'
  },
  {
    q: 'Should I keep my laptop plugged in all the time?',
    a: "Keeping it at 100% constantly adds some stress over time. If your laptop offers a charge-limit or optimized-charging feature, use it; otherwise, avoiding long stretches at exactly 100% or 0% is a reasonable habit."
  },
  {
    q: 'Can I use my laptop while charging?',
    a: 'Yes. Modern laptops route power directly to components when plugged in, largely bypassing the battery, so this doesn’t meaningfully add wear.'
  },
  {
    q: 'Is a compatible (non-original) laptop battery safe?',
    a: 'A high-quality compatible battery from a reputable manufacturer, matched exactly to voltage, connector, and certification, is generally safe. Not every third-party battery meets that bar, so sourcing matters more than the genuine-vs-compatible label alone.'
  },
  {
    q: 'How long does laptop battery replacement take?',
    a: 'Timing depends on the exact laptop model, battery construction, part availability and whether inspection finds additional damage. Use the model-specific service documentation and confirm the correct replacement part before beginning work.'
  }
];

const toc = [
  { id: 'check-health', label: 'Check Battery Health' },
  { id: 'battery-vs-charging', label: 'Battery vs Charging' },
  { id: 'warning-signs', label: 'Warning Signs' },
  { id: 'windows-11', label: 'Windows 11' },
  { id: 'macbook', label: 'MacBook' },
  { id: 'battery-safety', label: 'Battery Safety' },
  { id: 'brand-guide', label: 'Brand Guide' },
  { id: 'fast-drain', label: 'Fast Drain' },
  { id: 'replace-guide', label: 'Should I Replace?' },
  { id: 'references', label: 'References' },
  { id: 'faq', label: 'FAQ' }
];

const toneClasses: Record<string, string> = {
  danger: 'bg-red-500/15 text-red-300',
  warn: 'bg-yellow-500/15 text-yellow-300',
  action: 'bg-emerald-500/15 text-emerald-300',
  info: 'bg-cyan-500/15 text-cyan-300'
};

export default function BatteryHealthGuide() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30">

      {/* Dynamic SEO Engine Integration */}
      <SEOEngine entityId="guide-battery" />

      <StickyTOC toc={toc} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-10 pt-24 sm:px-6 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.14),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
            <div>
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
                <Battery className="mr-2 h-4 w-4" />
                Laptop Battery Health Guide
              </Badge>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Laptop Battery Warning Signs:
                <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  How to Tell If It&apos;s Bad
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                Learn 15+ warning signs of a failing laptop battery, check battery health on Windows 11 or MacBook, and tell the difference between battery wear, software drain, charger faults, and charging-circuit problems.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#quick-answer" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:w-auto">
                  Start With the Quick Check
                </a>
                <a href="#check-health" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-200 transition-colors hover:bg-slate-800 sm:w-auto">
                  Check Battery Health
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-800 bg-brand-dark/40 px-3 py-1.5 text-[11px] text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-300">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 shadow-2xl shadow-red-950/20 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-red-500/15 p-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-red-300">Safety first</p>
                  <h2 className="mt-1 text-xl font-bold text-white">Is the battery swollen?</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                If the battery or laptop case is bulging, the trackpad is lifting, or the battery area is unusually hot, <strong className="text-white">stop using the laptop</strong> and arrange professional inspection.
              </p>
              <a href="#battery-safety" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200">
                Read the safety instructions <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK ANSWER ─── */}
      <section id="quick-answer" className="scroll-mt-20 border-b border-slate-800/80 bg-slate-900/40 px-4 py-10 sm:px-6 sm:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-7 max-w-3xl">
            <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Quick answer</Badge>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">How Do I Know If My Laptop Battery Is Bad?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Watch for a pattern rather than one isolated symptom. Several warning signs together are a much stronger signal that the battery needs attention.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickSigns.map((sign, i) => (
              <div key={sign} className={`rounded-xl border p-4 ${i === 5 || i === 6 ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800 bg-brand-dark/50'}`}>
                <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${i === 5 || i === 6 ? 'bg-red-500/15 text-red-300' : 'bg-cyan-500/10 text-cyan-300'}`}>
                  {i + 1}
                </div>
                <p className="text-xs font-medium leading-5 text-slate-200">{sign}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border-2 border-red-500/30 bg-red-500/10 p-5 sm:flex-row sm:items-center">
            <AlertTriangle className="h-6 w-6 shrink-0 text-red-400" />
            <p className="text-sm leading-6 text-slate-200">
              <strong className="text-red-300">Most important exception:</strong> swelling or deformation is a safety issue, not just a battery-health issue. Stop using the laptop and see the safety section.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BATTERY VS CHARGING SYSTEM ─── */}
      <section id="battery-vs-charging" className="scroll-mt-20 border-t border-slate-900 px-4 py-10 sm:px-6 sm:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-7 max-w-3xl">
            <Badge className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-300">Before replacing anything</Badge>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">Is It Really the Battery? Battery vs. Charger vs. Charging Circuit</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              A laptop that drains quickly may have a worn battery, but charging symptoms can come from the charger, charging port, charging circuit, or motherboard. Use the symptom that best matches what you see before buying a replacement battery.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Battery', text: 'Rapid drain, sharply reduced runtime, unexpected shutdowns, or a health report showing substantial wear can point toward battery degradation.', href: '#check-health', label: 'Review battery health checks' },
              { title: 'Charger or Port', text: 'No charging, intermittent charging, a loose connector, or a charger that works on another device can point toward the external power path.', href: '#battery-vs-charging', label: 'Compare charging symptoms' },
              { title: 'Charging Circuit / Board', text: 'If the correct charger and charging input are good but the laptop still will not charge or power correctly, a board-side fault may be involved.', href: '#battery-vs-charging', label: 'Review the power-path checks' },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-800 bg-brand-dark/40 p-5">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                <Link to={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                  {item.label} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-bold text-white">Voltage Sag Under Load</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                As a lithium-ion cell ages, its effective internal resistance can rise. A sudden CPU/GPU load can then create a larger voltage drop, and the battery controller may shut the system down before the displayed percentage reaches zero. This is one possible explanation for shutdowns at 20–40%, not proof that the battery is the only faulty part.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-bold text-white">Battery-Pack Protection</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                Many smart battery packs monitor cell voltage, current, and temperature and can use protection switches or, in some designs, a fuse to interrupt charge or discharge when a safety limit is crossed. The protection design is model-specific: a reading of 0% while plugged in does not by itself prove that a permanent internal fuse has blown.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-bold text-white">Adapter Identification and USB-C Power</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                Some laptops reduce performance or stop charging when the adapter is not identified or the available wattage is insufficient. On certain Dell systems, an "Unknown" adapter status can be associated with CPU throttling and charging failure. USB-C systems can also be affected by the adapter, cable, port, or power-delivery negotiation. Check the BIOS/diagnostics and input-power path before blaming the battery.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 px-4 sm:px-6 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-white">Symptom \u2192 What It Can Mean \u2192 What To Do</h2>
          </div>
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_1.4fr_1.2fr] bg-slate-900/70 text-[11px] uppercase tracking-wide text-slate-400 font-semibold px-5 py-3">
              <div>Symptom</div>
              <div>What it can mean</div>
              <div>What to do</div>
            </div>
            <div className="divide-y divide-slate-800">
              {symptomTable.map((row) => (
                <div key={row.symptom} className="sm:grid sm:grid-cols-[1fr_1.4fr_1.2fr] p-4 sm:p-5 gap-4">
                  <div className="text-white font-bold text-sm mb-1.5 sm:mb-0">{row.symptom}</div>
                  <div className="text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-0">{row.meaning}</div>
                  <div className="text-cyan-300 text-xs sm:text-sm">{row.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WARNING SIGNS (detailed, 10) ─── */}
      <section id="warning-signs" className="scroll-mt-20 border-t border-slate-900 px-4 py-10 sm:px-6 sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 max-w-3xl">
            <Badge className={`mb-3 border-red-500/30 bg-red-500/10 text-red-300 ${sectionBadge}`}>
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              Warning signs
            </Badge>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">15+ Laptop Battery Warning Signs, Explained Simply</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Scan the cards below. Each one tells you what you may notice, why it happens, and what the sensible next step is.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {warningSigns.map((sign, index) => {
              const Icon = sign.icon;
              const urgent = index === 2 || index === 5 || index === 6 || index === 9;
              return (
                <article key={sign.title} className={`rounded-2xl border p-5 transition hover:border-slate-700 sm:p-6 ${urgent ? 'border-red-500/25 bg-red-500/[0.035]' : 'border-slate-800 bg-brand-dark/40'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`${sign.bgColor} shrink-0 rounded-xl p-3`}>
                      <Icon className={`h-5 w-5 ${sign.color}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sign {String(index + 1).padStart(2, '0')}</span>
                        {urgent && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-300">Pay attention</span>}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-white">{sign.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{sign.description}</p>
                  <ul className="mt-4 space-y-2">
                    {sign.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs leading-5 text-slate-400 sm:text-sm">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${sign.color}`} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {index === 5 && (
                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold leading-5 text-red-200">
                      🚨 Swelling is a safety problem. Do not continue troubleshooting it as if it were a normal battery-wear issue.
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BATTERY HEALTH VS BATTERY LIFE ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">Battery Health vs. Battery Life: What&apos;s the Difference?</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-1.5">Battery Health</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">The actual physical condition and remaining capacity of the battery cell itself — what a Windows or macOS health report measures.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-emerald-300 font-bold text-sm sm:text-base mb-1.5">Battery Life / Runtime</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">How long the laptop actually lasts on one charge right now — affected by workload, brightness, and background activity as much as by the battery.</p>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-4">
            A laptop can have good battery health but poor runtime because of a heavy workload; it can also have degraded health but feel fine under light, casual use. Checking the health report (below) before assuming the battery is bad prevents misdiagnosing a software problem as a hardware one.
          </p>
        </div>
      </section>

      {/* ─── CHECK BATTERY HEALTH: WINDOWS 11 + MACBOOK ─── */}
      <section id="check-health" className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-indigo-500/20 text-indigo-300 border-indigo-500/30 ${sectionBadge}`}>
              <Gauge className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Check Before You Replace
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              How to Check Battery Health
            </h2>
          </div>

          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            {/* Windows 11 */}
            <div id="windows-11" className="p-5 sm:p-7 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0">
                  <Terminal className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Windows 11: Battery Report</h3>
              </div>
              <div className="bg-brand-dark/60 p-4 rounded-xl border border-slate-800/60 mb-4">
                <span className="block text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Steps:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open <strong>Command Prompt</strong> or <strong>Terminal</strong>.</li>
                  <li>Run <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300">powercfg /batteryreport</code>.</li>
                  <li>Open the generated <strong>battery-report.html</strong> file (path shown in the output).</li>
                  <li>Compare <strong>Design Capacity</strong> against <strong>Full Charge Capacity</strong>.</li>
                </ol>
              </div>
              <h4 className="text-white font-semibold text-sm mb-2">How to Read the Report</h4>
              <ul className="space-y-1.5 mb-3">
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Design Capacity</strong> — what the battery was built to hold when new.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Full Charge Capacity</strong> — what it can currently hold.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Capacity history</strong> — shows degradation trend over time.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Recent usage</strong> — useful for spotting unusual drain patterns.</span></li>
              </ul>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Cycle-count reporting varies by device and isn’t always included. As a rough frame: capacity close to design is <strong className="text-emerald-300">healthy</strong>, a noticeable gap is <strong className="text-yellow-300">worth monitoring</strong>, and a large, consistent gap combined with real-world symptoms is <strong className="text-red-300">worth acting on</strong> — there’s no single threshold every manufacturer agrees on.
              </p>
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
                <h4 className="text-sm font-bold text-white">Estimate Remaining Capacity</h4>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">
                  <strong className="text-cyan-300">Battery capacity ratio = (Full Charge Capacity ÷ Design Capacity) × 100.</strong>
                  Use values in the same unit (usually mWh). This is a capacity estimate, not a complete electrical-health test.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[560px] text-right text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-300">
                        <th className="px-3 py-2 font-bold">Capacity ratio</th>
                        <th className="px-3 py-2 font-bold">What it suggests</th>
                        <th className="px-3 py-2 font-bold">Sensible next step</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-400">
                      <tr>
                        <td className="px-3 py-3 font-semibold text-emerald-300">90–100%</td>
                        <td className="px-3 py-3">Capacity is still close to its design figure.</td>
                        <td className="px-3 py-3">If runtime is poor, investigate workload, standby, and background power use before replacing the battery.</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-semibold text-cyan-300">80–89%</td>
                        <td className="px-3 py-3">Some capacity loss is present; the number alone does not prove a fault.</td>
                        <td className="px-3 py-3">Compare with actual runtime, shutdowns, and the manufacturer’s own diagnostic result.</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-semibold text-yellow-300">Below 80%</td>
                        <td className="px-3 py-3">A useful prompt to investigate more substantial wear, but not a universal replacement threshold.</td>
                        <td className="px-3 py-3">Check model-specific service guidance and consider service when reduced runtime, warnings, or instability affect use.</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-semibold text-red-300">Any swelling or deformation</td>
                        <td className="px-3 py-3">A physical safety concern regardless of the reported capacity ratio.</td>
                        <td className="px-3 py-3">Stop using the laptop and follow the battery-safety instructions below.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Cycle-count limits are model-specific. Do not apply one generic 300–500 or 1,000-cycle replacement rule to every Windows laptop or MacBook.
                </p>
              </div>
            </div>

            {/* MacBook */}
            <div id="macbook" className="p-5 sm:p-7 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-slate-500/10 p-2 rounded-lg shrink-0">
                  <Apple className="w-5 h-5 text-slate-300" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">MacBook: Battery Health</h3>
              </div>
              <div className="bg-brand-dark/60 p-4 rounded-xl border border-slate-800/60 mb-4">
                <span className="block text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider mb-2">Steps:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open <strong>System Settings</strong>.</li>
                  <li>Go to <strong>Battery</strong>.</li>
                  <li>Open <strong>Battery Health</strong>.</li>
                </ol>
              </div>
              <ul className="space-y-1.5 mb-3">
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Maximum Capacity</strong> — current capacity as a percentage of original.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Cycle Count</strong> — total full charge cycles used so far.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Condition</strong> — Normal, Service Recommended, or Replace Soon.</span></li>
              </ul>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Exact wording and available detail can differ between macOS versions and Mac models. A "Service Recommended" status means the battery may hold less charge than when new or may not be functioning normally; follow Apple’s service guidance for the exact model.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-brand-dark/60 p-4">
                  <h4 className="text-sm font-bold text-white">Optional macOS Terminal Check</h4>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-cyan-200"><code>pmset -g batt
system_profiler SPPowerDataType</code></pre>
                  <p className="mt-2 text-xs leading-5 text-slate-500">These commands show the current power source and the system’s reported power/battery information. Available fields vary by Mac model and macOS version; use Battery Health in System Settings as the primary user-facing check.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-brand-dark/60 p-4">
                  <h4 className="text-sm font-bold text-white">Linux with UPower</h4>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-cyan-200"><code>upower -e
upower -i /org/freedesktop/UPower/devices/battery_BAT0</code></pre>
                  <p className="mt-2 text-xs leading-5 text-slate-500">First list devices with <code>upower -e</code>, then pass the battery object path shown on your own system to <code>upower -i</code>. The example path may differ, and UPower must be installed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SAFETY WARNING ─── */}
      <section id="battery-safety" className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <Badge className={`bg-red-500/20 text-red-300 border-red-500/30 ${sectionBadge}`}>
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Read This First If Your Battery Is Swollen
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Laptop Battery Safety: What to Do If It Swells
            </h2>
          </div>

          <div className="grid sm:grid-cols-[1fr_1fr] gap-4 sm:gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border border-slate-800 min-h-[16rem]">
              <img
                src={IMAGES.macbook.swollenBattery1.src}
                alt={IMAGES.macbook.swollenBattery1.alt}
                width={IMAGES.macbook.swollenBattery1.width}
                height={IMAGES.macbook.swollenBattery1.height}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/10 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-500/20 p-2 rounded-lg shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Stop using the laptop immediately</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 block">Do</span>
                  <ul className="space-y-1.5">
                    {['Stop using the laptop right away', 'Disconnect external power if safe to do so', 'Keep it away from heat and flammable material', 'Arrange professional inspection and removal', 'Avoid putting pressure on the swollen area'].map(item => (
                      <li key={item} className="flex items-start gap-1.5 text-slate-300 text-xs sm:text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400 mb-1.5 block">Don&apos;t</span>
                  <ul className="space-y-1.5">
                    {['Puncture, squeeze, or bend the battery', 'Keep charging it', 'Attempt amateur disassembly', 'Throw it in normal household waste'].map(item => (
                      <li key={item} className="flex items-start gap-1.5 text-slate-300 text-xs sm:text-sm">
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-6 text-center max-w-2xl mx-auto">
            A swollen lithium-ion battery can be dangerous. Stop using and charging the device, keep it away from heat and combustible materials, and follow the manufacturer's safety and service guidance. Do not puncture, compress or attempt amateur removal.
          </p>
        </div>
      </section>

      {/* ─── BRAND GUIDE ─── */}
      <section id="brand-guide" className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-emerald-500/20 text-emerald-300 border-emerald-500/30 ${sectionBadge}`}>
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Brand-Specific Guidance
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Battery Diagnostics by Brand
            </h2>
          </div>

          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            {brandGuide.map((b) => (
              <div key={b.brand} className="p-4 sm:p-5 sm:grid sm:grid-cols-[110px_1fr] sm:gap-5">
                <div className="text-white font-bold text-sm mb-2 sm:mb-0">{b.brand}</div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-400">
                  <p className="flex gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Diagnostic tool: </span>{b.tool}</span></p>
                  <p className="flex gap-1.5"><Gauge className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Signs: </span>{b.signs}</span></p>
                  <p className="flex gap-1.5"><Wrench className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Replacement: </span>{b.replacement}</span></p>
                  <p className="flex gap-1.5"><Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Safety: </span>{b.safety}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAST DRAIN + OVERNIGHT DRAIN (software troubleshooting) ─── */}
      <section id="fast-drain" className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-indigo-500/20 text-indigo-300 border-indigo-500/30 ${sectionBadge}`}>
              <Moon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Software Troubleshooting
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Fast Drain Doesn&apos;t Always Mean a Bad Battery
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              Before assuming the battery itself is failing, rule out the software causes below — they’re far more common than genuine hardware wear.
            </p>
          </div>

          <div className="border border-slate-800 rounded-2xl p-5 sm:p-7 mb-6 sm:mb-8">
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {fastDrainCauses.map((cause) => (
                <li key={cause} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{cause}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4">
              Degradation becomes the more likely explanation once these are ruled out and the drain is consistent even under light, everyday use.
            </p>
          </div>

          {/* Overnight drain — general framework, not specific product comparisons */}
          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0">
                  <Moon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Why Does My Laptop Lose Battery Overnight?</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Overnight drain is usually explained by how the laptop handles standby, not by the battery itself. Behavior varies by hardware and by how Windows implements power management on that specific model, so treat the following as things to check rather than a universal fix.
              </p>
              <ul className="space-y-1.5">
                {['Sleep vs. Hibernate — Sleep keeps RAM partially powered; Hibernate powers it down fully', 'Modern Standby / Connected Standby can allow network activity to continue in the background', 'Wake timers scheduled by the OS or by installed apps', 'Bluetooth and USB devices that stay active and can wake the system', 'Background app activity and pending updates', 'Network-adapter "wake this device" settings'].map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-300 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
                  <WifiOff className="w-5 h-5 text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Two Settings Worth Checking</h3>
              </div>
              <div className="bg-brand-dark/60 p-4 rounded-xl border border-slate-800/60 mb-4">
                <span className="block text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Set lid-close to Hibernate:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open the Start Menu and type <strong>"Lid"</strong>.</li>
                  <li>Click <strong>"Change what closing the lid does"</strong>.</li>
                  <li>Under "On battery", set it to <strong>"Hibernate"</strong> and save.</li>
                </ol>
              </div>
              <div className="bg-brand-dark/60 p-4 rounded-xl border border-slate-800/60">
                <span className="block text-[10px] sm:text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Review Wi-Fi wake settings (where supported):</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open Start, type <strong>"Device Manager"</strong>.</li>
                  <li>Expand <strong>"Network adapters"</strong>, select your Wi-Fi device.</li>
                  <li>Review the <strong>Power Management</strong> or wake settings if the driver exposes them.</li>
                  <li>Available controls vary by adapter, driver, and Modern Standby implementation.</li>
                </ol>
              </div>
              <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                <h4 className="text-sm font-bold text-white">Windows 11: Check Modern Standby</h4>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">Open Windows Terminal or PowerShell as Administrator. These read-only checks show supported sleep states and whether timers or power requests may be keeping the system active:</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-cyan-200"><code>powercfg /a
powercfg /sleepstudy /output "$env:USERPROFILE\Desktop\sleepstudy.html"
powercfg /waketimers
powercfg /requests</code></pre>
                <p className="mt-2 text-xs leading-6 text-slate-400">SleepStudy is available on Modern Standby-capable systems. Its HTML report summarizes recent sessions, power use, blockers, and the most active components (including a device path when available); it does not identify an exact culprit on every PC. Microsoft’s report covers the last three days by default.</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">If Hibernate is supported but disabled, <code>powercfg /hibernate on</code> enables the Windows hibernation feature. Then choose Hibernate as the lid-close action if that option is available. This does not add sleep states that the hardware or firmware does not support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GENUINE VS COMPATIBLE ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">Genuine vs. Compatible Battery</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-2">Genuine / OEM</h3>
              <ul className="space-y-1.5">
                {['Exact design and specification match', 'Full manufacturer ecosystem support', 'Predictable long-term compatibility'].map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-emerald-300 font-bold text-sm sm:text-base mb-2">High-Quality Compatible</h3>
              <ul className="space-y-1.5">
                {['Wider availability for older models', 'Often more affordable', 'A suitable alternative when specs are properly matched'].map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-4">
            Not every compatible battery is unsafe, and not every genuine battery is necessary — what matters is exact voltage, connector type, correct part/model number, and a reputable, certified manufacturer. Verify those four things regardless of which route you choose.
          </p>
        </div>
      </section>

      {/* ─── SHOULD I REPLACE? DECISION GUIDE ─── */}
      <section id="replace-guide" className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Should I Replace My Battery?</h2>
          </div>
          <div className="space-y-3">
            {decisionSteps.map((step, i) => (
              <div key={step.question} className="border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-slate-500 font-bold text-xs shrink-0">{i + 1}</span>
                  <p className="text-white text-sm sm:text-base font-medium">{step.question}</p>
                </div>
                <a
                  href={step.yes.to}
                  {...(step.yes.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shrink-0 ${toneClasses[step.yes.tone]}`}
                >
                  If yes: {step.yes.label} <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>

          {/* When NOT to replace */}
          <div className="mt-8 sm:mt-10 border border-slate-800 rounded-2xl p-5 sm:p-6">
            <h3 className="text-white font-bold text-base sm:text-lg mb-1">When It Might Not Be the Battery</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-4">A proper diagnosis sometimes finds the real issue elsewhere. Common causes that get mistaken for a bad battery:</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {notReplaceReasons.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── BATTERY CARE (2026) ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className={`bg-cyan-500/20 text-cyan-300 border-cyan-500/30 ${sectionBadge}`}>
              Extend Your Battery Life
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              How to Make a Laptop Battery Last Longer
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6 border-y border-slate-800 py-6 sm:py-8 mb-6 sm:mb-8">
            {careTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-cyan-500/10 p-2 sm:p-2.5 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-0.5">{tip.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-800 p-4 sm:p-5">
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              <strong className="text-slate-200">A note on "20–80% charging" and "calibration":</strong> keeping a battery away from prolonged extreme states can reduce stress, but it isn’t a strict rule every user needs to follow manually — use a manufacturer-supported charge limit where available instead. And letting a battery drain to 0% before recharging doesn’t restore lost capacity; it only recalibrates the OS’s percentage estimate, and only on devices where that’s actually recommended. Treat health and percentage accuracy as two different things.
            </p>
          </div>
        </div>
      </section>

      {/* ─── HEAT & BATTERY AGEING ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
              <Sun className="w-5 h-5 text-orange-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white">Heat, Storage and Battery Ageing</h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
            Elevated ambient temperature increases chemical ageing in lithium-ion cells. Repeated exposure to hot vehicles, direct sunlight, blocked vents or sustained high-load operation can add thermal stress, although temperature alone cannot confirm that a battery has failed.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Store and use the laptop within the manufacturer's specified operating conditions, keep airflow unobstructed, and treat swelling, unusual localized heat or case deformation as a safety issue rather than a normal ageing symptom.
          </p>
        </div>
      </section>

      {/* ─── TECHNICAL REFERENCES ─── */}
      <section id="references" className="scroll-mt-20 border-t border-slate-900 px-4 py-10 sm:px-6 sm:py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Badge className={`mb-3 border-slate-700 bg-slate-900 text-slate-300 ${sectionBadge}`}>Technical references</Badge>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Primary Sources & Manufacturer Guidance</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Battery behavior varies by model. These manufacturer documents and technical references support the Windows, macOS, Linux, power-adapter, battery-protection, and swollen-battery guidance in this article.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a href="https://support.microsoft.com/en-US/Windows/Experience/Power-Battery/caring-for-your-battery-in-windows" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Microsoft Support</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Windows battery care and battery-report guidance.</span>
            </a>
            <a href="https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Microsoft Learn: PowerCfg</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Official syntax for batteryreport, SleepStudy, wake timers, and hibernation.</span>
            </a>
            <a href="https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby-sleepstudy" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Microsoft Learn: SleepStudy</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">How to read Modern Standby sessions, blockers, and top active components.</span>
            </a>
            <a href="https://support.apple.com/en-kw/108376" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Apple Support</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">What Normal and Service Recommended mean for Mac battery health.</span>
            </a>
            <a href="https://www.dell.com/support/kbdoc/en-us/000128491/swollen-battery-information-and-guidance" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Dell Support: Swollen Batteries</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Swelling signs, handling cautions, and professional replacement guidance.</span>
            </a>
            <a href="https://www.dell.com/support/kbdoc/en-us/000125337/identify-ac-adapter-damage-on-dell-systems" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Dell Support: Unknown Adapter</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">How an unrecognized adapter can lead to reduced performance and charging failure on Dell systems.</span>
            </a>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3247723/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Peer-Reviewed Battery Research</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Technical background on internal resistance and voltage drop under load.</span>
            </a>
            <a href="https://www.ti.com/product-category/battery-management-ics/battery-protectors/overview.html" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">Texas Instruments</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Battery-pack protection options, including FET and fuse-based designs.</span>
            </a>
            <a href="https://upower.freedesktop.org/docs/upower.1.html" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-brand-dark/40 p-4 transition hover:border-cyan-500/40">
              <span className="text-sm font-bold text-white">UPower Documentation</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Linux commands for listing and inspecting battery devices.</span>
            </a>
          </div>
        </div>
      </section>

      <StandaloneRelatedLinks
        title="Related battery and laptop troubleshooting guides"
        intro="Continue with the guide that matches the symptom. These resources focus on diagnosis and safe checks rather than local repair offers."
        links={[
          { href: '/guides/laptop-wont-turn-on', label: "Laptop Won't Turn On", description: 'Separate battery, charging, firmware, display and motherboard symptoms when a laptop will not start.' },
          { href: '/guides/why-is-my-laptop-so-hot', label: 'Laptop Overheating', description: 'Understand thermal behaviour, airflow restrictions and temperature-related shutdowns.' },
        ]}
      />

      {/* ─── FAQ ─── */}
      <section id="faq" className="scroll-mt-20 border-t border-slate-900 px-4 py-10 sm:px-6 sm:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Badge className={`mb-3 border-slate-700 bg-slate-900 text-slate-300 ${sectionBadge}`}>
              <HelpCircle className="mr-2 inline h-4 w-4" />
              FAQ
            </Badge>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Laptop Battery Questions, Answered</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">Open the question that matches your problem. The detailed guidance above remains available if you want the full explanation.</p>
          </div>
          <div className="space-y-3">
            {faq.map((item, index) => (
              <details key={item.q} className="group rounded-xl border border-slate-800 bg-brand-dark/40 p-4 open:border-cyan-500/30 open:bg-slate-900/60 sm:p-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-white sm:text-base">
                  <span>{item.q}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-90 group-open:text-cyan-400" />
                </summary>
                <p className="mt-3 pr-8 text-xs leading-6 text-slate-400 sm:text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}      {/* ─── SYMPTOM \u2192 MEANING \u2192 ACTION TABLE ─── */}

