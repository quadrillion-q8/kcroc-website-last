import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, CheckCircle, ShieldCheck, Cpu, Wrench, Droplets,
  Activity, MessageCircle, Phone, HelpCircle, ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "Do you repair Apple Silicon M1, M2, and M3 MacBooks?",
    a: "Yes. Our Hawalli lab is fully equipped to handle component-level diagnostics and logic board repairs for both legacy Intel MacBooks and modern Apple Silicon M-Series machines."
  },
  {
    q: "My MacBook is completely dead. Is it the logic board?",
    a: "Often, yes, but it is rarely a total failure. A dead MacBook usually indicates a failure in the USB-C power delivery negotiation (CD3215/CD3217 chips) or a short on the PPBUS_G3H main power rail. We replace these specific chips rather than the whole board."
  },
  {
    q: "What is your success rate with liquid-damaged MacBooks in Kuwait?",
    a: "We have an extremely high success rate for liquid damage if brought in quickly. We completely disassemble the MacBook, run the logic board through an industrial ultrasonic cleaner to remove corrosion, and repair the shorted traces."
  },
  {
    q: "Will I lose my data during a MacBook logic board repair?",
    a: "Data preservation is our priority. Since SSDs on modern MacBooks are soldered directly to the logic board, replacing the board means losing your data. By repairing your original logic board at the chip level, your data remains perfectly intact."
  }
];

const DIAGNOSTIC_TOOLS = [
  {
    name: "USB-C Digital Amp Meters",
    useCase: "Monitors power negotiation. If a MacBook is stuck at 5V instead of 20V, we instantly isolate USB-C controller failures.",
    metric: "Detects CD3215/CD3217 errors.",
    icon: Activity
  },
  {
    name: "FLIR Thermal Imaging",
    useCase: "Pinpoints infrared heat spikes on the logic board to instantly locate short-circuited capacitors or MOSFETs.",
    metric: "Isolates parasitic power draw.",
    icon: Laptop
  },
  {
    name: "Precision Micro-Soldering",
    useCase: "Safely extracts microscopic surface-mount components under high magnification.",
    metric: "Executes targeted board surgery.",
    icon: Wrench
  }
];

const MACBOOK_FAILURES = [
  {
    type: "Logic Board Power Failure",
    vuln: "Device stops taking a charge and remains completely dead. Often stuck at 5V on the charger.",
    remedy: "Micro-soldering replacement of the USB-C PMIC arrays.",
    icon: Cpu
  },
  {
    type: "Liquid Damage & Corrosion",
    vuln: "Coffee or water spills seep through the keyboard, immediately shorting the logic board.",
    remedy: "Ultrasonic chemical wash and component-level replacement.",
    icon: Droplets
  },
  {
    type: "Flexgate / Screen Issues",
    vuln: "Display backlight fails or shows vertical lines when the lid is opened past a certain angle.",
    remedy: "Display assembly replacement or flex cable repair.",
    icon: Laptop
  }
];

const DECISION_MATRIX = [
  { path: "KCROC Logic Board Repair", cost: "Highly Cost-Effective", data: "100% Retained", verdict: "Best Choice" },
  { path: "Apple Authorized Swap", cost: "Extremely Expensive", data: "Completely Lost", verdict: "Only if unrepairable" },
  { path: "Buy New MacBook", cost: "350+ KD", data: "Requires Backup", verdict: "Last Resort" }
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "MacBook Logic Board Repair",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      },
      "areaServed": "Kuwait",
      "description": "Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, liquid damage recovery, and data preservation.",
      "offers": {
        "@type": "Offer",
        "name": "Free MacBook Diagnosis",
        "price": "0",
        "priceCurrency": "KWD",
        "description": "Free collection and chip-level diagnostic for all MacBook repairs across Kuwait."
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      }))
    }
  ]
};

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
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-btn-${i}`;
        return (
          <div key={faq.q} className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => toggle(i)}
            >
              <span className="flex items-start gap-3 font-bold text-white pr-4 text-sm tracking-wide">
                <HelpCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                {faq.q}
              </span>
              <ChevronDown
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-800/50' : 'grid-rows-[0fr] opacity-0'}`}
            >
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
FAQAccordion.displayName = 'FAQAccordion';

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function MacBookRepair() {
  const waMessage = encodeURIComponent("Hi KCROC, I need help with my Apple MacBook. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO
        title="MacBook Repair Kuwait | Logic Board Experts | KCROC"
        description="Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, liquid damage recovery, and data preservation. No Fix, No Charge."
        canonical={`${BUSINESS_INFO.url}/macbook-repair-kuwait`}
      />
      
      <SchemaMarkup schema={STRUCTURED_DATA} />

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

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Laptop size={16} aria-hidden="true" /> Apple Logic Board Specialists
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">MacBook Repair</span><br />
            in Kuwait
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Authorized centers replace your entire logic board, permanently deleting your data. We utilize chip-level micro-soldering to fix your original board, preserving your files and saving your budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-emerald-400 uppercase tracking-widest">
            {['M-Series Specialists', 'Intel Legacy', 'Component Level'].map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <CheckCircle size={16} aria-hidden="true" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMON FAILURES GRID ─── */}
      <section aria-labelledby="failures-heading" className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-12">
          <h2 id="failures-heading" className="text-3xl font-black text-white mb-4">Common Logic Board Failures</h2>
          <p className="text-slate-400">Why MacBooks suddenly stop turning on, and how we fix them.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {MACBOOK_FAILURES.map((issue) => (
            <div key={issue.type} className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors group flex flex-col">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:border-cyan-500/50 transition-colors">
                <issue.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{issue.type}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{issue.vuln}</p>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/30 px-3 py-2 rounded-md border border-cyan-900/50 inline-block text-center mt-auto">
                Fix: {issue.remedy}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOOLS & MATRIX ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Diagnostic Lab Tools</h2>
          <div className="space-y-4">
            {DIAGNOSTIC_TOOLS.map((t) => (
              <div key={t.name} className="p-6 border border-slate-800 bg-slate-900/30 rounded-2xl">
                <h3 className="font-bold text-white flex items-center gap-3 mb-2">
                  <t.icon size={18} className="text-cyan-400" aria-hidden="true" /> {t.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{t.useCase}</p>
                <span className="text-xs font-bold text-emerald-400">{t.metric}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Repair vs. Replacement</h2>
          <div className="overflow-hidden border border-slate-800 rounded-3xl bg-slate-900/30 backdrop-blur-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-950/50 text-slate-300 font-bold border-b border-slate-800">
                  <th className="p-5">Service Path</th>
                  <th className="p-5">Cost</th>
                  <th className="p-5">Data Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                {DECISION_MATRIX.map((row) => (
                  <tr key={row.path} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-5 font-bold text-white">{row.path}</td>
                    <td className="p-5 text-emerald-400 font-semibold">{row.cost}</td>
                    <td className="p-5">{row.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="text-3xl font-black text-white mb-4">MacBook Repair FAQs</h2>
          <p className="text-slate-400">Clear answers regarding logic board repairs and data safety.</p>
        </div>
        <FAQAccordion items={FAQS} />
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl font-black text-white mb-4">Don't Write Off Your MacBook.</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Get a professional, chip-level diagnostic from KCROC. Free pickup available across Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2">
              <MessageCircle size={20} aria-hidden="true" /> Request Free Pickup
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Phone size={20} aria-hidden="true" /> Call Technician
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
