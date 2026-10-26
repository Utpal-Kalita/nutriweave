import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, Scale, Sprout, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    { 
      id: 1, 
      label: 'Step 1', 
      title: 'You rate five rice preferences.',
      icon: Sliders,
      active: false
    },
    { 
      id: 2, 
      label: 'Step 2', 
      title: 'The workbook rule compares nutrition and taste.',
      icon: Scale,
      active: false
    },
    { 
      id: 3, 
      label: 'Step 3', 
      title: 'We identify a polishing level.',
      icon: Sprout,
      active: false
    },
    { 
      id: 4, 
      label: 'Step 4', 
      title: 'An approved matching product can be ordered.',
      icon: Truck,
      active: true
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-background w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="px-container sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-6 lg:pb-12">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold text-on-background mb-4 leading-tight font-display lg:text-5xl"
        >
          How it works
        </motion.h1>
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-on-surface-variant font-sans lg:text-xl"
        >
          Your personalized nutrition journey from seed to spoon.
        </motion.p>
      </section>

      {/* Vertical Timeline Steps */}
      <section className="px-container sm:px-8 lg:px-10 py-4 relative flex-1">
        {/* Connecting Line */}
        <div className="absolute left-[44px] top-[40px] bottom-[60px] w-[2px] bg-surface-container-highest z-0 lg:left-24 lg:right-24 lg:top-[47px] lg:bottom-auto lg:h-[2px] lg:w-auto"></div>
        
        <div className="flex flex-col gap-8 relative z-10 lg:grid lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.2 }}
              className="flex flex-row items-center gap-4 group lg:flex-col lg:items-stretch"
            >
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-md z-10 relative transition-transform duration-300 group-hover:scale-105 border lg:mx-auto ${
                step.active 
                  ? 'bg-primary-container text-on-primary-container border-primary-container shadow-primary/20' 
                  : 'bg-surface-container-lowest border-surface-container-highest text-primary'
              }`}>
                <step.icon size={22} strokeWidth={2.5} fill={step.active ? "currentColor" : "none"} />
              </div>
              
              <div className={`p-5 rounded-2xl shadow-sm flex-1 border transition-all lg:min-h-40 ${
                step.active 
                  ? 'bg-primary-container text-on-primary-container border-primary-container' 
                  : 'bg-surface-container-lowest border-surface-variant/30'
              }`}>
                <span className={`text-[10px] font-bold uppercase block mb-1 tracking-widest ${
                  step.active ? 'text-secondary-fixed' : 'text-outline'
                }`}>
                  {step.label}
                </span>
                <p className={`text-lg font-semibold font-display ${
                  step.active ? 'text-white' : 'text-on-background'
                }`}>
                  {step.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fixed Bottom CTA Panel */}
      <div className="sticky bottom-0 left-0 w-full px-container sm:px-8 py-6 bg-surface-container-lowest border-t border-surface-container-highest/30 shadow-[0px_-10px_30px_rgba(0,0,0,0.03)] z-50 lg:static lg:bg-transparent lg:border-0 lg:shadow-none lg:px-10 lg:py-12">
        <button 
          onClick={() => navigate('/priority')}
          className="w-full bg-primary text-on-primary font-display font-semibold h-14 rounded-full flex items-center justify-center active:scale-[0.98] transition-transform duration-200 shadow-sm lg:w-auto lg:min-w-56 lg:px-8 lg:mx-auto"
          id="continue-button-how"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
