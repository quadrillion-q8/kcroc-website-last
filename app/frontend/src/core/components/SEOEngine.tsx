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
import { SEO_GRAPH } from '../../data/seoGraph.generated';
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
  const sectionLabels: Record<string, { label: string; url: string }> = {
    services: { label: 'Services', url: '/services' },
    brands: { label: 'Brands', url: '/brands' },
    problems: { label: 'Problems', url: '/problems' },
    guides: { label: 'Guides', url: '/guides' },
    location: { label: 'Computer Repair Near Me', url: '/near-me' },
    blog: { label: 'Blog', url: '/blog' },
    'case-studies': { label: 'Case Studies', url: '/case-studies' },
    author: { label: 'Blog', url: '/blog' }
  };

  // Root-level commercial pages are deliberately flat in their URLs for
  // readability (/laptop-repair-kuwait, /brand-slug, /problem-slug). Their
  // breadcrumb hierarchy should still expose the semantic parent collection
  // so users and crawlers see Home > Services/Brands/Problems > Page.
  const entityTypeParents: Partial<Record<RoutableEntity['entityType'], { label: string; url: string }>> = {
    Service: { label: 'Services', url: '/services' },
    Brand: { label: 'Brands', url: '/brands' },
    Problem: { label: 'Problems', url: '/problems' },
    Location: { label: 'Computer Repair Near Me', url: '/near-me' },
  };

  const crumbs: { name: string; url: string }[] = [{ name: 'Home', url: '/' }];
  const entityParent = entityTypeParents[entity.entityType];
  if (entityParent && entityParent.url !== path) {
    crumbs.push({ name: entityParent.label, url: entityParent.url });
  } else if (parts.length > 1) {
    const section = parts[0];
    const parent = sectionLabels[section];
    if (parent && parent.url !== path) {
      crumbs.push({ name: parent.label, url: parent.url });
    }
  }
  crumbs.push({ name: entity.title, url: path });
  return crumbs;
};

export const SEOEngine: React.FC<SEOEngineProps> = ({ entityId }) => {
  // 1. Fetch Core Graph Entities
  const entity = SEO_GRAPH.routableEntities.find(e => e.id === entityId);
  const business = SEO_GRAPH.business;
  const primaryLocation = SEO_GRAPH.related.locations.find(l => l.id === 'loc-hawalli');

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
    ogImageWidth,
    ogImageHeight,
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
  const isArabicLocale = Boolean(locale && String(locale).toLowerCase().startsWith('ar'));


  // 3. Build Universal LocalBusiness Schema.
  // IMPORTANT: the business rating remains available to the UI and the
  // GBP drift checker, but is intentionally NOT copied into self-hosted
  // LocalBusiness JSON-LD because self-serving review markup is not
  // eligible for Google's star rich-result treatment.
  const baseLocalBusiness: any = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${business.websiteUrl}/#business`,
    "name": business.legalName,
    ...(isArabicLocale ? { "alternateName": "كي سي آر أو سي (KCROC)" } : {}),
    ...(isArabicLocale ? { "description": description } : {}),
    "url": business.websiteUrl,
    "image": business.logoUrl,
    "telephone": `+${business.telephone}`,
    "email": business.email,
    "priceRange": business.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isArabicLocale ? "شارع ابن خلدون، مجمع الملا، السرداب، محل 19" : primaryLocation?.landmark,
      "addressLocality": isArabicLocale ? "حولي" : "Hawalli",
      "addressRegion": isArabicLocale ? "محافظة حولي" : business.addressRegion,
      "addressCountry": "KW"
    },
    "geo": primaryLocation?.coords ? {
      "@type": "GeoCoordinates",
      "latitude": primaryLocation.coords.lat,
      "longitude": primaryLocation.coords.lng
    } : undefined,
    "areaServed": [
      ...(primaryLocation?.serviceAreas ?? []).map(area => ({
        "@type": "City",
        "name": area
      })),
      ...(isArabicLocale ? [
        { "@type": "Country", "name": "الكويت" },
        { "@type": "AdministrativeArea", "name": "محافظة حولي" },
        { "@type": "AdministrativeArea", "name": "محافظة العاصمة" },
        { "@type": "AdministrativeArea", "name": "محافظة الفروانية" },
        { "@type": "AdministrativeArea", "name": "محافظة الأحمدي" },
        { "@type": "AdministrativeArea", "name": "محافظة مبارك الكبير" },
        { "@type": "AdministrativeArea", "name": "محافظة الجهراء" }
      ] : [])
    ],
    "openingHoursSpecification": business.schemaOpeningHours ? {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": business.schemaOpeningHours.dayOfWeek,
      "opens": business.schemaOpeningHours.opens,
      "closes": business.schemaOpeningHours.closes
    } : undefined,
    "sameAs": business.socialLinks ? Object.values(business.socialLinks) : [],
    "hasMap": business.socialLinks?.googleMaps,
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": `+${business.telephone}`,
      "email": business.email,
      "contactType": "customer service",
      "areaServed": "KW",
      "availableLanguage": ["en", "ar"]
    }]
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
      "inLanguage": locale || 'en-KW',
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

      // Brand entity schema. Brand pages also expose their commercial
      // repair Service schema below, so Google can understand both the
      // manufacturer entity and KCROC's service for that brand.
      if (type === 'Brand' && entity.entityType === 'Brand') {
        const brandEntity = entity as BrandEntity;
        schemaGraph.push({
          "@type": "Brand",
          "@id": `${fullCanonicalUrl}#brand`,
          "name": brandEntity.brandName,
          "url": brandEntity.officialWebsite
        });
      }

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
            "areaServed": service.id === 'srv-gaming-laptop' || service.id === 'srv-macbook-screen'
              ? [
                  { "@type": "Country", "name": "Kuwait" },
                  ...(primaryLocation?.serviceAreas ?? []).map(area => ({ "@type": "City", "name": area }))
                ]
              : primaryLocation?.serviceAreas.map(area => ({
                  "@type": "City",
                  "name": area
                })),
            ...(service.id === 'srv-gaming-laptop' ? {
              "alternateName": "تصليح لابتوب قيمنق والألعاب في الكويت",
              "serviceType": "Gaming-laptop cooling, thermal interface, GPU/VRAM, VRM, motherboard, charging, display and hinge diagnosis and repair",
              "inLanguage": "en-KW",
              "availableChannel": {
                "@type": "ServiceChannel",
                "servicePhone": "+" + business.telephone,
                "serviceLocation": {
                  "@type": "Place",
                  "name": "KCROC repair workshop — Hawalli",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": business.streetAddress,
                    "addressLocality": business.addressLocality,
                    "addressRegion": business.addressRegion,
                    "addressCountry": business.addressCountry
                  }
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Gaming Laptop Diagnostic & Repair Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gaming laptop thermal service: PTM7950, compatible liquid-metal maintenance and VRAM/VRM thermal interfaces", "description": "Model-dependent thermal inspection and compatible cleaning or thermal-interface service after temperature and cooling checks." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gaming laptop motherboard, VRM and power-rail diagnosis", "description": "Model-specific power and charging diagnostics with component-level repair when technically viable." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Discrete GPU, VRAM, MUX and Error Code 43 diagnostics", "description": "Diagnosis of black screens, artifacting, stability faults and graphics errors without assuming the GPU chip is the cause." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "High-wattage gaming laptop charging port and DC-in repair", "description": "Adapter, DC jack, Slim-Tip and model-supported USB-C Power Delivery checks before quoting a repair." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gaming laptop high-refresh display, hinge and keyboard repair", "description": "Panel and chassis compatibility is confirmed against the exact model and part availability." } }
                ]
              }
            } : {}),
            ...(service.id === 'srv-macbook-screen' ? {
              "alternateName": "تبديل شاشة ماك بوك في الكويت (MacBook Air وMacBook Pro)",
              "serviceType": "MacBook Air and Pro display assembly replacement, Retina/Liquid Retina XDR display checks, cable, connector, backlight and supported True Tone function testing",
              "inLanguage": "en-KW",
              "availableChannel": {
                "@type": "ServiceChannel",
                "servicePhone": "+" + business.telephone,
                "serviceLocation": {
                  "@type": "Place",
                  "name": "KCROC repair workshop — Hawalli",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": business.streetAddress,
                    "addressLocality": business.addressLocality,
                    "addressRegion": business.addressRegion,
                    "addressCountry": business.addressCountry
                  }
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "MacBook Display Repair and Replacement Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MacBook Air Retina and Liquid Retina display assembly replacement", "description": "Model, screen size and compatible assembly are confirmed before ordering or fitting." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MacBook Pro Retina and Liquid Retina XDR display replacement", "description": "Exact Intel or Apple Silicon generation and assembly compatibility are checked before quoting." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MacBook display cable, connector and backlight diagnosis", "description": "Black-screen, flicker, lines and uneven-backlight symptoms are tested before assuming full panel failure." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "True Tone and supported display function checks", "description": "Supported display functions are checked after fitting; behavior depends on the specific model and compatible part." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Kuwait-wide MacBook pickup and delivery", "description": "Collection and return are arranged for the customer's home or office; repairs are completed at the Hawalli workshop." } }
                ]
              }
            } : {}),
            "offers": service.pricing ? {
              "@type": "Offer",
              "name": service.pricing.displayLabel ?? `From ${service.pricing.startingFrom} ${service.pricing.currency}`,
              "description": service.slug === 'laptop-screen-repair-kuwait'
                ? "The 30 KWD starting figure is labour only; the replacement panel is priced separately. Final pricing depends on the exact laptop model and compatible part, and is confirmed before paid work begins."
                : service.slug === 'macbook-screen-replacement-kuwait'
                  ? "The 30 KWD starting figure is replacement labour only; the compatible MacBook display assembly is priced separately. Final pricing depends on exact model, size and part availability and is confirmed before paid work begins."
                  : undefined,
              "priceCurrency": service.pricing.currency,
              "price": service.pricing.startingFrom,
              "availability": ['laptop-screen-repair-kuwait', 'macbook-screen-replacement-kuwait'].includes(service.slug) ? undefined : "https://schema.org/InStock",
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
            "serviceType": brandEntity.brandName + " laptop repair",
            "areaServed": { "@type": "Country", "name": "Kuwait" },
            "brand": {
              "@type": "Brand",
              "name": brandEntity.brandName,
              "url": brandEntity.officialWebsite
            },
            ...(brandEntity.slug === 'msi-laptop-repair-kuwait' && {
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "MSI Laptop Repair Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MSI hinge and chassis reconstruction",
                      "description": "Model-specific inspection and repair of hinge mounts, threaded inserts and chassis damage where a durable reconstruction is appropriate."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MSI motherboard power and charging diagnosis",
                      "description": "Diagnosis of model-specific no-power and charging faults, with component-level repair where technically supported."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MSI gaming laptop thermal and fan service",
                      "description": "Fan and heatsink cleaning, airflow checks and model-compatible CPU/GPU and VRAM/VRM thermal-interface service."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MSI charging-port micro-soldering",
                      "description": "USB-C Power Delivery or barrel DC-jack diagnostics and repair on compatible models after inspection."
                    }
                  }
                ]
              }
            }),
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
        } else if (entity.entityType === 'Brand') {
          const brandFaqs = (entity as BrandEntity).faqs;
          if (brandFaqs && brandFaqs.length > 0) {
            questions = brandFaqs.map(faq => ({ title: faq.title, answer: faq.answer }));
          }
        } else if (entity.entityType === 'Problem') {
          const problemEntity = entity as ProblemEntity;
          // Prefer the exact FAQ copy rendered on the page. This keeps structured
          // data aligned with the visible customer-facing answers instead of
          // generating generic questions from the entity title.
          if (problemEntity.faqs && problemEntity.faqs.length > 0) {
            questions = problemEntity.faqs.map(faq => ({
              title: faq.question,
              answer: faq.answer
            }));
          }
        } else if (entity.entityType === 'WebPage') {
          const webPage = entity as WebPageEntity;
          const featuredIds = webPage.featuredFAQIds || [];
          const sourceFaqs = featuredIds.length > 0
            ? featuredIds.map(id => SEO_GRAPH.faqs.find(f => f.id === id)).filter((f): f is FAQEntity => Boolean(f))
            : [];
          
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
            ? SEO_GRAPH.related.brands?.find(brand => brand.id === caseEntity.brandId)
            : undefined;
          const relatedServices = (caseEntity.serviceIds ?? [])
            .map(id => SEO_GRAPH.related.services.find(service => service.id === id))
            .filter(Boolean);
          const relatedProblems = (caseEntity.problemIds ?? [])
            .map(id => SEO_GRAPH.related.problems?.find(problem => problem.id === id))
            .filter(Boolean);
          const relatedLocation = caseEntity.locationId
            ? SEO_GRAPH.related.locations.find(location => location.id === caseEntity.locationId)
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
          const articleText = [
            problemEntity.description,
            problemEntity.intro,
            `Symptom: ${problemEntity.symptom}.`,
            `Common causes: ${problemEntity.causes.join('; ')}.`,
            ...(problemEntity.diagnosticSteps ?? []).map(step => `${step.title}: ${step.description}`),
            ...(problemEntity.decisionTree ?? []).map(step => `Diagnostic path: ${step.symptom}. ${step.direction}`),
            ...(problemEntity.technicianMethod ?? []).map(step => `${step.title}: ${step.description}`),
            ...(problemEntity.solution ? [`Solution: ${problemEntity.solution}`] : []),
            ...(problemEntity.safetyNotes ?? []).map(note => `Safety: ${note}`),
            ...(problemEntity.kuwaitContext ?? []),
            ...(problemEntity.expertNotes ?? []).map(note => `${note.title}: ${note.description}`),
            ...(problemEntity.technicalReferences ?? []).map(reference => `Technical reference: ${reference.label}. ${reference.description}`),
            ...(problemEntity.relatedResourcePaths ?? []).map(resource => `Related resource: ${resource.label}`),
            ...(problemEntity.faqs ?? []).map(faq => `FAQ: ${faq.question} ${faq.answer}`)
          ].filter(Boolean).join(' ');
          schemaGraph.push({
            "@type": "TechArticle",
            "@id": `${fullCanonicalUrl}#article`,
            "headline": problemEntity.title,
            "description": problemEntity.description,
            "proficiencyLevel": "Beginner",
            "articleSection": "Laptop Troubleshooting",
            "keywords": [
              ...(problemEntity.primaryKeyword ? [problemEntity.primaryKeyword] : []),
              ...(problemEntity.secondaryKeywords ?? [])
            ],
            "text": articleText,
            ...(problemEntity.featuredImage?.ogImage && { "image": problemEntity.featuredImage.ogImage }),
            "author": { "@id": AUTHOR_ID },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "mainEntityOfPage": { "@id": `${fullCanonicalUrl}#webpage` },
            ...(entity.seo.lastModified && { "dateModified": entity.seo.lastModified })
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
            "inLanguage": locale || 'en-KW',
            "author": {
              "@id": webPage.authorUrl ? `${webPage.authorUrl}#person` : AUTHOR_ID
            },
            "publisher": { "@id": `${business.websiteUrl}/#business` },
            "mainEntityOfPage": { "@id": `${fullCanonicalUrl}#webpage` },
            "articleSection": articleSection,
            ...(webPage.datePublished && { "datePublished": webPage.datePublished }),
            ...(webPage.dateModified && { "dateModified": webPage.dateModified }),
            ...(entity.seo.lastModified && !webPage.dateModified && { "dateModified": entity.seo.lastModified }),
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
          "about": { "@id": `${business.websiteUrl}/#business` },
          "mainEntity": { "@id": `${business.websiteUrl}/#business` }
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
            "openingHoursSpecification": business.schemaOpeningHours ? [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": business.schemaOpeningHours.dayOfWeek.map(day => `https://schema.org/${day}`),
              "opens": business.schemaOpeningHours.opens,
              "closes": business.schemaOpeningHours.closes
            }] : undefined,
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

  // Prefer an explicit SEO image, then a knowledge-graph featured image, then
  // a contextual hero/content image. This prevents article/guide pages from
  // silently falling back to the same generic site-wide OG image. All image
  // URLs are normalized to absolute URLs because social crawlers and Discover
  // need a fetchable canonical asset URL.
  const contentImage = (entity as any).contentImages?.find((image: any) => image?.placement === 'hero')
    || (entity as any).contentImages?.[0];

  // Last-resort, first-party image selection for article/guide routes that do
  // not yet have an explicit graph/SEO image. These files are already present
  // under public/images/discover/ and are purpose-cropped to 1200x675. Keep
  // explicit SEO and graph image assignments authoritative; this only fills
  // missing assignments and avoids the generic site-wide /og-image.webp.
  const imagePath = `${canonicalUrl} ${title}`.toLowerCase();
  const discoverFallbacks: Array<[RegExp, string]> = [
    [/bios|uefi|firmware/, '/images/discover/bios-hero-motherboard-1200x675.webp'],
    [/wifi|wi-fi|wireless|network/, '/images/discover/laptop-wifi-network-card-1200x675.webp'],
    [/battery|swollen|charging|power/, '/images/discover/swollen-macbook-battery-replacement-2-1200x675.webp'],
    [/overheat|thermal|temperature|throttl|cooling|fan|heat/, '/images/discover/laptop-dust-cleaning-overheating-kuwait-1200x675.webp'],
    [/gaming|gpu|graphics|rtx|game/, '/images/discover/gaming-pc-thermal-throttling-kuwait-1200x675.webp'],
    [/ssd|storage|nvme|disk|drive/, '/images/discover/lexar-nvme-ssd-upgrade-pc-repair-kuwait-1000-1200x675.webp'],
    [/ram|memory/, '/images/discover/windows-11-8gb-ram-performance-1200x675.webp'],
    [/screen|display|hinge/, '/images/discover/laptop-screen-protection-kuwait-1200x675.webp'],
    [/windows|software|driver|update|boot|blue-screen|bsod/, '/images/discover/windows-os-software-repair-and-installation-kuwait-1200x675.webp'],
    [/motherboard|diagnostic|repair|laptop/, '/images/discover/laptop-repair-kuwait-1200x675.webp'],
  ];
  const isArticleLike = /\/(blog|guides|news)\//i.test(canonicalUrl)
    || (ogType || '').toLowerCase() === 'article'
    || (schemaTypes || []).some((type: string) => ['Article', 'BlogPosting', 'TechArticle'].includes(type));
  const contextualFallback = isArticleLike
    ? (discoverFallbacks.find(([pattern]) => pattern.test(imagePath))?.[1]
      || '/images/discover/laptop-repair-kuwait-1200x675.webp')
    : undefined;
  const rawOgImage =
    ogImage
    || entity.featuredImage?.ogImage
    || contentImage?.src
    || entity.featuredImage?.hero?.webp
    || contextualFallback
    || `${business.websiteUrl}/og-image.webp`;
  const resolvedOgImage = rawOgImage.startsWith('http')
    ? rawOgImage
    : `${business.websiteUrl}${rawOgImage.startsWith('/') ? rawOgImage : `/${rawOgImage}`}`;
  const isDiscoverImage = resolvedOgImage.includes('/images/discover/');
  const usesContentImageDimensions = Boolean(contentImage?.src && rawOgImage === contentImage.src);
  const resolvedOgImageWidth = String(ogImageWidth ?? (isDiscoverImage ? 1200 : usesContentImageDimensions ? contentImage.width ?? 1200 : 1200));
  const resolvedOgImageHeight = String(ogImageHeight ?? (isDiscoverImage ? 675 : usesContentImageDimensions ? contentImage.height ?? 630 : 630));
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
      {entityId === 'page-home' && (
        <link
          rel="preload"
          as="image"
          href="/images/kcroc-pc-doctor-windows-repair-services.w768.webp"
          type="image/webp"
          fetchPriority="high"
        />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={resolvedOgType} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content={resolvedOgImageWidth} />
      <meta property="og:image:height" content={resolvedOgImageHeight} />
      <meta property="og:image:alt" content={ogImageAlt || title} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:site_name" content={business.legalName} />
      <meta property="og:locale" content={resolvedLocale} />
      {alternates && Object.entries(alternates)
        .filter(([hreflang]) => hreflang !== 'x-default')
        .filter(([hreflang]) => hreflang.toLowerCase() !== resolvedLocale.replace('_', '-').toLowerCase())
        .map(([hreflang]) => (
          <meta
            key={`og-locale-${hreflang}`}
            property="og:locale:alternate"
            content={hreflang.replace('-', '_')}
          />
        ))}

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
