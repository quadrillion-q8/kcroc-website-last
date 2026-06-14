import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, ChevronDown, Phone, MessageCircle, Wrench, 
  Cpu, Settings, Laptop, Monitor, Battery, MapPin 
} from 'lucide-react';

// ─── Constants & Schema ──────────────────────────────────────────────────────
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/blog/laptop-repair-kuwait-2026`;
const BUSINESS_PHONE = "+96555301913";
const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I need professional laptop repair in Kuwait. Please arrange a free diagnostic & pickup.")}`;

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "mainEntityOfPage": PAGE_URL,
      "headline": "Laptop Repair in Kuwait – Same-Day Service Guide 2026",
      "description": "Laptop repair guide for Kuwait covering overheating, slow performance, screen issues, and trusted local repair solutions by KCROC in Hawalli.",
      "author": { "@type": "Organization", "name": "KCROC" },
      "publisher": { "@type": "Organization", "name": "KCROC" },
      "image": `${CANONICAL_URL}/og/laptop-repair-kuwait.jpg`,
      "datePublished": "2026-01-01",
      "dateModified": "2026-06-14",
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does laptop repair cost in Kuwait?", "acceptedAnswer": { "@type": "Answer", "text": "KCROC offers a free diagnosis and a fixed quote before any work begins — no fix, no fee." } },
        { "@type": "Question", "name": "Do you offer free pickup and delivery in Kuwait?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. KCROC provides free pickup and delivery across all areas of Kuwait, including Hawalli, Salmiya, Farwaniya, Jahra, and Kuwait City." } },
        { "@type": "Question", "name": "How fast can I get my laptop back?", "acceptedAnswer": { "@type": "Answer", "text": "Book a free pickup before 11:00 AM and most eligible repairs such as screen replacement, SSD upgrades, and virus removal are returned the same day, subject to parts availability." } },
        { "@type": "Question", "name": "Is there a warranty on laptop repairs?", "acceptedAnswer": { "@type": "Answer", "text": "Every repair carried out by KCROC is backed by a 30-day warranty." } }
      ]
    }
  ]
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
      <button 
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="w-full flex justify-between items-center font-black text-white hover:text-cyan-400 transition-colors focus:outline-none"
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div 
        id={`${id}-panel`}
        role="region"
        hidden={!open}
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="text-slate-400 text-sm leading-relaxed overflow-hidden mt-3">{a}</p>
      </div>
    </div>
  );
};

export default function BlogLaptopRepair() {
  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30">
      <Helmet>
        <title>Laptop Repair in Kuwait – Same-Day Service Guide 2026 | KCROC</title>
        <meta name="description" content="Expert laptop repair guide in Kuwait. Learn how to fix overheating, slow performance, screen replacement & SSD upgrades. Free pickup & delivery, same-day service, 30-day warranty. Call 55301913." />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 px-6 mt-2 md:mt-8 flex flex-col justify-center items-center text-center z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs">Kuwait Repair Guide 2026</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 mb-6 leading-tight tracking-tight">
            Laptop Repair in Kuwait: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">Same-Day, No Fix No Fee</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Kuwait's heat and dust shorten laptop lifespans fast. Get your laptop fixed the same day by a Hawalli technician with 20+ years of local experience.
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-lg text-slate-300">If your laptop is slowing down, overheating, or not turning on, you're not alone. In Kuwait, thousands of users face daily laptop issues due to heavy usage and climate conditions. Finding a reliable computer repair shop in Hawalli or Salmiya can be stressful, but KCROC makes it simple with our free pickup service.</p>

          <section className="my-12 p-8 bg-slate-900/30 backdrop-blur-md border border-cyan-500/40 rounded-3xl">
            <h2 className="text-white font-black mb-3 text-2xl">Expert Laptop Repair Services in Kuwait</h2>
            <p className="text-slate-400 text-sm md:text-base">We specialize in <strong>MacBook repair</strong>, <strong>laptop screen replacement</strong>, <strong>SSD upgrades</strong>, <strong>Windows installation & optimization</strong>, <strong>keyboard replacement</strong>, and <strong>motherboard & chip-level repair</strong>. Our Hawalli lab handles everything from work laptops to high-end gaming rigs.</p>
          </section>

          <h2 className="text-3xl font-black text-white mt-16 mb-8 flex items-center gap-3">
            <AlertTriangle className="text-amber-400" /> Common Laptop Problems in Kuwait
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Cpu, t: "Not Turning On", d: "Often motherboard, power jack, or battery failure after power surges." },
              { icon: Settings, t: "Overheating & Loud Fans", d: "Kuwait's dust and heat clog cooling systems rapidly." },
              { icon: Laptop, t: "Slow Performance", d: "Failing HDD, low RAM, or Windows bloat." },
              { icon: AlertTriangle, t: "System Crashes", d: "Corrupted Windows files or driver conflicts." },
              { icon: Monitor, t: "Broken Screen", d: "Cracked displays or flickering panels." },
              { icon: Battery, t: "Battery Issues", d: "Charging port damage or dead cells." }
            ].map((issue) => (
              <div key={issue.t} className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
                <issue.icon className="text-cyan-400 mb-3" />
                <h4 className="font-bold text-white">{issue.t}</h4>
                <p className="text-slate-400 text-sm mt-1">{issue.d}</p>
              </div>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-black text-white mb-8">Our Repair Process</h2>
            <div className="space-y-4">
              {[
                { s: "Free Pickup & Diagnosis", d: "Book before 11 AM and we collect your laptop from anywhere in Kuwait." },
                { s: "Clear, No-Obligation Quote", d: "We confirm the exact price before starting — no fix, no fee." },
                { s: "Professional Repair", d: "Certified technicians and quality tested components." },
                { s: "Testing & Free Delivery", d: "Every repair is tested and backed by a 30-day warranty." }
              ].map((step, i) => (
                <div key={step.s} className="flex gap-4 items-start bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
                  <div className="bg-cyan-500/10 text-cyan-400 font-black w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm border border-cyan-500/40">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{step.s}</h4>
                    <p className="text-slate-400 text-sm">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 p-8 bg-slate-900/30 backdrop-blur-md rounded-2xl border border-slate-800">
            <h3 className="text-white font-black mb-6 flex items-center gap-2"><Wrench className="w-5 h-5 text-cyan-400" /> Related Expert Services</h3>
            <div className="flex flex-wrap gap-3">
              <Link className="bg-slate-800 px-5 py-3 rounded-xl text-cyan-400 hover:text-white border border-slate-700 transition" to="/services">View All Repair Services</Link>
              <Link className="bg-slate-800 px-5 py-3 rounded-xl text-cyan-400 hover:text-white border border-slate-700 transition" to="/macbook-repair-kuwait">MacBook Repair</Link>
              <Link className="bg-slate-800 px-5 py-3 rounded-xl text-cyan-400 hover:text-white border border-slate-700 transition" to="/motherboard-repair-kuwait">Motherboard Repair</Link>
            </div>
          </section>

          <h2 className="text-3xl font-black text-white mt-16 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
             {schemaData["@graph"][1].mainEntity.map((faq: any, i: number) => (
               <FAQItem key={i} q={faq.name} a={faq.acceptedAnswer.text} />
             ))}
          </div>

          <div className="bg-slate-900/30 backdrop-blur-md p-10 rounded-3xl mt-16 border border-cyan-500/40 text-center shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <h3 className="text-3xl font-black text-white mb-4">Need Laptop Repair in Kuwait Today?</h3>
            <p className="text-cyan-400 font-bold mb-8 uppercase text-sm tracking-widest">Free pickup & delivery • Same-day service • 30-day warranty</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={WA_LINK} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all flex items-center gap-2 justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
                <MessageCircle className="w-5 h-5" /> Book Free Pickup
              </a>
              <a href={`tel:${BUSINESS_PHONE}`} className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 justify-center">
                <Phone className="w-5 h-5" /> Call: 55301913
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-8 flex justify-center items-center gap-2">
                <MapPin size={14} /> Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
