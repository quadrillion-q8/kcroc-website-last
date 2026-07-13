import { KCROC_GRAPH } from '../data/graph';
import { EntityType } from '../core/analytics/types';

// Loose type interfaces to match Graph structure safely
export interface GraphService {
  id: string;
  type: string;
  title: string;
  slug: string;
  description: string;
  iconKey: string;
  popular?: boolean;
  pricing?: any;
  warranty?: any;
  coreFeatures?: string[];
  relatedIssues?: string[];
  relatedBrands?: string[];
}

export interface GraphIssue {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  symptoms?: string[];
}

class GraphRegistry {
  private serviceSlugIndex: Map<string, GraphService> = new Map();
  private serviceIdIndex: Map<string, GraphService> = new Map();
  private issueSlugIndex: Map<string, GraphIssue> = new Map();

  constructor() {
    this.buildIndexes();
  }

  private buildIndexes() {
    const services = (KCROC_GRAPH.services as unknown) as GraphService[] || [];
    const issues = (KCROC_GRAPH as any).issues as GraphIssue[] || [];

    services.forEach(service => {
      this.serviceSlugIndex.set(service.slug, service);
      this.serviceIdIndex.set(service.id, service);
    });

    issues.forEach(issue => {
      this.issueSlugIndex.set(issue.slug, issue);
    });
  }

  public getServiceBySlug(slug: string): GraphService | undefined {
    return this.serviceSlugIndex.get(slug);
  }

  public getServiceById(id: string): GraphService | undefined {
    return this.serviceIdIndex.get(id);
  }

  public getAllServices(): GraphService[] {
    return Array.from(this.serviceIdIndex.values());
  }

  public getPopularServices(): GraphService[] {
    return this.getAllServices().filter(s => s.popular);
  }

  public getRelatedIssuesForService(serviceId: string): GraphIssue[] {
    const service = this.getServiceById(serviceId);
    if (!service || !service.relatedIssues) return [];
    
    return service.relatedIssues
      .map((issueId: string) => Array.from(this.issueSlugIndex.values()).find(i => i.id === issueId))
      .filter((i: GraphIssue | undefined): i is GraphIssue => i !== undefined);
  }
}

export const Registry = new GraphRegistry();
