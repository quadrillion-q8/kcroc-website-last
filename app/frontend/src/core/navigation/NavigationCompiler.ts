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
      title: 'All Services',
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
      sections: [{ title: 'More', items: [servicesIndex, ...sorted.slice(6)] }]
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
      title: 'All Brands',
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
      sections: [{ title: 'More', items: [brandsIndex, ...allBrands.slice(6)] }]
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
      title: 'All Problems',
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
      sections: [{ title: 'More', items: [problemsIndex, ...sortedProblems.slice(6)] }]
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
          { id: 'cs_index', slug: 'case-studies', title: 'All Case Studies', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'cases', weight: 100, commercialIntent: 'info' },
          ...allCaseStudies.slice(6)
        ]
      }]
    };
  }

  // 5. Pricing Mega Menu
  private static compilePricingMegaMenu(): MegaMenuConfig {
    const allServices = (NAV_GRAPH.services || []).map(s => this.compileNavEntity(s, 'Service', 'wrench'));
    const sorted = [...allServices].sort((a, b) => b.weight - a.weight);

    const priceIndex: NavEntity = {
      id: 'pricing_index',
      slug: 'pricing',
      entityType: 'Page' as any,
      primaryKeyword: 'pricing',
      title: 'Full Price List',
      description: 'Every repair price in one place',
      iconKey: 'laptop',
      weight: 100,
      commercialIntent: 'high',
    };

    return {
      id: 'pricing_mega',
      title: 'Repair Pricing',
      // 🎨 CONSISTENCY FIX: same 6-card grid as the Services menu (same
      // underlying list), matching the Guides menu's layout.
      featured: sorted.slice(0, 6),
      sections: [{ title: 'More', items: [priceIndex, ...sorted.slice(6)] }]
    };
  }

  // 6. Blog Mega Menu
  private static compileBlogMegaMenu(): MegaMenuConfig {
    return {
      id: 'blog_mega',
      title: 'Blog & Updates',
      // 🎨 CONSISTENCY FIX: bumped from 3 to 6 featured cards (2 full rows,
      // same as Guides) by promoting the next 3 strongest posts out of the
      // old "More Posts" pill-cluster and into the card grid.
      featured: [
        { id: 'b6', slug: 'blog/laptop-buying-guide-kuwait-2026', title: 'Laptop Buying Guide 2026', description: 'Which specs actually matter in 2026', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'buying guide', weight: 0, commercialIntent: 'info' },
        { id: 'b7', slug: 'blog/intel-core-ultra-vs-amd-ryzen-ai', title: 'Intel vs AMD CPUs', description: 'Core Ultra vs Ryzen AI compared', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'cpu', weight: 0, commercialIntent: 'info' },
        { id: 'b12', slug: 'blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures', title: 'Laptop Temperatures in Kuwait', description: 'CPU & GPU temperature guide', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'laptop temperature', weight: 0, commercialIntent: 'info' },
        { id: 'b9', slug: 'blog/why-8gb-ram-is-no-longer-enough-for-windows-11', title: '8GB RAM & Windows 11', description: 'Why 8GB is now the bottleneck', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'ram', weight: 0, commercialIntent: 'info' },
        { id: 'b10', slug: 'blog/10-reasons-why-people-are-dumping-windows-11', title: '10 Reasons People Are Dumping Windows 11', description: 'A close look at the Windows 11 backlash', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'windows 11', weight: 0, commercialIntent: 'info' },
        { id: 'b11', slug: 'blog/gaming-pc-mistakes-kuwait', title: 'Gaming PC Mistakes', description: 'Common build & cooling mistakes to avoid', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'gaming pc mistakes', weight: 0, commercialIntent: 'info' },
      ],
      sections: [{
        title: 'More',
        items: [
          { id: 'b1', slug: 'blog', title: 'All Posts', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'blog', weight: 0, commercialIntent: 'info' },
          { id: 'b8', slug: 'blog/ar/laptop-buying-guide-kuwait-2026', title: 'دليل شراء اللابتوب 2026', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'buying guide ar', weight: 0, commercialIntent: 'info' },
          { id: 'b2', slug: 'blog/laptop-repair-kuwait-2026', title: 'Repair Guide 2026', description: '', iconKey: 'wrench', entityType: 'Page' as any, primaryKeyword: 'guide', weight: 0, commercialIntent: 'info' },
          { id: 'b3', slug: 'laptop-screen-protection-tips', title: 'Screen Protection Tips', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'tips', weight: 0, commercialIntent: 'info' },
          { id: 'b4', slug: 'blog/how-to-protect-laptop-screen', title: 'Protect Laptop Screen', description: '', iconKey: 'monitor', entityType: 'Page' as any, primaryKeyword: 'protect', weight: 0, commercialIntent: 'info' },
          { id: 'b5', slug: 'blog/gaming-pc-cooling', title: 'Gaming PC Cooling', description: '', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'cooling', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  // 7. Guides Mega Menu
  private static compileGuidesMegaMenu(): MegaMenuConfig {
    return {
      id: 'guides_mega',
      title: 'DIY & Repair Guides',
      featured: [
        { id: 'g6', slug: 'guides/laptop-wont-turn-on', title: "Laptop Won't Turn On?", description: 'No-power troubleshooting guide', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: "laptop won't turn on", weight: 0, commercialIntent: 'info' },
        // 🩹 FIX (audit): was pointing at 'guides/dell-inspiron-15-3000-overheating',
        // which App.tsx routes as a client-side-only <Navigate> stub with no
        // rendered content of its own (empty title/meta/canonical/H1 in the
        // prerendered HTML). Every click from this mega-menu item landed on
        // that empty page and then bounced again client-side. Repointed
        // straight at the real, rendered guide page.
        { id: 'g1', slug: 'guides/dell-laptop-overheating', title: 'Dell Inspiron Overheating', description: 'Thermal troubleshooting guide', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'overheating', weight: 0, commercialIntent: 'info' },
        { id: 'g2', slug: 'guides/laptop-battery-warning-signs', title: 'Battery Warning Signs', description: 'Lithium-ion failure checklist', iconKey: 'battery', entityType: 'Page' as any, primaryKeyword: 'battery', weight: 0, commercialIntent: 'info' },
        { id: 'g3', slug: 'guides/bios-uefi-recovery-kuwait', title: 'BIOS & UEFI Recovery', description: 'Firmware update failures & recovery', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'bios', weight: 0, commercialIntent: 'info' },
        { id: 'g4', slug: 'guides/gamebar-presence-writer-fix', title: 'GameBarPresenceWriter.exe Fix', description: 'Diagnose gaming stutter the right way', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'gamebar', weight: 0, commercialIntent: 'info' },
        { id: 'g5', slug: 'guides/windows-11-background-services-audit', title: 'Windows 11 Services Audit', description: 'Audit background services safely', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'windows 11 services', weight: 0, commercialIntent: 'info' },
        { id: 'g7', slug: 'guides/windows-11-settings-tweaks', title: 'Windows 11 Settings Tweaks', description: 'Privacy, speed & better control', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'windows 11 tweaks', weight: 0, commercialIntent: 'info' },
      ],
      // 🩹 FIX: paired with a new "/guides" index page + route (see App.tsx /
      // pages/GuidesIndex.tsx). This menu had an empty `sections` array with
      // no way to reach an index, and "/guides" itself 404'd.
      sections: [{
        title: 'More',
        items: [
          { id: 'g_index', slug: 'guides', title: 'All Guides', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'guides', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  // 8. About Mega Menu
  private static compileAboutMegaMenu(): MegaMenuConfig {
    return {
      id: 'about_mega',
      title: 'Company Info',
      // 🎨 CONSISTENCY FIX: bumped from 4 to 6 featured cards (2 full rows,
      // same as Guides) by folding FAQ and Privacy & Security — previously
      // stranded in a separate "More" pill list — into the card grid.
      featured: [
        { id: 'a1', slug: 'about', title: 'About Us', description: 'Our story and the team behind KCROC', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'about', weight: 0, commercialIntent: 'info' },
        { id: 'a7', slug: 'near-me', title: 'Find Computer Repair Near You', description: 'Find your Kuwait service area and arrange pickup', iconKey: 'map-pin', entityType: 'Page' as any, primaryKeyword: 'computer repair near me', weight: 0, commercialIntent: 'transactional' },
        { id: 'a2', slug: 'gallery', title: 'Gallery', description: 'A look inside the workshop', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'gallery', weight: 0, commercialIntent: 'info' },
        { id: 'a6', slug: 'contact', title: 'Contact', description: 'Get in touch or find our lab', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'contact', weight: 0, commercialIntent: 'info' },
        { id: 'a3', slug: 'faq', title: 'FAQ', description: 'Answers to common repair questions', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'faq', weight: 0, commercialIntent: 'info' },
        { id: 'a4', slug: 'privacy-security-kuwait', title: 'Privacy & Security', description: 'How we protect your data and devices', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'privacy', weight: 0, commercialIntent: 'info' },
      ],
      sections: [
        // Dedicated Locations Section
        {
          title: 'Service Areas',
          items: [
            { id: 'loc-hawalli', slug: 'location/hawalli', title: 'Hawalli (Lab)', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'hawalli', weight: 0, commercialIntent: 'info' },
            { id: 'loc-salmiya', slug: 'location/salmiya', title: 'Salmiya', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'salmiya', weight: 0, commercialIntent: 'info' },
            { id: 'loc-farwaniya', slug: 'location/farwaniya', title: 'Farwaniya', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'farwaniya', weight: 0, commercialIntent: 'info' },
            { id: 'loc-ahmadi', slug: 'location/ahmadi', title: 'Ahmadi', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'ahmadi', weight: 0, commercialIntent: 'info' },
            { id: 'loc-jahra', slug: 'location/jahra', title: 'Jahra', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'jahra', weight: 0, commercialIntent: 'info' },
            { id: 'loc-fahaheel', slug: 'location/fahaheel', title: 'Fahaheel', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'fahaheel', weight: 0, commercialIntent: 'info' },
            { id: 'loc-mangaf', slug: 'location/mangaf', title: 'Mangaf', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'mangaf', weight: 0, commercialIntent: 'info' },
            { id: 'loc-abu-halifa', slug: 'location/abu-halifa', title: 'Abu Halifa', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'abu halifa', weight: 0, commercialIntent: 'info' },
            { id: 'loc-jabriya', slug: 'location/jabriya', title: 'Jabriya', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'jabriya', weight: 0, commercialIntent: 'info' },
            { id: 'loc-mubarak-al-kabeer', slug: 'location/mubarak-al-kabeer', title: 'Mubarak Al-Kabeer', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'mubarak al-kabeer', weight: 0, commercialIntent: 'info' },
            { id: 'loc-fintas', slug: 'location/fintas', title: 'Fintas', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'fintas', weight: 0, commercialIntent: 'info' },
            { id: 'loc-sabah-al-salem', slug: 'location/sabah-al-salem', title: 'Sabah Al-Salem', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'sabah al-salem', weight: 0, commercialIntent: 'info' },
          ]
        }
      ]
    };
  }

  public static compileNavigation(): CompiledNavigationModel {
    return {
      header: [
        { id: 'nav_services', label: 'Services', href: '/services', hasMega: true, megaMenuId: 'services_mega' },
        // 🩹 FIX: was '#' — broke the active-state highlighting (matchPath)
        // in Header.tsx and the mobile menu's fallback link. Now points at
        // the new index pages below.
        { id: 'nav_brands', label: 'Brands', href: '/brands', hasMega: true, megaMenuId: 'brands_mega' },
        { id: 'nav_problems', label: 'Problems', href: '/problems', hasMega: true, megaMenuId: 'problems_mega' },
        { id: 'nav_case_studies', label: 'Case Studies', href: '/case-studies', hasMega: true, megaMenuId: 'case_studies_mega' }, 
        { id: 'nav_pricing', label: 'Pricing', href: '/pricing', hasMega: true, megaMenuId: 'pricing_mega' },
        { id: 'nav_blog', label: 'Blog', href: '/blog', hasMega: true, megaMenuId: 'blog_mega' },
        { id: 'nav_guides', label: 'Guides', href: '/guides', hasMega: true, megaMenuId: 'guides_mega' },
        { id: 'nav_about', label: 'About', href: '/about', hasMega: true, megaMenuId: 'about_mega' },
      ],
      megaMenus: {
        services_mega: this.compileServicesMegaMenu(),
        brands_mega: this.compileBrandsMegaMenu(),
        problems_mega: this.compileProblemsMegaMenu(),
        case_studies_mega: this.compileCaseStudiesMegaMenu(),
        pricing_mega: this.compilePricingMegaMenu(),
        blog_mega: this.compileBlogMegaMenu(),
        guides_mega: this.compileGuidesMegaMenu(),
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
