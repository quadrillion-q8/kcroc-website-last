// File: app/frontend/src/core/components/layout/background/AnimatedBackground.tsx
import React, { useEffect, useState } from 'react';
import { BACKGROUND_CONFIG, BackgroundVariant } from '../../../config/background.config';
import { GridLayer } from './GridLayer';
import { OrbLayer } from './OrbLayer';
import { VignetteLayer } from './VignetteLayer';

interface AnimatedBackgroundProps {
  variant?: BackgroundVariant;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'standard' 
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const config = BACKGROUND_CONFIG.variants[variant];

  // Check user OS accessibility preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div 
      className={`fixed inset-0 w-full h-full -z-50 ${BACKGROUND_CONFIG.baseColor} overflow-hidden pointer-events-none`}
      aria-hidden="true" // 13. Assistive Tech hidden
    >
      {/* Base Gradient Layer to prevent banding */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>

      {/* Modular Sub-Layers */}
      <GridLayer opacity={config.gridOpacity} />
      <OrbLayer 
        opacity={config.orbOpacity} 
        isReducedMotion={prefersReducedMotion && BACKGROUND_CONFIG.useReducedMotionFallback} 
      />
      <VignetteLayer opacity={config.vignetteOpacity} />
      
      {/* Optional Sub-Layer for future expansion: <NoiseLayer opacity="opacity-[0.02]" /> */}
    </div>
  );
};
