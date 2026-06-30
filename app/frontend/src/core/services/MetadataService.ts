// File: app/frontend/src/core/services/MetadataService.ts
import { SEOMetadata, JsonLd, MetadataResult } from '../types';
import { BUSINESS_INFO, DEFAULT_SEO } from '../../constants/data'; // ✅ Fixed: Correct directory pathing
import { MetadataValidator } from '../validators/MetadataValidator';

export class MetadataService {
  private static cache = new Map<string, MetadataResult>();

  /**
   * Normalizes relative URLs into absolute URLs safely.
   */
  private static ensureAbsoluteUrl(url: string | undefined, base: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  }

  /**
   * Normalizes and deduplicates keywords immutably.
   */
  private static normalizeKeywords(keywords?: string[]): string[] {
    if (!keywords || !Array.isArray(keywords)) return [];
    const cleaned = keywords
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0);
    return Array.from(new Set(cleaned)).sort();
  }

  /**
   * Pure function: Never mutates incoming data. Returns a frozen Rich Result.
   */
  public static normalize(seoInput: SEOMetadata, schemasInput?: JsonLd | JsonLd[]): MetadataResult {
    const cacheKey = seoInput.canonicalUrl || 'default_key';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const baseUrl = BUSINESS_INFO?.url || 'https://www.computerrepairkuwait.com';
    const { errors, warnings } = MetadataValidator.validate(seoInput, baseUrl);

    // Use Vite-native environment variables
    if (import.meta.env.DEV) {
      warnings.forEach(w => console.warn(`[MetadataService] ⚠️ ${w}`));
      errors.forEach(e => console.error(`[MetadataService] ❌ ${e}`));
    }

    // Consolidate Robots Directives
    const robotsSet = new Set<string>();
    if (seoInput.robots) {
      seoInput.robots.split(',').forEach(r => robotsSet.add(r.trim().toLowerCase()));
    } else {
      robotsSet.add('index').add('follow');
    }
    if (seoInput.noArchive) robotsSet.add('noarchive');
    if (seoInput.noSnippet) robotsSet.add('nosnippet');

    // Separate Schema extraction
    let schemas: JsonLd[] = [];
    if (schemasInput) {
      schemas = Array.isArray(schemasInput) ? schemasInput : [schemasInput];
    } else if (seoInput.structuredData) {
      schemas = Array.isArray(seoInput.structuredData) ? seoInput.structuredData : [seoInput.structuredData];
    }

    // Combine fallbacks into a brand-new immutable object
    const normalizedSeo: SEOMetadata = {
      title: seoInput.title || DEFAULT_SEO?.title || BUSINESS_INFO?.name,
      description: seoInput.description || DEFAULT_SEO?.description || 'Computer Repair Services in Kuwait',
      canonicalUrl: this.ensureAbsoluteUrl(seoInput.canonicalUrl, baseUrl),
      keywords: this.normalizeKeywords(seoInput.keywords),
      robots: Array.from(robotsSet).join(', '),
      
      // Language Defaults
      language: seoInput.language || BUSINESS_INFO?.locale || 'en-KW',
      author: seoInput.author || BUSINESS_INFO?.name,
      publisher: seoInput.publisher || BUSINESS_INFO?.name,
      themeColor: seoInput.themeColor || BUSINESS_INFO?.themeColor,
      
      // OpenGraph Normalization
      ogType: seoInput.ogType || 'website',
      ogImage: {
        url: this.ensureAbsoluteUrl(seoInput.ogImage?.url || DEFAULT_SEO?.ogImage || '/logo.png', baseUrl),
        secureUrl: this.ensureAbsoluteUrl(seoInput.ogImage?.secureUrl || seoInput.ogImage?.url || DEFAULT_SEO?.ogImage || '/logo.png', baseUrl),
        alt: seoInput.ogImage?.alt || seoInput.title || DEFAULT_SEO?.title || BUSINESS_INFO?.name,
        type: seoInput.ogImage?.type || 'image/jpeg',
        width: seoInput.ogImage?.width || 1200,
        height: seoInput.ogImage?.height || 630,
      },
      
      // Twitter Normalization
      twitterImage: {
        url: this.ensureAbsoluteUrl(seoInput.twitterImage?.url || seoInput.ogImage?.url || DEFAULT_SEO?.ogImage || '/logo.png', baseUrl),
        alt: seoInput.twitterImage?.alt || seoInput.ogImage?.alt || seoInput.title || DEFAULT_SEO?.title || BUSINESS_INFO?.name,
      },
      
      alternateLanguages: seoInput.alternateLanguages || {}
    };

    // Return a Frozen, Rich Result
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
