// File: src/constants/faqs.ts

export const GLOBAL_FAQS = [
  // ─── PICKUP & DELIVERY ───────────────────────────────────────────
  {
    id: "free-pickup",
    category: "Pickup & Delivery",
    question: "Do you really offer free pickup and delivery in Kuwait?",
    answer:
      "Yes. We provide free pickup and delivery across all governorates in Kuwait. We collect your computer or laptop from your home or office and return it after the repair is completed."
  },
  {
    id: "same-day-service",
    category: "Pickup & Delivery",
    question: "Do you offer same-day computer repair in Kuwait?",
    // ✅ Fixed: added 11 AM booking condition and excluded complex repairs
    answer:
      "Yes. Book before 11:00 AM for same-day return on eligible repairs including Windows installation, SSD upgrades, RAM upgrades, virus removal, and standard screen replacements. Complex motherboard and liquid damage repairs require 24–48 hours or more."
  },
  {
    id: "pickup-time",
    category: "Pickup & Delivery",
    question: "How quickly can you arrange pickup?",
    answer:
      "In many areas of Kuwait, pickup can usually be arranged within a few hours, depending on technician availability and scheduling."
  },
  {
    id: "business-pickup",
    category: "Pickup & Delivery",
    question: "Can you collect computers from offices?",
    answer:
      "Yes. We provide pickup and delivery services for homes, offices, schools, and businesses throughout Kuwait."
  },

  // ─── PRICING ─────────────────────────────────────────────────────
  {
    id: "no-fix-no-fee",
    category: "Pricing",
    question: "How does your 'No Fix, No Fee' policy work?",
    answer:
      "If we cannot repair your computer or laptop, you do not pay for the repair. We only charge for successful repairs that have been approved by you before work begins."
  },
  {
    id: "diagnostic-fee",
    category: "Pricing",
    question: "Do you charge a diagnostic fee?",
    // ✅ Fixed: removed ambiguous "advanced diagnostics may be charged" — diagnostics are always free
    answer:
      "No. All diagnostics are completely free. We assess your device, identify the fault, and provide a clear quote before any repair work begins."
  },
  {
    id: "repair-cost",
    category: "Pricing",
    question: "How much does computer repair cost?",
    answer:
      "Repair costs depend on the problem, replacement parts, and labor required. After diagnosing your device, we provide a clear quotation before starting any repair. You only pay if you approve the quote."
  },
  {
    id: "hidden-fees",
    category: "Pricing",
    question: "Are there any hidden charges?",
    answer:
      "No. We believe in transparent pricing. We never carry out additional work or replace parts without your explicit approval."
  },

  // ─── COMPUTER REPAIR ─────────────────────────────────────────────
  {
    id: "repair-time",
    category: "Computer Repair",
    question: "How long does a typical computer repair take?",
    // ✅ Fixed: reflects real range including same-day and complex repair timelines
    answer:
      "Eligible repairs booked before 11:00 AM — such as screen replacements, SSD upgrades, and Windows installation — are often completed the same day. Standard repairs take 24–48 hours. Complex motherboard and liquid damage repairs may require additional time depending on the fault."
  },

  // ─── SECURITY ────────────────────────────────────────────────────
  {
    id: "data-safety",
    category: "Security",
    question: "Is my data safe during the repair process?",
    // ✅ Fixed: aligned with strict no-snoop privacy policy
    answer:
      "Yes. We operate a strict no-snoop policy. Our technicians use diagnostic tools to identify hardware faults and never open, browse, or access your personal files. For motherboard-level repairs, you are welcome to remove your storage drive before handing the device to us."
  },
  {
    id: "keep-files",
    category: "Security",
    question: "Will my files remain on my computer during repair?",
    answer:
      "Most hardware repairs do not affect your files. However, we always recommend creating a backup before any repair. We do not provide data recovery services."
  },

  // ─── WARRANTY ────────────────────────────────────────────────────
  {
    id: "warranty",
    category: "Warranty",
    question: "Do you provide a warranty on your repairs?",
    // ✅ Fixed: explicit 30-day warranty matching site-wide claim
    answer:
      "Yes. Every successful repair is backed by a 30-day warranty covering parts and workmanship."
  },
  {
    id: "warranty-period",
    category: "Warranty",
    question: "How long is the repair warranty?",
    // ✅ Fixed: explicit 30 days
    answer:
      "All repairs carry a 30-day warranty on both parts and labor."
  },
  {
    id: "warranty-claim",
    category: "Warranty",
    question: "What if the same problem returns during the warranty period?",
    answer:
      "If the issue is covered under the 30-day warranty, we will inspect the device and carry out the necessary repair at no additional labor charge."
  },

  // ─── LAPTOP REPAIR ───────────────────────────────────────────────
  {
    id: "screen-replacement",
    category: "Laptop Repair",
    question: "Can you replace cracked laptop screens?",
    answer:
      "Yes. We replace damaged LCD and LED screens for most laptop brands using high-quality replacement displays."
  },
  {
    id: "battery-replacement",
    category: "Laptop Repair",
    question: "Can you replace laptop batteries?",
    answer:
      "Yes. We replace faulty laptop batteries with high-quality compatible or original batteries whenever available."
  },
  {
    id: "keyboard-repair",
    category: "Laptop Repair",
    question: "Can you repair or replace laptop keyboards?",
    answer:
      "Yes. We repair and replace damaged, worn-out, or non-functioning laptop keyboards for most major laptop brands."
  },
  {
    id: "charging-port",
    category: "Laptop Repair",
    question: "Can you repair laptop charging ports?",
    answer:
      "Yes. We repair or replace damaged DC power jacks and charging ports for laptops that are not charging properly."
  },

  // ─── HARDWARE UPGRADES ───────────────────────────────────────────
  {
    id: "ssd-upgrade",
    category: "Hardware Upgrades",
    question: "Can you upgrade my laptop to an SSD?",
    answer:
      "Yes. Upgrading to an SSD significantly improves startup time, application loading, and overall system performance."
  },
  {
    id: "ram-upgrade",
    category: "Hardware Upgrades",
    question: "Can you upgrade my laptop RAM?",
    answer:
      "Yes. We install compatible memory upgrades to improve multitasking and overall performance where the hardware supports expansion."
  },
  {
    id: "parts",
    category: "Hardware Upgrades",
    question: "Do you use genuine replacement parts?",
    answer:
      "Whenever possible, we use genuine or premium-quality compatible replacement parts and explain the available options before beginning the repair."
  },

  // ─── SOFTWARE ────────────────────────────────────────────────────
  {
    id: "windows-installation",
    category: "Software",
    question: "Can you reinstall Windows?",
    answer:
      "Yes. We perform clean Windows installations, install drivers, apply updates, and optimize the operating system for reliable performance."
  },
  {
    id: "virus-removal",
    category: "Software",
    question: "Can you remove viruses and malware?",
    answer:
      "Yes. We remove viruses, malware, spyware, and unwanted software while helping improve your computer's security and performance."
  },
  {
    id: "slow-computer",
    category: "Software",
    question: "Can you fix a slow computer?",
    answer:
      "Yes. We diagnose performance issues, remove unnecessary software, optimize Windows, and recommend hardware upgrades when appropriate."
  },

  // ─── GAMING PCS ──────────────────────────────────────────────────
  {
    id: "gaming-pc",
    category: "Gaming PCs",
    question: "Do you build or upgrade custom gaming PCs?",
    answer:
      "Yes. We build, upgrade, and optimize custom gaming PCs, including GPU upgrades, cooling improvements, SSD installations, and performance tuning."
  },

  // ─── GENERAL ─────────────────────────────────────────────────────
  {
    id: "brands",
    category: "General",
    question: "Which computer and laptop brands do you repair?",
    answer:
      "We repair most major brands including Dell, HP, Lenovo, ASUS, Acer, MSI, Apple MacBook, Samsung, Huawei, Microsoft Surface, Toshiba, and many others."
  },

  // ─── MACBOOK REPAIR ──────────────────────────────────────────────
  {
    id: "macbook",
    category: "MacBook Repair",
    question: "Do you repair Apple MacBooks?",
    answer:
      "Yes. We repair MacBook Air and MacBook Pro models including screen replacement, battery replacement, keyboard repair, logic board repair, and software troubleshooting."
  },

  // ─── BUSINESS IT ─────────────────────────────────────────────────
  {
    id: "business-support",
    category: "Business IT",
    question: "Do you provide computer repair services for businesses?",
    // ✅ Fixed: scoped to hardware repair only — removed "IT support" as active service
    answer:
      "Yes. We repair laptops, desktops, and MacBooks for offices, schools, and businesses throughout Kuwait, including hardware diagnostics, screen replacement, SSD upgrades, and system optimization."
  },
  {
    id: "bulk-repair",
    category: "Business IT",
    question: "Can you repair multiple computers for a company?",
    answer:
      "Yes. We provide hardware repair and upgrade services for multiple devices, making it straightforward for businesses to keep their systems running reliably."
  }
] as const;

export type FAQ = (typeof GLOBAL_FAQS)[number];
