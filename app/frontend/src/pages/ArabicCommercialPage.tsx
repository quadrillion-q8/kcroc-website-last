import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageCircle, Wrench, MapPin, ShieldCheck } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const LOCAL_LINKS = [
  { label: 'حولي', path: '/location/hawalli' },
  { label: 'الفروانية', path: '/location/farwaniya' },
  { label: 'السالمية', path: '/location/salmiya' },
  { label: 'الجهراء', path: '/location/jahra' },
  { label: 'الأحمدي', path: '/location/ahmadi' },
  { label: 'مدينة الكويت', path: '/location/kuwait-city' }
];

const AR_GUIDES = [
  { title: 'دليل شراء اللابتوب في الكويت 2026', path: '/blog/ar/laptop-buying-guide-kuwait-2026' },
  { title: 'متى تنظف اللابتوب وتغير المعجون الحراري؟', path: '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait' }
];

const CONFIG: Record<string, {
  h1: string;
  eyebrow: string;
  intro: string;
  bullets: string[];
  faq: { q: string; a: string }[];
  englishPath: string;
  arabicLinks: { label: string; path: string }[];
  serviceIds: string[];
}> = {
  'computer-repair-kuwait': {
    h1: 'تصليح كمبيوتر في الكويت',
    eyebrow: 'فني كمبيوتر وخدمة استلام من الباب',
    intro: 'جهازك خربان أو صار يعلق أو يطفي؟ في KCROC نشخص العطل أولًا، ثم نشرح لك الحل المناسب بدل تبديل قطع على التخمين. نستلم الجهاز من البيت أو المكتب، نصلحه في مختبرنا في حولي، وبعد الفحص والاختبار نرجعه لك.',
    bullets: ['تشخيص أعطال الهاردوير قبل الإصلاح', 'تصليح لابتوب وكمبيوتر وMacBook وGaming PC', 'إصلاح مكونات اللوحة الأم عندما يكون ذلك ممكنًا', 'استلام وتوصيل مجاني داخل الكويت', 'ضمان 30 يومًا على الإصلاحات المكتملة'],
    faq: [
      { q: 'هل يوجد استلام من منطقة سكني؟', a: 'نعم. KCROC يوفر خدمة استلام وتوصيل في مناطق الكويت، وتقدر ترسل لنا منطقتك ومشكلة الجهاز عبر واتساب.' },
      { q: 'هل يتم تبديل المذربورد كاملة مباشرة؟', a: 'ليس بالضرورة. يتم تشخيص العطل أولًا، وعندما يكون الإصلاح على مستوى المكونات ممكنًا يتم شرح هذا الخيار قبل قرار استبدال اللوحة كاملة.' },
      { q: 'كم سعر تصليح الكمبيوتر؟', a: 'السعر يعتمد على نوع العطل والموديل والقطعة المطلوبة. الحالات الشائعة لها أسعار بداية، أما الأعطال المعقدة فتحتاج تشخيصًا ثم عرض سعر واضح.' }
    ],
    englishPath: '/services',
    arabicLinks: [
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح مذربورد', path: '/ar/motherboard-repair-kuwait' },
      { label: 'تصليح Gaming PC', path: '/ar/gaming-pc-repair-kuwait' },
      { label: 'تصليح شاشة لابتوب', path: '/ar/laptop-screen-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-laptop', 'srv-motherboard', 'srv-gaming', 'srv-macbook', 'srv-screen']
  },
  'laptop-repair-kuwait': {
    h1: 'تصليح لابتوب في الكويت',
    eyebrow: 'حل مشاكل اللابتوب من الشاشة إلى المذربورد',
    intro: 'لابتوبك ما يشتغل؟ ما يشحن؟ حرارته عالية؟ الشاشة سوداء أو مكسورة؟ هنا تبدأ الخطوة الصحيحة: تحديد العطل الحقيقي، ثم اختيار الإصلاح المناسب للموديل بدل شراء جهاز جديد بدون حاجة.',
    bullets: ['شاشات، بطاريات، شحن، مفصلات وتبريد', 'أعطال عدم التشغيل والشاشة السوداء', 'تصليح اللوحة الأم والدوائر عند إمكانية الإصلاح', 'Dell وHP وLenovo وASUS وAcer وMSI', 'استلام وتوصيل مجاني من منطقتك'],
    faq: [
      { q: 'هل كل لابتوب قابل للتصليح؟', a: 'ليس كل جهاز اقتصاديًا أو فنيًا قابلًا للإصلاح، لكن كثيرًا من الأعطال يمكن تقييمها قبل اتخاذ قرار الشراء أو الاستبدال.' },
      { q: 'كم يكلف تصليح اللابتوب؟', a: 'يعتمد السعر على العطل والموديل والقطعة المطلوبة. نبدأ بالتشخيص ثم نعطيك السعر قبل تنفيذ الإصلاح.' },
      { q: 'هل تحافظون على بياناتي؟', a: 'التشخيص الهاردويري يتم بدون تصفح ملفاتك. وفي أعطال اللوحة الأم، يمكن مناقشة إزالة وحدة التخزين قبل تسليم الجهاز عند الحاجة.' }
    ],
    englishPath: '/laptop-repair-kuwait',
    arabicLinks: [
      { label: 'تصليح كمبيوتر', path: '/ar/computer-repair-kuwait' },
      { label: 'تصليح مذربورد', path: '/ar/motherboard-repair-kuwait' },
      { label: 'تصليح Gaming PC', path: '/ar/gaming-pc-repair-kuwait' },
      { label: 'تبديل شاشة اللابتوب', path: '/ar/laptop-screen-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port']
  },
  'motherboard-repair-kuwait': {
    h1: 'تصليح المذربورد واللوحة الأم في الكويت',
    eyebrow: 'Component-Level & Chip-Level Repair',
    intro: 'إذا قال لك محل إن المذربورد خربانة وتحتاج تبديل كاملة، لا تعتمد على التخمين. بعض الأعطال تكون في شريحة طاقة أو دائرة شحن أو مكوّن على البورد نفسه، ويمكن تشخيصها وإصلاحها عندما يكون ذلك فنيًا واقتصاديًا مناسبًا.',
    bullets: ['تشخيص دوائر الطاقة والشحن', 'أعطال عدم التشغيل والـshort circuits', 'أعطال السوائل والتآكل حسب حالة البورد', 'Microsoldering وإصلاح مكونات عند الإمكان', 'استلام وتوصيل مجاني داخل الكويت'],
    faq: [
      { q: 'هل تصلحون مذربورد اللابتوب؟', a: 'نعم، يتم تشخيص اللوحة أولًا، وإذا كان العطل في مكوّن أو دائرة قابلة للإصلاح يتم شرح خيار الإصلاح قبل استبدال اللوحة كاملة.' },
      { q: 'هل إصلاح المذربورد أرخص دائمًا من الاستبدال؟', a: 'ليس دائمًا. القرار يعتمد على نوع العطل وتوفر القطع وقيمة الجهاز واحتمال نجاح الإصلاح.' },
      { q: 'ما الحالات التي تحتاج تشخيصًا سريعًا؟', a: 'عدم التشغيل، الشورت، عدم الشحن، آثار السوائل، ورائحة الاحتراق من الحالات التي تحتاج فحصًا قبل الاستمرار في التجارب.' }
    ],
    englishPath: '/motherboard-repair-kuwait',
    arabicLinks: [
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح كمبيوتر', path: '/ar/computer-repair-kuwait' },
      { label: 'تصليح Gaming PC', path: '/ar/gaming-pc-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-motherboard', 'srv-laptop', 'srv-charging-port', 'srv-liquid-damage']
  },
  'gaming-pc-repair-kuwait': {
    h1: 'تصليح Gaming PC وكرت الشاشة في الكويت',
    eyebrow: 'حرارة، تهنيق، FPS drops، GPU ومشاكل الطاقة',
    intro: 'إذا الـGaming PC يطفي وقت اللعب، الحرارة ترتفع، الفريمات تنزل أو تظهر تقطيعات وصور غريبة، لا تبدأ بشراء كرت جديد. نحدد أولًا هل السبب حرارة، تبريد، GPU، VRAM، طاقة، رام أو مذربورد.',
    bullets: ['GPU وVRAM وتشخيص الأعطال تحت الضغط', 'Cooling وThermal Service', 'Power/VRM ومشاكل المذربورد', 'BIOS/VBIOS والفحص بعد الإصلاح', 'اختبار استقرار قبل التسليم'],
    faq: [
      { q: 'هل تصلحون مشاكل ارتفاع الحرارة في Gaming PC؟', a: 'نعم. يتم فحص التبريد والمراوح والـthermal interface والسلوك تحت الحمل لتحديد السبب الفعلي.' },
      { q: 'هل تصلحون كروت الشاشة؟', a: 'يتم تشخيص أعطال كرت الشاشة والطاقة والمكونات المرتبطة به، ويحدد التقرير ما إذا كان الإصلاح ممكنًا قبل استبدال الكرت.' },
      { q: 'هل تستلمون Gaming PC من البيت؟', a: 'نعم، الاستلام والتوصيل متاحان عبر خدمة KCROC داخل الكويت.' }
    ],
    englishPath: '/gaming-pc-repair-kuwait',
    arabicLinks: [
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح مذربورد', path: '/ar/motherboard-repair-kuwait' },
      { label: 'تصليح كمبيوتر', path: '/ar/computer-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-laptop']
  },
  'laptop-screen-repair-kuwait': {
    h1: 'تصليح وتبديل شاشة اللابتوب في الكويت',
    eyebrow: 'شاشة مكسورة، سوداء، تومض أو فيها خطوط',
    intro: 'مو كل شاشة سوداء تحتاج تبديل شاشة. ممكن يكون الكابل أو الدائرة أو مشكلة في الجهاز نفسه. لذلك نفحص الصورة والإضاءة والاتصال قبل طلب القطعة، وإذا كانت الشاشة مكسورة نطابق البديل مع موديل جهازك.',
    bullets: ['تشخيص black screen قبل استبدال الشاشة', 'تبديل الشاشات المناسبة للموديل', 'فحص كابل الشاشة والاتصال الداخلي', 'خدمة للـDell وHP وLenovo وASUS وغيرها', 'استلام وتوصيل مجاني داخل الكويت'],
    faq: [
      { q: 'هل الشاشة السوداء تعني أن الشاشة خربانة؟', a: 'ليس دائمًا. قد يكون السبب كابل الشاشة أو الإضاءة أو RAM أو مسار عرض آخر؛ لذلك يبدأ التشخيص قبل طلب شاشة جديدة.' },
      { q: 'هل تبدلون شاشة اللابتوب في نفس اليوم؟', a: 'المدة تعتمد على الموديل وتوفر القطعة. بعد معرفة الموديل يمكن تحديد الخيار المتاح والمدة المتوقعة.' },
      { q: 'هل توفرون استلامًا من المنطقة؟', a: 'نعم. نرتب الاستلام والتوصيل ضمن خدمة KCROC في الكويت.' }
    ],
    englishPath: '/laptop-screen-repair-kuwait',
    arabicLinks: [
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح كمبيوتر', path: '/ar/computer-repair-kuwait' },
      { label: 'تصليح مذربورد', path: '/ar/motherboard-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-screen', 'srv-laptop', 'srv-battery', 'srv-hinge']
  }
};

export default function ArabicCommercialPage() {
  const { slug } = useParams<{ slug: string }>();
  const cfg = slug ? CONFIG[slug] : undefined;
  const page = slug ? KCROC_GRAPH.pages.find((item) => item.slug === `ar/${slug}`) : undefined;
  const business = KCROC_GRAPH.business;

  if (!cfg || !page || !business) return <Navigate to="/404" replace />;

  const wa = `https://wa.me/${business.telephone}?text=${encodeURIComponent(`السلام عليكم KCROC، أحتاج ${cfg.h1}. أريد أعرف طريقة الاستلام والتشخيص.`)}`;
  const services = cfg.serviceIds
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter(Boolean);
  const faqSchema = {
    '@graph': [{
      '@type': 'FAQPage',
      '@id': `${page.seo.canonicalUrl}#faq`,
      mainEntity: cfg.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    }]
  };

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId={page.id} />
      <SchemaMarkup schema={faqSchema} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="مسار التنقل" className="mb-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-cyan-300">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{cfg.h1}</span>
        </nav>

        <section className="rounded-3xl border border-cyan-900/50 bg-slate-900/45 p-6 shadow-2xl backdrop-blur-md sm:p-10">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-cyan-400">{cfg.eyebrow}</p>
          <div className="max-w-4xl">
            <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">{cfg.h1}</h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">{cfg.intro}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {cfg.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4">
                <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-400" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-slate-200">{bullet}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 hover:bg-cyan-400">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> واتساب KCROC
            </a>
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-7 py-3.5 font-bold text-white hover:border-cyan-700 hover:text-cyan-300">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" /> احجز استلام الجهاز
            </Link>
            <Link to={cfg.englishPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-800 px-7 py-3.5 font-semibold text-slate-300 hover:text-white">
              English service page <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="arabic-services">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-400">الخدمات المرتبطة</p>
            <h2 id="arabic-services" className="mt-2 text-2xl font-black text-white sm:text-3xl">الخدمة تبدأ من العطل الذي عندك</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => service && (
              <Link key={service.id} to={`/${service.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-900/45 p-6 hover:border-cyan-500/40">
                <Wrench className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300">{service.title.replace(' Kuwait', '')}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8" aria-labelledby="arabic-local">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
            <div>
              <h2 id="arabic-local" className="text-2xl font-black text-white">استلام من منطقتك داخل الكويت</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-400">ما تحتاج تودي الجهاز بنفسك إلى حولي. أرسل منطقتك وموديل الجهاز والمشكلة، ونرتب الاستلام ثم يتم الفحص والإصلاح في مختبر KCROC في حولي وإرجاع الجهاز لك بعد الاختبار.</p>
              <Link to="/ar/near-me" className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">فني كمبيوتر وتصليح لابتوب بالقرب مني <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="arabic-areas">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-400">مناطق الخدمة</p>
          <h2 id="arabic-areas" className="mt-2 text-2xl font-black text-white sm:text-3xl">خدمة الاستلام والتوصيل في مناطق الكويت</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOCAL_LINKS.map((item) => (
              <Link key={item.path} to={item.path} className="rounded-xl border border-slate-800 bg-slate-900/45 px-5 py-4 font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300">{item.label}</Link>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="arabic-guides">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-400">أدلة عربية مرتبطة</p>
          <h2 id="arabic-guides" className="mt-2 text-2xl font-black text-white sm:text-3xl">معلومات تساعدك قبل قرار الإصلاح</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {AR_GUIDES.map((item) => (
              <Link key={item.path} to={item.path} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300">{item.title}</Link>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="arabic-faq">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-400">الأسئلة الشائعة</p>
          <h2 id="arabic-faq" className="mt-2 text-2xl font-black text-white sm:text-3xl">قبل لا ترسل جهازك</h2>
          <div className="mt-6 divide-y divide-slate-800 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45">
            {cfg.faq.map((item) => (
              <details key={item.q} className="p-6">
                <summary className="cursor-pointer font-bold text-white">{item.q}</summary>
                <p className="mt-3 leading-7 text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="arabic-cluster">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-400">مجموعة خدمات KCROC بالعربي</p>
          <h2 id="arabic-cluster" className="mt-2 text-2xl font-black text-white sm:text-3xl">تكمل من الصفحة المناسبة لك</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cfg.arabicLinks.map((item) => (
              <Link key={item.path} to={item.path} className="rounded-xl border border-slate-800 bg-slate-900/45 px-5 py-4 font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300">{item.label}</Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-cyan-900/60 bg-cyan-950/25 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-black text-white sm:text-3xl">قول لنا المشكلة مثل ما هي</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">ارسل موديل الجهاز، منطقتك، ووصف بسيط للعطل على واتساب. نبدأ من التشخيص ونوضح لك الخطوة التالية قبل الإصلاح.</p>
          <a href={wa} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-3.5 font-black text-slate-950 hover:bg-cyan-400">
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> تواصل مع فني KCROC
          </a>
        </section>
      </main>
    </div>
  );
}
