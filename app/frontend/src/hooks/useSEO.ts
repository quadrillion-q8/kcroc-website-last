// File: src/hooks/useSEO.ts
import { useMemo } from 'react';
import { SEO } from '../constants/seo';

/**
 * Hook to generate dynamic SEO configurations
 * @param title - Optional page-specific title
 * @param description - Optional page-specific description
 */
export const useSEO = (title?: string, description?: string) => {
  return useMemo(() => ({
    title: title ? `${title} | ${SEO.siteName}` : SEO.defaultTitle,
    description: description || SEO.defaultDescription,
    image: SEO.defaultImage,
    canonical: SEO.siteUrl
  }), [title, description]);
};
