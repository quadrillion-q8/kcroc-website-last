// File: app/frontend/src/components/home/BeforeAfterShowcase.tsx
import React from 'react';
import { Stethoscope, Wrench, CheckCircle2 } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { SectionHeader } from '@/components/ui/section-header';

const Picture = ({
  variant,
  alt,
}: {
  variant: { raw: string; webp: string; avif: string } | undefined;
  alt: string;
}) => {
  if (!variant) return null;
  return (
    <picture>
      <source srcSet={variant.avif} type="image/avif" />
      <source srcSet={variant.webp} type="image/webp" />
      <img
        src={variant.raw}
        alt={alt}
        className="w-full h-48 object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

export const BeforeAfterShowcase = () => {
  const caseStudies = KCROC_GRAPH.caseStudies;
  const { trackConversion } = useAnalytics();

  if (caseStudies.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Proof, Not Promises"
          title="We Fix the Board. Here's the Evidence."
          align="center"
          className="mb-4 sm:mb-16"
        />

        <div className="scroll-row gap-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6">
          {caseStudies.map((c) => {
            const before = c.featuredImage?.thumbnail;
            const after = c.featuredImage?.hero;
            const hasImages = Boolean(before && after);

            return (
              <div
                key={c.id}
                className="scroll-row-item w-[85%] md:w-auto bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 rounded-3xl overflow-hidden transition-all"
              >
                {hasImages && (
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <Picture variant={before} alt={c.title + ' - before repair'} />
                      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wide bg-slate-950/80 text-slate-300 px-2 py-1 rounded-full">
                        Before
                      </span>
                    </div>
                    <div className="relative">
                      <Picture variant={after} alt={c.title + ' - after repair'} />
                      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wide bg-cyan-500/90 text-slate-950 px-2 py-1 rounded-full font-bold">
                        After
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-6">
                    <h3 className="text-white font-bold text-base sm:text-lg">{c.title}</h3>
                    <span className="text-[10px] uppercase tracking-wide bg-slate-950 text-slate-500 px-2 py-1 rounded-full whitespace-nowrap ml-3">
                      {c.location}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex gap-2 sm:gap-3">
                      <Stethoscope className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 line-clamp-1 sm:line-clamp-none"><span className="text-slate-300 font-medium">Diagnosis: </span>{c.diagnosis}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <Wrench className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 line-clamp-1 sm:line-clamp-none"><span className="text-slate-300 font-medium">Repair: </span>{c.repair}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 line-clamp-1 sm:line-clamp-none"><span className="text-slate-300 font-medium">Outcome: </span>{c.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{c.timeToRepair}</span>
                    <span className="text-sm font-bold text-cyan-400">{c.costVsReplacement}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6 sm:mt-12">
          <a
            href="/case-studies"
            onClick={() => trackConversion('cta_click', { cta_name: 'case_studies_view_all', button_position: 'before_after_showcase' })}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline underline-offset-4"
          >
            {'View all case studies \u2192'}
          </a>
        </div>
      </div>
    </section>
  );
};
