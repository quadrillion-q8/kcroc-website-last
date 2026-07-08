// File: app/frontend/src/pages/MotherboardRepair.tsx
import React from 'react';
import ServiceTemplate from './templates/ServiceTemplate';

export default function MotherboardRepair() {
  // ✅ FIXED: Maps exactly to the ID in graph.ts
  return <ServiceTemplate entityId="srv-motherboard" />;
}
