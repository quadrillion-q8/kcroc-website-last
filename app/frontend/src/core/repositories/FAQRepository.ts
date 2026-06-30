// File: app/frontend/src/core/repositories/FAQRepository.ts
import { FAQEntity, EntityType, EntityStatus, PaginationOptions } from '../types';

/**
 * 1. STRICT LEGACY TYPE
 * Eliminates `any` and explicitly defines the shape of our incoming raw data.
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
 * 10. PAGINATED RESULT ENVELOPE
 * Standardizes repository returns for infinite scroll, tables, and API responses.
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

/**
 * 9 & 14. DATA SOURCE CONTRACT (DEPENDENCY INJECTION)
 * The repository no longer knows about graph.ts. It only knows it receives an IDataSource.
 */
export interface IDataSource {
  getFAQs(): LegacyFAQ[];
}

export class FAQRepository {
  /**
   * 8. IN-MEMORY CACHE
   * Normalizes data exactly once per lifecycle, drastically reducing CPU overhead.
   */
  private cache: FAQEntity[] | null = null;

  // 14. DEPENDENCY INJECTION
  constructor(private dataSource: IDataSource) {}

  /**
   * Orchestrates the cache and fetching logic.
   */
  private async getNormalizedData(): Promise<FAQEntity[]> {
    if (!this.cache) {
      const rawData = this.dataSource.getFAQs();
      // 13. REPOSITORY-LEVEL VALIDATION
      this.cache = rawData
        .filter(this.isValidLegacyFAQ)
        .map(this.normalizeEntity);
    }
    return this.cache;
  }

  /**
   * 11. FILTERING & PAGINATION ENGINE
   */
  async findAll(options?: PaginationOptions): Promise<PaginatedResult<FAQEntity>> {
    let items = await this.getNormalizedData();

    // Implement Sorting
    if (options?.sort) {
      // Basic implementation: reverse chronological if 'newest'
      if (options.sort === 'newest') {
        items = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      }
    }

    // Calculate Pagination Metadata
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
    const data = await this.getNormalizedData();
    return data.find(f => f.id === id);
  }

  async findBySlug(slug: string): Promise<FAQEntity | undefined> {
    const data = await this.getNormalizedData();
    return data.find(f => f.slug === slug);
  }

  /**
   * 7 & 12. ADVANCED SCORING SEARCH ENGINE
   */
  async search(query: string, options?: PaginationOptions): Promise<PaginatedResult<FAQEntity>> {
    const lowerQuery = query.toLowerCase();
    const data = await this.getNormalizedData();
    
    const scoredResults = data.map(faq => {
      let score = 0;
      
      // Exact Title Match (Highest Priority)
      if (faq.title.toLowerCase().includes(lowerQuery)) score += 10;
      
      // Keyword Match
      if (faq.search?.keywords.some(k => k.toLowerCase().includes(lowerQuery))) score += 5;
      
      // Synonym Match
      if (faq.search?.synonyms.some(s => s.toLowerCase().includes(lowerQuery))) score += 3;
      
      // Description/Answer Match
      if (faq.description.toLowerCase().includes(lowerQuery)) score += 1;

      // Apply Base Entity Boost
      score *= (faq.search?.boost || 1.0);

      return { faq, score };
    }).filter(res => res.score > 0);

    // Sort by highest score
    scoredResults.sort((a, b) => b.score - a.score);
    const sortedItems = scoredResults.map(res => res.faq);

    const limit = options?.limit || sortedItems.length;
    const offset = options?.offset || 0;
    const paginatedItems = sortedItems.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      total: sortedItems.length,
      offset,
      limit,
      hasMore: offset + paginatedItems.length < sortedItems.length
    };
  }

  /**
   * 13. PRE-NORMALIZATION VALIDATION
   * Rejects malformed data before it pollutes the system.
   */
  private isValidLegacyFAQ(raw: LegacyFAQ): boolean {
    return Boolean(raw && raw.id && raw.question && raw.answer);
  }

  /**
   * Normalizes legacy formats into the Enterprise Entity Standard.
   */
  private normalizeEntity(raw: LegacyFAQ): FAQEntity {
    // 2. STABLE TIMESTAMPS (Fallback to a stable epoch, NOT Date.now())
    const stableEpoch = "2024-01-01T00:00:00Z";

    return {
      id: raw.id,
      // 3. SEPARATE SLUG FROM ID
      slug: raw.slug || `faq-${raw.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      entityType: EntityType.FAQ,
      status: EntityStatus.PUBLISHED,
      
      title: raw.question,
      description: raw.answer,
      question: raw.question,
      answer: raw.answer,
      
      createdAt: raw.createdAt || stableEpoch,
      updatedAt: raw.updatedAt || stableEpoch,

      // 4. SEO METADATA
      seo: {
        title: `${raw.question} | KCROC FAQ`,
        description: raw.answer.substring(0, 150),
        canonicalUrl: `https://www.computerrepairkuwait.com/faq/${raw.slug || raw.id}`
      },

      // 5. VALIDATION METADATA
      validation: {
        isValid: true,
        errors: [],
        warnings: []
      },

      // 6. RELATIONSHIPS
      relationships: {
        services: [],
        locations: [],
        blogs: [],
        faqs: [] // For related questions
      },
      
      // 12. SEARCH METADATA WITH BOOST
      search: {
        keywords: raw.keywords || [],
        synonyms: raw.synonyms || [],
        boost: 1.0 
      }
    };
  }
}
