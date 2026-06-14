import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
      
      {/* Global Abstract Tech Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-30 pointer-events-none z-0"></div>
      
      <Header />
      
      {/* z-10 ensures your page content sits above the background grid */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
