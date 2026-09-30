// File: app/frontend/src/pages/News.tsx
// First-class KCROC News hub. Inventory is derived from BLOG_POSTS (news
// articles) while the page identity/SEO comes from KCROC_GRAPH (page-news).
import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, ChevronRight, Cpu, Shield, Gamepad2, Apple, Bot, Newspaper } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { BLOG_POSTS } from '../constants/blogPosts';
import { getNewsRoute, ROUTES } from '../constants/routes';

const CATEGORY_META = [
  { slug: 'windows', label: 'Windows & Microsoft', icon: Shield, description: 'Windows releases, updates, support changes and what they mean for real users.' },
  { slug: 'hardware', label: 'Hardware', icon: Cpu, description: 'CPU, GPU, SSD, RAM and component technology news explained in practical terms.' },
  { slug: 'gaming', label: 'Gaming Technology', icon: Gamepad2, description: 'Gaming hardware, drivers, performance and platform changes.' },
  { slug: 'apple', label: 'Apple & Mac', icon: Apple, description: 'Mac, MacBook and Apple software news with repair and ownership context.' },
  { slug: 'cybersecurity', label: 'Cybersecurity', icon: Shield, description: 'Security developments and device risks that matter to computer users.' },
  { slug: 'ai', label: 'AI & PC Technology', icon: Bot, description: 'AI PCs, processors, software features and changes affecting everyday computers.' },
] as const;

const normalize = (value: string) => value.trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function News() {
  const [params] = useSearchParams();
  const categoryParam = params.get('category') ?? '';
  const pageEntity = KCROC_GRAPH.pages.find((page) => page.id === 'page-news');

  const newsPosts = useMemo(
    () => BLOG_POSTS
      .filter((post) => post.contentType === 'news')
      .filter((post) => !categoryParam || normalize(post.category).includes(normalize(categoryParam)) || normalize(categoryParam).includes(normalize(post.category)))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [categoryParam],
  );

  const activeCategory = CATEGORY_META.find((category) => category.slug === categoryParam);

  return (
    <>
      <SEOEngine entityId={pageEntity?.id ?? 'page-news'} />

      <main className="min-h-screen bg-transparent text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li><Link to={ROUTES.HOME} className="hover:text-cyan-400">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-cyan-400" aria-current="page">News</li>
            </ol>
          </nav>

          <header className="mb-12 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-400">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              KCROC Tech News
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
              Computer, Windows &amp; Hardware <span className="text-cyan-400">News</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Current technology news explained with practical technician context — what changed, why it matters,
              what to check on your own device, and when a news story turns into a real repair or upgrade issue.
            </p>
          </header>

          <section aria-labelledby="news-categories" className="mb-14">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">News desk</p>
                <h2 id="news-categories" className="mt-1 text-2xl font-black text-white">Browse by topic</h2>
              </div>
              {activeCategory ? (
                <Link to={ROUTES.NEWS} className="text-sm font-bold text-cyan-400 hover:text-cyan-300">Clear filter</Link>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_META.map((category) => {
                const Icon = category.icon;
                const isActive = category.slug === categoryParam;
                return (
                  <Link
                    key={category.slug}
                    to={`${ROUTES.NEWS}?category=${category.slug}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${isActive ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 hover:bg-slate-900/70'}`}
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400">{category.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{category.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="latest-news">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{activeCategory ? activeCategory.label : 'Latest'}</p>
                <h2 id="latest-news" className="mt-1 text-3xl font-black text-white">Latest News &amp; Analysis</h2>
              </div>
              {newsPosts.length ? <span className="text-xs font-bold text-slate-500">{newsPosts.length} {newsPosts.length === 1 ? 'story' : 'stories'}</span> : null}
            </div>

            {newsPosts.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsPosts.map((post) => (
                  <article key={post.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 transition-all hover:-translate-y-1 hover:border-cyan-500/40">
                    <Link to={getNewsRoute(post.slug)} className="block aspect-[16/9] overflow-hidden bg-slate-950">
                      <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span className="text-cyan-400">{post.category}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" aria-hidden="true" />{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-black leading-snug text-white">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>
                      <div className="mt-5 inline-flex items-center gap-1 text-sm font-black text-cyan-400">Read analysis <ChevronRight className="h-4 w-4" aria-hidden="true" /></div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-10 text-center">
                <Newspaper className="mx-auto h-9 w-9 text-cyan-400/70" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-black text-white">The KCROC News desk is ready.</h3>
                <p className="mx-auto mt-3 max-w-2xl text-slate-400 leading-7">
                  No published news stories are assigned to {activeCategory ? activeCategory.label : 'News'} yet.
                  New stories can use the News → Analysis → Guide → Service flow without changing the site's routing architecture.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
