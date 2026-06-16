import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, EyeOff, Truck, Lock, Cpu, Phone, 
  MessageCircle, Check, HardDrive, Database, ExternalLink 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA (Frozen for performance)
───────────────────────────────────────────────────────────────────────────── */

const TRUST_BADGES = Object.freeze([
  { id: 'recovery', icon: HardDrive,   text: "Dead Drive Recovery" },
  { id: 'cctv',     icon: ShieldCheck, text: "CCTV Monitored Lab" },
  { id: 'nodata',   icon: EyeOff,      text: "Strict No-Snoop Policy" },
  { id: 'esd',      icon: Cpu,         text: "ESD Safe Environment" },
  { id: 'auth',     icon: Lock,        text: "Authorized Techs Only" },
]);

const PROTOCOL_POINTS = Object.freeze([
  {
    icon: EyeOff,
    title: "1. Strict 'No-Snooping' Policy",
    points: [
      "Zero File Interaction: We only utilize specialized diagnostic software. We never open, view, or browse your personal folders or histories.",
      "Drive Removal Option: For motherboard-level repairs, you are completely welcome to remove your storage drive before handing the machine to us."
    ]
  },
  {
    icon: Truck,
    title: "2. Secure Pick & Drop Custody",
    points: [
      "Logged Logistics: From the moment our driver collects your device, it is tagged and placed directly into a secure transport enclosure.",
      "Direct Routing: Your machine goes straight from your location to our laboratory. It is never passed to a third-party courier."
    ]
  },
  {
    icon: Lock,
    title: "3. Fortified Technical Laboratory",
    points: [
      "Monitored Premises: Our specialized Hawalli facility operates under continuous video surveillance with devices stored in secure tech lockers.",
      "Authorized Access Only: Only the specific technician assigned to your chip-level diagnostics handles your hardware."
    ]
  },
  {
    icon: Cpu,
    title: "4. Component Transparency",
    points: [
      "Original Parts Protection: We never swap or substitute your original factory components. Every microscopic part replaced is documented.",
      "Formal Documentation: You receive a transparent digital invoice detailing the exact work. We do not do unrecorded repairs."
    ]
  }
]);

const DATA_SERVICES = Object.freeze([
  { title: "Dead Motherboard Extraction", desc: "If your laptop is completely dead, we can safely extract your NVMe/SATA SSD and recover your files to an external drive." },
  { title: "Corrupted OS Recovery", desc: "Windows Blue Screen loop? Mac stuck on the Apple logo? We can bypass the OS and pull your critical data before reinstalling the system." },
  { title: "Liquid Damage Data Rescue", desc: "If liquid destroyed your logic board, we use ultrasonic cleaning to temporarily revive the board just long enough to extract your soldered data." }
]);

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function PrivacySecurity() {
  const pageUrl = `${BUSINESS_INFO.url}/data-recovery-kuwait`;
  const waMessage = encodeURIComponent("Hi KCROC, I need help recovering data from a broken computer/drive. Please arrange a free diagnostic.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": "Data Recovery & Privacy Security Kuwait | KCROC",
        "url": pageUrl,
        "description": "Secure data recovery and zero-risk privacy protocol in Kuwait. We extract data from dead laptops and MacBooks with absolute privacy guaranteed.",
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": "Data Recovery & Security Services",
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
        "description": "Secure data recovery from dead motherboards, corrupted operating systems, and liquid-damaged devices in Kuwait.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BUSINESS_INFO.url}/services` },
          { "@type": "ListItem", "position": 3, "name": "Data Recovery & Security", "item": pageUrl }
        ]
      }
    ]
  }), [pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <Helmet>
        <title>Data Recovery & Privacy Security Kuwait | KCROC</title>
        <meta name="description" content="Secure data recovery and zero-risk privacy protocol in Kuwait. We extract data from dead laptops and MacBooks with absolute privacy guaranteed." />
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
          <li aria-current="page" className="text-cyan-400">Data Recovery</li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-16">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" aria-hidden="true" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Data Recovery & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Privacy Guarantee</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Your data is safe with KCROC. When you hand your computer over for recovery or repair, you aren't just trusting us with expensive hardware—you are trusting us with your digital life.
          </p>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="flex flex-wrap justify-center gap-4">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-center hover:border-cyan-500/40 transition-colors min-w-[160px] flex-1 max-w-[200px]">
              <badge.icon className="w-8 h-8 text-cyan-400 mb-3" aria-hidden="true" />
              <span className="text-sm font-bold text-slate-300 leading-tight">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DATA RECOVERY SERVICES ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-12">
          <Database className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Device Dead? We Recover Your Files.</h2>
          <p className="text-slate-400">Secure data extraction from catastrophically damaged hardware.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {DATA_SERVICES.map((service, idx) => (
            <div key={idx} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/30 transition-colors h-full flex flex-col">
              <h3 className="text-xl font-black text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4-POINT PRIVACY PROTOCOL ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Our 4-Point Zero-Risk Privacy Protocol</h2>
          <p className="text-slate-400 text-lg">We built our reputation on a zero-compromise approach to your privacy.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROTOCOL_POINTS.map((point, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-all">
              <point.icon className="w-10 h-10 text-cyan-400 mb-6" aria-hidden="true" />
              <h3 className="text-2xl font-black mb-4 text-white">{point.title}</h3>
              <ul className="space-y-4">
                {point.points.map((p, i) => {
                  const [boldPart, rest] = p.split(':');
                  return (
                    <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span><strong className="text-white">{boldPart}:</strong>{rest}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERNAL LINKING CARDS ─── */}
      <section className="max-w-5xl mx-auto px-6 relative z-10 mb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/laptop-repair-kuwait" className="bg-slate-900/50 border border-slate-800 text-center font-bold py-6 px-6 rounded-2xl hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 transition-all">
            Laptop Repair
          </Link>
          <Link to="/macbook-repair-kuwait" className="bg-slate-900/50 border border-slate-800 text-center font-bold py-6 px-6 rounded-2xl hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 transition-all">
            MacBook Repair
          </Link>
          <Link to="/chip-level-motherboard-repair-hawalli" className="bg-slate-900/50 border border-slate-800 text-center font-bold py-6 px-6 rounded-2xl hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 transition-all">
            Motherboard Repair
          </Link>
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Absolute Transparency. Total Peace of Mind.</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            If you require a Non-Disclosure Agreement (NDA) for sensitive corporate data before scheduling a recovery, contact our technical desk directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2">
              Message on WhatsApp <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Phone size={20} className="text-cyan-400" /> Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
