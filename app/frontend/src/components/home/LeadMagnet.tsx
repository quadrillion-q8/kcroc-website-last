// File: app/frontend/src/components/home/LeadMagnet.tsx
import React, { useMemo, useState } from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import {
  MessageCircle,
  CheckCircle2,
  Laptop,
  Apple,
  Gamepad2,
  Monitor,
  Power,
  Thermometer,
  Droplets,
  MonitorOff,
  BatteryCharging,
  Keyboard,
  Wrench,
  ArrowRight,
} from 'lucide-react';

type Option = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const DEVICES: Option[] = [
  { id: 'laptop', label: 'Windows Laptop', Icon: Laptop },
  { id: 'macbook', label: 'MacBook', Icon: Apple },
  { id: 'gaming', label: 'Gaming PC / Laptop', Icon: Gamepad2 },
  { id: 'desktop', label: 'Desktop / All-in-One', Icon: Monitor },
];

const ISSUES: (Option & { serviceIds: string[] })[] = [
  { id: 'no-power', label: 'No Power', Icon: Power, serviceIds: ['srv-motherboard', 'srv-laptop'] },
  { id: 'overheating', label: 'Overheating', Icon: Thermometer, serviceIds: ['srv-gaming-laptop-cleaning', 'srv-gaming', 'srv-laptop'] },
  { id: 'liquid', label: 'Water / Liquid Spill', Icon: Droplets, serviceIds: ['srv-liquid-damage', 'srv-motherboard'] },
  { id: 'screen', label: 'Broken / Black Screen', Icon: MonitorOff, serviceIds: ['srv-screen', 'srv-laptop'] },
  { id: 'charging', label: 'Not Charging', Icon: BatteryCharging, serviceIds: ['srv-charging-port', 'srv-battery', 'srv-motherboard'] },
  { id: 'keyboard', label: 'Keyboard Problem', Icon: Keyboard, serviceIds: ['srv-keyboard', 'srv-laptop'] },
  { id: 'other', label: 'Other Problem', Icon: Wrench, serviceIds: ['srv-laptop'] },
];

export const LeadMagnet = () => {
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');
  const business = KCROC_GRAPH.business;
  const whatsappNumber = business!.telephone;
  const { trackConversion } = useAnalytics();

  const selectedDevice = DEVICES.find((item) => item.id === device);
  const selectedIssue = ISSUES.find((item) => item.id === issue);

  const estimate = useMemo(() => {
    if (!selectedIssue) return null;

    const starts = selectedIssue.serviceIds
      .map((id) => KCROC_GRAPH.services.find((service) => service.id === id)?.pricing?.startingFrom)
      .filter((value): value is number => typeof value === 'number');

    if (starts.length === 0) return null;
    return Math.min(...starts);
  }, [selectedIssue]);

  const waLink = selectedDevice && selectedIssue
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hi KCROC, I need help with my ${selectedDevice.label}. Issue: ${selectedIssue.label}. Please advise on the diagnosis and estimated repair cost.`
      )}`
    : `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi KCROC, I need help with a computer or laptop repair. Please advise how to start.')}`;

  const selectClass = (active: boolean) =>
    `group relative rounded-2xl border p-3.5 sm:p-4 text-left transition-all min-h-[92px] sm:min-h-[104px] ${
      active
        ? 'border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]'
        : 'border-slate-800 bg-slate-950/30 hover:border-slate-600 hover:bg-slate-900/60'
    }`;

  return (
    <section className="w-full py-12 sm:py-24 px-4 sm:px-6 bg-brand-dark/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 sm:p-8 lg:p-12">
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Quick Repair Check
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">2 steps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 leading-tight">
              Tell us what is wrong with your device
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Choose your device and symptom. We will prepare a WhatsApp message with the details, and show the lowest applicable starting rate from KCROC's current service pricing.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-200">1. Select device</h3>
                  {selectedDevice && <span className="text-xs text-cyan-400 font-semibold">{selectedDevice.label}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {DEVICES.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={device === id}
                      onClick={() => setDevice(id)}
                      className={selectClass(device === id)}
                    >
                      <Icon className={`w-5 h-5 mb-3 ${device === id ? 'text-cyan-300' : 'text-slate-500 group-hover:text-cyan-400'}`} aria-hidden="true" />
                      <span className="block text-xs sm:text-sm font-bold text-white leading-snug">{label}</span>
                      {device === id && <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-emerald-400" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-200">2. Select issue</h3>
                  {selectedIssue && <span className="text-xs text-cyan-400 font-semibold">{selectedIssue.label}</span>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {ISSUES.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={issue === id}
                      onClick={() => setIssue(id)}
                      className={selectClass(issue === id)}
                    >
                      <Icon className={`w-5 h-5 mb-2.5 ${issue === id ? 'text-cyan-300' : 'text-slate-500 group-hover:text-cyan-400'}`} aria-hidden="true" />
                      <span className="block text-xs font-bold text-white leading-snug">{label}</span>
                      {issue === id && <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-emerald-400" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDevice && selectedIssue && (
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-400">Your starting estimate</p>
                      <p className="mt-1 text-xl sm:text-2xl font-black text-white">
                        {estimate != null ? `From ${estimate} KWD` : 'Diagnosis required'}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Final price depends on the confirmed fault, model and parts.
                      </p>
                    </div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackConversion('whatsapp_click', { cta_name: 'lead_magnet_visual_selector', button_position: 'lead_magnet' })}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-slate-950 hover:brightness-95 transition-all min-h-[48px] sm:min-w-[230px]"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      Send Diagnosis to WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {(!selectedDevice || !selectedIssue) && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ArrowRight className="w-4 h-4 text-cyan-500" aria-hidden="true" />
                  Choose both options to reveal the WhatsApp diagnosis action.
                </div>
              )}
            </div>
          </div>

          <div className="relative min-h-[220px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            <picture>
              <source media="(max-width: 640px)" srcSet="/images/laptop-repair-shop-workbench-laptops.webp" />
              <img
                src="/images/laptop-repair-shop-workbench-laptops.webp"
                alt="KCROC laptop repair workbench used for diagnostics and hardware restoration"
                width="960"
                height="524"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/20 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-end">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-brand-dark/80 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-500/30 shadow-lg">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Free pickup · Diagnosis first
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
