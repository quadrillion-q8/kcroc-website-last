// File: app/frontend/src/core/navigation/NavigationCompiler.ts
//
// 🚀 PERF: Reads from the generated NAV_GRAPH (src/data/navGraph.generated.ts)
// instead of the full KCROC_GRAPH. NAV_GRAPH is a ~15KB slim projection of
// graph.ts containing only the fields the nav menus need — regenerated
// automatically from graph.ts by scripts/generate-nav-data.ts before every
// dev/build. Header and Footer render on every route, so keeping the full
// ~190KB graph (services, FAQs, blog posts, every location page's SEO copy,
// etc.) out of their import chain matters: it's the difference between one
// small nav dataset shipping on every page vs. the entire content graph.
import { NAV_GRAPH } from '../../data/navGraph.generated';
import { CompiledNavigationModel, NavEntity, MegaMenuConfig } from './types';

interface NavSourceEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconKey: string;
  popular: boolean;
  noFixNoFee: boolean;
  hasManyFeatures: boolean;
  hasPricing: boolean;
}

export class NavigationCompiler {
  private static calculateEntityWeight(entity: NavSourceEntity): number {
    let weight = 0;
    if (entity.popular) weight += 50;
    if (entity.noFixNoFee) weight += 20;
    if (entity.hasManyFeatures) weight += 10;
    return weight;
  }

  private static compileNavEntity(entity: NavSourceEntity, type: 'Service' | 'Brand' | 'Problem' | 'Page', defaultIcon = 'laptop'): NavEntity {
    return {
      id: entity.id || entity.slug,
      slug: entity.slug,
      entityType: type as any,
      primaryKeyword: entity.title?.toLowerCase() || '',
      title: entity.title || 'Unknown',
      description: entity.description || '',
      iconKey: entity.iconKey || defaultIcon,
      weight: this.calculateEntityWeight(entity),
      commercialIntent: entity.hasPricing ? 'high' : 'informational',
    };
  }

  // 1. Services Mega Menu
  private static compileServicesMegaMenu(): MegaMenuConfig {
    const allServices = (NAV_GRAPH.services || []).map(s => this.compileNavEntity(s, 'Service', 'wrench'));
    const sorted = [...allServices].sort((a, b) => b.weight - a.weight);

    // 🩹 FIX: The "/services" index page exists (see App.tsx) but was never
    // linked from its own mega menu — every item pointed at an individual
    // service, so there was no way to reach the index from the dropdown.
    const servicesIndex: NavEntity = {
      id: 'services_index',
      slug: 'services',
      entityType: 'Page' as any,
      primaryKeyword: 'services',
      title: `All Services (${allServices.length})`,
      description: 'Browse every repair service we offer',
      iconKey: 'wrench',
      weight: 100,
      commercialIntent: 'info',
    };

    return {
      id: 'services_mega',
      title: 'Repair Services',
      // 🎨 CONSISTENCY FIX: match the Guides menu's treatment — fill the
      // full 2-row card grid (top 6 by weight) instead of only 3 cards
      // plus a crowded row of leftover pill-links.
      featured: sorted.slice(0, 6),
      sections: [{ title: `More Services (${Math.max(0, sorted.length - 6)})`, items: [servicesIndex, ...sorted.slice(6)] }]
    };
  }

  // 2. Brands Mega Menu
  private static compileBrandsMegaMenu(): MegaMenuConfig {
    const allBrands = (NAV_GRAPH.brands || []).map(b => this.compileNavEntity(b, 'Brand', 'cpu'));

    // 🩹 FIX: paired with a new "/brands" index page + route (see App.tsx /
    // pages/BrandsIndex.tsx) — previously there was no index page at all,
    // so "/brands" 404'd and no dropdown item linked anywhere but individual
    // brand pages.
    const brandsIndex: NavEntity = {
      id: 'brands_index',
      slug: 'brands',
      entityType: 'Page' as any,
      primaryKeyword: 'brands',
      title: `All Brands (${allBrands.length})`,
      description: 'Every laptop brand we repair',
      iconKey: 'cpu',
      weight: 100,
      commercialIntent: 'info',
    };

    return {
      id: 'brands_mega',
      title: 'Supported Brands',
      // 🎨 CONSISTENCY FIX: all 6 brands now get the Guides-style card
      // treatment, with just the index link tucked below.
      featured: allBrands.slice(0, 6),
      sections: [{ title: allBrands.length > 6 ? `More Brands (${allBrands.length - 6})` : 'Browse All Brands', items: [brandsIndex, ...allBrands.slice(6)] }]
    };
  }

  // 3. Problems Mega Menu
  private static compileProblemsMegaMenu(): MegaMenuConfig {
    const allProblems = (NAV_GRAPH.problems || []).map(p => this.compileNavEntity(p, 'Problem', 'shield'));
    const sortedProblems = [...allProblems].sort((a, b) => b.weight - a.weight);

    // 🩹 FIX: paired with a new "/problems" index page + route (see App.tsx /
    // pages/ProblemsIndex.tsx) — same missing-index-page issue as Brands.
    const problemsIndex: NavEntity = {
      id: 'problems_index',
      slug: 'problems',
      entityType: 'Page' as any,
      primaryKeyword: 'problems',
      title: `All Problems (${allProblems.length})`,
      description: 'Every issue we diagnose and repair',
      iconKey: 'shield',
      weight: 100,
      commercialIntent: 'info',
    };

    return {
      id: 'problems_mega',
      title: 'Common Problems',
      // 🎨 CONSISTENCY FIX: top 6 problems by weight as cards, same as
      // Guides; the remaining 8 (14 total) sit in the "More" section as
      // compact links rather than crowding the card grid.
      featured: sortedProblems.slice(0, 6),
      sections: [{ title: `More Problems (${Math.max(0, sortedProblems.length - 6)})`, items: [problemsIndex, ...sortedProblems.slice(6)] }]
    };
  }

  // 4. Case Studies Mega Menu
  private static compileCaseStudiesMegaMenu(): MegaMenuConfig {
    const allCaseStudies = (NAV_GRAPH.caseStudies || []).map(cs => {
      const entity = this.compileNavEntity(
        { ...cs, description: cs.description ?? '', iconKey: '', popular: false, noFixNoFee: false, hasManyFeatures: false, hasPricing: false },
        'Page',
        'laptop'
      );
      // 🚀 FIXED: Prepend the required routing prefix so DesktopMegaMenu doesn't 404
      entity.slug = `case-studies/${cs.slug}`;
      return entity;
    });

    return {
      id: 'case_studies_mega',
      title: 'Real Repair Stories',
      // 🎨 CONSISTENCY FIX: same Guides-style card treatment — all 3 case
      // studies as cards (grid just renders a single row when under 6),
      // with only the index link below.
      featured: allCaseStudies.slice(0, 6),
      sections: [{
        title: 'Browse All',
        items: [
          { id: 'cs_index', slug: 'case-studies', title: `All Case Studies (${allCaseStudies.length})`, description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'cases', weight: 100, commercialIntent: 'info' },
          ...allCaseStudies.slice(6)
        ]
      }]
    };
  }

  // 5. Pricing Mega Menu — retained for backwards compatibility, but the
  // primary header now uses Pricing as a direct link so service cards do not
  // appear inside the pricing navigation.
  private static compilePricingMegaMenu(): MegaMenuConfig {
    const priceIndex: NavEntity = {
      id: 'pricing_index',
      slug: 'pricing',
      entityType: 'Page' as any,
      primaryKeyword: 'pricing',
      title: 'Full Price List',
      description: 'See repair pricing and starting points before you book.',
      iconKey: 'laptop',
      weight: 100,
      commercialIntent: 'high',
    };

    return {
      id: 'pricing_mega',
      title: 'Repair Pricing',
      featured: [priceIndex],
      sections: [],
    };
  }

  // 6. Blog Mega Menu
  private static compileBlogMegaMenu(): MegaMenuConfig {
    const toContentNavEntity = (entry: (typeof NAV_GRAPH.blogEntries)[number]): NavEntity => ({
      id: entry.id,
      slug: entry.slug,
      entityType: 'Page' as any,
      primaryKeyword: entry.primaryKeyword,
      title: entry.title,
      description: entry.description,
      iconKey: entry.iconKey || 'laptop',
      weight: 0,
      commercialIntent: 'informational',
    });

    const bySlug = new Map<string, NavEntity>(NAV_GRAPH.blogEntries.map((entry) => [entry.slug, toContentNavEntity(entry)]));
    const featuredPaths = [
      'blog/why-is-my-laptop-so-slow-2026',
      'blog/laptop-buying-guide-kuwait-2026',
      'blog/intel-core-ultra-vs-amd-ryzen-ai',
      'blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures',
      'blog/why-8gb-ram-is-no-longer-enough-for-windows-11',
      'blog/gaming-pc-mistakes-kuwait',
    ];

    const selectedFeatured = featuredPaths
      .map((path) => bySlug.get(path))
      .filter((item): item is NavEntity => Boolean(item));

    // Keep the curated cards, but backfill them from the newest entries if a
    // slug is renamed/removed. This prevents a stale hard-coded path from
    // silently shrinking the menu.
    const selectedIds = new Set(selectedFeatured.map((item) => item.id));
    const fallbackFeatured = NAV_GRAPH.blogEntries
      .map(toContentNavEntity)
      .filter((item) => !selectedIds.has(item.id))
      .slice(0, Math.max(0, 6 - selectedFeatured.length));

    const featured = [...selectedFeatured, ...fallbackFeatured];
    const featuredIds = new Set(featured.map((item) => item.id));
    const allOthers = NAV_GRAPH.blogEntries
      .map(toContentNavEntity)
      .filter((item) => !featuredIds.has(item.id));

    const blogIndex: NavEntity = {
      id: 'blog_index',
      slug: 'blog',
      title: `All Posts (${NAV_GRAPH.blogEntries.length})`,
      description: `Browse all ${NAV_GRAPH.blogEntries.length} unique KCROC blog articles`,
      iconKey: 'laptop',
      entityType: 'Page' as any,
      primaryKeyword: 'blog',
      weight: 100,
      commercialIntent: 'informational',
    };

    return {
      id: 'blog_mega',
      title: 'Blog & Updates',
      featured,
      sections: [{
        title: `More Articles (${allOthers.length})`,
        items: [blogIndex, ...allOthers],
      }],
    };
  }

  // 7. News Mega Menu
  private static compileNewsMegaMenu(): MegaMenuConfig {
    const toContentNavEntity = (entry: (typeof NAV_GRAPH.newsEntries)[number]): NavEntity => ({
      id: entry.id,
      slug: entry.slug,
      entityType: 'Page' as any,
      primaryKeyword: entry.primaryKeyword,
      title: entry.title,
      description: entry.description,
      iconKey: entry.iconKey || 'cpu',
      weight: 0,
      commercialIntent: 'informational',
    });

    const latest = NAV_GRAPH.newsEntries.map(toContentNavEntity).slice(0, 6);
    const categories: NavEntity[] = [
      { id: 'news_windows', slug: 'news?category=windows', title: 'Windows & Microsoft', description: 'Windows releases, updates, support changes and practical technician context.', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'windows news', weight: 0, commercialIntent: 'informational' },
      { id: 'news_hardware', slug: 'news?category=hardware', title: 'Hardware', description: 'CPU, GPU, SSD, RAM and component technology news explained in practical terms.', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'hardware news', weight: 0, commercialIntent: 'informational' },
      { id: 'news_gaming', slug: 'news?category=gaming', title: 'Gaming Technology', description: 'Gaming hardware, drivers, performance and platform updates.', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'gaming tech news', weight: 0, commercialIntent: 'informational' },
      { id: 'news_apple', slug: 'news?category=apple', title: 'Apple & Mac', description: 'Mac, MacBook and Apple hardware/software news with repair implications.', iconKey: 'apple', entityType: 'Page' as any, primaryKeyword: 'apple mac news', weight: 0, commercialIntent: 'informational' },
      { id: 'news_security', slug: 'news?category=cybersecurity', title: 'Cybersecurity', description: 'Security updates and device risks that matter to Windows and Mac users.', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'cybersecurity news', weight: 0, commercialIntent: 'informational' },
      { id: 'news_ai', slug: 'news?category=ai', title: 'AI & PC Technology', description: 'AI PCs, processors, software features and changes affecting everyday computers.', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'ai pc news', weight: 0, commercialIntent: 'informational' },
    ];

    const newsIndex: NavEntity = {
      id: 'news_index',
      slug: 'news',
      title: `All News (${NAV_GRAPH.newsEntries.length})`,
      description: 'Browse current KCROC technology news and technician analysis',
      iconKey: 'cpu',
      entityType: 'Page' as any,
      primaryKeyword: 'tech news',
      weight: 100,
      commercialIntent: 'informational',
    };

    return {
      id: 'news_mega',
      title: 'Tech News',
      featured: latest.length ? latest : categories,
      sections: [{
        title: latest.length ? 'News Categories' : 'News Desk',
        items: latest.length ? [newsIndex, ...categories] : [newsIndex, ...categories],
      }],
    };
  }

  // 8. Guides Mega Menu
  private static compileGuidesMegaMenu(): MegaMenuConfig {
    const toContentNavEntity = (entry: (typeof NAV_GRAPH.guideEntries)[number]): NavEntity => ({
      id: entry.id,
      slug: entry.slug,
      entityType: 'Page' as any,
      primaryKeyword: entry.primaryKeyword,
      title: entry.title,
      description: entry.description,
      iconKey: entry.iconKey || 'laptop',
      weight: 0,
      commercialIntent: 'informational',
    });

    const bySlug = new Map<string, NavEntity>(NAV_GRAPH.guideEntries.map((entry) => [entry.slug, toContentNavEntity(entry)]));
    const featuredPaths = [
      'guides/laptop-wont-turn-on',
      'guides/dell-laptop-overheating',
      'guides/why-is-my-laptop-so-hot',
      'guides/laptop-battery-warning-signs',
      'guides/bios-uefi-recovery-kuwait',
      'guides/gamebar-presence-writer-fix',
      'guides/windows-10-end-of-support',
      'guides/windows-11-background-services-audit',
      'guides/windows-11-settings-tweaks',
    ];

    const featured = featuredPaths
      .map((path) => bySlug.get(path))
      .filter((item): item is NavEntity => Boolean(item));

    const featuredIds = new Set(featured.map((item) => item.id));
    const additional = NAV_GRAPH.guideEntries
      .map(toContentNavEntity)
      .filter((item) => !featuredIds.has(item.id));

    const guidesIndex: NavEntity = {
      id: 'guides_index',
      slug: 'guides',
      title: `All Guides (${NAV_GRAPH.guideEntries.length})`,
      description: 'Browse every KCROC troubleshooting and repair guide',
      iconKey: 'laptop',
      entityType: 'Page' as any,
      primaryKeyword: 'guides',
      weight: 100,
      commercialIntent: 'informational',
    };

    return {
      id: 'guides_mega',
      title: 'DIY & Repair Guides',
      featured,
      sections: [{ title: additional.length ? `More Guides (${additional.length})` : 'Browse All Guides', items: [guidesIndex, ...additional] }],
    };
  }

  // 9. Locations Mega Menu
  private static compileLocationsMegaMenu(): MegaMenuConfig {
    const locations = (NAV_GRAPH.locations || []).map(location => ({
      id: location.id,
      slug: `location/${location.slug}`,
      entityType: 'Page' as any,
      primaryKeyword: (location.title || '').toLowerCase(),
      title: location.title === 'Hawalli Repair Center' ? 'Hawalli (Lab)' : location.title,
      description: location.description || 'Computer and laptop repair service area with free pickup and delivery across Kuwait.',
      iconKey: 'map-pin',
      weight: location.navigationPriority ?? 0,
      commercialIntent: 'transactional',
    } as NavEntity)).sort((a, b) => b.weight - a.weight);

    return {
      id: 'locations_mega',
      title: 'Service Areas',
      featured: locations.slice(0, 6),
      sections: [{
        title: `All Service Areas (${locations.length})`,
        items: [
          {
            id: 'locations_index',
            slug: 'locations',
            entityType: 'Page' as any,
            primaryKeyword: 'computer repair locations Kuwait',
            title: 'All 31 Service Areas',
            description: 'Browse every KCROC pickup and delivery service area in Kuwait.',
            iconKey: 'map-pin',
            weight: 100,
            commercialIntent: 'transactional',
          },
          ...locations,
        ],
      }],
    };
  }

  // 10. Resources Mega Menu — combines guides, blog, news and case studies
  private static compileResourcesMegaMenu(): MegaMenuConfig {
    const toContent = (entry: { id: string; slug: string; title: string; description: string; iconKey?: string; primaryKeyword?: string }): NavEntity => ({
      id: entry.id,
      slug: entry.slug,
      entityType: 'Page' as any,
      primaryKeyword: entry.primaryKeyword || entry.title.toLowerCase(),
      title: entry.title,
      description: entry.description,
      iconKey: entry.iconKey || 'laptop',
      weight: 0,
      commercialIntent: 'informational',
    });

    const guideFeatured = [
      'guides/laptop-wont-turn-on',
      'guides/why-is-my-laptop-so-hot',
      'guides/dell-laptop-overheating',
    ].map(path => NAV_GRAPH.guideEntries.find(entry => entry.slug === path)).filter(Boolean).map(toContent);
    const blogFeatured = [
      'blog/why-is-my-laptop-so-slow-2026',
      'blog/laptop-buying-guide-kuwait-2026',
    ].map(path => NAV_GRAPH.blogEntries.find(entry => entry.slug === path)).filter(Boolean).map(toContent);
    const caseFeatured = (NAV_GRAPH.caseStudies || []).slice(0, 1).map(cs => toContent({
      id: cs.id,
      slug: `case-studies/${cs.slug}`,
      title: cs.title,
      description: cs.description || '',
      iconKey: 'wrench',
      primaryKeyword: cs.title.toLowerCase(),
    }));

    const featured = [...guideFeatured, ...blogFeatured, ...caseFeatured].slice(0, 6);
    const links: NavEntity[] = [
      { id: 'resources-guides', slug: 'guides', title: 'Troubleshooting Guides', description: 'Problem-first repair and troubleshooting guides.', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'computer repair guides', weight: 80, commercialIntent: 'informational' },
      { id: 'resources-blog', slug: 'blog', title: 'Tech Blog', description: 'Practical explainers, buying guides and repair advice.', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'tech blog Kuwait', weight: 70, commercialIntent: 'informational' },
      { id: 'resources-news', slug: 'news', title: 'Tech News', description: 'Current Windows, hardware, Apple, gaming and AI news.', iconKey: 'monitor', entityType: 'Page' as any, primaryKeyword: 'tech news', weight: 60, commercialIntent: 'informational' },
      { id: 'resources-cases', slug: 'case-studies', title: 'Repair Case Studies', description: 'Real-world repairs and diagnostic outcomes from the KCROC lab.', iconKey: 'wrench', entityType: 'Page' as any, primaryKeyword: 'computer repair case studies', weight: 50, commercialIntent: 'informational' },
    ];

    return {
      id: 'resources_mega',
      title: 'Resources',
      featured,
      sections: [{ title: 'Browse Resources', items: links }],
    };
  }

  // 9. About Mega Menu
  private static compileAboutMegaMenu(): MegaMenuConfig {
    return {
      id: 'about_mega',
      title: 'Company Info',
      // 🎨 CONSISTENCY FIX: bumped from 4 to 6 featured cards (2 full rows,
      // same as Guides) by folding FAQ and Privacy & Security — previously
      // stranded in a separate "More" pill list — into the card grid.
      featured: [
        { id: 'a1', slug: 'about', title: 'About Us', description: 'Our story and the team behind KCROC', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'about', weight: 0, commercialIntent: 'info' },
        { id: 'a6', slug: 'contact', title: 'Contact', description: 'Get in touch or find our lab', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'contact', weight: 0, commercialIntent: 'info' },
        { id: 'a3', slug: 'faq', title: 'FAQ', description: 'Answers to common repair questions', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'faq', weight: 0, commercialIntent: 'info' },
        { id: 'a4', slug: 'privacy-security-kuwait', title: 'Privacy & Security', description: 'How we protect your data and devices', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'privacy', weight: 0, commercialIntent: 'info' },
      ],
      sections: [],
    };
  }

  public static compileNavigation(): CompiledNavigationModel {
    return {
      header: [
        { id: 'nav_services', label: 'Services', href: '/services', hasMega: true, megaMenuId: 'services_mega' },
        { id: 'nav_brands', label: 'Brands', href: '/brands', hasMega: true, megaMenuId: 'brands_mega' },
        { id: 'nav_problems', label: 'Problems', href: '/problems', hasMega: true, megaMenuId: 'problems_mega' },
        { id: 'nav_locations', label: 'Locations', href: '/locations', hasMega: true, megaMenuId: 'locations_mega' },
        { id: 'nav_pricing', label: 'Pricing', href: '/pricing', hasMega: false },
        { id: 'nav_case_study', label: 'Case Study', href: '/case-studies', hasMega: true, megaMenuId: 'case_studies_mega' },
        { id: 'nav_blog', label: 'Blog', href: '/blog', hasMega: false },
        { id: 'nav_news', label: 'News', href: '/news', hasMega: false },
        { id: 'nav_guides', label: 'Guides', href: '/guides', hasMega: false },
        { id: 'nav_about', label: 'About', href: '/about', hasMega: true, megaMenuId: 'about_mega' },
        { id: 'nav_gallery', label: 'Gallery', href: '/gallery', hasMega: false },
      ],
      megaMenus: {
        services_mega: this.compileServicesMegaMenu(),
        brands_mega: this.compileBrandsMegaMenu(),
        problems_mega: this.compileProblemsMegaMenu(),
        locations_mega: this.compileLocationsMegaMenu(),
        case_studies_mega: this.compileCaseStudiesMegaMenu(),
        about_mega: this.compileAboutMegaMenu(),
      },
      footer: {
        sections: [
          { title: 'Top Services', items: this.compileServicesMegaMenu().featured }
        ]
      }
    };
  }
}

// 🚀 PERF: The navigation model is derived purely from static, build-time
// data (NAV_GRAPH) — it never changes at runtime. Compiling it once here,
// at module load, means the work happens off the render path entirely
// instead of running as a main-thread task inside Header's first render
// (previously via `useMemo(() => NavigationCompiler.compileNavigation(), [])`,
// which still has to execute synchronously on mount before paint).
export const COMPILED_NAVIGATION: CompiledNavigationModel = NavigationCompiler.compileNavigation();

/**
 * Localizes navigation presentation for the current route without rebuilding
 * the static navigation model. English remains the default; Arabic blog
 * routes receive their Arabic counterpart for items that have one.
 *
 * Keeping this transformation here means Header.tsx does not own blog/menu
 * content, while COMPILED_NAVIGATION can remain a build-time, immutable model.
 */
// Arabic content is represented as explicit entries in the generated menu.
// This map is reserved for future presentation-only locale swaps.
const BLOG_ARABIC_VARIANTS: Record<string, Pick<NavEntity, 'slug' | 'title' | 'description' | 'primaryKeyword'>> = {};

export function getLocalizedNavigation(pathname: string): CompiledNavigationModel {
  const isArabicRoute = pathname === '/ar' || pathname.startsWith('/ar/') || pathname.startsWith('/blog/ar/');

  if (!isArabicRoute) return COMPILED_NAVIGATION;

  const blogMenu = COMPILED_NAVIGATION.megaMenus.blog_mega;
  if (!blogMenu) return COMPILED_NAVIGATION;

  const localize = (item: NavEntity): NavEntity => {
    const variant = BLOG_ARABIC_VARIANTS[item.id];
    return variant ? { ...item, ...variant } : item;
  };

  return {
    ...COMPILED_NAVIGATION,
    megaMenus: {
      ...COMPILED_NAVIGATION.megaMenus,
      blog_mega: {
        ...blogMenu,
        featured: blogMenu.featured.map(localize),
        sections: blogMenu.sections.map(section => ({
          ...section,
          items: section.items.map(localize),
        })),
      },
    },
  };
}
