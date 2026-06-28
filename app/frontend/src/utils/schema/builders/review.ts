// File: src/utils/schema/builders/review.ts
import { SchemaNode, generateSchemaId } from '../schemaUtils';
import { KCROCEntity } from '../../../types/knowledgeGraph';
import { getRelatedEntities } from '../../graphQueries';

// A lightweight interface to tell TypeScript what a Review entity looks like in your graph
interface ReviewEntity extends KCROCEntity {
  entityType: 'Review';
  authorName: string;
  ratingValue: number; // e.g., 5
  reviewBody?: string;
  publishDate: string; // ISO date string e.g., "2026-01-15"
}

export const buildReview = (entity: KCROCEntity): SchemaNode | SchemaNode[] | null => {
  // 1. Fetch all reviews linked to this specific service/location
  const relatedReviews = getRelatedEntities<ReviewEntity>(entity.id, 'related', 'Review');

  // 2. Safety Check
  if (!relatedReviews || relatedReviews.length === 0) return null;

  const nodes: SchemaNode[] = [];
  const entityId = generateSchemaId(entity, entity.entityType.toLowerCase());

  // 3. Calculate Aggregate Rating Math
  const totalRating = relatedReviews.reduce((sum, review) => sum + review.ratingValue, 0);
  const averageRating = (totalRating / relatedReviews.length).toFixed(1);

  // 4. Generate the AggregateRating Node (This creates the stars in Google Search)
  nodes.push({
    '@type': 'AggregateRating',
    '@id': generateSchemaId(entity, 'aggregaterating'),
    'itemReviewed': { '@id': entityId },
    'ratingValue': averageRating,
    'reviewCount': relatedReviews.length.toString(),
    'bestRating': '5',
    'worstRating': '1'
  });

  // 5. Generate Individual Review Nodes
  relatedReviews.forEach((review, index) => {
    nodes.push({
      '@type': 'Review',
      '@id': generateSchemaId(entity, `review-${index}`),
      'itemReviewed': { '@id': entityId },
      'author': {
        '@type': 'Person',
        'name': review.authorName
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.ratingValue.toString(),
        'bestRating': '5'
      },
      'reviewBody': review.reviewBody || review.description,
      'datePublished': review.publishDate || review.build.lastReviewed
    });
  });

  return nodes;
};
