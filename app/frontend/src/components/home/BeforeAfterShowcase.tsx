// File: app/frontend/src/components/home/BeforeAfterShowcase.tsx
import React, { useState } from 'react';
import { Stethoscope, Wrench, CheckCircle2, MoveHorizontal } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SectionHeader } from '@/components/ui/section-header';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

const Picture = ({
  variant,
  alt,
  className = '',
}: {
  variant: { raw: string; webp: string; avif: string } | undefined;
  alt: string;
  className?: string;
}) => {
  if (!variant) return null;
  return (
    <picture>
      <source srcSet={variant.avif} type="image/avif" />
      <source srcSet={variant.webp} type="image/webp" />
      <img
        src={variant.raw}
        alt={alt}
        width={800}
        height={480}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

const ComparisonSlider = ({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: { raw: string; webp: string; avif: string };
  after: { raw: string; webp: string; avif: string };
  beforeAlt: string;
  afterAlt: string;
}) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 select-none">
      <Picture variant={after} alt={afterAlt} className="absolute inset-0" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <Picture variant={before} alt={beforeAlt} className="absolute inset-0" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-3 top-3 text-[10px] uppercase tracking-wide bg-brand-dark/85 text-slate-200 px-2.5 py-1.5 rounded-full font-bold backdrop-blur">
          Before
        </span>
        <span className="absolute right-3 top-3 text-[10px] uppercase tracking-wide bg-cyan-500/90 text-slate-950 px-2.5 py-1.5 rounded-full font-bold">
          After
        </span>
        <div
          className="absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_0_1px_rgba(15,23,42,0.35)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full border-2 border-white bg-slate-950/85 shadow-xl flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      <label className="sr-only">Drag to compare the before and after repair photos</label>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Before and after repair comparison"
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="rounded-full border border-white/15 bg-slate-950/75 px-3 py-1.5 text-[10px] font-semibold text-slate-200 backdrop-blur">
          Drag to compare
        </span>
      </div>
    </div>
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
          description="Drag across each repair photo to compare the starting condition with the completed work."
          align="center"
          className="mb-5 sm:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {caseStudies.map((c) => {
            const before = c.featuredImage?.thumbnail;
            const after = c.featuredImage?.hero;
            const hasImages = Boolean(before && after);

            return (
              <article
                key={c.id}
                className="bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 rounded-3xl overflow-hidden transition-all"
              >
                {hasImages && before && after && (
                  <ComparisonSlider
                    before={before}
                    after={after}
                    beforeAlt={`${c.title} - before repair`}
                    afterAlt={`${c.title} - after repair`}
                  />
                )}

                <div className="p-4 sm:p-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-6 gap-3">
                    <h3 className="text-white font-bold text-base sm:text-lg">{c.title}</h3>
                    <span className="text-[10px] uppercase tracking-wide bg-brand-dark text-slate-500 px-2 py-1 rounded-full whitespace-nowrap">
                      {c.location}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex gap-2 sm:gap-3">
                      <Stethoscope className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-slate-400"><span className="text-slate-300 font-medium">Diagnosis: </span>{c.diagnosis}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <Wrench className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-slate-400"><span className="text-slate-300 font-medium">Repair: </span>{c.repair}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-slate-400"><span className="text-slate-300 font-medium">Outcome: </span>{c.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/40 px-2.5 py-1.5 text-[10px] font-semibold text-slate-400">
                      {c.timeToRepair}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/15 bg-cyan-500/5 px-2.5 py-1.5 text-[10px] font-semibold text-cyan-300">
                      {c.costVsReplacement}
                    </span>
                    {c.warranty?.durationDays && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-300">
                        {c.warranty.durationDays}-day repair warranty
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-6 sm:mt-12">
          <a
            href="/case-studies"
            onClick={() => trackConversion('cta_click', { cta_name: 'case_studies_view_all', button_position: 'before_after_showcase' })}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline underline-offset-4"
          >
            View all case studies →
          </a>
        </div>
      </div>
    </section>
  );
};
