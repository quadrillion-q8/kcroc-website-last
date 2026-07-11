// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, Laptop, Apple, Gamepad2, 
  Cpu, Monitor, BatteryWarning, HardDrive, ShieldCheck, Wrench
} from 'lucide-react';

const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  apple:     Apple,
  laptop:    Laptop,
  gaming:    Gamepad2,
  cpu:       Cpu,
  monitor:   Monitor,
  battery:   BatteryWarning,
  hardDrive: HardDrive,
  shield:    ShieldCheck,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

interface DesktopMegaMenuProps {
  label: string;
  featured: any[];
  standardList: any[];
}

export const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({ label, featured, standardList }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith('/services');

  // Safety fallbacks in case the graph database returns empty arrays
  const safeFeatured = featured?.length > 0 ? featured : [];
  const safeStandard = standardList?.length > 0 ? standardList : [];

  return (
    <div className="group relative flex items-center h-full">
      
      {/* ── TRIGGER LINK ── */}
      {/* Changed from a <button> to a <Link> so clicking it actually works. */}
      <Link
        to="/services"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          isActive
            ? 'text-cyan-400 bg-cyan-500/10'
            : 'text-slate-300 group-hover:text-white group-hover:bg-slate-800/60'
        }`}
      >
        {label}
        <ChevronDown 
          size={15} 
          className="transition-transform duration-200 group-hover:rotate-180 group-hover:text-cyan-400" 
          aria-hidden="true" 
        />
      </Link>

      {/* ── PURE CSS MEGA MENU PANEL ── */}
      {/* Bypasses React state entirely. Uses group-hover to guarantee visibility. */}
      <div
        className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-[680px] z-[9999] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden cursor-default">
          
          {/* Fallback Message if Graph is Empty */}
          {safeFeatured.length === 0 && safeStandard.length === 0 && (
            <div className="p-8 text-center text-slate-400">Loading services...</div>
          )}

          {/* Featured service cards */}
          {safeFeatured.length > 0 && (
            <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60">
              {safeFeatured.map(service => {
                const Icon = getIcon(service.icon ?? 'laptop');
                return (
                  <Link
                    key={service.slug}
                    to={`/${service.slug}`}
                    className="group/card flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover/card:scale-110 transition-transform" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover/card:text-cyan-400 transition-colors leading-snug mb-1">
                        {service.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <span className="text-xs text-cyan-500 font-bold flex items-center gap-1 mt-auto">
                      {service.callToAction || 'Learn More'} <ArrowRight size={11} aria-hidden="true" className="group-hover/card:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Standard links */}
          {safeStandard.length > 0 && (
            <div className="p-4 flex items-center justify-between gap-4 bg-slate-900/50">
              <div className="flex flex-wrap gap-2">
                {safeStandard.map(service => (
                  <Link
                    key={service.slug}
                    to={`/${service.slug}`}
                    className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
              <Link
                to="/services"
                className="shrink-0 text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
              >
                All services <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
