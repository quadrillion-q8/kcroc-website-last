import { KCROC_GRAPH } from '../data/graph';

// Labels are presentation only; membership and Arabic availability come from the active graph.
const AR_LOCATION_NAMES: Record<string, string> = {
  "hawalli": "حولي",
  "salmiya": "السالمية",
  "farwaniya": "الفروانية",
  "kuwait-city": "مدينة الكويت",
  "jahra": "الجهراء",
  "ahmadi": "الأحمدي",
  "fahaheel": "الفحيحيل",
  "mangaf": "المنقف",
  "abu-halifa": "أبو حليفة",
  "mahboula": "المهبولة",
  "mubarak-al-kabeer": "مبارك الكبير",
  "khaitan": "خيطان",
  "riggae": "الرقعي",
  "shuwaikh-residential": "الشويخ السكنية",
  "sabah-al-salem": "صباح السالم",
  "surra": "السرة",
  "adailiya": "العديلية",
  "yarmouk": "اليرموك",
  "rumaithiya": "الرميثية",
  "messila": "المسيلة",
  "abdullah-al-salem": "ضاحية عبدالله السالم",
  "shamiya": "الشامية",
  "nuzha": "النزهة",
  "kaifan": "كيفان",
  "qortuba": "قرطبة",
  "mishref": "مشرف"
};

export function arabicLocationDestination(slug: string) {
  const location = KCROC_GRAPH.locations.find((item) => item.slug === slug && item.isActive !== false);
  if (!location) throw new Error('Inactive or unknown location: ' + slug);
  const englishPath = '/location/' + slug;
  const arabicSlug = 'ar/computer-repair-' + slug;
  const hasArabic = KCROC_GRAPH.pages.some((page) => page.slug === arabicSlug && page.isActive !== false);
  return { slug, title: AR_LOCATION_NAMES[slug] ?? location.title, path: hasArabic ? '/' + arabicSlug : englishPath, hasArabic, isPhysicalLocation: location.isPhysicalLocation };
}

export function arabicLocationPath(slug: string): string {
  return arabicLocationDestination(slug).path;
}

export function arabicLocationInventory() {
  return KCROC_GRAPH.locations.filter((location) => location.isActive !== false)
    .map((location) => arabicLocationDestination(location.slug));
}
