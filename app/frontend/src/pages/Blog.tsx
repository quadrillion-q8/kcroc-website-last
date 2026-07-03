// File: app/frontend/src/pages/Blog.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { BLOG_POSTS } from '../constants/blogPosts';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

export default function Blog() {
  const pageUrl = `${BUSINESS_INFO.url}${ROUTES.blog}`;

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
          "@id": `${BUSINESS_INFO.url}/#website`
        }
      },

      // ─────────────────────────────
      // ITEM LIST (VERY IMPORTANT FOR SEO)
      // ─────────────────────────────
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        "name": "KCROC Blog Posts",
        "itemListElement": BLOG_POSTS.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": post.title,
          "url": `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`
        }))
      },

      // ─────────────────────────────
      // BLOG POST ENTITIES
      // ─────────────────────────────
      ...BLOG_POSTS.map(post => ({
        "@type": "BlogPosting",
        "@id": `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}#post`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "url": `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`,
        "datePublished": post.date,

        "author": {
          "@type": "Organization",
          "name": post.author || BUSINESS_INFO.name
        },

        "publisher": {
          "@type": "Organization",
          "name": BUSINESS_INFO.name,
          "url": BUSINESS_INFO.url
        },

        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`
        }
      }))
    ]
  }), [pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">

      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Basic Tags Handled */}
      <SEOEngine entityId="page-blog" />

      {/* 🚀 Dynamic Schema Injection for the Collection List */}
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* =========================
          BREADCRUMBS
      ========================= */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li>
            <Link to={ROUTES.home} className="hover:text-cyan-400 transition-colors">
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

          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >

              {/* IMAGE */}
              <Link
                to={getBlogRoute(post.slug)}
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

                <Link to={getBlogRoute(post.slug)}>
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
                    to={getBlogRoute(post.slug)}
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
