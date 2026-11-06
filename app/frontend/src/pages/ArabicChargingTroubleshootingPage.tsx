// File: app/frontend/src/pages/ArabicChargingTroubleshootingPage.tsx
// Arabic diagnostic hub for the distinct "plugged in, not charging" search intent.
// Keep this page diagnostic-first; the charging-port service page owns physical port-repair intent.

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  PlugZap,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const business = KCROC_GRAPH.business!;

const FAQ = [
  {
    q: 'ليش اللابتوب يقول «متصل بالشاحن ولا يشحن» (Plugged in, not charging)؟',
    a: 'الرسالة لها أكثر من سبب، وما تثبت وحدها أن البطارية تالفة. ممكن يكون حد حماية الشحن مفعّل عند 60% أو 80%، أو الشاحن غير متوافق أو لا يعرّف قدرته بشكل صحيح، أو منفذ DC Jack أو USB-C فيه ارتخاء، أو خلايا البطارية ضعفت، أو دائرة الشحن واتصال البطارية على المذربورد فيهما خلل. في KCROC نفحص الشاحن والمنفذ والبطارية ومسار الطاقة قبل اقتراح تبديل أي قطعة.',
  },
  {
    q: 'إذا ظهرت رسالة AC Adapter Wattage and Type Cannot Be Determined في Dell أو HP، هل المنفذ خربان؟',
    a: 'ليس بالضرورة. بعض موديلات Dell وHP تقرأ قدرة الشاحن من سنّ تعريف في القابس أو من مسار التعريف PS_ID. قد يكون الخلل في الشاحن نفسه، أو السنّ، أو مدخل DC، أو مسار التعريف على اللوحة الأم. وقد يحد الجهاز من الأداء أو يوقف الشحن عندما لا يتعرّف على المحول. لا تحاول تعديل السنّ بدبوس؛ نختبر بشاحن متوافق ونفحص المسار حسب تصميم الموديل.',
  },
  {
    q: 'اللابتوب يشحن فقط إذا حرّكت السلك أو ضغطت عليه بزاوية، شنو أسوي؟',
    a: 'أوقف تحريك السلك أو الضغط عليه فوراً. هذا العرض قد ينتج عن تآكل الموصل الداخلي أو ارتخاء قواعد المنفذ أو تشقق نقاط اللحام. الاستمرار في ليّ القابس قد يزيد الضرر أو يسبب حرارة وشرراً أو يقتلع نقاط التوصيل من اللوحة. افصل الشاحن إذا كان ذلك آمناً، وصوّر المنفذ من الخارج لإرسال الصورة مع رقم الموديل.',
  },
  {
    q: 'هل كل شاحن USB-C يقدر يشحن أي لابتوب؟',
    a: 'لا. يجب أن يدعم منفذ الجهاز نفسه إدخال الطاقة عبر USB-C، وأن يدعم الشاحن والكابل بروتوكول USB Power Delivery والقدرة المطلوبة بالواط. شاحن هاتف بقدرة 20W أو 30W غالباً لا يكفي لجهاز يتطلب 65W أو 100W أو أكثر، وبعض منافذ USB-C مخصصة للبيانات فقط. استخدم مواصفات الشاحن والكابل الموصى بها لموديلك، ولا تعتمد على شكل القابس وحده.',
  },
  {
    q: 'هل مشكلة الشحن في MacBook ممكن تكون من شريحة USB-C وليس البطارية؟',
    a: 'نعم، بحسب الجيل ورقم اللوحة. قد تشمل نقاط الفحص متحكمات تفاوض USB-C Power Delivery مثل CD3215 أو CD3217 أو SN2600، إضافة إلى دائرة تنظيم الشحن مثل ISL9239 أو ISL9240 في بعض التصاميم. وجود اسم شريحة في هذا الدليل لا يعني أنها موجودة في كل MacBook؛ نحدد القطعة ومسار الطاقة من رقم الموديل واللوحة والقياسات.',
  },
  {
    q: 'هل أبدّل البطارية أولاً حتى أجرب إذا تنحل المشكلة؟',
    a: 'لا ننصح بشراء بطارية على سبيل التجربة. قد تكون البطارية سليمة بينما الخلل في الشاحن أو مدخل الطاقة أو آيسي الشحن أو اتصال SMBus بين البطارية واللوحة. إذا لم يصل تيار الشحن أو لم يستطع الجهاز قراءة بيانات البطارية، فلن تحل بطارية جديدة السبب. التشخيص قبل الشراء يساعدك تتجنب دفع تكلفة قطعة لا تحتاجها.',
  },
  {
    q: 'شنو أقدر أفحص بنفسي بدون مخاطرة قبل إرسال الجهاز؟',
    a: 'جرّب مقبس حائط آخر، وتأكد من إحكام توصيل الشاحن من الطرفين، واستخدم الشاحن والكابل المتوافقين مع موديلك. راجع إعدادات حد الشحن في Lenovo Vantage أو MyASUS أو برامج الشركة، وأنشئ تقرير البطارية المدمج في Windows بالأمر powercfg /batteryreport. افحص المنفذ بالنظر فقط. لا تدخل دبوساً أو عوداً أو أداة معدنية، ولا تفتح الجهاز أو تحدّث BIOS أثناء عدم استقرار الطاقة. أوقف الاستخدام إذا ظهرت انتفاخات أو حرارة غير طبيعية أو رائحة احتراق.',
  },
  {
    q: 'كم يكلف فحص أو إصلاح مشكلة الشحن في الكويت؟',
    a: 'الفحص والتشخيص المبدئي في KCROC مجاني قبل الموافقة على الإصلاح. يبدأ إصلاح مدخل الشحن من 20 د.ك، وتبدأ أجرة تبديل بطارية اللابتوب من 8 د.ك بالإضافة إلى سعر البطارية، وكذلك أجرة تركيب بطارية MacBook من 8 د.ك بالإضافة إلى سعر البطارية، بينما يبدأ إصلاح دائرة الشحن على المذربورد من 35 د.ك. هذه أسعار بداية لمسارات محددة؛ يتغير السعر حسب الموديل والقطعة ونتيجة القياس، ونؤكد التكلفة النهائية قبل أي عمل مدفوع.',
  },
];

const symptomRows = [
  {
    symptom: 'النسبة ثابتة عند 60% أو 80% رغم ظهور الشاحن',
    causes: 'قد يكون حد حماية البطارية مفعّلاً في Lenovo Vantage أو MyASUS أو BIOS أو ميزة الشحن المحسّن في macOS.',
    risk: 'منخفضة غالباً',
    action: 'راجع إعدادات حماية البطارية أولاً قبل طلب تبديلها.',
  },
  {
    symptom: 'النسبة ثابتة عند 0%، والجهاز ينطفئ عند فصل الشاحن',
    causes: 'احتمال تدهور خلايا البطارية أو قفل BMS، أو خلل في BATFET أو آيسي الشحن أو خط اتصال SMBus.',
    risk: 'متوسطة إلى عالية',
    action: 'لا تشترِ بطارية بالتجربة؛ يلزم اختبار البطارية ومسار الطاقة والاتصال على اللوحة.',
  },
  {
    symptom: 'AC Adapter Wattage and Type Cannot Be Determined',
    causes: 'قد يكون الشاحن أو سنّ التعريف PS_ID أو مدخل DC أو مسار التعريف على اللوحة.',
    risk: 'متوسطة',
    action: 'اختبر بشاحن أصلي أو متوافق معروف السلامة. لا تحاول تقويم السنّ بأداة.',
  },
  {
    symptom: 'الشحن يبدأ ويتوقف عند لمس الكابل أو تحريكه',
    causes: 'ارتخاء أو تآكل داخل المنفذ، أو تشقق نقاط اللحام أو تلف قواعد التثبيت.',
    risk: 'عالية',
    action: 'توقف عن تحريك القابس؛ الفحص يحدد هل يلزم إصلاح المنفذ أو استبداله.',
  },
  {
    symptom: 'USB-C متصل لكن اللابتوب لا يشحن أو يشحن ببطء',
    causes: 'شاحن أو كابل بقدرة غير كافية، منفذ لا يدعم إدخال الطاقة، أو خلل في تفاوض USB-PD أو متحكمه.',
    risk: 'متوسطة إلى عالية',
    action: 'استخدم شاحناً وكابلاً متوافقين ومنفذاً يدعم الشحن حسب دليل الجهاز؛ لا تفترض أن كل منفذ USB-C للشحن.',
  },
  {
    symptom: 'يشحن في الاستخدام الخفيف ويتوقف أو تنخفض النسبة أثناء الألعاب',
    causes: 'قدرة محول أقل من احتياج الجهاز تحت الحمل، أو هبوط في خرج الشاحن، أو حرارة في دائرة الطاقة.',
    risk: 'متوسطة',
    action: 'طابق قدرة المحول بالواط مع مواصفات الجهاز، واطلب فحصاً إذا استمر الخلل مع الشاحن الصحيح.',
  },
  {
    symptom: 'لمبة الشاحن تنطفئ فور توصيله باللابتوب',
    causes: 'قد تدخل حماية القصر في الشاحن بسبب تماس في مدخل الطاقة أو على أحد خطوط اللوحة.',
    risk: 'حرجة',
    action: 'افصل الشاحن ولا تعاود توصيله للتجربة؛ يلزم فحص متخصص قبل إعادة تشغيل الجهاز.',
  },
];

const safeChecks = [
  {
    title: '١. استبعد حد الشحن البرمجي',
    body: 'إذا توقف الشحن عند 60% أو 80% والجهاز يعمل طبيعياً، فقد تكون هذه ميزة إطالة عمر البطارية وليست عطلاً مادياً.',
    bullets: [
      'Lenovo: افتح Lenovo Vantage وراجع Conservation Mode أو إعدادات حدود الشحن.',
      'ASUS: افتح MyASUS وراجع Battery Health Charging؛ قد يحدد الوضع المتوازن أو وضع العمر الأقصى سقفاً للشحن.',
      'Dell وHP: راجع Dell Power Manager أو HP Support Assistant أو إعدادات Battery Care في BIOS.',
      'MacBook: راجع System Settings ثم Battery؛ قد يؤخر Optimized Battery Charging اكتمال الشحن مؤقتاً.',
    ],
  },
  {
    title: '٢. اقرأ تقرير البطارية من Windows',
    body: 'افتح Command Prompt واكتب powercfg /batteryreport ثم اضغط Enter. ينشئ Windows تقريراً محلياً يوضح بيانات البطارية المسجلة.',
    bullets: [
      'قارن Design Capacity بالسعة Full Charge Capacity؛ انخفاض السعة الفعلية بشكل كبير قد يشير إلى تدهور البطارية.',
      'راجع Battery Capacity History وRecent Usage بحثاً عن تغيرات واضحة أو انقطاعات.',
      'التقرير مؤشر تشخيصي وليس حكماً نهائياً؛ قد تكون المشكلة في مسار الشحن حتى لو ظهرت بيانات البطارية.',
    ],
  },
  {
    title: '٣. تحقق من الشاحن والكابل والمقبس',
    body: 'جرّب مقبس حائط مباشر، وتأكد أن خرج الشاحن وقدرته بالواط متوافقان مع ملصق الجهاز أو مواصفات الشركة.',
    bullets: [
      'لا تعتمد على تطابق رأس USB-C؛ تحقق أن الموديل يدعم الشحن من هذا المنفذ.',
      'قد لا يكفي شاحن الهاتف أو كابل غير مصنف للقدرة المطلوبة لجهاز يحتاج 65W أو 100W أو 140W.',
      'في Dell وHP وبعض الموديلات الأخرى، قد يمنع تعطل تعريف الشاحن التعرف على قدرته حتى لو كان الجهاز يتلقى بعض الطاقة.',
    ],
  },
  {
    title: '٤. افحص المنفذ بالنظر فقط',
    body: 'افصل الشاحن وانظر بضوء الهاتف إلى القابس والمنفذ من الخارج، دون إدخال أي شيء أو محاولة تحريك الأجزاء الداخلية.',
    bullets: [
      'لاحظ إن كان سنّ التعريف الأوسط مائلاً أو مفقوداً في الشواحن التي تستخدمه.',
      'لاحظ إن كان لسان USB-C الداخلي معوجاً أو متآكلاً أو إن كان القابس لا يثبت بشكل طبيعي.',
      'إذا كان المنفذ ساخناً أو متفحماً أو يصدر شرراً، توقف عن استخدامه ولا تعاود توصيل الشاحن.',
    ],
  },
];

const labChecks = [
  {
    title: 'اختبار الشاحن وتفاوض USB-C Power Delivery',
    body: 'نبدأ بقياس خرج الشاحن وفحص الكابل. وفي الأجهزة التي تشحن عبر USB-C نراقب تفاوض الطاقة؛ يبدأ الاتصال عادة بجهد أساسي ثم ينتقل إلى ملف جهد وقدرة يدعمه الشاحن والجهاز. تعطل التفاوض قد يوجّه الفحص إلى المنفذ أو متحكم PD، مثل CD3215 أو CD3217 أو SN2600 أو RTS5455 في بعض التصاميم.',
  },
  {
    title: 'تتبع بوابات الدخول وآيسي الشحن',
    body: 'إذا كان مصدر الطاقة والمنفذ يعملان، نتتبع مسار الطاقة عبر عناصر الحماية مثل ACFET وRBFET ومقاومات قياس التيار إلى آيسي الشحن وخط الطاقة الرئيسي. قد تظهر شرائح مثل ISL9239 أو ISL9240 أو BQ24780S أو BQ25710 بحسب الشركة ورقم اللوحة؛ هذه أمثلة وليست قائمة قطع موحدة لكل الأجهزة.',
  },
  {
    title: 'فحص اتصال البطارية الذكية SMBus وPS_ID',
    body: 'قد تكون البطارية سليمة لكن المتحكم لا يستطيع قراءة بياناتها بسبب خلل في خط SMBus مثل SDA أو SCL أو مقاومة أو دايود حماية، أو بسبب انقطاع مسار تعريف الشاحن PS_ID في بعض الأجهزة. نتحقق من الاتصال والقياسات قبل الحكم على البطارية أو المذربورد.',
  },
  {
    title: 'عزل حالة الخلايا ودائرة الحماية BMS',
    body: 'نقيس جهد البطارية وسلوكها تحت الحمل ونراجع استجابتها للشحن، ونفحص مؤشرات الانتفاخ أو التلف. عند الحاجة نستخدم الملتيميتر وعدادات USB-C والمجهر والكاميرا الحرارية لتحديد موضع الخلل؛ قرار التبديل يعتمد على نتيجة الفحص الفعلية.',
  },
];

const priceRows = [
  { route: 'فحص وتشخيص مبدئي', scope: 'تحديد ما إذا كان السبب من الشاحن أو المنفذ أو البطارية أو دائرة الطاقة.', price: 'مجاناً (0 د.ك)', href: '/ar/contact', label: 'التواصل مع KCROC' },
  { route: 'إصلاح أو تبديل مدخل الشحن', scope: 'عند ثبوت تلف DC Jack أو USB-C أو نقاط تثبيته ولحامه.', price: 'يبدأ من 20 د.ك', href: '/ar/laptop-charging-port-repair-kuwait', label: 'خدمة مدخل الشحن' },
  { route: 'بطارية اللابتوب', scope: 'عند ثبوت تدهور البطارية وسلامة دائرة الشحن؛ أجرة العمل منفصلة عن سعر البطارية حسب الموديل والتوفر.', price: 'أجرة من 8 د.ك + البطارية', href: '/ar/battery-replacement-kuwait', label: 'تبديل بطارية اللابتوب' },
  { route: 'بطارية MacBook', scope: 'لأجهزة MacBook Air وPro بعد التحقق من رقم الموديل وتوفر البطارية المناسبة.', price: 'أجرة من 8 د.ك + البطارية', href: '/ar/macbook-battery-replacement-kuwait', label: 'تبديل بطارية MacBook' },
  { route: 'إصلاح دائرة الشحن بالمذربورد', scope: 'عند تعطل متحكم PD أو آيسي الشحن أو بوابات MOSFET أو مسار اتصال البطارية.', price: 'يبدأ من 35 د.ك', href: '/ar/motherboard-repair-kuwait', label: 'تصليح المذربورد' },
];

const pageUrl = business.websiteUrl + '/ar/laptop-plugged-in-not-charging';
const pageImage = business.websiteUrl + '/images/laptop-dc-power-jack-connector-replacement-kuwait-1000.webp';

const schema = {
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': pageUrl + '#article',
      headline: 'اللابتوب متصل بالشاحن ولا يشحن؟ التشخيص والحل بأمان في الكويت',
      description: 'دليل تشخيص مشكلة اللابتوب المتصل بالشاحن ولا يشحن، يفرّق بين إعدادات النظام والشاحن والمنفذ والبطارية ودائرة الشحن على المذربورد.',
      url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      image: pageImage,
      inLanguage: 'ar-KW',
      datePublished: '2026-10-26',
      dateModified: '2026-11-07',
      author: { '@type': 'Organization', name: business.title, url: business.websiteUrl },
      publisher: { '@id': business.websiteUrl + '/#business' },
      articleSection: 'تشخيص أعطال اللابتوب والشحن',
      keywords: [
        'اللابتوب متصل بالشاحن ولا يشحن',
        'تم التوصيل ولا يتم الشحن ويندوز 10',
        'تم التوصيل ولا يتم الشحن ويندوز 11',
        'اللابتوب ثابت على 0% ولا يشحن',
        'الشاحن موصل بس البطارية ما تزيد',
        'MacBook متصل بالشاحن ولا يشحن',
      ],
      about: [
        { '@type': 'Thing', name: 'Laptop Charging Troubleshooting' },
        { '@type': 'Thing', name: 'USB Power Delivery' },
        { '@type': 'Thing', name: 'Laptop Battery Management System' },
        { '@type': 'Thing', name: 'Motherboard Charging Circuit Repair' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': pageUrl + '#faq',
      inLanguage: 'ar-KW',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function ArabicChargingTroubleshootingPage() {
  const whatsappText =
    'السلام عليكم KCROC، اللابتوب عندي متصل بالشاحن لكنه لا يشحن. الماركة والموديل: ____. نسبة البطارية والرسالة الظاهرة: ____. نوع الشاحن وقدرته: ____. منطقتي بالكويت: ____. أرفق صورة للشاحن والمنفذ. فضلاً أكدوا مسار الفحص والسعر وهل السعر يشمل القطعة قبل أي إصلاح مدفوع.';
  const whatsappUrl = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(whatsappText);
  const pickupText = 'السلام عليكم KCROC، أريد ترتيب استلام مجاني للابتوب للفحص بسبب مشكلة متصل بالشاحن ولا يشحن. الماركة والموديل: ____. الأعراض: ____. المنطقة: ____. الرجاء تأكيد موعد الاستلام قبل الإرسال.';
  const pickupUrl = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(pickupText);

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId="page-ar-laptop-plugged-in-not-charging" />
      <SchemaMarkup schema={schema} />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="مسار التنقل" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/ar" className="hover:text-cyan-300">الرئيسية</Link>
          <span aria-hidden="true">/</span>
          <span>دليل تشخيص مشكلة الشحن</span>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">اللابتوب متصل بالشاحن ولا يشحن</span>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 shadow-2xl sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-cyan-300">
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">دليل تشخيص عملي وخدمة مختبر</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5">Laptop Plugged In, Not Charging</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">
            اللابتوب متصل بالشاحن ولا يشحن؟ شلون نحدد السبب الحقيقي بأمان قبل تبديل أي قطعة
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
            ظهور رسالة «متصل بالشاحن ولا يشحن» (Plugged in, not charging)، أو توقف النسبة عند 0% أو 80%، لا يعني بالضرورة أن البطارية تالفة أو أن المذربورد تحتاج استبدالاً كاملاً. قد يكون السبب إعداد حماية البطارية، أو شاحناً ضعيفاً أو لا يتعرّف عليه الجهاز، أو منفذ DC Jack أو USB-C، أو خلايا البطارية، أو دائرة الشحن على اللوحة الأم. يوضح لك هذا الدليل الفحوصات الآمنة، وكيف نفرّق في مختبر KCROC بحولي بين الأسباب قبل اقتراح قطعة أو إصلاح مدفوع.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-cyan-500/25 bg-cyan-500/5 p-4">
              <div className="text-2xl font-black text-white">0 د.ك</div>
              <h2 className="mt-1 font-bold text-cyan-200">فحص مبدئي مجاني</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">نفحص الشاحن والمنفذ والبطارية ومسار الطاقة، ونوضح النتيجة قبل أي عمل مدفوع.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-2xl font-black text-white">من 20 د.ك</div>
              <h2 className="mt-1 font-bold text-white">مدخل الشحن</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">سعر بداية إصلاح أو تبديل DC Jack أو USB-C حسب الموديل والتصميم.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-2xl font-black text-white">من 8 د.ك</div>
              <h2 className="mt-1 font-bold text-white">أجرة تبديل البطارية</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">أجرة العمل فقط؛ سعر البطارية منفصل ويُحدد حسب الموديل والتوفر.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-2xl font-black text-white">من 35 د.ك</div>
              <h2 className="mt-1 font-bold text-white">دائرة الشحن بالمذربورد</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">إصلاح على مستوى المكوّن عندما تسمح حالة اللوحة بذلك، بدلاً من افتراض تبديلها كاملة.</p>
            </article>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-400">
            الأسعار المذكورة أسعار بداية لمسارات محددة وليست عرضاً نهائياً لكل جهاز. تختلف حسب الموديل والقطعة والتوفر ونتيجة القياس؛ نؤكد التكلفة ونطاق العمل قبل بدء أي إصلاح مدفوع.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="إرسال موديل اللابتوب وأعراض عدم الشحن إلى KCROC عبر واتساب" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> أرسل الموديل وصورة العرض على واتساب
            </a>
            <a href={pickupUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              احجز استلاماً مجانياً من منطقتك <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link to="/laptop-plugged-in-not-charging" aria-label="Open the English laptop plugged-in-but-not-charging guide" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-slate-300 transition hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              English guide <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" /> ضمان 30 يوماً على الإصلاحات المكتملة</span>
            <span className="inline-flex items-center gap-2"><PlugZap className="h-4 w-4 text-cyan-300" aria-hidden="true" /> استلام وتوصيل مجاني في مناطق الكويت</span>
            <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-cyan-300" aria-hidden="true" /> الفحص والإصلاح في مختبر حولي</span>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="charging-symptoms-heading">
          <div className="mb-5 max-w-4xl">
            <p className="text-sm font-black tracking-wide text-cyan-400">مصفوفة الأعراض والتشخيص</p>
            <h2 id="charging-symptoms-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">شنو يعني العرض اللي يظهر على شاشة اللابتوب؟</h2>
            <p className="mt-3 leading-8 text-slate-300">رسالة النظام وحدها لا تحدد القطعة التالفة. طابق العرض مع الاحتمالات التالية لمعرفة الخطوة الآمنة التالية، وليس لاختيار قطعة بالتخمين.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[850px] border-collapse text-right text-sm">
              <thead className="bg-slate-800/80 text-cyan-100">
                <tr>
                  <th scope="col" className="p-4 font-black">العرض على الجهاز</th>
                  <th scope="col" className="p-4 font-black">الأسباب المحتملة</th>
                  <th scope="col" className="p-4 font-black">الخطورة</th>
                  <th scope="col" className="p-4 font-black">الإجراء الآمن</th>
                </tr>
              </thead>
              <tbody>
                {symptomRows.map((row) => (
                  <tr key={row.symptom} className="border-t border-slate-800 align-top odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold leading-7 text-white">{row.symptom}</th>
                    <td className="p-4 leading-7 text-slate-300">{row.causes}</td>
                    <td className="p-4 font-bold text-amber-200">{row.risk}</td>
                    <td className="p-4 leading-7 text-slate-300">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-slate-500">هذه احتمالات إرشادية وليست تشخيصاً عن بُعد. نوع الدائرة والمتحكمات يختلف بحسب الماركة والموديل ورقم اللوحة.</p>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-safe-checks-heading">
          <p className="text-sm font-black tracking-wide text-amber-300">بروتوكول الفحص المنزلي الآمن</p>
          <h2 id="charging-safe-checks-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">أربع طبقات فحص قبل إرسال الجهاز للمختبر</h2>
          <p className="mt-3 max-w-4xl leading-8 text-slate-300">ابدأ من الإعدادات البسيطة وانتقل إلى الفحوصات الظاهرية فقط. لا تحتاج إلى فتح اللابتوب أو لمس نقاط التوصيل لتحديد المعلومات الأولية.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {safeChecks.map((check) => (
              <article key={check.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="text-lg font-black text-white">{check.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{check.body}</p>
                <ul className="mt-3 space-y-2">
                  {check.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-400">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 font-black text-amber-200">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" /> تحذيرات سلامة مهمة
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
              <li>لا تدخل عود أسنان أو دبوساً أو ملقطاً أو أداة معدنية داخل DC Jack أو USB-C. قد تلامس الأداة نقاط الطاقة أو البيانات وتتسبب بقصر كهربائي أو تلف إضافي.</li>
              <li>لا تحدّث BIOS أو Firmware بينما الشحن غير مستقر أو الجهاز ينطفئ فجأة؛ انقطاع الطاقة أثناء التحديث قد يمنع الجهاز من الإقلاع.</li>
              <li>إذا كان الهيكل منتفخاً أو لوحة اللمس مرتفعة أو ظهرت حرارة غير طبيعية أو رائحة احتراق أو شرر، افصل الشاحن إذا كان ذلك آمناً وأوقف الاستخدام. لا تضغط على البطارية ولا تثقبها أو تحاول إخراجها بنفسك.</li>
              <li>إذا انطفأت لمبة الشاحن عند توصيله بالجهاز، لا تكرر التوصيل للتجربة؛ قد تكون حماية القصر قد عملت.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-lab-heading">
          <p className="text-sm font-black tracking-wide text-cyan-400">Component-Level Diagnosis</p>
          <h2 id="charging-lab-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">شلون نعزل سبب عطل الشحن داخل مختبر KCROC في حولي؟</h2>
          <p className="mt-3 max-w-4xl leading-8 text-slate-300">شعارنا: «نصلح اللوحة، ولا نكتفي بتبديلها» (We fix the board. We don’t just swap it). بعد التأكد من الشاحن والموديل، نتتبع مسار الطاقة ونتائج القياس على مستوى المكوّن. لا توجد شريحة واحدة أو مخطط واحد ينطبق على جميع اللابتوبات.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {labChecks.map((check, index) => (
              <article key={check.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-200">{index + 1}</div>
                <h3 className="mt-4 text-lg font-black text-white">{check.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{check.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="font-black text-white">ما الذي نتحقق منه قبل التوصية بتبديل قطعة؟</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">خرج الشاحن واستقراره، تفاوض USB-C عند وجوده، سلامة المنفذ، جهد خطوط الدخول، بوابات MOSFET، مقاومات قياس التيار، اتصال SMBus أو PS_ID عند انطباقه، واستجابة البطارية تحت الحمل. بعد ذلك نحدد هل المسار الصحيح هو الشاحن أو المنفذ أو البطارية أو إصلاح مكوّن على المذربورد.</p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-pricing-heading">
          <p className="text-sm font-black tracking-wide text-cyan-400">شفافية التكلفة ومسار الإصلاح</p>
          <h2 id="charging-pricing-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">كم يكلف فحص وإصلاح مشكلة الشحن في الكويت؟</h2>
          <p className="mt-3 max-w-4xl leading-8 text-slate-300">لأن العرض نفسه قد ينتج عن أجزاء مختلفة، نعرض أسعار البداية لكل مسار. لا نبدأ إصلاحاً مدفوعاً قبل إبلاغك بالقطعة المطلوبة والتكلفة النهائية وموافقتك.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[760px] border-collapse text-right text-sm">
              <thead className="bg-slate-800/80 text-cyan-100">
                <tr>
                  <th scope="col" className="p-4 font-black">مسار الإصلاح</th>
                  <th scope="col" className="p-4 font-black">متى نختاره؟</th>
                  <th scope="col" className="p-4 font-black">سعر البداية</th>
                  <th scope="col" className="p-4 font-black">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.route} className="border-t border-slate-800 align-top odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold text-white">{row.route}</th>
                    <td className="p-4 leading-7 text-slate-300">{row.scope}</td>
                    <td className="p-4 whitespace-nowrap font-black text-cyan-200">{row.price}</td>
                    <td className="p-4"><Link to={row.href} className="inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">{row.label} <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-slate-500">أسعار البداية لا تعني أن كل موديل متاح بالسعر نفسه. نؤكد توافق القطعة وتوفرها والسعر الشامل قبل اعتماد الإصلاح.</p>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-pickup-heading">
          <h2 id="charging-pickup-heading" className="text-2xl font-black text-white sm:text-3xl">قبل الاستلام: أربع معلومات تسرّع التشخيص</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-black text-white">١. الماركة ورقم الموديل</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">مثلاً Dell XPS 15 9520 أو MacBook Pro A2338 أو Lenovo Legion 5. صورة الملصق السفلي تكفي غالباً لبدء تحديد الموديل.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-black text-white">٢. صورة رسالة الشاشة والمنفذ</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">أرسل لقطة لعبارة الخطأ أو صورة خارجية واضحة لقابس الشاحن والمنفذ إذا كان الضرر ظاهراً.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-black text-white">٣. أرسل الشاحن والكابل مع الجهاز</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">وجود الشاحن المستخدم مع اللابتوب يساعد على اختبار التوافق والخرج تحت الحمل بدلاً من افتراض أن الخلل من الجهاز فقط.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-black text-white">٤. لا ترسل كلمة المرور</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">فحوصات الشاحن والبطارية ومسار الطاقة لا تحتاج عادةً إلى فتح ملفاتك الشخصية أو كلمة مرور الحساب. لا تشارك رموز الدخول أو كلمات المرور في رسالة واتساب.</p>
            </article>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <h3 className="font-black text-white">مختبر KCROC الفعلي في حولي</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">شارع ابن خلدون، مجمع الملا، السرداب، محل 19. يمكنك ترتيب استلام وتوصيل مجاني من منزلك أو مكتبك في مناطق الكويت؛ يتم الفحص والإصلاح في المختبر ثم اختبار استقرار الشحن قبل إعادة الجهاز.</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">الاستلام متاح من مناطق مثل السالمية والجابرية ومشرف وصباح السالم والفروانية والجهراء والمنقف والفحيحيل وغيرها، مع تأكيد تفاصيل الاستلام عبر واتساب.</p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-faq-heading">
          <p className="text-sm font-black tracking-wide text-cyan-400">إجابات مباشرة لرسائل وأعراض الشحن</p>
          <h2 id="charging-faq-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">الأسئلة الشائعة عن اللابتوب المتصل بالشاحن ولا يشحن</h2>
          <div className="mt-5 space-y-3">
            {FAQ.map((item, index) => (
              <details key={item.q} className="group rounded-2xl border border-slate-800 bg-slate-950/45 p-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <span>{item.q}</span>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-300 transition-transform group-open:-rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-8 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 sm:p-8" aria-labelledby="charging-next-step">
          <h2 id="charging-next-step" className="text-2xl font-black text-white sm:text-3xl">خلّ القياس يحدد القطعة، مو التخمين</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-300">أرسل الموديل ونسبة البطارية ورسالة الشاشة وصورة الشاحن والمنفذ. نرتب الاستلام المجاني، ونوضح لك نتيجة الفحص وخيارات الإصلاح والسعر قبل بدء أي عمل مدفوع.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> أرسل التفاصيل على واتساب
            </a>
            <Link to="/ar/laptop-charging-port-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">إصلاح مدخل الشحن <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/ar/battery-replacement-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">فحص وتبديل البطارية <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/ar/motherboard-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">إصلاح المذربورد <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
