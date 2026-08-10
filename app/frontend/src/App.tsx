// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';

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
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));

// Case Studies Index Page
const CaseStudiesIndex = lazy(() => import('./pages/CaseStudiesIndex'));
const CaseStudyTemplate = lazy(() => import('./pages/templates/CaseStudyTemplate'));

// Custom Standalone Blog Pages
const BlogLaptopRepair = lazy(() => import('./pages/BlogLaptopRepair'));
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));

// Content Pillars & Clusters
const LaptopBuyingGuide = lazy(() => import('./pages/LaptopBuyingGuide'));
const LaptopBuyingGuideAR = lazy(() => import('./pages/LaptopBuyingGuideAR'));
const IntelVsAmdGuide = lazy(() => import('./pages/IntelVsAmdGuide')); 

// Author Bio Pages
const AuthorImran = lazy(() => import('./pages/AuthorImran'));

// 🚀 Custom AI-Generated Guides
const BatteryHealthGuide = lazy(() => import('./pages/BatteryHealthGuide'));
const DellInspiron15_3000OverheatingPage = lazy(() => import('./pages/DellInspiron15_3000OverheatingPage').then(module => ({ default: module.DellInspiron15_3000OverheatingPage }))); // 👈 UPDATED

// 🚀 CWV Optimization: Extracted routing logic that requires graph.ts into a deferred chunk.
// This prevents the 192KB graph.ts from blocking initial paint!
const DynamicRouteHandler = lazy(() => import('./core/routing/DynamicRoutes').then(m => ({ default: m.DynamicRouteHandler })));
const LegacyServiceRedirect = lazy(() => import('./core/routing/DynamicRoutes').then(m => ({ default: m.LegacyServiceRedirect })));

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
              
              {/* 🚀 DYNAMIC ROOT-LEVEL SEO ROUTES (Services, Brands, Problems)
                  Handled dynamically via URL parameter to keep graph.ts out of the main bundle. */}
              <Route path=":slug" element={<DynamicRouteHandler />} />

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
              {/* Legacy/short-link redirects to the canonical legal URLs */}
              <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="terms" element={<Navigate to="/terms-of-service" replace />} />

              <Route path="faq" element={<FAQ />} />

              {/* Content Routes */}
              <Route path="blog" element={<Blog />} />
              
              {/* Custom Explicit Blog Routes */}
              <Route path="blog/laptop-repair-kuwait-2026" element={<BlogLaptopRepair />} />
              <Route path="blog/how-to-protect-laptop-screen" element={<BlogScreenProtection />} />
              <Route path="blog/gaming-pc-cooling" element={<GamingPCCooling />} />
              <Route path="blog/laptop-buying-guide-kuwait-2026" element={<LaptopBuyingGuide />} />
              <Route path="blog/ar/laptop-buying-guide-kuwait-2026" element={<LaptopBuyingGuideAR />} />
              <Route path="blog/intel-core-ultra-vs-amd-ryzen-ai" element={<IntelVsAmdGuide />} /> 

              {/* Author Bio Pages */}
              <Route path="author/imran" element={<AuthorImran />} />
              
              {/* 🚀 AI Content Guides */}
              <Route path="guides/laptop-battery-warning-signs" element={<BatteryHealthGuide />} />
              <Route path="guides/dell-inspiron-15-3000-overheating" element={<DellInspiron15_3000OverheatingPage />} />
              <Route path="guides/dell-overheating" element={<Navigate to="/guides/dell-inspiron-15-3000-overheating" replace />} /> 
              
              {/* SEO Guardrail: Canonical URL redirection */}
              <Route path="laptop-screen-protection-tips" element={<ScreenProtectionTips />} />
              <Route path="blog/laptop-screen-protection-tips" element={<Navigate to="/laptop-screen-protection-tips" replace />} />
              
              {/* Corrected SEO Guardrail for Battery */}
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
