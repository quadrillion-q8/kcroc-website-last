// File: src/constants/services.ts
import { Laptop, Gamepad2, Cpu } from 'lucide-react';
import { getServiceRoute } from './routes';
import { IMAGES } from './images';

export const SERVICES = [
  {
    slug: "laptop-repair",
    name: "Laptop Repair Kuwait",
    description: "Expert repair for all laptop brands including screen replacement, battery issues, and charging port repair.",
    // 👇 Inherits exact image paths, alt tags, and dimensions from your image registry
    image: IMAGES.services.laptopRepairHero,
    icon: Laptop,
    // 👇 Automatically generates "/services/laptop-repair"
    route: getServiceRoute("laptop-repair")
  },
  {
    slug: "gaming-pc-repair",
    name: "Gaming PC Repair Kuwait",
    description: "Professional gaming PC diagnostics, thermal throttling solutions, and custom performance tuning.",
    image: IMAGES.services.gamingPCRepairHero,
    icon: Gamepad2,
    route: getServiceRoute("gaming-pc-repair")
  },
  {
    slug: "motherboard-repair",
    name: "Motherboard Repair Kuwait",
    description: "Advanced chip-level motherboard repair, micro-soldering, and short-circuit diagnostics.",
    image: IMAGES.services.motherboardRepairHero,
    icon: Cpu,
    route: getServiceRoute("motherboard-repair")
  }
] as const; // 👈 Locks the object to provide bulletproof TypeScript safety!

// Create a strict type for your services to be used across UI components
export type ServiceType = typeof SERVICES[number];
