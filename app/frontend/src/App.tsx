// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Phone, X } from 'lucide-react';

// --- INTEGRATED NAVIGATION HEADER ---
const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesLinks = [
    { name: 'All Services', path: '/services' },
    { name: 'Laptop Repair', path: '/laptop-repair-hawalli' },
    { name: 'MacBook Repair', path: '/macbook-repair' },
    { name: 'Gaming PC Repair', path: '/gaming-pc-repair' },
    { name: 'Screen Replacement', path: '/screen-replacement' },
    { name: 'Motherboard Repair', path: '/motherboard-repair' },
    { name: 'Web Design Kuwait', path: '/web-design-kuwait' },
  ];

  const blogLinks = [
    { name: 'Blog Hub', path: '/blog' },
    { name: 'Laptop Repair Guide', path: '/blog/laptop-repair-kuwait-2026' },
    { name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' },
    { name: 'Gaming PC Cooling', path: '/gaming-pc-cooling' },
    { name: 'Battery Replacement', path: '/battery-replacement' },
  ];

  return (
    <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-slate-800 shadow-lg' : 'bg-[#0a0f1c] lg:bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-400">KCROC</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative group py-6">
              <Link to="/services" className="flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                Services <ChevronDown size={14} className="transform group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-[#0a0f1c] border border-slate-800 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {servicesLinks.map((item) => (
                  <Link key={item.path} to={item.path} className="block px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400 rounded-lg transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog Dropdown */}
            <div className="relative group py-6">
              <Link to="/blog" className="flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                Blog <ChevronDown size={14} className="transform group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-[#0a0f1c] border border-slate-800 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {blogLinks.map((item) => (
                  <Link key={item.path} to={item.path} className="block px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400 rounded-lg transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/pricing" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link to="/gallery" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Gallery</Link>
            <Link to="/contact" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Contact</Link>
            
            {/* PHONE CALL BUTTON */}
            <a href="tel:+96555301913" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.2)] ml-4">
              <Phone size={16} /> +965 5530 1913
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0f1c] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link to="/" className="block px-4 py-3 text-white font-bold hover:bg-slate-800 rounded-lg">Home</Link>
          <div className="px-4 py-2">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 block">Services</span>
            {servicesLinks.map(link => (
              <Link key={link.path} to={link.path} className="block py-2 text-slate-300 hover:text-white pl-2 border-l border-slate-800">{link.name}</Link>
            ))}
          </div>
          <div className="px-4 py-2">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 block">Articles</span>
            {blogLinks.map(link => (
              <Link key={link.path} to={link.path} className="block py-2 text-slate-300 hover:text-white pl-2 border-l border-slate-800">{link.name}</Link>
            ))}
          </div>
          <Link to="/pricing" className="block px-4 py-3 text-white font-bold hover:bg-slate-800 rounded-lg">Pricing</Link>
          <Link to="/contact" className="block px-4 py-3 text-white font-bold hover:bg-slate-800 rounded-lg">Contact</Link>
          <a href="tel:+96555301913" className="mt-4 flex items-center justify-center gap-2 bg-cyan-500 text-slate-950 px-5 py-3 rounded-xl text-sm font-black w-full">
            <Phone size={18} /> Call +965 5530 1913
          </a>
        </div>
      )}
    </header>
  );
};

// --- MAIN LAYOUT WRAPPER ---
export const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1c] font-sans">
      {/* 1. Renders the unified header across all pages */}
      <MainNavigation />
      
      {/* 2. Renders the actual page content (Home, About, etc.) */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* 3. Simple Default Footer to maintain layout integrity */}
      <footer className="border-t border-slate-800/50 bg-[#060913] py-8 text-center">
        <p className="text-slate-500 text-sm">© 2026 KCROC Enterprise. All rights reserved.</p>
      </footer>
    </div>
  );
};
