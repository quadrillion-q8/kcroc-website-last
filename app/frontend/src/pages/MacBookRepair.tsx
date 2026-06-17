import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, CheckCircle, ShieldCheck, Cpu, Wrench, Droplets, Activity, MessageCircle, Phone, HelpCircle, ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO'; // New reusable SEO component

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const FAQS = [
  { q: "Do you repair Apple Silicon M1, M2, and M3 MacBooks?", a: "Yes. Our Hawalli lab is fully equipped to handle component-level diagnostics and logic board repairs for both legacy Intel MacBooks and modern Apple Silicon M-Series machines." },
  { q: "My MacBook is completely dead. Is it the logic board?", a: "Often, yes, but it is rarely a total failure. A dead MacBook usually indicates a failure in the USB-C power delivery negotiation (CD3215/CD3217 chips) or a short on the PPBUS_G3H main power rail. We replace these specific chips rather than the whole board." },
  { q: "What is your success rate with liquid-damaged MacBooks in Kuwait?", a: "We have an extremely high success rate for liquid damage if brought in quickly. We completely disassemble the MacBook, run the logic board through an industrial ultrasonic cleaner to remove corrosion, and repair the shorted traces." },
  { q: "Will I lose my data during a MacBook logic board repair?", a: "Data preservation is our priority. Since SSDs on modern MacBooks are soldered directly to the logic board, replacing the board means losing your data. By repairing your original logic board at the chip level, your data remains perfectly intact." }
];

const DIAGNOSTIC_TOOLS = [
  { name: "USB-C Digital Amp Meters", useCase: "Monitors power negotiation. If a MacBook is stuck at 5V instead of 20V, we instantly isolate USB-C controller failures.", metric: "Detects CD3215/CD3217 errors.", icon: Activity },
  { name: "FLIR Thermal Imaging", useCase: "Pinpoints infrared heat spikes on the logic board to instantly locate short-circuited capacitors or MOSFETs.", metric: "Isolates parasitic power draw.", icon: Laptop },
  { name: "Precision Micro-Soldering", useCase: "Safely extracts microscopic surface-mount components under high magnification.", metric: "Executes targeted board surgery.", icon: Wrench }
];

const MACBOOK_FAILURES = [
  { type: "Logic Board Power Failure", vuln: "Device stops taking a charge and remains completely dead. Often stuck at 5V on the charger.", remedy: "Micro-soldering replacement of the USB-C PMIC arrays.", icon: Cpu },
  { type: "Liquid Damage & Corrosion", vuln: "Coffee or water spills seep through the keyboard, immediately shorting the logic board.", remedy: "Ultrasonic chemical wash and component-level replacement.", icon: Droplets },
  { type: "Flexgate / Screen Issues", vuln: "Display backlight fails or shows vertical lines when the lid is opened past a certain angle.", remedy: "Display assembly replacement or flex cable repair.", icon: Laptop }
];

const DECISION_MATRIX = [
  { path: "KCROC Logic Board Repair", cost: "Highly Cost-Effective", data: "100% Retained", verdict: "Best Choice" },
  { path: "Apple Authorized Swap", cost: "Extremely Expensive", data: "Completely Lost", verdict: "Only if unrepairable" },
  { path: "Buy New MacBook", cost: "350+ KD", data: "Requires Backup", verdict: "Last Resort" }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const FAQAccordion = React.memo(({ items }: { items: typeof FAQS }) => {
  const [active, setActive] = useState<number | null>(null);
  const toggle = useCallback((i: number) => setActive(prev => (prev === i ? null : i)), []);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = active === i;
        return (
          <div key={i} className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm mb-3 hover:border-slate-700 transition-colors">
            <button
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => toggle(i)}
            >
              <span className="flex items-start gap-3 font-bold text-white pr-4 text-sm tracking-wide">
                <HelpCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                {faq.q}
              </span>
              <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-800/50' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="px-6 pb-5 pt-1 pl-[3.25rem] text-slate-400 text-sm leading-relaxed overflow-hidden">
                <div className="py-2">{faq.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function MacBookRepair() {
  const waMessage = encodeURIComponent("Hi KCROC, I need help with my Apple MacBook. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MacBook Logic Board Repair",
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
    "description": "Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, liquid damage recovery, and data preservation."
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO 
        title="MacBook Repair Kuwait | Logic Board Experts | KCROC" 
        description="Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, liquid damage recovery, and data preservation. No Fix, No Charge." 
        canonical={`${BUSINESS_INFO.url}/macbook-repair-kuwait`}
      />
      <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">MacBook Repair</li>
        </ol>
      </nav>

      {/* ... (Keep existing sections below here exactly as they were) ... */}
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
         {/* ... (rest of your section content) ... */}
      </section>

      {/* ... continue your existing JSX structure ... */}
    </main>
  );
}
