import { createContext, useContext } from 'react';
import type { ServiceEntity } from '../../types/knowledgeGraph';
import { localizedSitePath } from '../../utils/locale';
export const HomeLocaleContext = createContext<'en' | 'ar'>('en');
export const ARABIC_SERVICE_COPY: Record<string, { title: string; description: string; href: string }> = {
  'laptop-cleaning-thermal-paste-kuwait': { title: 'تنظيف اللابتوب وتبديل المعجون الحراري بالكويت', description: 'تنظيف داخلي للابتوبات العادية وفحص المروحة والمشتت والمعجون الحراري حسب حالة الجهاز، مو تبديل معجون بشكل تلقائي.', href: '/ar/laptop-cleaning-thermal-paste-kuwait' },
  'laptop-fan-replacement-kuwait': { title: 'تبديل مروحة اللابتوب بالكويت', description: 'مروحة اللابتوب تطق أو تحك أو ما تدور؟ نفحص المروحة وتوصيلاتها قبل ما نطلب قطعة بديلة.', href: '/ar/laptop-fan-replacement-kuwait' },
  'macbook-charging-port-repair-kuwait': { title: 'تصليح مدخل شحن ماك بوك USB-C بالكويت', description: 'ماك بوك ما يشحن من USB-C أو الشحن يفصل؟ نفحص المدخل والشاحن ودائرة الطاقة ونحدد الحل حسب رقم الموديل.', href: '/ar/macbook-charging-port-repair-kuwait' },
  'bios-repair-kuwait': { title: 'تصليح BIOS وUEFI للابتوب والكمبيوتر بالكويت', description: 'الجهاز وقف بعد تحديث BIOS أو ما يوصل لشاشة الإقلاع؟ نفحص أول إذا المشكلة من الفيرموير فعلًا أو من مكوّن ثاني.', href: '/ar/bios-repair-kuwait' },
  'pc-power-supply-replacement-kuwait': { title: 'تبديل باور سبلاي الكمبيوتر المكتبي بالكويت', description: 'الكمبيوتر المكتبي ما يشتغل أو يطفي فجأة؟ نفحص مسار الكهرباء ونبدّل وحدة PSU كاملة إذا ثبت عطلها.', href: '/ar/pc-power-supply-replacement-kuwait' },
  'macbook-liquid-damage-repair-kuwait': { title: 'تصليح ماك بوك بعد انسكاب السوائل بالكويت', description: 'انكب ماي أو قهوة على الماك بوك؟ خلّ الجهاز مطفي ولا تشحنه. نفحص آثار السوائل والمكونات المتضررة بالمختبر قبل أي تجربة تشغيل.', href: '/ar/macbook-liquid-damage-repair-kuwait' },
  'laptop-repair-kuwait': { title: 'تصليح اللابتوب في الكويت', description: 'تشخيص أعطال التشغيل والشحن والحرارة والشاشة والبطارية ومكونات الجهاز.', href: '/ar/laptop-repair-kuwait' },
  'desktop-pc-repair-kuwait': { title: 'تصليح الكمبيوتر المكتبي وPC', description: 'تشخيص أعطال الطاقة والشاشة والحرارة والرام والتخزين والمذربورد في الكمبيوتر المكتبي الكامل.', href: '/ar/desktop-pc-repair-kuwait' },
  'laptop-hinge-repair-kuwait': { title: 'تصليح مفصلات وهيكل اللابتوب', description: 'فحص المفصلات وقواعد التثبيت والغطاء والإطار وكابل الشاشة قبل تحديد طريقة الإصلاح.', href: '/ar/laptop-hinge-repair-kuwait' },
  'gaming-laptop-cleaning-kuwait': { title: 'تنظيف لابتوب الألعاب وصيانة التبريد', description: 'تنظيف المراوح والمشتت وفحص المواد الحرارية ثم اختبار الحرارة حسب الموديل.', href: '/ar/gaming-laptop-cleaning-kuwait' },
  'motherboard-repair-kuwait': { title: 'إصلاح اللوحة الأم والمذربورد', description: 'فحص أعطال الطاقة والشحن والمكونات الإلكترونية عندما يكون الإصلاح مناسبًا.', href: '/ar/motherboard-repair-kuwait' },
  'gaming-pc-repair-kuwait': { title: 'تصليح Gaming PC', description: 'تشخيص مشاكل الطاقة والرسوميات والحرارة والاستقرار في الكمبيوتر المخصص للألعاب.', href: '/ar/gaming-pc-repair-kuwait' },
  'laptop-screen-repair-kuwait': { title: 'تصليح شاشة اللابتوب', description: 'فحص الشاشة السوداء أو المكسورة أو الوامضة والكابل قبل تحديد الحل.', href: '/ar/laptop-screen-repair-kuwait' },
  'macbook-repair-kuwait': { title: 'تصليح MacBook', description: 'فحص أعطال الطاقة والشحن واللوحة والشاشة والبطارية حسب الموديل.', href: '/ar/macbook-repair-kuwait' },
  'macbook-screen-replacement-kuwait': { title: 'تبديل شاشة MacBook', description: 'تحديد موديل الجهاز ومواصفات الشاشة والتكلفة قبل الموافقة على العمل.', href: '/ar/macbook-screen-replacement-kuwait' },
  'battery-replacement-kuwait': { title: 'تبديل بطارية اللابتوب', description: 'فحص أعراض ضعف البطارية والتحقق من توافق القطعة مع موديل الجهاز.', href: '/ar/laptop-battery-replacement-kuwait' },
  'ssd-ram-upgrade-kuwait': { title: 'ترقية SSD وRAM', description: 'ترقية التخزين أو الذاكرة عند توافقها مع الجهاز، مع توضيح تكلفة القطع والعمل.', href: '/ar/ssd-ram-upgrade-kuwait' },
  'gaming-laptop-repair-kuwait': { title: 'تصليح Gaming Laptop', description: 'تشخيص مشاكل الحرارة والطاقة والأداء والشاشة في أجهزة الألعاب المحمولة.', href: '/ar/gaming-laptop-repair-kuwait' },
  'laptop-charging-port-repair-kuwait': { title: 'إصلاح منفذ شحن اللابتوب', description: 'فحص الشاحن والمنفذ ومسار الطاقة لتحديد سبب عدم الشحن.', href: '/ar/laptop-charging-port-repair-kuwait' },
  'laptop-keyboard-replacement-kuwait': { title: 'تبديل كيبورد اللابتوب', description: 'تحديد العطل وموديل الكيبورد والتكلفة قبل تنفيذ الاستبدال.', href: '/ar/laptop-keyboard-replacement-kuwait' },
  'laptop-liquid-damage-repair-kuwait': { title: 'تصليح اللابتوب بعد انسكاب الماي', description: 'انكب ماي أو قهوة؟ خلّ الجهاز مطفي وخلّنا نفحص الكيبورد والموصلات والمذربورد قبل لا تشغّله مرة ثانية.', href: '/ar/laptop-liquid-damage-repair-kuwait' },
};
export function arabicHomePrice(service: Pick<ServiceEntity, 'pricing'>): string {
  const label = service.pricing?.displayLabel?.split(' — ')[0];
  if (label) {
    const translated = label.replace(/Labor from /gi,'أجرة العمل من ').replace(/From /gi,'من ').replace(/KWD/gi,'د.ك')
      .replace(/labour \+ keyboard \/ assembly/gi,'أجرة العمل + الكيبورد أو التجميعة')
      .replace(/\+ display assembly/gi,'+ تجميعة الشاشة').replace(/\+ panel/gi,'+ الشاشة').replace(/\+ battery/gi,'+ البطارية')
      .replace(/\+ part/gi,'+ القطعة').replace(/diagnosis free/gi,'الفحص مجاني');
    if (!/[A-Za-z]/.test(translated)) return translated;
    // Unknown labels must not silently lose a labour-only or parts-extra qualification.
    return 'نأكد عرض السعر وتكلفة القطع بعد الفحص';
  }
  return service.pricing?.startingFrom != null ? 'من ' + service.pricing.startingFrom + ' د.ك — نأكد العرض بعد الفحص' : 'السعر بعد الفحص';
}
export function arabicHomePath(english: string): string {
  return localizedSitePath(english, 'ar');
}
export function useHomeLocale() {
 const ar = useContext(HomeLocaleContext) === 'ar';
 return {ar,t:(en:string,arabic:string)=>ar?arabic:en,path:(english:string)=>ar?arabicHomePath(english):english,
 serviceCopy:(service:ServiceEntity)=>ar?ARABIC_SERVICE_COPY[service.slug]:undefined,
 priceLabel:(service:ServiceEntity,english:string)=>ar?arabicHomePrice(service):english,
 trackName:(name:string)=>ar?name+'_ar':name};
}
