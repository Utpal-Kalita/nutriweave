# Nutriweave Recommendation System

## Status

The professor has confirmed that the questionnaire contains five separate parameters: Protein, Minerals, GI, Taste, and Nutritional. The supplied workbook still defines the calculation using only Protein, Minerals, GI, and Taste, so the active recommendation remains **provisional**.

The unresolved business question is:

> Should Nutritional be included in `nutritionalPriority = max(protein, minerals, gi, nutritional)`, or influence nutritional priority in another approved way?

Until Arnatattva LLP confirms this rule, Nutritional is stored with the profile but does not affect the active recommendation. The include-in-maximum interpretation is implemented and tested only as an explicit candidate strategy.

## Source Workbook

The implementation was checked against `Nutriweave_Rice_Recommender.xlsx` supplied outside the repository.

Relevant sheets:

- `Calculator`
- `Variant Data`
- `Scenarios`
- `All combinations`
- `Notes`

The workbook contains all 81 combinations for four three-point answers.

## Current Questions

Question wording and scale labels are configured in `src/lib/recommendation.ts` so copy can be changed without modifying UI components.

The five answers are:

1. Protein
2. Minerals
3. Blood sugar response / GI preference
4. Taste and texture
5. Nutritional

All answers use:

- `1`: Matters little
- `2`: Moderately important
- `3`: Matters most

## Verified Workbook Rule

The deterministic application rule is:

```text
nutritionPriority = max(protein, minerals, gi)

if nutritionPriority > taste:
    level = 1
else if nutritionPriority < taste:
    level = 3
else:
    level = 2
```

The rule is implemented as a pure function in `src/lib/recommendation.ts`. It does not call Gemini or any other LLM.

## Candidate Five-Parameter Extension

The investigated candidate is:

```text
nutritionPriority = max(protein, minerals, gi, nutritional)

if nutritionPriority > taste:
    level = 1
else if nutritionPriority < taste:
    level = 3
else:
    level = 2
```

This candidate is available only through the explicit strategy identifier:

```ts
CANDIDATE_INCLUDE_NUTRITIONAL_STRATEGY
```

The application default remains:

```ts
WORKBOOK_PRIORITY_STRATEGY
```

No UI or persisted recommendation silently activates the candidate strategy.

## All 243 Combinations

`npm run generate:recommendations` generates `docs/recommendation-combinations-243.csv` with every `3^5 = 243` answer combination and both strategy results.

| Strategy | Level 1 | Level 2 | Level 3 | Total |
|---|---:|---:|---:|---:|
| Active workbook rule (Nutritional collected only) | 135 | 81 | 27 | 243 |
| Candidate maximum including Nutritional | 145 | 81 | 17 | 243 |

The candidate changes 19 of the 243 recommendations. This difference is why it must not be activated without explicit business approval.

## Workbook Variants

| Recommendation | Workbook definition |
|---|---:|
| Level 1 | 25% polishing |
| Level 2 | 50% polishing |
| Level 3 | 75% polishing |

These are recommendation variants, not product IDs.

## Product Mapping

Products can opt into the recommender with explicit catalog metadata:

```ts
interface DemoProduct {
  // Existing product fields...
  recommendation_level?: 1 | 2 | 3;
  polishing_percentage?: 25 | 50 | 75;
}
```

`mapRecommendationToProduct` only matches `recommendation_level`. It does not infer a mapping from the existing legacy `level`, product order, name, or ID.

### Demo Catalog Mapping

The active browser catalog contains three existing demo products. They are explicitly mapped without creating duplicates:

| Existing product | Recommendation level | Workbook polishing variant |
|---|---:|---:|
| `demo-product-1` | Level 1 | 25% |
| `demo-product-2` | Level 2 | 50% |
| `demo-product-3` | Level 3 | 75% |

Previously seeded browser catalogs are migrated by product ID to add this mapping metadata. The mapping lives in the data layer, not the questionnaire or result UI.

These remain demo products. Their names, prices, and variant assignments must be replaced or confirmed against Arnatattva LLP's production catalog before launch. Nutritional measurements remain unverified.

## Nutritional Data Caveat

The workbook's GI, protein, fibre, magnesium, phosphorus, iron, and zinc values are assumptions or linear interpolations between editable endpoints. They are not treated as laboratory-verified Nutriweave product data.

The application therefore does not:

- Display those estimates as measured product facts.
- Label a variant as low GI.
- Claim suitability for diabetes management.
- Guarantee a blood sugar response.
- Mix customer preference scores with nutrient measurements.

Verified laboratory or supplier data should be stored as product data separately from recommendation answers when available.

## Persistence

The current demo stores recommendation data in the browser profile:

- All five answers.
- Recommendation Level 1–3.
- Algorithm version.
- Explicitly mapped product ID, or `null` when no product is mapped.
- Legacy protein, mineral, GI, and matched-level fields for backward compatibility.

The active application uses `localStorage`; the Supabase migration in the repository is dormant.

## Tests

The tests use Node's built-in test runner through the existing `tsx` dependency:

```bash
npm test
```

Coverage includes:

- Nutrition priority greater than taste.
- Nutrition priority equal to taste.
- Nutrition priority lower than taste.
- Missing fifth answer validation.
- Out-of-range answer validation.
- Confirmation that Nutritional does not change the active result.
- Explicit candidate tests where including Nutritional changes the result.
- The workbook's 45 / 27 / 9 result distribution across all 81 four-input combinations.
- Both strategy distributions across all 243 five-input combinations.
- Explicit product mapping and unavailable-product fallback.
- One unique mapped demo product for every workbook level.

## Updating The Fifth Rule

Once the business rule is confirmed:

1. Confirm whether `CANDIDATE_INCLUDE_NUTRITIONAL_STRATEGY` is correct or provide a different rule.
2. Change the active algorithm version only after approval.
3. Add approved example personas and acceptance outcomes.
4. Update the provisional messaging in the questionnaire and result pages.
5. Decide whether existing saved recommendations should be recalculated or retained under their recorded version.
