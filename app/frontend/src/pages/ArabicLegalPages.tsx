import React from 'react';
import {Link} from 'react-router-dom';
import {SEOEngine} from '../core/components/SEOEngine';
import {KCROC_GRAPH} from '../data/graph';
import {openConsentPreferences} from '../core/privacy/consent';
import {buildWhatsAppLink} from '../utils/whatsappIntent';
import './KCROCEditorialRollout.css';

const privacy=[
 ['info-we-collect','المعلومات التي نجمعها','عند حجز إصلاح أو التواصل معنا أو استخدام موقعنا، قد نجمع اسمك ورقم هاتفك وبريدك الإلكتروني وعنوان الاستلام والتوصيل وتفاصيل الجهاز والعطل التي تزودنا بها.','عند تصفح الموقع، قد نجمع بيانات تحليلات اعتيادية مثل الموقع التقريبي على مستوى المدينة أو الدولة ونوع الجهاز والصفحات التي زرتها، إذا وافقت على تقنيات التحليلات الاختيارية، عبر خدمات مثل Google Analytics عند تفعيلها.'],
 ['how-we-use','كيفية استخدام معلوماتك','نستخدم معلوماتك لترتيب وتنفيذ الاستلام والتوصيل والإصلاح والتواصل بشأن الحجز بالهاتف أو واتساب أو البريد الإلكتروني، وتقديم عروض الأسعار والفواتير وتحسين خدماتنا وموقعنا.','لا نبيع معلوماتك الشخصية لأطراف ثالثة، ولا نستخدمها لأغراض لا تتعلق بتقديم خدمة الإصلاح لك.'],
 ['device-data','بيانات جهازك','خلال الفحص والإصلاح يستخدم الفنيون أدوات تشخيص متخصصة للأجهزة والبرامج. لا نتصفح ملفاتك الشخصية المخزنة على الجهاز ولا ننسخها أو نشاركها.','يمكنك إزالة وحدة التخزين قبل تسليم الجهاز لإصلاح اللوحة أو المكونات. راجع صفحة خصوصية وأمان البيانات لتفاصيل بروتوكولات المختبر.'],
 ['sharing','مشاركة المعلومات','نشارك المعلومات بالقدر اللازم لتشغيل العمل فقط: مع الفنيين والسائقين التابعين لنا لتنفيذ الحجز، ومع مزودي الخدمات مثل الاستضافة والتحليلات ومعالجة المدفوعات، وكل منهم ملتزم بحماية بياناتك.','قد نفصح عن المعلومات إذا تطلب القانون الكويتي أو طلب قانوني صالح ذلك.'],
 ['cookies','ملفات تعريف الارتباط والتحليلات والإعلانات','يستخدم KCROC التقنيات الضرورية لتشغيل الموقع. إلى حين اختيار تفضيلات الخصوصية، يعمل Google Analytics بوضع مقيّد لا يضع ملفات تعريف ارتباط ويرسل إشارات مجهولة ومجمعة فقط. إذا وافقت على التقنيات الاختيارية، قد نستخدم خدمات القياس مثل Google Analytics وخدمات إعلانات Google بما فيها AdSense عند تفعيلها لفهم حركة الزيارات ودعم الإعلانات ذات الصلة.','عند استخدام خدمات إعلانات Google، قد يستخدم مزودو الخدمات الخارجيون، بما فيهم Google، ملفات تعريف ارتباط لعرض إعلانات بناءً على زيارات المستخدم السابقة لهذا الموقع أو مواقع أخرى. قد يتيح استخدام Google لملفات تعريف ارتباط الإعلانات لها ولشركائها عرض إعلانات بناءً على تلك الزيارات.','يتيح استخدام Google لملف تعريف ارتباط الإعلانات، مثل DoubleClick، لشركائها ولها عرض إعلانات بناءً على زيارة هذا الموقع أو مواقع أخرى. يمكنك معرفة كيفية استخدام Google للمعلومات من المواقع والتطبيقات التي تستخدم خدماتها من الرابط أدناه.','يمكنك إدارة الإعلانات المخصصة أو إيقافها عبر إعدادات إعلانات Google، ومراجعة خيارات إعلانات الجهات الخارجية عبر أدوات إلغاء الاشتراك المتوفرة.','للزوار في المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا، تشترط Google تدابير إضافية لإدارة الموافقة عند عرض الإعلانات المخصصة. سيستخدم KCROC أدوات إدارة الموافقة المدعومة من Google أو منصة معتمدة منها حيث يلزم ذلك قبل عرض الإعلانات المخصصة في هذه المناطق.'],
 ['retention','الاحتفاظ بالبيانات','نحتفظ بسجلات الحجز والإصلاح للمدة اللازمة بشكل معقول لتقديم الدعم والوفاء بالضمان والالتزامات المحاسبية والقانونية، ثم تُحذف بأمان أو تُجعل مجهولة الهوية.'],
 ['your-rights','حقوقك','يمكنك طلب الاطلاع على معلوماتك الشخصية التي نحتفظ بها أو تصحيحها أو حذفها في أي وقت بالتواصل معنا عبر التفاصيل أدناه.'],
 ['changes','تغييرات السياسة','قد نحدّث سياسة الخصوصية من حين لآخر لتعكس التغييرات في ممارساتنا أو لأسباب قانونية. يوضح تاريخ آخر تحديث أحدث مراجعة.']
];
const terms=[
 ['services','خدماتنا','يقدم KCROC خدمات تشخيص وإصلاح على مستوى المكونات واللوحات لأجهزة اللابتوب والكمبيوتر المكتبي وماك بوك وكمبيوتر الألعاب في الكويت، بما فيها الاستلام والتوصيل المجاني ضمن مناطق الخدمة.'],
 ['diagnostics-quotes','الفحص وعروض الأسعار','نقدم تقييمًا تشخيصيًا قبل تنفيذ أي إصلاح مدفوع. يتم تقديم عرض سعر بناءً على التقييم، ولا يبدأ الإصلاح المدفوع بدون موافقتك على السعر.','إذا تبيّن أن الجهاز غير قابل للإصلاح أو رفضت عرض السعر، تطبق شروط الفحص المعتادة، بما فيها سياسة بدون إصلاح بدون رسوم حيث تنطبق وفق ما تم إبلاغك به عند الحجز.'],
 ['pickup-delivery','الاستلام والتوصيل','نوفر الاستلام والتوصيل المجاني ضمن مناطق الخدمة المحددة في الكويت بمواعيد منسقة. يُنقل الجهاز مباشرة من موقعك إلى مختبرنا وبالعكس، ويُسجل في كل مرحلة من مراحل الحيازة.','تقع عليك مسؤولية تزويدنا ببيانات اتصال وعنوان دقيقة والتواجد بشكل معقول خلال موعد الاستلام أو التوصيل المتفق عليه.'],
 ['warranty','ضمان الإصلاح','تخضع الإصلاحات لمدة الضمان التي نبلغك بها عند إصدار الفاتورة. يغطي الضمان العطل المحدد الذي تم إصلاحه والقطع أو المكونات التي استبدلناها، ولا يغطي الأعطال غير المرتبطة أو الأضرار المادية أو أضرار السوائل بعد الإصلاح أو المشاكل الناتجة عن صيانة جهة أخرى بعد إصلاحنا.'],
 ['customer-data','بيانات العميل على الجهاز','لا نتحمل مسؤولية فقدان البيانات الذي قد يحدث خلال الفحص أو الإصلاح. نوصي بشدة بأخذ نسخة احتياطية مسبقًا متى أمكن. يمكنك إزالة وحدة التخزين قبل تسليم الجهاز لإصلاح اللوحة؛ راجع صفحة خصوصية وأمان البيانات.'],
 ['payment','الدفع','يُستحق الدفع عند اكتمال الإصلاح المعتمد، قبل التوصيل أو عنده، باستخدام طرق الدفع التي نوفرها. الأسعار بالدينار الكويتي ما لم يُذكر خلاف ذلك.'],
 ['liability','حدود المسؤولية','بالقدر الذي يسمح به القانون الكويتي، تقتصر مسؤولية KCROC عن أي مطالبة ناشئة عن خدماتنا على المبلغ المدفوع للإصلاح المحدد موضوع المطالبة. لا نتحمل مسؤولية الخسائر غير المباشرة أو التبعية، بما فيها فقدان البيانات أو الأعمال أو الاستخدام.'],
 ['governing-law','القانون المطبق','تخضع هذه الشروط لقوانين دولة الكويت. وتختص المحاكم الكويتية المختصة حصريًا بالنظر في أي نزاع.'],
 ['changes','تغييرات الشروط','قد نراجع شروط الخدمة من حين لآخر. يشكّل الاستمرار في استخدام خدماتنا بعد نشر التغييرات قبولًا للشروط المحدثة.']
];
const security=[
 ['no-snoop','عدم التطفل على الملفات','نستخدم أدوات التشخيص المتخصصة ولا نفتح أو نتصفح المجلدات أو السجل الشخصي.','لإصلاحات اللوحة يمكنك إزالة وحدة التخزين قبل تسليم الجهاز إذا كان التصميم يسمح بذلك.'],
 ['custody','أمان الاستلام والتوصيل','نسجل الجهاز عند استلام السائق له ونضعه في حاوية نقل آمنة.','ينقل الجهاز مباشرة إلى المختبر دون تسليمه لشركة توصيل خارجية.'],
 ['lab','المختبر الفني','مختبر حولي خاضع للمراقبة بالفيديو، وتحفظ الأجهزة في خزائن آمنة.','يتعامل مع الجهاز الفني المكلف بتشخيصه على مستوى المكونات.'],
 ['transparency','شفافية المكونات','لا نستبدل مكونات المصنع دون توثيق العمل، ونسجل المكونات التي تم تغييرها.','تتلقى فاتورة رقمية توضح العمل المنفذ؛ لا نجري إصلاحات غير موثقة.']
];
const business=KCROC_GRAPH.business!;
function Legal({kind}:{kind:'privacy-policy'|'terms-of-service'|'privacy-security-kuwait'}){
 const p=kind==='privacy-policy',s=kind==='privacy-security-kuwait';
 const title=p?'سياسة الخصوصية':s?'خصوصية وأمان البيانات أثناء تصليح الكمبيوتر':'شروط الخدمة';
 const sections=p?privacy:s?security:terms;
 return <div lang="ar-KW" dir="rtl" data-kcroc-rollout={s?'privacy-security':'legal'} data-arabic-business={kind} className="min-h-screen bg-transparent text-slate-200 pt-16 lg:pt-32 pb-24">
 <SEOEngine entityId={'page-ar-'+kind}/>
 <div className="max-w-4xl mx-auto px-4 sm:px-6">
 <nav aria-label="مسار التنقل" className="mb-8"><Link to="/ar">الرئيسية</Link> / <span aria-current="page">{title}</span></nav>
 <h1 className="text-3xl sm:text-5xl font-black text-white mb-5">{title}</h1>
 {!s&&<p className="mb-6 text-slate-400">آخر تحديث: 19 سبتمبر 2026</p>}
 {s&&<p className="mb-6 leading-loose">خصوصية جهازك جزء أساسي من طريقة عملنا في مختبر حولي. هذه إجراءات التعامل مع الجهاز أثناء الاستلام والفحص والإصلاح.</p>}
 {p&&<section className="rounded-2xl border border-slate-700 p-5 mb-8"><h2 className="font-bold">خيارات الخصوصية</h2><p className="my-3">يمكنك إعادة فتح خيارات ملفات تعريف الارتباط والتحليلات الاختيارية في أي وقت.</p><button type="button" onClick={openConsentPreferences} className="min-h-12 px-5 border rounded-xl border-cyan-500 text-cyan-300">إعدادات الخصوصية</button></section>}
 <div data-kcroc-editorial-panel="legal-body" className="space-y-8">{sections.map(([id,heading,...body],i)=><section key={id} id={id} data-legal-section={id}><h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{i+1}. {heading}</h2>{body.map((para,j)=><p key={j} className="leading-loose text-slate-300 mb-3">{para}</p>)}{id==='device-data'||id==='customer-data'?<Link className="text-cyan-300 underline" to="/ar/privacy-security-kuwait">خصوصية وأمان البيانات</Link>:null}{id==='cookies'&&<div className="flex flex-wrap gap-4 text-sm">{[['https://adssettings.google.com/','إعدادات إعلانات Google'],['https://www.aboutads.info/choices/','خيارات AboutAds.info'],['https://policies.google.com/technologies/partner-sites','كيف تستخدم Google معلومات المواقع']].map(([url,label])=><a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">{label}</a>)}</div>}</section>)}</div>
 {s&&<section className="mt-8 rounded-2xl p-6 border border-slate-700"><h2 className="text-xl font-bold mb-4">خدمات مرتبطة</h2><div className="flex flex-wrap gap-4">{[['laptop-repair-kuwait','تصليح لابتوب'],['macbook-repair-kuwait','تصليح ماك بوك'],['motherboard-repair-kuwait','تصليح مذربورد'],['laptop-screen-repair-kuwait','تبديل الشاشة']].map(([url,label])=><Link key={url} to={'/ar/'+url} className="text-cyan-300 underline">{label}</Link>)}</div><p className="mt-4">إذا تحتاج اتفاقية عدم إفصاح (NDA) للبيانات الحساسة، تواصل مع المختبر قبل الحجز.</p></section>}
 <section className="mt-10 pt-6 border-t border-slate-700"><h2 className="font-bold text-xl mb-4">تواصل معنا</h2><p className="mb-4">لأي استفسار، تواصل مع KCROC — الكويت لتصليح الكمبيوتر عند الطلب.</p><div className="flex flex-wrap gap-4"><a className="text-cyan-300" href={'mailto:'+business.email} dir="ltr">{business.email}</a><a className="text-cyan-300" href={'tel:+'+business.telephone.replace(/\D/g,'')} dir="ltr">+965 5530 1913</a><a className="text-cyan-300" href={buildWhatsAppLink('السلام عليكم، عندي استفسار عن '+title)} target="_blank" rel="noopener noreferrer">واتساب</a><Link className="text-cyan-300" to="/ar/contact">اتصل بنا</Link><Link className="text-cyan-300" to={'/'+kind} lang="en">English version</Link></div></section>
 </div></div>;
}
export function ArabicPrivacyPolicy(){return <Legal kind="privacy-policy"/>}
export function ArabicTermsOfService(){return <Legal kind="terms-of-service"/>}
export function ArabicPrivacySecurity(){return <Legal kind="privacy-security-kuwait"/>}
