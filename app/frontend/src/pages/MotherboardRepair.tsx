import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Cpu, MapPin, CheckCircle, ArrowRight, ChevronDown, 
  MessageCircle, Phone, HelpCircle, ShieldCheck, 
  Activity, Search, Wrench, AlertTriangle, ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA (Frozen for performance)
───────────────────────────────────────────────────────────────────────────── */

const FAQS = Object.freeze([
  { q: "Why is my laptop not turning on at all in Kuwait?", a: "A total lack of power usually indicates a catastrophic short circuit on your primary 19V power rail. This is frequently caused by a blown input MOSFET or a failed power IC chip, which we isolate and swap using chip-level micro-soldering." },
  { q: "Can a motherboard be repaired instead of replaced?", a: "In over 85% of cases, yes. A 'dead' motherboard is often caused by a single shorted capacitor. By finding and replacing that microscopic component, we revive the entire logic board without a costly full replacement." },
  { q: "How much does motherboard repair cost in Kuwait?", a: "Chip-level repair at KCROC typically ranges from 25 KD to 65 KD depending on the exact IC or MOSFET failure. This is 60% to 80% cheaper than dealership motherboard replacements, which often exceed 150 KD." },
  { q: "Is my data safe during an emergency logic board repair?", a: "Yes, your data is completely secure. Motherboard repair targets power delivery circuits. Your NVMe SSD or hard drive is safely extracted before any thermal soldering begins, ensuring zero risk of data loss." },
  { q: "How long does it take to repair a laptop motherboard in Hawalli?", a: "Standard component-level diagnostics take 24 hours. Full micro-soldering repair and thermal stress testing usually require 2 to 4 business days. We offer free pickup and delivery to expedite the process." },
  { q: "Do you repair liquid-damaged laptops?", a: "Yes. We utilize industrial ultrasonic cleaning to strip microscopic mineral corrosion caused by spills before tracing and replacing the short-circuited logic board components." },
  { q: "Can you fix a MacBook with a black screen but running fans?", a: "Yes. If your MacBook has a black screen but the fans spin, the issue is commonly a blown backlight fuse or a failed display power management IC (LP8550 chip), which we repair at the component level." },
  { q: "What happens if my motherboard cannot be fixed?", a: "If catastrophic damage has occurred—such as a cracked CPU die or burnt internal fiberglass layers—we will advise you to replace the machine. Under our 'No Fix, No Charge' policy, you pay nothing for the diagnostic." }
]);

const DIAGNOSTIC_TOOLS = Object.freeze([
  { id: "flir-cam", name: "FLIR Thermal Imaging", useCase: "Pinpoints infrared heat spikes to instantly locate short-circuited surface components.", metric: "Detects abnormal power draw down to 0.01W.", icon: Activity },
  { id: "fluke-meter", name: "Industrial Multimeters", useCase: "Validates 19V main, 3.3V, and 5V standby power rails against open-source boardviews.", metric: "Measures precise micro-resistance drops.", icon: Search },
  { id: "jbc-station", name: "Nano Micro-Soldering", useCase: "Localized extraction of microscopic surface-mount components under high magnification.", metric: "Executes targeted soldering for 0201-sized parts.", icon: Wrench },
  { id: "bga-rework", name: "BGA Rework Stations", useCase: "Controlled thermal profiling to reflow or rebuild damaged integrated circuit arrays.", metric: "Prevents internal logic board layer warping.", icon: Cpu }
]);

const BRAND_FAILURES = Object.freeze([
  { brand: "Apple MacBook Logic Boards", vuln: "CD3215/CD3217 USB-C controller failure. Device stops taking 20V charge.", remedy: "Micro-soldering replacement of the PMIC array." },
  { brand: "HP EliteBook & Omen", vuln: "Over-current degradation of input power MOSFETs due to extreme thermal load.", remedy: "Desoldering degraded thermal switching links." },
  { brand: "ASUS ROG & Lenovo Legion", vuln: "Micro-fractures along the GPU Ball Grid Array (BGA) from continuous heat cycling.", remedy: "Precision BGA reballing using temperature-resistant alloys." }
]);

const DECISION_MATRIX = Object.freeze([
  { path: "KCROC Chip-Level Repair", cost: "25 KD – 65 KD", data: "100% Retained", verdict: "Highly Recommended" },
  { path: "Full Board Replacement", cost: "120 KD – 300+ KD", data: "Requires Transfer", verdict: "Only if unrepairable" },
  { path: "Buy New Laptop", cost: "250 KD – 1000+ KD", data: "Lost (unless extracted)", verdict: "Last Resort" }
]);

/* ─────────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const DiagnosticChecklist = () => {
  const [state, setState] = useState({ noPower: false, noDisplay: false, spill: false });
  const triggerWarning = state.noPower || state.noDisplay || state.spill;

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-xl transition-all duration-300">
      <h3 className="text-xl font-black text-white tracking-tight mb-2">Hardware Fault Checklist</h3>
      <p className="text-sm text-slate-400 mb-6">Select all symptoms applying to your machine:</p>
      
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-300 group">
          <input type="checkbox" onChange={(e) => setState({...state, noPower: e.target.checked})} className="mt-1 accent-cyan-500 w-4 h-4 rounded border-slate-700 bg-slate-950 transition-colors" />
          <span className="group-hover:text-white transition-colors">Device shows zero power lights when plugged in.</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-300 group">
          <input type="checkbox" onChange={(e) => setState({...state, noDisplay: e.target.checked})} className="mt-1 accent-cyan-500 w-4 h-4 rounded border-slate-700 bg-slate-950 transition-colors" />
          <span className="group-hover:text-white transition-colors">Fans spin, but screen remains completely black.</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-300 group">
          <input type="checkbox" onChange={(e) => setState({...state, spill: e.target.checked})} className="mt-1 accent-cyan-500 w-4 h-4 rounded border-slate-700 bg-slate-950 transition-colors" />
          <span className="group-hover:text-white transition-colors">Machine suffered a liquid spill or extreme condensation.</span>
        </label>
      </div>

      {triggerWarning && (
        <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-500" />
          <span className="leading-relaxed">
            <strong className="text-white block mb-1">Engineering Verdict:</strong> 
            High probability of power rail short circuit. Do not attempt to power on. Request diagnostic containment.
          </span>
        </div>
      )}
    </div>
  );
};

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

export default function MotherboardRepair() {
  const pageUrl = `${BUSINESS_INFO.url}/motherboard-repair-kuwait`;
  const waMessage = encodeURIComponent("Hi KCROC, my laptop motherboard might be dead. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": "Motherboard Repair Kuwait | Chip-Level Logic Board Fix",
        "url": pageUrl,
        "description": "Expert motherboard repair in Kuwait. We fix dead laptops via chip-level micro-soldering, power rail diagnostics, and liquid damage recovery. No Fix, No Charge.",
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": "Chip-Level Motherboard Repair",
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
        "description": "Component-level diagnostics, power rail tracing, and micro-soldering for dead laptop motherboards in Kuwait.",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BUSINESS_INFO.url}/services` },
          { "@type": "ListItem", "position": 3, "name": "Motherboard Repair", "item": pageUrl }
        ]
      }
    ]
  }), [pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <Helmet>
        <title>Motherboard Repair Kuwait | Chip-Level Fix | KCROC</title>
        <meta name="description" content="Expert motherboard repair in Kuwait. We fix dead laptops via chip-level micro-soldering, power rail diagnostics, and liquid damage recovery. No Fix, No Charge." />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Motherboard Repair</li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Cpu size={16} aria-hidden="true" /> Component-Level Engineering
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Motherboard Repair <br className="hidden md:block" />
            in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kuwait</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            In most cases, motherboard failure is caused by a microscopic power rail short circuit, not total CPU failure. We use advanced chip-level micro-soldering to revive dead laptops, saving you hundreds of Dinars.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02]">
              Book Free Diagnostic <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-3 w-full sm:w-auto bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-base transition-all hover:border-cyan-500/30">
              <Phone size={20} className="text-cyan-400" /> Call Technician
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-sm text-slate-400 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400"/> No Fix, No Charge</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-emerald-400"/> Serving All Kuwait</span>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ARCHITECTURE ─── */}
      <article className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-8 space-y-24">
          
          {/* Awareness Section */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Why is my laptop not turning on?</h2>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
                When a laptop suddenly dies or fails to power on, service centers often declare the logic board "fried." <strong className="text-white">This is rarely accurate.</strong> 
              </p>
              <p>
                A motherboard is a grid of electrical highways. A dead laptop usually means a single microscopic component—such as a 19V input MOSFET or a ceramic capacitor—has short-circuited. This triggers the board's self-protection mode, cutting all power to save the CPU. 
              </p>
              <div className="bg-slate-900/50 backdrop-blur-md border-l-4 border-cyan-500 p-6 rounded-r-2xl mt-8">
                <p className="text-base text-slate-300 font-medium italic">
                  "Rather than demanding a 200 KD motherboard replacement, KCROC engineers isolate the exact shorted micro-component and replace it, restoring the original board structure."
                </p>
              </div>
            </div>
          </section>

          {/* Diagnostic Tools */}
          <section>
            <h2 className="text-3xl font-black text-white mb-8">How We Diagnose Dead Motherboards</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {DIAGNOSTIC_TOOLS.map((tool) => (
                <div key={tool.id} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-lg font-black text-white mb-3 flex items-center gap-3">
                    <tool.icon size={20} className="text-cyan-400" /> {tool.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{tool.useCase}</p>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{tool.metric}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Common Failures */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Common Logic Board Failures in Kuwait</h2>
            <p className="text-slate-400 mb-8 text-lg">Extreme summer heat and A/C condensation in Kuwait create specific hardware failure patterns across major brands:</p>
            <div className="space-y-6">
              {BRAND_FAILURES.map((item, idx) => (
                <div key={idx} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:flex justify-between items-center gap-6 group hover:border-cyan-500/30 transition-all">
                  <div>
                    <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2">{item.brand}</h3>
                    <p className="text-lg font-bold text-white leading-snug">{item.vuln}</p>
                  </div>
                  <div className="mt-6 md:mt-0 shrink-0">
                    <span className="text-sm font-bold bg-cyan-950/30 text-cyan-300 border border-cyan-900/50 px-4 py-3 rounded-xl block text-center shadow-inner">
                      Fix: {item.remedy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Decision Matrix */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Can a motherboard be repaired instead of replaced?</h2>
            <p className="text-slate-400 mb-8 text-lg">Yes. Chip-level repair is significantly more cost-effective and completely preserves your data.</p>
            <div className="overflow-hidden border border-slate-800 rounded-3xl bg-slate-900/30 backdrop-blur-md">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-950/50 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-xs">
                    <th className="p-6">Repair Path</th>
                    <th className="p-6">Estimated Cost</th>
                    <th className="p-6">Data Safety</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {DECISION_MATRIX.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-6 font-bold text-white">{row.path}</td>
                      <td className="p-6 text-emerald-400 font-bold">{row.cost}</td>
                      <td className="p-6">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <DiagnosticChecklist />
          
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Related Repair Services</h3>
            <div className="flex flex-col gap-3">
              <Link to="/macbook-repair-kuwait" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-sm font-bold text-slate-300">
                MacBook Logic Board Repair <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/data-recovery-kuwait" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-sm font-bold text-slate-300">
                Dead Laptop Data Recovery <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/laptop-screen-repair-kuwait" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-sm font-bold text-slate-300">
                Laptop Screen Replacement <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {/* ─── FAQ SECTION ─── */}
      <section className="max-w-3xl mx-auto px-6 relative z-10 mb-24 mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-4">Common Motherboard Repair Questions</h2>
          <p className="text-slate-400">Clear answers from our component-level engineers.</p>
        </div>
        <FAQAccordion items={FAQS} />
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Don't Work Through a Dead Laptop.</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Get a professional, chip-level diagnostic from KCROC. Free pickup available across Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2">
              Book Free Diagnostic Pickup <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Phone size={20} className="text-cyan-400" /> Call Technician
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
