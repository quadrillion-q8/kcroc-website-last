// File: app/frontend/src/pages/Blog.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

import { ROUTES, getBlogRoute } from '../constants/routes';
import { BLOG_POSTS } from '../constants/blogPosts';
import { KCROC_GRAPH } from '../data/graph';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';

// Single source of truth for business identity — see graph.ts 'biz-kcroc'.
// (Previously duplicated via constants/data.ts's BUSINESS_INFO.)
const business = KCROC_GRAPH.business!;
// Canonical Person @id for the real author bio page — matches SEOEngine.tsx's
// AUTHOR_ID, used so posts genuinely written by Imran connect to that Person
// entity instead of being flattened into a generic Organization credit.
const IMRAN_AUTHOR_ID = 'https://www.computerrepairkuwait.com/author/imran#person';

// 🚀 FIX: A handful of long-form articles (the buying guide, its Arabic
// version, and the Intel vs AMD comparison) are modeled as knowledge-graph
// WebPage entities rather than BLOG_POSTS entries, since they're bespoke
// components rather than the simple content-array format. That's fine for
// routing/SSG, but it meant they were invisible on this listing page, which
// only ever mapped over BLOG_POSTS. This pulls their title/description
// straight from the graph (so copy can't drift out of sync) and supplies
// just the extra display metadata (image, category, date, read time) that
// the graph doesn't carry.
interface ExtraGuideCard {
  entityId: string;
  href: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

const EXTRA_GUIDES: ExtraGuideCard[] = [
  {
    entityId: 'guide-laptop-buying',
    href: '/blog/laptop-buying-guide-kuwait-2026',
    image: '/images/blog/laptop-buying-guide-kuwait-2026.webp',
    category: 'Buying Guide',
    date: '2026-08-07',
    readTime: '23 min read',
  },
  {
    entityId: 'guide-intel-vs-amd',
    href: '/blog/intel-core-ultra-vs-amd-ryzen-ai',
    image: '/images/blog/intel-core-ultra-vs-amd-ryzen-ai-comparison.webp',
    category: 'Hardware Comparison',
    date: '2026-08-07',
    readTime: '8 min read',
  },
  {
    entityId: 'guide-laptop-buying-ar',
    href: '/blog/ar/laptop-buying-guide-kuwait-2026',
    image: '/images/blog/laptop-buying-guide-kuwait-arabic-2026.webp',
    category: 'دليل الشراء',
    date: '2026-08-07',
    readTime: 'قراءة 23 دقيقة',
  },
];

interface BlogCardItem {
  key: string;
  href: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export default function Blog() {
  const pageUrl = `${business.websiteUrl}${ROUTES.BLOG}`;

  const displayPosts: BlogCardItem[] = useMemo(() => {
    const fromBlogPosts: BlogCardItem[] = BLOG_POSTS.map((post) => ({
      key: post.slug,
      href: getBlogRoute(post.slug),
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
    }));

    const fromGraph: BlogCardItem[] = EXTRA_GUIDES.flatMap((guide) => {
      const entity = KCROC_GRAPH.pages.find((p) => p.id === guide.entityId);
      if (!entity) return [];
      return [{
        key: guide.entityId,
        href: guide.href,
        title: entity.title,
        excerpt: entity.description,
        image: guide.image,
        category: guide.category,
        date: guide.date,
        readTime: guide.readTime,
      }];
    });

    return [...fromBlogPosts, ...fromGraph].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  // =========================
  // SEO SCHEMA (Preserved for Collection Mapping)
  // =========================
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      // ─────────────────────────────
      // COLLECTION PAGE
      // ─────────────────────────────
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        "name": "KCROC Tech Blog - Computer Repair Guides Kuwait",
        "description": "Expert computer repair guides, laptop fixes, MacBook troubleshooting, and PC performance tips in Kuwait.",
        "url": pageUrl,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${business.websiteUrl}/#website`
        }
      },

      // ─────────────────────────────
      // ITEM LIST (VERY IMPORTANT FOR SEO)
      // ─────────────────────────────
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        "name": "KCROC Blog Posts",
        "itemListElement": displayPosts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": post.title,
          "url": `${business.websiteUrl}${post.href}`
        }))
      },

      // ─────────────────────────────
      // BLOG POST ENTITIES
      // ─────────────────────────────
      ...BLOG_POSTS.map(post => ({
        "@type": "BlogPosting",
        "@id": `${business.websiteUrl}${getBlogRoute(post.slug)}#post`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "url": `${business.websiteUrl}${getBlogRoute(post.slug)}`,
        "datePublished": post.date,
        // Posts credited to "Imran" by name are genuinely his — connect them to
        // the real Person entity. Team-credited posts (e.g. "KCROC Gaming
        // Specialists") stay attributed to the Organization, since there's no
        // single named author for those.
        "author": post.author === 'Imran'
          ? { "@type": "Person", "@id": IMRAN_AUTHOR_ID }
          : { "@type": "Organization", "name": post.author || business.legalName },
        "publisher": {
          "@type": "Organization",
          "name": business.legalName,
          "url": business.websiteUrl
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${business.websiteUrl}${getBlogRoute(post.slug)}`
        }
      }))
    ]
  }), [pageUrl, displayPosts]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-8 sm:pt-16 lg:pt-32 pb-8 sm:pb-16 lg:pb-24">
      {/* PHASE 2 AUTOMATION IN ACTION: Basic Tags Handled */}
      <SEOEngine entityId="page-blog" />

      {/* Dynamic Schema Injection for the Collection List */}
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* =========================
          BREADCRUMBS
      ========================= */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li>
            <Link to={ROUTES.HOME} className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-slate-600" aria-hidden="true">/</li>
          <li aria-current="page" className="text-cyan-400">
            Blog
          </li>
        </ol>
      </nav>

      {/* =========================
          HERO
      ========================= */}
      <section className="relative px-6 text-center mb-20 z-10">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
            <BookOpen size={14} aria-hidden="true" />
            Tech Insights
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            KCROC Tech <span className="text-cyan-400">Blog</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Expert repair guides, troubleshooting tips, and hardware insights
            from Kuwait’s leading computer technicians.
          </p>
        </div>
      </section>

      {/* =========================
          BLOG GRID
      ========================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <article
              key={post.key}
              className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* IMAGE */}
              <Link
                to={post.href}
                className="block aspect-[16/9] overflow-hidden bg-slate-950"
                rel="bookmark"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
                />
              </Link>

              {/* CONTENT */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  <span className="text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar size={12} aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <Link to={post.href}>
                  <h2 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 mt-auto">
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock size={12} aria-hidden="true" />
                    {post.readTime}
                  </span>

                  <Link
                    to={post.href}
                    className="text-sm font-bold text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all"
                    rel="bookmark"
                  >
                    Read Post <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
