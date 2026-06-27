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
].filter(item => item.image.src !== "/logo.png") as const; // Prevent logo from appearing in the gallery grid
