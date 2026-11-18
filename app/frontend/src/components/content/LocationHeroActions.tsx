import { Link } from 'react-router-dom';
import { MessageCircle, Truck, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { localizedSitePath, type SiteLocale } from '../../utils/locale';

type Props = {
  locale: SiteLocale;
  locationSlug: string;
  whatsappHref: string;
  onBook: () => void;
  onWhatsApp: () => void;
  showPricing?: boolean;
};

export default function LocationHeroActions({ locale, locationSlug, whatsappHref, onBook, onWhatsApp, showPricing = false }: Props) {
  const ar = locale === 'ar';
  return (
    <div data-location-hero-actions={locale} data-location-slug={locationSlug} className="flex flex-col sm:flex-row gap-3 pt-2 sm:flex-wrap">
      <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]" asChild>
        <Link data-location-action="booking" to={localizedSitePath('/book', locale)} onClick={onBook}>
          <Truck className="me-2 h-5 w-5" aria-hidden="true" /> {ar ? 'احجز استلام مجاني' : 'Book Free Pickup'}
        </Link>
      </Button>
      <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
        <a data-location-action="whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={onWhatsApp}>
          <MessageCircle className="me-2 h-5 w-5" aria-hidden="true" /> {ar ? 'راسلنا على واتساب' : 'WhatsApp KCROC'}
        </a>
      </Button>
      {showPricing && <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
        <Link data-location-action="pricing" to={localizedSitePath('/pricing', locale)}>
          <Tag className="me-2 h-4 w-4" aria-hidden="true" /> {ar ? 'راجع الأسعار' : 'View pricing'}
        </Link>
      </Button>}
    </div>
  );
}
