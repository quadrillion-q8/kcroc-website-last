// File: app/frontend/src/pages/BiosUefiRecoveryGuideAR.tsx
// Arabic counterpart of: /guides/bios-uefi-recovery-kuwait
// Pattern follows GamingLaptopCleaningAR.tsx (Head + SchemaMarkup, RTL, hreflang).

import React, { useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, CheckCircle2, ChevronDown, Clock3, MessageCircle,
  Phone, ShieldCheck, Wrench, XCircle
} from 'lucide-react';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/guides/ar/bios-uefi-recovery-kuwait`;
const EN_PAGE_URL = `${business.websiteUrl}/guides/bios-uefi-recovery-kuwait`;
const OG_IMAGE_URL = `${business.websiteUrl}/images/discover/bios-hero-motherboard-1200x675.webp`;
const HERO_IMAGE = '/images/guides/bios-recovery/bios-hero-motherboard.webp';
const SPI_IMAGE = '/images/guides/bios-recovery/ch341a-spi-programmer.webp';
const AUTHOR_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4';
const PUBLISHED_DATE = '2026-10-05';

const MS_KEY_URL = 'https://support.microsoft.com/en-us/help/4026181';
const MS_SUSPEND_URL = 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/suspend-bitlocker-protection-non-microsoft-updates';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'مرحباً KCROC، جهازي لا يقلع بعد تحديث BIOS وأحتاج فحصاً في الكويت.'
)}`;

// ── CONTENT ──

const quickPaths = [
  { prompt: 'شاشة سوداء والمراوح تدور بدون صورة', target: 'التحقق من العتاد', anchor: '#firmware-vs-hardware' },
  { prompt: 'الجهاز توقف أثناء تحديث BIOS', target: 'ماذا تفعل فوراً', anchor: '#first-aid' },
  { prompt: 'يشتغل وينطفئ بشكل متكرر', target: 'علامات التحذير', anchor: '#warning-signs' },
  { prompt: 'ويندوز يطلب مفتاح BitLocker بعد التحديث', target: 'BitLocker و TPM', anchor: '#bitlocker' },
  { prompt: 'أصوات بيب أو وميض أضواء بدل الإقلاع', target: 'أكواد POST', anchor: '#post-codes' },
  { prompt: 'جرّبت الاسترداد الرسمي ولم ينجح', target: 'برمجة شريحة SPI', anchor: '#spi' },
];

const firstAid = [
  'لا تعيد تشغيل الجهاز وإطفاءه بشكل متكرر.',
  'لا تحاول تحديث BIOS مرة ثانية بملف مختلف أو "مشابه".',
  'سجّل: هل توقف أثناء الكتابة أم عند إعادة التشغيل بعدها؟',
  'ابحث أولاً عن طريقة استرداد مدمجة في موديلك بالضبط.',
];

const warningSigns = [
  { title: 'شاشة سوداء كاملة بعد التشغيل', text: 'المراوح تدور أو الأضواء تعمل، لكن لا توجد صورة، حتى على شاشة خارجية. مهم جداً إذا ظهرت بعد تحديث BIOS مباشرة.' },
  { title: 'توقف الجهاز أثناء تحديث BIOS', text: 'انقطاع الكهرباء أو إعادة تشغيل أثناء كتابة الفيرموير. هذا من أقوى المؤشرات على تلف محتمل في الفيرموير.' },
  { title: 'حلقة تشغيل وإيقاف متكررة', text: 'يشتغل ثم ينطفئ بعد ثوانٍ ويعيد المحاولة وحده. فشل تدريب الرام (memory training) قد يعطي نفس العرض.' },
  { title: 'الاسترداد الرسمي لا يستجيب', text: 'جرّبت الطريقة الصحيحة لموديلك بالضبط ولا يوجد أي نشاط على فلاشة الاسترداد.' },
  { title: 'أصوات بيب أو وميض LED', text: 'الأكواد تختلف حسب الشركة والموديل، وقد تدل على الرام أو المعالج أو الشاشة. لا تفترض أنها دائماً تلف BIOS.' },
  { title: 'فشل POST بدون تغيير في العتاد', text: 'كان الجهاز يعمل ثم توقف فجأة، وربما حصل تحديث فيرموير قبلها بوقت قصير. إعدادات CMOS قد تقلّد المشكلة أيضاً.' },
  { title: 'عدم تزامن الفيرموير مع الـ EC', text: 'سلوك غريب لزر التشغيل أو إضاءة الكيبورد أو المراوح. قد يحتاج الاسترداد أكثر من إعادة كتابة صورة SPI الرئيسية.' },
  { title: 'لا نشاط على منفذ USB عند الإقلاع', text: 'سلوك USB يختلف بين اللوحات، فاعتبره دليلاً مساعداً وليس إثباتاً. أعطال طاقة USB تعطي نفس العرض.' },
  { title: 'المراوح بأقصى سرعة فوراً', text: 'قد يعني أن الجهاز لم يكمل تهيئة الفيرموير، لكن أعطال الحساسات والطاقة واللوحة الأم تعطي العرض نفسه.' },
  { title: 'شاشة إعدادات BIOS تتجمد', text: 'قد يكون السبب تلف إعدادات NVRAM، وقد يكون عدم استقرار في العتاد. استبعد العتاد أولاً.' },
];

const checks = [
  { title: 'إعادة ضبط الطاقة بشكل صحيح', text: 'افصل الشاحن، وافصل البطارية الداخلية فقط إذا سمحت الشركة بذلك. اتبع خطوات الصيانة الخاصة بالموديل ولا تفتح الجهاز عشوائياً.' },
  { title: 'اختبار أقل عتاد ممكن', text: 'أزل ملحقات USB والأجهزة الخارجية. وإن كان الوصول ممكناً، جرّب رام سليمة معروفة بالتهيئة التي تعتمدها الشركة.' },
  { title: 'سجّل أي رموز تشخيص', text: 'دوّن أصوات البيب وأضواء الكيبورد وأضواء الطاقة وسلوك الشاشة قبل أي تغيير.' },
  { title: 'افحص الضرر المادي', text: 'بقايا سوائل أو تآكل أو مكونات محروقة أو منافذ تالفة أو خط طاقة معطّل قد تقلّد عطل الفيرموير.' },
];

const toRecord = [
  { title: 'الموديل الدقيق', text: 'اكتب الموديل الكامل (مثل HP EliteBook 830 G6 وليس HP EliteBook فقط). رقم مراجعة اللوحة الأم أفضل إن كان الجهاز مفتوحاً.' },
  { title: 'تسلسل الفشل', text: 'هل فقد الجهاز الطاقة أثناء شريط تقدم التحديث، أم أكمل التحديث ولم يصل إلى POST بعد إعادة التشغيل؟' },
  { title: 'أضواء وأصوات التشخيص', text: 'عدّ وميض Caps Lock / Num Lock أو أصوات البيب فور التشغيل، قبل أن ترتفع سرعة المراوح.' },
  { title: 'توفر مفتاح BitLocker', text: 'تأكد هل قرص ويندوز مشفّر، وهل مفتاح الاسترداد متاح في حساب مايكروسوفت أو على نسخة احتياطية.' },
];

const brands = [
  { brand: 'Dell', text: 'توفر ديل ميزة استرداد BIOS في كثير من الأجهزة، لكن المصدر والطريقة المدعومة يعتمدان على الموديل والجيل. راجع وثائق ديل الحالية لرقم الخدمة (service tag) الخاص بجهازك قبل استخدام أي ملف.', link: '/ar/laptop-repair-kuwait', label: 'إصلاح اللابتوبات في الكويت' },
  { brand: 'HP', text: 'أجهزة HP المحمولة غالباً فيها استرداد BIOS، لكن تركيبة المفاتيح وطريقة التعامل مع الملفات تختلف بين الموديلات. أجهزة HP Sure Start تستخدم بنية استرداد محمية مختلفة، فلا تفترض أن طريقة USB العامة تنطبق عليها.', link: '/ar/laptop-repair-kuwait', label: 'إصلاح اللابتوبات في الكويت' },
  { brand: 'Lenovo', text: 'يختلف الاسترداد بشكل ملموس بين ThinkPad وIdeaPad وLegion وغيرها. تأكد من الإجراء الدقيق لموديلك من صفحات دعم لينوفو الرسمية.', link: '/ar/laptop-repair-kuwait', label: 'إصلاح اللابتوبات في الكويت' },
  { brand: 'ASUS', text: 'تستخدم لوحات ASUS عادةً إحدى آليتين: CrashFree BIOS 3 (استرداد تلقائي من فلاشة USB)، أو USB BIOS FlashBack في اللوحات الأعلى فئة، وهي تعيد الكتابة باستخدام طاقة الاستعداد فقط دون الحاجة إلى المعالج أو الرام.', link: '/ar/gaming-pc-repair-kuwait', label: 'إصلاح أجهزة الجيمنج في الكويت' },
  { brand: 'Acer', text: 'تختلف إجراءات استرداد الفيرموير في Acer حسب الموديل وجيل المنصة. استخدم تعليمات الشركة الخاصة بموديلك وليس تركيبة مفاتيح عامة.', link: '/ar/laptop-repair-kuwait', label: 'إصلاح اللابتوبات في الكويت' },
  { brand: 'MSI / Gigabyte', text: 'بعض لوحات MSI وGigabyte المكتبية فيها Dual BIOS أو زر Flash BIOS أو Q-Flash Plus، لكن هذا ليس موجوداً في كل لوحة. تأكد من دليل لوحتك قبل الاعتماد عليه.', link: '/ar/gaming-pc-repair-kuwait', label: 'إصلاح أجهزة الجيمنج في الكويت' },
  { brand: 'Apple', text: 'أجهزة ماك (Apple Silicon وإنتل) تعمل ببنية مختلفة تماماً: الاسترداد يعتمد على وضع DFU ومعه جهاز ماك ثانٍ وبرنامج Finder. تتغير الخطوات حسب جيل الشريحة، فراجع صفحة دعم آبل الحالية.', link: '/ar/macbook-repair-kuwait', label: 'إصلاح الماك بوك في الكويت' },
];

const spiSteps = [
  { title: 'تحديد شريحة SPI', text: 'يتم تحديد شريحة تخزين الفيرموير، ومعرفة هل المنصة تستخدم شريحة واحدة أو أكثر قابلة للبرمجة.' },
  { title: 'قراءة النسخة الأصلية وحفظها', text: 'يتم قراءة الفيرموير الموجود ونسخه احتياطياً قبل أي عملية كتابة، مع الحفاظ على البيانات الخاصة باللوحة قدر الإمكان.' },
  { title: 'التأكد من الفيرموير الصحيح', text: 'يجب أن تطابق صورة الاسترداد المنصة ومراجعة اللوحة وبنية الفيرموير بدقة. الموديل المشابه ليس بالضرورة متوافقاً.' },
  { title: 'برمجة شريحة الفلاش', text: 'عند الحاجة تتم برمجة الشريحة بأجهزة مهنية وصورة تم التحقق منها، بدل الاعتماد على الجهاز التالف نفسه.' },
  { title: 'التحقق واختبار POST', text: 'يتم تجميع الجهاز واختبار POST وخروج الصورة وتهيئة الرام والدخول إلى إعدادات الفيرموير والاستقرار العام.' },
];

const bitlockerTips = [
  'احفظ مفتاح الاسترداد وأوقف حماية BitLocker مؤقتاً قبل أي تحديث فيرموير على جهاز مشفّر.',
  'إذا طلب منك ويندوز المفتاح بعد التحديث، فإدخاله أمر متوقع وآمن وليس دليلاً على اختراق.',
  'إذا لم تحفظ المفتاح، فالمشكلة تتعلق بالوصول إلى البيانات وليست إصلاح فيرموير، وإعادة برمجة BIOS لن تسترجع البيانات المشفّرة.',
  'بعد الاسترداد تأكد أن إعدادات Secure Boot وTPM تطابق ما يتطلبه ويندوز وسياسة جهة عملك، ولا تغيّرها دون داعٍ أثناء التشخيص.',
];

const dontList = [
  'تحديث BIOS بملف من موديل مشابه أو مراجعة لوحة مختلفة',
  'إعادة التشغيل بالقوة بشكل متكرر أثناء تنفيذ عملية استرداد',
  'تحميل ملفات BIOS (dump) عشوائية من مواقع غير موثوقة',
  'الكتابة فوق نسخة الفيرموير الأصلية قبل حفظ بيانات اللوحة',
  'افتراض أن الشاشة السوداء تعني دائماً تلف BIOS',
  'توصيل مبرمج SPI قبل التأكد من جهد الشريحة وترتيب الأطراف',
  'فك شريحة EEPROM بأدوات غير مناسبة أو بدون حماية ESD',
  'تعديل مناطق Intel ME أو EC دون فهم متطلبات المنصة بدقة',
];

const faqs = [
  { q: 'هل يمكن إصلاح لابتوب تعطل بسبب تحديث BIOS؟', a: 'في كثير من الأحيان نعم. إذا كانت شريحة الفلاش واللوحة الأم سليمتين، فإن الاسترداد الرسمي أو إعادة برمجة الفيرموير مباشرة قد يعيد الجهاز للعمل. لكن كلمة "تعطل" وصف للعرض وليست تشخيصاً: الرام وخطوط الطاقة وفيرموير الـ EC والمعالج وأعطال اللوحة الأم تعطي الشاشة السوداء أو حلقة إعادة التشغيل نفسها.' },
  { q: 'هل فشل تحديث BIOS يعني دائماً أن الشريحة تالفة؟', a: 'لا. قد تكون الشريحة سليمة تماماً بينما البيانات المخزنة عليها ناقصة أو غير صالحة. وبالعكس، قد يبدو الجهاز متعطلاً بسبب عطل مادي في اللوحة لا علاقة له بالفيرموير.' },
  { q: 'هل يمكن استرداد BIOS باستخدام مبرمج EEPROM أو SPI؟', a: 'في الحالات المناسبة يستطيع الفني برمجة شريحة SPI مباشرة بأجهزة مهنية. لكن يجب أولاً التحقق من الصورة الصحيحة وجهد الشريحة وبنية اللوحة والبيانات الخاصة باللوحة.' },
  { q: 'هل تتأثر بيانات الهارد أو الـ SSD عند استرداد BIOS؟', a: 'برمجة شريحة الفيرموير لا تمسح محتويات القرص بحد ذاتها، فالفيرموير والقرص جهازا تخزين منفصلان. لكن يجب تجنب أي خطوة "استعادة المصنع" أو إعادة تثبيت ويندوز ما لم تكن ضرورية وبموافقتك.' },
  { q: 'هل يمسح استرداد BIOS الرقم التسلسلي لجهازي؟', a: 'قد يتأثر إذا كُتبت صورة خاطئة. الاسترداد المهني يحافظ على بيانات DMI/SMBIOS وغيرها من بيانات اللوحة قدر الإمكان قبل البرمجة.' },
  { q: 'هل أستمر في تجربة ملفات BIOS مختلفة إذا لم يقلع الجهاز؟', a: 'لا. كتابة فيرموير غير موثّق مراراً تصعّب التشخيص وقد تسبب مشاكل إضافية. بعد التأكد من الاسترداد الرسمي وفشله، يكون التشخيص المهني هو الخطوة الأسلم.' },
  { q: 'هل يصلح "تصفير CMOS" مشكلة تلف BIOS؟', a: 'تصفير CMOS يمسح الإعدادات المخزنة فقط ولا يمس كود الفيرموير، فلا يصلح التلف الحقيقي. لكنه خطوة سريعة وآمنة عند ارتباك ترتيب الإقلاع أو عدم استقرار الأوفركلوك.' },
  { q: 'لماذا يطلب ويندوز مفتاح BitLocker بعد تحديث BIOS؟', a: 'لأن BitLocker قد يربط مفتاح الفك بقياسات TPM لبيئة الإقلاع، والتحديث يغيّر هذه القياسات. هذا متوقع وليس عطلاً، ويطلب ويندوز المفتاح كفحص أمني.' },
  { q: 'هل كل لوحة أم تحتوي على شريحة BIOS احتياطية؟', a: 'لا. بعض اللوحات المكتبية من MSI وGigabyte فيها Dual BIOS أو أزرار استرداد، لكن هذا ليس عاماً. تأكد من دليل لوحتك.' },
  { q: 'ماذا أجمع قبل أخذ الجهاز للفني؟', a: 'الموديل الدقيق، وتسلسل ما حدث (أثناء التحديث أم بعده)، وأي أصوات أو أضواء، وهل القرص مشفّر ومفتاح BitLocker متاح، وأي إجراء استرداد جرّبته.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'الجهاز لا يعمل بعد تحديث BIOS؟ دليل استرداد BIOS وUEFI',
      description: 'دليل لتمييز تلف فيرموير BIOS/UEFI عن أعطال الرام والطاقة واللوحة الأم، مع طرق الاسترداد الآمنة وبرمجة شريحة SPI في الكويت.',
      image: [OG_IMAGE_URL],
      author: {
        '@type': 'Person',
        name: 'Imran Natiq',
        url: `${business.websiteUrl}/author/imran`,
        jobTitle: 'Hardware Repair Engineer'
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${business.websiteUrl}/#business`,
        name: business.legalName,
        url: business.websiteUrl,
        logo: { '@type': 'ImageObject', url: business.logoUrl }
      },
      datePublished: PUBLISHED_DATE,
      dateModified: PUBLISHED_DATE,
      mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
      url: PAGE_URL,
      inLanguage: 'ar-KW',
      articleSection: 'دليل إصلاح اللابتوبات واللوحات الأم',
      keywords: ['استرداد BIOS', 'فشل تحديث BIOS', 'تلف فيرموير', 'UEFI', 'برمجة شريحة BIOS', 'لابتوب لا يقلع بعد تحديث BIOS', 'BitLocker بعد تحديث BIOS']
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'الجهاز لا يعمل بعد تحديث BIOS؟ دليل استرداد BIOS وUEFI',
      description: 'دليل لتمييز تلف فيرموير BIOS/UEFI عن أعطال الرام والطاقة واللوحة الأم، مع طرق الاسترداد الآمنة وبرمجة شريحة SPI في الكويت.',
      inLanguage: 'ar-KW',
      isPartOf: { '@id': `${business.websiteUrl}/#website` }
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: business.websiteUrl },
        { '@type': 'ListItem', position: 2, name: 'الأدلة', item: `${business.websiteUrl}/guides` },
        { '@type': 'ListItem', position: 3, name: 'استرداد BIOS و UEFI', item: PAGE_URL }
      ]
    }
  ]
};

const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-28 text-2xl md:text-3xl font-black text-white mt-14 mb-5">
    {children}
  </h2>
);

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
    <h3 className="font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const FAQItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group border border-slate-800 rounded-2xl bg-slate-900/40 open:border-cyan-500/40 transition-colors">
    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-white">
      <span>{q}</span>
      <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="px-5 pb-5 text-slate-400 leading-relaxed">{a}</div>
  </details>
);

const linkClass = 'text-cyan-300 underline underline-offset-2 hover:text-cyan-200';

export default function BiosUefiRecoveryGuideAR() {
  useEffect(() => {
    const html = document.documentElement;
    const oldLang = html.getAttribute('lang');
    const oldDir = html.getAttribute('dir');
    html.setAttribute('lang', 'ar-KW');
    html.setAttribute('dir', 'rtl');
    return () => {
      if (oldLang) html.setAttribute('lang', oldLang); else html.removeAttribute('lang');
      if (oldDir) html.setAttribute('dir', oldDir); else html.removeAttribute('dir');
    };
  }, []);

  return (
    <main dir="rtl" lang="ar-KW" className="w-full min-h-screen bg-transparent text-slate-200 pt-8 sm:pt-16 lg:pt-32 pb-8 sm:pb-16 lg:pb-24">
      <Head htmlAttributes={{ lang: 'ar-KW', dir: 'rtl' }}>
        <title>استرداد BIOS بعد فشل التحديث: دليل UEFI والأعطال | KCROC</title>
        <meta name="description" content="لابتوب أو كمبيوتر لا يقلع بعد تحديث BIOS أو UEFI؟ تعرّف كيف تفرّق بين تلف الفيرموير وأعطال الرام والطاقة واللوحة الأم، وخيارات الاسترداد الآمنة في الكويت." />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="alternate" hrefLang="en-KW" href={EN_PAGE_URL} />
        <link rel="alternate" hrefLang="ar-KW" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="og:title" content="الجهاز لا يعمل بعد تحديث BIOS؟ دليل استرداد BIOS وUEFI" />
        <meta property="og:description" content="كيف تفرّق بين تلف الفيرموير وأعطال الرام والطاقة واللوحة الأم، وما الخطوات الآمنة قبل أي استرداد." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="لوحة أم لابتوب أثناء فحص وإصلاح BIOS في الكويت" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Head>

      <SchemaMarkup schema={SCHEMA} />

      <article className="max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="text-sm text-slate-500 mb-8 flex flex-wrap items-center gap-2" aria-label="مسار التنقل">
          <Link to="/" className="hover:text-cyan-400">الرئيسية</Link>
          <span>/</span>
          <Link to="/guides" className="hover:text-cyan-400">الأدلة</Link>
          <span>/</span>
          <span className="text-slate-400">استرداد BIOS و UEFI</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-5">
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold">دليل اللوحات الأم والفيرموير</span>
            <span>5 أكتوبر 2026</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={15} aria-hidden="true" /> 14 دقيقة قراءة</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-7">
            الجهاز لا يعمل بعد تحديث BIOS؟ دليل استرداد BIOS وUEFI
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed border-r-4 border-cyan-500 pr-6">
            شاشة سوداء بعد التحديث، أو إعادة تشغيل متكررة، أو جهاز لا يصل إلى مرحلة POST. قد يكون السبب تلف الفيرموير فعلاً، وقد يكون عطلاً في الرام أو الطاقة أو اللوحة الأم يشبه مشكلة BIOS. هذا الدليل يساعدك تفرّق بينهما قبل أن تجرّب شيئاً يصعّب المشكلة.
          </p>
        </header>

        <aside className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <img src={AUTHOR_IMAGE_URL} alt="عمران ناتيق، مهندس إصلاح العتاد في KCROC" className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-800" width={64} height={64} loading="lazy" />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-1">مؤلف الدليل الأصلي</p>
              <Link to="/author/imran" className="text-lg font-bold text-white hover:text-cyan-400">Imran Natiq</Link>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">Hardware Repair Engineer في KCROC، متخصص في إصلاح اللوحات الأم على مستوى المكونات. هذه النسخة العربية من <a href={EN_PAGE_URL} hrefLang="en" className={linkClass}>الدليل الإنجليزي</a>.</p>
            </div>
          </div>
        </aside>

        <img src={HERO_IMAGE} alt="لوحة أم لابتوب مع شريحة BIOS أثناء الفحص في مختبر KCROC" className="w-full rounded-2xl border border-slate-800 mb-10" width={800} height={450} fetchPriority="high" />

        <section aria-labelledby="quick-paths">
          <SectionTitle id="quick-paths">ابدأ من الأعراض</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickPaths.map((p) => (
              <a key={p.anchor} href={p.anchor} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-cyan-500/40 transition-colors">
                <span className="block text-slate-300 text-sm mb-1">{p.prompt}</span>
                <span className="text-cyan-400 font-bold text-sm">{p.target} ←</span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="first-aid">
          <SectionTitle id="first-aid">ماذا تفعل فور فشل التحديث</SectionTitle>
          <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-6">
            <p className="flex items-center gap-2 font-bold text-white mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" aria-hidden="true" />
              أكثر سبب شائع لتلف الفيرموير هو انقطاع عملية الكتابة نفسها
            </p>
            <ul className="space-y-2">
              {firstAid.map((t) => (
                <li key={t} className="flex items-start gap-2 text-slate-300">
                  <XCircle className="w-4 h-4 mt-1 text-red-400 shrink-0" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="bios-vs-uefi">
          <SectionTitle id="bios-vs-uefi">الفرق بين BIOS و UEFI والفيرموير</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-4">
            يؤديان المهمة الأساسية نفسها، لكن الفرق يهم عند الاسترداد. الفيرموير (سواء BIOS القديم أو UEFI) مخزن في شريحة فلاش على اللوحة الأم. أما UEFI فيحتاج أيضاً إلى قسم EFI System Partition على القرص فيه ملفات الإقلاع، مع بيانات ترتيب الإقلاع في متغيرات NVRAM داخل الفيرموير.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="العنونة والأقسام">BIOS القديم يعمل بنمط 16 بت ويقترن عادةً بـ MBR وحد عنونة تقليدي نحو 2 تيرابايت. UEFI يعمل بنمط 32 أو 64 بت ويقترن عادةً بـ GPT الذي يلغي هذا الحد.</InfoCard>
            <InfoCard title="الواجهة والأمان">BIOS قوائم نصية بالكيبورد فقط. UEFI غالباً له واجهة رسومية، ويقدم Secure Boot الذي يتحقق من توقيع برامج الإقلاع قبل تشغيلها.</InfoCard>
            <InfoCard title="الوضع الحالي">بدأت إنتل بإنهاء دعم BIOS القديم تقريباً من 2020، وويندوز 11 يتطلب UEFI مع Secure Boot. ما زال الناس يقولون "BIOS" حتى على أجهزة UEFI.</InfoCard>
          </div>
        </section>

        <section aria-labelledby="warning-signs">
          <SectionTitle id="warning-signs">10 علامات تحذير لتلف BIOS/UEFI</SectionTitle>
          <p className="text-slate-400 mb-6">تصبح الأعراض أوضح عندما تجتمع عدة علامات معاً، خصوصاً بعد تحديث فاشل.</p>
          <ol className="grid gap-4 sm:grid-cols-2">
            {warningSigns.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <span className="text-xs font-black text-cyan-400">العلامة {i + 1}</span>
                <h3 className="font-bold text-white mt-1 mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="firmware-vs-hardware">
          <SectionTitle id="firmware-vs-hardware">تلف الفيرموير أم عطل في العتاد؟</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-5">
            الجهاز الذي لا يصل إلى POST ليس بالضرورة فيرموير تالفاً. هذا التمييز هو أهم خطوة في التشخيص.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="font-bold text-white mb-2">احتمال تلف الفيرموير</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">شريحة الفلاش نفسها قد تكون سليمة بينما البيانات المخزنة عليها ناقصة أو غير صالحة أو غير متوافقة.</p>
              <p className="text-cyan-300 text-sm font-bold">مسار الاسترداد المعتاد: تحديد المنصة ← حفظ بيانات اللوحة ← صورة الاسترداد الصحيحة ← برمجة الشريحة ← التحقق من POST.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="font-bold text-white mb-2">احتمال عطل في العتاد</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">قد يكون الفيرموير سليماً تماماً بينما يمنع التهيئة خط طاقة معطّل أو رام أو معالج أو PCH أو VRM أو EC.</p>
              <p className="text-cyan-300 text-sm font-bold">مسار الإصلاح المعتاد: تشخيص اللوحة ← قياس خطوط الطاقة ← عزل المكونات ← الإصلاح أو الاستبدال حيث يلزم.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">أشياء تتحقق منها قبل أن تفترض تلف BIOS</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {checks.map((c, i) => <InfoCard key={c.title} title={`${i + 1}. ${c.title}`}>{c.text}</InfoCard>)}
          </div>
        </section>

        <section aria-labelledby="resets">
          <SectionTitle id="resets">تصفير CMOS أم NVRAM أم استرداد BIOS؟</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-5">ثلاث عمليات مختلفة يخلط الناس بينها باستمرار.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="تصفير CMOS">يمسح الإعدادات المخزنة مثل ترتيب الإقلاع وملفات الأوفركلوك ومنحنيات المراوح. لا يمس كود الفيرموير ولا يصلح التلف الحقيقي.</InfoCard>
            <InfoCard title="تصفير NVRAM / PRAM (ماك)">يمسح بعض الإعدادات المخزنة أيضاً، ولا يمس كود الفيرموير نفسه.</InfoCard>
            <InfoCard title="استرداد BIOS/UEFI">يعيد كتابة برنامج الفيرموير نفسه على شريحة الفلاش. هذا ما يلزم عند وجود تلف حقيقي.</InfoCard>
          </div>
          <p className="text-slate-400 text-sm mt-4">تصفير الإعدادات يستحق التجربة أولاً عند ارتباك ترتيب الإقلاع أو عدم استقرار الأوفركلوك لأنه سريع وغير ضار، لكنه ليس بديلاً عن استرداد الفيرموير عندما تكون المشكلة في الفيرموير.</p>
        </section>

        <section aria-labelledby="before-recovery">
          <SectionTitle id="before-recovery">ما تسجله قبل الاسترداد</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-5">كلما حددت المنصة بدقة، قلّ خطر استخدام صورة خاطئة أو إغفال عطل في العتاد.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {toRecord.map((c, i) => <InfoCard key={c.title} title={`${i + 1}. ${c.title}`}>{c.text}</InfoCard>)}
          </div>
          <p className="text-slate-400 text-sm mt-4">مهم: "نفس السلسلة" لا تعني "نفس الفيرموير". الموديلات الفرعية ومراجعات اللوحة والنسخ الإقليمية قد تستخدم فيرموير مختلفاً. اعتبر الموديل الدقيق شرطاً أساسياً.</p>
        </section>

        <section aria-labelledby="by-brand">
          <SectionTitle id="by-brand">طرق الاسترداد تختلف حسب الشركة</SectionTitle>
          <p className="text-slate-400 mb-6">توجيه عام فقط. كل إجراء يعتمد على الموديل والجيل وتغيّره الشركات مع الوقت، فأكّد دائماً من صفحة الدعم الرسمية قبل أي محاولة.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {brands.map((b) => (
              <div key={b.brand} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <h3 className="font-bold text-white mb-2">{b.brand}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{b.text}</p>
                <Link to={b.link} className="text-cyan-400 text-sm font-bold hover:text-cyan-300">{b.label} ←</Link>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="spi">
          <SectionTitle id="spi">استرداد BIOS عبر برمجة شريحة SPI / EEPROM</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-5">
            ثلاثة مستويات وليس مستوى واحداً: (1) تحديث BIOS عادي من داخل ويندوز على جهاز سليم، (2) استرداد مدمج من الشركة عندما توفره اللوحة، (3) برمجة شريحة SPI/EEPROM بمبرمج خارجي يتصل بالشريحة مباشرة، وهي الملاذ الأخير عندما لا يتوفر استرداد مدمج في الجهاز، أو فشل، أو لم تعد اللوحة تصل إلى المرحلة التي يعمل فيها الاسترداد. لهذا السبب يوجد إصلاح على مستوى الشريحة كمستوى مستقل.
          </p>
          <ol className="space-y-3 mb-8">
            {spiSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 font-black">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <img src={SPI_IMAGE} alt="مبرمج SPI من نوع CH341A مع مشبك SOIC8 لقراءة شريحة BIOS وكتابتها" className="w-full max-w-xl rounded-2xl border border-slate-800 mb-4" width={800} height={450} loading="lazy" />
          <p className="text-slate-400 text-sm">لماذا تهم نسخة الفيرموير الأصلية؟ لأن الفيرموير الحديث قد يحتوي بيانات خاصة بالمنصة وإعدادات ومناطق مرتبطة بالأمان. الاسترداد المهني يحافظ على البيانات الأصلية ذات الصلة بدل استبدال الصورة كلها بنسخة عشوائية.</p>
        </section>

        <section aria-labelledby="bitlocker">
          <SectionTitle id="bitlocker">Secure Boot و TPM و BitLocker</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-4">
            نتيجة طبيعية ومتوقعة لتحديث الفيرموير الاعتيادي، لكن كثيراً من الناس يظنونها فشلاً في BIOS. BitLocker قد يربط مفتاحه بقياسات TPM لبيئة الإقلاع، وتحديث الفيرموير يغيّر هذه القياسات فلا يستطيع TPM تسليم المفتاح تلقائياً، فيطلب ويندوز مفتاح الاسترداد كفحص أمني. إيقاف حماية BitLocker مؤقتاً قبل التحديث يخبر ويندوز أن يتوقع اختلاف الإقلاع التالي ثم تُستأنف الحماية.
          </p>
          <ul className="space-y-2 mb-5">
            {bitlockerTips.map((t) => (
              <li key={t} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed">
            مصادر مايكروسوفت الرسمية (بالإنجليزية):{' '}
            <a href={MS_KEY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>كيف تجد مفتاح استرداد BitLocker</a>{' '}
            و<a href={MS_SUSPEND_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>إيقاف BitLocker قبل تحديثات الفيرموير</a>.
            {' '}وشرح أوسع بالإنجليزية:{' '}
            <Link to="/guides/bitlocker-recovery-key-after-bios-update" hrefLang="en" className={linkClass}>لماذا يطلب ويندوز مفتاح BitLocker بعد تحديث BIOS</Link>.
          </p>
        </section>

        <section aria-labelledby="post-codes">
          <SectionTitle id="post-codes">أكواد POST وأصوات البيب وأضواء التشخيص</SectionTitle>
          <p className="text-slate-300 leading-relaxed">
            تبلّغ اللوحات واللابتوبات عن أعطال الإقلاع المبكرة، قبل ظهور أي صورة، عبر أنماط أصوات بيب أو وميض أضواء (غالباً Caps Lock / Num Lock أو أضواء تصحيح مخصصة) أو شاشة رقمين لرمز POST. هذه الأكواد خاصة بالشركة وغالباً بالموديل، فقد يعني النمط نفسه شيئاً مختلفاً بين الماركات، لذا ارجع إلى وثائق موديلك بالضبط وليس إلى جدول عام. المهم أن تعرف الفئة التي تشير إليها (الرام، المعالج، الشاشة/الرسوميات، أو فشل جهاز الإقلاع/الفيرموير)، وأن تخبر الفني بها حتى لو لم تفك رمزها بنفسك.
          </p>
        </section>

        <section aria-labelledby="data-safety">
          <SectionTitle id="data-safety">سلامة البيانات أثناء استرداد الفيرموير</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-4">
            إعادة برمجة شريحة الفيرموير لا تمسح محتويات القرص بحد ذاتها، فهما جهازا تخزين منفصلان عادةً. ومع ذلك يجب أن يتأكد الفني من الإجراء الدقيق وأن يتجنب أي خطوة "استعادة المصنع" أو إعادة تثبيت النظام ما لم تكن ضرورية ومصرّحاً بها.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-300 text-sm"><ShieldCheck className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" aria-hidden="true" /><span>قد يطلب التحديث مفتاح BitLocker أو FileVault. البيانات ليست في خطر لكنها تصبح غير متاحة بدون المفتاح.</span></li>
            <li className="flex items-start gap-2 text-slate-300 text-sm"><ShieldCheck className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" aria-hidden="true" /><span>سوء تعامل الفني مع القرص أثناء الفك خطر مرتبط بالمناولة وليس بالاسترداد. اسأل عن الاحتياطات المتبعة.</span></li>
          </ul>
        </section>

        <section aria-labelledby="diy-or-pro">
          <SectionTitle id="diy-or-pro">أفعلها بنفسي أم أذهب لفني؟</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="الاسترداد الذاتي معقول عندما">لم تجرّب بعد آلية الاسترداد الرسمية المدمجة لموديلك، أو توجد طريقة موثقة عبر فلاشة USB ويمكنك الحصول على الملف الصحيح من الشركة نفسها.</InfoCard>
            <InfoCard title="الفني أسلم عندما">جرّبت الاسترداد المدمج بشكل صحيح وفشل، أو لا توجد آلية كهذه في لوحتك، أو يلزم الوصول للوحة أو فك شريحة، أو لست واثقاً من التفريق بين مشكلة فيرموير ومشكلة عتاد.</InfoCard>
          </div>
        </section>

        <section aria-labelledby="dont">
          <SectionTitle id="dont">ماذا لا تفعل بعد فشل تحديث BIOS</SectionTitle>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dontList.map((t) => (
              <li key={t} className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-300 text-sm">
                <XCircle className="w-4 h-4 mt-0.5 text-red-400 shrink-0" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="kuwait">
          <SectionTitle id="kuwait">احتياطات تحديث BIOS في الكويت</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-4">
            الفيرموير نفسه ليس "أكثر هشاشة" لمجرد أن الجهاز في الكويت، لكن الظروف المحيطة بالتحديث مهمة. اعتبر كتابة الفيرموير عملية محكومة، خصوصاً عند وجود كهرباء غير مستقرة أو قيود على البطارية أو إجهاد حراري.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="طاقة مستقرة">استخدم كهرباء موثوقة واتبع متطلبات الشاحن والبطارية من الشركة. لا تبدأ التحديث إذا كان انقطاع الطاقة احتمالاً واقعياً.</InfoCard>
            <InfoCard title="ثبات حراري">لا تحدّث جهازاً ينطفئ بسبب الحرارة أو فيه عطل تبريد معروف. أصلح الاستقرار أولاً.</InfoCard>
            <InfoCard title="بلا تغييرات إضافية">لا تجمع التحديث مع تغيير إعدادات BIOS عشوائياً أو تبديل رام أو أكثر من ملف فيرموير. غيّر متغيراً واحداً كل مرة ليبقى العطل قابلاً للتشخيص.</InfoCard>
          </div>
        </section>

        <section aria-labelledby="cta" className="mt-14 rounded-3xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8">
          <h2 id="cta" className="text-2xl md:text-3xl font-black text-white mb-3">الجهاز لا يقلع بعد تحديث BIOS؟</h2>
          <p className="text-slate-300 leading-relaxed mb-5">
            لا تجرّب ملفات فيرموير عشوائية. فنيو KCROC يفحصون هل السبب في الفيرموير أم في عطل مادي في اللوحة الأم، ثم يحددون هل البرمجة المهنية مناسبة. استلام وتوصيل مجاني داخل الكويت، وفحص تشخيصي مجاني، وسياسة "لا إصلاح لا رسوم"، وضمان 30 يوماً.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400">
              <MessageCircle className="w-5 h-5" aria-hidden="true" /> تواصل واتساب مع فني
            </a>
            <a href={`tel:+${business.telephone}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-bold text-white hover:border-cyan-400">
              <Phone className="w-5 h-5" aria-hidden="true" /> اتصل: +{business.telephone}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/ar/motherboard-repair-kuwait" className={linkClass}><Wrench className="inline w-4 h-4 ml-1" aria-hidden="true" />إصلاح اللوحات الأم في الكويت</Link>
            <Link to="/ar/laptop-repair-kuwait" className={linkClass}>إصلاح اللابتوبات في الكويت</Link>
            <Link to="/ar/gaming-pc-repair-kuwait" className={linkClass}>إصلاح أجهزة الجيمنج في الكويت</Link>
          </div>
        </section>

        <section aria-labelledby="faq">
          <SectionTitle id="faq">الأسئلة الشائعة عن استرداد BIOS و UEFI</SectionTitle>
          <div className="space-y-3">
            {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </section>

        <p className="mt-12 border-t border-slate-800 pt-6 text-xs sm:text-sm text-slate-500 leading-relaxed">
          هذه النسخة العربية مبنية على <a href={EN_PAGE_URL} hrefLang="en" className={linkClass}>الدليل الإنجليزي لاسترداد BIOS و UEFI</a>. الإجراءات الخاصة بكل شركة (تركيبات المفاتيح وأسماء الملفات والموديلات المدعومة) تتغير مع الوقت، فأكّد الخطوات الحالية من صفحة دعم الشركة المصنّعة قبل أي محاولة استرداد.
        </p>
      </article>
    </main>
  );
}
