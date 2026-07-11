// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Laptop } from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { label: 'Services', hasMega: true,  href: '/services' },
  { label: 'Pricing',  hasMega: false, href: '/pricing' },
  { label: 'Blog',     hasMega: false, href: '/blog' },
  { label: 'About',    hasMega: false, href: '/about' },
  { label: 'Contact',  hasMega: false, href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  /* ── STRICT DATA ORCHESTRATION WITH FALLBACKS ── */
  const menuData = NavigationBuilder.getMegaMenuServices() || { featured: [], standardList: [] };
  const featured = menuData.featured || [];
  const standardList = menuData.standardList || [];
  
  const phone = KCROC_GRAPH.business?.telephone || '96555301913';
  const cleanTel = phone.replace(/\D/g, '');

  /* ── GLOBAL STATE ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || mobileOpen
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
              <Laptop className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">
                KCROC<span className="text-cyan-400">.</span>
              </span>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 h-16">
              {NAV_LINKS?.map(link =>
                link.hasMega ? (
                  <DesktopMegaMenu 
                    key={link.label} 
                    label={link.label} 
                    featured={featured} 
                    standardList={standardList} 
                  />
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      location.pathname === link.href
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:+${cleanTel}`} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-2 py-1">
                <Phone size={15} className="text-cyan-400" aria-hidden="true" />
                <span className="hidden xl:block">55301913</span>
              </a>
              <a href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <MessageCircle size={15} aria-hidden="true" /> 
                Book Pickup
              </a>
            </div>

            {/* ── HAMBURGER ── */}
            <button
              ref={hamburgerBtnRef}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>

          </div>
        </div>
      </header>

      {/* ── ISOLATED MOBILE MENU SYSTEM ── */}
      <MobileMenu 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        returnFocusRef={hamburgerBtnRef}
        navLinks={NAV_LINKS}
        featuredServices={featured}
        standardServices={standardList}
        cleanTel={cleanTel}
      />
    </>
  );
}
