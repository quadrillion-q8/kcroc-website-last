// File: src/constants/galleryData.ts
import { IMAGES } from './images';

export const galleryCategories = [
  'All', 
  'Laptops', 
  'Motherboards', 
  'Gaming PCs', 
  'Hardware Maintenance', 
  'Workshop'
] as const;

/**
 * Dynamically maps your IMAGES constant into the Gallery structure.
 * This ensures that as you update images.ts, your gallery updates automatically.
 */
export const GALLERY_ITEMS = [
  // Workshop/Branding Images
  ...Object.values(IMAGES.brand).map(img => ({
    category: 'Workshop',
    image: img
  })),

  // Services/Hero Images
  ...Object.values(IMAGES.services).map(img => ({
    category: 'Laptops', // Defaulting these to Laptops, modify logic if needed
    image: img
  })),

  // Hardware/Component Images
  ...Object.values(IMAGES.laptop).map(img => ({
    category: 'Hardware Maintenance',
    image: img
  }))
].filter(item => item.image.src !== "/logo.png") as const; // Exclude logo from gallery
