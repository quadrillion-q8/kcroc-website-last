// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { StatsRow } from '../components/home/StatsRow'; // New Component
import ServicesGrid from '../components/home/ServicesGrid';
import { Process } from '../components/home/Process';
import FAQSection from '../components/home/FAQSection';
import { ServiceAreas } from '../components/home/ServiceAreas'; // New Component
import { ChatWidget } from '../components/ChatWidget';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-950">
      <SEOEngine entityId="page-home" />

      <Hero />
      <TrustBar />
      <StatsRow />
      <ServicesGrid />
      <Process />
      <FAQSection />
      <ServiceAreas />
      
      <ChatWidget />
    </main>
  );
}
