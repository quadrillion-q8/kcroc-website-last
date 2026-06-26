// File: src/constants/galleryData.ts

export const galleryCategories = [
  'All', 'Laptops', 'Motherboards', 'Gaming PCs', 'Hardware Maintenance', 'Workshop'
] as const;

export const GALLERY_ITEMS = [
  // --- WORKSHOP & BRANDING ---
  { category: 'Workshop', image: { src: "/images/kcroc-commercial-complex-view-dusk.webp", alt: "Shop exterior dusk", width: 1200, height: 800 } },
  { category: 'Workshop', image: { src: "/images/kcroc-al-mullah-complex-hawalli-exterior.webp", alt: "Shop front day", width: 1200, height: 800 } },
  { category: 'Workshop', image: { src: "/images/kcroc-al-mullah-complex-basement-shop-entrance.webp", alt: "Shop entrance", width: 800, height: 600 } },
  { category: 'Workshop', image: { src: "/images/kcroc-technicians-laptop-repair-workbench.webp", alt: "Technician workbench", width: 1200, height: 800 } },
  { category: 'Workshop', image: { src: "/images/kcroc-laptop-repair-parts-inventory-shelves.webp", alt: "Parts inventory", width: 1000, height: 800 } },
  { category: 'Workshop', image: { src: "/images/shop-photo.webp", alt: "Interior view", width: 1200, height: 800 } },
  { category: 'Workshop', image: { src: "/images/kcroc-computer-repair-technician-team.webp", alt: "Our team", width: 1200, height: 630 } },

  // --- LAPTOP REPAIRS ---
  { category: 'Laptops', image: { src: "/images/laptop-repair.webp", alt: "Laptop repair service", width: 1200, height: 630 } },
  { category: 'Laptops', image: { src: "/images/technician-holding-opened-macbook-for-repair.webp", alt: "MacBook repair", width: 1200, height: 630 } },
  { category: 'Laptops', image: { src: "/images/broken-laptop-hinge-plastic-chassis-damage.webp", alt: "Hinge repair", width: 800, height: 600 } },
  { category: 'Laptops', image: { src: "/images/clogged-laptop-cooling-fan-dust-cleaning.webp", alt: "Fan cleaning", width: 800, height: 600 } },
  { category: 'Laptops', image: { src: "/images/macbook-internal-battery-swollen-replacement.webp", alt: "Battery replacement", width: 800, height: 600 } },
  { category: 'Laptops', image: { src: "/images/laptop-screen-bezel-and-hinge-fabrication.webp", alt: "Screen repair", width: 800, height: 600 } },

  // --- MOTHERBOARDS & CHIP-LEVEL ---
  { category: 'Motherboards', image: { src: "/images/motherboard-repair.webp", alt: "Motherboard repair", width: 1200, height: 630 } },
  { category: 'Motherboards', image: { src: "/images/apple-macbook-logic-board-and-fan-repair.webp", alt: "MacBook logic board", width: 1000, height: 600 } },
  { category: 'Motherboards', image: { src: "/images/laptop-copper-heatsink-removal-motherboard.webp", alt: "Heatsink removal", width: 800, height: 600 } },
  { category: 'Motherboards', image: { src: "/images/gigabyte-aorus-motherboard-cpu-thermal-paste-inspection.webp", alt: "Aorus motherboard", width: 800, height: 600 } },

  // --- GAMING PCS ---
  { category: 'Gaming PCs', image: { src: "/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp", alt: "Gaming PC diagnostics", width: 1200, height: 630 } },
  { category: 'Gaming PCs', image: { src: "/images/asus-rog-gaming-pc-rgb-case-build.webp", alt: "ROG Gaming PC", width: 1200, height: 800 } },
  { category: 'Gaming PCs', image: { src: "/images/geforce-rtx-gaming-pc-rgb-lighting.webp", alt: "RTX Gaming PC", width: 1200, height: 800 } },
  { category: 'Gaming PCs', image: { src: "/images/custom-water-cooled-gaming-pc-build.webp", alt: "Water cooled PC", width: 1200, height: 800 } },

  // --- HARDWARE MAINTENANCE ---
  { category: 'Hardware Maintenance', image: { src: "/images/laptop-thermal-paste-application-service.webp", alt: "Thermal paste application", width: 800, height: 600 } },
  { category: 'Hardware Maintenance', image: { src: "/images/intel-wifi-card-laptop-motherboard-repair.webp", alt: "Wifi card repair", width: 800, height: 600 } },
  { category: 'Hardware Maintenance', image: { src: "/images/aptop-cooling-fan-replacements.webp", alt: "Fan replacement", width: 800, height: 600 } },
  { category: 'Hardware Maintenance', image: { src: "/images/kioxia-128gb-m2-ssd-laptop-storage-upgrade.webp", alt: "SSD upgrade", width: 800, height: 600 } }
] as const;
