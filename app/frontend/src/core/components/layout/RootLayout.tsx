// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AnimatedBackground } from './background/AnimatedBackground';

export const RootLayout: React.FC = () => {
  return (
    // 'flex flex-col' and 'min-h-screen' ensure the footer stays pinned to the bottom
    <div className="relative min-h-screen flex flex-col text-white font-sans selection:bg-brand-primary selection:text-white">
      
      {/* 1. Background Engine */}
      <AnimatedBackground variant="standard" />
      
      {/* 2. Header (Fixed position) */}
      <Header />
      
      {/* 3. Main Content: 'flex-grow' fills the space, 'pt-24' pushes content below the fixed header */}
      <main className="flex-grow pt-24 animate-fade-in-up">
        <Outlet /> 
      </main>
      
      {/* 4. Footer */}
      <footer className="w-full border-t border-brand-border py-8 text-center text-slate-500 text-sm bg-surface">
        &copy; {new Date().getFullYear()} KCROC. All rights reserved.
      </footer>
    </div>
  );
};
