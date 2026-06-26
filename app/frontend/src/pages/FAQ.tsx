import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Link as LinkIcon,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { ROUTES } from '../constants/routes';
import { GLOBAL_FAQS } from '../constants/faqs';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

type FAQItem = (typeof GLOBAL_FAQS)[number];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function FAQ() {
  const location = useLocation();
  const pageUrl = `${BUSINESS_INFO.url}${ROUTES.faq}`;

  const [searchQuery, setSearchQuery]   = useState('');
  const [openFaqs, setOpenFaqs]         = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId]         = useState<string | null>(null);

  /* ─── SEARCH & GROUP ─── */
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return GLOBAL_FAQS;
    const query = searchQuery.toLowerCase();
    return GLOBAL_FAQS.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // ✅ Fixed: correct type for grouped record
  const groupedFAQs = useMemo(() => {
    const groups: Record<string, FAQItem[]> = {};
    filteredFAQs.forEach((faq) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq as FAQItem);
    });
    return groups;
  }, [filteredFAQs]);

  const categories = Object.keys(groupedFAQs);

  /* ─── DEEP LINK SCROLL ─── */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setOpenFaqs((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [location.hash]);

  /* ─── HANDLERS ─── */
  const toggleFaq = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyToClipboard = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${ROUTES.faq}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToCategory = (category: string) => {
    const id = `cat-${category.toLowerCase().replace(/\s+/g, '-')}`;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ─── WA LINK ─── */
  const waMessage = encodeURIComponent("Hi KCROC, I checked your FAQ page but I have a specific question about repairing my device.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  /* ─── SCHEMA ─── */
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Frequently Asked Questions | Computer Repair Kuwait | KCROC",
        "description": "Answers to your questions about computer repair, free pickup, Windows installation, warranties, and pricing in Kuwait.",
        // ✅ Fixed: added isPartOf to connect to site entity
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": GLOBAL_FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      },
      {
        "@type": "BreadcrumbList",
        // ✅ Fixed: added @id to BreadcrumbList
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": "FAQ",  "item": pageUrl }
        ]
      }
    ]
  }), [pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">

      {/* ─── SEO ─── */}
      <MetaSEO
        title="Frequently Asked Questions | Computer Repair Kuwait | KCROC"
        description="Find fast answers about our computer repair Kuwait services, laptop repair Kuwait, free pickup, Windows installation, and our strict warranty policy."
        canonical={pageUrl}
      />
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to={ROUTES.home} className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600" aria-hidden="true">/</span></li>
          <li aria-current="page" className="text-cyan-400">FAQ</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative px-6 mb-16 z-10 max-w-4xl mx-auto">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <HelpCircle size={14} aria-hidden="true" /> Support Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h1>
          <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed mb-8">
            <p>
              Welcome to the KCROC Support Center. Operating from our central lab in Hawalli, we provide professional computer and laptop repair services across Kuwait. We understand that device failures are stressful, which is why we offer <strong>100% free pickup and delivery</strong> to make the repair process as seamless as possible.
            </p>
            <p>
              Whether you need a rapid SSD upgrade, virus removal, or a complex logic board repair, our transparent pricing and "No Fix, No Fee" policy ensure you never pay for unverified work. Every hardware repair we complete is backed by a solid 30-day warranty. Browse our {GLOBAL_FAQS.length} frequently asked questions below to learn more about our timelines, data security protocols, and exact service coverage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-wider border-t border-slate-800/50 pt-6">
            <span className="flex items-center gap-2 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
              {GLOBAL_FAQS.length} Questions Answered
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" /> {/* ✅ Fixed */}
              Last Updated: June 2026
            </span>
          </div>
        </div>
      </section>

      {/* ─── SEARCH ─── */}
      <div className="max-w-4xl mx-auto px-6 mb-12 relative z-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} aria-hidden="true" /> {/* ✅ Fixed */}
          </div>
          <input
            type="search"
            className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 text-white rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 text-lg shadow-lg"
            placeholder="Search for answers, e.g., 'warranty' or 'Windows installation'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search FAQs"
          />
        </div>
      </div>

      {/* ─── CATEGORY INDEX ─── */}
      {categories.length > 0 && !searchQuery && (
        <div className="max-w-4xl mx-auto px-6 mb-16 relative z-10 hidden md:block">
          <div className="flex flex-wrap gap-3" role="navigation" aria-label="Jump to FAQ category">
            {categories.map((cat) => (
              <button
                key={`toc-${cat}`}
                onClick={() => scrollToCategory(cat)}
                className="bg-slate-800/50 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── FAQ ACCORDIONS ─── */}
      <section aria-labelledby="faq-main-heading" className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 id="faq-main-heading" className="sr-only">All Questions</h2>

        {categories.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
            <Search className="mx-auto text-slate-600 mb-4" size={40} aria-hidden="true" />
            <h3 className="text-xl font-bold text-white mb-2">No exact matches found</h3>
            <p className="text-slate-400">Try adjusting your search terms or browse the categories.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <div
                key={category}
                className="scroll-mt-32"
                id={`cat-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <span className="w-2 h-8 bg-cyan-500 rounded-full" aria-hidden="true" />
                  {category}
                </h2>

                <div className="space-y-4">
                  {groupedFAQs[category].map((faq) => {
                    const isOpen  = openFaqs.has(faq.id);
                    const isCopied = copiedId === faq.id;

                    return (
                      <details
                        key={faq.id}
                        id={faq.id}
                        open={isOpen}
                        onClick={(e) => toggleFaq(faq.id, e)}
                        className={`group bg-slate-900/40 backdrop-blur-sm border ${
                          isOpen
                            ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                            : 'border-slate-700/50 hover:border-slate-600'
                        } rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 scroll-mt-32`}
                      >
                        <summary className="flex items-start md:items-center justify-between cursor-pointer p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl list-none">
                          <h3 className={`pr-6 text-lg font-bold transition-colors ${isOpen ? 'text-cyan-400' : 'text-white group-hover:text-cyan-200'}`}>
                            {faq.question}
                          </h3>

                          <div className="flex items-center gap-3 shrink-0 mt-1 md:mt-0">
                            <button
                              onClick={(e) => copyToClipboard(faq.id, e)}
                              className="p-2 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-colors border border-slate-700 hover:border-cyan-500/30"
                              aria-label={isCopied ? 'Link copied' : 'Copy direct link to this FAQ'}
                              title="Copy direct link"
                            >
                              {isCopied
                                ? <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" /> // ✅ Fixed
                                : <LinkIcon size={16} aria-hidden="true" />                                  // ✅ Fixed
                              }
                            </button>
                            <span
                              className={`bg-slate-800 p-2 rounded-full transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
                              aria-hidden="true"
                            >
                              <ChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </summary>

                        {/* ✅ Fixed: removed aria-hidden — <details> handles this natively */}
                        <div className="px-6 pb-6 text-slate-300 leading-relaxed text-base md:text-lg border-t border-slate-800/50 mt-2 pt-6">
                          {faq.answer}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── CTA ─── */}
        <div className="mt-24 bg-slate-900/50 backdrop-blur-md border border-cyan-900/50 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none"
            aria-hidden="true" // ✅ Fixed
          />
          {/* ✅ Fixed: h3 → h2 (no h2 parent in CTA block) */}
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Have a device that needs professional attention?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
            Our Hawalli repair center handles everything from screen replacements to complex motherboard diagnostics. Get an instant quote or book your free pick-up now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* ✅ Syntax error fixed here: Added missing `<a` tag */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              <MessageCircle size={20} aria-hidden="true" /> Get a Free Quote via WhatsApp
            </a>

            <Link
              to={ROUTES.contact}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              Contact Support <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
