// File: app/frontend/src/core/repositories/LocationRepository.ts
import { IRepository, LocationEntity, EntityType, EntityStatus, PaginationOptions } from '../types';
import { KCROC_GRAPH } from '../../data/graph';

export class LocationRepository implements IRepository<LocationEntity> {
  
  /**
   * Fetches all registered service locations and physical shops.
   */
  async findAll(options?: PaginationOptions): Promise<LocationEntity[]> {
    let results = KCROC_GRAPH.locations.map(this.normalizeEntity);
      
    // Apply pagination if requested by the UI or build engine
    if (options?.limit) {
      const offset = options.offset || 0;
      results = results.slice(offset, offset + options.limit);
    }
    
    return Promise.resolve(results);
  }

  /**
   * Fetches a specific location by its unique ID.
   */
  async findById(id: string): Promise<LocationEntity | undefined> {
    const location = KCROC_GRAPH.locations.find(l => l.id === id);
    if (!location) return Promise.resolve(undefined);
    return Promise.resolve(this.normalizeEntity(location));
  }

  /**
   * Fetches a location by its URL slug (e.g., 'hawalli' or 'salmiya').
   */
  async findBySlug(slug: string): Promise<LocationEntity | undefined> {
    // In our current graph architecture, the slug and ID are identical
    return this.findById(slug);
  }

  /**
   * Searches locations based on user input or AI queries.
   */
  async search(query: string, options?: PaginationOptions): Promise<LocationEntity[]> {
    const lowerQuery = query.toLowerCase();
    const allLocations = await this.findAll(options);
    
    const results = allLocations.filter(location => 
      location.title.toLowerCase().includes(lowerQuery) || 
      location.description.toLowerCase().includes(lowerQuery) ||
      location.landmark.toLowerCase().includes(lowerQuery)
    );
    
    return Promise.resolve(results);
  }

  /**
   * Transforms raw graph data into the strict Enterprise LocationEntity format.
   */
  private normalizeEntity(rawLocation: any): LocationEntity {
    return {
      id: rawLocation.id,
      slug: rawLocation.id, // Fallback for legacy graph mapping
      entityType: EntityType.Location,
      status: EntityStatus.PUBLISHED,
      
      // Core Content
      title: rawLocation.name || rawLocation.title,
      description: rawLocation.description || `Expert computer and laptop repair services in ${rawLocation.name}.`,
      
      // Location Specifics
      landmark: rawLocation.landmark || 'Kuwait',
      coords: rawLocation.coordinates || { lat: 29.3356, lng: 48.0250 }, // Defaulting to Hawalli coords if missing
      serviceRadiusKm: rawLocation.radius || 15, // Default 15km service radius for Pick & Drop
      
      // Timestamps (Mocked for flat files)
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // Pre-fill essential SEO Metadata (UPGRADE 11 preparation)
      seo: {
        title: `${rawLocation.name || rawLocation.title} Computer Repair | KCROC`,
        description: `Fast, reliable laptop and PC repair in ${rawLocation.name}. Free pick and drop available.`,
        canonicalUrl: `https://www.computerrepairkuwait.com/${rawLocation.id}`,
      }
    };
  }
}

// Export a singleton instance for dependency injection
export const locationRepository = new LocationRepository();
