// File: app/frontend/src/knowledge/types.ts

export type EntityType = 'Service' | 'Location' | 'Brand' | 'Issue';

export interface BaseEntity {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  description: string;
}

export interface IssueEntity extends BaseEntity {
  type: 'Issue';
  symptoms: string[];
}

export interface ServiceEntity extends BaseEntity {
  type: 'Service';
  icon: string;       // We will map this to Lucide icons later
  popular: boolean;
  repairTime: string;
  relatedIssues: string[]; // The IDs of the issues this service fixes
  relatedBrands: string[]; // The IDs of the brands this service covers
}
