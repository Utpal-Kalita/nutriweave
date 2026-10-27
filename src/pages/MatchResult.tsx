import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, PackageSearch } from 'lucide-react';
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
      setAnswers(profile.recommendation_answers);
      setResult(nextResult);
      setProduct(mapRecommendationToProduct(getDemoProducts(), nextResult.level));
      setLoading(false);
    } catch (error) {
      console.error('Invalid saved recommendation:', error);
      navigate('/priority', { replace: true });
    }
  }, [navigate, user]);

  if (loading || !answers || !result) {
    return (
      <div className="flex min-h-[calc(100dvh-var(--nav-height))] w-full items-center justify-center bg-paper" role="status" aria-live="polite">
        <div className="flex items-center gap-3 text-ink-2">
          <Loader2 className="keep-motion animate-spin text-accent" size={24} aria-hidden="true" />
          <span>Preparing your provisional match…</span>
        </div>
      </div>
    );
  }

  const overallAnswerLabel = PREFERENCE_OPTIONS.find((option) => option.value === answers.overallNutrition)?.label;

  return (
    <div className="min-h-full bg-paper-2 pb-28 text-ink lg:pb-0">
      <main className="container py-10 lg:py-16">
        <header className="grid gap-8 rounded-card bg-sky p-7 shadow-card sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="text-display-s">Your provisional rice match.</h1>
            <p className="lead mt-5">The workbook rule produced this level. Nutritional is recorded, not calculated.</p>
          </div>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-paper/80">
            <div className="border-r border-ink/15 p-5">
              <dt className="editorial-label">Nutrition priority</dt>
              <dd className="mt-2 font-display text-4xl font-bold tabular-nums">{result.nutritionPriority} / 3</dd>
            </div>
            <div className="p-5">
              <dt className="editorial-label">Taste priority</dt>
              <dd className="mt-2 font-display text-4xl font-bold tabular-nums">{result.tastePriority} / 3</dd>
            </div>
          </dl>
        </header>

        <section className="mt-6 grid overflow-hidden rounded-card bg-paper shadow-card lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="flex min-h-[420px] flex-col justify-center bg-leaf p-8 text-paper sm:p-12 lg:min-h-[560px]">
            <span className="text-sm text-paper-2">Workbook recommendation</span>
            <span className="mt-4 font-display text-[clamp(7rem,18vw,14rem)] font-bold leading-[0.75] tabular-nums">{result.level}</span>
            <span className="mt-8 font-display text-3xl font-bold">Level {result.level}</span>
            <span className="mt-2 font-outlier text-lg tabular-nums text-paper-2">{result.polishingPercentage}% polishing</span>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
            <h2>{result.variantName}</h2>
            <p className="lead mt-5">{result.reason}</p>
            <hr className="rule-double my-8" />
            <p className="max-w-[65ch] text-ink-2">
              The polishing percentage is the workbook’s variant definition. Nutrient and GI estimates are not presented as verified product facts.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-10 rounded-card bg-paper p-6 shadow-card sm:p-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl">Your recorded answers</h2>
            <p className="mt-4 text-ink-2">Nutritional was rated “{overallAnswerLabel}” and did not change this result. The include-in-maximum candidate remains inactive.</p>
          </div>
          <dl className="border-t border-rule-2">
            {RECOMMENDATION_QUESTIONS.map((question) => {
              const value = answers[question.id];
              const label = PREFERENCE_OPTIONS.find((option) => option.value === value)?.label;
              return (
                <div key={question.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-b border-ink/15 py-4">
                  <dt>{question.label}</dt>
                  <dd className="font-medium text-ink-2">{label}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="mt-6 rounded-card bg-harvest/45 p-6 shadow-card sm:p-8">
          {product ? (
            <div className="grid items-center gap-8 md:grid-cols-[180px_minmax(0,1fr)_auto]">
              <img src={product.image_url} width="180" height="180" alt="" className="aspect-square w-full border border-rule object-cover grayscale" />
              <div>
                <h2 className="text-3xl">{product.name}</h2>
                <p className="mt-3 max-w-[65ch] text-ink-2">{product.description}</p>
                <p className="mt-4 font-outlier text-xl tabular-nums">₹{product.price}</p>
              </div>
              <button type="button" onClick={() => navigate('/customize')} className="editorial-action">View product</button>
            </div>
          ) : (
            <div className="grid items-start gap-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
              <PackageSearch size={32} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2 className="text-3xl">No catalog product is mapped yet.</h2>
                <p className="mt-3 max-w-[70ch] text-ink-2">
                  The catalog does not explicitly identify a product as the {result.polishingPercentage}% polishing variant. A legacy product has not been substituted, and a recommendation level is never treated as a product ID.
                </p>
              </div>
              <span className="rounded-pill bg-paper px-4 py-2 text-sm font-bold text-ink-2">Mapping required</span>
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:justify-between">
          <button type="button" onClick={() => navigate('/priority')} className="editorial-action editorial-action--quiet">Change answers</button>
          <button type="button" onClick={() => navigate('/scale')} className="editorial-action editorial-action--quiet">Read the three levels</button>
        </div>
      </main>
    </div>
  );
}
