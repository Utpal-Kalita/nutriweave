import React from "react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
<header className="sticky top-0 z-50 flex justify-between items-center w-full px-container_margin py-4 bg-surface border-b border-surface-variant/50">
<Link href="/" aria-label="Go back" className="text-primary-container active:scale-95 transition-transform duration-200 flex items-center justify-center">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>arrow_back</span>
</Link>
<div className="font-h2 text-h2 text-primary-container font-extrabold tracking-tight">Nutrifibe</div>
<div className="w-6 h-6"></div> {/*  Spacer for balance  */}
</header>
{/*  Main Content Canvas  */}
<main className="flex-1 pb-[120px]">
{/*  Hero Section  */}
<section className="px-container_margin pt-xl pb-lg">
<h1 className="font-h1 text-h1 text-on-background mb-sm leading-tight">How it works</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Your personalized nutrition journey from seed to spoon.</p>
</section>
{/*  Vertical Timeline Steps  */}
<section className="px-container_margin py-sm relative">
{/*  Continuous Connecting Line  */}
{/*  Placed 23px from left to perfectly center behind a 48px (w-12) icon  */}
<div className="absolute left-[43px] top-[40px] bottom-[60px] w-[2px] bg-surface-container-highest z-0"></div>
<div className="flex flex-col gap-xl relative z-10">
{/*  Step 1  */}
<div className="flex flex-row items-center gap-md group">
<div className="w-12 h-12 shrink-0 rounded-full bg-surface-container-lowest border border-surface-container-highest text-primary flex items-center justify-center shadow-[0px_6px_20px_rgba(0,0,0,0.04)] z-10 relative transition-transform duration-300 group-hover:scale-105">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>tune</span>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex-1 border border-surface-variant/30">
<span className="font-label-bold text-label-bold text-outline uppercase block mb-xs tracking-widest">Step 1</span>
<p className="font-body-lg text-body-lg text-on-background font-semibold">You tell us your priorities.</p>
</div>
</div>
{/*  Step 2  */}
<div className="flex flex-row items-center gap-md group">
<div className="w-12 h-12 shrink-0 rounded-full bg-surface-container-lowest border border-surface-container-highest text-primary flex items-center justify-center shadow-[0px_6px_20px_rgba(0,0,0,0.04)] z-10 relative transition-transform duration-300 group-hover:scale-105">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>balance</span>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex-1 border border-surface-variant/30">
<span className="font-label-bold text-label-bold text-outline uppercase block mb-xs tracking-widest">Step 2</span>
<p className="font-body-lg text-body-lg text-on-background font-semibold">Our algorithm finds your balance.</p>
</div>
</div>
{/*  Step 3  */}
<div className="flex flex-row items-center gap-md group">
<div className="w-12 h-12 shrink-0 rounded-full bg-surface-container-lowest border border-surface-container-highest text-primary flex items-center justify-center shadow-[0px_6px_20px_rgba(0,0,0,0.04)] z-10 relative transition-transform duration-300 group-hover:scale-105">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>agriculture</span>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex-1 border border-surface-variant/30">
<span className="font-label-bold text-label-bold text-outline uppercase block mb-xs tracking-widest">Step 3</span>
<p className="font-body-lg text-body-lg text-on-background font-semibold">We mill your rice.</p>
</div>
</div>
{/*  Step 4 (Highlighted Destination)  */}
<div className="flex flex-row items-center gap-md group">
<div className="w-12 h-12 shrink-0 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0px_6px_20px_rgba(47,110,63,0.15)] z-10 relative transition-transform duration-300 group-hover:scale-105">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>local_shipping</span>
</div>
<div className="bg-primary-container text-on-primary-container p-md rounded-xl shadow-[0px_6px_20px_rgba(47,110,63,0.1)] flex-1 relative overflow-hidden">
{/*  Subtle background decoration for the final step  */}
<div className="absolute -right-4 -top-4 w-16 h-16 bg-surface-tint rounded-full opacity-20 blur-xl"></div>
<span className="font-label-bold text-label-bold text-secondary-fixed uppercase block mb-xs tracking-widest relative z-10">Step 4</span>
<p className="font-body-lg text-body-lg text-white font-semibold relative z-10">Delivered fresh to you.</p>
</div>
</div>
</div>
</section>
</main>
{/*  Fixed Bottom CTA Panel  */}
<div className="fixed bottom-0 left-0 w-full px-container_margin py-md bg-surface-container-lowest border-t border-surface-container-highest/30 shadow-[0px_-10px_30px_rgba(0,0,0,0.03)] z-50">
<Link href="/priority" className="w-full bg-primary text-on-primary font-button text-button h-xxl rounded-full flex items-center justify-center active:scale-[0.98] transition-transform duration-200 shadow-sm">
            Continue
        </Link>
</div>
    </div>
  );
}
