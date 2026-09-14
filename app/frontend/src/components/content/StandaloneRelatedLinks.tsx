import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Network } from 'lucide-react';

export interface RelatedLinkItem {
  href: string;
  label: string;
  description: string;
}

interface StandaloneRelatedLinksProps {
  title?: string;
  intro?: string;
  links: RelatedLinkItem[];
}

/**
 * Curated internal-link block for standalone guides/blog posts that are not
 * rendered by the Knowledge Graph entity templates. Keep this intentional:
 * links should form a useful path from informational intent to the relevant
 * problem/service/brand/case-study destination without creating link noise.
 */
export const StandaloneRelatedLinks: React.FC<StandaloneRelatedLinksProps> = ({
  title = 'Related KCROC repair paths',
  intro = 'Continue to the most relevant diagnostic, service, or repair page.',
  links,
}) => (
  <section className="border-t border-slate-800 py-10 sm:py-14" aria-labelledby="related-kcroc-links">
    <div className="container mx-auto max-w-5xl px-4 sm:px-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Network className="h-4 w-4" aria-hidden="true" />
          Internal repair pathways
        </div>
        <h2 id="related-kcroc-links" className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{intro}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900/70"
          >
            <span className="font-bold text-white group-hover:text-cyan-300">{link.label}</span>
            <span className="mt-2 block text-sm leading-6 text-slate-400">{link.description}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              Explore this path <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
