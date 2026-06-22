import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Cpu, ThermometerSnowflake, BatteryWarning, ShieldCheck, CheckCircle, MessageCircle, Phone, Wrench, Zap } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { IMAGES } from '../constants/images'; // 👈 Your centralized dictionary
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const COMMON_ISSUES = [
  { title: "Thermal Throttling", desc: "Laptops overheating in Kuwait's climate. We apply premium thermal paste.", icon: ThermometerSnowflake },
  { title: "Battery Failures", desc: "Laptop dying fast? We replace degraded lithium cells safely.", icon: BatteryWarning },
  { title: "Motherboard Shorts", desc: "Chip-level micro-soldering to save your dead logic board.", icon: Cpu },
  { title: "Chassis Damage", desc: "Broken hinges or cracked screen bezels? We restore structural integrity.", icon: Wrench },
  { title: "BIOS Issues", desc: "System stuck in a boot loop? Advanced BIOS & firmware restoration.", icon: Zap },
  { title: "Screen Replacement", desc: "We install factory-grade OEM replacement panels quickly.", icon: Laptop }
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Laptop Repair Services",
      "provider": { "@type": "LocalBusiness", "name": BUSINESS_INFO.name, "telephone": BUSINESS_INFO.phone },
      "areaServed": "Kuwait",
      "description": "Professional Windows laptop repair, hardware diagnostics, micro-soldering, and thermal management across Kuwait.",
      "offers": { "@type": "Offer", "name": "Free Laptop Diagnosis", "price": "0", "priceCurrency": "KWD" }
    }
  ]
};

export default function LaptopRepair() {
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need help with my Windows laptop. Please arrange a free diagnostic & pickup.")}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO
        title="Expert Laptop Repair in Kuwait | Free Pickup - KCROC"
        description="Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery."
        canonical={`${BUSINESS_INFO.url}/laptop-repair-kuwait`}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* HERO SECTION WITH LOCAL IMAGE */}
      <section className="relative px-4 md:px-6 text-center z-10 mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Premium <span className="text-cyan-400">Laptop Repair</span> in Kuwait</h1>
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img src={IMAGES.services.laptopRepairHero} alt="Professional laptop repair at KCROC" className="w-full h-64 md:h-96 object-cover" />
        </div>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">From shattered hinges to complex micro-soldering. Free pick & drop with our No Fix, No Fee guarantee.</p>
      </section>

      {/* ISSUES GRID */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24 grid grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMON_ISSUES.map((issue) => (
          <div key={issue.title} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
            <issue.icon className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{issue.title}</h3>
            <p className="text-slate-400 text-sm">{issue.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA FOOTER */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <a href={waLink} className="bg-cyan-500 text-slate-950 font-black px-8 py-4 rounded-full">Request Free Pickup</a>
      </section>
    </main>
  );
}
