// File: app/frontend/src/core/navigation/NavigationCompiler.ts
import { KCROC_GRAPH } from '../../data/graph';
import { CompiledNavigationModel, NavEntity, MegaMenuConfig } from './types';

export class NavigationCompiler {
  /**
   * Calculates dynamic routing weight. 
   * In a live DB, this incorporates Search Volume, Conversion Rate, and Margins.
   */
  private static calculateEntityWeight(entity: any): number {
    let weight = 0;
    if (entity.popular) weight += 50;
    if (entity.warranty?.noFixNoFee) weight += 20; // High commercial trust
    if (entity.coreFeatures?.length > 3) weight += 10; // High content depth
    return weight;
  }

  /**
   * Transforms raw graph nodes into standard NavEntities for UI consumption.
   */
  private static compileNavEntity(entity: any, type: 'Service' | 'Brand' | 'Problem'): NavEntity {
    return {
      id: entity.id,
      slug: entity.slug,
      entityType: type,
      primaryKeyword: entity.title?.toLowerCase() || '',
      title: entity.title,
      description: entity.description || '',
      iconKey: entity.iconKey || 'laptop',
      weight: this.calculateEntityWeight(entity),
      commercialIntent: entity.pricing ? 'high' : 'informational',
    };
  }

  /**
   * Compiles the "Services" Mega Menu by automatically ranking the Graph.
   */
  private static compileServicesMegaMenu(): MegaMenuConfig {
    const allServices = (KCROC_GRAPH.services || []).map(s => this.compileNavEntity(s, 'Service'));
    
    // Auto-rank based on graph weight
    const sorted = [...allServices].sort((a, b) => b.weight - a.weight);
    
    // Top 3 become featured hero cards, the rest go to standard lists
    const featured = sorted.slice(0, 3);
    const standard = sorted.slice(3);

    return {
      id: 'services_mega',
      title: 'Repair Services',
      featured,
      sections: [
        { title: 'Standard Repairs', items: standard }
      ]
    };
  }

  /**
   * Master Compiler: Generates the single source of truth for the entire site's navigation.
   */
  public static compileNavigation(): CompiledNavigationModel {
    const servicesMega = this.compileServicesMegaMenu();

    return {
      header: [
        { id: 'nav_services', label: 'Services', href: '/services', hasMega: true, megaMenuId: 'services_mega' },
        { id: 'nav_pricing', label: 'Pricing', href: '/pricing', hasMega: false },
        { id: 'nav_blog', label: 'Blog', href: '/blog', hasMega: false },
        { id: 'nav_about', label: 'About', href: '/about', hasMega: false },
        { id: 'nav_contact', label: 'Contact', href: '/contact', hasMega: false },
      ],
      megaMenus: {
        services_mega: servicesMega,
        // Future programmatic expansion:
        // brands_mega: this.compileBrandsMegaMenu(),
        // problems_mega: this.compileProblemsMegaMenu(),
      },
      footer: {
        sections: [
          { title: 'Top Services', items: servicesMega.featured }
        ]
      }
    };
  }
}
