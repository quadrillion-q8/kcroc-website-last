import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Gauge, Thermometer, ExternalLink, ChevronRight, 
  Truck, Snowflake, Activity, ShieldCheck, Clock, Crosshair,
  BarChart4, Search, Settings, CheckCircle2, MessageCircle, Phone, Gamepad2
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO'; // 1. Import new component

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
      {/* 2. Add the component at the top */}
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

      {/* ... (Keep rest of existing JSX section content) ... */}
    </main>
  );
}
