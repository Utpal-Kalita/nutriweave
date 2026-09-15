import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wheat, Activity, Dumbbell, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ensureDemoProfile, saveDemoProfile } from '../lib/demoStore';

export default function PrioritySelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [priorities, setPriorities] = useState({
    minerals: 2,
    glycemic: 3,
    protein: 1
  });

  const cards = [
    {
      id: 'minerals',
      title: 'Minerals',
      subtitle: 'Strength inside',
      description: 'Iron, Zinc, and Magnesium to support daily bodily functions.',
      icon: Wheat,
      color: 'bg-primary-container',
      accent: 'text-primary',
      bg: 'bg-primary-container/10'
    },
    {
      id: 'glycemic',
      title: 'Glycemic Control',
      subtitle: 'Steady energy',
      description: 'Helps manage sugar spikes and maintain consistent energy levels.',
      icon: Activity,
      color: 'bg-secondary-container',
      accent: 'text-secondary',
      bg: 'bg-secondary-container/20'
    },
    {
      id: 'protein',
      title: 'Protein',
      subtitle: 'Daily strength',
      description: 'Supports muscle recovery and promotes a feeling of fullness.',
      icon: Dumbbell,
      color: 'bg-tertiary-container',
      accent: 'text-tertiary',
      bg: 'bg-tertiary-container/10'
    }
  ];

  const updatePriority = (id: string, val: number) => {
    setPriorities(prev => ({ ...prev, [id]: val }));
  };

  const handleSaveAndMatch = async () => {
    if (user) {
      setLoading(true);
      try {
        const sum = priorities.minerals + priorities.glycemic + priorities.protein;
        // Map sum [3, 9] to level [10, 1]
        const matchedLevel = Math.max(1, Math.min(10, Math.round(10 - (sum - 3) * 1.5)));

        const profile = ensureDemoProfile(user);
        saveDemoProfile({
          ...profile,
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          minerals_priority: priorities.minerals,
          glycemic_priority: priorities.glycemic,
          protein_priority: priorities.protein,
          matched_level: matchedLevel,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.error('Error saving priorities:', err);
      } finally {
        setLoading(false);
      }
    }
    navigate('/match');
  };

  return (
    <div className="flex flex-col min-h-full bg-surface">
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-6 lg:pt-12 pb-40 lg:pb-8 flex flex-col gap-8 lg:gap-10">
        {/* Progress Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
          <div className="h-1.5 flex-1 bg-surface-container-highest rounded-full"></div>
          <div className="h-1.5 flex-1 bg-surface-container-highest rounded-full"></div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl font-bold text-on-surface font-display leading-tight lg:text-5xl">Tell us what matters most</h1>
          <p className="text-base text-on-surface-variant leading-relaxed lg:text-lg">
            Rate each priority to help our algorithm find your perfect match.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {cards.map((card, index) => {
            const currentVal = priorities[card.id as keyof typeof priorities];
            return (
              <motion.div 
                key={card.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-surface-container-lowest rounded-3xl shadow-sm p-5 lg:p-6 flex flex-col gap-6 relative overflow-hidden border border-surface-container-high"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} rounded-bl-[100px] pointer-events-none transition-all`}></div>
                
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center text-white shadow-sm`}>
                      <card.icon size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-on-surface font-display">{card.title}</h2>
                      <p className={`text-sm ${card.accent} font-semibold uppercase tracking-wide`}>{card.subtitle}</p>
                    </div>
                  </div>
                  <div className="bg-surface-container px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">
                      Current: {currentVal}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant z-10 leading-relaxed font-sans pr-12 lg:pr-0 lg:min-h-16">
                  {card.description}
                </p>

                {/* 3-Step Segmented Control */}
                <div className="bg-surface-container rounded-full p-1 flex justify-between items-center z-10">
                  {[1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => updatePriority(card.id, val)}
                      className={`flex-1 py-3 rounded-full font-display font-semibold text-base transition-all ${
                        currentVal === val 
                          ? `bg-surface-container-lowest ${card.accent} shadow-md scale-[1.02]` 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                      id={`priority-${card.id}-${val}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-surface-container p-6 z-50 lg:static lg:w-full lg:max-w-7xl lg:bg-transparent lg:border-0 lg:px-10 lg:pt-0 lg:pb-12 lg:backdrop-blur-none">
        <button 
          onClick={handleSaveAndMatch}
          disabled={loading}
          className="w-full h-14 bg-primary text-on-primary font-display font-semibold rounded-full shadow-[0px_8px_20px_rgba(19,85,41,0.25)] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 lg:w-auto lg:min-w-64 lg:ml-auto"
          id="see-recommended-button"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : (
            <>
              See My Match
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
