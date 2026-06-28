// File: src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';

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

  const services = [
    { name: 'All Services', path: ROUTES.services },
    { name: 'Laptop Repair', path: ROUTES.laptopRepairHawalli },
    { name: 'MacBook Repair', path: ROUTES.macbookRepair },
    { name: 'Gaming PC Repair', path: ROUTES.gamingPC },
    { name: 'Screen Replacement', path: ROUTES.screenReplacement },
    { name: 'Motherboard Repair', path: ROUTES.motherboardRepair },
  ];

  const blogs = [
    { name: 'Laptop Repair Guide', path: "/blog/laptop-repair-kuwait-2026" },
    { name: 'Screen Protection', path: "/blog/how-to-protect-laptop-screen" },
    { name: 'Gaming PC Cooling', path: ROUTES.gamingPCCooling },
    { name: 'Battery Replacement', path: ROUTES.batteryReplacement },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg' : 'bg-transparent'}`}>
        {/* Shop Background Layer: Using Image Registry */}
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
            <Link to={ROUTES.home} className="flex items-center group">
              <img 
                src={IMAGES.brand.logo.src} 
                alt={IMAGES.brand.logo.alt} 
                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:scale-105" 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link to={ROUTES.services} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Services</Link>
              <Link to={ROUTES.pricing} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Pricing</Link>
              <Link to={ROUTES.gallery} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Gallery</Link>
              <Link to={ROUTES.about} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">About</Link>
              <Link to={ROUTES.blog} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Blog</Link>
              <Link to={ROUTES.faq} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">FAQ</Link>
              <Link to={ROUTES.contact} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Contact</Link>
              
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="text-slate-200 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-slate-800/50"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              <Link to={ROUTES.book} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
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
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} services={services} blogs={blogs} />
    </>
  );
}
