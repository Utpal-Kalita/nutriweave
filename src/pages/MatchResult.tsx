import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Info, Loader2, PackageSearch, RotateCcw, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { DemoProduct, getDemoProducts, getDemoProfile } from '../lib/demoStore';
import {
  calculateRiceRecommendation,
  mapRecommendationToProduct,
  PREFERENCE_OPTIONS,
  RECOMMENDATION_QUESTIONS,
  RecommendationAnswers,
  RecommendationResult,
} from '../lib/recommendation';

export default function MatchResult() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [answers, setAnswers] = useState<RecommendationAnswers | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [product, setProduct] = useState<DemoProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const profile = getDemoProfile(user.id);
    if (!profile?.recommendation_answers) {
      navigate('/priority', { replace: true });
      return;
    }

    try {
      const nextResult = calculateRiceRecommendation(profile.recommendation_answers);
      const matchedProduct = mapRecommendationToProduct(getDemoProducts(), nextResult.level);
      setAnswers(profile.recommendation_answers);
      setResult(nextResult);
      setProduct(matchedProduct);
      setLoading(false);
    } catch (error) {
      console.error('Invalid saved recommendation:', error);
      navigate('/priority', { replace: true });
    }
  }, [navigate, user]);

  if (loading || !answers || !result) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-surface" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-3 text-on-surface-variant">
          <Loader2 className="animate-spin text-primary" size={42} />
          <span className="text-sm font-semibold">Preparing your provisional match...</span>
        </div>
      </div>
    );
  }

  const overallAnswerLabel = PREFERENCE_OPTIONS.find((option) => option.value === answers.overallNutrition)?.label;

  return (
    <div className="flex min-h-full flex-col items-center bg-background px-5 pb-32 pt-8 sm:px-8 lg:px-10 lg:pb-16 lg:pt-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 w-full max-w-7xl text-center lg:mb-10 lg:text-left"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Current four-input workbook rule</p>
        <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Your provisional rice match</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
          This result uses protein, minerals, blood sugar response, and taste. Your overall nutritional value answer is saved but is not yet part of the calculation.
        </p>
      </motion.div>

      <motion.section
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[32px] border border-[#EFE8D8] bg-surface-container-lowest shadow-lg lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      >
        <div className="flex flex-col items-center justify-center bg-primary px-8 py-12 text-center text-white lg:px-12 lg:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Workbook recommendation</span>
          <span className="mt-4 font-display text-8xl font-extrabold leading-none">{result.level}</span>
          <span className="mt-2 font-display text-2xl font-bold">Level {result.level}</span>
          <div className="mt-7 rounded-full bg-white/12 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm">
            {result.polishingPercentage}% polishing
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
            The polishing percentage is the workbook’s variant definition. Nutrient and GI values are not displayed as verified product facts.
          </p>
        </div>

        <div className="p-6 sm:p-8 lg:p-12">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary">
              <Scale size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Why this level was selected</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-on-surface">{result.variantName}</h2>
            </div>
          </div>

          <p className="mt-5 text-base leading-relaxed text-on-surface-variant">{result.reason}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Highest nutrition priority</span>
              <p className="mt-1 font-display text-2xl font-bold text-primary">{result.nutritionPriority} / 3</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Taste and texture priority</span>
              <p className="mt-1 font-display text-2xl font-bold text-primary">{result.tastePriority} / 3</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Your questionnaire answers">
            {RECOMMENDATION_QUESTIONS.map((question) => {
              const value = answers[question.id];
              const label = PREFERENCE_OPTIONS.find((option) => option.value === value)?.label;
              return (
                <span key={question.id} className="rounded-full border border-surface-container-high bg-white px-3 py-2 text-xs font-semibold text-on-surface-variant">
                  {question.label}: {label}
                </span>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <Info className="mt-0.5 shrink-0" size={19} aria-hidden="true" />
            <p className="text-sm leading-relaxed">
              You rated overall nutritional value as <strong>{overallAnswerLabel}</strong>. This was recorded but did not change the current result because its business rule is still unresolved.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="mt-8 w-full max-w-7xl rounded-[28px] border border-surface-container-high bg-white p-6 shadow-sm sm:p-8">
        {product ? (
          <div className="grid items-center gap-6 md:grid-cols-[160px_minmax(0,1fr)_auto]">
            <img src={product.image_url} alt={product.name} className="aspect-square w-full rounded-2xl object-cover" />
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest">Catalog product available</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-on-surface">{product.name}</h2>
              <p className="mt-2 leading-relaxed text-on-surface-variant">{product.description}</p>
              <p className="mt-3 font-display text-xl font-bold text-primary">₹{product.price}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/customize')}
              className="flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-7 font-display font-semibold text-white shadow-lg shadow-primary/20"
            >
              View product
              <ArrowRight size={19} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-container text-primary">
              <PackageSearch size={28} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-on-surface">Level {result.level} is not mapped to an available product</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-on-surface-variant">
                The current catalog does not explicitly identify a product as the {result.polishingPercentage}% polishing variant. We have not substituted a legacy product or assumed that a recommendation level is a product ID.
              </p>
            </div>
            <span className="rounded-full bg-surface-container px-4 py-2 text-sm font-bold text-on-surface-variant">Product mapping required</span>
          </div>
        )}
      </section>

      <div className="mt-8 flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => navigate('/priority')}
          className="flex h-13 items-center justify-center gap-2 rounded-full border border-outline-variant bg-white px-7 font-display font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
        >
          <RotateCcw size={18} />
          Change answers
        </button>
        <button
          type="button"
          onClick={() => navigate('/scale')}
          className="flex h-13 items-center justify-center gap-2 rounded-full px-7 font-display font-semibold text-primary transition-colors hover:bg-secondary-container/30"
        >
          Understand the three levels
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
