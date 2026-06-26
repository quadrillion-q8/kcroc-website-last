// File: src/constants/aiPagesData.ts
import { BUSINESS_INFO } from './data';

export interface AIPageData {
  slug: string;
  entityId: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
}

export const AI_PAGES_DATA: Record<string, AIPageData> = {
  "slow-laptop-fix-kuwait": {
    slug: "slow-laptop-fix-kuwait",
    entityId: "slow-laptop",
    h1: "How to Fix a Slow Laptop in Kuwait: The Ultimate Guide",
    metaTitle: "Slow Laptop Fix in Kuwait | Fast SSD & RAM Upgrades",
    metaDescription: "Is your laptop freezing or running extremely slow? Learn the top solutions, from SSD upgrades to virus removal. KCROC offers free pickup across Kuwait.",
    intro: "A slow laptop can destroy your productivity, whether you are working from an office in Salmiya or studying at home. Hardware degradation, failing hard drives (HDD), thermal throttling, and background malware are the most common culprits. Our central lab is located in Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. We provide a completely free pick and drop service across all governorates, ensuring your device is upgraded and optimized without you ever having to leave your desk.",
    sections: [
      {
        heading: "1. The SSD Upgrade: The Instant Speed Boost",
        content: "The number one cause of a slow laptop is an aging mechanical hard drive. Upgrading to a Solid State Drive (SSD) can make your computer up to 10x faster. Boot times drop from minutes to seconds, and applications open instantly."
      },
      {
        heading: "2. Thermal Throttling & Overheating",
        content: "Kuwait's climate means laptops pull in a lot of dust, quickly blocking cooling fans and exhaust vents. When your processor gets too hot, it automatically slows down (thermal throttling) to prevent damage. A deep clean and thermal paste replacement instantly restores lost performance."
      },
      {
        heading: "3. RAM (Memory) Upgrades",
        content: "If your laptop freezes when you have multiple Google Chrome tabs open, you are likely running out of RAM. Upgrading from 4GB or 8GB to 16GB or 32GB allows for seamless multitasking."
      }
    ],
    faqs: [
      {
        q: "How long does it take to fix a slow laptop?",
        a: "If the issue is hardware-related (like an SSD upgrade or RAM installation), we typically complete the work within 24 hours. Because we include free pick and drop, the entire turnaround is incredibly fast."
      },
      {
        q: "Will I lose my files if I upgrade to an SSD?",
        a: "No. We safely clone your existing operating system, files, and programs directly to the new SSD. Your computer will look exactly the same, just much faster."
      }
    ]
  },
  "macbook-repair-kuwait": {
    slug: "macbook-repair-kuwait",
    entityId: "macbook-repair",
    h1: "Expert MacBook Repair Services in Kuwait",
    metaTitle: "MacBook Repair Kuwait | Screen, Battery & Logic Board",
    metaDescription: "Professional Apple MacBook repair in Kuwait. We fix MacBook Pro and Air screens, batteries, and logic boards with a strict No Fix, No Fee policy.",
    intro: "Apple MacBooks require specialized diagnostic tools and micro-soldering expertise. Whether you have a cracked Retina display on your MacBook Pro, a swollen battery, or a completely dead logic board from liquid damage, our specialized technicians can help. Based in Hawalli (Al Mullah Complex, Basement Shop 19), we provide comprehensive Apple repairs. We strictly offer a free pick and drop service for all repairs, so your MacBook is collected safely and returned fully functional with a 30-day warranty.",
    sections: [
      {
        heading: "MacBook Screen Replacement",
        content: "A cracked screen or a display with vertical lines requires a full top-assembly replacement. We source high-quality Retina displays that restore the exact color accuracy and brightness of your original screen."
      },
      {
        heading: "Logic Board Diagnostics & Repair",
        content: "Liquid spills are the most common cause of a dead MacBook. Instead of replacing the entire expensive logic board, our chip-level technicians locate the exact short-circuited capacitors and replace them, saving you hundreds of Dinars."
      }
    ],
    faqs: [
      {
        q: "Do you fix vintage or older MacBook models?",
        a: "Yes, we service a wide range of Apple devices, including older MacBook Pros. We can breathe new life into vintage models with SSD and battery upgrades."
      },
      {
        q: "Is there a diagnostic fee for MacBooks?",
        a: "No. Diagnostics are completely free. You only pay if you approve the final quote for the repair."
      }
    ]
  }
};
