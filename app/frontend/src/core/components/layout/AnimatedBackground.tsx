// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React, { useState, useEffect } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // Authentic 45-degree routed PCB traces
  const traces = [
    "M -50 300 H 300 L 350 350 V 600 L 400 650 H 900",
    "M 2000 700 H 1500 L 1400 600 V 200 L 1300 100 H 900",
    "M 600 1200 V 900 L 700 800 V 500 L 650 450 H 300",
    "M 1200 -50 V 300 L 1300 400 H 1600 L 1650 450 V 900"
  ];

  // Solder pads/vias at the corners and endpoints
  const vias = [
    { cx: 300, cy: 300 }, { cx: 350, cy: 350 }, { cx: 400, cy: 650 },
    { cx: 1500, cy: 700 }, { cx: 1400, cy: 600 }, { cx: 1300, cy: 100 },
    { cx: 600, cy: 900 }, { cx: 700, cy: 800 }, { cx: 650, cy: 450 },
    { cx: 1200, cy: 300 }, { cx: 1300, cy: 400 }, { cx: 1650, cy: 450 }
  ];

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      
      <style>{`
        /* Energy Packets traveling along the SVG paths */
        @keyframes flow-energy {
          from { stroke-dashoffset: 4000; }
          to { stroke-dashoffset: 0; }
        }
        /* Soft glowing pulse for the solder pads */
        @keyframes pulse-node {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        .trace-base {
          stroke: rgba(148, 163, 184, 0.08); /* Faint slate-400 at 8% */
          stroke-width: 1.5;
          fill: none;
        }
        
        .trace-energy {
          stroke: #0ea5e9; /* KCROC Cyan */
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 120 3880; /* 120px energy packet, huge gap so only one appears at a time */
        }

        .energy-1 { animation: flow-energy 8s linear infinite; }
        .energy-2 { animation: flow-energy 12s linear infinite 3s; }
        .energy-3 { animation: flow-energy 10s linear infinite 1.5s; }
        .energy-4 { animation: flow-energy 14s linear infinite 5s; }

        .node-via {
          fill: #10b981; /* KCROC Emerald */
          transform-origin: center;
          transform-box: fill-box;
        }
        
        .node-pulse-slow { animation: pulse-node 4s ease-in-out infinite; }
        .node-pulse-fast { animation: pulse-node 2.5s ease-in-out infinite 1s; }
      `}</style>

      {/* LAYER 1: Deep slate gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

      {/* LAYER 5: Hero Spotlight (Soft cyan glow behind text) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-[50%]" />

      {/* LAYERS 2, 3, & 4: Custom Asymmetrical Vector Motherboard */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-80" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Static Faint Traces */}
        {traces.map((d, i) => (
          <path key={`base-${i}`} d={d} className="trace-base" />
        ))}

        {/* Layer 4: Cyan Energy Packets (Only animate if motion is allowed) */}
        {!reduceMotion && traces.map((d, i) => (
          <path 
            key={`energy-${i}`} 
            d={d} 
            className={`trace-energy energy-${i + 1}`} 
          />
        ))}

        {/* Layer 3: Glowing Emerald Solder Pads / Vias */}
        {vias.map((via, i) => (
          <circle 
            key={`via-${i}`} 
            cx={via.cx} 
            cy={via.cy} 
            r="2.5" 
            className={`node-via ${i % 2 === 0 ? 'node-pulse-slow' : 'node-pulse-fast'}`} 
            style={{ animationPlayState: reduceMotion ? 'paused' : 'running' }}
          />
        ))}
      </svg>

      {/* Vignette to focus the eye on the center content */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.8) 100%)'
        }}
      />
    </div>
  );
};
