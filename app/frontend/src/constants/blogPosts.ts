// File: app/frontend/src/constants/blogPosts.ts
import { IMAGES } from './images';

export const BLOG_POSTS = [
  {
    slug: "how-to-fix-overheating-laptop",
    title: "How to Fix an Overheating Laptop in Kuwait's Summer",
    description: "Is your laptop overheating? Learn the top causes of thermal throttling and how to cool down your PC to prevent permanent hardware damage.",
    category: "Laptop Repair",
    date: "2026-06-25",
    image: IMAGES.brand.teamWorkbench, // Replace with a specific blog image when you have one
    author: "KCROC Tech Team",
    keywords: ["overheating laptop fix", "laptop thermal paste replacement", "laptop cleaning kuwait", "pc overheating solutions"],
    readTime: "5 min read",
    // We can add the raw HTML or Markdown content here, or build a separate content engine later. 
    // For now, we will store a brief excerpt for the blog hub page.
    excerpt: "Summer in Kuwait is brutal on electronics. If your laptop sounds like a jet engine and is hot to the touch, you might be facing thermal throttling. Here is how to fix it."
  },
  {
    slug: "macbook-battery-replacement-kuwait",
    title: "When to Replace Your MacBook Battery (Warning Signs)",
    description: "Don't let a swelling battery ruin your MacBook. Learn the top warning signs that your Apple laptop needs a battery replacement.",
    category: "MacBook Repair",
    date: "2026-06-20",
    image: IMAGES.brand.teamWorkbench,
    author: "KCROC Tech Team",
    keywords: ["macbook battery replacement kuwait", "swollen macbook battery", "apple laptop service status", "macbook repair hawalli"],
    readTime: "4 min read",
    excerpt: "Does your MacBook die at 30%? Is the trackpad hard to click? These are classic signs of a failing or swollen lithium-ion battery."
  },
  {
    slug: "ssd-vs-hdd-upgrade-guide",
    title: "SSD vs HDD: Why You Need to Upgrade Your Hard Drive",
    description: "Still running Windows on an old HDD? Discover why upgrading to a Solid State Drive (SSD) is the single best investment you can make for your computer.",
    category: "PC Upgrades",
    date: "2026-06-15",
    image: IMAGES.brand.teamWorkbench,
    author: "KCROC Tech Team",
    keywords: ["ssd upgrade kuwait", "hdd to ssd clone", "make laptop faster", "computer upgrade hawalli"],
    readTime: "6 min read",
    excerpt: "If your computer takes more than 30 seconds to boot up, you are wasting time. Upgrading from a mechanical hard drive to an SSD makes any PC feel brand new."
  }
] as const;

// Types for strict safety
export type BlogPost = typeof BLOG_POSTS[number];
export type BlogSlug = BlogPost['slug'];
