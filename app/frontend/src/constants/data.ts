import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldCheck, 
  Apple, Wrench, ShieldAlert 
} from 'lucide-react';

export const BUSINESS_INFO = {
  name: "Kuwait Computer Repair On Call (KCROC)",
  shortName: "KCROC",
  phone: "+96555301913",
  cleanPhone: "96555301913",
  url: "https://www.computerrepairkuwait.com",
  logo: "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png",
  address: "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli, Kuwait",
  coords: { lat: 29.3356, lng: 48.0250 },
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID" // Update with actual Place ID
};

export const SERVICE_AREAS = [
  "Hawalli", "Salmiya", "Farwaniya", "Kuwait City", "Jahra", "Ahmadi", 
  "Mubarak Al Kabeer", "Fahaheel", "Mangaf", "Abu Halifa", "Mahboula", 
  "Riqqa", "Khaitan", "Jleeb", "Shuwaikh", "Sabah Al Salem"
];

export const SERVICES = [
  { title: 'Laptop Repair', description: 'Comprehensive hardware diagnostics, thermal management, and restoration.', icon: Laptop, path: '/laptop-repair-kuwait' },
  { title: 'MacBook Repair', description: 'Expert Apple logic board micro-soldering and OEM screen replacement.', icon: Apple, path: '/macbook-repair-kuwait' },
  { title: 'Gaming PC Repair', description: 'High-performance thermal engineering, GPU diagnostics, and cooling.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'Motherboard Repair', description: 'Chip-level diagnostics, capacitor replacement, and short circuit repair.', icon: Cpu, path: '/chip-level-motherboard-repair-hawalli' },
  { title: 'Screen Replacement', description: 'Flawless LCD and OLED display panel replacements fitted with precision.', icon: Monitor, path: '/screen-replacement-kuwait' },
  { title: 'Data Recovery', description: 'Secure file retrieval from failing SSDs/HDDs and security hardening.', icon: ShieldCheck, path: '/data-recovery-kuwait' },
];

export const RECENT_BLOGS = [
  { title: "Laptop Repair in Kuwait: The 2026 Guide", excerpt: "How Kuwait's climate impacts laptop hardware and thermal management.", path: "/blog/laptop-repair-kuwait-2026", date: "2026-06-14", category: "Hardware" },
  { title: "How to Protect Your Laptop Screen", excerpt: "Essential tips to prevent pressure fractures and hinge stress.", path: "/blog/how-to-protect-laptop-screen", date: "2026-06-02", category: "Maintenance" },
  { title: "Gaming PC Cooling Solutions", excerpt: "Advanced thermal engineering strategies for peak performance.", path: "/gaming-pc-cooling", date: "2026-05-18", category: "Gaming" }
];

export const REVIEWS = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5, date: "2026-05-10", device: "Acer Predator Helios" },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. Highly professional.', rating: 5, date: "2026-04-22", device: "Laptop Motherboard" },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\'ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5, date: "2026-03-15", device: "Laptop Battery" }
];

export const FAQS = [
  { q: "Do you repair MacBooks?", a: "Yes, we specialize in Apple MacBook repair including logic board micro-soldering, screen replacements, and battery service." },
  { q: "Do you offer same-day repair?", a: "Yes, common repairs like screen replacements and SSD upgrades are often completed the same day." },
  { q: "How much does motherboard repair cost?", a: "Motherboard repair pricing is diagnostic-first. We assess the damage and provide a quote before proceeding with our No Fix, No Fee policy." }
];

export const TRUST_STATS = [
  { value: '500+', label: 'Repairs Completed', subtext: 'Since launch across Kuwait' },
  { value: '98%', label: 'Success Rate', subtext: 'On complex logic board repairs' },
  { value: '30 Days', label: 'Warranty', subtext: 'On all parts and labour' },
  { value: 'Free', label: 'Pick & Drop', subtext: 'Zero hidden transport fees' },
];

export const INTERNAL_FOOTER_LINKS = [
  { title: "Laptop Repair Kuwait", path: "/laptop-repair-kuwait" },
  { title: "MacBook Repair Kuwait", path: "/macbook-repair-kuwait" },
  { title: "Gaming PC Repair Kuwait", path: "/gaming-pc-repair-kuwait" },
  { title: "Data Recovery Kuwait", path: "/data-recovery-kuwait" },
  { title: "Screen Replacement Kuwait", path: "/screen-replacement-kuwait" },
  { title: "Motherboard Repair Hawalli", path: "/chip-level-motherboard-repair-hawalli" },
];
