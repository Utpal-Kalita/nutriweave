import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateRiceRecommendation,
  calculateWorkbookRecommendation,
  mapRecommendationToProduct,
  validateRecommendationAnswers,
} from './recommendation';

test('returns Level 1 when nutrition priority is greater than taste', () => {
  const result = calculateWorkbookRecommendation({ protein: 3, minerals: 1, gi: 2, taste: 2 });
  assert.deepEqual(result, { level: 1, nutritionPriority: 3, tastePriority: 2 });
});

test('returns Level 2 when nutrition priority equals taste', () => {
  const result = calculateWorkbookRecommendation({ protein: 2, minerals: 1, gi: 2, taste: 2 });
  assert.deepEqual(result, { level: 2, nutritionPriority: 2, tastePriority: 2 });
});

test('returns Level 3 when nutrition priority is lower than taste', () => {
  const result = calculateWorkbookRecommendation({ protein: 1, minerals: 1, gi: 2, taste: 3 });
  assert.deepEqual(result, { level: 3, nutritionPriority: 2, tastePriority: 3 });
});

test('requires all five questionnaire answers', () => {
  const validation = validateRecommendationAnswers({ protein: 3, minerals: 2, gi: 1, taste: 2 });
  assert.equal(validation.valid, false);
  assert.equal(validation.errors.overallNutrition, 'Choose one option from the three-point scale.');
});

test('rejects answers outside the three-point scale', () => {
  const validation = validateRecommendationAnswers({
    protein: 4 as 1,
    minerals: 2,
    gi: 1,
    taste: 2,
    overallNutrition: 3,
  });
  assert.equal(validation.valid, false);
  assert.ok(validation.errors.protein);
});

test('collects overall nutrition without changing the current workbook result', () => {
  const lowOverall = calculateRiceRecommendation({ protein: 3, minerals: 2, gi: 2, taste: 2, overallNutrition: 1 });
  const highOverall = calculateRiceRecommendation({ protein: 3, minerals: 2, gi: 2, taste: 2, overallNutrition: 3 });

  assert.equal(lowOverall.level, highOverall.level);
  assert.equal(lowOverall.overallNutritionAffectsResult, false);
  assert.equal(highOverall.overallNutritionAffectsResult, false);
});

test('matches the workbook distribution across all 81 four-input combinations', () => {
  const counts = { 1: 0, 2: 0, 3: 0 };
  const scores = [1, 2, 3] as const;

  for (const protein of scores) {
    for (const minerals of scores) {
      for (const gi of scores) {
        for (const taste of scores) {
          const { level } = calculateWorkbookRecommendation({ protein, minerals, gi, taste });
          counts[level] += 1;
        }
      }
    }
  }

  assert.deepEqual(counts, { 1: 45, 2: 27, 3: 9 });
});

test('maps a recommendation only through explicit product metadata', () => {
  const products = [
    { id: 'legacy-level-2', level: 2, recommendation_level: undefined },
    { id: 'workbook-level-2', recommendation_level: 2 as const },
  ];

  assert.equal(mapRecommendationToProduct(products, 2)?.id, 'workbook-level-2');
  assert.equal(mapRecommendationToProduct(products, 1), null);
});
