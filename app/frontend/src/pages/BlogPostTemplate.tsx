// File: src/pages/BlogPostTemplate.tsx
import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  Calendar, Clock, User, ArrowLeft, ExternalLink, Share2, ChevronRight, Network
} from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { BLOG_POSTS, BlogPost } from '../constants/blogPosts';

// ✅ FIXED: Imported the AutoLink component
import { AutoLink } from '../utils/linkGraph'; 
import { getIntentWhatsAppLink } from '../utils/whatsappIntent';
import { trackLead } from '../utils/analytics'; 
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

export default function BlogPostTemplate() {
  const { slug } = useParams<{ slug: string }>();

  // Find the current post
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to={ROUTES.blog} replace />;

  const pageUrl = `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`;
  const waLink = getIntentWhatsAppLink("blog", post.title);

  // ─── CLUSTER LOGIC ───
  const relatedPosts = useMemo(() => {
    if (post.isPillar) {
      return BLOG_POSTS.filter(p => p.clusterParent === post.slug).slice(0, 2);
    } else if (post.clusterParent) {
      const parent = BLOG_POSTS.find(p => p.slug === post.clusterParent);
      const sibling = BLOG_POSTS.find(p => p.clusterParent === post.clusterParent && p.slug !== post.slug);
      return [parent, sibling].filter(Boolean) as BlogPost[];
    }
    return [];
  }, [post]);

  // ─── SEO SCHEMA ───
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": post.title,
        "description": post.description || post.excerpt,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": ["BlogPosting", "Article"],
        "@id": `${pageUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": BUSINESS_INFO.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${BUSINESS_INFO.url}/logo.png`
          }
        },
        "mainEntityOfPage": { "@id": `${pageUrl}#webpage` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BUSINESS_INFO.url}${ROUTES.blog}` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": pageUrl }
        ]
      }
    ]
  }), [post, pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <MetaSEO
        title={`${post.title} | ${BUSINESS_INFO.shortName}`}
        description={post.excerpt}
        canonical={pageUrl}
        ogType="article"
        ogImage={post.image}
      />
      <SchemaMarkup schema={SCHEMA_DATA} />

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
        <header className="mb-12">
          <Link to={ROUTES.blog} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
            <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">{post.category}</span>
            {post.isPillar && (
              <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                <Network size={12} /> Pillar Guide
              </span>
            )}
            <span className="flex items-center gap-1.5 mt-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5 mt-1"><Clock size={14} /> {post.readTime}</span>
            <span className="flex items-center gap-1.5 mt-1"><User size={14} /> {post.author}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">{post.title}</h1>

          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-90" loading="eager" />
          </div>
        </header>

        <section className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-cyan-400 mb-16">
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed border-l-4 border-cyan-500 pl-6 mb-10">
            {post.excerpt}
          </p>

          <div className="space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index}><AutoLink text={paragraph} /></p>
            ))}
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl my-12 text-center">
            <h3 className="text-2xl text-white font-black mb-4 flex items-center justify-center gap-2">
              <Share2 size={24} className="text-cyan-400" /> Need Professional Assistance?
            </h3>
            <p className="text-slate-400 mb-8 text-base max-w-lg mx-auto">
              Get free diagnostics and free pickup anywhere in Kuwait. Do not risk permanent hardware damage.
            </p>
            <a
              href={waLink}
              onClick={() => trackLead('Blog_CTA_Click')} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition-colors text-black px-8 py-4 rounded-xl font-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              Discuss Your Issue on WhatsApp <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mt-16 border-t border-slate-800/50 pt-12">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
            <Network className="text-cyan-400" /> Deep Dive Topics
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map(r => (
              <Link key={r.slug} to={getBlogRoute(r.slug)} className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{r.category}</span>
                  {r.isPillar && <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Pillar</span>}
                </div>
                <h4 className="text-lg text-white font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">{r.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-2 mt-auto">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
