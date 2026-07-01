// File: app/frontend/src/core/components/SEOEngine.tsx
import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  robots?: string;
}

interface SEOEngineProps {
  seo: SEOProps;
  schemas?: Record<string, any>[]; // Holds our JSON-LD local business or service data
}

export const SEOEngine: React.FC<SEOEngineProps> = ({ seo, schemas = [] }) => {
  useEffect(() => {
    // 1. Dynamically update the browser tab title
    document.title = seo.title;

    // 2. Update or create the Meta Description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // 3. Update or create the Canonical URL link tag
    if (seo.canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', seo.canonicalUrl);
    }

    // 4. Update or create Robots indexing controls (index, follow)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.robots || 'index, follow');

    // 5. Inject JSON-LD Schema Blocks into the head for Google's AI Crawler
    // Clean up any old schema tags first to avoid duplicates on page changes
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    oldScripts.forEach(script => script.remove());

    // Inject new schemas
    schemas.forEach((schemaData) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    });

  }, [seo, schemas]);

  // This component handles the browser document head behind the scenes, so it renders nothing visually
  return null;
};
