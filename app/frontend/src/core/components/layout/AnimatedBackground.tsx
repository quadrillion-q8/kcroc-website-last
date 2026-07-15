// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React, { useState, useEffect, useCallback } from 'react';
// ✅ FIXED: Removed the invalid 'initParticlesEngine' named export
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine"; // Safe to import types in Vite

export const AnimatedBackground: React.FC = () => {
  const [mountParticles, setMountParticles] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // ✅ FIXED: Using useCallback to safely initialize the engine via the 'init' prop
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    // 2. Performance: Lazy load particles (delay mounting to unblock LCP)
    const timer = setTimeout(() => {
      setMountParticles(true);
    }, 1200);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      
      {/* 
        INLINE STYLES FOR CUSTOM KEYFRAMES 
        Keeps the component fully self-contained without polluting tailwind config.
      */}
      <style>{`
        @keyframes aurora-1 {
          0% { transform: translate3d(0,0,0) rotate(18deg) scale(1); }
          50% { transform: translate3d(-8%,6%,0) rotate(26deg) scale(1.08); }
          100% { transform: translate3d(5%,-5%,0) rotate(12deg) scale(1); }
        }
        @keyframes aurora-2 {
          0% { transform: translate3d(0,0,0) rotate(-25deg) scale(1); }
          50% { transform: translate3d(6%,-8%,0) rotate(-18deg) scale(1.05); }
          100% { transform: translate3d(-5%,5%,0) rotate(-32deg) scale(1); }
        }
        @keyframes pulse-sweep {
          0% { -webkit-mask-position: -200% 0; mask-position: -200% 0; }
          100% { -webkit-mask-position: 200% 0; mask-position: 200% 0; }
        }
        .aurora-motion-1 {
          animation: aurora-1 40s infinite alternate ease-in-out;
        }
        .aurora-motion-2 {
          animation: aurora-2 35s infinite alternate ease-in-out;
        }
        .pulse-motion {
          animation: pulse-sweep 8s infinite linear;
          mask-size: 50% 100%;
          mask-repeat: no-repeat;
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 50%, transparent 100%);
          -webkit-mask-size: 50% 100%;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 50%, transparent 100%);
        }
      `}</style>

      {/* LAYER 0: Hero Spotlight (Subtle central glow that makes text pop) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-[50%] bg-cyan-500/10 blur-[120px]" />

      {/* LAYER 1: Cinematic Aurora Glows (Massive rotated ellipses) */}
      {/* Cyan Aurora */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[1200px] h-[600px] rounded-[50%] bg-cyan-600/10 blur-[150px] ${reduceMotion ? '' : 'aurora-motion-1'}`} 
      />
      {/* Emerald Aurora */}
      <div 
        className={`absolute bottom-[-20%] right-[-10%] w-[1000px] h-[500px] rounded-[50%] bg-emerald-600/10 blur-[150px] ${reduceMotion ? '' : 'aurora-motion-2'}`} 
      />

      {/* LAYER 2: The PCB / Circuit Matrix Base */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20z' fill='%230ea5e9' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* LAYER 3: Moving Energy Pulses (Electrical flow across traces) */}
      {!reduceMotion && (
        <div 
          className="absolute inset-0 opacity-40 pulse-motion"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20z' fill='%2322d3ee' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />
      )}

      {/* LAYER 4: Tech Dust (GPU Accelerated Particles) */}
      {mountParticles && !reduceMotion && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 z-0"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 30, // Optimized for smooth, low-overhead performance
            particles: {
              color: { value: ["#0ea5e9", "#10b981", "#ffffff"] }, // Cyan, Emerald, White
              move: {
                direction: "none", // Multi-directional ambient drift
                enable: true,
                outModes: { default: "out" },
                random: true,
                speed: { min: 0.1, max: 0.4 }, // Varying speeds for depth effect
                straight: false,
              },
              number: {
                density: { enable: true, area: 800 },
                value: 40, // Sparse premium feel
              },
              opacity: {
                value: { min: 0.05, max: 0.4 }, // Varying opacities to simulate depth
                animation: { enable: true, speed: 0.5, minimumValue: 0.05 }
              },
              shape: { type: "circle" },
              size: {
                value: { min: 0.5, max: 2.5 }, // Varying sizes for depth
                animation: { enable: true, speed: 1, minimumValue: 0.5 }
              },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* LAYER 5: The Vignette (Draws the eye toward the center content) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.75) 100%)'
        }}
      />
    </div>
  );
};
