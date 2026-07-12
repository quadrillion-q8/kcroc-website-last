// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Phone, MessageCircle,
  Laptop, Apple, Gamepad2, Cpu, Monitor, BatteryWarning,
  HardDrive, ShieldCheck, Wrench, ArrowRight
} from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';

/* ─── ICON REGISTRY ─── */
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

  /* ─── MENU DATA ─── */
  const menuData     = NavigationBuilder.getMegaMenuServices();
  const featured     = menuData.featured;
  const standardList = menuData.standardList;
  const phone        = KCROC_GRAPH.business?.telephone ?? '96555301913';
  const cleanTel     = phone.replace(/\D/g, '');

  /* ─── POSITION CALCULATION ─── */
  const updatePanelPosition = useCallback(() => {
    if (servicesBtnRef.current) {
      const rect = servicesBtnRef.current.getBoundingClientRect();
      setPanelLeft(Math.round(rect.left + rect.width / 2));
    }
  }, []);

  /* ─── HOVER HANDLERS ─── */
  const handleMegaEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    updatePanelPosition();
    setMegaOpen(true);
  }, [updatePanelPosition]);

  const handleMegaLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  /* ─── EFFECTS ─── */
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
    if (!mobileOpen) return;
    const h = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    const t = setTimeout(() => document.addEventListener('mousedown', h), 10);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', h); };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HEADER BAR — desktop nav + mobile hamburger only
          NO mega panel inside here — it lives below as a sibling
      ══════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
            >
              <Laptop className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">
                KCROC<span className="text-cyan-400">.</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link =>
                link.hasMega ? (
                  // Hover zone: wraps ONLY the trigger button
                  // Panel is outside header entirely — has its own matching handlers
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      ref={servicesBtnRef}
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
              )}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3">
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

            {/* HAMBURGER */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen
                ? <X size={22} aria-hidden="true" />
                : <Menu size={22} aria-hidden="true" />
              }
            </button>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          MEGA MENU PANEL — Fragment sibling, OUTSIDE <header>
          Uses position:fixed via inline style so it escapes
          every ancestor overflow/stacking context constraint.
          panelLeft is calculated from the Services button rect.
      ══════════════════════════════════════════════════════════ */}
      <div
        id="mega-menu-panel"
        role="region"
        aria-label="Services menu"
        onMouseEnter={handleMegaEnter}
        onMouseLeave={handleMegaLeave}
        style={{
          position:  'fixed',
          top:       '68px',
          left:      `${panelLeft}px`,
          transform: 'translateX(-50%)',
          width:     '680px',
          zIndex:    9999,
        }}
        className={`transition-opacity duration-200 ${
          megaOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* ✅ NO overflow-hidden on this div — was clipping the panel */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60">

          {/* Featured service cards */}
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

          {/* Standard list + all services CTA */}
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

      {/* ══════════════════════════════════════════════════════════
          MOBILE MENU PANEL — Fragment sibling, OUTSIDE <header>
          position:fixed, top-16, z-[55]
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={mobileRef}
        id="mobile-nav-panel"
        className={`lg:hidden fixed left-0 right-0 top-16 z-[55] transition-all duration-300 ease-in-out ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 top-16 bg-black/50 -z-10"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div className="bg-slate-950 border-b border-slate-800/80 shadow-2xl shadow-black/50 max-h-[calc(100svh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">

            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.href ||
                  (link.hasMega && location.pathname.startsWith('/services'))
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
                {link.hasMega && (
                  <ChevronDown size={14} className="text-slate-500" aria-hidden="true" />
                )}
              </Link>
            ))}

            <div className="pt-3 mt-1 border-t border-slate-800/60">
              <p className="px-4 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Repair Services
              </p>
              {KCROC_GRAPH.services.map(service => {
                const Icon = getIcon((service as any).iconKey ?? 'laptop');
                return (
                  <Link
                    key={service.id}
                    to={`/${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                    {service.title}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800/60 flex flex-col gap-3 pb-2">
              <a
                href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp — Book Free Pickup
              </a>
              
              <a
                href={`tel:+${cleanTel}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <Phone size={16} aria-hidden="true" />
                Call +965 5530 1913
              </a>
            </div>

          </nav>
        </div>
      </div>
    </>
  );
}
