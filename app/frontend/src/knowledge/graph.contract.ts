// File: app/frontend/src/knowledge/graph.contract.ts

import React from 'react';
import {
  Apple, Laptop, Gamepad2, Cpu, Monitor,
  BatteryWarning, HardDrive, ShieldCheck
} from 'lucide-react';
import { GraphEntity } from '../types/knowledgeGraph'; 

export type IconKey =
  | 'apple' | 'laptop' | 'gaming' | 'cpu'
  | 'monitor' | 'battery' | 'hardDrive' | 'shield';

export const ICON_MAP: Record<IconKey, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  apple:     Apple,
  laptop:    Laptop,
  gaming:    Gamepad2,
  cpu:       Cpu,
  monitor:   Monitor,
  battery:   BatteryWarning,
  hardDrive: HardDrive,
  shield:    ShieldCheck,
};

export type RepairLevel = 'basic' | 'advanced' | 'chip-level';

export type TurnaroundTime =
  | 'Same Day'
  | '24 Hours'
  | '24-48 Hours'
  | '2-4 Business Days'
  | 'Varies by Diagnosis';

export interface PricingMeta {
  startingFrom?: number;    
  currency: 'KWD';
  quoteRequired: boolean;
  displayLabel?: string;    
}

export interface ConversionMeta {
  showBooking: boolean;
  showWhatsapp: boolean;
  showCall: boolean;
  priority: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; 
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface WarrantyMeta {
  duration: string;
  coverage: string;
  noFixNoFee: boolean;
}

export interface Testimonial {
  text: string;
  author: string;
  location: string; 
}

export interface CommonProblem {
  id: string;
  title: string;
  symptoms: string[];
  likelyCause: string;
  expectedTurnaround: string;
  approxPriceRange: string;
}

export interface LocationEntity extends GraphEntity {
  entityType: 'Location';
  landmark: string;
  coords: { lat: number; lng: number };
  serviceRadiusKm: number;
  serviceAreas: string[];
}

export interface ServiceEntity extends GraphEntity {
  entityType: 'Service';        
  iconKey: IconKey;
  repairLevel: RepairLevel;
  estimatedTurnaround: TurnaroundTime;
  pricing: PricingMeta;
  conversion: ConversionMeta;
  coreFeatures: string[];
  idealCustomer?: string;
  deviceTypes?: string[];
  process?: ProcessStep[];
  warranty?: WarrantyMeta;
  testimonials?: Testimonial[];
  faqs?: Array<{ question: string; answer: string }>;
  commonProblems?: CommonProblem[];
}
