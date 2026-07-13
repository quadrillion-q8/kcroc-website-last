// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Laptop, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';
import { trackConversion } from '../../analytics';
import { SafeFeaturedService, SafeStandardService } from '../../navigation/NavigationBuilder';

const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

interface Props {
  isOpen: boolean;
  panelLeft: number;
  featured: SafeFeaturedService[];
  standardList: SafeStandardService[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DesktopMegaMenu({ isOpen, panelLeft, featured, standardList, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      id="mega-menu-panel"
      role="region"
      aria-label="Services menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '68px',
        // ✅ Fix: Fallback to center of screen if panelLeft hasn't been calculated yet
        left: panelLeft > 0 ? `${panelLeft}px` : '50%',
        transform: 'translateX(-50%)',
        width: '680px',
        zIndex: 9999,
      }}
      className={`transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60">
        <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60">
          {featured.map(service => {
            const Icon = getIcon(service.icon ?? 'laptop');
            return (
              <Link
                key={service.slug}
                to={`/${service.slug}`}
                onClick={() => trackConversion('cta_click', { cta_name: 'mega_menu_card', button_position: 'header' }, { entity_id: service.id || 'unknown', entity_type: 'Service', entity_slug: service.slug })}
                className="group flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-1">{service.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{service.description}</p>
                </div>
                <span className="text-xs text-cyan-500 font-bold flex items-center gap-1 mt-auto">Learn more <ArrowRight size={11} aria-hidden="true" /></span>
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
                onClick={() => trackConversion('cta_click', { cta_name: 'mega_menu_link', button_position: 'header' }, { entity_id: service.id || 'unknown', entity_type: 'Service', entity_slug: service.slug })}
                className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </div>
          <Link to="/services" className="shrink-0 text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            All services <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
