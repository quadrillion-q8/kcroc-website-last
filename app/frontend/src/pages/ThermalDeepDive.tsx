import React from 'react';
import { Link } from 'react-router-dom';
import './ThermalDeepDive.css';

type Props = { ar: boolean };
const data = {
  en: {
    env: {
      eyebrow: 'KUWAIT DUST · EVERYDAY LAPTOPS',
      title: 'Why dust and warm rooms can strain laptop cooling',
      paragraphs: [
        'Everyday student, office and home laptops rely on narrow vents and compact heatsink fins. Dust, fabric lint and restricted exhaust airflow make a cooling fan work harder. Warm surroundings also reduce the temperature difference available for dissipating heat.',
        'Airflow obstruction and poor thermal contact are separate problems. Dust buildup may respond to a careful internal clean; a deteriorated processor-to-heatsink interface may justify fresh thermal material after inspection. Neither condition should be assumed without testing.'
      ],
      items: [
        ['Restricted airflow', 'Lint and dust can block fan blades and heatsink fins even while the fan continues to spin.'],
        ['Thermal-interface condition', 'Repasting is appropriate only when testing, the existing interface or heatsink removal supports it.']
      ]
    },
    compare: {
      eyebrow: 'EVIDENCE BEFORE REPLACEMENT',
      title: 'Internal dust cleaning vs. thermal paste replacement',
      intro: 'A noisy fan does not automatically mean dried paste. We inspect first and select the minimum justified work.',
      headings: ['Decision', 'Deep internal dust cleaning', 'Condition-based thermal interface service'],
      rows: [
        ['Main goal', 'Clear fan, exhaust and heatsink airflow paths', 'Restore appropriate contact between processor and heatsink'],
        ['Typical trigger', 'Visible or measured airflow restriction, packed dust or lint', 'Abnormal temperatures after airflow checks, damaged interface or heatsink removal'],
        ['Lab work', 'Model-safe opening, fan and fin cleaning, accessible dust extraction', 'Remove old compound when indicated, prepare contact surfaces and apply compatible material'],
        ['Why separate them?', 'Avoid disturbing an intact factory thermal seal', 'Avoid unnecessary repasting and model-incompatible compounds']
      ]
    },
    support: {
      eyebrow: 'SUPPORTED DEVICE SCOPE',
      title: 'For everyday, student and business Windows laptops',
      intro: 'We inspect supported models from Dell Inspiron, Latitude and XPS; HP Pavilion, ProBook and EliteBook; Lenovo IdeaPad and ThinkPad; and ASUS VivoBook, Zenbook and Acer Aspire or Swift. Creator and convertible models depend on safe access and parts compatibility.',
      splitTitle: 'Different laptop? Choose the right service',
      links: [
        ['/gaming-laptop-cleaning-kuwait','Gaming Laptop Cleaning & Thermal Repaste','ROG, Legion, MSI, Alienware, Predator, OMEN and other high-power cooling assemblies'],
        ['/macbook-repair-kuwait','MacBook Repair','Model-specific Apple cooling and internal hardware assessment'],
        ['/laptop-repair-kuwait','Laptop Repair','Broader diagnosis when heat symptoms overlap with charging or motherboard faults'],
        ['/laptop-fan-replacement-kuwait','Laptop Cooling Fan Replacement','For seized fans, bearing noise and verified failed fan assemblies']
      ]
    },
    terms: {
      eyebrow: 'PUBLISHED GUIDE · QUOTE FIRST',
      title: 'Laptop cleaning and thermal paste service price in Kuwait',
      price: '15–20 KWD',
      priceDetail: 'Published guide range for standard laptop thermal service; final scope and price confirmed after inspection.',
      diagnostic: '0 KWD initial diagnosis',
      timing: 'Typical same day / 24 hours',
      timingDetail: 'Subject to lab queue, laptop model, technician inspection and parts availability. Not guaranteed.',
      note: 'Cooling fan replacement, motherboard faults or other repairs are quoted separately, and no paid work begins without approval. Our 30-day repair warranty applies to covered completed work under published terms.',
      pickupTitle: 'Free pickup and return throughout Kuwait',
      pickup: 'Customers in Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, Ahmadi, Mahboula, Mangaf, Mubarak Al-Kabeer and other serviced areas can arrange collection. All disassembly and testing happens at our single Hawalli laboratory — Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. We do not perform repairs at the customer’s home.',
      guideTitle: 'Related educational guide: gaming-laptop dust and repaste intervals'
    }
  },
  ar: {
    env: {
      eyebrow: 'غبار الكويت · لابتوبات الاستخدام اليومي',
      title: 'ليش غبار الكويت والجو الحار يأثرون على تبريد اللابتوب؟',
      paragraphs: [
        'لابتوبات الدراسة والمكتب والبيت فيها فتحات تهوية ضيقة ومشتتات صغيرة. الغبار والوبر ممكن يسدون مسار الهواء ويخلون المروحة تشتغل أكثر، والجو الحار يقلل قدرة الجهاز على طرد الحرارة.',
        'انسداد الهواء وضعف التلامس الحراري مشكلتين مختلفتين. بعض الأجهزة تحتاج تنظيف غبار فقط، وبعضها تحتاج معجون مناسب بعد الفحص. ما نفترض إن المعجون خربان لمجرد ارتفاع صوت المروحة.'
      ],
      items: [
        ['انسداد مجرى الهواء', 'الغبار يتجمع على المروحة وزعانف المشتت حتى لو المروحة تدور.'],
        ['حالة المعجون الحراري', 'نبدّله إذا الفحص أو حالة التلامس أو فك المشتت يستدعي هالشي.']
      ]
    },
    compare: {
      eyebrow: 'نفحص قبل ما نبدّل',
      title: 'شنو الفرق بين تنظيف الغبار وتبديل المعجون الحراري؟',
      intro: 'مو كل مروحة صوتها عالي معناها المعجون ناشف. نحدد المشكلة أول ونختار الشغل المطلوب فقط.',
      headings: ['المقارنة', 'تنظيف الغبار الداخلي', 'خدمة المعجون حسب الحالة'],
      rows: [
        ['الهدف', 'فتح مسار الهواء بالمروحة والمشتت والفتحات', 'تحسين نقل الحرارة بين المعالج والمشتت'],
        ['متى نحتاجه؟', 'إذا في غبار أو وبر متراكم أو الهواء ضعيف', 'إذا الحرارة غير طبيعية بعد فحص الهواء أو التلامس متضرر أو المشتت انفك'],
        ['شغل المختبر', 'فتح آمن حسب الموديل وتنظيف المروحة والزعانف', 'تنظيف السطح ووضع مادة حرارية متوافقة عند الحاجة'],
        ['ليش نفصل الخدمتين؟', 'ما نلمس المعجون الأصلي إذا سليم', 'نتجنب تبديل غير ضروري أو استخدام مادة مو مناسبة']
      ]
    },
    support: {
      eyebrow: 'الموديلات المشمولة',
      title: 'للابتوبات العادية والدراسة والشغل بنظام Windows',
      intro: 'نفحص موديلات مدعومة مثل Dell Inspiron وLatitude وXPS، وHP Pavilion وProBook وEliteBook، وLenovo IdeaPad وThinkPad، وASUS VivoBook وZenbook، وAcer Aspire وSwift. الأجهزة الرفيعة أو القابلة للتحول تعتمد على إمكانية الفك الآمن وتوافق القطع.',
      splitTitle: 'جهازك قيمنق أو ماك؟ اختار الخدمة المتخصصة',
      links: [
        ['/gaming-laptop-cleaning-kuwait','تنظيف وتبريد لابتوب القيمنق','أجهزة ROG وLegion وMSI وAlienware وPredator وOMEN وأنظمة التبريد القوية'],
        ['/macbook-repair-kuwait','تصليح ماك بوك','فحص تبريد Apple والهاردوير حسب الموديل'],
        ['/laptop-repair-kuwait','تصليح اللابتوب','إذا السخونة مرتبطة بالشحن أو أعطال المذربورد'],
        ['/laptop-fan-replacement-kuwait','تبديل مروحة اللابتوب','إذا ثبت تلف المروحة أو البيرنق']
      ]
    },
    terms: {
      eyebrow: 'سعر إرشادي منشور · موافقتك قبل الشغل',
      title: 'سعر تنظيف اللابتوب وخدمة المعجون الحراري بالكويت',
      price: '15–20 د.ك',
      priceDetail: 'المدى الإرشادي المنشور لخدمة تبريد اللابتوب العادي. السعر النهائي يعتمد على فحص جهازك والشغل المطلوب.',
      diagnostic: 'الفحص الأولي 0 د.ك',
      timing: 'المدة المعتادة نفس اليوم أو 24 ساعة',
      timingDetail: 'حسب زحمة المختبر وموديل الجهاز ونتيجة الفحص وتوفر القطع، مو وعد ثابت.',
      note: 'تبديل المروحة أو تصليح المذربورد أو أي شغل إضافي له عرض سعر منفصل. ما نبدأ شغل مدفوع إلا بعد موافقتك، والضمان 30 يوم على الإصلاحات المكتملة المشمولة حسب الشروط المنشورة.',
      pickupTitle: 'استلام وتوصيل مجاني بجميع مناطق الكويت',
      pickup: 'نوفر الاستلام والتوصيل من حولي والسالمية ومدينة الكويت والفروانية والجهراء والأحمدي والمهبولة والمنقف ومبارك الكبير وباقي المناطق المخدومة. الشغل داخل مختبرنا الوحيد بحولي، شارع ابن خلدون، مجمع الملا، السرداب محل 19. ما نقدم تصليح داخل بيت العميل.',
      guideTitle: 'دليل توعوي مرتبط: مواعيد تنظيف لابتوبات القيمنق وتغيير المعجون'
    }
  }
} as const;

export function ThermalClimate({ ar }: Props) {
  const t = ar ? data.ar.env : data.en.env;
  return <section data-thermal-section="environment" className="kcroc-thermal-section kcroc-thermal-climate" aria-labelledby="thermal-env-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-env-title">{t.title}</h2>
    <div className="kcroc-thermal-climate-grid"><div>{t.paragraphs.map(x=><p key={x}>{x}</p>)}</div><div className="kcroc-thermal-note-stack">{t.items.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div>
  </div></section>;
}

export function ThermalComparison({ ar }: Props) {
  const t = ar ? data.ar.compare : data.en.compare;
  return <section data-thermal-section="comparison" className="kcroc-thermal-section kcroc-thermal-comparison" aria-labelledby="thermal-compare-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-compare-title">{t.title}</h2><p className="kcroc-thermal-lead">{t.intro}</p>
    <div className="kcroc-thermal-table-scroll" role="region" aria-label={t.title} tabIndex={0}><table className="kcroc-thermal-table"><thead><tr>{t.headings.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{t.rows.map(([heading,dust,paste])=><tr key={heading}><th scope="row">{heading}</th><td>{dust}</td><td>{paste}</td></tr>)}</tbody></table></div>
  </div></section>;
}

export function ThermalServiceDetails({ ar }: Props) {
  const t = ar ? data.ar : data.en;
  return <div data-thermal-section="practical">
    <section className="kcroc-thermal-section kcroc-thermal-coverage" aria-labelledby="thermal-devices-title"><div className="kcroc-repair-container">
      <p className="kcroc-repair-eyebrow">{t.support.eyebrow}</p><h2 id="thermal-devices-title">{t.support.title}</h2><p className="kcroc-thermal-lead">{t.support.intro}</p>
      <h3 className="kcroc-thermal-subtitle">{t.support.splitTitle}</h3><div className="kcroc-thermal-service-grid">{t.support.links.map(([href,title,description])=><Link key={href} className="kcroc-thermal-service-card" to={ar ? '/ar'+href : href}><strong>{title}</strong><span>{description}</span></Link>)}</div>
    </div></section>
    <section className="kcroc-thermal-section kcroc-thermal-terms" aria-labelledby="thermal-price-title"><div className="kcroc-repair-container">
      <p className="kcroc-repair-eyebrow">{t.terms.eyebrow}</p><h2 id="thermal-price-title">{t.terms.title}</h2>
      <div className="kcroc-thermal-price-grid">
        <div className="kcroc-thermal-price-primary"><strong className="kcroc-thermal-price-value">{t.terms.price}</strong><p>{t.terms.priceDetail}</p><Link to={ar ? '/ar/pricing#thermal' : '/pricing#thermal'}>{ar ? 'شوف قائمة الأسعار المنشورة' : 'See published repair pricing'}</Link></div>
        <div className="kcroc-thermal-price-secondary"><strong>{t.terms.diagnostic}</strong><strong>{t.terms.timing}</strong><p>{t.terms.timingDetail}</p></div>
      </div><p className="kcroc-thermal-terms-note">{t.terms.note}</p><Link data-thermal-book-cta="true" className="kcroc-thermal-book" to={ar ? '/ar/book' : '/book'}>{ar ? 'احجز استلام لابتوبك مجاناً' : 'Book free laptop pickup'}</Link>
      <div className="kcroc-thermal-pickup"><h3>{t.terms.pickupTitle}</h3><p>{t.terms.pickup}</p><Link to={ar ? '/ar/computer-repair-hawalli' : '/location/hawalli'}>{ar ? 'معلومات مختبر حولي' : 'Hawalli repair lab details'}</Link></div>
      <p className="kcroc-thermal-guide"><Link to={ar ? '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait' : '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait'}>{t.terms.guideTitle}</Link></p>
    </div></section>
  </div>;
}
