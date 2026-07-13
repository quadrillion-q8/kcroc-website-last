import { Registry } from '../../knowledge/registry';
import { CompiledNavigationModel, NavEntity, MegaMenuConfig } from './types';

export class NavigationCompiler {
  /**
   * Enterprise Ranking Engine
   * Calculates dynamic routing weight based on business value.
   */
  private static calculateEntityWeight(entity: any): number {
    let weight = 0;
    if (entity.popular) weight += 50;                               // High traffic score
    if (entity.warranty?.noFixNoFee) weight += 20;                  // High commercial trust
    if (entity.coreFeatures && entity.coreFeatures.length > 3) weight += 10; // High content depth
    // Future: Add SEO search volume and conversion rate modifiers here
    return weight;
  }

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

  private static compileServicesMegaMenu(): MegaMenuConfig {
    const allServices = Registry.getAllServices().map(s => this.compileNavEntity(s, 'Service'));
    const sorted = [...allServices].sort((a, b) => b.weight - a.weight);
    
    return {
      id: 'services_mega',
      title: 'Repair Services',
      featured: sorted.slice(0, 3), // Top 3 highest value entities
      sections: [
        { title: 'Standard Repairs', items: sorted.slice(3) }
      ]
    };
  }

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
      },
      footer: {
        sections: [
          { title: 'Top Services', items: servicesMega.featured }
        ]
      }
    };
  }
}
