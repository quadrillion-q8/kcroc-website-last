// File: app/frontend/src/pages/BatteryHealthGuide.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <section className="relative pt-24 pb-8 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-4 sm:space-y-6 mt-8 sm:mt-0">
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
          <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Is your laptop battery draining faster than usual? Learn the critical warning signs that indicate it's time for a replacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-base sm:text-lg px-6 sm:px-8 py-6 font-bold w-full sm:w-auto">
              <a href="#warning-signs">Check the Signs</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto">
              <a href="#brand-guide">Brand-Specific Guide</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardContent className="pt-6 sm:pt-8 text-center p-4 sm:p-6">
                    <div className="flex justify-center mb-2 sm:mb-4">
                      <div className="bg-cyan-500/10 p-3 sm:p-4 rounded-full">
                        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WARNING SIGNS ─── */}
      <section id="warning-signs" className="py-8 sm:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Warning Signs to Watch For
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Recognize These Critical Indicators
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {warningSigns.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${sign.borderColor} backdrop-blur-sm hover:scale-[1.01] transition-transform`}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className={`${sign.bgColor} p-2 sm:p-3 rounded-lg sm:rounded-xl`}>
                        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${sign.color}`} />
                      </div>
                      <CardTitle className="text-base sm:text-xl text-white">{sign.title}</CardTitle>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{sign.description}</p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {sign.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-400 text-[11px] sm:text-sm">
                          <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 ${sign.color} flex-shrink-0 mt-0.5`} />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SAFETY WARNING BOX ─── */}
      <section className="px-4 sm:px-6 pb-8 sm:pb-24">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-red-500/10 border-2 border-red-500/40 backdrop-blur-sm">
            <CardContent className="p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-red-500/20 p-3 sm:p-4 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6 sm:w-10 sm:h-10 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">Safety Warning</h3>
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  If you notice a swollen battery, stop using your laptop immediately and seek professional help.
                  A swollen battery can be dangerous and should be handled by experts. Contact KCROC at{' '}
                  <a href={`tel:+${business.telephone}`} className="text-red-300 font-bold hover:text-red-200 underline">
                    +{business.telephone}
                  </a>{' '}
                  for safe battery removal and replacement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── BRAND GUIDE ─── */}
      <section id="brand-guide" className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Brand-Specific Guidance
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Battery Guide by Brand
            </h2>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {brandGuide.map((b, index) => (
              <Card key={index} className="scroll-row-item w-[85%] sm:w-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-xl text-white mb-2 sm:mb-3">{b.brand}</CardTitle>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex gap-2">
                      <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-400 text-[11px] sm:text-sm leading-snug"><span className="text-slate-300 font-medium">Signs: </span>{b.signs}</p>
                    </div>
                    <div className="flex gap-2">
                      <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-400 text-[11px] sm:text-sm leading-snug"><span className="text-slate-300 font-medium">Replacement: </span>{b.replacement}</p>
                    </div>
                    <div className="flex gap-2">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-400 text-[11px] sm:text-sm leading-snug"><span className="text-slate-300 font-medium">Safety: </span>{b.safety}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOFTWARE TROUBLESHOOTING: OVERNIGHT DRAIN ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/50 border-t border-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Moon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Software Troubleshooting
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Fixing "Overnight" Idle Battery Drain
            </h2>
            <p className="text-slate-300 text-xs sm:text-lg max-w-3xl mx-auto leading-relaxed">
              If your Windows laptop is left untouched overnight, does the battery drop by 5-8%? For many users—especially those with premium devices like the Lenovo Yoga Pro 7i or Yoga Slim Ultra—this idle battery drain is incredibly frustrating when compared to a MacBook Air running Apple Silicon (which typically only loses 3-4%). Before assuming your hardware is failing, try halving your idle drain with these two settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-slate-900 border border-slate-800 shadow-xl">
              <CardHeader className="p-5 sm:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="bg-indigo-500/10 p-2 sm:p-3 rounded-xl shrink-0">
                    <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl text-white">1. Set to Hibernate, Not Sleep</CardTitle>
                </div>
                <p className="text-slate-400 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
                  By default, closing your lid triggers a "Standby Sleep" state. RAM stays partially active, network connections can stay open, and background tasks drain the battery. Hibernation saves your session to the drive and completely powers down the RAM, using almost no power.
                </p>
                <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800/60">
                  <span className="block text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2 sm:mb-3">How to change it:</span>
                  <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-2.5">
                    <li>Open the Start Menu and type <strong>"Lid"</strong>.</li>
                    <li>Click <strong>"Change what closing the lid does"</strong>.</li>
                    <li>Under "On battery", change the dropdown to <strong>"Hibernate"</strong>.</li>
                    <li>Click Save changes.</li>
                  </ol>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900 border border-slate-800 shadow-xl">
              <CardHeader className="p-5 sm:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="bg-orange-500/10 p-2 sm:p-3 rounded-xl shrink-0">
                    <WifiOff className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl text-white">2. Disable Wi-Fi "Magic Packets"</CardTitle>
                </div>
                <p className="text-slate-400 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
                  Another big source of idle drain is your Wi-Fi adapter waking your computer to receive "magic packets" (like automated IT patches). Unless you rely on remote desktop access, disabling this prevents unnecessary network-based wake-ups.
                </p>
                <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800/60">
                  <span className="block text-[10px] sm:text-xs text-orange-400 font-bold uppercase tracking-wider mb-2 sm:mb-3">How to disable it:</span>
                  <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-2.5">
                    <li>Open Start, type <strong>"Device Manager"</strong>.</li>
                    <li>Expand <strong>"Network adapters"</strong> and click your Wi-Fi device.</li>
                    <li>Open <strong>Power Management</strong> tab.</li>
                    <li>Uncheck <strong>"Allow this device to wake the computer"</strong>.</li>
                  </ol>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── PRO TIPS ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Extend Your Battery Life
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Best Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-16">
            {proTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="bg-cyan-500/10 p-2 sm:p-3 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-lg text-white mb-1">{tip.title}</CardTitle>
                    <p className="text-slate-400 text-[11px] sm:text-sm leading-relaxed mb-2">{tip.description}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[9px] sm:text-xs">
                      {tip.frequency}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* When to Replace checklist */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="p-5 sm:p-8">
              <CardTitle className="text-lg sm:text-2xl text-white mb-1">When to Replace Your Battery</CardTitle>
              <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-5">If you've optimized your software settings but are still experiencing multiple signs above, it's time to consider a hardware replacement.</p>
              <ul className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                {replaceChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-[11px] sm:text-sm">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Battery Health FAQ</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-1.5 sm:mb-2 text-xs sm:text-base">{item.q}</h3>
                <p className="text-slate-400 text-[11px] sm:text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA: ACTION CARDS ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Need a New Battery in Kuwait?</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
              Contact us for genuine or high-grade compatible laptop batteries with professional installation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 text-center p-5 sm:p-6">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2 sm:mb-3" />
              <CardTitle className="text-white text-sm sm:text-base mb-1">Check Battery Health</CardTitle>
              <p className="text-slate-400 text-[10px] sm:text-xs mb-3 sm:mb-4">Run a diagnostic to see your current battery status.</p>
              <Button asChild variant="outline" size="sm" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
                <a href={`https://wa.me/${business.telephone}?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer">
                  Run Diagnostic
                </a>
              </Button>
            </Card>
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 text-center p-5 sm:p-6">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mx-auto mb-2 sm:mb-3" />
              <CardTitle className="text-white text-sm sm:text-base mb-1">Find Replacement</CardTitle>
              <p className="text-slate-400 text-[10px] sm:text-xs mb-3 sm:mb-4">Get a genuine or compatible battery for your laptop.</p>
              <Button asChild variant="outline" size="sm" className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10">
                <Link to="/battery-replacement-kuwait">Find Battery</Link>
              </Button>
            </Card>
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 text-center p-5 sm:p-6">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto mb-2 sm:mb-3" />
              <CardTitle className="text-white text-sm sm:text-base mb-1">Get Expert Help</CardTitle>
              <p className="text-slate-400 text-[10px] sm:text-xs mb-3 sm:mb-4">Contact our support team for assistance.</p>
              <Button asChild variant="outline" size="sm" className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold w-full sm:w-auto">
              <a href={`tel:+${business.telephone}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Call: +{business.telephone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 w-full sm:w-auto">
              <a href={`https://wa.me/${business.telephone}?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 p-6 sm:p-12 rounded-3xl backdrop-blur-sm">
          <h3 className="text-xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Your Battery Replaced?
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black w-full sm:w-auto">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 w-full sm:w-auto">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
