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

export default function Home() {
  // Ensure the page data is loaded
  const homePage = KCROC_GRAPH.pages?.find(p => p.id === 'page-home');
  if (!homePage) return null;

  return (
    <main className="w-full min-h-screen bg-slate-950">
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

      {/* 6. Case-study proof of component-level repair (the core differentiator) */}
      <BeforeAfterShowcase />

      {/* 7. Transparent pricing, sourced from real service data — reduces booking friction */}
      <PricingTable />

      {/* 8. How it works */}
      <Process />

      {/* 9. Social proof */}
      <Reviews />

      {/* 10. Low-commitment lead capture for visitors not ready to book */}
      <LeadMagnet />

      {/* 11. Objection handling */}
      <FAQSection />

      {/* 12. Coverage / local SEO confidence */}
      <ServiceAreas />

      {/* 13. Persistent mobile conversion path */}
      <StickyMobileCTA />

      {/* Footer and ChatWidget removed from here as they are managed globally by RootLayout.tsx and App.tsx */}
    </main>
  );
}
