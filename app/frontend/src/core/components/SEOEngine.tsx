// File: app/frontend/src/core/components/SEOEngine.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata, JsonLd } from '../types';
import { MetadataService } from '../services/MetadataService';
import { BUSINESS_INFO } from '../../constants/business/data';

interface SEOEngineProps {
  seo: SEOMetadata;
  schemas?: JsonLd | JsonLd[]; // Accepted separately as per architecture
}

const SEOEngineComponent: React.FC<SEOEngineProps> = ({ seo, schemas }) => {
  // The service returns a guaranteed, fully validated Rich Result
  const data = MetadataService.normalize(seo, schemas);
  const normalized = data.seo;

  return (
    <Helmet>
      {/* Primary Search Engine Tags */}
      <title>{normalized.title}</title>
      <meta name="description" content={normalized.description} />
      <link rel="canonical" href={normalized.canonicalUrl} />
      <meta name="robots" content={normalized.robots} />
      {normalized.keywords && normalized.keywords.length > 0 && (
        <meta name="keywords" content={normalized.keywords.join(', ')} />
      )}

      {/* Application & Publisher Tags */}
      <meta name="publisher" content={normalized.publisher} />
      <meta name="author" content={normalized.author} />
      <meta name="copyright" content={BUSINESS_INFO.name} />
      <meta name="application-name" content={BUSINESS_INFO.name} />
      <meta name="apple-mobile-web-app-title" content={BUSINESS_INFO.shortName || BUSINESS_INFO.name} />
      <meta name="format-detection" content="telephone=yes, date=yes, address=yes, email=yes" />

      {/* Alternate Languages */}
      {normalized.alternateLanguages && Object.entries(normalized.alternateLanguages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS_INFO.name} />
      <meta property="og:title" content={normalized.title} />
      <meta property="og:description" content={normalized.description} />
      <meta property="og:url" content={normalized.canonicalUrl} />
      <meta property="og:locale" content={BUSINESS_INFO.locale || "en_US"} />
      
      {normalized.ogImage && (
        <>
          <meta property="og:image" content={normalized.ogImage.url} />
          <meta property="og:image:secure_url" content={normalized.ogImage.secureUrl} />
          <meta property="og:image:alt" content={normalized.ogImage.alt} />
          <meta property="og:image:type" content={normalized.ogImage.type} />
        </>
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={normalized.title} />
      <meta name="twitter:description" content={normalized.description} />
      {normalized.twitterImage && (
        <>
          <meta name="twitter:image" content={normalized.twitterImage.url} />
          <meta name="twitter:image:alt" content={normalized.twitterImage.alt} />
        </>
      )}

      {/* Technical Configuration */}
      <meta name="theme-color" content={normalized.themeColor} />
      {normalized.language && <meta httpEquiv="content-language" content={normalized.language} />}

      {/* Multiple JSON-LD Nodes */}
      {data.schemas && data.schemas.length > 0 && data.schemas.map((schemaNode, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaNode)}
        </script>
      ))}
    </Helmet>
  );
};

// Memoization to prevent unnecessary re-renders
export const SEOEngine = React.memo(SEOEngineComponent);
