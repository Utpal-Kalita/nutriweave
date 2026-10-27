import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
    <div className="flex min-h-full flex-col bg-paper-2 pb-28 text-ink lg:pb-0">
      <main className="container flex-1 py-10 lg:py-16">
        <header className="grid gap-8 rounded-card bg-sky p-7 shadow-card sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="text-display-s">What matters in your everyday rice?</h1>
            <p className="lead mt-5">Choose one answer per question. Edit any response before submitting.</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-display text-xl font-bold">Questionnaire progress</span>
              <span className="font-outlier text-sm tabular-nums text-muted">{answeredCount} of 5</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-1" aria-label={`${answeredCount} of 5 questions answered`}>
              {RECOMMENDATION_QUESTIONS.map((question, index) => (
                <span key={question.id} className={`h-3 rounded-pill ${index < answeredCount ? 'bg-leaf' : 'bg-paper/70'}`} aria-hidden="true" />
              ))}
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-8 rounded-card bg-paper p-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16 lg:p-8">
          <h2 className="text-2xl">The three-point scale</h2>
          <dl className="grid gap-4 sm:grid-cols-3">
            {PREFERENCE_OPTIONS.map((option) => (
              <div key={option.value} className={`rounded-2xl p-4 ${option.value === 1 ? 'bg-paper-2' : option.value === 2 ? 'bg-harvest/45' : 'bg-leaf text-paper'}`}>
                <dt className="font-display text-lg font-bold">{option.value}. {option.label}</dt>
                <dd className={`mt-1 text-sm ${option.value === 3 ? 'text-paper-2' : 'text-ink-2'}`}>{option.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="my-6 rounded-2xl border border-accent/20 bg-paper px-5 py-4 text-sm leading-relaxed text-ink-2">
          <strong className="text-ink">Current limitation:</strong> Nutritional is saved separately. Including it in the maximum has been tested as a candidate, but the verified workbook rule still uses Protein, Minerals, GI and Taste.
        </div>

        {Object.values(errors).some(Boolean) && (
          <div className="border-b border-error bg-error-container py-4 text-sm font-medium text-on-error-container" role="alert">
            Answer all five questions before viewing your provisional match.
          </div>
        )}

        {submissionError && (
          <div className="border-b border-error bg-error-container py-4 text-sm font-medium text-on-error-container" role="alert">
            {submissionError}
          </div>
        )}

        <div className="grid gap-5">
          {RECOMMENDATION_QUESTIONS.map((question, index) => {
            const currentValue = answers[question.id];
            return (
              <fieldset
                key={question.id}
                id={`question-${question.id}`}
                tabIndex={-1}
                aria-labelledby={`question-title-${question.id}`}
                className={`grid min-w-0 gap-6 rounded-card p-6 shadow-card outline-none sm:p-8 lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8 ${
                  errors[question.id] ? 'bg-error-container' : index % 3 === 1 ? 'bg-sky/55' : index % 3 === 2 ? 'bg-harvest/35' : 'bg-paper'
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-outlier text-sm tabular-nums text-paper">{index + 1}</span>
                <div className="min-w-0">
                  <span className="editorial-label">{question.label}</span>
                  <h2 id={`question-title-${question.id}`} className="mt-1 text-title">{question.question}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{question.supportingText}</p>
                  {errors[question.id] && <p className="mt-2 text-sm font-medium text-error">{errors[question.id]}</p>}
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {PREFERENCE_OPTIONS.map((option) => {
                    const selected = currentValue === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateAnswer(question.id, option.value)}
                        aria-pressed={selected}
                        className={`min-h-16 rounded-pill px-4 py-3 text-left ${
                          selected ? 'bg-ink text-paper' : 'bg-paper/80 text-ink hover:bg-paper'
                        }`}
                      >
                        <span className="block font-display font-bold">{option.label}</span>
                        <span className={`mt-1 block text-sm ${selected ? 'text-paper-2' : 'text-muted'}`}>{option.description}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-[200] bg-ink text-paper lg:static">
        <div className="container flex min-h-20 items-center justify-between gap-6 py-3">
          <p className="hidden text-sm text-paper-2 lg:block">The result uses the current workbook rule; the Nutritional extension is inactive.</p>
          <button
            type="button"
            onClick={handleSaveAndMatch}
            disabled={submitting}
            aria-busy={submitting}
            className="editorial-action ml-auto w-full border-harvest bg-harvest text-ink hover:bg-paper lg:w-auto"
            id="see-recommended-button"
          >
            {submitting ? <Loader2 className="keep-motion animate-spin" size={20} aria-hidden="true" /> : null}
            {submitting ? 'Saving answers' : 'View provisional match'}
          </button>
        </div>
      </div>
    </div>
  );
}
