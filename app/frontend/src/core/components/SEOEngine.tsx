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
  CaseStudyEntity
} from '../../types/knowledgeGraph';

interface SEOEngineProps {
  entityId: string;
}

export const SEOEngine: React.FC<SEOEngineProps> = ({ entityId }) => {
  // 1. Fetch Core Graph Entities (From the pre-filtered routable array)
  const entity = KCROC_GRAPH.routableEntities.find(e => e.id === entityId);
  const business = KCROC_GRAPH.business;
  const primaryLocation = KCROC_GRAPH.locations.find(l => l.id === 'loc-hawalli');
  const reviews = KCROC_GRAPH.reviews;

  // 2. Fallback to default SEO if entity is missing
  if (!entity || !entity.seo || !business) {
    return (
      <Helmet>
        <title>{business?.title || 'KCROC | Computer Repair Kuwait'}</title>
        <meta name="description" content={business?.aiSummary || 'Expert computer repair in Kuwait.'} />
        <meta name="robots" content="index, follow" />
      </Helmet>
    );
  }

  const { title, description, canonicalUrl, ogType, schemaTypes } = entity.seo;
  
  // Ensure canonical URL is absolute
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `${business.websiteUrl}${canonicalUrl}`;

  // 3. Compute Aggregate Rating Dynamically
  const reviewItems = reviews?.items || [];
  const aggregateRating = reviewItems.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviewItems.reduce((sum, r) => sum + r.rating, 0) / reviewItems.length).toFixed(1),
    "reviewCount": reviewItems.length
  } : undefined;

  // 4. Build Universal LocalBusiness Schema (Always Emitted for NAP Consistency)
  const baseLocalBusiness: any = {
    "@type": ["LocalBusiness", "ComputerStore"],
    "@id": `${business.websiteUrl}/#business`,
    "name": business.legalName,
    "url": business.websiteUrl,
    "image": business.logoUrl,
    "telephone": `+${business.telephone}`,
    "priceRange": "$$",
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

  // 5. STRICT DATA-DRIVEN SCHEMA GENERATION
  // Iterate exactly over what the Knowledge Graph defines in `schemaTypes`
  if (Array.isArray(schemaTypes)) {
    schemaTypes.forEach(type => {
      
      // 🚀 Service & Offer Catalog Schema
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
              "availability": "https://schema.org/InStock"
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
            }),
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${brandEntity.brandName} Repair Services`,
              "itemListElement": brandEntity.commonIssues.map((issue, index) => ({
                "@type": "OfferCatalog",
                "position": index + 1,
                "name": issue.title,
                "description": issue.description
              }))
            }
          });
        }
      }

      // 🚀 FAQ Schema
      if (type === 'FAQPage') {
        if (entity.entityType === 'FAQ') {
          const faq = entity as FAQEntity;
          schemaGraph.push({
            "@type": "FAQPage",
            "@id": `${fullCanonicalUrl}#faq`,
            "mainEntity": [{
              "@type": "Question",
              "name": faq.title,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }]
          });
        } else if (entity.entityType === 'Problem') {
          const problemEntity = entity as ProblemEntity;
          schemaGraph.push({
            "@type": "FAQPage",
            "@id": `${fullCanonicalUrl}#faq`,
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What causes ${problemEntity.title.toLowerCase()}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Common causes include: ${problemEntity.causes.join(', ')}.`
                }
              },
              {
                "@type": "Question",
                "name": `How do you fix ${problemEntity.title.toLowerCase()}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": problemEntity.solution
                }
              },
              ...(problemEntity.doNotDo ? [{
                "@type": "Question",
                "name": "What should I avoid doing if my laptop has this problem?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": problemEntity.doNotDo
                }
              }] : [])
            ]
          });
        }
      }

      // 🚀 Article Schema
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
            "publisher": { "@id": `${business.websiteUrl}/#business` }
          });
        }
      }
    });
  }

  // 6. Inject into the DOM safely using Helmet
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="robots" content="index, follow" />
      
      {/* OpenGraph / Social Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType || 'website'} />

      {/* JSON-LD Structured Data for Google Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemaGraph
        })}
      </script>
    </Helmet>
  );
};
