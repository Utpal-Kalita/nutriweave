import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  Top Half: Hero Image  */}
<div className="relative h-[486px] w-full shrink-0">
<img className="w-full h-full object-cover" data-alt="Close up aesthetic view of golden rice grains in wooden bowl sitting in a sunlit paddy field with a warm, soft morning light overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRf7I0lpXtooFEH21iA8BtTadC6m9UqPLZ5KoZRgJEuYmoKvYbxitY4nEGaspIdb2vAZUYxQIuwAjhLnz349RWTyP4k13YLV3U4iyb7iaNVOWMDIeyvisUKIsM0YfAyIDmpf3ootbW_BJuZNnPG-X6jzRuyMPnxoF2t7cg09Wwe3gz8venc25_MTuaKMRTNWXXK0LL-Ke3vAXMbVp6lj82CeXpQf2lwbwrKHeb1eK4uxkibEIft_dcykxxVlKn_G1P2Jd5GbiK27Y"/>
{/*  Warm Overlay & Gradient Fade  */}
<div className="absolute inset-0 bg-[#A67B5B]/20 mix-blend-multiply"></div>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
</div>
{/*  Bottom Half: Content Card  */}
<div className="flex-1 bg-surface-container-lowest flex flex-col px-container_margin pb-xl pt-lg relative z-10 -mt-xl rounded-t-[32px] shadow-[0px_-8px_24px_rgba(0,0,0,0.06)]">
{/*  Branding  */}
<div className="flex items-center gap-xs mb-md">
<span className="material-symbols-outlined text-primary text-[24px]" style={{fontVariationSettings: '"FILL" 1'}}>nutrition</span>
<span className="font-h3 text-h3 text-primary tracking-tight">Nutrifibe</span>
</div>
{/*  Typography  */}
<div className="mb-lg">
<h1 className="font-h1 text-h1 text-on-surface mb-sm">Not just rice.<br/>Rice, made for you.</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-[90%]">Personalized nutrition in every grain, built around your goals.</p>
</div>
<div className="flex-1"></div>
{/*  Features Bento Row  */}
<div className="grid grid-cols-3 gap-sm mb-xl">
{/*  Feature 1  */}
<div className="bg-surface rounded-[20px] p-sm flex flex-col items-center justify-center border border-surface-container shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
<div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center mb-xs text-on-secondary-container">
<span className="material-symbols-outlined text-[20px]">science</span>
</div>
<span className="font-label-bold text-label-bold text-on-surface-variant text-center">Minerals</span>
</div>
{/*  Feature 2  */}
<div className="bg-surface rounded-[20px] p-sm flex flex-col items-center justify-center border border-surface-container shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
<div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center mb-xs text-primary">
<span className="material-symbols-outlined text-[20px]">monitor_heart</span>
</div>
<span className="font-label-bold text-label-bold text-on-surface-variant text-center leading-tight">Glycemic<br/>Control</span>
</div>
{/*  Feature 3  */}
<div className="bg-surface rounded-[20px] p-sm flex flex-col items-center justify-center border border-surface-container shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
<div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-xs text-tertiary">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>fitness_center</span>
</div>
<span className="font-label-bold text-label-bold text-on-surface-variant text-center">Protein</span>
</div>
</div>
{/*  CTA Action  */}
<Link href="/how-it-works" className="w-full h-xxl bg-primary text-on-primary rounded-full flex items-center justify-center gap-xs font-button text-button shadow-[0px_8px_20px_rgba(47,110,63,0.2)] active:scale-[0.98] transition-all duration-200">
            Get Started
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</Link>
</div>
    </div>
  );
}
