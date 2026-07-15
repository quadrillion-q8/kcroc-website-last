// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// ✅ Fixed: Removed curly brackets for default exports
import Header from './Header';
import Footer from './Footer';
import { AnimatedBackground } from './AnimatedBackground';

export const RootLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* The global background that sits behind all pages */}
      <AnimatedBackground />

      <Header />

      {/* Wrapper for all page content. Must remain transparent. */}
      <main className="relative z-10 flex-grow flex flex-col pt-16 bg-transparent">
        <Suspense fallback={
          <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};
