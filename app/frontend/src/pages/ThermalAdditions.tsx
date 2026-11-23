import React from 'react';
import { Link } from 'react-router-dom';
import './ThermalAdditions.css';

type Props = { ar: boolean };

const editorial = {
  en: {
    precision: {
      eyebrow: 'COMPACT CHASSIS · PRECISION CARE',
      title: 'Why thin and business laptops need model-specific cleaning',
      intro: 'Slim blower fans, tightly packed heatsink fins and delicate ribbon cables need careful access. External vent cleaning and processor repasting are not interchangeable procedures.',
      heads: ['Approach', 'What can happen', 'What we check'],
      rows: [
        ['Compressed air through an external vent', 'An uncontrolled blast can move a lint blockage farther into the fin stack or overspin a fan.', 'Inspect the hidden exhaust side of the heatsink and restrain the fan before cleaning where appropriate.'],
        ['Repasting every laptop by default', 'Opening a healthy factory thermal interface can worsen contact; some models need special materials.', 'Check temperatures, interface condition, model procedure and whether heatsink removal is justified.'],
        ['Model-aware internal inspection', 'Small clips, thin cables and compact cooling ducts can be damaged by generic opening methods.', 'Follow device-specific access steps, isolate power safely and clear the confirmed restriction.']
      ],
      foot: 'Everyday symptoms matter too: a loud fan during Zoom or Teams calls, a hot palm rest while plugged in, or slowdown with several browser tabs open can warrant inspection—not an automatic paste replacement.'
    },
    handover: {
      eyebrow: 'HAWALLI LAB · INSPECTION & HANDOVER',
      title: 'What we inspect and explain before returning your laptop',
      intro: 'A useful result is an understandable finding and a checked cooling path, not an unsupported promise of a fixed temperature drop. The steps performed depend on the actual laptop and fault.',
      items: [
        ['Airflow findings', 'Explain whether fan blades, vents or the concealed heatsink-fin face had a restriction, or whether the root cause remains elsewhere.'],
        ['Thermal-interface decision', 'Confirm whether an intact compatible factory interface was left in place or fresh model-appropriate material was applied after inspection.'],
        ['Post-service checks', 'Check reassembly, fan response, exhaust flow and suitable repeatable workload behaviour as the device safely permits.']
      ],
      note: 'Covered completed repair work carries the published 30-day warranty. The two proposed close-up lab photos are intentionally not shown without authenticated, privacy-reviewed source images.'
    },
    scope: {
      eyebrow: 'TRANSPARENT SCOPE · QUOTE FIRST',
      title: 'What the 15–20 KWD thermal-service guide covers',
      intro: 'The guide applies to supported everyday Windows laptops. Your final scope and price are confirmed after the free initial diagnosis.',
      included: 'Standard service when indicated',
      separate: 'Separate quote only if diagnosed',
      includedItems: [
        'Free initial temperature, airflow and fan-behaviour assessment',
        'Model-safe chassis access and electrical isolation where required',
        'Cleaning accessible fan blades, internal vents, exhaust channels and heatsink fins',
        'Condition-based thermal material renewal when necessary and compatible',
        'Reassembly and appropriate fan, airflow and stability checks'
      ],
      separateItems: [
        'Failed or noisy cooling-fan replacement',
        'Damaged heat pipe or heatsink assembly',
        'Swollen battery inspection and any necessary replacement',
        'Liquid contamination or component-level motherboard repair',
        'Unrelated operating-system, driver or software work'
      ],
      note: 'No Fix, No Fee · Approval before work. A finding outside this service does not authorize extra charges; we explain and quote separately before proceeding.'
    },
    prep: {
      eyebrow: 'BEFORE WE COLLECT YOUR LAPTOP',
      title: 'Safety signs and a three-step pickup checklist',
      warningTitle: 'Stop using or charging the device when safe if you notice:',
      warnings: [
        'A swollen battery, lifting trackpad, bowed keyboard or distorted chassis; do not press on the battery.',
        'Smoke, a burning smell, unusual heat at the power connector or repeated shutdowns during light use.',
        'Harsh grinding from a fan or little airflow while the laptop becomes unusually hot.'
      ],
      stepsTitle: 'For a faster, more accurate diagnosis',
      steps: [
        'Back up important files first if the laptop is operating normally. This is a hardware service; KCROC does not provide data recovery.',
        'Send the exact brand and model number, such as Dell Latitude 5420 or Lenovo ThinkPad X1 Carbon.',
        'Include the original charger when the heat problem mainly appears while charging or plugged in.'
      ],
      routes: 'Not sure whether the issue is dust or another fault? Read our',
      local: 'laptop overheating diagnosis in Kuwait',
      or: 'or the',
      global: 'universal laptop overheating guide',
      ending: 'for safe first checks.'
    },
    fast: {
      label: 'WHATSAPP QUICK BRIEF',
      title: 'Get a model-specific answer faster',
      hint: 'Include the laptop model, main symptom and Kuwait pickup area in your WhatsApp message.',
      example: 'Model: HP ProBook 450 G8 · Symptom: loud fan / hot while charging · Pickup: Salmiya'
    }
  },
  ar: {
    precision: {
      eyebrow: 'أجهزة رفيعة · عناية دقيقة',
      title: 'ليش اللابتوبات الرفيعة ولابتوبات الدوام تحتاج تنظيف دقيق؟',
      intro: 'مراوح هالأجهزة صغيرة، وزعانف المشتت متقاربة، والكيابل الداخلية حساسة. نفخ الهواء من برّا مو نفس التنظيف الداخلي، وتبديل المعجون مو لازم بكل مرة.',
      heads: ['الطريقة', 'شنو ممكن يصير؟', 'شلون نفحص؟'],
      rows: [
        ['نفخ هواء مضغوط من الفتحات', 'إذا صار بشكل عشوائي ممكن يدفع الوبر داخل المشتت أكثر أو يلف المروحة بسرعة زايدة.', 'نفحص جهة خروج الهواء الداخلية ونثبت المروحة قبل التنظيف إذا احتاجت الطريقة.'],
        ['تبديل المعجون بكل صيانة', 'فك واجهة حرارية أصلية سليمة ممكن يضعف التلامس، وبعض الموديلات تحتاج مادة خاصة.', 'نفحص الحرارة وحالة التلامس وطريقة فك الموديل قبل ما نلمس المادة.'],
        ['فحص داخلي مناسب للموديل', 'الكلبسات والكيابل الرفيعة ومجاري الهواء ممكن تتضرر إذا انفك الجهاز بطريقة عامة.', 'نلتزم بخطوات الفك المناسبة، ونعزل الطاقة بأمان وننظف الانسداد اللي تأكدنا منه.']
      ],
      foot: 'حتى استخدام الدوام والدراسة ممكن يبيّن المشكلة: مروحة تصرخ وقت Zoom أو Teams، حرارة مع الشاحن، أو بطء مع فتح تبويبات كثيرة. نفحص السبب وما نغيّر المعجون عالعمياني.'
    },
    handover: {
      eyebrow: 'مختبر حولي · فحص وتسليم واضح',
      title: 'شنو نفحص وشنو نوضح لك قبل ما نرجّع اللابتوب؟',
      intro: 'النتيجة المهمة إنك تعرف سبب المشكلة وشنو انعمل، مو وعد بدرجة حرارة ثابتة لكل الأجهزة. خطوات الفحص تعتمد على موديل جهازك والعطل.',
      items: [
        ['نتيجة فحص الهواء', 'نوضح إذا كان الغبار مسكر المروحة أو الفتحات أو زعانف المشتت من الداخل، أو إذا السبب من مكان ثاني.'],
        ['قرار المعجون الحراري', 'نوضح إذا خلّينا المادة الأصلية السليمة أو استخدمنا مادة متوافقة عقب الفحص وعند الحاجة.'],
        ['اختبارات ما بعد الخدمة', 'نراجع التركيب ودوران المروحة وخروج الهواء وثبات الجهاز مع اختبار مناسب وآمن لحالته.']
      ],
      note: 'الضمان المنشور 30 يوم على شغل التصليح المكتمل والمشمول بالشروط. ما نعرض صور أجهزة عملاء أو صور مختبر على إنها إثبات لحالة محددة إلا إذا كانت أصلية وتمت مراجعة الخصوصية.'
    },
    scope: {
      eyebrow: 'السعر واضح · موافقتك أول',
      title: 'شنو يشمل السعر الإرشادي 15–20 د.ك؟',
      intro: 'هالمدى الإرشادي للابتوبات Windows العادية المدعومة. نحدد الشغل والسعر النهائي بعد الفحص الأولي المجاني.',
      included: 'ضمن الخدمة العادية عند الحاجة',
      separate: 'يتسعّر بروحه فقط إذا ثبت العطل',
      includedItems: [
        'فحص أولي مجاني للحرارة ومجرى الهواء وسلوك المروحة',
        'فتح الجهاز حسب الموديل وعزل الطاقة بالطريقة الآمنة عند الحاجة',
        'تنظيف الغبار من المروحة والفتحات ومجرى العادم وزعانف المشتت الممكن الوصول لها',
        'تجديد المعجون أو المادة الحرارية المتوافقة إذا استدعى الفحص',
        'إعادة التركيب وفحص المروحة والهواء وثبات الأداء بشكل مناسب'
      ],
      separateItems: [
        'تبديل مروحة خربانة أو صوتها ميكانيكي',
        'تلف الأنبوب الحراري أو مجموعة المشتت',
        'فحص البطارية المنتفخة وأي تبديل ضروري',
        'آثار سوائل أو تصليح مذربورد على مستوى المكونات',
        'شغل نظام Windows أو التعريفات أو البرامج خارج نطاق التبريد'
      ],
      note: 'ما تصلّح، ما تدفع · وموافقتك قبل الشغل. إذا طلع عطل ثاني، نشرحه ونعطيك سعر منفصل قبل أي شغل إضافي.'
    },
    prep: {
      eyebrow: 'قبل لا نستلم اللابتوب',
      title: 'علامات لازم تنتبه لها وتجهيز الجهاز للاستلام',
      warningTitle: 'وقف الاستخدام والشحن إذا كان آمن ولاحظت:',
      warnings: [
        'بطارية منتفخة أو تراك باد طالع أو كيبورد مرتفع أو هيكل معوّج؛ لا تضغط على البطارية.',
        'دخان أو ريحة حرق أو سخونة غريبة عند مدخل الشحن أو انطفاء متكرر مع شغل خفيف.',
        'صوت طحن قوي من المروحة أو هواء ضعيف والجهاز يسخن بشكل غير طبيعي.'
      ],
      stepsTitle: 'ثلاث خطوات تساعدنا نفحص جهازك أسرع',
      steps: [
        'خذ نسخة احتياطية من ملفاتك إذا الجهاز يشتغل طبيعي. هذي صيانة هاردوير، وما نقدم استرجاع بيانات.',
        'أرسل الماركة والموديل الدقيق، مثل Dell Latitude 5420 أو Lenovo ThinkPad X1 Carbon.',
        'حط الشاحن الأصلي مع الجهاز إذا الحرارة تزيد وقت الشحن أو وهو مشبوك بالكهرباء.'
      ],
      routes: 'مو متأكد إذا المشكلة غبار أو عطل ثاني؟ شوف',
      local: 'فحص سخونة اللابتوب بالكويت',
      or: 'أو',
      global: 'دليل سخونة اللابتوب العام (بالإنجليزي)',
      ending: 'للخطوات الآمنة قبل الصيانة.'
    },
    fast: {
      label: 'معلومات سريعة للواتساب',
      title: 'أرسل التفاصيل وخلك على بيّنة من أول رسالة',
      hint: 'اكتب موديل اللابتوب والعَرَض الأساسي ومنطقة الاستلام داخل الكويت.',
      example: 'الموديل: HP ProBook 450 G8 · العطل: صوت مروحة عالي / يسخن مع الشحن · المنطقة: السالمية'
    }
  }
} as const;

const localPath = (path: string, ar: boolean) => ar ? '/ar' + path : path;

export function ThermalPrecisionCare({ ar }: Props) {
  const t = ar ? editorial.ar.precision : editorial.en.precision;
  return <section data-thermal-module="precision" className="kcroc-thermal-extra kcroc-thermal-precision" aria-labelledby="thermal-precision-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-precision-title">{t.title}</h2><p className="kcroc-thermal-extra-lead">{t.intro}</p>
    <div className="kcroc-thermal-extra-table-scroll" role="region" aria-label={t.title} tabIndex={0}>
      <table className="kcroc-thermal-extra-table"><thead><tr>{t.heads.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{t.rows.map(([method, risk, check]) => <tr key={method}><th scope="row">{method}</th><td>{risk}</td><td>{check}</td></tr>)}</tbody></table>
    </div>
    <p className="kcroc-thermal-extra-emphasis">{t.foot}</p>
  </div></section>;
}

export function ThermalHandover({ ar }: Props) {
  const t = ar ? editorial.ar.handover : editorial.en.handover;
  return <section data-thermal-module="handover" className="kcroc-thermal-extra kcroc-thermal-handover" aria-labelledby="thermal-handover-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-handover-title">{t.title}</h2><p className="kcroc-thermal-extra-lead">{t.intro}</p>
    <div className="kcroc-thermal-extra-cards">{t.items.map(([title, description], i) => <article key={title} className="kcroc-thermal-extra-card"><span className="kcroc-thermal-extra-number" aria-hidden="true">{String(i + 1).padStart(2,'0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    <p className="kcroc-thermal-extra-disclaimer">{t.note}</p>
  </div></section>;
}

export function ThermalScopeBreakdown({ ar }: Props) {
  const t = ar ? editorial.ar.scope : editorial.en.scope;
  return <section data-thermal-module="scope" className="kcroc-thermal-extra kcroc-thermal-scope" aria-labelledby="thermal-scope-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-scope-title">{t.title}</h2><p className="kcroc-thermal-extra-lead">{t.intro}</p>
    <div className="kcroc-thermal-scope-grid"><article><h3>{t.included}</h3><ul>{t.includedItems.map(s => <li key={s}>{s}</li>)}</ul></article><article><h3>{t.separate}</h3><ul>{t.separateItems.map(s => <li key={s}>{s}</li>)}</ul></article></div>
    <p className="kcroc-thermal-extra-emphasis">{t.note}</p>
  </div></section>;
}

export function ThermalPickupPrep({ ar }: Props) {
  const t = ar ? editorial.ar.prep : editorial.en.prep;
  return <section data-thermal-module="preparation" className="kcroc-thermal-extra kcroc-thermal-prep" aria-labelledby="thermal-prep-title"><div className="kcroc-repair-container">
    <p className="kcroc-repair-eyebrow">{t.eyebrow}</p><h2 id="thermal-prep-title">{t.title}</h2>
    <div className="kcroc-thermal-prep-grid">
      <article className="kcroc-thermal-prep-warning"><h3>{t.warningTitle}</h3><ul>{t.warnings.map(s => <li key={s}>{s}</li>)}</ul></article>
      <article><h3>{t.stepsTitle}</h3><ol>{t.steps.map(s => <li key={s}>{s}</li>)}</ol></article>
    </div>
    <p className="kcroc-thermal-prep-routes">{t.routes} <Link to={localPath('/laptop-overheating-kuwait', ar)}>{t.local}</Link> {t.or} <Link to="/guides/why-is-my-laptop-so-hot" lang="en">{t.global}</Link> {t.ending}</p>
  </div></section>;
}

export function ThermalWhatsAppBrief({ ar }: Props) {
  const t = ar ? editorial.ar.fast : editorial.en.fast;
  return <aside data-thermal-module="whatsapp-helper" className="kcroc-thermal-fast-brief" aria-label={t.title}>
    <p className="kcroc-thermal-fast-label">{t.label}</p><h3>{t.title}</h3><p>{t.hint}</p><p className="kcroc-thermal-fast-example">{t.example}</p>
  </aside>;
}
