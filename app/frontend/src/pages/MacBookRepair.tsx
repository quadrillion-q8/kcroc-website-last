// File: app/frontend/src/pages/MacBookRepair.tsx
import React, { useState } from 'react';
import { 
  Laptop, CheckCircle, ShieldCheck, Cpu, Wrench, Droplets,
  Activity, MessageCircle, Phone, HelpCircle, ChevronDown
} from 'lucide-react';
import { IMAGES } from '../constants/images'; 
import { SEOEngine } from '../core/components/SEOEngine'; // 👈 Phase 2 SEO Engine Imported

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
   Note: All SEO and Schema data is now handled centrally by graph.ts
───────────────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "Do you repair Apple Silicon M1, M2, and M3 MacBooks?", a: "Yes. Our Hawalli lab is fully equipped to handle component-level diagnostics and logic board repairs for both legacy Intel MacBooks and modern Apple Silicon M-Series machines." },
  { q: "My MacBook is completely dead. Is it the logic board?", a: "Often, yes, but it is rarely a total failure. We replace specific shorted chips rather than the whole board." },
  { q: "What is your success rate with liquid-damaged MacBooks?", a: "We have an extremely high success rate if brought in quickly. We use industrial ultrasonic cleaning to remove corrosion." },
  { q: "Will I lose my data?", a: "Data preservation is our priority. By repairing the original logic board at the chip level, your data remains perfectly intact." }
];

const MACBOOK_FAILURES = [
  { type: "Logic Board Power Failure", vuln: "Device stops taking a charge and remains dead.", remedy: "PMIC array micro-soldering.", icon: Cpu },
  { type: "Liquid Damage & Corrosion", vuln: "Spills short the logic board components.", remedy: "Ultrasonic chemical wash.", icon: Droplets },
  { type: "Flexgate / Screen Issues", vuln: "Backlight fails or shows vertical lines.", remedy: "Flex cable repair.", icon: Laptop }
];

const DECISION_MATRIX = [
  { path: "KCROC Logic Board Repair", cost: "Highly Cost-Effective", data: "100% Retained", verdict: "Best Choice" },
  { path: "Apple Authorized Swap", cost: "Extremely Expensive", data: "Completely Lost", verdict: "Only if unrepairable" }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function MacBookRepair() {
  // Using the centralized phone number string from the graph/context
  const waLink = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I need help with my Apple MacBook. Please arrange a free diagnostic & pickup.")}`;
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION:
        This single component replaces all manual <title>, <meta>, and JSON-LD schema tags.
        It pulls everything directly from KCROC_GRAPH.entities['srv-macbook-repair'].
      */}
      <SEOEngine entityId="srv-macbook-repair" />

      {/* HERO WITH LOCAL IMAGE */}
      <section className="relative px-6 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Premium <span className="text-cyan-400">MacBook Repair</span> in Kuwait</h1>
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img src={IMAGES?.services?.macBookRepairHero?.src || ''} alt="MacBook logic board repair at KCROC" className="w-full h-64 md:h-96 object-cover" />
        </div>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">We utilize chip-level micro-soldering to fix your original board, preserving your files and saving your budget.</p>
      </section>

      {/* FAILURES GRID */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid md:grid-cols-3 gap-6">
        {MACBOOK_FAILURES.map((issue) => (
          <div key={issue.type} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-800/50">
            <issue.icon className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-black text-white mb-2">{issue.type}</h3>
            <p className="text-slate-400 text-sm mb-4">{issue.vuln}</p>
            <span className="text-xs font-bold text-cyan-300">Fix: {issue.remedy}</span>
          </div>
        ))}
      </section>

      {/* CTA FOOTER */}
      <section className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-br from-cyan-900/40 to-slate-900/80 p-10 rounded-3xl border border-cyan-500/30">
        <h2 className="text-3xl font-black text-white mb-6">Don't Write Off Your MacBook.</h2>
        <a href={waLink} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <MessageCircle size={20} /> Request Free Pickup
        </a>
      </section>
    </main>
  );
}
