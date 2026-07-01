// File: app/frontend/src/core/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { getAllServices } from '../../knowledge/registry';
import { trackEvent } from '../../analytics/Telemetry';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof getAllServices>>([]);
  
  // Fetch all services from the brain
  const allServices = getAllServices();

  // This hook runs every time the user types a letter
  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      // Filter services based on name, description, or related issues (symptoms)
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery) ||
        service.relatedIssues.some(issue => issue.includes(lowerQuery))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (serviceName: string) => {
    trackEvent({
      category: 'Navigation',
      action: 'Search_Result_Click',
      label: serviceName
    });
    setQuery(''); // Clear the search bar after they click
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 z-40 text-left">
      <div className="relative flex items-center group">
        <Search className="absolute left-5 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          className="w-full bg-surface-elevated border border-surface-hover rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-primary transition-all shadow-lg text-body"
          placeholder="What do you need help with? (e.g., Broken Screen, Overheating)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      {/* Live Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-surface-elevated border border-surface-hover rounded-card shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
          {results.map(service => (
            <Link
              key={service.id}
              to={`/${service.slug}`}
              onClick={() => handleResultClick(service.name)}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-colors border-b border-surface-hover last:border-b-0"
            >
              <div className="flex flex-col pr-4">
                <span className="text-body font-bold text-white">{service.name}</span>
                <span className="text-caption text-slate-400 line-clamp-1">{service.description}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-brand-primary flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
