// File: app/frontend/src/core/components/layout/MobileMenu.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Phone, MessageCircle, CalendarCheck, Apple, Laptop, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench } from 'lucide-react';
import { trackConversion } from '../../analytics';

const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

interface NavLink { label: string; href: string; hasMega: boolean; }

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mobileRef: React.RefObject<HTMLDivElement>;
  navLinks: NavLink[];
  services: any[];
  cleanTel: string;
}

export default function MobileMenu({ isOpen, onClose, mobileRef, navLinks, services, cleanTel }: Props) {
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener('mousedown', h), 10);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', h); };
  }, [isOpen, onClose, mobileRef]);

  return (
    <div
      ref={mobileRef}
      id="mobile-nav-panel"
      className={`lg:hidden fixed left-0 right-0 top-16 z-[55] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
    >
      <div className="fixed inset-0 top-16 bg-black/50 -z-10" onClick={onClose} aria-hidden="true" />
      <div className="bg-slate-950 border-b border-slate-800/80 shadow-2xl shadow-black/50 max-h-[calc(100svh-4rem)] overflow-y-auto">
        <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.href || (link.hasMega && location.pathname.startsWith('/services')) ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.label}
              {link.hasMega && <ChevronDown size={14} className="text-slate-500" aria-hidden="true" />}
            </Link>
          ))}

          <div className="pt-3 mt-1 border-t border-slate-800/60">
            <p className="px-4 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Repair Services</p>
            {services.map(service => {
              const Icon = getIcon((service as any).iconKey ?? 'laptop');
              return (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  onClick={() => {
                    onClose();
                    trackConversion('cta_click', { cta_name: 'mobile_menu_service', button_position: 'mobile_menu' }, { entity_id: service.id, entity_type: 'Service', entity_slug: service.slug });
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  {service.title}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-800/60 flex flex-col gap-3 pb-2">
            <Link
              to="/booking"
              onClick={() => {
                onClose();
                trackConversion('cta_click', { cta_name: 'header_book', button_position: 'mobile_menu' });
              }}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-4 py-3 rounded-xl transition-colors"
            >
              <CalendarCheck size={16} aria-hidden="true" />
              Book Online
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${cleanTel}?text=${encodeURIComponent('Hi KCROC, I need a repair. Please arrange free pickup.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onClose();
                  trackConversion('whatsapp_click', { cta_name: 'mobile_menu_whatsapp', button_position: 'mobile_menu' });
                }}
                className="flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:+${cleanTel}`}
                onClick={() => {
                  onClose();
                  trackConversion('phone_call_click', { cta_name: 'mobile_menu_call', button_position: 'mobile_menu' });
                }}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <Phone size={15} aria-hidden="true" />
                Call Us
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
