// File: app/frontend/src/core/components/SearchBar.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { Registry } from '../../knowledge/registry';
import { useAnalytics } from '../analytics/AnalyticsProvider';

type SearchResult = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kind: 'Service' | 'Problem';
};

export const SearchBar: React.FC = () => {
  const { trackConversion } = useAnalytics();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Build once — Registry's own indexes are memoized internally (isIndexed guard),
  // so repeated calls are cheap, but no need to call on every keystroke either.
  const searchIndex = useMemo<SearchResult[]>(() => {
    const services: SearchResult[] = Registry.getAllServices().map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      subtitle: s.shortDescription,
      kind: 'Service',
    }));
    const problems: SearchResult[] = Registry.getAllProblems().map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.symptom,
      kind: 'Problem',
    }));
    // Problems first — symptom language ("won't turn on") matches how people
    // actually search better than service-catalog language.
    return [...problems, ...services];
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      setResults(
        searchIndex
          .filter((r) => r.title.toLowerCase().includes(q) || r.subtitle?.toLowerCase().includes(q))
          .slice(0, 6)
      );
    } else {
      setResults([]);
    }
  }, [query, searchIndex]);

  const handleResultClick = (result: SearchResult) => {
    trackConversion('cta_click', {
      cta_name: 'search_result_click',
      button_position: 'search_bar',
      result_kind: result.kind,
      result_title: result.title,
    });
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-40 text-left">
      <div className="relative flex items-center group">
        <Search className="absolute left-5 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          className="w-full bg-surface-elevated border border-surface-hover rounded-full py-4 pl-14 pr-6 text-white text-base focus:outline-none focus:border-brand-primary transition-all shadow-lg"
          placeholder="What's wrong with your device? (e.g. Broken Screen, Overheating)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-surface-elevated border border-surface-hover rounded-card shadow-2xl overflow-hidden flex flex-col">
          {results.map((result) => (
            <Link
              key={result.id}
              to={`/${result.slug}`}
              onClick={() => handleResultClick(result)}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-colors border-b border-surface-hover last:border-b-0"
            >
              <div className="flex flex-col pr-4 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{result.title}</span>
                  <span className="text-[10px] uppercase tracking-wide text-cyan-500/80 shrink-0">{result.kind}</span>
                </div>
                <span className="text-xs text-slate-400 line-clamp-1">{result.subtitle}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-brand-primary flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
