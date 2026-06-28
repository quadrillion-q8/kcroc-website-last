import React, { lazy } from 'react';
import { BUSINESS_INFO } from '../constants/data';
import SEOComponent from '../components/seo/SEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import { LazySection } from '../components/shared/LazySection';

import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import MobileCTA from '../components/home/MobileCTA';

const GoogleReviewsWidget = lazy(() => import('../components/GoogleReviewsWidget'));
const ServicesGrid = lazy(() => import('../components/home/ServicesGrid'));
const AreasServed = lazy(() => import('../components/home/AreasServed'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const RecentBlogs = lazy(() => import('../components/home/RecentBlogs'));
const LocalSEOFooter = lazy(() => import('../components/home/LocalSEOFooter'));

export default function Home() {
  return (
    <main className="w-full bg-transparent flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30 scroll-smooth">
      <SEOComponent
        title="Computer Repair Kuwait | Laptop & MacBook Repair"
        canonical={BUSINESS_INFO.url}
      />
      <LocalBusinessSchema />

      <Hero />
      <TrustStats />

      <LazySection fallbackLabel="Customer Reviews" skeletonVariant="cards">
        <GoogleReviewsWidget />
      </LazySection>

      <LazySection fallbackLabel="Services Grid" skeletonVariant="cards">
        <ServicesGrid />
      </LazySection>

      <LazySection fallbackLabel="Service Areas" skeletonVariant="lines">
        <AreasServed />
      </LazySection>

      <LazySection fallbackLabel="FAQ Section" skeletonVariant="lines">
        <FAQSection />
      </LazySection>

      <LazySection fallbackLabel="Recent Blogs" skeletonVariant="cards">
        <RecentBlogs />
      </LazySection>

      <LazySection fallbackLabel="Footer Data" skeletonVariant="block">
        <LocalSEOFooter />
      </LazySection>

      <MobileCTA />
    </main>
  );
}
