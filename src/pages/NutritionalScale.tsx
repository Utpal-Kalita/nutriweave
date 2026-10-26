import React from 'react';
import { FlaskConical, Info, Layers3 } from 'lucide-react';
import { motion } from 'motion/react';
import { RecommendationLevel, RECOMMENDATION_VARIANTS } from '../lib/recommendation';

const variantPresentation: Record<RecommendationLevel, {
  title: string;
  description: string;
  tone: string;
}> = {
  1: {
    title: 'Less polished',
    description: 'The workbook defines this as the least polished option. It is selected when the highest nutrition preference is stronger than the taste and texture preference.',
    tone: 'bg-primary text-white',
  },
  2: {
    title: 'Middle balance',
    description: 'The workbook defines this as the midpoint. It is selected when the highest nutrition preference and taste preference are equal.',
    tone: 'bg-secondary-container text-on-secondary-container',
  },
  3: {
    title: 'More polished',
    description: 'The workbook defines this as the most polished option. It is selected when the preference for a soft, white-rice-like texture is stronger.',
    tone: 'bg-amber-100 text-amber-900',
  },
};

const variants = ([1, 2, 3] as const).map((level) => ({
  level,
  ...RECOMMENDATION_VARIANTS[level],
  ...variantPresentation[level],
}));

export default function NutritionalScale() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col bg-background px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Workbook variant structure</p>
        <h1 className="font-display text-4xl font-bold text-on-background lg:text-5xl">Three polishing levels</h1>
        <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
          The current recommender compares nutrition preferences with taste and texture, then selects one of these workbook-defined variants.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {variants.map((variant, index) => (
          <motion.article
            key={variant.level}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            className="overflow-hidden rounded-3xl border border-surface-container-high bg-white shadow-sm"
          >
            <div className={`p-6 ${variant.tone}`}>
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">Recommendation</span>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold">Level {variant.level}</h2>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">{variant.polishingPercentage}% polish</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary">
                <Layers3 size={19} aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-on-surface">{variant.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{variant.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="flex items-start gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <FlaskConical className="mt-0.5 shrink-0" size={24} aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-bold">Nutritional measurements require validation</h2>
            <p className="mt-2 text-sm leading-relaxed">
              The workbook’s GI, protein, fibre, and mineral values are assumptions and interpolations, not laboratory-verified Nutriweave product results. They are intentionally not presented here as product facts.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-3xl border border-primary/15 bg-primary/5 p-6 text-on-surface">
          <Info className="mt-0.5 shrink-0 text-primary" size={24} aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-bold">The fifth-question rule is pending</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Overall nutritional value is collected in the questionnaire but does not affect these levels until Arnatattva LLP confirms how it should enter the calculation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
