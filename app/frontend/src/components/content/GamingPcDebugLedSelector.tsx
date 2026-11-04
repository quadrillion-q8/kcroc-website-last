import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

type DebugLed = 'CPU' | 'DRAM' | 'VGA' | 'BOOT' | 'NONE';

const LED_OPTIONS: Array<{ id: DebugLed; label: string; description: string }> = [
  { id: 'CPU', label: 'CPU LED', description: 'CPU initialization' },
  { id: 'DRAM', label: 'DRAM LED', description: 'Memory detection or training' },
  { id: 'VGA', label: 'VGA LED', description: 'Graphics initialization' },
  { id: 'BOOT', label: 'BOOT LED', description: 'Boot-device stage' },
  { id: 'NONE', label: 'No debug light', description: 'No indicator remains lit' },
];

const GUIDANCE: Record<DebugLed, { title: string; summary: string; checks: string[] }> = {
  CPU: {
    title: 'CPU indicator remains lit',
    summary: 'The board has not completed its CPU initialization stage. This is a clue, not proof that the processor itself has failed.',
    checks: [
      'Check the motherboard manual and note whether the fault began after a CPU, cooler or BIOS change.',
      'With the PC shut down and AC disconnected, verify that the EPS/CPU power cable is fully seated. Use the cable marked CPU/EPS, never a PCIe GPU cable.',
      'If it remains stuck, have BIOS CPU support, socket condition, CPU power delivery and the board checked. Do not remove the processor unless you are qualified to do so.',
    ],
  },
  DRAM: {
    title: 'DRAM indicator remains lit',
    summary: 'Memory detection, compatibility or training may not have completed. Recent RAM, BIOS or XMP/EXPO changes are important clues.',
    checks: [
      'After a first boot, BIOS update, CMOS reset or memory-profile change, allow the board’s documented training time to finish before interrupting it.',
      'If it still fails, power off and unplug the PC. Test one compatible module in the slot specified by the exact motherboard manual; A2 is common on four-slot boards but is not universal.',
      'If an XMP/EXPO change preceded the fault, use only the manufacturer’s documented Clear CMOS procedure and retry at default memory settings.',
    ],
  },
  VGA: {
    title: 'VGA indicator remains lit',
    summary: 'The board has not completed graphics initialization. The card, slot, power connection, CPU graphics support or firmware may be involved.',
    checks: [
      'With the PC shut down and unplugged, check that the monitor cable goes directly to the intended graphics-card output and test one known-good cable and display.',
      'Visually inspect the GPU power connector. A 12VHPWR/12V-2x6 plug must be fully inserted and latched; stop using the PC if the plug or socket is melted or discoloured.',
      'If you are experienced with PC hardware, check GPU seating only with AC disconnected. An integrated-graphics test works only when the exact CPU supports it.',
    ],
  },
  BOOT: {
    title: 'BOOT indicator remains lit',
    summary: 'On many boards this points to the boot-device or operating-system stage. It does not mean Windows has definitely loaded, and it does not rule out a separate display-path fault.',
    checks: [
      'Check the manual for the exact meaning of the board’s BOOT indicator; manufacturer wording differs.',
      'If you can enter BIOS, see whether the SSD is detected and whether the expected boot entry is selected. Do not format or reinstall Windows before considering your data.',
      'If the screen is still black, continue checking the monitor, cable and GPU output as well. A BOOT light alone cannot prove the display path is working.',
    ],
  },
  NONE: {
    title: 'No debug indicator remains lit',
    summary: 'That is useful information, but it does not prove that POST completed or that the monitor received a signal.',
    checks: [
      'Confirm monitor power and input, then test one direct HDMI or DisplayPort cable from the graphics card.',
      'If the PC recently had a BIOS or memory-setting change, allow the manufacturer’s memory-training process to finish.',
      'Record any beep pattern, POST code, restart loop or change in keyboard/mouse behavior. Power off and unplug before inspecting internal parts.',
    ],
  },
};

export default function GamingPcDebugLedSelector() {
  const [selected, setSelected] = useState<DebugLed | null>(null);
  const result = selected ? GUIDANCE[selected] : null;
  const message = selected
    ? `Hi Imran, my gaming PC powers on but shows no display. ${selected === 'NONE' ? 'No CPU, DRAM, VGA or BOOT debug light remains lit.' : `The ${selected} debug LED remains lit.`} I would like to arrange free pickup and a diagnostic assessment.`
    : '';
  const whatsappUrl = selected ? buildWhatsAppLink(message) : '';

  return (
    <section
      className="my-10 rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-5 sm:p-7"
      aria-labelledby="gaming-pc-debug-led-title"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Interactive quick check</p>
      <h3 id="gaming-pc-debug-led-title" className="mt-2 text-xl sm:text-2xl font-black text-white">
        Which motherboard debug light stays on?
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Select the label printed beside the indicator—not just its color. The meanings below are typical; your motherboard manual is authoritative.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5" role="group" aria-label="Select the motherboard diagnostic indicator">
        {LED_OPTIONS.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(option.id)}
              className={`min-h-16 rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${active ? 'border-cyan-300 bg-cyan-500/15 text-white' : 'border-slate-700 bg-slate-950/50 text-slate-200 hover:border-slate-500'}`}
            >
              <span className="block text-sm font-black">{option.label}</span>
              <span className="mt-1 block text-xs leading-4 text-slate-400">{option.description}</span>
            </button>
          );
        })}
      </div>

      {result ? (
        <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-5" aria-live="polite">
          <h4 className="text-lg font-bold text-white">{result.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{result.summary}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
            {result.checks.map((check, index) => <li key={index}>{check}</li>)}
          </ol>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp this result to KCROC
          </a>
        </div>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
          Choose an indicator to see three safe checks and prepare a WhatsApp message with that symptom.
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Safety: switch the PC off and disconnect AC power before touching internal components. If you see melted connectors, smell burning or notice liquid leakage, stop testing and request professional inspection.
      </p>
    </section>
  );
}
