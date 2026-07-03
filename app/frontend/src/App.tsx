// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { ChatWidget } from './components/ChatWidget';

// Lazy load pages - Ensure these filenames match your folder exactly
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./pages/ServicePage').then(module => ({ default: module.ServicePage })));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const PrivacySecurity = lazy(() => import('./pages/PrivacySecurity'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));
const FAQ = lazy(() => import('./pages/FAQ'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
            
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="privacy-security-kuwait" element={<PrivacySecurity />} />
            <Route path="laptop-screen-protection-tips" element={<ScreenProtectionTips />} />
            <Route path="faq" element={<FAQ />} />

            <Route path="blog/:slug" element={<BlogPostTemplate />} />
            <Route path="pillar/:slug" element={<PillarTemplate />} />
            <Route path="location/:slug" element={<LocationTemplate />} />
            
            <Route path=":slug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ChatWidget /> 
    </BrowserRouter>
  );
};

export default App;
