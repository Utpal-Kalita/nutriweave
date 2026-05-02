import React from "react";
import Link from "next/link";

export default function PriorityPage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
{/*  Suppressing BottomNav due to linear/onboarding intent, keeping TopAppBar as anchor  */}
<header className="bg-[#F7F3EA] dark:bg-neutral-950 docked full-width top-0 border-b border-[#EFE8D8] dark:border-neutral-800 flat no shadows flex justify-between items-center w-full px-5 py-4 sticky z-50">
<Link href="/how-it-works" aria-label="Go back" className="text-neutral-500 dark:text-neutral-400 hover:bg-[#EFE8D8] dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95 duration-200 p-2 -ml-2 flex items-center justify-center">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>arrow_back</span>
</Link>
<span className="text-lg font-extrabold text-[#2F6E3F] dark:text-emerald-500 font-['Plus_Jakarta_Sans'] tracking-tight">Nutrifibe</span>
<div className="w-10"></div> {/*  Spacer for flex-between alignment  */}
</header>
{/*  Main Content  */}
<main className="flex-1 px-container_margin pt-lg pb-[120px] flex flex-col gap-lg">
{/*  Header Section  */}
<div className="flex flex-col gap-sm">
<h1 className="font-h1 text-h1 text-on-surface">Tell us what matters most</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Rate each priority (1 = Low, 3 = High) to help us personalize your nutrition plan.</p>
</div>
{/*  Cards Container  */}
<div className="flex flex-col gap-md">
{/*  Card 1: Minerals  */}
<div className="bg-surface-container-lowest rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md relative overflow-hidden border border-surface-container-high">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-10 rounded-bl-[100px] pointer-events-none"></div>
<div className="flex justify-between items-start z-10">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>grain</span>
</div>
<div>
<h2 className="font-h3 text-h3 text-on-surface">Minerals</h2>
<p className="font-body-sm text-body-sm text-primary font-medium">Strength inside</p>
</div>
</div>
<div className="bg-surface-container px-sm py-xs rounded-full">
<span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Current: 2</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant z-10">Iron, Zinc, and Magnesium to support daily bodily functions.</p>
{/*  3-Step Tactile Slider / Segmented Control  */}
<div className="bg-surface-container rounded-full p-1 flex justify-between items-center z-10 mt-sm">
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">1</button>
<button className="flex-1 py-sm rounded-full font-button text-button bg-surface-container-lowest text-primary shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-all">2</button>
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">3</button>
</div>
</div>
{/*  Card 2: Glycemic Control  */}
<div className="bg-surface-container-lowest rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md relative overflow-hidden border border-surface-container-high">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-20 rounded-bl-[100px] pointer-events-none"></div>
<div className="flex justify-between items-start z-10">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>monitoring</span>
</div>
<div>
<h2 className="font-h3 text-h3 text-on-surface">Glycemic Control</h2>
<p className="font-body-sm text-body-sm text-secondary font-medium">Steady energy</p>
</div>
</div>
<div className="bg-surface-container px-sm py-xs rounded-full">
<span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Current: 3</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant z-10">Helps manage sugar spikes and maintain consistent energy levels.</p>
{/*  3-Step Tactile Slider / Segmented Control  */}
<div className="bg-surface-container rounded-full p-1 flex justify-between items-center z-10 mt-sm">
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">1</button>
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">2</button>
<button className="flex-1 py-sm rounded-full font-button text-button bg-surface-container-lowest text-secondary shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-all">3</button>
</div>
</div>
{/*  Card 3: Protein  */}
<div className="bg-surface-container-lowest rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md relative overflow-hidden border border-surface-container-high">
<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-container opacity-10 rounded-bl-[100px] pointer-events-none"></div>
<div className="flex justify-between items-start z-10">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>fitness_center</span>
</div>
<div>
<h2 className="font-h3 text-h3 text-on-surface">Protein</h2>
<p className="font-body-sm text-body-sm text-tertiary font-medium">Daily strength</p>
</div>
</div>
<div className="bg-surface-container px-sm py-xs rounded-full">
<span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Current: 1</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant z-10">Supports muscle recovery and promotes a feeling of fullness.</p>
{/*  3-Step Tactile Slider / Segmented Control  */}
<div className="bg-surface-container rounded-full p-1 flex justify-between items-center z-10 mt-sm">
<button className="flex-1 py-sm rounded-full font-button text-button bg-surface-container-lowest text-tertiary shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-all">1</button>
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">2</button>
<button className="flex-1 py-sm rounded-full font-button text-button text-on-surface-variant hover:text-on-surface transition-colors">3</button>
</div>
</div>
</div>
</main>
{/*  Fixed Bottom CTA Container  */}
<div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-container p-container_margin z-40">
<Link href="/match" className="w-full h-[56px] bg-primary text-on-primary font-button text-button rounded-full shadow-[0px_6px_20px_rgba(47,110,63,0.2)] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center gap-sm">
            See My Recommended Rice
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</Link>
</div>
    </div>
  );
}
