// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import { WhyUs } from '../components/home/WhyUs';
import { Process } from '../components/home/Process';
import { FAQ } from '../components/home/FAQ';
import { ChatWidget } from '../components/ChatWidget';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-950">
      <SEOEngine entityId="loc-hawalli" />
      
      {/* 1. Hero: Expert positioning */}
      <Hero />
      
      {/* 2. Service Grid: Problem-driven categories */}
      <ServicesGrid />
      
      {/* 3. WhyUs: Expanded local trust & expertise */}
      <WhyUs />
      
      {/* 4. Process: How it works */}
      <Process />
      
      {/* 5. FAQ: Dynamic content for SEO and objections */}
      <FAQ />
      
      <ChatWidget />
    </main>
  );
}
