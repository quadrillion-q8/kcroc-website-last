import { KCROC_GRAPH } from '../data/graph';
import { ServiceEntity, IssueEntity, LocationEntity, BrandEntity } from '../core/analytics/types'; // Assumes strict types defined here

class GraphRegistry {
  private serviceSlugIndex: Map<string, ServiceEntity> = new Map();
  private serviceIdIndex: Map<string, ServiceEntity> = new Map();
  private issueSlugIndex: Map<string, IssueEntity> = new Map();

  constructor() {
    this.buildIndexes();
  }

  /**
   * O(1) indexing for instantaneous retrieval at scale.
   * Runs once on instantiation.
   */
  private buildIndexes() {
    // Note: Casts are safe here assuming KCROC_GRAPH matches the strict Zod schema
    const services = KCROC_GRAPH.services as unknown as ServiceEntity[];
    const issues = (KCROC_GRAPH as any).issues as IssueEntity[] || [];

    services.forEach(service => {
      this.serviceSlugIndex.set(service.slug, service);
      this.serviceIdIndex.set(service.id, service);
    });

    issues.forEach(issue => {
      this.issueSlugIndex.set(issue.slug, issue);
    });
  }

  public getServiceBySlug(slug: string): ServiceEntity | undefined {
    return this.serviceSlugIndex.get(slug);
  }

  public getServiceById(id: string): ServiceEntity | undefined {
    return this.serviceIdIndex.get(id);
  }

  public getAllServices(): ServiceEntity[] {
    return Array.from(this.serviceIdIndex.values());
  }

  public getPopularServices(): ServiceEntity[] {
    return this.getAllServices().filter(s => (s as any).popular);
  }

  public getRelatedIssuesForService(serviceId: string): IssueEntity[] {
    const service = this.getServiceById(serviceId);
    if (!service || !(service as any).relatedIssues) return [];
    
    return (service as any).relatedIssues
      .map((issueId: string) => Array.from(this.issueSlugIndex.values()).find(i => i.id === issueId))
      .filter((i: IssueEntity | undefined): i is IssueEntity => i !== undefined);
  }
}

// Export singleton instance
export const Registry = new GraphRegistry();
