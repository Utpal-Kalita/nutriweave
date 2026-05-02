import React from "react";

export default function ScalePage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar JSON Implemented Literal  */}
<header className="flex justify-between items-center w-full px-5 py-4 sticky top-0 z-50 bg-[#F7F3EA] dark:bg-neutral-950 border-b border-[#EFE8D8] dark:border-neutral-800">
<button aria-label="Go back" className="flex items-center justify-center p-2 -ml-2 text-[#2F6E3F] dark:text-emerald-400 hover:bg-[#EFE8D8] dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</button>
<span className="text-lg font-extrabold text-[#2F6E3F] dark:text-emerald-500 font-['Plus_Jakarta_Sans'] tracking-tight">Nutrifibe</span>
<div className="w-10"></div> {/*  Spacer for optical centering  */}
</header>
<main className="flex-1 px-container_margin pt-lg pb-xxl max-w-2xl mx-auto w-full">
{/*  Header Section  */}
<div className="mb-xl text-center">
<h1 className="font-h1 text-h1 text-on-background mb-xs">Nutritional Scale</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Understanding the balance between functional density and comfort.</p>
</div>
{/*  Vertical Scale Container  */}
<div className="flex flex-col gap-md relative">
{/*  Section 1: Nutrient Max (1-3)  */}
<div className="flex items-stretch gap-md group">
<div className="w-[52px] shrink-0 rounded-[26px] bg-primary-container/20 p-xs flex flex-col gap-xs items-center py-xs border border-primary-container/10">
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-primary">1</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-primary">2</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-primary">3</div>
</div>
<div className="flex-1 bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 flex flex-col justify-center transition-shadow hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
<h2 className="font-h3 text-h3 text-primary mb-xs">Nutrient Max</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Uncompromising health focus. Maximum dietary fiber, zero empty calories, and pure functional ingredients.</p>
</div>
</div>
{/*  Section 2: Balanced Core (4-5) - HIGHLIGHTED  */}
<div className="flex items-stretch gap-md relative">
<div className="w-[52px] shrink-0 rounded-[26px] bg-secondary-container/30 p-xs flex flex-col gap-xs items-center py-xs border border-secondary-container/20 relative z-10">
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-secondary">4</div>
{/*  Highlighted Level 5  */}
<div className="w-11 h-11 rounded-full flex items-center justify-center font-button text-button bg-secondary text-on-secondary shadow-[0px_4px_12px_rgba(44,106,60,0.4)] scale-110 ring-4 ring-background transform transition-transform">5</div>
</div>
{/*  Highlighted Card  */}
<div className="flex-1 bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_8px_24px_rgba(44,106,60,0.08)] border border-secondary/30 flex flex-col justify-center relative overflow-hidden">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10"></div>
<div className="flex items-center gap-xs mb-xs">
<h2 className="font-h3 text-h3 text-secondary">Balanced Core</h2>
<span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-bold text-[10px] uppercase tracking-widest">Ideal</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">The optimal daily target. High nutritional value with a touch of familiar comfort for sustainable, long-term habits.</p>
</div>
</div>
{/*  Section 3: Smart Comfort (6-7)  */}
<div className="flex items-stretch gap-md">
<div className="w-[52px] shrink-0 rounded-[26px] bg-surface-variant/50 p-xs flex flex-col gap-xs items-center py-xs border border-outline-variant/10">
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-on-surface-variant">6</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-on-surface-variant">7</div>
</div>
<div className="flex-1 bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 flex flex-col justify-center">
<h2 className="font-h3 text-h3 text-on-background mb-xs">Smart Comfort</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Elevated classics. Traditional flavors and textures, modified slightly to include better macros and hidden fiber.</p>
</div>
</div>
{/*  Section 4: Pure Comfort (8-10)  */}
<div className="flex items-stretch gap-md">
<div className="w-[52px] shrink-0 rounded-[26px] bg-tertiary-container/20 p-xs flex flex-col gap-xs items-center py-xs border border-tertiary-container/10">
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-tertiary">8</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-tertiary">9</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold text-tertiary">10</div>
</div>
<div className="flex-1 bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 flex flex-col justify-center">
<h2 className="font-h3 text-h3 text-tertiary mb-xs">Pure Comfort</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Indulgence first. Formulated for maximum emotional satisfaction and taste, intended for occasional mindful enjoyment.</p>
</div>
</div>
</div>
{/*  Educational Explanation Bottom Card  */}
<div className="mt-xl bg-surface-container rounded-[20px] p-lg border border-outline-variant/20">
<div className="flex items-start gap-sm">
<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[18px]" data-icon="psychology">psychology</span>
</div>
<div>
<h3 className="font-button text-button text-on-background mb-1">How to use this scale</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        For optimal metabolic and gut health, aim to anchor <strong>80% of your choices</strong> in the <span className="font-semibold text-secondary">Balanced Core (1-5)</span>. The scale isn&apos;t about restriction; it&apos;s a tool to help you make informed, intentional decisions throughout your week.
                    </p>
</div>
</div>
</div>
</main>
    </div>
  );
}
