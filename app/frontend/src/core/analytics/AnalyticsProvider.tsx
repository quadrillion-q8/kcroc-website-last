// File: app/frontend/src/core/analytics/AnalyticsProvider.tsx
import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// 🚀 PERF FIX (root cause): this used to import `Registry` from
// `knowledge/registry.ts`, which imports the full ~190KB graph.ts.
// AnalyticsProvider wraps the entire app eagerly (not lazy-loaded), so that
// single `Registry.getServiceBySlug()` call — done purely to grab an id/
// slug/title for GA4 payloads — was pulling the ENTIRE knowledge graph
// (every service's FAQs, process steps, repair examples, etc.) into the
// main synchronous entry bundle on every page load. This was the single
// biggest contributor to the bloated entry chunk. buildEntityPayload only
// ever reads entity.id/slug/title, so we look those up directly against the
// already-slim NAV_GRAPH instead of the full graph.
import { NAV_GRAPH } from '../../data/navGraph.generated';
import { trackEvent, buildEntityPayload } from './index'; 
import { AnalyticsEvent, BaseEventPayload, BookingEvent } from './types';
import { hasAnalyticsConsent, subscribeToConsentChanges } from '../privacy/consent';

// Extend the global Window interface to support Google Tag Manager telemetry layers
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface AnalyticsContextValue {
  currentEntity: any | null;
  trackConversion: (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // 1. Core Entity Memoization Vector
  const currentEntity = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 1];
    return NAV_GRAPH.services.find(s => s.slug === slug) || null;
  }, [location.pathname]);

  // 2. Automated Virtual Pageview Telemetry Pipeline
  useEffect(() => {
    const sendVirtualPageview = () => {
      if (!hasAnalyticsConsent()) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'virtual_pageview',
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    };

    // Keep the small post-render delay that protects page metadata from being
    // sampled before React has committed it, but never emit without consent.
    const timeoutId = setTimeout(sendVirtualPageview, 100);
    const unsubscribe = subscribeToConsentChanges((state) => {
      if (state === 'granted') sendVirtualPageview();
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [location]);

  // 3. Conversion Tracking Pipeline
  const trackConversion = (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload) => {
    if (!hasAnalyticsConsent()) return;

    const entityContext = currentEntity ? buildEntityPayload(currentEntity, 'Service') : {};

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...entityContext,
      ...payload
    });

    trackEvent(event, { ...entityContext, ...payload });
  };

  return (
    <AnalyticsContext.Provider value={{ currentEntity, trackConversion }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};
