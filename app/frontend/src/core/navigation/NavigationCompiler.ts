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
      featured: sorted.slice(0, 3), // Top 3 featured as cards
      sections: [{ title: 'All Services', items: [servicesIndex, ...sorted.slice(3)] }]
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
      featured: allBrands.slice(0, 3),
      sections: [{ title: 'All Brands', items: [brandsIndex, ...allBrands.slice(3)] }]
    };
  }

  // 3. Problems Mega Menu
  private static compileProblemsMegaMenu(): MegaMenuConfig {
    const allProblems = (NAV_GRAPH.problems || []).map(p => this.compileNavEntity(p, 'Problem', 'shield'));

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
      featured: allProblems.slice(0, 3),
      sections: [{ title: 'Troubleshooting Guides', items: [problemsIndex, ...allProblems.slice(3)] }]
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
      featured: allCaseStudies.slice(0, 3), // Same card treatment as Services/Pricing
      sections: [{
        title: 'Browse All',
        items: [
          { id: 'cs_index', slug: 'case-studies', title: 'All Case Studies', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'cases', weight: 100, commercialIntent: 'info' },
          ...allCaseStudies.slice(3)
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
      featured: sorted.slice(0, 3), // Top 3 featured as cards, same picks as the Services menu
      sections: [{ title: 'Pricing By Service', items: [priceIndex, ...sorted.slice(3)] }]
    };
  }

  // 6. Blog Mega Menu
  private static compileBlogMegaMenu(): MegaMenuConfig {
    return {
      id: 'blog_mega',
      title: 'Blog & Updates',
      featured: [
        { id: 'b6', slug: 'blog/laptop-buying-guide-kuwait-2026', title: 'Laptop Buying Guide 2026', description: 'Which specs actually matter in 2026', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'buying guide', weight: 0, commercialIntent: 'info' },
        { id: 'b7', slug: 'blog/intel-core-ultra-vs-amd-ryzen-ai', title: 'Intel vs AMD CPUs', description: 'Core Ultra vs Ryzen AI compared', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'cpu', weight: 0, commercialIntent: 'info' },
        // 🚀 ADDED: Arabic Laptop Buying Guide
        { id: 'b8', slug: 'blog/ar/laptop-buying-guide-kuwait-2026', title: 'دليل شراء اللابتوب 2026', description: 'دليل شامل لشراء اللابتوب في الكويت', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'buying guide ar', weight: 0, commercialIntent: 'info' },
      ],
      sections: [{
        title: 'More Posts',
        items: [
          { id: 'b1', slug: 'blog', title: 'All Posts', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'blog', weight: 0, commercialIntent: 'info' },
          { id: 'b2', slug: 'blog/laptop-repair-kuwait-2026', title: 'Repair Guide 2026', description: '', iconKey: 'wrench', entityType: 'Page' as any, primaryKeyword: 'guide', weight: 0, commercialIntent: 'info' },
          { id: 'b3', slug: 'laptop-screen-protection-tips', title: 'Screen Protection Tips', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'tips', weight: 0, commercialIntent: 'info' },
          { id: 'b4', slug: 'blog/how-to-protect-laptop-screen', title: 'Protect Laptop Screen', description: '', iconKey: 'monitor', entityType: 'Page' as any, primaryKeyword: 'protect', weight: 0, commercialIntent: 'info' },
          { id: 'b5', slug: 'blog/gaming-pc-cooling', title: 'Gaming PC Cooling', description: '', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'cooling', weight: 0, commercialIntent: 'info' },
          // 🩹 FIX: these two live posts (see src/constants/blogPosts.ts) were
          // published but never added here, so they were unreachable from
          // the Blog dropdown even though /blog/<slug> worked directly.
          { id: 'b9', slug: 'blog/why-8gb-ram-is-no-longer-enough-for-windows-11', title: '8GB RAM & Windows 11', description: '', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'ram', weight: 0, commercialIntent: 'info' },
          { id: 'b10', slug: 'blog/10-reasons-why-people-are-dumping-windows-11', title: '10 Reasons People Are Dumping Windows 11', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'windows 11', weight: 0, commercialIntent: 'info' },
          { id: 'b11', slug: 'blog/gaming-pc-mistakes-kuwait', title: 'Gaming PC Mistakes', description: '', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'gaming pc mistakes', weight: 0, commercialIntent: 'info' },
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
      featured: [
        { id: 'a1', slug: 'about', title: 'About Us', description: 'Our story and the team behind KCROC', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'about', weight: 0, commercialIntent: 'info' },
        { id: 'a2', slug: 'gallery', title: 'Gallery', description: 'A look inside the workshop', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'gallery', weight: 0, commercialIntent: 'info' },
        { id: 'a6', slug: 'contact', title: 'Contact', description: 'Get in touch or find our lab', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'contact', weight: 0, commercialIntent: 'info' },
      ],
      sections: [
        {
          title: 'More',
          items: [
            { id: 'a3', slug: 'faq', title: 'FAQ', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'faq', weight: 0, commercialIntent: 'info' },
            { id: 'a4', slug: 'privacy-security-kuwait', title: 'Privacy & Security', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'privacy', weight: 0, commercialIntent: 'info' },
          ]
        },
        // Dedicated Locations Section
        {
          title: 'Service Areas',
          items: [
            { id: 'loc-hawalli', slug: 'location/hawalli', title: 'Hawalli (Lab)', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'hawalli', weight: 0, commercialIntent: 'info' },
            { id: 'loc-salmiya', slug: 'location/salmiya', title: 'Salmiya', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'salmiya', weight: 0, commercialIntent: 'info' },
            { id: 'loc-farwaniya', slug: 'location/farwaniya', title: 'Farwaniya', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'farwaniya', weight: 0, commercialIntent: 'info' },
            { id: 'loc-ahmadi', slug: 'location/ahmadi', title: 'Ahmadi', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'ahmadi', weight: 0, commercialIntent: 'info' },
            { id: 'loc-jahra', slug: 'location/jahra', title: 'Jahra', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'jahra', weight: 0, commercialIntent: 'info' },
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
