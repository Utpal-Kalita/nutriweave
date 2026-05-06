import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Sprout, Activity, Dumbbell, Beaker } from 'lucide-react';
import { motion } from 'motion/react';

const welcomeImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRf7I0lpXtooFEH21iA8BtTadC6m9UqPLZ5KoZRgJEuYmoKvYbxitY4nEGaspIdb2vAZUYxQIuwAjhLnz349RWTyP4k13YLV3U4iyb7iaNVOWMDIeyvisUKIsM0YfAyIDmpf3ootbW_BJuZNnPG-X6jzRuyMPnxoF2t7cg09Wwe3gz8venc25_MTuaKMRTNWXXK0LL-Ke3vAXMbVp6lj82CeXpQf2lwbwrKHeb1eK4uxkibEIft_dcykxxVlKn_G1P2Jd5GbiK27Y";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface-container-lowest">
      {/* Top Half: Hero Image */}
      <div className="relative h-[55%] w-full shrink-0">
        <img 
          className="w-full h-full object-cover" 
          src={welcomeImage} 
          alt="Golden rice grains in bowl"
        />
        <div className="absolute inset-0 bg-[#A67B5B]/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
      </div>

      {/* Bottom Half: Content Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 bg-surface-container-lowest flex flex-col px-container py-8 relative z-10 -mt-10 rounded-t-[32px] shadow-[0px_-8px_24px_rgba(0,0,0,0.06)]"
      >
        {/* Branding */}
        <div className="flex items-center gap-1 mb-4">
          <Leaf className="text-primary w-6 h-6 fill-primary" />
          <span className="font-display text-xl font-semibold text-primary tracking-tight">Nutrifibe</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-on-surface mb-3 leading-tight">
            Not just rice.<br/>Rice, made for you.
          </h1>
          <p className="text-lg text-on-surface-variant max-w-[90%] leading-relaxed">
            Personalized nutrition in every grain, built around your goals.
          </p>
        </div>

        <div className="flex-1"></div>

        {/* Features Bento Row */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center border border-surface-container shadow-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center mb-2 text-on-secondary-container">
              <Beaker size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-center">Minerals</span>
          </div>
          
          <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center border border-surface-container shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center mb-2 text-primary">
              <Activity size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-center leading-tight">Glycemic<br/>Control</span>
          </div>

          <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center border border-surface-container shadow-sm">
            <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-2 text-tertiary">
              <Dumbbell size={20} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-center">Protein</span>
          </div>
        </div>

        {/* CTA Action */}
        <button 
          onClick={() => navigate('/how-it-works')}
          className="w-full h-14 bg-primary text-on-primary rounded-full flex items-center justify-center gap-2 font-display font-semibold shadow-[0px_8px_20px_rgba(47,110,63,0.2)] active:scale-[0.98] transition-all"
          id="get-started-button"
        >
          Get Started
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}
