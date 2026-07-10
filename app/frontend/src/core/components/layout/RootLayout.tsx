// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// ✅ Cleanly import the newly perfected Header component
import Header from './Header';
import { Footer } from './Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* ─── NEW ENTERPRISE HEADER ─── */}
      {/* This automatically pulls in the Mega Menu, mobile accordions, and routing! */}
      <Header />

      {/* ─── MAIN CONTENT ─── */}
      {/* pt-16 added to offset the fixed Header height so content doesn't hide behind it */}
      <main className="flex-grow flex flex-col pt-16">
        <Suspense fallback={
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      
      {/* ─── SINGLE FOOTER ─── */}
      <Footer />
      
    </div>
  );
};

export default RootLayout;
