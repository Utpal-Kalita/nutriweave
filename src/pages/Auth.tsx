import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const requestedPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
  const destination = requestedPath && requestedPath !== '/auth' ? requestedPath : '/priority';

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Demo login failed. Check the fields and try again.');
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    await signIn(email || 'demo@nutrifibe.local', password || 'demo');
    navigate(destination, { replace: true });
  };

  return (
    <div className="container grid min-h-[calc(100dvh-var(--nav-height))] items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <section className="min-w-0">
        <h1 className="text-display-s">Your rice preferences start here.</h1>
        <p className="lead mt-5">Sign in, answer five questions, and receive a provisional polishing level.</p>
        <dl className="mt-10 overflow-hidden rounded-card bg-harvest/45 p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-b border-rule py-4">
            <dt>Account type</dt>
            <dd className="text-ink-2">Browser-only demo</dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-b border-rule py-4">
            <dt>Recommendation</dt>
            <dd className="text-ink-2">Workbook rule</dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 py-4">
            <dt>Saved data</dt>
            <dd className="text-ink-2">This browser</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-card bg-sky p-6 shadow-card sm:p-10">
        <h2 className="text-3xl">{mode === 'login' ? 'Sign in to Nutrifibe' : 'Create a demo account'}</h2>
        <p className="mt-3 text-ink-2">
          {mode === 'login' ? 'Any email and password restore or create a local demo profile.' : 'Your demo account remains on this device.'}
        </p>

        <form onSubmit={handleAuth} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="username"
                className="h-13 w-full rounded-2xl border border-ink/25 bg-paper px-4 text-base text-ink outline-2 outline-offset-[-3px] outline-transparent placeholder:text-muted hover:bg-paper-3 focus-visible:outline-focus"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter any password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="h-13 w-full rounded-2xl border border-ink/25 bg-paper px-4 pr-14 text-base text-ink outline-2 outline-offset-[-3px] outline-transparent placeholder:text-muted hover:bg-paper-3 focus-visible:outline-focus"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-pill text-muted hover:bg-paper-3 hover:text-ink"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="border-y border-error bg-error-container p-4 text-sm text-on-error-container" role="alert">{error}</p>}

          <button type="submit" disabled={loading} aria-busy={loading} className="editorial-action w-full">
            {loading ? <Loader2 className="keep-motion animate-spin" size={20} aria-hidden="true" /> : null}
            {loading ? 'Signing in' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-rule" />
          <span className="text-sm text-muted">Demo access</span>
          <div className="h-px flex-1 bg-rule" />
        </div>

        <button type="button" onClick={handleDemoLogin} disabled={loading} className="editorial-action editorial-action--quiet w-full">
          Use demo account
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setError(null);
          }}
          className="mt-7 w-full text-center text-sm font-medium text-accent underline decoration-accent underline-offset-4"
        >
          {mode === 'login' ? 'Create a new demo account' : 'Use an existing demo account'}
        </button>
      </section>
    </div>
  );
}
