// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Apple, Laptop, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench, MapPin } from 'lucide-react';
import { MegaMenuConfig } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';

const ICON_REGISTRY: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
  battery: BatteryWarning,
  hardDrive: HardDrive,
  'hard-drive': HardDrive,
  shield: ShieldCheck,
  wrench: Wrench,
  'map-pin': MapPin,
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
  
  // Compact desktop mega-menu: six small fitted cards in a 3×2 grid.
  // The dropdown is a visual navigation surface; full inventories remain
  // available through the section's "View All" destination.
  const hasFeatured = config.featured && config.featured.length > 0;
  const PANEL_WIDTH = hasFeatured ? 1040 : 420;

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
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isOpen]);

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
      aria-hidden={!isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '68px',
        left: getClampedLeft(),
        transform: 'translateX(-50%)',
        width: `min(${PANEL_WIDTH}px, calc(100vw - 32px))`,
        maxHeight: 'calc(100vh - 84px)',
        zIndex: 9999,
      }}
      className={`max-h-full overflow-y-auto transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col">
        
        {/* Compact featured-card grid: 3 columns × 2 rows on desktop. */}
        {hasFeatured && (
          <div className="p-4 grid grid-cols-3 gap-3 bg-slate-900/50">
            {config.featured.slice(0, 6).map(entity => {
              const Icon = getIcon(entity.iconKey);
              return (
                <Link
                  key={entity.slug}
                  to={`/${entity.slug}`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onMouseEnter={() => prefetchRoute(entity.slug)}
                  onClick={() => {
                    trackConversion('cta_click', { cta_name: 'mega_menu_card', button_position: 'header' });
                    onClose();
                  }}
                  className="group min-w-0 flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  </div>
                  <p className="min-w-0 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                    {entity.title}
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        {/* Only show the section's index destination; remaining items stay on
            the full index page instead of creating a second link-heavy panel. */}
        {config.sections.map((section, idx) => {
          const indexEntity = section.items.find(entity => entity.id.endsWith('_index'));
          if (!indexEntity) return null;
          return (
            <div key={idx} className="px-4 pb-4 pt-1 bg-slate-900/50">
              <Link
                to={`/${indexEntity.slug}`}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onMouseEnter={() => prefetchRoute(indexEntity.slug)}
                onClick={() => {
                  trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
                  onClose();
                }}
                className="group flex items-center justify-end gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-cyan-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              >
                <span>{indexEntity.title.replace(/^All /, 'View All ')}</span>
                <span aria-hidden="true" className="text-sm transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          );
        })}

      </div>
    </div>
  );
}
