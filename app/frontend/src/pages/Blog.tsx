import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Laptop, Shield, Cpu, Battery, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/blog`;

// Added 'image' and 'imageAlt' properties using your authentic KCROC workshop photos
const blogPosts = [
  {
    title: "Laptop Repair in Kuwait: The 2026 Guide to Hardware Preservation",
    excerpt: "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and professional component-level repair techniques.",
    path: "/blog/laptop-repair-kuwait-2026",
    image: "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg",
    imageAlt: "Laptop hardware diagnostic in progress at KCROC Kuwait",
    icon: Laptop,
    dateISO: "2026-06-14",
    dateDisplay: "June 14, 2026",
    category: "Hardware",
    theme: {
      text: "text-cyan-400",
      border: "hover:border-cyan-500/50",
      shadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      badgeBg: "bg-cyan-500/10",
      badgeBorder: "border-cyan-500/30",
      gradient: "from-cyan-500/20"
    }
  },
  {
    title: "How to Protect Your Laptop Screen",
    excerpt: "Essential tips to prevent pressure fractures, hinge stress, and display damage while traveling.",
    path: "/blog/how-to-protect-laptop-screen",
    image: "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg",
    imageAlt: "Dell laptop screen protection installation in Kuwait City",
    icon: Shield,
    dateISO: "2026-06-02",
    dateDisplay: "June 02, 2026",
    category: "Prevention",
    theme: {
      text: "text-emerald-400",
      border: "hover:border-emerald-500/50",
      shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      badgeBg: "bg-emerald-500/10",
      badgeBorder: "border-emerald-500/30",
      gradient: "from-emerald-500/20"
    }
  },
  {
    title: "Gaming PC Cooling Solutions",
    excerpt: "Advanced thermal engineering strategies to keep your gaming rig performing at its peak during summer.",
    path: "/gaming-pc-cooling",
    image: "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png",
    imageAlt: "CPU cooling fan replacement and maintenance",
    icon: Cpu,
    dateISO: "2026-05-18",
    dateDisplay: "May 18, 2026",
    category: "Performance",
    theme: {
      text: "text-purple-400",
      border: "hover:border-purple-500/50",
      shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badgeBg: "bg-purple-500/10",
      badgeBorder: "border-purple-500/30",
      gradient: "from-purple-500/20"
    }
  },
  {
    title: "When to Replace Your Laptop Battery",
    excerpt: "Recognizing the signs of lithium cell degradation and swollen batteries before they damage your chassis.",
    path: "/battery-replacement",
    image: "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg",
    imageAlt: "New Dell laptop battery installation",
    icon: Battery,
    dateISO: "2026-05-05",
    dateDisplay: "May 05, 2026",
    category: "Power",
    theme: {
      text: "text-rose-400",
      border: "hover:border-rose-500/50",
      shadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
      badgeBg: "bg-rose-500/10",
      badgeBorder: "border-rose-500/30",
      gradient: "from-rose-500/20"
    }
  }
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "KCROC Tech Blog | Expert IT & Repair Guides",
      "url": PAGE_URL,
      "description": "Read expert guides on laptop repair, thermal management, data security, and hardware maintenance from Kuwait's premier tech repair lab.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
    },
    {
      "@type": "Blog",
      "@id": `${PAGE_URL}#blog`,
      "name": "KCROC Tech Blog",
      "description": "Expert insights and repair case studies direct from our component-level diagnostic lab.",
      "publisher": {
        "@type": "LocalBusiness",
        "name": BUSINESS_INFO.name
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": new Date(post.dateISO).toISOString(),
        "url": `${BUSINESS_INFO.url}${post.path}`
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Blog() {
  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <MetaSEO
        title="KCROC Tech Blog | Expert IT & Repair Guides"
        description="Read expert guides on laptop repair, thermal management, data security, and hardware maintenance from Kuwait's premier tech repair lab."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Blog</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative px-6 text-center z-10 mb-20">
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-4">
            <BookOpen size={16} aria-hidden="true" /> Knowledge Base
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The KCROC{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Tech Blog</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Expert insights, hardware guides, and repair case studies direct from our component-level diagnostic lab.
          </p>
        </div>
      </section>

      {/* ─── BLOG GRID ─── */}
      <section aria-labelledby="blog-grid-heading" className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 id="blog-grid-heading" className="sr-only">Latest Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.path}
              to={post.path}
              className={`group relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 transition-all duration-500 flex flex-col h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${post.theme.border} ${post.theme.shadow}`}
            >
              {/* Image Header Section */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img 
                  src={post.image} 
                  alt={post.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                {/* Subtle gradient overlay to blend the image into the dark theme */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none`} 
                  aria-hidden="true" 
                />
                {/* Colored top-glow overlay matching the category theme */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-b ${post.theme.gradient} mix-blend-overlay opacity-50 pointer-events-none`}
                  aria-hidden="true"
                />
              </div>

              {/* Text Content Section */}
              <div className="relative z-10 flex flex-col h-full p-8 pt-6">
                
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl border transition-colors duration-500 ${post.theme.badgeBg} ${post.theme.badgeBorder}`}>
                    <post.icon className={`w-5 h-5 ${post.theme.text}`} aria-hidden="true" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-500 bg-slate-950/80 backdrop-blur-sm ${post.theme.badgeBorder} ${post.theme.text}`}>
                    {post.category}
                  </span>
                </div>
                
                <time dateTime={post.dateISO} className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
                  {post.dateDisplay}
                </time>
                
                <h2 className="text-2xl font-black text-white mb-4 transition-colors duration-500 group-hover:text-slate-200">
                  {post.title}
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className={`mt-auto flex items-center font-bold text-sm transition-colors duration-500 ${post.theme.text}`}>
                  Read Article 
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
