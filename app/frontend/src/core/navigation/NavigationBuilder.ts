// File: app/frontend/src/core/navigation/NavigationBuilder.ts
import { KCROC_GRAPH } from '../../data/graph';
import { RoutableEntity } from '../../types/knowledgeGraph';

export class NavigationBuilder {
  
  /**
   * Universal sorting logic based on the new navigationPriority field.
   * ✅ Defensive: Guards against undefined/null or non-array inputs.
   */
  private static sortByPriority<T extends RoutableEntity>(items: T[]): T[] {
    if (!items || !Array.isArray(items)) return [];
    
    return [...items].sort((a, b) => 
      (b.navigationPriority || 0) - (a.navigationPriority || 0)
    );
  }

  /**
   * Generates the structured payload for the Desktop Mega Menu
   */
  public static getMegaMenuServices() {
    // ✅ Defensive: Fallback to empty array if KCROC_GRAPH.services is undefined
    const allServices = this.sortByPriority(KCROC_GRAPH.services ?? []);
    
    return {
      featured: allServices
        .filter(s => s.isFeatured)
        .slice(0, 3)
        .map(s => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          icon: s.iconKey,
          // ✅ Defensive: Safe truncation falling back to main description
          description: s.shortDescription ?? (s.description ? s.description.substring(0, 80) + '…' : ''),
          callToAction: '→ Learn More'
        })),
      standardList: allServices
        .filter(s => !s.isFeatured)
        .slice(0, 5)
        .map(s => ({
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
    const business = KCROC_GRAPH.business;

    return {
      company: [
        { label: 'About Us', route: '/about' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Gallery', route: '/gallery' },
        { label: 'FAQ', route: '/faq' },
      ],
      legal: [ 
        { label: 'Privacy Policy', route: '/privacy-security-kuwait' },
        { label: 'Terms of Service', route: '/terms' },
        { label: 'Warranty Policy', route: '/warranty' }
      ],
      quickActions: [ 
        { label: 'Book Free Pickup', route: '/book', isPrimary: true },
        // ✅ Defensive: Safely pull phone number with a hardcoded fallback just in case
        { label: 'WhatsApp Technician', route: `https://wa.me/${business?.telephone ?? '96555301913'}`, isExternal: true },
        { label: 'Call Lab', route: `tel:${business?.telephone ?? '+96555301913'}` }
      ],
      // ✅ Defensive: Null-safe arrays on every graph collection access
      services: this.sortByPriority(KCROC_GRAPH.services ?? []).map(s => ({ label: s.title, route: `/${s.slug}` })),
      brands: this.sortByPriority(KCROC_GRAPH.brands ?? []).map(b => ({ label: b.brandName, route: `/${b.slug}` })),
      problems: this.sortByPriority(KCROC_GRAPH.problems ?? []).map(p => ({ label: p.title, route: `/${p.slug}` })),
      locations: this.sortByPriority(KCROC_GRAPH.locations ?? []).map(l => ({ label: l.title, route: `/location/${l.slug}` }))
    };
  }

  /**
   * Dynamically generates Breadcrumbs based on the current active slug
   */
  public static buildBreadcrumbs(currentSlug: string) {
    // ✅ Defensive: Guard against a missing slug
    if (!currentSlug) return [{ label: 'Home', route: '/' }];

    // ✅ Defensive: Guard against routableEntities being undefined
    const entity = (KCROC_GRAPH.routableEntities ?? []).find(e => e.slug === currentSlug);
    if (!entity) return [{ label: 'Home', route: '/' }];

    const breadcrumbs: { label: string; route: string }[] = [{ label: 'Home', route: '/' }];
    
    // Dynamic Parent Assignment based on entityType
    if (entity.entityType === 'Service') breadcrumbs.push({ label: 'Services', route: '/services' });
    if (entity.entityType === 'Brand') breadcrumbs.push({ label: 'Brands', route: '/brands' });
    if (entity.entityType === 'Problem') breadcrumbs.push({ label: 'Troubleshooting', route: '/problems' });
    if (entity.entityType === 'Location') breadcrumbs.push({ label: 'Service Areas', route: '/areas' });

    breadcrumbs.push({ label: entity.title, route: `/${entity.slug}` });
    return breadcrumbs;
  }
}
