// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React, { useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export const AnimatedBackground: React.FC = () => {
  // Initialize the particle engine efficiently
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      
      {/* LAYER 1 & 2: The Deep Base & Slow Aurora Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[150px] animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-emerald-600/5 blur-[150px] animate-blob [animation-delay:4s]" />

      {/* LAYER 3: The PCB / Circuit Matrix Overlay */}
      {/* We use an inline SVG data URI for a tech-grid, masked by a gradient to simulate fading light */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20zm0 4v-2h20v2H20z' fill='%230ea5e9' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      {/* LAYER 4: Tech Dust (GPU Accelerated Particles) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#0ea5e9", "#10b981"], // KCROC Cyan and Emerald
            },
            move: {
              direction: "top", // Drifting upwards like heat/energy
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.5, // Extremely slow and subtle
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40, // Sparse, not overwhelming
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              }
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 }, // Tiny dust motes
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
