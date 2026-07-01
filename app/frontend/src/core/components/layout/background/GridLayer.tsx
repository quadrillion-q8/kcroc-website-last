// File: app/frontend/src/core/components/layout/background/GridLayer.tsx
import React from 'react';

interface GridLayerProps { opacity: string; }

export const GridLayer: React.FC<GridLayerProps> = ({ opacity }) => (
  // 14. Ensure grid.svg is in your public folder!
  <div 
    className={`absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] ${opacity}`}
    style={{ willChange: 'opacity' }} 
  ></div>
);
