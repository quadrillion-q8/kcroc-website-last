import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldCheck, 
  Apple, Wrench 
} from 'lucide-react';

export const BUSINESS_INFO = {
  name: "Kuwait Computer Repair On Call (KCROC)",
  shortName: "KCROC",
  phone: "+96555301913",
  cleanPhone: "96555301913",
  url: "https://www.computerrepairkuwait.com",
  logo: "https://www.computerrepairkuwait.com/logo.png",
  address: "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli, Kuwait",
  coords: { lat: 29.3356, lng: 48.0250 },
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
};

export const AREAS = {
  hawalli: { name: "Hawalli", description: "At Kuwait Computer Repair On Call (KCROC), Hawalli is at the heart of our operations, with our repair shop conveniently located on Ibn Khaldoun Street in Al Mullah Complex. Being based in Hawalli allows us to provide the fastest response times and most reliable computer repair services in the area. We regularly assist customers from nearby landmarks such as Hawalli Park, The Promenade Mall, and the bustling Bin Khaldoun commercial district.", landmark: "Ibn Khaldoun Street" },
  salmiya: { name: "Salmiya", description: "KCROC proudly serves Salmiya, one of Kuwait’s most vibrant and tech-driven areas, known for landmarks like Marina Mall, Salem Al Mubarak Street, and the Scientific Center. We understand that residents and businesses in Salmiya demand quick, high-quality repair services, especially in such a fast-paced environment. Whether you’re a student, a business owner, or working remotely from a café along the Gulf Road, device downtime is simply not an option.", landmark: "Salem Al-Mubarak Street" },
  farwaniya: { name: "Farwaniya", description: "KCROC extends its expert computer repair services to Farwaniya, one of Kuwait’s most densely populated and active residential areas. With key locations like Farwaniya Hospital, Lulu Hypermarket, and the surrounding commercial zones, the demand for reliable tech support is constant. We regularly assist customers across Farwaniya who need quick and dependable repair solutions without the inconvenience of travel.", landmark: "Farwaniya Hospital area" },
  kuwaitcity: { name: "Kuwait City", description: "Serving Kuwait City, KCROC delivers professional computer repair solutions to the country’s business and administrative hub. From offices near Kuwait Towers to corporate spaces around Sharq and Soor Street, we understand the urgency of keeping systems running efficiently in a high-demand environment. We handle everything from motherboard troubleshooting to MacBook repairs, ensuring minimal disruption through our efficient pick-up service.", landmark: "Kuwait Towers area" },
  jahra: { name: "Jahra", description: "KCROC proudly serves Jahra, providing high-quality computer repair services to residents and businesses across the area. Known for landmarks like Jahra Hospital, Jahra Cooperative Society, and the growing residential neighborhoods, Jahra continues to expand, increasing the need for dependable IT support. We bring our expertise directly to customers here, ensuring they receive the same level of professional service as in central Kuwait.", landmark: "Jahra Road" },
  ahmadi: { name: "Ahmadi", description: "Serving the Ahmadi governorate with premium component-level diagnostics, KCROC brings expert technical support to your doorstep. We specialize in hardware restoration for clients living near Ahmadi Park and the surrounding industrial and residential zones.", landmark: "Ahmadi Park" },
  mubaralkalkabeer: { name: "Mubarak Al Kabeer", description: "We provide fast, reliable device restoration for families and offices in Mubarak Al Kabeer. Our technicians frequently travel through the area, ensuring your laptop or PC issues are resolved without you having to leave home.", landmark: "Mubarak Al Kabeer Center" },
  fahaheel: { name: "Fahaheel", description: "KCROC offers professional laptop and PC support services based in Fahaheel. Whether you are near the central market or the coastal areas, our pickup service ensures your device repair is convenient, fast, and stress-free.", landmark: "Fahaheel Park" },
  mangaf: { name: "Mangaf", description: "Our mobile lab team provides rapid diagnostic pickup services for clients located in Mangaf. We handle hardware failures, screen replacements, and performance tuning for residents near the beach and residential blocks.", landmark: "Mangaf Beach area" },
  abuhalifa: { name: "Abu Halifa", description: "KCROC delivers comprehensive repair solutions for homes and offices in Abu Halifa. We pride ourselves on being the local choice for quick laptop diagnostics and professional component-level fixes.", landmark: "Abu Halifa Park" },
  mahboula: { name: "Mahboula", description: "We provide trusted local technical support for residents in the Mahboula area. With a focus on speed and quality, our team is equipped to handle complex hardware issues right from your neighborhood.", landmark: "Coastal Road" },
  riqqa: { name: "Riqqa", description: "Specialized in expert hardware diagnostics and repair pickups, KCROC is the go-to partner for the Riqqa community. We ensure your devices are repaired with precision and care.", landmark: "Riqqa Co-op" },
  khaitan: { name: "Khaitan", description: "KCROC offers convenient hardware solutions and device pickup for clients in Khaitan. We help you stay productive by taking care of your technical issues quickly.", landmark: "Khaitan Park" },
  jleeb: { name: "Jleeb", description: "We provide reliable mobile lab services for quick troubleshooting in Jleeb Al-Shuyoukh. Our technicians are experienced in handling all major laptop and desktop brands.", landmark: "Jleeb Stadium" },
  shuwaikh: { name: "Shuwaikh", description: "High-priority support for corporate and retail clients in the Shuwaikh industrial area. KCROC understands the business needs of this hub and provides fast, effective repair solutions.", landmark: "Shuwaikh Industrial" },
  sabahalsalem: { name: "Sabah Al Salem", description: "We offer professional, fast-turnaround repairs for Sabah Al Salem residents. From battery issues to complex motherboard faults, we have your devices covered.", landmark: "Sabah Al Salem Co-op" }
};

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
