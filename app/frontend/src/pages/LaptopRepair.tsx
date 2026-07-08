// File: app/frontend/src/pages/LaptopRepair.tsx
import React from 'react';
import ServiceTemplate from './templates/ServiceTemplate';

export default function LaptopRepair() {
  // ✅ FIXED: Maps exactly to the ID in graph.ts
  return <ServiceTemplate entityId="srv-laptop" />;
}
