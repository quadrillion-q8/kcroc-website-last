// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Laptop, ChevronDown, ArrowRight, Apple, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench } from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { label: 'Services', hasMega: true,  href: '/services' },
  { label: 'Pricing',  hasMega: false, href: '/pricing' },
  { label: 'Blog',     hasMega: false, href: '/blog' },
  { label: 'About',    hasMega: false, href: '/about' },
  { label: 'Contact',  hasMega: false, href: '/contact' },
];

/* ── INLINE ICON REGISTRY ── */
const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

/* ── INLINE MEGA MENU COMPONENT ── */
const InlineMegaMenu = ({ label, featured, standardList }: { label: string, featured: any[], standardList: any[] }) => {
  const safeFeatured = featured || [];
  const safeStandardList = standardList || [];

  return (
    <div className="group relative flex items-center h-16">
      <Link
        to="/services"
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors group-hover:text-cyan-400 group-hover:bg-cyan-500/10"
      >
        {label}
        <ChevronDown size={15} className="transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
      </Link>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[680px] z-[99999] opacity-0 invisible translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden cursor-default">
          
          {safeFeatured.length > 0 && (
            <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60">
              {safeFeatured.map(service => {
                const Icon = getIcon(service.icon);
                return (
                  <Link key={service.slug} to={`/${service.slug}`} className="group/card flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover/card:scale-110 transition-transform" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover/card:text-cyan-400 transition-colors leading-snug mb-1">{service.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{service.description}</p>
                    </div>
                    <span className="text-xs text-cyan-500 font-bold flex items-center gap-1 mt-auto">
                      {service.callToAction || 'Learn More'} <ArrowRight size={11} aria-hidden="true" className="group-hover/card:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {safeStandardList.length > 0 && (
            <div className="p-4 flex items-center justify-between gap-4 bg-slate-900/40">
              <div className="flex flex-wrap gap-2">
                {safeStandardList.map(service => (
                  <Link key={service.slug} to={`/${service.slug}`} className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors">
                    {service.title}
                  </Link>
                ))}
              </div>
              <Link to="/services" className="shrink-0 text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                All services <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* ── MAIN HEADER (NAMED EXPORT) ── */
// ✅ Changed from 'export default function Header' to 'export function Header'
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const menuData = NavigationBuilder.getMegaMenuServices();
  const featured = menuData.featured;
  const standardList = menuData.standardList;

  const phone = KCROC_GRAPH.business?.telephone ?? '96555301913';
  const cleanTel = phone.replace(/\D/g, '');

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

            <Link to="/" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
              <Laptop className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">
                KCROC<span className="text-cyan-400">.</span>
              </span>
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 h-16">
              {NAV_LINKS.map(link =>
                link.hasMega ? (
                  <InlineMegaMenu
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

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:+${cleanTel}`}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-2 py-1"
              >
                <Phone size={15} className="text-cyan-400" aria-hidden="true" />
                <span className="hidden xl:block">55301913</span>
              </a>
              
              <a
                href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Book Pickup
              </a>
            </div>

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
