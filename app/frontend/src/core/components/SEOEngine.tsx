// File: app/frontend/src/core/components/SEOEngine.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata, JsonLd } from '../types';
import { MetadataService } from '../services/MetadataService';
import { BUSINESS_INFO } from '../../constants/data'; // ✅ Fixed: Correct directory traversal

interface SEOEngineProps {
  seo: SEOMetadata;
  schemas?: JsonLd | JsonLd[];
}

const SEOEngineComponent: React.FC<SEOEngineProps> = ({ seo, schemas }) => {
  const data = MetadataService.normalize(seo, schemas);
  const normalized = data.seo;

  return (
    <Helmet>
      {/* ─── PRIMARY SEO ─── */}
      <title>{normalized.title}</title>
      <meta name="description" content={normalized.description} />
      <link rel="canonical" href={normalized.canonicalUrl} />
      <meta name="robots" content={normalized.robots} />
      {/* ✅ Fixed: removed <meta name="keywords"> — Google ignores, Bing penalises */}

      {/* ─── AUTHOR ─── */}
      {/* ✅ Fixed: removed publisher, copyright, application-name, apple-mobile-web-app-title
           — non-standard or PWA-only tags that belong in index.html, not per-page */}
      <meta name="author" content={normalized.author} />

      {/* ─── ALTERNATE LANGUAGES ─── */}
      {normalized.alternateLanguages &&
        Object.entries(normalized.alternateLanguages).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}

      {/* ─── OPEN GRAPH ─── */}
      {/* ✅ Fixed: ogType flows from SEOMetadata instead of being hardcoded to 'website' */}
      <meta property="og:type" content={normalized.ogType ?? 'website'} />
      <meta property="og:site_name" content={BUSINESS_INFO.name} />
      <meta property="og:title" content={normalized.title} />
      <meta property="og:description" content={normalized.description} />
      <meta property="og:url" content={normalized.canonicalUrl} />
      <meta property="og:locale" content={BUSINESS_INFO.locale ?? 'en_US'} />

      {normalized.ogImage && (
        <>
          <meta property="og:image" content={normalized.ogImage.url} />
          {/* ✅ Fixed: removed og:image:secure_url (deprecated by Facebook) */}
          <meta property="og:image:alt" content={normalized.ogImage.alt} />
          <meta property="og:image:type" content={normalized.ogImage.type} />
          {/* ✅ Fixed: added width + height for reliable social preview rendering */}
          {normalized.ogImage.width && (
            <meta property="og:image:width" content={String(normalized.ogImage.width)} />
          )}
          {normalized.ogImage.height && (
            <meta property="og:image:height" content={String(normalized.ogImage.height)} />
          )}
        </>
      )}

      {/* ─── TWITTER CARD ─── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={normalized.title} />
      <meta name="twitter:description" content={normalized.description} />
      {normalized.twitterImage && (
        <>
          <meta name="twitter:image" content={normalized.twitterImage.url} />
          <meta name="twitter:image:alt" content={normalized.twitterImage.alt} />
        </>
      )}

      {/* ─── TECHNICAL ─── */}
      <meta name="theme-color" content={normalized.themeColor} />
      {normalized.language && (
        <meta httpEquiv="content-language" content={normalized.language} />
      )}

      {/* ─── JSON-LD SCHEMA ─── */}
      {/* ✅ Fixed: use @type or @id as key where available for better deduplication */}
      {data.schemas && data.schemas.length > 0 &&
        data.schemas.map((schemaNode, index) => (
          <script
            key={
              (schemaNode as Record<string, unknown>)['@id'] as string
              ?? (schemaNode as Record<string, unknown>)['@type'] as string
              ?? index
            }
            type="application/ld+json"
          >
            {JSON.stringify(schemaNode)}
          </script>
        ))
      }
    </Helmet>
  );
};

// ✅ Note: React.memo shallow comparison won't prevent re-renders if schemas are
// created inline at the call site. Memoize schemas with useMemo in page components.
export const SEOEngine = React.memo(SEOEngineComponent);
