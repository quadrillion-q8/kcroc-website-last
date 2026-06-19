import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Gauge, Thermometer, ExternalLink,
  Snowflake, Activity, ShieldCheck, Crosshair,
  Search, Settings, CheckCircle2, MessageCircle, Phone
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/gaming-pc-repair-kuwait`;

const SCENARIOS = Object.freeze([
  {
    game: "Call of Duty: Warzone / Apex Legends",
    issue: "Massive 1% low frame drops and stuttering during close-quarters gunfights.",
    fix: "RAM XMP/EXPO timing optimization, BIOS flash, and aggressive OS debloat.",
    result: "Locked 144Hz. Zero stutter. Perfect tracking."
  },
  {
    game: "Cyberpunk 2077 / Alan Wake 2",
    issue: "PC thermal throttles and hard-crashes to desktop after 45 minutes of raytracing.",
    fix: "Repaired burnt motherboard VRM, flushed AIO pump, and applied liquid metal.",
    result: "8+ hours of continuous, stable gameplay under 70°C."
  }
]);

const BENCHMARKS = Object.freeze([
  {
    metric: "CPU Temperature (Core i9 / Ryzen 9 load)",
    before: "95°C (Severe Throttling)",
    after: "68°C (Stable Peak)",
    beforeWidth: "w-full",
    afterWidth: "w-3/4"
  },
  {
    metric: "1% Low FPS (Competitive Shooters)",
    before: "24 FPS (Micro-stutters)",
    after: "115 FPS (Buttery Smooth)",
    beforeWidth: "w-1/4",
    afterWidth: "w-full"
  }
]);

const PROCESS_STEPS = Object.freeze([
  { step: "01", icon: Search,       title: "Stress Diagnostics",    desc: "We run synthetic loads (FurMark, Cinebench) to force your exact crash, artifact, or bottleneck." },
  { step: "02", icon: Thermometer,  title: "Thermal Engineering",   desc: "Deep cleaning, custom loop flushing, and application of premium thermal paste or liquid metal." },
  { step: "03", icon: Settings,     title: "System Optimization",   desc: "BIOS updates, aggressive memory timing (XMP/EXPO), and Windows background process debloating." },
  { step: "04", icon: CheckCircle2, title: "Validation Testing",    desc: "24-hour burn-in testing to ensure 100% stability. If it doesn't pass, it doesn't leave our lab." }
]);

const FEATURES = Object.freeze([
  { icon: Thermometer, title: 'Thermal Engineering',   desc: 'Liquid metal, premium paste application, and push-pull airflow optimization.',            outcome: 'Zero thermal throttling under 100% load' },
  { icon: Zap,         title: 'FPS & Frame Pacing',    desc: 'Deep BIOS tuning, RAM XMP/EXPO profiling, and OS bloatware eradication.',                 outcome: 'Locked 1% lows & buttery smooth tracking' },
  { icon: Gauge,       title: 'Component-Level Repair', desc: 'Advanced diagnostics for artifacting GPUs, VRM overheating, and PSU voltage drops.',       outcome: 'Bulletproof hardware stability' },
]);

const SERVICE_CATEGORIES = Object.freeze([
  { title: "Advanced Cooling & Thermals",  icon: Snowflake, items: ['Custom liquid cooling loop flushes', 'AIO pump failure replacement', 'GPU repasting & thermal pad upgrades', 'Case airflow & pressure balancing'] },
  { title: "Performance Optimization",     icon: Activity,  items: ['BIOS updating & extreme tuning', 'DDR4/DDR5 memory overclocking', 'Windows gaming optimization', 'Bottleneck analysis & resolution'] },
  { title: "Hardware Diagnostics",         icon: Crosshair, items: ['GPU artifacting & crash recovery', 'PSU power delivery testing', 'Motherboard VRM diagnostics', 'Corrupted SSD recovery'] }
]);

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Eliminate FPS Drops & Overheating | Gaming PC Repair Kuwait",
      "url": PAGE_URL,
      "description": "Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      "name": "Advanced Gaming PC Repair & Tuning",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
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
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",             "item": BUSINESS_INFO.url },
        { "@type": "ListItem", "position": 2, "name": "Gaming PC Repair", "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function GamingPC() {
  const waMessage = encodeURIComponent("Hi KCROC, my gaming PC is experiencing FPS drops/overheating. Please arrange a free diagnostic & pickup in Kuwait.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <MetaSEO
        title="Gaming PC Repair in Kuwait | FPS & Thermal Tuning | KCROC"
        description="Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait. Free pickup available."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

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

      {/* ─── HERO ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 px-5 py-2 rounded-full text-purple-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <ShieldCheck size={16} aria-hidden="true" /> Component-Level Diagnostic Lab
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Eliminate FPS Drops,<br className="hidden md:block" /> Overheating &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Crashes.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Stop losing to hardware bottlenecks. We provide elite performance tuning, custom cooling restoration, and advanced motherboard repair to keep your rig running icy and flawless.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            
            {/* ✅ Fixed: Added missing <a tag declarations here */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-[1.02]"
            >
              Fix My PC Now <ExternalLink size={20} aria-hidden="true" />
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-3 w-full sm:w-auto bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-base transition-all hover:border-purple-500/30"
            >
              <Phone size={20} className="text-purple-400" aria-hidden="true" /> Call Technician
            </a>

          </div>
        </div>
      </section>

      {/* ─── SCENARIOS ─── */}
      <section aria-labelledby="scenarios-heading" className="max-w-5xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="scenarios-heading" className="text-center text-3xl font-black text-white mb-10">
          We Solve Real Gaming Frustrations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {SCENARIOS.map((s) => (
            <div key={s.game} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
              <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">{s.game}</p>
              <p className="text-red-400 font-bold mb-2 text-sm">Issue: {s.issue}</p>
              <p className="text-slate-400 text-sm mb-3">Fix: {s.fix}</p>
              <p className="text-emerald-400 text-sm font-bold">Result: {s.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section aria-labelledby="features-heading" className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="features-heading" className="text-3xl font-black text-white mb-10 text-center">
          What We Fix
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-colors group">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:border-purple-500/50 transition-colors">
                <f.icon className="w-6 h-6 text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
              <span className="text-xs font-bold text-emerald-400">{f.outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENCHMARKS ─── */}
      <section aria-labelledby="benchmarks-heading" className="max-w-4xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="benchmarks-heading" className="text-3xl font-black text-white mb-10 text-center">
          Before vs. After
        </h2>
        <div className="space-y-8">
          {BENCHMARKS.map((b) => (
            <div key={b.metric} className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
              <p className="text-white font-bold mb-4">{b.metric}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-widest mb-1">Before</p>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-red-500/60 rounded-full ${b.beforeWidth}`} />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{b.before}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">After</p>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-500/60 rounded-full ${b.afterWidth}`} />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{b.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section aria-labelledby="process-heading" className="max-w-4xl mx-auto px-6 relative z-10 mb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-slate-800">
          <h2 id="process-heading" className="text-3xl font-black text-white mb-10 text-center tracking-tight">
            Our Repair Protocol
          </h2>
          <div className="space-y-8">
            {PROCESS_STEPS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex gap-6">
                <div
                  className="w-10 h-10 shrink-0 bg-purple-500/20 border border-purple-500/50 rounded-full flex items-center justify-center text-purple-400 font-black text-sm"
                  aria-hidden="true"
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Icon size={18} className="text-purple-400" aria-hidden="true" /> {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE CATEGORIES ─── */}
      <section aria-labelledby="services-heading" className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="services-heading" className="text-3xl font-black text-white mb-10 text-center">
          All Gaming PC Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <cat.icon className="w-6 h-6 text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-slate-400 text-sm flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-purple-500/30 text-center shadow-[0_0_40px_rgba(147,51,234,0.1)]">
          <ShieldCheck className="w-12 h-12 text-purple-400 mx-auto mb-4" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl font-black text-white mb-4">Ready to Dominate?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Free pickup across Kuwait. No Fix, No Fee. Get your rig diagnosed by an expert today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* ✅ Fixed: Added missing <a tag declarations here */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-105 flex justify-center items-center gap-2"
            >
              <MessageCircle size={20} aria-hidden="true" /> Request Free Pickup
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-slate-900 border border-slate-700 hover:border-purple-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} aria-hidden="true" /> Call Technician
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
