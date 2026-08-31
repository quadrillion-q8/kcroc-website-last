import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, List, MessageCircle, Share2, User, Check, ArrowRight, Cpu, Thermometer, Zap } from 'lucide-react';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { ComparisonTable, DecisionGuide, BuyingChecklist, PerformanceEquation, ThermalDiagram, NpuDiagram, TechnicalDiagram } from '../components/blog/EditorialBlocks';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/blog/intel-core-ultra-vs-amd-ryzen-ai`;

const faqItems = [
  ['Is AMD Ryzen AI better than Intel Core Ultra?', 'Neither is universally better. The exact processor, power configuration, cooling, memory, integrated graphics and workload matter more than the brand name.'],
  ['Which is better for gaming?', 'For integrated-graphics gaming, AMD Ryzen AI systems can be very competitive and often have an advantage depending on the generation and memory configuration. With a dedicated GPU, compare the GPU model, total graphics power (TGP), cooling and laptop configuration before choosing the CPU brand.'],
  ['Does an NPU make a laptop faster?', 'Not generally. A neural processing unit (NPU) is a dedicated accelerator for supported AI inference tasks. It can make compatible features such as background blur or noise removal more power-efficient, but it does not automatically speed up browsing, compiling or every video export.'],
  ['What is the difference between Intel Core Ultra P-cores and E-cores?', 'Performance cores (P-cores) are designed for demanding work where per-thread responsiveness matters. Efficiency cores (E-cores) handle additional parallel or background work with a different performance-per-watt target. Some Core Ultra designs also include low-power E-cores for very light background activity.'],
  ['What is AMD XDNA?', 'XDNA is AMD’s NPU architecture used for Ryzen AI processors. It is designed to accelerate supported on-device AI inference workloads separately from the CPU cores.'],
  ['What are Intel V-series Core Ultra chips?', 'Intel V-series processors are designed around very thin and efficient laptop designs and can use on-package memory. That can improve memory bandwidth and board-level integration, but memory is not user-upgradeable after purchase.'],
  ['Is Ryzen AI better for programmers?', 'There is no universal winner. For programming, prioritize the exact CPU model, sustained power, cooling, RAM capacity, SSD performance and display/keyboard quality. Long compilations are sustained workloads, so the laptop chassis matters.'],
  ['Which is better for video editing?', 'Compare the complete laptop. CPU performance, media-engine support, RAM, SSD, display, cooling and dedicated-GPU configuration can matter more than whether the processor says Intel or AMD.'],
  ['Does Kuwait heat affect laptop performance?', 'It can. High ambient temperatures reduce the cooling system’s temperature headroom, while dust can restrict airflow over time. A well-designed laptop can still operate normally, but sustained heavy workloads make cooling quality especially important in hot conditions.'],
  ['Can I upgrade RAM on a Ryzen AI or Core Ultra laptop?', 'It depends on the laptop, not simply the processor family. Some systems use socketed memory while others solder memory to the board. Check the exact laptop model before buying.'],
  ['Should I compare NPU TOPS?', 'Only as one data point. NPU TOPS figures are generation- and implementation-specific, and software support determines whether the theoretical accelerator performance becomes a useful real-world benefit.'],
  ['What should I check before buying an Intel or AMD laptop in Kuwait?', 'Check the exact CPU, power class, RAM capacity and upgradeability, SSD, GPU and TGP where applicable, cooling design, battery, display, warranty and local serviceability.']
].map(([question, answer]) => ({ question, answer }));

const comparisonRows = [
  { feature: 'CPU architecture', intel: 'Hybrid Core Ultra designs combine performance and efficiency-oriented cores; some designs add low-power E-cores and tiled architecture.', amd: 'Ryzen AI combines Zen CPU cores with an integrated GPU and, on supported generations, an XDNA NPU.', takeaway: 'Read the exact processor specification, not the family name.' },
  { feature: 'CPU performance', intel: 'Varied by generation, core configuration and laptop power limits.', amd: 'Varied by Zen generation, core configuration and laptop power limits.', takeaway: 'Use independent testing of the exact laptop for serious performance decisions.' },
  { feature: 'Integrated graphics', intel: 'Arc branding appears on several modern Core Ultra laptop iGPUs; capability varies by chip and memory configuration.', amd: 'RDNA-based integrated graphics are used across Ryzen AI generations and can be strong for light gaming.', takeaway: 'For iGPU gaming, compare the exact iGPU and memory bandwidth.' },
  { feature: 'NPU / AI acceleration', intel: 'Dedicated NPU on supported Core Ultra generations for compatible on-device AI workloads.', amd: 'XDNA NPU on supported Ryzen AI generations for compatible on-device AI workloads.', takeaway: 'Software support matters as much as the published accelerator figure.' },
  { feature: 'Battery efficiency', intel: 'Depends on architecture, display, power limits, firmware and chassis; low-power cores can help light workloads.', amd: 'Depends on Zen generation, power configuration, display, firmware and chassis.', takeaway: 'Look for laptop-level battery tests, not CPU-brand assumptions.' },
  { feature: 'Gaming', intel: 'Dedicated-GPU systems can perform very well; iGPU results depend heavily on the exact Arc implementation and memory.', amd: 'Strong iGPU options exist; exact RDNA implementation and memory configuration decide the result.', takeaway: 'With a dGPU, GPU TGP and cooling often dominate.' },
  { feature: 'Creator workloads', intel: 'Can benefit from CPU, media-engine and platform features depending on the model.', amd: 'Can benefit from CPU, iGPU/media capabilities and platform features depending on the model.', takeaway: 'Match the workload to the software and exact hardware.' },
  { feature: 'Thermals', intel: 'Power class and chassis determine sustained behavior.', amd: 'Power class and chassis determine sustained behavior.', takeaway: 'The same processor can behave differently in different laptops.' },
  { feature: 'Upgradeability', intel: 'Laptop-dependent; some thin designs use on-package or soldered memory.', amd: 'Laptop-dependent; memory may be socketed or soldered.', takeaway: 'Check the exact service manual/specification before purchase.' },
  { feature: 'Best use cases', intel: 'Broad range: thin-and-light through higher-power laptops, depending on generation and suffix.', amd: 'Broad range: efficient thin-and-light systems through higher-power Ryzen AI designs.', takeaway: 'Choose around your workload and chassis, not the logo.' }
];

const decisions = [
  { audience: 'Students', priority: 'battery + RAM', guidance: 'Prioritize 16GB or more where possible, a comfortable display and keyboard, battery efficiency, weight and local warranty. Either platform can be a good fit.' },
  { audience: 'Office users', priority: 'efficiency', guidance: 'A lower-power Core Ultra or Ryzen AI design can make sense. Spend more attention on battery life, fan noise, display quality and ports than on small CPU-brand differences.' },
  { audience: 'Programmers', priority: 'sustained CPU', guidance: 'Compare sustained multi-core performance, RAM, SSD and cooling. Large projects and long builds expose weak thermal designs that short benchmark bursts can hide.' },
  { audience: 'Developers', priority: 'RAM + thermals', guidance: 'Virtual machines, containers and IDEs reward memory capacity and sustained performance. 32GB can be more valuable than moving between two similarly positioned CPU families.' },
  { audience: 'Engineers / CAD', priority: 'CPU + GPU', guidance: 'Identify whether your CAD workload is CPU-, GPU- or memory-limited. For professional 3D work, the dedicated GPU and its power configuration can outweigh CPU-brand differences.' },
  { audience: '3D creators', priority: 'GPU + cooling', guidance: 'Prioritize the dedicated GPU, VRAM, TGP and sustained cooling first, then compare CPU performance for simulation, baking and CPU-render workloads.' },
  { audience: 'Video editors', priority: 'media workflow', guidance: 'Check codec acceleration, RAM, SSD, display, CPU behavior under long exports and dedicated-GPU support. Do not choose from the CPU badge alone.' },
  { audience: 'Photographers', priority: 'display + RAM', guidance: 'Color-accurate display, memory, SSD capacity and a reliable workflow matter more than small differences between comparable CPU platforms.' },
  { audience: 'Gamers', priority: 'GPU + TGP', guidance: 'With a dedicated GPU, compare the GPU model, TGP, cooling and display before the CPU family. For iGPU gaming, compare the exact iGPU and memory configuration.' },
  { audience: 'Streamers', priority: 'GPU + thermals', guidance: 'Encoding support, GPU capability, sustained cooling, network connectivity and RAM matter. Test the complete laptop rather than assuming the CPU name predicts stream quality.' },
  { audience: 'AI users', priority: 'software support', guidance: 'First identify whether your application uses CPU, GPU or NPU acceleration. Then compare the exact accelerator and supported software instead of buying on TOPS alone.' },
  { audience: 'Travelers / thin-and-light', priority: 'weight + battery', guidance: 'Look for efficient power classes, good idle behavior, a durable chassis and a battery that survives your real workload. Check RAM upgradeability before accepting an on-package-memory design.' },
  { audience: 'Workstation buyers', priority: 'sustained load', guidance: 'Choose around sustained CPU/GPU performance, cooling, serviceability, RAM capacity and warranty. A thicker chassis can be the better engineering choice for long workloads.' }
];

const checklist = [
  'Exact CPU model checked',
  'Power configuration / suffix checked',
  'RAM capacity checked',
  'RAM upgradeability checked',
  'SSD capacity and upgradeability checked',
  'Dedicated GPU and TGP checked, if present',
  'Cooling system and reviews checked',
  'Battery capacity and laptop-level battery tests checked',
  'Display, ports and keyboard checked',
  'Warranty and local support checked',
  'Kuwait availability checked',
  'Repairability and serviceability considered'
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-28 mb-14"><h2 className="mb-5 text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h2>{children}</section>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[1.05rem] leading-8 text-slate-300">{children}</p>;
}

export default function IntelVsAmdGuide() {
  const [activeId, setActiveId] = useState('short-answer');
  const [copied, setCopied] = useState(false);

  const toc = useMemo(() => [
    ['short-answer', 'Short answer'],
    ['at-a-glance', 'At-a-glance comparison'],
    ['intel-architecture', 'Intel Core Ultra architecture'],
    ['amd-architecture', 'AMD Ryzen AI architecture'],
    ['brand-vs-laptop', 'CPU brand ≠ laptop performance'],
    ['kuwait-climate', 'What Kuwait’s climate changes'],
    ['benchmarks', 'How to read benchmarks'],
    ['hidden-variables', 'What manufacturers don’t tell you'],
    ['decision-guide', 'Use-case decision guide'],
    ['buying-checklist', 'Buying checklist'],
    ['faq', 'Frequently asked questions']
  ], []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    toc.forEach(([id]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id);
      }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [toc]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <SEOEngine entityId="guide-intel-vs-amd" />
      <SchemaMarkup schema={faqSchema} />

      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900" aria-hidden="true">
        <div className="h-full bg-cyan-400 transition-[width] duration-150" style={{ width: '100%' }} />
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 sm:pt-28 pb-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-cyan-400">Home</Link></li><li>/</li>
            <li><Link to="/blog" className="hover:text-cyan-400">Blog</Link></li><li>/</li>
            <li><Link to="/blog/laptop-buying-guide-kuwait-2026" className="hover:text-cyan-400">Laptop Buying Guide</Link></li><li>/</li>
            <li className="text-slate-300" aria-current="page">Intel Core Ultra vs AMD Ryzen AI</li>
          </ol>
        </nav>

        <div className="mb-8 lg:hidden">
          <details className="rounded-2xl border border-slate-800 bg-slate-900/60">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-5 font-black text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400">
              <List size={16} className="text-cyan-400" aria-hidden="true" /> On this page
            </summary>
            <ol className="grid gap-1 border-t border-slate-800 p-4 sm:grid-cols-2">
              {toc.map(([id, label]) => <li key={id}><a href={`#${id}`} className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-cyan-300">{label}</a></li>)}
            </ol>
          </details>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_270px]">
          <article className="min-w-0">
            <header className="mb-12">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">Hardware Comparison</span>
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-400">Technically reviewed</span>
              </div>
              <h1 className="max-w-5xl text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
                Intel Core Ultra vs. AMD Ryzen AI: What Actually Differs in a Laptop
              </h1>
              <p className="mt-6 max-w-4xl text-lg sm:text-xl leading-8 text-slate-300">
                A practical, model-first comparison of CPU architecture, integrated graphics, NPUs, power limits and cooling — with a Kuwait-specific look at sustained laptop performance.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><User size={14} /> Imran Natiq</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Published August 7, 2026</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Updated August 28, 2026</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> 12–15 min read</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={copyLink} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-black text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="Copy article link">
                  {copied ? <Check size={14} /> : <Share2 size={14} />} {copied ? 'Copied' : 'Share / Copy link'}
                </button>
                <a href={`https://wa.me/${business.telephone}?text=${encodeURIComponent('Hi KCROC, I read your Intel vs AMD guide and would like help choosing or diagnosing a laptop.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-black text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                  <MessageCircle size={14} /> Ask a technician
                </a>
              </div>
              <figure className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                <img src="/images/blog/intel-core-ultra-vs-amd-ryzen-ai-comparison.webp" alt="Intel Core Ultra versus AMD Ryzen AI laptop processor comparison" width="1200" height="630" loading="eager" fetchPriority="high" decoding="async" className="aspect-[1200/630] w-full object-cover" />
                <figcaption className="px-4 py-3 text-xs text-slate-500">Platform names describe a family. Laptop performance is determined by the exact silicon, configuration and chassis.</figcaption>
              </figure>
            </header>

            <Section id="short-answer" title="The short answer">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8">
                <P><strong className="text-white">Neither Intel Core Ultra nor AMD Ryzen AI is universally superior.</strong> The right choice depends on the exact processor, power limits, cooling, integrated graphics, neural processing unit (NPU), memory configuration, laptop chassis and workload.</P>
                <p className="mb-0 text-lg font-black text-cyan-200">The buying rule: compare the exact laptop and its power configuration, not just “Intel vs. AMD.”</p>
              </div>
            </Section>

            <Section id="at-a-glance" title="At-a-glance comparison">
              <P>This table is intentionally qualitative. CPU families span multiple generations and power classes, so a platform-wide benchmark number would be misleading.</P>
              <ComparisonTable rows={comparisonRows} />
            </Section>

            <Section id="intel-architecture" title="How Intel Core Ultra is built">
              <P>Modern Core Ultra laptop processors use a hybrid design: different types of CPU cores are optimized for different power and performance targets. <strong className="text-white">P-cores</strong>, or performance cores, are intended for demanding work where responsiveness and high per-thread performance matter. <strong className="text-white">E-cores</strong>, or efficiency cores, handle additional parallel and background work with a different performance-per-watt target.</P>
              <P>Some Core Ultra designs also include <strong className="text-white">low-power E-cores</strong>. These are intended for very light activity so the system can avoid waking higher-power cores unnecessarily. Intel’s <strong className="text-white">Thread Director</strong> helps the operating system make scheduling decisions about which work should run on which core type.</P>
              <P>Core Ultra also uses a tiled/chiplet-style package in several generations, allowing different functional blocks — such as compute, graphics and I/O — to be integrated into one processor package. The exact tile arrangement changes by generation, so “Core Ultra” is not a single architecture.</P>
              <TechnicalDiagram title="Intel Core Ultra: a system of compute blocks" icon={Cpu}>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"><strong className="text-white">P-cores</strong><p className="mt-1 text-sm text-slate-400">Demanding foreground work and high responsiveness.</p></div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"><strong className="text-white">E-cores + LP E-cores</strong><p className="mt-1 text-sm text-slate-400">Parallel/background work and low-power activity.</p></div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"><strong className="text-white">NPU + GPU</strong><p className="mt-1 text-sm text-slate-400">Dedicated AI acceleration and integrated graphics on supported designs.</p></div>
              </TechnicalDiagram>
            </Section>

            <Section id="amd-architecture" title="How AMD Ryzen AI is built">
              <P>Ryzen AI is a family name used across multiple generations. At a high level, supported Ryzen AI processors combine <strong className="text-white">Zen CPU cores</strong>, <strong className="text-white">RDNA-based integrated graphics</strong> on relevant designs, and an <strong className="text-white">XDNA NPU</strong> for supported local AI inference.</P>
              <P>Zen is AMD’s CPU architecture family; RDNA is its modern graphics architecture family; and XDNA is the architecture used for AMD’s dedicated neural processing acceleration. The exact core count, GPU configuration, NPU capability and power class still have to be checked for the processor in front of you.</P>
              <P>That distinction matters because “Ryzen AI” does not guarantee a particular performance level. A thin laptop with conservative power limits can behave very differently from a thicker system using a higher-power processor from the same broad family.</P>
              <NpuDiagram />
            </Section>

            <Section id="brand-vs-laptop" title="CPU brand ≠ laptop performance">
              <P>This is the most important lesson in the entire comparison. Two laptops can use processors from the same family and produce very different sustained results.</P>
              <PerformanceEquation />
              <ul className="grid gap-3 sm:grid-cols-2">
                {['Sustained power limits', 'Cooling and heatpipe capacity', 'Chassis thickness and airflow', 'Fan profiles and noise targets', 'RAM capacity and channel configuration', 'Firmware and BIOS tuning', 'Thermal limits and skin-temperature targets', 'Manufacturer performance modes', 'Dedicated-GPU configuration and TGP'].map(item => <li key={item} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300"><Check className="mt-0.5 shrink-0 text-cyan-400" size={16} />{item}</li>)}
              </ul>
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-7 text-slate-300"><strong className="text-amber-200">Why this matters:</strong> a short benchmark can capture burst behavior while your real workload — compiling, exporting, rendering or gaming for an hour — is governed by sustained power and temperature.</div>
            </Section>

            <Section id="kuwait-climate" title="What Kuwait’s climate changes">
              <P>Kuwait’s summer environment adds another variable to laptop performance. When ambient temperatures reach the mid-40s °C or higher, a laptop starts with less temperature headroom than it would in a cooler room. The cooling system still has to move the same workload heat into a warmer environment.</P>
              <P>Fine desert dust is a separate long-term concern. Dust accumulation on fans, filters and heatsink fins can reduce airflow. Air-conditioning cycles can also move a device between very different ambient conditions. None of this means every laptop will overheat or fail; it means <strong className="text-white">cooling design and maintenance deserve more attention in Kuwait</strong>, especially for sustained workloads.</P>
              <ThermalDiagram />
              <P>If a laptop repeatedly reaches its thermal limits, it may reduce clock frequency or power to remain within safe operating conditions. That is thermal throttling: a protective control mechanism, not proof that the processor itself is defective.</P>
            </Section>

            <Section id="benchmarks" title="How to interpret laptop benchmarks">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['Single-core', 'Useful for responsiveness and workloads that cannot use many cores effectively.'],
                  ['Multi-core', 'Useful for parallel workloads such as compilation and some rendering, but laptop power limits still matter.'],
                  ['Burst performance', 'Shows short periods of high performance. It can overstate what a thin chassis can sustain.'],
                  ['Sustained performance', 'More representative of long exports, builds, renders and extended gaming sessions.'],
                  ['Thermal behavior', 'Look for clock/power changes over time, not only the first minute of a test.'],
                  ['Battery testing', 'Battery life must be tested on the complete laptop with its display, firmware, battery and software configuration.'],
                  ['Plugged-in testing', 'Plugged-in results can be materially different from battery-mode limits.'],
                  ['iGPU benchmarks', 'Memory bandwidth and RAM configuration can strongly affect integrated-graphics performance.'],
                  ['NPU benchmarks', 'NPU TOPS is not the same thing as application-level speed. Software support and workload mapping matter.']
                ].map(([title, text]) => <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}
              </div>
            </Section>

            <Section id="hidden-variables" title="What manufacturers don’t tell you">
              <P>A processor specification is only one layer of a laptop. Before buying, look for the variables that are easy to miss in a headline specification:</P>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'CPU power limits and manufacturer performance modes',
                  'Cooling design, heatpipe count and fan behavior',
                  'Soldered RAM or single-channel memory',
                  'SSD model, capacity and thermal behavior',
                  'BIOS/firmware tuning and power policies',
                  'Dedicated GPU TGP and cooling allocation',
                  'Chassis constraints and surface-temperature targets',
                  'Serviceability and access to replaceable components'
                ].map(item => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300"><span className="font-bold text-white">{item.split(' and ')[0]}</span>{item.includes(' and ') ? ` and ${item.split(' and ').slice(1).join(' and ')}` : ''}</div>)}
              </div>
            </Section>

            <Section id="decision-guide" title="Which platform makes sense for your workload?">
              <P>There is no honest one-line winner. Start with the workload, then eliminate laptops that fail the memory, cooling, GPU, battery or serviceability requirements for that workload.</P>
              <DecisionGuide items={decisions} />
            </Section>

            <Section id="exact-cpu" title="Exact-CPU comparison: what to record">
              <P>For future KCROC comparisons, the useful unit of analysis is the <strong className="text-white">exact processor inside the exact laptop</strong>. A reusable comparison record should include:</P>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {['Processor model', 'Architecture / generation', 'CPU cores and threads', 'NPU presence and published capability', 'Integrated GPU', 'Memory support / configuration', 'Power class / limits', 'Release generation', 'Target segment'].map(item => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm font-semibold text-slate-300"><Cpu size={15} className="mb-2 text-cyan-400" />{item}</div>)}
              </div>
              <div className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5 text-sm leading-7 text-slate-300"><strong className="text-cyan-200">No fabricated numbers:</strong> if an NPU TOPS figure, core count or power limit is not verified for the exact model, leave it unspecified rather than turning a platform-level claim into a processor-level fact.</div>
            </Section>

            <Section id="buying-checklist" title="Practical laptop buying checklist">
              <BuyingChecklist items={checklist} />
            </Section>

            <Section id="faq" title="Frequently asked questions">
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <details key={item.question} className="group rounded-2xl border border-slate-800 bg-slate-900/40 open:border-cyan-500/30">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400">{item.question}<span className="text-cyan-400 transition-transform group-open:rotate-45">+</span></summary>
                    <p className="px-5 pb-5 text-sm leading-7 text-slate-400">{item.answer}</p>
                  </details>
                ))}
              </div>
            </Section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-black text-white">Need a second opinion on a laptop?</h2>
              <p className="mt-3 max-w-2xl text-slate-400">KCROC can help diagnose whether a current laptop’s slowdown is related to RAM, storage, cooling or another hardware fault. We offer free pickup and delivery across Kuwait.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/book" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300">Book free pickup <ArrowRight size={16} /></Link>
                <Link to="/laptop-repair-kuwait" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-black text-white hover:border-cyan-500/50 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">Laptop repair services</Link>
              </div>
            </section>

            <p className="mt-8 text-xs leading-6 text-slate-600">Editorial note: platform capabilities and naming change by generation. This article intentionally avoids universal benchmark claims and asks readers to verify the exact processor and laptop configuration before buying.</p>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <nav aria-label="On this page" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400"><List size={14} className="text-cyan-400" /> On this page</p>
                <ol className="space-y-2">
                  {toc.map(([id, label]) => <li key={id}><a href={`#${id}`} className={`block rounded-md px-2 py-1 text-sm ${activeId === id ? 'bg-cyan-500/10 font-bold text-cyan-300' : 'text-slate-500 hover:text-slate-200'}`}>{label}</a></li>)}
                </ol>
              </nav>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">Reviewed by</p>
                <Link to="/author/imran" className="mt-2 block font-bold text-white hover:text-cyan-300">Imran Natiq</Link>
                <p className="mt-1 text-xs leading-5 text-slate-500">Founder & Lead Technician, KCROC</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
