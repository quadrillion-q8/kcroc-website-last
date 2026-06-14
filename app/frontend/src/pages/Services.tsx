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

const SERVICES = [
  {
    id: 'laptop-repair',
    title: 'Laptop Repair',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    description: 'Complete component-level laptop repair services in Kuwait for all major brands including Dell, HP, Lenovo, Acer, and ASUS.',
    commonIssues: [
      'No power or won\'t turn on',
      'Random shutdowns and restarts',
      'Fan noise and severe overheating',
      'Windows not booting or blue screen',
      'Slow performance and freezing',
      'Display artifacts or flickering',
      'Liquid damage and logic board corrosion',
      'Broken hinges and shattered casing'
    ],
    approach: 'We start with comprehensive hardware testing to identify the root cause. Our technicians use genuine or high-grade compatible parts and explain all issues before proceeding. Your data safety is guaranteed throughout the process.',
    turnaround: 'Initial assessments same-day, common repairs within 24-48 hours',
    startingPrice: '15',
  },
  {
    id: 'desktop-gaming',
    title: 'Desktop & Gaming PC Repair',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600',
    description: 'Expert desktop and gaming PC repair, custom cooling builds, and extreme performance optimization for Kuwait power users.',
    commonIssues: [
      'Random shutdowns and blue screens',
      'Thermal throttling from Kuwait heat',
      'Power supply (PSU) voltage failures',
      'Noisy, rattling, or failing fans',
      'Graphics card (GPU) artifacting',
      'Lag spikes and low 1% FPS drops',
      'Storage drive failures',
      'RAM instability and memory errors'
    ],
    approach: 'We perform detailed stress testing, thermal analysis, and component inspection. Services include deep cleaning, thermal paste/liquid metal application, component upgrades, and complete OS optimization with driver stabilization.',
    turnaround: 'Diagnostics typically same-day, hardware repairs 1-3 days',
    startingPrice: '20',
  },
  {
    id: 'macbook-apple',
    title: 'MacBook & Apple Device Repair',
    icon: Apple,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
    description: 'Specialized MacBook repair services including Retina screen replacement, battery replacement, and complex logic board micro-soldering.',
    commonIssues: [
      'Cracked, bleeding, or broken Retina display',
      'Battery swelling or "Service Recommended"',
      'Sticky butterfly or scissor keyboard',
      'Trackpad not clicking or erratic movement',
      'Coffee/Water liquid damage repair',
      'macOS not booting (Folder with Question Mark)',
      'Overheating and severe thermal throttling',
      'USB-C / MagSafe port charging failures'
    ],
    approach: 'Our technicians use specialized Apple schematics and genuine-grade parts. We handle all models including Air, Pro, and newer M-series chips with deep expertise in logic board micro-soldering and circuit repair.',
    turnaround: 'MacBook inspection 1-2 days, logic board repairs 2-5 days',
    startingPrice: '30',
  },
  {
    id: 'onsite-support',
    title: 'On-Site Business IT Support',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
    description: 'Rapid-response on-site computer repair, network troubleshooting, and IT support for businesses across Kuwait.',
    commonIssues: [
      'Complete network connectivity drops',
      'Server downtime and NAS crashes',
      'Email routing and communication issues',
      'Office printer network setup',
      'Slow workstation performance',
      'Software deployment failures',
      'Security breaches and firewall setup',
      'Automated backup system failures'
    ],
    approach: 'Our enterprise technicians deploy to your business location in Hawalli, Salmiya, Kuwait City, or anywhere in Kuwait. We prioritize critical systems to minimize downtime, ensuring your operations resume swiftly and securely.',
    turnaround: 'Emergency on-site service same-day, scheduled visits within 24 hours',
    startingPrice: '40',
  },
  {
    id: 'printer-setup',
    title: 'Printer Setup & Repair',
    icon: Printer,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
    description: 'Complete printer repair, wireless network setup, and configuration services for all major printer brands and enterprise models.',
    commonIssues: [
      'Printer dropping off the Wi-Fi network',
      'Faded print quality, streaks, and banding',
      'Persistent paper jam sensor errors',
      'Windows/macOS driver conflicts',
      'Mobile/AirPrint wireless setup issues',
      'Scanner glass or ADF not working',
      'Third-party cartridge recognition errors',
      'Incredibly slow spooling and printing'
    ],
    approach: 'We service all major brands including HP, Canon, Epson, Brother, and Samsung. We clear mechanical jams, clean printheads, resolve IP conflicts, and ensure seamless printing from all office devices.',
    turnaround: 'Printer setup typically same-day, mechanical repairs 1-2 days',
    startingPrice: '15',
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
        "itemListElement": SERVICES.map((s, idx) => ({
          "@type": "Offer",
          "position": idx + 1,
          "itemOffered": {
            "@type": "Service",
            "name": s.title,
            "description": s.description
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
  // Removed huge top margins/padding here, relying on standard py-12 to sit nicely below breadcrumbs
  <section className="relative py-12 md:py-24 px-6 flex flex-col justify-center items-center overflow-hidden border-b border-slate-800/50">
    {/* Core Electric Glow */}
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
    
    <div className="relative w-full max-w-4xl text-center z-10 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        <ShieldCheck className="w-4 h-4" /> Component-Level Diagnostic Lab
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-white">
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Solutions.</span>
      </h1>
      
      <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
        Stop struggling with broken tech. We provide elite laptop, desktop, and MacBook engineering services in Kuwait with free pickup and delivery across all governorates.
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> No Fix, No Fee</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Free Kuwait Pickup</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Same-Day Slots</span>
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
    <div className="w-full max-w-6xl space-y-16">
      {SERVICES.map((service, idx) => {
        const Icon = service.icon;
        const serviceWaLink = buildWaLink(`Hi KCROC, I need help with ${service.title}. Please arrange a free diagnostic & pickup in Kuwait.`);
        const isPriority = idx === 0;

        return (
          <article key={service.id} id={service.id} className="scroll-mt-32 group">
            <div className="relative bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.07)]">
              
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="grid lg:grid-cols-12 gap-0 relative z-10">
                
                <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden bg-slate-950">
                  <img 
                    src={service.image} 
                    alt={`${service.title} expert repair service in Kuwait`} 
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-90"
                    width="600"
                    height="400"
                    loading={isPriority ? undefined : "lazy"}
                    fetchPriority={isPriority ? "high" : "auto"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r pointer-events-none"></div>
                  
                  <div className="absolute top-6 left-6 w-14 h-14 bg-slate-950/80 backdrop-blur-md border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Icon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  </div>
                </div>

                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col h-full bg-slate-950/50">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">{service.title}</h2>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">{service.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Issues We Resolve
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
                      <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2 opacity-80">Our Approach</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{service.approach}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex gap-8 w-full sm:w-auto">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Starts At</div>
                        <div className="text-2xl font-black text-white">{service.startingPrice} <span className="text-emerald-400 text-sm">KWD</span></div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Turnaround</div>
                        <div className="text-sm font-bold text-slate-300 mt-2">{service.turnaround}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <a href={`tel:${cleanPhone}`} aria-label="Call KCROC for service" className="flex-1 sm:flex-none flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl transition-colors border border-slate-700">
                        <Phone className="w-5 h-5" />
                      </a>
                      <a href={serviceWaLink} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp KCROC about ${service.title}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm uppercase tracking-wider">
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
    {/* Bottom Glow Effect */}
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
          <Phone className="w-5 h-5 text-cyan-400" /> Call {BUSINESS_PHONE}
        </a>
        <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC support" className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
          <MessageCircle className="w-5 h-5" /> Start Free Diagnostic
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
        
        {/* Breadcrumb block already handles fixed header clearance with pt-28 */}
        <div className="w-full bg-slate-900/30 backdrop-blur-sm pt-28 pb-4 px-6 border-b border-slate-800/50 flex justify-center relative z-10">
          <nav aria-label="Breadcrumb" className="w-full max-w-6xl text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> 
            <span className="mx-2 opacity-50" aria-hidden="true">/</span> 
            <span className="text-slate-300" aria-current="page">Our Services</span>
          </nav>
        </div>

        <HeroSection />
        <JumpMenuSection />
        <ServicesMasterGrid />
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
