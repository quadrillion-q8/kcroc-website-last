// File: app/frontend/src/core/services/MetadataService.ts
import { SEOMetadata, JsonLd, MetadataResult } from '../types';
import { BUSINESS_INFO, DEFAULT_SEO } from '../../constants/business/data';
import { MetadataValidator } from '../validators/MetadataValidator';

export class MetadataService {
  // 14. Cache Results
  private static cache = new Map<string, MetadataResult>();

  /**
   * 3 & 4. Normalizes relative URLs into absolute URLs safely.
   */
  private static ensureAbsoluteUrl(url: string | undefined, base: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  }

  /**
   * 5. Normalizes and deduplicates keywords immutably.
   */
  private static normalizeKeywords(keywords?: string[]): string[] {
    if (!keywords || !Array.isArray(keywords)) return [];
    const cleaned = keywords
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0);
    return Array.from(new Set(cleaned)).sort();
  }

  /**
   * 2. Pure function: Never mutates incoming data. Returns a frozen Rich Result.
   */
  public static normalize(seoInput: SEOMetadata, schemasInput?: JsonLd | JsonLd[]): MetadataResult {
    const cacheKey = seoInput.canonicalUrl || 'default_key';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const baseUrl = BUSINESS_INFO.url || 'https://www.computerrepairkuwait.com';
    const { errors, warnings } = MetadataValidator.validate(seoInput, baseUrl);

    // 1. Use Vite-native environment variables
    if (import.meta.env.DEV) {
      warnings.forEach(w => console.warn(`[MetadataService] ⚠️ ${w}`));
      errors.forEach(e => console.error(`[MetadataService] ❌ ${e}`));
    }

    // 6. Consolidate Robots Directives
    const robotsSet = new Set<string>();
    if (seoInput.robots) {
      seoInput.robots.split(',').forEach(r => robotsSet.add(r.trim().toLowerCase()));
    } else {
      robotsSet.add('index').add('follow');
    }
    if (seoInput.noArchive) robotsSet.add('noarchive');
    if (seoInput.noSnippet) robotsSet.add('nosnippet');

    // 12. Separate Schema extraction
    let schemas: JsonLd[] = [];
    if (schemasInput) {
      schemas = Array.isArray(schemasInput) ? schemasInput : [schemasInput];
    } else if (seoInput.structuredData) {
      schemas = Array.isArray(seoInput.structuredData) ? seoInput.structuredData : [seoInput.structuredData];
    }

    // Combine fallbacks into a brand-new immutable object
    const normalizedSeo: SEOMetadata = {
      title: seoInput.title || DEFAULT_SEO.title,
      description: seoInput.description || DEFAULT_SEO.description,
      canonicalUrl: this.ensureAbsoluteUrl(seoInput.canonicalUrl, baseUrl),
      keywords: this.normalizeKeywords(seoInput.keywords),
      robots: Array.from(robotsSet).join(', '),
      
      // 6. Language Defaults
      language: seoInput.language || BUSINESS_INFO.locale || 'en-KW',
      author: seoInput.author || BUSINESS_INFO.name,
      publisher: seoInput.publisher || BUSINESS_INFO.name,
      themeColor: seoInput.themeColor || BUSINESS_INFO.themeColor,
      
      // 8. OpenGraph Normalization
      ogImage: {
        url: this.ensureAbsoluteUrl(seoInput.ogImage?.url || DEFAULT_SEO.ogImage, baseUrl),
        secureUrl: this.ensureAbsoluteUrl(seoInput.ogImage?.secureUrl || seoInput.ogImage?.url || DEFAULT_SEO.ogImage, baseUrl),
        alt: seoInput.ogImage?.alt || seoInput.title || DEFAULT_SEO.title,
        type: seoInput.ogImage?.type || 'image/jpeg',
      },
      
      // 9. Twitter Normalization
      twitterImage: {
        url: this.ensureAbsoluteUrl(seoInput.twitterImage?.url || seoInput.ogImage?.url || DEFAULT_SEO.ogImage, baseUrl),
        alt: seoInput.twitterImage?.alt || seoInput.ogImage?.alt || seoInput.title || DEFAULT_SEO.title,
      },
      
      alternateLanguages: seoInput.alternateLanguages || {}
    };

    // 10 & 13. Return a Frozen, Rich Result
    const result: MetadataResult = Object.freeze({
      seo: Object.freeze(normalizedSeo),
      schemas: Object.freeze([...schemas]),
      warnings: Object.freeze([...warnings]),
      errors: Object.freeze([...errors])
    });

    this.cache.set(cacheKey, result);
    return result;
  }
}
