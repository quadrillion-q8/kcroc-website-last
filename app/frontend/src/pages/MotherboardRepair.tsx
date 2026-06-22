import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, MapPin, ArrowRight, ChevronDown, 
  MessageCircle, Phone, HelpCircle, ShieldCheck, 
  Activity, Search, Wrench, AlertTriangle, ExternalLink 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { IMAGES } from '../constants/images'; // 👈 Local Image Dictionary
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// ... (Keep your FAQS, DIAGNOSTIC_TOOLS, BRAND_FAILURES, DECISION_MATRIX, and STRUCTURED_DATA constants as they were)

export default function MotherboardRepair() {
  const waMessage = encodeURIComponent("Hi KCROC, my laptop motherboard might be dead. Please arrange a free diagnostic & pickup.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <MetaSEO
        title="Motherboard Repair Kuwait | Chip-Level Fix | KCROC"
        description="Expert motherboard repair in Kuwait. We fix dead laptops via chip-level micro-soldering, power rail diagnostics, and liquid damage recovery. No Fix, No Charge."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* HERO SECTION WITH LOCAL IMAGE */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
            <Cpu size={16} /> Component-Level Engineering
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Motherboard Repair in <span className="text-cyan-400">Kuwait</span>
          </h1>
          
          {/* Featured Local Image */}
          <div className="my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <img 
              src={IMAGES.services.motherboardRepairHero} 
              alt="Professional motherboard micro-soldering repair at KCROC" 
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
            In most cases, motherboard failure is caused by a microscopic power rail short circuit. We use advanced chip-level micro-soldering to revive dead laptops.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black transition-all hover:scale-105">
              Book Free Diagnostic <ExternalLink size={20} />
            </a>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-3 bg-slate-900/60 border border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:border-cyan-500/30">
              <Phone size={20} className="text-cyan-400" /> Call Technician
            </a>
          </div>
        </div>
      </section>

      {/* ... (Keep your existing Article, FAQAccordion, and CTA sections here) */}
    </main>
  );
}
