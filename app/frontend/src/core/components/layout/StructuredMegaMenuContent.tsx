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
  Droplets,
  Gamepad2,
  Gauge,
  HardDrive,
  Keyboard,
  Laptop,
  Monitor,
  Newspaper,
  Phone,
  Power,
  Search,
  ShieldCheck,
  Thermometer,
  Wrench,
} from 'lucide-react';
import { MegaMenuConfig, NavEntity } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import { NAV_GRAPH } from '../../../data/navGraph.generated';

/** Reusable, strictly typed structure for the four targeted desktop dropdowns. */
export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

export interface MenuColumn {
  header: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  };
  items: MenuItem[];
  bottomBannerText: string;
}

export interface MegamenuConfig {
  kicker: string;
  heading: string;
  subheading: string;
  viewAllLabel: string;
  viewAllHref: string;
  columns: [MenuColumn, MenuColumn, MenuColumn];
}

export interface StructuredMenuMeta {
  eyebrow: string;
  subtitle: string;
  allLabel: string;
  allHref: string;
  featureLabel: string;
}

type SupportedMenuId = 'problems_mega' | 'pricing_mega' | 'blog_mega' | 'guides_mega';

interface ColumnDefinition {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
  bottomBannerText: string;
}

const COLUMN_DEFINITIONS: Record<SupportedMenuId, [ColumnDefinition, ColumnDefinition, ColumnDefinition]> = {
  problems_mega: [
    {
      title: 'Power & Startup',
      description: 'Power, charging, boot and shutdown symptoms.',
      icon: Power,
      keywords: ['power', 'turn on', 'wont', "won't", 'boot', 'startup', 'start-up', 'charge', 'battery', 'shutdown', 'restart', 'no display'],
      bottomBannerText: 'Start with the symptom. We will help identify the next safe step.',
    },
    {
      title: 'Heat & Performance',
      description: 'Overheating, slowdowns and stability issues.',
      icon: Thermometer,
      keywords: ['overheat', 'overheating', 'heat', 'hot', 'temperature', 'thermal', 'fan', 'slow', 'freeze', 'lag', 'crash', 'performance', 'noise'],
      bottomBannerText: 'Stop repeated overheating or shutdowns before they cause more damage.',
    },
    {
      title: 'Displays & Hardware',
      description: 'Screens, input devices, liquid damage and components.',
      icon: Monitor,
      keywords: ['screen', 'display', 'keyboard', 'hinge', 'liquid', 'water', 'motherboard', 'usb', 'audio', 'wifi', 'wireless', 'port', 'touchpad', 'trackpad', 'camera', 'damage', 'graphics'],
      bottomBannerText: 'Component-level diagnostics help avoid unnecessary part replacement.',
    },
  ],
  pricing_mega: [
    {
      title: 'Diagnostics & Software',
      description: 'Understand diagnostic and system-service starting points.',
      icon: Search,
      keywords: ['diagnostic', 'system setup', 'software', 'windows', 'malware', 'bios', 'recovery', 'setup'],
      bottomBannerText: 'Diagnostics come first, with the repair quote confirmed before work.',
    },
    {
      title: 'Hardware & Components',
      description: 'Typical labor ranges for physical and board-level repairs.',
      icon: Cpu,
      keywords: ['hardware', 'replacement', 'battery', 'keyboard', 'screen', 'chassis', 'board', 'motherboard', 'liquid', 'macbook', 'component'],
      bottomBannerText: 'The exact model, parts and fault determine the final quote.',
    },
    {
      title: 'Cooling & Performance',
      description: 'Cleaning, thermal maintenance and performance tuning.',
      icon: Gauge,
      keywords: ['thermal', 'performance', 'cleaning', 'clean', 'fan', 'cooling', 'tuning', 'temperature'],
      bottomBannerText: 'Review the relevant starting point before arranging a pickup.',
    },
  ],
  blog_mega: [
    {
      title: 'Featured Articles',
      description: 'Hand-picked explanations and practical KCROC advice.',
      icon: BookOpen,
      keywords: [],
      bottomBannerText: 'Clear, technician-informed advice for everyday computer decisions.',
    },
    {
      title: 'Buying & Upgrade Advice',
      description: 'Compare devices, components and useful upgrades.',
      icon: HardDrive,
      keywords: ['buy', 'buying', 'buyer', 'upgrade', 'ssd', 'ram', 'comparison', 'versus', ' vs ', 'best', 'budget', 'choose', 'choice', 'storage', 'memory'],
      bottomBannerText: 'Make better hardware choices with practical guidance, not guesswork.',
    },
    {
      title: 'Performance & Tech',
      description: 'Windows, gaming, temperatures and day-to-day tech issues.',
      icon: Laptop,
      keywords: ['windows', 'gaming', 'slow', 'temperature', 'hot', 'overheat', 'security', 'ai', 'hardware', 'battery', 'performance', 'error', 'update', 'repair'],
      bottomBannerText: 'Learn what matters, what to check and when to get expert help.',
    },
  ],
  guides_mega: [
    {
      title: 'Power & Startup',
      description: 'Boot problems, power faults, BIOS and battery warnings.',
      icon: Power,
      keywords: ['power', 'turn on', 'boot', 'bios', 'uefi', 'battery', 'charge', 'startup', 'start-up', 'no power'],
      bottomBannerText: 'Begin with a safe, symptom-first troubleshooting checklist.',
    },
    {
      title: 'Cooling & Hardware',
      description: 'Heat, fans, laptop hardware and component warning signs.',
      icon: Thermometer,
      keywords: ['hot', 'heat', 'overheat', 'temperature', 'fan', 'cooling', 'hardware', 'battery warning', 'dell', 'screen', 'liquid', 'hinge', 'keyboard'],
      bottomBannerText: 'Know which checks are safe at home and which need a technician.',
    },
    {
      title: 'Windows & Performance',
      description: 'Windows settings, crashes, services and performance fixes.',
      icon: Monitor,
      keywords: ['windows', 'setting', 'services', 'gamebar', 'crash', 'performance', 'error', 'slow', 'blue screen', 'update', 'optimization', 'optimisation', 'support'],
      bottomBannerText: 'Follow a structured guide before trying risky system changes.',
    },
  ],
};

const ITEM_ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
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
  'map-pin': Monitor,
  gaming2: Gamepad2,
};

const getItemIcon = (key: string) => ITEM_ICON_REGISTRY[key] ?? Wrench;

const ROOT_SLUGS: Record<SupportedMenuId, string> = {
  problems_mega: 'problems',
  pricing_mega: 'pricing',
  blog_mega: 'blog',
  guides_mega: 'guides',
};

const truncate = (value: string, max = 112) => {
  const clean = (value || '').trim();
  return clean.length <= max ? clean : clean.slice(0, max - 1).trimEnd() + '…';
};

const getEntities = (config: MegaMenuConfig, rootSlug: string): NavEntity[] => {
  const seen = new Set<string>();
  return [...(config.featured ?? []), ...config.sections.flatMap((section) => section.items)]
    .filter((entity) => {
      // The top-right View All action already provides the index-page path.
      if (entity.slug.replace(/^\/+|\/+$/g, '') === rootSlug) return false;
      if (seen.has(entity.id)) return false;
      seen.add(entity.id);
      return true;
    });
};

const makeStructuredConfig = (
  config: MegaMenuConfig,
  meta: StructuredMenuMeta,
): MegamenuConfig => {
  const menuId = config.id as SupportedMenuId;
  const definitions = COLUMN_DEFINITIONS[menuId];
  const rootSlug = ROOT_SLUGS[menuId];
  const entities = getEntities(config, rootSlug);
  const featuredIds = new Set((config.featured ?? []).map((entity) => entity.id));
  const assigned: NavEntity[][] = [[], [], []];

  entities.forEach((entity) => {
    const text = (entity.title + ' ' + entity.description + ' ' + entity.slug).toLowerCase();
    const scores = definitions.map((definition) =>
      definition.keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0),
    );

    let targetIndex: number;
    // Keep Blog's curated articles together in the first column. Other content
    // is classified by topic and falls back to the shortest column.
    if (menuId === 'blog_mega' && featuredIds.has(entity.id)) {
      targetIndex = 0;
    } else {
      const highestScore = Math.max(...scores);
      targetIndex = highestScore > 0
        ? scores.indexOf(highestScore)
        : assigned.map((items) => items.length).indexOf(Math.min(...assigned.map((items) => items.length)));
    }
    assigned[targetIndex].push(entity);
  });

  const makeColumn = (definition: ColumnDefinition, index: number): MenuColumn => ({
    header: {
      icon: definition.icon,
      title: definition.title,
      description: definition.description,
    },
    items: assigned[index].map((entity) => ({
      icon: getItemIcon(entity.iconKey),
      title: entity.title,
      description: truncate(entity.description, 100),
      href: entity.slug.startsWith('/') ? entity.slug : '/' + entity.slug,
    })),
    bottomBannerText: definition.bottomBannerText,
  });
  const columns: [MenuColumn, MenuColumn, MenuColumn] = [
    makeColumn(definitions[0], 0),
    makeColumn(definitions[1], 1),
    makeColumn(definitions[2], 2),
  ];

  return {
    kicker: meta.eyebrow,
    heading: config.title,
    subheading: meta.subtitle,
    viewAllLabel: meta.allLabel,
    viewAllHref: meta.allHref,
    columns,
  };
};

interface Props {
  config: MegaMenuConfig;
  meta: StructuredMenuMeta;
  isOpen: boolean;
  onClose: () => void;
}

export default function StructuredMegaMenuContent({ config, meta, isOpen, onClose }: Props) {
  const { trackConversion } = useAnalytics();
  const phoneDigits = NAV_GRAPH.business!.telephone.replace(/\D/g, '');
  const phoneDisplay = phoneDigits.startsWith('965') ? '+965 ' + phoneDigits.slice(3) : '+' + phoneDigits;
  const structuredConfig = useMemo(
    () => makeStructuredConfig(config, meta),
    [config, meta],
  );

  const prefetchRoute = (href: string) => {
    if (typeof document === 'undefined') return;
    const route = href.startsWith('/') ? href : '/' + href;
    const existing = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]'))
      .some((link) => link.getAttribute('href') === route);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 md:flex-row md:items-start md:justify-between lg:px-7 lg:py-6">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">{structuredConfig.kicker}</p>
          <h2 className="m-0 text-2xl font-extrabold tracking-tight text-slate-900">{structuredConfig.heading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{structuredConfig.subheading}</p>
        </div>
        <Link
          to={structuredConfig.viewAllHref}
          tabIndex={isOpen ? 0 : -1}
          onMouseEnter={() => prefetchRoute(structuredConfig.viewAllHref)}
          onClick={() => {
            trackConversion('cta_click', { cta_name: 'mega_menu_view_all', button_position: 'header' });
            onClose();
          }}
          className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {structuredConfig.viewAllLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:gap-5 lg:gap-6 lg:p-6">
        {structuredConfig.columns.map((column, columnIndex) => {
          const HeaderIcon = column.header.icon;
          return (
            <section
              key={column.header.title}
              aria-labelledby={config.id + '-column-' + columnIndex}
              className="flex min-w-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4"
            >
              <div>
                <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <HeaderIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 id={config.id + '-column-' + columnIndex} className="m-0 text-base font-bold text-slate-900">{column.header.title}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{column.header.description}</p>
                  </div>
                </div>

                <div className="max-h-[420px] space-y-1 overflow-y-auto pr-1">
                  {column.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.href + '-' + item.title + '-' + itemIndex}
                        to={item.href}
                        tabIndex={isOpen ? 0 : -1}
                        onMouseEnter={() => prefetchRoute(item.href)}
                        onClick={() => {
                          trackConversion('cta_click', { cta_name: 'mega_menu_structured_link', button_position: 'header' });
                          onClose();
                        }}
                        className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-xl p-2.5 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <ItemIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-slate-900 transition group-hover:text-blue-600">{item.title}</span>
                          <span className="line-clamp-1 block text-xs text-slate-500">{item.description}</span>
                        </span>
                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    );
                  })}
                  {column.items.length === 0 && (
                    <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Open the full section to explore all available options.</p>
                  )}
                </div>
              </div>
              <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs font-semibold leading-5 text-blue-900">{column.bottomBannerText}</p>
            </section>
          );
        })}
      </div>

      <div className="mt-0 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-5 py-5 lg:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Free Pickup & Return
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />30-Day Complete Warranty
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />No Fix, No Fee Policy
          </span>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <a
            href={'tel:+' + phoneDigits}
            onClick={() => trackConversion('phone_call_click', { cta_name: 'mega_menu_phone', button_position: 'header' })}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />{phoneDisplay}
          </a>
          <Link
            to="/book"
            onClick={() => {
              trackConversion('cta_click', { cta_name: 'header_book', button_position: 'header' });
              onClose();
            }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Book Free Pickup <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
