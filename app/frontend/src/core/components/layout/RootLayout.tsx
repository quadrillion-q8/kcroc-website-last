// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFAB } from '../ui/WhatsAppFAB';

interface RootLayoutProps {
  children?: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      <Header />

      <main className="flex-grow flex flex-col pt-16">
        <Suspense fallback={
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        }>
          {children || <Outlet />}
        </Suspense>
      </main>
      
      <Footer />
      <WhatsAppFAB />
      
    </div>
  );
};

export default RootLayout;
