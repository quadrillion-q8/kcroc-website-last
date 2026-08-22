// File: app/frontend/src/core/components/SEOEngine.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KCROC_GRAPH } from '../../data/graph';
import {
  ServiceEntity,
  LocationEntity,
  FAQEntity,
  RoutableEntity,
  BrandEntity,
  ProblemEntity,
  CaseStudyEntity,
  WebPageEntity
} from '../../types/knowledgeGraph';

interface SEOEngineProps {
  entityId: string;
}

const AUTHOR_ID = 'https://www.computerrepairkuwait.com/author/imran#person';
const AUTHOR_URL = 'https://www.computerrepairkuwait.com/author/imran';

const getDefaultBreadcrumbs = (entity: RoutableEntity): { name: string; url: string }[] => {
  const path = entity.seo.canonicalUrl.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/';
  if (path === '/') return [{ name: 'Home', url: '/' }];

  const parts = path.split('/').filter(Boolean);
  const sectionLabels: Record<string, string> = {
    services: 'Services',
    brands: 'Brands',
    problems: 'Problems',
    guides: 'Guides',
    location: 'Locations',
    blog: 'Blog',
    'case-studies': 'Case Studies',
    author: 'Author'
  };

  const crumbs: { name: string; url: string }[] = [{ name: 'Home', url: '/' }];
  if (parts.length > 1) {
    const section = parts[0];
    crumbs.push({ name: sectionLabels[section] || section.replace(/-/g, ' '), url: `/${section}` });
  }
  crumbs.push({ name: entity.title, url: path });
  return crumbs;
};

export const SEOEngine: React.FC<SEOEngineProps> = ({ entityId }) => {
  // 1. Fetch Core Graph Entities
  const entity = KCROC_GRAPH.routableEntities.find(e => e.id === entityId);
  const business = KCROC_GRAPH.business;
  const primaryLocation = KCROC_GRAPH.locations.find(l => l.id === 'loc-hawalli');

  // 2. Fallback to default SEO if entity is missing
  if (!entity || !entity.seo || !business) {
    // A missing graph entity must never silently become an indexable page.
    // Fail safe so a route/configuration mistake cannot create duplicate SEO.
    return (
      <Helmet>
        <title>KCROC | Page Not Found</title>
        <meta name="description" content="The requested KCROC page could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    );
  }

  const {
    title,
    description,
    canonicalUrl,
    ogType,
    ogImage,
    ogImageAlt,
    locale,
    twitterCard,
    robots,
    alternates,
    breadcrumbs,
    schemaTypes
  } = entity.seo;

  // Ensure canonical URL is absolute
  const fullCanonicalUrl = canonicalUrl.startsWith('http')
    ? canonicalUrl
    : `${business.websiteUrl}${canonicalUrl}`;

  // 3. Aggregate Rating — SINGLE SOURCE OF TRUTH.
  const aggregateRating = business.aggregateRating ? {
    "@type": "AggregateRating",
    "ratingValue": business.aggregateRating.ratingValue,
    "reviewCount": business.aggregateRating.reviewCount,
    "bestRating": business.aggregateRating.bestRating ?? 5
  } : undefined;

  // 4. Build Universal LocalBusiness Schema
  const baseLocalBusiness: any = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${business.websiteUrl}/#business`,
    "name": business.legalName,
    "url": business.websiteUrl,
    "image": business.logoUrl,
    "telephone": `+${business.telephone}`,
    "priceRange": business.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": primaryLocation?.landmark,
      "addressLocality": "Hawalli",
      "addressRegion": business.addressRegion,
      "addressCountry": "KW"
    },
    "geo": primaryLocation?.coords ? {
      "@type": "GeoCoordinates",
      "latitude": primaryLocation.coords.lat,
      "longitude": primaryLocation.coords.lng
    } : undefined,
    "areaServed": primaryLocation?.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "openingHoursSpecification": business.schemaOpeningHours ? {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": business.schemaOpeningHours.dayOfWeek,
      "opens": business.schemaOpeningHours.opens,
      "closes": business.schemaOpeningHours.closes
    } : undefined,
    "sameAs": business.socialLinks ? Object.values(business.socialLinks) : []
  };

  if (aggregateRating) {
    baseLocalBusiness.aggregateRating = aggregateRating;
  }

  const schemaGraph: any[] = [baseLocalBusiness];

  // Single canonical Person entity for the founder/author. Pages that declare
  // Person or article schema reference this node rather than creating duplicate
  // anonymous Person objects.
  if (schemaTypes?.includes('Person') || schemaTypes?.includes('ProfilePage') || schemaTypes?.includes('Article') || schemaTypes?.includes('TechArticle')) {
    schemaGraph.push({
      "@type": "Person",
      "@id": AUTHOR_ID,
      "name": "Imran Natiq",
      "url": AUTHOR_URL,
      "jobTitle": "Founder & Lead Technician",
      "worksFor": { "@id": `${business.websiteUrl}/#business` }
    });
  }

  // Generic WebPage node: every indexable document can participate in the
  // same site graph without requiring page-level JSON-LD.
  if (schemaTypes?.includes('WebPage') || schemaTypes?.includes('AboutPage') || schemaTypes?.includes('ContactPage') || schemaTypes?.includes('ProfilePage') || schemaTypes?.includes('Article') || schemaTypes?.includes('TechArticle')) {
    schemaGraph.push({
      "@type": schemaTypes?.includes('CollectionPage') ? 'CollectionPage' : (schemaTypes?.includes('AboutPage') ? 'AboutPage' : (schemaTypes?.includes('ContactPage') ? 'ContactPage' : (schemaTypes?.includes('ProfilePage') ? 'ProfilePage' : 'WebPage'))),
      "@id": `${fullCanonicalUrl}#webpage`,
      "url": fullCanonicalUrl,
      "name": title,
      "description": description,
      "isPartOf": { "@id": `${business.websiteUrl}/#website` },
      ...(schemaTypes?.includes('ProfilePage') && { "mainEntity": { "@id": AUTHOR_ID } })
    });
  }

  const resolvedBreadcrumbs = breadcrumbs?.length ? breadcrumbs : getDefaultBreadcrumbs(entity);
  if (schemaTypes?.includes('BreadcrumbList') || ['Service', 'Brand', 'Problem', 'Location'].includes(entity.entityType)) {
    schemaGraph.push({
      "@type": "BreadcrumbList",
      "@id": `${fullCanonicalUrl}#breadcrumb`,
      "itemListElement": resolvedBreadcrumbs.map((item: { name: string; url: string }, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${business.websiteUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
      }))
    });
  }

  // 5. STRICT DATA-DRIVEN SCHEMA GENERATION
  if (Array.isArray(schemaTypes)) {
    schemaTypes.forEach(type => {

      // Service & Offer Catalog Schema
      if (type === 'Service') {
        if (entity.entityType === 'Service') {
          const service = entity as ServiceEntity;
          schemaGraph.push({
            "@type": "Service",
            "@id": `${fullCanonicalUrl}#service`,
            "name": service.title,
            "description": service.description,
            "provider": { "@id": `${business.websiteUrl}/#business` },
            "areaServed": primaryLocation?.serviceAreas.map(area => ({
              "@type": "City",
              "name": area
            })),
            "offers": service.pricing ? {
              "@type": "Offer",
              "priceCurrency": service.pricing.currency,
              "price": service.pricing.startingFrom,
              "availability": "https://schema.org/InStock",
              "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
            } : undefined
          });
        } else if (entity.entityType === 'Brand') {
          const brandEntity = entity as BrandEntity;
          schemaGraph.push({
            "@type": "Service",
            "@id": `${fullCanonicalUrl}#service`,
            "name": brandEntity.title,
            "description": brandEntity.description,
            "provider": { "@id": `${business.websiteUrl}/#business` },
            "brand": {
              "@type": "Brand",
              "name": brandEntity.brandName,
              "url": brandEntity.officialWebsite
            },
            ...(brandEntity.pricing && {
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": brandEntity.pricing.currency,
                "lowPrice": brandEntity.pricing.startingFrom,
                "offerCount": brandEntity.commonIssues.length
              }
            })
          });
        }
      }

      // FAQ Schema
      if (type === 'FAQPage') {
        let questions: { title: string, answer: string }[] = [];
        
        if (entity.entityType === 'FAQ') {
          questions = [{ title: (entity as FAQEntity).title, answer: (entity as FAQEntity).answer }];
        } else if (entity.entityType === 'Service') {
          // 🚀 NEW: Service-level FAQs (e.g. srv-gaming) — only produces schema
          // when the entity actually has a faqs array populated; services
          // without one (most, currently) fall through with questions === [].
          const serviceFaqs = (entity as ServiceEntity).faqs;
          if (serviceFaqs && serviceFaqs.length > 0) {
            questions = serviceFaqs.map(faq => ({ title: faq.title, answer: faq.answer }));
          }
        } else if (entity.entityType === 'Problem') {
          const problemEntity = entity as ProblemEntity;
          questions = [
            { title: `What causes ${problemEntity.title.toLowerCase()}?`, answer: `Common causes include: ${problemEntity.causes.join(', ')}.` },
            { title: `How do you fix ${problemEntity.title.toLowerCase()}?`, answer: problemEntity.solution }
          ];
          if (problemEntity.doNotDo) {
            questions.push({ title: "What should I avoid doing if my laptop has this problem?", answer: problemEntity.doNotDo });
          }
        } else if (entity.entityType === 'WebPage') {
          const webPage = entity as WebPageEntity;
          const featuredIds = webPage.featuredFAQIds || [];
          const sourceFaqs = featuredIds.length > 0
            ? featuredIds.map(id => KCROC_GRAPH.faqs.find(f => f.id === id)).filter((f): f is FAQEntity => Boolean(f))
            : KCROC_GRAPH.faqs;
          
          questions = sourceFaqs.map(faq => ({ title: faq.title, answer: faq.answer }));
        }

        if (questions.length > 0) {
          schemaGraph.push({
            "@type": "FAQPage",
            "@id": `${fullCanonicalUrl}#faq`,
            "mainEntity": questions.map(q => ({
              "@type": "Question",
              "name": q.title,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          });
        }
      }

      // Article Schema
      if (type === 'Article' || type === 'TechArticle') {
        if (entity.entityType === 'CaseStudy') {
          const caseEntity = entity as CaseStudyEntity;
          schemaGraph.push({
            "@type": "Article",
            "@id": `${fullCanonicalUrl}#article`,
            "headline": caseEntity.title,
            "description": caseEntity.description,
            "datePublished": caseEntity.publishDate,
            "author": {
              "@type": "Organization",
              "name": "KCROC Diagnostics Team",
              "@id": `${business.websiteUrl}/#business`
            },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "articleSection": "Case Studies",
            "about": {
              "@type": "Thing",
              "name": caseEntity.device,
              "description": caseEntity.symptom
            },
            "text": `Location: ${caseEntity.location}. Diagnosis: ${caseEntity.diagnosis}. Repair Process: ${caseEntity.repair}. Outcome: ${caseEntity.outcome}. Time to repair: ${caseEntity.timeToRepair}. Cost analysis: ${caseEntity.costVsReplacement}.`
          });
        } else if (entity.entityType === 'Problem') {
          const problemEntity = entity as ProblemEntity;
          schemaGraph.push({
            "@type": "TechArticle",
            "@id": `${fullCanonicalUrl}#article`,
            "headline": problemEntity.title,
            "description": problemEntity.description,
            "proficiencyLevel": "Beginner",
            "articleSection": "Hardware Troubleshooting",
            "text": `Symptom: ${problemEntity.symptom}. Solution: ${problemEntity.solution}`,
            "author": { "@id": AUTHOR_ID },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "mainEntityOfPage": { "@id": `${fullCanonicalUrl}#webpage` }
          });
        } else if (entity.entityType === 'WebPage') {
          const webPage = entity as WebPageEntity;
          const articleType = type === 'TechArticle' ? 'TechArticle' : 'Article';
          const path = fullCanonicalUrl.replace(/^https?:\/\/[^/]+/, '');
          const articleSection = webPage.articleSection
            || (path.startsWith('/guides/') ? 'Guides'
            : path.startsWith('/blog/') ? 'Blog'
            : 'Computer Repair');

          schemaGraph.push({
            "@type": articleType,
            "@id": `${fullCanonicalUrl}#article`,
            "headline": webPage.title,
            "description": webPage.description,
            "author": {
              "@id": webPage.authorUrl ? `${webPage.authorUrl}#person` : AUTHOR_ID
            },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "mainEntityOfPage": { "@id": `${fullCanonicalUrl}#webpage` },
            "articleSection": articleSection,
            ...(webPage.datePublished && { "datePublished": webPage.datePublished }),
            ...(webPage.dateModified && { "dateModified": webPage.dateModified }),
            ...(webPage.featuredImage?.ogImage && { "image": webPage.featuredImage.ogImage })
          });
        }
      }

      // WebSite Schema
      if (type === 'WebSite' && entity.entityType === 'WebPage') {
        schemaGraph.push({
          "@type": "WebSite",
          "@id": `${business.websiteUrl}/#website`,
          "url": business.websiteUrl,
          "name": business.legalName,
          "publisher": { "@id": `${business.websiteUrl}/#business` }
        });
      }

      // CollectionPage Schema
      if (type === 'CollectionPage' && entity.entityType === 'WebPage') {
        const webPage = entity as WebPageEntity;
        schemaGraph.push({
          "@type": "CollectionPage",
          "@id": `${fullCanonicalUrl}#collection`,
          "name": webPage.title,
          "description": webPage.description,
          "url": fullCanonicalUrl,
          "isPartOf": { "@id": `${business.websiteUrl}/#website` }
        });
      }

      // AboutPage Schema
      if (type === 'AboutPage' && entity.entityType === 'WebPage') {
        const webPage = entity as WebPageEntity;
        schemaGraph.push({
          "@type": "AboutPage",
          "@id": `${fullCanonicalUrl}#about`,
          "name": webPage.title,
          "description": webPage.description,
          "url": fullCanonicalUrl,
          "about": { "@id": `${business.websiteUrl}/#business` }
        });
      }

      // ContactPage Schema
      if (type === 'ContactPage' && entity.entityType === 'WebPage') {
        const webPage = entity as WebPageEntity;
        schemaGraph.push({
          "@type": "ContactPage",
          "@id": `${fullCanonicalUrl}#contact`,
          "name": webPage.title,
          "description": webPage.description,
          "url": fullCanonicalUrl,
          "about": { "@id": `${business.websiteUrl}/#business` }
        });
      }

      // Location entities: branch on isPhysicalLocation.
      if (type === 'LocalBusiness' && entity.entityType === 'Location') {
        const location = entity as LocationEntity;

        if (location.isPhysicalLocation) {
          // Real branch/storefront — full LocalBusiness node with a
          // genuine street address and geo point.
          schemaGraph.push({
            "@type": ["LocalBusiness", "ComputerStore"],
            "@id": `${fullCanonicalUrl}#location`,
            "name": location.title,
            "url": fullCanonicalUrl,
            "telephone": `+${business.telephone}`,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": location.landmark,
              "addressLocality": location.title.replace(' Repair Center', ''),
              "addressRegion": business.addressRegion,
              "addressCountry": "KW"
            },
            "geo": location.coords ? {
              "@type": "GeoCoordinates",
              "latitude": location.coords.lat,
              "longitude": location.coords.lng
            } : undefined,
            "areaServed": location.serviceAreas.map(area => ({
              "@type": "City",
              "name": area
            })),
            "parentOrganization": { "@id": `${business.websiteUrl}/#business` }
          });
        } else {
          // Service-area page — no storefront exists here, so
          // no address/geo/LocalBusiness claim is made. Instead this
          // describes coverage.
          schemaGraph.push({
            "@type": "Service",
            "@id": `${fullCanonicalUrl}#service-area`,
            "name": `Computer Repair Pickup & Delivery — ${location.title}`,
            "description": location.description,
            "provider": { "@id": `${business.websiteUrl}/#business` },
            "areaServed": [
              {
                "@type": "Place",
                "name": location.title,
                ...(location.coords && {
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": location.coords.lat,
                    "longitude": location.coords.lng
                  }
                })
              },
              ...location.serviceAreas.map(area => ({
                "@type": "City",
                "name": area
              }))
            ]
          });
        }
      }
    });
  }

  const resolvedOgType = entity.entityType === 'Service' && ogType === 'article' ? 'website' : (ogType || 'website');
  const resolvedOgImage = ogImage || entity.featuredImage?.ogImage || `${business.websiteUrl}/og-image.webp`;
  const resolvedLocale = locale || 'en_KW';
  const resolvedTwitterCard = twitterCard || 'summary_large_image';
  const resolvedRobots = robots || 'index, follow, max-image-preview:large';
  const shouldIndex = !resolvedRobots.toLowerCase().includes('noindex');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {shouldIndex && <link rel="canonical" href={fullCanonicalUrl} />}
      <meta name="robots" content={resolvedRobots} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={resolvedOgType} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt || title} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:site_name" content={business.legalName} />
      <meta property="og:locale" content={resolvedLocale} />

      <meta name="twitter:card" content={resolvedTwitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt || title} />

      {alternates && Object.entries(alternates).map(([hreflang, href]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href.startsWith('http') ? href : `${business.websiteUrl}${href.startsWith('/') ? href : `/${href}`}`} />
      ))}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemaGraph
        })}
      </script>
    </Helmet>
  );
};
