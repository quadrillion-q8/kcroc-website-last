import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, CheckCircle2, CircleCheck, ClipboardCheck, Cpu, Gauge, MapPin, MessageCircle, Microscope, MonitorCog, Phone, Power, ShieldCheck, Star, Thermometer, Truck, Wrench } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { IMAGES } from '../constants/images';

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
    bullets: ['تشخيص أعطال الهاردوير قبل الإصلاح', 'تصليح كمبيوتر ألعاب وGaming PC ولابتوبات', 'إصلاح مكونات اللوحة الأم عندما يكون ذلك ممكنًا', 'استلام وتوصيل مجاني داخل الكويت', 'ضمان 30 يومًا على الإصلاحات المكتملة'],
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
      { label: 'تصليح MacBook', path: '/ar/macbook-repair-kuwait' },
      { label: 'تبديل بطارية اللابتوب', path: '/ar/battery-replacement-kuwait' },
      { label: 'ترقية SSD وRAM', path: '/ar/ssd-ram-upgrade-kuwait' },
      { label: 'تصليح Gaming Laptop', path: '/ar/gaming-laptop-repair-kuwait' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' },
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
    h1: 'تصليح Gaming PC وبي سي قيمنق وكرت الشاشة بالكويت',
    eyebrow: 'حرارة، تهنيق، FPS Drops، GPU ومشاكل الطاقة',
    intro: 'إذا الـGaming PC عندك يطفي وقت اللعب، يهنّق، الـFPS ينزل، أو الحرارة تصير عالية، لا تستعيل وتبدّل كرت أو قطعة غالية. خلنا نشيك على السبب أول، ونحدد هل المشكلة من الحرارة، التبريد، GPU، VRAM، الطاقة، الرام أو المذربورد.',
    bullets: ['تصليح كرت الشاشة وGPU وVRAM', 'تغيير المعجون الحراري وخدمة التبريد', 'فحص الهاردوير تحت الضغط واختبار الاستقرار', 'Power/VRM ومشاكل المذربورد', 'BIOS/VBIOS والفحص بعد الإصلاح'],
    faq: [
      { q: 'بي سي القيمنق حرارته عالية، شتسوون؟', a: 'نشيك على الغبار، المراوح، الـAIO، المعجون أو الـthermal interface، وتدفق الهوا وحرارة CPU/GPU تحت الضغط عشان نعرف السبب الحقيقي.' },
      { q: 'كرت الشاشة خربان أو يطلع خطوط، تقدرون تصلحونه؟', a: 'نفحص الـGPU والـVRAM والطاقة والاتصال والاستقرار أول. إذا فيه إصلاح فني ممكن، نشرح لك الخيار قبل ما تفكر تبدّل الكرت كامل.' },
      { q: 'تستلمون بي سي قيمنق من البيت؟', a: 'إي نعم. نرتب الاستلام والتوصيل داخل الكويت، وما يحتاج تشيل البرج وتوديه حولي بنفسك.' }
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
,
  'computer-repair-hawalli': {
    h1: 'تصليح كمبيوتر حولي',
    eyebrow: 'مختبر KCROC في حولي • استلام وتوصيل مجاني',
    intro: 'تحتاج فني كمبيوتر أو لابتوب في حولي؟ مختبر KCROC موجود في حولي لتشخيص الكمبيوتر واللابتوب، مع استلام وتوصيل مجاني من المنزل أو المكتب وباقي مناطق الكويت.',
    bullets: ['مختبر فعلي في حولي', 'تشخيص قبل الإصلاح', 'تصليح لابتوب وكمبيوتر وMacBook', 'لوحات أم وMicrosoldering حسب الحالة', 'ضمان 30 يومًا على الإصلاح المكتمل'],
    faq: [
      { q: 'وين موقع مختبر KCROC في حولي؟', a: 'مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19 في البدروم، حولي.' },
      { q: 'هل لازم أروح حولي بنفسي؟', a: 'لا. نرتب الاستلام والتوصيل داخل الكويت، وبعد الإصلاح والاختبار نرجع الجهاز لك.' },
      { q: 'هل تصلحون MacBook والـGaming PC في حولي؟', a: 'نعم، يتم تشخيص MacBook والـGaming PC واللابتوبات والكمبيوترات حسب نوع المشكلة والقطعة المطلوبة.' }
    ],
    englishPath: '/location/hawalli',
    arabicLinks: [
      { label: 'تصليح كمبيوتر الكويت', path: '/ar/computer-repair-kuwait' },
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح MacBook', path: '/ar/macbook-repair-kuwait' },
      { label: 'تصليح Gaming Laptop', path: '/ar/gaming-laptop-repair-kuwait' },
      { label: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' }
    ],
    serviceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-macbook', 'srv-macbook-screen', 'srv-gaming', 'srv-gaming-laptop']
  },
  'macbook-repair-kuwait': {
    h1: 'تصليح MacBook في الكويت',
    eyebrow: 'MacBook Air وMacBook Pro • تشخيص قبل الإصلاح',
    intro: 'MacBook ما يشتغل؟ ما يشحن؟ الشاشة سوداء أو البطارية ضعفت؟ في KCROC نشخص العطل الفعلي أولًا، ونحدد هل المشكلة في الطاقة أو الشحن أو الشاشة أو البطارية أو اللوحة الأم قبل اقتراح الاستبدال.',
    bullets: ['MacBook Air وMacBook Pro', 'أعطال الشاشة والشحن والطاقة', 'تصليح اللوحة على مستوى المكونات عند الإمكان', 'تبديل البطارية والشاشة حسب الموديل', 'استلام وتوصيل مجاني داخل الكويت'],
    faq: [
      { q: 'هل تصلحون MacBook Air وMacBook Pro؟', a: 'نعم. نحدد الموديل والجيل أولًا ثم نفحص المشكلة والقطع المتوافقة.' },
      { q: 'هل تفحصون اللوحة قبل اقتراح تبديلها؟', a: 'نعم. في الأعطال القابلة للإصلاح نفحص مسار الطاقة والشحن والمكونات قبل القفز إلى تبديل اللوحة كاملة.' },
      { q: 'هل توفرون استلام MacBook من منطقتي؟', a: 'نعم. خدمة الاستلام والتوصيل متاحة داخل الكويت، بينما يتم الإصلاح في مختبر KCROC بحولي.' }
    ],
    englishPath: '/macbook-repair-kuwait',
    arabicLinks: [
      { label: 'تبديل شاشة MacBook', path: '/ar/macbook-screen-replacement-kuwait' },
      { label: 'تبديل البطارية', path: '/ar/battery-replacement-kuwait' },
      { label: 'تصليح مذربورد', path: '/ar/motherboard-repair-kuwait' },
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' }
    ],
    serviceIds: ['srv-macbook', 'srv-macbook-screen', 'srv-battery', 'srv-motherboard']
  },
  'macbook-screen-replacement-kuwait': {
    h1: 'تبديل شاشة MacBook في الكويت',
    eyebrow: 'MacBook Air وMacBook Pro • مطابقة الموديل قبل تركيب الشاشة',
    intro: 'إذا شاشة MacBook مكسورة أو سوداء أو فيها خطوط أو تومض، لا نطلب شاشة جديدة قبل التأكد من سبب العطل. نطابق الجيل والموديل والـdisplay assembly ثم نعطيك السعر قبل التركيب.',
    bullets: ['MacBook Air وMacBook Pro', 'فحص الشاشة والكابل والإضاءة', 'تبديل شاشة مناسبة للموديل', 'من 30 د.ك + القطعة حسب الحالة', 'استلام وتوصيل مجاني داخل الكويت'],
    faq: [
      { q: 'كم سعر تبديل شاشة MacBook؟', a: 'الخدمة تبدأ من 30 د.ك + القطعة، والسعر النهائي يعتمد على الموديل وتجميعة الشاشة المطلوبة.' },
      { q: 'هل كل شاشة سوداء تحتاج تبديل؟', a: 'لا. نفحص اللوحة والكابل والإضاءة ومسار الصورة قبل طلب شاشة جديدة.' },
      { q: 'هل توفرون تبديل الشاشة في نفس اليوم؟', a: 'يمكن أن يكون نفس اليوم عندما تكون القطعة المناسبة متوفرة، وإلا يحدد الموعد حسب توفر القطعة.' }
    ],
    englishPath: '/macbook-screen-replacement-kuwait',
    arabicLinks: [
      { label: 'تصليح MacBook', path: '/ar/macbook-repair-kuwait' },
      { label: 'تبديل شاشة اللابتوب', path: '/ar/laptop-screen-repair-kuwait' },
      { label: 'تبديل البطارية', path: '/ar/battery-replacement-kuwait' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' }
    ],
    serviceIds: ['srv-macbook-screen', 'srv-macbook', 'srv-screen']
  },
  'battery-replacement-kuwait': {
    h1: 'تبديل بطارية اللابتوب وMacBook في الكويت',
    eyebrow: 'فحص صحة البطارية ودائرة الشحن قبل التبديل',
    intro: 'البطارية تخلص بسرعة أو الجهاز يطفي فجأة؟ نتحقق أولًا هل المشكلة من البطارية نفسها أو من دائرة الشحن والطاقة، ثم نركب البطارية المناسبة للموديل عند الحاجة.',
    bullets: ['تبديل بطاريات اللابتوب وMacBook', 'فحص صحة البطارية ودوراتها', 'فحص دائرة الشحن والطاقة', 'من 8 د.ك + القطعة حسب الحالة', 'استلام وتوصيل مجاني وضمان 30 يومًا'],
    faq: [
      { q: 'كم يبدأ سعر تبديل بطارية اللابتوب؟', a: 'الخدمة تبدأ من 8 د.ك + القطعة، والسعر النهائي يعتمد على موديل الجهاز والبطارية المناسبة.' },
      { q: 'هل كل مشكلة بطارية تحتاج بطارية جديدة؟', a: 'لا. أحيانًا تكون المشكلة في الشحن أو دائرة الطاقة، لذلك نختبر السبب قبل التبديل.' },
      { q: 'هل تبدلون بطارية MacBook؟', a: 'نعم، حسب الموديل والبطارية المتوافقة وحالة الجهاز.' }
    ],
    englishPath: '/battery-replacement-kuwait',
    arabicLinks: [
      { label: 'تبديل شاشة MacBook', path: '/ar/macbook-screen-replacement-kuwait' },
      { label: 'تصليح MacBook', path: '/ar/macbook-repair-kuwait' },
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'ترقية SSD وRAM', path: '/ar/ssd-ram-upgrade-kuwait' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' }
    ],
    serviceIds: ['srv-battery', 'srv-laptop', 'srv-macbook', 'srv-charging-port']
  },
  'ssd-ram-upgrade-kuwait': {
    h1: 'ترقية SSD وRAM لتسريع اللابتوب في الكويت',
    eyebrow: 'سرعة أعلى تبدأ بتحديد سبب البطء',
    intro: 'اللابتوب بطيء؟ قبل ما تشتري قطعة عشوائيًا، نفحص التخزين والرام والحرارة وسلامة القرص ونحدد هل SSD أو RAM هو الاختناق الحقيقي. وعندما يكون مناسبًا نركب القطعة ونختبر الجهاز بعد الترقية.',
    bullets: ['SSD SATA أو NVMe حسب الموديل', 'ترقية RAM عندما تكون قابلة للترقية', 'فحص صحة التخزين', 'استنساخ Windows عندما يكون مناسبًا', 'استلام وتوصيل مجاني وضمان 30 يومًا'],
    faq: [
      { q: 'هل SSD يسرع اللابتوب؟', a: 'إذا كان القرص الحالي هو سبب البطء، فغالبًا يعطي SSD فرقًا واضحًا في الإقلاع وفتح البرامج.' },
      { q: 'هل يمكن ترقية RAM في كل لابتوب؟', a: 'لا. بعض الأجهزة تستخدم ذاكرة ملحومة وبعضها يحتوي على فتحات قابلة للترقية، لذلك نتحقق من الموديل أولًا.' },
      { q: 'هل يمكن نقل Windows إلى SSD الجديد؟', a: 'غالبًا نعم عندما يكون القرص الأصلي بحالة مناسبة ويكون إعداد الجهاز قابلًا للاستنساخ، ثم نتحقق من الإقلاع وصحة القرص.' }
    ],
    englishPath: '/ssd-ram-upgrade-kuwait',
    arabicLinks: [
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'تبديل البطارية', path: '/ar/battery-replacement-kuwait' },
      { label: 'تصليح Gaming Laptop', path: '/ar/gaming-laptop-repair-kuwait' },
      { label: 'دليل اللابتوب البطيء', path: '/blog/why-is-my-laptop-so-slow-2026' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' }
    ],
    serviceIds: ['srv-ssd-ram', 'srv-laptop', 'srv-gaming-laptop']
  },
  'gaming-laptop-repair-kuwait': {
    h1: 'تصليح Gaming Laptop في الكويت',
    eyebrow: 'ROG • TUF • Legion • MSI • Predator • OMEN',
    intro: 'Gaming Laptop يحرّ؟ يطفي؟ ما يعطي صورة؟ الشحن يتقطع؟ الـFPS ينزل بعد فترة؟ نفحص التبريد والطاقة وGPU والرام والـBIOS واللوحة قبل اقتراح تبديل قطعة غالية.',
    bullets: ['Overheating وThermal Throttling', 'Black Screen وNo Power', 'GPU وVRAM واختبار الاستقرار', 'Charging والبطارية واللوحة الأم', 'استلام وتوصيل مجاني وضمان 30 يومًا'],
    faq: [
      { q: 'هل تصلحون ASUS ROG وTUF وLenovo Legion وMSI؟', a: 'نعم، وتشمل الخدمة عائلات Gaming Laptop الرئيسية، مع تحديد الموديل والجيل قبل الإصلاح.' },
      { q: 'Gaming Laptop يسخن وFPS ينزل، شنو السبب؟', a: 'قد يكون من التبريد أو الحرارة أو الطاقة أو GPU، لذلك نقيس درجات الحرارة وسلوك الأداء تحت الحمل بدل التخمين.' },
      { q: 'هل تصلحون Gaming Laptop ما يشتغل أو شاشته سوداء؟', a: 'نعم، نفصل بين الطاقة والذاكرة وGPU والـBIOS والشاشة واللوحة قبل طلب قطعة جديدة.' }
    ],
    englishPath: '/gaming-laptop-repair-kuwait',
    arabicLinks: [
      { label: 'خدمة تنظيف Gaming Laptop', path: '/gaming-laptop-cleaning-kuwait' },
      { label: 'تصليح Gaming PC', path: '/ar/gaming-pc-repair-kuwait' },
      { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
      { label: 'ترقية SSD وRAM', path: '/ar/ssd-ram-upgrade-kuwait' },
      { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' }
    ],
    serviceIds: ['srv-gaming-laptop', 'srv-gaming-laptop-cleaning', 'srv-gaming', 'srv-laptop', 'srv-screen', 'srv-battery']
  }
};


const AR_COMPUTER_SERVICE_CARDS = [
  {
    title: 'تصليح اللابتوب',
    description: 'من عدم التشغيل والشحن إلى الشاشة والحرارة واللوحة الأم، نبدأ بتحديد سبب العطل قبل اقتراح الإصلاح.',
    path: '/ar/laptop-repair-kuwait',
    image: IMAGES.services.laptopRepair,
  },
  {
    title: 'تصليح المذربورد واللوحة الأم',
    description: 'فحص دوائر الطاقة والشحن والمكونات الإلكترونية، مع إمكانية الإصلاح على مستوى المكوّن عندما يكون مناسبًا.',
    path: '/ar/motherboard-repair-kuwait',
    image: IMAGES.services.motherboardRepair,
  },
  {
    title: 'تصليح Gaming PC وكرت الشاشة',
    description: 'تشخيص GPU وVRAM والطاقة والحرارة ومشاكل الأداء والـFPS مع اختبار استقرار قبل التسليم.',
    path: '/ar/gaming-pc-repair-kuwait',
    image: IMAGES.gaming.rtxLighting,
  },
  {
    title: 'تصليح MacBook',
    description: 'تشخيص أعطال MacBook والطاقة واللوحة الداخلية وبعض أضرار السوائل دون القفز مباشرة إلى استبدال اللوحة.',
    path: '/macbook-repair-kuwait',
    image: IMAGES.macbook.diagnostics,
  },
  {
    title: 'تصليح وتبديل شاشة اللابتوب',
    description: 'نفحص الشاشة والكابل والإضاءة والاتصال قبل طلب القطعة، ثم نطابق الشاشة مع موديل جهازك.',
    path: '/ar/laptop-screen-repair-kuwait',
    image: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted,
  },
  {
    title: 'تبريد وتنظيف اللابتوب',
    description: 'تنظيف داخلي وفحص الحرارة والمراوح والمعجون الحراري للحالات التي تعاني من سخونة أو هبوط أداء.',
    path: '/gaming-laptop-cleaning-kuwait',
    image: IMAGES.services.thermalService,
  },
  {
    title: 'إصلاح المفصلات والهيكل',
    description: 'معالجة مشاكل المفصلات والهيكل قبل أن تتطور إلى ضرر في الشاشة أو الكابلات الداخلية.',
    path: '/laptop-hinge-repair-kuwait',
    image: IMAGES.laptopHardware.brokenHinge,
  },
  {
    title: 'ترقية SSD وRAM',
    description: 'اقتراح وتركيب ترقيات مناسبة بعد التأكد من التوافق لتحسين سرعة الإقلاع والاستجابة والاستخدام اليومي.',
    path: '/ssd-ram-upgrade-kuwait',
    image: IMAGES.upgrades.ram8gb,
  },
] as const;

const AR_COMPUTER_PROOF_IMAGES = [
  {
    title: 'إصلاح لابتوب داخل الورشة',
    description: 'صورة حقيقية من بيئة العمل والفحص في KCROC.',
    image: IMAGES.brand.technicians,
  },
  {
    title: 'فحص وصيانة اللوحة الأم',
    description: 'أعمال الهاردوير الدقيقة تبدأ من الفحص وليس من تبديل القطع عشوائيًا.',
    image: IMAGES.services.motherboardRepair,
  },
  {
    title: 'تشخيص MacBook',
    description: 'فحص الجهاز من الداخل وتحديد المشكلة قبل اختيار الإصلاح المناسب.',
    image: IMAGES.macbook.diagnostics,
  },
  {
    title: 'Gaming PC وكرت الشاشة',
    description: 'أنظمة عالية الأداء تحتاج فحصًا للحرارة والطاقة والاستقرار، وليس فقط تبديل القطع.',
    image: IMAGES.gaming.rtxLighting,
  },
  {
    title: 'صيانة حرارية',
    description: 'فحص وتنظيف النظام الحراري وإعادة الخدمة عند الحاجة.',
    image: IMAGES.services.thermalService,
  },
  {
    title: 'إصلاح هيكل ومفصلات اللابتوب',
    description: 'معالجة الضرر الميكانيكي قبل أن يتوسع إلى الشاشة أو الكابلات.',
    image: IMAGES.laptopHardware.brokenHinge,
  },
] as const;


const GAMING_AR_SYMPTOMS = [
  {
    title: 'الكمبيوتر يطفي وقت اللعب أو يسوي Restart',
    text: 'نشيك هل السالفة من الحرارة، الباور، الـVRM، المذربورد أو الرام، بدل لا نرمي عليك تغيير قطعة على طول.',
    icon: Power,
  },
  {
    title: 'مشكلة هبوط الفريمات أو التقطيع',
    text: 'نشيك حرارة CPU/GPU والـhotspot والتبريد والرام والطاقة، ونشوف شلون يتصرف الجهاز تحت الضغط.',
    icon: Gauge,
  },
  {
    title: 'GPU يطلع خطوط أو تشويش',
    text: 'نشيك الكرت والـVRAM والطاقة والاتصال والاستقرار قبل لا نقول لك إن الكرت خلاص انتهى.',
    icon: MonitorCog,
  },
  {
    title: 'حل مشكلة ارتفاع حرارة البي سي',
    text: 'نشوف الغبار والمراوح والـAIO والـthermal interface وتدفق الهوا، وبعدها نختبر الحرارة.',
    icon: Thermometer,
  },
  {
    title: 'شاشة سوداء وقت اللعب أو ما يعطي Display',
    text: 'نشيك هل السالفة من GPU أو RAM أو BIOS/VBIOS أو الباور أو مسار العرض.',
    icon: MonitorCog,
  },
  {
    title: 'بعد تجميعة أو ترقية الجهاز مو ثابت',
    text: 'نشوف توافق القطع وإعدادات BIOS وRAM/XMP أو EXPO والطاقة والحرارة، وبعدها نختبر استقرار الجهاز.',
    icon: Cpu,
  },
];

const GAMING_AR_BRANDS = [
  'ASUS ROG',
  'MSI',
  'Alienware',
  'Lenovo Legion',
  'Razer',
  'Gigabyte AORUS',
  'NZXT',
  'تجميعات Custom PC',
];

const GAMING_AR_AREAS = [
  { label: 'حولي', path: '/location/hawalli' },
  { label: 'السالمية', path: '/location/salmiya' },
  { label: 'مدينة الكويت', path: '/location/kuwait-city' },
  { label: 'الفروانية', path: '/location/farwaniya' },
  { label: 'الجهراء', path: '/location/jahra' },
  { label: 'الأحمدي', path: '/location/ahmadi' },
  { label: 'الفحيحيل', path: '/location/fahaheel' },
  { label: 'المنقف', path: '/location/mangaf' },
  { label: 'أبو حليفة', path: '/location/abu-halifa' },
  { label: 'جابرية', path: '/location/jabriya' },
  { label: 'مبارك الكبير', path: '/location/mubarak-al-kabeer' },
  { label: 'الفنطاس', path: '/location/fintas' },
  { label: 'صباح السالم', path: '/location/sabah-al-salem' },
];

const GAMING_AR_FAQ = [
  {
    q: 'تصلحون بي سي قيمنق وGaming PC المكتبي؟',
    a: 'إي نعم. نخدم الـGaming Desktop والتجميعات الـCustom PC والأجهزة الجاهزة، ونشيك كروت الشاشة والتبريد والطاقة والمذربورد والـBIOS/VBIOS حسب حالة الجهاز.',
  },
  {
    q: 'شنو تصلحون إذا الـGaming PC يهنّق أو يطفي وقت اللعب؟',
    a: 'نبدأ من اللي قاعد يصير: حرارة CPU/GPU، الـhotspot، المراوح أو مضخة الـAIO، الرام، الباور، الـVRM والمذربورد. نبي نعرف السبب قبل لا تبدّل قطعة غالية.',
  },
  {
    q: 'كرت الشاشة يطلع خطوط أو Artifacts، تصلحونه؟',
    a: 'نشيك الـGPU والـVRAM والطاقة والاتصالات اللي تخص الكرت. إذا فيه إصلاح ممكن، نقول لك شنو ينفع قبل قرار تبديل الكرت كامل.',
  },
  {
    q: 'عندي FPS Drops وتقطيع، هل المشكلة أكيد من كرت الشاشة؟',
    a: 'مو شرط. الـFPS Drops والتقطيع ممكن يكونون من الحرارة أو الـthermal throttling أو الرام أو الباور أو سلوك CPU/GPU أو الإعدادات. عشان جذي نختبر الجهاز وقت الحمل اللي تطلع فيه المشكلة.',
  },
  {
    q: 'الحرارة مرتفعة في بي سي القيمنق بالكويت، شنو أفحص؟',
    a: 'نشيك الغبار وتدفق الهوا والمراوح والـAIO والـthermal interface وحرارة CPU/GPU تحت الضغط. الحرارة بروحها ما تقول لنا أي قطعة هي السبب.',
  },
  {
    q: 'هل تصلحون BIOS أو VBIOS إذا صار فشل بالتحديث؟',
    a: 'إي، بعض الحالات نقدر نستعيد فيها BIOS أو VBIOS، حسب المذربورد أو الكرت وحالة الـfirmware. أول شي نشوف الجهاز وبعدين نحدد الطريقة المناسبة.',
  },
  {
    q: 'كم سعر تصليح الـGaming PC في الكويت؟',
    a: 'تصليح Gaming PC وGPU يبدأ من 25 د.ك حسب نوع الشغلة والتشخيص. إذا المشكلة معقدة في GPU أو المذربورد أو التبريد، نحتاج نشيك الجهاز أول قبل نعطيك السعر النهائي.',
  },
  {
    q: 'كم يستغرق تصليح بي سي قيمنق؟',
    a: 'غالبًا الشغلات المتخصصة تاخذ 24–48 ساعة إذا القطع المطلوبة متوفرة. بعض الأعطال المعقدة أو القطع اللي تحتاج طلب ممكن تاخذ وقت أكثر.',
  },
  {
    q: 'تستلمون برج الـGaming PC من البيت؟',
    a: 'إي نعم. نوفر استلام وتوصيل داخل الكويت، يعني ما يحتاج تشيل البرج وتوديه حولي بنفسك.',
  },
  {
    q: 'هل تصلحون Gaming PC بعد تجميعة أو ترقية RAM/GPU؟',
    a: 'إي. إذا الجهاز صار ما يقلع، ما يعطي صورة أو صار مو ثابت بعد تجميعة أو ترقية RAM/GPU، نشيك القطع والإعدادات والطاقة والحرارة حسب اللي قاعد يصير.',
  },
  {
    q: 'تقدمون تصليح كمبيوتر خدمة منازل؟',
    a: 'إذا قصدك الفني يشتغل عندك داخل البيت، هالخدمة مو هي المقصودة. اللي نوفره هو استلام الـGaming PC من البيت وتوصيله لمختبر KCROC في حولي، وبعد الإصلاح والاختبار نرجعه لك.',
  },
];


function ArabicGamingPcRepairPage({
  page,
  business,
  wa,
}: {
  page: NonNullable<ReturnType<typeof KCROC_GRAPH.pages.find>>;
  business: NonNullable<typeof KCROC_GRAPH.business>;
  wa: string;
}) {
  const service = KCROC_GRAPH.services.find((item) => item.id === 'srv-gaming');
  const canonicalUrl = 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait';
  const startingPrice = service?.pricing?.startingFrom ?? 25;
  const turnaround = service?.estimatedTurnaround ?? '24-48 Hours';

  const schema = {
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: 'تصليح Gaming PC وبي سي قيمنق وتصليح كرت الشاشة في الكويت',
        serviceType: 'Gaming PC & GPU Repair',
        description: 'تشخيص وإصلاح مشاكل Gaming PC والـGPU والحرارة والطاقة والتبريد وVRAM وBIOS/VBIOS في الكويت، مع استلام وتوصيل.',
        url: canonicalUrl,
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        provider: {
          '@type': 'LocalBusiness',
          name: business.title,
          url: business.websiteUrl,
          telephone: `+${business.telephone}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: business.streetAddress,
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            addressCountry: business.addressCountry,
          },
        },
        image: `${business.websiteUrl}/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KWD',
          price: startingPrice,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'KWD',
            minPrice: startingPrice,
          },
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: GAMING_AR_FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId={page.id} />
      <SchemaMarkup schema={schema} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-7 sm:px-6 sm:pt-10">
        <nav aria-label="مسار التنقل" className="mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-cyan-300">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">تصليح Gaming PC وبي سي قيمنق بالكويت</span>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 shadow-2xl sm:p-10 lg:p-12">
          <div className="grid items-center gap-9 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black text-cyan-300">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">Gaming PC Repair Kuwait</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5">بي سي قيمنق</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5">GPU • FPS • حرارة</span>
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.15] text-white sm:text-5xl lg:text-6xl">
                تصليح بي سي قيمنق وGaming PC وكرت الشاشة بالكويت
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-xl">
                بي سي القيمنق يهنّق؟ يطفي وقت اللعب؟ الـFPS نازل؟ فيه تقطيع؟ أو كرت الشاشة يطلع خطوط وArtifacts؟
                <span className="font-black text-white">قل لنا شنو صاير مع الجهاز، وإحنا نبدأ من العطل نفسه، مو من تبديل أغلى قطعة.</span>
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['من 25 د.ك', 'سعر بداية تصليح Gaming PC'],
                  [turnaround, 'المدة المعتادة للأعمال المتخصصة'],
                  ['30 يوم', 'ضمان على الإصلاح المكتمل'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                    <div className="text-xl font-black text-white">{value}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-400">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 font-black text-slate-950 transition hover:bg-cyan-300">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  أرسل مشكلة الـGaming PC على الواتساب
                </a>
                <Link to="/book" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-7 py-4 font-black text-white transition hover:border-cyan-500/40 hover:text-cyan-300">
                  <Truck className="h-5 w-5" aria-hidden="true" />
                  رتب استلام الـGaming PC من منطقتك
                </Link>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                مو لازم تعرف اسم العطل. أرسل لنا <span className="font-bold text-slate-200">موديل الجهاز + كرت الشاشة + منطقتك + شنو قاعد يصير</span>، وإذا عندك فيديو قصير للعطل دزّه لنا.
              </p>
            </div>

            <figure className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950">
              <img
                src={IMAGES.gaming.diagnostics.src}
                alt="تشخيص بي سي قيمنق وكرت الشاشة داخل مختبر KCROC بالكويت"
                width={IMAGES.gaming.diagnostics.width}
                height={IMAGES.gaming.diagnostics.height}
                loading="eager"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="border-t border-slate-800 px-5 py-4 text-sm leading-6 text-slate-400">
                نشّيك على الـGaming PC وكرت الشاشة على طاولة العمل عشان نحدد مصدر المشكلة قبل لا نصلّح.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8" aria-labelledby="gaming-symptoms">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black tracking-[0.08em] text-amber-300">شنو المشكلة اللي صايرة مع جهازك؟</p>
              <h2 id="gaming-symptoms" className="mt-2 text-2xl font-black text-white sm:text-3xl">إذا جهازك يسوي واحد من هالأشياء، خلنا نبدأ من هني</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">نشخّص السبب قبل لا نبدّل قطعة</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAMING_AR_SYMPTOMS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black leading-7 text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" aria-labelledby="gaming-diagnosis">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/45 p-6 sm:p-8">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">مو كل مشكلة = تبديل GPU</p>
            <h2 id="gaming-diagnosis" className="mt-2 text-3xl font-black text-white">نبدأ من السبب، مو من أغلى قطعة</h2>
            <p className="mt-4 leading-8 text-slate-300">
              ترى نفس المشكلة ممكن تطلع من أكثر من مكان. نزول الـFPS مثلًا مو شرط يعني إن كرت الشاشة خربان؛ ممكن الحرارة، التبريد، الـRAM، الطاقة أو عدم استقرار الجهاز تحت الضغط.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {[
                'نشّيك على حرارة CPU/GPU والـhotspot وسلوك الجهاز تحت الضغط.',
                'نشّيك على المراوح أو مضخة الـAIO وتدفق الهوا والـthermal interface.',
                'نشّيك على الـGPU والـVRAM والطاقة ومشاكل الـblack screen والـartifacts.',
                'نشّيك على الـRAM والاستقرار وBIOS/VBIOS والإعدادات اللي ممكن تكون مرتبطة بالعطل.',
                'وبعد الإصلاح: نختبر استقرار الجهاز قبل لا نسلّمه لك.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950">
            <img
              src={IMAGES.gaming.zotacCard.src}
              alt="فحص كرت شاشة بي سي قيمنق في مختبر KCROC"
              width={IMAGES.gaming.zotacCard.width}
              height={IMAGES.gaming.zotacCard.height}
              loading="lazy"
              className="h-full min-h-[360px] w-full object-cover"
            />
            <figcaption className="border-t border-slate-800 px-5 py-4 text-sm leading-6 text-slate-400">
              فحص كرت الشاشة والمكونات المرتبطة به قبل اتخاذ قرار الإصلاح أو الاستبدال.
            </figcaption>
          </figure>
        </section>

        <section className="mt-10" aria-labelledby="gaming-services">
          <div className="mb-7">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">شنو نصلح؟</p>
            <h2 id="gaming-services" className="mt-2 text-3xl font-black text-white">خدمة Gaming PC عندنا تبدأ من المشكلة وتنتهي باختبار الجهاز</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['GPU وVRAM', 'نشخّص الـGPU تحت الضغط، ونفحص Artifacts وDriver Resets والطاقة والاستقرار.'],
              ['حرارة وتبريد', 'ننظف مسارات الهوا، ونفحص المراوح والـAIO والـthermal interface، وبعدين نختبر الحرارة.'],
              ['PSU وVRM والطاقة', 'نشيك ليش الجهاز يطفي أو يسوي Restart وليش الاستقرار مو مضبوط، ونفصل السبب عن باقي الاحتمالات.'],
              ['BIOS / VBIOS', 'نفحص فشل التحديث أو مشاكل الـfirmware ونشوف إذا الاستعادة ممكنة حسب حالة الجهاز.'],
              ['RAM والاستقرار', 'نشّيك على الذاكرة وإعدادات XMP/EXPO وسلوك الجهاز تحت الضغط، خصوصًا إذا المشكلة بدت بعد ترقية أو تجميعة.'],
              ['مذربورد وChip-Level', 'نشوف دوائر الطاقة والمكونات على مستوى البورد إذا كانت حالة الجهاز تستاهل إصلاح فني.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
                <Cpu className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/40" aria-labelledby="gaming-proof">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
            <div className="p-7 sm:p-9">
              <p className="text-sm font-black tracking-[0.08em] text-cyan-400">دليل بصري</p>
              <h2 id="gaming-proof" className="mt-2 text-3xl font-black text-white">شوف شنسوي داخل الورشة</h2>
              <p className="mt-4 leading-8 text-slate-400">
                بدل الكلام العام، نوريك صور فعلية من شغل الـGaming PC وكروت الشاشة والتبريد داخل ورشة KCROC.
              </p>
              <Link to="/gallery" className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-black text-white hover:border-cyan-500/40 hover:text-cyan-300">
                شوف معرض الصور <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-800 sm:grid-cols-3">
              {[
                { image: IMAGES.gaming.rgbLighting, title: 'Gaming PC وتجميعة عالية الأداء' },
                { image: IMAGES.gaming.diagnostics, title: 'طاولة تشخيص وفحص' },
                { image: IMAGES.gaming.zotacCard, title: 'كرت شاشة وفحص المكونات' },
                { image: IMAGES.gaming.waterCooled, title: 'تبريد مائي وتجميعة Custom' },
                { image: IMAGES.gaming.asusRogFan, title: 'تبريد VRM في ASUS ROG' },
                { image: IMAGES.gaming.gpuUpgrade, title: 'GPU وترقية كرت الشاشة' },
              ].map((item) => (
                <Link to="/gallery" key={item.title} className="group relative aspect-square overflow-hidden bg-slate-950">
                  <img src={item.image.src} alt={item.title} width={item.image.width} height={item.image.height} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-4 pt-10">
                    <p className="text-xs font-bold text-white">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="gaming-brands">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/45 p-6 sm:p-8">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">البراند مو فارق</p>
            <h2 id="gaming-brands" className="mt-2 text-3xl font-black text-white">نخدم Gaming PC وتجميعات من براندات مختلفة</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {GAMING_AR_BRANDS.map((brand) => (
                <span key={brand} className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-bold text-slate-200">{brand}</span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              المهم شنو المشكلة، مو شنو مكتوب على الجهاز. وإذا تبي صيانة بي سي قيمنق أو تصليح كمبيوتر ألعاب، نبدأ من العطل ونحدد السبب أول شي.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/45 p-6 sm:p-8">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">ساكن بأي منطقة؟ ما عليك</p>
            <h2 className="mt-2 text-3xl font-black text-white">نستلم الـGaming PC من منطقتك بالكويت</h2>
            <p className="mt-3 leading-8 text-slate-400">مختبر KCROC في حولي، بس مو لازم تشيل البرج وتوديه بنفسك. إذا تبي <strong>فني كمبيوتر حولي</strong> أو تبي <strong>تصليح كمبيوتر استلام وتوصيل</strong> من منطقتك، دز لنا موقعك ونرتب الاستلام ونرجع الجهاز لك بعد الإصلاح والاختبار.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {GAMING_AR_AREAS.map((area) => (
                <Link key={area.path} to={area.path} className="rounded-full border border-slate-800 bg-slate-950/60 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="gaming-process">
          <div className="mb-7">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">من أول رسالة لين يرجع جهازك</p>
            <h2 id="gaming-process" className="mt-2 text-3xl font-black text-white">طريقة الشغل سهلة وواضحة</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'أرسل المشكلة', 'الموديل + الكرت + منطقتك + شنو قاعد يصير، وإذا تقدر دز فيديو قصير.'],
              ['02', 'نستلم الجهاز', 'نرتب استلام الجهاز من منطقتك ونوصله لمختبر KCROC في حولي.'],
              ['03', 'نشخّص ونشرح', 'نقول لك شنو السبب وشنو خيارات الإصلاح والتكلفة قبل لا نبدأ.'],
              ['04', 'نصلح ونختبر', 'بعد الإصلاح نختبر الجهاز زين قبل لا نرجعه لك.'],
            ].map(([n, title, text]) => (
              <article key={n} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="text-4xl font-black text-cyan-500/30">{n}</div>
                <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2" aria-labelledby="gaming-confidence">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/45 p-6 sm:p-8">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">ليش KCROC؟</p>
            <h2 id="gaming-confidence" className="mt-2 text-3xl font-black text-white">هذي الأشياء تهمك قبل لا تسلمنا جهازك</h2>
            <div className="mt-6 grid gap-3">
              {[
                ['تشخيص قبل الإصلاح', 'ما نبدل GPU أو مذربورد لمجرد إن العَرَض شكله كبير.'],
                ['No Fix, No Fee', 'للحالات المؤهلة حسب سياسة KCROC: إذا ما صار الإصلاح، ما عليك رسوم إصلاح وفق الشروط.'],
                ['ضمان 30 يوم', 'الإصلاح المكتمل عليه ضمان 30 يوم حسب سياسة KCROC.'],
                ['استلام وتوصيل مجاني', 'الاستلام والتوصيل متوفر داخل الكويت.'],
                ['مختبر ESD-Safe', 'الأعمال الحساسة نسويها في بيئة ESD-Safe مناسبة للإلكترونيات الدقيقة.'],
                ['اختبار قبل التسليم', 'مو هدفنا بس إن الجهاز يشتغل؛ نختبر سلوكه واستقراره بعد الإصلاح قبل التسليم.'],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <div>
                    <h3 className="font-black text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
            <p className="text-sm font-black tracking-[0.08em] text-amber-300">قبل لا ترسل الجهاز</p>
            <h2 className="mt-2 text-3xl font-black text-white">دز لنا هالأربع معلومات وخلك أسرع في التشخيص</h2>
            <div className="mt-6 grid gap-3">
              {[
                'اسم الجهاز أو موديل الـmotherboard إذا تعرفه',
                'نوع كرت الشاشة GPU',
                'منطقتك بالكويت',
                'شنو يصير بالضبط ومتى يصير — وإذا عندك فيديو دزّه',
              ].map((item, idx) => (
                <div key={item} className="rounded-2xl border border-amber-500/15 bg-black/10 p-4">
                  <div className="text-xs font-black text-amber-300">0{idx + 1}</div>
                  <div className="mt-1 font-bold leading-6 text-white">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="gaming-faq">
          <div className="mb-7">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">الأسئلة اللي نسأل عنها وايد</p>
            <h2 id="gaming-faq" className="mt-2 text-3xl font-black text-white sm:text-4xl">قبل لا تقول: "أبي أبدّل الكرت"</h2>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/40">
            {GAMING_AR_FAQ.map((item) => (
              <details key={item.q} className="group border-b border-slate-800 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-black text-white [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-400 transition group-open:-rotate-90" aria-hidden="true" />
                </summary>
                <div className="px-6 pb-6 text-sm leading-8 text-slate-400">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/95 to-slate-950 p-7 shadow-2xl sm:p-10 lg:p-12" aria-labelledby="gaming-final-cta">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-black text-cyan-300">
                <span>4.9 ★ من 153+ مراجعة</span>
                <span className="text-slate-600">•</span>
                <span>استلام وتوصيل داخل الكويت</span>
              </div>
              <h2 id="gaming-final-cta" className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                الـGaming PC عندك فيه مشكلة؟ لا تحتار — دز لنا شنو قاعد يصير
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                مو لازم تعرف هل المشكلة GPU أو PSU أو RAM أو حرارة. دز لنا اللي تعرفه عن المشكلة، وإحنا نبدأ من المكان الصح.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-[290px]">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 font-black text-slate-950 transition hover:bg-cyan-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                دز واتساب لفني KCROC
              </a>
              <Link to="/book" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-7 py-4 font-black text-white hover:border-cyan-500/40 hover:text-cyan-300">
                <Truck className="h-5 w-5" aria-hidden="true" />
                رتب الاستلام
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-800/70 pt-7">
          <Link to="/ar/computer-repair-kuwait" className="rounded-full border border-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">تصليح كمبيوتر</Link>
          <Link to="/ar/motherboard-repair-kuwait" className="rounded-full border border-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">تصليح مذربورد</Link>
          <Link to="/gaming-laptop-cleaning-kuwait" className="rounded-full border border-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">تنظيف Gaming Laptop</Link>
          <Link to="/blog/gaming-pc-cooling" className="rounded-full border border-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">دليل تبريد Gaming PC</Link>
          <Link to="/guides/bios-uefi-recovery-kuwait" className="rounded-full border border-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300">دليل BIOS / UEFI</Link>
        </div>
      </main>
    </div>
  );
}

function ArabicComputerRepairPage({
  page,
  business,
  wa,
}: {
  page: ArabicComputerPage;
  business: NonNullable<typeof KCROC_GRAPH.business>;
  wa: string;
}) {
  const faq = [
    {
      q: 'هل تستلمون الجهاز من البيت أو المكتب؟',
      a: 'نعم. أرسل لنا منطقتك وموديل الجهاز ووصف المشكلة عبر واتساب، ونرتب خدمة الاستلام والتوصيل حسب منطقتك.',
    },
    {
      q: 'هل لازم أروح إلى حولي؟',
      a: 'لا. مختبر KCROC في حولي، لكن يمكنك طلب الاستلام من موقعك داخل مناطق الخدمة ثم نرجع الجهاز لك بعد الفحص والإصلاح والاختبار.',
    },
    {
      q: 'هل تبدلون المذربورد كاملة مباشرة؟',
      a: 'ليس بالضرورة. نشخّص العطل أولًا، وإذا كان إصلاح المكوّنات ممكنًا ومناسبًا للجهاز نشرح لك خيار الإصلاح قبل استبدال اللوحة كاملة.',
    },
    {
      q: 'هل تعطوني السعر قبل الإصلاح؟',
      a: 'نعم. بعد التشخيص نوضح المشكلة وخيارات الإصلاح والتكلفة، ولا نبدأ الإصلاح بدون موافقتك.',
    },
    {
      q: 'كم يستغرق تصليح الكمبيوتر؟',
      a: 'المدة تختلف حسب نوع العطل وتوفر القطع ودرجة تعقيد الإصلاح. بعض الحالات البسيطة تنتهي بسرعة، بينما أعطال اللوحة أو الأضرار المعقدة تحتاج وقتًا أكبر للفحص والاختبار.',
    },
    {
      q: 'هل تصلحون جهازًا تعرض للماء أو القهوة؟',
      a: 'نعم، يمكن تقييم أضرار السوائل والتآكل وحالة اللوحة. من الأفضل إيقاف تشغيل الجهاز وعدم تكرار محاولة تشغيله وإرساله للفحص بأسرع وقت ممكن.',
    },
    {
      q: 'هل إصلاح الكمبيوتر يحافظ على ملفاتي؟',
      a: 'التشخيص الهاردويري عادة لا يحتاج إلى تصفح ملفاتك. نحن نتعامل مع الجهاز بعناية، وأي خطوة قد تؤثر على وحدة التخزين تكون محل توضيح قبل تنفيذها.',
    },
    {
      q: 'هل يوجد ضمان على الإصلاح؟',
      a: 'نعم، الإصلاحات المكتملة مشمولة بضمان 30 يومًا وفق شروط الضمان.',
    },
    {
      q: 'ماذا لو لم يمكن إصلاح الجهاز؟',
      a: 'وفق سياسة No Fix, No Fee، إذا تعذر إتمام الإصلاح فلا تُفرض أجور الإصلاح.',
    },
  ];

  const schema = {
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${page.seo.canonicalUrl}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'Service',
        '@id': `${page.seo.canonicalUrl}#service`,
        name: 'تصليح كمبيوتر ولابتوب في الكويت',
        serviceType: 'Computer and laptop repair',
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        provider: { '@type': 'LocalBusiness', name: business.legalName || business.title, telephone: business.telephone },
        url: page.seo.canonicalUrl,
      },
    ],
  };

  const trustItems = [
    { icon: CircleCheck, label: 'تشخيص قبل الإصلاح', text: 'نفهم سبب المشكلة أولًا.' },
    { icon: Truck, label: 'استلام وتوصيل مجاني', text: 'من البيت أو المكتب داخل الكويت.' },
    { icon: ShieldCheck, label: 'ضمان 30 يومًا', text: 'على الإصلاحات المكتملة.' },
    { icon: Microscope, label: 'مختبر ESD', text: 'بيئة مناسبة للتعامل مع الإلكترونيات الدقيقة.' },
  ];

  const steps = [
    { n: '01', title: 'أرسل تفاصيل جهازك', text: 'الموديل + المنطقة + وصف بسيط للمشكلة على واتساب.' },
    { n: '02', title: 'نستلم الجهاز', text: 'نرتب الاستلام من موقعك ونسجل الحالة عند وصول الجهاز.' },
    { n: '03', title: 'نشخّص ونشرح', text: 'نحدد سبب المشكلة ونوضح خيارات الإصلاح والتكلفة.' },
    { n: '04', title: 'نصلح بعد موافقتك', text: 'يتم تنفيذ الإصلاح ثم اختبار الجهاز قبل إرجاعه.' },
  ];

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId={page.id} />
      <SchemaMarkup schema={schema} />

      <main id="main-content" className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="مسار التنقل" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition-colors hover:text-cyan-300">الرئيسية</Link>
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-slate-300">تصليح كمبيوتر في الكويت</span>
        </nav>

        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-slate-950/65 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.08),transparent_32%)]" />
          <div className="relative grid items-stretch lg:grid-cols-[1.12fr_0.88fr]">
            <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-black text-cyan-300">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                فحص واضح • عرض سعر قبل الإصلاح
              </div>

              <p className="mt-7 text-sm font-black tracking-[0.08em] text-cyan-400">فني كمبيوتر وخدمة استلام من الباب</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                تصليح كمبيوتر ولابتوب في الكويت
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                جهازك خربان؟ يعلّق؟ يطفي؟ ما يشحن؟ أو حرارته ارتفعت؟ في KCROC نبدأ من <strong className="text-white">سبب المشكلة</strong>، مو من أول قطعة نقدر نبدلها.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
                نستلم جهازك من البيت أو المكتب، نفحصه في مختبرنا في حولي، نشرح لك الحل والتكلفة، ثم نبدأ الإصلاح فقط بعد موافقتك ونختبر الجهاز قبل إرجاعه لك.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  واتساب الفني
                </a>
                <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-7 py-3.5 font-black text-white transition hover:border-cyan-500/50 hover:text-cyan-300">
                  <Truck className="h-5 w-5" aria-hidden="true" />
                  احجز استلام الجهاز
                </Link>
                <a href={`tel:+${business.telephone}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-800 px-6 py-3.5 font-bold text-slate-300 transition hover:border-slate-600 hover:text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  ${business.telephone.replace(/^\+?965/, '')}
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-4">
                {[
                  ['500+', 'جهاز تم إصلاحه'],
                  ['4.9 ★', '153+ مراجعة'],
                  ['30 يوم', 'ضمان على الإصلاح'],
                  ['No Fix', 'No Fee'],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-slate-800 bg-black/15 px-4 py-4 text-center">
                    <div className="text-xl font-black text-white">{value}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden border-t border-slate-800 lg:min-h-full lg:border-r lg:border-t-0">
              <img
                src={IMAGES.brand.technicians.src}
                alt="فنيون من KCROC يعملون على أجهزة الكمبيوتر واللابتوب داخل الورشة في حولي"
                width={IMAGES.brand.technicians.width}
                height={IMAGES.brand.technicians.height}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 right-5 left-5 rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-black text-white">
                  <MapPin className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  مختبر KCROC — حولي
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">فحص، إصلاح، اختبار — ثم إرجاع الجهاز بعد التأكد من حالته.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="مزايا KCROC">
          {trustItems.map(({ icon: Icon, label, text }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 backdrop-blur-md">
              <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              <h2 className="mt-4 font-black text-white">{label}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16" aria-labelledby="why-repair">
          <div className="max-w-3xl">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">الفرق الحقيقي</p>
            <h2 id="why-repair" className="mt-2 text-3xl font-black text-white sm:text-4xl">مو كل مذربورد خربانة لازم تتبدل</h2>
            <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
              أحيانًا يكون العطل في مكوّن أو دائرة داخل اللوحة نفسها. لذلك نحدد العطل أولًا ونقيّم إمكانية الإصلاح على مستوى المكوّنات قبل القفز مباشرة إلى استبدال اللوحة كاملة.
            </p>
          </div>
          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-cyan-500/20 bg-cyan-950/15 p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Cpu className="h-7 w-7 text-cyan-400" aria-hidden="true" />
                <h3 className="text-xl font-black text-white">نصلح المكوّن عندما يكون الإصلاح ممكنًا</h3>
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                {[
                  'تشخيص دوائر الطاقة والشحن بدل التخمين.',
                  'تحديد المكوّن أو المسار المتسبب بالمشكلة عند إمكانية ذلك.',
                  'شرح خيار الإصلاح وتكلفته قبل التنفيذ.',
                  'اختبار الجهاز بعد الإصلاح بدل الاكتفاء بعودة التشغيل.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45">
              <img
                src={IMAGES.services.motherboardRepair.src}
                alt="إصلاح متقدم للوحة أم على مستوى المكونات في KCROC"
                width={IMAGES.services.motherboardRepair.width}
                height={IMAGES.services.motherboardRepair.height}
                loading="lazy"
                className="h-full min-h-[300px] w-full object-cover"
              />
              <figcaption className="border-t border-slate-800 px-5 py-4 text-sm text-slate-400">صورة من مجموعة صور الإصلاح في KCROC — أعمال اللوحات والمكونات.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="repair-process">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black tracking-[0.08em] text-cyan-400">من أول رسالة إلى تسليم الجهاز</p>
              <h2 id="repair-process" className="mt-2 text-3xl font-black text-white sm:text-4xl">كيف يتم الإصلاح في KCROC؟</h2>
            </div>
            <Link to="/book" className="inline-flex items-center gap-2 text-sm font-black text-cyan-300 hover:text-cyan-200">
              رتب الاستلام <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {steps.map((step) => (
              <article key={step.n} className="relative rounded-3xl border border-slate-800 bg-slate-900/45 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-cyan-500/30">{step.n}</span>
                  <ClipboardCheck className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="arabic-services-premium">
          <div className="mb-8">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">الخدمات</p>
            <h2 id="arabic-services-premium" className="mt-2 text-3xl font-black text-white sm:text-4xl">الخدمة تبدأ من العطل الذي عندك</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">ما تحتاج تعرف اسم القطعة. قل لنا ماذا يحدث لجهازك، واختر الصفحة الأقرب لمشكلتك.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AR_COMPUTER_SERVICE_CARDS.map((item) => (
              <Link key={item.path} to={item.path} className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/70">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image.src} alt={item.title} width={item.image.width} height={item.image.height} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-cyan-200 backdrop-blur">خدمة KCROC</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black leading-7 text-white group-hover:text-cyan-300">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-300">
                    اعرف أكثر <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40" aria-labelledby="workshop-proof">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="p-7 sm:p-9 lg:p-10">
              <p className="text-sm font-black tracking-[0.08em] text-cyan-400">صور من أعمالنا</p>
              <h2 id="workshop-proof" className="mt-2 text-3xl font-black text-white sm:text-4xl">شوف شنو نسوي داخل الورشة</h2>
              <p className="mt-4 leading-8 text-slate-400">بدل ما نقول لك فقط "نحن محترفون"، نعرض لك صورًا فعلية من مجموعة KCROC للخدمة والإصلاح والصيانة.</p>
              <Link to="/gallery" className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-black text-white transition hover:border-cyan-500/50 hover:text-cyan-300">
                فتح معرض الصور <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-800 sm:grid-cols-3">
              {AR_COMPUTER_PROOF_IMAGES.map((item) => (
                <Link to="/gallery" key={item.title} className="group relative aspect-square overflow-hidden bg-slate-950">
                  <img src={item.image.src} alt={item.title} width={item.image.width} height={item.image.height} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-4 pt-10">
                    <p className="text-xs font-bold text-white">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="local-service">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/45 p-7 sm:p-9">
              <p className="text-sm font-black tracking-[0.08em] text-cyan-400">خدمة الكويت</p>
              <h2 id="local-service" className="mt-2 text-3xl font-black text-white sm:text-4xl">ما تحتاج تودي الجهاز بنفسك إلى حولي</h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">مختبر KCROC في حولي، لكن خدمة الاستلام والتوصيل مصممة لتسهيل الموضوع على العميل في مناطق الكويت. أرسل منطقتك، ونرتب لك الخطوة التالية.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {LOCAL_LINKS.map((item) => (
                  <Link key={item.path} to={item.path} className="rounded-full border border-slate-800 bg-black/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300">{item.label}</Link>
                ))}
              </div>
              <Link to="/ar/near-me" className="mt-7 inline-flex items-center gap-2 font-black text-cyan-300 hover:text-cyan-200">
                فني كمبيوتر وتصليح لابتوب بالقرب مني <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45">
              <img src={IMAGES.brand.shopEntrance.src} alt="مدخل مختبر KCROC في مجمع المُلّا بحولي" width={IMAGES.brand.shopEntrance.width} height={IMAGES.brand.shopEntrance.height} loading="lazy" className="h-full min-h-[320px] w-full object-cover" />
              <figcaption className="border-t border-slate-800 px-5 py-4 text-sm leading-6 text-slate-400">مختبر KCROC في حولي — استلام الجهاز وفحصه وإصلاحه ثم اختباره قبل الإرجاع.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="decision-help">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/45 p-7 sm:p-9">
              <p className="text-sm font-black tracking-[0.08em] text-cyan-400">قبل قرار الإصلاح</p>
              <h2 id="decision-help" className="mt-2 text-2xl font-black text-white sm:text-3xl">معلومات مفيدة من KCROC</h2>
              <div className="mt-6 space-y-3">
                {AR_GUIDES.map((item) => (
                  <Link key={item.path} to={item.path} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-black/10 p-4 transition hover:border-cyan-500/40">
                    <span className="font-bold leading-7 text-slate-200 group-hover:text-cyan-300">{item.title}</span>
                    <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-7 sm:p-9">
              <div className="flex items-center gap-2 text-amber-300">
                <Gauge className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-black">نصيحة قبل إرسال الجهاز</span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-white">أرسل المعلومة التي عندك، مو لازم تعرف العطل</h3>
              <p className="mt-3 leading-8 text-slate-300">صورة، فيديو قصير، رسالة الخطأ، أو وصف بسيط مثل "يطفي وقت اللعب" أو "ما يشحن" يساعد الفني يبدأ من المكان الصحيح.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['موديل الجهاز', 'المنطقة', 'وصف المشكلة'].map((item, idx) => (
                  <div key={item} className="rounded-2xl border border-amber-500/15 bg-black/10 p-4 text-center">
                    <div className="text-xs font-black text-amber-300">0{idx + 1}</div>
                    <div className="mt-1 text-sm font-bold text-white">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="arabic-faq-premium">
          <div className="mb-7 max-w-3xl">
            <p className="text-sm font-black tracking-[0.08em] text-cyan-400">الأسئلة الشائعة</p>
            <h2 id="arabic-faq-premium" className="mt-2 text-3xl font-black text-white sm:text-4xl">قبل لا ترسل جهازك</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-slate-800 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-black text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition group-open:rotate-90 group-open:border-cyan-500/40 group-open:text-cyan-300">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-8 text-slate-400">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-7 shadow-2xl sm:p-10 lg:p-12" aria-labelledby="final-cta">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-cyan-300">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                4.9 ★ من 153+ مراجعة
              </div>
              <h2 id="final-cta" className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">قول لنا المشكلة مثل ما هي — والباقي علينا</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">أرسل موديل الجهاز، منطقتك، ووصفًا بسيطًا للعطل على واتساب. نبدأ من التشخيص ونوضح لك الخطوة التالية قبل الإصلاح.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 transition hover:bg-cyan-400">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                تواصل مع فني KCROC
              </a>
              <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-7 py-3.5 font-black text-white transition hover:border-cyan-500/40 hover:text-cyan-300">
                <Truck className="h-5 w-5" aria-hidden="true" />
                رتب الاستلام المجاني
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-4 border-t border-slate-800/70 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-black text-slate-300">KCROC — Kuwait Computer Repair On Call</div>
            <div className="mt-1">مختبرنا في حولي • مفتوح يوميًا 10 صباحًا – 10 مساءً</div>
          </div>
          <a href={`tel:+${business.telephone}`} className="inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.telephone}
          </a>
        </footer>
      </main>
    </div>
  );
}

function getArabicComputerPage() {
  return KCROC_GRAPH.pages.find((item) => item.slug === 'ar/computer-repair-kuwait');
}

type ArabicComputerPage = NonNullable<ReturnType<typeof getArabicComputerPage>>;

export default function ArabicCommercialPage() {
  const { slug } = useParams<{ slug: string }>();
  const cfg = slug ? CONFIG[slug] : undefined;
  const page = slug ? KCROC_GRAPH.pages.find((item) => item.slug === `ar/${slug}`) : undefined;
  const business = KCROC_GRAPH.business;

  if (!cfg || !page || !business) return <Navigate to="/404" replace />;

  const wa = `https://wa.me/${business.telephone}?text=${encodeURIComponent(`السلام عليكم KCROC، أحتاج ${cfg.h1}. أريد أعرف طريقة الاستلام والتشخيص.`)}`;

  if (slug === 'computer-repair-kuwait') {
    return <ArabicComputerRepairPage page={page as ArabicComputerPage} business={business} wa={wa} />;
  }
  if (slug === 'gaming-pc-repair-kuwait') {
    return <ArabicGamingPcRepairPage page={page} business={business} wa={wa} />;
  }
  const services = cfg.serviceIds
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter(Boolean);
  const arabicServicePathById: Record<string, string> = {
    'srv-laptop': '/ar/laptop-repair-kuwait',
    'srv-motherboard': '/ar/motherboard-repair-kuwait',
    'srv-gaming': '/ar/gaming-pc-repair-kuwait',
    'srv-screen': '/ar/laptop-screen-repair-kuwait',
    'srv-macbook': '/ar/macbook-repair-kuwait',
    'srv-macbook-screen': '/ar/macbook-screen-replacement-kuwait',
    'srv-battery': '/ar/battery-replacement-kuwait',
    'srv-ssd-ram': '/ar/ssd-ram-upgrade-kuwait',
    'srv-gaming-laptop': '/ar/gaming-laptop-repair-kuwait',
  };
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
              <Link key={service.id} to={arabicServicePathById[service.id] ?? `/${service.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-900/45 p-6 hover:border-cyan-500/40">
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
              <h2 id="arabic-local" className="text-2xl font-black text-white">استلام من منطقتك بالكويت</h2>
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
