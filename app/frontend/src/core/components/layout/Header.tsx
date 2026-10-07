// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck, Laptop, Search } from 'lucide-react';
import { NAV_GRAPH } from '../../../data/navGraph.generated';
import { COMPILED_NAVIGATION, getLocalizedNavigation } from '../../navigation/NavigationCompiler';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import { getLanguageSwitchPath } from '../../../utils/locale';

const DesktopMegaMenu = React.lazy(() => import('./DesktopMegaMenu'));
const SearchBar = React.lazy(() => import('../SearchBar').then(m => ({ default: m.SearchBar })));

const INTENT_OPEN_DELAY = 220;
const INTENT_CLOSE_DELAY = 250;

export default function Header() {
  const [activeMegaId, setActiveMegaId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelPositions, setPanelPositions] = useState<Record<string, number>>({});
  const [logoError, setLogoError] = useState(false);

  // 🚀 PERF FIX: DesktopMegaMenu was rendered unconditionally below (inside
  // Suspense, keyed per megaMenuId) so React attempted it on first mount
  // regardless of isOpen — triggering its lazy chunk download on EVERY page
  // load, including mobile, where the desktop nav (and therefore the mega
  // menu) is never even reachable (`hidden xl:flex`). Gate the whole block
  // behind an actual desktop viewport check so mobile visitors never fetch
  // this chunk at all, and desktop visitors only fetch it once mounted
  // post-render instead of blocking the initial critical path.
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  
  const location = useLocation();
  const { trackConversion } = useAnalytics();
  
  const navModel = getLocalizedNavigation(location.pathname);
  const languageSwitch = getLanguageSwitchPath(location.pathname);
  
  const phoneDisplay = NAV_GRAPH.business!.telephone;
  const cleanTel = phoneDisplay.replace(/\D/g, '');
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
    setSearchOpen(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveMegaId(megaId), INTENT_OPEN_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveMegaId(null), INTENT_CLOSE_DELAY);
  }, []);

  const handleMegaTriggerKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, megaId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      setActiveMegaId(prev => prev === megaId ? null : megaId);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      setActiveMegaId(megaId);
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`#mega-menu-${megaId} a[href], #mega-menu-${megaId} button:not([disabled])`)?.focus();
      });
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      setActiveMegaId(null);
    }
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
    const mq = window.matchMedia('(min-width: 1280px)');
    setIsDesktopViewport(mq.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktopViewport(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
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

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
    // MobileMenu is unmounted on close, so return focus here rather than
    // relying on the menu's unmount cleanup.
    requestAnimationFrame(() => mobileToggleRef.current?.focus());
  }, []);

  return (
    <>
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#090c0f]/[0.97] backdrop-blur-xl border-b border-white/[0.10] shadow-[0_12px_36px_rgba(0,0,0,.22)]' : 'bg-[#090c0f]/[0.88] backdrop-blur-md border-b border-white/[0.08]'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-[78px]">
            
            <Link to="/" className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] rounded-lg" aria-label="KCROC Home">
              {!logoError ? (
                <img
                  src="/logo-128.webp"
                  srcSet="/logo-128.webp 128w, /logo-256.webp 256w"
                  sizes="72px"
                  alt="KCROC — Kuwait Computer Repair On Call"
                  width="72"
                  height="72"
                  decoding="async"
                  fetchPriority="high"
                  className="h-[72px] w-[72px] object-contain brightness-[1.08] saturate-[1.04] drop-shadow-[0_10px_22px_rgba(201,128,77,0.22)]"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="flex items-center gap-2" aria-hidden="true">
                  <Laptop className="w-6 h-6 text-[#dfa86f]" />
                  <span className="font-black text-white text-[21px] tracking-[-0.04em]">KCROC<span className="text-[#dfa86f]">.</span></span>
                </span>
              )}
            </Link>

            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1">
              {navModel.header.map(link => {
                const isGraphMatch = !!matchPath({ path: link.href, end: false }, location.pathname);

                if (link.hasMega && link.megaMenuId) {
                  const isOpen = activeMegaId === link.megaMenuId;
                  return (
                    <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter(link.megaMenuId!)} onMouseLeave={handleMouseLeave}>
                      <button
                        ref={el => navRefs.current[link.megaMenuId!] = el}
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls={`mega-menu-${link.megaMenuId}`}
                        onClick={() => {
                          if (timerRef.current) clearTimeout(timerRef.current);
                          setSearchOpen(false);
                          setActiveMegaId(prev => prev === link.megaMenuId ? null : link.megaMenuId!);
                        }}
                        onKeyDown={e => handleMegaTriggerKeyDown(e, link.megaMenuId!)}
                        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md whitespace-nowrap text-[12px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${isOpen || isGraphMatch ? 'text-[#efc19c] border-b border-[#c9804d]/70' : 'text-slate-300 hover:text-white'}`}
                      >
                        {link.label}
                        <ChevronDown size={15} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#dfa86f]' : ''}`} aria-hidden="true" />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link key={link.id} to={link.href} className={`px-2.5 py-2 rounded-md text-[12px] font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${isGraphMatch ? 'text-[#efc19c] border-b border-[#c9804d]/70' : 'text-slate-300 hover:text-white'}`}>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden xl:flex items-center gap-2.5">
              <Link
                to={languageSwitch.href}
                lang={languageSwitch.targetLanguage === 'ar' ? 'ar' : 'en'}
                aria-label={languageSwitch.targetLanguage === 'ar' ? 'Switch to Arabic' : 'Switch to English'}
                className="rounded-md border border-white/[0.08] bg-transparent px-2.5 py-1.5 text-xs font-black text-slate-200 transition-all hover:border-[#c9804d]/[0.45] hover:text-[#efc19c] hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
              >
                {languageSwitch.targetLanguage === 'ar' ? 'عربي' : 'EN'}
              </Link>
              <button
                onClick={() => {
                  setActiveMegaId(null);
                  setMobileOpen(false);
                  setSearchOpen(prev => !prev);
                }}
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                aria-label={searchOpen ? 'Close search' : 'Search'}
                className={`p-2 rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${searchOpen ? 'text-[#dfa86f] bg-[#c9804d]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                {searchOpen ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
              </button>
              <a href={`tel:+${cleanTel}`} onClick={() => trackConversion('phone_call_click', { cta_name: 'header_phone', button_position: 'header' })} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <Phone size={15} className="text-[#dfa86f]" aria-hidden="true" />
                <span className="hidden 2xl:block">{phoneDisplay}</span>
              </a>
              <Button
                asChild
                variant="ctaPrimary"
                className="h-auto gap-2 rounded-md px-4 py-2 text-sm transition-all hover:shadow-[0_12px_28px_rgba(201,128,77,0.15)]"
              >
                <Link to="/book" onClick={() => trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' })}>
                  <CalendarCheck size={15} aria-hidden="true" />
                  Book Free Pickup
                </Link>
              </Button>
            </div>

            <div className="xl:hidden flex items-center gap-1">
              <Link
                to={languageSwitch.href}
                lang={languageSwitch.targetLanguage === 'ar' ? 'ar' : 'en'}
                aria-label={languageSwitch.targetLanguage === 'ar' ? 'Switch to Arabic' : 'Switch to English'}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-lg border border-white/[0.10] text-xs font-black text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-[#efc19c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
              >
                {languageSwitch.targetLanguage === 'ar' ? 'عربي' : 'EN'}
              </Link>
              <button
                ref={searchToggleRef}
                // 🚀 TOUCH TARGET FIX: p-2 + a 20px icon was a ~36px hit area,
                // under the 44×44px minimum. min-h/min-w-11 (44px) with a
                // centered icon fixes this without changing the visual icon size.
                className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                onClick={() => {
                  setActiveMegaId(null);
                  setMobileOpen(false);
                  setSearchOpen(prev => !prev);
                }}
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                aria-label={searchOpen ? 'Close search' : 'Search'}
              >
                {searchOpen ? <X size={20} aria-hidden="true" /> : <Search size={20} aria-hidden="true" />}
              </button>
              <button
                ref={mobileToggleRef}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                onClick={() => {
                  setActiveMegaId(null);
                  setSearchOpen(false);
                  setMobileOpen(prev => !prev);
                }}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div
            id="header-search-panel"
            role="search"
            className="fixed top-16 left-0 right-0 z-50 bg-[#090c0f]/[0.97] backdrop-blur-xl border-b border-white/[0.10] shadow-[0_12px_36px_rgba(0,0,0,.22)] px-4 sm:px-6 py-6"
          >
            <Suspense fallback={<div className="max-w-2xl mx-auto h-14 rounded-full bg-slate-900 animate-pulse" />}>
              <SearchBar autoFocus onResultSelect={() => setSearchOpen(false)} />
            </Suspense>
          </div>
        </>
      )}

      {isDesktopViewport && activeMegaId && navModel.megaMenus[activeMegaId] && (
        <Suspense fallback={null}>
          <DesktopMegaMenu
            isOpen
            panelLeft={panelPositions[activeMegaId] || 0}
            config={navModel.megaMenus[activeMegaId]}
            onMouseEnter={() => handleMouseEnter(activeMegaId)}
            onMouseLeave={handleMouseLeave}
            onClose={() => setActiveMegaId(null)}
          />
        </Suspense>
      )}

      {mobileOpen && (
        <MobileMenu
          isOpen
          onClose={handleMobileClose}
          mobileRef={mobileRef}
          navModel={navModel}
          cleanTel={cleanTel}
          phoneDisplay={phoneDisplay}
          triggerRef={mobileToggleRef}
        />
      )}

    </>
  );
}
