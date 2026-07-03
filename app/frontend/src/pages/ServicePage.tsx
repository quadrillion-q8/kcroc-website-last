// File: app/frontend/src/pages/ServicePage.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug, getRelatedIssuesForService } from '../knowledge/registry';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { Laptop, Apple, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck } from 'lucide-react';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

// Map string identifiers from registry.ts to actual Icon components
const IconMap: Record<string, React.ElementType> = {
  Laptop, Apple, Gamepad2, Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck
};

export const ServicePage: React.FC = () => {
  // 1. Grab the slug from the URL (e.g., "macbook-repair-kuwait")
  const { slug } = useParams<{ slug: string }>();

  // 2. Ask the Knowledge Graph for the data
  const service = slug ? getServiceBySlug(slug) : undefined;

  // 3. If the URL doesn't match any service, send them back to the Home page
  if (!service) {
    return <Navigate to="/" replace />;
  }

  // 4. Get the related issues (symptoms) for this specific service
  const issues = getRelatedIssuesForService(service.id);
  const formattedIssues = issues.map(issue => ({
    title: issue.name,
    description: issue.symptoms.join(', ') + '. ' + issue.description
  }));

  const ServiceIcon = IconMap[service.icon] || Laptop;

  // 5. Feed the data into the Template
  return (
    <>
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION */}
      {/* The Engine pulls all SEO data dynamically using the service.id */}
      <SEOEngine entityId={service.id} />

      <ServiceTemplate
        title={`${service.name} Services`}
        subtitle={service.description}
        icon={ServiceIcon}
        commonIssues={formattedIssues}
      />
    </>
  );
};
