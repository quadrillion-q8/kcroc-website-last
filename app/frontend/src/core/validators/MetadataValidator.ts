// File: app/frontend/src/core/validators/MetadataValidator.ts
import { SEOMetadata } from '../types';

export class MetadataValidator {
  public static validate(seo: SEOMetadata, baseUrl: string) {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Fallback identifier for logging
    const urlId = seo.canonicalUrl || 'unknown URL';

    // ─── 1. CORE CONTENT & TRUNCATION CHECKS ───
    if (!seo.title) {
      errors.push(`Missing 'title' for ${urlId}`);
    } else {
      if (seo.title.length < 10) warnings.push(`Title too short (<10 chars) for ${urlId}`);
      if (seo.title.length > 65) warnings.push(`Title too long (>65 chars, will truncate on Google) for ${urlId}`);
    }

    if (!seo.description) {
      errors.push(`Missing 'description' for ${urlId}`);
    } else {
      if (seo.description.length < 50) warnings.push(`Description too short (<50 chars) for ${urlId}`);
      if (seo.description.length > 160) warnings.push(`Description too long (>160 chars, will truncate on Google) for ${urlId}`);
    }

    // ─── 2. CANONICAL & DOMAIN LEAK CHECKS ───
    if (!seo.canonicalUrl) {
      errors.push('Missing canonicalUrl');
    } else {
      // Prevent Vercel preview URLs or localhost from being indexed as the canonical source
      if (seo.canonicalUrl.includes('localhost') || seo.canonicalUrl.includes('.vercel.app')) {
        warnings.push(`Staging/Local domain detected in canonical URL: ${seo.canonicalUrl}`);
      }
      
      // Warn if the canonical URL doesn't match the expected production Base URL
      if (baseUrl && seo.canonicalUrl.startsWith('http') && !seo.canonicalUrl.includes(baseUrl.replace(/^https?:\/\//, ''))) {
        warnings.push(`Canonical URL domain does not match Base URL on ${urlId}`);
      }
    }

    // ─── 3. SOCIAL & ACCESSIBILITY CHECKS ───
    if (seo.ogImage && !seo.ogImage.alt) {
      warnings.push(`Missing 'alt' text for OpenGraph image on ${urlId}`);
    }
    if (seo.twitterImage && !seo.twitterImage.alt) {
      warnings.push(`Missing 'alt' text for Twitter image on ${urlId}`);
    }

    // ─── 4. HREFLANG VALIDATION ───
    if (seo.alternateLanguages) {
      const langs = Object.keys(seo.alternateLanguages);
      const uniqueLangs = new Set(langs);
      
      if (uniqueLangs.size !== langs.length) {
        warnings.push(`Duplicate hreflang tags detected on ${urlId}`);
      }
      
      Object.entries(seo.alternateLanguages).forEach(([lang, url]) => {
        if (!url.startsWith('http')) {
          errors.push(`Invalid absolute URL for hreflang '${lang}': ${url}`);
        }
      });
    }

    return { errors, warnings };
  }
}
