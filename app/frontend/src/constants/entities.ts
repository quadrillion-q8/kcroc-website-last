// File: src/constants/entities.ts
import { ROUTES } from './routes';

export type EntityType = "service" | "location" | "brand" | "issue";

export interface SemanticEntity {
  id: string;
  name: string;
  synonyms: string[];
  type: EntityType;
  primaryRoute: string;
  relatedEntities: string[];
  schemaType: string;
}

export const SEMANTIC_ENTITIES: Record<string, SemanticEntity> = {
  // SERVICES
  "laptop-repair": {
    id: "laptop-repair",
    name: "Laptop Repair",
    synonyms: ["fix laptop", "broken laptop", "laptop service", "notebook repair", "laptop technician"],
    type: "service",
    primaryRoute: ROUTES.laptopRepair,
    relatedEntities: ["screen-replacement", "motherboard-repair", "ssd-upgrade"],
    schemaType: "Service"
  },
  "macbook-repair": {
    id: "macbook-repair",
    name: "MacBook Repair",
    synonyms: ["fix macbook", "apple computer repair", "macbook pro repair", "macbook air repair", "apple service"],
    type: "service",
    primaryRoute: ROUTES.macbookRepair,
    relatedEntities: ["laptop-repair", "screen-replacement"],
    schemaType: "Service"
  },
  "gaming-pc": {
    id: "gaming-pc",
    name: "Gaming PC Repair",
    synonyms: ["gaming computer fix", "custom pc repair", "gpu overheating", "gaming rig service"],
    type: "service",
    primaryRoute: ROUTES.gamingPC,
    relatedEntities: ["motherboard-repair"],
    schemaType: "Service"
  },
  "ssd-upgrade": {
    id: "ssd-upgrade",
    name: "SSD Upgrade",
    synonyms: ["make laptop faster", "hard drive upgrade", "replace hdd", "speed up computer", "storage upgrade"],
    type: "service",
    primaryRoute: "/services/ssd-upgrade",
    relatedEntities: ["laptop-repair", "macbook-repair"],
    schemaType: "Service"
  },

  // LOCATIONS
  "hawalli": {
    id: "hawalli",
    name: "Hawalli",
    synonyms: ["hawalli repair shop", "al mullah complex", "ibn khaldoun street"],
    type: "location",
    primaryRoute: "/laptop-repair-in-hawalli",
    relatedEntities: ["laptop-repair", "macbook-repair", "salmiya"],
    schemaType: "City"
  },
  "salmiya": {
    id: "salmiya",
    name: "Salmiya",
    synonyms: ["salmiya repair", "gulf road pc repair"],
    type: "location",
    primaryRoute: "/laptop-repair-in-salmiya",
    relatedEntities: ["laptop-repair", "macbook-repair", "hawalli"],
    schemaType: "City"
  },

  // ISSUES (High-intent long-tail)
  "slow-laptop": {
    id: "slow-laptop",
    name: "Slow Laptop",
    synonyms: ["computer freezing", "laptop lagging", "windows is slow", "macbook running slow"],
    type: "issue",
    primaryRoute: ROUTES.blogLaptopRepair || "/blog/laptop-repair-kuwait-2026",
    relatedEntities: ["ssd-upgrade", "laptop-repair"],
    schemaType: "MedicalSymptom" // Metaphorical usage for tech diagnostics
  },
  "overheating": {
    id: "overheating",
    name: "Overheating",
    synonyms: ["laptop gets hot", "fan is loud", "computer shuts down", "thermal throttling"],
    type: "issue",
    primaryRoute: ROUTES.gamingPCCooling,
    relatedEntities: ["gaming-pc", "laptop-repair"],
    schemaType: "MedicalSymptom"
  }
} as const;
