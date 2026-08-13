// File: app/frontend/src/pages/PillarTemplate.tsx
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';

// 🚀 FIXED: Pointing directly to the newly upgraded blogPosts constant
import { BLOG_POSTS } from '../constants/blogPosts';

export default function PillarTemplate() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the specific pillar page data from the unified blog posts array
  const pillarData = BLOG_POSTS.find((p) => p.slug === slug);

  if (!pillarData) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const pageUrl = `https://www.computerrepairkuwait.com/pillar/${slug}`;

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      
      {/* 🚀 Explicit canonical Helmet injected */}
      <Helmet>
        <title>{pillarData.title} | KCROC Ultimate Guide</title>
        <meta name="description" content={pillarData.description || pillarData.excerpt || `Comprehensive guide to ${pillarData.title} in Kuwait.`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pillarData.title} />
        <meta property="og:description" content={pillarData.description || pillarData.excerpt} />
        {pillarData.image && <meta property="og:image" content={pillarData.image} />}
      </Helmet>

      <article className="max-w-5xl mx-auto px-6">
        <Link to={ROUTES.BLOG} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            {pillarData.title}
          </h1>
          <p className="text-xl text-slate-400 border-l-4 border-purple-500 pl-6">
            {pillarData.description || pillarData.excerpt}
          </p>
        </header>

        <section className="prose prose-invert prose-lg max-w-none">
          {/* Defensive rendering for the pillar content */}
          {pillarData.content?.length > 0 ? (
             pillarData.content.map((paragraph: string, index: number) => (
               <p key={index} className="mb-6 leading-relaxed text-slate-300">{paragraph}</p>
             ))
          ) : (
             <p className="text-slate-500 italic">This pillar guide is currently being compiled.</p>
          )}
        </section>
      </article>
    </main>
  );
}
