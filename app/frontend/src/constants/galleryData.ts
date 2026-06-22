// File: src/constants/galleryData.ts
import { IMAGES } from './images';

// Standardized categories based on your actual assets
export const galleryCategories = [
  'All', 
  'Laptops', 
  'Motherboards', 
  'Gaming PCs', 
  'Hardware Maintenance', 
  'Workshop'
] as const;

export const GALLERY_ITEMS = [
  { category: 'Gaming PCs', image: IMAGES.services.gamingPCRepairHero },
  { category: 'Motherboards', image: IMAGES.services.motherboardRepairHero },
  { category: 'Laptops', image: IMAGES.services.laptopRepairHero },
  { category: 'Laptops', image: IMAGES.services.macBookRepairHero },
  { category: 'Workshop', image: IMAGES.brand.teamworkbench },
  { category: 'Workshop', image: IMAGES.brand.inventoryShelves },
  { category: 'Motherboards', image: IMAGES.laptop.logicBoard },
  { category: 'Hardware Maintenance', image: IMAGES.laptop.brokenHinge },
  { category: 'Hardware Maintenance', image: IMAGES.laptop.cloggedFan },
  { category: 'Hardware Maintenance', image: IMAGES.laptop.swollenBattery },
  { category: 'Laptops', image: IMAGES.laptop.screenBezel },
  { category: 'Motherboards', image: IMAGES.laptop.copperHeatsink },
  { category: 'Hardware Maintenance', image: IMAGES.laptop.wifiCard },
  { category: 'Hardware Maintenance', image: IMAGES.laptop.fanReplacement },
  { category: 'Hardware Maintenance', image: IMAGES.services.thermalPasteService }
] as const;
