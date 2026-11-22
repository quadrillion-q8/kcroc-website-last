// Arabic counterpart of /guides/dell-laptop-overheating.
// Dell-only technical guide: do not turn this into the all-brand overheating page.

import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/guides/ar/dell-laptop-overheating`;
const EN_PAGE_URL = `${business.websiteUrl}/guides/dell-laptop-overheating`;
const OG_IMAGE_URL = `${business.websiteUrl}${IMAGES.laptopHardware.cloggedFan.src}`;
const AUTHOR_ID = `${business.websiteUrl}/author/imran#person`;
const DATE_MODIFIED = '2026-11-15';
const LAST_UPDATED = '15 نوفمبر 2026';

const faq = [
  { q: 'شلون أشغّل فحص Dell من بداية التشغيل؟', a: 'طفّ اللابتوب، شغّله واضغط F12 أكثر من مرة أول ما يظهر شعار Dell، وبعدها اختَر Diagnostics. الفحص يشتغل قبل دخول ويندوز. صوّر كود الخطأ ورقم التحقق إذا ظهروا.' },
  { q: 'شنو معنى الخطأ 2000-0511؟', a: 'ديل توضح إن المروحة ما استجابت بشكل صحيح لفحص التشخيص. افحص فتحات التهوية من الخارج وأعد الاختبار. إذا رجع الكود، يحتاج الجهاز فحص للمروحة والتوصيلات ونظام التبريد حسب موديله.' },
  { q: 'شنو معنى الخطأ 2000-0512؟', a: 'هذا يعني إن المروحة اشتغلت بسرعة أعلى من المتوقع أثناء الفحص. السبب ممكن يكون بالمروحة أو حساس الحرارة أو اللوحة الأم؛ الكود بروحه ما يحدد القطعة اللي لازم تتبدل.' },
  { q: 'هل صوت المروحة العالي وقت اللعب طبيعي؟', a: 'غالباً نعم، لأن الألعاب تضغط على المعالج وكرت الشاشة مع بعض. لكن إذا الصوت فيه طحن أو طقطقة، أو الجهاز يطفي، أو المروحة تظل عالية بعد ما يخلص الحمل، لازم نفحص السبب.' },
  { q: 'هل أغيّر المعجون الحراري أول ما ترتفع الحرارة؟', a: 'مو بالضرورة. لازم نفحص المروحة ومجرى الهواء والـ heatsink وتلامس التبريد أولاً. تغيير المعجون بدون تشخيص ممكن ما يحل المشكلة.' },
  { q: 'هل تحديث BIOS يحل حرارة Dell؟', a: 'راجع إصدار BIOS وملاحظات التحديث للموديل ورقم Service Tag نفسه. بعض التحديثات تعالج سلوك الطاقة أو المراوح، لكنها ما تنظف الغبار ولا تصلّح مروحة خربانة.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: 'Imran Natiq',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Founder & Lead Technician',
      worksFor: { '@id': `${business.websiteUrl}/#business` },
    },
    {
      '@type': 'TechArticle',
      '@id': `${PAGE_URL}#article`,
      headline: 'لابتوب Dell يسخن؟ دليل فحص المروحة والتشخيص',
      description: 'شرح فحص Dell من F12 وأكواد المروحة وإعدادات التبريد وBIOS حسب الموديل.',
      url: PAGE_URL,
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': `${business.websiteUrl}/#business` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      dateModified: DATE_MODIFIED,
      inLanguage: 'ar',
      articleSection: 'أدلة تشخيص لابتوبات Dell',
      keywords: ['لابتوب Dell يسخن', 'مروحة Dell صوتها عالي', '2000-0511', '2000-0512', 'MyDell', 'Dell Power Manager'],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${business.websiteUrl}/ar` },
        { '@type': 'ListItem', position: 2, name: 'الأدلة', item: `${business.websiteUrl}/guides` },
        { '@type': 'ListItem', position: 3, name: 'حرارة لابتوب Dell', item: PAGE_URL },
      ],
    },
  ],
};

const thermalModes = [
  ['Optimized', 'يوازن بين الأداء وصوت المروحة ودرجة الحرارة.'],
  ['Cool', 'يرفع سرعة المروحة لتبريد سطح الجهاز، وممكن يزيد الصوت أو يقلل الأداء.'],
  ['Quiet', 'يخفّض سرعة المعالج والمروحة لتقليل الصوت، لكن ممكن يخلي سطح الجهاز أدفى.'],
  ['Ultra Performance', 'يرفع أداء المعالج وسرعة المروحة، وممكن يزيد الصوت وحرارة السطح.'],
];

const symptoms = [
  { value: 'fan', label: 'المروحة صوتها عالي وأنا أستخدم برامج خفيفة', result: 'افتح Task Manager وشوف إذا في برنامج رافع استخدام المعالج. بعدها راجع وضع التبريد في MyDell أو Dell Optimizer إذا كان جهازك يدعمه، وشغّل فحص F12.' },
  { value: 'game', label: 'المروحة تعلي وقت اللعب أو الشغل الثقيل', result: 'ارتفاع صوت المروحة وقت الضغط ممكن يكون طبيعي. راجع وضع التبريد، وخلي فتحات الهواء مكشوفة. القلق يكون إذا الجهاز يطفي أو الأداء ينهار أو الصوت يستمر بعد انتهاء الحمل.' },
  { value: 'shutdown', label: 'الجهاز يطفي أو يعيد التشغيل مع الحرارة', result: 'وقف اختبارات الضغط المتكررة، وخزّن شغلك. شغّل فحص F12 وسجّل أي كود. تكرار الإطفاء يحتاج فحص نظام التبريد والطاقة.' },
  { value: 'code', label: 'ظهر كود مروحة في فحص F12', result: 'سجّل الكود كامل. 2000-0511 يعني إن المروحة ما استجابت للفحص، و2000-0512 يعني إنها اشتغلت أسرع من المتوقع. إذا رجع الكود بعد إعادة الاختبار، يحتاج فحص فني للموديل نفسه.' },
];

export default function DellLaptopOverheatingPageAR() {
  const [selectedSymptom, setSelectedSymptom] = useState('fan');
  const selected = symptoms.find((item) => item.value === selectedSymptom) ?? symptoms[0];

  return (
    <>
      <Head htmlAttributes={{ lang: 'ar', dir: 'rtl' }}>
        <title>لابتوب Dell يسخن؟ فحص F12 وأكواد المروحة والحلول | KCROC</title>
        <meta name="description" content="دليل عربي لحرارة لابتوبات Dell: فحص F12، معنى أكواد 2000-0511 و2000-0512، إعدادات MyDell وPower Manager وAlienware وتحديث BIOS." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="ar-KW" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-KW" href={EN_PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="og:title" content="لابتوب Dell يسخن؟ فحص F12 وأكواد المروحة والحلول" />
        <meta property="og:description" content="دليل عربي لحرارة لابتوبات Dell: فحص F12، أكواد المروحة، إعدادات التبريد وتحديث BIOS حسب الموديل." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Dusty laptop cooling fan and heatsink airflow path" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Head>
      <SchemaMarkup schema={SCHEMA} />
      <div dir="rtl" className="min-h-screen bg-transparent text-slate-200 pt-28 pb-24">
        <article className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav aria-label="مسار الصفحة" className="text-sm text-slate-400 mb-7">
            <Link to="/ar" className="hover:text-cyan-300">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/guides" className="hover:text-cyan-300">الأدلة التقنية</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">حرارة لابتوب Dell</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs sm:text-sm text-cyan-300 mb-3">دليل خاص بأجهزة Dell · آخر تحديث {LAST_UPDATED}</p>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-5">لابتوب Dell يسخن أو يطفي؟ دليل التشخيص والمروحة حسب الموديل</h1>
            <p className="text-lg sm:text-xl leading-8 text-slate-300 mb-5">
              إذا لابتوب Dell صار حار بشكل ملحوظ، أو المروحة صوتها عالي، أو الجهاز يبطّئ ويطفي مع الضغط، هالدليل يشرح فحوصات Dell الرسمية وإعدادات التبريد وأكواد المروحة بدون ما نفترض إن كل موديل نفس الشي.
            </p>
            <p className="text-xs text-slate-500">
              كتابة: <a href={`${business.websiteUrl}/author/imran`} className="text-cyan-300 hover:underline">Imran Natiq</a>، Founder &amp; Lead Technician · <time dateTime={DATE_MODIFIED}>آخر تحديث {LAST_UPDATED}</time>
            </p>
          </header>

          <section className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 mb-9">
            <h2 className="text-xl font-bold text-amber-200 mb-3">متى تكون حرارة Dell طبيعية ومتى نقلق؟</h2>
            <p className="leading-8 text-slate-300 mb-0">
              إذا المروحة تعلي وقت اللعب أو الرندر أو تحديثات النظام، هذا غالباً تصرّف طبيعي للتحكم بالحرارة. لكن الطحن أو الطقطقة، أو فشل فحص المروحة، أو الإطفاء المفاجئ، أو استمرار صوت عالي مع استخدام خفيف، كلها علامات تحتاج فحص. ما في رقم حرارة واحد ينطبق على كل أجهزة Dell؛ لقراءة حرارة المعالج وكرت الشاشة بشكل صحيح، راجع <Link to="/guides/why-is-my-laptop-so-hot" className="text-cyan-300 hover:underline">الدليل العام لحرارة اللابتوبات</Link>.
            </p>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">1. فحص Dell من قائمة F12 قبل دخول ويندوز</h2>
            <p className="leading-8 text-slate-300 mb-5">الفحص المدمج يختبر أجزاء من الجهاز قبل تشغيل ويندوز، ويساعدك تعرف إذا في مشكلة عتادية ظاهرة.</p>
            <ol className="list-decimal pr-6 space-y-3 leading-8 text-slate-300">
              <li>طفّ اللابتوب بشكل طبيعي.</li>
              <li>شغّله واضغط F12 أكثر من مرة عند ظهور شعار Dell.</li>
              <li>اختَر Diagnostics من قائمة One Time Boot Menu.</li>
              <li>خلّ الفحص يكتمل، واستخدم Advanced Test إذا كان الاختبار المطلوب متوفراً في جهازك.</li>
              <li>صوّر كود الخطأ ورقم التحقق قبل الخروج.</li>
            </ol>
            <p className="text-sm leading-7 text-slate-400 mt-4">تطبيق SupportAssist داخل ويندوز ممكن يوفر فحوصات وتحديثات إضافية على الأجهزة المدعومة، لكن شاشة F12 هي المسار المباشر لفحص ما قبل الإقلاع.</p>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">2. شنو معنى أكواد مروحة Dell؟</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="font-mono text-lg font-bold text-red-300">2000-0501</p>
                <h3 className="font-bold text-white my-2">فشل فحص المروحة</h3>
                <p className="text-sm leading-7 text-slate-400 mb-0">واحدة أو أكثر من مراوح التبريد ما اجتازت الاختبار الوظيفي. افحص فتحات الهواء من الخارج وأعد الفحص.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="font-mono text-lg font-bold text-red-300">2000-0511</p>
                <h3 className="font-bold text-white my-2">المروحة ما استجابت للفحص</h3>
                <p className="text-sm leading-7 text-slate-400 mb-0">المروحة ما ردّت على أمر أداة التشخيص. إذا رجع الكود بعد إعادة الاختبار، يحتاج فحص المروحة والتوصيلات ونظام التبريد.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="font-mono text-lg font-bold text-amber-300">2000-0512</p>
                <h3 className="font-bold text-white my-2">سرعة المروحة أعلى من المتوقع</h3>
                <p className="text-sm leading-7 text-slate-400 mb-0">ديل تذكر إن السبب ممكن يكون بالمروحة أو حساس الحرارة أو اللوحة الأم؛ لا تبدّل قطعة اعتماداً على الكود بروحه.</p>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">3. إعدادات التبريد في Dell Power Manager وMyDell</h2>
            <p className="leading-8 text-slate-300 mb-5">إعدادات التبريد تغيّر التوازن بين الأداء وصوت المروحة وحرارة سطح الجهاز. توفر الخيارات يعتمد على موديلك والبرنامج المثبّت.</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[600px] text-right text-sm">
                <thead className="bg-slate-900 text-white"><tr><th className="p-4">الوضع</th><th className="p-4">شنو يسوي عادةً</th></tr></thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
                  {thermalModes.map(([mode, description]) => <tr key={mode}><td className="p-4 font-semibold text-cyan-300" dir="ltr">{mode}</td><td className="p-4">{description}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">Inspiron وVostro وXPS</h3><p className="text-sm leading-7 text-slate-400 mb-0">ديل توضح إن MyDell يضم وظائف كانت موجودة في Power Manager على الأجهزة المدعومة.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">Latitude وPrecision</h3><p className="text-sm leading-7 text-slate-400 mb-0">راجع Dell Optimizer إذا كان مدعوم على موديلك، وكذلك إعداد Thermal Management داخل BIOS إذا كان موجود.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">G Series وAlienware</h3><p className="text-sm leading-7 text-slate-400 mb-0">راجع ملفات الأداء والتبريد داخل Alienware Command Center؛ أوضاع Performance وFull Speed ممكن ترفع صوت المراوح بشكل واضح.</p></div>
            </div>
            <p className="text-xs leading-6 text-slate-500 mt-4">مو كل موديلات Dell فيها نفس الخيارات أو نفس أسماء الأوضاع. لا تثبّت أداة مخصصة لموديل ثاني.</p>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">4. متى أراجع تحديث BIOS؟</h2>
            <p className="leading-8 text-slate-300">تأكد من إصدار BIOS وملاحظات الإصدار للموديل ورقم Service Tag نفسه من موقع Dell. بعض التحديثات قد تغيّر سلوك الطاقة أو المروحة على موديلات محددة. وصّل الشاحن بمصدر كهرباء ثابت، ولا تفصل الجهاز أثناء التحديث. وتذكّر: تحديث BIOS ما يشيل الغبار ولا يصلّح مروحة فيها تلف ميكانيكي.</p>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">5. ملاحظات حسب عائلة Dell</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">XPS</h3><p className="text-sm leading-7 text-slate-400 mb-0">التصميم النحيف يحد من مساحة التبريد. مع الحمل المستمر ممكن المروحة تعلي والأداء ينخفض للمحافظة على حدود الحرارة. راقب الإطفاء أو التقطيع مع الشغل الخفيف أو فشل فحص المروحة.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">G Series وAlienware</h3><p className="text-sm leading-7 text-slate-400 mb-0">الألعاب تضغط المعالج وكرت الشاشة مع بعض. راجع وضع التبريد وافحص فتحات دخول وخروج الهواء، وقارن الأداء في نفس اللعبة والإعدادات.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">Inspiron وVostro</h3><p className="text-sm leading-7 text-slate-400 mb-0">في الأجهزة المستخدمة لفترة طويلة، افحص الغبار المتراكم بالمشتت وحالة المروحة قبل ما تفترض إن المعجون الحراري هو السبب.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h3 className="font-bold text-white mb-2">Latitude وPrecision</h3><p className="text-sm leading-7 text-slate-400 mb-0">اجتماعات الفيديو، الشاشات الخارجية، الأجهزة الافتراضية وبرامج التصميم ممكن ترفع الحمل لفترات طويلة. راجع الاستخدام الفعلي ووضع الطاقة قبل الحكم على صوت المروحة.</p></div>
            </div>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">6. فاحص سريع للأعراض</h2>
            <label htmlFor="dell-ar-symptom" className="block text-sm font-semibold text-slate-200 mb-2">شنو العرض اللي تشوفه؟</label>
            <select id="dell-ar-symptom" value={selectedSymptom} onChange={(event) => setSelectedSymptom(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 text-white p-4">
              {symptoms.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 mt-4" aria-live="polite">
              <p className="text-sm leading-8 text-slate-300 mb-0">{selected.result}</p>
            </div>
          </section>

          <section className="border-t border-slate-800 pt-9 mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">أسئلة تتكرر عن حرارة لابتوبات Dell</h2>
            <div className="space-y-4">
              {faq.map(({ q, a }) => (
                <details key={q} data-kcroc-faq-item="true" className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <summary className="font-bold text-white cursor-pointer">{q}</summary>
                  <p className="text-sm leading-8 text-slate-400 mt-3 mb-0">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-800 pt-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">مصادر Dell الرسمية</h2>
            <ul className="space-y-3 text-sm leading-7">
              <li><a className="text-cyan-300 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.dell.com/support/kbdoc/en-us/000181163/how-to-enter-the-built-in-diagnostics-32-bit-diagnostics-supportassist-epsa-epsa-and-psa">ديل: تشغيل فحوصات ما قبل الإقلاع</a></li>
              <li><a className="text-cyan-300 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.dell.com/support/kbdoc/en-us/000181167/reference-table-of-epsa-psa-error-codes-and-troubleshooting-steps-2000-0nnn-series">ديل: مرجع أكواد ePSA من سلسلة 2000</a></li>
              <li><a className="text-cyan-300 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/software-and-downloads/dell-power-manager">ديل: Power Manager وMyDell وDell Optimizer</a></li>
              <li><a className="text-cyan-300 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.dell.com/support/kbdoc/en-us/000189990/alienware-m15-ryzen-edition-r5-thermal-measurement-guidance">ديل: أوضاع التبريد في Alienware Command Center</a></li>
              <li><a className="text-cyan-300 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/fix-common-issues/bios-uefi">ديل: إرشادات تحديث BIOS</a></li>
            </ul>
          </section>

          <p className="border-t border-slate-800 mt-10 pt-7 text-sm leading-7 text-slate-400">
            هذا الدليل خاص بأجهزة Dell، مو بديل عن الدليل الشامل لكل الشركات. تقدر ترجع إلى <Link to="/guides/why-is-my-laptop-so-hot" className="text-cyan-300 hover:underline">الدليل العام لحرارة اللابتوبات</Link> إذا تبي شرح درجات الحرارة والحساسات بشكل أوسع.
          </p>
        </article>
      </div>
    </>
  );
}
