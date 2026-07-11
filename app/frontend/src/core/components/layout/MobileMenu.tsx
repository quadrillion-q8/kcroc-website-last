// File: app/frontend/src/core/components/layout/MobileMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';

interface NavLink {
  label: string;
  hasMega: boolean;
  href: string;
}

interface ServiceItem {
  slug: string;
  title: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
  navLinks: NavLink[];
  servicesList: ServiceItem[];
  cleanTel: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, onClose, returnFocusRef, navLinks, servicesList, cleanTel 
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Reset accordion state when closed
  useEffect(() => {
    if (!isOpen) {
      setServicesOpen(false);
    }
  }, [isOpen]);

  // Escape key & focus restoration
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        returnFocusRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, returnFocusRef]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`lg:hidden fixed inset-0 z-[55] transition-opacity duration-200 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* ── INTERACTIVE BACKDROP ── */}
      <div 
        className="fixed inset-0 top-16 bg-slate-950/90 backdrop-blur-md -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── MENU PANEL ── */}
      <div 
        ref={panelRef}
        id="mobile-nav-panel"
        className={`fixed left-0 right-0 top-16 bg-slate-950 border-b border-slate-800/80 shadow-2xl shadow-black/50 max-h-[calc(100dvh-4rem)] overflow-y-auto transform origin-top transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 scale-100 visible' : '-translate-y-2 scale-[0.98] invisible'
        }`}
      >
        <div className="flex flex-col pt-4 px-6 pb-8 h-full">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/" 
              onClick={onClose} 
              className={`py-3 text-lg font-bold border-b border-slate-800 transition-colors ${
                location.pathname === '/' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Home
            </Link>

            {/* ── EXPANDABLE SERVICES ACCORDION ── */}
            <div className="border-b border-slate-800">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                className="w-full flex items-center justify-between py-3 text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                Services
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} 
                  aria-hidden="true"
                />
              </button>
              
              <div 
                className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  servicesOpen ? 'max-h-[800px] opacity-100 pb-4 pl-4' : 'max-h-0 opacity-0'
                }`}
              >
                <Link 
                  to="/services" 
                  onClick={onClose} 
                  className="text-cyan-400 font-bold text-sm py-2"
                >
                  View All Services →
                </Link>
                {servicesList.map(s => (
                  <Link 
                    key={s.slug} 
                    to={`/${s.slug}`} 
                    onClick={onClose} 
                    className={`text-sm py-1.5 transition-colors ${
                      location.pathname === `/${s.slug}` ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── STANDARD FLAT LINKS ── */}
            {navLinks.filter(l => !l.hasMega).map(link => (
              <Link 
                key={link.label} 
                to={link.href} 
                onClick={onClose} 
                className={`py-3 text-lg font-bold border-b border-slate-800 transition-colors ${
                  location.pathname === link.href ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── MOBILE CTA ACTIONS ── */}
          <div className="mt-8 pt-2 flex gap-3">
            <a
              href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <MessageCircle size={18} aria-hidden="true" /> Book Pickup
            </a>
            <a
              href={`tel:+${cleanTel}`}
              className="w-14 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl border border-slate-700 transition-colors"
              aria-label="Call KCROC directly"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
