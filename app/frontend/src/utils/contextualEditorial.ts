import type { BlogPost, ContentBlock, ImageBlock } from '../constants/blogPosts';

type Section = { headingId?: string; blocks: ContentBlock[]; visual?: ImageBlock };

// Explicit section-to-image assignments only. Reuse approved existing editorial
// assets; never pick a photograph by keyword or imply a specific customer case.
const CURATED: Record<string, Record<string, ImageBlock>> = {
  'laptop-temperatures-kuwait-safe-cpu-gpu-temperatures': {
    'temperature-vs-thermal-limit': {
      type: 'image',
      src: "/images/editorial/thermal-limit-vs-operating-range.svg",
      alt: "Conceptual comparison of a variable operating temperature range and a model-specific thermal limit",
      caption: "Illustration: practical operating temperatures and manufacturer thermal limits are different concepts.",
    },
    'what-temperature-is-too-hot-cpu': {
      type: 'image',
      src: "/images/laptop-motherboard-cpu-thermal-paste-ram-slots.webp",
      alt: "Laptop motherboard showing processor thermal interface and memory slots",
      caption: "The processor package, thermal interface and cooling design all influence sustained temperatures.",
    },
    'what-temperature-is-too-hot-gpu': {
      type: 'image',
      src: "/images/gaming-laptop-dual-fan-motherboard-diagnostics.webp",
      alt: "Gaming laptop internal cooling assembly with two fans",
      caption: "A dedicated graphics processor shares a compact cooling environment; the exact GPU and laptop design determine the limits.",
    },
    'kuwait-climate-laptop-temperatures': {
      type: 'image',
      src: "/images/editorial/ambient-air-cooling-path.svg",
      alt: "Conceptual comparison of cooler and warmer intake air and the laptop heat transfer path",
      caption: "Illustration: warmer intake air reduces thermal headroom; the temperature change is not fixed.",
    },
    'thermal-throttling': {
      type: 'image',
      src: "/images/editorial/thermal-throttling-pattern.svg",
      alt: "Illustrative trend of temperature rising and clock speed falling under sustained load",
      caption: "Conceptual trend, not benchmark data. Confirm throttling with clock speed, workload and thermal or power-limit indicators.",
    },
    'how-to-check-laptop-temperature': {
      type: 'image',
      src: "/images/editorial/repeatable-temperature-test.svg",
      alt: "Four-stage temperature testing workflow from idle to real workload and comparison",
      caption: "Illustration: repeat the same workload under comparable conditions; record sustained temperature and clocks.",
    },
    'signs-of-thermal-problem': {
      type: 'image',
      src: '/images/gallery/lenovo-laptop-replacement-cooling-fan-part-number-label-kuwait.webp',
      alt: 'Laptop replacement cooling fan with its model identification label',
      caption: 'A model-specific cooling fan: abnormal fan behavior warrants inspection before replacement.',
    },
    'kcroc-thermal-diagnostic-method': {
      type: 'image',
      src: '/images/gallery/laptop-fan-and-heatsink-deep-cleaning-kuwait.webp',
      alt: 'Laptop fan and heatsink during internal cleaning',
      caption: 'Inspect the fan, heatsink and airflow path before deciding on thermal service.',
    },
    'when-to-clean-or-repaste': {
      type: 'image',
      src: '/images/gallery/laptop-cpu-thermal-paste-reapplication-intel-core.webp',
      alt: 'Thermal paste reapplication on a laptop Intel Core processor',
      caption: 'Thermal material is renewed when inspection and diagnosis justify it.',
    },
  },
  'why-is-my-laptop-so-slow': {
    'startup-apps': {
      type: 'image',
      src: "/images/editorial/startup-apps-diagnostic.svg",
      alt: "Four-step conceptual startup application diagnosis workflow",
      caption: "Illustration, not a Windows screenshot: identify unnecessary startup applications and compare before and after.",
    },
    'disk-usage': {
      type: 'image',
      src: "/images/editorial/disk-activity-diagnostic.svg",
      alt: "Four-step conceptual disk activity troubleshooting workflow",
      caption: "Illustration: active time, the responsible process, response time and drive health should be interpreted together.",
    },
    'storage-health': {
      type: 'image',
      src: "/images/editorial/storage-health-diagnostic.svg",
      alt: "Conceptual storage health diagnostic checklist",
      caption: "Illustration, not a measured SMART result: protect important files and assess health indicators alongside symptoms.",
    },
    'ssd-nearly-full': {
      type: 'image',
      src: "/images/micron-m2-nvme-ssd-laptop-storage.webp",
      alt: "Micron M.2 NVMe solid-state drive",
      caption: "An SSD needs sufficient free capacity for normal storage maintenance; the pictured drive is a hardware example, not a measured fault.",
    },
    'overheating': {
      type: 'image',
      src: "/images/gaming-laptop-dual-fan-motherboard-diagnostics.webp",
      alt: "Laptop motherboard and dual-fan cooling system",
      caption: "Thermal throttling is diagnosed by comparing temperature, clock speed and workload, not by appearance alone.",
    },
    'power-battery': {
      type: 'image',
      src: "/images/dell-laptop-ram-fan-battery-chassis-open.webp",
      alt: "Dell laptop interior showing the battery and cooling fan",
      caption: "Power limits can depend on charger recognition, battery condition, firmware and the active power profile.",
    },
    'upgrade-repair': {
      type: 'image',
      src: "/images/laptop-motherboard-dual-m2-ssd-slots.webp",
      alt: "Laptop motherboard with two M.2 storage slots",
      caption: "Verify the exact motherboard and supported storage or memory configuration before purchasing an upgrade.",
    },
    'ram-pressure': {
      type: 'image',
      src: "/images/blog/windows-11-ram-upgrade-guide.webp",
      alt: "Laptop memory upgrade illustration",
      caption: "More memory can help when measurements show that the working set exceeds the installed capacity; check upgrade compatibility first.",
    },
    'old-hdd': {
      type: 'image',
      src: "/images/seagate-1tb-mobile-hdd-laptop-hard-drive.webp",
      alt: "Seagate 2.5-inch laptop mechanical hard drive",
      caption: "An older mechanical drive can limit random-access performance even when the processor is lightly loaded.",
    },
    'dust-fan-thermal-paste': {
      type: 'image',
      src: "/images/laptop-cooling-fins-dust-removal-kuwait-1000.webp",
      alt: "Dust obstruction in laptop cooling fins",
      caption: "Inspect the fan and fin stack before deciding whether cleaning or thermal service is justified.",
    },
  },
  'how-often-clean-laptop-replace-thermal-paste-kuwait': {
    'why-gaming-laptops-need-care': {
      type: 'image',
      src: "/images/gaming-laptop-dual-fan-motherboard-diagnostics.webp",
      alt: "Gaming laptop motherboard with its dual-fan cooling system",
      caption: "Compact gaming-laptop cooling systems must dissipate heat from sustained CPU and GPU workloads.",
    },
    'safe-gaming-laptop-cleaning': {
      type: 'image',
      src: "/images/laptop-cooling-fins-dust-removal-kuwait-1000.webp",
      alt: "Laptop heatsink fins exposed during dust removal",
      caption: "Internal cleaning is model-specific; the photograph illustrates the cooling path, not a universal disassembly procedure.",
    },
  },
  'pc-gaming-graphics-settings-better-visuals-fps': {
    'when-settings-arent-the-problem': {
      type: 'image',
      src: "/images/gaming-laptop-dual-fan-motherboard-diagnostics.webp",
      alt: "Gaming laptop motherboard and dual cooling fans",
      caption: "Cooling and power limits can influence sustained gaming performance independently of graphics presets.",
    },
  },
};

// Explicitly reviewed authored images may be moved out of the middle of a
// section without changing the order of any surrounding non-image content.
const PROMOTE_AUTHORED: Record<string, readonly string[]> = {
  'why-8gb-ram-is-no-longer-enough-for-windows-11': ['where-your-8gb-goes', 'memory-swapping', 'ram-comparison', 'check-upgrade-compatibility'],
  'gaming-pc-mistakes-kuwait': ['thermal-paste', 'xmp-bios', 'psu-quality', 'placement'],
};

// Keep every non-image block, heading ID and relative text order unchanged.
// Single trailing authored figures or explicitly reviewed single figures are
// promoted to the contextual rail. Unreviewed embedded or multiple figures
// remain in their original positions. A section with no suitable visual uses the full canvas.
export function contextualSections(post: BlogPost): Section[] {
  const sections: Section[] = [];
  let current: Section = { blocks: [] };
  const seen = new Set<string>([post.image]);
  for (const block of post.richContent ?? []) {
    if (block.type === 'h2') {
      if (current.blocks.length) sections.push(current);
      current = { headingId: block.id, blocks: [] };
    }
    if (block.type === 'image') {
      if (seen.has(block.src)) {
        if (block.caption) current.blocks.push({ type: 'paragraph', text: block.caption });
        continue;
      }
      seen.add(block.src);
    }
    current.blocks.push(block);
  }
  if (current.blocks.length) sections.push(current);
  for (const section of sections) {
    if (!section.headingId) continue;
    const images = section.blocks.filter((block): block is ImageBlock => block.type === 'image');
    const last = section.blocks[section.blocks.length - 1];
    const reviewed = PROMOTE_AUTHORED[post.slug]?.includes(section.headingId) ?? false;
    if (images.length === 1 && (last?.type === 'image' || reviewed) && section.blocks.length > 2) {
      section.visual = images[0];
      section.blocks = section.blocks.filter(block => block !== section.visual);
      continue;
    }
    const candidate = CURATED[post.slug]?.[section.headingId];
    if (!images.length && candidate && !seen.has(candidate.src)) {
      section.visual = candidate;
      seen.add(candidate.src);
    }
  }
  return sections;
}
