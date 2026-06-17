import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground'; 
import StickyCTA from './ui/StickyCTA';
import GMBRating from './layout/GMBRating'; 

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
      
      {/* The Animated Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Global Navigation */}
      <Header />
      
      {/* Global GMB Rating - Visible across all pages */}
      <GMBRating />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      
      {/* Global Footer */}
      <Footer />
      
      {/* Global Sticky Call-to-Action */}
      <StickyCTA /> 
    </div>
  );
}
