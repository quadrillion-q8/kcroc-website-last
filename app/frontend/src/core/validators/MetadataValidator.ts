// File: app/frontend/src/core/validators/MetadataValidator.ts
import { SEOMetadata } from '../types';

export class MetadataValidator {
  public static validate(seo: SEOMetadata, baseUrl: string) {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Core requirements
    if (!seo.title) errors.push(`Missing 'title' for ${seo.canonicalUrl || 'unknown URL'}`);
    if (!seo.description) errors.push(`Missing 'description' for ${seo.canonicalUrl || 'unknown URL'}`);
    else if (seo.description.length < 50) warnings.push(`Description too short for ${seo.canonicalUrl}`);
    
    if (!seo.canonicalUrl) errors.push('Missing canonicalUrl');

    // Hreflang Validation (Point 7)
    if (seo.alternateLanguages) {
      const langs = Object.keys(seo.alternateLanguages);
      const uniqueLangs = new Set(langs);
      if (uniqueLangs.size !== langs.length) {
        warnings.push('Duplicate hreflang tags detected');
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
