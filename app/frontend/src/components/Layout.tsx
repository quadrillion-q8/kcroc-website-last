// File: src/components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground'; 
import StickyCTA from './ui/StickyCTA';
import GMBRating from './layout/GMBRating'; 
import { generateAutomatedSchema } from '../utils/schema/schemaBuilder';
import { KCROCEntity } from '../types/knowledgeGraph';

interface LayoutProps {
  children: ReactNode;
  entity?: KCROCEntity;
}

export default function Layout({ children, entity }: LayoutProps) {
  const schemaMarkup = entity ? generateAutomatedSchema(entity) : null;
  
  // 1. Set up a state to control when particles render
  const [showParticles, setShowParticles] = useState(false);

  // 2. Wait for the browser to be idle before showing particles
  useEffect(() => {
    const loadParticles = () => setShowParticles(true);

    // Use requestIdleCallback if the browser supports it, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadParticles, { timeout: 2000 });
    } else {
      setTimeout(loadParticles, 1500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
      
      {/* SEO Injection */}
      {schemaMarkup && (
        <Helmet>
          <script type="application/ld+json">
            {schemaMarkup}
          </script>
        </Helmet>
      )}
      
      {/* Animated Background - Now conditionally rendered! */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {showParticles && <ParticleBackground />}
      </div>
      
      {/* Global UI Elements */}
      <Header />
      <GMBRating />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      
      {/* Global Footer */}
      <Footer />
      
      {/* Sticky CTA */}
      <StickyCTA /> 
    </div>
  );
}
