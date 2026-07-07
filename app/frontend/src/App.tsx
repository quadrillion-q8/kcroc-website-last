// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { ChatWidget } from './components/ChatWidget';

// Core Pages
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const PrivacySecurity = lazy(() => import('./pages/PrivacySecurity'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog')); // ✅ ADDED: Main Blog Page Import
const NotFound = lazy(() => import('./pages/NotFound'));

// Dynamic Enterprise Templates
const Services = lazy(() => import('./pages/Services'));
const ServiceTemplate = lazy(() => import('./pages/templates/ServiceTemplate'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));

// UI: Global loading spinner
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center bg-slate-950">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            
            {/* The Dynamic Services Gateway */}
            <Route path="services" element={<Services />} />
            <Route path="services/:serviceSlug" element={<ServiceTemplate />} />
            
            {/* Static Routes */}
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="privacy-security-kuwait" element={<PrivacySecurity />} />
            <Route path="laptop-screen-protection-tips" element={<ScreenProtectionTips />} />
            <Route path="faq" element={<FAQ />} />

            {/* Content Routes */}
            <Route path="blog" element={<Blog />} /> {/* ✅ ADDED: Main Blog Route */}
            <Route path="blog/:slug" element={<BlogPostTemplate />} />
            <Route path="pillar/:slug" element={<PillarTemplate />} />
            <Route path="location/:slug" element={<LocationTemplate />} />
            
            {/* SEO Guardrail: Redirect dynamic FAQ routes to the main FAQ page */}
            <Route path="faq/:faqSlug" element={<Navigate to="/faq" replace />} />
            
            {/* Secure Catch-All for 404s */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ChatWidget /> 
    </BrowserRouter>
  );
};

export default App;
