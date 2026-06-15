import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Laptop, Shield, Cpu, Battery, ArrowRight } from 'lucide-react';

export default function Blog() {
  const blogPosts = [
    {
      title: "Laptop Repair in Kuwait: The 2026 Guide to Hardware Preservation",
      excerpt: "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and professional component-level repair techniques.",
      path: "/blog/laptop-repair-kuwait-2026",
      icon: Laptop,
      date: "June 14, 2026"
    },
    {
      title: "How to Protect Your Laptop Screen",
      excerpt: "Essential tips to prevent pressure fractures, hinge stress, and display damage while traveling.",
      path: "/blog/how-to-protect-laptop-screen",
      icon: Shield,
      date: "June 02, 2026"
    },
    {
      title: "Gaming PC Cooling Solutions",
      excerpt: "Advanced thermal engineering strategies to keep your gaming rig performing at its peak during summer.",
      path: "/gaming-pc-cooling",
      icon: Cpu,
      date: "May 18, 2026"
    },
    {
      title: "When to Replace Your Laptop Battery",
      excerpt: "Recognizing the signs of lithium cell degradation and swollen batteries before they damage your chassis.",
      path: "/battery-replacement",
      icon: Battery,
      date: "May 05, 2026"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24">
      <Helmet>
        <title>KCROC Tech Blog | Expert IT & Repair Guides</title>
        <meta name="description" content="Read expert guides on laptop repair, thermal management, data security, and hardware maintenance from Kuwait's premier tech repair lab." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/blog" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative px-6 text-center z-10 mb-20">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-4">
            <BookOpen size={16} aria-hidden="true" /> Knowledge Base
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The KCROC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Tech Blog</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Expert insights, hardware guides, and repair case studies direct from our component-level diagnostic lab.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <Link 
              key={index}
              to={post.path} 
              className="group bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  <post.icon className="text-cyan-400 w-6 h-6" aria-hidden="true" />
                </div>
                <time className="text-xs font-bold text-slate-500 uppercase tracking-wider">{post.date}</time>
              </div>
              
              <h2 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center text-cyan-500 font-bold text-sm">
                Read Article 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
