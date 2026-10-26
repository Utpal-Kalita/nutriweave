import React from 'react';
import { Activity, Beaker, CheckCircle2, FlaskConical, Info, Leaf, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { RECOMMENDATION_VARIANTS } from '../lib/recommendation';

const evidenceItems = [
  { label: 'Protein', icon: Beaker, note: 'Workbook estimate only' },
  { label: 'Fibre and minerals', icon: Leaf, note: 'Workbook estimate only' },
  { label: 'Glycemic index', icon: Activity, note: 'Measurement required' },
] as const;

export default function Impact() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col bg-background px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:pt-12">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Product evidence</p>
        <h1 className="font-display text-4xl font-bold text-on-surface lg:text-5xl">What is verified and what is pending</h1>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant lg:text-lg">
          Nutriweave keeps customer preference scores separate from product nutrition data. Preference answers guide the polishing-level match; they are not nutritional measurements.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <section className="rounded-[32px] border border-surface-container-high bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Current status</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-on-surface">Variant definitions are available</h2>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary">
              <CheckCircle2 size={24} aria-hidden="true" />
            </div>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-on-surface-variant">
            The supplied workbook defines Level 1 as 25% polishing, Level 2 as 50%, and Level 3 as 75%. Those variant definitions drive the current deterministic recommendation rule.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {([1, 2, 3] as const).map((level) => (
              <div key={level} className="rounded-2xl bg-surface-container-low p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Level {level}</span>
                <p className="mt-1 font-display text-3xl font-bold text-primary">{RECOMMENDATION_VARIANTS[level].polishingPercentage}%</p>
                <span className="text-sm text-on-surface-variant">polishing</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[32px] border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-sm sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
            <FlaskConical size={24} aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold">Laboratory validation is pending</h2>
          <p className="mt-3 text-sm leading-relaxed">
            The workbook models nutrient retention through linear interpolation. These figures must not be treated as tested Nutriweave product specifications.
          </p>
        </aside>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold text-on-surface">Data that still needs verification</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {evidenceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-surface-container-high bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container text-primary">
                  <Icon size={21} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-on-surface">{item.label}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-error/15 bg-error-container/60 p-5 text-on-error-container">
          <ShieldAlert className="mt-0.5 shrink-0" size={21} aria-hidden="true" />
          <p className="text-sm leading-relaxed">
            Nutriweave does not currently label these variants as low GI or claim that they manage diabetes or guarantee a blood sugar response.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-5">
          <Info className="mt-0.5 shrink-0 text-primary" size={21} aria-hidden="true" />
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Verified laboratory or supplier data can be added to the product catalog later without changing the customer preference scale.
          </p>
        </div>
      </div>
    </div>
  );
}
