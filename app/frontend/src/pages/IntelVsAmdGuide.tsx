// File: app/frontend/src/pages/IntelVsAmdGuide.tsx
import { Head } from 'vite-react-ssg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/blog/intel-core-ultra-vs-amd-ryzen-ai`;
const PUBLISHED_DATE = '2026-08-07';
const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'Hi KCROC, I read your Intel vs AMD guide and would like to book a free diagnostic.'
)}`;

const CLUSTER_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Intel Core Ultra vs AMD Ryzen AI: The Real Differences',
    description: 'Core Ultra or Ryzen AI? A Kuwait hardware engineer breaks down cores, NPUs, and graphics — and why the suffix matters more than the brand.',
    author: {
      '@type': 'Person',
      name: 'Imran',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Hardware Repair Engineer',
    },
    publisher: {
      '@type': 'Organization',
      name: business.legalName,
      logo: { '@type': 'ImageObject', url: business.logoUrl },
    },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    articleSection: 'Laptop Hardware Guide',
    keywords: ['Intel Core Ultra', 'AMD Ryzen AI', 'NPU', 'Laptop CPU comparison', 'Kuwait laptop repair'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is AMD Ryzen AI better than Intel Core Ultra for gaming?', acceptedAnswer: { '@type': 'Answer', text: "For gaming on integrated graphics alone, AMD generally has an edge. For gaming with a dedicated GPU, the CPU platform matters far less than the GPU's TGP and the laptop's cooling design." } },
      { '@type': 'Question', name: 'Which platform has a better NPU?', acceptedAnswer: { '@type': 'Answer', text: "Both publish competitive TOPS figures that shift with each generation — check current specs for the exact models you're comparing rather than relying on a general platform claim." } },
      { '@type': 'Question', name: 'Does the NPU actually speed up everyday tasks?', acceptedAnswer: { '@type': 'Answer', text: "Not directly — it accelerates specific AI-inference workloads (background blur, noise removal, certain on-device AI features) efficiently, but it won't speed up general browsing, gaming, or video export." } },
      { '@type': 'Question', name: "Is Intel's V-series worth it over standard Core Ultra?", acceptedAnswer: { '@type': 'Answer', text: "If you want the thinnest, most efficient chassis and don't need upgradeable RAM, yes — it's a genuinely different engineering approach, not just a marketing tier." } }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${business.websiteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Laptop Buying Guide Kuwait 2026', item: `${business.websiteUrl}/blog/laptop-buying-guide-kuwait-2026` },
      { '@type': 'ListItem', position: 4, name: 'Intel Core Ultra vs AMD Ryzen AI', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Imran',
    url: `${business.websiteUrl}/author/imran`,
    jobTitle: 'Hardware Repair Engineer',
    worksFor: { '@type': 'Organization', name: business.legalName },
  },
];

const faqs = (CLUSTER_SCHEMA.find((s) => s['@type'] === 'FAQPage') as any).mainEntity;

export default function IntelVsAmdGuide() {
  return (
    <div className="min-h-screen bg-gray-950 text-slate-300 selection:bg-cyan-500/30">
      <Head>
        <title>Intel Core Ultra vs AMD Ryzen AI | KCROC</title>
        <meta name="description" content="Core Ultra or Ryzen AI? A Kuwait hardware engineer breaks down cores, NPUs, and graphics — and why the suffix matters more than the brand." />
        <link rel="canonical" href={PAGE_URL} />
      </Head>

      <SEOEngine entityId="guide-intel-vs-amd" />
      <SchemaMarkup schema={{ '@graph': CLUSTER_SCHEMA }} />

      {/* Breadcrumb */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-xs sm:text-sm text-slate-400 flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> <span>/</span>
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link> <span>/</span>
          <Link to="/blog/laptop-buying-guide-kuwait-2026" className="hover:text-cyan-400 transition-colors">Laptop Guides</Link> <span>/</span>
          <span className="text-slate-300">Intel vs AMD</span>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <article className="prose prose-invert prose-cyan max-w-none">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mb-6">Hardware Comparison</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Intel Core Ultra vs. AMD Ryzen AI: What Actually Differs in a Laptop
          </h1>
          
          <p className="text-lg text-slate-300 mb-8 border-l-2 border-cyan-500 pl-4">
            <em>This article is part of our <Link to="/blog/laptop-buying-guide-kuwait-2026" className="text-cyan-400 hover:underline">Laptop Buying Guide Kuwait (2026)</Link> — read the full pillar guide for the complete hardware picture, including RAM, storage, GPU, and cooling.</em>
          </p>

          <section className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800 mb-10">
            <h2 className="text-2xl font-bold text-white mt-0 mb-4">The Short Answer</h2>
            <p>
              Neither platform is categorically faster. Intel's Core Ultra and AMD's Ryzen AI are built around similar ideas — a mix of performance and efficiency cores, plus a dedicated AI chip — and in most laptops the deciding factor isn't the brand, it's the <strong>power-limit suffix (U, H, HX)</strong> and the specific model's cooling design. 
            </p>
            <p className="mb-0 text-cyan-100 font-semibold">
              If you only take one thing from this article: compare two laptops by suffix and TGP, not by "Intel vs. AMD."
            </p>
          </section>

          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4"><Cpu className="text-blue-400" /> How Intel Core Ultra Is Built</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><strong>Performance cores (P-cores):</strong> Handle demanding, latency-sensitive single-threaded work (compiling code, CAD, video export).</li>
                <li><strong>Efficiency cores (E-cores):</strong> Handle background load (browser tabs, sync services) without pulling power away from P-cores.</li>
                <li><strong>Low-power E-cores:</strong> Keep idle tasks running on minimal power, greatly improving battery life over older generations.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4"><Zap className="text-emerald-400" /> How AMD Ryzen AI Is Built</h3>
              <p className="text-sm sm:text-base">
                AMD's Ryzen AI series follows a similar architectural logic: Zen-generation CPU cores paired with RDNA integrated graphics, plus AMD's own NPU for local AI inference. The core design philosophy — efficiency cores for background work, performance cores for demanding tasks, a dedicated AI accelerator — mirrors Intel's approach closely enough that neither platform has a structural advantage on paper.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Where They Actually Differ</h2>
          <ul className="space-y-4 mb-10">
            <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" /> <span><strong>Integrated graphics:</strong> This is the most consistent difference. AMD's RDNA-based integrated graphics have generally outperformed Intel's Arc integrated graphics at similar power levels.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" /> <span><strong>On-package memory (Intel V-series):</strong> Intel's V-series integrates memory directly onto the CPU package for higher bandwidth in low-power designs. AMD lacks a direct equivalent, though the tradeoff is zero post-purchase upgradeability.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" /> <span><strong>NPU performance claims:</strong> Both platforms publish NPU performance (TOPS), but these figures shift rapidly. Treat them as a snapshot rather than a durable differentiator.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-6">Practical Buying Guidance</h2>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 mb-12">
            <CardContent className="p-6">
              <ul className="space-y-4 m-0 text-slate-200">
                <li><strong>General office use & travel:</strong> Either platform's U-series (or Intel V-series) is a reasonable choice; prioritize battery life and chassis over brand.</li>
                <li><strong>Light gaming without a dedicated GPU:</strong> AMD's Ryzen AI generally has an edge via stronger integrated graphics.</li>
                <li><strong>Compiling & sustained heavy workloads:</strong> Compare H/HX-series models from both platforms directly by TGP and independent benchmark reviews of the specific laptop — not the CPU brand alone.</li>
                <li><strong>Very thin-and-light with premium efficiency:</strong> Intel's V-series is worth a specific look for its on-package memory approach, if you don't need upgradeable RAM.</li>
              </ul>
            </CardContent>
          </Card>

          {/* FAQs generated from schema */}
          <h2 className="text-2xl font-bold text-white mb-6 border-t border-slate-800 pt-10">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-12">
            {faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-slate-900/30 p-5 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold mb-2 flex gap-2"><HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> {faq.name}</h4>
                <p className="text-sm text-slate-400 ml-7 mb-0">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-cyan-900/20 border border-cyan-500/30 p-8 rounded-2xl text-center mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Need help diagnosing a hardware fault?</h3>
            <p className="text-slate-300 mb-6">
              Read the full <Link to="/blog/laptop-buying-guide-kuwait-2026" className="text-cyan-400 font-semibold hover:underline">Laptop Buying Guide Kuwait (2026)</Link> for RAM, storage, GPU, and cooling details — or if your current laptop is showing signs of a hardware fault, request a free diagnosis. We offer free pick & drop across all governorates in Kuwait.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold" asChild>
              <Link to="/book"><MessageCircle className="w-4 h-4 mr-2" /> Book Free Pickup</Link>
            </Button>
          </div>
        </article>
      </main>
    </div>
  );
}
