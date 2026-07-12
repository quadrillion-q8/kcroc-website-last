import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '../knowledge/registry';
import ServiceTemplate from './templates/ServiceTemplate';
import { SEOEngine } from '../core/components/SEOEngine';

export const ServicePage: React.FC = () => {
  const { slug, serviceSlug } = useParams<{ slug?: string, serviceSlug?: string }>();
  const activeSlug = slug || serviceSlug;
  const service = activeSlug ? getServiceBySlug(activeSlug) : undefined;

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
