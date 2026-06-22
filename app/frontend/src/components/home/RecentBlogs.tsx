import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { RECENT_BLOGS } from '../../constants/data';
import { useFadeIn } from '../../hooks/useFadeIn';

// Memoized BlogCard Component
const BlogCard = React.memo(({ blog, idx }: { blog: any, idx: number }) => {
  const { ref, visible } = useFadeIn();
  
  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${idx * 100}ms` }} 
      className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link 
        to={blog.path} 
        className="group flex flex-col h-full bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <time className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">{blog.date}</time>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{blog.excerpt}</p>
        <div className="flex items-center text-cyan-500 font-bold text-sm mt-auto">
          Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';

// Optimized RecentBlogs Component
const RecentBlogs = React.memo(() => {
  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/10 relative z-10">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Tech Guides & Insights</h2>
            <p className="text-slate-400 text-sm">Expert knowledge direct from our component-level repair lab.</p>
          </div>
          <Link to="/blog" className="shrink-0 flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
            View All Articles <BookOpen className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_BLOGS.map((blog, idx) => (
            <BlogCard key={blog.path} blog={blog} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});

RecentBlogs.displayName = 'RecentBlogs';

export default RecentBlogs;
