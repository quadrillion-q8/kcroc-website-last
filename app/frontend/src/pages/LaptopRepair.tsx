import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Monitor, Battery, Keyboard, HardDrive, Zap, Droplets, Phone, 
  MessageCircle, CheckCircle2, Shield, Truck, ChevronDown, MapPin 
} from 'lucide-react';

// ─── Schema Module Scope ────────────────────────────────────────────────────
const laptopRepairSchema = {
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
      "@id": "https://computerrepairkuwait.com/laptop-repair#webpage",
      "name": "Laptop Repair in Kuwait",
      "url": "https://computerrepairkuwait.com/laptop-repair",
      "isPartOf": { "@id": "https://computerrepairkuwait.com/#business" }
    },
    {
      "@type": "RepairService",
      "name": "Laptop Repair Service",
      "provider": { "@id": "https://computerrepairkuwait.com/#business" },
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
        { "@type": "Question", "name": "Do you repair all laptop brands?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we repair HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, and most other major laptop brands." } },
        { "@type": "Question", "name": "How long does a laptop repair take?", "acceptedAnswer": { "@type": "Answer", "text": "Most common issues like screen and battery replacements are completed same-day. Complex repairs may take 1-3 business days." } }
      ]
    }
  ]
};

const services = [
  { icon: Monitor, title: 'Screen Replacement', desc: 'Panel replacement for all brands. Restores display clarity.', price: 'From 20 KD' },
  { icon: Battery, title: 'Battery Replacement', desc: 'Fast cell replacement with verified parts.', price: 'From 15 KD' },
  { icon: Keyboard, title: 'Keyboard Repair', desc: 'Keyboard repair or full unit replacement.', price: 'From 12 KD' },
  { icon: HardDrive, title: 'Windows/OS Install', desc: 'Fresh system installation with all drivers.', price: 'From 15 KD' },
  { icon: Zap, title: 'Performance Upgrade', desc: 'SSD & RAM upgrades for speed.', price: 'From 20 KD' },
  { icon: Droplets, title: 'Liquid Damage', desc: 'Assessment and component cleaning.', price: 'Quote required' },
];

const faqs = [
  { q: "Do you repair all laptop brands?", a: "Yes, we repair HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, and most other major laptop brands." },
  { q: "How long does a laptop repair take?", a: "Most common issues like screen and battery replacements are completed same-day. Complex repairs may take 1-3 business days." }
];

export default function LaptopRepair() {
  const waLink = `https://wa.me/96555301913?text=${encodeURIComponent("Hi, I need laptop repair. Can you arrange a pickup?")}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Helmet>
        <title>Laptop Repair in Hawalli, Kuwait | All Brands Fixed | KCROC</title>
        <meta name="description" content="Expert laptop repair in Kuwait for all brands. Screen, battery, keyboard, Windows reinstall. Free pickup. 30-day warranty. تصليح لاب توب الكويت." />
        <link rel="canonical" href="https://computerrepairkuwait.com/laptop-repair" />
        <script type="application/ld+json">{JSON.stringify(laptopRepairSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Laptop Repair in Kuwait <span className="block text-cyan-400 text-2xl md:text-4xl mt-4">— Hawalli Expert Service</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-service repair center for all laptop brands. From screen replacements and OS reinstalls to hardware performance upgrades with a 30-day warranty.
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
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Laptop Service Menu</h2>
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
                { icon: Shield, title: '30-Day Warranty', desc: 'Quality assurance' },
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
