import React from 'react';
import { 
  Laptop, Cpu, ThermometerSnowflake, BatteryWarning, 
  ShieldCheck, MessageCircle, Phone, Wrench, Zap 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { IMAGES } from '../constants/images';
import SEOComponent from '../components/seo/SEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';

const COMMON_ISSUES = [
  { title: "Thermal Throttling", desc: "Laptops overheating in Kuwait's climate. We apply premium thermal paste.", icon: ThermometerSnowflake },
  { title: "Battery Failures", desc: "Laptop dying fast? We replace degraded lithium cells safely.", icon: BatteryWarning },
  { title: "Motherboard Shorts", desc: "Chip-level micro-soldering to save your dead logic board.", icon: Cpu },
  { title: "Chassis Damage", desc: "Broken hinges or cracked screen bezels? We restore structural integrity.", icon: Wrench },
  { title: "BIOS Issues", desc: "System stuck in a boot loop? Advanced BIOS & firmware restoration.", icon: Zap },
  { title: "Screen Replacement", desc: "We install factory-grade OEM replacement panels quickly.", icon: Laptop }
];

export default function LaptopRepair() {
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need help with my Windows laptop. Please arrange a free diagnostic & pickup.")}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <SEOComponent
        title="Expert Laptop Repair in Kuwait | Free Pickup"
        description="Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery."
        canonical={`${BUSINESS_INFO.url}/laptop-repair-kuwait`}
      />
      <LocalBusinessSchema />

      {/* HERO SECTION - Optimized with metadata */}
      <section className="relative px-6 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          Premium <span className="text-cyan-400">Laptop Repair</span> in Kuwait
        </h1>
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img 
            src={IMAGES.services.laptopRepairHero.src} 
            alt={IMAGES.services.laptopRepairHero.alt}
            width={IMAGES.services.laptopRepairHero.width}
            height={IMAGES.services.laptopRepairHero.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-64 md:h-96 object-cover" 
          />
        </div>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">From shattered hinges to complex micro-soldering. Free pick & drop with our No Fix, No Fee guarantee.</p>
      </section>

      {/* ISSUES GRID */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMON_ISSUES.map((issue) => (
          <div key={issue.title} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
            <issue.icon className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{issue.title}</h3>
            <p className="text-slate-400 text-sm">{issue.desc}</p>
          </div>
        ))}
      </section>

      {/* PROTOCOL */}
      <section className="max-w-4xl mx-auto px-6 mb-24 bg-slate-900/50 p-10 rounded-3xl border border-slate-800">
        <h2 className="text-3xl font-black text-white mb-8 text-center">Our Repair Protocol</h2>
        <div className="space-y-8">
          {["Free Pick & Drop Diagnostics", "Transparent Quoting", "Precision Repair & Testing"].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">{i + 1}</div>
              <h3 className="text-xl font-bold text-white pt-0.5">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-br from-cyan-900/40 to-slate-900/80 p-10 rounded-3xl border border-cyan-500/30">
        <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-white mb-4">Is Your Laptop Failing?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={waLink} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105">
            <MessageCircle size={18} /> Request Free Pickup
          </a>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2">
            <Phone size={18} /> Call Technician
          </a>
        </div>
      </section>
    </main>
  );
}
