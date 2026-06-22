import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, MapPin, ArrowRight, ChevronDown, 
  MessageCircle, Phone, HelpCircle, ShieldCheck, 
  Activity, Search, Wrench, AlertTriangle, ExternalLink 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { IMAGES } from '../constants/images';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. DATA & SCHEMA (Ensure these are defined)
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${BUSINESS_INFO.url}/motherboard-repair-kuwait`;

const FAQS = [
  { q: "Why is my laptop not turning on?", a: "A total lack of power usually indicates a short circuit on your 19V power rail. We isolate and swap failed components using chip-level micro-soldering." },
  { q: "Can a motherboard be repaired?", a: "In over 85% of cases, yes. We revive logic boards by replacing specific shorted capacitors or ICs, which is 60-80% cheaper than full replacement." },
  { q: "How much does motherboard repair cost?", a: "Chip-level repair at KCROC typically ranges from 25 KD to 65 KD depending on the failure." },
  { q: "Is my data safe?", a: "Yes. Your drive is extracted before any thermal work begins, ensuring zero risk of data loss." },
  { q: "How long does it take?", a: "Diagnostics take 24 hours. Full repair and stress testing usually require 2-4 business days." },
  { q: "What if it cannot be fixed?", a: "Under our 'No Fix, No Charge' policy, you pay nothing if the board is unrepairable." }
];

const DIAGNOSTIC_TOOLS = [
  { name: "FLIR Thermal Imaging", use: "Pinpoints heat spikes.", icon: Activity },
  { name: "Industrial Multimeters", use: "Validates power rails.", icon: Search },
  { name: "Nano Micro-Soldering", use: "Extraction of tiny components.", icon: Wrench },
  { name: "BGA Rework Stations", use: "Rebuilding circuit arrays.", icon: Cpu }
];

const DECISION_MATRIX = [
  { path: "KCROC Chip-Level Repair", cost: "25 KD – 65 KD", data: "100% Retained" },
  { path: "Full Board Replacement", cost: "120 KD – 300+ KD", data: "Requires Transfer" }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. COMPONENTS & MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function MotherboardRepair() {
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need motherboard repair.")}`;
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24 font-sans">
      <MetaSEO title="Motherboard Repair Kuwait | Chip-Level Fix" description="Expert motherboard repair in Kuwait." canonical={PAGE_URL} />
      
      {/* HERO */}
      <section className="px-6 text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6">Motherboard Repair in <span className="text-cyan-400">Kuwait</span></h1>
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800">
          <img src={IMAGES.services.motherboardRepairHero} alt="Motherboard repair" className="w-full h-64 md:h-96 object-cover" />
        </div>
      </section>

      {/* ARTICLE CONTENT - This ensures all sections render */}
      <article className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-24">
          <section>
            <h2 className="text-3xl font-black mb-6">How We Diagnose Dead Motherboards</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {DIAGNOSTIC_TOOLS.map((t) => (
                <div key={t.name} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                  <t.icon className="text-cyan-400 mb-4" />
                  <h3 className="font-bold text-white">{t.name}</h3>
                  <p className="text-sm text-slate-400">{t.use}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-6">Repair Path Comparison</h2>
            <div className="overflow-x-auto border border-slate-800 rounded-3xl bg-slate-900/30">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                    <th className="p-6">Repair Path</th>
                    <th className="p-6">Cost</th>
                    <th className="p-6">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {DECISION_MATRIX.map((row) => (
                    <tr key={row.path} className="border-b border-slate-800">
                      <td className="p-6 font-bold">{row.path}</td>
                      <td className="p-6 text-emerald-400">{row.cost}</td>
                      <td className="p-6">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </article>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-black text-white mb-12 text-center">Common Questions</h2>
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-slate-800">
            <button className="w-full text-left p-6 font-bold" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              {faq.q}
            </button>
            {activeFaq === i && <div className="p-6 text-slate-400 text-sm">{faq.a}</div>}
          </div>
        ))}
      </section>
    </main>
  );
}
