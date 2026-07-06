// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import ServicesGrid from '../components/home/ServicesGrid';
import { Process } from '../components/home/Process';
import { ChatWidget } from '../components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1628]"> {/* Matches body background */}
      <SEOEngine entityId="page-home" />
      
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <Process />
      
      <ChatWidget />
    </main>
  );
}
