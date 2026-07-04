// File: src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ChevronDown } from 'lucide-react';

import { ROUTES } from '../constants/routes';
import { IMAGES } from '../constants/images'; 
import MobileMenu from './layout/MobileMenu';
import GlobalSearch from './search/GlobalSearch'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 👇 FIX 1: Routing strictly to the Knowledge Graph dynamic slugs
  const services = [
    { name: 'All Services', path: ROUTES.SERVICES },
    { name: 'Laptop Repair', path: '/services/laptop-repair' },
    { name: 'MacBook Repair', path: '/services/macbook-repair-kuwait' },
    { name: 'Gaming PC Repair', path: '/services/gaming-pc-repair' },
    { name: 'Motherboard Repair', path: '/services/motherboard-repair' },
    { name: 'Screen Replacement', path: '/services/screen-replacement' },
    { name: 'Web Design Kuwait', path: '/web-design-kuwait' },
  ];

  // 👇 FIX 2: Hardcoded blog paths to prevent crashes if ROUTES keys were removed
  const blogs = [
    { name: 'Blog Hub', path: ROUTES.BLOG },
    { name: 'Laptop Repair Guide', path: '/blog/laptop-repair-kuwait-2026' },
    { name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' },
    { name: 'Gaming PC Cooling', path: '/blog/gaming-pc-cooling' },
    { name: 'Battery Replacement', path: '/blog/battery-replacement' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <img 
            src={IMAGES.brand.shopInterior.src} 
            alt={IMAGES.brand.shopInterior.alt}
            className="w-full h-full object-cover opacity-[0.07] mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/50 to-[#0a0f1c]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* 👇 FIX 3: Uppercase references mapping to our updated routes.ts */}
            <Link to={ROUTES.HOME} className="flex items-center group">
              <img 
                src={IMAGES.brand.logo.src} 
                alt={IMAGES.brand.logo.alt} 
                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:scale-105" 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <div className="relative group py-4">
                <Link 
                  to={ROUTES.SERVICES} 
                  className="flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  Services 
                  <ChevronDown size={14} className="transform group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-[#0a0f1c]/95 border border-slate-800 rounded-xl shadow-2xl p-2 mt-1 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {services.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400 rounded-lg transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to={ROUTES.PRICING} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Pricing</Link>
              <Link to={ROUTES.GALLERY} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Gallery</Link>
              <Link to={ROUTES.ABOUT} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">About</Link>

              <div className="relative group py-4">
                <Link 
                  to={ROUTES.BLOG} 
                  className="flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  Blog 
                  <ChevronDown size={14} className="transform group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-[#0a0f1c]/95 border border-slate-800 rounded-xl shadow-2xl p-2 mt-1 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {blogs.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400 rounded-lg transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to={ROUTES.FAQ} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">FAQ</Link>
              <Link to={ROUTES.CONTACT} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Contact</Link>
              
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="text-slate-200 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-slate-800/50 ml-2"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              <Link to={ROUTES.BOOKING} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.2)] ml-2">
                Book Repair
              </Link>
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={() => setIsSearchOpen(true)} className="text-slate-200 hover:text-cyan-400 p-2" aria-label="Open search">
                <Search size={24} />
              </button>
              <button className="text-white p-2" onClick={() => setIsOpen(true)} aria-label="Open menu">
                <Menu size={32} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      {/* 👇 FIX 4: Corrected the onClose scope bug so the mobile menu can close properly */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} services={services} blogs={blogs} />
    </>
  );
}
