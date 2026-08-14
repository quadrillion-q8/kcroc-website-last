// File: app/frontend/src/core/components/layout/MobileMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Phone, CalendarCheck, X, Wrench, ShieldCheck, Laptop, Apple, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive } from 'lucide-react';
import { CompiledNavigationModel } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';

const ICON_REGISTRY: Record<string, React.ElementType> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck, wrench: Wrench
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  mobileRef: React.RefObject<HTMLDivElement>;
  navModel: CompiledNavigationModel;
  cleanTel: string;
  phoneDisplay: string; // ✅ Added to keep component pure
  triggerRef?: React.RefObject<HTMLButtonElement>; // 🚀 A11Y: hamburger button, for focus return on close
}

export default function MobileMenu({ isOpen, onClose, mobileRef, navModel, cleanTel, phoneDisplay, triggerRef }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const location = useLocation();
  const { trackConversion } = useAnalytics();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // 🚀 FIXED: Removed 'onClose' from dependency array to prevent false-positive trigger fires
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onClose();
    setOpenAccordion(null);
  }, [location.pathname]);

  // 🚀 A11Y FIX: keyboard users had no way to close the panel except tapping
  // the small X button — Escape now closes it, matching the header search
  // panel's existing behavior (SearchBar) and standard dialog conventions.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // 🚀 A11Y FIX: focus management for the dialog. Previously, opening the
  // menu left keyboard/screen-reader focus stranded on the (now
  // off-screen-context) hamburger button, and closing it never returned
  // focus anywhere — both violate expected dialog behavior (WCAG 2.2 AA).
  // Moves focus into the panel on open, and back to the hamburger on close.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={mobileRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-slate-950 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800/60 shrink-0">
          <span className="font-black text-white text-lg tracking-tight">Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            // 🚀 TOUCH TARGET FIX: min-h/w-11 (44px) hit area, was ~40px with p-2 + 24px icon
            className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
          {navModel.header.map((link) => {
            const isActive = location.pathname.includes(link.href) && link.href !== '/' && link.href !== '#';
            const isHomeActive = link.href === '/' && location.pathname === '/';
            const activelyHighlighted = isActive || isHomeActive;

            if (link.hasMega && link.megaMenuId) {
              const megaConfig = navModel.megaMenus[link.megaMenuId];

              // ✅ Defensive check prevents crashes if a mega menu isn't found
              if (!megaConfig) return null;

              const isExpanded = openAccordion === link.id;

              return (
                <div key={link.id} className="border border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/30">
                  <button
                    onClick={() => toggleAccordion(link.id)}
                    aria-expanded={isExpanded}
                    className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors focus:outline-none focus-visible:bg-slate-800 ${isExpanded ? 'text-cyan-400 bg-slate-800/50' : 'text-slate-200 hover:bg-slate-800/30'}`}
                  >
                    {link.label}
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                  </button>

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-3 bg-slate-950/50 space-y-4 border-t border-slate-800/60">
                      
                      {megaConfig.featured && megaConfig.featured.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-2">Featured</span>
                          <div className="grid grid-cols-1 gap-1">
                            {megaConfig.featured.map(entity => {
                              const Icon = getIcon(entity.iconKey);
                              return (
                                <Link
                                  key={entity.slug}
                                  to={`/${entity.slug}`}
                                  onClick={() => trackConversion('cta_click', { cta_name: 'mobile_mega_featured', button_position: 'mobile_menu' })}
                                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                >
                                  <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">{entity.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {megaConfig.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          {sec.title && <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-2">{sec.title}</span>}
                          <div className="grid grid-cols-1 gap-1">
                            {sec.items.map(entity => (
                              <Link
                                key={entity.slug}
                                to={`/${entity.slug}`}
                                onClick={() => trackConversion('cta_click', { cta_name: 'mobile_mega_link', button_position: 'mobile_menu' })}
                                className="text-sm font-medium text-slate-400 hover:text-cyan-400 p-2.5 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                              >
                                {entity.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.id}
                to={link.href}
                className={`block p-4 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${activelyHighlighted ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-900/30 text-slate-200 border border-slate-800/60 hover:bg-slate-800/50'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3 shrink-0">
          <a
            href={`tel:+${cleanTel}`}
            onClick={() => trackConversion('phone_call_click', { cta_name: 'mobile_menu_phone', button_position: 'mobile_menu' })}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Phone size={18} className="text-cyan-400" />
            Call {phoneDisplay}
          </a>
          <Link
            to="/booking"
            onClick={() => trackConversion('cta_click', { cta_name: 'mobile_menu_book', button_position: 'mobile_menu' })}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <CalendarCheck size={18} />
            Book Online
          </Link>
        </div>
      </div>
    </>
  );
}
