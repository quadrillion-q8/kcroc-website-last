// File: app/frontend/src/pages/BlogPostTemplate.tsx
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar, Clock, User, ArrowLeft, ExternalLink, Share2, ChevronRight, Network,
  List, Info, Lightbulb, Sparkles, AlertTriangle, HelpCircle, Quote as QuoteIcon,
  ChevronDown, Link2, ArrowUp, Phone, MessageCircle, Check
} from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { ROUTES, getBlogRoute } from '../constants/routes';
import { BLOG_POSTS, BlogPost, ContentBlock } from '../constants/blogPosts';
import { AutoLink } from '../utils/linkGraph';
import { getIntentWhatsAppLink } from '../utils/whatsappIntent';
import { trackLead } from '../utils/analytics';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ═══════════════════════════════════════════════════════════════════
   CALLOUT STYLING
═══════════════════════════════════════════════════════════════════ */

const CALLOUT_STYLES: Record<string, { icon: React.ElementType; border: string; bg: string; text: string; label: string }> = {
  info:           { icon: Info,          border: 'border-cyan-500/30',    bg: 'bg-cyan-500/5',    text: 'text-cyan-400',    label: 'Info' },
  tip:            { icon: Lightbulb,     border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', text: 'text-emerald-400', label: 'Performance Tip' },
  expert:         { icon: Sparkles,      border: 'border-purple-500/30',  bg: 'bg-purple-500/5',  text: 'text-purple-400',  label: 'Expert Advice' },
  warning:        { icon: AlertTriangle, border: 'border-amber-500/30',   bg: 'bg-amber-500/5',   text: 'text-amber-400',   label: 'Warning' },
  recommendation: { icon: Check,         border: 'border-cyan-500/30',    bg: 'bg-cyan-500/5',    text: 'text-cyan-400',    label: 'Pro Recommendation' },
  didyouknow:     { icon: HelpCircle,    border: 'border-slate-600/50',   bg: 'bg-slate-800/40',  text: 'text-slate-300',   label: 'Did You Know?' },
};

/* ═══════════════════════════════════════════════════════════════════
   FAQ ITEM (accessible native <details>, no JS required to function)
═══════════════════════════════════════════════════════════════════ */

const FAQAccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <details className="group border border-slate-800 rounded-2xl bg-slate-900/40 open:border-cyan-500/40 transition-colors">
    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-white select-none">
      <span>{question}</span>
      <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
    </summary>
    <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{answer}</div>
  </details>
);

/* ═══════════════════════════════════════════════════════════════════
   RICH CONTENT BLOCK RENDERER
═══════════════════════════════════════════════════════════════════ */

const RichBlock: React.FC<{ block: ContentBlock; headingRef?: (el: HTMLElement | null) => void }> = ({ block, headingRef }) => {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={block.id} ref={headingRef as any} className="scroll-mt-28 text-2xl md:text-3xl font-black text-white mt-14 mb-5">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 id={block.id} className="scroll-mt-28 text-xl md:text-2xl font-bold text-white mt-10 mb-4">
          {block.text}
        </h3>
      );
    case 'paragraph':
      return (
        <p className="text-slate-300 leading-relaxed mb-6">
          <AutoLink text={block.text} />
        </p>
      );
    case 'callout': {
      const style = CALLOUT_STYLES[block.variant] ?? CALLOUT_STYLES.info;
      const Icon = style.icon;
      return (
        <div className={`flex gap-4 p-6 rounded-2xl border ${style.border} ${style.bg} my-8 shadow-sm`} role="note">
          <Icon className={`w-6 h-6 shrink-0 ${style.text}`} aria-hidden="true" />
          <div>
            <p className={`text-xs font-black uppercase tracking-wider mb-1.5 ${style.text}`}>{block.title || style.label}</p>
            {/* Added AutoLink for consistency within Callouts */}
            <p className="text-slate-300 text-sm leading-relaxed"><AutoLink text={block.text} /></p>
          </div>
        </div>
      );
    }
    case 'quote':
      return (
        <blockquote className="my-10 border-l-4 border-cyan-500 pl-6 py-2">
          <QuoteIcon className="w-6 h-6 text-cyan-500/50 mb-2" aria-hidden="true" />
          {/* Added AutoLink for consistency within Quotes */}
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic"><AutoLink text={block.text} /></p>
          {block.attribution && <cite className="block mt-3 text-sm text-slate-500 not-italic">— {block.attribution}</cite>}
        </blockquote>
      );
    case 'statCards':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
          {block.items.map((s, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">{s.value}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case 'comparisonTable':
      return (
        <div className="my-10 overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <caption className="sr-only">{block.title || 'Comparison table'}</caption>
            <thead>
              <tr className="bg-slate-900/80">
                <th scope="col" className="text-left p-4 text-slate-400 font-bold uppercase text-xs tracking-wide">Feature</th>
                {block.columns.map((col, i) => (
                  <th key={i} scope="col" className={`p-4 text-center font-black uppercase text-xs tracking-wide ${i === 1 ? 'text-cyan-400 bg-cyan-500/5' : 'text-slate-300'}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-slate-800/70">
                  <th scope="row" className="p-4 text-left text-slate-300 font-semibold">{row.feature}</th>
                  {row.values.map((v, ci) => (
                    <td key={ci} className={`p-4 text-center text-slate-400 ${ci === 1 ? 'bg-cyan-500/5 text-cyan-300 font-medium' : ''}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'timeline':
      return (
        <div className="my-10">
          {block.title && <h3 className="text-lg font-bold text-white mb-6">{block.title}</h3>}
          <ol className="relative border-l border-slate-800 pl-6 space-y-6">
            {block.steps.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-500 ring-4 ring-slate-950" aria-hidden="true" />
                <p className="font-bold text-white">{step.label}</p>
                {step.note && <p className="text-sm text-slate-400 mt-0.5">{step.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      );
    case 'faq':
      return (
        <div className="my-10 space-y-3" aria-label="Frequently asked questions">
          {block.items.map((item, i) => (
            <FAQAccordionItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      );
    case 'image':
      return (
        <figure className="my-10">
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="w-full rounded-2xl border border-slate-800" />
          {block.caption && <figcaption className="text-xs text-slate-500 text-center mt-2">{block.caption}</figcaption>}
        </figure>
      );
    default: {
      // Type-safety exhaustiveness check — catches new block types at compile time
      const _exhaustiveCheck: never = block;
      console.warn(`Unhandled block type encountered: ${(_exhaustiveCheck as any)?.type}`);
      return null;
    }
  }
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */

export default function BlogPostTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const articleRef = useRef<HTMLElement>(null);
  const headingRefs = useRef<Record<string, HTMLElement | null>>({});

  // 🩹 FIX: all hooks in this component now run unconditionally on every
  // render. Previously `if (!post) return <Navigate .../>` sat in the middle
  // of the hook list (after `headings` but before five other useMemo calls),
  // a Rules-of-Hooks violation. Since every blog post routes through this
  // one shared template, navigating client-side from an invalid slug to a
  // valid one (or vice versa) — no full page remount — would make React
  // throw "rendered fewer/more hooks than expected" and crash the page.
  // Each memo below is now null-safe via `post?.` and the not-found bailout
  // happens after all hooks have run.
  const headings = useMemo(
    () => (post?.richContent?.filter((b): b is Extract<ContentBlock, { type: 'h2' }> => b.type === 'h2') ?? []),
    [post]
  );

  // Reading progress bar + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post]);

  // Scroll-spy for the Table of Contents
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveHeadingId(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const setHeadingRef = useCallback((id: string) => (el: HTMLElement | null) => {
    headingRefs.current[id] = el;
  }, []);

  const pageUrl = post ? `${BUSINESS_INFO.url}${getBlogRoute(post.slug)}` : '';
  const waLink = post ? getIntentWhatsAppLink("blog", post.title) : '';

  // Combine all FAQ blocks for unified Schema.org metadata
  const faqBlocks = useMemo(
    () => post?.richContent?.filter((b): b is Extract<ContentBlock, { type: 'faq' }> => b.type === 'faq') ?? [],
    [post]
  );
  
  const allFaqItems = useMemo(
    () => faqBlocks.flatMap(block => block.items),
    [faqBlocks]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    if (post.isPillar) {
      return BLOG_POSTS.filter(p => p.clusterParent === post.slug).slice(0, 5);
    } else if (post.clusterParent) {
      const parent = BLOG_POSTS.find(p => p.slug === post.clusterParent);
      const siblings = BLOG_POSTS.filter(p => p.clusterParent === post.clusterParent && p.slug !== post.slug);
      return [parent, ...siblings].filter(Boolean) as BlogPost[];
    }
    return [];
  }, [post]);

  const recentPosts = useMemo(
    () => post ? BLOG_POSTS.filter(p => p.slug !== post.slug).sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 4) : [],
    [post]
  );

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    BLOG_POSTS.forEach(p => map.set(p.category, (map.get(p.category) || 0) + 1));
    return Array.from(map.entries());
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setLinkCopied(true);
      trackLead('Blog_CopyLink_Click');
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* clipboard API unavailable — fail silently, non-critical */
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url: pageUrl });
        trackLead('Blog_Share_Click');
      } catch {
        /* user cancelled share sheet — no action needed */
      }
    } else {
      handleCopyLink();
    }
  };

  // ─── SEO SCHEMA: WebPage + BlogPosting/Article + optional FAQPage + Breadcrumb ───
  const SCHEMA_DATA = useMemo(() => {
    if (!post) return null;
    return {
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
          "author": { "@type": "Person", "name": post.author },
          "publisher": {
            "@type": "Organization",
            "name": BUSINESS_INFO.name,
            "logo": { "@type": "ImageObject", "url": `${BUSINESS_INFO.url}/logo.webp`, "width": 224, "height": 224 }
          },
          "mainEntityOfPage": { "@id": `${pageUrl}#webpage` }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BUSINESS_INFO.url}${ROUTES.BLOG}` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": pageUrl }
          ]
        },
        ...(allFaqItems.length > 0 ? [{
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
          "mainEntity": allFaqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        }] : [])
      ]
    };
  }, [post, pageUrl, allFaqItems]);

  // All hooks have now run unconditionally on every render — safe to bail out.
  if (!post) return <Navigate to={ROUTES.BLOG} replace />;

  return (
    <main className="w-full min-h-screen bg-slate-950 text-slate-200 pt-8 sm:pt-16 lg:pt-32 pb-8 sm:pb-16 lg:pb-24">

      <Helmet>
        <title>{post.title.length > 57 ? `${post.title.slice(0, 57)}…` : post.title} | KCROC</title>
        <meta name="description" content={(post.description || post.excerpt).slice(0, 155)} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.excerpt} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || post.excerpt} />
      </Helmet>

      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* Sticky reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50" aria-hidden="true">
        <div
          className="h-full bg-cyan-400 transition-[width] duration-150 motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-400 overflow-x-auto pb-2 scrollbar-hide">
          <li><Link to={ROUTES.HOME} className="hover:text-cyan-400">Home</Link></li>
          <ChevronRight size={14} aria-hidden="true" />
          <li><Link to={ROUTES.BLOG} className="hover:text-cyan-400">Blog</Link></li>
          <ChevronRight size={14} aria-hidden="true" />
          <li className="text-cyan-400 truncate" aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_280px] gap-12">
        {/* ═══ MAIN COLUMN ═══ */}
        <div>
          <article className="max-w-4xl" ref={articleRef}>
            <header className="mb-12">
              <Link to={ROUTES.BLOG} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 font-medium">
                <ArrowLeft size={16} aria-hidden="true" /> Back to Blog
              </Link>

              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">{post.category}</span>
                {post.isPillar && (
                  <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <Network size={12} aria-hidden="true" /> Pillar Guide
                  </span>
                )}
                <span className="flex items-center gap-1.5 mt-1"><Calendar size={14} aria-hidden="true" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5 mt-1"><Clock size={14} aria-hidden="true" /> {post.readTime}</span>
                <span className="flex items-center gap-1.5 mt-1"><User size={14} aria-hidden="true" /> {post.author}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">{post.title}</h1>

              {post.image && (
                <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-90" loading="eager" />
                </div>
              )}

              {/* Share / copy link row */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 rounded-full px-4 py-2 transition-colors"
                  aria-label="Share this article"
                >
                  <Share2 size={14} aria-hidden="true" /> Share
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 rounded-full px-4 py-2 transition-colors"
                  aria-label="Copy link to this article"
                >
                  {linkCopied ? <Check size={14} className="text-emerald-400" aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </header>

            {/* Mobile-only collapsible TOC */}
            {headings.length > 0 && (
              <details className="lg:hidden mb-10 border border-slate-800 rounded-2xl bg-slate-900/40 open:border-cyan-500/30">
                <summary className="flex items-center gap-2 p-4 font-bold text-white cursor-pointer list-none">
                  <List size={16} className="text-cyan-400" aria-hidden="true" /> Table of Contents
                </summary>
                <ol className="px-4 pb-4 space-y-2">
                  {headings.map(h => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-slate-400 hover:text-cyan-400">{h.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <section className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-cyan-400 mb-16">
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed border-l-4 border-cyan-500 pl-6 mb-10">
                {post.excerpt}
              </p>

              {post.richContent && post.richContent.length > 0 ? (
                <div>
                  {post.richContent.map((block, index) => (
                    <RichBlock
                      key={index}
                      block={block}
                      headingRef={block.type === 'h2' ? setHeadingRef(block.id) : undefined}
                    />
                  ))}
                </div>
              ) : post.content?.length > 0 ? (
                <div className="space-y-6">
                  {post.content.map((paragraph, index) => (
                    <p key={index}><AutoLink text={paragraph} /></p>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">Content is currently being updated by our technicians. Please check back shortly.</p>
              )}

              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl my-12 text-center">
                <h3 className="text-2xl text-white font-black mb-4 flex items-center justify-center gap-2">
                  <Share2 size={24} className="text-cyan-400" aria-hidden="true" /> Is Your Laptop Running Slow?
                </h3>
                <p className="text-slate-400 mb-8 text-base max-w-lg mx-auto">
                  If your laptop freezes, slows down during multitasking, or struggles with everyday apps, our technicians can diagnose whether it's RAM, storage, overheating, or a hardware fault — for free.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  <Link to={ROUTES.BOOKING} onClick={() => trackLead('Blog_CTA_BookRepair')} className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition-colors text-black px-6 py-3 rounded-xl font-black shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    Book Repair
                  </Link>
                  <a
                    href={waLink}
                    onClick={() => trackLead('Blog_CTA_Click')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors text-white px-6 py-3 rounded-xl font-black border border-slate-700"
                  >
                    <MessageCircle size={18} aria-hidden="true" /> Free Diagnosis
                  </a>
                  
                  {/* Fixed syntax error & missing a-tag */}
                  {BUSINESS_INFO.phone && (
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      onClick={() => trackLead('Blog_CTA_Call')}
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors text-white px-6 py-3 rounded-xl font-black border border-slate-700"
                    >
                      <Phone size={18} aria-hidden="true" /> Call Now
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span>30-Day Warranty</span>
                  <span>No Fix, No Fee</span>
                  <span>Free Pick &amp; Drop</span>
                  <span>Certified Technicians</span>
                </div>
              </div>
            </section>
          </article>

          {relatedPosts.length > 0 && (
            <section className="max-w-4xl mt-16 border-t border-slate-800/50 pt-12">
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                <Network className="text-cyan-400" aria-hidden="true" /> Related Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map(r => (
                  <Link key={r.slug} to={getBlogRoute(r.slug)} className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group flex flex-col h-full motion-reduce:hover:translate-y-0">
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
        </div>

        {/* ═══ SIDEBAR (desktop only) ═══ */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            {headings.length > 0 && (
              <nav aria-label="Table of contents" className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                  <List size={14} className="text-cyan-400" aria-hidden="true" /> On This Page
                </p>
                <ol className="space-y-2.5 text-sm">
                  {headings.map(h => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`block transition-colors ${activeHeadingId === h.id ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Author</p>
              <p className="font-bold text-white">{post.author}</p>
              <p className="text-xs text-slate-500 mt-1">Kuwait Computer Repair On Call</p>
            </div>

            {recentPosts.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Recent Articles</p>
                <ul className="space-y-3">
                  {recentPosts.map(r => (
                    <li key={r.slug}>
                      <Link to={getBlogRoute(r.slug)} className="text-sm text-slate-300 hover:text-cyan-400 leading-snug line-clamp-2">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Categories</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map(([cat, count]) => (
                  <li key={cat} className="text-xs bg-slate-800/60 text-slate-300 px-2.5 py-1 rounded-full">
                    {cat} <span className="text-slate-500">({count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 text-center">
              <p className="font-black text-white mb-1">Free Diagnosis</p>
              <p className="text-xs text-slate-400 mb-4">Not sure what's wrong? We'll check for free.</p>
              <a
                href={waLink}
                onClick={() => trackLead('Blog_Sidebar_WhatsApp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-2.5 rounded-xl mb-2 transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp Us
              </a>
              {/* Added conditional handling for the phone number */}
              {BUSINESS_INFO.phone && (
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  onClick={() => trackLead('Blog_Sidebar_Call')}
                  className="flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500/40 text-white font-bold py-2.5 rounded-xl transition-colors"
                >
                  <Phone size={16} aria-hidden="true" /> Call Now
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full p-3 shadow-lg transition-colors motion-reduce:transition-none"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </main>
  );
}
