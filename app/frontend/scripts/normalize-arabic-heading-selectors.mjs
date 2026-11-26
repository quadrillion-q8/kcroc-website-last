// Tailwind/PostCSS can emit bare type selectors after :lang(ar), which
// browsers reject. Restore the equivalent valid type-first selector before
// Vite/esbuild receives the stylesheet. Leave other selector scopes alone.
export const normalizeArabicHeadingSelector = (selector) =>
  selector.replace(/(^|,\s*):lang\(ar\)(h[1-4])(?=\s*(?:,|$))/g,
    (_, prefix, heading) => prefix + heading + ':lang(ar)');

export default function normalizeArabicHeadingSelectors() {
  return {
    postcssPlugin: 'kcroc-normalize-arabic-heading-selectors',
    OnceExit(root) {
      root.walkRules(rule => {
        rule.selector = normalizeArabicHeadingSelector(rule.selector);
      });
    },
  };
}
