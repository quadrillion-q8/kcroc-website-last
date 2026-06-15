import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Laptop, Monitor, Wrench, Apple, 
  Clock, CheckCircle, Phone, MessageCircle,
  ShieldCheck, Truck, ChevronDown, Cpu, Gamepad2, ArrowRight
} from 'lucide-react';

// ─── Constants & Core Data ───────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/services`;

const cleanPhone = BUSINESS_PHONE.replace(/\D/g, '');
const buildWaLink = (message: string) => `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
const DEFAULT_WA_LINK = buildWaLink("Hi KCROC, I need help with a computer repair. Please arrange a free diagnostic & pickup in Kuwait.");

// New Routing Data for the Grid Cards
const SERVICE_LINKS = [
  {
    title: "Laptop Repair",
    excerpt: "Comprehensive hardware diagnostics, advanced thermal management, and performance restoration for all Windows laptop brands.",
    path: "/laptop-repair-kuwait",
    icon: Laptop
  },
  {
    title: "MacBook Repair",
    excerpt: "Expert Apple logic board micro-soldering, liquid damage recovery, and OEM screen/battery replacement.",
    path: "/macbook-repair-kuwait",
    icon: Apple
  },
  {
    title: "Gaming PC Repair",
    excerpt: "High-performance thermal engineering, GPU diagnostics, and cooling solutions for custom rigs and gaming laptops.",
    path: "/gaming-pc-repair-kuwait",
    icon: Gamepad2
  },
  {
    title: "Motherboard Repair",
    excerpt: "Chip-level diagnostics, blown capacitor replacement, and short circuit repair to save your device from the scrapyard.",
    path: "/chip-level-motherboard-repair-hawalli",
    icon: Cpu
  },
  {
    title: "Screen Replacement",
    excerpt: "Flawless LCD and OLED display panel replacements for laptops and MacBooks, fitted with precision.",
    path: "/screen-replacement-kuwait",
    icon: Monitor
  },
  {
    title: "Data Recovery & Security",
    excerpt: "Secure file retrieval from failing SSDs/HDDs, privacy protection, and complete OS security hardening.",
    path: "/data-recovery-kuwait",
    icon: ShieldCheck
  }
];

const FAQS = [
  { q: "Do you offer free pickup and delivery in Kuwait?", a: "Yes, we offer completely free pickup and delivery across all governorates in Kuwait, including Hawalli, Salmiya, and Kuwait City." },
  { q: "What is your turnaround time for repairs?", a: "Most diagnostic assessments are completed the same day. Standard repairs like screen or battery replacements take 24-48 hours." },
  { q: "Do I pay if my computer cannot be fixed?", a: "No. We operate on a strict No Fix, No Fee policy. If we cannot repair your device, you pay absolutely nothing." },
  { q: "Do you provide a warranty on repairs?", a: "Yes, all our hardware repairs and replacement parts come with a 30-day warranty for your peace of mind." }
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Expert Laptop, MacBook & PC Repair in Kuwait | KCROC",
      "url": PAGE_URL,
      "description": "Expert laptop, MacBook & PC repair in Kuwait with free pickup, same-day diagnostics, and no-fix-no-fee policy.",
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": CANONICAL_URL },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": PAGE_URL }
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": `${CANONICAL_URL}/#business`,
      "name": BUSINESS_NAME,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Computer Repair Services",
        "itemListElement": SERVICE_LINKS.map((s, idx) => ({
          "@type": "Offer",
          "position": idx + 1,
          "itemOffered": {
            "@type": "Service",
            "name": s.title,
            "description": s.excerpt
          }
        }))
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ]
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const HeroSection = () => (
  <section className="relative py-12 md:py-24 px-6 flex flex-col justify-center items-center overflow-hidden border-b border-slate-800/50">
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
    
    <div className="relative w-full max-w-4xl text-center z-10 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        <ShieldCheck className="w-4 h-4" aria-hidden="true" /> Component-Level Diagnostic Lab
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-white">
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Solutions.</span>
      </h1>
      
      <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
        Stop struggling with broken tech. We provide elite laptop, desktop, and MacBook engineering services in Kuwait with free pickup and delivery across all governorates.
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true"/> No Fix, No Fee</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4" aria-hidden="true"/> Free Kuwait Pickup</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4" aria-hidden="true"/> Same-Day Slots</span>
      </div>
    </div>
  </section>
);

const ServicesHubGrid = () => (
  <section className="py-24 px-6 flex justify-center relative z-10">
    <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICE_LINKS.map((service, index) => (
        <Link 
          key={index}
          to={service.path} 
          className="group bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors shadow-inner">
              <service.icon className="text-cyan-400 w-8 h-8" aria-hidden="true" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
            {service.title}
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
            {service.excerpt}
          </p>
          
          <div className="mt-auto flex items-center text-cyan-500 font-bold text-sm">
            View Service Details 
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="font-bold text-white pr-4 text-sm tracking-wide">{q}</span>
        <ChevronDown size={18} className={`text-cyan-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true"/>
      </button>
      <div id={`${id}-panel`} hidden={!open} className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
        <div className="py-5">{a}</div>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="py-20 px-6 flex justify-center relative bg-slate-900/10 border-t border-slate-800/50">
    <div className="w-full max-w-3xl z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Service Protocol</h2>
        <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Frequently Asked Questions</p>
      </div>
      <div>
        {FAQS.map((faq, idx) => (
          <FAQItem key={idx} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="relative py-24 px-6 border-t border-slate-800/50 flex justify-center overflow-hidden bg-slate-900/10">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none"></div>
    
    <div className="w-full max-w-4xl text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
        Hardware Failing? <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">We Can Fix It.</span>
      </h2>
      <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
        Contact KCROC today for expert hardware diagnostics with free pickup and delivery across all Kuwait governorates. If we can't fix it, you pay nothing.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={`tel:${cleanPhone}`} aria-label="Call KCROC support" className="flex items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-white font-bold rounded-full px-8 py-4 text-sm uppercase tracking-wider transition-all hover:border-cyan-500/30">
          <Phone className="w-5 h-5 text-cyan-400" aria-hidden="true" /> Call {BUSINESS_PHONE}
        </a>
        <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC support" className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
          <MessageCircle className="w-5 h-5" aria-hidden="true" /> Start Free Diagnostic
        </a>
      </div>
    </div>
  </section>
);

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function Services() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
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
      <Helmet>
        <title>Expert Laptop, MacBook & PC Repair in Kuwait | KCROC</title>
        <link rel="canonical" href={PAGE_URL} />
        <meta name="description" content="Expert laptop, MacBook & PC repair in Kuwait with free pickup, same-day diagnostics, and no-fix-no-fee policy." />
        <meta property="og:title" content="Expert Laptop, MacBook & PC Repair in Kuwait | KCROC" />
        <meta property="og:description" content="Elite component-level laptop, desktop, and MacBook repair in Kuwait. Free pickup and delivery." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${CANONICAL_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="w-full bg-transparent text-white font-sans pb-24 md:pb-0 overflow-x-hidden selection:bg-cyan-500/30">
        
        <div className="w-full bg-slate-900/30 backdrop-blur-sm pt-28 pb-4 px-6 border-b border-slate-800/50 flex justify-center relative z-10">
          <nav aria-label="Breadcrumb" className="w-full max-w-6xl text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> 
            <span className="mx-2 opacity-50" aria-hidden="true">/</span> 
            <span className="text-slate-300" aria-current="page">Our Services</span>
          </nav>
        </div>

        <HeroSection />
        
        {/* THIS is the new Grid replacing your old long-scrolling layout */}
        <ServicesHubGrid />
        
        <FAQSection />
        <FinalCTASection />

        {/* Sticky Mobile CTA Bottom Bar */}
        <div className={`fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden transition-transform duration-500 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-cyan-500 py-3 rounded-xl text-slate-950 font-black text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-wider uppercase flex items-center justify-center gap-2">
            WhatsApp
          </a>
          <a href={`tel:${cleanPhone}`} className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2">
            Call Lab
          </a>
        </div>
      </main>
    </>
  );
}
