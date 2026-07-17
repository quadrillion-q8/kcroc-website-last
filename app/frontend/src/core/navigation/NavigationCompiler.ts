// File: app/frontend/src/core/navigation/NavigationCompiler.ts
import { KCROC_GRAPH } from '../../data/graph';
import { CompiledNavigationModel, NavEntity, MegaMenuConfig } from './types';

export class NavigationCompiler {
  private static calculateEntityWeight(entity: any): number {
    let weight = 0;
    if (entity.popular) weight += 50;
    if (entity.warranty?.noFixNoFee) weight += 20;
    if (entity.coreFeatures && entity.coreFeatures.length > 3) weight += 10;
    return weight;
  }

  private static compileNavEntity(entity: any, type: 'Service' | 'Brand' | 'Problem' | 'Page', defaultIcon = 'laptop'): NavEntity {
    return {
      id: entity.id || entity.slug,
      slug: entity.slug,
      entityType: type as any,
      primaryKeyword: entity.title?.toLowerCase() || entity.name?.toLowerCase() || '',
      title: entity.title || entity.name || 'Unknown',
      description: entity.description || '',
      iconKey: entity.iconKey || defaultIcon,
      weight: this.calculateEntityWeight(entity),
      commercialIntent: entity.pricing ? 'high' : 'informational',
    };
  }

  // 1. Services Mega Menu (🚀 Now pulling from KCROC_GRAPH Single Source of Truth)
  private static compileServicesMegaMenu(): MegaMenuConfig {
    const allServices = (KCROC_GRAPH.services || []).map(s => this.compileNavEntity(s, 'Service', 'wrench'));
    const sorted = [...allServices].sort((a, b) => b.weight - a.weight);
    
    return {
      id: 'services_mega',
      title: 'Repair Services',
      featured: sorted.slice(0, 3), // Top 3 featured as cards
      sections: [{ title: 'All Services', items: sorted.slice(3) }]
    };
  }

  // 2. Brands Mega Menu
  private static compileBrandsMegaMenu(): MegaMenuConfig {
    const allBrands = (KCROC_GRAPH.brands || []).map(b => this.compileNavEntity(b, 'Brand', 'cpu'));
    return {
      id: 'brands_mega',
      title: 'Supported Brands',
      featured: allBrands.slice(0, 3),
      sections: [{ title: 'All Brands', items: allBrands.slice(3) }]
    };
  }

  // 3. Problems Mega Menu
  private static compileProblemsMegaMenu(): MegaMenuConfig {
    const allProblems = (KCROC_GRAPH.problems || []).map(p => this.compileNavEntity(p, 'Problem', 'shield'));
    return {
      id: 'problems_mega',
      title: 'Common Problems',
      featured: allProblems.slice(0, 3),
      sections: [{ title: 'Troubleshooting Guides', items: allProblems.slice(3) }]
    };
  }

  // 4. Case Studies Mega Menu (🚀 Now auto-updates from KCROC_GRAPH)
  private static compileCaseStudiesMegaMenu(): MegaMenuConfig {
    const allCaseStudies = (KCROC_GRAPH.caseStudies || []).map(cs => this.compileNavEntity(cs, 'Page', 'laptop'));

    return {
      id: 'case_studies_mega',
      title: 'Real Repair Stories',
      featured: [], 
      sections: [{
        title: 'Featured Case Studies',
        items: [
          { id: 'cs_index', slug: 'case-studies', title: 'All Case Studies', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'cases', weight: 100, commercialIntent: 'info' },
          ...allCaseStudies
        ]
      }]
    };
  }

  // 5. Blog Mega Menu
  private static compileBlogMegaMenu(): MegaMenuConfig {
    return {
      id: 'blog_mega',
      title: 'Blog & Updates',
      featured: [], 
      sections: [{
        title: 'Latest Content',
        items: [
          { id: 'b1', slug: 'blog', title: 'All Posts', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'blog', weight: 0, commercialIntent: 'info' },
          { id: 'b2', slug: 'blog/laptop-repair-kuwait-2026', title: 'Repair Guide 2026', description: '', iconKey: 'wrench', entityType: 'Page' as any, primaryKeyword: 'guide', weight: 0, commercialIntent: 'info' },
          { id: 'b3', slug: 'laptop-screen-protection-tips', title: 'Screen Protection Tips', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'tips', weight: 0, commercialIntent: 'info' },
          { id: 'b4', slug: 'blog/how-to-protect-laptop-screen', title: 'Protect Laptop Screen', description: '', iconKey: 'monitor', entityType: 'Page' as any, primaryKeyword: 'protect', weight: 0, commercialIntent: 'info' },
          { id: 'b5', slug: 'blog/gaming-pc-cooling', title: 'Gaming PC Cooling', description: '', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'cooling', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  // 🚀 6. NEW: Guides Mega Menu
  private static compileGuidesMegaMenu(): MegaMenuConfig {
    return {
      id: 'guides_mega',
      title: 'DIY & Repair Guides',
      featured: [], 
      sections: [{
        title: 'Step-by-Step Guides',
        items: [
          // This is where you add your new guide!
          { id: 'g1', slug: 'guides/dell-overheating', title: 'Dell Overheating Fix', description: 'Thermal troubleshooting guide', iconKey: 'cpu', entityType: 'Page' as any, primaryKeyword: 'overheating', weight: 0, commercialIntent: 'info' },
          // Add future guides right here below this line:
          // { id: 'g2', slug: 'guides/macbook-battery', title: 'MacBook Battery Guide', description: 'Check your cycle count', iconKey: 'battery', entityType: 'Page' as any, primaryKeyword: 'battery', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  // 7. About Mega Menu
  private static compileAboutMegaMenu(): MegaMenuConfig {
    return {
      id: 'about_mega',
      title: 'Company Info',
      featured: [], 
      sections: [{
        title: 'About KCROC',
        items: [
          { id: 'a1', slug: 'about', title: 'About Us', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'about', weight: 0, commercialIntent: 'info' },
          { id: 'a2', slug: 'gallery', title: 'Gallery', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'gallery', weight: 0, commercialIntent: 'info' },
          { id: 'a3', slug: 'faq', title: 'FAQ', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'faq', weight: 0, commercialIntent: 'info' },
          { id: 'a4', slug: 'privacy-security-kuwait', title: 'Privacy & Security', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'privacy', weight: 0, commercialIntent: 'info' },
          { id: 'a5', slug: 'location/hawalli', title: 'Hawalli Location', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'hawalli', weight: 0, commercialIntent: 'info' },
          { id: 'a6', slug: 'contact', title: 'Contact', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'contact', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  public static compileNavigation(): CompiledNavigationModel {
    return {
      header: [
        { id: 'nav_services', label: 'Services', href: '/services', hasMega: true, megaMenuId: 'services_mega' },
        { id: 'nav_brands', label: 'Brands', href: '#', hasMega: true, megaMenuId: 'brands_mega' },
        { id: 'nav_problems', label: 'Problems', href: '#', hasMega: true, megaMenuId: 'problems_mega' },
        { id: 'nav_case_studies', label: 'Case Studies', href: '/case-studies', hasMega: true, megaMenuId: 'case_studies_mega' }, 
        { id: 'nav_pricing', label: 'Pricing', href: '/pricing', hasMega: false },
        { id: 'nav_blog', label: 'Blog', href: '/blog', hasMega: true, megaMenuId: 'blog_mega' },
        // 🚀 NEW: Guides Tab added to the main navigation bar
        { id: 'nav_guides', label: 'Guides', href: '#', hasMega: true, megaMenuId: 'guides_mega' },
        { id: 'nav_about', label: 'About', href: '/about', hasMega: true, megaMenuId: 'about_mega' },
      ],
      megaMenus: {
        services_mega: this.compileServicesMegaMenu(),
        brands_mega: this.compileBrandsMegaMenu(),
        problems_mega: this.compileProblemsMegaMenu(),
        case_studies_mega: this.compileCaseStudiesMegaMenu(),
        blog_mega: this.compileBlogMegaMenu(),
        guides_mega: this.compileGuidesMegaMenu(), // 🚀 NEW: Register the Guides Mega Menu
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
