// File: app/frontend/src/core/routing/DynamicRoutes.tsx
import React, { lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph';

// Lazy load the templates only when a route matches
const ServiceTemplate = lazy(() => import('../../pages/templates/ServiceTemplate'));
const BrandTemplate = lazy(() => import('../../pages/templates/BrandTemplate'));
const ProblemTemplate = lazy(() => import('../../pages/templates/ProblemTemplate'));
const NotFound = lazy(() => import('../../pages/NotFound'));

export const DynamicRouteHandler = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) return <NotFound />;

  // Search the graph for the correct entity type
  const service = KCROC_GRAPH.services.find(s => s.slug === slug);
  if (service) return <ServiceTemplate entityId={service.id} />;

  const brand = KCROC_GRAPH.brands.find(b => b.slug === slug);
  if (brand) return <BrandTemplate entityId={brand.id} />;

  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);
  if (problem) return <ProblemTemplate entityId={problem.id} />;

  // Fallback if no slug matches in the graph
  return <NotFound />;
};

export const LegacyServiceRedirect = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();
  const service = KCROC_GRAPH.services.find(s => s.slug === serviceSlug);
  
  return <Navigate to={service ? `/${service.slug}` : '/404'} replace />;
};
