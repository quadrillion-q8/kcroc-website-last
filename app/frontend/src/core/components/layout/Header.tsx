// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Laptop, Phone, CalendarCheck, MessageCircle, ArrowRight, Wrench } from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';

/* ─────────────────────────────────────────────────────────────────────────────
   ICON REGISTRY
───────────────────────────────────────────────────────────────────────────── */
const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
  apple:     Apple,
  laptop:    Laptop,
  gaming:    Gamepad2,
  cpu:       Cpu,
  monitor:   Monitor,
  battery:   BatteryWarning,
  hardDrive: HardDrive,
  shield:    ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

/* ─────────────────────────────────────────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Services', hasMega: true,  href: '/services' },
  { label: 'Pricing',  hasMega: false, href: '/pricing' },
  { label: 'Blog',     hasMega: false, href: '/blog' },
  { label: 'About',    hasMega: false, href: '/about' },
  { label: 'Contact',  hasMega: false, href: '/contact' },
];

export const Header: React.FC = () => {
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const megaRef      = useRef<HTMLDivElement>(null);
  const triggerRef   = useRef<HTMLButtonElement>(null);
  const headerRef    = useRef<HTMLElement>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location     = useLocation();

  const menuData   = NavigationBuilder.getMegaMenuServices();
  const navData    = NavigationBuilder.getFooterDirectory();

  const featured = menuData.featured.length > 0
    ? menuData.featured
    : menuData.standardList.slice(0, 3).map(s => ({
        ...s,
        icon: (KCROC_GRAPH.services.find(srv => srv.slug === s.slug) as any)?.iconKey ?? 'laptop',
        description: (KCROC_GRAPH.services.find(srv => srv.slug === s.slug) as any)?.shortDescription ?? '',
        callToAction: '→ Learn More'
      }));
  const standardList = menuData.standardList;

  const phone    = KCROC_GRAPH.business?.telephone ?? '96555301913';
  const cleanTel = phone.replace(/\D/g, '');

  const handleNavigate = () => {
    setMobileOpen(false);
    setOpenMobileDropdown(null);
  };

  const handleMenuEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between h-16">

          {/* ─── LOGO ─── */}
          <Link
            to="/"
            onClick={handleNavigate}
            className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg relative z-20"
          >
            <Laptop className="w-6 h-6 text-cyan-400" />
            <span className="font-black text-white text-lg tracking-tight hidden sm:block">
              KCROC<span className="text-cyan-400">.</span>
            </span>
          </Link>

          {/* ─── DESKTOP NAV ─── */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 relative z-20">
            {NAV_LINKS.map(link => (
              link.hasMega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={handleMenuEnter}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    ref={triggerRef}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls="mega-menu-panel"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      megaOpen || location.pathname.startsWith('/services')
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${megaOpen ? 'rotate-180 text-cyan-400' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id="mega-menu-panel"
                    ref={megaRef}
                    role="region"
                    aria-label="Services menu"
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] z-[60]
                      transition-opacity duration-200
                      ${megaOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                  >
                    <div className="bg-slate-900/98 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                      <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60">
                        {featured.map(service => {
                          const Icon = getIcon(service.icon ?? 'laptop');
                          return (
                            <Link
                              key={service.slug}
                              to={`/${service.slug}`}
                              className="group flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            >
                              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-1">
                                  {service.title}
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                                  {service.description}
                                </p>
                              </div>
                              <span className="text-xs text-cyan-500 font-bold flex items-center gap-1 mt-auto">
                                Learn more <ArrowRight size={11} aria-hidden="true" />
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="p-4 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {standardList.map(service => (
                            <Link
                              key={service.slug}
                              to={`/${service.slug}`}
                              className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/services"
                          className="shrink-0 text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          All services <ArrowRight size={12} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
            ))}
          </nav>

          {/* ─── DESKTOP CTA ─── */}
          <div className="hidden lg:flex items-center gap-3 relative z-20">
            <a
              href={`tel:+${cleanTel}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone size={15} className="text-cyan-400" aria-hidden="true" />
              <span className="hidden xl:block">55301913</span>
            </a>
            <a
              href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Book Pickup
            </a>
          </div>

          {/* ─── MOBILE HAMBURGER ─── */}
          <button
            className="lg:hidden relative z-20 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>
        </div>

        {/* ─── FIXED MOBILE MENU ─── */}
        {/* ✅ FIXED: Safari 100vh Bug. Uses dvh and avoids w-screen. */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 w-full transition-all duration-300 ease-in-out origin-top ${
            mobileOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          {/* Main Dropdown Panel */}
          {/* ✅ FIXED: max-h-[calc(100dvh-4rem)] ensures it never renders below the Safari toolbar */}
          <div className="bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/60 max-h-[calc(100dvh-4rem)] overflow-y-auto w-full pb-6">
            <nav className="px-4 py-2 flex flex-col gap-2">

              {NAV_LINKS.map(link => {
                // If it's a mega menu link (Services), render an accordion
                if (link.hasMega) {
                  const isOpen = openMobileDropdown === link.label;
                  return (
                    <div key={link.label} className="border-b border-slate-800/50 pb-2">
                      <button 
                        onClick={() => setOpenMobileDropdown(isOpen ? null : link.label)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold text-white hover:bg-slate-800/60 transition-colors"
                      >
                        {link.label}
                        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                      </button>
                      <div className={`flex flex-col gap-1 transition-all overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                         {navData.services.map(service => {
                           const originalSrv = KCROC_GRAPH.services.find(s => s.slug === service.route.replace('/', ''));
                           const Icon = getIcon((originalSrv as any)?.iconKey ?? 'laptop');
                           return (
                             <Link
                               key={service.route}
                               to={service.route}
                               onClick={handleNavigate}
                               className="flex items-center gap-3 px-6 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                             >
                               <Icon className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                               {service.label}
                             </Link>
                           );
                         })}
                      </div>
                    </div>
                  );
                }

                // Standard Link
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={handleNavigate}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      location.pathname === link.href
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800/60 flex flex-col gap-3 pb-4">
                <a
                  href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavigate}
                  className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base px-4 py-3.5 rounded-xl transition-colors"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Book Repair
                </a>
                <a
                  href={`tel:+${cleanTel}`}
                  onClick={handleNavigate}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-base px-4 py-3.5 rounded-xl transition-colors"
                >
                  <Phone size={18} aria-hidden="true" />
                  Call Us
                </a>
              </div>
            </nav>
          </div>
          
          {/* Full Screen Dismiss Backdrop */}
          {/* ✅ FIXED: Uses 100dvh instead of 100vh */}
          <div 
            className="w-full h-[100dvh] bg-slate-950/40 backdrop-blur-sm cursor-pointer"
            onClick={handleNavigate}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
};
