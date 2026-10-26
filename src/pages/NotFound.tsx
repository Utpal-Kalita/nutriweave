import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-lg rounded-[32px] border border-surface-container-high bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">404</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-on-surface">This page is not on the menu</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-on-surface-variant">
          The address may be outdated, or the page may have moved. Return to Nutrifibe and continue your nutrition journey.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-outline-variant px-6 font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-container"
          >
            <Home size={18} />
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
