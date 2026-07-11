// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Footer } from './Footer';

export const RootLayout: React.FC = () => {
  return (
    // ✅ Fixed: Removed overflow-x-hidden / overflow-x-clip. 
    // This was the containing block that was clipping all position: fixed descendants.
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      <Header />
      
      <main className="flex-grow flex flex-col pt-16">
        <Suspense fallback={
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      
      <Footer />
      
    </div>
  );
};

export default RootLayout;
