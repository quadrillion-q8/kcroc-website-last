// File: src/constants/galleryData.ts
import { IMAGES } from './images';

// Standardized categories for your filter buttons
export const galleryCategories = [
  'All', 
  'Laptops', 
  'Motherboards', 
  'Gaming PCs', 
  'Hardware Maintenance', 
  'Workshop'
] as const;

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
 * Dynamically maps your new categorized IMAGES constant into the Gallery grid.
 */
export const GALLERY_ITEMS = [
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
  .filter(item => !GALLERY_EXCLUDED_SRCS.has(item.image.src)) as const;

