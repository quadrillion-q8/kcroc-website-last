// File: app/frontend/src/core/config/background.config.ts

export type BackgroundVariant = 'hero' | 'standard' | 'minimal';

export interface OrbConfig {
  color: string;
  size: string;
  position: string;
  delay: string;
}

export const BACKGROUND_CONFIG = {
  // Global Settings
  baseColor: "bg-brand-dark",
  useReducedMotionFallback: true, // If true, replaces animations with static gradients for accessibility

  // Layer Opacities by Variant
  variants: {
    hero: {
      gridOpacity: "opacity-20",
      orbOpacity: "opacity-30",
      vignetteOpacity: "opacity-60",
    },
    standard: {
      gridOpacity: "opacity-10",
      orbOpacity: "opacity-15",
      vignetteOpacity: "opacity-40",
    },
    minimal: {
      gridOpacity: "opacity-5",
      orbOpacity: "opacity-5",
      vignetteOpacity: "opacity-20",
    }
  },

  // Orb Configurations (Size, Color, Delay)
  orbs: [
    {
      color: "bg-brand-primary",
      size: "w-72 h-72",
      position: "top-0 -left-4",
      delay: "0s",
    },
    {
      color: "bg-brand-accent",
      size: "w-72 h-72",
      position: "top-0 -right-4",
      delay: "2s", // Uses standard CSS variable for exact control
    },
    {
      color: "bg-status-success",
      size: "w-72 h-72",
      position: "-bottom-8 left-20",
      delay: "4s",
    }
  ] as OrbConfig[]
};
