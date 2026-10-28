// File: app/frontend/src/core/components/layout/CompactMegaMenuContent.tsx
//
// Compact "every page, no scrollbar" dropdown used by the Services, Blog and
// Guides menus. It lists EVERY page of the section as a single balanced
// 3-column grid (filled column by column, so the first column holds the most
// important items) instead of cards + sections, so the whole list fits inside
// the panel without an inner or outer scrollbar.
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  ArrowUpRight,
  BatteryWarning,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Cpu,
  Gamepad2,
  HardDrive,
  Laptop,
  Monitor,
  Newspaper,
  Phone,
  Search,
  ShieldCheck,
  Thermometer,
  Wrench,
} from 'lucide-react';
import { MegaMenuConfig, NavEntity } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import { NAV_GRAPH } from '../../../data/navGraph.generated';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
  search: Search,
  thermometer: Thermometer,
  'circle-dollar-sign': CircleDollarSign,
  'book-open': BookOpen,
  newspaper: Newspaper,
};
const getIcon = (key: string) => ICONS[key] ?? Wrench;

export interface CompactMenuMeta {
  eyebrow: string;
  allLabel: string;
  allHref: string;
}

interface Props {
  config: MegaMenuConfig;
  meta: CompactMenuMeta;
  /** Slug of the section index page (e.g. "blog"). Excluded from the list; the header button links to it. */
  rootSlug: string;
  /** "comfortable" = Services (15 items, larger rows). "compact" = Blog/Guides (smaller type, tighter rows). */
  density: 'comfortable' | 'compact';
  ctaName: string;
  isOpen: boolean;
  onClose: () => void;
}

const COLUMNS = 3;

export default function CompactMegaMenuContent({ config, meta, rootSlug, density, ctaName, isOpen, onClose }: Props) {
  const { trackConversion } = useAnalytics();
  const phoneDigits = NAV_GRAPH.business!.telephone.replace(/\D/g, '');
  const phoneDisplay = phoneDigits.startsWith('965') ? '+965 ' + phoneDigits.slice(3) : '+' + phoneDigits;
  const isCompact = density === 'compact';

  const items = useMemo(() => {
    const seen = new Set<string>();
    return [...(config.featured ?? []), ...config.sections.flatMap((section) => section.items)].filter((entity: NavEntity) => {
      if (entity.slug === rootSlug) return false;
      if (seen.has(entity.id)) return false;
      seen.add(entity.id);
      return true;
    });
  }, [config, rootSlug]);

  const rows = Math.max(1, Math.ceil(items.length / COLUMNS));
  const toHref = (slug: string) => (slug.startsWith('/') ? slug : '/' + slug);

  const prefetchRoute = (href: string) => {
    if (typeof document === 'undefined') return;
    const existing = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]'))
      .some((link) => link.getAttribute('href') === href);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 lg:px-5">
        <div className="min-w-0">
          <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-blue-600">{meta.eyebrow}</p>
          <h2 className="m-0 mt-0.5 text-lg font-extrabold tracking-tight text-slate-900">
            {config.title}
            <span className="ml-2 text-xs font-semibold text-slate-500">({items.length})</span>
          </h2>
        </div>
        <Link
          to={meta.allHref}
          tabIndex={isOpen ? 0 : -1}
          onMouseEnter={() => prefetchRoute(meta.allHref)}
          onClick={() => {
            trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
            onClose();
          }}
          className="group inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {meta.allLabel}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Column-major, evenly balanced grid: every page is visible, nothing scrolls. */}
      <ul
        className={`m-0 grid list-none gap-x-3 ${isCompact ? 'gap-y-0.5 p-3' : 'gap-y-1 p-4'}`}
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, auto)`,
          gridAutoFlow: 'column',
        }}
      >
        {items.map((entity) => {
          const Icon = getIcon(entity.iconKey);
          const href = toHref(entity.slug);
          return (
            <li key={entity.id + '-' + entity.slug} className="min-w-0">
              <Link
                to={href}
                title={entity.title}
                tabIndex={isOpen ? 0 : -1}
                onMouseEnter={() => prefetchRoute(href)}
                onClick={() => {
                  trackConversion('cta_click', { cta_name: ctaName, button_position: 'header' });
                  onClose();
                }}
                className={`group flex h-full w-full cursor-pointer items-center gap-2 rounded-lg transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${isCompact ? 'px-2 py-1' : 'px-2.5 py-2'}`}
              >
                <span className={`flex shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700 ${isCompact ? 'h-6 w-6' : 'h-8 w-8'}`}>
                  <Icon className={isCompact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
                </span>
                <span
                  dir="auto"
                  className={`min-w-0 flex-1 line-clamp-2 font-semibold text-slate-800 transition-colors group-hover:text-blue-700 ${isCompact ? 'text-xs leading-4' : 'text-sm leading-5'}`}
                >
                  {entity.title}
                </span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-100 bg-slate-50 px-4 py-2.5 lg:px-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Free Pickup &amp; Return
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />30-Day Complete Warranty
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />No Fix, No Fee Policy
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={'tel:+' + phoneDigits}
            onClick={() => trackConversion('phone_call_click', { cta_name: 'mega_menu_phone', button_position: 'header' })}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Phone className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />{phoneDisplay}
          </a>
          <Link
            to="/book"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' });
              onClose();
            }}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Book Free Pickup <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
