// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Zap, Trophy, Phone, MessageCircle,
  Clock, Truck, Star, ChevronRight, CheckCircle2, MapPin // ✅ Fixed: Added MapPin here!
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { BUSINESS_INFO, SERVICES } from '../constants';
import { SEOEngine } from '../core/components/SEOEngine';

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE-LEVEL SEO DATA
───────────────────────────────────────────────────────────────────────────── */

const HOME_SEO = {
  title: 'Computer Repair Kuwait | Laptop & MacBook Repair | KCROC',
  description: "Kuwait's most trusted tech clinic. Expert Laptop, MacBook, and Gaming PC repair with same-day service, free pick & drop, and a 30-day warranty. No Fix No Fee.",
  canonicalUrl: BUSINESS_INFO.url,
  robots: 'index, follow, max-image-preview:large',
  ogType: 'website' as const,
};

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BUSINESS_INFO.url}/#webpage`,
  'name': 'Computer Repair Kuwait | Laptop & MacBook Repair | KCROC',
  'url': BUSINESS_INFO.url,
  'description': "Kuwait's most trusted tech clinic. Expert Laptop, MacBook, and Gaming PC repair.",
  'isPartOf': { '@id': `${BUSINESS_INFO.url}/#website` },
  'about': { '@id': `${BUSINESS_INFO.url}/#business` },
};

/* ─────────────────────────────────────────────────────────────────────────────
   STATIC CONTENT ARRAYS
───────────────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '500+',    label: 'Repairs Completed', sub: 'Since launch across Kuwait' },
  { value: '98%',     label: 'Success Rate',      sub: 'On complex logic board repairs' },
  { value: '30 Days', label: 'Warranty',          sub: 'On all parts and labour' },
  { value: 'Free',    label: 'Pick & Drop',       sub: 'Zero hidden transport fees' },
];

const REVIEWS = [
  { name: 'Ahmad Al-Sabah', time: '2 weeks ago',   text: 'My MacBook Pro screen was completely broken. KCROC picked it up from Salmiya and fixed it within 24 hours. The price was exactly as quoted, no hidden fees. Excellent engineering work.' },
  { name: 'Sarah M.',       time: '1 month ago',   text: 'Saved my data! My motherboard died right before midterms. The technician was incredibly professional, recovered all my files, and repaired the board component by component. Highly recommend.' },
  { name: 'Tariq K.',       time: '3 months ago',  text: 'Best gaming PC repair in Kuwait. Diagnosed the thermal throttling issue in 5 minutes. They cleaned it, reapplied liquid metal, and now my temps are 20 degrees cooler.' },
  { name: 'Fatima R.',      time: '1 week ago',    text: 'My Dell XPS battery swelled up and I needed it fixed for work urgently. KCROC picked it up from Kuwait City and had it back to me the exact same evening. Flawless and fast service.' },
  { name: 'Omar D.',        time: '4 months ago',  text: 'Spilled coffee on my laptop. Other shops told me it was dead. KCROC did a free diagnostic, found it was just a blown capacitor on the logic board, and fixed it for a fraction of the cost of a new laptop. Honest tech team.' },
];

const AREAS = [
  'Hawalli', 'Salmiya', 'Farwaniya', 'Kuwait City', 'Jahra',
  'Ahmadi', 'Mubarak Al Kabeer', 'Fahaheel', 'Mangaf', 'Abu Halifa', 'Mahboula',
];

const BLOG_POSTS = [
  { date: '2026-06-14', title: 'Laptop Repair in Kuwait: The 2026 Guide',  desc: "How Kuwait's climate impacts laptop hardware and thermal management.",  link: '/blog/laptop-repair-kuwait-2026' },
  { date: '2026-06-02', title: 'How to Protect Your Laptop Screen',        desc: 'Essential tips to prevent pressure fractures and hinge stress.',        link: '/blog/how-to-protect-laptop-screen' },
  { date: '2026-05-18', title: 'Gaming PC Cooling Solutions',              desc: 'Advanced thermal engineering strategies for peak performance.',         link: '/gaming-pc-cooling' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">

      <SEOEngine seo={HOME_SEO} schemas={HOME_SCHEMA} />

      {/* ─── HERO ─── */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-24 flex flex-col items-center text-center">
        
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-surface-hover text-brand-accent text-caption font-bold">
            <Trophy className="w-4 h-4" aria-hidden="true" />
            Kuwait's Most Trusted Tech Clinic
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-surface-hover text-slate-300 text-caption font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-primary" aria-hidden="true" /> Data Privacy
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-surface-hover text-slate-300 text-caption font-bold">
            <Zap className="w-4 h-4 text-brand-primary" aria-hidden="true" /> ESD-Safe
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-surface-hover text-slate-300 text-caption font-bold">
            <CheckCircle2 className="w-4 h-4 text-brand-primary" aria-hidden="true" /> Original Parts
          </div>
        </div>

        <h1 className="text-h2 md:text-display font-heading font-black mb-6 max-w-4xl tracking-tight">
          Laptop Repair,{' '}
          <br className="hidden md:block" />
          <span className="bg-gradient-primary text-transparent bg-clip-text">MacBook Repair &</span>{' '}
          <br className="hidden md:block" />
          Computer Repair in Kuwait.
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-subtitle text-slate-300 mb-10">
          <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-status-success" aria-hidden="true" /> Same Day</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-status-success" aria-hidden="true" /> No Fix No Fee</span>
          <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-status-success" aria-hidden="true" /> Free Pickup</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-all text-body"
          >
            <Phone className="w-5 h-5" aria-hidden="true" /> Call Technician
          </a>
          <a
            href={`https://wa.me/${BUSINESS_INFO.cleanPhone || BUSINESS_INFO.phone}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface-hover text-white font-bold rounded-button transition-all text-body border border-surface-hover"
          >
            <MessageCircle className="w-5 h-5 text-status-success" aria-hidden="true" /> Message on WhatsApp
          </a>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface-glass border border-surface-hover rounded-card p-6 text-center shadow-surface">
              <div className="text-h2 font-black text-white mb-2">{stat.value}</div>
              <div className="text-body font-bold text-brand-primary mb-1">{stat.label}</div>
              <div className="text-caption text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-heading font-black mb-4">Our Repair Capabilities</h2>
          <p className="text-subtitle text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade component repair direct from our lab to your door.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              className="group bg-surface hover:bg-surface-hover border border-surface-hover hover:border-brand-primary rounded-card p-8 transition-all shadow-surface hover:shadow-glow flex flex-col h-full"
            >
              <service.icon className="w-12 h-12 text-brand-primary mb-6" aria-hidden="true" />
              <h3 className="text-h3 font-bold mb-4 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-body text-slate-400 mb-8 flex-grow">{service.description}</p>
              <div className="flex items-center text-brand-primary font-bold text-caption uppercase tracking-wider">
                View Details <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="w-full py-20 bg-surface-glass border-y border-surface-hover">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-h2 font-heading font-black mb-2">Verified Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-5 h-5" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-subtitle font-bold">4.9 out of 5</span>
              </div>
              <p className="text-caption text-slate-400 mt-1">Based on 150+ reviews across Kuwait</p>
            </div>
            
            {BUSINESS_INFO.googleReviewUrl && (
              <a
                href={BUSINESS_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-surface border border-surface-hover hover:border-brand-primary rounded-button text-body font-bold transition-colors"
              >
                Read All on Google
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="bg-surface border border-surface-hover rounded-card p-6 shadow-surface flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center text-h3 font-black" aria-hidden="true">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-caption text-slate-400">{review.time}</div>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-4 h-4" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-body text-slate-300 flex-grow italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 text-center">
        <MapPin className="w-12 h-12 text-brand-primary mx-auto mb-6" aria-hidden="true" />
        <h2 className="text-h2 font-heading font-black mb-6">Serving Customers Across Kuwait</h2>
        <p className="text-subtitle text-slate-400 max-w-3xl mx-auto mb-10">
          Kuwait Computer Repair On Call provides free pickup and delivery throughout the entire country.
          Select your area to see local service times.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {AREAS.map((area) => (
            <Link
              key={area}
              to={`/computer-repair-in-${area.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-5 py-2 bg-surface hover:bg-surface-elevated border border-surface-hover rounded-full text-caption font-bold text-slate-300 hover:text-white transition-colors"
            >
              {area}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-surface-hover">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-h2 font-heading font-black mb-2">Tech Guides & Insights</h2>
            <p className="text-subtitle text-slate-400">Expert knowledge direct from our component-level repair lab.</p>
          </div>
          <Link to={ROUTES.blog} className="px-6 py-3 bg-surface border border-surface-hover hover:border-brand-primary rounded-button text-body font-bold transition-colors">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.link}
              to={post.link}
              className="group bg-surface-glass border border-surface-hover hover:border-brand-primary rounded-card overflow-hidden transition-all flex flex-col h-full"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-caption text-brand-primary font-bold mb-3">{post.date}</div>
                <h3 className="text-subtitle font-bold mb-3 group-hover:text-brand-accent transition-colors">{post.title}</h3>
                <p className="text-body text-slate-400 flex-grow">{post.desc}</p>
                <div className="mt-6 font-bold text-caption uppercase tracking-wider text-slate-300 group-hover:text-white flex items-center">
                  Read Article <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
