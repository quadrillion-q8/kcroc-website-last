import { Registry } from '../../knowledge/registry';
import { CompiledNavigationModel, NavEntity, MegaMenuConfig } from './types';

export class NavigationCompiler {
  private static calculateEntityWeight(entity: any): number {
    let weight = 0;
    if (entity.popular) weight += 50;
    if (entity.warranty?.noFixNoFee) weight += 20;
    if (entity.coreFeatures && entity.coreFeatures.length > 3) weight += 10;
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
      featured: sorted.slice(0, 3),
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
