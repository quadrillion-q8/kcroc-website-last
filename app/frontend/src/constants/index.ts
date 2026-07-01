// File: app/frontend/src/constants/index.ts

// 1. Assets (Configuration)
// Updated path: Goes up one level to src/assets/images
// Note: If you do not actually have an exported images file there, 
// you can safely comment this line out to prevent build errors.
export * from '../assets/images';

// 2. Application Routes
// Updated path: Points directly to the routes file in this folder
export * from './routes';

// 3. Fallback Configs
// Updated path: Points directly to the data file in this folder
export * from './data';

// If you still have a separate seo.ts file in this folder, you can export it here:
// export * from './seo';

/**
 * ⚠️ ARCHITECTURAL MIGRATION NOTICE:
 * The following content modules are DEPRECATED.
 * Access this data via 'src/core/registry' instead.
 */
