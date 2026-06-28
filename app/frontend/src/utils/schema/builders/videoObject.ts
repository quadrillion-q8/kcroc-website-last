// File: src/utils/schema/builders/videoObject.ts
import { SchemaNode, generateSchemaId, ORG_ID } from '../schemaUtils';
import { KCROCEntity } from '../../../types/knowledgeGraph';
import { getRelatedEntities } from '../../graphQueries';

// A lightweight interface for your Video entities
interface VideoEntity extends KCROCEntity {
  entityType: 'Video';
  videoUrl: string; // e.g., YouTube URL or raw MP4
  thumbnailUrl: string;
  uploadDate: string; // ISO date string
  duration?: string; // ISO 8601 format e.g., "PT1M33S"
}

export const buildVideoObject = (entity: KCROCEntity): SchemaNode | SchemaNode[] | null => {
  // 1. Fetch all videos linked to this specific entity
  const relatedVideos = getRelatedEntities<VideoEntity>(entity.id, 'related', 'Video');

  // 2. Safety Check
  if (!relatedVideos || relatedVideos.length === 0) return null;

  // 3. Map graph data into strict VideoObject schema
  return relatedVideos.map((video, index) => ({
    '@type': 'VideoObject',
    '@id': generateSchemaId(entity, `video-${index}`),
    'name': video.title,
    'description': video.description,
    'thumbnailUrl': [video.thumbnailUrl], // Google prefers an array of thumbnail URLs
    'uploadDate': video.uploadDate || video.build.lastReviewed,
    'contentUrl': video.videoUrl,
    'embedUrl': video.videoUrl,
    'duration': video.duration, // Highly recommended by Google if available
    'publisher': {
      '@id': ORG_ID
    }
  }));
};
