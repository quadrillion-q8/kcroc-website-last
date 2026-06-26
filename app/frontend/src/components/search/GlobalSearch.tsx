// File: src/components/search/GlobalSearch.tsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, BookOpen, Wrench, HelpCircle } from 'lucide-react';
import { KNOWLEDGE_GRAPH, KnowledgeType } from '../../constants/knowledgeBase';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<KnowledgeType | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fuzzy search the Knowledge Graph
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return KNOWLEDGE_GRAPH.filter(node => {
      if (filter !== 'all' && node.type !== filter) return false;
      
      const searchString = `${node.title} ${node.description} ${node.keywords.join(' ')}`.toLowerCase();
      // Must match at least one term (basic fuzzy)
      return searchTerms.some(term => searchString.includes(term));
    }).slice(0, 8); // Limit to top 8 results for performance
  }, [query, filter]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
    setQuery('');
  };

  const getIcon = (type: KnowledgeType) => {
    switch (type) {
      case 'location': return <MapPin size={16} className="text-emerald-400" />;
      case 'blog': return <BookOpen size={16} className="text-purple-400" />;
      case 'faq': return <HelpCircle size={16} className="text-orange-400" />;
      case 'service': return <Wrench size={16} className="text-cyan-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center p-4 sm:p-6 pt-[10vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Input Area */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="text-cyan-400 shrink-0" size={24} />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none text-white text-lg sm:text-xl py-6 pl-4 pr-4 focus:outline-none focus:ring-0 placeholder:text-slate-500"
            placeholder="Search services, locations, or guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 p-4 border-b border-slate-800/50 scrollbar-hide">
          {(['all', 'service', 'location', 'faq', 'blog'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                filter === t 
                  ? 'bg-cyan-500 text-slate-950' 
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500">
              <p>Type to search across KCROC's knowledge base.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-700 hover:text-white" onClick={() => setQuery('screen repair')}>screen repair</span>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-700 hover:text-white" onClick={() => setQuery('salmiya')}>salmiya</span>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-700 hover:text-white" onClick={() => setQuery('macbook')}>macbook</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p>No exact matches found for "<span className="text-white">{query}</span>"</p>
              <p className="text-sm mt-2">Try broader terms or browse our <button onClick={() => {onClose(); navigate(ROUTES.services)}} className="text-cyan-400 hover:underline">services</button>.</p>
            </div>
          ) : (
            <ul className="p-2">
              {results.map((node) => (
                <li key={node.id}>
                  <button
                    onClick={() => handleSelect(node.url)}
                    className="w-full text-left p-4 hover:bg-slate-800/50 rounded-xl transition-colors flex items-start gap-4 group focus:outline-none focus:bg-slate-800/50"
                  >
                    <div className="bg-slate-950 p-3 rounded-lg group-hover:bg-slate-900 border border-slate-800 shrink-0">
                      {getIcon(node.type)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-bold truncate group-hover:text-cyan-400 transition-colors">
                        {node.title}
                      </h4>
                      <p className="text-sm text-slate-400 line-clamp-1 mt-1">
                        {node.description}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-950 p-3 text-center border-t border-slate-800 text-xs font-medium text-slate-500 flex items-center justify-center gap-2">
          <span>KCROC Semantic AI Search</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full" />
          <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
