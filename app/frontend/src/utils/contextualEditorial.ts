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
};

// Keep every non-image block, heading ID and relative text order unchanged.
// Only a single trailing authored figure is promoted to the contextual rail;
// images embedded within a sequence or multiple figures remain in their
// original positions. A section with no suitable visual uses the full canvas.
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
    if (images.length === 1 && last?.type === 'image' && section.blocks.length > 2) {
      section.visual = last;
      section.blocks.pop();
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
