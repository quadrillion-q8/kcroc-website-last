import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Apple, Laptop, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';
import { MegaMenuConfig } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';

const ICON_REGISTRY: Record<string, React.ElementType> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

// Global Prefetch Cache to prevent duplicate DOM insertions
const prefetchedRoutes = new Set<string>();

interface Props {
  isOpen: boolean;
  panelLeft: number;
  config: MegaMenuConfig;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function DesktopMegaMenu({ isOpen, panelLeft, config, onMouseEnter, onMouseLeave, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { trackConversion } = useAnalytics();
  const PANEL_WIDTH = 680;

  // Collision Detection
  const getClampedLeft = () => {
    if (typeof window === 'undefined') return '50%';
    const safePadding = 20;
    const minLeft = (PANEL_WIDTH / 2) + safePadding;
    const maxLeft = window.innerWidth - (PANEL_WIDTH / 2) - safePadding;
    const clamped = Math.max(minLeft, Math.min(panelLeft || window.innerWidth / 2, maxLeft));
    return `${clamped}px`;
  };

  // Smart Prefetching
  const prefetchRoute = (slug: string) => {
    if (prefetchedRoutes.has(slug) || typeof document === 'undefined') return;
    prefetchedRoutes.add(slug);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/${slug}`;
    document.head.appendChild(link);
  };

  // Focus Trap & ARIA Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !panelRef.current) return;
    
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!config) return null;

  return (
    <div
      ref={panelRef}
      id={`mega-menu-${config.id}`}
      role="menu"
      aria-orientation="vertical"
      aria-label={config.title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '68px',
        left: getClampedLeft(),
        transform: 'translateX(-50%)',
        width: `${PANEL_WIDTH}px`,
        zIndex: 9999,
      }}
      className={`transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60 bg-slate-900/50">
          {config.featured.map(entity => {
            const Icon = getIcon(entity.iconKey);
            return (
              <Link
                key={entity.slug}
                to={`/${entity.slug}`}
                role="menuitem"
                onMouseEnter={() => prefetchRoute(entity.slug)}
                onClick={() => {
                  trackConversion('cta_click', { cta_name: 'mega_menu_card', button_position: 'header' });
                  onClose();
                }}
                className="group flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-1">{entity.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{entity.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
