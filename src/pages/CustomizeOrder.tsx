import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Verified, ShoppingCart, Minus, Plus, Loader2, PackageSearch } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { DemoProduct, ensureDemoProfile, getDemoProducts, getDemoProfile } from '../lib/demoStore';
import { calculateOrderPricing } from '../lib/pricing';
import { mapRecommendationToProduct, RecommendationLevel } from '../lib/recommendation';

export default function CustomizeOrder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [packSize, setPackSize] = useState('5 kg');
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState('one-time');
  
  const [product, setProduct] = useState<DemoProduct | null>(null);
  const [recommendationLevel, setRecommendationLevel] = useState<RecommendationLevel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      if (!user) return;

      const profile = getDemoProfile(user.id) || ensureDemoProfile(user);
      if (!profile.recommendation_level || !profile.recommendation_answers) {
        navigate('/priority', { replace: true });
        return;
      }

      setRecommendationLevel(profile.recommendation_level);
      setProduct(mapRecommendationToProduct(getDemoProducts(), profile.recommendation_level));
      setLoading(false);
    };
    
    fetchProduct();
  }, [navigate, user]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: packSize,
      frequency,
      level: product.level
    });
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-surface px-5 py-16">
        <div className="w-full max-w-xl rounded-[32px] border border-surface-container-high bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container text-primary">
            <PackageSearch size={32} aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-on-surface">Level {recommendationLevel ?? ''} product unavailable</h1>
          <p className="mt-3 leading-relaxed text-on-surface-variant">
            No catalog product is explicitly mapped to this polishing variant yet. We have not substituted a different product because recommendation levels are not product IDs.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('/match')} className="h-12 rounded-full border border-outline-variant px-6 font-semibold text-on-surface hover:bg-surface-container-low">Back to result</button>
            <button onClick={() => navigate('/priority')} className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-white">
              Change answers
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pricing = calculateOrderPricing(product.price, quantity, frequency, 0);

  return (
    <div className="flex flex-col min-h-full bg-surface pb-44 lg:pb-14">
      <main className="w-full max-w-7xl mx-auto lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-x-12 lg:px-10 lg:pt-10">
        {/* Hero Product Card */}
        <section className="px-container mt-4 mb-8 lg:col-start-1 lg:row-start-1 lg:row-span-5 lg:self-start lg:sticky lg:top-28 lg:m-0 lg:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden relative border border-surface-container-high"
          >
            <div className="absolute top-4 left-4 z-10 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-secondary-fixed/50 backdrop-blur-sm">
              <Verified size={14} fill="currentColor" />
              Variant Level {product.recommendation_level}
            </div>
            <div className="aspect-[4/3] w-full bg-surface-container overflow-hidden lg:aspect-[5/4]">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 lg:p-8">
              <h2 className="text-2xl font-bold text-on-surface mb-1 font-display lg:text-3xl">{product.name}</h2>
              <p className="text-sm text-on-surface-variant font-sans lg:text-base lg:leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </section>

        {/* Pack Size Section */}
        <section className="px-container mb-10 lg:col-start-2 lg:row-start-1 lg:px-0 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-on-surface font-display">Pack Size</h3>
            <span className="text-sm text-on-surface-variant">Select one</span>
          </div>
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
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
        <section className="px-container mb-10 lg:col-start-2 lg:row-start-2 lg:px-0 lg:mb-8">
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
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>
              <span className="font-bold text-lg w-8 text-center text-on-surface">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-secondary-container hover:bg-primary-fixed transition-colors"
                id="increase-quantity"
                aria-label="Increase quantity"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Delivery Frequency */}
        <section className="px-container mb-10 lg:col-start-2 lg:row-start-3 lg:px-0 lg:mb-8">
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
        <section className="px-container mb-10 pb-8 lg:col-start-2 lg:row-start-4 lg:px-0 lg:mb-6 lg:pb-0">
          <label htmlFor="order-note" className="block text-xl font-bold text-on-surface mb-2 font-display">Add a Note <span className="text-sm font-normal text-on-surface-variant">(Optional)</span></label>
          <textarea 
            id="order-note"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline resize-none transition-shadow" 
            placeholder="e.g. Leave at the front door..." 
            rows={2}
          ></textarea>
        </section>

        <section className="hidden lg:flex lg:col-start-2 lg:row-start-5 items-center justify-between gap-8 rounded-3xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-on-surface-variant font-medium">Total Price</span>
            <span className="text-3xl font-bold text-on-surface">₹{pricing.total}</span>
            {pricing.subscriptionDiscount > 0 && (
              <span className="text-xs font-semibold text-secondary">You save ₹{pricing.subscriptionDiscount}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="min-w-56 bg-primary text-on-primary font-display font-semibold py-4 px-7 rounded-full shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </section>
      </main>

      {/* Sticky Bottom Bar - Offset to sit above global nav */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-surface-container shadow-[0px_-4px_16px_rgba(0,0,0,0.04)] z-40 pt-4 pb-4 px-5 lg:hidden">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">Total Price</span>
            <span className="text-2xl font-bold text-on-surface">₹{pricing.total}</span>
            {pricing.subscriptionDiscount > 0 && (
              <span className="text-xs font-semibold text-secondary">Save ₹{pricing.subscriptionDiscount}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
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
