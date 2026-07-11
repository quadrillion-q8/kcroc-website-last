// File: app/frontend/src/core/navigation/NavigationBuilder.ts
import { KCROC_GRAPH } from '../../../data/graph';

export class NavigationBuilder {
  /**
   * Builds the strictly formatted data required by DesktopMegaMenu.tsx
   */
  static getMegaMenuServices() {
    // 1. Safely pull all services, defaulting to empty array if undefined
    const allServices = KCROC_GRAPH.services || [];

    // 2. Sort by navigation priority to ensure the most important services appear first
    const sortedServices = [...allServices].sort((a: any, b: any) => 
      (a.navigationPriority || 99) - (b.navigationPriority || 99)
    );

    // 3. Identify featured items. If none are explicitly flagged 'isFeatured', slice the top 3.
    const explicitlyFeatured = sortedServices.filter((s: any) => s.isFeatured);
    const featuredRaw = explicitlyFeatured.length > 0 
      ? explicitlyFeatured 
      : sortedServices.slice(0, 3);

    // 4. The standard list becomes whatever is left over
    const standardRaw = sortedServices.filter((s: any) => 
      !featuredRaw.some(f => f.slug === s.slug)
    );

    // 5. Map strictly to the exact prop types expected by the Mega Menu
    return {
      featured: featuredRaw.map((s: any) => ({
        slug: s.slug,
        title: s.title || s.name,
        icon: s.iconKey || 'laptop',
        description: s.shortDescription || 'Professional component-level repair and diagnostic services.',
        callToAction: s.callToAction || 'Learn More'
      })),
      standardList: standardRaw.map((s: any) => ({
        slug: s.slug,
        title: s.title || s.name
      }))
    };
  }

  /**
   * Builds the simple label/route arrays required by DesktopDropdowns and Mobile accordions
   */
  static getFooterDirectory() {
    return {
      services: (KCROC_GRAPH.services || []).map((s: any) => ({
        label: s.title || s.name,
        route: `/${s.slug}`
      })),
      brands: (KCROC_GRAPH.brands || []).map((b: any) => ({
        label: b.name,
        route: `/${b.slug}`
      })),
      problems: (KCROC_GRAPH.problems || []).map((p: any) => ({
        label: p.name,
        route: `/${p.slug}`
      }))
    };
  }
}
