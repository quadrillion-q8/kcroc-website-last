// File: app/frontend/src/knowledge/graph.contract.ts

import React from 'react';
import {
  Apple, Laptop, Gamepad2, Cpu, Monitor,
  BatteryWarning, HardDrive, ShieldCheck
} from 'lucide-react';

// Assuming this is the correct path based on your repository structure
import { GraphEntity } from '../types/knowledgeGraph'; 

export type IconKey =
  | 'apple' | 'laptop' | 'gaming' | 'cpu'
  | 'monitor' | 'battery' | 'hardDrive' | 'shield';

// 👇 This is the exact export Vercel is looking for
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

export interface EmbeddedIssue {
  id: string;
  title: string;
  description: string;
  symptoms?: string[];
  severity?: 'low' | 'medium' | 'high';
}

export interface ServiceEntity extends GraphEntity {
  entityType: 'Service';        
  iconKey: IconKey;
  repairLevel: RepairLevel;
  estimatedTurnaround: TurnaroundTime;
  pricing: PricingMeta;
  conversion: ConversionMeta;
  coreFeatures: string[];
  commonIssues: EmbeddedIssue[];
}
