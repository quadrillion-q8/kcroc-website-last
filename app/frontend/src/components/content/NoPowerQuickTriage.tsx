import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MessageCircle, Phone, ShieldCheck, Truck, Zap } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

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
  message: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'no-response',
    label: 'No lights, no fan and no response',
    detail: 'The laptop appears completely dead, even with the charger connected.',
    guidance: 'Check the wall socket and the correct, undamaged charger once. If there is still no response, the input path, battery or motherboard needs measured diagnosis.',
    message: 'My laptop has no lights, no fan and no response, even when connected to its charger.'
  },
  {
    id: 'charge-light',
    label: 'Charging light is on, but Power does nothing',
    detail: 'The charger indicator responds, but the laptop will not start.',
    guidance: 'Record the exact model and any LED pattern. A power-button, embedded-controller, battery or platform wake-up fault may be involved; the indicator alone does not identify which one.',
    message: 'My laptop charging light is on, but pressing Power does nothing.'
  },
  {
    id: 'adapter-protection',
    label: 'Charger light turns off when connected',
    detail: 'The adapter indicator goes dark or its output appears to stop when plugged into the laptop.',
    guidance: 'Disconnect the charger and do not keep reconnecting it. The adapter may be entering protection, or the adapter/lead or laptop input may be faulty.',
    message: 'My charger indicator turns off or the adapter stops outputting when connected to the laptop.'
  },
  {
    id: 'black-screen',
    label: 'Lights or fans work, but the screen stays black',
    detail: 'The laptop shows startup activity but does not display an image.',
    guidance: 'This is not necessarily a total no-power fault. Record the power/keyboard indicators and try a known-good external display only if the laptop and port support video output.',
    message: 'My laptop lights or fans turn on, but the internal screen stays black.'
  },
  {
    id: 'stop-power',
    label: 'Liquid, swollen battery, burning smell or sparks',
    detail: 'There may be a safety hazard or active electrical damage.',
    guidance: 'Disconnect AC power if it is safe to do so. Do not press Power, reconnect the charger, charge the device, bend or press a swollen battery, or attempt a reset. Arrange professional inspection.',
    message: 'My laptop may have liquid damage, a swollen battery, a burning smell or sparking. I have stopped applying power and need safe inspection.'
  }
];

export default function NoPowerQuickTriage() {
  const [selectedId, setSelectedId] = useState<SymptomId>('no-response');
  const [brandModel, setBrandModel] = useState('');
  const [area, setArea] = useState('');

  const business = KCROC_GRAPH.business!;
  const selected = SYMPTOMS.find((item) => item.id === selectedId) ?? SYMPTOMS[0];
  const isSafetyStop = selected.id === 'stop-power';

  const whatsappHref = useMemo(() => {
    const message = [
      'Hi KCROC, I need help with a laptop no-power or startup problem.',
      `Symptom: ${selected.message}`,
      brandModel.trim() ? `Brand and exact model: ${brandModel.trim()}` : 'Brand and exact model: I will confirm.',
      area.trim() ? `Area in Kuwait: ${area.trim()}` : 'Area in Kuwait: I will confirm.',
      'Please advise on safe next steps and free pickup/diagnosis. Please confirm any paid work and its quote before proceeding.'
    ].join('\n');
    return buildWhatsAppLink(message);
  }, [selected, brandModel, area]);

  return (
    <section
      className="my-12 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 text-slate-100 shadow-xl"
      aria-labelledby="no-power-triage-title"
    >
      <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
          <Zap className="h-4 w-4" aria-hidden="true" />
          KCROC no-power diagnostic desk · Hawalli lab
        </div>
        <h3 id="no-power-triage-title" className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
          Still dead? Book a free component-level no-power diagnosis
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
          Tell us what the laptop is doing and share its exact model. We will help identify the appropriate diagnostic route before any paid repair is approved.
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-7">
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

        <div
          className={`rounded-xl border p-4 ${
            isSafetyStop
              ? 'border-amber-500/40 bg-amber-500/10'
              : 'border-cyan-500/25 bg-slate-900/80'
          }`}
          role={isSafetyStop ? 'alert' : 'status'}
          aria-live="polite"
        >
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
              value={brandModel}
              onChange={(event) => setBrandModel(event.target.value)}
              placeholder="e.g. Dell Latitude 5440, HP 15s, MacBook Air M2"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              autoComplete="off"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-200">
            Your area in Kuwait
            <input
              type="text"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              placeholder="e.g. Salmiya, Hawalli, Farwaniya"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              autoComplete="address-level2"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => undefined}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Send symptoms on WhatsApp
          </a>
          <Link
            to="/book"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Truck className="h-4 w-4" aria-hidden="true" />
            Book free pickup
          </Link>
          <a
            href={`tel:+${business.telephone}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call the lab
          </a>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 pt-4 text-xs font-semibold text-slate-400">
          <span>Free pickup across Kuwait</span>
          <span>No Fix, No Fee</span>
          <span>30-day warranty on completed repairs</span>
          <span>Quote before paid work</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          {isSafetyStop
            ? 'Do not use this form as a reason to reconnect a damaged or unsafe device. Keep it disconnected and describe the hazard in your message.'
            : 'Selecting a symptom does not diagnose the fault. Final findings and any repair recommendation require inspection.'}
        </p>
      </div>
    </section>
  );
}
