// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { StatsRow } from '../components/home/StatsRow';
import ServicesGrid from '../components/home/ServicesGrid';
import { Process } from '../components/home/Process';
import FAQSection from '../components/home/FAQSection';
import Reviews from '../components/home/Reviews';
import { ServiceAreas } from '../components/home/ServiceAreas';
import { KCROC_GRAPH } from '../data/graph';

export default function Home() {
  // Ensure the page data is loaded
  const homePage = KCROC_GRAPH.pages?.find(p => p.id === 'page-home');

  if (!homePage) return null;

  return (
    <main className="w-full min-h-screen bg-slate-950">
      <SEOEngine entityId="page-home" />

      <Hero />
      <TrustBar />
      <StatsRow />
      <ServicesGrid />
      <Process />
      <FAQSection />
      <Reviews />
      <ServiceAreas />
      
      {/* Footer and ChatWidget removed from here as they are managed globally by RootLayout.tsx and App.tsx */}
    </main>
  );
}
