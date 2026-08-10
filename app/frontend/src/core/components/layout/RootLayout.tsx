// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from '../ErrorBoundary';
import { CookieConsentBanner } from '../CookieConsentBanner';

// 🚀 CWV: AnimatedBackground pulls in tsParticles, which has no business being
// in the critical initial bundle for a purely decorative effect that already
// delays its own particle mount by 1200ms. Deferred the same way ChatWidget
// is in App.tsx, so it loads after first paint instead of blocking it.
const AnimatedBackground = lazy(() =>
  import('./AnimatedBackground').then((module) => ({ default: module.AnimatedBackground }))
);

export const RootLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* 🚀 WCAG 2.2 AA Compliance: Global Skip Link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-cyan-500 focus:text-slate-950 focus:font-bold rounded-br-xl shadow-lg"
      >
        Skip to main content
      </a>

      {/* The global background that sits behind all pages — deferred; falls
          back to the plain bg-slate-950 base color (matches AnimatedBackground's
          own base layer) until the chunk loads, so there's no visible pop-in. */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-slate-950" />}>
        <AnimatedBackground />
      </Suspense>

      <Header />

      {/* Wrapper for all page content. Must remain transparent. */}
      <main id="main-content" className="relative z-10 flex-grow flex flex-col pt-16 bg-transparent">
        {/* 🚀 Protects the entire routing tree from white-screen crashes */}
        <ErrorBoundary>
          <Suspense fallback={
            <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
              <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* 🚀 Mount the Consent Banner globally */}
      <CookieConsentBanner />

      <Footer />
    </div>
  );
};
