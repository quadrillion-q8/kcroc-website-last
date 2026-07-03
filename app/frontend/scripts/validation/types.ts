// File: scripts/validation/types.ts

export type SeverityLevel = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface ValidationError {
  entityId: string;
  field?: string;
  message: string;
  severity: SeverityLevel;
}

export interface ValidationReport {
  moduleName: string;
  passed: boolean;
  score: number;
  totalChecks: number;
  failedChecks: number;
  issues: ValidationError[];
}

export interface ValidationConfig {
  severityOverrides: Record<string, SeverityLevel>;
  requiredFieldsByType: Record<string, string[]>;
  allowedRelationshipTypes: string[];
  allowedEntityTypes: string[];
  minKeywordCount: number;
}
