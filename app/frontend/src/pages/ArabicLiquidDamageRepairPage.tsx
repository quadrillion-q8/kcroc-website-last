// File: app/frontend/src/pages/ArabicLiquidDamageRepairPage.tsx
// Kuwaiti-Arabic emergency-first service page for laptop and MacBook liquid damage.
// This page is distinct from the English spill troubleshooting guide and from keyboard-only repair intent.

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  Droplets,
  FlaskConical,
  MapPin,
  MessageCircle,
  Microscope,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { buildWhatsAppLink } from '../utils/whatsappIntent';

const business = KCROC_GRAPH.business!;
const SERVICE = KCROC_GRAPH.services.find((item) => item.id === 'srv-liquid-damage');
const BASE_URL = business.websiteUrl.replace(/\/$/, '');
const PAGE_URL = `${BASE_URL}/ar/laptop-liquid-damage-repair-kuwait`;

const whatsappUrl = buildWhatsAppLink(
  'هلا KCROC، انكب سائل على اللابتوب. نوع السائل: (ماي/قهوة/كرك/عصير). موديل الجهاز: ____. منطقتي: ____. الجهاز مطفي ومفصول عن الشاحن. أبي أرتب فحص واستلام.'
);

const EMERGENCY_STEPS = [
  {
    title: 'طفّ الجهاز فوراً إذا كان آمن للمس',
    body: 'إذا اللابتوب شغال وما فيه حرارة غير طبيعية أو انتفاخ أو دخان، اضغط مطوّل على زر التشغيل لين يطفي. لا تنتظر إغلاق البرامج بالطريقة العادية، ولا تضغط على الأزرار للتجربة.',
  },
  {
    title: 'افصل الشاحن والملحقات إذا المكان جاف وآمن',
    body: 'افصل الشاحن وأي USB أو شاشة خارجية إذا تقدر توصل لها بدون لمس سائل أو فيش مبلل. إذا الكهرباء أو المكان حول الجهاز مبلل، لا تلمس القابس أو الجهاز؛ ابتعد وخَلّ السلامة أولاً.',
  },
  {
    title: 'امسح السائل الظاهر بدون ضغط',
    body: 'استخدم فوطة جافة وما تترك وبر، وامسح السائل من الخارج بهدوء. لا تضغط على الكيبورد ولا تهز الجهاز. إذا كان بارد وآمن للمسك، ميله برفق فوق فوطة حتى ما يتجمع السائل بمكان واحد.',
  },
  {
    title: 'لا تفك البطارية الداخلية بنفسك',
    body: 'إذا البطارية خارجية وقابلة للفك حسب تعليمات الشركة وتقدر تشيلها بأمان، افصلها. أما البطارية الداخلية فلا تفتح الغطاء عشان توصل لها؛ فصلها يحتاج فني وإجراء يناسب موديل الجهاز.',
  },
  {
    title: 'خلّه مطفي ونسّق فحصه',
    body: 'لا توصّل الشاحن ولا تشغّله حتى لو نشف من برّه أو اشتغل أول مرة بعد الانسكاب. سجّل نوع السائل ووقت الانسكاب والمنطقة اللي وصل لها، وشارك هالمعلومات مع الفني.',
  },
];

const DONT_STEPS = [
  'لا تشغّله «بس أجرب إذا يشتغل»؛ التشغيل أو توصيل الشاحن ممكن يمرر تيار في منطقة ملوثة.',
  'لا تحطه بالرز؛ الرز ما ينظف الأملاح أو السكر من تحت الشرائح، وغباره ممكن يدخل بالمراوح والمنافذ.',
  'لا تستخدم السشوار أو المدفأة أو حرارة مباشرة؛ الحرارة ما تزيل الرواسب وقد تدفع السائل للداخل أو تضر أجزاء بلاستيكية.',
  'لا تصب كحول أو منظف أو ماي على الكيبورد، ولا تحاول تغسله بنفسك.',
  'لا تفتح اللابتوب أو تفصل البطارية الداخلية أو الحواجز المعدنية إذا ما عندك خبرة وأدوات مناسبة.',
];

const LIQUID_ROWS = [
  {
    liquid: 'ماي الشرب أو الماي العادي',
    residue: 'قد يترك معادن وأملاح ذائبة حسب مصدر الماي.',
    risk: 'ممكن يربط بين نقاط كهربائية متقاربة إذا وصل لمنطقة فيها طاقة، وتبقى بقاياه حول الموصلات أو تحت الكيبورد.',
    action: 'خلّ الجهاز مطفي ومفصول، ولا تعتبر جفاف السطح دليل إن الداخل نظيف.',
  },
  {
    liquid: 'قهوة أو شاي بدون سكر',
    residue: 'مركبات المشروب وأي إضافات ممكن تخلّي ترسبات على الكيبورد والموصلات.',
    risk: 'قد تتأثر طبقات الكيبورد أو نقاط التوصيل أو أجزاء من اللوحة حسب مسار السائل.',
    action: 'لا تجرب التشغيل. خبر الفني إذا كان المشروب سادة أو فيه إضافات.',
  },
  {
    liquid: 'كرك أو قهوة أو شاي بسكر وحليب',
    residue: 'السكر والحليب والمنكهات ممكن تخلّي طبقة لزجة وبقايا صعبة الإزالة بعد الجفاف.',
    risk: 'الرواسب ممكن تبقى تحت الأزرار وحول الموصلات، حتى لو سطح الكيبورد صار ناشف.',
    action: 'خلّ الجهاز مفصول واطلب فحصاً؛ لا تحاول تنظيفه بصب أي مادة من فوق.',
  },
  {
    liquid: 'عصير أو مشروب غازي أو طاقة',
    residue: 'قد يحتوي على سكر وأحماض وأملاح وألوان ومواد مذابة مختلفة.',
    risk: 'تعدد المكونات يخلّي أثر التلوث أوسع، وقد يسبب تآكل أو مشاكل توصيل إذا وصل للوحة.',
    action: 'لا تنتظر ظهور العطل ولا تحاول تشطف الجهاز بنفسك. يحتاج فحص لمسار السائل.',
  },
  {
    liquid: 'حليب أو لاتيه',
    residue: 'البروتينات والدهون، وأحياناً السكر والقهوة، ممكن تخلّي طبقة مستمرة.',
    risk: 'قد تتأثر طبقات الكيبورد والموصلات وسطح المذربورد على حسب مكان دخول السائل.',
    action: 'اذكر نوع المشروب ومكوناته قدر الإمكان، وخَلّ الجهاز مطفي لين يتم فحصه.',
  },
];

const SYMPTOMS = [
  {
    symptom: 'اللابتوب طفى لحظة الانسكاب وما عاد يشتغل',
    cause: 'ممكن صار قصر كهربائي (Short Circuit) في مسار طاقة أو موصل أو مكوّن على اللوحة.',
    route: 'عزل الطاقة أولاً، ثم قياس الخطوط وفحص المنطقة المتأثرة قبل تحديد المكوّن.',
  },
  {
    symptom: 'الجهاز يشتغل لكن الشاشة سودا أو الصورة اختفت',
    cause: 'السائل ممكن وصل لموصل الشاشة أو مسار الإضاءة الخلفية أو دائرة طاقة الشاشة.',
    route: 'فحص موصل الشاشة والفيوزات ومسار الإضاءة قبل الحكم إن الشاشة نفسها خربانة.',
  },
  {
    symptom: 'الأزرار تلصق أو تكرر الحروف أو الكيبورد ما يكتب',
    cause: 'ممكن تضررت طبقات الكيبورد الداخلية أو شريط التوصيل أو دائرة إدخال الأوامر.',
    route: 'فحص الكيبورد والموصل والمنطقة تحته؛ التنظيف ما يكفي إذا تلف الغشاء الداخلي.',
  },
  {
    symptom: 'اللابتوب يشتغل على البطارية وما يشحن بعد الانسكاب',
    cause: 'قد يتأثر منفذ USB-C أو DC Jack أو مسار الشحن، ويختلف التشخيص حسب الموديل.',
    route: 'فحص الشاحن والمنفذ ودائرة الشحن؛ راجع دليل مشكلة اللابتوب متصل بالشاحن ولا يشحن.',
  },
  {
    symptom: 'اشتغل عقب الانسكاب وبعد يومين أو أكثر طفى',
    cause: 'ممكن بقيت رطوبة أو ترسبات تحت الكيبورد أو الحواجز أو حول نقاط الطاقة وظهرت المشكلة لاحقاً.',
    route: 'لا تعيد تشغيله. يلزم فحص مناطق دخول السائل والتآكل؛ ما في مدة ثابتة ينتهي بعدها الخطر.',
  },
];

const LAB_STEPS = [
  {
    title: 'استلام وتحديد موديل الجهاز',
    body: 'نسجل نوع السائل وكميته التقريبية ومكان دخوله ووقت الحادثة، وهل كان الجهاز على الشاحن أو شغال. نحدد رقم الموديل وتصميم اللوحة قبل اختيار طريقة الفك والفحص.',
  },
  {
    title: 'عزل الطاقة وحماية وحدة التخزين',
    body: 'نفصل الشاحن ونعزل البطارية الداخلية بإجراء يناسب الموديل. وإذا كان SSD قابلاً للفك، نعزله عند الحاجة أثناء العمل على اللوحة. بعض الأجهزة تخزينها ملحوم؛ لذلك ما نوعد باسترجاع أو حفظ البيانات قبل تقييم الجهاز.',
  },
  {
    title: 'فحص مجهري ورسم خريطة التلوث',
    body: 'نفحص وجهي اللوحة والموصلات والمناطق اللي ممكن وصلها السائل تحت المجهر، ونحدد الترسبات أو التآكل أو آثار القصر. الجفاف الظاهري ما يكفي للحكم على سلامة الداخل.',
  },
  {
    title: 'تنظيف مناسب لنوع اللوحة',
    body: 'نختار مواد تنظيف إلكترونية وطريقة معالجة مناسبة للمكوّنات. التنظيف بالموجات فوق الصوتية (Ultrasonic) يُستخدم فقط عند ملاءمة الحالة وبعد تجهيز اللوحة العارية وفك الأجزاء الحساسة؛ مو كل لوحة أو جهاز يدخل الجهاز كامل في حوض التنظيف.',
  },
  {
    title: 'قياسات كهربائية وفحص حراري عند الحاجة',
    body: 'نقيس الممانعة والاستمرارية على خطوط التغذية المناسبة للموديل قبل إعادة الطاقة. وقد نستخدم كاميرا حرارية FLIR وفحصاً حرارياً موجهاً عند الحاجة لتحديد مكوّن يسحب تياراً بصورة غير طبيعية، مع مراعاة حدود الاختبار الآمن وتصميم اللوحة.',
  },
  {
    title: 'إصلاح المكوّنات واختبار الوظائف',
    body: 'إذا كان العطل قابلاً للإصلاح، نعالج الموصل أو المكوّن المتضرر بالمايكرو سولدرينج، ونرمم المسارات النحاسية (Trace Repair) عند الإمكان. بعدها نختبر الوظائف اللي تأثرت مثل التشغيل والشحن والشاشة والكيبورد والـ Trackpad قبل التسليم.',
  },
];

const FAQ = [
  {
    q: 'شنو أسوي فوراً إذا انكب ماي أو قهوة على اللابتوب؟',
    a: 'إذا الجهاز آمن للمس وما فيه حرارة أو انتفاخ أو دخان، طفّه بالضغط المطوّل على زر التشغيل، وافصل الشاحن والملحقات إذا المكان جاف وآمن. امسح السائل الظاهر بهدوء وخله مطفي. لا تشغّله للتجربة ولا تفك البطارية الداخلية بنفسك. تواصل مع KCROC واذكر نوع السائل وموديل الجهاز ومنطقتك لترتيب الفحص والاستلام.',
  },
  {
    q: 'ينفع أحط اللابتوب بالرز بعد الانسكاب؟',
    a: 'لا، الرز ما يسحب الترسبات أو الأملاح اللي وصلت تحت الكيبورد أو حول شرائح المذربورد، وما يوقف التآكل. وغبار النشا ممكن يدخل بالمراوح ومنافذ USB-C. لا تستخدم الرز أو السشوار؛ الأهم تخلي الجهاز مفصول ومطفي لين ينفحص.',
  },
  {
    q: 'اللابتوب اشتغل عقب الانسكاب وبعد يومين طفى؛ ممكن يكون من الماي؟',
    a: 'إي، هذا ممكن. أحياناً ما يصير قصر مباشر، لكن تبقى رطوبة أو بقايا مشروب حول الموصلات أو تحت الحواجز. ومع وجود طاقة ممكن تتكوّن مسارات تسريب أو تآكل وتظهر المشكلة بعد فترة. ما في عدّاد ثابت 48 أو 72 ساعة؛ لا تعيد تشغيله وخلّ الفني يفحصه.',
  },
  {
    q: 'تقدرون تصلحون المذربورد بعد الماي ولا لازم تبديل كامل؟',
    a: 'مو كل حالة تحتاج تبديل البورد. إذا الضرر محدود بمكوّن أو موصل أو مسار نحاسي قابل للترميم، ممكن نصلح اللوحة الأصلية على مستوى المكوّن. إذا التآكل واسع أو وصل لطبقات داخلية أو مكوّنات رئيسية، ممكن يكون الإصلاح غير عملي. نحدد هالشي بعد الفحص ونعطيك التكلفة قبل أي شغل مدفوع.',
  },
  {
    q: 'انكب كرك أو قهوة بسكر على الكيبورد والأزرار صارت تلصق؛ شنو الحل؟',
    a: 'السكر والحليب ومكونات القهوة ممكن تترك طبقة لزجة داخل الكيبورد وتوصل للموصل أو المذربورد اللي تحته. نفحص الكيبورد والمنطقة المحيطة أولاً؛ إذا الغشاء الداخلي تلف، التنظيف بروحه ما يرجّعه ونوضح لك خيار التبديل المتوافق مع موديلك.',
  },
  {
    q: 'إذا المذربورد تضررت، ملفاتي وصوري تروح؟',
    a: 'مو بالضرورة، لكن ما نقدر نضمن الوصول للبيانات قبل الفحص. يعتمد الموضوع على نوع التخزين وهل هو SSD قابل للفك أو ملحوم، وهل تضرر التخزين أو المعالج أو دوائر الحماية والتشفير. نعزل وحدة التخزين القابلة للفك عند الحاجة أثناء العمل، وما نقدم وعد باسترجاع بيانات من قرص متضرر.',
  },
  {
    q: 'اللابتوب يشتغل بس الشاشة سودا عقب الانسكاب؛ هل الشاشة احترقت؟',
    a: 'مو شرط. ممكن يكون السائل أثّر على موصل الشاشة أو فيوز أو دائرة الإضاءة الخلفية على المذربورد، بينما تكون الشاشة نفسها سليمة. نفحص مسار الصورة والإضاءة والموصل قبل اقتراح تبديل الشاشة.',
  },
  {
    q: 'كم ياخذ فحص وتصليح أضرار السوائل؟',
    a: 'الفحص المبدئي يبدأ بعد وصول الجهاز للمختبر. بعض الحالات تحتاج تنظيف وفحص وقياسات، والحالات اللي فيها إصلاح مكونات أو طلب قطع ممكن تطول. المدة المعتادة لبعض الإصلاحات تكون تقريباً 24 إلى 72 ساعة، لكن ما نثبت وقت نهائي إلا بعد معرفة حجم التلوث وتوفر القطع.',
  },
];

const RELATED_LINKS = [
  {
    href: '/ar/motherboard-repair-kuwait',
    title: 'تصليح المذربورد واللوحة الأم',
    description: 'لما يوصل السائل لدوائر الطاقة أو المكونات على اللوحة.',
  },
  {
    href: '/ar/laptop-keyboard-replacement-kuwait',
    title: 'تصليح وتبديل كيبورد اللابتوب',
    description: 'للأزرار اللي تلصق أو ما تستجيب بعد القهوة والسكر.',
  },
  {
    href: '/ar/laptop-plugged-in-not-charging',
    title: 'اللابتوب متصل بالشاحن ولا يشحن',
    description: 'إذا ظهرت مشكلة شحن بعد الانسكاب.',
  },
  {
    href: '/ar/macbook-repair-kuwait',
    title: 'تصليح MacBook في الكويت',
    description: 'لفحص دوائر الطاقة وUSB-C واللوحة حسب جيل الجهاز.',
  },
  {
    href: '/ar/battery-replacement-kuwait',
    title: 'فحص وتبديل بطارية اللابتوب',
    description: 'إذا تأثرت البطارية أو ظهرت عليها علامات انتفاخ أو خلل.',
  },
];

const schema = {
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'تصليح اللابتوب وMacBook بعد انسكاب الماء والسوائل في الكويت',
      alternateName: 'Laptop and MacBook Liquid Damage Repair Kuwait',
      description: 'فحص أضرار الماء والقهوة والكرك والعصائر على اللابتوبات وMacBook، مع عزل الطاقة وتقييم التآكل وتنظيف اللوحة وإصلاح المكونات عند الإمكان في مختبر KCROC بحولي.',
      url: PAGE_URL,
      provider: { '@id': `${BASE_URL}/#business` },
      areaServed: { '@type': 'Country', name: 'الكويت' },
      serviceType: [
        'Laptop liquid damage inspection',
        'Laptop motherboard corrosion assessment',
        'Keyboard contamination inspection',
        'Ultrasonic board cleaning where suitable',
        'MacBook liquid damage diagnosis',
        'Component-level motherboard repair',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'فحص مبدئي لأضرار السوائل',
          price: '0.00',
          priceCurrency: 'KWD',
          description: 'فحص مبدئي مجاني قبل اعتماد أي إصلاح مدفوع.',
        },
        {
          '@type': 'Offer',
          name: 'معالجة سطحية محدودة للتلوث',
          price: '20.00',
          priceCurrency: 'KWD',
          description: 'سعر بداية للحالات المحدودة التي يثبت بالفحص أن معالجتها سطحية ومناسبة.',
        },
        {
          '@type': 'Offer',
          name: 'أجرة تبديل كيبورد اللابتوب',
          price: '10.00',
          priceCurrency: 'KWD',
          description: 'أجرة بداية التركيب فقط؛ سعر الكيبورد نفسه منفصل ويتحدد حسب الموديل والتوفر.',
        },
        {
          '@type': 'Offer',
          name: 'تنظيف وإصلاح المذربورد بعد السوائل',
          price: '35.00',
          priceCurrency: 'KWD',
          description: 'سعر بداية لأعمال تنظيف اللوحة وإصلاح المكوّنات عند ملاءمة الحالة؛ التكلفة النهائية بعد الفحص.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      inLanguage: 'ar-KW',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

function PhotoFigure({
  src,
  mobileSrc,
  alt,
  caption,
  eager = false,
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
  caption: string;
  eager?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <picture>
          {mobileSrc && <source media="(max-width: 640px)" srcSet={mobileSrc} />}
          <img
            src={src}
            alt={alt}
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 42vw"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>
      <figcaption className="px-4 py-3 text-sm leading-7 text-slate-400">{caption}</figcaption>
    </figure>
  );
}

export default function ArabicLiquidDamageRepairPage() {
  return (
    <>
      <SEOEngine entityId="page-ar-liquid-damage-repair" />
      <SchemaMarkup schema={schema} />
      <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent pb-20 text-slate-100">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
          <nav aria-label="مسار التنقل" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/ar" className="transition hover:text-cyan-300">الرئيسية</Link>
            <span aria-hidden="true">/</span>
            <Link to="/ar/services" className="transition hover:text-cyan-300">الخدمات</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-300">تصليح أضرار السوائل</span>
          </nav>

          <header className="overflow-hidden rounded-3xl border border-rose-500/25 bg-gradient-to-br from-rose-500/10 via-slate-950/95 to-slate-950 p-6 shadow-2xl sm:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-rose-200">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" /> طوارئ انسكاب ماي أو قهوة
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-300">Laptop & MacBook Liquid Damage</span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-300">مختبر KCROC في حولي</span>
            </div>

            <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:items-center">
              <div>
                <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
                  انكب ماي أو قهوة على اللابتوب؟ تصليح أضرار السوائل في الكويت
                </h1>
                <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                  أهم شي الحين: طفّ الجهاز إذا كان آمن للمس، وافصل الشاحن إذا المكان جاف وآمن، ولا تشغّله مرة ثانية للتجربة. حتى لو نشف من برّه، ممكن تبقى بقايا السائل تحت الكيبورد أو حول الموصلات وعلى المذربورد. في مختبر KCROC بحولي نفحص مسار السائل والتآكل، ونحدد إذا الحالة تحتاج تنظيفاً مناسباً أو إصلاح مكوّنات على اللوحة الأصلية قبل ما نقترح تبديل أي قطعة.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="راسل KCROC على واتساب عن انسكاب الماء أو القهوة على اللابتوب"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" /> طوارئ السوائل: راسلنا على واتساب
                  </a>
                  <Link
                    to="/ar/book"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    رتّب استلام مجاني <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" /> ضمان 30 يوم على الإصلاح المكتمل</span>
                  <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-cyan-300" aria-hidden="true" /> استلام وتوصيل مجاني بالكويت</span>
                </div>
              </div>
              <PhotoFigure
                src="/images/laptop-motherboard-diagnostic-bench-repair.webp"
                mobileSrc="/images/laptop-motherboard-diagnostic-bench-repair.w480.webp"
                alt="لابتوب مفتوح على طاولة فحص KCROC وتظهر داخله اللوحة الأم والبطارية والمكونات"
                caption="صورة فعلية من طاولة فحص اللابتوبات في KCROC. توضح الوصول إلى المكونات الداخلية، وليست صورة لحالة انسكاب بعينها."
                eager
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-cyan-500/25 bg-cyan-500/5 p-4">
                <div className="text-2xl font-black text-white">0 د.ك</div>
                <h2 className="mt-1 font-bold text-cyan-200">فحص مبدئي مجاني</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">نقيّم مسار السائل والأجزاء المتأثرة ونوضح لك الخيارات قبل أي شغل مدفوع.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                <div className="text-2xl font-black text-white">من 20 د.ك</div>
                <h2 className="mt-1 font-bold text-white">معالجة سطحية محدودة</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">للحالات اللي يثبت بالفحص إن أثرها محدود وقابل للمعالجة السطحية.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                <div className="text-2xl font-black text-white">من 35 د.ك</div>
                <h2 className="mt-1 font-bold text-white">تنظيف وإصلاح المذربورد</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">إزالة التلوث وإصلاح المكونات أو المسارات بالمايكرو سولدرينج إذا كانت اللوحة قابلة للإصلاح.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                <div className="text-2xl font-black text-white">مجاني + 30 يوم</div>
                <h2 className="mt-1 font-bold text-white">استلام وضمان</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">استلام وتوصيل مجاني، وضمان على الإصلاحات المكتملة حسب نطاق العمل.</p>
              </article>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-400">
              الأسعار أسعار بداية وليست تكلفة ثابتة لكل جهاز. أجرة تبديل الكيبورد تبدأ من 10 د.ك بالإضافة إلى سعر القطعة، ويختلف السعر حسب الموديل والتوفر. نأكد التكلفة ونطاق العمل قبل بدء أي إصلاح مدفوع.
            </p>
          </header>

          <section className="mt-10 rounded-3xl border border-rose-500/25 bg-rose-950/20 p-6 sm:p-8" aria-labelledby="spill-first-five-heading">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-rose-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-black tracking-wide text-rose-200">First 5 Minutes — Emergency Triage</p>
                <h2 id="spill-first-five-heading" className="mt-1 text-2xl font-black text-white sm:text-3xl">انكب سائل على اللابتوب للتو؟ شنو تسوي بأول 5 دقايق؟</h2>
                <p className="mt-3 leading-8 text-slate-300">تصرفك الأول مهم، بس سلامتك أهم من الجهاز. لا تلمس شاحن أو فيش مبلل، ولا تحاول تفتح الجهاز أو تفصل بطاريته الداخلية بنفسك.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="flex items-center gap-2 font-black text-emerald-200"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /> سو هالخطوات إذا الوضع آمن</h3>
                <ol className="mt-4 space-y-4">
                  {EMERGENCY_STEPS.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-sm font-black text-emerald-200">{index + 1}</span>
                      <div>
                        <h4 className="font-bold text-white">{step.title}</h4>
                        <p className="mt-1 text-sm leading-7 text-slate-300">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
                <h3 className="flex items-center gap-2 font-black text-rose-200"><AlertTriangle className="h-5 w-5" aria-hidden="true" /> لا تسوي هالأشياء</h3>
                <ul className="mt-4 space-y-3">
                  {DONT_STEPS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-300">
                      <span className="mt-0.5 font-black text-rose-300">✕</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                  <p className="text-sm font-black text-amber-200">تنبيه مهم للبطارية</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">إذا الجهاز منتفخ أو حار بشكل غير طبيعي أو يطلع منه دخان أو صوت أو شرر أو ريحة كيميائية قوية، لا تمسكه ولا تنقله ولا تفتحه. ابتعد عنه، وافصل كهرباء المكان من نقطة آمنة فقط إذا تقدر بدون لمس الجهاز أو أي شي مبلل.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10" aria-labelledby="spill-liquids-heading">
            <div className="mb-5 max-w-4xl">
              <p className="text-sm font-black tracking-wide text-cyan-400">Spill Chemistry & Residue</p>
              <h2 id="spill-liquids-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">مو كل سائل يترك نفس الأثر: شنو الفرق بين الماي والكرك والعصير؟</h2>
              <p className="mt-3 leading-8 text-slate-300">نوع المشروب ومكوناته ومكان دخوله يفرقون في طبيعة الرواسب. حتى لو اختفى البلل من السطح، ممكن تبقى مواد ذائبة حول الموصلات أو تحت الكيبورد والحواجز.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[820px] border-collapse text-right text-sm">
                <thead className="bg-slate-800/80 text-cyan-100">
                  <tr>
                    <th scope="col" className="p-4 font-black">نوع السائل</th>
                    <th scope="col" className="p-4 font-black">شنو ممكن يترك؟</th>
                    <th scope="col" className="p-4 font-black">المشكلة المحتملة</th>
                    <th scope="col" className="p-4 font-black">شنو تسوي؟</th>
                  </tr>
                </thead>
                <tbody>
                  {LIQUID_ROWS.map((row) => (
                    <tr key={row.liquid} className="border-t border-slate-800 align-top odd:bg-slate-950/50 even:bg-slate-900/35">
                      <th scope="row" className="p-4 font-bold leading-7 text-white">{row.liquid}</th>
                      <td className="p-4 leading-7 text-slate-300">{row.residue}</td>
                      <td className="p-4 leading-7 text-slate-300">{row.risk}</td>
                      <td className="p-4 leading-7 text-slate-300">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-delayed-failure-heading">
            <p className="text-sm font-black tracking-wide text-cyan-400">Why It Can Fail Later</p>
            <h2 id="spill-delayed-failure-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">ليش اللابتوب ممكن يشتغل عقب الانسكاب وبعدين يخرب بعد يومين؟</h2>
            <p className="mt-3 max-w-4xl leading-8 text-slate-300">
              بعض الأجهزة تظل شغالة لأن السائل ما سوّى قصر مباشر وقت الانسكاب. لكن ممكن تبقى رطوبة أو أملاح أو بقايا سكر تحت الكيبورد أو حول الموصلات والحواجز المعدنية. إذا ظلت الطاقة موجودة على بعض الدوائر، قد يصير تسريب تيار وتفاعلات كهروكيميائية (Electrochemical Corrosion) وتبدأ نقاط التوصيل أو المسارات تتأثر تدريجياً. عشان جذي، الجهاز اللي اشتغل مرة بعد البلل مو شرط يكون سليم.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="font-black text-white">خطوط الطاقة الدائمة (Always-On Rails)</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  بعض اللوحات تبقي أجزاء من دائرة الطاقة متصلة بالبطارية حتى والجهاز مطفي. في بعض أجيال MacBook قد تشوف تسمية PPBUS_G3H، وفي بعض لوحات Windows قد توجد خطوط مثل 3.3V_ALW أو 5V_ALW. هذي أمثلة فقط؛ أسماء الخطوط وتصميمها يختلفان حسب موديل الجهاز ورقم اللوحة.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <h3 className="font-black text-white">المكوّنات الدقيقة وتحت الحواجز</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  السائل والرواسب ممكن توصل لمناطق ما تبين من الخارج، مثل موصلات الفلاتة أو تحت بعض الحواجز ومناطق شرائح BGA. وفي بعض أجهزة MacBook تختلف متحكمات USB-C والطاقة حسب الجيل ورقم اللوحة؛ لذلك ما نفترض وجود CD3215 أو CD3217 في كل جهاز.
                </p>
              </article>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">ما في وقت ثابت يبدأ بعده العطل؛ ممكن يظهر فوراً أو لاحقاً حسب نوع السائل ومكانه وحالة الجهاز والطاقة اللي كانت متصلة وقت الانسكاب.</p>
          </section>

          <section className="mt-10" aria-labelledby="spill-symptoms-heading">
            <div className="mb-5 max-w-4xl">
              <p className="text-sm font-black tracking-wide text-cyan-400">Post-Spill Symptom Matrix</p>
              <h2 id="spill-symptoms-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">شنو العطل المتوقع حسب حالة اللابتوب بعد الانسكاب؟</h2>
              <p className="mt-3 leading-8 text-slate-300">الأعراض تساعدنا نحدد شنو نفحص أولاً، لكنها ما تثبت وحدها إن قطعة معينة تالفة.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[760px] border-collapse text-right text-sm">
                <thead className="bg-slate-800/80 text-cyan-100">
                  <tr>
                    <th scope="col" className="p-4 font-black">العرض</th>
                    <th scope="col" className="p-4 font-black">الاحتمال الفني</th>
                    <th scope="col" className="p-4 font-black">مسار الفحص في KCROC</th>
                  </tr>
                </thead>
                <tbody>
                  {SYMPTOMS.map((row) => (
                    <tr key={row.symptom} className="border-t border-slate-800 align-top odd:bg-slate-950/50 even:bg-slate-900/35">
                      <th scope="row" className="p-4 font-bold leading-7 text-white">{row.symptom}</th>
                      <td className="p-4 leading-7 text-slate-300">{row.cause}</td>
                      <td className="p-4 leading-7 text-slate-300">{row.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-lab-heading">
            <p className="text-sm font-black tracking-wide text-cyan-400">Hawalli Lab — Six-Stage Process</p>
            <h2 id="spill-lab-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">شلون نفحص ونعالج أضرار السوائل داخل مختبر KCROC بحولي؟</h2>
            <p className="mt-3 max-w-4xl leading-8 text-slate-300">
              شعارنا: «نصلح اللوحة، وما نبدّلها على طول». التجفيف الخارجي بروحه ما يزيل الرواسب من تحت الموصلات أو الشرائح. نحدد مسار العمل بعد معرفة الموديل وفحص اللوحة، لأن مو كل حالة تحتاج نفس طريقة التنظيف أو الإصلاح.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {LAB_STEPS.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-200">{index + 1}</div>
                  <h3 className="mt-4 text-lg font-black text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{step.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <PhotoFigure
                src="/images/laptop-battery-motherboard-open-repair.webp"
                alt="لابتوب Acer مفتوح في مختبر صيانة وتظهر البطارية واللوحة الأم أثناء الوصول للمكونات الداخلية"
                caption="صورة فعلية لجهاز مفتوح أثناء الوصول إلى البطارية واللوحة الأم. طريقة العزل والفك تختلف حسب موديل الجهاز."
              />
              <PhotoFigure
                src="/images/laptop-open-repair-bench.webp"
                mobileSrc="/images/laptop-open-repair-bench.w480.webp"
                alt="لابتوب Lenovo مفتوح على طاولة عمل فني لفحص مكوناته الداخلية"
                caption="صورة حقيقية من طاولة العمل توضح فحص لابتوب مفتوح؛ لا تمثل نتيجة إصلاح أو حالة انسكاب محددة."
              />
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">التنظيف بالموجات فوق الصوتية لا يُستخدم لكل لوحة؛ لازم تُجهّز اللوحة وتُزال الأجزاء غير المناسبة قبل اختيار هالطريقة.</p>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-pricing-heading">
            <p className="text-sm font-black tracking-wide text-cyan-400">Transparent Starting Prices</p>
            <h2 id="spill-pricing-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">كم يكلف تصليح اللابتوب بعد انسكاب الماي أو القهوة بالكويت؟</h2>
            <p className="mt-3 max-w-4xl leading-8 text-slate-300">السعر يعتمد على نوع السائل ووين وصل، وهل الضرر بالكيبورد أو الموصلات أو المذربورد. نفحص الجهاز أولاً، ونشرح لك القطع والشغل المطلوب والسعر النهائي قبل موافقتك.</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[760px] border-collapse text-right text-sm">
                <thead className="bg-slate-800/80 text-cyan-100">
                  <tr>
                    <th scope="col" className="p-4 font-black">مسار المعالجة</th>
                    <th scope="col" className="p-4 font-black">شنو يشمل؟</th>
                    <th scope="col" className="p-4 font-black">سعر البداية</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-800 odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold text-white">الفحص المبدئي وعزل الطاقة</th>
                    <td className="p-4 leading-7 text-slate-300">تقييم أولي لانتشار السائل والكيبورد والموصلات واللوحة، وتحديد الخطوة المناسبة.</td>
                    <td className="p-4 whitespace-nowrap font-black text-cyan-200">مجاناً (0 د.ك)</td>
                  </tr>
                  <tr className="border-t border-slate-800 odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold text-white">معالجة سطحية محدودة</th>
                    <td className="p-4 leading-7 text-slate-300">للحالات اللي يثبت بالفحص إن التلوث فيها محدود ويمكن معالجته بدون إصلاح عميق للوحة.</td>
                    <td className="p-4 whitespace-nowrap font-black text-cyan-200">من 20 د.ك</td>
                  </tr>
                  <tr className="border-t border-slate-800 odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold text-white">تبديل كيبورد متضرر من السوائل</th>
                    <td className="p-4 leading-7 text-slate-300">أجرة التركيب تبدأ من 10 د.ك؛ سعر الكيبورد منفصل حسب الموديل والتخطيط والتوفر.</td>
                    <td className="p-4 whitespace-nowrap font-black text-cyan-200">من 10 د.ك + القطعة</td>
                  </tr>
                  <tr className="border-t border-slate-800 odd:bg-slate-950/50 even:bg-slate-900/35">
                    <th scope="row" className="p-4 font-bold text-white">تنظيف وإصلاح المذربورد</th>
                    <td className="p-4 leading-7 text-slate-300">تنظيف اللوحة بالطريقة المناسبة، فحص الشورت والتآكل وإصلاح المكونات أو المسارات عند الإمكان.</td>
                    <td className="p-4 whitespace-nowrap font-black text-cyan-200">من 35 د.ك</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-500">هذي أسعار بداية لمسارات محددة، مو عرض نهائي لكل جهاز. إصلاح MacBook وأجهزة اللابتوب يختلف حسب رقم الموديل واللوحة والضرر والقطع المطلوبة. ما نبدأ شغل مدفوع قبل ما توافق على السعر.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/ar/laptop-keyboard-replacement-kuwait" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-700 px-5 py-2 font-bold text-cyan-200 hover:border-cyan-500/40">تفاصيل أجرة الكيبورد والقطعة <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/ar/motherboard-repair-kuwait" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-700 px-5 py-2 font-bold text-cyan-200 hover:border-cyan-500/40">تفاصيل إصلاح المذربورد <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-pickup-heading">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-sm font-black tracking-wide text-cyan-400">Free Kuwait-Wide Pickup & Delivery</p>
                <h2 id="spill-pickup-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">نستلم جهازك من منطقتك ونفحصه بمختبرنا في حولي</h2>
                <p className="mt-3 leading-8 text-slate-300">ما تحتاج تحرّك الجهاز وهو شغال أو تروح لمحل بعيد. راسلنا بموديل اللابتوب ونوع السائل ومنطقتك، وننسق استلام وتوصيل مجاني من البيت أو المكتب حسب موعد المنطقة. الفحص والتصليح يصيرون في مختبر KCROC، مو زيارة صيانة داخل البيت.</p>
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <h3 className="flex items-center gap-2 font-black text-white"><MapPin className="h-5 w-5 text-cyan-300" aria-hidden="true" /> مختبر KCROC الفعلي</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">شارع ابن خلدون، مجمع الملا، السرداب، محل 19 — حولي، الكويت.</p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">موقع الفحص والإصلاح الرئيسي. مناطق الاستلام والتوصيل مو فروعاً منفصلة.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <div className="flex items-center gap-3">
                  <Truck className="h-8 w-8 text-cyan-300" aria-hidden="true" />
                  <div>
                    <p className="font-black text-white">استلام وتوصيل مجاني بالكويت</p>
                    <p className="text-sm text-slate-400">من البيت أو المكتب إلى مختبر حولي</p>
                  </div>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-black text-slate-950 hover:bg-cyan-300">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> نسّق استلام جهازك
                </a>
                <Link to="/ar/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-5 py-3 font-bold text-white hover:border-cyan-500/40">
                  صفحة الحجز <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-related-heading">
            <p className="text-sm font-black tracking-wide text-cyan-400">Related Repair Paths</p>
            <h2 id="spill-related-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">إذا الفحص بيّن إن العطل وصل لقطعة معينة، هذي الصفحات تكمل الصورة</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {RELATED_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <span className="flex items-center justify-between gap-3 font-black text-white group-hover:text-cyan-200">
                    {item.title} <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-7 text-slate-400">{item.description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="spill-faq-heading">
            <p className="text-sm font-black tracking-wide text-cyan-400">Kuwaiti Arabic FAQs</p>
            <h2 id="spill-faq-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">الأسئلة الشائعة عن انسكاب الماي والقهوة على اللابتوب</h2>
            <div className="mt-5 space-y-3">
              {FAQ.map((item, index) => (
                <details key={item.q} className="group rounded-2xl border border-slate-800 bg-slate-950/50 p-5" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-7 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                    <span>{item.q}</span>
                    <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-300 transition-transform group-open:-rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-8 text-slate-300">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8" aria-labelledby="spill-references-heading">
            <h2 id="spill-references-heading" className="text-lg font-black text-white">مراجع السلامة والفحص</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">لخطوات السلامة العامة بعد انسكاب السوائل، راجع تعليمات الشركة المصنّعة وإرشادات الإصلاح المتخصصة، واتبع دائماً تعليمات الموديل نفسه.</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href="https://www.dell.com/support/kbdoc/en-pa/000137973/safety-precautions-when-working-with-electrical-equipment" target="_blank" rel="noreferrer" className="font-bold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">إرشادات السلامة من Dell</a>
              <a href="https://www.ifixit.com/Wiki/Laptop_is_Liquid_Damaged" target="_blank" rel="noreferrer" className="font-bold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">مرجع iFixit لأضرار السوائل</a>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 sm:p-8" aria-labelledby="spill-next-step-heading">
            <h2 id="spill-next-step-heading" className="text-2xl font-black text-white sm:text-3xl">خلّ الجهاز مطفي، وخَلّ التشخيص يحدد الحل</h2>
            <p className="mt-3 max-w-3xl leading-8 text-slate-300">أرسل لنا موديل اللابتوب ونوع السائل ومكان الانسكاب والمنطقة. نرتب الاستلام المجاني ونوضح لك نتيجة الفحص والتكلفة قبل أي إصلاح مدفوع.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 hover:bg-cyan-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> تواصل مع KCROC على واتساب
              </a>
              <Link to="/ar/motherboard-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">
                تصليح المذربورد <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/ar/macbook-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">
                تصليح MacBook <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" /> ضمان 30 يوم على الإصلاح المكتمل</span>
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-cyan-300" aria-hidden="true" /> استلام وتوصيل مجاني بالكويت</span>
              <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-cyan-300" aria-hidden="true" /> الفحص والإصلاح في مختبر حولي</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
