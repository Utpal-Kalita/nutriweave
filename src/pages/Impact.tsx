import React from 'react';
import { Leaf, Activity, Beaker, Zap, Heart, Shield, Accessibility } from 'lucide-react';
import { motion } from 'motion/react';

export default function Impact() {
  const metrics = [
    { label: 'Iron', icon: Leaf, value: '+68%', color: 'bg-primary', accent: 'text-primary' },
    { label: 'Zinc', icon: Beaker, value: '+55%', color: 'bg-secondary', accent: 'text-secondary' },
    { label: 'Magnesium', icon: Zap, value: '+40%', color: 'bg-tertiary', accent: 'text-tertiary' }
  ];

  return (
    <div className="flex flex-col min-h-full bg-background px-5 pt-8">
      {/* Header */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <h1 className="text-4xl font-bold text-on-surface mb-2 font-display">Your Impact</h1>
        <p className="text-base text-on-surface-variant">See how making the switch to Nutrifibe elevates your daily nutrition.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-5 py-2.5 rounded-full bg-primary-container text-white font-semibold whitespace-nowrap shadow-sm">Nutrition</button>
        <button className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-semibold whitespace-nowrap hover:bg-surface-container-high transition-colors">Energy</button>
        <button className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-semibold whitespace-nowrap hover:bg-surface-container-high transition-colors">Progress</button>
      </div>

      {/* Hero Comparison Card */}
      <div className="relative rounded-[32px] overflow-hidden shadow-md mb-10 bg-surface-container-lowest border border-surface-variant">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#A67B5B]/5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest/90"></div>
        </div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 font-sans">Comparison</p>
              <h2 className="text-3xl font-bold text-on-surface font-display leading-tight">Nutrifibe vs<br/>Regular Rice</h2>
            </div>
            <div className="bg-primary-container text-white rounded-full p-3 flex items-center justify-center shadow-lg shadow-primary/20">
              <Leaf size={24} fill="currentColor" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {metrics.map((m, i) => (
              <motion.div 
                key={m.label} 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <m.icon size={18} className={m.accent} />
                    <span className="font-bold text-on-surface">{m.label}</span>
                  </div>
                  <span className={`text-2xl font-bold ${m.accent}`}>{m.value}</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: m.value }}
                    transition={{ delay: 0.5 + 0.1 * i, duration: 1 }}
                    className={`h-full ${m.color} rounded-full`}
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Regular</span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Nutrifibe</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Benefits List */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-on-surface mb-6 font-display">Key Benefits</h3>
        <div className="flex flex-col gap-4">
          {[
            { title: 'Heart Health', desc: 'Increased magnesium supports cardiovascular function.', icon: Heart, color: 'bg-secondary-container' },
            { title: 'Immunity Boost', desc: 'Higher zinc content contributes to a resilient immune system.', icon: Shield, color: 'bg-primary-container/20' },
            { title: 'Vitality', desc: '68% more iron ensures better oxygen transport.', icon: Zap, color: 'bg-tertiary-container/20' },
          ].map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm">
              <div className={`${benefit.color} p-3 rounded-xl shadow-sm`}>
                <benefit.icon size={22} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface font-display">{benefit.title}</h4>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
