import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, MapPin, CreditCard, CheckCircle2, ChevronRight, ArrowRight, Loader2, ShieldCheck, Smartphone, Landmark, Receipt, Wifi } from 'lucide-react';
import { addDemoOrder } from '../lib/demoStore';
import gsap from 'gsap';

type PaymentStatus = 'idle' | 'processing' | 'success';
type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [paymentStep, setPaymentStep] = useState(0);
  const [addressError, setAddressError] = useState(false);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const transactionId = useMemo(() => `NFB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, []);

  const paymentMethods = [
    { id: 'upi' as const, label: 'UPI', detail: 'Mock UPI Collect', icon: Smartphone },
    { id: 'card' as const, label: 'Card', detail: 'Test card tokenized', icon: CreditCard },
    { id: 'netbanking' as const, label: 'Netbanking', detail: 'Sandbox bank', icon: Landmark },
  ];

  const paymentSteps = [
    'Creating secure order',
    'Authorizing payment',
    'Confirming receipt',
  ];

  useEffect(() => {
    if (!gatewayRef.current || paymentStatus === 'idle') return;

    gsap.fromTo(
      gatewayRef.current.querySelectorAll('[data-pay-animate]'),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }
    );
  }, [paymentStatus, paymentStep]);

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
    setPaymentStep(0);
    
    for (let index = 0; index < paymentSteps.length; index += 1) {
      setPaymentStep(index);
      await new Promise(resolve => setTimeout(resolve, 750));
    }

    setPaymentStatus('success');
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      addDemoOrder({
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
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="relative w-28 h-28 bg-primary rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-primary/30"
        >
          <span className="absolute inset-0 rounded-full border-8 border-primary/20 animate-ping"></span>
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold text-on-surface mb-3 font-display">Order Successful!</h2>
        <p className="text-on-surface-variant mb-4 leading-relaxed">Your personalized Nutrifibe grains are being prepared for dispatch.</p>
        <div className="bg-white border border-surface-container-high rounded-2xl px-4 py-3 mb-10 w-full max-w-xs text-left shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Mock Payment ID</p>
          <p className="font-display font-bold text-on-surface">{transactionId}</p>
        </div>
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
        <div data-reveal className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Secure mock checkout</p>
          <h1 className="text-3xl font-bold text-on-surface font-display">Checkout</h1>
        </div>
        
        {/* Order Summary */}
        <section data-reveal className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container-high mb-6">
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
        <div data-reveal className={`w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm border mb-4 transition-all ${addressError ? 'border-error ring-1 ring-error' : 'border-surface-container-high focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
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
        <section data-reveal className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-high mb-4">
          <div className="flex items-center gap-4 text-left mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-on-surface text-sm">Mock Online Payment</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">UPI, card, or netbanking sandbox flow</p>
            </div>
            <ChevronRight size={20} className="text-outline" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isActive = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`min-h-[86px] rounded-2xl border p-3 text-left transition-all active:scale-[0.98] ${
                    isActive
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary/40'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-primary'} />
                  <p className="font-display font-bold text-sm mt-2">{method.label}</p>
                  <p className={`text-[10px] leading-tight mt-1 ${isActive ? 'text-white/75' : 'text-on-surface-variant'}`}>{method.detail}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Promo */}
        <div data-reveal className="bg-secondary-container/20 rounded-2xl p-4 border border-secondary/20 flex items-center justify-between mb-8">
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
            ref={gatewayRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col text-left overflow-hidden"
          >
            {paymentStatus === 'processing' ? (
              <>
                <div data-pay-animate className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Nutrifibe Pay</p>
                    <h3 className="text-xl font-bold font-display text-on-surface">Mock Gateway</h3>
                  </div>
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-4 border-surface-container rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <Wifi className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={20} />
                  </div>
                </div>
                <div data-pay-animate className="rounded-2xl bg-surface-container-low p-4 mb-4 border border-surface-container-high">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Paying via {paymentMethod.toUpperCase()}</span>
                    <span className="text-sm font-bold text-primary">₹{cart.price * cart.quantity}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((paymentStep + 1) / paymentSteps.length) * 100}%` }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
                <div data-pay-animate className="flex flex-col gap-3">
                  {paymentSteps.map((step, index) => {
                    const done = index < paymentStep;
                    const active = index === paymentStep;

                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          done ? 'bg-primary text-white' : active ? 'bg-secondary-container text-primary' : 'bg-surface-container text-outline'
                        }`}>
                          {done ? <CheckCircle2 size={16} /> : active ? <Loader2 size={16} className="animate-spin" /> : <Receipt size={15} />}
                        </div>
                        <span className={`text-sm font-semibold ${active || done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <motion.div 
                  data-pay-animate
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 text-white mx-auto"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 data-pay-animate className="text-xl font-bold font-display text-on-surface mb-2 text-center">Payment Successful</h3>
                <p data-pay-animate className="text-sm text-on-surface-variant text-center mb-4">Mock transaction authorized. Confirming order...</p>
                <div data-pay-animate className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-high">
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Transaction ID</p>
                  <p className="font-display font-bold text-on-surface">{transactionId}</p>
                </div>
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
