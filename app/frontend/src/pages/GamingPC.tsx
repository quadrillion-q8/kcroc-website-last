import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Zap, Gauge, Thermometer, ExternalLink, ChevronRight, 
  Truck, Snowflake, Activity, ShieldCheck, Clock, Crosshair,
  BarChart4, Search, Settings, CheckCircle2, MessageCircle, Phone, Gamepad2
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA (Frozen for performance)
───────────────────────────────────────────────────────────────────────────── */

const SCENARIOS = Object.freeze([
  { game: "Call of Duty: Warzone / Apex Legends", issue: "Massive 1% low frame drops and stuttering during close-quarters gunfights.", fix: "RAM XMP/EXPO timing optimization, BIOS flash, and aggressive OS debloat.", result: "Locked 144Hz. Zero stutter. Perfect tracking." },
  { game: "Cyberpunk 2077 / Alan Wake 2", issue: "PC thermal throttles and hard-crashes to desktop after 45 minutes of raytracing.", fix: "Repaired burnt motherboard VRM, flushed AIO pump, and applied liquid metal.", result: "8+ hours of continuous, stable gameplay under 70°C." }
]);

const BENCHMARKS = Object.freeze([
  { metric: "CPU Temperature (Core i9 / Ryzen 9 load)", before: "95°C (Severe Throttling)", after: "68°C (Stable Peak)", beforeWidth: "w-full", afterWidth: "w-3/4" },
  { metric: "1% Low FPS (Competitive Shooters)", before: "24 FPS (Micro-stutters)", after: "115 FPS (Buttery Smooth)", beforeWidth: "w-1/4", afterWidth: "w-full" }
]);

const PROCESS_STEPS = Object.freeze([
  { step: "01", icon: Search, title: "Stress Diagnostics", desc: "We run synthetic loads (FurMark, Cinebench) to force your exact crash, artifact, or bottleneck." },
  { step: "02", icon: Thermometer, title: "Thermal Engineering", desc: "Deep cleaning, custom loop flushing, and application of premium thermal paste or liquid metal." },
  { step: "03", icon: Settings, title: "System Optimization", desc: "BIOS updates, aggressive memory timing (XMP/EXPO), and Windows background process debloating." },
  { step: "04", icon: CheckCircle2, title: "Validation Testing", desc: "24-hour burn-in testing to ensure 100% stability. If it doesn't pass, it doesn't leave our lab." }
]);

const FEATURES = Object.freeze([
  { icon: Thermometer, title: 'Thermal Engineering', desc: 'Liquid metal, premium paste application, and push-pull airflow optimization.', outcome: 'Zero thermal throttling under 100% load' },
  { icon: Zap, title: 'FPS & Frame Pacing', desc: 'Deep BIOS tuning, RAM XMP/EXPO profiling, and OS bloatware eradication.', outcome: 'Locked 1% lows & buttery smooth tracking' },
  { icon: Gauge, title: 'Component-Level Repair', desc: 'Advanced diagnostics for artifacting GPUs, VRM overheating, and PSU voltage drops.', outcome: 'Bulletproof hardware stability' },
]);

const SERVICE_CATEGORIES = Object.freeze([
  { title: "Advanced Cooling & Thermals", icon: Snowflake, items: ['Custom liquid cooling loop flushes', 'AIO pump failure replacement', 'GPU repasting & thermal pad upgrades', 'Case airflow & pressure balancing'] },
  { title: "Performance Optimization", icon: Activity, items: ['BIOS updating & extreme tuning', 'DDR4/DDR5 memory overclocking', 'Windows gaming optimization', 'Bottleneck analysis & resolution'] },
  { title: "Hardware Diagnostics", icon: Crosshair, items: ['GPU artifacting & crash recovery', 'PSU power delivery testing', 'Motherboard VRM diagnostics', 'Corrupted SSD data recovery'] }
]);

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function GamingPC() {
  const pageUrl = `${BUSINESS_INFO.url}/gaming-pc-repair-kuwait`;
  const waMessage = encodeURIComponent("Hi KCROC, my gaming PC is experiencing FPS drops/overheating. Please arrange a free diagnostic & pickup in Kuwait.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": "Eliminate FPS Drops & Overheating | Gaming PC Repair Kuwait",
        "url": pageUrl,
        "description": "Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait.",
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": "Advanced Gaming PC Repair & Tuning",
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS_INFO.name,
          "image": BUSINESS_INFO.logo,
          "telephone": BUSINESS_INFO.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ibn Khaldoun St, Basement Shop 19",
            "addressLocality": "Hawalli",
            "addressCountry": "KW"
          }
        },
        "areaServed": "Kuwait",
        "description": "Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gaming PC Services",
          "itemListElement": SERVICE_CATEGORIES.flatMap(cat => cat.items).map((serviceName, idx) => ({
            "@type": "Offer",
            "position": idx + 1,
            "itemOffered": { "@type": "Service", "name": serviceName }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Gaming PC Repair", "item": pageUrl }
        ]
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <Helmet>
        <title>Fix FPS Drops & Overheating | Gaming PC Repair Kuwait | KCROC</title>
        <meta name="description" content="Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait. Free pickup." />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>
      </Helmet>

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Gaming PC Repair</li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        {/* Gaming PC Specific Purple/Cyan Glow */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
        <div className="absolute top-[-20%] left-1/3 w-[400px] h-[400px] bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 px-5 py-2 rounded-full text-purple-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <ShieldCheck size={16} aria-hidden="true" /> Component-Level Diagnostic Lab
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Eliminate FPS Drops,<br className="hidden md:block" /> Overheating & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Crashes.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Stop losing to hardware bottlenecks. We provide elite performance tuning, custom cooling restoration, and advanced motherboard repair to keep your rig running icy and flawless.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-[1.02]">
              Fix My PC Now <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-3 w-full sm:w-auto bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-base transition-all hover:border-purple-500/30">
              <Phone size={20} className="text-purple-400" /> Call Technician
            </a>
          </div>
          <span className="text-sm text-slate-500 font-semibold flex items-center gap-2 justify-center">
            <Clock className="w-4 h-4 text-emerald-500" /> Same-day diagnostic slots available
          </span>
        </div>
      </section>

      {/* ─── REAL GAMER SCENARIOS ─── */}
      <section className="max-w-5xl mx-auto px-6 relative z-10 mb-24">
        <h2 className="text-center text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">Sound Familiar?</h2>
        <h3 className="text-center text-3xl md:text-4xl font-black text-white mb-10 tracking-tight">We Solve Real Gaming Frustrations</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {SCENARIOS.map((scenario, idx) => (
            <div key={idx} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-sm text-slate-500 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                <Gamepad2 size={16} className="text-cyan-400"/> {scenario.game}
              </div>
              <div className="mb-6">
                <span className="text-red-400 font-bold block mb-1">The Issue:</span>
                <p className="text-slate-300 leading-relaxed text-sm">"{scenario.issue}"</p>
              </div>
              <div className="mb-6">
                <span className="text-purple-400 font-bold block mb-1">The KCROC Fix:</span>
                <p className="text-slate-400 leading-relaxed text-sm">{scenario.fix}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <span className="text-emerald-400 font-bold block mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Result:</span>
                <p className="text-emerald-100 font-medium text-sm">{scenario.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENCHMARKS ─── */}
      <section className="max-w-4xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-12">
          <BarChart4 className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">The Performance Difference</h2>
          <p className="text-slate-400">Hard data from actual rigs tuned in our Kuwait lab.</p>
        </div>

        <div className="space-y-8">
          {BENCHMARKS.map((bench, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
              <h3 className="text-white font-bold mb-6 text-lg">{bench.metric}</h3>
              
              <div className="mb-6 relative">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-red-400">
                  <span>Before Tuning</span>
                  <span>{bench.before}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className={`${bench.beforeWidth} bg-red-500 h-full rounded-full`}></div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-emerald-400">
                  <span>After KCROC</span>
                  <span>{bench.after}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className={`${bench.afterWidth} bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS STEPS ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Our 4-Step Engineering Process</h2>
          <p className="text-slate-400">We don't guess. We test, diagnose, fix, and validate.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((proc, idx) => (
            <div key={idx} className="relative p-8 border border-slate-800 rounded-3xl bg-slate-900/30 backdrop-blur-md hover:border-cyan-500/30 transition-colors overflow-hidden">
              <div className="text-7xl font-black text-slate-800/30 absolute -top-4 -right-2 select-none">{proc.step}</div>
              <proc.icon className="w-8 h-8 text-cyan-400 mb-6 relative z-10" />
              <h3 className="text-xl font-black text-white mb-3 relative z-10">{proc.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIZED SERVICES ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Comprehensive Diagnostic Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From complex micro-soldering to extreme overclocking validation.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_CATEGORIES.map((category, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-slate-800 shadow-inner">
                <category.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-6">{category.title}</h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PERFORMANCE FEATURES ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-md hover:border-cyan-500/30 transition-colors h-full flex flex-col">
              <feature.icon className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{feature.desc}</p>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider pt-4 border-t border-slate-800/50 mt-auto">
                Outcome: {feature.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-purple-500/30 text-center shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to Unlock Your PC's True Potential?</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 text-xs md:text-sm text-emerald-400 font-bold tracking-wide uppercase">
            <span className="bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> No Fix, No Fee Guarantee</span>
            <span className="bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50 flex items-center gap-2"><Truck className="w-4 h-4"/> Free Kuwait-Wide Pickup</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-105 flex justify-center items-center gap-2">
              Start Free Diagnostic <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-purple-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Phone size={20} className="text-purple-400" /> Call Technician
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
