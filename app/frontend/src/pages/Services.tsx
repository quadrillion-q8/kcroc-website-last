import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Laptop, Monitor, Wrench, Printer, Apple, 
  Clock, DollarSign, CheckCircle, Phone, MessageCircle,
  ShieldCheck, Truck, ChevronDown
} from 'lucide-react';

// ─── Constants & Core Data ───────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/services`;

const cleanPhone = BUSINESS_PHONE.replace(/\D/g, '');

// Centralized WhatsApp Link Generator for tracking consistency
const buildWaLink = (message: string) => `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
const DEFAULT_WA_LINK = buildWaLink("Hi KCROC, I need help with a computer repair. Please arrange a free diagnostic & pickup in Kuwait.");

// Data arrays remain fully outside the component to prevent re-allocation on renders
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

// ─── SEO Schema Graph ────────────────────────────────────────────────────────

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
  <section className="pt-32 pb-16 px-6 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 flex justify-center">
    <div className="w-full max-w-4xl text-center">
      <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
        <ShieldCheck className="w-4 h-4" /> Component-Level Diagnostic Lab
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Solutions.</span>
      </h1>
      
      <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
        Stop struggling with broken tech. We provide elite laptop, desktop, and MacBook engineering services in Kuwait with free pickup and delivery across all governorates.
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-emerald-400 font-bold tracking-wide uppercase">
        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> No Fix, No Fee</span>
        <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Free Kuwait Pickup</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Same-Day Slots</span>
      </div>
    </div>
  </section>
);

const JumpMenuSection = () => (
  <section className="py-10 px-6 bg-slate-900/30 border-b border-slate-800 flex justify-center sticky top-0 z-40 backdrop-blur-md">
    <div className="w-full max-w-6xl">
      <div className="flex flex-wrap justify-center gap-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <a
              key={service.id}
              href={`#${service.id}`}
              aria-label={`Jump to ${service.title} section`}
              className="flex items-center gap-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 px-5 py-3 rounded-full transition-all duration-300 shadow-sm"
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-bold text-xs uppercase tracking-wide">{service.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

const ServicesMasterGrid = () => (
  <section className="py-20 px-6 flex justify-center">
    <div className="w-full max-w-6xl space-y-16">
      {SERVICES.map((service, idx) => {
        const Icon = service.icon;
        const serviceWaLink = buildWaLink(`Hi KCROC, I need help with ${service.title}. Please arrange a free diagnostic & pickup in Kuwait.`);
        
        // Optimize LCP: Priority fetch the first image, lazy load the rest.
        const isPriority = idx === 0;

        return (
          <article key={service.id} id={service.id} className="scroll-mt-40">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-slate-700 transition-colors">
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Image Half */}
                <div className="relative h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950">
                  <img 
                    src={service.image} 
                    alt={`${service.title} expert repair service in Kuwait`} 
                    className="w-full h-full object-cover opacity-80"
                    width="600"
                    height="400"
                    loading={isPriority ? undefined : "lazy"}
                    fetchPriority={isPriority ? "high" : "auto"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent pointer-events-none"></div>
                  <div className="absolute top-6 left-6">
                    <div className="w-16 h-16 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Content Half */}
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-white mb-4">{service.title}</h2>
                    <p className="text-slate-400 text-base leading-relaxed">{service.description}</p>
                  </div>

                  {/* Common Issues */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Issues We Resolve
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.commonIssues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-300 text-sm font-medium">
                          <span className="text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approach Panel */}
                  <div className="mb-8 p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                    <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2">Our Engineering Approach</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.approach}</p>
                  </div>

                  {/* Turnaround & Price Footer */}
                  <div className="mt-auto pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-bold mb-1 text-sm uppercase tracking-wide">Turnaround</h5>
                        <p className="text-slate-400 text-sm">{service.turnaround}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-bold mb-1 text-sm uppercase tracking-wide">Starting Price</h5>
                        <p className="text-emerald-400 font-black text-xl mb-1">{service.startingPrice} KD</p>
                        <Link to="/pricing" aria-label={`View pricing for ${service.title}`} className="text-slate-500 text-xs font-medium hover:text-cyan-400 transition-colors">
                          View detailed pricing →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={`tel:${cleanPhone}`}
                      aria-label="Call KCROC for service"
                      className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl py-4 px-6 transition-all flex-1 border border-slate-700 text-sm uppercase tracking-wide"
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <a 
                      href={serviceWaLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp KCROC about ${service.title}`}
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl py-4 px-6 transition-all flex-1 shadow-lg shadow-emerald-900/20 text-sm uppercase tracking-wide"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp Us
                    </a>
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
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20 mb-3">
      <button 
        id={`${id}-button`}
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        aria-controls={`${id}-panel`} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div 
        id={`${id}-panel`} 
        role="region" 
        aria-labelledby={`${id}-button`} 
        hidden={!open} 
        className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50"
      >
        <div className="py-4">{a}</div>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="py-20 px-6 border-t border-slate-800 flex justify-center">
    <div className="w-full max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-white mb-4">Service FAQs</h2>
        <p className="text-slate-400 text-sm">Common questions about our computer repair process in Kuwait.</p>
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
  <section className="py-24 px-6 border-t border-slate-800 flex justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950">
    <div className="w-full max-w-4xl text-center">
      <h2 className="text-4xl font-black mb-6 text-white tracking-tight">Hardware Failing? We Can Fix It.</h2>
      <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
        Contact KCROC today for expert hardware diagnostics with free pickup and delivery across all Kuwait governorates. If we can't fix it, you pay nothing.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={`tel:${cleanPhone}`} aria-label="Call KCROC support" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full px-8 py-4 text-lg border border-slate-700 transition-all">
          <Phone className="w-5 h-5" /> Call {BUSINESS_PHONE}
        </a>
        <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC support" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 py-4 text-lg transition-all shadow-lg shadow-emerald-900/20">
          <MessageCircle className="w-5 h-5" /> Start Free Diagnostic
        </a>
      </div>
    </div>
  </section>
);

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function Services() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Throttled Scroll logic for Sticky CTA UX improvement
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

      <main className="w-full bg-slate-950 text-white font-sans pb-24 md:pb-0 overflow-x-hidden">
        
        {/* Visible Breadcrumb Navigation */}
        <div className="w-full bg-slate-950 pt-32 pb-4 px-6 border-b border-slate-900 flex justify-center">
          <nav aria-label="Breadcrumb" className="w-full max-w-6xl text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> 
            <span className="mx-2" aria-hidden="true">/</span> 
            <span className="text-slate-300" aria-current="page">Our Services</span>
          </nav>
        </div>

        <HeroSection />
        <JumpMenuSection />
        <ServicesMasterGrid />
        <FAQSection />
        <FinalCTASection />

        {/* Sticky Mobile CTA Bottom Bar (Appears after scroll) */}
        <div className={`fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4 flex justify-center gap-3 z-50 md:hidden transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Pickup" className="flex-1 bg-emerald-600 py-3 rounded-full text-white font-bold text-center text-sm shadow-lg shadow-emerald-900/20">
            WhatsApp Pickup
          </a>
          <a href={`tel:${cleanPhone}`} aria-label="Call Now" className="flex-1 bg-slate-800 border border-slate-700 py-3 rounded-full text-white font-bold text-center text-sm">
            Call Now
          </a>
        </div>
        
      </main>
    </>
  );
}
