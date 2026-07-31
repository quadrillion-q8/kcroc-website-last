// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { StatsRow } from '../components/home/StatsRow';
import { BrandStrip } from '../components/home/BrandStrip';
import ServicesGrid from '../components/home/ServicesGrid';
import { PricingTable } from '../components/home/PricingTable';
import { BeforeAfterShowcase } from '../components/home/BeforeAfterShowcase';
import { Process } from '../components/home/Process';
import Reviews from '../components/home/Reviews';
import { LeadMagnet } from '../components/home/LeadMagnet';
import FAQSection from '../components/home/FAQSection';
import { ServiceAreas } from '../components/home/ServiceAreas';
import { StickyMobileCTA } from '../components/home/StickyMobileCTA';
import { KCROC_GRAPH } from '../data/graph';

// ─── NEW: Lab Image Gallery Data ───
const HOME_GALLERY_IMAGES = [
  { src: '/images/home/kcroc-component-level-motherboard-repair-lab.webp.png', alt: 'KCROC ESD-Safe Component Level Motherboard Repair Lab' },
  { src: '/images/home/gaming-pc-gpu-repair-diagnostics.webp.webp', alt: 'Gaming PC and GPU Repair Diagnostics in Kuwait' },
  { src: '/images/home/macbook-logic-board-repair-kuwait.webp.webp', alt: 'MacBook Logic Board Micro-Soldering Repair' },
  { src: '/images/home/laptop-motherboard-chip-level-repair.webp.webp', alt: 'Laptop Motherboard Chip-Level Repair' },
  { src: '/images/home/computer-repair-diagnostic-process.webp.webp', alt: 'Computer Repair Diagnostic Process' },
  { src: '/images/home/motherboard-repair-before-after-case-study.webp.webp', alt: 'Motherboard Repair Before and After Case Study' },
  { src: '/images/home/professional-laptop-repair-service-kuwait.webp.webp', alt: 'Professional Laptop Repair Service in Kuwait' },
  { src: '/images/home/computer-repair-service-kuwait-city.webp.webp', alt: 'Computer Repair Service Serving Kuwait City' },
  { src: '/images/home/laptop-repair-success-restoration.webp.webp', alt: 'Successful Laptop Hardware Restoration' }
];

export default function Home() {
  // Ensure the page data is loaded
  const homePage = KCROC_GRAPH.pages?.find(p => p.id === 'page-home');
  if (!homePage) return null;

  return (
    <main className="w-full min-h-screen bg-transparent">
      <SEOEngine entityId="page-home" />
      
      {/* 1. Hero — primary CTA, first impression */}
      <Hero />
      
      {/* 2. Immediate trust signals */}
      <TrustBar />
      
      {/* 3. Brand recognition strip — "we know your device" */}
      <BrandStrip />
      
      {/* 4. Hard numbers */}
      <StatsRow />
      
      {/* 5. Core services */}
      <ServicesGrid />
      
      {/* 6. Case-study proof of component-level repair */}
      <BeforeAfterShowcase />

      {/* 🚀 NEW: Inside Our Lab Image Gallery */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Inside the KCROC Lab</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Take a look inside our Hawalli facility where we perform precision micro-soldering, thermal diagnostics, and "impossible" logic board restorations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {HOME_GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="aspect-square rounded-2xl overflow-hidden border border-slate-800 relative group shadow-lg"
              >
                {/* Subtle Cyan overlay that disappears on hover */}
                <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 7. Transparent pricing */}
      <PricingTable />
      
      {/* 8. How it works */}
      <Process />
      
      {/* 9. Social proof */}
      <Reviews />
      
      {/* 10. Low-commitment lead capture */}
      <LeadMagnet />
      
      {/* 11. Objection handling */}
      <FAQSection />
      
      {/* 12. Coverage / local SEO confidence */}
      <ServiceAreas />
      
      {/* 13. Persistent mobile conversion path */}
      <StickyMobileCTA />
    </main>
  );
}
