// File: src/components/Layout.tsx
import React, { ReactNode } from 'react';
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

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
      
      {/* 1. SEO Injection */}
      {schemaMarkup && (
        <Helmet>
          <script type="application/ld+json">
            {schemaMarkup}
          </script>
        </Helmet>
      )}
      
      {/* 2. Animated Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* 3. Global UI Elements */}
      <Header />
      <GMBRating />
      
      {/* 4. Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      
      {/* 5. Global Footer - Rendered ONCE here */}
      <Footer />
      
      {/* 6. Sticky CTA */}
      <StickyCTA /> 
    </div>
  );
}
