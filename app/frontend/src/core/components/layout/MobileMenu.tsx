// File: app/frontend/src/core/components/layout/MobileMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, Phone, MessageCircle, Laptop, Apple, Gamepad2, 
  Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench 
} from 'lucide-react';

const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
  navLinks: { label: string; href: string; hasMega: boolean }[];
  servicesList: any[];
  cleanTel: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, onClose, returnFocusRef, navLinks, servicesList, cleanTel 
}) => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();

  // Focus management & route change closing
  useEffect(() => {
    if (isOpen) {
      // Focus first link slightly after rendering
      setTimeout(() => firstLinkRef.current?.focus(), 50);
    } else {
      returnFocusRef.current?.focus();
      setServicesExpanded(false); // Reset accordion on close
    }
  }, [isOpen, returnFocusRef]);

  // Click outside detection
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const t = setTimeout(() => document.addEventListener('mousedown', h), 10);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', h); };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`lg:hidden fixed inset-x-0 bottom-0 top-16 z-[55] ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Interactive fading backdrop */}
      <div 
        className={`fixed inset-0 top-16 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 -z-10 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Menu panel with subtle scale/slide animation & dvh sizing */}
      <div 
        ref={panelRef}
        className={`bg-slate-950 border-b border-slate-800/80 shadow-2xl shadow-black/50 max-h-[calc(100dvh-4rem)] overflow-y-auto transform origin-top transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-[0.98] invisible'
        }`}
      >
        <nav className="px-4 py-4 space-y-1">
          {navLinks.map((link, idx) => {
            // Expandable Services Accordion
            if (link.hasMega) {
              return (
                <div key={link.label} className="border-b border-slate-800/60 pb-1 mb-1">
                  <button
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    aria-expanded={servicesExpanded}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {link.label}
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-500 transition-transform duration-300 ${servicesExpanded ? 'rotate-180 text-cyan-400' : ''}`} 
                      aria-hidden="true" 
                    />
                  </button>
                  <div 
                    className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      servicesExpanded ? 'max-h-[1000px] opacity-100 mt-2 pb-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <Link
                      to="/services"
                      onClick={onClose}
                      className="px-6 py-2.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View All Services →
                    </Link>
                    {servicesList.map(service => {
                      const Icon = getIcon(service.icon ?? 'laptop');
                      return (
                        <Link
                          key={service.slug}
                          to={`/${service.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 px-6 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          <Icon className="w-4 h-4 text-cyan-500 shrink-0" aria-hidden="true" />
                          {service.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Standard Navigation Links
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                ref={idx === 0 ? firstLinkRef : null}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  location.pathname === link.href
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <div className="pt-4 mt-2 border-t border-slate-800/60 flex flex-col gap-3 pb-2">
            <a
              href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp — Book Free Pickup
            </a>
            <a
              href={`tel:+${cleanTel}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Phone size={16} aria-hidden="true" />
              Call +965 5530 1913
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};
