// File: src/utils/linkGraph.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SEMANTIC_ENTITIES } from '../constants/entities';

/**
 * AI-Ready Internal Linking Component
 * Wraps text blocks in optimized internal React Router Links.
 */
export const AutoLink: React.FC<{ text: string }> = ({ text }) => {
  // We use your existing logic wrapped in a component structure
  const renderLinkedText = (inputText: string): React.ReactNode[] => {
    let parts: React.ReactNode[] = [inputText];

    Object.values(SEMANTIC_ENTITIES).forEach((entity) => {
      const terms = [entity.name, ...entity.synonyms].sort((a, b) => b.length - a.length);
      
      terms.forEach((term) => {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        
        parts = parts.flatMap((part) => {
          if (typeof part !== 'string') return [part];
          
          const splitText = part.split(regex);
          return splitText.map((chunk, i) => {
            if (term.toLowerCase() === chunk.toLowerCase()) {
              return (
                <Link
                  key={`${entity.id}-${i}`}
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

  return <>{renderLinkedText(text)}</>;
};
