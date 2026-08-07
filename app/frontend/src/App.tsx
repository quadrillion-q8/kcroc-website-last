// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { KCROC_GRAPH } from './data/graph';

// Analytics Provider
import { AnalyticsProvider } from './core/analytics/AnalyticsProvider';

// 🚀 CWV Optimization: Defer heavy third-party UI to protect Interaction to Next Paint (INP)
const ChatWidget = lazy(() => import('./components/ChatWidget').then(module => ({ default: module.ChatWidget })));

// Core Pages
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const PrivacySecurity = lazy(() => import('./pages/PrivacySecurity'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog')); 
const NotFound = lazy(() => import('./pages/NotFound'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

// Dynamic Enterprise Templates
const Services = lazy(() => import('./pages/Services'));
const ServiceTemplate = lazy(() => import('./pages/templates/ServiceTemplate'));
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));

// SEO Roadmap Templates
const BrandTemplate = lazy(() => import('./pages/templates/BrandTemplate'));
const ProblemTemplate = lazy(() => import('./pages/templates/ProblemTemplate'));
const CaseStudyTemplate = lazy(() => import('./pages/templates/CaseStudyTemplate'));

// Case Studies Index Page
const CaseStudiesIndex = lazy(() => import('./pages/CaseStudiesIndex'));

// Custom Standalone Blog Pages
const BlogLaptopRepair = lazy(() => import('./pages/BlogLaptopRepair'));
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));

// 🚀 Content Pillars & Clusters
const LaptopBuyingGuide = lazy(() => import('./pages/LaptopBuyingGuide'));
const IntelVsAmdGuide = lazy(() => import('./pages/IntelVsAmdGuide')); // 👈 Added missing cluster import

// 🚀 Custom AI-Generated Guides
const DellOverheatingPage = lazy(() => import('./pages/DellOverheatingPage').then(module => ({ default: module.DellOverheatingPage })));
const BatteryHealthGuide = lazy(() => import('./pages/BatteryHealthGuide'));

// 🚀 Legacy Link Preservation: old /services/:slug URLs (from before the flat-URL
// migration) redirect to the current canonical route instead of dead-ending in a
// 404 — preserves any existing backlinks/bookmarks/SEO equity pointing at the old path.
const LegacyServiceRedirect: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();
  const service = KCROC_GRAPH.services.find(s => s.slug === serviceSlug);
  return <Navigate to={service ? `/${service.slug}` : '/404'} replace />;
};

// UI: Global loading spinner
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Global Analytics Telemetry */}
      <AnalyticsProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              
              {/* The Dynamic Services Gateway */}
              <Route path="services" element={<Services />} />
              
              {/* DYNAMIC ROOT-LEVEL SEO ROUTES */}
              {KCROC_GRAPH.services.map((service) => (
                <Route key={service.slug} path={service.slug} element={<ServiceTemplate entityId={service.id} />} />
              ))}
              
              {KCROC_GRAPH.brands.map((brand) => (
                <Route key={brand.slug} path={brand.slug} element={<BrandTemplate entityId={brand.id} />} />
              ))}
              
              {KCROC_GRAPH.problems.map((problem) => (
                <Route key={problem.slug} path={problem.slug} element={<ProblemTemplate entityId={problem.id} />} />
              ))}

              {/* Legacy Service Route Fallback — redirects old /services/:slug links to the current flat URL */}
              <Route path="services/:serviceSlug" element={<LegacyServiceRedirect />} />
              
              {/* Case Studies */}
              <Route path="case-studies" element={<CaseStudiesIndex />} />
              <Route path="case-studies/:slug" element={<CaseStudyTemplate />} />
              
              {/* Static Routes */}
              <Route path="book" element={<BookingPage />} />
              <Route path="booking" element={<BookingPage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="about" element={<About />} />
              
              {/* Legal & Privacy Routes */}
              <Route path="privacy-security-kuwait" element={<PrivacySecurity />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="terms" element={<Navigate to="/terms-of-service" replace />} />

              <Route path="faq" element={<FAQ />} />

              {/* Content Routes */}
              <Route path="blog" element={<Blog />} />
              
              {/* Custom Explicit Blog Routes */}
              <Route path="blog/laptop-repair-kuwait-2026" element={<BlogLaptopRepair />} />
              <Route path="blog/how-to-protect-laptop-screen" element={<BlogScreenProtection />} />
              <Route path="blog/gaming-pc-cooling" element={<GamingPCCooling />} />
              
              {/* 🚀 New Pillar & Cluster Routes */}
              <Route path="blog/laptop-buying-guide-kuwait-2026" element={<LaptopBuyingGuide />} />
              <Route path="blog/intel-core-ultra-vs-amd-ryzen-ai" element={<IntelVsAmdGuide />} /> 
              
              {/* AI Content Guides */}
              <Route path="guides/dell-overheating" element={<DellOverheatingPage />} />
              <Route path="guides/laptop-battery-warning-signs" element={<BatteryHealthGuide />} />
              
              {/* SEO Guardrails */}
              <Route path="laptop-screen-protection-tips" element={<ScreenProtectionTips />} />
              <Route path="blog/laptop-screen-protection-tips" element={<Navigate to="/laptop-screen-protection-tips" replace />} />
              <Route path="battery-replacement" element={<Navigate to="/battery-replacement-kuwait" replace />} />
              
              {/* Generic Blog Catch-All */}
              <Route path="blog/:slug" element={<BlogPostTemplate />} />
              
              {/* Dynamic Location SEO Landing Pages */}
              <Route path="computer-repair-:slug" element={<LocationTemplate />} />
              <Route path="laptop-repair-:slug" element={<LocationTemplate />} />
              <Route path="location/:slug" element={<LocationTemplate />} />
              
              {/* Other Templates */}
              <Route path="pillar/:slug" element={<PillarTemplate />} />
              
              {/* SEO Guardrail: Redirect dynamic FAQ routes to the main FAQ page */}
              <Route path="faq/:faqSlug" element={<Navigate to="/faq" replace />} />
              
              {/* Secure Catch-All for 404s */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        
        {/* CWV Optimization: Background boundary for the chat widget */}
        <Suspense fallback={null}>
          <ChatWidget /> 
        </Suspense>
      </AnalyticsProvider>
    </BrowserRouter>
  );
};

export default App;
