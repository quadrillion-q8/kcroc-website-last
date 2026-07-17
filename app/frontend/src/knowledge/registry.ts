// File: app/frontend/src/knowledge/registry.ts
import { KCROC_GRAPH } from '../data/graph';
import { ServiceEntity, ProblemEntity, BrandEntity, CaseStudyEntity } from '../types/knowledgeGraph';

export class Registry {
  private static isIndexed = false;
  private static serviceSlugIndex = new Map<string, ServiceEntity>();
  private static problemSlugIndex = new Map<string, ProblemEntity>();
  private static problemIdIndex = new Map<string, ProblemEntity>();
  private static brandSlugIndex = new Map<string, BrandEntity>();
  private static caseStudySlugIndex = new Map<string, CaseStudyEntity>();

  private static buildIndexes() {
    if (this.isIndexed) return;

    // Index Services
    (KCROC_GRAPH.services || []).forEach(service => {
      this.serviceSlugIndex.set(service.slug, service);
    });

    // 🚀 FIXED: Index Problems (pulling from KCROC_GRAPH.problems instead of .issues)
    (KCROC_GRAPH.problems || []).forEach(problem => {
      this.problemSlugIndex.set(problem.slug, problem);
      this.problemIdIndex.set(problem.id, problem); // 🚀 FIXED: Added ID index
    });

    // Index Brands
    (KCROC_GRAPH.brands || []).forEach(brand => {
      this.brandSlugIndex.set(brand.slug, brand);
    });

    // Index Case Studies
    (KCROC_GRAPH.caseStudies || []).forEach(cs => {
      this.caseStudySlugIndex.set(cs.slug, cs);
    });

    this.isIndexed = true;
  }

  public static getAllServices(): ServiceEntity[] {
    return KCROC_GRAPH.services || [];
  }

  public static getServiceBySlug(slug: string): ServiceEntity | undefined {
    this.buildIndexes();
    return this.serviceSlugIndex.get(slug);
  }

  // 🚀 FIXED: INVERTED LOOKUP DIRECTION
  // Instead of scanning the service for a non-existent relatedIssues array,
  // we scan all problems to find which ones reference this serviceId.
  public static getRelatedIssuesForService(serviceId: string): ProblemEntity[] {
    this.buildIndexes();
    if (!serviceId) return [];
    
    return (KCROC_GRAPH.problems || []).filter(problem => 
      problem.relatedServiceIds?.includes(serviceId)
    );
  }

  public static getAllProblems(): ProblemEntity[] {
    return KCROC_GRAPH.problems || [];
  }

  public static getProblemBySlug(slug: string): ProblemEntity | undefined {
    this.buildIndexes();
    return this.problemSlugIndex.get(slug);
  }

  public static getProblemById(id: string): ProblemEntity | undefined {
    this.buildIndexes();
    return this.problemIdIndex.get(id);
  }

  public static getBrandBySlug(slug: string): BrandEntity | undefined {
    this.buildIndexes();
    return this.brandSlugIndex.get(slug);
  }
  
  public static getCaseStudyBySlug(slug: string): CaseStudyEntity | undefined {
    this.buildIndexes();
    return this.caseStudySlugIndex.get(slug);
  }
}
