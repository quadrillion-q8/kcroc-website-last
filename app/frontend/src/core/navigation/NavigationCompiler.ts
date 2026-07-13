// File: app/frontend/src/core/navigation/NavigationCompiler.ts
import { Registry } from '../../knowledge/registry';
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

  // 1. Services Mega Menu
  private static compileServicesMegaMenu(): MegaMenuConfig {
    const allServices = Registry.getAllServices().map(s => this.compileNavEntity(s, 'Service', 'wrench'));
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
    // Falls back to empty array if graph doesn't have brands yet
    const allBrands = (KCROC_GRAPH.brands || []).map(b => this.compileNavEntity(b, 'Brand', 'cpu'));
    
    return {
      id: 'brands_mega',
      title: 'Supported Brands',
      featured: allBrands.slice(0, 3), // Feature Dell, HP, Lenovo
      sections: [{ title: 'All Brands', items: allBrands.slice(3) }]
    };
  }

  // 3. Problems Mega Menu
  private static compileProblemsMegaMenu(): MegaMenuConfig {
    const allProblems = (KCROC_GRAPH.problems || []).map(p => this.compileNavEntity(p, 'Problem', 'shield'));
    
    return {
      id: 'problems_mega',
      title: 'Common Problems',
      featured: allProblems.slice(0, 3), // Feature top 3 problems
      sections: [{ title: 'Troubleshooting Guides', items: allProblems.slice(3) }]
    };
  }

  // 4. Blog Mega Menu (Static/Custom structure as requested)
  private static compileBlogMegaMenu(): MegaMenuConfig {
    return {
      id: 'blog_mega',
      title: 'Blog & Guides',
      featured: [], // No featured cards, just a clean list
      sections: [{
        title: 'Latest Content',
        items: [
          { id: 'b1', slug: 'blog', title: 'All Posts', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'blog', weight: 0, commercialIntent: 'info' },
          { id: 'b2', slug: 'blog/laptop-repair-kuwait-2026', title: 'Repair Guide 2026', description: '', iconKey: 'wrench', entityType: 'Page' as any, primaryKeyword: 'guide', weight: 0, commercialIntent: 'info' },
          { id: 'b3', slug: 'laptop-screen-protection-tips', title: 'Screen Protection', description: '', iconKey: 'shield', entityType: 'Page' as any, primaryKeyword: 'tips', weight: 0, commercialIntent: 'info' },
          { id: 'b4', slug: 'blog/gaming-pc-cooling', title: 'Gaming PC Cooling', description: '', iconKey: 'gaming', entityType: 'Page' as any, primaryKeyword: 'cooling', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  // 5. About Mega Menu (Static/Custom structure as requested)
  private static compileAboutMegaMenu(): MegaMenuConfig {
    return {
      id: 'about_mega',
      title: 'Company Info',
      featured: [], // No featured cards, just a clean list
      sections: [{
        title: 'About KCROC',
        items: [
          { id: 'a1', slug: 'about', title: 'About Us', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'about', weight: 0, commercialIntent: 'info' },
          { id: 'a2', slug: 'gallery', title: 'Gallery', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'gallery', weight: 0, commercialIntent: 'info' },
          { id: 'a3', slug: 'faq', title: 'FAQ', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'faq', weight: 0, commercialIntent: 'info' },
          { id: 'a4', slug: 'contact', title: 'Contact', description: '', iconKey: 'laptop', entityType: 'Page' as any, primaryKeyword: 'contact', weight: 0, commercialIntent: 'info' },
        ]
      }]
    };
  }

  public static compileNavigation(): CompiledNavigationModel {
    return {
      // 🎯 The exact top-level header structure requested
      header: [
        { id: 'nav_services', label: 'Services', href: '/services', hasMega: true, megaMenuId: 'services_mega' },
        { id: 'nav_brands', label: 'Brands', href: '#', hasMega: true, megaMenuId: 'brands_mega' },
        { id: 'nav_problems', label: 'Problems', href: '#', hasMega: true, megaMenuId: 'problems_mega' },
        { id: 'nav_case_studies', label: 'Case Studies', href: '/case-studies', hasMega: false },
        { id: 'nav_pricing', label: 'Pricing', href: '/pricing', hasMega: false },
        { id: 'nav_blog', label: 'Blog', href: '/blog', hasMega: true, megaMenuId: 'blog_mega' },
        { id: 'nav_about', label: 'About', href: '/about', hasMega: true, megaMenuId: 'about_mega' },
      ],
      // Attach the compiled mega menus to the model
      megaMenus: {
        services_mega: this.compileServicesMegaMenu(),
        brands_mega: this.compileBrandsMegaMenu(),
        problems_mega: this.compileProblemsMegaMenu(),
        blog_mega: this.compileBlogMegaMenu(),
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
