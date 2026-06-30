// File: app/frontend/src/core/repositories/FAQRepository.ts
import { 
  FAQEntity, 
  EntityType, 
  EntityStatus, 
  PaginationOptions, 
  PaginatedResult 
} from '../types';

/**
 * 1. STRICT LEGACY TYPE
 * Explicitly defines the shape of our incoming raw data from the data source.
 */
export interface LegacyFAQ {
  id: string;
  slug?: string;
  question: string;
  answer: string;
  keywords?: string[];
  synonyms?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 9 & 14. DATA SOURCE CONTRACT
 * The repository remains oblivious to where the data comes from (Graph, CMS, or API).
 */
export interface IFAQDataSource {
  getFAQs(): LegacyFAQ[];
}

export class FAQRepository {
  /**
   * 8. IN-MEMORY CACHE
   * Memoizes normalized data to prevent redundant computation across the lifecycle.
   */
  private cache: FAQEntity[] | null = null;

  // 14. DEPENDENCY INJECTION via Constructor
  constructor(private dataSource: IFAQDataSource) {}

  /**
   * Internal orchestrator for lazy loading and normalization.
   */
  private getNormalizedData(): FAQEntity[] {
    if (!this.cache) {
      // 13. REPOSITORY-LEVEL VALIDATION
      this.cache = this.dataSource
        .getFAQs()
        .filter(this.isValidLegacyFAQ)
        .map(this.normalizeEntity);
    }
    return this.cache;
  }

  /**
   * 11. FILTERING & PAGINATION ENGINE
   * Returns a PaginatedResult<T> envelope for enterprise-ready UI consumption.
   */
  async findAll(options?: PaginationOptions): Promise<PaginatedResult<FAQEntity>> {
    let items = this.getNormalizedData();

    // Implement Sorting
    if (options?.sort === 'newest') {
      items = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }

    const total = items.length;
    const limit = options?.limit || total;
    const offset = options?.offset || 0;
    
    const paginatedItems = items.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      total,
      offset,
      limit,
      hasMore: offset + paginatedItems.length < total
    };
  }

  async findById(id: string): Promise<FAQEntity | undefined> {
    return this.getNormalizedData().find(f => f.id === id);
  }

  async findBySlug(slug: string): Promise<FAQEntity | undefined> {
    return this.getNormalizedData().find(f => f.slug === slug);
  }

  /**
   * 7 & 12. ADVANCED SCORING SEARCH ENGINE
   * Implements custom weights for title, keywords, and description.
   */
  async search(query: string, options?: PaginationOptions): Promise<PaginatedResult<FAQEntity>> {
    const lowerQuery = query.toLowerCase();
    const data = this.getNormalizedData();
    
    const scoredResults = data
      .map(faq => {
        let score = 0;
        if (faq.title.toLowerCase().includes(lowerQuery)) score += 10;
        if (faq.search?.keywords.some(k => k.toLowerCase().includes(lowerQuery))) score += 5;
        if (faq.search?.synonyms.some(s => s.toLowerCase().includes(lowerQuery))) score += 3;
        if (faq.description.toLowerCase().includes(lowerQuery)) score += 1;
        score *= (faq.search?.boost || 1.0);
        return { faq, score };
      })
      .filter(res => res.score > 0)
      .sort((a, b) => b.score - a.score);

    const sortedItems = scoredResults.map(res => res.faq);
    const limit = options?.limit || sortedItems.length;
    const offset = options?.offset || 0;

    return {
      items: sortedItems.slice(offset, offset + limit),
      total: sortedItems.length,
      offset,
      limit,
      hasMore: offset + limit < sortedItems.length
    };
  }

  private isValidLegacyFAQ(raw: LegacyFAQ): boolean {
    return Boolean(raw?.id && raw?.question && raw?.answer);
  }

  /**
   * Normalizes legacy formats into the Enterprise Entity Standard.
   */
  private normalizeEntity(raw: LegacyFAQ): FAQEntity {
    // 2. STABLE TIMESTAMPS
    const stableEpoch = "2024-01-01T00:00:00Z";

    return {
      id: raw.id,
      slug: raw.slug || `faq-${raw.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      entityType: EntityType.FAQ,
      status: EntityStatus.PUBLISHED,
      title: raw.question,
      description: raw.answer,
      question: raw.question,
      answer: raw.answer,
      createdAt: raw.createdAt || stableEpoch,
      updatedAt: raw.updatedAt || stableEpoch,
      seo: {
        title: `${raw.question} | KCROC FAQ`,
        description: raw.answer.substring(0, 150),
        canonicalUrl: `https://www.computerrepairkuwait.com/faq/${raw.slug || raw.id}`
      },
      validation: { isValid: true, errors: [], warnings: [] },
      relationships: { services: [], locations: [], blogs: [], faqs: [] },
      search: {
        keywords: raw.keywords || [],
        synonyms: raw.synonyms || [],
        boost: 1.0 
      }
    };
  }
}
