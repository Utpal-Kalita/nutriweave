import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, MapPin, CreditCard, CheckCircle2, ChevronRight, ArrowRight, Loader2 } from 'lucide-react';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [addressError, setAddressError] = useState(false);

  const handlePlaceOrder = async () => {
    if (!cart || !user) return;
    
    if (address.trim().length < 3) {
      setAddressError(true);
      alert("Please enter a valid delivery address before proceeding.");
      return;
    }
    setAddressError(false);

    setLoading(true);
    setPaymentStatus('processing');
    
    // Mock payment online delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    setPaymentStatus('success');
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        product_id: cart.id,
        product_name: cart.name,
        total_price: cart.price * cart.quantity,
        quantity: cart.quantity,
        size: cart.size,
        frequency: cart.frequency,
        status: 'completed',
        created_at: new Date().toISOString()
      });

      if (error) throw error;
      
      setShowSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
      setPaymentStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-primary/30"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold text-on-surface mb-3 font-display">Order Successful!</h2>
        <p className="text-on-surface-variant mb-10 leading-relaxed">Your personalized Nutrifibe grains are being prepared for dispatch.</p>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-primary text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          View My Orders
        </button>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface">
        <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6 text-outline">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Your cart is empty</h2>
        <p className="text-on-surface-variant mb-8">Start your nutrition journey to see recommendations.</p>
        <button 
          onClick={() => navigate('/priority')}
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
        <div className={`w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm border mb-4 transition-all ${addressError ? 'border-error ring-1 ring-error' : 'border-surface-container-high focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
          <div className="flex items-center gap-4 text-left mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${addressError ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-sm ${addressError ? 'text-error' : 'text-on-surface'}`}>Delivery Address</h3>
              {addressError && <p className="text-xs text-error mt-0.5">Please provide a complete address.</p>}
            </div>
          </div>
          <textarea
            placeholder="Enter your complete delivery address..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (e.target.value.trim().length >= 10) setAddressError(false);
            }}
            className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 text-sm p-3 rounded-xl border-none outline-none resize-none min-h-[80px]"
          />
        </div>

        {/* Payment Method */}
        <button className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-high mb-4 flex items-center gap-4 text-left group transition-all hover:border-primary">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
            <CreditCard size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-on-surface text-sm">Online Payment</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">UPI, Cards, Netbanking securely via Razorpay</p>
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

      {/* Payment Processing Modal Overlay */}
      {paymentStatus !== 'idle' && !showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
          >
            {paymentStatus === 'processing' ? (
              <>
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-surface-container rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <CreditCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Processing Payment</h3>
                <p className="text-sm text-on-surface-variant">Connecting securely to payment gateway. Please don't close this window.</p>
              </>
            ) : (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 text-white"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Payment Successful!</h3>
                <p className="text-sm text-on-surface-variant">Your order is being confirmed...</p>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Pay Button Sticky */}
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-md mx-auto z-40">
        <button 
          onClick={handlePlaceOrder}
          disabled={loading || paymentStatus !== 'idle'}
          className="w-full bg-primary text-white font-display font-bold h-14 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
          id="pay-now-button"
        >
          Proceed to Pay
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
