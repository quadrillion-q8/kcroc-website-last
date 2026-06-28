// File: src/utils/schema/builders/imageObject.ts
import { SchemaNode, generateSchemaId, ORG_ID } from '../schemaUtils';
import { KCROCEntity } from '../../../types/knowledgeGraph';

/**
 * Enterprise ImageObject Schema Builder
 * Iterates through an entity's media array to generate structured image data.
 * Crucial for Google Image Search and Rich Snippet thumbnails.
 */
export const buildImageObject = (entity: KCROCEntity): SchemaNode | SchemaNode[] | null => {
  // 1. Safety Check: If the entity has no media attached, return null
  if (!entity.media || entity.media.length === 0) {
    return null;
  }

  // 2. Map the media array into an array of Schema.org ImageObjects
  const imageNodes = entity.media.map((mediaItem, index) => {
    // Identify if this is the main hero image for the page
    const isHero = mediaItem.role === 'hero';
    
    // Generate a unique, stable @id for every image
    const imageSchemaId = isHero 
      ? generateSchemaId(entity, 'primaryimage') 
      : generateSchemaId(entity, `image-${index}`);

    return {
      '@type': 'ImageObject',
      '@id': imageSchemaId,
      'url': mediaItem.imageId, // Assumes imageId holds the Cloudinary URL or direct path
      'contentUrl': mediaItem.imageId,
      'caption': mediaItem.caption || entity.title,
      'altText': mediaItem.altText || `${entity.title} - ${mediaItem.role} image`,
      'representativeOfPage': isHero ? 'true' : 'false',
      
      // Explicitly tie the copyright/creator to your business
      'creator': {
        '@id': ORG_ID
      }
    };
  });

  return imageNodes;
};
