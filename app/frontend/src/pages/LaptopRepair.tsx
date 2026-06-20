import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, Cpu, ThermometerSnowflake, BatteryWarning,
  ShieldCheck, CheckCircle, MessageCircle, Phone, Wrench, Zap
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// ─── MODULE-LEVEL CONSTANTS ───────────────────────────────────────────────────

const COMMON_ISSUES = [
  {
    title: "Thermal Throttling",
    desc: "Laptops overheating in Kuwait's climate. We apply premium thermal paste.",
    icon: ThermometerSnowflake
  },
  {
    title: "Battery Failures",
    desc: "Laptop dying fast? We replace degraded lithium cells safely.",
    icon: BatteryWarning
  },
  {
    title: "Motherboard Shorts",
    desc: "Chip-level micro-soldering to save your dead logic board.",
    icon: Cpu
  },
  {
    title: "Chassis Damage",
    desc: "Broken hinges or cracked screen bezels? We restore structural integrity.",
    icon: Wrench
  },
  {
    title: "BIOS Issues",
    desc: "System stuck in a boot loop? Advanced BIOS & firmware restoration.",
    icon: Zap
  },
  {
    title: "Screen Replacement",
    desc: "We install factory-grade OEM replacement panels quickly.",
    icon: Laptop
  }
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Laptop Repair Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call",
        "telephone": "+96555301913",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      },
      "areaServed": "Kuwait",
      "description": "Professional Windows laptop repair, hardware diagnostics, micro-soldering, and thermal management across Kuwait.",
      "offers": {
        "@type": "Offer",
        "name": "Free Laptop Diagnosis",
        "price": "0",
        "priceCurrency": "KWD",
        "description": "Free pick & drop and component-level diagnostic for all laptop repairs in Kuwait."
      }
    }
  ]
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LaptopRepair() {
  const waMessage = encodeURIComponent("Hi KCROC, I need help with my Windows laptop. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO
        title="Expert Laptop Repair in Kuwait | Free Pickup - KCROC"
        description="Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery."
        canonical={`${BUSINESS_INFO.url}/laptop-repair-kuwait`}
      />

      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 md:px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-xs md:text-sm text-slate-400 font-medium overflow-x-auto whitespace-nowrap pb-2">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Laptop Repair</li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-4 md:px-6 text-center z-10 mb-16 md:mb-24">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-4 py-1.5 rounded-full text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Laptop size={14} aria-hidden="true" /> Windows PC Specialists
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Laptop Repair</span><br />
            in Kuwait
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10">
            From shattered chassis hinges to complex component-level micro-soldering. Free pick & drop with our No Fix, No Fee guarantee.
          </p>
          
          {/* 2-COLUMN BRANDS GRID ON MOBILE */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-widest">
            {['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'].map((brand) => (
              <span key={brand} className="flex items-center justify-center gap-1.5 bg-slate-900/50 py-2 rounded-lg border border-slate-800 md:border-none md:bg-transparent md:py-0">
                <CheckCircle size={14} aria-hidden="true" /> {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2-COLUMN COMMON ISSUES GRID (CARDS) ─── */}
      <section aria-labelledby="issues-heading" className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 mb-16 md:mb-24">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="issues-heading" className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4">Hardware Failures We Fix</h2>
          <p className="text-sm md:text-base text-slate-400">Professional diagnostics for every component.</p>
        </div>
        
        {/* THE MAGIC FIX: grid-cols-2 on mobile, smaller gap-3 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {COMMON_ISSUES.map((issue) => (
            <div
              key={issue.title}
              className="bg-slate-900/30 backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 shadow-inner group-hover:border-cyan-500/50 transition-colors">
                <issue.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-sm md:text-xl font-black text-white mb-2 leading-tight">{issue.title}</h3>
              <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">{issue.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE PROCESS ─── */}
      <section aria-labelledby="process-heading" className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 mb-16 md:mb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-14 rounded-3xl border border-slate-800">
          <h2 id="process-heading" className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-8 text-center tracking-tight">
            Our Repair Protocol
          </h2>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                step: "1",
                title: "Free Pick & Drop Diagnostics",
                desc: "Our driver collects your laptop. We perform a full teardown and component-level test at no cost to you."
              },
              {
                step: "2",
                title: "Transparent Quoting",
                desc: "We provide a firm price and turnaround time. If you decline, we return the laptop for free."
              },
              {
                step: "3",
                title: "Precision Repair & Testing",
                desc: "We repair the fault, apply high-grade thermal paste, and stress-test before returning it."
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 md:gap-6 items-start">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 font-black text-sm md:text-lg mt-1 md:mt-0"
                  aria-hidden="true"
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">Is Your Laptop Failing?</h2>
          <p className="text-slate-300 text-sm md:text-base mb-6 md:mb-8 max-w-xl mx-auto">
            Don't risk losing your data. Let our experts diagnose it today with zero risk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2"
            >
              <MessageCircle size={18} aria-hidden="true" /> Request Free Pickup
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} aria-hidden="true" /> Call Technician
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
