// File: src/utils/linkGraph.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SEMANTIC_ENTITIES } from '../constants/entities';

/**
 * AI-Ready Internal Linking Engine
 * Scans a block of text, finds semantic entity synonyms, and automatically
 * wraps them in heavily-optimized internal React Router Links.
 */
export const autoLinkText = (text: string): React.ReactNode[] => {
  let parts: React.ReactNode[] = [text];

  Object.values(SEMANTIC_ENTITIES).forEach((entity) => {
    // Sort synonyms by length descending so longer phrases match first
    const terms = [entity.name, ...entity.synonyms].sort((a, b) => b.length - a.length);
    
    terms.forEach((term) => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      
      parts = parts.flatMap((part, index) => {
        if (typeof part !== 'string') return [part];
        
        const splitText = part.split(regex);
        return splitText.map((chunk, i) => {
          // If chunk matches the regex term (case-insensitive)
          if (regex.test(chunk)) {
            return (
              <Link
                key={`${entity.id}-${index}-${i}`}
                to={entity.primaryRoute}
                className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-500/30 underline-offset-4 transition-colors"
                title={`Learn more about ${entity.name}`}
              >
                {chunk}
              </Link>
            );
          }
          return chunk;
        });
      });
    });
  });

  return parts;
};
