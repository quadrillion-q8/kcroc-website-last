// File: src/constants/galleryData.ts
import { IMAGES } from './images';
import { GALLERY_PHOTOS } from './galleryPhotos';

// Standardized categories for your filter buttons
export const galleryCategories = [
  'All', 
  'Laptops', 
  'Motherboards', 
  'Gaming PCs', 
  'Hardware Maintenance', 
  'Workshop'
] as const;

/**
 * One gallery tile. `thumb` is optional: photos that ship a small
 * 640px derivative use it for the grid and load `src` (full size) only
 * when opened in the lightbox. Older photos without a thumb fall back to `src`.
 */
export interface GalleryItem {
  category: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    thumb?: string;
    thumbWidth?: number;
    thumbHeight?: number;
  };
}

// 🩹 FIX: requested removal of these 11 photos from the /gallery page.
// Filtered by src (not deleted from constants/images.ts) because several of
// these same image objects are reused elsewhere on the site — e.g.
// leadTechnician and shopInterior also appear on the Hawalli location page,
// and the battery/heatsink/thermal-paste shots are used as contentImages on
// individual service/problem pages in data/graph.ts. Removing the IMAGES
// entries outright would have broken those pages; excluding by src here
// only affects what shows up in the gallery grid.
const GALLERY_EXCLUDED_SRCS = new Set([
  '/images/kcroc-team-member-imran-hat-fun.webp',
  '/images/computer-repair-shop-hawalli-kuwait.webp',
  '/images/kcroc-lead-technician-laptop-repair-workbench.webp',
  '/images/swollen-macbook-internal-battery-replacement.webp',
  '/images/macbook-pro-battery-removal-repair.webp',
  '/images/asus-laptop-battery-heatpipe-fan-open.webp',
  '/images/dell-laptop-windows-update-repair-stack.webp',
  '/images/hp-laptop-copper-heatsink-dried-thermal-paste.webp',
  '/images/laptop-cooling-fan-closeup-repair.webp',
  '/images/laptop-cpu-thermal-paste-reapplication.webp',
  '/images/laptop-keyboard-heatsink-assembly-removal.webp',
]);

/**
 * Newest photos first: the batch in galleryPhotos.ts (with thumbnails),
 * mapped into the same shape as the older registry-driven items.
 */
const NEW_GALLERY_ITEMS: GalleryItem[] = GALLERY_PHOTOS.map((p) => ({
  category: p.category,
  image: {
    src: `/images/gallery/${p.name}.webp`,
    thumb: `/images/gallery/${p.name}.w640.webp`,
    alt: p.alt,
    width: p.width,
    height: p.height,
    thumbWidth: p.thumbWidth,
    thumbHeight: p.thumbHeight,
  },
}));

/**
 * Dynamically maps your new categorized IMAGES constant into the Gallery grid.
 */
const REGISTRY_GALLERY_ITEMS: GalleryItem[] = [
  // --- WORKSHOP ---
  ...Object.values(IMAGES.brand).map(img => ({
    category: 'Workshop',
    image: img
  })),

  // --- LAPTOPS & MACBOOKS ---
  ...Object.values(IMAGES.services).map(img => ({
    category: 'Laptops',
    image: img
  })),
  ...Object.values(IMAGES.macbook).map(img => ({
    category: 'Laptops',
    image: img
  })),

  // --- HARDWARE MAINTENANCE & UPGRADES ---
  ...Object.values(IMAGES.laptopHardware).map(img => ({
    category: 'Hardware Maintenance',
    image: img
  })),
  ...Object.values(IMAGES.upgrades).map(img => ({
    category: 'Hardware Maintenance',
    image: img
  })),

  // --- MOTHERBOARDS ---
  ...Object.values(IMAGES.motherboard).map(img => ({
    category: 'Motherboards',
    image: img
  })),

  // --- GAMING PCs ---
  ...Object.values(IMAGES.gaming).map(img => ({
    category: 'Gaming PCs',
    image: img
  }))
]
  .filter(item => item.image.src !== "/logo.webp") // Prevent logo from appearing in the gallery grid
  .filter(item => !GALLERY_EXCLUDED_SRCS.has(item.image.src));

export const GALLERY_ITEMS: GalleryItem[] = [...NEW_GALLERY_ITEMS, ...REGISTRY_GALLERY_ITEMS];
