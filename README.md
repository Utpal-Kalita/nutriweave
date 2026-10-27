# Nutriweave

Nutriweave is a React ecommerce demo for personalized protein rice developed for **Arnatattva LLP**. Customers answer five preference questions, receive a provisional rice polishing-level recommendation, and can configure and purchase the mapped demo product through the existing cart and mock checkout flow.

> **Current status:** The workbook's original four-input rule is active. A five-input extension that includes Nutritional in the maximum calculation is implemented and exhaustively tested as a candidate, but must not be activated until the professor approves it.

## Contents

- [Application architecture](#application-architecture)
- [Customer flow](#customer-flow)
- [Questionnaire](#questionnaire)
- [Active workbook recommendation rule](#active-workbook-recommendation-rule)
- [Proposed five-input extension](#proposed-five-input-extension)
- [All 243 combinations](#all-243-combinations)
- [Rice variants and demo products](#rice-variants-and-demo-products)
- [Product and nutrition data](#product-and-nutrition-data)
- [Persistence and authentication](#persistence-and-authentication)
- [Running locally](#running-locally)
- [Testing](#testing)
- [Project structure](#project-structure)
- [Known limitations](#known-limitations)

## Application Architecture

| Area | Implementation |
|---|---|
| Framework | React 19 with TypeScript |
| Build tool | Vite 6 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 with project design tokens |
| Authentication | Browser-only demo authentication |
| Persistence | Browser `localStorage` |
| Recommendation engine | Pure deterministic TypeScript functions |
| Testing | Node test runner through the existing `tsx` dependency |
| Animation | Motion React; reduced-motion preferences are respected |
| Icons | Lucide React |

The application is currently client-side. A Supabase migration exists under `supabase/`, but the running demo does not use Supabase as its active database or authentication provider.

### Main providers

`src/App.tsx` composes the application in this order:

1. `AuthProvider`
2. `CartProvider`
3. Motion configuration
4. `BrowserRouter`
5. Lazy-loaded route components

### Main routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Product landing page | Public |
| `/auth` | Demo sign in and registration | Public |
| `/how-it-works` | Recommendation explanation | Public |
| `/priority` | Five-question recommender | Authenticated |
| `/match` | Provisional recommendation and mapped product | Authenticated |
| `/scale` | Level 1–3 polishing explanation | Public |
| `/customize` | Product size, quantity, and delivery frequency | Authenticated |
| `/cart` | Address, payment method, and mock checkout | Authenticated |
| `/impact` | Product evidence and verification status | Authenticated |
| `/profile` | Account, saved recommendation, and order history | Authenticated |
| `/admin` | Demo dashboard | Admin demo profile |
| `/admin/products` | Demo product and recommendation mappings | Admin demo profile |
| `/admin/orders` | Demo order management | Admin demo profile |

## Customer Flow

1. The customer opens the Nutriweave landing page.
2. The customer signs in with the browser-only demo authentication.
3. The customer answers all five preference questions.
4. The application validates every answer.
5. The deterministic recommendation engine calculates a Level 1, 2, or 3 result.
6. The result is mapped to an existing demo product through explicit product metadata.
7. The customer chooses pack size, quantity, and delivery frequency.
8. The customer enters a delivery address and selects a mock payment method.
9. The completed demo order is stored in `localStorage` and shown in Profile.

No language model selects the recommendation or product.

## Questionnaire

The questionnaire contains five separate parameters confirmed by the professor:

1. **Protein**
2. **Minerals**
3. **GI**
4. **Taste**
5. **Nutritional**

Each question uses the same three-point scale:

| Score | Customer label |
|---:|---|
| 1 | Matters little |
| 2 | Moderately important |
| 3 | Matters most |

Question wording and option labels are centralized in `src/lib/recommendation.ts`, so they can be changed without rewriting the questionnaire component.

The current customer-facing wording is:

- How important is protein content to you?
- How important is mineral content to you?
- How important is managing the blood sugar response to you?
- How important is a soft texture similar to conventional white rice?
- How important is overall nutritional value to you?

The GI question records a customer preference only. It is not medical guidance and does not claim that a product manages diabetes or guarantees a blood sugar response.

## Active Workbook Recommendation Rule

The source workbook is:

`Nutriweave_Rice_Recommender.xlsx`

The workbook contains these worksheets:

- `Calculator`
- `Variant Data`
- `Scenarios`
- `All combinations`
- `Notes`

The original workbook uses Protein, Minerals, GI/Blood Sugar, and Taste.

It calculates:

$$
\text{Nutrition Priority} = \max(P, M, GI)
$$

Where:

- $P$ = Protein score
- $M$ = Minerals score
- $GI$ = Glycemic index preference score

Nutrition Priority is compared with Taste:

```text
if Nutrition Priority > Taste:
    recommendation = Level 1
else if Nutrition Priority < Taste:
    recommendation = Level 3
else:
    recommendation = Level 2
```

The active strategy identifier is:

```ts
WORKBOOK_PRIORITY_STRATEGY
```

Its algorithm version is:

```text
workbook-v1-four-input
```

The active application collects and stores Nutritional, but Nutritional does not affect this rule.

### Original 81-combination distribution

The workbook contains every `3^4 = 81` combination for the original four inputs.

| Result | Combinations |
|---|---:|
| Level 1 | 45 |
| Level 2 | 27 |
| Level 3 | 9 |
| Total | 81 |

This distribution is reproduced by automated tests.

## Proposed Five-Input Extension

The most reasonable interpretation of the professor's messages is to include Nutritional as a fourth input to Nutrition Priority:

$$
\text{Nutrition Priority} = \max(P, M, GI, N)
$$

Where:

- $P$ = Protein score
- $M$ = Minerals score
- $GI$ = Glycemic index preference score
- $N$ = Nutritional score

The existing Taste comparison remains unchanged.

This proposal is implemented under the explicit candidate identifier:

```ts
CANDIDATE_INCLUDE_NUTRITIONAL_STRATEGY
```

Its candidate algorithm version is:

```text
candidate-v2-include-nutritional-in-max
```

It is **not** the application default.

### Example

Given:

| Parameter | Score |
|---|---:|
| Protein | 2 |
| Minerals | 2 |
| GI | 1 |
| Nutritional | 3 |
| Taste | 2 |

The active workbook rule calculates:

```text
max(2, 2, 1) = 2
2 equals Taste 2
Result: Level 2
```

The proposed extension calculates:

```text
max(2, 2, 1, 3) = 3
3 is greater than Taste 2
Result: Level 1
```

The extension can raise Nutrition Priority but never lower it, and it treats Protein, Minerals, GI, and Nutritional equally.

### Approval question

Before activating the candidate, send this question to the professor:

> Sir, for the updated five-question logic, should I calculate Nutrition Priority as the maximum of Protein, Minerals, GI, and Nutritional scores, and then compare it with Taste as in the existing sheet?

Until this is approved, the application must continue using `WORKBOOK_PRIORITY_STRATEGY`.

## All 243 Combinations

Five questions with three answers each produce:

$$
3^5 = 243
$$

Every combination has been generated and evaluated under both strategies.

The complete comparison is stored in:

[`docs/recommendation-combinations-243.csv`](docs/recommendation-combinations-243.csv)

Generate it again with:

```bash
npm run generate:recommendations
```

The CSV contains:

- Protein
- Minerals
- GI
- Taste
- Nutritional
- Active Nutrition Priority
- Active level and polishing percentage
- Candidate Nutrition Priority
- Candidate level and polishing percentage
- Whether the candidate changes the recommendation

### Five-question distributions

| Strategy | Level 1 | Level 2 | Level 3 | Total |
|---|---:|---:|---:|---:|
| Active workbook rule; Nutritional collected only | 135 | 81 | 27 | 243 |
| Candidate maximum including Nutritional | 145 | 81 | 17 | 243 |

The candidate changes **19 of 243 recommendations**. This is why the candidate cannot be treated as a harmless implementation detail.

## Rice Variants and Demo Products

The workbook defines three recommendation variants:

| Recommendation | Workbook polishing level |
|---|---:|
| Level 1 | 25% polishing |
| Level 2 | 50% polishing |
| Level 3 | 75% polishing |

Recommendation levels are not product IDs. Products opt into the recommender through explicit metadata:

```ts
interface DemoProduct {
  recommendation_level?: 1 | 2 | 3;
  polishing_percentage?: 25 | 50 | 75;
}
```

The three existing demo products are mapped without creating duplicates:

| Existing product ID | Demo product | Recommendation | Polishing | Price |
|---|---|---:|---:|---:|
| `demo-product-1` | Nutrifibe Level 1 Protein Rice | Level 1 | 25% | ₹549 |
| `demo-product-2` | Nutrifibe Level 2 Protein Rice | Level 2 | 50% | ₹499 |
| `demo-product-3` | Nutrifibe Level 3 Protein Rice | Level 3 | 75% | ₹449 |

Previously seeded browser catalogs are migrated in place by product ID. Existing products are updated with mapping metadata rather than duplicated.

These are demo products. Their names, prices, polishing assignments, and product images must be confirmed against Arnatattva LLP's production catalog before launch.

## Product and Nutrition Data

The workbook's `Variant Data` sheet contains assumptions for:

- Glycemic index
- Protein
- Fibre
- Magnesium
- Phosphorus
- Iron
- Zinc
- Taste and texture

The 25% and 50% values are calculated through linear interpolation between editable endpoints. They are not laboratory measurements of Nutriweave products.

The application therefore does not:

- Present workbook estimates as laboratory-verified facts
- Label any variant as low GI
- Claim suitability for diabetes management
- Guarantee a blood sugar response
- Treat preference scores as nutrient measurements

Verified laboratory or supplier measurements should be stored separately as product data when available.

## Persistence and Authentication

The current application is a browser-only demo.

Data is stored under these `localStorage` keys:

| Key | Data |
|---|---|
| `nutriweave:demo-session` | Current demo account |
| `nutriweave:demo-profiles` | Questionnaire answers and recommendation |
| `nutriweave:demo-products` | Demo product catalog and mappings |
| `nutriweave:demo-cart` | Current cart item |
| `nutriweave:demo-orders` | Completed mock orders |

Demo authentication accepts any email and password. It must not be treated as production authentication.

Saved recommendation data includes:

- All five answers
- Active algorithm version
- Recommendation Level 1–3
- Explicitly mapped product ID
- Legacy priority fields for backward compatibility

## Running Locally

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Testing

Run all deterministic recommendation tests:

```bash
npm test
```

Run the TypeScript check:

```bash
npm run lint
```

Current test coverage includes:

- Nutrition Priority greater than Taste
- Nutrition Priority equal to Taste
- Nutrition Priority lower than Taste
- Missing-answer validation
- Invalid score validation
- Nutritional collected but inactive by default
- Explicit candidate activation
- Original 81-combination distribution
- Both 243-combination distributions
- Product mapping by explicit metadata
- One unique demo product for each recommendation level

## Project Structure

```text
src/
  components/
    Layout.tsx                 Shared navigation and route shell
    ProtectedRoute.tsx         Authenticated route guard
    AdminRoute.tsx             Admin route guard
  contexts/
    AuthContext.tsx            Demo authentication
    CartContext.tsx            Single-item demo cart
  lib/
    recommendation.ts          Questions, validation, strategies, variants, mapping
    recommendation.test.ts     Deterministic and exhaustive tests
    demoStore.ts               localStorage products, profiles, and orders
    pricing.ts                 Demo subscription and promotion pricing
  pages/
    PrioritySelection.tsx      Five-question questionnaire
    MatchResult.tsx            Recommendation and mapped product
    CustomizeOrder.tsx         Product options and cart handoff
    Cart.tsx                   Mock checkout
    Profile.tsx                Saved result and order history
scripts/
  generate-recommendation-combinations.ts
docs/
  recommendation-system.md
  recommendation-combinations-243.csv
design-system/
  nutriweave/MASTER.md
```

## Known Limitations

- The Nutritional parameter's role has not been approved.
- The candidate strategy is intentionally inactive.
- Product records and prices are demo data.
- Nutritional workbook values are assumptions rather than measurements.
- Authentication and persistence are browser-only.
- The cart currently stores one product at a time.
- Payment processing is simulated.
- Delivery pricing and discounts are demo behavior.
- Supabase is not active in the running application.
- Existing images are stand-ins until Arnatattva LLP supplies production assets.

## Additional Documentation

- [Recommendation system details](docs/recommendation-system.md)
- [All 243 recommendation combinations](docs/recommendation-combinations-243.csv)
- [Persisted UI design system](design-system/nutriweave/MASTER.md)
