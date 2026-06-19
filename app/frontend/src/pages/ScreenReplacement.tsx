import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Monitor, Apple, Smartphone, Zap, Cable, MonitorPlay,
  Phone, MessageCircle, CheckCircle2, Shield, Truck, Clock,
  ChevronDown, ExternalLink, HelpCircle
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/laptop-screen-repair-kuwait`;

const SERVICES = Object.freeze([
  { icon: Monitor,     title: 'Laptop LCD/LED Screen',    desc: 'Cracked, broken, or dead-pixel screens replaced for all laptop brands. Starting 20 KD.' },
  { icon: Apple,       title: 'MacBook Retina Display',   desc: 'MacBook Air and Pro Retina display replacement with genuine panels. Starting 45 KD.' },
  { icon: Smartphone,  title: 'Touch Screen Repair',      desc: 'Touch-enabled laptop screens repaired or replaced. Digitizer and panel replacement available.' },
  { icon: Zap,         title: 'Flickering & Lines Fix',   desc: 'Screen flickering, horizontal/vertical lines, or backlight issues diagnosed and fixed.' },
  { icon: Cable,       title: 'Display Cable Repair',     desc: 'Loose or damaged display cables causing intermittent screen issues. Quick cable replacement.' },
  { icon: MonitorPlay, title: 'External Monitor Setup',   desc: 'Temporary external display setup while your screen is being repaired. Free with any screen service.' },
]);

const PRICING = Object.freeze([
  { service: 'Laptop LCD/LED Screen',       price: 'From 20 KD' },
  { service: 'MacBook Retina Display',      price: 'From 45 KD' },
  { service: 'Touch Screen Replacement',    price: 'Call for quote' },
  { service: 'Display Cable Replacement',   price: 'Call for quote' },
  { service: 'Diagnosis',                   price: 'Free' },
]);

const WHY_CHOOSE_US = Object.freeze([
  { icon: Truck,       text: 'Free Pickup & Delivery across all Kuwait' },
  { icon: CheckCircle2, text: 'Genuine & high-grade compatible screens' },
  { icon: Shield,      text: '30-Day Warranty on all screen replacements' },
  { icon: Zap,         text: 'Same/Next-Day service available' },
  { icon: Clock,       text: 'Expert screen calibration included' },
  { icon: Phone,       text: 'Free diagnosis before any repair' },
]);

const BRANDS = Object.freeze([
  'HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI',
  'MacBook Air', 'MacBook Pro', 'Samsung', 'Toshiba', 'Huawei', 'LG',
]);

const AREAS = Object.freeze([
  'Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Mahboula', 'Jahra', 'Rumaithiya', 'Fahaheel'
]);

const FAQS = Object.freeze([
  { q: 'How much does laptop screen replacement cost in Kuwait?',          a: 'Laptop LCD/LED screens start from 20 KD. MacBook Retina displays start from 45 KD. Exact price depends on your model and screen type — diagnosis is always free.' },
  { q: 'Do you offer free pickup for screen replacement?',                 a: 'Yes. We provide free pickup and delivery across all areas of Kuwait for screen replacement and all other repairs.' },
  { q: 'How long does screen replacement take?',                           a: 'Most replacements are completed same day or next day. Drop off or arrange pickup before 11 AM for same-day service on eligible repairs.' },
  { q: 'What warranty is included?',                                       a: 'All screen replacements come with a 30-day warranty covering parts and workmanship.' },
  { q: 'Which brands do you service?',                                     a: 'HP, Dell, Lenovo, ASUS, Acer, MSI, MacBook Air, MacBook Pro, Samsung, Toshiba, Huawei, LG, and most other brands.' },
  { q: 'Can you fix lines or flickering without replacing the full screen?', a: 'Yes. In many cases, a display cable replacement resolves flickering or line issues without a full screen swap. We diagnose first.' },
  { q: 'Do you use genuine screens for MacBook repairs?',                  a: 'We use genuine Apple panels where available, and high-grade compatible Retina displays for MacBook Air and Pro replacements.' },
]);

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Laptop Screen Replacement Kuwait | LCD, Retina & Touch Screens – KCROC",
      "url": PAGE_URL,
      "description": "Professional laptop and MacBook screen replacement in Kuwait. Cracked, broken, or flickering screens fixed fast with free pickup.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      "name": "Laptop & MacBook Screen Replacement Kuwait",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      },
      "areaServed": "Kuwait",
      "description": "Professional laptop and MacBook screen replacement. Fast, reliable service with free pickup and delivery.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Screen Replacement Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "position": 1,
            "itemOffered": { "@type": "Service", "name": "Laptop LCD/LED Screen Replacement" },
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": "20", "priceCurrency": "KWD" }
          },
          {
            "@type": "Offer",
            "position": 2,
            "itemOffered": { "@type": "Service", "name": "MacBook Retina Display Replacement" },
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": "45", "priceCurrency": "KWD" }
          }
        ]
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",               "item": BUSINESS_INFO.url },
        { "@type": "ListItem", "position": 2, "name": "Services",           "item": `${BUSINESS_INFO.url}/services` },
        { "@type": "ListItem", "position": 3, "name": "Screen Replacement", "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const FAQAccordion = React.memo(({ items }: { items: typeof FAQS }) => {
  const [active, setActive] = useState<number | null>(null);
  const toggle = useCallback((i: number) => setActive(prev => (prev === i ? null : i)), []);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = active === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-btn-${i}`;
        return (
          <div key={faq.q} className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => toggle(i)}
            >
              <span className="flex items-start gap-3 font-bold text-white pr-4 text-sm tracking-wide">
                <HelpCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                {faq.q}
              </span>
              <ChevronDown
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-800/50' : 'grid-rows-[0fr] opacity-0'}`}
            >
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
FAQAccordion.displayName = 'FAQAccordion';

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function ScreenReplacement() {
  const waMessage = encodeURIComponent("Hi KCROC, I need laptop screen replacement. Please arrange free pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <MetaSEO
        title="Screen Replacement Kuwait | Laptop & MacBook Screen Fix – KCROC"
        description="Cracked or flickering laptop screen in Kuwait? KCROC replaces LCD, LED, Retina, and touch screens for all brands. Free pickup, starting 20 KD."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Screen Replacement</li>
        </ol>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Monitor size={16} aria-hidden="true" /> Premium Display Engineering
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Screen Replacement<br className="hidden md:block" /> in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kuwait</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
            تبديل شاشة لاب توب في الكويت – All laptop and MacBook screens replaced with free pickup and precise calibration.
          </p>
          <p className="text-sm text-emerald-400 font-bold max-w-xl mx-auto mb-10 uppercase tracking-widest">
            HP, Dell, Lenovo, ASUS, MacBook Air, Pro & More. Starting 20 KD.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            
            {/* ✅ Fixed: Added missing <a tag declarations here */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02]"
            >
              Book Free Pickup <ExternalLink size={20} aria-hidden="true" />
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-3 w-full sm:w-auto bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-base transition-all hover:border-cyan-500/30"
            >
              <Phone size={20} className="text-cyan-400" aria-hidden="true" /> Call Technician
            </a>

          </div>
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto mt-8">
            {AREAS.map((area) => (
              <span key={area} className="bg-slate-900/50 border border-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded-full cursor-default">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section aria-labelledby="services-heading" className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Professional Screen Solutions
          </h2>
          <p className="text-slate-400">Fast, flawless replacements for any display defect.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div key={service.title} className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors h-full flex flex-col">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <service.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING & WHY CHOOSE US ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24 grid lg:grid-cols-2 gap-12">
        {/* Pricing */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Screen Replacement Pricing</h2>
          <div className="overflow-hidden border border-slate-800 rounded-3xl bg-slate-900/30 backdrop-blur-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-950/50 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-xs">
                  <th className="p-6">Service Type</th>
                  <th className="p-6">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {PRICING.map((row) => (
                  <tr key={row.service} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-6 font-bold text-white">{row.service}</td>
                    <td className="p-6 text-emerald-400 font-bold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">Prices vary by exact laptop model and display resolution.</p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">The KCROC Advantage</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.text} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all flex items-start gap-4">
                <div className="bg-slate-950 p-2 rounded-lg shrink-0 border border-slate-800">
                  <item.icon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <p className="text-sm font-bold text-slate-300 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Brands We Service</h3>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <span key={brand} className="bg-slate-900/50 border border-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded-full cursor-default hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-6 relative z-10 mb-24">
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="text-3xl font-black text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Screen replacement in Kuwait — common questions answered.</p>
        </div>
        <FAQAccordion items={FAQS} />
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <MonitorPlay className="w-12 h-12 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Fix Your Screen?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Get your display restored to factory condition. Free diagnostic and free pickup across all areas of Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* ✅ Fixed: Added missing <a tag declarations here */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2"
            >
              Book Free Pickup <ExternalLink size={20} aria-hidden="true" />
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} className="text-cyan-400" aria-hidden="true" /> Call Technician
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
