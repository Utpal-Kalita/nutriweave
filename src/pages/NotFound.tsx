import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-lg border-y-2 border-rule-2 bg-paper-2 p-8 text-center sm:p-12">
        <span className="font-outlier text-sm tabular-nums text-muted">404</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-on-surface">This page is not on the menu</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-on-surface-variant">
          The address may be outdated, or the page may have moved. Return to Nutrifibe and continue your nutrition journey.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="editorial-action editorial-action--quiet"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="editorial-action"
          >
            <Home size={18} />
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
