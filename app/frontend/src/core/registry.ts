// File: app/frontend/src/core/registry.ts
import { ServiceRepository } from './repositories/ServiceRepository';
import { LocationRepository } from './repositories/LocationRepository';
import { FAQRepository } from './repositories/FAQRepository';
import { KCROC_GRAPH } from '../data/graph';

/**
 * 15. REPOSITORY REGISTRY
 * Centralized dependency injection container.
 */
class RepositoryRegistry {
  public readonly services: ServiceRepository;
  public readonly locations: LocationRepository;
  public readonly faqs: FAQRepository;

  constructor() {
    // Injecting the raw graph data source
    // The repositories rely on the data, but the registry handles the wiring.
    this.services = new ServiceRepository(KCROC_GRAPH);
    this.locations = new LocationRepository(KCROC_GRAPH);
    
    // ADAPTATION LAYER:
    // We create a mini-adapter here to satisfy the IFAQDataSource interface
    // required by FAQRepository, ensuring the repository doesn't have 
    // a hard dependency on the full global graph.
    this.faqs = new FAQRepository({
      getFAQs: () => KCROC_GRAPH.faqs || []
    });
  }
}

export const registry = new RepositoryRegistry();
