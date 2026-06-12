import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ChevronDown, Phone, MessageCircle, Wrench } from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────────────────
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const PAGE_URL = `${CANONICAL_URL}/blog/laptop-repair-kuwait-2026`;
const BUSINESS_PHONE = "+96555301913";
const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I need professional laptop repair in Kuwait. Please arrange a free diagnostic & pickup.")}`;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": PAGE_URL,
  "headline": "Laptop Repair in Kuwait – Fast & Professional Service Guide 2026",
  "description": "Complete guide to laptop repair in Kuwait including overheating, slow performance, screen repair, and expert solutions by KCROC.",
  "author": { "@type": "Organization", "name": "KCROC" },
  "publisher": { "@type": "Organization", "name": "KCROC" },
  "image": `${CANONICAL_URL}/og/laptop-repair-kuwait.jpg`,
  "datePublished": "2026-01-01",
  "dateModified": "2026-06-12",
  "inLanguage": "en"
};

// ─── Pro-Tier Accessible FAQ Component ──────────────────────────────────────
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
      <button 
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="w-full flex justify-between items-center font-bold text-white hover:text-cyan-400 transition-colors focus:outline-none"
      >
        <span>{q}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        />
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
    <main className="min-h-screen bg-slate-950 text-slate-200 pb-20 pt-24">
      <Helmet>
        <title>Laptop Repair in Kuwait – Fast & Professional Service Guide 2026 | KCROC</title>
        <meta name="description" content="Expert laptop repair guide in Kuwait. Learn how to fix overheating, slow performance, blue screens, and hardware issues. Free pickup & delivery." />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-16">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs">Expert Guide 2026</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight">
            Laptop Repair in Kuwait: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Fast, Reliable & Professional</span>
          </h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>If your laptop is slowing down, overheating, or not turning on, you’re not alone. In Kuwait, thousands of users face daily laptop issues due to heavy usage and climate conditions.</p>

          <section className="mt-10 p-6 bg-slate-900/20 border border-slate-800 rounded-xl">
            <h2 className="text-white font-bold mb-3 text-lg">Laptop Repair Services in Kuwait</h2>
            <p className="text-slate-400">We specialize in <strong>MacBook repair Kuwait</strong>, <strong>gaming laptop repair</strong>, <strong>SSD upgrade services</strong>, and <strong>data recovery in Kuwait</strong>.</p>
          </section>

          <div className="my-10 min-h-[90px] bg-slate-900/5 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 text-xs">Ad Placement</div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <AlertTriangle className="text-amber-400" /> Common Laptop Problems We Fix
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: "Not Turning On", d: "Motherboard, power jack, or battery failure." },
              { t: "Overheating & Noise", d: "Dust buildup or failing cooling fans." },
              { t: "Slow Performance", d: "HDD failure, RAM issues, or OS bloat." },
              { t: "System Crashes", d: "Windows corruption or driver conflicts." },
              { t: "Broken Screen", d: "Cracked displays or flickering panels." },
              { t: "Battery Issues", d: "Charging port damage or dead cells." }
            ].map((issue, i) => (
              <div key={i} className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white">{issue.t}</h4>
                <p className="text-slate-400 text-sm mt-1">{issue.d}</p>
              </div>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold text-white mb-6">Signs You Need Laptop Repair</h2>
            <div className="space-y-3 text-slate-400">
              <p>✔ Laptop is overheating frequently</p>
              <p>✔ System takes too long to start</p>
              <p>✔ Screen flickering or black display</p>
              <p>✔ Random shutdowns or crashes</p>
            </div>
          </section>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">Our 4-Step Repair Process</h2>
          <div className="space-y-4">
            {[
              { s: "Free Diagnosis", d: "We identify the root cause immediately." },
              { s: "Clear Cost Estimate", d: "Transparent quote before any work starts." },
              { s: "Professional Repair", d: "Certified technicians and quality parts." },
              { s: "Testing & Delivery", d: "Rigorous testing and safe delivery." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-900/20 p-4 rounded-xl">
                <div className="bg-cyan-500/10 text-cyan-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white">{step.s}</h4>
                  <p className="text-slate-400 text-sm">{step.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 min-h-[90px] bg-slate-900/5 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 text-xs">Ad Placement</div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold text-white mb-6">Why Laptop Repair is Important in Kuwait</h2>
            <div className="space-y-4 text-slate-400">
              <p>Extreme heat can permanently damage internal laptop components if not repaired early.</p>
              <p>Dust accumulation is faster in Kuwait than most countries, leading to severe overheating issues.</p>
              <p>Delaying repairs increases overall costs and the risk of permanent data loss.</p>
            </div>
          </section>

          <section className="mt-12 p-8 bg-slate-900/30 rounded-2xl border border-slate-800">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Wrench className="w-5 h-5 text-cyan-400" /> Related Expert Services</h3>
            <div className="flex flex-wrap gap-3">
              <Link className="bg-slate-800 px-4 py-2 rounded-lg text-cyan-400 hover:text-white transition" to="/laptop-repair-kuwait">Expert Laptop Repair & Maintenance Service in Kuwait</Link>
              <Link className="bg-slate-800 px-4 py-2 rounded-lg text-cyan-400 hover:text-white transition" to="/macbook-repair-kuwait">Professional MacBook Repair Service in Kuwait</Link>
              <Link className="bg-slate-900 px-4 py-2 rounded-lg text-cyan-400 hover:text-white transition" to="/data-recovery-kuwait">Secure Data Recovery Specialists Kuwait</Link>
            </div>
          </section>

          <h2 className="text-2xl font-bold text-white mt-16 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="How much does laptop repair cost in Kuwait?" a="Costs vary. We provide free diagnostics and a fixed quote before starting work." />
            <FAQItem q="Do you offer free pickup and delivery?" a="Yes, we provide free pickup and delivery across all Kuwait governorates." />
            <FAQItem q="How long does a typical laptop repair take?" a="Most repairs like screen or battery replacements are completed within 24–48 hours." />
          </div>

          <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900 p-8 rounded-3xl mt-16 border border-emerald-900/30 text-center">
            <h3 className="text-2xl font-black text-white mb-4">Need Fast Laptop Repair in Kuwait Today?</h3>
            <p className="text-emerald-300 font-semibold mb-6">🔥 Limited same-day pickup slots available in Kuwait today</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={WA_LINK} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 justify-center">
                <MessageCircle className="w-5 h-5" /> Book Free Pickup
              </a>
              <a href={`tel:${BUSINESS_PHONE}`} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 justify-center">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
