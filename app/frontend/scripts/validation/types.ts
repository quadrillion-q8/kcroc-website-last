// File: scripts/validation/types.ts

export interface ValidationReport {
  moduleName: string;
  passed: boolean;
  score: number;       // e.g., 100 for perfect
  totalItems: number;  // How many things were checked
  errors: string[];    // Fatal issues that fail the build
  warnings: string[];  // Non-fatal issues (e.g., missing optional fields)
}
