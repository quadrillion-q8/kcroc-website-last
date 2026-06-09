import React, { ReactNode } from 'react';
import Header from './Header';
// If you have a Footer component, keep this import:
// import Footer from './Footer'; 

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    // Changed from gray-950 to slate-950 for a richer, more premium background
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      
      {/* This wrapper ensures your content doesn't get hidden behind the fixed header. 
        It provides a smooth visual canvas for your pages.
      */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
      
      {/* If you have a Footer component, uncomment this: */}
      {/* <Footer /> */}
    </div>
  );
}
