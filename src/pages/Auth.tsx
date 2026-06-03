import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Loader2, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/priority');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F3EA] px-6 pt-12 pb-24">
      <div className="max-w-md mx-auto w-full">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface font-display mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-on-surface-variant">
            {mode === 'login' 
              ? 'Enter any email and password to start the client demo' 
              : 'Any email and password creates a browser-only demo account'}
          </p>
        </motion.div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input
              type="email"
              placeholder="Email address"
              autoComplete="username"
              className="w-full bg-white border border-surface-container-high rounded-2xl h-14 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full bg-white border border-surface-container-high rounded-2xl h-14 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-error-container text-on-error-container p-4 rounded-xl text-sm font-medium border border-error/10"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white h-14 rounded-full font-display font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Sign Up'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-surface-container-high"></div>
          <span className="text-xs font-bold text-outline uppercase tracking-widest">or continue with</span>
          <div className="flex-1 h-px bg-surface-container-high"></div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              await signIn(email || 'demo@nutrifibe.local', password || 'demo');
              navigate('/priority');
            }}
            className="w-full bg-white border border-surface-container-high text-on-surface h-14 rounded-full flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors active:scale-[0.98]"
          >
             <Github size={20} />
             <span className="font-bold">Demo Login</span>
          </button>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-primary font-bold hover:underline"
          >
            {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
