// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// ✅ Cleanly import the new NavigationBuilder-powered Header
import { Header } from './Header';
import { Footer } from './Footer';

// The ChatWidget is usually mounted at the App level, 
// so we don't need a separate WhatsApp FAB here if you have one elsewhere,
// but we keep the main structure incredibly clean.
export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* ─── NEW ENTERPRISE HEADER ─── */}
      <Header />

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-grow flex flex-col">
        {/* We wrap the Outlet in Suspense to handle lazy-loaded routes from App.tsx cleanly */}
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

// Fallback default export just in case React Router looks for it
export default RootLayout;
