// File: app/frontend/src/core/registry.ts
import { ServiceRepository } from './repositories/ServiceRepository';
import { LocationRepository } from './repositories/LocationRepository';
import { FAQRepository } from './repositories/FAQRepository';
import { KCROC_GRAPH } from '../data/graph';

/**
 * 15. REPOSITORY REGISTRY
 * Centralizes instantiation and dependency injection.
 */
class RepositoryRegistry {
  public readonly services: ServiceRepository;
  public readonly locations: LocationRepository;
  public readonly faqs: FAQRepository;

  constructor() {
    // Inject the Data Source (graph) into the repositories
    this.services = new ServiceRepository(KCROC_GRAPH);
    this.locations = new LocationRepository(KCROC_GRAPH);
    this.faqs = new FAQRepository(KCROC_GRAPH);
  }
}

export const registry = new RepositoryRegistry();
