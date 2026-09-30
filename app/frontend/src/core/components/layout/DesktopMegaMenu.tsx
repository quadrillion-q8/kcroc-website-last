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
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Sparkles,
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
  case_studies_mega: {
    eyebrow: 'REAL REPAIR STORIES',
    subtitle: 'See how difficult laptop and computer faults are diagnosed, repaired and verified in the lab.',
    allLabel: 'View all case studies',
    allHref: '/case-studies',
    featureLabel: 'Featured repairs',
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
  guides_mega: {
    eyebrow: 'TROUBLESHOOTING GUIDES',
    subtitle: 'Symptom-first guides for diagnosing common laptop and computer problems before you decide what to do next.',
    allLabel: 'Browse all guides',
    allHref: '/guides',
    featureLabel: 'Start with a popular guide',
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
  return candidates.find(item => item.entityType === 'Page' && /^(services|brands|problems|case-studies|pricing|blog|guides)$/.test(item.slug)) ?? null;
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
  const meta = getMeta(config.id);
  const moreItems = getMoreItems(config);
  const indexItem = getIndexItem(config);
  const allHref = indexItem ? getEntityHref(indexItem) : meta.allHref;
  const allLabel = indexItem ? meta.allLabel : meta.allLabel;
  const isAboutMenu = config.id === 'about_mega';
  const panelWidth = isAboutMenu ? 1140 : 1160;

  const getClampedLeft = () => {
    if (typeof window === 'undefined') return '50%';
    const safePadding = 18;
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
        top: '72px',
        left: getClampedLeft(),
        transform: 'translateX(-50%)',
        width: `min(${panelWidth}px, calc(100vw - 28px))`,
        maxHeight: 'calc(100vh - 90px)',
        zIndex: 9999,
      }}
      className={`max-h-full overflow-hidden transition-all duration-200 motion-reduce:transition-none origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.985] pointer-events-none'}`}
    >
      <div className="relative overflow-hidden rounded-[26px] border border-white/[0.11] bg-[#0e1416]/[0.985] shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#c9804d]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#22c7dc]/[0.045] blur-3xl" />

        <div className="relative border-b border-white/[0.08] px-6 py-5 lg:px-7 lg:py-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 max-w-3xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="kcroc-kicker">{meta.eyebrow}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9804d]/20 bg-[#c9804d]/[0.07] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#efc19c]">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Precision repair
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="!m-0 !text-2xl font-black tracking-[-0.035em] text-white lg:!text-[30px]">{config.title}</h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{meta.subtitle}</p>
            </div>

            <Link
              to={allHref}
              onMouseEnter={() => prefetchRoute(allHref.replace(/^\//, ''))}
              onClick={() => {
                trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
                onClose();
              }}
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#c9804d]/35 bg-[#c9804d]/10 px-4 py-2.5 text-sm font-extrabold text-[#efc19c] transition-all hover:border-[#c9804d]/55 hover:bg-[#c9804d]/16 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
            >
              {allLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {isAboutMenu ? (
          <div className="relative grid min-h-0 grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
            <section className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r lg:p-6" aria-labelledby={`${config.id}-featured`}>
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <p id={`${config.id}-featured`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{meta.featureLabel}</p>
                  <p className="mt-1 text-xs text-slate-500">Everything you need to understand the workshop.</p>
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
                      className="group flex min-h-[108px] items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:-translate-y-0.5 hover:border-[#c9804d]/30 hover:bg-[#c9804d]/[0.055] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c9804d]/25 bg-[#c9804d]/10 text-[#dfa86f] transition-colors group-hover:border-[#c9804d]/45 group-hover:bg-[#c9804d]/15">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="pr-2 text-sm font-bold leading-5 text-white transition-colors group-hover:text-[#efc19c]">{entity.title}</p>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-[#dfa86f]" aria-hidden="true" />
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{truncate(entity.description, 94)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="min-h-0 bg-white/[0.012] p-5 lg:p-6" aria-labelledby={`${config.id}-areas`}>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p id={`${config.id}-areas`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{config.sections[0]?.title ?? 'Service areas'}</p>
                  <p className="mt-1 text-xs text-slate-500">Pickup and delivery coverage across Kuwait.</p>
                </div>
                <MapPin className="h-4 w-4 text-[#dfa86f]" aria-hidden="true" />
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
                    className="group flex min-h-11 items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400 transition-colors hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                  >
                    <span className="truncate">{entity.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-[#dfa86f]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="relative max-h-[calc(100vh-280px)] overflow-y-auto p-5 lg:p-6">
            {config.featured?.length ? (
              <section aria-labelledby={`${config.id}-featured`}>
                <div className="mb-3 flex items-end justify-between gap-3 px-1">
                  <div>
                    <p id={`${config.id}-featured`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{meta.featureLabel}</p>
                    <p className="mt-1 text-xs text-slate-500">Quick paths for visitors who already know what they need.</p>
                  </div>
                  <span className="hidden text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600 md:block">{config.featured.length} highlighted</span>
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
                        className="group flex min-h-[112px] items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:-translate-y-0.5 hover:border-[#c9804d]/30 hover:bg-[#c9804d]/[0.055] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                      >
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c9804d]/25 bg-[#c9804d]/10 text-[#dfa86f] transition-colors group-hover:border-[#c9804d]/45 group-hover:bg-[#c9804d]/15">
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="pr-2 text-sm font-bold leading-5 text-white transition-colors group-hover:text-[#efc19c]">{entity.title}</p>
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-[#dfa86f]" aria-hidden="true" />
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">{truncate(entity.description, 110)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {moreItems.length ? (
              <section className="mt-6 border-t border-white/[0.07] pt-5" aria-labelledby={`${config.id}-more`}>
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                  <div>
                    <p id={`${config.id}-more`} className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Explore more</p>
                    <p className="mt-1 text-xs text-slate-500">All the other pages in this section, in one compact index.</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">{moreItems.length} links</span>
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
                        className={`group flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${isIndex ? 'border border-[#c9804d]/20 bg-[#c9804d]/[0.05] text-[#efc19c] hover:border-[#c9804d]/35 hover:bg-[#c9804d]/10' : 'border border-transparent text-slate-400 hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-white'}`}
                      >
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isIndex ? 'text-[#dfa86f]' : 'text-slate-600 group-hover:text-[#dfa86f]'}`} aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{entity.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-[#dfa86f]" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        )}

        <div className="relative flex flex-col gap-3 border-t border-white/[0.08] bg-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9804d]/25 bg-[#c9804d]/10 text-[#dfa86f]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Not sure which option fits?</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">Send the model + symptom and a technician can point you to the right page.</p>
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
