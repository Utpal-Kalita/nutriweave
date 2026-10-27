import React from 'react';
import { RECOMMENDATION_VARIANTS } from '../lib/recommendation';

const evidenceRows = [
  ['Protein', 'Workbook estimate only', 'Laboratory or supplier verification required'],
  ['Fibre and minerals', 'Workbook estimate only', 'Variant-specific testing required'],
  ['Glycemic index', 'Measurement required', 'No low-GI label is currently supported'],
] as const;

export default function Impact() {
  return (
    <div className="container min-h-full py-10 lg:py-16">
      <header className="grid gap-8 border-b-2 border-rule-2 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <h1 className="text-display-s">Evidence before nutrition claims.</h1>
        <p className="lead">Preference scores guide a polishing-level match. They are not product measurements.</p>
      </header>

      <section className="grid border-b border-rule lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="py-12 pr-0 lg:pr-16">
          <h2>What the workbook defines.</h2>
          <p className="lead mt-5">Three recommendation levels and their polishing percentages are available now.</p>
          <dl className="mt-8 border-y border-rule-2">
            {([1, 2, 3] as const).map((level) => (
              <div key={level} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-b border-rule py-5 last:border-b-0">
                <dt className="font-display text-2xl font-bold">Level {level}</dt>
                <dd className="font-outlier text-xl tabular-nums">{RECOMMENDATION_VARIANTS[level].polishingPercentage}% polishing</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="border-t border-rule bg-paper-2 p-8 lg:border-l lg:border-t-0 lg:p-12">
          <h2 className="text-3xl">What remains unverified.</h2>
          <p className="mt-5 leading-relaxed text-ink-2">The workbook models nutrient retention through linear interpolation. Those figures are not tested Nutriweave product specifications.</p>
        </aside>
      </section>

      <section className="py-12">
        <h2>Product data status.</h2>
        <div className="mt-8 overflow-x-auto border-y-2 border-rule-2">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th className="py-4 pr-6 font-medium">Data</th>
                <th className="py-4 pr-6 font-medium">Current status</th>
                <th className="py-4 font-medium">What is needed</th>
              </tr>
            </thead>
            <tbody>
              {evidenceRows.map(([name, status, need]) => (
                <tr key={name} className="border-b border-rule last:border-b-0">
                  <th className="py-5 pr-6 font-display text-xl">{name}</th>
                  <td className="py-5 pr-6 text-ink-2">{status}</td>
                  <td className="py-5 text-ink-2">{need}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-8 border-y-2 border-rule-2 bg-ink px-6 py-10 text-paper lg:grid-cols-2 lg:px-10 lg:gap-16">
        <p className="lead text-paper">Nutriweave does not currently claim that a variant manages diabetes or guarantees a blood sugar response.</p>
        <p className="text-paper-2">Verified laboratory or supplier data can be added to the catalog later without changing the customer preference scale.</p>
      </section>
    </div>
  );
}
