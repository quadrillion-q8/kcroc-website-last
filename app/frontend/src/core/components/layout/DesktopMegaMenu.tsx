// File: app/frontend/src/core/components/layout/DesktopMegaMenu.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const handleMegaEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={handleMegaEnter}
      onMouseLeave={handleMegaLeave}
    >
      <button
        aria-expanded={megaOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          megaOpen || location.pathname.startsWith('/services')
            ? 'text-cyan-400 bg-cyan-500/10'
            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        {label}
        <ChevronDown 
          size={15} 
          className={`transition-transform duration-200 ${megaOpen ? 'rotate-180 text-cyan-400' : ''}`} 
          aria-hidden="true" 
        />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[680px] transition-all duration-200 ${
          megaOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          
          <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-800/60">
            {featured.map(service => {
              const Icon = getIcon(service.icon ?? 'laptop');
              return (
                <Link
                  key={service.slug}
                  to={`/${service.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="group flex flex-col gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-1">
                      {service.title}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <span className="text-xs text-cyan-500 font-bold flex items-center gap-1 mt-auto">
                    {service.callToAction} <ArrowRight size={11} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {standardList.map(service => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="text-xs text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
            <Link
              to="/services"
              onClick={() => setMegaOpen(false)}
              className="shrink-0 text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              All services <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
