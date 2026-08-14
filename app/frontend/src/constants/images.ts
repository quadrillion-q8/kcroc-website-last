// File: src/constants/images.ts

export const IMAGES = {
  // --- BRANDING & SHOP ---
  brand: {
    shopExteriorDusk: { src: "/images/kcroc-commercial-complex-view-dusk.webp", alt: "KCROC shop exterior at dusk", width: 1200, height: 800 },
    shopExteriorDay: { src: "/images/kcroc-al-mullah-complex-hawalli-exterior.webp", alt: "KCROC shop front daytime", width: 1200, height: 800 },
    shopExteriorNight: { src: "/images/kcroc-al-mullah-complex-hawalli-night-view.webp", alt: "KCROC shop night view", width: 1200, height: 800 },
    shopEntrance: { src: "/images/kcroc-al-mullah-complex-basement-shop-entrance.webp", alt: "KCROC shop entrance", width: 800, height: 600 },
    shopInterior: { src: "/images/computer-repair-shop-hawalli-kuwait.webp", alt: "Interior of KCROC shop", width: 1200, height: 800 },
    inventory: { src: "/images/kcroc-laptop-repair-parts-inventory-shelves.webp", alt: "Spare parts inventory", width: 1000, height: 800 },
    team: { src: "/images/kcroc-computer-repair-technician-team.webp", alt: "KCROC technical team", width: 1200, height: 630 },
    owner: { src: "/images/kcroc-imran-natiq-laptop-repair-workshop-owner.webp", alt: "Workshop owner Imran Natiq", width: 800, height: 800 },
    cofounder: { src: "/images/kcroc-team-member-imran-hat-fun.webp", alt: "KCROC Team Member", width: 400, height: 400 },
    technicians: { src: "/images/kcroc-laptop-repair-technicians-hawalli-kuwait.webp", alt: "Technicians at work", width: 1200, height: 800 },
    leadTechnician: { src: "/images/kcroc-lead-technician-laptop-repair-workbench.webp", alt: "Lead technician working", width: 1200, height: 800 },
    pcDoctor: { src: "/images/kcroc-pc-doctor-windows-repair-services.webp", alt: "PC Doctor services", width: 800, height: 600 },
    teamFun: { src: "/images/kcroc-team-member-imran-hat-fun.webp", alt: "KCROC team fun", width: 800, height: 800 },
    logo: { src: "/logo.webp", alt: "KCROC Logo", width: 224, height: 224 },
    // ✅ Updated to the verified lead technician workbench image
    heroBanner: { 
      src: "/images/kcroc-lead-technician-laptop-repair-workbench.webp", 
      alt: "Professional technician working on a laptop at the KCROC workshop in Hawalli", 
      width: 1200, 
      height: 600 
    }
  },

  // --- GENERAL SERVICES ---
  services: {
    laptopRepair: { src: "/images/laptop-repair-kuwait.webp", alt: "Professional laptop repair in Kuwait", width: 1200, height: 630 },
    motherboardRepair: { src: "/images/motherboard-repair-kuwait.webp", alt: "Advanced chip-level motherboard repair", width: 1200, height: 630 },
    windowsInstall: { src: "/images/windows-os-software-repair-and-installation-kuwait.webp", alt: "Windows OS installation service", width: 1000, height: 600 },
    windows11Gaming: { src: "/images/windows-11-operating-system-installation-gaming-pc.webp", alt: "Windows 11 OS installation gaming PC", width: 1000, height: 600 },
    dellWindows: { src: "/images/dell-laptop-windows-operating-system-installation.webp", alt: "Dell laptop Windows OS installation", width: 1000, height: 600 },
    thermalService: { src: "/images/laptop-thermal-paste-application-service.webp", alt: "Thermal paste application service", width: 800, height: 600 }
  },

  // --- MACBOOK REPAIR ---
  macbook: {
    logicBoard: { src: "/images/apple-macbook-logic-board-and-fan-repair.webp", alt: "MacBook logic board repair", width: 1000, height: 600 },
    diagnostics: { src: "/images/technician-holding-opened-macbook-for-repair.webp", alt: "MacBook diagnostics", width: 1200, height: 630 },
    swollenBattery1: { src: "/images/swollen-apple-macbook-battery-replacement.webp", alt: "Swollen MacBook battery", width: 800, height: 600 },
    swollenBattery2: { src: "/images/swollen-macbook-battery-replacement-2.webp", alt: "MacBook battery replacement", width: 800, height: 600 },
    swollenBattery3: { src: "/images/swollen-macbook-internal-battery-replacement.webp", alt: "Internal battery replacement", width: 800, height: 600 },
    expandedBattery: { src: "/images/expanded-macbook-pro-battery-removal.webp", alt: "Expanded MacBook Pro battery removal", width: 800, height: 600 },
    hardwareRepair: { src: "/images/macbook-internal-battery-hardware-repair.webp", alt: "MacBook hardware repair", width: 800, height: 600 },
    service: { src: "/images/macbook-internal-battery-replacement-service.webp", alt: "MacBook battery service", width: 800, height: 600 }
  },

  // --- GAMING & CUSTOM PCs ---
  gaming: {
    rgbLighting: { src: "/images/custom-gaming-pc-build-rgb-lighting-kuwait.webp", alt: "Custom Gaming PC RGB Lighting", width: 1200, height: 800 },
    waterCooled: { src: "/images/custom-water-cooled-gaming-pc-build-kuwait.webp", alt: "Water cooled gaming PC build", width: 1200, height: 800 },
    msiGpuBuild: { src: "/images/custom-gaming-pc-msi-gpu-intel-cooler-build.webp", alt: "MSI GPU Intel Cooler Build", width: 1200, height: 800 },
    darkflashCooler: { src: "/images/custom-desktop-pc-msi-gpu-darkflash-cooler.webp", alt: "Darkflash Cooler Build", width: 1200, height: 800 },
    asusRogCase: { src: "/images/asus-rog-gaming-pc-rgb-case-build.webp", alt: "ASUS ROG RGB Case Build", width: 1200, height: 800 },
    rtxLighting: { src: "/images/geforce-rtx-gaming-pc-rgb-lighting.webp", alt: "GeForce RTX Gaming PC", width: 1200, height: 800 },
    deepcoolAio: { src: "/images/gaming-pc-deepcool-aio-liquid-cooler-installation.webp", alt: "Deepcool AIO Liquid Cooler", width: 1200, height: 800 },
    sleevedCables: { src: "/images/asus-rog-custom-pc-sleeved-cables.webp", alt: "Custom PC Sleeved Cables", width: 800, height: 600 },
    gpuUpgrade: { src: "/images/zotac-gaming-graphics-card-gpu-upgrade.webp", alt: "Zotac Gaming GPU Upgrade", width: 800, height: 600 },
    zotacCard: { src: "/images/technician-holding-zotac-gaming-graphics-card.webp", alt: "Zotac Gaming Graphics Card", width: 800, height: 600 },
    diagnostics: { src: "/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp", alt: "Gaming PC Diagnostics", width: 1200, height: 630 },
    ttCooler: { src: "/images/custom-pc-build-msi-motherboard-thermaltake-cooler.webp", alt: "MSI Motherboard Thermaltake Cooler", width: 1200, height: 800 },
    asusRogFan: { src: "/images/asus-rog-motherboard-vrm-cooling-fan.webp", alt: "ASUS ROG VRM Cooling Fan", width: 800, height: 600 },
    asusRogPaste: { src: "/images/asus-rog-z790-motherboard-cpu-thermal-paste.webp", alt: "ASUS ROG Z790 CPU Thermal Paste", width: 800, height: 600 },
    msiWorkstation: { src: "/images/msi-gaming-laptop-and-gpu-repair-workstation.webp", alt: "MSI Gaming Laptop Repair Workstation", width: 1200, height: 800 },
    nzxtFan: { src: "/images/nzxt-f120-rgb-core-case-fan.webp", alt: "NZXT F120 RGB Core Case Fan", width: 800, height: 600 },
    gamingLaptopFan: { src: "/images/gaming-laptop-dual-fan-motherboard-diagnostics.webp", alt: "Gaming Laptop Dual Fan Diagnostics", width: 800, height: 600 },
    gamingOverheating: { src: "/images/gaming-laptop-overheating-repair.webp", alt: "Gaming Laptop Overheating Repair", width: 800, height: 600 }
  },

  // --- UPGRADES: SSD & RAM ---
  upgrades: {
    ram8gb: { src: "/images/8gb-ddr4-ram-memory-upgrade.webp", alt: "8GB DDR4 RAM Upgrade", width: 800, height: 600 },
    ramHynix1: { src: "/images/installing-sk-hynix-8gb-ddr4-ram.webp", alt: "Installing SK Hynix 8GB DDR4 RAM", width: 800, height: 600 },
    ramHynix2: { src: "/images/sk-hynix-8gb-ddr4-laptop-ram-memory.webp", alt: "SK Hynix 8GB DDR4 Laptop RAM", width: 800, height: 600 },
    ramHynix3: { src: "/images/sk-hynix-pc3l-laptop-ram-memory-upgrade.webp", alt: "SK Hynix PC3L RAM Upgrade", width: 800, height: 600 },
    cpuI7: { src: "/images/intel-core-i7-14th-gen-cpu-upgrade.webp", alt: "Intel Core i7 14th Gen CPU Upgrade", width: 800, height: 600 },
    ssdCorsair: { src: "/images/corsair-mp600-core-xt-nvme-ssd-upgrade.webp", alt: "Corsair MP600 NVMe SSD Upgrade", width: 800, height: 600 },
    ssdKioxia: { src: "/images/kioxia-128gb-m2-ssd-laptop-storage-upgrade.webp", alt: "Kioxia 128GB M.2 SSD Upgrade", width: 800, height: 600 },
    ssdLexar1: { src: "/images/lexar-256gb-sata-ssd-laptop-upgrade.webp", alt: "Lexar 256GB SATA SSD Upgrade", width: 800, height: 600 },
    ssdLexar2: { src: "/images/lexar-nm620-m2-nvme-ssd-installation.webp", alt: "Lexar NM620 M.2 SSD Installation", width: 800, height: 600 },
    ssdLexar3: { src: "/images/lexar-ssd-installation-laptop-internals.webp", alt: "Lexar SSD Installation", width: 800, height: 600 },
    ssdSamsung1: { src: "/images/samsung-960-evo-nvme-m2-ssd-250gb.webp", alt: "Samsung 960 EVO NVMe M.2 SSD", width: 800, height: 600 },
    ssdSamsung2: { src: "/images/samsung-ssd-laptop-upgrade-kuwait.webp", alt: "Samsung SSD Laptop Upgrade", width: 800, height: 600 },
    ssdWDBlack: { src: "/images/wd-black-sn850-1tb-nvme-ssd-upgrade.webp", alt: "WD Black SN850 1TB NVMe SSD", width: 800, height: 600 },
    ssdWDBlue: { src: "/images/wd-blue-2tb-nvme-ssd-upgrade-part.webp", alt: "WD Blue 2TB NVMe SSD", width: 800, height: 600 },
    ssdMicron: { src: "/images/micron-m2-nvme-ssd-laptop-storage.webp", alt: "Micron M.2 NVMe SSD", width: 800, height: 600 },
    ssdM2Install: { src: "/images/m2-nvme-ssd-motherboard-installation.webp", alt: "M.2 NVMe SSD Installation", width: 800, height: 600 },
    ssdNewPart: { src: "/images/new-m2-nvme-ssd-replacement-part.webp", alt: "New M.2 NVMe SSD Part", width: 800, height: 600 },
    hddSeagate: { src: "/images/seagate-1tb-mobile-hdd-laptop-hard-drive.webp", alt: "Seagate 1TB Mobile HDD", width: 800, height: 600 },
    hddCaddy: { src: "/images/laptop-sata-2nd-hdd-caddy-9-5mm.webp", alt: "Laptop SATA 2nd HDD Caddy", width: 800, height: 600 },
    miniPcCrucial: { src: "/images/mini-pc-crucial-ddr5-ram-and-nvme-ssd-upgrade.webp", alt: "Mini PC Crucial DDR5 RAM & SSD Upgrade", width: 800, height: 600 }
  },

  // --- MOTHERBOARD & THERMAL PASTE ---
  motherboard: {
    cpuI9: { src: "/images/intel-core-i9-13900k-cpu-asus-rog-motherboard.webp", alt: "Intel Core i9 on ASUS ROG Motherboard", width: 800, height: 600 },
    cpuRyzen: { src: "/images/amd-ryzen-7-cpu-motherboard-installation.webp", alt: "AMD Ryzen 7 CPU Installation", width: 800, height: 600 },
    gigabyteAorus: { src: "/images/gigabyte-aorus-motherboard-cpu-thermal-paste-inspection.webp", alt: "Gigabyte Aorus Thermal Paste Inspection", width: 800, height: 600 },
    breadboarding: { src: "/images/breadboarding-motherboard-with-corsair-power-supply.webp", alt: "Breadboarding Motherboard", width: 800, height: 600 },
    thermalGrizzly1: { src: "/images/applying-thermal-grizzly-kryonaut-extreme-paste.webp", alt: "Applying Thermal Grizzly Kryonaut", width: 800, height: 600 },
    thermalGrizzly2: { src: "/images/thermal-grizzly-kryonaut-extreme-packaging.webp", alt: "Thermal Grizzly Kryonaut Packaging", width: 800, height: 600 },
    thermalGrizzly3: { src: "/images/thermal-grizzly-kryonaut-extreme-syringe.webp", alt: "Thermal Grizzly Kryonaut Syringe", width: 800, height: 600 },
    thermalArctic: { src: "/images/arctic-mx6-thermal-paste-application-laptop-motherboard.webp", alt: "Arctic MX-6 Thermal Paste Application", width: 800, height: 600 },
    thermalCorsair: { src: "/images/corsair-tm30-performance-thermal-paste.webp", alt: "Corsair TM30 Thermal Paste", width: 800, height: 600 },
    thermalM12: { src: "/images/m12-high-performance-thermal-paste-jar.webp", alt: "M12 High Performance Thermal Paste", width: 800, height: 600 }
  },

  // --- HARDWARE MAINTENANCE ---
  laptopHardware: {
    brokenHinge: { src: "/images/broken-laptop-hinge-plastic-chassis-damage.webp", alt: "Broken laptop hinge chassis damage", width: 800, height: 600 },
    screenBezel: { src: "/images/laptop-screen-bezel-and-hinge-fabrication.webp", alt: "Laptop screen bezel and hinge", width: 800, height: 600 },
    cloggedFan: { src: "/images/dusty-laptop-cooling-fans-replacement.webp", alt: "Dusty laptop cooling fan replacement", width: 800, height: 600 },
    fanReplace1: { src: "/images/laptop-cooling-fan-replacements.webp", alt: "Laptop cooling fan replacement", width: 800, height: 600 },
    fanReplace2: { src: "/images/new-laptop-cooling-fan-assembly-replacement.webp", alt: "New laptop cooling fan assembly", width: 800, height: 600 },
    dualFanInspect: { src: "/images/dual-laptop-cooling-fan-assembly-inspection.webp", alt: "Dual laptop cooling fan inspection", width: 800, height: 600 },
    copperHeatsink1: { src: "/images/laptop-copper-heatsink-removal-motherboard.webp", alt: "Copper heatsink removal", width: 800, height: 600 },
    copperHeatsink2: { src: "/images/laptop-copper-heatsink-thermal-repair.webp", alt: "Copper heatsink thermal repair", width: 800, height: 600 },
    copperHeatsink3: { src: "/images/laptop-copper-heatsink-with-dried-thermal-paste.webp", alt: "Copper heatsink dried thermal paste", width: 800, height: 600 },
    dustyMotherboard: { src: "/images/laptop-motherboard-dusty-fan-and-wifi-card.webp", alt: "Dusty motherboard fan and wifi card", width: 800, height: 600 },
    laptopSpareParts: { src: "/images/laptop-spare-parts-screen-battery-keyboard-fans.webp", alt: "Laptop spare parts", width: 800, height: 600 },
    chargerInventory: { src: "/images/laptop-charger-power-adapter-inventory.webp", alt: "Laptop charger inventory", width: 800, height: 600 },
    asusAdapter: { src: "/images/asus-laptop-power-adapter-charger-repair-kuwait.webp", alt: "ASUS laptop power adapter repair", width: 800, height: 600 },
    dellAdapter: { src: "/images/dell-90w-ac-adapter-laptop-charger.webp", alt: "Dell 90W AC adapter", width: 800, height: 600 },
    dellTeardown: { src: "/images/dell-laptop-internal-hardware-teardown.webp", alt: "Dell laptop internal teardown", width: 800, height: 600 },
    dellRepair: { src: "/images/dell-laptop-open-chassis-hardware-repair.webp", alt: "Dell laptop chassis hardware repair", width: 800, height: 600 },
    dellChassis: { src: "/images/dell-latitude-laptop-bottom-chassis-inspection.webp", alt: "Dell Latitude chassis inspection", width: 800, height: 600 },
    getacBattery: { src: "/images/getac-laptop-rechargeable-battery-replacement.webp", alt: "Getac laptop battery replacement", width: 800, height: 600 },
    hpAio: { src: "/images/hp-all-in-one-desktop-pc-hardware-repair.webp", alt: "HP All-in-One PC hardware repair", width: 800, height: 600 },
    hpBattery1: { src: "/images/hp-ht03xl-laptop-battery-replacement.webp", alt: "HP HT03XL battery replacement", width: 800, height: 600 },
    hpBattery2: { src: "/images/hp-laptop-battery-replacement-service.webp", alt: "HP laptop battery service", width: 800, height: 600 },
    hpBattery3: { src: "/images/hp-notebook-battery-replacement.webp", alt: "HP notebook battery replacement", width: 800, height: 600 },
    hpAdapter1: { src: "/images/hp-laptop-ac-power-adapter-replacement.webp", alt: "HP AC power adapter replacement", width: 800, height: 600 },
    hpAdapter2: { src: "/images/hp-laptop-power-adapter-charger-replacement.webp", alt: "HP power adapter charger replacement", width: 800, height: 600 },
    hpTeardown: { src: "/images/hp-laptop-internal-hardware-diagnostics-teardown.webp", alt: "HP internal hardware diagnostics", width: 800, height: 600 },
    hpProbook: { src: "/images/hp-probook-windows-11-laptop-repair.webp", alt: "HP ProBook Windows 11 repair", width: 800, height: 600 },
    lenovoAio: { src: "/images/lenovo-ideacentre-all-in-one-desktop-repair.webp", alt: "Lenovo IdeaCentre AIO repair", width: 800, height: 600 },
    toshibaDiagnostics: { src: "/images/toshiba-laptop-windows-os-software-diagnostics.webp", alt: "Toshiba laptop OS diagnostics", width: 800, height: 600 },
    razerBsod: { src: "/images/razer-laptop-blue-screen-of-death-bsod-error-kuwait.webp", alt: "Razer laptop BSOD repair", width: 800, height: 600 },
    projectorRepair: { src: "/images/projector-and-laptop-hardware-repair-storage-kuwait.webp", alt: "Projector and laptop repair", width: 800, height: 600 },
    miniPcDiagnostics: { src: "/images/mini-pc-internal-hardware-diagnostics-and-upgrade.webp", alt: "Mini PC hardware diagnostics", width: 800, height: 600 },
    gefenMatrix: { src: "/images/gefen-toolbox-4k-ultra-hd-hdmi-matrix.webp", alt: "Gefen Toolbox 4K HDMI Matrix", width: 800, height: 600 },
    cat6Cable: { src: "/images/blue-cat6-ethernet-network-cable-installation.webp", alt: "CAT6 ethernet cable installation", width: 800, height: 600 },
    wifiIntel1: { src: "/images/intel-8265ngw-dual-band-wireless-wifi-card.webp", alt: "Intel 8265NGW Wi-Fi card", width: 800, height: 600 },
    wifiIntel2: { src: "/images/intel-dual-band-wireless-card-installation.webp", alt: "Intel dual-band wireless card install", width: 800, height: 600 },
    wifiIntel3: { src: "/images/intel-wifi-card-laptop-motherboard-repair-kuwait.webp", alt: "Intel Wi-Fi card motherboard repair", width: 800, height: 600 },
    wifiLaptop1: { src: "/images/laptop-wifi-network-card.webp", alt: "Laptop Wi-Fi network card", width: 800, height: 600 },
    wifiLaptop2: { src: "/images/laptop-wireless-network-card-replacement.webp", alt: "Laptop wireless card replacement", width: 800, height: 600 },
    intelHeatsink: { src: "/images/intel-stock-cpu-cooler-heatsink-replacement.webp", alt: "Intel stock CPU cooler replacement", width: 800, height: 600 }
  }
} as const;
