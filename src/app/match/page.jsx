import React from "react";
import Link from "next/link";

export default function MatchPage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
<header className="bg-[#F7F3EA] dark:bg-neutral-950 docked full-width top-0 border-b border-[#EFE8D8] dark:border-neutral-800 flat no shadows flex justify-between items-center w-full px-5 py-4 sticky top-0 z-50 md:hidden">
<Link href="/priority" className="text-[#2F6E3F] dark:text-emerald-400 hover:bg-[#EFE8D8] dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95 transition-transform duration-200 p-2 flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</Link>
<div className="font-['Plus_Jakarta_Sans'] text-base font-semibold tracking-tight text-[#2F6E3F] dark:text-emerald-400">
            Nutrifibe
        </div>
<div className="w-10"></div> {/*  Spacer for alignment  */}
</header>
{/*  Main Content Area  */}
<main className="flex-grow flex flex-col px-container_margin pt-lg pb-[120px] md:py-xl max-w-[800px] mx-auto w-full">
<h1 className="font-h1 text-h1 text-primary text-center mb-md">Your Nutrifibe Match</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant text-center mb-xl max-w-2xl mx-auto">
            Based on your metabolic profile, we&apos;ve identified your optimal nutritional balance.
        </p>
{/*  Gauge Dashboard Card  */}
<div className="bg-surface-container-lowest rounded-[32px] shadow-[0px_12px_36px_rgba(47,110,63,0.08)] border border-[#EFE8D8] dark:border-neutral-800 w-full max-w-[500px] mx-auto p-md md:p-xl flex flex-col items-center relative overflow-hidden mb-xl">
{/*  Gauge Visual  */}
<div className="relative w-full max-w-[320px] aspect-[2/1] flex items-end justify-center mb-lg">
{/*  SVG Gauge Background (Semi-circle)  */}
<svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 50">
<defs>
<linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#135529"></stop>
<stop offset="100%" stopColor="#2f6e3f"></stop>
</linearGradient>
<linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#2f6e3f"></stop>
<stop offset="100%" stopColor="#84cc16"></stop>
</linearGradient>
<linearGradient id="grad3" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#84cc16"></stop>
<stop offset="100%" stopColor="#f59e0b"></stop>
</linearGradient>
<linearGradient id="grad4" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#f59e0b"></stop>
<stop offset="100%" stopColor="#ea580c"></stop>
</linearGradient>
</defs>
{/*  Background Arc (R=40, circumference for semi-circle is ~125.6)  */}
<path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#f1f5f9" strokeLinecap="round" strokeWidth="10"></path>
{/*  Dark Green (1-2.5) - Arc length ~31.4  */}
<path d="M 10 45 A 40 40 0 0 1 30 10.4" fill="none" stroke="url(#grad1)" strokeLinecap="round" strokeWidth="10"></path>
{/*  Green (2.5-5)  */}
<path d="M 30 10.4 A 40 40 0 0 1 50 5" fill="none" stroke="url(#grad2)" strokeLinecap="round" strokeWidth="10"></path>
{/*  Yellow (5-7.5)  */}
<path d="M 50 5 A 40 40 0 0 1 70 10.4" fill="none" stroke="url(#grad3)" strokeLinecap="round" strokeWidth="10"></path>
{/*  Orange (7.5-10)  */}
<path d="M 70 10.4 A 40 40 0 0 1 90 45" fill="none" stroke="url(#grad4)" strokeLinecap="round" strokeWidth="10"></path>
{/*  Indicator Pointer - Centered at (50, 45)  */}
<g className="needle-animate">
<line stroke="#1e293b" strokeLinecap="round" strokeWidth="3" x1="50" x2="50" y1="45" y2="15"></line>
<circle cx="50" cy="45" fill="#1e293b" r="5"></circle>
<circle cx="50" cy="45" fill="#ffffff" r="1.5"></circle>
</g>
</svg>
{/*  Center Text - Positioned below the needle pivot  */}
<div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-2">
<span className="font-['Inter'] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Level</span>
<span className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#2F6E3F] tracking-tight leading-tight">5</span>
</div>
</div>
<h2 className="font-h2 text-h2 text-on-surface mb-sm">Balanced Core</h2>
<p className="font-body-md text-body-md text-on-surface-variant text-center mb-xl">
                Your metabolism thrives on a steady intake of complex carbohydrates and balanced proteins.
            </p>
{/*  Tags  */}
<div className="flex flex-wrap justify-center gap-3 w-full">
<span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-label-bold text-[13px] px-4 py-2 rounded-full shadow-sm">High Minerals</span>
<span className="bg-amber-50 text-amber-700 border border-amber-100 font-label-bold text-[13px] px-4 py-2 rounded-full shadow-sm">Steady Energy</span>
<span className="bg-blue-50 text-blue-700 border border-blue-100 font-label-bold text-[13px] px-4 py-2 rounded-full shadow-sm">Good Protein</span>
</div>
</div>
{/*  Action Button  */}
<Link href="/customize" className="bg-[#2F6E3F] hover:bg-[#255832] text-white font-['Plus_Jakarta_Sans'] text-[18px] font-semibold w-full max-w-[384px] mx-auto py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#2F6E3F]/20 mt-4 mb-xl">
            Continue to Order
            <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</main>
{/*  BottomNavBar  */}
<nav className="bg-white dark:bg-neutral-900 docked full-width bottom-0 rounded-t-[24px] border-t border-[#EFE8D8] dark:border-neutral-800 shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden">
<Link href="/" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined mb-1" data-icon="home">home</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide">Home</span>
</Link>
<Link href="/customize" className="flex flex-col items-center justify-center text-[#2F6E3F] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined mb-1" data-icon="shopping_basket">shopping_basket</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide">Order</span>
</Link>
<Link href="/track" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined mb-1" data-icon="monitoring">monitoring</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide">Impact</span>
</Link>
<Link href="/profile" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined mb-1" data-icon="person">person</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide">Profile</span>
</Link>
</nav>
    </div>
  );
}
