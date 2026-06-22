// File: src/constants/galleryData.ts
import { IMAGES } from './images';

export const galleryCategories = [
  "All", 
  "Workshop & Team", 
  "Custom PC Builds", 
  "Laptop Repairs", 
  "Upgrades & SSDs"
];

export const GALLERY_ITEMS = [
  // ─── WORKSHOP & TEAM ─────────────────────────────────────────────
  { category: "Workshop & Team", title: "Exterior Daytime", image: IMAGES.brand.shopExteriorDay },
  { category: "Workshop & Team", title: "Shop Entrance", image: IMAGES.brand.shopEntrance },
  { category: "Workshop & Team", title: "Workshop Interior", image: IMAGES.brand.shopPhoto },
  { category: "Workshop & Team", title: "Owner Imran Natiq", image: IMAGES.brand.workshopOwner },
  { category: "Workshop & Team", title: "Technicians at Work", image: IMAGES.brand.teamworkbench },
  { category: "Workshop & Team", title: "Technical Team", image: IMAGES.brand.techTeam },
  { category: "Workshop & Team", title: "Spare Parts Inventory", image: IMAGES.brand.inventoryShelves },

  // ─── CUSTOM PC BUILDS ────────────────────────────────────────────
  { category: "Custom PC Builds", title: "Water Cooled Build", image: IMAGES.pcBuilds.waterCooledPC },
  { category: "Custom PC Builds", title: "ASUS ROG Build", image: IMAGES.pcBuilds.rgbCaseBuild },
  { category: "Custom PC Builds", title: "DeepCool AIO Install", image: IMAGES.pcBuilds.liquidCooler },

  // ─── LAPTOP REPAIRS ──────────────────────────────────────────────
  { category: "Laptop Repairs", title: "Laptop Repair Service", image: IMAGES.services.laptopRepairHero },
  { category: "Laptop Repairs", title: "Motherboard Repair", image: IMAGES.services.motherboardRepairHero },
  { category: "Laptop Repairs", title: "MacBook Logic Board", image: IMAGES.laptop.logicBoard },
  { category: "Laptop Repairs", title: "Swollen Battery", image: IMAGES.laptop.swollenBattery },
  { category: "Laptop Repairs", title: "Hinge Repair", image: IMAGES.laptop.brokenHinge },
  { category: "Laptop Repairs", title: "Fan Dust Cleaning", image: IMAGES.laptop.cloggedFan },

  // ─── UPGRADES & SSDS ─────────────────────────────────────────────
  { category: "Upgrades & SSDs", title: "8GB DDR4 Upgrade", image: IMAGES.upgrades.ran8gbDDR4 },
  { category: "Upgrades & SSDs", title: "NVMe SSD Upgrade", image: IMAGES.upgrades.ssdMDBLack },
  { category: "Upgrades & SSDs", title: "Graphics Card Upgrade", image: IMAGES.upgrades.zotacGPU }
];
