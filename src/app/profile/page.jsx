import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
<header className="flex justify-between items-center w-full px-5 py-4 sticky top-0 z-50 bg-[#F7F3EA] dark:bg-neutral-950 font-['Plus_Jakarta_Sans'] text-base font-semibold tracking-tight">
<Link href="/track" className="hover:bg-[#EFE8D8] dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95 transition-transform duration-200 p-2 flex items-center justify-center text-[#2F6E3F] dark:text-emerald-400">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 0'}}>arrow_back</span>
</Link>
<div className="text-lg font-extrabold text-[#2F6E3F] dark:text-emerald-500">
            Nutrifibe
        </div>
<div className="w-10"></div> {/*  Spacer for centering  */}
</header>
{/*  Main Content  */}
<main className="px-container_margin pt-lg pb-[120px] flex flex-col gap-lg max-w-5xl mx-auto">
{/*  Hero / Greeting  */}
<section className="flex items-center justify-between">
<div>
<h1 className="font-h1 text-h1 text-on-surface">Hello, Arjun</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-xs">Welcome back to your nutrition hub.</p>
</div>
<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container shadow-sm">
<img alt="Profile picture" className="w-full h-full object-cover" data-alt="Portrait of a young Indian man smiling outdoors with natural lighting and soft blurred background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1jP0cW1YMNjiBTHcML_eyhiht1z7-2t-9oS4kMDogRMdIbGMu0-sQKSDu2qsIIwCy1AcWUgMZ9z4G0CwZGH86QeVKgS-c_wc9XSqzn-2WfMdJZyZCjBPaWYVGN7zEaGJ6IJ-r4yV13z2U_f20-WMLAElhUA1IZxXyMD917vjtRdiPLC4AULh8I8Pw5Pvxs75CnCR8IYKRsFXVe72r6-I5io43u-vPh5i5daFcxkJxMjaciQJIWCEEApeM3r40vQtG7_cY5eHkmU0"/>
</div>
</section>
{/*  Bento Grid Dashboard  */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-md">
{/*  Profile Overview Card  */}
<div className="bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-sm">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<h3 className="font-h3 text-h3 text-on-surface">Account Details</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">arjun.s@example.com</p>
</div>
</div>
<div className="mt-xs border-t border-surface-variant pt-sm flex justify-between items-center">
<div>
<span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Status</span>
<p className="font-body-md text-body-md text-primary font-semibold">NutriPlus Member</p>
</div>
<button className="font-button text-button text-primary hover:text-primary-container active:scale-95 transition-all">
                        Edit
                    </button>
</div>
</div>
{/*  Preferences Card  */}
<div className="bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-sm">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
<span className="material-symbols-outlined">tune</span>
</div>
<h3 className="font-h3 text-h3 text-on-surface">Dietary Preferences</h3>
</div>
<div className="flex flex-wrap gap-xs mt-xs">
<span className="bg-secondary-container/30 text-on-surface px-sm py-xs rounded-full font-label-bold text-label-bold">Vegan</span>
<span className="bg-secondary-container/30 text-on-surface px-sm py-xs rounded-full font-label-bold text-label-bold">Gluten-Free</span>
<span className="bg-secondary-container/30 text-on-surface px-sm py-xs rounded-full font-label-bold text-label-bold">Low Sodium</span>
</div>
<div className="mt-sm border-t border-surface-variant pt-sm">
<button className="w-full flex justify-between items-center text-on-surface-variant hover:text-primary transition-colors">
<span className="font-body-md text-body-md">Manage all settings</span>
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
{/*  Recent Orders List (Full Width)  */}
<div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-[20px] p-md shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-md">
<div className="flex justify-between items-end">
<h2 className="font-h2 text-h2 text-on-surface">Recent Orders</h2>
<button className="font-body-sm text-body-sm text-primary font-semibold hover:underline">View All</button>
</div>
<div className="flex flex-col gap-sm">
{/*  Order Item 1  */}
<div className="flex items-center justify-between p-sm rounded-xl border border-surface-variant hover:border-primary-container transition-colors">
<div className="flex items-center gap-md">
<div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container">
<img alt="Veggie Box" className="w-full h-full object-cover" data-alt="Overhead view of a wooden crate filled with fresh vibrant organic vegetables like carrots, greens, and tomatoes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3kyYJT2bOKQFF1TMdw1ej9zs4wGU6L5v0sxGKh-wiZJCurIYIEhH01rANro4r3M_8HTXWdOF8ALo7hbHkGuIeZ0b265OgrEKdn4SatViWQb6Gxol0NSImCpbNyyRjeZ7ZAX86-ImHkNQ0u-6J7c94zvhgOPi8Lt03N-5USackmk5nZPqWR0rBIsjFPPckrXKM_s3HfBbv9kzaTJrxbo4rzflD0BLyS7ZtFqnd6wfUfvY6aMDtKb606rHir16ZTVhyzve-sHfPp5Q"/>
</div>
<div>
<h4 className="font-body-md text-body-md font-semibold text-on-surface">Farm Fresh Veggie Box</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Delivered • Oct 24</p>
</div>
</div>
<button className="bg-primary text-on-primary font-button text-button px-md py-sm rounded-full hover:bg-primary-container active:scale-95 transition-all flex items-center gap-xs shadow-sm">
<span className="material-symbols-outlined text-[18px]">replay</span>
<span>Reorder</span>
</button>
</div>
{/*  Order Item 2  */}
<div className="flex items-center justify-between p-sm rounded-xl border border-surface-variant hover:border-primary-container transition-colors">
<div className="flex items-center gap-md">
<div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container">
<img alt="Juice pack" className="w-full h-full object-cover" data-alt="Three glass bottles of colorful cold-pressed juices green orange and red on a clean white countertop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx6217hlEVZNRIb6opTSWX794tgU4_Dh9k1OLwq570slHfwc3lKKsRizbF_SKo5X5klZ3Xe9x__V7wvl42cPpVohriN-NernAfcLATs4vEXIYBBhJZmjwQynFJiW_bZFDuJLoik3tZ8AXq5_BZw4hD_kTB-rcqCubk-vxMOghbvmnMkF5YNqcBBwB2fhjJHPn2FFEhosYqegvyu8s2QjlYSUpp3uW4d2-wohU1SS1JGpNYkssuX_xTVeajGGQwfvLYQdOO-cF89h0"/>
</div>
<div>
<h4 className="font-body-md text-body-md font-semibold text-on-surface">Detox Juice Trio</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Delivered • Oct 18</p>
</div>
</div>
<button className="bg-surface text-primary border border-primary font-button text-button px-md py-sm rounded-full hover:bg-secondary-container active:scale-95 transition-all flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">replay</span>
<span>Reorder</span>
</button>
</div>
</div>
</div>
</section>
</main>
{/*  BottomNavBar (Mobile Only)  */}
<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white dark:bg-neutral-900 shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] rounded-t-[24px] font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-wide">
<Link href="/" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 group">
<span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform" style={{fontVariationSettings: '"FILL" 0'}}>home</span>
<span>Home</span>
</Link>
<Link href="/customize" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 group">
<span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform" style={{fontVariationSettings: '"FILL" 0'}}>shopping_basket</span>
<span>Order</span>
</Link>
<Link href="/track" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 px-3 py-1.5 hover:text-[#2F6E3F] dark:hover:text-emerald-300 active:scale-90 transition-all duration-200 group">
<span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform" style={{fontVariationSettings: '"FILL" 0'}}>monitoring</span>
<span>Impact</span>
</Link>
<Link href="/profile" className="flex flex-col items-center justify-center text-[#2F6E3F] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl px-3 py-1.5 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined mb-1" style={{fontVariationSettings: '"FILL" 1'}}>person</span>
<span>Profile</span>
</Link>
</nav>
    </div>
  );
}
