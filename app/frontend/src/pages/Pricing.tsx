// File: app/frontend/src/pages/Pricing.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, Truck, Clock, Laptop, Cpu, HardDrive, Keyboard,
  Search, MapPin, ArrowRight, ChevronDown,
  BadgeCheck, CheckCircle, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Centralized Data & SEO
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const pricingPlans = Object.freeze([
  { name: 'Basic Diagnostics',   priceLabel: 'Free',         features: ['System Check', 'Issue Identification', 'Free Quote', 'No Obligation'],                 icon: Search,    hasPrice: false },
  { name: 'Laptop Repair',       priceLabel: 'From 15 KWD',  features: ['Hardware Repair', 'Component Testing', '30-Day Warranty', 'Performance Optimization'],      icon: Laptop,    hasPrice: true },
  { name: 'MacBook Repair',      priceLabel: 'From 25 KWD',  features: ['Logic Board Repair', 'Battery Replacement', 'Screen Repair', 'Thermal Service'],              icon: Laptop,    hasPrice: true },
  { name: 'Gaming PC Repair',    priceLabel: 'From 25 KWD',  features: ['GPU Diagnostics', 'Cooling System Repair', 'FPS Optimization', 'Hardware Upgrade'],          icon: Cpu,       hasPrice: true },
  { name: 'SSD Upgrade',         priceLabel: 'From 18 KWD',  features: ['SSD Installation', 'Windows Migration', 'Faster Boot', 'Data Safety'],                      icon: HardDrive, hasPrice: true },
  { name: 'Keyboard Replacement', priceLabel: 'From 15 KWD', features: ['Genuine Parts', 'Fast Service', 'All Brands', 'Warranty'],                                 icon: Keyboard,  hasPrice: true },
  { name: 'Motherboard Repair',  priceLabel: 'From 25 KWD',  features: ['Board Level Repair', 'IC Replacement', 'Microsoldering', 'Advanced Diagnostics'],          icon: Cpu,       hasPrice: true },
]);

const trustItems = Object.freeze([
  { text: 'Free Pickup & Delivery', icon: Truck },
  { text: '30-Day Warranty',        icon: Clock },
  { text: 'Genuine Parts',          icon: ShieldCheck },
  { text: 'Experienced Techs',      icon: Check },
  { text: 'No Hidden Charges',      icon: BadgeCheck },
  { text: 'Fast Turnaround',        icon: CheckCircle },
]);

const locations = Object.freeze([
  'Kuwait City', 'Salmiya', 'Hawalli', 'Farwaniya', 'Fahaheel',
  'Mangaf', 'Mahboula', 'Abu Halifa', 'Khaitan', 'Jahra',
  'Sabah Al Salem', 'Egaila',
]);

const faqs = Object.freeze([
  { q: "Do you charge for diagnostics?",          a: "No. Diagnostics are completely free." },
  { q: "Do you provide pickup and delivery?",     a: "Yes. We provide free pickup and delivery across Kuwait." },
  { q: "What if my device cannot be repaired?",   a: "You pay nothing. Our No Fix No Fee policy means there is no repair charge if we cannot fix your device." },
  { q: "How long does repair take?",              a: "Most repairs are completed within 24 to 48 hours depending on parts availability and repair complexity." },
  { q: "Do you repair MacBooks and Gaming PCs?",  a: "Yes. We repair MacBooks, Gaming PCs, laptops, desktop computers and perform motherboard level repairs." },
]);

const serviceLinks = Object.freeze([
  { title: 'Laptop Repair',     path: '/laptop-repair-kuwait',        icon: Laptop, desc: 'Screen, keyboard, and battery repair.' },
  { title: 'MacBook Repair',    path: '/macbook-repair-kuwait',       icon: Laptop, desc: 'Logic board, display, and thermal service.' },
  { title: 'Motherboard Repair', path: '/motherboard-repair-kuwait',   icon: Cpu,    desc: 'Microsoldering and IC replacement.' },
  { title: 'Gaming PC Repair',  path: '/gaming-pc-repair-kuwait',     icon: Cpu,    desc: 'GPU diagnostics and FPS optimization.' },
]);

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const whatsappUrl = `https://wa.me/${business.telephone}?text=${encodeURIComponent("Hi KCROC, I need laptop repair. Please arrange free pickup.")}`;

  return (
    <main className="w-full min-h-screen bg-gray-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-24 pb-8 sm:pb-24">
      
      {/* 🚀 SEO Engine */}
      <SEOEngine entityId="page-pricing" />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 mt-4 sm:mt-0 relative z-10">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Pricing</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative px-4 sm:px-6 pb-12 sm:pb-20 text-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />
        <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6 text-[10px] sm:text-xs tracking-widest uppercase">
          Transparent Pricing
        </Badge>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">
          Laptop & Computer Repair<br />
          <span className="text-cyan-400">Prices in Kuwait</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Fixed quotes before we start. No hidden charges. You only pay if we fix it.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
          {['✓ Free Diagnosis', '✓ Free Pickup & Delivery', '✓ No Fix No Fee'].map(item => (
            <span key={item} className="flex items-center text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-full border border-cyan-900/50">{item}</span>
          ))}
        </div>
      </section>

      {/* ─── PRICING GRID (.scroll-row on mobile) ─── */}
      <section aria-labelledby="pricing-heading" className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto relative z-10">
        <h2 id="pricing-heading" className="sr-only">Service Pricing</h2>
        <div className="scroll-row gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="scroll-row-item w-[85%] sm:w-auto group bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col text-left"
              >
                <div className="bg-slate-950 border border-slate-800 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-3xl sm:text-4xl font-black text-white mb-5 sm:mb-6 tracking-tight">{plan.priceLabel}</div>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start text-slate-400 text-xs sm:text-sm">
                      <Check className="w-4 h-4 mr-2.5 text-cyan-500 shrink-0 mt-0.5" aria-hidden="true" /> 
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-5 sm:py-6 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all"
                >
                  <a href={whatsappUrl}>Get Free Quote</a>
                </Button>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-3 sm:mt-4 text-center font-medium">
                  Starting price. Final quote depends on model.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TRUST SECTION (.scroll-row on mobile) ─── */}
      <section aria-labelledby="trust-heading" className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto border-t border-slate-800/50">
        <h2 id="trust-heading" className="sr-only">Why Choose KCROC</h2>
        <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="scroll-row-item w-[40%] sm:w-auto bg-slate-900/30 border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center hover:border-cyan-500/30 transition-all"
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 mb-2 sm:mb-3" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-300 leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COVERAGE SECTION ─── */}
      <section aria-labelledby="coverage-heading" className="px-4 sm:px-6 py-12 sm:py-16 text-center bg-slate-900/20 border-y border-slate-800/50">
        <h2 id="coverage-heading" className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4 text-white">
          Free Pickup & Delivery Across Kuwait
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
          We provide free pickup and delivery services for laptops, computers, MacBooks and gaming PCs across Kuwait including Kuwait City, Salmiya, Hawalli, Farwaniya, Fahaheel, Mangaf, Mahboula and surrounding areas.
        </p>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3">
          {locations.map((loc) => (
            <span
              key={loc}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-700 hover:border-cyan-500 text-[11px] sm:text-sm text-slate-300 hover:text-cyan-400 transition-all cursor-default bg-slate-900/50"
            >
              <MapPin className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-cyan-500/70" aria-hidden="true" /> {loc}
            </span>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section aria-labelledby="faq-heading" className="px-4 sm:px-6 py-12 sm:py-20 max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 text-[10px] sm:text-xs tracking-widest uppercase">
            Questions Answered
          </Badge>
          <h2 id="faq-heading" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
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
        <h2 id="services-heading" className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4 text-center text-white tracking-tight">Explore Our Services</h2>
        <p className="text-slate-400 text-sm sm:text-base text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          Professional repair services for laptops, MacBooks, gaming PCs, motherboards and storage devices.
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

      {/* ─── DISCLAIMER ─── */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-3xl mx-auto text-center">
        <div className="bg-slate-900/20 border border-slate-800 p-5 sm:p-6 rounded-2xl">
          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium">
            Prices shown are starting estimates. Final repair cost depends on exact device model, specific parts availability, and total repair complexity. A fixed, no-obligation quote is always provided before any repair begins.
          </p>
        </div>
      </section>
    </main>
  );
}
