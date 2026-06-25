// File: src/constants/locationAreas.ts
// ✅ Renamed to avoid collision with AREAS in data.ts

import { IMAGES } from './images';

// ✅ Fallback image used for all area pages until area-specific images exist
const AREA_HERO = IMAGES.brand.teamWorkbench;

export const LOCATION_AREAS = {
  hawalli: {
    slug: "hawalli",
    name: "Hawalli",
    title: "Computer Repair Hawalli | Laptop, PC & MacBook Repair",
    h1: "Computer Repair Services in Hawalli",
    description:
      "Professional computer repair in Hawalli for laptops, desktop PCs, MacBooks, gaming computers, virus removal, SSD upgrades and motherboard repair.",
    keywords: [
      "computer repair hawalli",
      "laptop repair hawalli",
      "pc repair hawalli",
      "macbook repair hawalli",
      "gaming pc repair hawalli",
      "virus removal hawalli",
      "computer technician hawalli",
      "desktop repair hawalli",
      // ✅ Fixed: removed data recovery (service discontinued)
    ],
    image: AREA_HERO,
    landmark: "Ibn Khaldoun Street",
    coordinates: { lat: 29.3375, lng: 48.0286 },
    nearbyAreas: ["Salmiya", "Jabriya", "Bayan", "Mishref"],
    localContent:
      "We provide fast and reliable computer repair services throughout Hawalli. Our technicians repair laptops, desktop PCs, MacBooks, gaming computers, storage devices and business workstations.",
    faq: [
      {
        question: "Do you provide same-day computer repair in Hawalli?",
        answer: "Yes. Many software issues, upgrades and diagnostics can be completed the same day."
      },
      {
        question: "Do you repair MacBooks in Hawalli?",
        answer: "Yes. We repair MacBooks, iMacs and Apple computers including hardware and software issues."
      },
      {
        question: "Do you offer free pickup in Hawalli?",
        // ✅ Fixed: replaced home visit FAQ with free pickup (more accurate to KCROC model)
        answer: "Yes. We offer free pickup and delivery for all repairs across Hawalli."
      }
    ]
  },

  salmiya: {
    slug: "salmiya",
    name: "Salmiya",
    title: "Computer Repair Salmiya | Laptop & MacBook Repair",
    h1: "Computer Repair Services in Salmiya",
    description:
      "Expert computer repair services in Salmiya including laptop repair, MacBook repair, gaming PC troubleshooting, SSD upgrades and business IT support.",
    keywords: [
      "computer repair salmiya",
      "laptop repair salmiya",
      "macbook repair salmiya",
      "pc repair salmiya",
      "gaming pc repair salmiya",
      "computer technician salmiya",
      "desktop repair salmiya",
      "ssd upgrade salmiya",
      // ✅ Fixed: removed data recovery
    ],
    image: AREA_HERO,
    landmark: "Gulf Road",
    coordinates: { lat: 29.3368, lng: 48.0762 },
    nearbyAreas: ["Hawalli", "Jabriya", "Rumaithiya", "Salwa"],
    localContent:
      "Serving homes, offices and retail businesses across Salmiya with professional computer repair, laptop upgrades, virus removal and system optimization services.",
    faq: [
      {
        question: "Can you repair gaming PCs in Salmiya?",
        answer: "Yes. We diagnose hardware failures, overheating, GPU issues and performance problems."
      },
      {
        question: "Do you offer free pickup in Salmiya?",
        // ✅ Fixed: replaced data recovery FAQ with pickup FAQ
        answer: "Yes. Free pickup and delivery is available across all of Salmiya."
      },
      {
        question: "Do you provide SSD upgrades in Salmiya?",
        answer: "Yes. We install and configure SSD upgrades for faster boot times and improved performance."
      }
    ]
  },

  farwaniya: {
    slug: "farwaniya",
    name: "Farwaniya",
    title: "Computer Repair Farwaniya | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Farwaniya",
    description:
      "Reliable computer repair services in Farwaniya including laptop repair, desktop PC repair, MacBook service, virus removal and SSD upgrades.",
    keywords: [
      "computer repair farwaniya",
      "laptop repair farwaniya",
      "pc repair farwaniya",
      "macbook repair farwaniya",
      "computer technician farwaniya",
      "desktop repair farwaniya",
      "gaming pc repair farwaniya",
      "virus removal farwaniya",
      "ssd upgrade farwaniya",
      // ✅ Fixed: removed data recovery
    ],
    image: AREA_HERO,
    landmark: "Habib Munawar Street",
    coordinates: { lat: 29.2775, lng: 47.9586 },
    nearbyAreas: ["Khaitan", "Ardiya", "Omariya", "Andalous"],
    localContent:
      "Providing dependable computer repair services throughout Farwaniya with support for laptops, desktops, MacBooks, gaming systems and office computers.",
    faq: [
      {
        question: "Do you offer laptop repair in Farwaniya?",
        answer: "Yes. We repair laptop screens, keyboards, batteries, charging ports and motherboard issues."
      },
      {
        question: "Can you remove viruses from my computer?",
        answer: "Yes. Virus removal, malware cleanup and system optimization services are available."
      },
      {
        question: "Do you provide free pickup in Farwaniya?",
        // ✅ Fixed: replaced generic upgrades FAQ with pickup FAQ for consistency
        answer: "Yes. We offer free pickup and delivery across Farwaniya for all repair services."
      }
    ]
  },

  kuwaitcity: {
    slug: "kuwait-city",
    name: "Kuwait City",
    title: "Computer Repair Kuwait City | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Kuwait City",
    description:
      "Professional computer repair in Kuwait City for laptops, MacBooks, desktop PCs, gaming computers, virus removal and SSD upgrades.",
    keywords: [
      "computer repair kuwait city",
      "laptop repair kuwait city",
      "macbook repair kuwait city",
      "pc repair kuwait city",
      "gaming pc repair kuwait city",
      "computer technician kuwait city",
      "desktop repair kuwait city",
      "virus removal kuwait city",
    ],
    image: AREA_HERO,
    landmark: "Kuwait Towers area",
    coordinates: { lat: 29.3759, lng: 47.9774 },
    nearbyAreas: ["Sharq", "Mirqab", "Dasman", "Bneid Al Gar"],
    localContent:
      "Serving offices, businesses and residents across Kuwait City with expert laptop repair, MacBook service, gaming PC diagnostics and system optimization.",
    faq: [
      {
        question: "Do you repair laptops in Kuwait City?",
        answer: "Yes. We repair all major laptop brands including Dell, HP, Lenovo, ASUS and Apple."
      },
      {
        question: "Do you offer free pickup in Kuwait City?",
        answer: "Yes. Free pickup and delivery is available across all of Kuwait City."
      },
      {
        question: "Can you repair MacBooks in Kuwait City?",
        answer: "Yes. We handle MacBook logic board repair, battery replacement and screen replacement."
      }
    ]
  },

  jahra: {
    slug: "jahra",
    name: "Jahra",
    title: "Computer Repair Jahra | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Jahra",
    description:
      "Reliable computer repair in Jahra for laptops, desktop PCs, MacBooks, gaming systems, virus removal and hardware upgrades with free pickup.",
    keywords: [
      "computer repair jahra",
      "laptop repair jahra",
      "macbook repair jahra",
      "pc repair jahra",
      "computer technician jahra",
      "desktop repair jahra",
      "gaming pc repair jahra",
      "virus removal jahra",
    ],
    image: AREA_HERO,
    landmark: "Jahra Road",
    coordinates: { lat: 29.3375, lng: 47.6581 },
    nearbyAreas: ["Sulaibiya", "Naeem", "Oyoun", "Qasr"],
    localContent:
      "Providing professional computer repair services in Jahra with free pickup and delivery for laptops, desktops, MacBooks and gaming PCs.",
    faq: [
      {
        question: "Do you offer laptop repair in Jahra?",
        answer: "Yes. We repair laptops, screens, batteries and motherboard issues in Jahra."
      },
      {
        question: "Do you offer free pickup in Jahra?",
        answer: "Yes. We collect and deliver your device at no charge across Jahra."
      },
      {
        question: "Can you fix gaming PCs in Jahra?",
        answer: "Yes. We handle GPU diagnostics, overheating, performance tuning and hardware upgrades."
      }
    ]
  },

  ahmadi: {
    slug: "ahmadi",
    name: "Ahmadi",
    title: "Computer Repair Ahmadi | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Ahmadi",
    description:
      "Expert computer repair in Ahmadi for laptops, MacBooks, desktop PCs, gaming systems, virus removal and SSD upgrades with free pickup.",
    keywords: [
      "computer repair ahmadi",
      "laptop repair ahmadi",
      "macbook repair ahmadi",
      "pc repair ahmadi",
      "computer technician ahmadi",
      "desktop repair ahmadi",
      "virus removal ahmadi",
      "ssd upgrade ahmadi",
    ],
    image: AREA_HERO,
    landmark: "Ahmadi Park",
    coordinates: { lat: 29.0769, lng: 48.0838 },
    nearbyAreas: ["Fahaheel", "Mangaf", "Abu Halifa", "Riqqa"],
    localContent:
      "Delivering professional computer repair services to Ahmadi residents and businesses with free pickup and delivery across the governorate.",
    faq: [
      {
        question: "Do you repair laptops in Ahmadi?",
        answer: "Yes. We repair laptops, screens, batteries and charging ports across Ahmadi."
      },
      {
        question: "Do you offer free pickup in Ahmadi?",
        answer: "Yes. Free pickup and delivery is available across Ahmadi."
      },
      {
        question: "Can you upgrade my laptop SSD in Ahmadi?",
        answer: "Yes. We install and configure SSD upgrades for faster performance."
      }
    ]
  },

  fahaheel: {
    slug: "fahaheel",
    name: "Fahaheel",
    title: "Computer Repair Fahaheel | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Fahaheel",
    description:
      "Professional computer repair in Fahaheel for laptops, MacBooks, desktop PCs, gaming computers, virus removal and hardware upgrades.",
    keywords: [
      "computer repair fahaheel",
      "laptop repair fahaheel",
      "macbook repair fahaheel",
      "pc repair fahaheel",
      "computer technician fahaheel",
      "desktop repair fahaheel",
      "gaming pc repair fahaheel",
      "virus removal fahaheel",
    ],
    image: AREA_HERO,
    landmark: "Fahaheel Park",
    coordinates: { lat: 29.0833, lng: 48.1333 },
    nearbyAreas: ["Ahmadi", "Mangaf", "Abu Halifa", "Mahboula"],
    localContent:
      "Serving Fahaheel residents and businesses with reliable laptop repair, MacBook service, gaming PC diagnostics and system optimization.",
    faq: [
      {
        question: "Do you repair laptops in Fahaheel?",
        answer: "Yes. We repair all major laptop brands including screen, battery and motherboard issues."
      },
      {
        question: "Do you offer free pickup in Fahaheel?",
        answer: "Yes. We provide free pickup and delivery across Fahaheel."
      },
      {
        question: "Can you repair MacBooks in Fahaheel?",
        answer: "Yes. We handle MacBook logic board repair, battery and screen replacement."
      }
    ]
  },

  mangaf: {
    slug: "mangaf",
    name: "Mangaf",
    title: "Computer Repair Mangaf | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Mangaf",
    description:
      "Reliable computer repair in Mangaf for laptops, desktop PCs, MacBooks, gaming systems, virus removal and SSD upgrades with free pickup.",
    keywords: [
      "computer repair mangaf",
      "laptop repair mangaf",
      "macbook repair mangaf",
      "pc repair mangaf",
      "computer technician mangaf",
      "desktop repair mangaf",
      "virus removal mangaf",
      "ssd upgrade mangaf",
    ],
    image: AREA_HERO,
    landmark: "Mangaf Beach area",
    coordinates: { lat: 29.1167, lng: 48.1333 },
    nearbyAreas: ["Fahaheel", "Abu Halifa", "Ahmadi", "Mahboula"],
    localContent:
      "Providing expert computer repair services in Mangaf with free pickup and delivery for laptops, desktops, MacBooks and gaming PCs.",
    faq: [
      {
        question: "Do you repair laptops in Mangaf?",
        answer: "Yes. We repair screens, batteries, keyboards and motherboard issues."
      },
      {
        question: "Do you offer free pickup in Mangaf?",
        answer: "Yes. Free pickup and delivery is available across Mangaf."
      },
      {
        question: "Can you remove viruses in Mangaf?",
        answer: "Yes. We provide virus removal and system cleanup services."
      }
    ]
  },

  mahboula: {
    slug: "mahboula",
    name: "Mahboula",
    title: "Computer Repair Mahboula | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Mahboula",
    description:
      "Expert computer repair in Mahboula for laptops, MacBooks, desktop PCs, gaming computers, virus removal and hardware upgrades.",
    keywords: [
      "computer repair mahboula",
      "laptop repair mahboula",
      "macbook repair mahboula",
      "pc repair mahboula",
      "computer technician mahboula",
      "desktop repair mahboula",
      "virus removal mahboula",
      "ssd upgrade mahboula",
    ],
    image: AREA_HERO,
    landmark: "Coastal Road",
    coordinates: { lat: 29.1000, lng: 48.1333 },
    nearbyAreas: ["Mangaf", "Fahaheel", "Abu Halifa", "Fintas"],
    localContent:
      "Delivering reliable computer repair services to Mahboula with free pickup and delivery for all laptop, desktop and MacBook repairs.",
    faq: [
      {
        question: "Do you repair laptops in Mahboula?",
        answer: "Yes. We repair all major laptop brands with screen, battery and motherboard services."
      },
      {
        question: "Do you offer free pickup in Mahboula?",
        answer: "Yes. We provide free pickup and delivery across Mahboula."
      },
      {
        question: "Can you repair gaming PCs in Mahboula?",
        answer: "Yes. We handle overheating, GPU diagnostics and performance optimization."
      }
    ]
  },

  abuhalifa: {
    slug: "abu-halifa",
    name: "Abu Halifa",
    title: "Computer Repair Abu Halifa | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Abu Halifa",
    description:
      "Professional computer repair in Abu Halifa for laptops, MacBooks, desktop PCs, gaming systems, virus removal and SSD upgrades.",
    keywords: [
      "computer repair abu halifa",
      "laptop repair abu halifa",
      "macbook repair abu halifa",
      "pc repair abu halifa",
      "computer technician abu halifa",
      "desktop repair abu halifa",
      "virus removal abu halifa",
    ],
    image: AREA_HERO,
    landmark: "Abu Halifa Park",
    coordinates: { lat: 29.1000, lng: 48.1167 },
    nearbyAreas: ["Fahaheel", "Mangaf", "Mahboula", "Ahmadi"],
    localContent:
      "Providing professional computer repair services in Abu Halifa with free pickup and delivery for laptops, desktops and MacBooks.",
    faq: [
      {
        question: "Do you repair laptops in Abu Halifa?",
        answer: "Yes. We repair screens, batteries, keyboards and motherboard issues."
      },
      {
        question: "Do you offer free pickup in Abu Halifa?",
        answer: "Yes. Free pickup and delivery is available across Abu Halifa."
      },
      {
        question: "Can you upgrade my SSD in Abu Halifa?",
        answer: "Yes. We install SSD upgrades for faster laptop and desktop performance."
      }
    ]
  },

  khaitan: {
    slug: "khaitan",
    name: "Khaitan",
    title: "Computer Repair Khaitan | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Khaitan",
    description:
      "Reliable computer repair in Khaitan for laptops, desktop PCs, MacBooks, gaming computers, virus removal and hardware upgrades with free pickup.",
    keywords: [
      "computer repair khaitan",
      "laptop repair khaitan",
      "macbook repair khaitan",
      "pc repair khaitan",
      "computer technician khaitan",
      "desktop repair khaitan",
      "gaming pc repair khaitan",
      "virus removal khaitan",
    ],
    image: AREA_HERO,
    landmark: "Khaitan Park",
    coordinates: { lat: 29.3000, lng: 47.9667 },
    nearbyAreas: ["Farwaniya", "Ardiya", "Omariya", "Reggae"],
    localContent:
      "Serving Khaitan residents and businesses with expert computer repair, laptop upgrades, virus removal and gaming PC diagnostics.",
    faq: [
      {
        question: "Do you repair laptops in Khaitan?",
        answer: "Yes. We repair screens, batteries, keyboards and charging port issues."
      },
      {
        question: "Do you offer free pickup in Khaitan?",
        answer: "Yes. We provide free pickup and delivery across Khaitan."
      },
      {
        question: "Can you remove viruses in Khaitan?",
        answer: "Yes. Virus removal and system optimization services are available."
      }
    ]
  },

  sabahalsalem: {
    slug: "sabah-al-salem",
    name: "Sabah Al Salem",
    title: "Computer Repair Sabah Al Salem | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Sabah Al Salem",
    description:
      "Expert computer repair in Sabah Al Salem for laptops, MacBooks, desktop PCs, gaming systems, virus removal and SSD upgrades.",
    keywords: [
      "computer repair sabah al salem",
      "laptop repair sabah al salem",
      "macbook repair sabah al salem",
      "pc repair sabah al salem",
      "computer technician sabah al salem",
      "desktop repair sabah al salem",
      "virus removal sabah al salem",
    ],
    image: AREA_HERO,
    landmark: "Sabah Al Salem Co-op",
    coordinates: { lat: 29.2667, lng: 48.0667 },
    nearbyAreas: ["Rumaithiya", "Salwa", "Bayan", "Mishref"],
    localContent:
      "Providing reliable computer repair services in Sabah Al Salem with free pickup and delivery for laptops, desktops and MacBooks.",
    faq: [
      {
        question: "Do you repair laptops in Sabah Al Salem?",
        answer: "Yes. We repair all major laptop brands with screen, battery and motherboard services."
      },
      {
        question: "Do you offer free pickup in Sabah Al Salem?",
        answer: "Yes. Free pickup and delivery is available across Sabah Al Salem."
      },
      {
        question: "Can you repair MacBooks in Sabah Al Salem?",
        answer: "Yes. We handle MacBook logic board repair, battery and screen replacement."
      }
    ]
  },

  mubarakcabeer: {
    slug: "mubarak-al-kabeer",
    name: "Mubarak Al Kabeer",
    title: "Computer Repair Mubarak Al Kabeer | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Mubarak Al Kabeer",
    description:
      "Professional computer repair in Mubarak Al Kabeer for laptops, MacBooks, desktop PCs, gaming computers, virus removal and hardware upgrades.",
    keywords: [
      "computer repair mubarak al kabeer",
      "laptop repair mubarak al kabeer",
      "macbook repair mubarak al kabeer",
      "pc repair mubarak al kabeer",
      "computer technician mubarak al kabeer",
      "desktop repair mubarak al kabeer",
      "virus removal mubarak al kabeer",
    ],
    image: AREA_HERO,
    landmark: "Mubarak Al Kabeer Center",
    coordinates: { lat: 29.2333, lng: 48.0833 },
    nearbyAreas: ["Sabah Al Salem", "Abu Halifa", "Fintas", "Funaitees"],
    localContent:
      "Delivering professional computer repair services to Mubarak Al Kabeer with free pickup and delivery for all laptop, desktop and MacBook repairs.",
    faq: [
      {
        question: "Do you repair laptops in Mubarak Al Kabeer?",
        answer: "Yes. We repair screens, batteries, keyboards and motherboard issues."
      },
      {
        question: "Do you offer free pickup in Mubarak Al Kabeer?",
        answer: "Yes. We provide free pickup and delivery across Mubarak Al Kabeer."
      },
      {
        question: "Can you upgrade my SSD in Mubarak Al Kabeer?",
        answer: "Yes. We install SSD upgrades for improved speed and storage."
      }
    ]
  },

  riqqa: {
    slug: "riqqa",
    name: "Riqqa",
    title: "Computer Repair Riqqa | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Riqqa",
    description:
      "Reliable computer repair in Riqqa for laptops, desktop PCs, MacBooks, gaming systems, virus removal and SSD upgrades with free pickup.",
    keywords: [
      "computer repair riqqa",
      "laptop repair riqqa",
      "macbook repair riqqa",
      "pc repair riqqa",
      "computer technician riqqa",
      "desktop repair riqqa",
      "virus removal riqqa",
    ],
    image: AREA_HERO,
    landmark: "Riqqa Co-op",
    coordinates: { lat: 29.1333, lng: 48.1333 },
    nearbyAreas: ["Fahaheel", "Mahboula", "Abu Halifa", "Mangaf"],
    localContent:
      "Serving Riqqa residents and businesses with expert computer repair, laptop upgrades and system optimization services.",
    faq: [
      {
        question: "Do you repair laptops in Riqqa?",
        answer: "Yes. We repair screens, batteries, keyboards and charging port issues."
      },
      {
        question: "Do you offer free pickup in Riqqa?",
        answer: "Yes. Free pickup and delivery is available across Riqqa."
      },
      {
        question: "Can you remove viruses in Riqqa?",
        answer: "Yes. Virus removal and system cleanup services are available."
      }
    ]
  },

  jleeb: {
    slug: "jleeb",
    name: "Jleeb",
    title: "Computer Repair Jleeb | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Jleeb",
    description:
      "Professional computer repair in Jleeb for laptops, MacBooks, desktop PCs, gaming computers, virus removal and hardware upgrades.",
    keywords: [
      "computer repair jleeb",
      "laptop repair jleeb",
      "macbook repair jleeb",
      "pc repair jleeb",
      "computer technician jleeb",
      "desktop repair jleeb",
      "virus removal jleeb",
    ],
    image: AREA_HERO,
    landmark: "Jleeb Stadium",
    coordinates: { lat: 29.3000, lng: 47.9833 },
    nearbyAreas: ["Farwaniya", "Khaitan", "Ardiya", "Reggae"],
    localContent:
      "Providing professional computer repair services in Jleeb with free pickup and delivery for laptops, desktops and MacBooks.",
    faq: [
      {
        question: "Do you repair laptops in Jleeb?",
        answer: "Yes. We repair all major laptop brands with screen, battery and motherboard services."
      },
      {
        question: "Do you offer free pickup in Jleeb?",
        answer: "Yes. Free pickup and delivery is available across Jleeb."
      },
      {
        question: "Can you repair gaming PCs in Jleeb?",
        answer: "Yes. We handle GPU diagnostics, overheating and performance optimization."
      }
    ]
  },

  shuwaikh: {
    slug: "shuwaikh",
    name: "Shuwaikh",
    title: "Computer Repair Shuwaikh | Laptop, PC & MacBook Service",
    h1: "Computer Repair Services in Shuwaikh",
    description:
      "Expert computer repair in Shuwaikh for laptops, MacBooks, desktop PCs, gaming systems, virus removal and SSD upgrades with free pickup.",
    keywords: [
      "computer repair shuwaikh",
      "laptop repair shuwaikh",
      "macbook repair shuwaikh",
      "pc repair shuwaikh",
      "computer technician shuwaikh",
      "desktop repair shuwaikh",
      "gaming pc repair shuwaikh",
      "virus removal shuwaikh",
    ],
    image: AREA_HERO,
    landmark: "Shuwaikh Industrial",
    coordinates: { lat: 29.3667, lng: 47.9333 },
    nearbyAreas: ["Kuwait City", "Dasma", "Qadsiya", "Nuzha"],
    localContent:
      "Serving businesses and residents in Shuwaikh with expert computer repair, laptop service, gaming PC diagnostics and system optimization.",
    faq: [
      {
        question: "Do you repair laptops in Shuwaikh?",
        answer: "Yes. We repair screens, batteries, keyboards and motherboard issues."
      },
      {
        question: "Do you offer free pickup in Shuwaikh?",
        answer: "Yes. We provide free pickup and delivery across Shuwaikh."
      },
      {
        question: "Can you repair business computers in Shuwaikh?",
        answer: "Yes. We service office computers, workstations and laptops for businesses."
      }
    ]
  },

} as const;

export type LocationAreaKey = keyof typeof LOCATION_AREAS;
export type LocationArea = (typeof LOCATION_AREAS)[LocationAreaKey];
