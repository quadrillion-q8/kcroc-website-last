import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ExternalLink,
  Share2,
  ChevronRight
} from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { BLOG_POSTS } from '../constants/blogPosts';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import Layout from '../components/Layout';

export default function BlogPostTemplate() {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <Navigate to={ROUTES.blog} replace />;

  const pageUrl = `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`;

  const waMessage = encodeURIComponent(
    `Hi KCROC, I read your article "${post.title}" and need help with my device.`
  );

  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  // =========================
  // SEO SCHEMA (FULL STACK)
  // =========================
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",

    "@graph": [
      // ─────────────────────────────
      // WEBPAGE ENTITY
      // ─────────────────────────────
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": post.title,
        "description": post.description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${BUSINESS_INFO.url}/#website`
        }
      },

      // ─────────────────────────────
      // ARTICLE / BLOG POST (MAIN SEO ENTITY)
      // ─────────────────────────────
      {
        "@type": ["BlogPosting", "Article"],
        "@id": `${pageUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "dateModified": post.date,

        "author": {
          "@type": "Organization",
          "name": post.author || BUSINESS_INFO.name
        },

        "publisher": {
          "@type": "Organization",
          "name": BUSINESS_INFO.name,
          "url": BUSINESS_INFO.url,
          "logo": {
            "@type": "ImageObject",
            "url": `${BUSINESS_INFO.url}/logo.png`
          }
        },

        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },

        // AI / voice search enhancement
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "p"]
        }
      },

      // ─────────────────────────────
      // BREADCRUMBS (IMPORTANT)
      // ─────────────────────────────
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BUSINESS_INFO.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${BUSINESS_INFO.url}${ROUTES.blog}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": pageUrl
          }
        ]
      }
    ]
  }), [post, pageUrl]);

  return (
    <Layout>
      <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">

        {/* =========================
            SEO
        ========================= */}
        <MetaSEO
          title={`${post.title} | KCROC Tech Blog`}
          description={post.description}
          canonical={pageUrl}
          ogType="article"
          ogImage={post.image}
        />

        <SchemaMarkup schema={SCHEMA_DATA} />

        {/* =========================
            BREADCRUMBS
        ========================= */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 mb-8">
          <ol className="flex items-center gap-2 text-sm text-slate-400 overflow-x-auto pb-2 scrollbar-hide">
            <li><Link to={ROUTES.home} className="hover:text-cyan-400">Home</Link></li>
            <ChevronRight size={14} />
            <li><Link to={ROUTES.blog} className="hover:text-cyan-400">Blog</Link></li>
            <ChevronRight size={14} />
            <li className="text-cyan-400 truncate">{post.title}</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto px-6">

          {/* =========================
              HEADER
          ========================= */}
          <header className="mb-12">

            <Link
              to={ROUTES.blog}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                {post.category}
              </span>

              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime}
              </span>

              <span className="flex items-center gap-1.5">
                <User size={14} /> {post.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              {post.title}
            </h1>

            <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover opacity-90"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </header>

          {/* =========================
              CONTENT
          ========================= */}
          <section className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-cyan-400 mb-16">

            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed border-l-4 border-cyan-500 pl-6 mb-8">
              {post.excerpt}
            </p>

            <p>
              Hardware issues can bring your workflow to a halt. In Kuwait,
              we regularly diagnose laptop failures, overheating PCs, SSD
              issues, and motherboard faults at our Hawalli repair center.
            </p>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl my-10">
              <h3 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                <Share2 size={20} className="text-cyan-400" />
                Need Expert Help?
              </h3>

              <p className="text-slate-400 mb-6 text-base">
                Get free diagnostics and free pickup anywhere in Kuwait. Don't risk permanent hardware damage.
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition-colors text-black px-6 py-3 rounded-xl font-black"
              >
                Chat on WhatsApp <ExternalLink size={18} />
              </a>
            </div>

          </section>

        </article>

        {/* =========================
            RELATED POSTS
        ========================= */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 mt-16 border-t border-slate-800/50 pt-12">
            <h3 className="text-2xl font-black text-white mb-8">Related Articles</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(r => (
                <Link
                  key={r.slug}
                  to={getBlogRoute(r.slug)}
                  className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors group flex flex-col"
                >
                  <span className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">{r.category}</span>
                  <h4 className="text-lg text-white font-bold mt-2 mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2 mt-auto">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </Layout>
  );
}
