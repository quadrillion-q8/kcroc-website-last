// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export const AnimatedBackground: React.FC = () => {
  const [mountParticles, setMountParticles] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    const timer = setTimeout(() => setMountParticles(true), 1200);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020617]">
      
      <style>{`
        /* Organic, slow-moving aurora clouds (40-60s) */
        @keyframes aurora-cyan {
          0% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(5%, -5%) scale(1.05); }
          66% { transform: translate(-2%, 3%) scale(0.95); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        @keyframes aurora-emerald {
          0% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(-5%, 5%) scale(1.02); }
          66% { transform: translate(4%, -2%) scale(1.08); }
          100% { transform: translate(0%, 0%) scale(1); }
        }

        /* Diagnostic Scan Line: Sweeps once every 12 seconds */
        @keyframes scan-sweep {
          0% { transform: translateY(-10vh); opacity: 0; }
          5% { opacity: 1; }
          20% { transform: translateY(110vh); opacity: 1; }
          21%, 100% { transform: translateY(110vh); opacity: 0; }
        }

        /* Sporadic Electrical Pulses: Randomly flashing traces */
        @keyframes random-pulse {
          0%, 80% { opacity: 0; }
          85% { opacity: 0.6; }
          90% { opacity: 0; }
          95% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        .animate-aurora-cyan { animation: aurora-cyan 45s ease-in-out infinite; }
        .animate-aurora-emerald { animation: aurora-emerald 60s ease-in-out infinite; }
        .animate-scan-line { animation: scan-sweep 12s linear infinite; }
        
        .pulse-1 { animation: random-pulse 8s infinite; }
        .pulse-2 { animation: random-pulse 14s infinite 3s; }
        .pulse-3 { animation: random-pulse 11s infinite 7s; }
      `}</style>

      {/* LAYER 1: Deep Navy/Slate Gradient (#020617 -> #071425) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#071425_0%,_#020617_100%)]" />

      {/* LAYER 2: Massive, Organic Aurora Lights */}
      {!reduceMotion && (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-[50%] bg-[#0ea5e9]/10 blur-[250px] animate-aurora-cyan mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-[50%] bg-[#10b981]/10 blur-[250px] animate-aurora-emerald mix-blend-screen" />
        </>
      )}

      {/* LAYER 3: Real PCB Texture (4% Opacity) */}
      {/* 
        This references the vectorized motherboard pattern in your public folder.
        It repeats seamlessly and establishes the raw engineering aesthetic.
      */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: "url('/pcb-pattern.svg')",
          backgroundSize: "600px",
          backgroundRepeat: "repeat"
        }}
      />

      {/* LAYER 6: Occasional Electrical Pulses (Flashes of current across the board) */}
      {!reduceMotion && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute top-[30%] left-[20%] w-[200px] h-[1px] bg-cyan-400 blur-[1px] pulse-1 transform rotate-45" />
          <div className="absolute top-[60%] right-[30%] w-[150px] h-[1px] bg-emerald-400 blur-[1px] pulse-2 transform -rotate-45" />
          <div className="absolute bottom-[20%] left-[40%] w-[300px] h-[1px] bg-cyan-300 blur-[1px] pulse-3" />
        </div>
      )}

      {/* LAYER 4: Traveling Diagnostic Scan Line */}
      {!reduceMotion && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500/40 shadow-[0_0_15px_rgba(14,165,233,0.5)] animate-scan-line z-0" />
      )}

      {/* LAYER 5: Tiny Glowing Solder Particles (Sparse, 12 total) */}
      {mountParticles && !reduceMotion && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 z-0"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 30,
            particles: {
              color: { value: ["#0ea5e9", "#10b981", "#ffffff"] },
              move: {
                direction: "none",
                enable: true,
                random: true,
                speed: 0.1, // Extremely slow drift
                straight: false,
              },
              number: {
                value: 12, // Restrained, premium count
                density: { enable: false }
              },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: { enable: true, speed: 0.2, minimumValue: 0.1 }
              },
              shape: { type: "circle" },
              size: { value: { min: 0.5, max: 1.5 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* LAYER 7: Hero Spotlight (Directs focus to the typography) */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0ea5e9]/5 blur-[150px] rounded-[50%]" />

      {/* LAYER 8: Strong Vignette (Darkens edges and footer) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, transparent 20%, #020617 90%)'
        }}
      />
    </div>
  );
};
