// File: app/frontend/src/pages/BatteryHealthGuide.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Battery, BatteryWarning, Thermometer, AlertTriangle, CheckCircle2,
  Phone, MessageCircle, Zap, Clock, Gauge, RefreshCw, Shield,
  Stethoscope, Wrench, HelpCircle, Moon, WifiOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;
const WA_TEXT = encodeURIComponent('I need a laptop battery replacement in Kuwait');

export default function BatteryHealthGuide() {
  const statistics = [
    { value: '2-4', label: 'Years Average Battery Life', icon: Clock, color: 'text-cyan-400' },
    { value: '300-500', label: 'Charge Cycles Expected', icon: RefreshCw, color: 'text-emerald-400' },
    { value: '80%', label: 'Capacity After 2 Years', icon: Gauge, color: 'text-orange-400' }
  ];

  const warningSigns = [
    {
      title: 'Rapid Battery Drain',
      description: 'Your laptop battery depletes much faster than it used to, even with minimal usage.',
      icon: BatteryWarning,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      points: [
        'Battery percentage drops rapidly within minutes',
        'Full charge lasts only 1-2 hours instead of 4-6 hours',
        'Battery drains even when laptop is in sleep mode',
        'Inconsistent battery percentage readings'
      ]
    },
    {
      title: 'Overheating Issues',
      description: 'The laptop becomes unusually hot, especially around the battery area, during normal use.',
      icon: Thermometer,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      points: [
        'Excessive heat from the bottom of the laptop',
        'Fan runs constantly at high speed',
        'Uncomfortable to use on your lap due to heat',
        'System performance throttles due to thermal issues'
      ]
    },
    {
      title: 'Physical Swelling',
      description: 'The battery or laptop case shows signs of physical deformation or bulging.',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/40',
      points: [
        'Visible bulge on the bottom of the laptop',
        'Trackpad becomes raised or difficult to click',
        'Gaps appearing between laptop panels',
        'Keyboard feels uneven or raised in certain areas'
      ]
    },
    {
      title: 'Charging Problems',
      description: 'Inconsistent charging behavior or failure to charge properly despite being plugged in.',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      points: [
        'Battery charges very slowly or not at all',
        'Charging stops at random percentages',
        'Charger needs repositioning frequently to work',
        'Battery percentage fluctuates while plugged in'
      ]
    },
    {
      title: 'Age and Cycle Count',
      description: 'Your laptop battery has exceeded its expected lifespan or charge cycle limit.',
      icon: Clock,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      points: [
        'Battery is more than 2-3 years old',
        'Exceeded 300-500 charge cycles (check system settings)',
        'Battery health report shows less than 80% capacity',
        'Manufacturer warranty has expired'
      ]
    }
  ];

  const brandGuide = [
    {
      brand: 'Dell',
      signs: 'BIOS battery warnings. Look for error codes 601-607.',
      replacement: 'Genuine or high-quality compatible, matching voltage (11.1V or 14.8V typical).',
      safety: 'Compatible batteries from reputable brands are safe if specs match exactly.'
    },
    {
      brand: 'HP',
      signs: 'HP Battery Check shows "Replace Battery." System may throttle performance.',
      replacement: 'HP batteries have specific part numbers — match the exact model.',
      safety: 'Third-party HP batteries are safe if certified and spec-matched.'
    },
    {
      brand: 'Lenovo',
      signs: 'Lenovo Vantage shows health below 80% or "Consider replacing battery."',
      replacement: 'Specific connectors — ensure exact model match for ThinkPad/IdeaPad.',
      safety: 'Compatible batteries are safe; verify connector type and voltage match.'
    },
    {
      brand: 'Acer',
      signs: 'Acer Care Center shows wear level. Rapid drain and charging issues common.',
      replacement: 'Varies by series (Aspire, Predator, Swift) — match exact part number.',
      safety: 'Quality compatible batteries are safe with proper voltage matching.'
    },
    {
      brand: 'ASUS',
      signs: 'MyASUS shows battery health. ROG models may show performance throttling.',
      replacement: 'Consumer and ROG gaming series differ — verify exact model.',
      safety: 'Compatible batteries are safe if they meet original specs and certifications.'
    },
    {
      brand: 'MacBook',
      signs: 'macOS shows "Service Battery" or "Replace Soon." Trackpad may raise.',
      replacement: 'Requires professional installation. Genuine Apple batteries recommended.',
      safety: 'Third-party batteries can be risky — genuine Apple strongly recommended.'
    }
  ];

  const proTips = [
    { title: 'Keep It Cool', description: "Avoid extreme temperatures — heat is the enemy of battery longevity in Kuwait's climate.", icon: Thermometer, frequency: 'Always' },
    { title: 'Optimal Charging', description: 'Keep battery level between 20-80% for daily use rather than leaving it at 100%.', icon: Battery, frequency: 'Daily' },
    { title: 'Use Original Chargers', description: 'Manufacturer-approved chargers prevent damage and ensure proper charging cycles.', icon: Zap, frequency: 'Always' },
    { title: 'Regular Calibration', description: 'Let the battery drain to 0% then charge to 100% to calibrate the battery meter.', icon: RefreshCw, frequency: 'Monthly' }
  ];

  const faq = [
    {
      q: 'How do I check my laptop battery health?',
      a: 'On Windows: run "powercfg /batteryreport" in Command Prompt. On macOS: hold Option and click the battery icon. Most brands also have dedicated battery health utilities.'
    },
    {
      q: 'Should I keep my laptop plugged in all the time?',
      a: 'No. Keeping the battery at 100% constantly accelerates degradation. It\'s best to keep charge between 20-80% for daily use.'
    },
    {
      q: 'Can I use my laptop while charging?',
      a: 'Yes, it\'s safe. Modern laptops route power directly to components when plugged in, bypassing the battery to reduce wear.'
    },
    {
      q: 'Are compatible/non-original batteries safe?',
      a: 'High-quality compatible batteries from reputable manufacturers are generally safe if they match original specifications. Always verify certifications and buy from trusted sources.'
    },
    {
      q: 'How long does battery replacement take?',
      a: 'For most laptops in Kuwait, replacement takes 1-2 hours if the battery is in stock. Some MacBook models require 1-2 days due to adhesive removal and calibration.'
    }
  ];

  const replaceChecklist = [
    'Battery health drops below 80% capacity',
    'Laptop is more than 2-3 years old with heavy use',
    'Physical deformation or swelling is visible',
    'Battery runtime is less than 50% of original capacity'
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">

      {/* Dynamic SEO Engine Integration */}
      <SEOEngine entityId="guide-battery" />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-24 pb-8 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-4 sm:space-y-5 mt-8 sm:mt-0">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
            <Battery className="w-4 h-4 mr-2 inline" />
            Battery Health Guide
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            5 Signs Your Laptop Battery<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Needs Replacement
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Is your laptop battery draining faster than usual? Learn the critical warning signs that indicate it's time for a replacement.
          </p>

          {/* Compact stat row — replaces 3 separate stat cards */}
          <div className="grid grid-cols-3 divide-x divide-slate-800 border-y border-slate-800/80 max-w-lg mx-auto pt-2">
            {statistics.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="py-4 sm:py-5 px-2">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 ${stat.color}`} aria-hidden="true" />
                  <div className="text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wide leading-tight mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-base px-6 sm:px-8 py-6 font-bold w-full sm:w-auto">
              <a href="#warning-signs">Check the Signs</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 text-base px-6 sm:px-8 py-6 w-full sm:w-auto">
              <a href="#brand-guide">Brand-Specific Guide</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── WARNING SIGNS ─── */}
      <section id="warning-signs" className="py-8 sm:py-20 px-4 sm:px-6 scroll-mt-20 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Warning Signs to Watch For
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Recognize These Critical Indicators
            </h2>
          </div>

          {/* One bordered container, rows divided by hairlines — replaces 5 separate cards */}
          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            {warningSigns.map((sign) => {
              const Icon = sign.icon;
              return (
                <div key={sign.title} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <div className="flex items-center gap-3 sm:w-52 shrink-0">
                    <div className={`${sign.bgColor} p-2 sm:p-2.5 rounded-lg shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${sign.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-bold text-sm sm:text-base">{sign.title}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">{sign.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {sign.points.map((point) => (
                        <li key={point} className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm">
                          <CheckCircle2 className={`w-3 h-3 ${sign.color} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety warning — a single, deliberately strong callout */}
          <div className="mt-6 sm:mt-8 rounded-2xl border-2 border-red-500/40 bg-red-500/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <div className="bg-red-500/20 p-2.5 sm:p-3 rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Safety Warning</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                If you notice a swollen battery, stop using your laptop immediately and seek professional help.
                A swollen battery can be dangerous and should be handled by experts. Contact KCROC at{' '}
                <a href={`tel:+${business.telephone}`} className="text-red-300 font-bold hover:text-red-200 underline">
                  +{business.telephone}
                </a>{' '}
                for safe battery removal and replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND GUIDE ─── */}
      <section id="brand-guide" className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Brand-Specific Guidance
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Battery Guide by Brand
            </h2>
          </div>

          {/* Compact comparison list — replaces the 6-card horizontal-scroll carousel */}
          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            {brandGuide.map((b) => (
              <div key={b.brand} className="p-4 sm:p-5 sm:grid sm:grid-cols-[110px_1fr] sm:gap-5">
                <div className="text-white font-bold text-sm mb-2 sm:mb-0">{b.brand}</div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-400">
                  <p className="flex gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Signs: </span>{b.signs}</span></p>
                  <p className="flex gap-1.5"><Wrench className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Replacement: </span>{b.replacement}</span></p>
                  <p className="flex gap-1.5"><Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" /><span><span className="text-slate-300 font-medium">Safety: </span>{b.safety}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOFTWARE TROUBLESHOOTING: OVERNIGHT DRAIN ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Moon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Software Troubleshooting
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Fixing "Overnight" Idle Battery Drain
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              If your Windows laptop is left untouched overnight, does the battery drop by 5-8%? For many users—especially those with premium devices like the Lenovo Yoga Pro 7i or Yoga Slim Ultra—this idle battery drain is incredibly frustrating when compared to a MacBook Air running Apple Silicon (which typically only loses 3-4%). Before assuming your hardware is failing, try halving your idle drain with these two settings.
            </p>
          </div>

          {/* Two numbered steps in one container — replaces two large side-by-side cards */}
          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0">
                  <Moon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">1. Set to Hibernate, Not Sleep</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                By default, closing your lid triggers a "Standby Sleep" state. RAM stays partially active, network connections can stay open, and background tasks drain the battery. Hibernation saves your session to the drive and completely powers down the RAM, using almost no power.
              </p>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
                <span className="block text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">How to change it:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open the Start Menu and type <strong>"Lid"</strong>.</li>
                  <li>Click <strong>"Change what closing the lid does"</strong>.</li>
                  <li>Under "On battery", change the dropdown to <strong>"Hibernate"</strong>.</li>
                  <li>Click Save changes.</li>
                </ol>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
                  <WifiOff className="w-5 h-5 text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">2. Disable Wi-Fi "Magic Packets"</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Another big source of idle drain is your Wi-Fi adapter waking your computer to receive "magic packets" (like automated IT patches). Unless you rely on remote desktop access, disabling this prevents unnecessary network-based wake-ups.
              </p>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
                <span className="block text-[10px] sm:text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">How to disable it:</span>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2">
                  <li>Open Start, type <strong>"Device Manager"</strong>.</li>
                  <li>Expand <strong>"Network adapters"</strong> and click your Wi-Fi device.</li>
                  <li>Open <strong>Power Management</strong> tab.</li>
                  <li>Uncheck <strong>"Allow this device to wake the computer"</strong>.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRO TIPS ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Extend Your Battery Life
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Best Practices
            </h2>
          </div>

          {/* Icon-row list — replaces 4 gradient cards */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6 border-y border-slate-800 py-6 sm:py-8">
            {proTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-cyan-500/10 p-2 sm:p-2.5 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-white font-bold text-sm sm:text-base">{tip.title}</h3>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">{tip.frequency}</span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* When to Replace checklist — plain list, no card wrapper */}
          <div className="mt-8 sm:mt-10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">When to Replace Your Battery</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-4">If you've optimized your software settings but are still experiencing multiple signs above, it's time to consider a hardware replacement.</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {replaceChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Battery Health FAQ</h2>
          </div>
          {/* Divided list instead of a bordered box per question */}
          <div className="divide-y divide-slate-800 border-t border-b border-slate-800">
            {faq.map((item) => (
              <div key={item.q} className="py-4 sm:py-5">
                <h3 className="text-white font-bold mb-1 text-xs sm:text-base">{item.q}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      {/* Restored: the review flagged that the "Run Diagnostic" WhatsApp CTA had
          been dropped in favor of footer links only. It's kept here as the
          three-action row (Run Diagnostic / Find Replacement / Get Expert
          Help), still in the new compact style, above the primary
          WhatsApp/Call buttons. */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Need a New Battery in Kuwait?</h2>
          <p className="text-slate-300 text-xs sm:text-base mb-6 sm:mb-8">
            Contact us for genuine or high-grade compatible laptop batteries with professional installation.
          </p>

          {/* Three quick actions — compact row instead of the old full-size cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <a
              href={`https://wa.me/${business.telephone}?text=${WA_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors"
            >
              <Stethoscope className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Run Diagnostic</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Check battery health</span>
            </a>
            <Link
              to="/battery-replacement"
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
                href={`https://wa.me/${business.telephone}?text=${WA_TEXT}`}
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
            <Link to="/services" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
