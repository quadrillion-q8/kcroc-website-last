// File: app/frontend/src/utils/linkGraph.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';

interface AutoLinkProps {
  text: string;
  currentEntityId?: string; // Pass this to prevent the page from linking to itself
}

/**
 * AI-Ready Semantic Internal Linking Engine
 * Automatically scans text and wraps Knowledge Graph entities in SEO-optimized React Router Links.
 */
export const AutoLink: React.FC<AutoLinkProps> = ({ text, currentEntityId }) => {
  
  // Memoize the term dictionary so we only build this massive array once per render cycle
  const sortedTerms = useMemo(() => {
    const terms: { phrase: string; entityId: string; url: string; title: string }[] = [];

    Object.values(KCROC_GRAPH.entities).forEach((entity: any) => {
      // 1. Skip inactive entities or the current page (No self-linking)
      if (!entity.isActive) return;
      if (currentEntityId && entity.id === currentEntityId) return;

      // 🚀 FIX: Safely skip utility entities (USPs, Badges, Stats) that don't have SEO blocks
      if (!entity.seo || !entity.seo.canonicalUrl) return;

      // Ensure React Router uses relative paths to prevent hard page reloads
      const relativeUrl = entity.seo.canonicalUrl.replace(/^https?:\/\/[^\/]+/, '') || '/';

      // 2. Gather all possible anchor text variations
      const phrases = [
        entity.title,
        entity.primaryKeyword,
        ...(entity.secondaryKeywords || []),
        ...(entity.synonyms || []),
        ...(entity.aliases || [])
      ];

      phrases.forEach(phrase => {
        if (phrase && typeof phrase === 'string' && phrase.trim().length > 3) { // Ignore tiny words like "PC" to prevent false positives
          terms.push({
            phrase: phrase.trim(),
            entityId: entity.id,
            url: relativeUrl,
            title: entity.title
          });
        }
      });
    });

    // 3. Sort by length descending (Match "MacBook Logic Board" before "MacBook")
    return terms.sort((a, b) => b.phrase.length - a.phrase.length);
  }, [currentEntityId]);

  const renderLinkedText = () => {
    let parts: React.ReactNode[] = [text];
    const linkedEntityIds = new Set<string>(); // Tracks linked entities to prevent duplicate links in one block

    sortedTerms.forEach(({ phrase, entityId, url, title }) => {
      // SEO Rule: Only link to an entity ONCE per text block to prevent over-optimization
      if (linkedEntityIds.has(entityId)) return;

      // Escape regex special characters
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escapedPhrase})\\b`, 'gi');

      let matchedInThisPass = false;

      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return [part]; // Skip if it's already a <Link>
        if (matchedInThisPass) return [part]; // Stop searching if we already linked this entity

        const splitText = part.split(regex);
        if (splitText.length === 1) return [part]; // No match found

        return splitText.map((chunk, i) => {
          if (chunk.toLowerCase() === phrase.toLowerCase() && !matchedInThisPass) {
            matchedInThisPass = true;
            linkedEntityIds.add(entityId); // Mark entity as linked
            
            return (
              <Link
                key={`${entityId}-${i}`}
                to={url}
                className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-500/30 underline-offset-4 transition-colors"
                title={`Learn more about ${title}`}
              >
                {chunk}
              </Link>
            );
          }
          return chunk;
        });
      });
    });

    return parts;
  };

  return <>{renderLinkedText()}</>;
};
