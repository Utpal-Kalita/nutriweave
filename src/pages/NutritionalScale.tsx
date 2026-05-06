import React from 'react';
import { Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

export default function NutritionalScale() {
  const sections = [
    {
      id: 'nutrient-max',
      title: 'Nutrient Max',
      range: [1, 2, 3],
      description: 'Uncompromising health focus. Maximum dietary fiber, zero empty calories, and pure functional ingredients.',
      color: 'bg-primary-container/20',
      accent: 'text-primary',
      borderColor: 'border-primary-container/10'
    },
    {
      id: 'balanced-core',
      title: 'Balanced Core',
      range: [4, 5],
      current: 5,
      ideal: true,
      description: 'The optimal daily target. High nutritional value with a touch of familiar comfort for sustainable, long-term habits.',
      color: 'bg-secondary-container/30',
      accent: 'text-secondary',
      borderColor: 'border-secondary/30'
    },
    {
      id: 'smart-comfort',
      title: 'Smart Comfort',
      range: [6, 7],
      description: 'Elevated classics. Traditional flavors and textures, modified slightly to include better macros and hidden fiber.',
      color: 'bg-surface-variant/50',
      accent: 'text-on-surface-variant',
      borderColor: 'border-outline-variant/10'
    },
    {
      id: 'pure-comfort',
      title: 'Pure Comfort',
      range: [8, 9, 10],
      description: 'Indulgence first. Formulated for maximum emotional satisfaction and taste, intended for occasional mindful enjoyment.',
      color: 'bg-tertiary-container/20',
      accent: 'text-tertiary',
      borderColor: 'border-tertiary-container/10'
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-background px-5 pt-8 pb-10 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-on-background mb-2 font-display">Nutritional Scale</h1>
        <p className="text-lg text-on-surface-variant">Understanding the balance between functional density and comfort.</p>
      </motion.div>

      {/* Vertical Scale */}
      <div className="flex flex-col gap-6 relative">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id} 
            initial={{ x: idx % 2 === 0 ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * idx }}
            className="flex items-stretch gap-6 group"
          >
            <div className={`w-[56px] shrink-0 rounded-[28px] ${section.color} p-1 flex flex-col gap-1 items-center py-2 border ${section.borderColor}`}>
              {section.range.map(num => (
                <div 
                  key={num} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    section.current === num 
                      ? 'bg-secondary text-white scale-125 shadow-lg ring-4 ring-background z-10' 
                      : section.accent
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            
            <div className={`flex-1 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border ${
              section.ideal ? 'border-secondary/30 ring-1 ring-secondary/5' : 'border-outline-variant/10'
            } flex flex-col justify-center transition-all hover:shadow-md`}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-xl font-bold font-display ${section.accent}`}>{section.title}</h2>
                {section.ideal && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold text-[10px] uppercase tracking-widest">Ideal</span>
                )}
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {section.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-surface-container rounded-3xl p-8 border border-outline-variant/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-background mb-2 font-display">How to use this scale</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              For optimal metabolic and gut health, aim to anchor <strong>80% of your choices</strong> in the <span className="font-bold text-secondary">Balanced Core (1-5)</span>. The scale isn't about restriction; it's a tool to help you make informed, intentional decisions throughout your week.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
