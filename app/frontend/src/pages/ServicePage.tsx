// File: app/frontend/src/pages/ServicePage.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';
import { getServiceBySlug } from '../knowledge/registry'; // Keeping this only as a fallback
import ServiceTemplate from './templates/ServiceTemplate';
import { SEOEngine } from '../core/components/SEOEngine';

export const ServicePage: React.FC = () => {
  const { slug, serviceSlug } = useParams<{ slug?: string, serviceSlug?: string }>();
  const activeSlug = slug || serviceSlug;

  // 1. TRY GRAPH FIRST (The modern system)
  let service = KCROC_GRAPH.services.find(s => s.slug === activeSlug);
  
  // 2. FALLBACK TO REGISTRY (The legacy system)
  // If found in Registry, we normalize it to match the Graph structure 
  // so the ServiceTemplate doesn't break.
  if (!service && activeSlug) {
    const legacyService = getServiceBySlug(activeSlug);
    if (legacyService) {
      service = {
        id: legacyService.id, // This ID must exist in graph.ts for the Template to work
        title: legacyService.name,
        slug: legacyService.slug,
        description: legacyService.description,
        iconKey: legacyService.icon?.toLowerCase() || 'laptop',
        warranty: { duration: 'Standard', noFixNoFee: true }, // Legacy filler
        pricing: { displayLabel: 'Contact for price' }, // Legacy filler
        coreFeatures: [],
        relatedIssues: legacyService.relatedIssues || [],
      } as any;
    }
  }

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEOEngine entityId={service.id} />
      <ServiceTemplate entityId={service.id} />
    </>
  );
};
