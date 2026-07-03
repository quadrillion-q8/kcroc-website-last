import { ValidationConfig } from './types.ts';

export const validationConfig: ValidationConfig = {
  allowedEntityTypes: ['Service', 'Location', 'FAQ', 'Brand', 'Device', 'Blog', 'Issue'],
  allowedRelationshipTypes: ['AVAILABLE_AT', 'HAS_FAQ', 'SUPPORTED_BY', 'FIXES', 'USES', 'BELONGS_TO'],
  requiredFieldsByType: {
    Service: ['id', 'slug', 'name', 'primaryKeyword', 'seo', 'schemaTypes'],
    Location: ['id', 'slug', 'name', 'lat', 'lng', 'seo'],
    Blog: ['id', 'slug', 'name', 'build']
  },
  severityOverrides: {
    'DUPLICATE_ID': 'CRITICAL',
    'DUPLICATE_SLUG': 'CRITICAL',
    'DUPLICATE_CANONICAL': 'CRITICAL',
    'BROKEN_RELATIONAL_LINK': 'ERROR',
    'INVALID_RELATIONSHIP_TYPE': 'ERROR',
    'MISSING_REQUIRED_FIELD': 'ERROR',
    'MISSING_FAQ': 'WARNING',
    'INVALID_COORDINATES': 'CRITICAL'
  },
  minKeywordCount: 3
};
