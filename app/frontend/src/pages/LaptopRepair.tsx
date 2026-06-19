import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, Cpu, ThermometerSnowflake, BatteryWarning,
  ShieldCheck, CheckCircle, MessageCircle, Phone
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup'; // Added our new component

// ─── MODULE-LEVEL CONSTANTS ───────────────────────────────────────────────────

const COMMON_ISSUES = [
  {
    title: "Thermal Throttling",
    desc: "Fans running loud? Laptops overheating in Kuwait's climate will damage the CPU. We apply premium liquid metal and thermal paste.",
    icon: ThermometerSnowflake
  },
  {
    title: "Power & Battery Failures",
    desc: "Laptop dying at 30% or won't turn on at all? We replace degraded lithium cells and repair faulty charging ports.",
    icon: BatteryWarning
  },
  {
    title: "Motherboard Shorts",
    desc: "Liquid spill or sudden death? Before buying a new laptop, let us perform chip-level micro-soldering to save your current board.",
    icon: Cpu
  }
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Laptop Repair Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call",
        "telephone": "+96555301913",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      },
      "areaServed": "Kuwait",
      "description": "Professional Windows laptop repair, hardware diagnostics, and thermal management across Kuwait.",
      "offers": {
        "@type": "Offer",
        "name": "Free Laptop Diagnosis",
        "price": "0",
        "priceCurrency": "KWD",
        "description": "Free collection and component-level diagnostic for all laptop repairs in Kuwait."
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer free laptop pickup in Kuwait?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Kuwait Computer Repair On Call provides free pickup and delivery across all of Kuwait. Contact us on WhatsApp or call 55301913 to arrange collection."
          }
        },
        {
          "@type": "Question",
          "name": "What is your No Fix, No Fee policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If we cannot repair your laptop, you pay nothing. We will return your device at no charge."
          }
        },
        {
          "@type": "Question",
          "name": "Which laptop brands do you repair?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We repair all major Windows laptop brands including Dell, HP, Lenovo, ASUS, and Acer."
          }
        }
      ]
    }
  ]
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LaptopRepair() {
  const waMessage = encodeURIComponent("Hi KCROC, I need help with my Windows laptop. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO
        title="Expert Laptop Repair in Kuwait | Free Pickup - KCROC"
        description="Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery."
        canonical={`${BUSINESS_INFO.url}/laptop-repair-kuwait`}
      />

      {/* ✅ Now using your reusable SchemaMarkup component */}
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Laptop Repair</li>
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
            <Laptop size={16} aria-hidden="true" /> Windows PC Specialists
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Laptop Repair</span><br />
            in Kuwait
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            From shattered chassis hinges to complex motherboard shorts. We restore your laptop to factory performance with our No Fix, No Fee guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-emerald-400 uppercase tracking-widest">
            {['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'].map((brand) => (
              <span key={brand} className="flex items-center gap-2">
                <CheckCircle size={16} aria-hidden="true" /> {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMON ISSUES GRID ─── */}
      <section aria-labelledby="issues-heading" className="max-w-6xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="issues-heading" className="sr-only">Common Laptop Problems We Fix</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {COMMON_ISSUES.map((issue) => (
            <div
              key={issue.title}
              className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:border-cyan-500/50 transition-colors">
                <issue.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{issue.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{issue.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE PROCESS ─── */}
      <section aria-labelledby="process-heading" className="max-w-4xl mx-auto px-6 relative z-10 mb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-slate-800">
          <h2 id="process-heading" className="text-3xl font-black text-white mb-8 text-center tracking-tight">
            Our Repair Protocol
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Free Collection & Diagnosis",
                desc: "Our driver collects your laptop. We perform a full teardown and component-level diagnostic test at absolutely no cost to you."
              },
              {
                step: "2",
                title: "Transparent Quoting",
                desc: "We provide a firm price and turnaround time. We only proceed if you approve. If you decline, we return the laptop for free."
              },
              {
                step: "3",
                title: "Precision Repair & Testing",
                desc: "We repair the fault, apply high-grade thermal paste, and stress-test the machine for 12 hours before returning it to you."
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6">
                <div
                  className="w-10 h-10 shrink-0 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 font-black text-lg"
                  aria-hidden="true"
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section aria-labelledby="faq-heading" className="max-w-4xl mx-auto px-6 relative z-10 mb-24">
        <h2 id="faq-heading" className="text-3xl font-black text-white mb-8 text-center tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Do you offer free laptop pickup in Kuwait?",
              a: "Yes. We provide free pickup and delivery across all of Kuwait. Contact us on WhatsApp or call 55301913 to arrange collection."
            },
            {
              q: "What is your No Fix, No Fee policy?",
              a: "If we cannot repair your laptop, you pay nothing. We return your device at no charge."
            },
            {
              q: "Which laptop brands do you repair?",
              a: "We repair all major Windows laptop brands including Dell, HP, Lenovo, ASUS, and Acer."
            }
          ].map(({ q, a }) => (
            <div key={q} className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white font-bold mb-2">{q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl font-black text-white mb-4">Is Your Laptop Failing?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Don't risk losing your data or causing further hardware damage. Let our experts diagnose it today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* ✅ Fixed: Added missing <a tag declarations here */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 flex justify-center items-center gap-2"
            >
              <MessageCircle size={20} aria-hidden="true" /> Request Free Pickup
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} aria-hidden="true" /> Call Technician
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
