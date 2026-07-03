export type RelationshipType = 
  | 'RELATED_TO' | 'AVAILABLE_AT' | 'SERVES' | 'FIXES' | 'SUPPORTS' | 'HAS_FAQ';

export interface GraphRelationship {
  targetId: string;
  type: RelationshipType;
  weight?: number;
}

export interface GraphEntity {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  synonyms?: string[];
  seo: {
    canonicalUrl: string;
    description: string;
  };
  relationships?: GraphRelationship[];
}
