// File: app/frontend/src/pages/Services.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, CheckCircle, Truck, Clock,
  Phone, MessageCircle, ChevronDown, ArrowRight
} from 'lucide-react';

import { BUSINESS_INFO, SERVICES } from '../constants/data';
import { ROUTES } from '../constants/routes';
import { generateSchema } from '../utils/schemaGenerator'; // ✅ Factory Import
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}${ROUTES.services}`;
const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
  'Hi KCROC, I need help with a computer repair. Please arrange a free diagnostic & pickup in Kuwait.'
)}`;

const FAQS = [
  { q: "Do you offer free pickup and delivery in Kuwait?", a: "Yes, we offer completely free pickup and delivery across all governorates in Kuwait, including Hawalli, Salmiya, and Kuwait City." },
  { q: "What is your turnaround time for repairs?", a: "Most diagnostic assessments are completed the same day. Standard repairs like screen or battery replacements take 24–48 hours." },
  { q: "Do I pay if my computer cannot be fixed?", a: "No. We operate on a strict No Fix, No Fee policy. If we cannot repair your device, you pay absolutely nothing." },
  { q: "Do you provide a warranty on repairs?", a: "Yes, all hardware repairs and replacement parts come with a 30-day warranty." }
];

// ✅ Refactored: Structured data using our factory
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Expert Laptop, MacBook & PC Repair in Kuwait | KCROC",
      "url": PAGE_URL,
      "description": "Expert laptop, MacBook & PC repair in Kuwait with free pickup, same-day diagnostics, and no-fix-no-fee policy.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": PAGE_URL }
      ]
    },
    generateSchema('LocalBusiness', {
      street: "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
      city: "Hawalli"
    }),
    generateSchema('FAQ', FAQS)
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const HeroSection = () => (
  <section className="relative py-12 md:py-24 px-6 flex flex-col justify-center items-center overflow-hidden border-b border-slate-800/50">
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
    <div className="relative w-full max-w-4xl text-center z-10 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        <ShieldCheck className="w-4 h-4" aria-hidden="true" /> Component-Level Diagnostic Lab
      </div>
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-white">
        Professional{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Solutions.</span>
      </h1>
      <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
        Stop struggling with broken tech. We provide elite laptop, desktop, and MacBook engineering services in Kuwait with free pickup and delivery across all governorates.
      </p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> No Fix, No Fee</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4" aria-hidden="true" /> Free Kuwait Pickup</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4" aria-hidden="true" /> Same-Day Slots</span>
      </div>
    </div>
  </section>
);

const ServicesHubGrid = () => (
  <section aria-labelledby="services-grid-heading" className="py-24 px-6 flex justify-center relative z-10">
    <h2 id="services-grid-heading" className="sr-only">Our Services</h2>
    <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service) => (
        <Link
          key={service.path}
          to={service.path}
          className="group bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors shadow-inner">
              <service.icon className="text-cyan-400 w-8 h-8" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
          <div className="mt-auto flex items-center text-cyan-500 font-bold text-sm">
            View Service Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm mb-3 transition-colors hover:border-slate-700">
      <button
        id={`${id}-button`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
      >
        <span className="font-bold text-white pr-4 text-sm tracking-wide">{q}</span>
        <ChevronDown size={18} className={`text-cyan-400 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} hidden={!open} className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
        <div className="py-5">{a}</div>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section aria-labelledby="faq-section-heading" className="py-20 px-6 flex justify-center relative bg-slate-900/10 border-t border-slate-800/50">
    <div className="w-full max-w-3xl z-10">
      <div className="text-center mb-12">
        <h2 id="faq-section-heading" className="text-3xl font-black text-white mb-3 tracking-tight">Service Protocol</h2>
        <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Frequently Asked Questions</p>
      </div>
      <div>{FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}</div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="relative py-24 px-6 border-t border-slate-800/50 flex justify-center overflow-hidden bg-slate-900/10">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
    <div className="w-full max-w-4xl text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Hardware Failing? <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">We Can Fix It.</span></h2>
      <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
        Contact KCROC today for expert hardware diagnostics with free pickup and delivery across all Kuwait governorates. If we can't fix it, you pay nothing.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={`tel:${BUSINESS_INFO.phone}`} aria-label="Call KCROC support" className="flex items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-white font-bold rounded-full px-8 py-4 text-sm uppercase tracking-wider transition-all hover:border-cyan-500/30">
          <Phone className="w-5 h-5 text-cyan-400" aria-hidden="true" /> Call {BUSINESS_INFO.phone}
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC for free pickup" className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
          <MessageCircle className="w-5 h-5" aria-hidden="true" /> Start Free Diagnostic
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Services() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setShowStickyCTA(window.scrollY > 400);
        timeoutId = null;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <MetaSEO
        title="Expert Laptop, MacBook & PC Repair in Kuwait | KCROC"
        description="Expert laptop, MacBook & PC repair in Kuwait with free pickup, same-day diagnostics, and no-fix-no-fee policy."
        canonical={PAGE_URL}
        ogImage={`${BUSINESS_INFO.url}/og-image.jpg`}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <main className="w-full bg-transparent text-white font-sans pb-24 md:pb-0 overflow-x-hidden selection:bg-cyan-500/30">
        <div className="w-full bg-slate-900/30 backdrop-blur-sm pt-28 pb-4 px-6 border-b border-slate-800/50 flex justify-center relative z-10">
          <nav aria-label="Breadcrumb" className="w-full max-w-6xl">
            <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
              <li><Link to={ROUTES.home} className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="text-slate-600 mx-1" aria-hidden="true">/</span></li>
              <li aria-current="page" className="text-slate-300">Our Services</li>
            </ol>
          </nav>
        </div>

        <HeroSection />
        <ServicesHubGrid />
        <FAQSection />
        <FinalCTASection />

        <div aria-hidden={!showStickyCTA} className={`fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden transition-transform duration-500 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" tabIndex={showStickyCTA ? 0 : -1} className="flex-1 bg-cyan-500 py-3 rounded-xl text-slate-950 font-black text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-wider uppercase flex items-center justify-center gap-2">WhatsApp</a>
          <a href={`tel:${BUSINESS_INFO.phone}`} tabIndex={showStickyCTA ? 0 : -1} className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2">Call Lab</a>
        </div>
      </main>
    </>
  );
}
