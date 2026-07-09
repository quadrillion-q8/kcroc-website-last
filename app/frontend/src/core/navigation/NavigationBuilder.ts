// File: app/frontend/src/core/navigation/NavigationBuilder.ts
import { KCROC_GRAPH } from '../../data/graph';
import { RoutableEntity, ServiceEntity, BrandEntity } from '../../types/knowledgeGraph';

export class NavigationBuilder {
  
  /**
   * Universal sorting logic based on the new navigationPriority field
   */
  private static sortByPriority<T extends RoutableEntity>(items: T[]): T[] {
    return [...items].sort((a, b) => (b.navigationPriority || 0) - (a.navigationPriority || 0));
  }

  /**
   * Generates the structured payload for the Desktop Mega Menu
   * Incorporates your "Educational UX" requirement (icons, descriptions)
   */
  public static getMegaMenuServices() {
    const allServices = this.sortByPriority(KCROC_GRAPH.services);
    
    // Split into Featured (Top 3) vs Standard (Next 5)
    return {
      featured: allServices.filter(s => s.isFeatured).slice(0, 3).map(s => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        icon: s.iconKey,
        description: s.shortDescription || s.description.substring(0, 60) + '...',
        callToAction: '→ Learn More'
      })),
      standardList: allServices.filter(s => !s.isFeatured).slice(0, 5).map(s => ({
        title: s.title,
        slug: s.slug
      })),
      totalCount: allServices.length
    };
  }

  /**
   * Generates the multi-column Footer Directory Array
   */
  public static getFooterDirectory() {
    return {
      company: [
        { label: 'About Us', route: '/about' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Gallery', route: '/gallery' },
        { label: 'FAQ', route: '/faq' },
      ],
      legal: [ // 🚀 NEW: Legal Column
        { label: 'Privacy Policy', route: '/privacy-security-kuwait' },
        { label: 'Terms of Service', route: '/terms' },
        { label: 'Warranty Policy', route: '/warranty' }
      ],
      quickActions: [ // 🚀 NEW: Conversion Column
        { label: 'Book Free Pickup', route: '/book', isPrimary: true },
        { label: 'WhatsApp Technician', route: `https://wa.me/${KCROC_GRAPH.business?.telephone}`, isExternal: true },
        { label: 'Call Lab', route: `tel:${KCROC_GRAPH.business?.telephone}` }
      ],
      services: this.sortByPriority(KCROC_GRAPH.services).map(s => ({ label: s.title, route: `/${s.slug}` })),
      brands: this.sortByPriority(KCROC_GRAPH.brands).map(b => ({ label: b.brandName, route: `/${b.slug}` })),
      problems: this.sortByPriority(KCROC_GRAPH.problems).map(p => ({ label: p.title, route: `/${p.slug}` })),
      locations: this.sortByPriority(KCROC_GRAPH.locations).map(l => ({ label: l.title, route: `/location/${l.slug}` }))
    };
  }

  /**
   * Dynamically generates Breadcrumbs based on the current active slug
   */
  public static buildBreadcrumbs(currentSlug: string) {
    const entity = KCROC_GRAPH.routableEntities.find(e => e.slug === currentSlug);
    if (!entity) return [];

    const breadcrumbs = [{ label: 'Home', route: '/' }];
    
    // Dynamic Parent Assignment based on entityType
    if (entity.entityType === 'Service') breadcrumbs.push({ label: 'Services', route: '/services' });
    if (entity.entityType === 'Brand') breadcrumbs.push({ label: 'Brands', route: '/brands' });
    if (entity.entityType === 'Problem') breadcrumbs.push({ label: 'Troubleshooting', route: '/problems' });

    breadcrumbs.push({ label: entity.title, route: `/${entity.slug}` });
    return breadcrumbs;
  }
}
