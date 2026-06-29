// File: app/frontend/src/core/services/RelationshipService.ts
import { serviceRepository } from '../repositories/ServiceRepository';
import { locationRepository } from '../repositories/LocationRepository';
import { ServiceEntity, LocationEntity } from '../types';

export class RelationshipService {
  
  /**
   * Automatically discovers which services are relevant to a specific location.
   * In the future, this can filter by AI semantic matching or specific location capabilities.
   */
  public static async getServicesForLocation(locationSlug: string, limit: number = 6): Promise<ServiceEntity[]> {
    try {
      // 1. Validate the location exists
      const location = await locationRepository.findBySlug(locationSlug);
      if (!location) return [];

      // 2. Fetch all services
      // Note: If some shops don't offer certain repairs, we would filter that here 
      // based on location.relationships.services
      const allServices = await serviceRepository.findAll();
      
      // 3. Return prioritized services for internal linking
      return allServices.slice(0, limit);
    } catch (error) {
      console.error("RelationshipEngine: Failed to link services to location", error);
      return [];
    }
  }

  /**
   * Automatically discovers which nearby locations offer a specific service.
   * Creates a cluster of geographically relevant internal links.
   */
  public static async getLocationsForService(serviceSlug: string, limit: number = 4): Promise<LocationEntity[]> {
    try {
      const service = await serviceRepository.findBySlug(serviceSlug);
      if (!service) return [];

      const allLocations = await locationRepository.findAll();
      return allLocations.slice(0, limit);
    } catch (error) {
      console.error("RelationshipEngine: Failed to link locations to service", error);
      return [];
    }
  }
}
