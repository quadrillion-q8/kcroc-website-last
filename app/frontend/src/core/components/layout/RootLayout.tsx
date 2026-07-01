// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AnimatedBackground } from './background/AnimatedBackground';

export const RootLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-brand-primary selection:text-white">
      {/* 1. The Orchestrated Background Engine */}
      <AnimatedBackground variant="standard" />
      
      {/* 2. The Global Header */}
      <Header />
      
      {/* 3. Page Content Injection (LocationTemplate, Services, etc. load here) */}
      <main className="pt-28 animate-fade-in-up">
        <Outlet /> 
      </main>
      
      {/* 4. The Global Footer */}
      <footer className="border-t border-brand-border py-8 text-center text-slate-500 text-sm bg-surface">
        &copy; {new Date().getFullYear()} KCROC. All rights reserved.
      </footer>
    </div>
  );
};
