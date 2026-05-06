import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, CreditCard, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface">
        <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6 text-outline">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Your cart is empty</h2>
        <p className="text-on-surface-variant mb-8">Start your nutrition journey to see recommendations.</p>
        <button 
          onClick={() => navigate('/selection')}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-surface-container-low">
      <main className="flex-1 px-5 pt-8 pb-32">
        <h1 className="text-3xl font-bold text-on-surface mb-6 font-display">Checkout</h1>
        
        {/* Order Summary */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container-high mb-6">
          <h2 className="text-lg font-bold text-on-surface mb-4 font-display flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Order Summary
          </h2>
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden shadow-inner shrink-0">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg" alt="Rice" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-on-surface">{cart.name}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Size: {cart.size} • Qty: {cart.quantity}</p>
              <div className="flex justify-between items-end mt-2">
                <span className="text-primary font-bold">₹{cart.price * cart.quantity}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-surface-container-high flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-on-surface font-semibold">₹{cart.price * cart.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Delivery</span>
              <span className="text-secondary font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-lg pt-2 mt-2 border-t border-dashed border-surface-container-high">
              <span className="font-bold text-on-surface font-display">Total</span>
              <span className="font-bold text-primary">₹{cart.price * cart.quantity}</span>
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <button className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-high mb-4 flex items-center gap-4 text-left group transition-all hover:border-primary">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-on-surface text-sm">Shipping Address</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">24/B Green Valley, Bangalore, KA, 560001</p>
          </div>
          <ChevronRight size={20} className="text-outline group-hover:text-primary transition-colors" />
        </button>

        {/* Payment Method */}
        <button className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-high mb-4 flex items-center gap-4 text-left group transition-all hover:border-primary">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
            <CreditCard size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-on-surface text-sm">Payment Method</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Razorpay • UPI / Card</p>
          </div>
          <ChevronRight size={20} className="text-outline group-hover:text-primary transition-colors" />
        </button>

        {/* Promo */}
        <div className="bg-secondary-container/20 rounded-2xl p-4 border border-secondary/20 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
             <CheckCircle2 size={16} className="text-secondary" />
             <span className="text-xs font-bold text-secondary uppercase tracking-wider">NUTRIFLAT30 Applied</span>
          </div>
          <span className="text-xs font-bold text-secondary">-₹30.00</span>
        </div>
      </main>

      {/* Pay Button Sticky */}
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-md mx-auto z-40">
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-primary text-white font-display font-bold h-14 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          id="pay-now-button"
        >
          Place Order
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
