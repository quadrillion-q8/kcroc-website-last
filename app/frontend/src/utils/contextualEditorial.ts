import type { BlogPost, ContentBlock, ImageBlock } from '../constants/blogPosts';

type Section = { headingId?: string; blocks: ContentBlock[]; visual?: ImageBlock };

// Explicit section-to-image assignments only. Reuse approved existing editorial
// assets; never pick a photograph by keyword or imply a specific customer case.
const CURATED: Record<string, Record<string, ImageBlock>> = {
  'laptop-temperatures-kuwait-safe-cpu-gpu-temperatures': {
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
