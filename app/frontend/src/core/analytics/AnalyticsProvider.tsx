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
import { getLastContactConversionAt } from './core';
import { AnalyticsEvent, BaseEventPayload, BookingEvent } from './types';

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

  // 2. Automated SPA Pageview Tracking Pipeline
  // The tag is configured with send_page_view:false, so route changes are
  // reported here exactly once. Consent Mode decides what Google stores.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      trackEvent('page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  // 3. Conversion Tracking Pipeline
  const trackConversion = (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload) => {
    const entityContext = currentEntity ? buildEntityPayload(currentEntity, 'Service') : {};

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...entityContext,
      ...payload
    });

    trackEvent(event, { ...entityContext, ...payload });
  };

  // 4. Global safety net for call / WhatsApp links.
  // Many content pages (guides, blog posts, menus, footer) link to tel: or
  // wa.me without their own tracking. One delegated listener records those
  // clicks as phone_call_click / whatsapp_click. Links that already track
  // themselves fire first (React handlers run before this document listener),
  // and getLastContactConversionAt() prevents a second, duplicate event.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const isCall = href.startsWith('tel:');
      const isWhatsApp = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href);
      if (!isCall && !isWhatsApp) return;
      if (Date.now() - getLastContactConversionAt() < 800) return;

      const inHeader = !!anchor.closest('header, nav');
      const inFooter = !!anchor.closest('footer');
      const position = inHeader ? 'header' : inFooter ? 'footer' : 'body';
      trackConversion(isCall ? 'phone_call_click' : 'whatsapp_click', {
        cta_name: isCall ? 'auto_tel_link' : 'auto_whatsapp_link',
        button_position: position,
        link_text: (anchor.textContent || '').trim().slice(0, 60),
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity]);

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
