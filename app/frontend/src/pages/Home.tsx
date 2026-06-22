import React, { Suspense, lazy } from 'react';
import { SEO } from '../constants/seo';
import SEOComponent from '../components/seo/SEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import { BUSINESS_INFO } from '../constants/data';

// Critical Components
import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import MobileCTA from '../components/home/MobileCTA';

// Lazy Imports
const GoogleReviewsWidget = lazy(() => import('../components/GoogleReviewsWidget'));
const ServicesGrid = lazy(() => import('../components/home/ServicesGrid'));
const RecentBlogs = lazy(() => import('../components/home/RecentBlogs'));
const AreasServed = lazy(() => import('../components/home/AreasServed'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const LocalSEOFooter = lazy(() => import('../components/home/LocalSEOFooter'));

export default function Home() {
  return (
    <main className="w-full bg-transparent flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30 scroll-smooth">
      {/* Task 3 & 4: Integrated SEO and Local Business Schema */}
      <SEOComponent 
        title="Computer Repair Kuwait | Laptop & MacBook Repair"
        canonical={BUSINESS_INFO.url}
      />
      <LocalBusinessSchema />

      <Hero />
      <TrustStats />

      <Suspense fallback={<div className="w-full h-32 flex items-center justify-center text-cyan-500 animate-pulse mt-10">Loading...</div>}>
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
