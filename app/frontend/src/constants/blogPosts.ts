// File: src/constants/blogPosts.ts

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs for easy mapping
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  keywords: string[];
  isPillar: boolean;
  clusterParent?: string; // Connects a cluster post back to its main pillar
}

export const BLOG_POSTS: BlogPost[] = [
  // ─── PILLAR POST ───
  {
    slug: "laptop-repair-kuwait-2026",
    title: "The Ultimate Guide to Laptop Repair in Kuwait",
    excerpt: "A comprehensive breakdown of the most common laptop failures, diagnostic steps, and professional repair solutions available in Kuwait.",
    content: [
      "When your laptop fails, it can bring your entire workflow to a halt. Whether you are running a business in Salmiya or studying at home, understanding the root cause of your hardware failure is the first step to getting back online.",
      "In this comprehensive guide, we cover the most frequent hardware issues we see at our Hawalli repair center. From failing mechanical hard drives that need an SSD upgrade, to thermal throttling caused by dust buildup in the cooling fans.",
      "As a professional repair service, we always recommend getting a diagnostic check before replacing expensive parts. Our team provides free pickup across Kuwait, ensuring your device is evaluated by experts without you having to leave your location."
    ],
    category: "Guides",
    date: "2026-06-15",
    readTime: "8 min read",
    author: "Imran Natiq",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80",
    keywords: ["laptop repair kuwait", "computer fix", "hardware diagnostic", "motherboard repair"],
    isPillar: true
  },

  // ─── CLUSTER POST 1 ───
  {
    slug: "fix-slow-laptop-ssd",
    title: "Why an SSD Upgrade is the Best Fix for a Slow Laptop",
    excerpt: "Learn how replacing your old mechanical hard drive with a Solid State Drive (SSD) can make your computer up to 10x faster.",
    content: [
      "If you are dealing with a slow laptop, you might think it is time to buy a brand new machine. However, in 90% of cases, the processor and RAM are perfectly fine—the bottleneck is an aging mechanical hard drive (HDD).",
      "An SSD upgrade is the most cost-effective way to transform system performance. Unlike HDDs, which use spinning magnetic platters, SSDs use flash memory. This means your Windows installation boots in seconds, and applications open instantly.",
      "Upgrading is a straightforward process. We safely clone your existing data so you do not lose any files, install the new drive, and optimize your operating system for peak performance."
    ],
    category: "Hardware Upgrades",
    date: "2026-06-18",
    readTime: "4 min read",
    author: "Imran Natiq",
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80",
    keywords: ["ssd upgrade", "slow laptop", "speed up computer", "hard drive replacement"],
    isPillar: false,
    clusterParent: "laptop-repair-kuwait-2026"
  },

  // ─── CLUSTER POST 2 ───
  {
    slug: "stop-laptop-overheating",
    title: "How to Stop Your Laptop from Overheating",
    excerpt: "Thermal throttling can permanently damage your processor. Discover the causes of laptop overheating and how professional cooling maintenance prevents data loss.",
    content: [
      "A laptop that runs too hot is not just uncomfortable to use; it is actively damaging its internal components. Overheating leads to thermal throttling, where your processor intentionally slows down to prevent a catastrophic failure.",
      "The primary cause of an overheating laptop is dust accumulation. The cooling fans pull in air to cool the copper heat sinks, but over time, dust blocks the exhaust vents. Additionally, the thermal paste that transfers heat from the CPU to the heat sink dries out and loses its effectiveness.",
      "To resolve this, a complete teardown is required. We clean the internal chassis, clear the exhaust fins, and apply premium, high-conductivity thermal paste to restore factory cooling performance."
    ],
    category: "Maintenance",
    date: "2026-06-20",
    readTime: "5 min read",
    author: "Imran Natiq",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80",
    keywords: ["overheating", "thermal paste", "laptop fan cleaning", "thermal throttling"],
    isPillar: false,
    clusterParent: "laptop-repair-kuwait-2026"
  }
];
