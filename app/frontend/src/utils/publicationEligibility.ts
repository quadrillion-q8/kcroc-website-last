import type { CaseStudyEntity, ReviewsEntity } from '../types/knowledgeGraph';

/**
 * Public case studies require explicit permission for the device and repair
 * details, plus at least one supporting first-party evidence asset.
 * Missing permission/evidence is treated as unpublished.
 */
export function isCaseStudyPublishable(
  caseStudy: Pick<CaseStudyEntity, 'customerConsent' | 'evidence'>,
): boolean {
  const consent = caseStudy.customerConsent;
  return consent?.granted === true
    && consent.scope.includes('device')
    && consent.scope.includes('repair-details')
    && Array.isArray(caseStudy.evidence)
    && caseStudy.evidence.length > 0;
}

/** Customer images require a separate, explicit photo permission. */
export function canPublishCaseStudyPhotos(
  caseStudy: Pick<CaseStudyEntity, 'customerConsent' | 'evidence'>,
): boolean {
  return isCaseStudyPublishable(caseStudy)
    && caseStudy.customerConsent?.scope.includes('photos') === true;
}

/** Reviews require both a source URL and an explicit provenance review. */
export function isReviewPublishable(
  review: Pick<ReviewsEntity['items'][number], 'sourceUrl' | 'publicationVerified'>,
): boolean {
  return review.publicationVerified === true && Boolean(review.sourceUrl);
}
