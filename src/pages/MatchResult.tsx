import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { getNutritionalRoadmap } from '../lib/gemini';
import { ensureDemoProfile, getDemoProfile } from '../lib/demoStore';

export default function MatchResult() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [needleRotation, setNeedleRotation] = useState(-90);
  const [level, setLevel] = useState<number | null>(null);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      if (user) {
        const data = getDemoProfile(user.id) || ensureDemoProfile(user);
        
        if (data?.matched_level) {
          setLevel(data.matched_level);
          // Animate needle: Level 1 is -90, Level 10 is 90
          setTimeout(() => {
            setNeedleRotation((data.matched_level - 5.5) * 20);
          }, 500);

          // Generate AI roadmap
          setRoadmapLoading(true);
          const aiRoadmap = await getNutritionalRoadmap({
            minerals: data.minerals_priority,
            glycemic: data.glycemic_priority,
            protein: data.protein_priority
          }, data.matched_level);
          setRoadmap(aiRoadmap);
          setRoadmapLoading(false);
        }
      }
      setLoading(false);
    };

    fetchResult();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const levelInfo = {
    title: level && level <= 3 ? 'Nutrient Max' : level && level <= 5 ? 'Balanced Core' : level && level <= 7 ? 'Smart Comfort' : 'Pure Comfort',
    description: level && level <= 3 ? 'Your profile demands the highest concentration of functional nutrients for peak performance.' :
                 level && level <= 5 ? 'Your metabolism thrives on a steady intake of complex carbohydrates and balanced proteins.' :
                 level && level <= 7 ? 'You prefer a familiar taste profile with enhanced nutritional benefits for daily wellness.' :
                 'Your focus is on traditional textures and flavors, optimized for mindful enjoyment.'
  };

  return (
    <div className="flex flex-col min-h-full bg-background items-center px-5 sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-32 lg:pb-16">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 w-full max-w-7xl lg:text-left lg:mb-10"
      >
        <h1 className="text-4xl font-bold text-primary mb-3 font-display lg:text-5xl">Your Nutrifibe Match</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          Based on your metabolic profile, we've identified your optimal nutritional balance.
        </p>
      </motion.div>

      {/* Gauge Dashboard Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-container-lowest rounded-[32px] shadow-lg border border-[#EFE8D8] w-full max-w-7xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 relative overflow-hidden"
      >
        <div className="flex min-w-0 flex-col items-center">
        {/* Gauge Visual */}
        <div className="relative w-full max-w-xl aspect-[2/1.1] flex items-end justify-center mb-6">
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 50">
            {/* ... same SVG defs and paths ... */}
            <defs>
              <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#135529" />
                <stop offset="100%" stopColor="#2f6e3f" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#2f6e3f" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="grad4" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#f1f5f9" strokeLinecap="round" strokeWidth="10" />
            <path d="M 10 45 A 40 40 0 0 1 30 10.4" fill="none" stroke="url(#grad1)" strokeLinecap="round" strokeWidth="10" />
            <path d="M 30 10.4 A 40 40 0 0 1 50 5" fill="none" stroke="url(#grad2)" strokeLinecap="round" strokeWidth="10" />
            <path d="M 50 5 A 40 40 0 0 1 70 10.4" fill="none" stroke="url(#grad3)" strokeLinecap="round" strokeWidth="10" />
            <path d="M 70 10.4 A 40 40 0 0 1 90 45" fill="none" stroke="url(#grad4)" strokeLinecap="round" strokeWidth="10" />

            <g 
              style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '50px 45px' }}
              className="transition-transform duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              <line x1="50" y1="45" x2="50" y2="12" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="45" r="5" fill="#1e293b" />
              <circle cx="50" cy="45" r="1.5" fill="#ffffff" />
            </g>
          </svg>
          
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-sans">Level</span>
            <span className="text-4xl font-extrabold text-primary tracking-tight leading-tight font-display">{level || '5'}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">{levelInfo.title}</h2>
        <p className="text-base text-on-surface-variant text-center mb-8 font-sans px-4">
          {levelInfo.description}
        </p>
        </div>

        <div className="flex min-w-0 flex-col items-center lg:items-start">
        {/* AI Roadmap Card */}
        <div className="w-full bg-primary/5 rounded-2xl p-5 border border-primary/10 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Sparkles size={18} fill="currentColor" />
            <h3 className="font-bold text-sm uppercase tracking-wider">AI Nutritional Roadmap</h3>
          </div>
          {roadmapLoading ? (
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <Loader2 size={16} className="animate-spin" />
              Generating your personalized insights...
            </div>
          ) : (
            <div className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap italic">
              {roadmap || "Your personalized roadmap is being prepared. Enjoy your balanced match!"}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 w-full mb-6">
          {['High Minerals', 'Steady Energy', 'Good Protein'].map((tag, i) => (
            <motion.span 
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className={`font-bold text-xs px-4 py-2 rounded-full shadow-sm border ${
                i === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                i === 1 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                'bg-blue-50 text-blue-700 border-blue-100'
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <button
          onClick={() => navigate('/scale')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group"
          id="learn-about-scale"
        >
          Learn more about our nutritional scale
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => navigate('/customize')}
          className="bg-primary hover:bg-primary-container text-white font-display text-lg font-semibold w-full py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all mt-8 lg:w-auto lg:min-w-64 lg:px-8"
          id="continue-to-order-button"
        >
          Continue to Order
          <ArrowRight size={20} />
        </button>
        </div>
      </motion.div>
    </div>
  );
}
