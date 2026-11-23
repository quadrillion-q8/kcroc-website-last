import React,{useState,useEffect,useRef} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {GLOBAL_FAQS} from '../constants/faqs';
import {SEOEngine} from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import {KCROC_GRAPH} from '../data/graph';
import {buildWhatsAppLink} from '../utils/whatsappIntent';
import './KCROCEditorialRollout.css';
const copy:Record<string,{question:string;answer:string}>={
  "free-pickup": {
    "question": "هل الاستلام والتوصيل مجاني بالكويت؟",
    "answer": "إي، نوفر استلام وتوصيل مجاني في جميع محافظات الكويت من البيت أو المكتب وإرجاع الجهاز بعد الإصلاح."
  },
  "same-day-service": {
    "question": "هل في تصليح بنفس اليوم؟",
    "answer": "للإصلاحات المؤهلة المحجوزة قبل الساعة 11 صباحًا قد يتاح الإرجاع بنفس اليوم، مثل تثبيت ويندوز وترقية SSD وRAM وتبديل الشاشات القياسية. إصلاح اللوحة وأضرار السوائل قد يحتاج 24–48 ساعة أو أكثر."
  },
  "pickup-time": {
    "question": "متى تقدرون تستلمون الجهاز؟",
    "answer": "في مناطق كثيرة يمكن ترتيب الاستلام خلال ساعات حسب توفر الفنيين والجدول."
  },
  "business-pickup": {
    "question": "تستلمون من المكاتب؟",
    "answer": "إي، نستلم من المنازل والمكاتب والمدارس والشركات في الكويت."
  },
  "no-fix-no-fee": {
    "question": "شنو يعني بدون إصلاح بدون رسوم؟",
    "answer": "إذا ما قدرنا نصلح الجهاز، ما تدفع تكلفة الإصلاح. تدفع فقط مقابل إصلاح ناجح وافقت على سعره قبل بدء العمل."
  },
  "diagnostic-fee": {
    "question": "هل في رسوم فحص؟",
    "answer": "لا، الفحص مجاني. نحدد العطل ونعطيك عرض سعر واضح قبل أي إصلاح."
  },
  "repair-cost": {
    "question": "كم يكلف تصليح الكمبيوتر؟",
    "answer": "يعتمد على العطل والقطع والأجرة المطلوبة. بعد الفحص نوضح السعر قبل العمل، ولا تدفع إلا إذا وافقت على العرض وتم الإصلاح."
  },
  "hidden-fees": {
    "question": "في رسوم مخفية؟",
    "answer": "لا، ما نسوي شغل إضافي أو نبدل قطع بدون موافقتك الصريحة."
  },
  "repair-time": {
    "question": "كم يستغرق التصليح عادة؟",
    "answer": "الإصلاحات المؤهلة قبل 11 صباحًا مثل تبديل الشاشة وترقية SSD وتثبيت ويندوز غالبًا تتم بنفس اليوم. الإصلاحات العادية 24–48 ساعة، والأعطال المعقدة وأضرار السوائل قد تحتاج أطول حسب العطل."
  },
  "data-safety": {
    "question": "بياناتي آمنة أثناء التصليح؟",
    "answer": "نطبق سياسة عدم التطفل على الملفات ونستخدم أدوات تشخيص الأعطال. ما نتصفح ملفاتك الشخصية. تقدر تشيل وحدة التخزين قبل تسليم جهاز لإصلاح اللوحة إذا كان ذلك ممكنًا."
  },
  "keep-files": {
    "question": "ملفاتي تبقى على الجهاز؟",
    "answer": "معظم إصلاحات الهاردوير ما تؤثر على الملفات، لكن ننصح بالنسخ الاحتياطي قبل أي إصلاح. ما نقدم استعادة بيانات."
  },
  "warranty": {
    "question": "هل التصليح عليه ضمان؟",
    "answer": "الإصلاح الناجح عليه ضمان 30 يوم للقطع وجودة العمل وفق الشروط."
  },
  "warranty-period": {
    "question": "كم مدة الضمان؟",
    "answer": "30 يوم للقطع وأجرة العمل ضمن شروط الإصلاح."
  },
  "warranty-claim": {
    "question": "إذا رجع نفس العطل أثناء الضمان؟",
    "answer": "إذا كان مشمولًا بضمان 30 يوم نفحص الجهاز وننفذ الإصلاح اللازم بدون أجرة عمل إضافية."
  },
  "screen-replacement": {
    "question": "تبدلون شاشات اللابتوب المكسورة؟",
    "answer": "إي، نبدل شاشات LCD وLED التالفة لمعظم الماركات بقطع عالية الجودة حسب توافق الموديل."
  },
  "battery-replacement": {
    "question": "تبدلون بطاريات اللابتوب؟",
    "answer": "إي، نبدل البطارية التالفة بقطعة أصلية أو متوافقة عالية الجودة حسب التوفر."
  },
  "keyboard-repair": {
    "question": "تصلحون كيبورد اللابتوب؟",
    "answer": "إي، نصلح أو نبدل الكيبورد التالف لمعظم الماركات الرئيسية حسب العطل."
  },
  "charging-port": {
    "question": "تصلحون مدخل الشحن؟",
    "answer": "إي، نفحص ونصلح أو نبدل مدخل DC أو مدخل الشحن التالف حسب الجهاز."
  },
  "ssd-upgrade": {
    "question": "أقدر أرقي التخزين إلى SSD؟",
    "answer": "إي، إذا التخزين القديم هو سبب البطء يمكن للـ SSD تحسين الإقلاع وتحميل البرامج. نتأكد من التوافق."
  },
  "ram-upgrade": {
    "question": "تزيدون RAM؟",
    "answer": "إي، نركب ذاكرة متوافقة إذا الجهاز يقبل الترقية."
  },
  "parts": {
    "question": "تستخدمون قطع أصلية؟",
    "answer": "نستخدم قطع أصلية عند توفرها أو بدائل متوافقة بجودة عالية، ونوضح الخيارات قبل العمل."
  },
  "windows-installation": {
    "question": "تثبتون ويندوز من جديد؟",
    "answer": "إي، نثبت ويندوز تثبيتًا نظيفًا مع التعريفات والتحديثات بعد توضيح أثر العملية على الملفات والبرامج وموافقتك."
  },
  "virus-removal": {
    "question": "تزيلون الفيروسات؟",
    "answer": "لا، ما نقدّم إزالة فيروسات أو برامج ضارة. خدمات KCROC تركّز على تصليح هاردوير الكمبيوتر واللابتوب والترقيات والتثبيت المعتمد لويندوز. إذا تشك بوجود إصابة، راجع مختص بالأمن السيبراني."
  },
  "slow-computer": {
    "question": "تصلحون الكمبيوتر البطيء؟",
    "answer": "نفحص سبب البطء والبرامج والنظام، ونقترح ترقية هاردوير إذا كانت مناسبة."
  },
  "gaming-pc": {
    "question": "تصلحون أو ترقون كمبيوتر الألعاب؟",
    "answer": "نفحص ونرقي أجهزة الألعاب الكاملة حسب التوافق، بما فيها التبريد والتخزين والذاكرة. لا نقدم إصلاح كروت شاشة مستقلة."
  },
  "brands": {
    "question": "شنو الماركات اللي تصلحونها؟",
    "answer": "معظم الماركات الرئيسية مثل Dell وHP وLenovo وASUS وAcer وMSI وApple MacBook وغيرها بحسب الموديل والعطل."
  },
  "macbook": {
    "question": "تصلحون ماك بوك؟",
    "answer": "إي، لأجهزة MacBook Air وPro نفحص الشاشة والبطارية والكيبورد واللوحة والأعطال حسب الموديل."
  },
  "business-support": {
    "question": "تصلحون أجهزة الشركات؟",
    "answer": "إي، نقدم إصلاح الهاردوير للابتوبات والكمبيوتر المكتبي والماك بوك للمكاتب والمدارس والشركات، وليس خدمة إدارة تقنية المعلومات أو الشبكات."
  },
  "bulk-repair": {
    "question": "تصلحون أكثر من جهاز للشركة؟",
    "answer": "إي، ننسق إصلاح وترقية عدة أجهزة حسب الأعطال والتوافق والجدول."
  }
};
const categories:Record<string,string>={'Pickup & Delivery':'الاستلام والتوصيل',Pricing:'الأسعار','Computer Repair':'تصليح الكمبيوتر',Security:'الخصوصية والأمان',Warranty:'الضمان','Laptop Repair':'تصليح اللابتوب','Hardware Upgrades':'ترقية الهاردوير',Software:'البرامج','Gaming PCs':'كمبيوتر الألعاب',General:'عام','MacBook Repair':'تصليح ماك بوك','Business IT':'أجهزة الشركات'};
const faqs=GLOBAL_FAQS.map(f=>({id:f.id,category:categories[f.category],...copy[f.id]}));
export default function ArabicFAQ(){
 const [query,setQuery]=useState('');
 const [copied,setCopied]=useState('');
 const [copyError,setCopyError]=useState('');
 const location=useLocation();
 const pendingQuestion=useRef('');
 useEffect(()=>{const id=location.hash.slice(1); if(faqs.some(f=>f.id===id)){pendingQuestion.current=id;setQuery(''); const frame=requestAnimationFrame(()=>{const target=document.getElementById(id) as HTMLDetailsElement|null;if(target){target.open=true;target.querySelector('summary')?.focus({preventScroll:true});target.scrollIntoView({block:'start'});pendingQuestion.current='';}});return ()=>cancelAnimationFrame(frame);}},[location.hash]);
 useEffect(()=>{const id=pendingQuestion.current;if(query||!id)return;const target=document.getElementById(id) as HTMLDetailsElement|null;if(target){target.open=true;target.querySelector('summary')?.focus({preventScroll:true});target.scrollIntoView({block:'start'});pendingQuestion.current='';}},[query]);
 const selected=faqs.filter(f=>(f.question+' '+f.answer+' '+f.category).toLowerCase().includes(query.trim().toLowerCase()));
 const schema={'@context':'https://schema.org','@type':'FAQPage','@id':KCROC_GRAPH.business!.websiteUrl+'/ar/faq#faq',inLanguage:'ar-KW',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))};
 return <div lang="ar-KW" dir="rtl" data-kcroc-rollout="faq" data-arabic-business="faq" className="min-h-screen pt-12 lg:pt-24 pb-20 text-slate-200">
 <SEOEngine entityId="page-ar-faq"/><SchemaMarkup schema={schema}/>
 <div className="max-w-4xl mx-auto px-4 sm:px-6"><nav aria-label="مسار التنقل" className="mb-6"><Link to="/ar">الرئيسية</Link> / الأسئلة الشائعة</nav><h1 className="text-4xl font-black text-white mb-5">الأسئلة الشائعة عن تصليح الكمبيوتر في الكويت</h1><p className="leading-loose mb-6">نستلم جهازك مجانًا من البيت أو المكتب ونفحصه في مختبر حولي. تعرف على {faqs.length} سؤال عن الأسعار والضمان والتصليح والخصوصية.</p><label className="block mb-2 font-bold" htmlFor="ar-faq-search">ابحث عن جواب</label><input id="ar-faq-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="مثل الضمان أو تبديل الشاشة" className="w-full min-h-12 rounded-xl bg-slate-900 border border-slate-700 p-4 text-white"/><div className="flex flex-wrap gap-3 my-6">{Object.values(categories).map(c=><button type="button" key={c} className="rounded-xl border border-slate-700 px-3 py-2 text-cyan-300" aria-pressed={query===c} onClick={()=>{setQuery(c);setCopied('');}}>{c}</button>)}<button type="button" aria-pressed={!query} onClick={()=>setQuery('')} className="px-3 py-2">كل الأسئلة</button></div><p role="status" className="mb-3 text-sm text-slate-400">عدد النتائج: {selected.length}</p><section data-kcroc-editorial-panel="faq-answers" className="space-y-4">{selected.length===0&&<p>ما لقينا نتيجة، جرب كلمة ثانية.</p>}{selected.map(f=><details id={f.id} key={f.id} data-kcroc-faq-item="true" className="rounded-xl border border-slate-700 p-5 scroll-mt-28"><summary tabIndex={0} className="cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-cyan-300">{f.question}</summary><p className="leading-loose mt-4">{f.answer}</p><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(window.location.origin+'/ar/faq#'+f.id);setCopied(f.id);setCopyError('')}catch{setCopied('');setCopyError(f.id)}}} className="text-cyan-300 underline mt-3">{copied===f.id?'تم النسخ':'انسخ رابط السؤال'}</button><a href={'/ar/faq#'+f.id} className="ms-4 text-cyan-300 underline">رابط مباشر</a>{copied===f.id&&<span role="status" className="sr-only">تم نسخ رابط السؤال</span>}{copyError===f.id&&<p role="status" className="mt-2 text-sm">ما قدرنا ننسخ الرابط تلقائيًا. استخدم الرابط المباشر.</p>}</details>)}</section><div className="mt-10 rounded-xl border p-5 border-slate-700"><h2 className="font-bold text-xl mb-4">عندك سؤال ثاني؟</h2><Link to="/ar/book" className="text-cyan-300 underline">احجز استلام مجاني</Link> · <Link to="/ar/pricing" className="text-cyan-300 underline">الأسعار</Link> · <Link to="/ar/privacy-security-kuwait" className="text-cyan-300 underline">خصوصية البيانات</Link> · <a className="text-cyan-300 underline" href={buildWhatsAppLink('السلام عليكم، عندي استفسار عن تصليح جهازي.')} target="_blank" rel="noopener noreferrer">واتساب</a></div></div></div>;
}
