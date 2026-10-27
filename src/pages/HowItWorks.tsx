import React from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  ['Answer five questions', 'Rate Protein, Minerals, GI, Taste and Nutritional on the same three-point scale.'],
  ['Compare nutrition with taste', 'The verified workbook rule compares the highest of the first three nutrition answers with taste and texture.'],
  ['Receive a polishing level', 'The comparison returns Level 1 at 25%, Level 2 at 50%, or Level 3 at 75% polishing.'],
  ['Order only when mapped', 'A product appears only when the catalog explicitly maps it to the recommended workbook level.'],
] as const;

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="container min-h-full py-10 lg:py-16">
      <header className="grid gap-8 border-b-2 border-rule-2 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <h1 className="text-display-s">How the workbook becomes a match.</h1>
        <p className="lead">The rule is deterministic. No language model chooses products.</p>
      </header>

      <ol className="border-b-2 border-rule-2">
        {steps.map(([title, description], index) => (
          <li key={title} className="grid gap-5 border-b border-rule py-8 last:border-b-0 lg:grid-cols-[4rem_minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-baseline lg:gap-8">
            <span className="font-outlier text-2xl tabular-nums text-muted">{index + 1}</span>
            <h2 className="text-3xl">{title}</h2>
            <p className="lead text-ink-2">{description}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[65ch] text-ink-2">Nutritional is collected separately. Including it in the maximum is a tested candidate, not the active rule.</p>
        <button type="button" onClick={() => navigate('/priority')} className="editorial-action" id="continue-button-how">
          Answer the questions
        </button>
      </div>
    </div>
  );
}
