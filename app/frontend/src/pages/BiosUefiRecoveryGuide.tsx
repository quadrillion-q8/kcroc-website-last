// File: app/frontend/src/pages/BiosUefiRecoveryGuide.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Clock, Cpu,
  Database, FileWarning, GitBranch, HardDrive, HelpCircle, KeyRound,
  Layers, Lock, Microscope, MessageCircle, Phone, ShieldCheck, Siren,
  Volume2, Wrench, Zap, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import { IMAGES } from '../constants/images';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;
const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent('My laptop or PC won\u2019t boot after a BIOS update in Kuwait')}`;

const sectionBadge = 'px-3 sm:px-4 py-1.5 text-[10px] sm:text-sm mb-3 sm:mb-4';

// ── STATIC CONTENT ──

const decisionTree = [
  { icon: Zap, prompt: 'Black screen, fans spinning, no display at all', target: 'No POST / Hardware', anchor: '#post-hardware' },
  { icon: FileWarning, prompt: 'It happened mid-update, or the system died while flashing', target: 'Failed BIOS Update', anchor: '#update-failed' },
  { icon: Siren, prompt: 'Repeated power-on / power-off cycling', target: 'Warning Signs', anchor: '#warning-signs' },
  { icon: Volume2, prompt: 'Beeping, or blinking LEDs instead of a normal boot', target: 'POST & Beep Codes', anchor: '#post-codes' },
  { icon: KeyRound, prompt: 'Windows suddenly asks for a BitLocker recovery key', target: 'Secure Boot, TPM & BitLocker', anchor: '#security-layer' },
  { icon: HelpCircle, prompt: 'Just deciding whether to update BIOS/UEFI at all', target: 'When to Update / When Not To', anchor: '#updates' },
  { icon: Database, prompt: 'I want to prepare the right information before recovery', target: 'Recovery Intake Checklist', anchor: '#recovery-intake' },
];

const recoveryIntake = [
  { 
    title: 'Exact Model & Platform Identifier', 
    text: 'Locate the exact model and sub-model (e.g., HP EliteBook 830 G6, not just "HP EliteBook"). Motherboard revision numbers are even better if the chassis is already open.' 
  },
  { 
    title: 'The Exact Failure Sequence', 
    text: 'Note whether the machine lost power during an active flash progress bar, or if it completed the flash and simply never reached POST on the subsequent reboot.' 
  },
  { 
    title: 'Diagnostic LED & Beep Patterns', 
    text: 'Count any blinking Caps Lock/Num Lock LEDs or listen for specific beep sequences immediately upon power-up, before the fans ramp to maximum.' 
  },
  { 
    title: 'BitLocker Key Availability', 
    text: 'Confirm whether the Windows drive is encrypted and if the BitLocker recovery key is accessible via a Microsoft account or USB backup.' 
  }
];

const warningSigns = [
  { number: '01', title: 'Complete Black Screen After Power-On', description: 'The system powers on, fans spin or LEDs illuminate, but there is no display output and the machine never reaches a usable POST screen.', urgent: false, clues: ['Fans start immediately and may remain at high speed', 'Caps Lock or Num Lock may not respond normally', 'External display also shows no signal', 'Especially significant right after a BIOS update'] },
  { number: '02', title: 'The System Died During a BIOS Update', description: 'The computer stopped responding, restarted, or lost power while firmware was actively being written.', urgent: true, clues: ['The update progress was interrupted', 'The system froze during a manufacturer firmware package', 'The machine rebooted and never completed POST afterward', 'One of the strongest clues for possible firmware corruption'] },
  { number: '03', title: 'Endless Power-Cycle Loop', description: 'The machine repeatedly powers on, shuts down after a few seconds, and automatically starts again.', urgent: true, clues: ['The cycle repeats without user input', 'Can occur after an incompatible firmware update', 'Memory-training failures can look almost identical', 'Power, EC, ME, CPU, RAM and motherboard faults must also be considered'] },
  { number: '04', title: 'Emergency Recovery Does Not Respond', description: 'The correct manufacturer recovery procedure is attempted, but there is no visible recovery activity.', urgent: false, clues: ['The recovery USB shows no obvious activity', 'The correct key combination has been verified for the exact model', 'The system does not progress toward recovery', 'Professional diagnosis may be appropriate next'] },
  { number: '05', title: 'Diagnostic Beeps or LED Blink Codes', description: 'Instead of reaching POST, the motherboard produces a repeatable beep or LED diagnostic pattern.', urgent: false, clues: ['Codes vary by manufacturer and model', 'Can indicate RAM, CPU, display, firmware or other hardware problems', "Compare the pattern with the exact manufacturer's documentation", 'Do not assume every code means BIOS corruption'] },
  { number: '06', title: 'POST Failure Without a Hardware Change', description: 'The computer previously worked normally and suddenly stops reaching POST without a new component or obvious event.', urgent: false, clues: ['No RAM, SSD or CPU change preceded the failure', 'A firmware update may have occurred shortly beforehand', 'CMOS configuration problems can sometimes mimic firmware failure', 'Power and motherboard faults still need to be ruled out'] },
  { number: '07', title: 'EC / Firmware Synchronization Problems', description: 'The main firmware and embedded controller or Super I/O firmware do not behave correctly together.', urgent: false, clues: ['Power button behavior becomes abnormal', 'Keyboard backlight or fan behavior may be unusual', 'Some laptops use multiple firmware-controlled devices', 'Recovery may require more than rewriting the main SPI image'] },
  { number: '08', title: 'No USB Initialization or Activity', description: 'USB devices show no expected initialization or activity during startup.', urgent: false, clues: ['A USB recovery drive may not show activity', 'USB behavior varies significantly between motherboard designs', 'Physical USB power faults can produce similar symptoms', 'Treat this as supporting evidence, not proof of BIOS corruption'] },
  { number: '09', title: 'Fans Immediately Run at Maximum Speed', description: 'Cooling fans jump to maximum RPM immediately after power-on and never transition to normal control.', urgent: false, clues: ['The system may not be completing firmware initialization', 'Firmware configuration can affect fan-control behavior', 'EC, sensor, power and motherboard faults can produce the same symptom', 'More suspicious when it follows a failed firmware update'] },
  { number: '10', title: 'BIOS / UEFI Setup Freezes', description: 'The system occasionally reaches the firmware setup screen but freezes before settings can be used normally.', urgent: false, clues: ['Keyboard input stops responding', 'The machine freezes before operating-system boot', 'NVRAM or firmware configuration corruption is one possible cause', 'Hardware instability must still be ruled out'] },
];

const manufacturerNotes = [
  { brand: 'Dell', text: 'Dell provides BIOS Recovery features on many systems, with the exact recovery source and supported procedure depending on the model and generation. Confirm the current Dell documentation for the exact service tag/model before using a recovery file.', link: '/dell-laptop-repair-kuwait', linkLabel: 'Dell repair in Kuwait' },
  { brand: 'HP', text: "HP notebooks commonly provide BIOS recovery features, but the supported key sequence, file handling and recovery path vary by model. HP Sure Start platforms use a different protected recovery architecture, so do not assume a generic USB/key-combination procedure applies.", link: '/hp-laptop-repair-kuwait', linkLabel: 'HP repair in Kuwait' },
  { brand: 'Lenovo', text: 'Recovery behavior differs meaningfully between ThinkPad, IdeaPad, Legion and other Lenovo families. Always confirm the exact procedure for the specific model on Lenovo\u2019s official support pages.', link: '/lenovo-laptop-repair-kuwait', linkLabel: 'Lenovo repair in Kuwait' },
  { brand: 'ASUS', text: 'ASUS boards generally use one of two mechanisms: CrashFree BIOS 3 (automatic recovery from a USB drive) or USB BIOS FlashBack on higher-end boards, which reflashes using standby power alone \u2014 no CPU or RAM required.', link: '/asus-laptop-repair-kuwait', linkLabel: 'ASUS repair in Kuwait' },
  { brand: 'Acer', text: "Acer firmware recovery procedures vary by model and platform generation. Use the manufacturer's model-specific instructions rather than a generic key combination.", link: '/acer-laptop-repair-kuwait', linkLabel: 'Acer repair in Kuwait' },
  { brand: 'MSI / Gigabyte', text: 'Some MSI and Gigabyte desktop boards provide redundant firmware or dedicated flashback/recovery features, but this is not universal. Confirm whether the exact board has Dual BIOS, Flash BIOS Button/Q-Flash Plus, or another recovery mechanism before relying on it.', link: '/msi-laptop-repair-kuwait', linkLabel: 'MSI repair in Kuwait' },
  { brand: 'Apple', text: 'Apple Silicon and Intel Macs use a fundamentally different architecture \u2014 recovery relies on DFU mode with Finder on a second Mac. The exact key sequence varies by chip generation, so always confirm on Apple\u2019s current support page.', link: '/macbook-repair-kuwait', linkLabel: 'MacBook repair in Kuwait' },
];

const recoveryLevels = [
  { level: 'Normal BIOS/UEFI Update', what: "The manufacturer's own updater tool replaces the firmware from within a working operating system.", when: 'Routine update on a working computer.' },
  { level: 'OEM Built-in BIOS Recovery', what: 'A recovery mechanism already present on the board or laptop restores firmware from a local backup copy or a prepared USB drive.', when: 'Failed/interrupted update, or firmware corruption, on hardware that has this mechanism.' },
  { level: 'SPI / EEPROM Programming', what: 'An external hardware programmer connects directly to the firmware chip and writes it, independent of whether the system can even power on.', when: "The built-in recovery mechanism doesn't exist on that model, has failed, or the board can't reach the point of running it." },
];

const recoverySteps = [
  { icon: HardDrive, title: 'Identify the SPI Flash', text: 'The relevant firmware storage device is identified, and we determine whether the platform uses one or multiple programmable firmware devices.' },
  { icon: Microscope, title: 'Read and Preserve the Original', text: 'Where possible, the existing firmware is read and backed up before any write operation. Board-specific information is preserved.' },
  { icon: FileWarning, title: 'Verify the Correct Firmware', text: 'The recovery image must match the exact platform, board revision and firmware architecture. A similar model is not necessarily compatible.' },
  { icon: Cpu, title: 'Program the Flash Device', text: 'If appropriate, the firmware chip is programmed using professional hardware and a verified image rather than relying on the damaged system.' },
  { icon: CheckCircle2, title: 'Verify and Test POST', text: 'The board is reassembled as necessary and tested for POST, display output, memory initialization, firmware setup access and stable operation.' },
];

const doNotDo = [
  'Flash a BIOS from a similar-looking model or different motherboard revision',
  'Repeatedly force power cycles while a firmware recovery operation is running',
  'Download random BIOS dumps from unverified websites',
  'Overwrite the original firmware dump before preserving board-specific data',
  'Assume a black screen automatically means BIOS corruption',
  'Connect an SPI programmer without verifying the flash-chip voltage and pinout',
  'Attempt motherboard EEPROM desoldering with unsuitable tools or without ESD protection',
  'Modify the Intel ME, EC or other firmware regions without understanding the exact platform requirements',
];

const beforeYouFlash = [
  { title: 'Perform a proper power reset', text: 'Disconnect AC power and, where the manufacturer permits it, disconnect the internal battery. Follow the model-specific service procedure rather than blindly opening the machine.' },
  { title: 'Test the minimum hardware configuration', text: 'Remove unnecessary USB devices and external peripherals. If accessible, test known-good RAM using the manufacturer-approved configuration.' },
  { title: 'Record diagnostic codes', text: 'Document beep patterns, keyboard LEDs, power LEDs and screen behavior before changing hardware.' },
  { title: 'Inspect for physical damage', text: 'Liquid residue, corrosion, burnt components, damaged connectors or a failed power rail can mimic a firmware failure.' },
];

const bitlockerGuidance = [
  'Back up the recovery key and suspend BitLocker before any firmware update on an encrypted machine.',
  'If asked for the key after an update, entering it is expected and safe \u2014 not evidence of tampering.',
  "If the key was never saved, that's a data-access problem, not a firmware-repair one \u2014 reflashing won't retrieve encrypted data.",
  "After recovery, verify that Secure Boot and TPM settings match the configuration required by Windows and your organization's security policy; do not change them unnecessarily while troubleshooting.",
];

const faq = [
  { q: 'Can a laptop that was bricked by a BIOS update be repaired?', a: 'Often, yes. If the flash device and the underlying board are healthy, OEM recovery or direct firmware reprogramming can restore a system that no longer reaches POST. The important qualification is that “bricked” describes the symptom, not the diagnosis: RAM training, power rails, EC firmware, CPU/SoC, PCH and other motherboard faults can produce the same black-screen or reboot-loop behavior.' },
  { q: 'Does a failed BIOS update always mean the BIOS chip is damaged?', a: 'No. The chip can be electrically healthy while the firmware data stored on it is incomplete, invalid or incompatible. Conversely, a machine that failed after an update may have a hardware fault that appeared at the same time. A failed update is a strong clue, not proof that the flash chip itself has failed.' },
  { q: 'Can you recover BIOS using an EEPROM or SPI programmer?', a: 'In appropriate cases, yes. A technician can identify the firmware device, verify its voltage and architecture, read the existing contents when possible, preserve board-specific information and program a verified image. Direct programming is a repair technique, not a universal first step; the correct board, chip and firmware image must be established first.' },
  { q: 'Will BIOS reprogramming erase my serial number?', a: 'It can if the wrong image or an unsuitable full-image replacement overwrites board-specific regions. Depending on the platform, firmware can contain DMI/SMBIOS data, network identifiers, platform configuration or other device-specific information. Professional recovery should preserve relevant original data whenever possible rather than treating the firmware chip as a generic blank ROM.' },
  { q: 'Should I keep trying different BIOS files if the laptop is not booting?', a: 'No. Repeatedly writing unverified files can make the original state harder to reconstruct and can introduce a second problem. Stop, record the exact model and failure sequence, then use the manufacturer’s current recovery instructions for that exact platform. If OEM recovery fails, diagnosis should determine whether the next step is firmware programming or board repair.' },
  { q: 'How long does BIOS recovery take?', a: 'A straightforward firmware reprogramming job can sometimes be completed the same day once the correct image and board condition are confirmed. Cases involving board-level diagnosis, multiple firmware devices, EC firmware, damaged flash hardware or an underlying power/logic fault can take longer because the firmware is only one part of the boot chain.' },
  { q: "What's the difference between updating BIOS and recovering BIOS?", a: 'A BIOS/UEFI update is an intentional installation of newer firmware on a functioning platform. Recovery is restoration after firmware or firmware configuration has become unusable. Recovery may use an OEM emergency mechanism or, when supported and appropriate, direct SPI/EEPROM programming.' },
  { q: 'Does resetting CMOS fix a corrupted BIOS?', a: 'Usually no. A CMOS reset clears configuration state such as boot order, overclocking or other stored settings; it does not normally rewrite the main firmware image. It can help when a bad setting prevents startup, but genuine firmware corruption requires an appropriate recovery process.' },
  { q: 'Why is Windows asking for a BitLocker recovery key after a BIOS update?', a: 'A firmware update can change the measured boot environment that BitLocker uses with the TPM. If those measurements change unexpectedly from BitLocker’s point of view, Windows can request the recovery key as a security check. That prompt does not by itself prove that the firmware update failed or that the drive is damaged.' },
  { q: 'Can a failed BIOS update damage my hard drive or files?', a: 'A firmware update normally targets firmware storage rather than the user data stored on an SSD or HDD, so the update itself does not inherently erase those files. However, recovery workflows can differ: a separate factory-reset or OS-reinstallation step can erase data, and firmware/security changes can affect access to encrypted storage. Confirm exactly which operation is being performed and keep the required recovery credentials available.' },
  { q: 'Is it safe to use a BIOS file from a different but similar laptop model?', a: 'No. “Similar” is not an adequate compatibility test. Firmware can depend on the exact model, motherboard revision, platform controller configuration, display/power design and regional variant. Use the manufacturer’s file for the exact supported model and follow any documented version-order requirements.' },
  { q: "My laptop has HP Sure Start — what do I do if it still won't boot?", a: 'Do not assume a generic HP USB/key-combination recovery method applies. Sure Start uses protected firmware recovery mechanisms that differ from ordinary manual recovery. If the platform still fails to boot after the documented automatic recovery behavior, the next step is diagnosis of the firmware path and the underlying hardware rather than repeatedly writing unrelated BIOS files.' },
  { q: 'What are POST codes and beep codes, and do I need to know mine?', a: 'They are early-boot diagnostic signals generated before or around POST. You do not need to decode them yourself, but recording the exact number and pattern can save diagnostic time. Always use the documentation for the exact motherboard or laptop model because the same pattern can mean different things across manufacturers and generations.' },
  { q: 'Does every motherboard have a backup BIOS chip?', a: 'No. Some desktop boards provide redundant firmware chips or a flashback mechanism, but many do not, and most laptops do not have a user-accessible dual-BIOS arrangement. Never assume a second chip exists simply because a board is high-end; verify the exact board documentation.' },
  { q: "Can a Mac's firmware be 'flashed' like a PC's BIOS?", a: 'Not in the same consumer-facing way. Modern Macs use Apple-specific firmware and recovery architecture, and supported recovery can involve macOS Recovery, Apple Configurator and DFU procedures depending on the model. Treat Mac firmware recovery as a platform-specific process rather than applying PC SPI-flashing instructions blindly.' },
  { q: 'Is BIOS/UEFI firmware a security risk?', a: 'Firmware is part of the trusted computing base, so compromise can be serious. That is why modern platforms use signed firmware packages, protected update paths, Secure Boot, TPM measurements and other controls. The practical lesson is to obtain firmware from the manufacturer or a trusted service workflow and avoid unverified firmware dumps.' },
  { q: 'Can a BIOS update cause BitLocker to ask for recovery even when the update succeeded?', a: 'Yes. A successful firmware update can legitimately change measured-boot values enough to trigger BitLocker recovery. If the system then boots normally after the recovery key is entered, that points toward a security-state change rather than a failed BIOS flash.' },
  { q: 'What should I collect before taking a bricked laptop to a technician?', a: 'Provide the exact model number, the firmware version if known, what happened immediately before the failure, whether the machine lost power during flashing, any beep/LED/POST codes, and whether the SSD was ever encrypted with BitLocker or another full-disk encryption system. If you still have the original firmware package, keep it rather than downloading several alternatives.' },
];

const toc = [
  { id: 'updates', label: 'Before You Flash' },
  { id: 'warning-signs', label: 'Warning Signs' },
  { id: 'firmware-vs-hardware', label: 'Firmware vs Hardware' },
  { id: 'recovery-intake', label: 'Recovery Intake' },
  { id: 'security-layer', label: 'BitLocker & TPM' },
  { id: 'manufacturers', label: 'By Manufacturer' },
  { id: 'spi-recovery', label: 'SPI Recovery' },
  { id: 'faq', label: 'FAQ' },
];

const LAST_REVIEWED = 'August 30, 2026';

export default function BiosUefiRecoveryGuide() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">

      {/* Dynamic SEO Engine Integration */}
      <SEOEngine entityId="guide-bios-uefi" />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-10 pt-24 sm:px-6 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.14),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
            <div>
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
                <Cpu className="mr-2 h-4 w-4" />
                BIOS &amp; UEFI Recovery Guide
              </Badge>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                BIOS &amp; UEFI Troubleshooting,
                <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Update Failures &amp; Firmware Recovery
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                "BIOS" and "UEFI" get used interchangeably, and neither failure mode is what most people assume. A black screen after an update, a boot loop, or a system that won't POST can come from corrupted firmware \u2014 or from RAM, power, EC, or motherboard faults that only look like a BIOS problem.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="w-full bg-cyan-500 px-6 py-6 font-bold text-slate-950 hover:bg-cyan-400 sm:w-auto">
                  <a href={`tel:+${business.telephone}`}>Book a Diagnostic</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full border-slate-700 px-6 py-6 text-slate-200 hover:bg-slate-800 sm:w-auto">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp a Technician</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-[11px] text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-300">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 shadow-2xl shadow-red-950/20 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-red-500/15 p-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-red-300">Right after a failed flash</p>
                  <h2 className="mt-1 text-xl font-bold text-white">Don't keep trying</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Don't repeatedly power-cycle the machine or reflash with a different or "similar" file. <strong className="text-white">Note whether it died during the flash or on the reboot after</strong>, then check for a built-in recovery mechanism for your exact model.
              </p>
              <a href="#update-failed" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200">
                Read the immediate response steps <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HERO BANNER IMAGE ─── */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 border-b border-slate-800/80">
        <div className="container mx-auto max-w-5xl">
          <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={IMAGES.guides.biosHeroMotherboard.src}
              alt={IMAGES.guides.biosHeroMotherboard.alt}
              width={IMAGES.guides.biosHeroMotherboard.width}
              height={IMAGES.guides.biosHeroMotherboard.height}
              // 🚀 CWV FIX: this banner sits in a *second* section, below a
              // full text hero (badge, h1, paragraph, 2 buttons, TOC chips)
              // plus a secondary alert card — it's below the fold on mobile,
              // so eager-loading it stole network priority from the real
              // critical path without being the actual LCP element.
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-[420px] object-cover"
            />
            <figcaption className="p-3 text-xs text-slate-400 bg-slate-950/80 border-t border-slate-800/60">
              Hardware-level firmware diagnostics and motherboard circuit analysis.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── DECISION TREE ─── */}
      <section id="decision-tree" className="scroll-mt-20 border-b border-slate-800/80 bg-slate-900/40 px-4 py-10 sm:px-6 sm:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-7 max-w-3xl">
            <Badge className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">Start here</Badge>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">What Problem Are You Experiencing?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">Jump straight to the section that matches your symptom.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decisionTree.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.prompt} href={item.anchor} className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900/60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-6 text-slate-100">{item.prompt}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-bold text-cyan-300">
                      {item.target}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.035] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" aria-hidden="true" />
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">A practical diagnostic path</h3>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Start with the event history, then establish whether the platform reaches any part of POST. If an OEM recovery method is available, use the exact model-specific procedure. If recovery cannot run or fails, separate firmware symptoms from power, memory, EC, CPU, PCH/SoC and other board-level faults before attempting direct chip programming.
                </p>
                <p className="mt-3 text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                  Failed update → OEM recovery check → POST/hardware diagnosis → verify firmware path → preserve original data → professional SPI recovery when appropriate → POST and stability testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FUNDAMENTALS + BOOT FLOW ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">BIOS vs UEFI vs Firmware</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8">They do the same fundamental job, but the differences matter for recovery.</p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-1.5">Addressing &amp; Partitioning</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Legacy BIOS runs in 16-bit mode and commonly pairs with MBR partitioning, whose traditional addressing limit is about 2&nbsp;TiB. UEFI runs in 32-bit or 64-bit mode and commonly pairs with GPT, which removes that limit.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-emerald-300 font-bold text-sm sm:text-base mb-1.5">Storage \u2014 Firmware \u2260 ESP \u2260 OS</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">UEFI firmware lives in the motherboard's flash chip, same as legacy BIOS. What's different: UEFI requires an EFI System Partition (ESP) holding bootloader <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">.efi</code> files, plus boot-order data kept in firmware NVRAM variables.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-indigo-300 font-bold text-sm sm:text-base mb-1.5">Interface &amp; Security</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">BIOS is keyboard-only and text-menu driven. UEFI typically offers a graphical interface and introduced Secure Boot, which validates boot-software signatures before running them.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-orange-300 font-bold text-sm sm:text-base mb-1.5">Where the Industry Stands</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Intel phased out legacy BIOS support starting around 2020, and Windows 11 requires UEFI with Secure Boot. "BIOS" remains the informal catch-all term most people use even on UEFI machines.</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4 sm:gap-6">
            <figure className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={IMAGES.guides.legacyBiosScreen.src}
                alt={IMAGES.guides.legacyBiosScreen.alt}
                width={IMAGES.guides.legacyBiosScreen.width}
                height={IMAGES.guides.legacyBiosScreen.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <figcaption className="p-2.5 text-xs text-slate-400 border-t border-slate-800">
                Legacy text-based BIOS menu interface.
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={IMAGES.guides.motherboardDip8BiosChip.src}
                alt={IMAGES.guides.motherboardDip8BiosChip.alt}
                width={IMAGES.guides.motherboardDip8BiosChip.width}
                height={IMAGES.guides.motherboardDip8BiosChip.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <figcaption className="p-2.5 text-xs text-slate-400 border-t border-slate-800 flex justify-between gap-2">
                <span>Dedicated SPI Flash BIOS chip on board.</span>
                <span className="text-[10px] text-slate-500 shrink-0">Photo: {IMAGES.guides.motherboardDip8BiosChip.credit} ({IMAGES.guides.motherboardDip8BiosChip.license})</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-cyan-500/10 p-2 rounded-lg shrink-0">
                <GitBranch className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base">How BIOS/UEFI Boot Actually Works</h3>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
              Power On &rarr; Platform Firmware Initializes &rarr; Hardware / POST &rarr; UEFI Boot Manager Reads NVRAM Boot Variables &rarr; Boot Manager Loads an <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">.efi</code> Bootloader from the ESP &rarr; Bootloader Hands Off to the Operating System
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-3">
              Firmware, the ESP, and the operating system live in three separate places. Most "is this a BIOS problem?" confusion traces back to blurring those three together.
            </p>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4">
            "POST" (Power-On Self-Test) is the diagnostic sequence firmware runs before handing off to the OS. A POST failure can be caused by firmware \u2014 or by hardware. See <a href="#firmware-vs-hardware" className="text-cyan-300 underline hover:text-cyan-200">BIOS Corruption vs Hardware Failure</a> below.
          </p>
        </div>
      </section>

      {/* ─── UPDATES: WHEN TO / WHEN NOT TO ─── */}
      <section id="updates" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className={`bg-cyan-500/20 text-cyan-300 border-cyan-500/30 ${sectionBadge}`}>Before You Flash</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">BIOS/UEFI Updates: When to Update, When Not To</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-2">Generally Makes Sense to Update</h3>
              <ul className="space-y-1.5">
                {['Release notes describe a fix for a symptom you actually have', "You're installing new hardware that needs updated firmware support"].map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-red-300 font-bold text-sm sm:text-base mb-2">Often Better to Leave Alone</h3>
              <ul className="space-y-1.5">
                {['The system is stable with no symptom the update claims to fix', "You'd be jumping several versions at once \u2014 check if step updates are required", "You're on battery or unstable power, where an interruption is the real risk"].map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-400 text-xs sm:text-sm">
                    <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="update-failed" className="scroll-mt-24 rounded-2xl border-2 border-red-500/30 bg-red-500/10 p-5 sm:p-6">
            <h3 className="text-white font-bold text-base sm:text-lg mb-1">When a BIOS Update Fails \u2014 Immediate Response</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">An interruption during the flash \u2014 power loss, forced shutdown, a crash mid-write \u2014 is the most common cause of firmware corruption.</p>
            <div className="grid gap-2">
              {[
                { text: "Don't repeatedly power-cycle the machine", bad: true },
                { text: "Don't immediately reflash with a different or \"similar\" file", bad: true },
                { text: 'Note whether it died during the flash or on the reboot after', bad: false },
                { text: 'Check for a built-in automatic recovery mechanism for your exact model first', bad: false },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2 text-xs sm:text-sm">
                  {item.bad ? <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />}
                  <span className="text-slate-200 leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10 WARNING SIGNS ─── */}
      <section id="warning-signs" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 max-w-3xl">
            <Badge className={`border-red-500/30 bg-red-500/10 text-red-300 ${sectionBadge}`}>
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              Diagnostic Symptoms
            </Badge>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">10 BIOS/UEFI Corruption Warning Signs</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              These symptoms become more meaningful when several occur together, particularly after a failed firmware update.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {warningSigns.map((sign) => (
              <article key={sign.number} className={`rounded-2xl border p-5 transition hover:border-slate-700 sm:p-6 ${sign.urgent ? 'border-red-500/25 bg-red-500/[0.035]' : 'border-slate-800 bg-slate-950/40'}`}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 rounded-xl p-3 text-sm font-bold ${sign.urgent ? 'bg-red-500/15 text-red-300' : 'bg-cyan-500/10 text-cyan-300'}`}>
                    {sign.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sign {sign.number}</span>
                      {sign.urgent && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-300">Pay attention</span>}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-white">{sign.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{sign.description}</p>
                <ul className="mt-4 space-y-2">
                  {sign.clues.map((clue) => (
                    <li key={clue} className="flex items-start gap-2 text-xs leading-5 text-slate-400 sm:text-sm">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${sign.urgent ? 'text-red-300' : 'text-cyan-300'}`} aria-hidden="true" />
                      <span>{clue}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FIRMWARE VS HARDWARE ─── */}
      <section id="firmware-vs-hardware" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-indigo-500/20 text-indigo-300 border-indigo-500/30 ${sectionBadge}`}>Critical Distinction</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">BIOS Corruption vs Hardware Failure</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mt-3">
              A computer that refuses to POST is not automatically suffering from corrupted firmware.
            </p>
          </div>

          <figure className="mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={IMAGES.guides.multimeterMotherboardDiag.src}
              alt={IMAGES.guides.multimeterMotherboardDiag.alt}
              width={IMAGES.guides.multimeterMotherboardDiag.width}
              height={IMAGES.guides.multimeterMotherboardDiag.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover max-h-[360px]"
            />
            <figcaption className="p-3 text-xs text-slate-400 border-t border-slate-800">
              Verifying standby rails (3.3V / 5V) and memory power with a multimeter before diagnosing corrupted firmware.
            </figcaption>
          </figure>

          <div id="post-hardware" className="scroll-mt-24 grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-cyan-500/10 p-2.5 rounded-xl shrink-0">
                  <FileWarning className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Possible Firmware Corruption</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                The physical flash device may be healthy while the firmware data stored on it is incomplete, invalid or incompatible.
              </p>
              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4">
                <span className="block text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1.5">Typical recovery path</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Verify the platform &rarr; preserve board-specific data &rarr; use the correct recovery image &rarr; program the firmware device &rarr; verify POST.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-500/10 p-2.5 rounded-xl shrink-0">
                  <Wrench className="w-5 h-5 text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Possible Hardware Failure</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                The firmware may be completely healthy while a failed power rail, RAM, CPU, PCH, VRM, EC or another component prevents initialization.
              </p>
              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4">
                <span className="block text-[10px] sm:text-xs text-orange-400 font-bold uppercase tracking-wider mb-1.5">Typical recovery path</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Board diagnostics &rarr; power-rail testing &rarr; component isolation &rarr; repair or replacement where appropriate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CMOS VS NVRAM VS BIOS RECOVERY ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">CMOS Reset vs NVRAM Reset vs BIOS Recovery</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8">Three different operations that get conflated constantly.</p>

          <figure className="mb-6 sm:mb-8 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 max-w-xl mx-auto">
            <img
              src={IMAGES.guides.cr2032CmosBattery.src}
              alt={IMAGES.guides.cr2032CmosBattery.alt}
              width={IMAGES.guides.cr2032CmosBattery.width}
              height={IMAGES.guides.cr2032CmosBattery.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
            <figcaption className="p-2.5 text-xs text-slate-400 border-t border-slate-800 flex justify-between gap-2">
              <span>CR2032 CMOS battery maintains clock &amp; user configurations, not core BIOS firmware.</span>
              <span className="text-[10px] text-slate-500 shrink-0">Photo: {IMAGES.guides.cr2032CmosBattery.credit} ({IMAGES.guides.cr2032CmosBattery.license})</span>
            </figcaption>
          </figure>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-bold text-sm sm:text-base mb-1.5">CMOS Reset</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Clears stored settings \u2014 boot order, overclock profiles, fan curves. Does not touch the firmware code and will not fix genuine corruption.</p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-bold text-sm sm:text-base mb-1.5">NVRAM / PRAM Reset (Mac)</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Similarly clears certain stored settings, not the firmware code itself.</p>
            </div>
            <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-1.5">BIOS/UEFI Recovery</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Rewrites the actual firmware program on the flash chip \u2014 what's needed for genuine corruption.</p>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A settings reset is worth trying first for boot-order confusion or overclock instability \u2014 harmless and fast \u2014 but it's not a substitute for firmware recovery when the firmware itself is the problem.
          </p>
        </div>
      </section>

      {/* ─── BEFORE YOU FLASH CHECKLIST ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Check These Things Before Assuming the BIOS Is Corrupted</h2>
          <div className="space-y-3">
            {beforeYouFlash.map((item, index) => (
              <div key={item.title} className="flex gap-4 border border-slate-800 rounded-xl p-4 sm:p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECOVERY INTAKE ─── */}
      <section id="recovery-intake" className="scroll-mt-20 py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-7 max-w-3xl">
            <Badge className={`bg-cyan-500/20 text-cyan-300 border-cyan-500/30 ${sectionBadge}`}>Before Recovery</Badge>
            <h2 className="text-xl sm:text-3xl font-bold text-white">What to Record Before BIOS Recovery</h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
              The more precisely the platform is identified, the lower the risk of using the wrong recovery image or overlooking a hardware fault. If the machine is still accessible, collect these details before making more changes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recoveryIntake.map((item, index) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-bold text-cyan-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base">{item.title}</h3>
                    <p className="mt-1.5 text-slate-400 text-xs sm:text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 sm:p-5">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              <strong className="text-amber-300">Important:</strong> “Same series” is not the same as “same firmware.” Laptop sub-models, motherboard revisions and regional/platform variants can use different firmware. Treat the exact model identifier as a hard requirement.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MANUFACTURERS ─── */}
      <section id="manufacturers" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-emerald-500/20 text-emerald-300 border-emerald-500/30 ${sectionBadge}`}>
              Manufacturer Recovery
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Recovery Methods Differ by Manufacturer</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mt-3">
              General orientation only \u2014 every procedure is model/generation-dependent and OEMs revise them over time. Always confirm on the manufacturer's current support page before attempting recovery.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturerNotes.map((item) => (
              <div key={item.brand} className="border border-slate-800 rounded-xl p-4 sm:p-5 bg-slate-950/40">
                <h3 className="text-white font-bold text-sm sm:text-base mb-2">{item.brand}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">{item.text}</p>
                <Link to={item.link} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                  {item.linkLabel} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FIRMWARE RECOVERY VS REPROGRAMMING + PROFESSIONAL STEPS ─── */}
      <section id="spi-recovery" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className={`bg-cyan-500/20 text-cyan-300 border-cyan-500/30 ${sectionBadge}`}>Three Levels, Not One</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Firmware Recovery vs Firmware Reprogramming</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mt-3">
              "BIOS recovery" gets used loosely to mean three genuinely different operations.
            </p>
          </div>

          <div className="border border-slate-800 rounded-2xl overflow-hidden mb-4">
            <div className="hidden sm:grid grid-cols-[1fr_1.4fr_1.2fr] bg-slate-900/70 text-[11px] uppercase tracking-wide text-slate-400 font-semibold px-5 py-3">
              <div>Level</div>
              <div>What happens</div>
              <div>Typical situation</div>
            </div>
            <div className="divide-y divide-slate-800">
              {recoveryLevels.map((row) => (
                <div key={row.level} className="sm:grid sm:grid-cols-[1fr_1.4fr_1.2fr] p-4 sm:p-5 gap-4">
                  <div className="text-white font-bold text-sm mb-1.5 sm:mb-0">{row.level}</div>
                  <div className="text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-0">{row.what}</div>
                  <div className="text-cyan-300 text-xs sm:text-sm">{row.when}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-slate-400 mb-10 sm:mb-14">
            <Layers className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
            This is why professional chip-level repair exists as a separate tier: it's the fallback for cases where every mechanism above it has already been tried or isn't available on that hardware.
          </p>

          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-indigo-500/20 text-indigo-300 border-indigo-500/30 ${sectionBadge}`}>Professional Recovery</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">How SPI / EEPROM BIOS Recovery Works</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mt-3">
              When the system cannot execute its own recovery process, professional programming hardware can sometimes restore the firmware directly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8 sm:mb-10">
            {recoverySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="border border-slate-800 rounded-xl p-4 sm:p-5 bg-slate-950/40">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                    <span className="text-[10px] font-bold text-slate-500">STEP {index + 1}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6 sm:mb-8">
            <figure className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={IMAGES.guides.ch341aSpiProgrammer.src}
                alt={IMAGES.guides.ch341aSpiProgrammer.alt}
                width={IMAGES.guides.ch341aSpiProgrammer.width}
                height={IMAGES.guides.ch341aSpiProgrammer.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <figcaption className="p-2.5 text-xs text-slate-400 border-t border-slate-800">
                External EEPROM programmer with SOIC-8 clip for direct chip reading and writing.
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={IMAGES.guides.microSolderingBiosIc.src}
                alt={IMAGES.guides.microSolderingBiosIc.alt}
                width={IMAGES.guides.microSolderingBiosIc.width}
                height={IMAGES.guides.microSolderingBiosIc.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <figcaption className="p-2.5 text-xs text-slate-400 border-t border-slate-800">
                Hot-air desoldering and re-soldering of surface-mount SPI Flash chips.
              </figcaption>
            </figure>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6">
            <div className="flex gap-4">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">Why the Original Firmware Dump Matters</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                  Modern firmware can contain platform-specific information, configuration data and security-related regions. A professional recovery should preserve relevant original data whenever possible instead of blindly replacing the entire image with a random dump.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECURITY LAYER: SECURE BOOT, TPM & BITLOCKER ─── */}
      <section id="security-layer" className="scroll-mt-20 py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className={`bg-indigo-500/20 text-indigo-300 border-indigo-500/30 ${sectionBadge}`}>Security Layer</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Secure Boot, TPM &amp; BitLocker</h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mt-3">
              A common, expected consequence of a routine firmware update \u2014 frequently mistaken for a BIOS failure.
            </p>
          </div>

          <figure className="mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={IMAGES.guides.tpmSecurityChip.src}
              alt={IMAGES.guides.tpmSecurityChip.alt}
              width={IMAGES.guides.tpmSecurityChip.width}
              height={IMAGES.guides.tpmSecurityChip.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover max-h-[360px]"
            />
            <figcaption className="p-3 text-xs text-slate-400 border-t border-slate-800">
              TPM-related security hardware validates the boot chain that BitLocker relies on.
            </figcaption>
          </figure>

          <div className="border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-cyan-500/10 p-2 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">What Happens</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                BitLocker can bind its unlock key to TPM measurements ("PCR values") of the boot environment. A firmware update changes those measurements \u2014 expected, not a malfunction \u2014 so the TPM can't silently release the key, and BitLocker asks for the recovery key as a security check.
              </p>
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-500/10 p-2 rounded-lg shrink-0">
                  <KeyRound className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Why Microsoft Says to Suspend BitLocker First</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Suspending BitLocker before a firmware update tells Windows to expect the next boot's measurements to differ, skipping the recovery-key challenge for that transition, then automatically resuming protection.
              </p>
            </div>
            <div className="p-5 sm:p-7">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3">Practical Guidance</h3>
              <ul className="space-y-1.5">
                {bitlockerGuidance.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-slate-300 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POST CODES / BEEP CODES ─── */}
      <section id="post-codes" className="scroll-mt-20 py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">POST Codes, Beep Codes &amp; Diagnostic LEDs</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6 flex gap-4">
            <Volume2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Boards and laptops report early boot failures \u2014 before there's any video output \u2014 through beep patterns, blinking LEDs (often Caps Lock/Num Lock, or dedicated debug LEDs), or two-digit POST code displays. These are <strong className="text-white">manufacturer- and often model-specific</strong>: the same pattern can mean something different on different brands, so always check the exact model's documentation rather than a generic chart. What's consistent is the category flagged \u2014 memory, CPU, GPU/display, or a general boot-device/firmware failure \u2014 worth noting for a technician even without decoding the exact meaning yourself.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DATA SAFETY ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Data Safety During Firmware Recovery</h2>
          <div className="grid sm:grid-cols-[1fr_1fr] gap-4 sm:gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border border-slate-800 min-h-[14rem]">
              <img
                src={IMAGES.motherboard.motherboardBiosFlashUpdateScreen.src}
                alt={IMAGES.motherboard.motherboardBiosFlashUpdateScreen.alt}
                width={IMAGES.motherboard.motherboardBiosFlashUpdateScreen.width}
                height={IMAGES.motherboard.motherboardBiosFlashUpdateScreen.height}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6 flex gap-4">
              <Database className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-white">A firmware-chip reprogramming operation does not inherently erase the contents of the storage drive.</strong>{' '}
                  The firmware storage and the SSD/HDD are normally separate storage devices. A proper SPI/EEPROM reflash targets the firmware device, but a technician should still confirm the exact recovery procedure and avoid any separate “factory restore” or OS-reinstallation step unless it is required and authorized.
                </p>
                <p className="mt-3 text-slate-400">Two real, avoidable risks exist alongside recovery work:</p>
                <ul className="mt-2 space-y-1.5">
                  <li className="flex items-start gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>An update can trigger a BitLocker/FileVault recovery-key prompt \u2014 data isn't at risk, but becomes inaccessible without the key.</span>
                  </li>
                  <li className="flex items-start gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>A technician mishandling the drive during physical disassembly is a handling risk, not a firmware-recovery risk \u2014 ask what precautions are taken.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIY VS PROFESSIONAL ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">DIY vs Professional Recovery</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-cyan-300 font-bold text-sm sm:text-base mb-2">DIY Is Reasonable When</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The manufacturer's own built-in/automatic recovery mechanism for your exact model hasn't been tried yet, or a documented USB-recovery process exists and you can source the correct file from the OEM.
              </p>
            </div>
            <div className="border border-slate-800 rounded-xl p-4 sm:p-5">
              <h3 className="text-emerald-300 font-bold text-sm sm:text-base mb-2">Professional Help Is Safer When</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Built-in recovery has been correctly attempted and failed, the board has no such mechanism, physical board access or desoldering is required, or you're not confident telling "firmware problem" from "hardware problem."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DO NOT DO ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">What NOT to Do After a Failed BIOS Flash</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {doNotDo.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-red-500/15 bg-red-500/[0.03] p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVIDENCE / RELATED CASE STUDY ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.035] p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <Microscope className="mt-1 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              <div>
                <Badge className="mb-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">Repair Evidence</Badge>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Why Diagnosis Matters Before Chip-Level Work</h2>
                <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  A dead or non-booting machine can have a motherboard fault that looks like firmware corruption. KCROC documents component-level board diagnosis separately so firmware recovery is not used as a guess.
                </p>
                <Link
                  to="/case-studies/asus-rog-dead-motherboard-hawalli"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  View the ASUS ROG dead-motherboard recovery case study
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COST & TIME ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Cost &amp; Time Expectations</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6 flex gap-4">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              A straightforward firmware reprogramming job can often be completed the same day. Cases involving board-level diagnosis, multiple firmware devices, EC firmware, or a genuine hardware fault take longer. See{' '}
              <Link to="/pricing" className="text-cyan-300 underline hover:text-cyan-200">Pricing</Link>{' '}
              for current figures.
            </p>
          </div>
        </div>
      </section>

      {/* ─── KUWAIT-SPECIFIC GUIDANCE ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900 bg-slate-900/20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 max-w-3xl">
            <Badge className={`bg-orange-500/20 text-orange-300 border-orange-500/30 ${sectionBadge}`}>Kuwait Practical Guidance</Badge>
            <h2 className="text-xl sm:text-3xl font-bold text-white">BIOS Update Precautions for Kuwait</h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
              The firmware itself is not “more fragile” because a computer is in Kuwait, but the conditions around the update still matter. A firmware write should be treated as a controlled operation, especially when the machine is exposed to unstable power, battery limitations or thermal stress.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Stable power', 'Use reliable AC power and follow the manufacturer’s battery/charger requirements. Avoid starting a firmware update when power interruption is a realistic risk.'],
              ['Thermal stability', 'Do not update a machine that is already shutting down from overheating or has a known cooling fault. Fix the stability problem first.'],
              ['No unnecessary changes', 'Do not combine a firmware update with random BIOS settings, RAM swaps or multiple firmware files. Change one variable at a time so the failure remains diagnosable.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
                <h3 className="text-white font-bold text-sm sm:text-base">{title}</h3>
                <p className="mt-1.5 text-slate-400 text-xs sm:text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KUWAIT CTA ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 sm:p-10">
            <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-300">BIOS &amp; Motherboard Recovery in Kuwait</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">Laptop or Motherboard Stopped Booting After a BIOS Update?</h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-6 max-w-2xl">
              Don't keep trying random firmware files. KCROC can diagnose whether the failure is firmware-related or caused by a physical{' '}
              <Link to="/motherboard-repair-kuwait" className="text-cyan-300 underline hover:text-cyan-200">motherboard</Link>{' '}
              fault, then determine whether professional BIOS programming is appropriate.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold w-full sm:w-auto">
                <a href={`tel:+${business.telephone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                  Book a BIOS Diagnostic
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-200 hover:bg-slate-800/60 w-full sm:w-auto">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                  WhatsApp a Technician
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="scroll-mt-20 border-t border-slate-900 px-4 py-10 sm:px-6 sm:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Badge className={`mb-3 border-slate-700 bg-slate-900 text-slate-300 ${sectionBadge}`}>
              <HelpCircle className="mr-2 inline h-4 w-4" />
              FAQ
            </Badge>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">BIOS &amp; UEFI Recovery Questions</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">Open the question that matches your problem. The detailed guidance above remains available if you want the full explanation.</p>
          </div>
          <div className="space-y-3">
            {faq.map((item, index) => (
              <details key={item.q} className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 open:border-cyan-500/30 open:bg-slate-900/60 sm:p-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-white sm:text-base">
                  <span>{item.q}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-90 group-open:text-cyan-400" />
                </summary>
                <p className="mt-3 pr-8 text-xs leading-6 text-slate-400 sm:text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-8 sm:py-20 px-4 sm:px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Think Your BIOS Is Corrupted?</h2>
          <p className="text-slate-300 text-xs sm:text-base mb-6 sm:mb-8">
            Let a technician determine whether you're dealing with firmware corruption, memory training, power failure or another motherboard fault.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors">
              <Microscope className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Run Diagnostic</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Firmware vs hardware</span>
            </a>
            <Link to="/motherboard-repair-kuwait" className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors">
              <Cpu className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Motherboard Repair</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Chip-level diagnostics</span>
            </Link>
            <Link to="/contact" className="p-4 sm:p-5 flex flex-col items-center gap-1.5 hover:bg-slate-900/60 transition-colors">
              <MessageCircle className="w-5 h-5 text-orange-400" aria-hidden="true" />
              <span className="text-white font-semibold text-xs sm:text-sm">Get Expert Help</span>
              <span className="text-slate-500 text-[10px] sm:text-xs">Talk to support</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold w-full sm:w-auto">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                WhatsApp Us
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-200 hover:bg-slate-800/60 w-full sm:w-auto">
              <a href={`tel:+${business.telephone}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                Call: +{business.telephone}
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 sm:mt-8 text-xs sm:text-sm">
            <Link to="/motherboard-repair-kuwait" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Motherboard Repair
            </Link>
            <Link to="/laptop-repair-kuwait" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Laptop Repair
            </Link>
            <Link to="/gaming-pc-repair-kuwait" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              Gaming PC & GPU Repair
            </Link>
            <Link to="/services" className="text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LAST REVIEWED / SOURCES (E-E-A-T signal) ─── */}
      <section className="border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-4xl px-4 py-10 text-xs sm:text-sm text-slate-500 sm:px-6">
          <p>
            <strong className="text-slate-300">Last reviewed:</strong> {LAST_REVIEWED} by{' '}
            <Link to="/author/imran" className="text-cyan-400 hover:text-cyan-300 underline">Imran Natiq</Link>, Hardware Repair Engineer, KCROC. Manufacturer-specific procedures (key combinations, file names, supported models) change over time \u2014 always confirm current steps on the manufacturer's own support page before attempting recovery.
          </p>
        </div>
      </section>
    </div>
  );
}
