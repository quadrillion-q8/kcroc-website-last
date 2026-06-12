import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Monitor, Battery, Keyboard, HardDrive, Zap, Droplets,
  Phone, MessageCircle, CheckCircle2, Shield, Truck, Clock,
  ChevronDown, ShieldCheck, Wrench
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/laptop-repair-kuwait`; // Fixed to match App.tsx

const cleanPhone = BUSINESS_PHONE.replace(/\D/g, '');
const WA_LINK = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need laptop repair in Kuwait. Please arrange a free diagnostic & pickup.")}`;

const services = [
  {
    icon: Monitor,
    title: 'Screen Replacement',
    desc: 'Panel replacement for all brands. Restores display clarity, brightness, and touch functionality.',
    price: 'From 20 KD',
    color: 'text-cyan-400',
  },
  {
    icon: Battery,
    title: 'Battery Replacement',
    desc: 'Fast cell replacement with verified, high-capacity parts to restore all-day battery life.',
    price: 'From 15 KD',
    color: 'text-emerald-400',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Repair',
    desc: 'Individual key repair or full unit replacement for sticky, unresponsive, or missing keys.',
    price: 'From 12 KD',
    color: 'text-purple-400',
  },
  {
    icon: HardDrive,
    title: 'Windows / OS Install',
    desc: 'Fresh system installation with all necessary drivers, updates, and optimization configured.',
    price: 'From 15 KD',
    color: 'text-blue-400',
  },
  {
    icon: Zap,
    title: 'SSD & RAM Upgrade',
    desc: 'Hardware upgrades that dramatically improve boot times, multitasking speed, and responsiveness.',
    price: 'From 20 KD',
    color: 'text-orange-400',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    desc: 'Deep logic board assessment, ultrasonic component cleaning, and part replacement after spills.',
    price: 'Quote required',
    color: 'text-rose-400',
  },
];

const brands = [
  'HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI',
  'Alienware', 'Samsung', 'Toshiba', 'Huawei', 'LG', 'Razer',
];

const areas = [
  'Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 
  'Mahboula', 'Jahra', 'Rumaithiya', 'Fahaheel', 'Mubarak Al-Kabeer'
];

const pricing = [
  { service: 'Screen Replacement', price: 'From 20 KD' },
  { service: 'Battery Replacement', price: 'From 15 KD' },
  { service: 'Keyboard Repair / Replacement', price: 'From 12 KD' },
  { service: 'Windows / OS Installation', price: 'From 15 KD' },
  { service: 'SSD & RAM Upgrade', price: 'From 20 KD' },
  { service: 'Liquid Damage Assessment', price: 'Quote required' },
  { service: 'Diagnosis & Pickup', price: '100% Free' },
];

const trustItems = [
  { icon: Truck, text: 'Free Pickup & Delivery across Kuwait' },
  { icon: Shield, text: '30-Day Warranty on all repairs' },
  { icon: CheckCircle2, text: 'No Fix, No Fee guarantee' },
  { icon: Zap, text: 'Same-day service on eligible repairs' },
  { icon: Clock, text: 'Fast, priority diagnostic slots' },
  { icon: Wrench, text: 'Component-level motherboard lab' },
];

const faqs = [
  {
    q: 'Do you repair all laptop brands?',
    a: 'Yes. We repair HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, Toshiba, Huawei, LG, and most other major laptop brands.',
  },
  {
    q: 'How long does laptop repair take in Kuwait?',
    a: 'Most common repairs like screen and battery replacements are completed the same day. Complex repairs such as logic board micro-soldering or liquid damage may take 1–3 business days.',
  },
  {
    q: 'Do you offer free laptop pickup in Kuwait?',
    a: 'Yes. We provide completely free pickup and delivery across all governorates of Kuwait. Contact us to arrange a quick collection from your home or office.',
  },
  {
    q: 'What warranty do you offer on laptop repairs?',
    a: 'All our hardware repairs and replacement parts come backed with a strict 30-day warranty covering parts and workmanship.',
  },
  {
    q: 'How much does laptop repair cost in Kuwait?',
    a: 'Pricing is highly transparent. Screen replacements start from 20 KD, batteries from 15 KD, and Windows installations from 15 KD. Our initial diagnosis is always free.',
  },
  {
    q: 'Do you charge if you cannot fix the laptop?',
    a: 'No. We operate on a strict No Fix, No Fee basis. If our engineers cannot successfully repair your laptop, you pay absolutely nothing.',
  },
  {
    q: 'Can you repair a laptop damaged by liquid spills?',
    a: 'Yes. We specialize in assessing and cleaning liquid-damaged laptops, replacing affected micro-components where needed. Arrange a free pickup immediately after the incident to prevent further corrosion.',
  },
];

// ─── SEO Schema Graph ────────────────────────────────────────────────────────

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${CANONICAL_URL}/#business`,
      name: BUSINESS_NAME,
      alternateName: 'KCROC',
      url: CANONICAL_URL,
      telephone: BUSINESS_PHONE,
      email: 'quadrillion1980@gmail.com',
      image: `${CANONICAL_URL}/logo.jpg`,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
        addressRegion: 'Hawalli Governorate',
        addressCountry: 'KW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.3356,
        longitude: 48.025,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Expert Laptop Repair in Kuwait | All Brands Fixed – KCROC',
      url: PAGE_URL,
      isPartOf: { '@id': `${CANONICAL_URL}/#website` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": CANONICAL_URL },
        { "@type": "ListItem", "position": 2, "name": "Laptop Repair", "item": PAGE_URL }
      ]
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Laptop Repair Service Kuwait',
      provider: { '@id': `${CANONICAL_URL}/#business` },
      areaServed: { '@type': 'Country', name: 'Kuwait' },
      description: 'Full-service laptop repair in Kuwait covering all brands. Screen replacement, battery, keyboard, Windows install, SSD upgrade, liquid damage, and more. Free pickup and delivery.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Laptop Repair Services',
        itemListElement: pricing.map((p, idx) => ({
          '@type': 'Offer',
          position: idx + 1,
          itemOffered: { '@type': 'Service', name: p.service }
        }))
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    },
  ],
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

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

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function LaptopRepair() {
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
        <title>Expert Laptop Repair in Kuwait | All Brands Fixed – KCROC</title>
        <link rel="canonical" href={PAGE_URL} />
        <meta name="description" content="Expert laptop repair in Kuwait for all brands. Screen, battery, keyboard, Windows reinstall, SSD upgrade. Free pickup. 30-day warranty. تصليح لاب توب الكويت." />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Laptop Repair in Kuwait | All Brands Fixed – KCROC" />
        <meta property="og:description" content="Full-service laptop repair in Kuwait. Screen, battery, keyboard, OS install, SSD upgrade. Free pickup across all Kuwait. 30-day warranty. No fix, no fee." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${CANONICAL_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="w-full bg-slate-950 text-slate-200 font-sans pb-24 md:pb-0 overflow-x-hidden">
        
        {/* Visible Breadcrumb Navigation */}
        <div className="w-full bg-slate-950 pt-32 pb-4 px-6 border-b border-slate-900 flex justify-center">
          <nav aria-label="Breadcrumb" className="w-full max-w-6xl text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> 
            <span className="mx-2" aria-hidden="true">/</span> 
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <span className="mx-2" aria-hidden="true">/</span> 
            <span className="text-slate-300" aria-current="page">Laptop Repair</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="pt-16 md:pt-24 pb-20 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 flex justify-center border-b border-slate-900">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
              <ShieldCheck className="w-4 h-4" /> 💻 Laptop Repair Experts — Kuwait
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">
              Professional Laptop <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Repair in Kuwait.</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4 font-medium leading-relaxed">
              <strong className="text-slate-300">تصليح لاب توب في الكويت</strong> — All major brands repaired with free pickup, same-day service, and a strict 30-day warranty.
            </p>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mb-10 uppercase tracking-wide font-bold">
              HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware & more.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 py-4 text-lg transition-all shadow-lg shadow-emerald-900/20">
                <MessageCircle className="w-5 h-5" /> Book Free Pickup
              </a>
              <a href={`tel:${cleanPhone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full px-8 py-4 text-lg border border-slate-700 transition-all">
                <Phone className="w-5 h-5" /> Call {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* Brands We Repair */}
        <section className="py-12 px-6 bg-slate-900/30 border-b border-slate-800 flex justify-center">
          <div className="w-full max-w-5xl text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">All Major Brands Serviced</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {brands.map((brand, i) => (
                <span key={i} className="bg-slate-950 text-slate-300 border border-slate-800 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:border-cyan-500/40 transition-colors cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-6 flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Laptop Repair Services</h2>
              <p className="text-lg text-slate-400">تصليح لاب توب — Fast, component-level repair for any hardware failure.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-all h-full flex flex-col">
                    <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                    <div className="pt-4 border-t border-slate-800/50">
                      <span className="text-emerald-400 font-black tracking-wide">{service.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Transparency */}
        <section className="py-20 px-6 bg-slate-900/20 border-y border-slate-800 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-4 text-white">Transparent Pricing</h2>
              <p className="text-slate-400">Fixed quotes provided after our free diagnostic assessment.</p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {pricing.map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-800/50 last:border-b-0 ${i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950'}`}>
                  <span className="text-slate-300 font-medium">{row.service}</span>
                  <span className="text-emerald-400 font-bold whitespace-nowrap ml-4">{row.price}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs text-center mt-6 uppercase tracking-wide font-medium">
              *Prices may vary by exact laptop model and part availability.
            </p>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 px-6 flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white mb-4">Why Choose KCROC?</h2>
              <p className="text-slate-400">Kuwait's most reliable hardware repair lab.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-5 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex-shrink-0">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-slate-300 font-bold text-sm leading-snug">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="py-12 px-6 bg-slate-900/20 border-y border-slate-800 flex justify-center">
          <div className="w-full max-w-4xl text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Serving All Kuwait Governorates</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {areas.map((area, idx) => (
                <span key={idx} className="bg-slate-950 text-slate-400 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-medium cursor-default">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400">Common questions about our laptop repair process.</p>
            </div>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 border-t border-slate-800 flex justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950">
          <div className="w-full max-w-4xl text-center">
            <h2 className="text-4xl font-black mb-6 text-white tracking-tight">Ready to Fix Your Laptop?</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
              We operate out of the Al Mullah Complex in Hawalli. Contact us today to arrange a completely free diagnostic pickup anywhere in Kuwait.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${cleanPhone}`} aria-label="Call KCROC support" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full px-8 py-4 text-lg border border-slate-700 transition-all">
                <Phone className="w-5 h-5" /> Call {BUSINESS_PHONE}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC support" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 py-4 text-lg transition-all shadow-lg shadow-emerald-900/20">
                <MessageCircle className="w-5 h-5" /> Message on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA Bottom Bar (Appears after scroll) */}
        <div className={`fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4 flex justify-center gap-3 z-50 md:hidden transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Pickup" className="flex-1 bg-emerald-600 py-3 rounded-full text-white font-bold text-center text-sm shadow-lg shadow-emerald-900/20">
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
