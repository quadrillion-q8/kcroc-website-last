// File: app/frontend/postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import normalizeArabicHeadingSelectors from './scripts/normalize-arabic-heading-selectors.mjs';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    normalizeArabicHeadingSelectors(),
  ],
};
