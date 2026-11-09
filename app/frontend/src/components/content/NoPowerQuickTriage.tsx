import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

type SymptomId =
  | 'no-response'
  | 'charge-light'
  | 'adapter-protection'
  | 'black-screen'
  | 'stop-power';

interface SymptomOption {
  id: SymptomId;
  label: string;
  detail: string;
  guidance: string;
  evidence: string[];
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'no-response',
    label: 'No lights, no fan and no response',
    detail: 'The laptop appears completely dead, even with the charger connected.',
    guidance: 'Check the wall outlet and the correct, undamaged charger once. If there is still no response, the input path, battery or motherboard needs measured diagnosis.',
    evidence: ['Charging LED behaviour', 'Adapter voltage and wattage label', 'Whether the laptop responds with a known-good compatible adapter']
  },
  {
    id: 'charge-light',
    label: 'Charging light is on, but Power does nothing',
    detail: 'The charger indicator responds, but the laptop will not start.',
    guidance: 'Record the exact model and any LED pattern. A power-button, embedded-controller, battery or platform wake-up fault may be involved; the indicator alone does not identify which one.',
    evidence: ['Power and charging LED patterns', 'Keyboard backlight or fan response', 'Any recent firmware update, reset or battery event']
  },
  {
    id: 'adapter-protection',
    label: 'Charger light turns off when connected',
    detail: 'The adapter indicator goes dark or its output appears to stop when plugged into the laptop.',
    guidance: 'Disconnect the charger and do not keep reconnecting it. The adapter may be entering protection, or the adapter, cable or laptop input may be faulty.',
    evidence: ['Whether the adapter LED is stable before connection', 'Any unusual heat, smell or visible connector damage', 'Whether the behaviour started after a spill or impact']
  },
  {
    id: 'black-screen',
    label: 'Lights or fans work, but the screen stays black',
    detail: 'The laptop shows startup activity but does not display an image.',
    guidance: 'This is not necessarily a total no-power fault. Record the power and keyboard indicators; try a known-good external display only if the laptop and port support video output.',
    evidence: ['Fan and keyboard activity', 'Caps Lock or diagnostic LED response', 'Whether an external display is supported and shows an image']
  },
  {
    id: 'stop-power',
    label: 'Liquid, swollen battery, burning smell or sparks',
    detail: 'There may be a safety hazard or active electrical damage.',
    guidance: 'Disconnect AC power if it is safe to do so. Do not press Power, reconnect the charger, charge the device, bend or press a swollen battery, or attempt a reset. Follow the manufacturer safety guidance and arrange qualified inspection.',
    evidence: ['What happened immediately before the symptom', 'Visible liquid, case deformation or battery swelling', 'Any smell, smoke, sparks or abnormal heat']
  }
];

export default function NoPowerQuickTriage() {
  const [selectedId, setSelectedId] = useState<SymptomId>('no-response');
  const [deviceModel, setDeviceModel] = useState('');
  const [observations, setObservations] = useState('');

  const selected = SYMPTOMS.find((item) => item.id === selectedId) ?? SYMPTOMS[0];
  const isSafetyStop = selected.id === 'stop-power';

  return (
    <section
      className="my-12 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 text-slate-100 shadow-xl"
      aria-labelledby="no-power-triage-title"
    >
      <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
          <Zap className="h-4 w-4" aria-hidden="true" />
          Diagnostic worksheet
        </div>
        <h3 id="no-power-triage-title" className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
          No-Power Symptom Triage
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
          Classify what the laptop actually does before repeating resets, replacing parts or assuming the motherboard has failed.
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-7">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4" role="note">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-amber-100">
              <strong>Stop applying power</strong> if there is liquid exposure, a swollen battery, a burning smell or visible sparks. Disconnect AC if safe, do not reconnect the charger or press Power, and follow the manufacturer's safety guidance.
            </p>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-bold text-white">
            What happens when you connect the charger and press Power?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {SYMPTOMS.map((item) => {
              const active = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(item.id)}
                  className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    active
                      ? 'border-cyan-400 bg-cyan-400/10 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-400">{item.detail}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className={`rounded-xl border p-4 ${isSafetyStop ? 'border-amber-500/40 bg-amber-500/10' : 'border-cyan-500/25 bg-slate-900/80'}`} role={isSafetyStop ? 'alert' : 'status'} aria-live="polite">
          <div className="flex items-start gap-3">
            {isSafetyStop
              ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
              : <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />}
            <div>
              <p className={`text-sm font-bold ${isSafetyStop ? 'text-amber-200' : 'text-cyan-200'}`}>
                {isSafetyStop ? 'Stop applying power' : 'Suggested next step'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{selected.guidance}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-200">
            Laptop brand and exact model
            <input
              type="text"
              value={deviceModel}
              onChange={(event) => setDeviceModel(event.target.value)}
              placeholder="e.g. Dell Latitude 5440, HP 15s, MacBook Air M2"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              autoComplete="off"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-200">
            Other observations (optional)
            <textarea
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
              placeholder="Record blink codes, beep patterns, recent updates or what changed before the failure."
              rows={3}
              className="mt-2 w-full resize-y rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </label>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm font-bold text-white">Evidence worth recording for this symptom</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {selected.evidence.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                <span className="text-cyan-300" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-relaxed text-slate-500">
            Device: {deviceModel.trim() || 'Model not recorded'} · Observation: {observations.trim() || 'No additional note'}
          </p>
        </div>

        <p className="text-xs leading-relaxed text-slate-500">
          Selecting a symptom does not diagnose the fault. Use the manufacturer procedure for the exact model, and do not continue testing a device that shows signs of liquid, battery or electrical damage.
        </p>
      </div>
    </section>
  );
}
