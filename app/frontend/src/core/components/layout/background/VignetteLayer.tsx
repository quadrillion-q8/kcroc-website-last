// File: app/frontend/src/core/components/layout/background/VignetteLayer.tsx
import React from 'react';

interface VignetteLayerProps { opacity: string; }

export const VignetteLayer: React.FC<VignetteLayerProps> = ({ opacity }) => (
  // 10. Vignette using radial gradient to draw focus to the center
  <div 
    className={`absolute inset-0 pointer-events-none ${opacity}`}
    style={{ 
      background: 'radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.8) 100%)',
    }}
  ></div>
);
