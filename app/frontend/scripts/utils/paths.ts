// File: app/frontend/scripts/utils/paths.ts
import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Generates reliable absolute paths for ES Module scripts.
 * @param metaUrl - Pass `import.meta.url` from the calling script
 */
export const getPaths = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  
  return {
    scriptsDir: __dirname,
    frontendRoot: path.resolve(__dirname, '../../'),
    publicDir: path.resolve(__dirname, '../../public'),
  };
};
