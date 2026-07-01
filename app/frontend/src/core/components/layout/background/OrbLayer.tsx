// File: app/frontend/src/core/components/layout/background/OrbLayer.tsx
import React from 'react';
import { BACKGROUND_CONFIG } from '../../../config/background.config';

interface OrbLayerProps { 
  opacity: string; 
  isReducedMotion: boolean; 
}

export const OrbLayer: React.FC<OrbLayerProps> = ({ opacity, isReducedMotion }) => (
  <div className="absolute inset-0">
    {BACKGROUND_CONFIG.orbs.map((orb, index) => {
      // 4. GPU Optimization & Motion Preferences
      const animationClass = isReducedMotion ? '' : 'animate-blob';
      
      return (
        <div 
          key={index}
          // 8. Animation Delays handled via inline style for guaranteed execution
          style={{ animationDelay: orb.delay, willChange: 'transform' }}
          className={`absolute ${orb.position} ${orb.size} ${orb.color} rounded-full mix-blend-multiply filter blur-3xl ${opacity} ${animationClass}`}
        ></div>
      );
    })}
  </div>
);
