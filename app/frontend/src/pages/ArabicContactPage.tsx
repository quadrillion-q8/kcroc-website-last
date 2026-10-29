import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Navigation, ArrowUpLeft, Send, Truck
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import MapComponent from '../components/MapComponent';

const business = KCROC_GRAPH.business!;
const phone = business.telephone;
const phoneDisplay = phone.startsWith('965') ? '+965 ' + phone.slice(3) : '+' + phone;
const mapsUrl = business.socialLinks.googleMaps;
const whatsappUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(
  'السلام عليكم KCROC، أحتاج إلى تصليح كمبيوتر أو لابتوب. أرجو مساعدتي في ترتيب زيارة المختبر أو الاستلام المجاني.'
);

const locationPhotos = [
  {
    src: '/images/kcroc-al-mullah-complex-hawalli-exterior.webp',
    alt: 'الواجهة الخارجية لمجمع الملا في حولي حيث يقع مختبر KCROC',
    caption: 'مجمع الملا في حولي',
  },
  {
    src: '/images/kcroc-commercial-complex-view-dusk.webp',
    alt: 'مشهد لمجمع الملا التجاري في حولي وقت الغروب',
    caption: 'المجمع التجاري وقت الغروب',
  },
  {
    src: '/images/kcroc-al-mullah-complex-hawalli-night-view.webp',
    alt: 'واجهة مجمع الملا في حولي خلال الليل',
    caption: 'مجمع الملا ليلًا',
  },
  {
    src: '/images/kcroc-al-mullah-complex-basement-shop-entrance.webp',
    alt: 'مدخل الطابق السفلي إلى مختبر KCROC في المحل 19 بمجمع الملا في حولي',
    caption: 'مدخل الطابق السفلي — المحل 19',
  },
  {
    src: '/images/gallery/computer-repair-shop-glass-entrance-used-monitors-kuwait.webp',
    alt: 'المدخل الزجاجي الحقيقي لمختبر KCROC مع ظهور شاشات الكمبيوتر في الداخل',
    caption: 'مختبر صيانة KCROC',
  },
];

type Enquiry = {
  name: string;
  device: string;
  area: string;
  fault: string;
};

const initialEnquiry: Enquiry = { name: '', device: '', area: '', fault: '' };

export default function ArabicContactPage() {
  const [enquiry, setEnquiry] = useState<Enquiry>(initialEnquiry);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEnquiry((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enquiry.name.trim() || !enquiry.device.trim() || !enquiry.area.trim() || !enquiry.fault.trim()) return;

    const message = [
      'طلب تصليح جديد من صفحة اتصل بنا',
      '',
      'الاسم: ' + enquiry.name,
      'نوع الجهاز والموديل: ' + enquiry.device,
      'المنطقة: ' + enquiry.area,
      'العطل: ' + enquiry.fault,
    ].join('\n');
    const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = url;
  };

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen w-full bg-transparent pb-12 pt-8 font-sans text-white selection:bg-cyan-500/30 sm:pt-16 lg:pt-32">
      <SEOEngine entityId="page-ar-contact" />

      <nav aria-label="مسار التنقل" className="relative z-10 mx-auto mb-8 max-w-6xl px-6">
        <ol className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <li><Link to="/ar" className="transition-colors hover:text-cyan-400">الرئيسية</Link></li>
          <li aria-hidden="true" className="text-slate-600">/</li>
          <li aria-current="page" className="text-cyan-400">اتصل بنا</li>
        </ol>
      </nav>

      <section className="relative z-10 px-6 pb-14 text-center">
        <h1 className="mx-auto mb-5 max-w-5xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          اتصل بنا – تصليح الكمبيوتر واللابتوب في <span className="text-cyan-400">حولي، الكويت</span>
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          تواصل مع فريق KCROC لتصليح الكمبيوتر واللابتوب في حولي. يمكنك زيارة مختبرنا الفعلي في مجمع الملا، المحل 19 في الطابق السفلي، أو طلب استلام وتوصيل مجاني من المنزل أو المكتب في مناطق الكويت. نقدم فحصًا أوليًا مجانيًا ونوضح التكلفة قبل بدء أعمال الإصلاح المدفوعة.
        </p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-col justify-center gap-3 sm:flex-row">
          <a href={'tel:+' + phone} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-black text-slate-950 transition-colors hover:bg-cyan-400">
            <Phone size={19} aria-hidden="true" /> اتصال {phoneDisplay}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20">
            <MessageCircle size={19} aria-hidden="true" /> راسلنا عبر واتساب
            <ArrowUpLeft size={16} aria-hidden="true" />
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-bold text-white transition-colors hover:border-cyan-500/50 hover:text-cyan-300">
            <Navigation size={19} aria-hidden="true" /> الاتجاهات إلى المختبر
            <ArrowUpLeft size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-400">مختبر KCROC الفعلي الوحيد في حولي، مع خدمة استلام وتوصيل مجانية في جميع مناطق الكويت.</p>
      </section>

      <section className="relative z-10 border-t border-slate-800/50 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">أرسل تفاصيل طلب التصليح</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="ar-contact-name" className="mb-2 block text-sm font-semibold text-slate-200">الاسم الكامل</label>
                <input id="ar-contact-name" autoComplete="name" name="name" value={enquiry.name} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-brand-dark/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" placeholder="اكتب اسمك" />
              </div>
              <div>
                <label htmlFor="ar-contact-device" className="mb-2 block text-sm font-semibold text-slate-200">نوع الجهاز والموديل</label>
                <input id="ar-contact-device" name="device" value={enquiry.device} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-brand-dark/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" placeholder="مثال: MacBook Pro أو Dell Latitude" />
              </div>
              <div>
                <label htmlFor="ar-contact-area" className="mb-2 block text-sm font-semibold text-slate-200">المنطقة في الكويت</label>
                <select id="ar-contact-area" name="area" value={enquiry.area} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-brand-dark/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none [color-scheme:dark]">
                  <option value="" disabled>اختر المنطقة</option>
                  <option value="حولي">حولي</option>
                  <option value="السالمية">السالمية</option>
                  <option value="مدينة الكويت">مدينة الكويت</option>
                  <option value="الفروانية">الفروانية</option>
                  <option value="الأحمدي">الأحمدي</option>
                  <option value="الجهراء">الجهراء</option>
                  <option value="منطقة أخرى في الكويت">منطقة أخرى في الكويت</option>
                </select>
              </div>
              <div>
                <label htmlFor="ar-contact-fault" className="mb-2 block text-sm font-semibold text-slate-200">وصف العطل</label>
                <textarea id="ar-contact-fault" name="fault" value={enquiry.fault} onChange={handleChange} required rows={4} className="w-full resize-y rounded-xl border border-slate-700 bg-brand-dark/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" placeholder="اكتب المشكلة التي تواجه الجهاز" />
              </div>
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 transition-colors hover:bg-cyan-400">
                <Send size={19} aria-hidden="true" /> إرسال التفاصيل عبر واتساب
              </button>
              <p className="text-xs leading-6 text-slate-400">سيتم فتح واتساب برسالة جاهزة لمراجعتها وإرسالها بنفسك.</p>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h2 className="mb-7 text-2xl font-black text-white">بيانات التواصل وزيارة المختبر</h2>
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">اتصل بنا</h3><a href={'tel:+' + phone} className="text-slate-300 hover:text-cyan-300" dir="ltr">{phoneDisplay}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">واتساب</h3><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-300">راسل فريق KCROC مباشرة</a></div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">البريد الإلكتروني</h3><a href={'mailto:' + business.email} className="text-slate-300 hover:text-cyan-300">{business.email}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">عنوان المختبر</h3><address className="not-italic leading-7 text-slate-300">{business.streetAddress}، {business.addressLocality}، الكويت</address></div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">ساعات العمل</h3><p className="text-slate-300">{business.openingHours}</p></div>
              </div>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-sm leading-7 text-slate-300">
                <Truck className="ml-2 inline h-4 w-4 text-cyan-400" aria-hidden="true" />
                يمكنك زيارة مختبرنا في حولي أو طلب استلام وتوصيل مجاني من مناطق الكويت التي نخدمها. لا توجد فروع فعلية أخرى.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 px-6 py-14" aria-labelledby="ar-contact-photos">
        <div className="mx-auto max-w-6xl">
          <h2 id="ar-contact-photos" className="mb-3 text-center text-2xl font-black text-white sm:text-3xl">صور حقيقية لمجمع الملا ومختبر KCROC</h2>
          <p className="mx-auto mb-8 max-w-3xl text-center leading-7 text-slate-300">تساعدك هذه الصور على التعرف على المبنى ومدخل الطابق السفلي ومختبر الصيانة قبل زيارتنا في حولي.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locationPhotos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
                <img src={photo.src} alt={photo.alt} width={640} height={480} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-3 text-sm font-medium text-slate-300">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-white">موقع مختبر KCROC في حولي</h2>
            <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-300">زرنا في مجمع الملا، شارع ابن خلدون، الطابق السفلي، المحل 19. المختبر مفتوح يوميًا من الساعة 10 صباحًا حتى 10 مساءً.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
            <MapComponent title="موقع مختبر KCROC في مجمع الملا بحولي" />
          </div>
          <div className="mt-5 flex justify-center">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-bold text-cyan-300 hover:border-cyan-500/50">
              <Navigation size={18} aria-hidden="true" /> افتح الاتجاهات في خرائط Google
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <summary className="cursor-pointer font-bold text-white">هل يمكن زيارة مختبر KCROC مباشرة؟</summary>
            <p className="mt-3 leading-7 text-slate-300">نعم، يمكنك زيارة مختبرنا الفعلي في مجمع الملا، الطابق السفلي، المحل 19 في حولي. ساعات العمل يوميًا من 10 صباحًا إلى 10 مساءً.</p>
          </details>
          <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <summary className="cursor-pointer font-bold text-white">هل توفرون استلام اللابتوب من خارج حولي؟</summary>
            <p className="mt-3 leading-7 text-slate-300">نعم، نقدم خدمة استلام وتوصيل مجانية من مناطق الكويت التي نخدمها. مختبرنا الفعلي الوحيد موجود في حولي.</p>
          </details>
        </div>
      </section>

      <section className="border-t border-slate-800/50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-black text-white">صفحات قد تساعدك</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/ar/computer-repair-hawalli" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 hover:border-cyan-500/50">تصليح الكمبيوتر واللابتوب في حولي</Link>
            <Link to="/ar/book" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 hover:border-cyan-500/50">احجز استلامًا مجانيًا</Link>
            <Link to="/ar/pricing" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 hover:border-cyan-500/50">أسعار خدمات التصليح</Link>
            <Link to="/ar/near-me" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 hover:border-cyan-500/50">خدمة التصليح والاستلام في الكويت</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
