import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Gauge, Thermometer, ExternalLink, ChevronRight, 
  Truck, Snowflake, Activity, ShieldCheck, Clock, Crosshair,
  BarChart4, Search, Settings, CheckCircle2, MessageCircle, Phone, Gamepad2
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
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
      <MetaSEO 
        title="Gaming PC Repair in Kuwait | FPS & Thermal Tuning | KCROC" 
        description="Stop stuttering and thermal throttling. Elite component-level gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait. Free pickup available." 
        canonical={pageUrl}
      />
      <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>

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

      {/* Hero Section */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
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
        </div>
      </section>

      {/* Scenarios */}
      <section className="max-w-5xl mx-auto px-6 relative z-10 mb-24">
        <h3 className="text-center text-3xl font-black text-white mb-10">We Solve Real Gaming Frustrations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {SCENARIOS.map((s, i) => (
            <div key={i} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
               <p className="text-red-400 font-bold mb-2">Issue: {s.issue}</p>
               <p className="text-slate-400 text-sm">Fix: {s.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
    </main>
  );
}
