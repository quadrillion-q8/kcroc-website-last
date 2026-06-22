// File: src/utils/canonical.ts
import { SEO } from '../constants/seo';

/**
 * Ensures a consistent, clean canonical URL.
 * Removes duplicate slashes and handles absolute paths.
 * @param path - The page path (e.g., '/laptop-repair')
 */
export const getCanonical = (path: string): string => {
  // Remove trailing slashes and ensure a single leading slash
  const cleanPath = path.replace(/\/+$/, "").replace(/^\/*/, "/");
  
  // Combine base URL with cleaned path
  return `${SEO.siteUrl.replace(/\/$/, "")}${cleanPath}`;
};
