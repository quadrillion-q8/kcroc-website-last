import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Laptop, MapPin, CheckCircle, ArrowRight, ChevronDown, 
  MessageCircle, Calendar, HelpCircle, ShieldCheck, 
  Cpu, Wrench, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ─────────────────────────────────────────────────────────────────────────────
   1. DATA LAYER (Hoisted & Frozen for 0 re-renders & stable references)
───────────────────────────────────────────────────────────────────────────── */

const FAQS = Object.freeze([
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
    q: "How much does a MacBook logic board repair cost?",
    a: "Chip-level repair costs significantly less than an Apple Authorized board replacement. Exact prices depend on the damaged power ICs or MOSFETs. We provide free diagnostic quotes before proceeding."
  },
  {
    q: "Will I lose my data during a MacBook logic board repair?",
    a: "Data preservation is our priority. Since SSDs on modern MacBooks are soldered directly to the logic board, replacing the board means losing your data. By repairing your original logic board at the chip level, your data remains perfectly intact."
  }
]);

const DIAGNOSTIC_TOOLS = Object.freeze([
  {
    id: "usb-c-amp",
    name: "USB-C Digital Amp Meters",
    useCase: "Monitors power negotiation. If a MacBook is stuck at 5V instead of 20V, we instantly isolate USB-C controller failures.",
    metric: "Detects CD3215/CD3217 communication errors."
  },
  {
    id: "flir-cam",
    name: "FLIR Thermal Imaging",
    useCase: "Pinpoints infrared heat spikes on the logic board to instantly locate short-circuited capacitors or MOSFETs.",
    metric: "Isolates parasitic power draw under 0.01W."
  },
  {
    id: "jbc-station",
    name: "Precision Micro-Soldering",
    useCase: "Safely extracts microscopic surface-mount components (like backlight fuses) under high magnification.",
    metric: "Executes targeted logic board surgery."
  }
]);

const MACBOOK_FAILURES = Object.freeze([
  {
    type: "Logic Board Power Failure",
    vuln: "Device stops taking a charge and remains completely dead. Often stuck at 5V on the charger.",
    remedy: "Micro-soldering replacement of the USB-C PMIC arrays or repairing the PPBUS_G3H power rail."
  },
  {
    type: "Liquid Damage & Corrosion",
    vuln: "Coffee or water spills seep through the keyboard, immediately shorting the logic board.",
    remedy: "Ultrasonic chemical wash and component-level replacement of shorted backlight or power ICs."
  },
  {
    type: "Flexgate / Screen Issues",
    vuln: "Display backlight fails or shows vertical lines when the lid is opened past a certain angle.",
    remedy: "Display assembly replacement or flex cable microsoldering repair."
  }
]);

const DECISION_MATRIX = Object.freeze([
  { path: "KCROC Logic Board Repair", cost: "Highly Cost-Effective", data: "100% Retained", verdict: "Best Choice" },
  { path: "Apple Authorized Swap", cost: "Extremely Expensive", data: "Completely Lost", verdict: "Only if unrepairable" },
  { path: "Buy New MacBook", cost: "350+ KD", data: "Requires Backup", verdict: "Last Resort" }
]);

/* ─────────────────────────────────────────────────────────────────────────────
   2. SCHEMA GENERATOR (Guaranteed 1:1 match with UI)
───────────────────────────────────────────────────────────────────────────── */

const getMacbookSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      "@type": "Organization",
      "@id": "https://www.computerrepairkuwait.com/#organization",
      "name": "KCROC",
      "url": "https://www.computerrepairkuwait.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.computerrepairkuwait.com/logo.png"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.computerrepairkuwait.com/#business",
      "name": "KCROC Apple Logic Board Repair",
      "parentOrganization": { "@id": "https://www.computerrepairkuwait.com/#organization" },
      "telephone": "+96555301913",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Basement Shop 19",
        "addressLocality": "Hawalli",
        "addressCountry": "KW"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 29.3356, "longitude": 48.025 },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "184" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.computerrepairkuwait.com/macbook-repair-kuwait#webpage",
      "url": "https://www.computerrepairkuwait.com/macbook-repair-kuwait",
      "name": "MacBook Repair Kuwait | Logic Board Experts | KCROC",
      "description": "Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, liquid damage recovery, and data preservation. No Fix, No Charge.",
      "isPartOf": { "@id": "https://www.computerrepairkuwait.com/#website" }
    },
    {
      "@type": "Service",
      "@id": "https://www.computerrepairkuwait.com/macbook-repair-kuwait#service",
      "name": "MacBook Logic Board Repair",
      "serviceType": "Apple MacBook Repair",
      "providerMobility": "Mobile Repair Service",
      "provider": { "@id": "https://www.computerrepairkuwait.com/#business" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Hawalli" },
        { "@type": "AdministrativeArea", "name": "Kuwait City" },
        { "@type": "AdministrativeArea", "name": "Salmiya" },
        { "@type": "AdministrativeArea", "name": "Farwaniya" },
        { "@type": "AdministrativeArea", "name": "Jahra" }
      ],
      "description": "Component-level micro-soldering and liquid damage recovery for Apple MacBooks."
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.computerrepairkuwait.com/macbook-repair-kuwait#faq",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ]
});

/* ─────────────────────────────────────────────────────────────────────────────
   3. ISOLATED UI COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const useScrollVisibility = (threshold = 400) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  return isVisible;
};

const DiagnosticChecklist = () => {
  const [state, setState] = useState({ dead: false, trackpad: false, spill: false });
  const isCritical = state.dead || state.trackpad || state.spill;

  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-sm transition-all duration-300">
      <h3 className="text-lg text-white font-bold tracking-tight mb-1">Hardware Fault Checklist</h3>
      <p className="text-xs text-gray-400 mb-4">Select all symptoms applying to your Mac:</p>

      <div className="space-y-3">
        <label htmlFor="chk-dead" className="flex items-start gap-3 cursor-pointer text-sm text-gray-300 group">
          <input 
            id="chk-dead" 
            type="checkbox" 
            onChange={e => setState(s => ({ ...s, dead: e.target.checked }))} 
            className="mt-1 accent-emerald-500 w-4 h-4 rounded border-gray-800 bg-gray-950 transition-colors" 
          />
          <span className="group-hover:text-white transition-colors">Device is completely dead (no power, no fan).</span>
        </label>

        <label htmlFor="chk-trackpad" className="flex items-start gap-3 cursor-pointer text-sm text-gray-300 group">
          <input 
            id="chk-trackpad" 
            type="checkbox" 
            onChange={e => setState(s => ({ ...s, trackpad: e.target.checked }))} 
            className="mt-1 accent-emerald-500 w-4 h-4 rounded border-gray-800 bg-gray-950 transition-colors" 
          />
          <span className="group-hover:text-white transition-colors">Force Touch trackpad feels stiff/won't click.</span>
        </label>

        <label htmlFor="chk-spill" className="flex items-start gap-3 cursor-pointer text-sm text-gray-300 group">
          <input 
            id="chk-spill" 
            type="checkbox" 
            onChange={e => setState(s => ({ ...s, spill: e.target.checked }))} 
            className="mt-1 accent-emerald-500 w-4 h-4 rounded border-gray-800 bg-gray-950 transition-colors" 
          />
          <span className="group-hover:text-white transition-colors">Experienced a liquid spill on the keyboard.</span>
        </label>
      </div>

      {isCritical && (
        <div className="mt-5 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-xs text-emerald-300 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-inner">
          <AlertTriangle size={16} className="shrink-0 mt-0.5 text-emerald-400" />
          <span className="leading-relaxed">
            <strong className="text-white block mb-1">Engineering Verdict:</strong> 
            High probability of logic board power rail short or battery swell. Unplug the charger immediately.
          </span>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = React.memo(({ items }: { items: typeof FAQS }) => {
  const [active, setActive] = useState<number | null>(null);
  
  const toggle = useCallback((i: number) => {
    setActive(prev => (prev === i ? null : i));
  }, []);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = active === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        
        return (
          <div key={i} className="border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden hover:border-gray-700 transition-colors duration-300">
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full p-5 text-left text-white font-bold text-sm md:text-base flex justify-between items-center hover:bg-gray-800/60 transition-colors gap-4"
              onClick={() => toggle(i)}
            >
              <span className="flex items-start gap-3">
                <HelpCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                {faq.q}
              </span>
              <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-400" : "text-gray-500"}`} />
            </button>

            {isOpen && (
              <div 
                id={panelId} 
                aria-labelledby={btnId} 
                className="px-5 pb-5 pt-1 pl-12 text-gray-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

const StickyMobileCTA = () => {
  const isVisible = useScrollVisibility(400);
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-lg border-t border-gray-800 md:hidden flex gap-3 p-4 animate-in slide-in-from-bottom-full duration-300 shadow-2xl">
      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20" asChild>
        <Link to="/book" className="flex items-center justify-center gap-2">
          <Calendar size={16} /> Book
        </Link>
      </Button>
      <Button variant="outline" className="flex-1 bg-gray-900 border-gray-700 text-white font-bold rounded-xl hover:bg-gray-800" asChild>
        <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
          <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
        </a>
      </Button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   4. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function MacBookRepair() {
  const schema = useMemo(() => getMacbookSchema(), []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-emerald-500/30">
      
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>MacBook Repair Kuwait | Logic Board Experts | KCROC</title>
        <meta name="description" content="Expert Apple MacBook repair in Kuwait. We fix dead MacBooks via logic board micro-soldering, liquid damage recovery, and preserve your data. Free Pickup." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/macbook-repair-kuwait" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* HERO SECTION */}
      <header className="pt-48 md:pt-56 pb-20 px-6 text-center border-b border-gray-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-gray-950">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 font-bold uppercase tracking-widest text-xs shadow-sm">
            <Laptop className="w-4 h-4 mr-2 inline" /> Independent Apple Specialists
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
            MacBook Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Kuwait</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
            Authorized centers replace your entire logic board, permanently deleting your data. We utilize chip-level micro-soldering to fix your original board, preserving your files and saving your budget.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-xl shadow-emerald-900/30 hover:-translate-y-0.5 transition-all duration-300" asChild>
              <Link to="/book">Book Free Diagnostic Pickup</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 hover:border-gray-600 font-bold px-8 py-6 rounded-xl text-base transition-all duration-300" asChild>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 text-emerald-400" size={20} /> WhatsApp Consult
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-y-3 gap-x-8 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> No Fix, No Charge</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> Kuwait-Wide Service</span>
            <span className="flex items-center gap-2"><Cpu size={16} className="text-emerald-500" /> M-Series & Intel</span>
          </div>
        </div>
      </header>

      {/* CORE CONTENT ARCHITECTURE */}
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16">
        
        <article className="lg:col-span-8 space-y-20">
          
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Why Do MacBooks Stop Turning On?</h2>
            <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg">
              <p>
                When a MacBook suddenly dies, standard retail diagnosis is often "total logic board failure." <strong>However, logic boards are highly repairable.</strong>
              </p>
              <p>
                Modern MacBooks rely on complex power negotiation. A single failed microscopic chip (like the <strong>CD3215 USB-C controller</strong>) or a short circuit on the main power rail (<strong>PPBUS_G3H</strong>) will trigger a protective shutdown. By isolating and replacing only the shorted micro-component, KCROC restores your system without replacing the entire board.
              </p>
              <div className="mt-8 bg-gray-900/80 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm">
                <p className="text-sm md:text-base text-gray-300 font-medium italic m-0">
                  "Because modern MacBook SSDs are soldered directly to the board, Apple's official 'board swap' deletes your data. By repairing your specific shorted chip, KCROC restores your MacBook with your data perfectly intact."
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6">Diagnostic Lab Tools</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {DIAGNOSTIC_TOOLS.map((t, i) => (
                <div key={i} className="p-6 border border-gray-800 bg-gray-900/30 rounded-2xl hover:bg-gray-900/60 hover:border-gray-700 transition-all duration-300 group">
                  <h3 className="font-bold text-white flex items-center gap-3 mb-3">
                    <Wrench size={18} className="text-emerald-400" /> {t.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{t.useCase}</p>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/30 px-3 py-1.5 rounded-md border border-emerald-900/50 inline-block group-hover:bg-emerald-900/40 transition-colors">
                    {t.metric}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6">Common Logic Board Failures</h2>
            <div className="space-y-5">
              {MACBOOK_FAILURES.map((item, idx) => (
                <div key={idx} className="bg-gray-900/20 border border-gray-800 rounded-2xl p-6 md:flex justify-between items-center gap-6 hover:border-gray-700 transition-colors duration-300">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest">{item.type}</h3>
                    <p className="text-base font-bold text-white">{item.vuln}</p>
                  </div>
                  <div className="mt-4 md:mt-0 shrink-0">
                    <span className="text-sm font-bold bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 px-4 py-2 rounded-lg block text-center shadow-sm">
                      Fix: {item.remedy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6">Repair vs. Replacement Cost Matrix</h2>
            <div className="overflow-x-auto border border-gray-800 rounded-2xl bg-gray-950 shadow-sm">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-900/80 text-gray-400 font-bold border-b border-gray-800">
                    <th className="p-5">Service Path</th>
                    <th className="p-5">Financial Cost</th>
                    <th className="p-5">Data Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/50 text-gray-300">
                  {DECISION_MATRIX.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-900/30 transition-colors">
                      <td className="p-5 font-bold text-white">{row.path}</td>
                      <td className="p-5 text-emerald-400 font-semibold">{row.cost}</td>
                      <td className="p-5">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">
          <DiagnosticChecklist />

          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Related Services</h3>
            <div className="flex flex-col gap-3">
              <Link to="/motherboard-repair-kuwait" className="group flex justify-between items-center p-4 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-700 hover:bg-gray-900 text-sm font-semibold text-gray-300 transition-all duration-300">
                Windows Motherboard Repair 
                <ArrowRight size={16} className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
              <Link to="/laptop-screen-repair-kuwait" className="group flex justify-between items-center p-4 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-700 hover:bg-gray-900 text-sm font-semibold text-gray-300 transition-all duration-300">
                MacBook Screen Replacement 
                <ArrowRight size={16} className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
              <Link to="/data-recovery-kuwait" className="group flex justify-between items-center p-4 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-700 hover:bg-gray-900 text-sm font-semibold text-gray-300 transition-all duration-300">
                MacBook Data Recovery 
                <ArrowRight size={16} className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </aside>

      </main>

      {/* FAQ SECTION */}
      <section className="py-20 lg:py-28 bg-gray-900/30 border-t border-gray-900 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">MacBook Repair FAQs</h2>
            <p className="text-gray-400 text-lg">Clear answers regarding logic board repairs and data safety.</p>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* FINAL CONVERSION */}
      <section className="py-20 lg:py-32 px-6 border-t border-gray-900 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900/80 via-gray-950 to-gray-950">
        <div className="max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-16 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Don't Write Off Your MacBook.</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Get a professional, chip-level diagnostic from KCROC. Free pickup available across Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-bold px-8 py-6 rounded-xl text-base shadow-xl shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-300" asChild>
                <Link to="/book">Book Free Diagnostic Pickup</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 bg-gray-900/80 text-white hover:bg-gray-800 hover:border-gray-600 font-bold px-8 py-6 rounded-xl text-base transition-all duration-300" asChild>
                <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} className="mr-2 text-emerald-400" /> WhatsApp Consult</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <StickyMobileCTA />
    </div>
  );
}
