import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Dumbbell, Gem, HeartPulse, Info, Loader2, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ensureDemoProfile, getDemoProducts, saveDemoProfile } from '../lib/demoStore';
import {
  calculateRiceRecommendation,
  mapRecommendationToProduct,
  PREFERENCE_OPTIONS,
  PreferenceScore,
  RECOMMENDATION_QUESTIONS,
  RecommendationAnswers,
  RecommendationQuestionId,
  RECOMMENDATION_ALGORITHM_VERSION,
  validateRecommendationAnswers,
} from '../lib/recommendation';

const questionVisuals = {
  protein: { icon: Dumbbell, color: 'bg-tertiary-container', accent: 'text-tertiary', bg: 'bg-tertiary-container/10' },
  minerals: { icon: Gem, color: 'bg-primary-container', accent: 'text-primary', bg: 'bg-primary-container/10' },
  gi: { icon: Activity, color: 'bg-secondary', accent: 'text-secondary', bg: 'bg-secondary-container/20' },
  taste: { icon: Utensils, color: 'bg-amber-600', accent: 'text-amber-700', bg: 'bg-amber-100/60' },
  overallNutrition: { icon: HeartPulse, color: 'bg-slate-700', accent: 'text-slate-700', bg: 'bg-slate-100' },
} satisfies Record<RecommendationQuestionId, {
  icon: typeof Dumbbell;
  color: string;
  accent: string;
  bg: string;
}>;

function asPreferenceScore(value: number | undefined): PreferenceScore | undefined {
  return value === 1 || value === 2 || value === 3 ? value : undefined;
}

export default function PrioritySelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Partial<RecommendationAnswers>>({});
  const [errors, setErrors] = useState<Partial<Record<RecommendationQuestionId, string>>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const profile = ensureDemoProfile(user);
    if (profile.recommendation_answers) {
      setAnswers(profile.recommendation_answers);
      return;
    }

    // Preserve existing preferences while requiring the two newly introduced answers.
    setAnswers({
      protein: asPreferenceScore(profile.protein_priority),
      minerals: asPreferenceScore(profile.minerals_priority),
      gi: asPreferenceScore(profile.glycemic_priority),
    });
  }, [user]);

  const updateAnswer = (id: RecommendationQuestionId, value: PreferenceScore) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setSubmissionError(null);
  };

  const handleSaveAndMatch = () => {
    if (!user) {
      navigate('/auth', { state: { from: { pathname: '/priority' } } });
      return;
    }

    const validation = validateRecommendationAnswers(answers);
    setSubmissionError(null);
    if (!validation.valid) {
      setErrors(validation.errors);
      const firstInvalidQuestion = RECOMMENDATION_QUESTIONS.find((question) => validation.errors[question.id]);
      document.getElementById(`question-${firstInvalidQuestion?.id}`)?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const completeAnswers = answers as RecommendationAnswers;
      const result = calculateRiceRecommendation(completeAnswers);
      const matchedProduct = mapRecommendationToProduct(getDemoProducts(), result.level);
      const profile = ensureDemoProfile(user);

      saveDemoProfile({
        ...profile,
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
        protein_priority: completeAnswers.protein,
        minerals_priority: completeAnswers.minerals,
        glycemic_priority: completeAnswers.gi,
        taste_priority: completeAnswers.taste,
        overall_nutrition_priority: completeAnswers.overallNutrition,
        matched_level: result.level,
        recommendation_answers: completeAnswers,
        recommendation_level: result.level,
        recommendation_version: RECOMMENDATION_ALGORITHM_VERSION,
        matched_product_id: matchedProduct?.id ?? null,
        updated_at: new Date().toISOString(),
      });

      navigate('/match');
    } catch (error) {
      console.error('Error saving recommendation:', error);
      setSubmissionError('We could not save your answers. Please try again.');
      setSubmitting(false);
    }
  };

  const answeredCount = Object.values(answers).filter((value) => value !== undefined).length;

  return (
    <div className="flex min-h-full flex-col bg-surface">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 pb-40 pt-6 sm:px-8 lg:gap-10 lg:px-10 lg:pb-8 lg:pt-12">
        <div>
          <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <span>Your rice preferences</span>
            <span>{answeredCount} of 5 answered</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-container-highest" aria-hidden="true">
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${answeredCount * 20}%` }} />
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Five quick questions</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-on-surface lg:text-5xl">What matters in your everyday rice?</h1>
          <p className="mt-4 text-base leading-relaxed text-on-surface-variant lg:text-lg">
            Choose one answer for every question. You can change any response before viewing your match.
          </p>
        </div>

        <div className="grid gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:grid-cols-3">
          {PREFERENCE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">{option.value}</span>
              <div>
                <p className="text-sm font-bold text-on-surface">{option.label}</p>
                <p className="text-xs text-on-surface-variant">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <Info className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
          <p className="text-sm leading-relaxed">
            <strong>Provisional method:</strong> your overall nutritional value answer is collected and saved, but the verified workbook rule currently uses only protein, minerals, blood sugar response, and taste. It does not yet affect this match.
          </p>
        </div>

        {Object.values(errors).some(Boolean) && (
          <div className="rounded-2xl border border-error/20 bg-error-container p-4 text-sm font-semibold text-on-error-container" role="alert">
            Answer all five questions before viewing your provisional match.
          </div>
        )}

        {submissionError && (
          <div className="rounded-2xl border border-error/20 bg-error-container p-4 text-sm font-semibold text-on-error-container" role="alert">
            {submissionError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {RECOMMENDATION_QUESTIONS.map((question, index) => {
            const visual = questionVisuals[question.id];
            const Icon = visual.icon;
            const currentValue = answers[question.id];

            return (
              <motion.fieldset
                key={question.id}
                id={`question-${question.id}`}
                tabIndex={-1}
                aria-labelledby={`question-title-${question.id}`}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-3xl border bg-surface-container-lowest p-5 shadow-sm outline-none lg:p-6 ${
                  errors[question.id] ? 'border-error ring-1 ring-error/20' : 'border-surface-container-high'
                } ${question.id === 'overallNutrition' ? 'lg:col-span-2' : ''}`}
              >
                <div className={`pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-[100px] ${visual.bg}`} />
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${visual.color}`}>
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 pr-8">
                    <span className={`text-xs font-bold uppercase tracking-widest ${visual.accent}`}>{question.label}</span>
                    <h2 id={`question-title-${question.id}`} className="mt-1 font-display text-xl font-bold leading-snug text-on-surface">{question.question}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{question.supportingText}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-6 grid gap-2 sm:grid-cols-3">
                  {PREFERENCE_OPTIONS.map((option) => {
                    const selected = currentValue === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateAnswer(question.id, option.value)}
                        aria-pressed={selected}
                        className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                          selected
                            ? 'border-primary bg-primary text-white shadow-md shadow-primary/15'
                            : 'border-surface-container-high bg-surface-container-low text-on-surface hover:border-primary/40 hover:bg-white'
                        }`}
                      >
                        <span className="block text-sm font-bold">{option.label}</span>
                        <span className={`mt-0.5 block text-xs ${selected ? 'text-white/75' : 'text-on-surface-variant'}`}>{option.description}</span>
                      </button>
                    );
                  })}
                </div>

                {errors[question.id] && (
                  <p className="relative z-10 mt-3 text-sm font-semibold text-error">{errors[question.id]}</p>
                )}
              </motion.fieldset>
            );
          })}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md border-t border-surface-container bg-white/90 p-6 backdrop-blur-xl lg:static lg:w-full lg:max-w-7xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-12 lg:pt-0 lg:backdrop-blur-none">
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="hidden text-sm text-on-surface-variant lg:block">Your result will use the current four-input workbook rule.</p>
          <button
            type="button"
            onClick={handleSaveAndMatch}
            disabled={submitting}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary font-display font-semibold text-on-primary shadow-[0px_8px_20px_rgba(19,85,41,0.25)] transition-all active:scale-95 disabled:opacity-70 lg:ml-auto lg:w-auto lg:min-w-72 lg:px-8"
            id="see-recommended-button"
          >
            {submitting ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                View Provisional Match
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
