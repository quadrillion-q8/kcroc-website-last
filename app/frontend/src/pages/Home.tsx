import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO, SERVICES, REVIEWS, AREAS } from '../constants/data';
import { IMAGES } from '../constants/images'; // 👈 1. Imported your local image dictionary!

// 1. Synchronous Imports (Critical for Initial Paint)
import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import MobileCTA from '../components/home/MobileCTA'; 

// 2. Lazy Imports (Below the fold - loads in the background)
const GoogleReviewsWidget = lazy(() => import('../components/GoogleReviewsWidget'));
const ServicesGrid = lazy(() => import('../components/home/ServicesGrid'));
const RecentBlogs = lazy(() => import('../components/home/RecentBlogs'));
const AreasServed = lazy(() => import('../components/home/AreasServed'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const LocalSEOFooter = lazy(() => import('../components/home/LocalSEOFooter'));

export default function Home() {
  // Advanced Dynamic Schema Generation
  const SCHEMA_DATA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BUSINESS_INFO.url}/#organization`,
        "name": BUSINESS_INFO.name,
        "url": BUSINESS_INFO.url,
        "logo": BUSINESS_INFO.logo,
        "telephone": BUSINESS_INFO.phone,
      },
      {
        "@type": "WebPage",
        "@id": `${BUSINESS_INFO.url}/#webpage`,
        "url": BUSINESS_INFO.url,
        "name": "Computer Repair Kuwait | Laptop & MacBook Repair - KCROC",
        "description": "Professional laptop and computer repair in Kuwait. Free pick & drop across all governorates.",
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#business`,
        "name": BUSINESS_INFO.name,
        // 👇 2. Injected your most relevant local gallery image into Google's SEO Schema!
        "image": IMAGES.brand.shopPhoto, 
        "telephone": BUSINESS_INFO.phone,
        "url": BUSINESS_INFO.url,
        "areaServed": Object.values(AREAS).map(area => area.name),
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressCountry": "KW"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": BUSINESS_INFO.coords.lat,
          "longitude": BUSINESS_INFO.coords.lng
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "150"
        },
        "review": REVIEWS.map(r => ({
          "@type": "Review",
          "author": { "@type": "Person", "name": r.name },
          "datePublished": r.date,
          "reviewRating": { "@type": "Rating", "ratingValue": r.rating },
          "reviewBody": r.text
        })),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Computer Repair Services",
          "itemListElement": SERVICES.map((s, idx) => ({
            "@type": "Offer",
            "position": idx + 1,
            "itemOffered": { "@type": "Service", "name": s.title, "areaServed": "Kuwait" }
          }))
        }
      }
    ]
  };

  return (
    <main className="w-full bg-transparent flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30 scroll-smooth">
      <Helmet>
        <title>Computer Repair Kuwait | Laptop & MacBook Repair - KCROC</title>
        <meta name="description" content="Professional laptop and computer repair in Kuwait. Free pick & drop across all governorates." />
        <link rel="canonical" href={BUSINESS_INFO.url} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      <Hero />
      <TrustStats />

      <Suspense fallback={<div className="w-full h-32 flex items-center justify-center text-cyan-500 animate-pulse mt-10">Loading content...</div>}>
        <GoogleReviewsWidget />
        <ServicesGrid />
        <RecentBlogs />
        <AreasServed />
        <FAQSection />
        <LocalSEOFooter />
      </Suspense>

      <MobileCTA />
    </main>
  );
}
