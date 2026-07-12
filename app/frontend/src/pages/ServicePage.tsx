// File: app/frontend/src/pages/ServicePage.tsx
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '../knowledge/registry';

// ✅ Added: Import our graph-aware analytics trackers
import { trackEntityView, buildEntityPayload } from '../core/analytics';

// Default import to match the new architecture
import ServiceTemplate from './templates/ServiceTemplate';
import { SEOEngine } from '../core/components/SEOEngine';

export const ServicePage: React.FC = () => {
  // Check for either the old routing parameter ('slug') or the new one ('serviceSlug')
  const { slug, serviceSlug } = useParams<{ slug?: string, serviceSlug?: string }>();
  
  const activeSlug = slug || serviceSlug;

  // Keep the SEO Engine running using your existing registry
  const service = activeSlug ? getServiceBySlug(activeSlug) : undefined;

  // ✅ Added: Automatically fire a graph-aware event to GA4 when the service loads
  useEffect(() => {
    if (service) {
      trackEntityView(buildEntityPayload(service, 'Service'));
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* Phase 2 SEO Engine stays active */}
      <SEOEngine entityId={service.id} />

      {/* The new ServiceTemplate pulls its own UI data from graph.ts, 
          so we no longer pass props like title, subtitle, or commonIssues here. */}
      <ServiceTemplate />
    </>
  );
};
