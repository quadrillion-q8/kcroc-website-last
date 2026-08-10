// File: app/frontend/src/pages/Pricing.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, Truck, Clock, Laptop, Cpu, HardDrive, Keyboard,
  Search, MapPin, ArrowRight, ChevronDown, ShieldCheck, Thermometer,
  Wrench, Activity, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Centralized Data & SEO
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & CONSTANTS (2026 Premium Structure)
───────────────────────────────────────────────────────────────────────────── */

const pricingCategories = [
  {
    title: "Diagnostics & System Setup",
    icon: Search,
    items: [
      { name: "Diagnostic & Inspection", price: "5 KWD", desc: "Component-level trace & thermal imaging" },
      { name: "Windows OS Restoration", price: "10–15 KWD", desc: "Clean install with drivers & updates" },
      { name: "Virus & Malware Removal", price: "10–20 KWD", desc: "Deep system clean & security hardening" },
      { name: "BIOS/Firmware Recovery", price: "20–40 KWD", desc: "Direct IC reflashing & programmer recovery" }
    ]
  },
  {
    title: "Thermal & Performance Tuning",
    icon: Thermometer,
    items: [
      { name: "Laptop Thermal Service", price: "15–20 KWD", desc: "Deep cleaning & premium thermal re-paste" },
      { name: "Gaming PC Thermal Service", price: "20–30 KWD", desc: "Liquid metal / custom cooler maintenance" },
      { name: "Gaming PC Tuning", price: "20–40 KWD", desc: "FPS optimization & BIOS configuration" },
      { name: "RAM / SSD Installation", price: "5–10 KWD", desc: "Labor only. Data migration available." }
    ]
  },
  {
    title: "Hardware Replacements",
    icon: Laptop,
    items: [
      { name: "Battery Replacement", price: "8–15 KWD + Part", desc: "Includes safe swollen cell extraction" },
      { name: "Keyboard Replacement", price: "10–20 KWD + Part", desc: "Labor for top-case or riveted layouts" },
      { name: "Laptop Screen Replacement", price: "From 30 KWD + Part", desc: "LCD, IPS, OLED, and High-Refresh panels" },
      { name: "Hinge / Chassis Reconstruction", price: "15–30 KWD", desc: "Structural resin repair & tension tuning" }
    ]
  },
  {
    title: "Advanced Logic Board Repair",
    icon: Cpu,
    items: [
      { name: "Charging Port Repair", price: "20–35 KWD", desc: "DC Jack micro-soldering & reinforcement" },
      { name: "Motherboard Component Repair", price: "25–60 KWD", desc: "Standard MOSFET, IC & power rail fixes" },
      { name: "Advanced Motherboard Repair", price: "50–90+ KWD", desc: "Complex BGA rework & chipset recovery" },
      { name: "Liquid-Damage Repair", price: "35–90+ KWD", desc: "Ultrasonic cleaning & trace restoration" },
      { name: "MacBook Board-Level Repair", price: "45–100+ KWD", desc: "Data-safe Apple Silicon & Intel repairs" }
    ]
  }
];

const faqs = Object.freeze([
  { q: "Do you charge for diagnostics?", a: "We charge a nominal 5 KWD diagnostic and inspection fee to perform advanced component-level testing and thermal imaging. If you proceed with the repair, this fee is fully applied toward your final bill." },
  { q: "Why are some prices listed as 'Labor + Part'?", a: "Because parts vary dramatically by model. A generic laptop battery might be 15 KWD, while a genuine MacBook or high-end gaming battery could be much more. Separating labor ensures you only pay for the exact part your specific machine requires." },
  { q: "What if my device cannot be repaired?", a: "Under our No Fix, No Fee policy, if your device is catastrophically damaged and genuinely beyond economical repair, you pay nothing for the labor." },
  { q: "Do you provide pickup and delivery?", a: "Yes. We provide free, secure pickup and delivery across all Kuwait governorates for all repair services." },
  { q: "How long does a motherboard repair take?", a: "Most component-level motherboard and logic board repairs are completed within 24 to 48 hours, which includes extensive full-load stress testing before the device is returned to you." },
]);

const serviceLinks = Object.freeze([
  { title: 'MacBook Repair',    path: '/macbook-repair-kuwait',       icon: Laptop, desc: 'Logic board and USB-C IC replacement.' },
  { title: 'Motherboard Repair', path: '/motherboard-repair-kuwait',   icon: Cpu,    desc: 'Microsoldering and liquid damage recovery.' },
  { title: 'Gaming PC Repair',  path: '/gaming-pc-repair-kuwait',     icon: Activity, desc: 'GPU diagnostics and thermal tuning.' },
  { title: 'Screen Replacement', path: '/laptop-screen-repair-kuwait', icon: Laptop, desc: 'Same-day OLED, IPS & LCD panels.' },
]);

// 🚀 Dynamically generate the FAQ Schema for Google Rich Snippets
const PRICING_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a }
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${business.websiteUrl}/pricing` },
    ],
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const whatsappUrl = `https://wa.me/${business.telephone}?text=${encodeURIComponent("Hi KCROC, I'd like to book an inspection and get a quote for a repair.")}`;

  return (
    <main className="w-full min-h-screen bg-gray-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-24 pb-8 sm:pb-24">
      
      {/* 🚀 SEO Engine & Rich Snippets */}
      <SEOEngine entityId="page-pricing" />
      <SchemaMarkup schema={{ '@graph': PRICING_SCHEMA }} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 mt-4 sm:mt-0 relative z-10">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Service Pricing</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative px-4 sm:px-6 pb-12 sm:pb-16 text-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />
        <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6 text-[10px] sm:text-xs tracking-widest uppercase">
          Laboratory Standards
        </Badge>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">
          Professional Repair<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Transparent Pricing
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          We don't compete to be the cheapest shop in Ibn Khaldoun. We compete to be the laboratory that permanently fixes what others write off.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
          {['✓ Expert Diagnostics', '✓ Free Pickup & Delivery', '✓ 30-Day Warranty'].map(item => (
            <span key={item} className="flex items-center text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-full border border-cyan-900/50">{item}</span>
          ))}
        </div>
      </section>

      {/* ─── IMPORTANT DISCLAIMER ─── */}
      <section className="px-4 sm:px-6 mb-12 max-w-5xl mx-auto relative z-10">
        <div className="bg-cyan-950/20 border-l-4 border-cyan-500 p-6 sm:p-8 rounded-r-2xl shadow-lg shadow-cyan-900/10 flex flex-col sm:flex-row gap-5 items-start">
          <ShieldAlert className="w-8 h-8 text-cyan-400 flex-shrink-0" aria-hidden="true" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Important Note on Pricing</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-0">
              The prices below reflect our starting rates and labor costs. <strong className="text-white">Final price depends on laptop model, screen size, resolution, refresh rate, panel type, and part availability.</strong> We always provide a fixed, no-obligation quote after diagnosing your specific machine, before any repair begins.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRICING MENU ─── */}
      <section aria-labelledby="pricing-heading" className="px-4 sm:px-6 pb-16 sm:pb-24 max-w-5xl mx-auto relative z-10">
        <h2 id="pricing-heading" className="sr-only">Service Pricing Menu</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {pricingCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl">
                <CardHeader className="border-b border-slate-800/50 pb-5">
                  <CardTitle className="text-xl sm:text-2xl text-white flex items-center gap-3">
                    <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
                      <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="divide-y divide-slate-800/50">
                    {category.items.map((item) => (
                      <li key={item.name} className="py-4 flex justify-between items-center gap-4">
                        <div className="flex-1">
                          <div className="text-slate-100 font-bold text-sm sm:text-base mb-1">{item.name}</div>
                          <div className="text-slate-500 text-xs sm:text-sm leading-snug">{item.desc}</div>
                        </div>
                        <div className="text-cyan-400 font-black text-sm sm:text-base whitespace-nowrap text-right bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-900/50">
                          {item.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-6 px-10 text-base sm:text-lg rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all"
          >
            <a href={whatsappUrl}>Book an Inspection on WhatsApp</a>
          </Button>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section aria-labelledby="faq-heading" className="px-4 sm:px-6 py-12 sm:py-20 max-w-3xl mx-auto border-t border-slate-800/50">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 text-[10px] sm:text-xs tracking-widest uppercase">
            Questions Answered
          </Badge>
          <h2 id="faq-heading" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pricing FAQs
          </h2>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="border border-slate-800 rounded-2xl bg-slate-900/30 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 flex justify-between items-center text-left font-bold text-white hover:text-cyan-400 transition-colors text-sm sm:text-base"
                >
                  {faq.q}
                  <ChevronDown
                    className={`transition-transform duration-300 shrink-0 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`px-5 sm:px-6 text-slate-400 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                    isOpen ? 'pb-5 sm:pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── EXPLORE SERVICES (.scroll-row on mobile) ─── */}
      <section aria-labelledby="services-heading" className="px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto border-t border-slate-800/50">
        <h2 id="services-heading" className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4 text-center text-white tracking-tight">Specialist Services</h2>
        <p className="text-slate-400 text-sm sm:text-base text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          Learn more about our specific component-level repair capabilities.
        </p>
        <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {serviceLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="scroll-row-item w-[75%] sm:w-auto group bg-slate-900/30 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-cyan-500 transition-all hover:translate-y-[-4px] flex flex-col text-left"
            >
              <div className="bg-slate-950 border border-slate-800 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" aria-hidden="true" />
              </div>
              <span className="text-sm sm:text-base font-bold block mb-1.5 sm:mb-2 text-white">{link.title}</span>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed flex-grow">{link.desc}</p>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 mt-3 sm:mt-4 transition-colors" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
