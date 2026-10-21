// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { StatsRow } from '../components/home/StatsRow';
import { BrandStrip } from '../components/home/BrandStrip';
import ServicesGrid from '../components/home/ServicesGrid';
import { PricingTable } from '../components/home/PricingTable';
import { Process } from '../components/home/Process';
import Reviews from '../components/home/Reviews';
import BehindBench from '../components/home/BehindBench';
import RepairProofCTA from '../components/home/RepairProofCTA';
import { LeadMagnet } from '../components/home/LeadMagnet';
import FAQSection from '../components/home/FAQSection';
import { ServiceAreas } from '../components/home/ServiceAreas';

export default function Home() {
  return (
    // ✅ FIXED: Changed bg-brand-dark to bg-transparent
    <div className="w-full min-h-screen bg-transparent">
      <SEOEngine entityId="page-home" />

      {/* 1. Hero — primary CTA, first impression */}
      <Hero />

      {/* 2. Immediate trust signals */}
      <TrustBar />

      {/* 3. Core service categories — make the fastest path from search intent to a repair page available before the interactive quote selector. */}
      <ServicesGrid />

      {/* 4. Low-friction quote path — visitors who prefer guided advice can choose a device and symptom here. */}
      <div className="kcroc-cwv-defer"><LeadMagnet /></div>

      {/* 5. Brand recognition — kept after service discovery so mobile users reach what we fix first */}
      <div className="kcroc-cwv-defer"><BrandStrip /></div>

      {/* 5. Hard numbers — compact trust reinforcement */}
      <div className="kcroc-cwv-defer"><StatsRow /></div>

      {/* 7. Transparent pricing, sourced from real service data — reduces booking friction */}
      <div className="kcroc-cwv-defer"><PricingTable /></div>

      {/* 8. How it works */}
      <div className="kcroc-cwv-defer"><Process /></div>

      {/* 9. Behind the bench — visual repair workflow */}
      <div className="kcroc-cwv-defer"><BehindBench /></div>

      {/* 10. Social proof */}
      <div className="kcroc-cwv-defer"><Reviews /></div>

      {/* 10b. Post-proof conversion step */}
      <div className="kcroc-cwv-defer"><RepairProofCTA /></div>

      {/* 11. Objection handling */}
      <div className="kcroc-cwv-defer"><FAQSection /></div>

      {/* 13. Coverage / local SEO confidence */}
      <div className="kcroc-cwv-defer"><ServiceAreas /></div>

      {/* 🚀 MOBILE CTA FIX: StickyMobileCTA (Call + WhatsApp bar) moved to
          RootLayout so it renders on every route — service pages, location
          pages, blog posts, pricing, etc. — not just the homepage. Most
          organic mobile traffic lands directly on a service/location page
          via Google, never the homepage, and previously had no persistent
          one-thumb-reach conversion path on those pages. See RootLayout.tsx. */}

      {/* Footer is managed globally by RootLayout.tsx. */}
    </div>
  );
}
