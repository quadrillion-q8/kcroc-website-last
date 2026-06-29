import { IRepository } from './IRepository';
import { KCROC_GRAPH } from '../../data/graph'; // Legacy import - isolated here

export interface ServiceEntity {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
}

export class ServiceRepository implements IRepository<ServiceEntity> {
  
  /**
   * Retrieves all computer and laptop repair services.
   * Explicitly filters out any mobile-related anomalies to enforce business rules.
   */
  findAll(): ServiceEntity[] {
    return KCROC_GRAPH.services
      .filter(service => !service.title.toLowerCase().includes('mobile'))
      .map(this.normalizeEntity);
  }

  /**
   * Finds a specific service by its URL slug (O(1) lookup if indexed).
   */
  findBySlug(slug: string): ServiceEntity | null {
    const service = KCROC_GRAPH.services.find(s => s.id === slug);
    if (!service) return null;
    return this.normalizeEntity(service);
  }

  /**
   * Searches services by keyword for future autocomplete/AI matching.
   */
  search(query: string): ServiceEntity[] {
    const lowerQuery = query.toLowerCase();
    return this.findAll().filter(service => 
      service.title.toLowerCase().includes(lowerQuery) || 
      service.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Normalizes data to ensure critical business guarantees are always present.
   */
  private normalizeEntity(rawService: any): ServiceEntity {
    const features = rawService.features || [];
    // Ensure Free Pick & Drop is universally injected at the data layer
    if (!features.includes('Free Pick & Drop')) {
      features.push('Free Pick & Drop');
    }

    return {
      id: rawService.id,
      title: rawService.title,
      slug: rawService.id, // Assuming id matches slug in graph
      description: rawService.description,
      features
    };
  }
}

// Export a singleton instance for immediate dependency injection use
export const serviceRepository = new ServiceRepository();
