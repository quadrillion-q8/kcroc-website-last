// File: app/frontend/src/pages/GamingPC.tsx
import React from 'react';
import ServiceTemplate from './templates/ServiceTemplate';

export default function GamingPC() {
  // ✅ FIXED: Maps exactly to the ID in graph.ts
  return <ServiceTemplate entityId="srv-gaming" />;
}
