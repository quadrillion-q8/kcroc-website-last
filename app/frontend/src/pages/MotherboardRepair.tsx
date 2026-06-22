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
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/motherboard-repair-kuwait`;

const FAQS = Object.freeze([
  { q: "Why is my laptop not turning on at all in Kuwait?", a: "A total lack of power usually indicates a short circuit on your primary 19V power rail. We isolate and swap failed components using chip-level micro-soldering." },
  { q: "Can a motherboard be repaired instead of replaced?", a: "In over 85% of cases, yes. We revive logic boards by replacing specific shorted capacitors or ICs, which is 60-80% cheaper than full replacement." },
  { q: "How much does motherboard repair cost in Kuwait?", a: "Chip-level repair at KCROC typically ranges from 25 KD to 65 KD depending on the failure." },
  { q: "Is my data safe during an emergency logic board repair?", a: "Yes. Your SSD or hard drive is safely extracted before any thermal work begins, ensuring zero risk of data loss." },
  { q: "How long does it take to repair a laptop motherboard?", a: "Diagnostics take 24 hours. Full repair and stress testing usually require 2-4 business days." },
  { q: "What happens if my motherboard cannot be fixed?", a: "Under our 'No Fix, No Charge' policy, you pay nothing for the diagnostic if the board is unrepairable." }
]);

const DIAGNOSTIC_TOOLS = Object.freeze([
  { id: "flir-cam", name: "FLIR Thermal Imaging", useCase: "Pinpoints infrared heat spikes to locate short-circuited components.", metric: "0.01W detection", icon: Activity },
  { id: "fluke-meter", name: "Industrial Multimeters", useCase: "Validates power rails against boardviews.", metric: "Precise micro-resistance", icon: Search },
  { id: "jbc-station", name: "Nano Micro-Soldering", useCase: "Localized extraction of microscopic components.", metric: "0201-sized parts", icon: Wrench },
  { id: "bga-rework", name: "BGA Rework Stations", useCase: "Thermal profiling to rebuild damaged arrays.", metric: "Layer warping prevention", icon: Cpu }
]);

const BRAND_FAILURES = Object.freeze([
  { brand: "Apple MacBook", vuln: "USB-C controller failure.", remedy: "PMIC array micro-soldering." },
  { brand: "HP Omen", vuln: "Input MOSFET degradation.", remedy: "Switching link desoldering." },
  { brand: "ASUS ROG", vuln: "GPU BGA micro-fractures.", remedy: "Precision BGA reballing." }
]);

const DECISION_MATRIX = Object.freeze([
  { path: "KCROC Chip-Level Repair", cost: "25 KD – 65 KD", data: "100% Retained", verdict: "Highly Recommended" },
  { path: "Full Board Replacement", cost: "120 KD – 300+ KD", data: "Requires Transfer", verdict: "Only if unrepairable" }
]);

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Motherboard Repair Kuwait",
      "url": PAGE_URL,
      "description": "Expert motherboard repair in Kuwait. Micro-soldering and power rail diagnostics. No Fix, No Charge.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const FAQAccordion = React.memo(({ items }: { items: typeof FAQS }) => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={faq.q} className="border border-slate-800 rounded-2xl bg-slate-900/30">
          <button className="w-full flex justify-between p-6 text-sm font-bold text-white" onClick={() => setActive(active === i ? null : i)}>
            <span className="flex items-center gap-3"><HelpCircle size={18} className="text-cyan-400" /> {faq.q}</span>
            <ChevronDown className={`transition-transform ${active === i ? "rotate-180" : ""}`} />
          </button>
          {active === i && <div className="px-6 pb-6 text-slate-400 text-sm">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
});
FAQAccordion.displayName = 'FAQAccordion';

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function MotherboardRepair() {
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need motherboard repair.")}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <MetaSEO title="Motherboard Repair Kuwait | Chip-Level Fix" description="Expert motherboard repair in Kuwait." canonical={PAGE_URL} />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <section className="relative px-6 text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6">Motherboard Repair in <span className="text-cyan-400">Kuwait</span></h1>
        
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img src={IMAGES.services.motherboardRepairHero} alt="Motherboard repair" className="w-full h-64 md:h-96 object-cover" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={waLink} className="bg-cyan-500 text-slate-950 font-black px-8 py-4 rounded-full">Book Free Diagnostic</a>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 text-white font-bold px-8 py-4 rounded-full">Call Technician</a>
        </div>
      </section>

      {/* Grid and Details... (Rest of your content remains here) */}
      
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-black text-white mb-12 text-center">Common Motherboard Repair Questions</h2>
        <FAQAccordion items={FAQS} />
      </section>
    </main>
  );
}
