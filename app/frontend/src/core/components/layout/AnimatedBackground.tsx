// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export const AnimatedBackground: React.FC = () => {
  const [mountParticles, setMountParticles] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    // Accessibility check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    // Lazy load particles for LCP performance
    const timer = setTimeout(() => setMountParticles(true), 1200);

    // Lightweight Parallax Engine
    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Parallax Depth Multipliers
  const parallax = {
    board: { transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)` },
    particles: { transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` },
    spotlight: { transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0) translateX(-50%)` },
  };

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      
      <style>{`
        /* 1. Breathing Board: Simulates a living, powered-on state */
        @keyframes board-breath {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.12; }
        }
        .animate-breath { animation: board-breath 20s ease-in-out infinite; }

        /* 2. Diagnostic Scanner: Sweeps down the board occasionally */
        @keyframes scan-beam {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          40% { transform: translateY(100vh); opacity: 1; }
          41%, 100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scanner { animation: scan-beam 18s linear infinite; }

        /* 3. Energy Packets: Moving through specific traces */
        @keyframes flow-energy {
          from { stroke-dashoffset: 4000; }
          to { stroke-dashoffset: 0; }
        }
        .trace-energy {
          stroke: #0ea5e9;
          stroke-width: 1.5;
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 80 3920; /* Short packet, massive gap */
        }
        .energy-fast { animation: flow-energy 6s linear infinite; }
        .energy-med { animation: flow-energy 10s linear infinite 2s; }
        .energy-slow { animation: flow-energy 14s linear infinite 5s; }

        /* 4. LED Indicators: Tiny blinking status lights */
        @keyframes blink-led {
          0%, 96% { opacity: 0.1; }
          98% { opacity: 1; box-shadow: 0 0 10px currentColor; }
          100% { opacity: 0.1; }
        }
        .animate-led-1 { animation: blink-led 4s infinite; }
        .animate-led-2 { animation: blink-led 7s infinite 2s; }

        /* General SVG Styles */
        .chip-outline { stroke: rgba(148, 163, 184, 0.4); stroke-width: 1; fill: none; }
        .trace-static { stroke: rgba(148, 163, 184, 0.6); stroke-width: 1; fill: none; }
        .trace-bus { stroke: rgba(148, 163, 184, 0.3); stroke-width: 0.5; fill: none; }
      `}</style>

      {/* LAYER 1: Deep slate gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

      {/* LAYER 2 & 3: Huge Custom SVG Motherboard & Components (Parallax Layer 1) */}
      <div className="absolute inset-[-5%]" style={reduceMotion ? {} : parallax.board}>
        <svg 
          className="w-full h-full animate-breath" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS: Reusable patterns like CPU pins */}
          <defs>
            <pattern id="cpu-pins" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="rgba(148, 163, 184, 0.3)" />
            </pattern>
          </defs>

          {/* === LAYER 3: HARDWARE LANDMARKS === */}
          <g opacity="0.4">
            {/* Right Side: Heavy Density (CPU & PMIC) */}
            <rect x="1400" y="250" width="320" height="320" className="chip-outline" rx="8" />
            <rect x="1420" y="270" width="280" height="280" className="chip-outline" fill="url(#cpu-pins)" />
            {/* MOSFET Array near CPU */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={`mosfet-${i}`} x="1350" y={280 + (i * 40)} width="20" height="30" className="chip-outline" rx="2" />
            ))}
            {/* PMIC Area */}
            <rect x="1500" y="700" width="80" height="80" className="chip-outline" rx="4" />
            <rect x="1620" y="720" width="40" height="40" className="chip-outline" rx="2" />

            {/* Left Side: Structural (RAM Slots) */}
            {[0,1,2,3].map(i => (
              <rect key={`ram-${i}`} x={120 + (i * 40)} y="300" width="18" height="450" className="chip-outline" rx="2" />
            ))}
            {/* Connectors / ICs on left */}
            <rect x="60" y="400" width="30" height="150" className="chip-outline" rx="2" />
            <rect x="250" y="850" width="120" height="120" className="chip-outline" rx="4" />
          </g>

          {/* === LAYER 2: TRACES & VIAS === */}
          {/* Dense right-side parallel bus (connecting CPU downwards) */}
          {[0,1,2,3,4,5,6].map(i => (
            <path key={`bus-r-${i}`} d={`M ${1450 + (i * 15)} 570 V 750 L ${1300 + (i * 15)} 900 V 1100`} className="trace-bus" />
          ))}
          {/* Dense left-side memory bus (RAM to chipset) */}
          {[0,1,2,3,4,5,6].map(i => (
            <path key={`bus-l-${i}`} d={`M ${280} ${350 + (i * 12)} H 350 L 450 ${450 + (i * 12)} H 600`} className="trace-bus" />
          ))}

          {/* Prominent scattered traces (Static) */}
          <path d="M -50 200 H 150 L 250 300 V 800" className="trace-static" />
          <path d="M 600 950 H 400 L 300 850 V 800" className="trace-static" />
          <path d="M 1300 -50 V 150 L 1200 250 H 900" className="trace-static" />
          <path d="M 1800 200 H 1750 L 1600 350 V 500" className="trace-static" />
          <path d="M 1950 800 H 1700 L 1600 700 V 600" className="trace-static" />

          {/* Varied Vias & Test Pads */}
          {/* 1px tiny vias */}
          <circle cx="250" cy="300" r="1.5" className="chip-outline" />
          <circle cx="1200" cy="250" r="1.5" className="chip-outline" />
          {/* 3px standard pads */}
          <circle cx="600" cy="950" r="3" className="chip-outline" />
          <circle cx="1600" cy="700" r="3" className="chip-outline" />
          {/* 6px mounting holes with rings */}
          <circle cx="80" cy="80" r="8" className="chip-outline" strokeDasharray="2 2" />
          <circle cx="80" cy="80" r="4" className="chip-outline" />
          <circle cx="1840" cy="1000" r="8" className="chip-outline" strokeDasharray="2 2" />
          <circle cx="1840" cy="1000" r="4" className="chip-outline" />

          {/* === LAYER 4: ELECTRICAL PULSES (Only 4 paths, Selective Glow) === */}
          {!reduceMotion && (
            <g>
              <path d="M -50 200 H 150 L 250 300 V 800" className="trace-energy energy-fast" />
              <path d="M 1300 -50 V 150 L 1200 250 H 900" className="trace-energy energy-med" />
              <path d="M 1950 800 H 1700 L 1600 700 V 600" className="trace-energy energy-slow" />
              <path d="M 280 386 H 350 L 450 486 H 600" className="trace-energy energy-fast" />
            </g>
          )}
        </svg>
      </div>

      {/* LAYER 5: Diagnostic Scan Beam */}
      {!reduceMotion && (
        <div className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none animate-scanner z-0">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-400/20 border-b border-cyan-400/30" />
        </div>
      )}

      {/* LAYER 6: Tiny LED Indicators */}
      {!reduceMotion && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[280px] left-[1320px] w-1.5 h-1.5 rounded-full bg-emerald-500 text-emerald-500 animate-led-1" />
          <div className="absolute top-[710px] left-[1550px] w-1.5 h-1.5 rounded-full bg-cyan-500 text-cyan-500 animate-led-2" />
          <div className="absolute top-[420px] left-[70px] w-1.5 h-1.5 rounded-full bg-emerald-500 text-emerald-500 animate-led-1" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* LAYER 7: Tiny Drifting Dust (Parallax Layer 2 - Medium) */}
      {mountParticles && !reduceMotion && (
        <div className="absolute inset-[-5%]" style={parallax.particles}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            className="w-full h-full"
            options={{
              fullScreen: { enable: false },
              fpsLimit: 30,
              particles: {
                color: { value: ["#0ea5e9", "#10b981", "#ffffff"] },
                move: { direction: "none", enable: true, random: true, speed: 0.15, straight: false },
                number: { value: 8 }, // Extremely sparse
                opacity: { value: { min: 0.1, max: 0.4 } },
                shape: { type: "circle" },
                size: { value: { min: 0.5, max: 1.5 } },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}

      {/* LAYER 8: Hero Cinematic Spotlight (Parallax Layer 3 - Fast) */}
      <div 
        className="absolute top-[5%] left-1/2 w-[1200px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-[50%]" 
        style={reduceMotion ? { transform: 'translateX(-50%)' } : parallax.spotlight}
      />

      {/* LAYER 9: Deep Vignette (Locks eye focus to the center content) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2,6,23,0.9) 100%)' }}
      />
    </div>
  );
};
