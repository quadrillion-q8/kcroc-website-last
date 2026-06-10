import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Monitor, Battery, Keyboard, Droplets, Cpu, HardDrive, Phone, 
  MessageCircle, CheckCircle2, Shield, Truck, Zap, ChevronDown, MapPin 
} from 'lucide-react';
import { useState } from 'react';

// ─── Schema Module Scope ────────────────────────────────────────────────────
const macBookRepairSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://computerrepairkuwait.com/#business",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "url": "https://computerrepairkuwait.com",
      "telephone": "+96555301913",
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Shop 19", 
        "addressLocality": "Hawalli", 
        "addressCountry": "KW" 
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://computerrepairkuwait.com/macbook-repair#webpage",
      "name": "MacBook Repair in Kuwait",
      "url": "https://computerrepairkuwait.com/macbook-repair",
      "isPartOf": { "@id": "https://computerrepairkuwait.com/#business" }
    },
    {
      "@type": "RepairService",
      "name": "MacBook Repair",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Hawalli" },
        { "@type": "AdministrativeArea", "name": "Kuwait City" },
        { "@type": "AdministrativeArea", "name": "Salmiya" },
        { "@type": "AdministrativeArea", "name": "Farwaniya" },
        { "@type": "AdministrativeArea", "name": "Ahmadi" },
        { "@type": "AdministrativeArea", "name": "Jahra" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Do you repair M-series MacBook chips?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we specialize in component-level repair for Apple Silicon M1, M2, and M3 series motherboards." } },
        { "@type": "Question", "name": "What is your liquid damage success rate?", "acceptedAnswer": { "@type": "Answer", "text": "We utilize advanced ultrasonic cleaning and micro-soldering, achieving a high success rate for water-damaged boards." } }
      ]
    }
  ]
};

const services = [
  { icon: Monitor, title: 'Screen Replacement', desc: 'Panel replacement for Air/Pro. Restores original display clarity.', price: 'From 45 KD' },
  { icon: Battery, title: 'Battery Replacement', desc: 'Cell replacement with thermal management standards.', price: 'From 25 KD' },
  { icon: Keyboard, title: 'Keyboard Repair', desc: 'Full top-case refurbishment for butterfly/scissor issues.', price: 'From 30 KD' },
  { icon: Droplets, title: 'Liquid Damage', desc: 'Ultrasonic cleaning & micro-soldering.', price: 'Quote required' },
  { icon: Cpu, title: 'Logic Board Repair', desc: 'Advanced component-level motherboard surgery.', price: 'Quote required' },
  { icon: HardDrive, title: 'SSD Upgrade', desc: 'Fast NVMe storage expansion.', price: 'From 20 KD' },
];

const faqs = [
  { q: "Do you repair M-series MacBook chips?", a: "Yes, we specialize in component-level repair for Apple Silicon M1, M2, and M3 series motherboards." },
  { q: "What is your liquid damage success rate?", a: "We utilize advanced ultrasonic cleaning and micro-soldering, achieving a high success rate for water-damaged boards." },
  { q: "Do you use genuine parts?", a: "We offer both genuine Apple parts and high-grade OEM alternatives depending on model availability and budget." }
];

export default function MacBookRepair() {
  const waLink = `https://wa.me/96555301913?text=${encodeURIComponent("Hi, I need MacBook repair. Can you arrange a pickup?")}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Helmet>
        <title>MacBook Repair in Kuwait | Hawalli Specialists | KCROC</title>
        <meta name="description" content="Expert MacBook repair in Hawalli, Kuwait. Logic board micro-soldering, liquid damage recovery & screen replacement. Free pickup. تصليح ماك بوك الكويت." />
        <link rel="canonical" href="https://computerrepairkuwait.com/macbook-repair" />
        <script type="application/ld+json">{JSON.stringify(macBookRepairSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
          MacBook Repair in Kuwait <span className="block text-cyan-400 text-2xl md:text-4xl mt-4">— Hawalli Engineering Center</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Component-level diagnostics for MacBook Air & Pro. We save your data and hardware using professional micro-soldering techniques.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+96555301913" className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-full font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
            <Phone className="w-5 h-5" /> Call Now
          </a>
          <a href={waLink} className="bg-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 text-white">
            <MessageCircle className="w-5 h-5" /> WhatsApp Us
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Repair Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col">
                <s.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">{s.title}</h3>
                <p className="text-emerald-500 font-bold text-sm mb-3">{s.price}</p>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{s.desc}</p>
                <a href={waLink} className="text-cyan-400 text-sm font-bold flex items-center gap-2">
                  Get Quote <ChevronDown className="rotate-[-90deg]" size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: Truck, title: 'Free Pickup', desc: 'Across all Kuwait' },
                { icon: Shield, title: '30-Day Warranty', desc: 'Peace of mind service' },
                { icon: Zap, title: 'No Fix, No Fee', desc: 'Zero risk assessment' }
            ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-slate-900/20 rounded-2xl border border-slate-800">
                    <item.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{item.desc}</p>
                </div>
            ))}
        </div>

        <div>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((f, i) => (
                    <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                        <h4 className="font-bold text-white mb-2">{f.q}</h4>
                        <p className="text-slate-400 text-sm">{f.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
