// File: app/frontend/src/constants/index.ts

// 1. Assets (Keep these, they are configuration)
export * from './assets/images';

// 2. Application Routes (Keep these)
export * from './business/routes';

// 3. Fallback Configs (Keep these)
export * from './settings/seo';
export * from './business/data';

/**
 * ⚠️ ARCHITECTURAL MIGRATION NOTICE:
 * The following content modules are DEPRECATED.
 * Access this data via 'src/core/registry' instead.
 */
// Do not import from these in new components!
