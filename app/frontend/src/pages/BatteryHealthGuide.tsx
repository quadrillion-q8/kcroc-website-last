// File: app/frontend/src/pages/BatteryHealthGuide.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Battery, BatteryWarning, Thermometer, AlertTriangle, CheckCircle2, XCircle,
  Phone, MessageCircle, Zap, Clock, Gauge, RefreshCw, Shield,
  Stethoscope, Wrench, HelpCircle, Moon, WifiOff, Terminal, Apple,
  ChevronRight, Sun, PowerOff, TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import { IMAGES } from '../constants/images';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;
const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent('I need a laptop battery replacement in Kuwait')}`;

// Shared section wrapper styles keep every block visually consistent —
// bordered container, divided rows — matching the rest of the page.
const sectionBadge =
  'px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4';

// ── STATIC CONTENT (module scope: none of this depends on props/state,
// so it's defined once rather than re-created on every render) ──

// QUICK ANSWER: the 10 signs, for the featured-snippet-style intro
const quickSigns = [
  'Battery drains far faster than it used to',
  'Runtime has dropped dramatically from what it used to be',
  'Laptop shuts down unexpectedly, even showing charge left',
  "Battery won't charge, or charges inconsistently",
  'Battery percentage jumps, freezes, or behaves erratically',
  'Battery or case is visibly swollen or deformed',
  'Excessive heat specifically from the battery area',
  'Battery health/wear report shows severe degradation',
  'Windows or macOS shows a battery health warning',
  'Laptop becomes unstable or slows down only on battery power'
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

// 10 WARNING SIGNS (expanded, detailed)
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
      'Worth comparing against this laptop\u2019s own history, not a generic number'
    ]
  },
  {
    title: 'Runtime Has Become Very Short',
    description: 'This is distinct from a sudden drop — it\u2019s a gradual decline in how long the laptop lasts on a full charge compared to when it was new.',
    icon: Clock,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    points: [
      'Compare current runtime to this specific laptop\u2019s original runtime',
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
      'Reported percentage becomes unreliable once the battery can\u2019t sustain load',
      'Often happens under a sudden CPU/GPU demand spike',
      'A hardware sign worth taking seriously, especially if repeated',
      'Run a battery diagnostic rather than guessing'
    ]
  },
  {
    title: "Battery Won't Charge Properly",
    description: 'Charging stalls, stops early, or never starts — but the battery isn\u2019t automatically the cause.',
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
    description: 'The reported charge level doesn\u2019t match reality — a software or calibration symptom as often as a hardware one.',
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
      'A single percentage isn\u2019t an automatic verdict — read it in context'
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
    description: 'The laptop runs fine plugged in, but freezes, restarts, or throttles heavily as soon as it\u2019s unplugged.',
    icon: RefreshCw,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    points: [
      'A sign the battery can\u2019t deliver stable power under real load',
      'Different from simple short runtime — this is about stability, not duration',
      'Can also point to a power-delivery fault rather than the battery itself',
      'Worth a proper diagnosis rather than replacing the battery on a guess'
    ]
  }
];

const brandGuide = [
  {
    brand: 'Dell',
    tool: 'Dell SupportAssist / BIOS diagnostics',
    signs: 'BIOS battery warnings and error codes (601\u2013607 range) at boot.',
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
  { title: 'Avoid Extreme Heat', description: "Heat accelerates lithium-ion degradation faster than almost anything else — especially relevant in Kuwait's climate.", icon: Thermometer },
  { title: 'Use Manufacturer Charge Limits', description: 'Many laptops now offer built-in charge-limiting or "optimized charging" — prefer these over manual habits.', icon: Battery },
  { title: 'Use the Original or Certified Charger', description: 'Mismatched chargers can affect charging behavior and, over time, battery condition.', icon: Zap },
  { title: 'Avoid Routine Deep Discharge', description: "Regularly draining to 0% isn't a maintenance step — it adds stress with no health benefit for modern batteries.", icon: RefreshCw },
  { title: 'Keep Firmware and OS Updated', description: 'Manufacturers periodically improve battery-management and power algorithms through updates.', icon: Shield },
  { title: "Don't Store at Full or Empty Charge", description: 'If storing a laptop for a long period, a mid-range charge (roughly 40\u201360%) is gentler than 0% or 100%.', icon: Battery }
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
    yes: { label: 'Get a battery/power diagnosis', tone: 'warn', to: WA_LINK, external: true }
  },
  {
    question: 'Has runtime dramatically decreased?',
    yes: { label: 'Check the battery health report', tone: 'warn', to: '#check-health' }
  },
  {
    question: 'Does the health report show severe wear?',
    yes: { label: 'Replacement is likely appropriate', tone: 'action', to: '/battery-replacement-kuwait' }
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
    a: 'There\u2019s no single universal threshold across brands and models. As a general guide, health well below 80% combined with real-world symptoms (short runtime, shutdowns) is a reasonable point to consider replacement — treat it as one input, not a strict rule.'
  },
  {
    q: 'How many years does a laptop battery last?',
    a: "It varies with chemistry, charge cycles, heat exposure, and charging habits — commonly somewhere in the 2\u20134 year range for typical daily use, but a well-cared-for battery can last longer and a poorly treated one can degrade faster."
  },
  {
    q: 'How many charge cycles does a laptop battery have?',
    a: 'Most modern laptop batteries are rated for roughly 300\u2013500 full cycles before capacity drops meaningfully, though this varies by manufacturer and cell chemistry. A "cycle" is one full discharge, not necessarily one charging session.'
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
    a: 'Could be the charger, the cable, the port, the internal charging circuit, or the battery itself. Test with a known-good charger first; if that doesn\u2019t help, it needs a proper diagnosis rather than a battery swap on a guess.'
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
    a: 'Yes. Modern laptops route power directly to components when plugged in, largely bypassing the battery, so this doesn\u2019t meaningfully add wear.'
  },
  {
    q: 'Is a compatible (non-original) laptop battery safe?',
    a: 'A high-quality compatible battery from a reputable manufacturer, matched exactly to voltage, connector, and certification, is generally safe. Not every third-party battery meets that bar, so sourcing matters more than the genuine-vs-compatible label alone.'
  },
  {
    q: 'How long does laptop battery replacement take?',
    a: 'For most laptops in Kuwait, 1\u20132 hours if the correct battery is in stock. Some MacBook models take 1\u20132 days due to adhesive removal and calibration.'
  }
];

const toc = [
  { id: 'check-health', label: 'Check Battery Health' },
  { id: 'warning-signs', label: 'Warning Signs' },
  { id: 'windows-11', label: 'Windows 11' },
  { id: 'macbook', label: 'MacBook' },
  { id: 'battery-safety', label: 'Battery Safety' },
  { id: 'brand-guide', label: 'Brand Guide' },
  { id: 'fast-drain', label: 'Fast Drain' },
  { id: 'replace-guide', label: 'Should I Replace?' },
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
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">

      {/* Dynamic SEO Engine Integration */}
      <SEOEngine entityId="guide-battery" />

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
                  Know What to Do Next
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                Learn the 10 warning signs of a failing laptop battery, check its health on Windows 11 or MacBook, and quickly tell the difference between a battery problem and a software or charging problem.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="w-full bg-cyan-500 px-6 py-6 font-bold text-slate-950 hover:bg-cyan-400 sm:w-auto">
                  <a href="#quick-answer">Start With the Quick Check</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full border-slate-700 px-6 py-6 text-slate-200 hover:bg-slate-800 sm:w-auto">
                  <a href="#check-health">Check Battery Health</a>
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
              <div key={sign} className={`rounded-xl border p-4 ${i === 5 || i === 6 ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800 bg-slate-950/50'}`}>
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

      {/* ─── SYMPTOM \u2192 MEANING \u2192 ACTION TABLE ─── */}
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
            <h2 className="text-2xl font-bold text-white sm:text-4xl">10 Battery Warning Signs, Explained Simply</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Scan the cards below. Each one tells you what you may notice, why it happens, and what the sensible next step is.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {warningSigns.map((sign, index) => {
              const Icon = sign.icon;
              const urgent = index === 2 || index === 5 || index === 6 || index === 9;
              return (
                <article key={sign.title} className={`rounded-2xl border p-5 transition hover:border-slate-700 sm:p-6 ${urgent ? 'border-red-500/25 bg-red-500/[0.035]' : 'border-slate-800 bg-slate-950/40'}`}>
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
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">The actual physical condition and remaining capacity of the battery cell itself \u2014 what a Windows or macOS health report measures.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-emerald-300 font-bold text-sm sm:text-base mb-1.5">Battery Life / Runtime</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">How long the laptop actually lasts on one charge right now \u2014 affected by workload, brightness, and background activity as much as by the battery.</p>
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
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 mb-4">
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
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Design Capacity</strong> \u2014 what the battery was built to hold when new.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Full Charge Capacity</strong> \u2014 what it can currently hold.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Capacity history</strong> \u2014 shows degradation trend over time.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Recent usage</strong> \u2014 useful for spotting unusual drain patterns.</span></li>
              </ul>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Cycle-count reporting varies by device and isn\u2019t always included. As a rough frame: capacity close to design is <strong className="text-emerald-300">healthy</strong>, a noticeable gap is <strong className="text-yellow-300">worth monitoring</strong>, and a large, consistent gap combined with real-world symptoms is <strong className="text-red-300">worth acting on</strong> \u2014 there\u2019s no single threshold every manufacturer agrees on.
              </p>
            </div>

            {/* MacBook */}
            <div id="macbook" className="p-5 sm:p-7 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-slate-500/10 p-2 rounded-lg shrink-0">
                  <Apple className="w-5 h-5 text-slate-300" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">MacBook: Battery Health</h3>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 mb-4">
                <span className="block text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider mb-2">Steps:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open <strong>System Settings</strong>.</li>
                  <li>Go to <strong>Battery</strong>.</li>
                  <li>Open <strong>Battery Health</strong>.</li>
                </ol>
              </div>
              <ul className="space-y-1.5 mb-3">
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Maximum Capacity</strong> \u2014 current capacity as a percentage of original.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Cycle Count</strong> \u2014 total full charge cycles used so far.</span></li>
                <li className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm"><CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="text-slate-300">Condition</strong> \u2014 Normal, Service Recommended, or Replace Soon.</span></li>
              </ul>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Exact wording and available detail can differ between macOS versions and Mac models. A "Service Recommended" or "Replace Soon" status is Apple\u2019s own signal that capacity has dropped enough to matter \u2014 treat it as reliable.
              </p>
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
            Contact KCROC at{' '}
            <a href={`tel:+${business.telephone}`} className="text-red-300 font-bold hover:text-red-200 underline">
              +{business.telephone}
            </a>{' '}
            for safe battery removal and replacement. A swollen battery can be dangerous and should always be handled by professionals.
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
              Before assuming the battery itself is failing, rule out the software causes below \u2014 they\u2019re far more common than genuine hardware wear.
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
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 mb-4">
                <span className="block text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Set lid-close to Hibernate:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open the Start Menu and type <strong>"Lid"</strong>.</li>
                  <li>Click <strong>"Change what closing the lid does"</strong>.</li>
                  <li>Under "On battery", set it to <strong>"Hibernate"</strong> and save.</li>
                </ol>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
                <span className="block text-[10px] sm:text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Disable Wi-Fi wake-on-LAN:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open Start, type <strong>"Device Manager"</strong>.</li>
                  <li>Expand <strong>"Network adapters"</strong>, select your Wi-Fi device.</li>
                  <li>Open the <strong>Power Management</strong> tab.</li>
                  <li>Uncheck <strong>"Allow this device to wake the computer"</strong>.</li>
                </ol>
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
            Not every compatible battery is unsafe, and not every genuine battery is necessary \u2014 what matters is exact voltage, connector type, correct part/model number, and a reputable, certified manufacturer. Verify those four things regardless of which route you choose.
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
            <p className="mt-4 text-slate-400 text-xs sm:text-sm">
              If the cause turns out to be a charging port, motherboard power circuit, or another hardware fault rather than the battery itself, our{' '}
              <Link to="/laptop-repair-kuwait" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2">
                laptop repair service in Kuwait
              </Link>{' '}
              covers diagnosis and repair for those faults too — with the same free pickup and 30-day warranty.
            </p>
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
              <strong className="text-slate-200">A note on "20\u201380% charging" and "calibration":</strong> keeping a battery away from prolonged extreme states can reduce stress, but it isn\u2019t a strict rule every user needs to follow manually \u2014 use a manufacturer-supported charge limit where available instead. And letting a battery drain to 0% before recharging doesn\u2019t restore lost capacity; it only recalibrates the OS\u2019s percentage estimate, and only on devices where that\u2019s actually recommended. Treat health and percentage accuracy as two different things.
            </p>
          </div>
        </div>
      </section>

      {/* ─── KUWAIT HEAT ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
              <Sun className="w-5 h-5 text-orange-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white">Laptop Batteries in Kuwait&apos;s Heat</h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
            High ambient temperatures put extra thermal stress on lithium-ion cells \u2014 particularly relevant locally, where laptops are often left in parked cars, used near direct sunlight, or run gaming workloads in poorly ventilated rooms. Heat is one of several factors that accelerate degradation, alongside cycle count and charging habits; Kuwait\u2019s climate doesn\u2019t on its own guarantee battery failure, but it does make good thermal habits worth taking seriously.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            As a Kuwait-based repair shop, KCROC sees this pattern often enough that it\u2019s worth calling out \u2014 avoiding car storage, direct sun, and dust buildup around vents goes a long way.
          </p>
        </div>
      </section>

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
              <details key={item.q} className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 open:border-cyan-500/30 open:bg-slate-900/60 sm:p-5" open={index === 0}>
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

      {/* ─── FINAL CTA ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Need a New Battery in Kuwait?</h2>
          <p className="text-slate-300 text-xs sm:text-base mb-6 sm:mb-8">
            Not sure whether the battery is actually failing? We diagnose before we replace \u2014 genuine or high-grade compatible batteries with professional installation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors"
            >
              <Stethoscope className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Run Diagnostic</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Check battery health</span>
            </a>
            <Link
              to="/battery-replacement-kuwait"
              className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors"
            >
              <Battery className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Find Replacement</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Genuine or compatible</span>
            </Link>
            <Link
              to="/contact"
              className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-orange-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Get Expert Help</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Talk to support</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold w-full sm:w-auto">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                WhatsApp Us
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-200 hover:bg-slate-800/60 w-full sm:w-auto">
              <a href={`tel:+${business.telephone}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                Call: +{business.telephone}
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 sm:mt-8 text-xs sm:text-sm">
            <Link to="/battery-replacement-kuwait" className="text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1.5 transition-colors">
              Laptop Battery Replacement Kuwait
            </Link>
            <Link to="/laptop-repair-kuwait" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Laptop Repair Kuwait
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
    </div>
  );
}
