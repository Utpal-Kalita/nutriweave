import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Verified, ShoppingCart, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const riceImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg";

export default function CustomizeOrder() {
  const navigate = useNavigate();
  const [packSize, setPackSize] = useState('5 kg');
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState('one-time');

  return (
    <div className="flex flex-col min-h-full bg-surface pb-32">
      <main className="max-w-md mx-auto w-full">
        {/* Hero Product Card */}
        <section className="px-container mt-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden relative border border-surface-container-high"
          >
            <div className="absolute top-4 left-4 z-10 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-secondary-fixed/50 backdrop-blur-sm">
              <Verified size={14} fill="currentColor" />
              Level 5
            </div>
            <div className="aspect-[4/3] w-full bg-surface-container overflow-hidden">
              <img src={riceImage} alt="Premium Rice" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-bold text-on-surface mb-1 font-display">Premium Sona Masuri</h2>
              <p className="text-sm text-on-surface-variant font-sans">Aged 12 months for perfect texture. Ideal for daily consumption.</p>
            </div>
          </motion.div>
        </section>

        {/* Pack Size Section */}
        <section className="px-container mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-on-surface font-display">Pack Size</h3>
            <span className="text-sm text-on-surface-variant">Select one</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['1 kg', '5 kg', '10 kg', '25 kg'].map(size => (
              <button
                key={size}
                onClick={() => setPackSize(size)}
                className={`py-3 px-4 rounded-xl border font-semibold transition-all relative overflow-hidden ${
                  packSize === size 
                    ? 'border-primary bg-secondary-container text-on-secondary-container' 
                    : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {packSize === size && (
                  <div className="absolute top-0 right-0 w-8 h-8 flex items-start justify-end pr-0.5 pt-0.5">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[18px] border-r-[18px] border-t-primary border-r-transparent"></div>
                    <Check size={10} className="relative z-10 text-white" strokeWidth={4} />
                  </div>
                )}
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Quantity Section */}
        <section className="px-container mb-10">
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container-high flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-on-surface font-display">Quantity</h3>
              <p className="text-sm text-on-surface-variant">Number of packs</p>
            </div>
            <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/30">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors disabled:opacity-30"
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span className="font-bold text-lg w-8 text-center text-on-surface">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-secondary-container hover:bg-primary-fixed transition-colors"
                id="increase-quantity"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Delivery Frequency */}
        <section className="px-container mb-10">
          <h3 className="text-xl font-bold text-on-surface mb-4 font-display">Delivery Frequency</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'one-time', title: 'One-time purchase', desc: 'Delivered by Tomorrow, 8 AM' },
              { id: 'biweekly', title: 'Every 2 Weeks', desc: 'Save 5% on subscription', promo: true },
              { id: 'monthly', title: 'Monthly', desc: 'Save 10% on subscription', promo: true },
            ].map(opt => (
              <label 
                key={opt.id}
                className={`relative flex items-start p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  frequency === opt.id 
                    ? 'border-primary bg-surface-container-low' 
                    : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center h-6">
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={frequency === opt.id}
                    onChange={() => setFrequency(opt.id)}
                    className="w-5 h-5 text-primary border-outline focus:ring-primary" 
                  />
                </div>
                <div className="ml-4 flex-1">
                  <span className="block font-bold text-on-surface">{opt.title}</span>
                  <span className={`block text-xs mt-1 ${opt.promo ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                    {opt.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Optional Note */}
        <section className="px-container mb-10 pb-8">
          <h3 className="text-xl font-bold text-on-surface mb-2 font-display">Add a Note <span className="text-sm font-normal text-on-surface-variant">(Optional)</span></h3>
          <textarea 
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline resize-none transition-shadow" 
            placeholder="e.g. Leave at the front door..." 
            rows={2}
          ></textarea>
        </section>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface-container-lowest border-t border-surface-variant shadow-lg z-50 pt-5 pb-8 px-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">Total Price</span>
            <span className="text-2xl font-bold text-on-surface">₹{249 * quantity}</span>
          </div>
          <button 
            onClick={() => navigate('/order-success')}
            className="flex-1 bg-primary text-on-primary font-display font-semibold py-4 rounded-full shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
            id="add-to-cart-button"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
