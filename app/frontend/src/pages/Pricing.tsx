import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Check, Truck, Clock, Laptop, Cpu, HardDrive, Keyboard, 
  Search, MapPin, ArrowRight, Phone, MessageCircle, ChevronDown, 
  BadgeCheck, CheckCircle, ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MetaSEO from '../components/seo/MetaSEO';

// ─── Data Arrays ─────────────────────────────────────────────────────────────

const pricingPlans = [
  {
    name: 'Basic Diagnostics',
    priceLabel: 'Free',
    features: ['System Check', 'Issue Identification', 'Free Quote', 'No Obligation'],
    icon: Search,
    hasPrice: false,
    numericPrice: undefined,
  },
  {
    name: 'Laptop Repair',
    priceLabel: 'From 15 KWD',
    features: ['Hardware Repair', 'Component Testing', '30-Day Warranty', 'Performance Optimization'],
    icon: Laptop,
    hasPrice: true,
    numericPrice: 15,
  },
  {
    name: 'MacBook Repair',
    priceLabel: 'From 25 KWD',
    features: ['Logic Board Repair', 'Battery Replacement', 'Screen Repair', 'Thermal Service'],
    icon: Laptop,
    hasPrice: true,
    numericPrice: 25,
  },
  {
    name: 'Gaming PC Repair',
    priceLabel: 'From 25 KWD',
    features: ['GPU Diagnostics', 'Cooling System Repair', 'FPS Optimization', 'Hardware Upgrade'],
    icon: Cpu,
    hasPrice: true,
    numericPrice: 25,
  },
  {
    name: 'SSD Upgrade',
    priceLabel: 'From 18 KWD',
    features: ['SSD Installation', 'Windows Migration', 'Faster Boot', 'Data Safety'],
    icon: HardDrive,
    hasPrice: true,
    numericPrice: 18,
  },
  {
    name: 'Keyboard Replacement',
    priceLabel: 'From 15 KWD',
    features: ['Genuine Parts', 'Fast Service', 'All Brands', 'Warranty'],
    icon: Keyboard,
    hasPrice: true,
    numericPrice: 15,
  },
  {
    name: 'Motherboard Repair',
    priceLabel: 'From 25 KWD',
    features: ['Board Level Repair', 'IC Replacement', 'Microsoldering', 'Advanced Diagnostics'],
    icon: Cpu,
    hasPrice: true,
    numericPrice: 25,
  },
];

const trustItems = [
  { text: 'Free Pickup & Delivery', icon: Truck },
  { text: '30-Day Warranty', icon: Clock },
  { text: 'Genuine Parts', icon: ShieldCheck },
  { text: 'Experienced Techs', icon: Check },
  { text: 'No Hidden Charges', icon: BadgeCheck },
  { text: 'Fast Turnaround', icon: CheckCircle },
];

const locations = [
  'Kuwait City', 'Salmiya', 'Hawally', 'Farwaniya', 'Fahaheel', 
  'Mangaf', 'Mahboula', 'Abu Halifa', 'Khaitan', 'Jahra', 
  'Sabah Al Salem', 'Egaila',
];

const faqs = [
  { q: "Do you charge for diagnostics?", a: "No. Diagnostics are completely free." },
  { q: "Do you provide pickup and delivery?", a: "Yes. We provide free pickup and delivery across Kuwait." },
  { q: "What if my device cannot be repaired?", a: "You pay nothing. Our No Fix No Fee policy means there is no repair charge if we cannot fix your device." },
  { q: "How long does repair take?", a: "Most repairs are completed within 24 to 48 hours depending on parts availability and repair complexity." },
  { q: "Do you repair MacBooks and Gaming PCs?", a: "Yes. We repair MacBooks, Gaming PCs, laptops, desktop computers and perform motherboard level repairs." },
];

const serviceLinks = [
  { title: 'Laptop Repair', path: '/laptop-repair-kuwait', icon: Laptop, desc: 'Screen, keyboard, and battery repair.' },
  { title: 'MacBook Repair', path: '/macbook-repair-kuwait', icon: Laptop, desc: 'Logic board, display, and thermal service.' },
  { title: 'Motherboard Repair', path: '/motherboard-repair-kuwait', icon: Cpu, desc: 'Microsoldering and IC replacement.' },
  { title: 'Gaming PC Repair', path: '/gaming-pc-repair-kuwait', icon: Cpu, desc: 'GPU diagnostics and FPS optimization.' },
];

const whatsappUrl = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I need laptop repair. Please arrange free pickup.")}`;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = useMemo(() => {
    const baseBusiness = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ComputerStore",
          "name": "KCROC Computer Repair Kuwait",
          "url": "https://www.computerrepairkuwait.com",
          "telephone": "+96555301913",
          "areaServed": "Kuwait",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KW",
            "addressLocality": "Hawalli",
            "addressRegion": "Hawalli",
          },
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a,
            },
          })),
        },
      ]
    };

    const serviceNames = [
      'Laptop Repair',
      'Computer Repair',
      'MacBook Repair',
      'Gaming PC Repair',
      'Motherboard Repair',
    ];

    const services = serviceNames.map(name => ({
      "@type": "Service",
      "name": name,
      "provider": {
        "@type": "ComputerStore",
        "name": "KCROC Computer Repair Kuwait",
      },
      "areaServed": "Kuwait",
    }));

    const offers = pricingPlans
      .filter(p => p.hasPrice && p.numericPrice !== undefined && p.numericPrice > 0)
      .map(p => ({
        "@type": "Offer",
        "name": p.name,
        "price": p.numericPrice,
        "priceCurrency": "KWD",
        "provider": {
          "@type": "ComputerStore",
          "name": "KCROC Computer Repair Kuwait",
        },
      }));

    baseBusiness["@graph"]!.push(...services);
    baseBusiness["@graph"]!.push(...offers);

    return baseBusiness;
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0a0f1c] text-slate-100 font-sans pb-32">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <meta property="og:title" content="Laptop & Computer Repair Prices in Kuwait | Free Diagnosis | KCROC" />
        <meta property="og:description" content="Affordable laptop and computer repair prices in Kuwait. Free diagnosis, free pickup & delivery, no fix no fee." />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/pricing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <MetaSEO
        title="Laptop & Computer Repair Prices in Kuwait | Free Diagnosis | KCROC"
        description="Affordable laptop and computer repair prices in Kuwait. Free diagnosis, free pickup & delivery, no fix no fee. MacBook, gaming PC and motherboard repair by KCROC."
        canonical="https://www.computerrepairkuwait.com/pricing"
      />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 text-center">
        <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-6 py-2 mb-6">Transparent Pricing</Badge>
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">
          Laptop & Computer Repair <br />
          <span className="text-cyan-400">Prices in Kuwait</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Fixed quotes before we start. No hidden charges. You only pay if we fix it.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold">
          {['✓ Free Diagnosis', '✓ Free Pickup & Delivery', '✓ No Fix No Fee'].map(item => (
            <span key={item} className="flex items-center text-cyan-400">{item}</span>
          ))}
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={i}
                className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col"
              >
                <div className="text-cyan-500 mb-6">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-white mb-6">{plan.priceLabel}</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center text-slate-400 text-sm">
                      <Check className="w-4 h-4 mr-3 text-cyan-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-6 text-lg rounded-2xl"
                >
                  <a href={whatsappUrl}>Get Free Quote</a>
                </Button>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  Starting price. Final quote depends on model.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/30 border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center hover:border-cyan-500/30 transition-all"
            >
              <item.icon className="w-6 h-6 text-cyan-500 mb-3" />
              <span className="text-xs font-bold text-slate-300">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Section */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-black mb-4">Free Pickup & Delivery Across Kuwait</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
          We provide free pickup and delivery services for laptops, computers, MacBooks and gaming PCs across Kuwait including Kuwait City, Salmiya, Hawally, Farwaniya, Fahaheel, Mangaf, Mahboula and surrounding areas.
        </p>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {locations.map(loc => (
            <span
              key={loc}
              className="px-4 py-2 rounded-full border border-slate-700 hover:border-cyan-500 text-sm hover:text-cyan-400 transition-all cursor-default"
            >
              <MapPin className="inline w-3 h-3 mr-1" /> {loc}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-800 rounded-2xl bg-slate-900/30 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left font-bold hover:text-cyan-400 transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`px-6 text-slate-400 text-sm leading-relaxed transition-all duration-300 ${
                  openIndex === i ? 'pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Services */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black mb-4 text-center">Explore Our Services</h2>
        <p className="text-slate-400 text-center mb-10">
          Professional repair services for laptops, MacBooks, gaming PCs, motherboards and storage devices.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="group bg-slate-900/30 p-4 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all hover:translate-y-[-4px]"
            >
              <div className="text-cyan-500 mb-2">
                <link.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold block mb-1">{link.title}</span>
              <p className="text-[10px] text-slate-500 leading-tight">{link.desc}</p>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 mt-2" />
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-10 max-w-2xl mx-auto text-center">
        <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            Prices shown are starting prices. Final repair cost depends on device model, parts availability and repair complexity. A fixed quote is always provided before repair begins.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0a0f1c]/90 backdrop-blur-lg border-t border-slate-800 p-4 flex gap-4 z-[999]">
        <a
          href="tel:+96555301913"
          className="flex-1 bg-slate-800 hover:bg-slate-700 p-3 rounded-full flex items-center justify-center font-bold text-sm"
        >
          <Phone className="mr-2 w-4 h-4" /> Call Now
        </a>
        <a
          href={whatsappUrl}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-3 rounded-full flex items-center justify-center font-bold text-sm"
        >
          <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
        </a>
      </div>
    </main>
  );
}
