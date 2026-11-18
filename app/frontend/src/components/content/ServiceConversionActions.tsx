import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Tag, Truck } from 'lucide-react';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { localizedSitePath, type SiteLocale } from '../../utils/locale';

type Props = {
  locale: SiteLocale;
  entityId: string;
  whatsappHref: string;
  whatsappLabel?: string;
  bookingLabel?: string;
  showPricing?: boolean;
  className?: string;
};
export default function ServiceConversionActions({ locale, entityId, whatsappHref, whatsappLabel, bookingLabel, showPricing = false, className }: Props) {
  const { trackConversion } = useAnalytics();
  const ar = locale === 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const eventName = (kind: string) => 'service_hero_' + kind + '_' + entityId + (ar ? '_ar' : '');
  const common = 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold';
  return (
    <div data-service-conversion={locale} data-service-entity={entityId} className={className ?? "mt-2 mb-6 flex flex-wrap gap-3"}>
      <a data-service-action="whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: eventName('whatsapp'), button_position: 'service_hero' })} className={common + ' bg-[#25D366] text-slate-950 shadow-lg shadow-emerald-950/20 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300'}>
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> {whatsappLabel ?? t('Get a Free Quote on WhatsApp', 'راسل فني على واتساب واطلب عرض سعر')}
      </a>
      <Link data-service-action="booking" to={localizedSitePath('/book', locale)} onClick={() => trackConversion('cta_click', { cta_name: eventName('book_pickup'), button_position: 'service_hero' })} className={common + ' border border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}>
        {ar ? <Truck className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />} {bookingLabel ?? t('Book Free Pickup', 'احجز استلام مجاني')}
      </Link>
      {showPricing && <Link data-service-action="pricing" to={localizedSitePath('/pricing', locale)} onClick={() => trackConversion('cta_click', { cta_name: eventName('pricing'), button_position: 'service_hero' })} className={common + ' border border-slate-700 text-slate-200 hover:border-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}>
        <Tag className="h-4 w-4" aria-hidden="true" /> {t('View repair pricing', 'راجع أسعار التصليح')}
      </Link>}
    </div>
  );
}
