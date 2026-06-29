// File: app/frontend/src/core/repositories/ServiceRepository.ts
import { IRepository, ServiceEntity, EntityType, EntityStatus, PaginationOptions } from '../types';
import { KCROC_GRAPH } from '../../data/graph';

export class ServiceRepository implements IRepository<ServiceEntity> {
  
  async findAll(options?: PaginationOptions): Promise<ServiceEntity[]> {
    let results = KCROC_GRAPH.services
      .filter(service => !service.title.toLowerCase().includes('mobile'))
      .map(this.normalizeEntity);
      
    // Basic array slice for pagination support
    if (options?.limit) {
      const offset = options.offset || 0;
      results = results.slice(offset, offset + options.limit);
    }
    
    return Promise.resolve(results);
  }

  async findById(id: string): Promise<ServiceEntity | undefined> {
    const service = KCROC_GRAPH.services.find(s => s.id === id);
    if (!service) return Promise.resolve(undefined);
    return Promise.resolve(this.normalizeEntity(service));
  }

  async findBySlug(slug: string): Promise<ServiceEntity | undefined> {
    // Assuming slug maps directly to ID in our current flat file setup
    return this.findById(slug);
  }

  async search(query: string, options?: PaginationOptions): Promise<ServiceEntity[]> {
    const lowerQuery = query.toLowerCase();
    const allServices = await this.findAll(options);
    
    const results = allServices.filter(service => 
      service.title.toLowerCase().includes(lowerQuery) || 
      service.description.toLowerCase().includes(lowerQuery)
    );
    
    return Promise.resolve(results);
  }

  /**
   * Translates the old graph schema into the new Enterprise Schema
   */
  private normalizeEntity(rawService: any): ServiceEntity {
    const features = rawService.features || [];
    if (!features.includes('Free Pick & Drop')) {
      features.push('Free Pick & Drop');
    }

    return {
      id: rawService.id,
      slug: rawService.id, // Fallback for legacy graph
      entityType: EntityType.Service,
      status: EntityStatus.PUBLISHED,
      title: rawService.title,
      description: rawService.description,
      features,
      isPickAndDropEligible: true,
      
      // Mocks for timestamps since flat files don't track them inherently
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export const serviceRepository = new ServiceRepository();
