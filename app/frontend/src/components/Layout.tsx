import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer'; // Restored the Footer import

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <Header />
      
      {/* Added pt-20 to ensure content isn't hidden under the floating glass header */}
      <main className="flex-grow flex flex-col pt-20">
        {children}
      </main>
      
      {/* Restored the Footer component */}
      <Footer />
    </div>
  );
}
