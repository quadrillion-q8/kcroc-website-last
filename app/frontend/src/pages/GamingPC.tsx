import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, Gauge, Thermometer, ExternalLink, ChevronRight, 
  Truck, Flame, Snowflake, Activity, ShieldCheck, Clock, Crosshair,
  BarChart4, Search, Settings, CheckCircle2, ChevronDown, ChevronUp, Cpu
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────

const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/gaming-pc-repair-kuwait`;
const BUSINESS_PHONE = "+96555301913";

const SCENARIOS = [
  { game: "Call of Duty: Warzone / Apex Legends", issue: "Massive 1% low frame drops and stuttering during close-quarters gunfights.", fix: "RAM XMP/EXPO timing optimization, BIOS flash, and aggressive OS debloat.", result: "Locked 144Hz. Zero stutter. Perfect tracking." },
  { game: "Cyberpunk 2077 / Alan Wake 2", issue: "PC thermal throttles and hard-crashes to desktop after 45 minutes of raytracing.", fix: "Repaired burnt motherboard VRM, flushed AIO pump, and applied liquid metal.", result: "8+ hours of continuous, stable gameplay under 70°C." }
];

const BENCHMARKS = [
  { metric: "CPU Temperature (Core i9 / Ryzen 9 load)", before: "95°C (Severe Throttling)", after: "68°C (Stable Peak)", beforeWidth: "w-full", afterWidth: "w-3/4" },
  { metric: "1% Low FPS (Competitive Shooters)", before: "24 FPS (Micro-stutters)", after: "115 FPS (Buttery Smooth)", beforeWidth: "w-1/4", afterWidth: "w-full" }
];

const PROCESS_STEPS = [
  { step: "01", icon: Search, title: "Stress Diagnostics", desc: "We run synthetic loads (FurMark, Cinebench) to force your exact crash, artifact, or bottleneck." },
  { step: "02", icon: Thermometer, title: "Thermal Engineering", desc: "Deep cleaning, custom loop flushing, and application of premium thermal paste or liquid metal." },
  { step: "03", icon: Settings, title: "System Optimization", desc: "BIOS updates, aggressive memory timing (XMP/EXPO), and Windows background process debloating." },
  { step: "04", icon: CheckCircle2, title: "Validation Testing", desc: "24-hour burn-in testing to ensure 100% stability. If it doesn't pass, it doesn't leave our lab." }
];

const FEATURES = [
  { icon: Thermometer, title: 'Thermal Engineering', desc: 'Liquid metal, premium paste application, and push-pull airflow optimization.', outcome: 'Zero thermal throttling under 100% load' },
  { icon: Zap, title: 'FPS & Frame Pacing', desc: 'Deep BIOS tuning, RAM XMP/EXPO profiling, and OS bloatware eradication.', outcome: 'Locked 1% lows & buttery smooth tracking' },
  { icon: Gauge, title: 'Component-Level Repair', desc: 'Advanced diagnostics for artifacting GPUs, VRM overheating, and PSU voltage drops.', outcome: 'Bulletproof hardware stability' },
];

const SERVICE_CATEGORIES = [
  { title: "Advanced Cooling & Thermals", icon: Snowflake, items: ['Custom liquid cooling loop flushes', 'AIO pump failure replacement', 'GPU repasting & thermal pad upgrades', 'Case airflow & pressure balancing'] },
  { title: "Performance Optimization", icon: Activity, items: ['BIOS updating & extreme tuning', 'DDR4/DDR5 memory overclocking', 'Windows gaming optimization', 'Bottleneck analysis & resolution'] },
  { title: "Hardware Diagnostics", icon: Crosshair, items: ['GPU artifacting & crash recovery', 'PSU power delivery testing', 'Motherboard VRM diagnostics', 'Corrupted SSD data recovery'] }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    "name": "Eliminate FPS Drops & Overheating | Gaming PC Repair Kuwait",
    "url": PAGE_URL,
    "description": "Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait.",
    "mainEntity": { "@id": `${PAGE_URL}#service` },
    "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    "name": "Advanced Gaming PC Repair & Tuning",
    "provider": { "@type": "LocalBusiness", "@id": `${CANONICAL_URL}/#business` },
    "areaServed": { "@type": "Country", "name": "Kuwait" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Gaming PC Services",
      "itemListElement": SERVICE_CATEGORIES.flatMap(cat => cat.items).map(serviceName => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": serviceName }
      }))
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PAGE_URL}#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": CANONICAL_URL },
      { "@type": "ListItem", "position": 2, "name": "Gaming PC Repair", "item": PAGE_URL }
    ]
  }
];

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function GamingPC() {
  const [showAllServices, setShowAllServices] = useState(false);

  const waMessage = encodeURIComponent("Hi KCROC, my gaming PC is experiencing FPS drops/overheating. Please arrange a free diagnostic & pickup in Kuwait.");
  const waLink = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${waMessage}`;

  return (
    <main id="main-content" className="min-h-screen bg-gray-950 text-white pb-24 md:pb-0 overflow-x-hidden font-sans">
      <Helmet>
        <title>Fix FPS Drops & Overheating | Gaming PC Repair Kuwait | KCROC</title>
        <meta name="description" content="Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait. Free pickup." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fix FPS Drops & Overheating | Gaming PC Repair Kuwait" />
        <meta property="og:description" content="Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait." />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <div className="w-full bg-gray-950 pt-32 pb-4 px-6 border-b border-gray-900 flex justify-center">
        <nav className="w-full max-w-6xl text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link> 
          <span className="mx-2">/</span> 
          <span className="text-gray-300">Gaming PC Repair Kuwait</span>
        </nav>
      </div>

      {/* Authority & Pain-Driven Hero Section */}
      <section className="py-20 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-950 to-gray-950 flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" /> Component-Level Diagnostic Lab
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Eliminate FPS Drops, Overheating & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">System Crashes.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Stop losing to hardware bottlenecks. We provide elite performance tuning, custom cooling restoration, and advanced motherboard repair to keep your rig running icy and flawless.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-6 px-8 rounded-full shadow-lg shadow-purple-900/20 text-lg transition-all w-full sm:w-auto" asChild>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                Fix My PC Now <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <span className="text-sm text-gray-500 font-semibold flex items-center gap-2 justify-center mt-2 sm:mt-0">
              <Clock className="w-4 h-4 text-emerald-500" /> Same-day diagnostic slots available
            </span>
          </div>
        </div>
      </section>

      {/* Real Gamer Scenarios (Micro-Stories) */}
      <section className="py-16 px-6 border-t border-gray-900 flex justify-center bg-gray-900/20">
        <div className="w-full max-w-5xl">
          <h2 className="text-center text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">Sound Familiar?</h2>
          <h3 className="text-center text-3xl font-extrabold text-white mb-10">We Solve Real Gaming Frustrations</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {SCENARIOS.map((scenario, idx) => (
              <div key={idx} className="bg-gray-950 border border-gray-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-cyan-600"></div>
                <div className="text-sm text-gray-500 font-bold mb-4 uppercase tracking-wider">{scenario.game}</div>
                <div className="mb-6">
                  <span className="text-red-400 font-bold block mb-1">The Issue:</span>
                  <p className="text-gray-300 leading-relaxed text-sm">"{scenario.issue}"</p>
                </div>
                <div className="mb-6">
                  <span className="text-purple-400 font-bold block mb-1">The KCROC Fix:</span>
                  <p className="text-gray-400 leading-relaxed text-sm">{scenario.fix}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <span className="text-emerald-400 font-bold block mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Result:</span>
                  <p className="text-emerald-100 font-medium text-sm">{scenario.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Credibility Blocks (Before/After) */}
      <section className="py-20 px-6 border-t border-gray-900 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <BarChart4 className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-4">The Performance Difference</h2>
            <p className="text-gray-400">Hard data from actual rigs tuned in our Kuwait lab.</p>
          </div>

          <div className="space-y-10">
            {BENCHMARKS.map((bench, idx) => (
              <div key={idx} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-white font-bold mb-6">{bench.metric}</h3>
                
                {/* Before Bar */}
                <div className="mb-6 relative">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-red-400">
                    <span>Before Tuning</span>
                    <span>{bench.before}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div className={`${bench.beforeWidth} bg-red-500 h-full rounded-full`}></div>
                  </div>
                </div>

                {/* After Bar */}
                <div className="relative">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-emerald-400">
                    <span>After KCROC</span>
                    <span>{bench.after}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div className={`${bench.afterWidth} bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Engineering Process */}
      <section className="py-20 px-6 border-t border-gray-900 flex justify-center bg-gray-900/30">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Our 4-Step Engineering Process</h2>
            <p className="text-gray-400">We don't guess. We test, diagnose, fix, and validate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((proc, idx) => (
              <div key={idx} className="relative p-6 border border-gray-800 rounded-2xl bg-gray-950">
                <div className="text-6xl font-black text-gray-800/50 absolute top-2 right-4">{proc.step}</div>
                <proc.icon className="w-8 h-8 text-cyan-400 mb-6 relative z-10" />
                <h3 className="text-lg font-bold text-white mb-3 relative z-10">{proc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized Authority Services */}
      <section className="py-20 px-6 border-t border-gray-900 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Comprehensive Diagnostic Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From complex micro-soldering to extreme overclocking validation.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((category, idx) => (
              <div key={idx} className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center mb-6 border border-gray-800">
                  <category.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                <ul className="space-y-4">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Features Grid */}
      <section className="py-16 px-6 border-t border-gray-900 flex justify-center bg-gray-900/20">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-gray-800 bg-gray-950 hover:bg-gray-900/80 transition-all h-full flex flex-col">
                <feature.icon className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{feature.desc}</p>
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider pt-4 border-t border-gray-800/50">
                  Outcome: {feature.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Urgency Trust CTA */}
      <section className="py-24 px-6 text-center border-t border-gray-900 flex justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-950 to-gray-950">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-extrabold text-white mb-8">Ready to Unlock Your PC's True Potential?</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 text-xs md:text-sm text-emerald-400 font-bold tracking-wide uppercase">
            <span className="bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> No Fix, No Fee Guarantee</span>
            <span className="bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50 flex items-center gap-2"><Truck className="w-4 h-4"/> Free Kuwait-Wide Pickup</span>
          </div>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 px-10 rounded-full shadow-lg shadow-emerald-900/20 text-lg transition-all" asChild>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Start Free Diagnostic <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <p className="mt-6 text-gray-500 text-sm font-medium">Average WhatsApp response time: under 15 minutes.</p>
        </div>
      </section>

      {/* Sticky Mobile CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-md border-t border-gray-800 p-4 flex justify-center gap-3 z-50 md:hidden">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-purple-600 py-3 rounded-full text-white font-bold text-center text-sm shadow-lg shadow-purple-900/20">
          WhatsApp Us
        </a>
        <a href={`tel:${BUSINESS_PHONE}`} className="flex-1 bg-gray-800 border border-gray-700 py-3 rounded-full text-white font-bold text-center text-sm">
          Call Now
        </a>
      </div>
    </main>
  );
}
