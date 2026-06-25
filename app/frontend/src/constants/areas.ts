// File: app/frontend/src/constants/areas.ts
import { IMAGES } from './images';

export const AREAS = {
  hawalli: {
    slug: "hawalli",
    name: "Hawalli",
    title: "Computer Repair in Hawalli",
    description: "Professional laptop, MacBook and gaming PC repair in Hawalli.",
    keywords: ["computer repair hawalli", "laptop repair hawalli", "macbook repair hawalli", "gaming pc repair hawalli"],
    image: IMAGES.hawalli, // Ensure this exists in your images registry
    landmark: "Ibn Khaldoun St"
  },
  salmiya: {
    slug: "salmiya",
    name: "Salmiya",
    title: "Computer Repair in Salmiya",
    description: "Expert PC and Mac support for residents and businesses in Salmiya.",
    keywords: ["computer repair salmiya", "laptop repair salmiya"],
    image: IMAGES.salmiya,
    landmark: "Gulf Road"
  },
  farwaniya: {
    slug: "farwaniya",
    name: "Farwaniya",
    title: "Computer Repair in Farwaniya",
    description: "Reliable mobile computer repair services across Farwaniya.",
    keywords: ["computer repair farwaniya", "laptop repair farwaniya"],
    image: IMAGES.farwaniya,
    landmark: "Habib Munawar St"
  },
  // Add other areas here...
} as const;

export type AreaKey = keyof typeof AREAS;
