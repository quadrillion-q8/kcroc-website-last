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
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog')); 
const NotFound = lazy(() => import('./pages/NotFound'));

// Dynamic Enterprise Templates
const Services = lazy(() => import('./pages/Services'));
const ServiceTemplate = lazy(() => import('./pages/templates/ServiceTemplate'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));

// Custom Standalone Blog Pages
const BlogLaptopRepair = lazy(() => import('./pages/BlogLaptopRepair'));
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));

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
            <Route path="faq" element={<FAQ />} />

            {/* Content Routes */}
            <Route path="blog" element={<Blog />} />
            
            {/* Custom Explicit Blog Routes (Must go BEFORE blog/:slug) */}
            <Route path="blog/laptop-repair-kuwait-2026" element={<BlogLaptopRepair />} />
            <Route path="blog/how-to-protect-laptop-screen" element={<BlogScreenProtection />} />
            <Route path="blog/gaming-pc-cooling" element={<GamingPCCooling />} />
            
            {/* SEO Guardrail: Screen protection tips has a root-level canonical URL */}
            <Route path="laptop-screen-protection-tips" element={<ScreenProtectionTips />} />
            <Route path="blog/laptop-screen-protection-tips" element={<Navigate to="/laptop-screen-protection-tips" replace />} />
            
            {/* Generic Blog Catch-All */}
            <Route path="blog/:slug" element={<BlogPostTemplate />} />
            
            {/* Templates */}
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
