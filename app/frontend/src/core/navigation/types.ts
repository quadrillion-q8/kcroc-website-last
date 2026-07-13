import { EntityType } from '../analytics/types';

export interface NavEntity {
  id: string;
  slug: string;
  entityType: EntityType;
  primaryKeyword: string;
  title: string;
  description: string;
  iconKey: string;
  weight: number;
  commercialIntent: string;
}

export interface MegaMenuSection {
  title: string;
  items: NavEntity[];
}

export interface MegaMenuConfig {
  id: string;
  title: string;
  featured: NavEntity[];
  sections: MegaMenuSection[];
}

export interface HeaderNavItem {
  id: string;
  label: string;
  href: string;
  hasMega: boolean;
  megaMenuId?: string;
}

export interface CompiledNavigationModel {
  header: HeaderNavItem[];
  megaMenus: Record<string, MegaMenuConfig>;
  footer: {
    sections: MegaMenuSection[];
  };
}
