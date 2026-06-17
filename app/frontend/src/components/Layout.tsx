import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground'; 
import StickyCTA from './ui/StickyCTA'; // 1. Import the new component

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
      
      <Header />
      
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      
      <Footer />
      
      {/* 2. Added StickyCTA here so it persists across all pages */}
      <StickyCTA /> 
    </div>
  );
}
