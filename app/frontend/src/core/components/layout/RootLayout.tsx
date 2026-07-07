// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Laptop, ChevronDown } from 'lucide-react';
import { Footer } from './Footer';
// ✅ Fixed: Added the extra '../' to correctly route out of core/components/layout/
import { KCROC_GRAPH } from '../../../data/graph';

export const RootLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Dynamic Data
  const business = KCROC_GRAPH.business;
  const services = KCROC_GRAPH.services;
  
  // Hardcoded resources remain for specific pages
  const RESOURCES = [
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* ─── MAIN NAVIGATION BAR ─── */}
      <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 text-white font-black text-2xl tracking-tight hover:opacity-90 transition-opacity">
            <Laptop className="w-6 h-6 text-cyan-400" />
            <span>KCROC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">Home</Link>
            
            <div className="relative group py-7">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-20 left-0 hidden group-hover:flex flex-col w-60 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl">
                {services.map((srv) => (
                  <Link key={srv.slug} to={`/services/${srv.slug}`} className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all">
                    {srv.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group py-7">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-20 left-0 hidden group-hover:flex flex-col w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl">
                {RESOURCES.map((item) => (
                  <Link key={item.path} to={item.path} className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:+${business?.telephone}`} 
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full transition-all text-sm"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      
      {/* ─── SINGLE FOOTER ─── */}
      <Footer />
    </div>
  );
};
