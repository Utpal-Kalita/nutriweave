# Nutriweave Recommendation System

## Status

The current recommendation is **provisional**. The application collects five customer answers, but the supplied workbook defines a rule for only four of them.

The unresolved business question is:

> How should the Overall Nutritional Value answer influence the calculation of nutrition priority and the final recommendation?

Until Arnatattva LLP confirms this rule, Overall Nutritional Value is stored with the profile but does not affect the recommendation. Generating all 243 five-answer combinations would not define the missing business rule.

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
5. Overall nutritional value

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

### Current Catalog Gap

The active browser catalog contains three legacy products at levels 2, 5, and 8. None explicitly identifies itself as the workbook's 25%, 50%, or 75% polishing variant. The dormant Supabase seed also contains a separate 1–10 catalog and is not used by the running application.

Therefore, the application currently displays a safe product-unavailable fallback after calculating the variant. It does not create duplicate products or substitute an unrelated product.

To enable ordering, an existing verified product record must be updated with the appropriate `recommendation_level` and `polishing_percentage`. Product IDs remain catalog-owned and are not hardcoded in the questionnaire or result UI.

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
- Confirmation that Overall Nutritional Value does not yet change the result.
- The workbook's 45 / 27 / 9 result distribution across all 81 four-input combinations.
- Explicit product mapping and unavailable-product fallback.

## Updating The Fifth Rule

Once the business rule is confirmed:

1. Add the fifth answer to the calculation in `calculateRiceRecommendation`.
2. Change the algorithm version.
3. Add tests for approved example personas and all relevant boundaries.
4. Update the provisional messaging in the questionnaire and result pages.
5. Decide whether existing saved recommendations should be recalculated or retained under their recorded version.
