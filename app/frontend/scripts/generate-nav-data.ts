// File: app/frontend/scripts/generate-nav-data.ts
//
// WHY THIS EXISTS:
// src/data/graph.ts is a single large knowledge graph containing services,
// FAQs, blog/guide entities, locations, and case studies. Header/Footer render
// on every route, so importing the entire graph into the navigation bundle is
// unnecessarily expensive.
//
// This build-time projection keeps graph.ts as the source of truth while
// exporting only the small fields the global navigation actually needs.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KCROC_GRAPH } from '../src/data/graph';
import { BLOG_POSTS } from '../src/constants/blogPosts';
import { getContentRoute } from '../src/constants/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.resolve(__dirname, '../src/data/navGraph.generated.ts');

type NavEntitySource = {
  id: string;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  iconKey?: string;
  popular?: boolean;
  warranty?: { noFixNoFee?: boolean };
  coreFeatures?: unknown[];
  pricing?: unknown;
};

type ContentEntry = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconKey: string;
  date: string;
  primaryKeyword: string;
};

const slimEntity = (e: NavEntitySource) => ({
  id: e.id,
  slug: e.slug ?? '',
  title: e.title ?? e.name ?? 'Unknown',
  description: e.description ?? '',
  iconKey: e.iconKey ?? '',
  popular: !!e.popular,
  noFixNoFee: !!e.warranty?.noFixNoFee,
  hasManyFeatures: (e.coreFeatures?.length ?? 0) > 3,
  hasPricing: !!e.pricing,
});

const slimCaseStudy = (e: NavEntitySource) => ({
  id: e.id,
  slug: e.slug ?? '',
  title: e.title ?? 'Unknown',
  description: e.description ?? '',
});

const iconForContent = (slug: string): string => {
  const normalized = slug.toLowerCase();
  if (normalized.includes('gaming') || normalized.includes('gamebar')) return 'gaming';
  if (normalized.includes('overheat') || normalized.includes('thermal') || normalized.includes('temperature')) return 'cpu';
  if (normalized.includes('battery')) return 'battery';
  if (normalized.includes('bios') || normalized.includes('cpu') || normalized.includes('amd') || normalized.includes('intel')) return 'cpu';
  if (normalized.includes('screen') || normalized.includes('display')) return 'monitor';
  if (normalized.includes('windows')) return 'shield';
  if (normalized.includes('ram') || normalized.includes('ssd') || normalized.includes('upgrade')) return 'hard-drive';
  return 'laptop';
};

const normalizePath = (route: string): string => {
  const withLeadingSlash = route.startsWith('/') ? route : `/${route}`;
  if (withLeadingSlash === '/') return withLeadingSlash;
  return withLeadingSlash.replace(/\/+$/, '');
};

const contentEntries = new Map<string, ContentEntry>();

// BLOG_POSTS is the canonical content inventory for posts and guide-style
// posts. Arabic counterparts are first-class menu entries rather than being
// swapped only after a visitor is already on an Arabic URL.
for (const post of BLOG_POSTS) {
  const route = normalizePath(getContentRoute(post.slug, post.contentType ?? 'blog'));
  const baseEntry: ContentEntry = {
    id: post.id,
    slug: route.slice(1),
    title: post.title,
    description: post.description ?? post.excerpt,
    iconKey: iconForContent(route),
    date: post.date,
    primaryKeyword: post.tags?.[0] ?? post.category,
  };
  contentEntries.set(route, baseEntry);

  if (post.arabicSlug) {
    const arabicRoute = normalizePath(getContentRoute(post.arabicSlug, post.contentType ?? 'blog'));
    const graphPage = (KCROC_GRAPH.pages ?? []).find((page) => normalizePath(page.slug) === arabicRoute);
    contentEntries.set(arabicRoute, graphPage ? {
      id: graphPage.id,
      slug: arabicRoute.slice(1),
      title: graphPage.title,
      description: graphPage.description,
      iconKey: iconForContent(arabicRoute),
      date: graphPage.seo.lastModified ?? post.date,
      primaryKeyword: graphPage.title.toLowerCase(),
    } : {
      ...baseEntry,
      id: `${post.id}-ar`,
      slug: arabicRoute.slice(1),
      title: `${post.title} (العربية)`,
      description: post.excerpt,
      primaryKeyword: `${post.tags?.[0] ?? post.category} ar`,
    });
  }
}

// Any first-class WebPage blog/guide entities not represented in BLOG_POSTS
// are added too. This makes the generated menu robust for custom-rendered
// article pages and prevents content from being silently absent from nav.
for (const page of KCROC_GRAPH.pages ?? []) {
  const pathName = normalizePath(page.slug ?? '');
  if (!pathName.startsWith('/blog/') && !pathName.startsWith('/guides/')) continue;
  if (contentEntries.has(pathName)) continue;

  contentEntries.set(pathName, {
    id: page.id,
    slug: pathName.slice(1),
    title: page.title,
    description: page.description,
    iconKey: iconForContent(pathName),
    date: page.seo.lastModified ?? '',
    primaryKeyword: page.title.toLowerCase(),
  });
}

const blogEntries = [...contentEntries.values()]
  .filter((entry) => entry.slug.startsWith('blog/'))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

const guideEntries = [...contentEntries.values()]
  .filter((entry) => entry.slug.startsWith('guides/'))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

const navData = {
  // The Business entity itself is small (~600 bytes) — Header/Footer need
  // most of its fields (phone, logo, socials, address, rating, hours), so it
  // is included wholesale rather than field-by-field.
  business: KCROC_GRAPH.business ?? null,
  footer: KCROC_GRAPH.footer?.links ?? null,
  trustBadges: (KCROC_GRAPH.trustBadges ?? []).map((b) => ({
    id: b.id,
    title: b.title,
    iconKey: b.iconKey,
  })),
  services: (KCROC_GRAPH.services ?? []).map(slimEntity),
  brands: (KCROC_GRAPH.brands ?? []).map(slimEntity),
  problems: (KCROC_GRAPH.problems ?? []).map(slimEntity),
  caseStudies: (KCROC_GRAPH.caseStudies ?? []).map(slimCaseStudy),
  blogEntries,
  guideEntries,
};

const banner = `// File: app/frontend/src/data/navGraph.generated.ts
// 🚀 AUTO-GENERATED by scripts/generate-nav-data.ts — DO NOT EDIT BY HAND.
// Regenerated automatically on every "dev" and "build" run from graph.ts + blogPosts.ts.
// This is a deliberately slim subset (nav-relevant fields only) so that
// Header/Footer/NavigationCompiler — which render on every route — don't
// pull the full knowledge graph or full rich-content payload into the main entry bundle.
`;

const fileContents = `${banner}
export const NAV_GRAPH = ${JSON.stringify(navData, null, 2)} as const;
`;

fs.writeFileSync(outPath, fileContents, 'utf-8');
console.log(`✅ Generated ${path.relative(process.cwd(), outPath)} (${(fileContents.length / 1024).toFixed(1)} KB)`);
