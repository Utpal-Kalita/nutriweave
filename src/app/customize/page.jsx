"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CustomizePage() {
  const [packSize, setPackSize] = useState("5 kg");
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState("one-time");
  const [note, setNote] = useState("");

  const packPrices = {
    "1 kg": 99,
    "5 kg": 249,
    "10 kg": 489,
    "25 kg": 1199,
  };

  const frequencyDiscounts = {
    "one-time": 1,
    "2-weeks": 0.95,
    "monthly": 0.90,
  };

  const basePrice = packPrices[packSize] || 249;
  const discountMultiplier = frequencyDiscounts[frequency] || 1;
  const totalPrice = Math.round(basePrice * quantity * discountMultiplier);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="bg-surface-container-lowest min-h-screen flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/*  TopAppBar  */}
      <header className="bg-surface sticky top-0 z-50 w-full px-5 py-4 flex justify-between items-center transition-colors">
        <Link href="/match" aria-label="Go back" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest active:scale-95 transition-all text-on-surface">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </Link>
        <div className="text-center flex-1 pr-10">
          <h1 className="font-h3 text-h3 text-on-surface tracking-tight">Customize Order</h1>
        </div>
      </header>
      
      <main className="w-full max-w-md mx-auto pb-[120px]">
        {/*  Hero Product Card  */}
        <section className="px-container_margin mt-sm mb-lg">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_6px_20px_rgba(0,0,0,0.04)] overflow-hidden relative">
            <div className="absolute top-sm left-sm z-10 bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-bold text-label-bold flex items-center gap-1 shadow-sm border border-secondary-fixed/50 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[14px] icon-fill">verified</span>
              Level 5
            </div>
            <div className="aspect-[4/3] w-full bg-surface-container overflow-hidden">
              <img alt="High quality close up of premium raw white rice grains in a wooden bowl on a rustic surface, soft warm natural lighting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg"/>
            </div>
            <div className="p-md">
              <h2 className="font-h2 text-h2 text-on-surface mb-xs">Premium Sona Masuri</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Aged 12 months for perfect texture. Ideal for daily consumption.</p>
            </div>
          </div>
        </section>

        {/*  Pack Size Section  */}
        <section className="px-container_margin mb-xl">
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-h3 text-h3 text-on-surface">Pack Size</h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Select one</span>
          </div>
          <div className="flex flex-wrap gap-sm">
            {["1 kg", "5 kg", "10 kg", "25 kg"].map((size) => {
              const isActive = packSize === size;
              return (
                <button 
                  key={size}
                  onClick={() => setPackSize(size)}
                  className={`flex-1 min-w-[80px] py-sm px-sm rounded-xl font-button text-button transition-colors text-center active:scale-95 relative overflow-hidden ${
                    isActive 
                      ? "border-2 border-primary bg-secondary-container text-on-secondary-container" 
                      : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {isActive && (
                    <>
                      <span className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-primary border-r-transparent"></span>
                      <span className="material-symbols-outlined absolute top-[1px] right-[1px] text-[10px] text-surface-container-lowest icon-fill">check</span>
                    </>
                  )}
                  {size}
                </button>
              );
            })}
          </div>
        </section>

        {/*  Quantity Section  */}
        <section className="px-container_margin mb-xl flex items-center justify-between bg-surface-container-lowest p-md rounded-2xl shadow-[0px_6px_20px_rgba(0,0,0,0.04)]">
          <div>
            <h3 className="font-h3 text-h3 text-on-surface">Quantity</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Number of packs</p>
          </div>
          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/30">
            <button 
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors active:scale-90 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-button text-button w-8 text-center text-on-surface">{quantity}</span>
            <button 
              onClick={incrementQuantity}
              aria-label="Increase quantity" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-secondary-container hover:bg-primary-fixed transition-colors active:scale-90"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>

        {/*  Delivery Frequency  */}
        <section className="px-container_margin mb-xl">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Delivery Frequency</h3>
          <div className="flex flex-col gap-sm">
            {/*  Active Option  */}
            <label className={`relative flex items-start p-md rounded-xl cursor-pointer transition-all ${frequency === "one-time" ? "border-2 border-primary bg-surface-container-low" : "border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"}`}>
              <div className="flex items-center h-6">
                <input 
                  checked={frequency === "one-time"} 
                  onChange={() => setFrequency("one-time")}
                  className="w-5 h-5 text-primary bg-surface border-outline focus:ring-primary focus:ring-offset-surface" 
                  name="delivery" 
                  type="radio"
                />
              </div>
              <div className="ml-sm flex-1">
                <span className="block font-button text-button text-on-surface">One-time purchase</span>
                <span className="block font-body-sm text-body-sm text-on-surface-variant mt-xs">Delivered by Tomorrow, 8 AM</span>
              </div>
            </label>

            {/*  Inactive Option  */}
            <label className={`relative flex items-start p-md rounded-xl cursor-pointer transition-all ${frequency === "2-weeks" ? "border-2 border-primary bg-surface-container-low" : "border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"}`}>
              <div className="flex items-center h-6">
                <input 
                  checked={frequency === "2-weeks"} 
                  onChange={() => setFrequency("2-weeks")}
                  className="w-5 h-5 text-primary bg-surface border-outline focus:ring-primary focus:ring-offset-surface" 
                  name="delivery" 
                  type="radio"
                />
              </div>
              <div className="ml-sm flex-1">
                <span className="block font-button text-button text-on-surface">Every 2 Weeks</span>
                <span className="block font-body-sm text-body-sm text-secondary mt-xs font-medium">Save 5% on subscription</span>
              </div>
            </label>

            {/*  Inactive Option  */}
            <label className={`relative flex items-start p-md rounded-xl cursor-pointer transition-all ${frequency === "monthly" ? "border-2 border-primary bg-surface-container-low" : "border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"}`}>
              <div className="flex items-center h-6">
                <input 
                  checked={frequency === "monthly"} 
                  onChange={() => setFrequency("monthly")}
                  className="w-5 h-5 text-primary bg-surface border-outline focus:ring-primary focus:ring-offset-surface" 
                  name="delivery" 
                  type="radio"
                />
              </div>
              <div className="ml-sm flex-1">
                <span className="block font-button text-button text-on-surface">Monthly</span>
                <span className="block font-body-sm text-body-sm text-secondary mt-xs font-medium">Save 10% on subscription</span>
              </div>
            </label>
          </div>
        </section>

        {/*  Optional Note  */}
        <section className="px-container_margin mb-xl pb-lg">
          <h3 className="font-h3 text-h3 text-on-surface mb-sm">Add a Note <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">(Optional)</span></h3>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-md font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline resize-none transition-shadow" 
            placeholder="e.g. Leave at the front door..." 
            rows="2"
          ></textarea>
        </section>
      </main>

      {/*  Sticky Bottom Bar  */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-variant shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] z-50 pt-md pb-6 px-container_margin md:pb-md">
        <div className="w-full max-w-md mx-auto flex items-center justify-between gap-md">
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Total Price</span>
            <span className="font-h2 text-h2 text-on-surface">₹{totalPrice}</span>
          </div>
          <Link href="/track" className="flex-1 bg-primary text-on-primary font-button text-button py-4 rounded-full shadow-sm hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
