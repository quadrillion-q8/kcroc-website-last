import { KCROC_GRAPH } from '../../data/graph';
import { IMAGES } from '../../constants/images';

// Allocate all service and pricing thumbnails deterministically, including expanded cards.
const used = new Set<string>([
  IMAGES.brand.technicians.src,
  IMAGES.brand.leadTechnician.src,
  IMAGES.brand.shopExteriorDay.src,
  IMAGES.brand.laptopRepairShopWorkbenchLaptops.src,
  IMAGES.laptopHardware.laptopOpenRepairBench.src,
  IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src,
  IMAGES.services.motherboardRepair.src,
  IMAGES.services.thermalService.src,
]);
type ServiceImage = NonNullable<(typeof KCROC_GRAPH.services)[number]['contentImages']>[number];
const grid = new Map<string, ServiceImage>();
const pricing = new Map<string, ServiceImage>();
function claim(id: string, candidates: readonly ServiceImage[], target: Map<string, ServiceImage>) {
  const image = candidates.find(item => !used.has(item.src));
  if (image) { used.add(image.src); target.set(id, image); }
}
for (const service of KCROC_GRAPH.services) {
  const images = service.contentImages ?? [];
  const preferred = images.find(image => image.placement === 'hero') ??
    images.find(image => image.placement === 'coreFeatures') ??
    images.find(image => image.placement === 'commonIssues') ?? images[0];
  claim(service.id, preferred ? [preferred, ...images] : [], grid);
}
for (const service of KCROC_GRAPH.services) claim(service.id, service.contentImages ?? [], pricing);
export const homepageServiceImage = (id: string) => grid.get(id);
export const homepagePricingImage = (id: string) => pricing.get(id);
