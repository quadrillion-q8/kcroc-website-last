// File: app/frontend/src/components/home/StickyMobileCTA.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_GRAPH } from '../../data/navGraph.generated';
import { buildWhatsAppLink, getPageWhatsAppLink } from '../../utils/whatsappIntent';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export const StickyMobileCTA = () => {
  const phone = NAV_GRAPH.business.telephone;
  const { pathname } = useLocation();
  const { trackConversion } = useAnalytics();
  const isArabicHingePage = pathname === '/ar/laptop-hinge-repair-kuwait';
  const whatsappLink = isArabicHingePage
    ? buildWhatsAppLink('السلام عليكم KCROC، أحتاج فحص مفصلات وهيكل اللابتوب. الماركة والموديل الدقيق: ____. الأعراض: مفصلة قاسية / صوت طقطقة / الغطاء لا يغلق / إطار الشاشة منفصل / قواعد التثبيت مكسورة. هل الشاشة أو كابل العرض متضرر؟ ____. منطقتي: ____. سأرفق صورة واضحة للمفصلة وإطار الشاشة أو الغطاء من الخارج. فضلاً راجعوا الصور وحددوا هل يلزم ترميم أو تبديل، مع توضيح السعر والمدة بعد الفحص.')
    : getPageWhatsAppLink(pathname);

  // Keep the visible promise identical to the action behind it. The sticky
  // bar always opens WhatsApp, so location pages explicitly say "via WhatsApp"
  // rather than implying a direct booking-form submission.
  const isArabicRoute = pathname === '/ar' || pathname.startsWith('/ar/') || pathname.startsWith('/blog/ar/') || pathname.startsWith('/guides/ar/');
  const ctaLabel = isArabicRoute
    ? pathname.includes('macbook') && pathname.includes('screen') ? 'سعر تبديل شاشة ماك بوك' :
      pathname.includes('hinge') ? 'أرسل صورة المفصلة' :
      pathname.includes('battery') ? 'مساعدة في البطارية' :
      pathname.includes('screen') ? 'سعر تبديل الشاشة' :
      pathname.includes('gaming') ? 'مساعدة في كمبيوتر الألعاب' :
      pathname.includes('motherboard') ? 'تصليح المذربورد' :
      pathname.startsWith('/guides/') || pathname.startsWith('/blog/') ? 'اسأل فنيًا' :
      'راسل فنيًا عبر واتساب'
    : pathname === '/pricing' ? 'Get Exact Price' :
      pathname.includes('battery') ? 'Battery Help' :
      pathname.includes('screen') ? 'Get Screen Quote' :
      pathname.includes('gaming') ? 'Gaming Help' :
      pathname.includes('motherboard') ? 'Board Repair' :
      pathname.includes('macbook') ? 'MacBook Help' :
      pathname.startsWith('/location/') ? 'Book via WhatsApp' :
      pathname.startsWith('/guides/') || pathname.startsWith('/blog/') ? 'Ask a Technician' :
      'WhatsApp a Technician';

  return (
    <div
      className="kcroc-mobile-sticky-cta md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-brand-dark/95 backdrop-blur px-3 pt-2.5 flex gap-2.5"
      style={{ paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom)))' }}
    >
      <a
        href={`tel:+${phone}`}
        onClick={() => trackConversion('phone_call_click', { cta_name: 'sticky_mobile_call', button_position: 'bottom_bar' })}
        className="min-w-0 flex-1 text-center rounded-xl border border-slate-700 text-slate-200 font-semibold leading-tight py-2.5 px-1 min-h-[48px] touch-manipulation transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label={isArabicRoute ? "اتصل بـ KCROC" : "Call KCROC"}
      >
        {isArabicRoute ? "اتصال" : "Call"}
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isArabicRoute ? `${ctaLabel} عبر واتساب` : `${ctaLabel} via WhatsApp`}
        onClick={() => trackConversion('whatsapp_click', { cta_name: 'sticky_mobile_wa', button_position: 'bottom_bar' })}
        className="min-w-0 flex-[2] text-center rounded-lg bg-[#25D366] text-slate-950 font-bold text-sm sm:text-base leading-tight py-2.5 px-1 min-h-12 whitespace-normal touch-manipulation transition-transform active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        {ctaLabel}
      </a>
    </div>
  );
};
