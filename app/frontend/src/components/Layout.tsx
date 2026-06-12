import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <Header />
      
      {/* REMOVED pt-20 from here. 
        Individual pages (Home, Services, etc.) already use pt-32.
        This completely eliminates the massive double-padding gap on mobile.
      */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
