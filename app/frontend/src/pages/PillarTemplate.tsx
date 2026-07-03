// File: app/frontend/src/pages/PillarTemplate.tsx
import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants/blogPosts';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { BUSINESS_INFO } from '../constants/data';

// ✅ FIXED: Imported the AutoLink component and SEO Engine
import { AutoLink } from '../utils/linkGraph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

export default function PillarTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post || !post.isPillar) return <Navigate to={ROUTES.blog} replace />;

  const pageUrl = `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}`;

  // Find all clusters that belong to this pillar
  const clusters = useMemo(() => 
    BLOG_POSTS.filter(p => p.clusterParent === post.slug), 
  [post.slug]);

  // ─── SEO SCHEMA (Dynamic for Pillar Pages) ───
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": post.title,
        "description": post.excerpt,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "mainEntityOfPage": { "@id": `${pageUrl}#webpage` }
      }
    ]
  }), [post, pageUrl]);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-slate-200">
      
      {/* 🚀 Dynamic SEO Engine for Pillar Pages */}
      <SEOEngine entityId={`post-${slug}`} />
      <SchemaMarkup schema={SCHEMA_DATA} />
      
      <h1 className="text-5xl font-black text-white mb-8">{post.title}</h1>
      
      {/* Pillar Content */}
      <article className="prose prose-invert prose-lg mb-16">
        {post.content.map((p, i) => (
          <p key={i}>
            <AutoLink text={p} />
          </p>
        ))}
      </article>

      {/* Cluster List */}
      {clusters.length > 0 && (
        <section className="border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Related Deep-Dive Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {clusters.map(cluster => (
              <Link 
                key={cluster.slug} 
                to={getBlogRoute(cluster.slug)}
                className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800/50"
              >
                <h3 className="font-bold text-cyan-400 mb-2">{cluster.title}</h3>
                <p className="text-sm text-slate-400">{cluster.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
