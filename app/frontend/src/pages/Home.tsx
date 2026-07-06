// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import { WhyUs } from '../components/home/WhyUs';
import { Process } from '../components/home/Process';
import FAQSection from '../components/home/FAQSection';
import { ChatWidget } from '../components/ChatWidget';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-950">
      {/* 🚀 SEO Engine now links directly to the WebPage Entity */}
      <SEOEngine entityId="page-home" />

      {/* Dynamic Content Layers mapping directly from the Graph */}
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <FAQSection />
      
      {/* Global Conversions */}
      <ChatWidget />
    </main>
  );
}
