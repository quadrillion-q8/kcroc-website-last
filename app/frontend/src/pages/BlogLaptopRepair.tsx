import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Cpu, 
  Laptop,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Shield
} from 'lucide-react';

// ─── CONSTANTS & STATIC DATA ────────────────────────────────────────────────
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/blog/laptop-repair-kuwait-2026`;
const BUSINESS_PHONE = "+96555301913";
const CLOUDINARY_LOGO = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png";
const HERO_IMAGE_URL = "/images/blog/laptop-repair-kuwait.webp";
const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I read your guide on laptop repair and have a question.")}`;

const ISSUES = [
  { icon: Cpu, t: "Laptops Overheating & Shutting Down", d: "When silicon temperatures hit critical limits, the laptop forces itself to slow down to survive." },
  { icon: Shield, t: "Dust & Short Circuits", d: "Reactive dust bridges micro-components on the logic board, causing instant short circuits." },
  { icon: Laptop, t: "Hinges & Frame Damage", d: "Repeated heating and cooling cycles make the plastic chassis brittle, leading to hinge failure." }
];

const PROCESS_STEPS = [
  { s: "Complete Inside Cleaning", d: "We fully disassemble the chassis to safely remove conductive soot and particulate dust buildup." },
  { s: "Premium Thermal Pad Application", d: "We apply advanced thermal pads used in high-performance laptops to prevent paste from shifting." },
  { s: "Motherboard Diagnostics", d: "We perform chip-level electrical analysis to find and replace shorted capacitors or failed power chips." }
];

const FAQ_ITEMS = [
  { q: "Why do laptops overheat so quickly in Kuwait?", a: "Intense ambient heat and pervasive particulate dust clog the internal cooling fins. This starves the fans of air, causing the processor to artificially lower its speed to prevent melting." },
  { q: "What happens to thermal paste in Kuwait's heat?", a: "Thermal paste slowly shifts under repeated heat cycles. The extreme temperature swings push the paste away from the processor, creating dry air gaps that destroy cooling efficiency." },
  { q: "Do you offer free pickup and delivery?", a: "Yes, we offer 100% free pickup and delivery across all Kuwait governorates including Hawalli, Salmiya, and Kuwait City." },
  { q: "How fast can I get my laptop back?", a: "If you book a free pickup before 11:00 AM, common repairs like screen replacements and SSD upgrades are often returned the exact same day." },
  { q: "What does 'No Fix, No Fee' mean?", a: "It means our chip-level diagnostics are risk-free. If your laptop is catastrophically damaged and we cannot repair it, you pay absolutely nothing." }
];

// ─── JSON-LD SCHEMA ─────────────────────────────────────────────────────────
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${CANONICAL_URL}/#website`,
      "url": CANONICAL_URL,
      "name": "KCROC",
      "publisher": { "@type": "Organization", "name": "KCROC", "@id": `${CANONICAL_URL}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": PAGE_URL,
      "url": PAGE_URL,
      "name": "Laptop Repair Kuwait: Technical Guide",
      "description": "Based on real repair cases in our Kuwait workshop: a guide on laptop overheating, thermal management, and repair.",
      "isPartOf": { "@id": `${CANONICAL_URL}/#website` }
    },
    {
      "@type": "Article",
      "mainEntityOfPage": { "@id": PAGE_URL },
      "headline": "Laptop Repair in Kuwait: A Guide to Hardware Preservation",
      "description": "Based on real repair cases in our Kuwait workshop. Learn how Kuwait's climate impacts laptops and how we perform chip-level diagnostics.",
      "image": `${CANONICAL_URL}${HERO_IMAGE_URL}`,
      "author": { "@type": "Organization", "name": "KCROC", "@id": `${CANONICAL_URL}/#organization` },
      "publisher": { "@id": `${CANONICAL_URL}/#organization` },
      "datePublished": "2026-06-14T08:00:00+03:00",
      "articleSection": "Tech Guides",
      "inLanguage": "en",
      "wordCount": 1500,
      "keywords": [
        "Laptop Repair Kuwait",
        "Laptop Overheating Kuwait",
        "Thermal Paste Replacement Kuwait",
        "Laptop Cleaning Kuwait",
        "Gaming Laptop Repair Kuwait"
      ],
      "isAccessibleForFree": true,
      "about": [
        { "@type": "Thing", "name": "Laptop Repair" },
        { "@type": "Thing", "name": "Thermal Management" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": CANONICAL_URL },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${CANONICAL_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": "Laptop Repair Kuwait 2026", "item": PAGE_URL }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}/#faq`,
      "mainEntity": FAQ_ITEMS.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    },
    {
      "@type": "ComputerStore",
      "@id": `${CANONICAL_URL}/#organization`,
      "name": "KCROC",
      "telephone": BUSINESS_PHONE,
      "url": CANONICAL_URL,
      "image": `${CANONICAL_URL}${HERO_IMAGE_URL}`,
      "logo": { 
        "@type": "ImageObject", 
        "url": CLOUDINARY_LOGO,
        "width": 512,
        "height": 512
      },
      "priceRange": "$$",
      "areaServed": ["Hawalli", "Salmiya", "Farwaniya", "Kuwait City", "Mangaf", "Fahaheel"],
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19", 
        "addressLocality": "Hawalli", 
        "addressCountry": "KW" 
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.3364,
        "longitude": 48.0146
      },
      "openingHoursSpecification": { 
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": [
          "https://schema.org/Saturday", 
          "https://schema.org/Sunday", 
          "https://schema.org/Monday", 
          "https://schema.org/Tuesday", 
          "https://schema.org/Wednesday", 
          "https://schema.org/Thursday", 
          "https://schema.org/Friday"
        ], 
        "opens": "10:00", 
        "closes": "22:00" 
      },
      "sameAs": [
        "https://www.facebook.com/computerrepairkuwait",
        "https://www.instagram.com/computerrepairkuwait"
      ]
    }
  ]
};

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────
const FAQItem = React.memo(({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return (
    <div className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
      <button 
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="w-full flex justify-between items-center font-black text-white hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
      >
        <span className="text-left">{q}</span>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
          aria-hidden="true" 
        />
      </button>
      <div 
        id={`${id}-panel`} 
        role="region" 
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="text-slate-400 text-sm leading-relaxed overflow-hidden m-0">{a}</p>
      </div>
    </div>
  );
});
FAQItem.displayName = 'FAQItem';

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function BlogLaptopRepair() {
  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 scroll-smooth">
      {/* ─── SEO & META ─── */}
      <Helmet>
        <title>Laptop Repair Kuwait | Workshop Guide & Maintenance 2026 | KCROC</title>
        <meta name="description" content="Based on real repair cases in our Kuwait workshop. Learn about thermal management, dust mitigation, and how we actually perform chip-level repair." />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="preload" as="image" href={HERO_IMAGE_URL} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="author" content="KCROC" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Laptop Repair in Kuwait: A Workshop Guide" />
        <meta property="og:description" content="Based on real repair cases in our Kuwait workshop. Learn how Kuwait's climate impacts laptops and how we fix them." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${CANONICAL_URL}${HERO_IMAGE_URL}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Laptop motherboard repair and thermal maintenance in Kuwait" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Laptop Repair Kuwait | Workshop Guide" />
        <meta name="twitter:description" content="Based on real repair cases: laptop failures, thermal management and professional repair." />
        <meta name="twitter:image" content={`${CANONICAL_URL}${HERO_IMAGE_URL}`} />
        <meta name="twitter:image:alt" content="Laptop motherboard repair and thermal maintenance in Kuwait" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li>
            <Link to="/" className="hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded transition-colors">Home</Link>
          </li>
          <li><span className="text-slate-600" aria-hidden="true">/</span></li>
          <li>
            <Link to="/blog" className="hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded transition-colors">Blog</Link>
          </li>
          <li><span className="text-slate-600" aria-hidden="true">/</span></li>
          <li aria-current="page" className="text-cyan-400">
            Laptop Repair Kuwait 2026
          </li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-8 pb-16 px-6 text-center z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <header className="max-w-4xl mx-auto relative z-10">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs">Kuwait Workshop Guide</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight tracking-tight">
            Laptop Repair in Kuwait: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Hardware Preservation</span>
          </h1>
          
          <div className="text-sm text-slate-400 font-medium mb-8 flex flex-wrap items-center justify-center gap-2">
            <time dateTime="2026-06-14">June 14, 2026</time>
            <span aria-hidden="true">•</span>
            <span>8 min read</span>
          </div>
          
          <img 
            src={HERO_IMAGE_URL} 
            alt="Laptop motherboard repair and thermal maintenance in Kuwait" 
            width="1200" 
            height="630" 
            loading="eager" 
            fetchPriority="high"
            decoding="async"
            className="rounded-3xl border border-slate-700/50 shadow-[0_0_40px_rgba(34,211,238,0.15)] mb-12 object-cover w-full aspect-[1200/630]" 
          />
        </header>
      </section>

      {/* ─── TABLE OF CONTENTS ─── */}
      <nav className="max-w-4xl mx-auto px-6 mb-12" aria-label="Table of Contents">
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
          <h3 className="font-black text-white mb-4 text-lg">Table of Contents</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-400">
            {[
              { id: "why-kuwait-heat-damages-laptops", label: "Why Kuwait heat damages laptops" },
              { id: "how-we-fix-overheating-laptops", label: "How we fix overheating laptops" },
              { id: "common-issues-we-see-daily", label: "Common issues we see daily" },
              { id: "chip-level-diagnostics", label: "What we actually repair" },
              { id: "frequently-asked-questions", label: "Frequently Asked Questions" }
            ].map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className="hover:text-cyan-400 focus:text-cyan-400 focus:outline-none focus-visible:underline transition-colors flex items-center gap-2 rounded"
                >
                  <span className="text-cyan-500/50" aria-hidden="true">#</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── ARTICLE CONTENT ─── */}
      <article className="max-w-4xl mx-auto px-6 pb-12 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none">
          
          <section id="why-kuwait-heat-damages-laptops" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mb-6">Why Kuwait heat damages laptops</h2>
            <p>Based on real repair cases in our Kuwait workshop, Kuwait's environment presents a unique challenge for laptop health. High ambient temperatures combined with fine particulate dust create a thermal bottleneck. Dust blocks cooling fins while humidity and airborne contaminants accelerate oxidation on exposed circuitry.</p>
          </section>

          <section id="how-we-fix-overheating-laptops" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8">How we fix overheating laptops</h2>
            <p>Standard cooling systems often struggle here. Thermal paste slowly shifting under repeated heat cycles creates air gaps that kill thermal transfer efficiency. Our lab utilizes advanced thermal pads used in high-performance laptops, which remain stable and highly conductive even under extreme thermal stress.</p>
          </section>

          <section id="common-issues-we-see-daily" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8 flex items-center gap-3">
              <AlertTriangle className="text-amber-400" aria-hidden="true" /> Common issues we see daily in laptops brought to KCROC
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {ISSUES.map((issue) => (
                <div key={issue.t} className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <issue.icon className="text-cyan-400 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-white text-xl m-0">{issue.t}</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed m-0">{issue.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="chip-level-diagnostics" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8">What we actually repair in chip-level diagnostics</h2>
            <div className="space-y-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.s} className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-white mb-2 text-xl m-0">{i+1}. {step.s}</h3>
                  <p className="text-slate-400 text-sm m-0 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="frequently-asked-questions" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {FAQ_ITEMS.map((faq, i) => (
                 <FAQItem key={i} q={faq.q} a={faq.a} />
               ))}
            </div>
          </section>
        </div>
      </article>

      {/* ─── RELATED GUIDES ─── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
          <h2 className="text-2xl font-black text-white mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link 
              to="/laptop-screen-repair-kuwait" 
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">Laptop Screen Repair</span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
            <Link 
              to="/macbook-repair-kuwait" 
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">MacBook Repair</span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
            <Link 
              to="/motherboard-repair-kuwait" 
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">Motherboard Repair</span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EEAT AUTHOR BOX ─── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src={CLOUDINARY_LOGO} 
                alt="KCROC Logo" 
                width="96" 
                height="96" 
                loading="lazy"
                decoding="async"
                className="w-24 h-24 rounded-full border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] object-contain bg-slate-900 p-2" 
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-2xl font-black text-white m-0">About KCROC</h2>
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} aria-hidden="true" /> 20+ Years Experience
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                KCROC is a Kuwait-based computer and laptop repair center specializing in chip-level diagnostics, motherboard repair, thermal engineering, gaming PCs, and MacBook repair. Our technicians perform component-level diagnostics and advanced hardware maintenance tailored to Kuwait's demanding climate.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Chip-Level Diagnostics', 'Thermal Engineering', 'Gaming Laptop Repair', 'MacBook Repair'].map(badge => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <CheckCircle2 size={14} className="text-cyan-500 flex-shrink-0" aria-hidden="true" /> {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONVERSION CTA ─── */}
      <footer className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-cyan-500/50 text-center shadow-[0_0_40px_rgba(34,211,238,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" aria-hidden="true"></div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Need Professional Laptop Repair in Kuwait?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Professional diagnostics, thermal engineering and chip-level repair with fast turnaround.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 text-sm font-bold text-cyan-100">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" /> Chip-Level Diagnostics</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" /> Thermal Engineering</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" /> Gaming Laptop Repair</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" /> MacBook Repair</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-amber-400 flex-shrink-0" aria-hidden="true" /> Same-Day Service Available</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={WA_LINK} 
              aria-label="Request consultation via WhatsApp"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02] flex justify-center items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400"
            >
              <MessageCircle size={20} aria-hidden="true" /> WhatsApp Consultation
            </a>
            <a 
              href={`tel:${BUSINESS_PHONE}`} 
              aria-label={`Call KCROC at ${BUSINESS_PHONE}`}
              className="bg-slate-950 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400"
            >
              <Phone size={20} aria-hidden="true" /> {BUSINESS_PHONE}
            </a>
          </div>
          
          <p className="text-emerald-400 font-bold text-sm mt-6 mb-2">No obligation consultation.</p>
          <p className="text-slate-500 text-xs">
            <MapPin size={14} className="inline mr-1" aria-hidden="true" /> Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
          </p>
        </div>
      </footer>
    </main>
  );
}
