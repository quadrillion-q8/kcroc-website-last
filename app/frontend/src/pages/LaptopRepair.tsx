// File: app/frontend/src/pages/LaptopRepair.tsx
import React from 'react';
import { ShieldCheck, MessageCircle, Phone } from 'lucide-react';

import { getEntityById } from '../utils/graphQueries';
import Layout from '../components/Layout';
import { ServiceEntity } from '../types/knowledgeGraph';

// Corrected relative paths based on your GitHub folder structure
import { RelatedServicesList } from '../components/schema/RelatedServicesList';
import { FAQSection } from '../components/schema/FAQSection';
import { ReviewSection } from '../components/schema/ReviewSection';
import { getIntentWhatsAppLink } from '../utils/whatsappIntent';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine'; 

export default function LaptopRepair() {
  // 1. Fetch the data dynamically from the Knowledge Graph
  const entity = getEntityById<ServiceEntity>('srv-laptop-repair');
  
  // Safety check: if entity is missing, return null
  if (!entity) return null;

  const waLink = getIntentWhatsAppLink("service", entity.title);
  const heroMedia = entity.media?.find(m => m.role === 'hero') || entity.media?.[0];

  return (
    <Layout entity={entity}>
      <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
        
        {/* 🚀 PHASE 2 AUTOMATION IN ACTION */}
        <SEOEngine entityId="srv-laptop-repair" />
        
        {/* HERO SECTION */}
        <section className="relative px-6 text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
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
          <div className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {entity.description}
          </div>
        </section>

        {/* Dynamic Schema Components */}
        <div className="max-w-4xl mx-auto px-6">
          <ReviewSection entity={entity} />
          <FAQSection entity={entity} />
          <RelatedServicesList currentEntityId={entity.id} />
        </div>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 mt-16 text-center bg-gradient-to-br from-cyan-900/40 to-slate-900/80 p-10 rounded-3xl border border-cyan-500/30">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">Is Your Laptop Failing?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105">
              <MessageCircle size={18} /> Request Free Pickup
            </a>
            <a href="tel:+96555301913" className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2">
              <Phone size={18} /> Call Technician
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
