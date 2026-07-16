// File: app/frontend/scripts/check-gbp-rating.ts
import { KCROC_GRAPH } from '../src/data/graph';

interface SerpApiMapsResponse {
  place_results?: {
    title?: string;
    rating?: number;
    reviews?: number;
  };
}

async function checkGBPRating(): Promise<void> {
  console.log('🔍 Checking live Google Business Profile rating via SerpApi...');

  const apiKey = process.env.SERPAPI_KEY;
  // Exact name and location to lock onto the correct Google Maps entity
  const searchQuery = "Kuwait Computer Repair On Call Hawalli"; 

  if (!apiKey) {
    console.warn('⚠️ Skipping GBP rating check: SERPAPI_KEY not set in environment.');
    return;
  }

  // 1. Read hardcoded graph data
  const hardcodedRating = parseFloat(KCROC_GRAPH.business.aggregateRating.ratingValue);
  const hardcodedCount = Number(KCROC_GRAPH.business.aggregateRating.reviewCount);

  try {
    // 2. Fetch data using SerpApi's Google Maps engine with a corrected endpoint layout
    const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`⚠️ SerpApi fetch failed (${response.status}). Proceeding with build...`);
      return;
    }

    const data: SerpApiMapsResponse = await response.json();
    
    if (!data.place_results) {
      console.warn('⚠️ Could not find exact business results in SerpApi response. Check your searchQuery.');
      return;
    }

    const liveRating = data.place_results.rating ?? 0;
    const liveCount = data.place_results.reviews ?? 0;

    // 3. Compare and Warn
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
      console.log(`✅ GBP rating perfectly synced (${hardcodedRating}★, ${hardcodedCount} reviews).`);
    }
  } catch (error) {
    console.warn('⚠️ Network error while calling SerpApi. Proceeding with build...');
  }
}

checkGBPRating();
