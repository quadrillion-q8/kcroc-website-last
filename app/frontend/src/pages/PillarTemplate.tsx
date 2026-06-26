import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants/blogPosts';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { autoLinkText } from '../utils/linkGraph';

export default function PillarTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post || !post.isPillar) return <Navigate to={ROUTES.blog} replace />;

  // Find all clusters that belong to this pillar
  const clusters = useMemo(() => 
    BLOG_POSTS.filter(p => p.clusterParent === post.slug), 
  [post.slug]);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-slate-200">
      <h1 className="text-5xl font-black text-white mb-8">{post.title}</h1>
      
      {/* Pillar Content */}
      <article className="prose prose-invert prose-lg mb-16">
        {post.content.map((p, i) => <p key={i}>{autoLinkText(p)}</p>)}
      </article>

      {/* Cluster List */}
      <section className="border-t border-slate-800 pt-12">
        <h2 className="text-2xl font-bold text-white mb-8">Related Deep-Dive Topics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {clusters.map(cluster => (
            <Link 
              key={cluster.slug} 
              to={getBlogRoute(cluster.slug)}
              className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <h3 className="font-bold text-cyan-400 mb-2">{cluster.title}</h3>
              <p className="text-sm text-slate-400">{cluster.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
