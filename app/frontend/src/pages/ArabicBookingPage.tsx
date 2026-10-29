// File: app/frontend/src/pages/ArabicBookingPage.tsx
import React, { useRef, useState } from 'react';
import { Clock, MapPin, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import { buildWhatsAppLink } from '../utils/whatsappIntent';

const business = KCROC_GRAPH.business!;
const BASE_URL = business.websiteUrl;

const ARABIC_BOOKING_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'حجز استلام الكمبيوتر واللابتوب للتصليح',
      description: 'طلب استلام مجاني للكمبيوتر واللابتوب للتصليح في الكويت، مع فحص أولي وعرض سعر قبل بدء الإصلاح المدفوع.',
      provider: { '@id': BASE_URL + '/#business' },
      areaServed: { '@type': 'Country', name: 'Kuwait' }
    }
  ]
};

const DEVICE_OPTIONS = [
  'لابتوب ويندوز',
  'MacBook / Apple',
  'كمبيوتر مكتبي',
  'كمبيوتر ألعاب',
  'اللوحة الأم',
  'جهاز آخر'
];

export default function ArabicBookingPage() {
  const { trackConversion } = useAnalytics();
  const [deviceType, setDeviceType] = useState('لابتوب ويندوز');
  const [deviceModel, setDeviceModel] = useState('');
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [preferredPickup, setPreferredPickup] = useState('');
  const bookingStarted = useRef(false);

  const trackBookingStart = () => {
    if (bookingStarted.current) return;
    bookingStarted.current = true;
    trackConversion('begin_booking', {
      booking_type: 'pickup',
      location_context: location.trim() || 'not_provided',
      cta_name: 'arabic_booking_form_interaction',
      button_position: 'arabic_booking_page'
    });
  };

  const handleWhatsAppRedirect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackBookingStart();
    trackConversion('whatsapp_click', {
      cta_name: 'arabic_booking_form_submit',
      button_position: 'arabic_booking_page'
    });

    const message =
      '*طلب تصليح جديد من موقع KCROC*\\n\\n' +
      '*الجهاز:* ' + deviceType + (deviceModel.trim() ? ' (' + deviceModel.trim() + ')' : '') + '\\n' +
      '*المنطقة:* ' + (location.trim() || 'لم يتم تحديد المنطقة') + '\\n' +
      '*الوقت المفضل للاستلام:* ' + (preferredPickup || 'مرن / يتم التنسيق عبر واتساب') + '\\n' +
      '*العطل:* ' + (issue.trim() || 'أحتاج إلى فحص وتشخيص') + '\\n\\n' +
      'مرحبًا KCROC، أريد طلب استلام مجاني للجهاز وفحصه مبدئيًا. يرجى التواصل معي لتأكيد تفاصيل الاستلام.';
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div dir="rtl" lang="ar-KW" className="w-full min-h-screen bg-transparent font-sans text-slate-100 pb-16 pt-24">
      <SEOEngine entityId="page-ar-booking" />
      <SchemaMarkup schema={ARABIC_BOOKING_SCHEMA} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold tracking-wide text-cyan-300">خدمة الاستلام والتوصيل مجانًا في الكويت</p>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            احجز استلام اللابتوب والكمبيوتر <span className="text-cyan-400">للتصليح في الكويت</span>
          </h1>
          <p className="mt-5 text-lg leading-loose text-slate-300">
            اطلب استلام جهازك من المنزل أو المكتب في مناطق الكويت التي نخدمها. أخبرنا بنوع الجهاز والمشكلة والمنطقة، وسنفحص الجهاز في مختبرنا بحولي ونوضح لك التكلفة قبل بدء أي إصلاح مدفوع.
          </p>
          <p className="mt-3 text-sm leading-loose text-slate-500">
            إرسال الطلب يفتح محادثة واتساب ولا يعني تأكيد موعد الاستلام؛ سيقوم فريقنا بتأكيد التفاصيل معك.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-2xl lg:col-span-3" aria-labelledby="arabic-booking-form-title">
            <div className="h-2 w-full bg-gradient-to-l from-cyan-500 to-emerald-500" />
            <div className="p-6 sm:p-10">
              <h2 id="arabic-booking-form-title" className="mb-6 text-2xl font-black text-white">اطلب استلام جهازك</h2>
              <form className="space-y-7" onFocusCapture={trackBookingStart} onSubmit={handleWhatsAppRedirect}>
                <fieldset className="space-y-3">
                  <legend className="mb-3 text-sm font-bold text-white">١. ما نوع الجهاز؟</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {DEVICE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={deviceType === option}
                        onClick={() => { trackBookingStart(); setDeviceType(option); }}
                        className={deviceType === option ? 'min-h-[48px] rounded-xl border border-cyan-500 bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400' : 'min-h-[48px] rounded-xl border border-slate-800 bg-brand-dark p-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-3">
                  <label htmlFor="arabic-booking-model" className="block text-sm font-bold text-white">ماركة الجهاز والموديل <span className="font-normal text-slate-500">(اختياري)</span></label>
                  <input
                    id="arabic-booking-model"
                    name="deviceModel"
                    type="text"
                    className="min-h-[52px] w-full rounded-xl border border-slate-800 bg-brand-dark px-4 py-3 text-base text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="مثال: Dell XPS 15 أو MacBook Pro M2"
                    value={deviceModel}
                    onChange={(event) => setDeviceModel(event.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="arabic-booking-issue" className="block text-sm font-bold text-white">٢. ما المشكلة أو الأعراض؟</label>
                  <textarea
                    id="arabic-booking-issue"
                    name="issue"
                    rows={3}
                    className="min-h-[112px] w-full rounded-xl border border-slate-800 bg-brand-dark px-4 py-3 text-base text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="مثال: الجهاز لا يعمل، ارتفاع الحرارة، مشكلة في الشاشة أو الشحن..."
                    value={issue}
                    onChange={(event) => setIssue(event.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="arabic-booking-location" className="flex items-center gap-2 text-sm font-bold text-white"><MapPin className="h-4 w-4 text-cyan-400" aria-hidden="true" /> ٣. في أي منطقة بالكويت؟</label>
                  <input
                    id="arabic-booking-location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    className="min-h-[52px] w-full rounded-xl border border-slate-800 bg-brand-dark px-4 py-3 text-base text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="مثال: السالمية، حولي، الفروانية، مدينة الكويت..."
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="arabic-booking-pickup" className="block text-sm font-bold text-white">الوقت المفضل للاستلام <span className="font-normal text-slate-500">(اختياري)</span></label>
                  <select
                    id="arabic-booking-pickup"
                    name="preferredPickup"
                    className="min-h-[52px] w-full rounded-xl border border-slate-800 bg-brand-dark px-4 py-3 text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    value={preferredPickup}
                    onChange={(event) => setPreferredPickup(event.target.value)}
                  >
                    <option value="">مرن / يتم التنسيق عبر واتساب</option>
                    <option value="Morning (10 AM–1 PM)">صباحًا (10 صباحًا–1 ظهرًا)</option>
                    <option value="Afternoon (1 PM–5 PM)">بعد الظهر (1–5 مساءً)</option>
                    <option value="Evening (5 PM–10 PM)">مساءً (5–10 مساءً)</option>
                  </select>
                  <p className="text-xs leading-relaxed text-slate-500">الوقت المفضل ليس موعدًا مؤكدًا؛ سيؤكد الفريق التوفر عبر واتساب.</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-4 text-base font-black text-slate-950 shadow-lg transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-lg"
                  >
                    <MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" />
                    اطلب استلامًا مجانيًا عبر واتساب
                  </button>
                  <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-slate-500"><ShieldCheck className="h-3 w-3 text-emerald-400" aria-hidden="true" /> أرسل طلبك مباشرة إلى فريق KCROC</p>
                </div>
              </form>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-cyan-900/50 bg-cyan-950/20 p-6 sm:p-8">
              <h2 className="mb-6 border-b border-cyan-900/50 pb-4 text-xl font-bold text-white">مزايا الخدمة</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="h-fit shrink-0 rounded-xl bg-slate-900 p-3"><Truck className="h-6 w-6 text-cyan-400" aria-hidden="true" /></div>
                  <div><h3 className="mb-1 font-bold text-white">استلام وتوصيل مجانًا</h3><p className="text-sm leading-loose text-slate-400">نرتب استلام الجهاز وإعادته مجانًا في مناطق الكويت التي نخدمها.</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-fit shrink-0 rounded-xl bg-slate-900 p-3"><ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" /></div>
                  <div><h3 className="mb-1 font-bold text-white">لا إصلاح، لا رسوم إصلاح</h3><p className="text-sm leading-loose text-slate-400">إذا كان الجهاز متضررًا بشكل كبير ولا يمكن إصلاحه اقتصاديًا وفق سياسة الخدمة، فلن تُفرض رسوم إصلاح.</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="h-fit shrink-0 rounded-xl bg-slate-900 p-3"><Clock className="h-6 w-6 text-cyan-400" aria-hidden="true" /></div>
                  <div><h3 className="mb-1 font-bold text-white">ضمان إصلاح لمدة 30 يومًا</h3><p className="text-sm leading-loose text-slate-400">يُشرح نطاق الضمان عند اعتماد الإصلاح.</p></div>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
              <h2 className="text-lg font-bold text-white">الأسعار بوضوح قبل الإصلاح</h2>
              <p className="mt-3 text-sm leading-loose text-slate-400">الفحص الأولي والاستلام مجانًا. نوضح التكلفة قبل بدء أي إصلاح مدفوع.</p>
              <ul className="mt-4 space-y-2 text-sm leading-loose text-slate-300">
                <li>أجرة تركيب الشاشة تبدأ من 30 د.ك، بالإضافة إلى سعر الشاشة.</li>
                <li>أجرة تركيب البطارية تبدأ من 8 د.ك، بالإضافة إلى سعر البطارية.</li>
                <li>أجرة تركيب لوحة المفاتيح تبدأ من 10 د.ك، بالإضافة إلى سعر القطعة.</li>
              </ul>
              <a href="/ar/pricing" className="mt-4 inline-flex min-h-11 items-center font-bold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline">عرض تفاصيل الأسعار <span className="mr-2" aria-hidden="true">←</span></a>
            </div>
          </aside>
        </div>

        <section className="mt-12 border-t border-slate-800 pt-10" aria-labelledby="arabic-booking-process">
          <h2 id="arabic-booking-process" className="text-2xl font-black text-white sm:text-3xl">ماذا يحدث بعد إرسال الطلب؟</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">الخطوة الأولى</p>
              <h3 className="mt-2 font-bold text-white">أخبرنا عن الجهاز والعطل</h3>
              <p className="mt-2 text-sm leading-loose text-slate-400">اكتب الموديل إن كان معروفًا، ووصف الأعراض والمنطقة التي تتواجد فيها.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">الخطوة الثانية</p>
              <h3 className="mt-2 font-bold text-white">تأكيد تفاصيل الاستلام والفحص</h3>
              <p className="mt-2 text-sm leading-loose text-slate-400">يناقش فريقنا معك تفاصيل الاستلام؛ ويتم الفحص في مختبر KCROC بحولي.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">الخطوة الثالثة</p>
              <h3 className="mt-2 font-bold text-white">راجع عرض السعر</h3>
              <p className="mt-2 text-sm leading-loose text-slate-400">نوضح الإصلاح المقترح وتكلفته، ويمكنك اتخاذ قرارك قبل بدء العمل المدفوع.</p>
            </article>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-800 pt-10" aria-labelledby="arabic-booking-faqs">
          <h2 id="arabic-booking-faqs" className="text-2xl font-black text-white sm:text-3xl">أسئلة شائعة حول حجز الاستلام</h2>
          <div className="mt-5 max-w-4xl divide-y divide-slate-800">
            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-200">هل الفحص الأولي مجاني؟</summary>
              <p className="mt-2 text-sm leading-loose text-slate-400">نعم، الفحص الأولي مجاني. نوضح لك الإصلاح المقترح والتكلفة قبل بدء أي عمل مدفوع.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-200">هل الاستلام والتوصيل مجانيان في الكويت؟</summary>
              <p className="mt-2 text-sm leading-loose text-slate-400">نرتب الاستلام وإعادة الجهاز مجانًا في مناطق الكويت التي نخدمها، ويتم تأكيد التفاصيل عبر واتساب.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-200">كم يستغرق الإصلاح؟</summary>
              <p className="mt-2 text-sm leading-loose text-slate-400">تعتمد المدة على العطل والموديل وتوفر القطع. تستغرق كثير من إصلاحات الأجهزة المعتادة نحو 24 إلى 48 ساعة، وقد تحتاج الأعطال المعقدة إلى وقت أطول.</p>
            </details>
          </div>
        </section>

        <p className="mt-8 text-sm leading-loose text-slate-500">
          هل تحتاج إلى تفاصيل إضافية؟ <a href="/ar/services" className="font-semibold text-cyan-300 underline-offset-4 hover:underline">تصفح خدمات التصليح</a> أو <a href="/ar/near-me" className="font-semibold text-cyan-300 underline-offset-4 hover:underline">تعرف على الاستلام بالقرب منك</a>.
        </p>
      </div>
    </div>
  );
}
