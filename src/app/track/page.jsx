import React from "react";
import Link from "next/link";

export default function TrackPage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
<header className="bg-[#F7F3EA] dark:bg-neutral-950 flex justify-between items-center w-full px-5 py-4 sticky top-0 z-50 border-b border-[#EFE8D8] dark:border-neutral-800">
<Link href="/customize" className="hover:bg-[#EFE8D8] dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95 transition-transform duration-200 p-2 flex items-center justify-center text-[#2F6E3F] dark:text-emerald-400">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>arrow_back</span>
</Link>
<div className="text-lg font-extrabold text-[#2F6E3F] dark:text-emerald-500 font-h2 text-h2 tracking-tight">Nutrifibe</div>
<div className="w-10"></div> {/*  Placeholder for balance  */}
</header>
<main className="flex-grow px-container_margin py-lg pb-32 max-w-3xl mx-auto w-full">
{/*  Header Section  */}
<div className="mb-lg">
<h1 className="font-h1 text-h1 text-on-surface mb-xs">Your Impact</h1>
<p className="font-body-md text-body-md text-on-surface-variant">See how making the switch to Nutrifibe elevates your daily nutrition.</p>
</div>
{/*  Tabs  */}
<div className="flex space-x-2 mb-lg overflow-x-auto pb-2 scrollbar-hide">
<button className="px-md py-sm rounded-full bg-primary-container text-on-primary font-button text-button whitespace-nowrap shadow-sm">Nutrition</button>
<button className="px-md py-sm rounded-full bg-surface-container text-on-surface-variant font-button text-button whitespace-nowrap hover:bg-surface-container-high transition-colors">Energy</button>
<button className="px-md py-sm rounded-full bg-surface-container text-on-surface-variant font-button text-button whitespace-nowrap hover:bg-surface-container-high transition-colors">Progress</button>
</div>
{/*  Hero Comparison Card (Glassmorphism/Bento style)  */}
<div className="relative rounded-3xl overflow-hidden shadow-[0px_6px_20px_rgba(0,0,0,0.04)] mb-lg bg-surface-container-lowest border border-surface-variant">
<div className="absolute inset-0 z-0">
<img alt="Close up of raw rice grains with soft warm natural lighting and shallow depth of field" className="w-full h-full object-cover opacity-20" data-alt="Close up of raw rice grains with soft warm natural lighting and shallow depth of field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeYXVFd9vK788kOAmSk4J-Z02jEUYJVAXMaPtMDRfDaFuXVXC2GHfXEjr3dCZunfDOSuz0OkUMVxPFVQ5h9__gSMsfh7qLiAsT9r3VBV3uA1lK88QCjuojKFZZupjVTO2_yRMuPaZxPosyufqLKtByT4aEcVMSFJReZe6y8SrvDUj4eZq06qfouA4rWi6HD2yH_4Qqxc5IEOOkFOS7gK-DzTiU4gv_FK-O9-OIl4r9fg0HR8JjimC_4v4s7wOIUCoSauX00bwvHrw"/>
<div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest/90"></div>
</div>
<div className="relative z-10 p-lg">
<div className="flex justify-between items-end mb-xl">
<div>
<p className="font-label-bold text-label-bold text-primary uppercase tracking-widest mb-1">Comparison</p>
<h2 className="font-h2 text-h2 text-on-surface">Nutrifibe vs<br/>Regular Rice</h2>
</div>
<div className="bg-primary-container text-on-primary rounded-full p-2 flex items-center justify-center">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>eco</span>
</div>
</div>
{/*  Bento Metrics inside the card  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/*  Iron  */}
<div className="glass-panel rounded-2xl p-md">
<div className="flex justify-between items-center mb-sm">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-primary text-sm">bloodtype</span>
<span className="font-button text-button text-on-surface">Iron</span>
</div>
<span className="font-h3 text-h3 text-primary">+68%</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{width: '68%'}}></div>
</div>
<div className="flex justify-between mt-1">
<span className="font-label-bold text-[10px] text-on-surface-variant">Regular</span>
<span className="font-label-bold text-[10px] text-on-surface-variant">Nutrifibe</span>
</div>
</div>
{/*  Zinc  */}
<div className="glass-panel rounded-2xl p-md">
<div className="flex justify-between items-center mb-sm">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-secondary text-sm">science</span>
<span className="font-button text-button text-on-surface">Zinc</span>
</div>
<span className="font-h3 text-h3 text-secondary">+55%</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{width: '55%'}}></div>
</div>
</div>
{/*  Magnesium  */}
<div className="glass-panel rounded-2xl p-md md:col-span-2">
<div className="flex justify-between items-center mb-sm">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-tertiary text-sm">bolt</span>
<span className="font-button text-button text-on-surface">Magnesium</span>
</div>
<span className="font-h3 text-h3 text-tertiary">+40%</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{width: '40%'}}></div>
</div>
</div>
</div>
</div>
</div>
{/*  Benefits Section (Minimalist horizontal list)  */}
<div className="mt-xl">
<h3 className="font-h3 text-h3 text-on-surface mb-md">Key Benefits</h3>
<div className="space-y-4">
<div className="flex items-start space-x-md p-md bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
<div className="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
<span className="material-symbols-outlined">favorite</span>
</div>
<div>
<h4 className="font-button text-button text-on-surface">Heart Health</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Increased magnesium supports cardiovascular function and steady energy levels.</p>
</div>
</div>
<div className="flex items-start space-x-md p-md bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
<div className="bg-primary-container text-on-primary-container p-3 rounded-xl">
<span className="material-symbols-outlined">health_and_safety</span>
</div>
<div>
<h4 className="font-button text-button text-on-surface">Immunity Boost</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Higher zinc content directly contributes to a stronger, more resilient immune system.</p>
</div>
</div>
<div className="flex items-start space-x-md p-md bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
<div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-xl">
<span className="material-symbols-outlined">directions_run</span>
</div>
<div>
<h4 className="font-button text-button text-on-surface">Vitality</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">68% more iron ensures better oxygen transport, reducing daily fatigue.</p>
</div>
</div>
</div>
</div>
</main>
{/*  BottomNavBar  */}
<nav className="bg-white dark:bg-neutral-900 fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 border-t border-[#EFE8D8] dark:border-neutral-800 shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] rounded-t-[24px] md:hidden">
<Link href="/" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 w-16">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>home</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide mt-1">Home</span>
</Link>
<Link href="/customize" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 w-16">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>shopping_basket</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide mt-1">Order</span>
</Link>
<Link href="/track" className="flex flex-col items-center justify-center text-[#2F6E3F] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl px-3 py-1.5 active:scale-90 transition-all duration-200 w-16">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>monitoring</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide mt-1">Impact</span>
</Link>
<Link href="/profile" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 w-16">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>person</span>
<span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide mt-1">Profile</span>
</Link>
</nav>
    </div>
  );
}
