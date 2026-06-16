import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Star } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, REVIEWS, SERVICE_AREAS } from '../constants/data';

// Component Imports
import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import ServicesGrid from '../components/home/ServicesGrid';
import RecentBlogs from '../components/home/RecentBlogs';
import Reviews from '../components/home/Reviews';
import AreasServed from '../components/home/AreasServed';
import FAQSection from '../components/home/FAQSection';
import LocalSEOFooter from '../components/home/LocalSEOFooter';
import MobileCTA from '../components/home/MobileCTA';

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
        "description": "Professional laptop repair in Kuwait with free pickup and delivery. We repair MacBooks, gaming PCs, motherboards, screens, and desktops.",
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#business`,
        "name": BUSINESS_INFO.name,
        "image": BUSINESS_INFO.logo,
        "telephone": BUSINESS_INFO.phone,
        "url": BUSINESS_INFO.url,
        "areaServed": SERVICE_AREAS,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Basement Shop 19",
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BUSINESS_INFO.url}/#breadcrumb`,
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url }]
      }
    ]
  };

  return (
    <main className="w-full bg-transparent flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30 scroll-smooth">
      <Helmet>
        {/* Primary SEO */}
        <title>Computer Repair Kuwait | Laptop & MacBook Repair - KCROC</title>
        <meta name="description" content="Professional laptop repair in Kuwait with free pickup and delivery. We repair MacBooks, gaming PCs, motherboards, screens, and desktops across Hawalli, Salmiya, Farwaniya and Kuwait City." />
        <link rel="canonical" href={BUSINESS_INFO.url} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="theme-color" content="#06b6d4" />
        
        {/* Geo-Targeting */}
        <meta name="geo.region" content="KW" />
        <meta name="geo.placename" content="Hawalli" />
        <meta name="ICBM" content="29.3356, 48.0250" />
        <link rel="alternate" hrefLang="en-kw" href={BUSINESS_INFO.url} />

        {/* Open Graph & Twitter */}
        <meta property="og:site_name" content="KCROC" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Computer Repair Kuwait | Laptop & MacBook Repair - KCROC" />
        <meta property="og:description" content="Professional laptop repair in Kuwait with free pickup and delivery. We repair MacBooks, gaming PCs, motherboards, and desktops." />
        <meta property="og:url" content={BUSINESS_INFO.url} />
        <meta property="og:image" content={BUSINESS_INFO.logo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Computer Repair Kuwait | KCROC" />
        <meta name="twitter:description" content="Professional laptop repair in Kuwait with free pickup and delivery." />
        <meta name="twitter:image" content={BUSINESS_INFO.logo} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      {/* CRO: Sticky Desktop Review Badge */}
      <a href={BUSINESS_INFO.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="hidden md:flex fixed right-0 top-1/3 z-50 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 p-3 rounded-l-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform items-center gap-3 group focus-visible:ring-2 focus-visible:ring-cyan-400">
        <div className="flex flex-col items-center">
          <span className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">4.9/5</span>
          <div className="flex text-cyan-400 my-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider">150+ Reviews</span>
        </div>
      </a>

      <Hero />
      <TrustStats />
      <ServicesGrid />
      <RecentBlogs />
      <Reviews />
      <AreasServed />
      <FAQSection />
      <LocalSEOFooter />
      <MobileCTA />
    </main>
  );
}
