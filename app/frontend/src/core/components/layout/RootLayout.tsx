// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from '../ErrorBoundary';
import { CookieConsentBanner } from '../CookieConsentBanner';
import { StickyMobileCTA } from '../../../components/home/StickyMobileCTA';

// 🚀 CWV: AnimatedBackground is a pure SVG/CSS effect now (no particle
// engine — an earlier tsParticles-based version was already replaced), but
// it's still purely decorative and has no business being in the critical
// initial bundle. Deferred the same way ChatWidget is in App.tsx, so it
// loads after first paint instead of blocking it.
const AnimatedBackground = lazy(() =>
  import('./AnimatedBackground').then((module) => ({ default: module.AnimatedBackground }))
);

export const RootLayout: React.FC = () => {
  return (
    <>
        {/* AnalyticsProvider is mounted once, at the outer AppWrapper level in
            App.tsx — do not add a second one here, it previously caused
            duplicate virtual_pageview events. */}
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

          {/* 🚀 MOBILE CTA FIX: Persistent Call + WhatsApp bar, now mounted
              globally (was homepage-only) so every route — service pages,
              location pages, blog posts — has a reachable conversion path
              on mobile. Spacer below prevents it from permanently covering
              the start of the Footer. */}
          <StickyMobileCTA />
          <div className="md:hidden h-24 shrink-0" aria-hidden="true" />

          {/* 🚀 Mount the Consent Banner globally. Positioned above the
              StickyMobileCTA bar on mobile (bottom-24) instead of bottom-0
              so the two fixed bottom bars never overlap/cover each other;
              see CookieConsentBanner.tsx for the matching offset. */}
          <CookieConsentBanner />

          <Footer />
        </div>
    </>
  );
};
