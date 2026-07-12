// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck, Laptop } from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';
import { trackConversion } from '../../analytics';
import DesktopMegaMenu from './DesktopMegaMenu';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Services', hasMega: true,  href: '/services' },
  { label: 'Pricing',  hasMega: false, href: '/pricing' },
  { label: 'Blog',     hasMega: false, href: '/blog' },
  { label: 'About',    hasMega: false, href: '/about' },
  { label: 'Contact',  hasMega: false, href: '/contact' },
];

export default function Header() {
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [panelLeft,  setPanelLeft]  = useState(0);

  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const mobileRef      = useRef<HTMLDivElement>(null);
  const closeTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location       = useLocation();

  const menuData     = NavigationBuilder.getMegaMenuServices();
  const phone        = KCROC_GRAPH.business?.telephone ?? '96555301913';
  const cleanTel     = phone.replace(/\D/g, '');

  const updatePanelPosition = useCallback(() => {
    if (servicesBtnRef.current) {
      const rect = servicesBtnRef.current.getBoundingClientRect();
      setPanelLeft(Math.round(rect.left + rect.width / 2));
    }
  }, []);

  const handleMegaEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    updatePanelPosition();
    setMegaOpen(true);
  }, [updatePanelPosition]);

  const handleMegaLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updatePanelPosition, { passive: true });
    return () => window.removeEventListener('resize', updatePanelPosition);
  }, [updatePanelPosition]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            <Link to="/" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
              <Laptop className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">
                KCROC<span className="text-cyan-400">.</span>
              </span>
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link =>
                link.hasMega ? (
                  <div key={link.label} className="relative" onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
                    <button
                      ref={servicesBtnRef}
                      aria-expanded={megaOpen}
                      aria-controls="mega-menu-panel"
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        megaOpen || location.pathname.startsWith('/services') ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={15} className={`transition-transform duration-200 ${megaOpen ? 'rotate-180 text-cyan-400' : ''}`} aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      location.pathname === link.href ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:+${cleanTel}`} onClick={() => trackConversion('phone_call_click', { cta_name: 'header_phone', button_position: 'header' })} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <Phone size={15} className="text-cyan-400" aria-hidden="true" />
                <span className="hidden xl:block">55301913</span>
              </a>
              
              <Link to="/booking" onClick={() => trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' })} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <CalendarCheck size={15} aria-hidden="true" />
                Book Online
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <DesktopMegaMenu 
        isOpen={megaOpen} 
        panelLeft={panelLeft} 
        featured={menuData.featured} 
        standardList={menuData.standardList} 
        onMouseEnter={handleMegaEnter} 
        onMouseLeave={handleMegaLeave} 
      />

      <MobileMenu 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        mobileRef={mobileRef} 
        navLinks={NAV_LINKS} 
        services={KCROC_GRAPH.services} 
        cleanTel={cleanTel} 
      />
    </>
  );
}
