import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Gauge, Thermometer, ExternalLink,
  Snowflake, Activity, ShieldCheck, Crosshair,
  MessageCircle, Phone, CheckCircle2 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { IMAGES } from '../constants/images'; // 👈 Local Image Dictionary
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// ... (Keep your existing SCENARIOS, BENCHMARKS, PROCESS_STEPS, FEATURES, SERVICE_CATEGORIES, and STRUCTURED_DATA constants here)

export default function GamingPC() {
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent("Hi KCROC, my gaming PC is experiencing issues. Please arrange a free diagnostic & pickup.")}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24 font-sans">
      <MetaSEO
        title="Gaming PC Repair in Kuwait | FPS & Thermal Tuning | KCROC"
        description="Stop stuttering and thermal throttling. Elite gaming PC repair, liquid cooling maintenance, and FPS tuning in Kuwait. No Fix, No Fee."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* HERO SECTION WITH LOCAL IMAGE */}
      <section className="relative px-6 text-center z-10 mb-24">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Eliminate FPS Drops & <span className="text-purple-400">Overheating</span>
        </h1>
        
        <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img 
            src={IMAGES.services.gamingPCRepairHero} 
            alt="Professional gaming PC repair and tuning at KCROC" 
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-medium">
          Stop losing to hardware bottlenecks. We provide elite performance tuning, custom cooling restoration, and advanced motherboard repair to keep your rig running icy and flawless.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black transition-all hover:scale-105 flex items-center gap-2">
            Fix My PC Now <ExternalLink size={20} />
          </a>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900/60 border border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:border-purple-500/30 flex items-center gap-2">
            <Phone size={20} className="text-purple-400" /> Call Technician
          </a>
        </div>
      </section>

      {/* ... (Keep your SCENARIOS, FEATURES, BENCHMARKS, PROCESS, and SERVICES sections here) */}
    </main>
  );
}
