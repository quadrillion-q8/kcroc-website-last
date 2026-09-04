// File: app/frontend/src/core/components/SEOEngine.tsx
//
// 🚀 HEAD MANAGEMENT: uses vite-react-ssg's own `<Head>` export (a thin
// wrapper around its internally-bundled react-helmet-async instance), NOT
// the standalone `react-helmet-async` package and NOT plain React tags.
//
// This project previously had TWO separate, compounding bugs here, both now
// fixed — documented so nobody reintroduces either:
//
// 1. RootLayout.tsx used to wrap the app in its own extra `<HelmetProvider>`
//    (no shared context). vite-react-ssg ALSO wraps every page render in its
//    own top-level `<HelmetProvider context={helmetContext}>` and extracts
//    that context after rendering to build the final <head>. Nesting our own
//    provider inside it shadowed/disconnected vite-react-ssg's context, so
//    every page's title/canonical/meta/schema silently fell back to the
//    static defaults hardcoded in index.html — a site-wide bug affecting all
//    61 pages, not something visible from the dev server (client-side Helmet
//    patches the DOM directly and looked fine in the browser).
// 2. The app separately depended on `react-helmet-async` (was v2.0.5) while
//    vite-react-ssg bundles its own internal copy (v1.3.0) — two distinct
//    module instances that can never share a React context even unnested.
//    We briefly tried replacing this with plain React 19 <title>/<meta>/
//    <link> tags relying on React's native head-hoisting, but vite-react-ssg
//    renders the app as a *fragment* into an existing index.html shell
//    (not a full-document render), so there is no <head> for React to hoist
//    into — the tags just rendered inline in <body>, alongside (not
//    replacing) the static head defaults. Reverted to `<Head>`.
//
// The fix: removed the app's own HelmetProvider entirely (vite-react-ssg's
// is sufficient) and standardized every page on `import { Head } from
// 'vite-react-ssg'` instead of `react-helmet-async`, so there is exactly one
// Helmet implementation and one provider in the tree.
import React from 'react';
import { Head } from 'vite-react-ssg';
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
      <Head>
        <title>KCROC | Page Not Found</title>
        <meta name="description" content="The requested KCROC page could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Head>
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

  // 3. Build Universal LocalBusiness Schema.
  // IMPORTANT: the business rating remains available to the UI and the
  // GBP drift checker, but is intentionally NOT copied into self-hosted
  // LocalBusiness JSON-LD because self-serving review markup is not
  // eligible for Google's star rich-result treatment.
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
  if (schemaTypes?.includes('BreadcrumbList') || ['Service', 'Brand', 'Problem', 'Location', 'CaseStudy'].includes(entity.entityType)) {
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
          const caseImage = caseEntity.featuredImage?.hero?.webp || caseEntity.featuredImage?.ogImage;
          const relatedBrand = caseEntity.brandId
            ? KCROC_GRAPH.brands?.find(brand => brand.id === caseEntity.brandId)
            : undefined;
          const relatedServices = (caseEntity.serviceIds ?? [])
            .map(id => KCROC_GRAPH.services.find(service => service.id === id))
            .filter(Boolean);
          const relatedProblems = (caseEntity.problemIds ?? [])
            .map(id => KCROC_GRAPH.problems?.find(problem => problem.id === id))
            .filter(Boolean);
          const relatedLocation = caseEntity.locationId
            ? KCROC_GRAPH.locations.find(location => location.id === caseEntity.locationId)
            : undefined;

          schemaGraph.push({
            "@type": type === 'TechArticle' ? 'TechArticle' : 'Article',
            "@id": `${fullCanonicalUrl}#article`,
            "headline": caseEntity.title,
            "description": caseEntity.description,
            "datePublished": caseEntity.publishDate,
            "author": { "@id": caseEntity.authorId || AUTHOR_ID },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "mainEntityOfPage": { "@id": `${fullCanonicalUrl}#webpage` },
            "articleSection": "Case Studies",
            ...(caseImage && { "image": caseImage }),
            "about": {
              "@type": "Thing",
              "name": caseEntity.deviceModel || caseEntity.device,
              "description": caseEntity.symptom
            },
            ...(relatedBrand && { "mentions": [{ "@type": "Brand", "name": relatedBrand.brandName, "url": relatedBrand.seo?.canonicalUrl || `${business.websiteUrl}/${relatedBrand.slug}` }] }),
            "text": [
              `Device: ${caseEntity.deviceModel || caseEntity.device}.`,
              `Location: ${relatedLocation?.title || caseEntity.location}.`,
              `Symptom: ${caseEntity.symptom}.`,
              `Diagnosis: ${caseEntity.diagnosis}.`,
              `Repair: ${caseEntity.repair}.`,
              `Outcome: ${caseEntity.outcome}.`,
              `Time to repair: ${caseEntity.repairDuration || caseEntity.timeToRepair}.`,
              `Cost analysis: ${caseEntity.costVsReplacement}.`,
              ...(caseEntity.testingPerformed ?? []).map(test => `Testing: ${test}.`),
              ...(relatedServices ?? []).filter(Boolean).map(service => `Service: ${service!.title}.`),
              ...(relatedProblems ?? []).filter(Boolean).map(problem => `Problem: ${problem!.title}.`),
            ].join(' ')
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

      // First-party case-study imagery. Only emit images that actually exist
      // in the case-study entity; no placeholder evidence is fabricated.
      if (type === 'ImageObject' && entity.entityType === 'CaseStudy') {
        const caseEntity = entity as CaseStudyEntity;
        const imageAssets = [
          ...(caseEntity.featuredImage?.hero?.webp ? [{ url: caseEntity.featuredImage.hero.webp, name: caseEntity.title }] : []),
          ...(caseEntity.evidence ?? []).map(asset => ({ url: asset.src, name: asset.alt }))
        ];
        imageAssets.forEach((asset, index) => {
          schemaGraph.push({
            "@type": "ImageObject",
            "@id": `${fullCanonicalUrl}#image-${index + 1}`,
            "url": asset.url.startsWith('http') ? asset.url : `${business.websiteUrl}${asset.url.startsWith('/') ? asset.url : `/${asset.url}`}`,
            "name": asset.name,
            "caption": asset.name,
            "inLanguage": locale || 'en-KW'
          });
        });
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

  // 🚀 Arabic hub pages set `locale: 'ar_KW'` in their graph entity's `seo`
  // block. Previously nothing in SEOEngine read that value, so every page —
  // Arabic or English — rendered with the site-wide default `lang="en"` /
  // no `dir` attribute from index.html, and `alternates` was defined on the
  // schema but never actually passed by any entity, so no hreflang tags
  // were ever emitted anywhere on the site. This derives the correct
  // `lang`/`dir` html attributes straight from `locale`, so any current or
  // future Arabic entity gets correct RTL rendering and hreflang for free
  // just by setting `locale` + `alternates` in graph.ts.
  const isArabic = resolvedLocale.toLowerCase().startsWith('ar');
  const htmlLang = resolvedLocale.replace('_', '-');
  const htmlAttributes = isArabic ? { lang: htmlLang, dir: 'rtl' } : { lang: htmlLang };

  return (
    <Head htmlAttributes={htmlAttributes}>
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
    </Head>
  );
};
