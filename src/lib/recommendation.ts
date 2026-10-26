export type PreferenceScore = 1 | 2 | 3;
export type RecommendationLevel = 1 | 2 | 3;
export type RecommendationQuestionId = 'protein' | 'minerals' | 'gi' | 'taste' | 'overallNutrition';

export interface RecommendationAnswers {
  protein: PreferenceScore;
  minerals: PreferenceScore;
  gi: PreferenceScore;
  taste: PreferenceScore;
  overallNutrition: PreferenceScore;
}

export interface RecommendationQuestion {
  id: RecommendationQuestionId;
  label: string;
  question: string;
  supportingText: string;
}

export interface RecommendationResult {
  level: RecommendationLevel;
  polishingPercentage: 25 | 50 | 75;
  variantName: string;
  nutritionPriority: PreferenceScore;
  tastePriority: PreferenceScore;
  reason: string;
  algorithmVersion: typeof RECOMMENDATION_ALGORITHM_VERSION;
  isProvisional: true;
  overallNutritionAffectsResult: false;
}

export interface RecommendationProduct {
  id: string;
  recommendation_level?: RecommendationLevel;
}

export const RECOMMENDATION_ALGORITHM_VERSION = 'workbook-v1-four-input' as const;

export const UNRESOLVED_OVERALL_NUTRITION_RULE =
  'How should the Overall Nutritional Value answer influence the calculation of nutrition priority and the final recommendation?';

// Keep customer-facing questionnaire copy here so wording can change without editing UI components.
export const RECOMMENDATION_QUESTIONS: readonly RecommendationQuestion[] = [
  {
    id: 'protein',
    label: 'Protein',
    question: 'How important is protein content to you?',
    supportingText: 'Tell us how strongly protein influences your rice choice.',
  },
  {
    id: 'minerals',
    label: 'Minerals',
    question: 'How important is mineral content to you?',
    supportingText: 'Consider naturally occurring minerals when choosing your preference.',
  },
  {
    id: 'gi',
    label: 'Blood sugar response',
    question: 'How important is managing the blood sugar response to you?',
    supportingText: 'This records your preference only and is not medical guidance.',
  },
  {
    id: 'taste',
    label: 'Taste and texture',
    question: 'How important is a soft texture similar to conventional white rice?',
    supportingText: 'More polishing generally creates a softer, more familiar texture.',
  },
  {
    id: 'overallNutrition',
    label: 'Overall nutrition',
    question: 'How important is overall nutritional value to you?',
    supportingText: 'We save this answer, but it does not yet affect the provisional match.',
  },
] as const;

export const PREFERENCE_OPTIONS: readonly { value: PreferenceScore; label: string; description: string }[] = [
  { value: 1, label: 'Matters little', description: 'Not a deciding factor' },
  { value: 2, label: 'Moderately important', description: 'Part of my decision' },
  { value: 3, label: 'Matters most', description: 'A top priority for me' },
] as const;

export const RECOMMENDATION_VARIANTS: Record<RecommendationLevel, {
  polishingPercentage: 25 | 50 | 75;
  variantName: string;
}> = {
  1: { polishingPercentage: 25, variantName: 'Nutriweave Level 1 (25% polish)' },
  2: { polishingPercentage: 50, variantName: 'Nutriweave Level 2 (50% polish)' },
  3: { polishingPercentage: 75, variantName: 'Nutriweave Level 3 (75% polish)' },
};

function isPreferenceScore(value: unknown): value is PreferenceScore {
  return value === 1 || value === 2 || value === 3;
}

export function validateRecommendationAnswers(answers: Partial<RecommendationAnswers>) {
  const errors: Partial<Record<RecommendationQuestionId, string>> = {};

  for (const question of RECOMMENDATION_QUESTIONS) {
    if (!isPreferenceScore(answers[question.id])) {
      errors[question.id] = 'Choose one option from the three-point scale.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateWorkbookRecommendation(
  answers: Pick<RecommendationAnswers, 'protein' | 'minerals' | 'gi' | 'taste'>,
) {
  if (![answers.protein, answers.minerals, answers.gi, answers.taste].every(isPreferenceScore)) {
    throw new TypeError('Protein, minerals, GI, and taste answers must be scores from 1 to 3.');
  }

  const nutritionPriority = Math.max(answers.protein, answers.minerals, answers.gi) as PreferenceScore;
  const tastePriority = answers.taste;
  const level: RecommendationLevel = nutritionPriority > tastePriority
    ? 1
    : nutritionPriority < tastePriority
      ? 3
      : 2;

  return { level, nutritionPriority, tastePriority };
}

export function calculateRiceRecommendation(answers: RecommendationAnswers): RecommendationResult {
  const validation = validateRecommendationAnswers(answers);
  if (!validation.valid) {
    throw new TypeError('All five recommendation questions require a score from 1 to 3.');
  }

  const workbookResult = calculateWorkbookRecommendation(answers);
  const variant = RECOMMENDATION_VARIANTS[workbookResult.level];
  const reason = workbookResult.level === 1
    ? 'At least one nutrition preference is stronger than your preference for a soft, white-rice-like texture.'
    : workbookResult.level === 3
      ? 'Your preference for a soft, white-rice-like texture is stronger than your highest nutrition preference.'
      : 'Your highest nutrition preference and your texture preference are equally important.';

  return {
    ...workbookResult,
    ...variant,
    reason,
    algorithmVersion: RECOMMENDATION_ALGORITHM_VERSION,
    isProvisional: true,
    overallNutritionAffectsResult: false,
  };
}

export function mapRecommendationToProduct<T extends RecommendationProduct>(
  products: readonly T[],
  level: RecommendationLevel,
): T | null {
  return products.find((product) => product.recommendation_level === level) ?? null;
}
