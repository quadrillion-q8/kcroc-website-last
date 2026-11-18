import React from 'react';
import { useHomeLocale } from './homeLocale';
import { ExternalLink, Star } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SectionHeader } from '@/components/ui/section-header';

export default function Reviews() {
  const { t } = useHomeLocale();
  const googleProfileUrl = KCROC_GRAPH.business?.socialLinks?.googleMaps;

  return (
    <section className="w-full border-t border-slate-800/50 bg-brand-dark/40 px-4 py-8 sm:px-6 sm:py-20" aria-label={t("Customer reviews","تقييمات العملاء")}>
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          title={t("Read Customer Reviews on Google","شوف تقييمات عملائنا على Google")}
          align="center"
          className="mb-4"
        />
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {t("For the latest ratings and customer feedback, visit KCROC's Google Business Profile directly.","تقدر تشوف أحدث التقييمات وتجارب العملاء مباشرة على صفحة KCROC في Google.")}
        </p>
        {googleProfileUrl && (
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cyan-500/40 px-6 py-3 text-sm font-bold text-cyan-300 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Star className="h-4 w-4 fill-current" aria-hidden="true" />
            <span>{t("Read current Google reviews","اقرأ تقييمات Google الحالية")}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
