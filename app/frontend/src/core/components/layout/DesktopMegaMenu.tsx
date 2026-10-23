// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  Laptop,
  Gamepad2,
  Cpu,
  Monitor,
  BatteryWarning,
  HardDrive,
  ShieldCheck,
  Wrench,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Sparkles,
  BookOpen,
  Newspaper,
  Search,
  Thermometer,
  CircleDollarSign,
  Droplets,
  Keyboard,
  Power,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { MegaMenuConfig, NavEntity } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import { NAV_GRAPH } from '../../../data/navGraph.generated';

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
  search: Search,
  thermometer: Thermometer,
  'circle-dollar-sign': CircleDollarSign,
  'book-open': BookOpen,
  'newspaper': Newspaper,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

const MENU_META: Record<string, {
  eyebrow: string;
  subtitle: string;
  allLabel: string;
  allHref: string;
  featureLabel: string;
}> = {
  services_mega: {
    eyebrow: 'REPAIR SERVICES',
    subtitle: 'Laptop, MacBook, gaming PC and board-level repair — organized around the fault, not the brand.',
    allLabel: 'View all services',
    allHref: '/services',
    featureLabel: 'Popular repair services',
  },
  brands_mega: {
    eyebrow: 'SUPPORTED BRANDS',
    subtitle: 'Major laptop and computer brands supported by KCROC, with component-level diagnostics when the board is repairable.',
    allLabel: 'View all brands',
    allHref: '/brands',
    featureLabel: 'Most searched brands',
  },
  problems_mega: {
    eyebrow: 'COMMON PROBLEMS',
    subtitle: 'Start with the symptom. Find likely causes, safe checks and the right repair path without guessing.',
    allLabel: 'Browse all problems',
    allHref: '/problems',
    featureLabel: 'Most common issues',
  },
  pricing_mega: {
    eyebrow: 'REPAIR PRICING',
    subtitle: 'Transparent starting points with diagnosis first. Final pricing depends on the exact model and fault.',
    allLabel: 'See full price list',
    allHref: '/pricing',
    featureLabel: 'Common services',
  },
  blog_mega: {
    eyebrow: 'TECH BLOG',
    subtitle: 'Practical explainers, buyer guidance and current Windows, laptop and PC topics written for real users.',
    allLabel: 'Read all articles',
    allHref: '/blog',
    featureLabel: 'Featured articles',
  },
  news_mega: {
    eyebrow: 'TECH NEWS',
    subtitle: 'Current Windows, hardware, gaming, Apple, cybersecurity and AI news — with practical technician context.',
    allLabel: 'Read all news',
    allHref: '/news',
    featureLabel: 'Latest news',
  },
  guides_mega: {
    eyebrow: 'TROUBLESHOOTING GUIDES',
    subtitle: 'Symptom-first guides for diagnosing common laptop and computer problems before you decide what to do next.',
    allLabel: 'Browse all guides',
    allHref: '/guides',
    featureLabel: 'Start with a popular guide',
  },
  locations_mega: {
    eyebrow: 'KUWAIT LOCATIONS & SERVICE AREAS',
    subtitle: 'Browse KCROC location pages across Kuwait, including the Hawalli repair lab and pickup-and-delivery service areas.',
    allLabel: 'View all areas',
    allHref: '/locations',
    featureLabel: 'Popular service areas',
  },
  resources_mega: {
    eyebrow: 'KCROC RESOURCES',
    subtitle: 'Repair guides, practical tech articles and current news in one place.',
    allLabel: 'Start with guides',
    allHref: '/guides',
    featureLabel: 'Useful starting points',
  },
  about_mega: {
    eyebrow: 'KCROC',
    subtitle: 'Meet the team, see the workshop and find the right service area across Kuwait.',
    allLabel: 'About KCROC',
    allHref: '/about',
    featureLabel: 'About the company',
  },
};

const getMeta = (id: string) => MENU_META[id] ?? {
  eyebrow: 'KCROC',
  subtitle: 'Component-level computer repair, diagnostics and practical technical guidance.',
  allLabel: 'Explore',
  allHref: '/',
  featureLabel: 'Featured',
};

const getEntityHref = (entity: NavEntity) => `/${entity.slug}`;

const truncate = (value: string, max = 112) => {
  const clean = value.trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
};

const getMoreItems = (config: MegaMenuConfig) => {
  const featuredSlugs = new Set((config.featured ?? []).map(item => item.slug));
  return config.sections.flatMap(section => section.items).filter(item => !featuredSlugs.has(item.slug));
};

const getIndexItem = (config: MegaMenuConfig) => {
  const candidates = config.sections.flatMap(section => section.items);
  return candidates.find(item => item.entityType === 'Page' && /^(services|brands|problems|pricing|blog|news|guides)$/.test(item.slug)) ?? null;
};

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
  const phoneDigits = NAV_GRAPH.business!.telephone.replace(/\D/g, '');
  const phoneDisplay = phoneDigits.startsWith('965') ? `+965 ${phoneDigits.slice(3)}` : `+${phoneDigits}`;
  const meta = getMeta(config.id);
  const moreItems = getMoreItems(config);
  const indexItem = getIndexItem(config);
  const allHref = indexItem ? getEntityHref(indexItem) : meta.allHref;
  const allLabel = indexItem ? meta.allLabel : meta.allLabel;
  const isServiceMenu = config.id === 'services_mega';
  const isServiceAreaMenu = config.id === 'locations_mega';
  const panelWidth = isServiceMenu ? 940 : isServiceAreaMenu ? 1100 : 1040;

  const getClampedLeft = () => {
    if (typeof window === 'undefined') return '50%';
    const safePadding = 20;
    const minLeft = panelWidth / 2 + safePadding;
    const maxLeft = window.innerWidth - panelWidth / 2 - safePadding;
    const clamped = Math.max(minLeft, Math.min(panelLeft || window.innerWidth / 2, maxLeft));
    return `${clamped}px`;
  };

  const prefetchRoute = (slug: string) => {
    if (typeof document === 'undefined') return;
    const existing = document.head.querySelector(`link[rel="prefetch"][href="/${slug}"]`);
    if (existing) return;
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
      focusable[nextIndex]?.focus();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const previousIndex = activeIndex > 0 ? activeIndex - 1 : focusable.length - 1;
      focusable[previousIndex]?.focus();
    }
  }, [config.id, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isOpen]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const trigger = document.querySelector<HTMLElement>(`[aria-controls="mega-menu-${config.id}"]`);
    if (document.activeElement === trigger) {
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();
      });
    }
  }, [config.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const trigger = document.querySelector<HTMLElement>(`[aria-controls="mega-menu-${config.id}"]`);
      if (!panelRef.current?.contains(target) && !trigger?.contains(target)) onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [config.id, isOpen, onClose]);


  if (isServiceMenu) {
    type MatrixItem = { slug: string; label: string; icon: React.ElementType };
    type MatrixGroup = { id: string; title: string; intro: string; icon: React.ElementType; items: MatrixItem[]; callout: string };
    const repairs: MatrixItem[] = [
      { slug: 'macbook-repair-kuwait', label: 'MacBook Repair', icon: Apple },
      { slug: 'laptop-repair-kuwait', label: 'Laptop Repair', icon: Laptop },
      { slug: 'gaming-pc-repair-kuwait', label: 'Gaming PC Repair', icon: Gamepad2 },
      { slug: 'motherboard-repair-kuwait', label: 'Motherboard Micro-soldering', icon: Cpu },
      { slug: 'laptop-screen-repair-kuwait', label: 'Screen Replacement', icon: Monitor },
    ];
    const symptoms: MatrixItem[] = [
      { slug: 'laptop-wont-turn-on', label: 'No Power', icon: Power },
      { slug: 'laptop-overheating-kuwait', label: 'Overheating', icon: Thermometer },
      { slug: 'spilled-water-on-laptop', label: 'Liquid Damage', icon: Droplets },
      { slug: 'laptop-hinge-broken', label: 'Broken Hinge', icon: Wrench },
      { slug: 'laptop-keyboard-not-working', label: 'Keyboard Failure', icon: Keyboard },
    ];
    const upgradesAndCare: MatrixItem[] = [
      { slug: 'ssd-ram-upgrade-kuwait', label: 'SSD & RAM Upgrades', icon: HardDrive },
      { slug: 'gaming-laptop-cleaning-kuwait', label: 'Thermal Clean & Repaste', icon: Gauge },
      { slug: 'battery-replacement-kuwait', label: 'Laptop Battery Replacement', icon: BatteryWarning },
    ];
    const groups: MatrixGroup[] = [
      { id: 'repairs', title: 'Repairs', intro: 'Choose a device or hardware repair.', icon: Wrench, items: repairs, callout: 'Component-level lab restoration from 15 KWD.' },
      { id: 'symptoms', title: 'Symptoms', intro: 'Start with what your computer is doing.', icon: Search, items: symptoms, callout: 'Quote confirmed before any tool touches the board.' },
      { id: 'upgrades-care', title: 'Upgrades & Care', intro: 'Improve speed, battery life and cooling.', icon: Gauge, items: upgradesAndCare, callout: 'Practical upgrades and cooling care for Kuwait’s climate.' },
    ];
    const getItemDescription = (slug: string) => {
      const entity =
        (NAV_GRAPH.services || []).find(item => item.slug === slug) ??
        (NAV_GRAPH.problems || []).find(item => item.slug === slug);
      return truncate(entity?.description || 'Explore this repair option with KCROC.', 58);
    };

    return (
      <div
        ref={panelRef}
        id={`mega-menu-${config.id}`}
        role="region"
        aria-label="Repairs, symptoms, upgrades and care"
        aria-hidden={!isOpen}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: 'fixed',
          top: '78px',
          left: getClampedLeft(),
          transform: 'translateX(-50%)',
          width: `min(${panelWidth}px, calc(100vw - 32px))`,
          maxHeight: 'calc(100vh - 90px)',
          zIndex: 9999,
        }}
        className={`kcroc-mega-menu-scroll max-h-full overflow-x-hidden overflow-y-auto overscroll-contain transition-all duration-200 motion-reduce:transition-none origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.985] pointer-events-none'}`}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
            <div className="min-w-0">
              <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">KCROC SERVICE FINDER · KUWAIT</p>
              <h2 className="m-0 text-xl font-extrabold tracking-tight text-slate-900 lg:text-2xl">Repair by service or symptom</h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-5 text-slate-600">Choose the problem you recognize or the repair you need. We confirm the quote before repair work begins.</p>
            </div>
            <Link
              to="/services"
              onMouseEnter={() => prefetchRoute('services')}
              onClick={() => {
                trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
                onClose();
              }}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:p-4">
            {groups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <section key={group.id} aria-labelledby={`service-menu-${group.id}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
                  <div className="mb-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <GroupIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 id={`service-menu-${group.id}`} className="m-0 text-sm font-extrabold text-slate-900">{group.title}</h3>
                        <p className="mt-0.5 text-xs leading-4 text-slate-600">{group.intro}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {group.items.map(({ slug, label, icon: ItemIcon }) => (
                      <Link
                        key={slug}
                        to={`/${slug}`}
                        tabIndex={isOpen ? 0 : -1}
                        onMouseEnter={() => prefetchRoute(slug)}
                        onClick={() => {
                          trackConversion('cta_click', { cta_name: 'service_matrix_link', button_position: 'header' });
                          onClose();
                        }}
                        className="group flex min-h-12 items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                          <ItemIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold leading-4 text-slate-800 group-hover:text-blue-700">{label}</span>
                          <span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{getItemDescription(slug)}</span>
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                  <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs font-semibold leading-5 text-blue-800">{group.callout}</p>
                </section>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 bg-slate-50 px-4 py-3.5 lg:px-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Free Pickup & Return</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"><ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />30-Day Complete Warranty</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />No Fix, No Fee Policy</span>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <a href={`tel:+${NAV_GRAPH.business!.telephone}`} onClick={() => trackConversion('phone_call_click', { cta_name: 'mega_menu_phone', button_position: 'header' })} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-bold text-slate-700 hover:bg-white hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <Phone className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />{phoneDisplay}
              </a>
              <Link to="/book" onClick={() => { trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' }); onClose(); }} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                Book Free Pickup <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!config) return null;

  return (
    <div
      ref={panelRef}
      id={`mega-menu-${config.id}`}
      aria-label={config.title}
      aria-hidden={!isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '78px',
        left: getClampedLeft(),
        transform: 'translateX(-50%)',
        width: `min(${panelWidth}px, calc(100vw - 32px))`,
        maxHeight: 'calc(100vh - 90px)',
        zIndex: 9999,
      }}
      className={`kcroc-mega-menu-scroll max-h-full overflow-x-hidden overflow-y-auto overscroll-contain transition-all duration-200 motion-reduce:transition-none origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.985] pointer-events-none'}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-slate-100/70 blur-3xl" />

        <div className="relative border-b border-slate-200 px-5 py-4 lg:px-6 lg:py-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 max-w-3xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">{meta.eyebrow}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-700">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Precision repair
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="!m-0 !text-2xl font-black tracking-[-0.035em] text-slate-900 lg:!text-[28px]">{config.title}</h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{meta.subtitle}</p>
            </div>

            <Link
              to={allHref}
              onMouseEnter={() => prefetchRoute(allHref.replace(/^\//, ''))}
              onClick={() => {
                trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
                onClose();
              }}
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-800 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {allLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {isServiceAreaMenu ? (
          <div className="relative grid min-h-0 grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
            <section className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r lg:p-6" aria-labelledby={`${config.id}-featured`}>
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <p id={`${config.id}-featured`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{meta.featureLabel}</p>
                  <p className="mt-1 text-xs text-slate-400">{config.id === 'locations_mega' ? 'Popular areas first, then every service area in one clean index.' : 'Quick paths to understand KCROC and the service model.'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(config.featured ?? []).map((entity) => {
                  const Icon = getIcon(entity.iconKey);
                  return (
                    <Link
                      key={entity.slug}
                      to={getEntityHref(entity)}
                     
                      tabIndex={isOpen ? 0 : -1}
                      onMouseEnter={() => prefetchRoute(entity.slug)}
                      onClick={() => {
                        trackConversion('cta_click', { cta_name: 'mega_menu_card', button_position: 'header' });
                        onClose();
                      }}
                      className="group flex min-h-[100px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-[transform,border-color,background-color] hover:-translate-y-px hover:border-blue-200 hover:bg-blue-50/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-100">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="pr-2 text-sm font-bold leading-5 text-slate-800 transition-colors group-hover:text-blue-700">{entity.title}</p>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{truncate(entity.description, 94)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="min-h-0 bg-slate-50/70 p-5 lg:p-6" aria-labelledby={`${config.id}-areas`}>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p id={`${config.id}-areas`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{config.sections[0]?.title ?? 'Service areas'}</p>
                  <p className="mt-1 text-xs text-slate-600">Pickup and delivery coverage across Kuwait.</p>
                </div>
                <MapPin className="h-4 w-4 text-blue-700" aria-hidden="true" />
              </div>
              <div className="grid max-h-[350px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                {(config.sections[0]?.items ?? []).map((entity) => (
                  <Link
                    key={entity.slug}
                    to={getEntityHref(entity)}
                   
                    tabIndex={isOpen ? 0 : -1}
                    onMouseEnter={() => prefetchRoute(entity.slug)}
                    onClick={() => {
                      trackConversion('cta_click', { cta_name: 'mega_menu_area', button_position: 'header' });
                      onClose();
                    }}
                    className="group flex min-h-11 items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-200 hover:bg-white hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <span className="truncate">{entity.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="relative max-h-[calc(100vh-280px)] overflow-y-auto p-4 lg:p-5">
            {config.featured?.length ? (
              <section aria-labelledby={`${config.id}-featured`}>
                <div className="mb-3 flex items-end justify-between gap-3 px-1">
                  <div>
                    <p id={`${config.id}-featured`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{meta.featureLabel}</p>
                    <p className="mt-1 text-xs text-slate-600">Quick paths for visitors who already know what they need.</p>
                  </div>
                  <span className="hidden text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 md:block">{config.featured.length} highlighted</span>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {config.featured.map((entity) => {
                    const Icon = getIcon(entity.iconKey);
                    return (
                      <Link
                        key={entity.slug}
                        to={getEntityHref(entity)}
                       
                        tabIndex={isOpen ? 0 : -1}
                        onMouseEnter={() => prefetchRoute(entity.slug)}
                        onClick={() => {
                          trackConversion('cta_click', { cta_name: 'mega_menu_featured', button_position: 'header' });
                          onClose();
                        }}
                        className="group flex min-h-[104px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-[transform,border-color,background-color] hover:-translate-y-px hover:border-blue-200 hover:bg-blue-50/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-100">
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="pr-2 text-sm font-bold leading-5 text-slate-800 transition-colors group-hover:text-blue-700">{entity.title}</p>
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-600">{truncate(entity.description, 110)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {moreItems.length ? (
              <section className="mt-6 border-t border-slate-200 pt-5" aria-labelledby={`${config.id}-more`}>
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                  <div>
                    <p id={`${config.id}-more`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Explore more</p>
                    <p className="mt-1 text-xs text-slate-600">All the other pages in this section, in one compact index.</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{moreItems.length} links</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {moreItems.map((entity) => {
                    const Icon = getIcon(entity.iconKey);
                    const isIndex = entity.slug === meta.allHref.replace(/^\//, '');
                    return (
                      <Link
                        key={entity.slug}
                        to={getEntityHref(entity)}
                        tabIndex={isOpen ? 0 : -1}
                        onMouseEnter={() => prefetchRoute(entity.slug)}
                        onClick={() => {
                          trackConversion('cta_click', { cta_name: isIndex ? 'mega_menu_index' : 'mega_menu_link', button_position: 'header' });
                          onClose();
                        }}
                        className={`group flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${isIndex ? 'border border-blue-100 bg-blue-50 text-blue-800 hover:border-blue-200 hover:bg-blue-100' : 'border border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-blue-700'}`}
                      >
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isIndex ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-700'}`} aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{entity.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        )}

        <div className="relative flex flex-col gap-2.5 border-t border-slate-200 bg-slate-50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between lg:px-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Not sure which option fits?</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-600">Send the model + symptom and a technician can point you to the right page.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${NAV_GRAPH.business!.telephone}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackConversion('cta_click', { cta_name: 'mega_menu_whatsapp', button_position: 'header' })}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-black text-[#062b16] transition-all hover:brightness-105 hover:shadow-[0_0_24px_rgba(37,211,102,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            WhatsApp a technician
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
