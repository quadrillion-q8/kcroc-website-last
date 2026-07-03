// File: app/frontend/src/pages/MotherboardRepair.tsx
import React, { useState } from 'react';
import { 
  Cpu, MapPin, ArrowRight, ChevronDown, 
  MessageCircle, Phone, HelpCircle, ShieldCheck, 
  Activity, Search, Wrench, AlertTriangle, ExternalLink 
} from 'lucide-react';

import { getEntityById } from '../utils/graphQueries';
import Layout from '../components/Layout';
import { ServiceEntity } from '../types/knowledgeGraph';
import { getIntentWhatsAppLink } from '../utils/whatsappIntent';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine'; 

/* ─────────────────────────────────────────────────────────────────────────────
   1. DATA (Preserving your custom UI constants)
───────────────────────────────────────────────────────────────────────────── */
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
   2. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function MotherboardRepair() {
  // 1. Fetch the data dynamically from the Knowledge Graph
  const entity = getEntityById<ServiceEntity>('srv-motherboard-repair');
  
  // Safety check: if entity is missing, return null
  if (!entity) return null;

  const waLink = getIntentWhatsAppLink("service", entity.title);
  const heroMedia = entity.media?.find(m => m.role === 'hero') || entity.media?.[0];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <Layout entity={entity}>
      <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24 font-sans">
        
        {/* 🚀 PHASE 2 AUTOMATION IN ACTION */}
        <SEOEngine entityId="srv-motherboard-repair" />
        
        {/* HERO */}
        <section className="px-6 text-center mb-24">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
            Motherboard Repair in <span className="text-cyan-400">Kuwait</span>
          </h1>
          <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            {heroMedia && (
              <img 
                src={heroMedia.imageId} 
                alt={heroMedia.altText || entity.title}
                fetchPriority="high"
                className="w-full h-64 md:h-96 object-cover opacity-90" 
              />
            )}
          </div>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            {entity.description}
          </p>
        </section>

        {/* ARTICLE CONTENT - Custom Diagnostics and Matrix */}
        <article className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-24">
            <section>
              <h2 className="text-3xl font-black mb-6">How We Diagnose Dead Motherboards</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {DIAGNOSTIC_TOOLS.map((t) => (
                  <div key={t.name} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-800/50">
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
                      <tr key={row.path} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
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
              <button className="w-full text-left p-6 font-bold hover:text-cyan-400 transition-colors" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                {faq.q}
              </button>
              {activeFaq === i && <div className="p-6 text-slate-400 text-sm animate-in fade-in slide-in-from-top-2">{faq.a}</div>}
            </div>
          ))}
        </section>

        {/* CTA FOOTER */}
        <section className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-br from-cyan-900/40 to-slate-900/80 p-10 rounded-3xl border border-cyan-500/30 mb-12">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-6">Revive Your Motherboard Today</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105">
              <MessageCircle size={18} /> Request Free Pickup
            </a>
            <a href="tel:+96555301913" className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2">
              <Phone size={18} /> Call Technician
            </a>
          </div>
        </section>

      </main>
    </Layout>
  );
}
