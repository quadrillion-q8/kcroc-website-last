import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Laptop, Monitor, Wrench, Printer, Apple, 
  Clock, DollarSign, CheckCircle, Phone, MessageCircle,
  ShieldCheck, Truck, ChevronDown, Cpu
} from 'lucide-react';

// ─── Constants & Core Data ───────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/services`;

const cleanPhone = BUSINESS_PHONE.replace(/\D/g, '');
const buildWaLink = (message: string) => `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
const DEFAULT_WA_LINK = buildWaLink("Hi KCROC, I need help with a computer repair. Please arrange a free diagnostic & pickup in Kuwait.");

// Refined for shorter, more professional copy
const SERVICES = [
  {
    id: 'laptop-repair',
    title: 'Laptop Repair',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    description: 'Component-level hardware repair for all major Windows brands. We resolve power failures, overheating, and motherboard faults.',
    commonIssues: [
      'Dead logic boards & power issues',
      'Thermal throttling & fan noise',
      'Shattered screens & broken hinges',
      'Liquid damage recovery'
    ],
    approach: 'Diagnostic-first engineering using high-grade components. Strict data privacy maintained.',
    turnaround: '24-48 hours',
    startingPrice: '15',
  },
  {
    id: 'desktop-gaming',
    title: 'Gaming PC Tuning',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600',
    description: 'Extreme performance optimization, custom cooling loops, and hardware diagnostics for high-end gaming rigs.',
    commonIssues: [
      'GPU artifacting & crashing',
      'PSU voltage instability',
      'High temperatures (Kuwait climate)',
      'RAM & storage bottlenecking'
    ],
    approach: 'Deep-level stress testing, thermal re-pasting, and BIOS-level stabilization.',
    turnaround: '1-3 days',
    startingPrice: '20',
  },
  {
    id: 'macbook-apple',
    title: 'MacBook Repair',
    icon: Apple,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
    description: 'Specialized Apple repairs including Retina replacements, battery cycles, and micro-soldering for logic boards.',
    commonIssues: [
      'Cracked Retina displays',
      'Swollen battery replacement',
      'Liquid spill recovery',
      'M-Series chip diagnostics'
    ],
    approach: 'Utilizing Apple schematics and OEM-grade parts for factory-level restoration.',
    turnaround: '2-5 days',
    startingPrice: '30',
  },
  {
    id: 'onsite-support',
    title: 'Enterprise IT Support',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
    description: 'Rapid-response network troubleshooting and workstation maintenance for Kuwait businesses.',
    commonIssues: [
      'Server & NAS downtime',
      'Network routing failures',
      'Security & firewall setup',
      'Automated backup configuration'
    ],
    approach: 'On-site deployment to minimize operational downtime and secure enterprise networks.',
    turnaround: 'Same-day emergency response',
    startingPrice: '40',
  },
  {
    id: 'printer-setup',
    title: 'Printer Infrastructure',
    icon: Printer,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
    description: 'Commercial and residential printer repair, IP network configuration, and mechanical servicing.',
    commonIssues: [
      'Wireless network dropping',
      'Persistent mechanical jams',
      'Printhead banding & streaks',
      'Spooler & driver conflicts'
    ],
    approach: 'Complete mechanical clearing, network IP stabilization, and driver updates.',
    turnaround: '1-2 days',
    startingPrice: '15',
  }
];

const FAQS = [
  { q: "Is pickup and delivery truly free?", a: "Yes. We operate a completely free pick & drop service across all Kuwait governorates." },
  { q: "What is your turnaround time?", a: "Diagnostics are same-day. Standard hardware replacements are completed within 24-48 hours." },
  { q: "How does No Fix, No Fee work?", a: "If our engineers cannot successfully repair your hardware, your invoice is zero." },
  { q: "Do you offer a warranty?", a: "All parts and labor are backed by our 30-day guarantee." }
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const HeroSection = () => (
  <section className="relative pt-32 pb-20 px-6 border-b border-slate-800/50 flex justify-center overflow-hidden">
    {/* Background Glow Effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>
    
    <div className="relative w-full max-w-4xl text-center z-10">
      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        <ShieldCheck className="w-4 h-4" /> Component-Level Lab
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none text-white">
        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Engineering.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
        Advanced hardware diagnostics and repair for premium tech. Free pick & drop everywhere in Kuwait.
      </p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> No Fix, No Fee</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Free Pickup</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Same-Day</span>
      </div>
    </div>
  </section>
);

const JumpMenuSection = () => (
  <section className="py-6 px-6 bg-slate-950/80 border-b border-slate-800/50 flex justify-center sticky top-0 z-40 backdrop-blur-xl">
    <div className="w-full max-w-6xl">
      <div className="flex flex-wrap justify-center gap-3">
        {SERVICES.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <service.icon className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-bold text-xs uppercase tracking-wider">{service.title}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const ServicesMasterGrid = () => (
  <section className="py-24 px-6 flex justify-center relative">
    <div className="w-full max-w-6xl space-y-12">
      {SERVICES.map((service, idx) => {
        const Icon = service.icon;
        const serviceWaLink = buildWaLink(`Hi KCROC, I need help with ${service.title}. Please arrange a free pickup.`);
        const isPriority = idx === 0;

        return (
          <article key={service.id} id={service.id} className="scroll-mt-32 group">
            {/* Premium Glassmorphism Card */}
            <div className="relative bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.07)]">
              
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="grid lg:grid-cols-12 gap-0 relative z-10">
                
                {/* Image Section (Spans 5 cols) */}
                <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden bg-slate-950">
                  <img 
                    src={service.image} 
                    alt={`${service.title} repair`} 
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-90"
                    loading={isPriority ? "eager" : "lazy"}
                    fetchPriority={isPriority ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r"></div>
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-6 left-6 w-14 h-14 bg-slate-950/80 backdrop-blur-md border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Icon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  </div>
                </div>

                {/* Content Section (Spans 7 cols) */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col h-full bg-slate-950/50">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">{service.title}</h2>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">{service.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Wrench className="w-3 h-3" /> Hardware Issues
                      </h3>
                      <ul className="space-y-3">
                        {service.commonIssues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-emerald-500 mt-0.5 opacity-70">▹</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                      <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2 opacity-80">Lab Protocol</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{service.approach}</p>
                    </div>
                  </div>

                  {/* Pricing & CTA Footer */}
                  <div className="mt-auto pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex gap-8 w-full sm:w-auto">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Starts At</div>
                        <div className="text-2xl font-black text-white">{service.startingPrice} <span className="text-emerald-400 text-sm">KWD</span></div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Time</div>
                        <div className="text-sm font-bold text-slate-300 mt-2">{service.turnaround}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <a href={`tel:${cleanPhone}`} className="flex-1 sm:flex-none flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl transition-colors border border-slate-700">
                        <Phone className="w-5 h-5" />
                      </a>
                      <a href={serviceWaLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm uppercase tracking-wider">
                        <MessageCircle className="w-4 h-4" /> Book
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </article>
        );
      })}
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
        <ChevronDown size={18} className={`text-cyan-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={`${id}-panel`} hidden={!open} className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
        <div className="py-5">{a}</div>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="py-20 px-6 flex justify-center relative">
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
        <title>Premium Computer & MacBook Repair in Kuwait | KCROC</title>
        <link rel="canonical" href={PAGE_URL} />
        <meta name="description" content="Expert component-level logic board and computer repair in Kuwait. Free pick & drop across Hawalli and Salmiya." />
      </Helmet>

      <main className="w-full bg-slate-950 text-white font-sans pb-24 md:pb-0 selection:bg-cyan-500/30">
        <HeroSection />
        <JumpMenuSection />
        <ServicesMasterGrid />
        <FAQSection />

        {/* Sticky Mobile CTA Bottom Bar */}
        <div className={`fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden transition-transform duration-500 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 py-3 rounded-xl text-white font-bold text-center text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] tracking-wider uppercase">
            WhatsApp
          </a>
          <a href={`tel:${cleanPhone}`} className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase">
            Call Lab
          </a>
        </div>
      </main>
    </>
  );
}
