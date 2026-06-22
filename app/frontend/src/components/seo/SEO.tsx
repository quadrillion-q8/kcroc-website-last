// src/components/seo/SEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../constants/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  keywords?: string;
  type?: string;
}

export default function SEOComponent({ 
  title, description, image, canonical, keywords, type = "website" 
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SEO.siteName}` : SEO.defaultTitle;
  const metaDescription = description || SEO.defaultDescription;
  const metaImage = image || SEO.defaultImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
