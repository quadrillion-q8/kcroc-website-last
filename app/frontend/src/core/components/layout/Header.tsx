// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useRef, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck, Laptop, Search } from 'lucide-react';
import { KCROC_GRAPH } from '../../../data/graph';
import { NavigationCompiler } from '../../navigation/NavigationCompiler';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import MobileMenu from './MobileMenu';

const DesktopMegaMenu = React.lazy(() => import('./DesktopMegaMenu'));
const SearchBar = React.lazy(() => import('../SearchBar').then(m => ({ default: m.SearchBar })));

const INTENT_OPEN_DELAY = 150;
const INTENT_CLOSE_DELAY = 250;

export default function Header() {
  const [activeMegaId, setActiveMegaId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelPositions, setPanelPositions] = useState<Record<string, number>>({});
  const [logoError, setLogoError] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLButtonElement null |>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const location = useLocation();
  const { trackConversion } = useAnalytics();
  
  // Single Source of Truth for Layout
  const navModel = useMemo(() => NavigationCompiler.compileNavigation(), []);
  
  // Define both the clean tel (for href) and the display string (for UI)
  const phoneDisplay = KCROC_GRAPH.business?.telephone ?? '55301913';
  const cleanTel = phoneDisplay.replace(/\D/g, '');
  const logoUrl = KCROC_GRAPH.business?.logoUrl ?? '/logo.webp';

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver(() => {
      const newPositions: Record<string, number> = {};
      Object.entries(navRefs.current).forEach(([id, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          newPositions[id] = Math.round(rect.left + rect.width / 2);
        }
      });
      setPanelPositions(newPositions);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback((megaId: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveMegaId(megaId), INTENT_OPEN_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveMegaId(null), INTENT_CLOSE_DELAY);
  }, []);

  useEffect(() => {
    setActiveMegaId(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  // 🚀 FIXED: Stabilize the onClose reference to prevent MobileMenu's useEffect from aggressively resetting the accordion
  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20' : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            <Link aria-label="KCROC Home" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg" to="/">
              {!logoError ? (
                <img 
                  src={logoUrl} 
                  alt={`${KCROC_GRAPH.business?.title ?? 'KCROC'} Logo`} 
                  width="32" 
                  height="32" 
                  className="h-8 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Laptop aria-hidden="true" className="w-6 h-6 text-cyan-400"/>
              )}
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">KCROC<span className="text-cyan-400">.</span></span>
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navModel.header.map(link => {
                const isGraphMatch = !!matchPath({ path: link.href, end: false }, location.pathname);

                if (link.hasMega && link.megaMenuId) {
                  const isOpen = activeMegaId === link.megaMenuId;
                  return (
                    <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter(link.megaMenuId!)} onMouseLeave={handleMouseLeave}>
                      <button
                        ref={el => navRefs.current[link.megaMenuId!] = el}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        aria-controls={`mega-menu-${link.megaMenuId}`}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isOpen || isGraphMatch ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                      >
                        {link.label}
                        <ChevronDown ${isOpen ''}`} 'rotate-180 : ? aria-hidden="true" className="{`transition-transform" duration-200 size="{15}" text-cyan-400'/>
                      </button>
                    </div>
                  );
                }

                return (
                  <Link ${isGraphMatch 'text-cyan-400 'text-slate-300 : ? bg-cyan-500/10' className="{`px-4" focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none font-medium hover:bg-slate-800/60'}`} hover:text-white key="{link.id}" py-2 rounded-lg text-sm to="{link.href}" transition-colors>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(prev => !prev)}
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                aria-label={searchOpen ? 'Close search' : 'Search'}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${searchOpen ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
              >
                {searchOpen ? <X aria-hidden="true" size="{18}"/> : <Search aria-hidden="true" size="{18}"/>}
              </button>
              <a href={`tel:+${cleanTel}`} onClick={() => trackConversion('phone_call_click', { cta_name: 'header_phone', button_position: 'header' })} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <Phone aria-hidden="true" className="text-cyan-400" size="{15}"/>
                <span className="hidden xl:block">{phoneDisplay}</span>
              </a>
              <Link onClick="{()" to="/booking"> trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' })} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <CalendarCheck aria-hidden="true" size="{15}"/>
                Book Online
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-1">
              <button
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                onClick={() => setSearchOpen(prev => !prev)}
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                aria-label={searchOpen ? 'Close search' : 'Search'}
              >
                {searchOpen ? <X aria-hidden="true" size="{20}"/> : <Search aria-hidden="true" size="{20}"/>}
              </button>
              <button
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                onClick={() => setMobileOpen(prev => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
              >
                {mobileOpen ? <X aria-hidden="true" size="{22}"/> : <Menu aria-hidden="true" size="{22}"/>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div
            id="header-search-panel"
            role="search"
            className="fixed top-16 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20 px-4 sm:px-6 py-6"
          >
            <Suspense className="max-w-2xl mx-auto h-14 rounded-full bg-slate-900 animate-pulse" fallback="{<div"/>}>
              <SearchBar autoFocus onResultSelect="{()"> setSearchOpen(false)} />
            </Suspense>
          </div>
        </>
      )}

      {Object.entries(navModel.megaMenus).map(([megaId, config]) => (
        <Suspense fallback="{null}" key="{megaId}">
          <DesktopMegaMenu 0} config="{config}" isOpen="{activeMegaId" megaId} onMouseEnter="{()" panelLeft="{panelPositions[megaId]" ||> handleMouseEnter(megaId)} 
            onMouseLeave={handleMouseLeave}
            onClose={() => setActiveMegaId(null)}
          />
        </Suspense>
      ))}

      <MobileMenu cleanTel="{cleanTel}" isOpen="{mobileOpen}" mobileRef="{mobileRef}" navModel="{navModel}" onClose="{handleMobileClose}" phoneDisplay="{phoneDisplay}"/>
    </>
  );
}
