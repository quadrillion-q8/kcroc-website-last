// File: app/frontend/src/knowledge/registry.ts
import { ServiceEntity, IssueEntity } from './types';

// 1. THE ISSUES GRAPH (Symptoms customers search for on Google)
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
  }
};

// 2. THE SERVICES GRAPH (What you offer, linked to the issues above)
export const SERVICES: Record<string, ServiceEntity> = {
  'laptop-repair': {
    id: 'laptop-repair',
    type: 'Service',
    name: 'Laptop Repair',
    slug: 'laptop-repair-kuwait',
    description: 'Comprehensive hardware diagnostics, thermal management, and restoration for all Windows laptops.',
    icon: 'Laptop',
    popular: true,
    repairTime: 'Same Day / 24 Hours',
    relatedIssues: ['logic-board-failure', 'screen-damage', 'thermal-throttling'],
    relatedBrands: ['dell', 'hp', 'lenovo', 'asus']
  },
  'macbook-repair': {
    id: 'macbook-repair',
    type: 'Service',
    name: 'MacBook Repair',
    slug: 'macbook-repair-kuwait',
    description: 'Expert Apple logic board micro-soldering and OEM screen replacement.',
    icon: 'Apple',
    popular: true,
    repairTime: '24-48 Hours',
    relatedIssues: ['logic-board-failure', 'screen-damage'],
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
    relatedIssues: ['thermal-throttling', 'logic-board-failure'],
    relatedBrands: ['custom-build', 'msi', 'alienware']
  }
};

// 3. THE QUERY ENGINE (APIs for your templates to fetch this data)
export const getServiceBySlug = (slug: string): ServiceEntity | undefined => {
  return Object.values(SERVICES).find(service => service.slug === slug);
};

export const getRelatedIssuesForService = (serviceId: string): IssueEntity[] => {
  const service = SERVICES[serviceId];
  if (!service) return [];
  // Magically traverses the graph to pull the full issue details based on the IDs
  return service.relatedIssues.map(issueId => ISSUES[issueId]).filter(Boolean);
};
