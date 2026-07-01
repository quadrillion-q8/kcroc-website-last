// File: app/frontend/src/knowledge/registry.ts

import { ServiceEntity, IssueEntity } from './types';

/* ─────────────────────────────────────────────────────────────────────────────
   1. ISSUES GRAPH
   Symptoms customers search for. Each issue links to one or more services.
───────────────────────────────────────────────────────────────────────────── */

export const ISSUES: Record<string, IssueEntity> = {
  'logic-board-failure': {
    id: 'logic-board-failure',
    type: 'Issue',
    name: 'Logic Board Failure',
    slug: 'logic-board-repair',
    description: 'Micro-soldering and component-level motherboard repair.',
    symptoms: ['Device will not turn on', 'Random shutdowns', 'No display but fan spins']
  },
  'screen-damage': {
    id: 'screen-damage',
    type: 'Issue',
    name: 'Broken Screen',
    slug: 'screen-replacement',
    description: 'OEM screen panel replacements fitted with precision.',
    symptoms: ['Cracked glass', 'Flickering display', 'Dead pixels', 'Vertical lines']
  },
  'thermal-throttling': {
    id: 'thermal-throttling',
    type: 'Issue',
    name: 'Overheating & Thermal Issues',
    slug: 'overheating-repair',
    description: 'High-performance thermal engineering, cleaning, and liquid metal application.',
    symptoms: ['Fans spinning loudly', 'Laptop gets too hot to touch', 'Games lagging or stuttering']
  },
  // ✅ Added: missing issues covering active KCROC repair categories
  'battery-failure': {
    id: 'battery-failure',
    type: 'Issue',
    name: 'Battery Failure',
    slug: 'battery-replacement',
    description: 'Battery replacement for laptops and MacBooks with swollen, dead, or rapidly draining cells.',
    symptoms: ['Battery not charging', 'Swollen battery', 'Laptop dies at 30%', 'Device only works when plugged in']
  },
  'keyboard-failure': {
    id: 'keyboard-failure',
    type: 'Issue',
    name: 'Keyboard Failure',
    slug: 'keyboard-replacement',
    description: 'Keyboard replacement for sticky, unresponsive, or physically damaged keys.',
    symptoms: ['Keys not responding', 'Keys sticking', 'Liquid spill damage', 'Missing keycaps']
  },
  'charging-port-failure': {
    id: 'charging-port-failure',
    type: 'Issue',
    name: 'Charging Port Failure',
    slug: 'charging-port-repair',
    description: 'DC jack and USB-C charging port repair or replacement.',
    symptoms: ['Laptop not charging', 'Loose charging connection', 'Charger falls out', 'Intermittent charging']
  },
  'liquid-damage': {
    id: 'liquid-damage',
    type: 'Issue',
    name: 'Liquid Damage',
    slug: 'liquid-damage-repair',
    description: 'Ultrasonic cleaning and component-level board repair after liquid spills.',
    symptoms: ['Spilled liquid on laptop', 'Device died after liquid contact', 'Corroded ports']
  },
  'slow-performance': {
    id: 'slow-performance',
    type: 'Issue',
    name: 'Slow Performance',
    slug: 'performance-optimization',
    description: 'SSD upgrades, RAM upgrades, virus removal, and Windows optimization.',
    symptoms: ['Laptop very slow', 'Long boot times', 'Applications freeze', 'Constant spinning disk']
  },
  'hinge-failure': {
    id: 'hinge-failure',
    type: 'Issue',
    name: 'Hinge Failure',
    slug: 'hinge-repair',
    description: 'Laptop hinge and chassis repair for cracked or broken hinge assemblies.',
    symptoms: ['Screen wobbles', 'Hinge cracking plastic', 'Screen falls back', 'Grinding when opening']
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. SERVICES GRAPH
   Active KCROC services. Each links to related issues.
   Note: Data Recovery is intentionally excluded — service discontinued.
───────────────────────────────────────────────────────────────────────────── */

export const KNOWLEDGE_SERVICES: Record<string, ServiceEntity> = {
  'laptop-repair': {
    id: 'laptop-repair',
    type: 'Service',
    name: 'Laptop Repair',
    slug: 'laptop-repair-kuwait',
    description: 'Comprehensive hardware diagnostics, thermal management, and restoration for all Windows laptops.',
    icon: 'Laptop',
    popular: true,
    repairTime: 'Same Day / 24 Hours',
    relatedIssues: ['logic-board-failure', 'screen-damage', 'thermal-throttling', 'battery-failure', 'keyboard-failure', 'charging-port-failure', 'liquid-damage', 'hinge-failure'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'acer', 'msi', 'samsung', 'toshiba']
  },
  'macbook-repair': {
    id: 'macbook-repair',
    type: 'Service',
    name: 'MacBook Repair',
    slug: 'macbook-repair-kuwait',
    description: 'Expert Apple logic board micro-soldering and OEM screen replacement.',
    icon: 'Apple',
    popular: true,
    repairTime: '24–48 Hours',
    relatedIssues: ['logic-board-failure', 'screen-damage', 'battery-failure', 'keyboard-failure', 'liquid-damage', 'thermal-throttling'],
    relatedBrands: ['apple']
  },
  'gaming-pc-repair': {
    id: 'gaming-pc-repair',
    type: 'Service',
    name: 'Gaming PC Repair',
    slug: 'gaming-pc-repair-kuwait',
    description: 'High-performance thermal engineering, GPU diagnostics, and cooling optimization.',
    icon: 'Gamepad2',
    popular: true,
    repairTime: 'Same Day / 24 Hours',
    relatedIssues: ['thermal-throttling', 'logic-board-failure', 'slow-performance'],
    relatedBrands: ['msi', 'asus-rog', 'alienware', 'acer-predator', 'lenovo-legion']
  },
  // ✅ Added: missing active services
  'motherboard-repair': {
    id: 'motherboard-repair',
    type: 'Service',
    name: 'Motherboard Repair',
    slug: 'motherboard-repair-kuwait',
    description: 'Chip-level diagnostics, blown capacitor replacement, and short circuit repair.',
    icon: 'Cpu',
    popular: true,
    repairTime: '24–48 Hours',
    relatedIssues: ['logic-board-failure', 'liquid-damage', 'charging-port-failure'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'apple', 'msi']
  },
  'screen-replacement': {
    id: 'screen-replacement',
    type: 'Service',
    name: 'Screen Replacement',
    slug: 'laptop-screen-repair-kuwait',
    description: 'Flawless LCD and OLED display panel replacements for laptops and MacBooks.',
    icon: 'Monitor',
    popular: true,
    repairTime: 'Same Day',
    relatedIssues: ['screen-damage'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'apple', 'acer', 'msi']
  },
  'battery-replacement': {
    id: 'battery-replacement',
    type: 'Service',
    name: 'Battery Replacement',
    slug: 'battery-replacement',
    description: 'OEM and compatible battery replacement for all laptop and MacBook models.',
    icon: 'BatteryWarning',
    popular: false,
    repairTime: 'Same Day',
    relatedIssues: ['battery-failure'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'apple', 'acer']
  },
  'ssd-upgrade': {
    id: 'ssd-upgrade',
    type: 'Service',
    name: 'SSD Upgrade',
    slug: 'ssd-upgrade-kuwait',
    description: 'SSD installation and Windows migration for dramatically faster performance.',
    icon: 'HardDrive',
    popular: false,
    repairTime: 'Same Day',
    relatedIssues: ['slow-performance'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'apple', 'acer', 'msi']
  },
  'virus-removal': {
    id: 'virus-removal',
    type: 'Service',
    name: 'Virus Removal',
    slug: 'virus-removal-kuwait',
    description: 'Malware and virus removal with Windows optimization and security hardening.',
    icon: 'ShieldCheck',
    popular: false,
    repairTime: 'Same Day',
    relatedIssues: ['slow-performance'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus', 'acer', 'msi', 'samsung', 'toshiba']
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   3. QUERY ENGINE
───────────────────────────────────────────────────────────────────────────── */

/** Returns all active services as an array */
// ✅ Added: getAllServices utility
export const getAllServices = (): ServiceEntity[] =>
  Object.values(KNOWLEDGE_SERVICES);

/** Returns popular services only */
export const getPopularServices = (): ServiceEntity[] =>
  Object.values(KNOWLEDGE_SERVICES).filter(s => s.popular);

/** Looks up a service by its URL slug */
export const getServiceBySlug = (slug: string): ServiceEntity | undefined =>
  Object.values(KNOWLEDGE_SERVICES).find(service => service.slug === slug);

/** Looks up an issue by its URL slug */
// ✅ Added: getIssueBySlug
export const getIssueBySlug = (slug: string): IssueEntity | undefined =>
  Object.values(ISSUES).find(issue => issue.slug === slug);

/** Returns full issue entities for a given service ID */
// ✅ Fixed: type predicate for correct TypeScript narrowing
export const getRelatedIssuesForService = (serviceId: string): IssueEntity[] => {
  const service = KNOWLEDGE_SERVICES[serviceId];
  if (!service) return [];
  return service.relatedIssues
    .map(issueId => ISSUES[issueId])
    .filter((issue): issue is IssueEntity => issue !== undefined);
};

/** Returns services that share at least one related issue with the given service */
// ✅ Added: related services engine
export const getRelatedServices = (serviceId: string): ServiceEntity[] => {
  const service = KNOWLEDGE_SERVICES[serviceId];
  if (!service) return [];
  const issueSet = new Set(service.relatedIssues);
  return Object.values(KNOWLEDGE_SERVICES).filter(
    s => s.id !== serviceId && s.relatedIssues.some(i => issueSet.has(i))
  );
};
