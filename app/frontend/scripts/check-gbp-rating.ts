// File: app/frontend/scripts/check-gbp-rating.ts
import { KCROC_GRAPH } from '../src/data/graph';

async function checkGBPRating() {
  console.log('🔍 Checking live Google Business Profile rating...');

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // 1. Fail gracefully if environment variables are missing
  if (!apiKey || !placeId) {
    console.warn('⚠️  Skipping GBP rating check: GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set in environment.');
    return;
  }

  // 2. Read the currently hardcoded values from your graph
  const hardcodedRating = parseFloat(KCROC_GRAPH.business.aggregateRating.ratingValue);
  const hardcodedCount = KCROC_GRAPH.business.aggregateRating.reviewCount;

  try {
    // 3. Fetch from Google Places API (New)
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    });

    if (!response.ok) {
      console.warn(`⚠️  GBP API fetch failed (${response.status}). Check your API Key/Place ID. Proceeding with build...`);
      return;
    }

    const data = await response.json();
    const liveRating = data.rating;
    const liveCount = data.userRatingCount;

    // 4. Compare and Warn
    if (liveRating !== hardcodedRating || liveCount !== hardcodedCount) {
      console.warn('\n==================================================');
      console.warn(' ⚠️  GBP RATING DRIFT DETECTED ⚠️');
      console.warn('==================================================');
      console.warn(` Graph Data (Stale) : ${hardcodedRating}★ with ${hardcodedCount} reviews.`);
      console.warn(` Live Google Data   : ${liveRating}★ with ${liveCount} reviews.`);
      console.warn('--------------------------------------------------');
      console.warn(' -> Action required: Update KCROC_GRAPH.business.aggregateRating');
      console.warn(' -> File location: app/frontend/src/data/graph.ts\n');
    } else {
      console.log(`✅ GBP rating is perfectly synced (${hardcodedRating}★, ${hardcodedCount} reviews).`);
    }
  } catch (error) {
    console.warn('⚠️  Network error while fetching GBP rating. Proceeding with build...');
  }
}

checkGBPRating();
