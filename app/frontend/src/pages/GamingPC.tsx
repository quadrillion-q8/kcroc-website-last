// File: app/frontend/src/pages/GamingPC.tsx
import React from 'react';
import { 
  Zap, Gauge, Thermometer, ExternalLink,
  Snowflake, Activity, ShieldCheck, Crosshair,
  MessageCircle, Phone, CheckCircle2 
} from 'lucide-react';

import { getEntityById } from '../utils/graphQueries';
import Layout from '../components/Layout';
import { ServiceEntity } from '../types/knowledgeGraph';

import { RelatedServicesList } from '../components/schema/RelatedServicesList';
import { FAQSection } from '../components/schema/FAQSection';
import { ReviewSection } from '../components/schema/ReviewSection';
import { getIntentWhatsAppLink } from '../utils/whatsappIntent';
import { IMAGES } from '../constants/images';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine'; 

// ... (Keep your existing SCENARIOS, BENCHMARKS, PROCESS_STEPS, FEATURES, and SERVICE_CATEGORIES constants here)

export default function GamingPC() {
  // 1. Fetch the data dynamically from the Knowledge Graph
  const entity = getEntityById<ServiceEntity>('srv-gaming-pc-repair');
  
  // Safety check: if entity is missing, return null
  if (!entity) return null;

  const waLink = getIntentWhatsAppLink("service", entity.title);
  const heroMedia = entity.media?.find(m => m.role === 'hero') || entity.media?.[0];

  return (
    <Layout entity={entity}>
      <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24 font-sans">
        
        {/* 🚀 PHASE 2 AUTOMATION IN ACTION */}
        <SEOEngine entityId="srv-gaming-pc-repair" />

        {/* HERO SECTION - Now fully driven by the Knowledge Graph */}
        <section className="relative px-6 text-center z-10 mb-24">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
            {entity.title}
          </h1>
          
          <div className="max-w-4xl mx-auto my-10 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
            {heroMedia && (
              <img 
                src={heroMedia.imageId} 
                alt={heroMedia.altText || entity.title}
                fetchPriority="high"
                className="w-full h-64 md:h-96 object-cover bg-slate-900" 
              />
            )}
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            {entity.description}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black transition-all hover:scale-105 flex items-center gap-2">
              Fix My PC Now <ExternalLink size={20} />
            </a>
            <a href="tel:+96555301913" className="bg-slate-900/60 border border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:border-purple-500/30 flex items-center gap-2">
              <Phone size={20} className="text-purple-400" /> Call Technician
            </a>
          </div>
        </section>

        {/* ... (Ensure your SCENARIOS, FEATURES, BENCHMARKS, PROCESS, and SERVICES sections follow below) */}

        {/* Dynamic Schema Components */}
        <div className="max-w-4xl mx-auto px-6 mt-24">
          <ReviewSection entity={entity} />
          <FAQSection entity={entity} />
          <RelatedServicesList currentEntityId={entity.id} />
        </div>

      </main>
    </Layout>
  );
}
