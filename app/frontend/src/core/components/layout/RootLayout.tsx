// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Laptop, ChevronDown } from 'lucide-react';
import { Footer } from './Footer';

// Constants for contact
const PHONE_DISPLAY = '+965 5530 1913';
const PHONE_CLEAN = '96555301913';

// Navigation Data Registries
const SERVICES = [
  { name: 'Laptop Repair', path: '/laptop-repair-kuwait' },
  { name: 'MacBook Repair', path: '/macbook-repair-kuwait' },
  { name: 'Gaming PC Repair', path: '/gaming-pc-repair-kuwait' },
  { name: 'Screen Replacement', path: '/laptop-screen-repair-kuwait' },
  { name: 'Battery Replacement', path: '/battery-replacement' },
  { name: 'Motherboard Repair', path: '/motherboard-repair-kuwait' },
  { name: 'All Services', path: '/services' },
];

const RESOURCES = [
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Gallery', path: '/gallery' },
];

export const RootLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Automatically close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* ─── MAIN NAVIGATION BAR ─── */}
      <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 text-white font-black text-2xl tracking-tight hover:opacity-90 transition-opacity">
            <Laptop className="w-6 h-6 text-cyan-400" />
            <span>KCROC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative group py-7">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Services <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-20 left-0 hidden group-hover:flex flex-col w-60 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl">
                {SERVICES.map((item) => (
                  <Link key={item.path} to={item.path} className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/pricing" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">Pricing</Link>

            {/* Resources Dropdown */}
            <div className="relative group py-7">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Resources <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-20 left-0 hidden group-hover:flex flex-col w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl">
                {RESOURCES.map((item) => (
                  <Link key={item.path} to={item.path} className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">Contact</Link>
          </nav>

          {/* Call to Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${PHONE_CLEAN}`} 
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full transition-all text-sm shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ─── MOBILE NAVIGATION OVERLAY ─── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 px-6 py-8 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
            <nav className="flex flex-col gap-6">
              <Link to="/" className="text-lg font-bold text-white hover:text-cyan-400">Home</Link>
              
              {/* Mobile Services Group */}
              <div className="flex flex-col gap-4 border-l-2 border-slate-800 pl-4">
                <div className="text-xs font-black text-cyan-500 uppercase tracking-widest">Services</div>
                {SERVICES.map((item) => (
                  <Link key={item.path} to={item.path} className="text-slate-400 hover:text-white font-medium">
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link to="/pricing" className="text-lg font-bold text-white hover:text-cyan-400">Pricing</Link>
              
              {/* Mobile Resources Group */}
              <div className="flex flex-col gap-4 border-l-2 border-slate-800 pl-4">
                <div className="text-xs font-black text-cyan-500 uppercase tracking-widest">Resources</div>
                {RESOURCES.map((item) => (
                  <Link key={item.path} to={item.path} className="text-slate-400 hover:text-white font-medium">
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link to="/about" className="text-lg font-bold text-white hover:text-cyan-400">About</Link>
              <Link to="/contact" className="text-lg font-bold text-white hover:text-cyan-400">Contact</Link>

              <a 
                href={`tel:${PHONE_CLEAN}`} 
                className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-full mt-4"
              >
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      
      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
};
