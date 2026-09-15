// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Apple, Laptop, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';
import { MegaMenuConfig } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';

const ICON_REGISTRY: Record<string, React.ElementType> = {
  apple: Apple, laptop: Laptop, gaming: Gamepad2, cpu: Cpu, monitor: Monitor, battery: BatteryWarning, hardDrive: HardDrive, shield: ShieldCheck, wrench: Wrench
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

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
  
  // Conditionally size the width based on whether there are featured cards
  const hasFeatured = config.featured && config.featured.length > 0;
  const PANEL_WIDTH = hasFeatured ? 680 : 300; 

  const getClampedLeft = () => {
    if (typeof window === 'undefined') return '50%';
    const safePadding = 20;
    const minLeft = (PANEL_WIDTH / 2) + safePadding;
    const maxLeft = window.innerWidth - (PANEL_WIDTH / 2) - safePadding;
    const clamped = Math.max(minLeft, Math.min(panelLeft || window.innerWidth / 2, maxLeft));
    return `${clamped}px`;
  };

  const prefetchRoute = (slug: string) => {
    if (prefetchedRoutes.has(slug) || typeof document === 'undefined') return;
    prefetchedRoutes.add(slug);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/${slug}`;
    document.head.appendChild(link);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);

    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[aria-controls="mega-menu-${config.id}"]`)?.focus();
      });
      return;
    }

    if (focusable.length === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % focusable.length : 0;
      focusable[nextIndex].focus();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const previousIndex = activeIndex > 0 ? activeIndex - 1 : focusable.length - 1;
      focusable[previousIndex].focus();
      return;
    }

    // Keep Tab as the native sequential navigation mechanism. This avoids
    // trapping keyboard focus inside a non-modal mega menu while still
    // allowing every menu item to be reached with Tab/Shift+Tab.
  }, [config.id, isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // When a keyboard user opens a menu from its header trigger, move focus
  // into the menu. Pointer/hover opening does not steal focus.
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const trigger = document.querySelector<HTMLElement>(`[aria-controls="mega-menu-${config.id}"]`);
    if (document.activeElement === trigger) {
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();
      });
    }
  }, [config.id, isOpen]);

  if (!config) return null;

  return (
    <div
      ref={panelRef}
      id={`mega-menu-${config.id}`}
      role="menu"
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
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col">
        
        {/* Only render the top grid if we actually have featured items */}
        {hasFeatured && (
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
        )}
        
        {/* Render the standard list items */}
        <div className={`p-4 flex flex-col gap-2 ${hasFeatured ? 'bg-brand-dark' : 'bg-slate-900'}`}>
          {config.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {section.title && <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-3">{section.title}</span>}
              <div className={hasFeatured ? "flex flex-wrap gap-2" : "flex flex-col gap-1"}>
                {section.items.map(entity => (
                  <Link
                    key={entity.slug}
                    to={`/${entity.slug}`}
                    role="menuitem"
                    onMouseEnter={() => prefetchRoute(entity.slug)}
                    onClick={() => {
                      trackConversion('cta_click', { cta_name: 'mega_menu_link', button_position: 'header' });
                      onClose();
                    }}
                    className="text-sm font-medium text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
