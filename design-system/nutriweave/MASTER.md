# Nutriweave Design System

## Product

- Type: consumer health-food ecommerce and preference recommender.
- Audience: health-conscious Indian families.
- Primary action: complete five questions and understand the provisional rice level.
- Stack: React, Vite, Tailwind CSS.

## Pattern

Use UI/UX Pro Max's **Product Demo + Features** structure:

1. Product-led hero with rice photography.
2. Interactive recommender entry point.
3. Three-level range comparison.
4. Evidence and product-data status.
5. Strong recommender CTA.

## Style

Use **Vibrant & Block-based** composition inspired by the user-provided food-brand reference:

- Bold color fields with high contrast.
- Large product and agriculture photography.
- Rounded organic product frames.
- Distinct section colors rather than repeated white cards.
- Clear hover color shifts without layout movement.
- No invented certifications, testimonials, metrics, or nutrition claims.

## Color Tokens

The implementation uses OKLCH tokens in `src/tokens.css`:

| Role | Token | Intent |
|---|---|---|
| Primary | `--color-ink` | Deep leaf green |
| Product field | `--color-harvest` | Rice and harvest yellow |
| Supporting field | `--color-sky` | Friendly cool contrast |
| Action signal | `--color-accent` | Warm orange |
| Background | `--color-paper` | Warm rice cream |
| Secondary background | `--color-paper-2` | Toasted cream |

Normal text must maintain at least 4.5:1 contrast. Color is never the only state indicator.

## Typography

- Heading and wordmark: Bricolage Grotesque, weights 600–800.
- Body and controls: DM Sans, weights 400–700.
- Comparable figures only: DM Mono 500.
- Body copy: 16px minimum.
- Display headings: 32px minimum, responsive through the shared token scale.

## Components

### Buttons

- Minimum 44px hit target.
- Primary: deep green fill, cream text, pill shape.
- Secondary: transparent with deep green border.
- Hover: color shift only, no scaling or layout movement.
- Focus: immediate orange outline.
- Disabled: native disabled attribute, reduced opacity, not-allowed cursor.

### Cards and blocks

- Use 16–32px radius for product and questionnaire blocks.
- Prefer section-level color blocks over grids of identical white cards.
- Never nest bordered cards inside bordered cards.
- Shadows are restrained and use the shared `--shadow-card` token.

### Inputs

- Controlled React inputs.
- Visible labels.
- 16px text minimum.
- Stable border width and visible focus outline.
- Errors use `role="alert"` or `aria-live` and explanatory text.

## Interaction

- Every clickable element uses a pointer cursor.
- Feedback uses 150–300ms color, border, opacity, or transform transitions.
- No layout-shifting hover effects.
- Respect `prefers-reduced-motion`.
- All functionality must be keyboard accessible.
- Icon-only buttons require accessible labels.

## Responsive Requirements

Verify at 375px, 768px, 1024px, and 1440px.

- No horizontal page scrolling.
- Fixed navigation and action bars reserve content space.
- Image grids use `minmax(0, 1fr)` tracks.
- Mobile controls remain at least 44px tall.

## Forbidden Patterns

- Emoji UI icons.
- Placeholder-only form labels.
- Unsupported low-GI or medical claims.
- Invented product reviews, certifications, or farm statistics.
- Invisible focus states.
- Hover scaling that shifts neighboring content.
- Red generic food palette from the initial automated match; it conflicts with the established Nutriweave brand and supplied reference.
