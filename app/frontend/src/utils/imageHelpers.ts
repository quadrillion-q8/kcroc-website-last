// src/utils/imageHelpers.ts
import { IMAGES } from '../constants/images';

type ImageMetadata = { src: string; alt: string; width: number; height: number };

export const getImage = (imageObj: ImageMetadata) => imageObj.src;

export const getAlt = (imageObj: ImageMetadata) => imageObj.alt;

export const getDimensions = (imageObj: ImageMetadata) => ({
  width: imageObj.width,
  height: imageObj.height
});

// Example Usage in a component:
// <img 
//   src={getImage(IMAGES.services.laptopRepairHero)} 
//   alt={getAlt(IMAGES.services.laptopRepairHero)} 
//   {...getDimensions(IMAGES.services.laptopRepairHero)} 
//   loading="lazy" 
// />
