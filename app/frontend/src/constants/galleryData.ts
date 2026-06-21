// File: src/constants/galleryData.ts
import { IMAGES } from './images';

export const galleryCategories = ["All", "Custom PC Builds", "Laptop Repairs", "Workshop & Team"];

export const galleryImages = [
  // ─── WORKSHOP & TEAM ─────────────────────────────────────────────
  {
    src: IMAGES.brand.shopExteriorDay,
    alt: 'Exterior daytime view of Al Mullah Complex in Hawalli',
    category: 'Workshop & Team'
  },
  {
    src: IMAGES.brand.teamWorkbench,
    alt: 'KCROC computer technicians working on motherboard repairs at the workbench',
    category: 'Workshop & Team'
  },
  {
    src: IMAGES.brand.workshopOwner,
    alt: 'KCROC lead technician at the computer repair workbench',
    category: 'Workshop & Team'
  },
  {
    src: IMAGES.brand.inventoryShelves,
    alt: 'Shelves stocked with spare laptop chassis and repair parts',
    category: 'Workshop & Team'
  },

  // ─── CUSTOM PC BUILDS ────────────────────────────────────────────
  {
    src: IMAGES.pcBuilds.waterCooledPC,
    alt: 'High-end custom gaming PC build featuring hard-tube liquid cooling',
    category: 'Custom PC Builds'
  },
  {
    src: IMAGES.pcBuilds.rgbCaseBuild,
    alt: 'ASUS ROG custom gaming PC build featuring RGB light strips',
    category: 'Custom PC Builds'
  },
  {
    src: IMAGES.pcBuilds.i9Processor,
    alt: 'Intel Core i9-13900K processor seated in an ASUS ROG Strix motherboard',
    category: 'Custom PC Builds'
  },
  {
    src: IMAGES.pcBuilds.kryonautPaste,
    alt: 'Applying Thermal Grizzly Kryonaut Extreme thermal paste to a desktop CPU',
    category: 'Custom PC Builds'
  },

  // ─── LAPTOP REPAIRS ──────────────────────────────────────────────
  {
    src: IMAGES.laptop.swollenBattery,
    alt: 'Removing a dangerously swollen lithium-ion battery from an Apple MacBook',
    category: 'Laptop Repairs'
  },
  {
    src: IMAGES.laptop.logicBoard,
    alt: 'Exposed internal logic board and cooling fan inside an Apple MacBook',
    category: 'Laptop Repairs'
  },
  {
    src: IMAGES.laptop.brokenHinge,
    alt: 'Severe physical damage to a laptop chassis showing a broken right hinge',
    category: 'Laptop Repairs'
  },
  {
    src: IMAGES.laptop.copperHeatsink,
    alt: 'Removing a copper heatsink from a laptop motherboard for thermal paste replacement',
    category: 'Laptop Repairs'
  },
  {
    src: IMAGES.upgrades.ssdWDBlack,
    alt: 'Western Digital WD_BLACK SN850 1TB NVMe SSD for a laptop storage upgrade',
    category: 'Laptop Repairs'
  }
];
