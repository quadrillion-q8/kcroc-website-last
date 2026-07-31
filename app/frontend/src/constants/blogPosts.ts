// File: app/frontend/src/constants/blogPosts.ts

/* ═══════════════════════════════════════════════════════════════════
   RICH CONTENT BLOCK SYSTEM
   Optional, additive schema. Existing posts using `content: string[]`
   keep working exactly as before — BlogPostTemplate falls back to that
   simple renderer whenever `richContent` isn't present. New posts can
   opt into these blocks for magazine-style layouts (comparison tables,
   timelines, stat cards, callouts, FAQ w/ schema, etc.).
═══════════════════════════════════════════════════════════════════ */

export interface HeadingBlock {
  type: 'h2' | 'h3';
  text: string;
  id: string; // stable anchor id, used by the sticky Table of Contents
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'tip' | 'expert' | 'warning' | 'recommendation' | 'didyouknow';
  title?: string;
  text: string;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution?: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface StatCardsBlock {
  type: 'statCards';
  items: StatCard[];
}

export interface ComparisonRow {
  feature: string;
  values: string[]; // one value per column, same order as `columns`
}

export interface ComparisonTableBlock {
  type: 'comparisonTable';
  title?: string;
  columns: string[]; // e.g. ['8GB RAM', '16GB RAM', '32GB RAM']
  rows: ComparisonRow[];
}

export interface TimelineStep {
  label: string;
  note?: string;
}

export interface TimelineBlock {
  type: 'timeline';
  title?: string;
  steps: TimelineStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock {
  type: 'faq';
  items: FAQItem[];
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | QuoteBlock
  | StatCardsBlock
  | ComparisonTableBlock
  | TimelineBlock
  | FAQBlock
  | ImageBlock;

/* ═══════════════════════════════════════════════════════════════════
   BLOG POST
═══════════════════════════════════════════════════════════════════ */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  content: string[];          // legacy simple format — always kept for back-compat
  richContent?: ContentBlock[]; // optional rich format — used when present
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  isPillar?: boolean;
  clusterParent?: string;
  tags?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-laptop-repair-2026",
    slug: "laptop-repair-kuwait-2026",
    title: "The Ultimate Guide to Laptop Repair in Kuwait (2026)",
    excerpt: "Kuwait's extreme climate creates unique hardware challenges. Learn how heat and dust destroy laptops and how component-level repair saves them.",
    description: "A comprehensive 2026 guide to laptop repair in Kuwait. Learn about thermal throttling, logic board failures, and how component-level repair saves you money.",
    content: [
      "In Kuwait, the ambient summer temperatures routinely exceed 45°C. For high-performance laptops and MacBooks, this environment is absolutely brutal. Heat and fine particulate dust combine to create the perfect storm for hardware failure.",
      "Most official service centers in Kuwait will immediately suggest replacing the entire motherboard when a laptop fails. This costs hundreds of Dinars and results in total data loss. However, over 90% of these 'dead' motherboards just have a single shorted capacitor or blown MOSFET.",
      "By utilizing precision micro-soldering and thermal imaging, modern ESD-safe labs can isolate the exact failing chip on the logic board. This component-level approach not only saves the original data but usually costs a fraction of a factory board swap.",
      "If your laptop feels sluggish, the first step isn't buying a new one. A thorough ultrasonic cleaning, application of high-grade liquid metal or phase-change thermal paste, and a fast NVMe SSD upgrade can make a five-year-old laptop perform better than new."
    ],
    image: "/images/blog/laptop-dust-cleaning-overheating-kuwait.webp",
    date: "2026-06-15",
    author: "KCROC Engineering Team",
    category: "Hardware",
    readTime: "6 min read",
    isPillar: true
  },
  {
    id: "blog-gaming-cooling",
    slug: "gaming-pc-cooling",
    title: "Why Your Gaming PC is Overheating in Kuwait",
    excerpt: "Experiencing severe FPS drops in Warzone or Valorant? Thermal throttling is likely the culprit. Here is how to fix it permanently.",
    content: [
      "Gaming PCs generate massive amounts of heat. When you pair an RTX 4080 or RX 7900 XTX with Kuwait's intense summer climate, standard factory cooling solutions fail rapidly.",
      "Thermal paste degradation is the number one cause of sudden performance drops. Factory-applied paste dries out and cracks, creating microscopic air pockets between your CPU and the cooler. This is known as 'pump-out' effect.",
      "When the CPU hits 95°C, it automatically throttles its clock speed to prevent melting. In-game, this looks like massive stuttering and FPS drops.",
      "The permanent solution for Kuwait gamers involves stripping the factory paste and applying advanced phase-change materials or liquid metal, coupled with aggressively tuned fan curves in the BIOS. Maintaining positive case pressure also prevents the fine Kuwaiti dust from choking your radiator fins."
    ],
    image: "/images/blog/gaming-pc-thermal-throttling-kuwait.webp",
    date: "2026-06-22",
    author: "KCROC Gaming Specialists",
    category: "Gaming",
    readTime: "4 min read",
    clusterParent: "laptop-repair-kuwait-2026"
  },
  {
    id: "blog-screen-protect",
    slug: "how-to-protect-laptop-screen",
    title: "How to Protect Your Laptop Screen from Breaking",
    excerpt: "A cracked laptop screen is one of the most common repairs in our Hawalli lab. Follow these habits to prevent expensive display damage.",
    content: [
      "Laptop screens are incredibly fragile, and modern bezel-less designs have only made them more vulnerable to physical stress and pressure cracks.",
      "The most common cause of screen damage isn't dropping the laptop—it's leaving an object on the keyboard (like a pen, earbuds, or a USB drive) and closing the lid. Even light pressure on a closed lid with an object inside will shatter the LCD instantly.",
      "Another major culprit is opening the laptop from the corner. Always open your laptop by lifting from the direct center of the bezel. Lifting from the corner twists the chassis, which can snap the internal hinges and subsequently crack the display glass.",
      "If you notice your hinges becoming incredibly stiff or hearing a cracking plastic sound when opening the lid, stop using it immediately. Have the hinges loosened and repaired before they rip through the display cable and screen panel."
    ],
    image: "/images/blog/laptop-screen-protection-kuwait.webp",
    date: "2026-07-02",
    author: "KCROC Repair Team",
    category: "Maintenance",
    readTime: "3 min read",
    clusterParent: "laptop-repair-kuwait-2026"
  },
  {
    id: "blog-8gb-ram-2026",
    slug: "why-8gb-ram-is-no-longer-enough-for-windows-11",
    title: "Why 8GB RAM Is No Longer Enough for Windows 11 in 2026",
    excerpt: "Windows 11 technically runs on 8GB RAM — but running isn't the same as running well. Here's what's actually happening under the hood, and when an upgrade is worth it.",
    description: "8GB RAM struggling on Windows 11 in 2026? Here's why Chrome, Photoshop, and multitasking hit a wall at 8GB, what a RAM upgrade actually fixes, and when to consider 16GB or 32GB.",
    content: [
      "Windows 11 technically runs on 8GB RAM — but running isn't the same as running well.",
      "Chrome, Slack, Spotify, and Windows background services can consume the majority of 8GB before you've even opened a real application.",
      "A RAM upgrade to 16GB is the single most cost-effective performance fix for most everyday laptops in 2026."
    ],
    richContent: [
      { type: 'paragraph', text: "Windows 11 technically runs on 8GB RAM — but running isn't the same as running well. If your laptop shipped with 8GB a few years ago and it's started feeling sluggish under everyday use, the operating system hasn't changed the goalposts on its own. What's changed is how much memory a normal browsing and work session actually demands." },
      { type: 'callout', variant: 'didyouknow', title: 'Did You Know?', text: "A single Chrome tab with a few extensions active can use 300–500MB of RAM on its own. Ten tabs open at once is a common, completely ordinary way to use up 4–5GB before touching any other application." },
      { type: 'h2', text: 'Where Your 8GB Actually Goes', id: 'where-your-8gb-goes' },
      { type: 'paragraph', text: "Windows 11 itself reserves roughly 2–3GB for background services, drivers, and the shell before you open a single program. That leaves 5–6GB of usable memory on an 8GB machine — and modern browsers, chat apps, and creative tools were not designed with that budget in mind." },
      { type: 'image', src: '/images/blog/windows-11-ram-performance.jpg', alt: 'Windows 11 Background RAM Usage', caption: 'Windows 11 base processes and background apps consume a significant portion of an 8GB pool before user applications are even launched.' },
      { type: 'paragraph', text: "Chrome is the most common culprit, but it isn't alone. Slack, Spotify's desktop app, Discord, and Windows' own background app refresh all sit in memory persistently, even when minimized. None of these are unusually greedy by 2026 standards — they're just competing for a pool of memory that hasn't grown since the laptop was built." },
      { type: 'h2', text: 'What Happens When RAM Runs Out', id: 'memory-swapping' },
      { type: 'paragraph', text: "When physical RAM fills up, Windows doesn't crash — it starts using your storage drive as overflow memory, a process called paging or memory swapping. This keeps things technically running, but storage is dramatically slower than RAM, even on a fast NVMe SSD. The result is the specific kind of stutter familiar to anyone who's had too many things open at once: everything freezes for a second, then catches up." },
      { type: 'image', src: '/images/blog/windows-11-memory-performance.jpg', alt: 'SSD Paging and Virtual Memory', caption: 'When physical RAM is exhausted, Windows relies on your SSD for virtual memory, resulting in micro-stutters and increased drive wear.' },
      { type: 'timeline', title: 'A Typical 8GB Session', steps: [
        { label: 'Fresh boot', note: '~2.5GB used by Windows 11 alone' },
        { label: 'Browser opens', note: '+1GB for Chrome\'s base process' },
        { label: '10 tabs open', note: '+3-4GB across tabs and extensions' },
        { label: 'Spotify running', note: '+300-500MB in the background' },
        { label: 'Slack running', note: '+400-600MB in the background' },
        { label: 'Photoshop opens', note: 'Available RAM is already gone' },
        { label: 'Memory swapping begins', note: 'Windows starts paging to disk' },
        { label: 'Performance drops', note: 'Stutters, delayed switching, lag' },
        { label: 'User notices slowdowns', note: 'The laptop "feels old"' }
      ]},
      { type: 'h2', text: '8GB vs 16GB vs 32GB: What Actually Changes', id: 'ram-comparison' },
      { type: 'image', src: '/images/blog/windows-11-laptop-multitasking.webp', alt: 'Windows 11 Heavy Multitasking', caption: 'Modern workflows easily exceed 8GB when balancing browsers, communication apps, and creative tools simultaneously.' },
      { type: 'comparisonTable', columns: ['8GB', '16GB', '32GB'], rows: [
        { feature: 'Everyday multitasking', values: ['Struggles past ~8 tabs', 'Comfortable', 'Comfortable'] },
        { feature: 'Photoshop / Lightroom', values: ['Frequent swapping', 'Usable for most edits', 'Smooth on large files'] },
        { feature: '15-20 Chrome tabs', values: ['Heavy slowdown', 'Generally fine', 'No issue'] },
        { feature: 'Virtual machines', values: ['Not practical', 'One VM, limited', 'Multiple VMs'] },
        { feature: 'Gaming (background apps open)', values: ['Stutter risk', 'Solid', 'Solid'] },
        { feature: 'Office work (Word, Excel, Teams)', values: ['Workable, occasional lag', 'Smooth', 'Smooth'] },
        { feature: 'Future-proofing (3+ years)', values: ['Not recommended', 'Reasonable', 'Comfortable margin'] },
      ]},
      { type: 'statCards', items: [
        { value: '16GB', label: 'Recommended Minimum' },
        { value: '8GB', label: 'Budget Configuration' },
        { value: '2×', label: 'Better Multitasking Headroom' },
        { value: '90%', label: 'Less SSD Swapping' }
      ]},
      { type: 'quote', text: "Windows 11 technically runs on 8GB RAM — but running isn't the same as running well." },
      { type: 'h2', text: 'Does a Faster SSD Fix This Instead?', id: 'ssd-vs-ram' },
      { type: 'paragraph', text: "An NVMe SSD upgrade is one of the best value repairs for an aging laptop — it dramatically cuts boot times and app-launch delays. But it doesn't remove the underlying memory pressure; it just makes the swapping Windows does when RAM runs out less painful. If your laptop is already on an HDD, upgrading to an SSD is worth doing regardless. If it's already on an SSD and still slows down under normal multitasking, that's a RAM problem an SSD can't fully solve." },
      { type: 'callout', variant: 'tip', title: 'Performance Tip', text: "Check whether your laptop's RAM is upgradeable before assuming a full replacement is needed. Many business and gaming laptops still have accessible SO-DIMM slots — some modern ultrabooks solder RAM directly to the board and can't be upgraded at all. We can check this from your model number in under a minute." },
      { type: 'image', src: '/images/blog/windows-11-ram-upgrade-guide.jpg', alt: 'Laptop RAM Upgrade Process', caption: 'Adding a second stick of RAM enables dual-channel memory, dramatically improving CPU bandwidth and system responsiveness.' },
      { type: 'h2', text: 'Should You Upgrade to 16GB or 32GB?', id: 'which-to-choose' },
      { type: 'paragraph', text: "For most everyday use — browsing, office work, streaming, light photo editing — 16GB comfortably covers 2026's typical workload with room to spare. 32GB is worth it specifically for heavier creative work (large Photoshop/Lightroom files, video editing), running virtual machines, or genuinely future-proofing a machine you plan to keep for 4-5+ years." },
      { type: 'callout', variant: 'expert', title: 'Expert Advice', text: "If you're deciding between 16GB and 32GB and you're not doing video editing or running VMs daily, 16GB is the better value — the jump from 8GB to 16GB is where most people actually feel the difference. Going straight to 32GB rarely changes day-to-day responsiveness if your workload doesn't need it." },
      { type: 'faq', items: [
        { question: 'Is 8GB RAM enough in 2026?', answer: 'For very light use — basic browsing with a handful of tabs, email, and document editing — 8GB can still function acceptably. For typical multitasking with modern browsers, chat apps, and creative software running together, 8GB is a common source of stutter and slowdown.' },
        { question: 'Can Windows 11 run on 8GB?', answer: 'Yes, 8GB meets Windows 11\'s minimum requirements and it will boot and run. The issue isn\'t whether it runs, but how much usable memory is left over for your actual applications once the OS and background services take their share.' },
        { question: 'Why does Chrome use so much RAM?', answer: 'Chrome runs each tab and extension as a separate process for stability and security, which uses more memory than a single shared process would. This makes it fast and crash-resistant, but memory-hungry with many tabs open.' },
        { question: 'Can I upgrade laptop RAM?', answer: 'It depends on the model. Many business and gaming laptops have accessible SO-DIMM memory slots that support an upgrade. Some modern thin-and-light ultrabooks have RAM soldered directly to the motherboard and cannot be upgraded. We can check compatibility from your exact model number.' },
        { question: 'Does an SSD replace RAM?', answer: 'No. An SSD upgrade speeds up storage-related tasks like boot time and app launches, and reduces the penalty when Windows does have to swap memory to disk. It doesn\'t increase how much you can keep open at once without slowdown — that\'s specifically what RAM does.' },
        { question: 'Should I buy 16GB or 32GB?', answer: '16GB is the right fit for most everyday multitasking, browsing, and office work. 32GB is worth the extra cost specifically for heavy creative work, running virtual machines, or if you want a longer runway before your next upgrade.' }
      ]}
    ],
    image: "/images/blog/windows-11-8gb-ram-performance.jpg",
    date: "2026-07-30",
    author: "KCROC Technical Team",
    category: "Laptop Performance",
    readTime: "8-10 min read",
    tags: ["Windows 11", "RAM", "Laptop Upgrade", "Laptop Performance", "Memory Upgrade", "Windows Optimization", "Computer Repair Kuwait"],
    clusterParent: "laptop-repair-kuwait-2026"
  }
];
