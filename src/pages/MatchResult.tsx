import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function MatchResult() {
  const navigate = useNavigate();
  const [needleRotation, setNeedleRotation] = useState(-90);

  useEffect(() => {
    // Animate needle to "Level 5" (center: 0 degrees)
    const timer = setTimeout(() => {
      setNeedleRotation(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-background items-center px-5 pt-8 pb-32">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-primary mb-3 font-display">Your Nutrifibe Match</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          Based on your metabolic profile, we've identified your optimal nutritional balance.
        </p>
      </motion.div>

      {/* Gauge Dashboard Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-container-lowest rounded-[32px] shadow-lg border border-[#EFE8D8] w-full p-8 flex flex-col items-center relative overflow-hidden mb-8"
      >
        {/* Gauge Visual */}
        <div className="relative w-full aspect-[2/1.1] flex items-end justify-center mb-6">
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 50">
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
            {/* Background Arc */}
            <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#f1f5f9" strokeLinecap="round" strokeWidth="10" />
            
            {/* Dark Green */}
            <path d="M 10 45 A 40 40 0 0 1 30 10.4" fill="none" stroke="url(#grad1)" strokeLinecap="round" strokeWidth="10" />
            {/* Green */}
            <path d="M 30 10.4 A 40 40 0 0 1 50 5" fill="none" stroke="url(#grad2)" strokeLinecap="round" strokeWidth="10" />
            {/* Yellow */}
            <path d="M 50 5 A 40 40 0 0 1 70 10.4" fill="none" stroke="url(#grad3)" strokeLinecap="round" strokeWidth="10" />
            {/* Orange */}
            <path d="M 70 10.4 A 40 40 0 0 1 90 45" fill="none" stroke="url(#grad4)" strokeLinecap="round" strokeWidth="10" />

            {/* Indicator Pointer */}
            <g 
              style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '50px 45px' }}
              className="transition-transform duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              <line x1="50" y1="45" x2="50" y2="12" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="45" r="5" fill="#1e293b" />
              <circle cx="50" cy="45" r="1.5" fill="#ffffff" />
            </g>
          </svg>
          
          {/* Center Text */}
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-sans">Level</span>
            <span className="text-4xl font-extrabold text-primary tracking-tight leading-tight font-display">5</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Balanced Core</h2>
        <p className="text-base text-on-surface-variant text-center mb-8 font-sans">
          Your metabolism thrives on a steady intake of complex carbohydrates and balanced proteins.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 w-full mb-6">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs px-4 py-2 rounded-full shadow-sm">High Minerals</span>
          <span className="bg-amber-50 text-amber-700 border border-amber-100 font-bold text-xs px-4 py-2 rounded-full shadow-sm">Steady Energy</span>
          <span className="bg-blue-50 text-blue-700 border border-blue-100 font-bold text-xs px-4 py-2 rounded-full shadow-sm">Good Protein</span>
        </div>

        <button 
          onClick={() => navigate('/scale')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group"
          id="learn-about-scale"
        >
          Learn more about our nutritional scale
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Action Button */}
      <button 
        onClick={() => navigate('/order')}
        className="bg-primary hover:bg-primary-container text-white font-display text-lg font-semibold w-full py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all mt-4"
        id="continue-to-order-button"
      >
        Continue to Order
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
