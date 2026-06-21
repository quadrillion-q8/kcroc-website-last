// File: src/constants/galleryData.ts
import { IMAGES } from './images';

export const galleryCategories = [
  "All", 
  "Workshop & Team", 
  "Custom PC Builds", 
  "Laptop Repairs", 
  "Upgrades & SSDs"
];

export const galleryImages = [
  // ─── WORKSHOP & TEAM ─────────────────────────────────────────────
  { src: IMAGES.brand.shopExteriorDay, alt: 'Exterior view of KCROC Al Mullah Complex', category: 'Workshop & Team' },
  { src: IMAGES.brand.shopPhoto, alt: 'Inside the KCROC professional computer repair workshop', category: 'Workshop & Team' },
  { src: IMAGES.brand.teamWorkbench, alt: 'Technicians working on motherboard repairs', category: 'Workshop & Team' },
  { src: IMAGES.brand.workshopOwner, alt: 'Imran Natiq, leading IT specialist', category: 'Workshop & Team' },
  { src: IMAGES.brand.inventoryShelves, alt: 'Inventory shelves stocked with laptop chassis parts', category: 'Workshop & Team' },
  { src: IMAGES.brand.techTeam, alt: 'KCROC computer repair technician team', category: 'Workshop & Team' },

  // ─── CUSTOM PC BUILDS ────────────────────────────────────────────
  { src: IMAGES.pcBuilds.waterCooledPC, alt: 'High-end custom gaming PC with liquid cooling', category: 'Custom PC Builds' },
  { src: IMAGES.pcBuilds.rgbCaseBuild, alt: 'ASUS ROG custom gaming PC illuminated by RGB', category: 'Custom PC Builds' },
  { src: IMAGES.pcBuilds.i9Processor, alt: 'Intel Core i9-13900K processor in ASUS motherboard', category: 'Custom PC Builds' },
  { src: IMAGES.pcBuilds.kryonautPaste, alt: 'Applying Thermal Grizzly Kryonaut Extreme paste', category: 'Custom PC Builds' },
  { src: IMAGES.pcBuilds.liquidCooler, alt: 'Installation of a DeepCool AIO liquid CPU cooler', category: 'Custom PC Builds' },
  { src: IMAGES.services.diagnosticsWorkbench, alt: 'Custom gaming PC on the diagnostics workbench', category: 'Custom PC Builds' },

  // ─── LAPTOP REPAIRS ──────────────────────────────────────────────
  { src: IMAGES.laptop.swollenBattery, alt: 'Removing a dangerously swollen MacBook battery', category: 'Laptop Repairs' },
  { src: IMAGES.laptop.logicBoard, alt: 'Exposed Apple MacBook logic board and cooling fan', category: 'Laptop Repairs' },
  { src: IMAGES.laptop.brokenHinge, alt: 'Repairing severe physical damage to a laptop hinge', category: 'Laptop Repairs' },
  { src: IMAGES.laptop.copperHeatsink, alt: 'Removing a laptop copper heatsink for thermal paste', category: 'Laptop Repairs' },
  { src: IMAGES.laptop.cloggedFan, alt: 'Deep cleaning a severely dust-clogged laptop fan', category: 'Laptop Repairs' },
  { src: IMAGES.laptop.macbookRepair, alt: 'Technician holding an opened MacBook for repair', category: 'Laptop Repairs' },

  // ─── UPGRADES & SSDS ─────────────────────────────────────────────
  { src: IMAGES.upgrades.ram8gbDDR4, alt: 'Upgrading laptop performance with an 8GB DDR4 RAM', category: 'Upgrades & SSDs' },
  { src: IMAGES.upgrades.ssdWDBlack, alt: 'Western Digital WD_BLACK SN850 1TB NVMe SSD', category: 'Upgrades & SSDs' },
  { src: IMAGES.upgrades.ssdSamsung, alt: 'Samsung 960 EVO NVMe M.2 SSD installation', category: 'Upgrades & SSDs' },
  { src: IMAGES.upgrades.ssdKioxia, alt: 'Kioxia 128GB M.2 SSD laptop storage upgrade', category: 'Upgrades & SSDs' },
  { src: IMAGES.pcBuilds.zotacGPU, alt: 'Zotac Gaming graphics card GPU upgrade', category: 'Upgrades & SSDs' }
];
