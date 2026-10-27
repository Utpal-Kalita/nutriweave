import React from 'react';
import { RecommendationLevel, RECOMMENDATION_VARIANTS } from '../lib/recommendation';

const variantPresentation: Record<RecommendationLevel, { title: string; description: string }> = {
  1: {
    title: 'Less polished',
    description: 'Selected when the highest nutrition preference is stronger than the preference for soft, white-rice-like texture.',
  },
  2: {
    title: 'Middle balance',
    description: 'Selected when the highest nutrition preference and the taste and texture preference are equal.',
  },
  3: {
    title: 'More polished',
    description: 'Selected when the preference for soft, white-rice-like texture is stronger than the highest nutrition preference.',
  },
};

export default function NutritionalScale() {
  return (
    <div className="container min-h-full py-10 lg:py-16">
      <header className="grid gap-8 border-b-2 border-rule-2 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <h1 className="text-display-s">Three workbook polishing levels.</h1>
        <p className="lead">The recommender compares customer preferences and returns one of these provisional variants.</p>
      </header>

      <div className="border-b-2 border-rule-2">
        {([1, 2, 3] as const).map((level) => {
          const variant = RECOMMENDATION_VARIANTS[level];
          const presentation = variantPresentation[level];
          return (
            <article key={level} className="grid gap-6 border-b border-rule py-10 last:border-b-0 lg:grid-cols-[6rem_minmax(0,0.75fr)_minmax(0,1.25fr)_auto] lg:items-baseline lg:gap-8">
              <span className="font-display text-6xl font-bold tabular-nums">{level}</span>
              <div>
                <h2 className="text-3xl">Level {level}: {presentation.title}</h2>
              </div>
              <p className="lead text-ink-2">{presentation.description}</p>
              <span className="font-outlier text-xl tabular-nums text-ink-2">{variant.polishingPercentage}% polish</span>
            </article>
          );
        })}
      </div>

      <section className="grid gap-8 border-b border-rule bg-paper-2 py-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl">Measurements still need validation.</h2>
          <p className="mt-4 text-ink-2">The workbook’s GI, protein, fibre and mineral values are assumptions and interpolations, not laboratory-verified Nutriweave product results.</p>
        </div>
        <div>
          <h2 className="text-3xl">The fifth rule is still pending.</h2>
          <p className="mt-4 text-ink-2">Nutritional is collected but does not affect these levels until Arnatattva LLP confirms whether it belongs in the maximum or follows another rule.</p>
        </div>
      </section>
    </div>
  );
}
