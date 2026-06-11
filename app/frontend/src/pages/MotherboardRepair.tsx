import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Droplets, MapPin, CheckCircle, ArrowRight, 
  ChevronDown, Phone, MessageCircle, Calendar 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ─────────────────────────────────────────────────────────────────────────────
// 1. DATA LAYER (Static data outside component prevents re-renders)
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Why is my laptop not turning on at all in Kuwait?",
    a: "A total lack of power usually indicates a catastrophic short circuit on your primary 19V power rail. This is frequently caused by a blown input MOSFET or a failed power IC chip, which we isolate and swap using chip-level micro-soldering."
  },
  {
    q: "Can a motherboard be repaired instead of replaced?",
    a: "In over 85% of cases, yes. A 'dead' motherboard is often caused by a single shorted capacitor. By finding and replacing that microscopic component, we revive the entire logic board without a costly full replacement."
  },
  {
    q: "How much does motherboard repair cost in Kuwait?",
    a: "Chip-level repair at KCROC typically ranges from 25 KD to 65 KD depending on the exact IC or MOSFET failure. This is 60% to 80% cheaper than dealership motherboard replacements, which often exceed 150 KD."
  },
  {
    q: "Is my data safe during an emergency logic board repair?",
    a: "Yes, your data is completely secure. Motherboard repair targets power delivery circuits. Your NVMe SSD or hard drive is safely extracted before any thermal soldering begins, ensuring zero risk of data loss."
  },
  {
    q: "How long does it take to repair a laptop motherboard in Hawalli?",
    a: "Standard component-level diagnostics take 24 hours. Full micro-soldering repair and thermal stress testing usually require 2 to 4 business days. We offer free pickup and delivery to expedite the process."
  },
  {
    q: "Do you repair liquid-damaged laptops?",
    a: "Yes. We utilize industrial ultrasonic cleaning to strip microscopic mineral corrosion caused by spills before tracing and replacing the short-circuited logic board components."
  },
  {
    q: "Can you fix a MacBook with a black screen but running fans?",
    a: "Yes. If your MacBook has a black screen but the fans spin, the issue is commonly a blown backlight fuse or a failed display power management IC (LP8550 chip), which we repair at the component level."
  },
  {
    q: "What happens if my motherboard cannot be fixed?",
    a: "If catastrophic damage has occurred—such as a cracked CPU die or burnt internal fiberglass layers—we will advise you to replace the machine. Under our 'No Fix, No Charge' policy, you pay nothing for the diagnostic."
  }
];

const diagnosticTools = [
  {
    id: "flir-cam",
    name: "FLIR Thermal Imaging",
    useCase: "Pinpoints infrared heat spikes to instantly locate short-circuited surface components.",
    metric: "Detects abnormal power draw down to 0.01W."
  },
  {
    id: "fluke-meter",
    name: "Industrial Multimeters",
    useCase: "Validates 19V main, 3.3V, and 5V standby power rails against open-source boardviews.",
    metric: "Measures precise micro-resistance drops."
  },
  {
    id: "jbc-station",
    name: "Nano Micro-Soldering",
    useCase: "Localized extraction of microscopic surface-mount components under high magnification.",
    metric: "Executes targeted soldering for 0201-sized parts."
  },
  {
    id: "bga-rework",
    name: "BGA Rework Stations",
    useCase: "Controlled thermal profiling to reflow or rebuild damaged integrated circuit arrays.",
    metric: "Prevents internal logic board layer warping."
  }
];

const brandFailures = [
  {
    brand: "Apple MacBook Logic Boards",
    vuln: "CD3215/CD3217 USB-C controller failure. Device stops taking 20V charge.",
    remedy: "Micro-soldering replacement of the PMIC array."
  },
  {
    brand: "HP EliteBook & Omen",
    vuln: "Over-current degradation of input power MOSFETs due to extreme thermal load.",
    remedy: "Desoldering degraded thermal switching links."
  },
  {
    brand: "ASUS ROG & Lenovo Legion",
    vuln: "Micro-fractures along the GPU Ball Grid Array (BGA) from continuous heat cycling.",
    remedy: "Precision BGA reballing using temperature-resistant alloys."
  }
];

const decisionMatrix = [
  { path: "KCROC Chip-Level Repair", cost: "25 KD – 65 KD", data: "100% Retained", verdict: "Highly Recommended" },
  { path: "Full Board Replacement", cost: "120 KD – 300+ KD", data: "Requires Transfer", verdict: "Only if unrepairable" },
  { path: "Buy New Laptop", cost: "250 KD – 1000+ KD", data: "Lost (unless extracted)", verdict: "Last Resort" }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. SCHEMA GENERATOR (Guaranteed 1:1 match with visible content)
// ─────────────────────────────────────────────────────────────────────────────

const getMotherboardSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      "@type": "Organization",
      "@id": "https://www.computerrepairkuwait.com/#organization",
      "name": "Kuwait Computer Repair On Call",
      "alternateName": "KCROC",
      "url": "https://www.computerrepairkuwait.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.computerrepairkuwait.com/logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/kcrok.kuwait",
        "https://www.instagram.com/kcroc.kw"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.computerrepairkuwait.com/#business",
      "name": "KCROC Hardware Lab",
      "parentOrganization": { "@id": "https://www.computerrepairkuwait.com/#organization" },
      "telephone": "+96555301913",
      "image": "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908596/Professional_laptop_motherboard_soldering_repair_-_Hawalli_service_vropbf.jpg",
      "priceRange": "KWD 25 - KWD 65",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Basement Shop 19",
        "addressLocality": "Hawalli",
        "addressCountry": "KW"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 29.3356, "longitude": 48.025 }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait#webpage",
      "url": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait",
      "name": "Motherboard Repair Kuwait | Chip-Level Logic Board Fix",
      "isPartOf": { "@id": "https://www.computerrepairkuwait.com/#website" },
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["#speakable-summary"] }
    },
    {
      "@type": "Service",
      "@id": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait#service",
      "name": "Chip-Level Motherboard Repair",
      "serviceType": "Logic Board Micro-Soldering",
      "providerMobility": "Mobile Repair Service",
      "provider": { "@id": "https://www.computerrepairkuwait.com/#business" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Hawalli Governorate" },
        { "@type": "AdministrativeArea", "name": "Capital Governorate" },
        { "@type": "AdministrativeArea", "name": "Farwaniya Governorate" },
        { "@type": "AdministrativeArea", "name": "Ahmadi Governorate" },
        { "@type": "AdministrativeArea", "name": "Jahra Governorate" }
      ],
      "description": "Component-level diagnostics, power rail tracing, and micro-soldering for dead laptop motherboards in Kuwait."
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait#faq",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ]
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. INTERNAL COMPONENTS & HOOKS
// ─────────────────────────────────────────────────────────────────────────────

const useScrollVisibility = (threshold: number = 400) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  return isVisible;
};

const DiagnosticChecklist = () => {
  const [state, setState] = useState({ noPower: false, noDisplay: false, spill: false });
  const triggerWarning = state.noPower || state.noDisplay || state.spill;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-white tracking-tight">30-Second Hardware Fault Checklist</h3>
      <p className="text-xs text-gray-400">Check all that apply to your laptop:</p>
      
      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-300">
          <input type="checkbox" onChange={(e) => setState({...state, noPower: e.target.checked})} className="mt-1 accent-emerald-500 w-4 h-4 rounded bg-gray-950 border-gray-800" />
          <span>Device shows zero power lights when plugged in.</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-300">
          <input type="checkbox" onChange={(e) => setState({...state, noDisplay: e.target.checked})} className="mt-1 accent-emerald-500 w-4 h-4 rounded bg-gray-950 border-gray-800" />
          <span>Fans spin, but screen remains completely black.</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-300">
          <input type="checkbox" onChange={(e) => setState({...state, spill: e.target.checked})} className="mt-1 accent-emerald-500 w-4 h-4 rounded bg-gray-950 border-gray-800" />
          <span>Machine suffered a liquid spill or extreme A/C condensation.</span>
        </label>
      </div>

      {triggerWarning && (
        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-300 animate-in fade-in duration-200">
          <strong>Engineering Verdict:</strong> High probability of power rail short circuit. Do not attempt to power on. Request diagnostic containment.
        </div>
      )}
    </div>
  );
};

const FAQAccordion = ({ items }: { items: {q: string, a: string}[] }) => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden">
          <button onClick={() => setActive(active === i ? null : i)} className="w-full p-5 text-left flex justify-between text-white font-bold text-sm md:text-base hover:bg-gray-800/40 transition-colors">
            <span className="pr-4">{faq.q}</span>
            <ChevronDown className={`shrink-0 transition-transform duration-200 ${active === i ? 'rotate-180 text-emerald-400' : 'text-gray-500'}`} />
          </button>
          {active === i && <div className="p-5 pt-0 text-sm text-gray-400 leading-relaxed animate-in fade-in duration-200"><p>{faq.a}</p></div>}
        </div>
      ))}
    </div>
  );
};

const StickyMobileCTA = () => {
  const isVisible = useScrollVisibility();
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 border-t border-gray-800 backdrop-blur-md px-4 py-3 md:hidden flex gap-2 animate-in slide-in-from-bottom duration-300">
      <Link to="/book" className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-xl py-3 text-sm font-bold shadow-lg">
        <Calendar size={16} /> Book Free
      </Link>
      <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white rounded-xl py-3 text-sm font-bold border border-gray-700">
        <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
      </a>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function MotherboardRepair() {
  // Memoize schema so it doesn't recalculate on scroll/clicks
  const schema = useMemo(() => getMotherboardSchema(), []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-emerald-500/30">
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Motherboard Repair Kuwait | Chip-Level Logic Board Fix | KCROC</title>
        <meta name="description" content="Expert motherboard repair in Kuwait. We fix dead laptops via chip-level micro-soldering, power rail diagnostics, and liquid damage recovery. No Fix, No Charge." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/motherboard-repair-kuwait" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* HERO: INTENT CAPTURE */}
      <header className="pt-32 pb-16 px-6 text-center border-b border-gray-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 font-bold uppercase tracking-widest text-xs">
            <Cpu className="w-4 h-4 mr-2 inline" /> Component-Level Engineering
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
            Motherboard Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Kuwait</span>
          </h1>
          <p id="speakable-summary" className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            In most cases, motherboard failure is caused by a microscopic power rail short circuit, not total CPU failure. We use advanced chip-level micro-soldering to revive dead laptops and MacBooks, saving you hundreds of Dinars.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6 shadow-lg shadow-emerald-900/20" asChild>
              <Link to="/book">Book Free Diagnostic Pickup</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800 text-lg px-8 py-6" asChild>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 text-emerald-400" /> WhatsApp Consult</a>
            </Button>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400 font-bold">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> No Fix, No Charge</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500"/> Serving All Kuwait</span>
          </div>
        </div>
      </header>

      <article className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {/* PROBLEM AWARENESS (AI Overview Targeted H2) */}
          <section>
            <h2 className="text-3xl font-black text-white mb-4">Why is my laptop not turning on?</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              When a laptop suddenly dies or fails to power on, service centers often declare the logic board "fried." <strong>This is rarely accurate.</strong> 
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              A motherboard is a grid of electrical highways. A dead laptop usually means a single microscopic component—such as a 19V input MOSFET or a ceramic capacitor—has short-circuited. This triggers the board's self-protection mode, cutting all power to save the CPU. 
            </p>
            <div className="bg-gray-900 border-l-4 border-emerald-500 p-5 rounded-r-xl">
              <p className="text-sm text-gray-300 font-medium italic">
                "Rather than demanding a 200 KD motherboard replacement, KCROC engineers isolate the exact shorted micro-component and replace it, restoring the original board structure."
              </p>
            </div>
          </section>

          {/* TECHNICAL AUTHORITY */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">How We Diagnose Dead Motherboards</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {diagnosticTools.map((tool) => (
                <div key={tool.id} className="bg-gray-900/40 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2 text-emerald-400">{tool.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{tool.useCase}</p>
                  <span className="text-xs font-bold text-gray-300 bg-gray-950 px-2 py-1 rounded border border-gray-800 block w-fit">{tool.metric}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ENTITY RELEVANCE (Brand & Geo Targeting) */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Common Logic Board Failures in Kuwait</h2>
            <p className="text-gray-400 mb-6">Extreme summer heat and A/C condensation in Kuwait create specific hardware failure patterns across major brands:</p>
            <div className="space-y-4">
              {brandFailures.map((item, idx) => (
                <div key={idx} className="bg-gray-900/20 border border-gray-800 rounded-xl p-5 md:flex justify-between items-center gap-4">
                  <div>
                    <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">{item.brand}</h3>
                    <p className="text-base font-bold text-white mt-1">{item.vuln}</p>
                  </div>
                  <div className="mt-4 md:mt-0 shrink-0">
                    <span className="text-xs font-bold bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 px-3 py-2 rounded-md block text-center">
                      Fix: {item.remedy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DECISION INTENT (Cost Matrix) */}
          <section>
            <h2 className="text-3xl font-black text-white mb-6">Can a motherboard be repaired instead of replaced?</h2>
            <p className="text-gray-400 mb-6">Yes. Chip-level repair is significantly more cost-effective and completely preserves your data.</p>
            <div className="overflow-x-auto border border-gray-800 rounded-xl bg-gray-950">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-900 text-gray-400 font-bold border-b border-gray-800">
                    <th className="p-4">Repair Path</th>
                    <th className="p-4">Estimated Cost (Kuwait)</th>
                    <th className="p-4">Data Safety</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 text-gray-300">
                  {decisionMatrix.map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 font-bold text-white">{row.path}</td>
                      <td className="p-4 text-emerald-400 font-semibold">{row.cost}</td>
                      <td className="p-4">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* SIDEBAR: Interactive Modules & Internal Linking */}
        <aside className="lg:col-span-4 space-y-8">
          <DiagnosticChecklist />
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-base font-black text-white uppercase tracking-wider mb-4">Related Repair Services</h3>
            <div className="flex flex-col gap-2">
              <Link to="/macbook-repair-kuwait" className="group flex items-center justify-between p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-all text-sm font-semibold text-gray-300">
                MacBook Logic Board Repair <ArrowRight size={14} className="group-hover:text-emerald-400 transition-colors" />
              </Link>
              <Link to="/data-recovery-kuwait" className="group flex items-center justify-between p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-all text-sm font-semibold text-gray-300">
                Dead Laptop Data Recovery <ArrowRight size={14} className="group-hover:text-emerald-400 transition-colors" />
              </Link>
              <Link to="/laptop-screen-repair-kuwait" className="group flex items-center justify-between p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-all text-sm font-semibold text-gray-300">
                Laptop Screen Replacement <ArrowRight size={14} className="group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {/* FAQ (AI Overview Extracts) */}
      <section className="py-20 bg-gray-900/20 border-t border-gray-900 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Common Motherboard Repair Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* FINAL CONVERSION BLOCK */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Don't Work Through a Dead Laptop.</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a professional, chip-level diagnostic from KCROC. Free pickup available across Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-bold px-8 py-6 rounded-xl text-base shadow-xl" asChild>
              <Link to="/book">Book Free Diagnostic Pickup</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-800 bg-gray-900 text-white hover:bg-gray-800 font-bold px-8 py-6 rounded-xl text-base" asChild>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} className="mr-2 text-emerald-400" /> WhatsApp Consult</a>
            </Button>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}
