import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, MapPin, CreditCard, CheckCircle2, Loader2, ShieldCheck, Smartphone, Landmark, Receipt, Wifi } from 'lucide-react';
import { addDemoOrder } from '../lib/demoStore';
import { calculateOrderPricing } from '../lib/pricing';
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
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const transactionId = useMemo(() => `NFB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, []);
  const pricing = useMemo(
    () => cart ? calculateOrderPricing(cart.price, cart.quantity, cart.frequency) : null,
    [cart],
  );

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
    if (!cart || !user || !pricing) return;
    
    if (address.trim().length < 10) {
      setAddressError(true);
      addressRef.current?.focus();
      return;
    }
    setAddressError(false);
    setCheckoutError(null);

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
        total_price: pricing.total,
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
      setCheckoutError('We could not complete the demo order. Please try again.');
      setPaymentStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface min-h-[calc(100vh-5rem)]">
        <div className="relative mb-6 flex h-28 w-28 items-center justify-center border-y-2 border-rule-2 bg-ink text-paper">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-on-surface mb-3 font-display">Order Successful!</h2>
        <p className="text-on-surface-variant mb-4 leading-relaxed">Your personalized Nutrifibe grains are being prepared for dispatch.</p>
        <div className="mb-10 w-full max-w-xs border-y border-rule-2 bg-paper-2 px-4 py-3 text-left">
          <p className="editorial-label">Mock payment ID</p>
          <p className="font-display font-bold text-on-surface">{transactionId}</p>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="editorial-action px-12"
        >
          View My Orders
        </button>
      </div>
    );
  }

  if (!cart || !pricing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface min-h-[calc(100vh-5rem)]">
        <div className="mb-6 flex h-24 w-24 items-center justify-center border-y border-rule-2 bg-paper-2 text-muted">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Your cart is empty</h2>
        <p className="text-on-surface-variant mb-8">Start your nutrition journey to see recommendations.</p>
        <button 
          onClick={() => navigate('/priority')}
          className="editorial-action"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-paper">
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-32 lg:pb-16 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-start lg:gap-x-10">
        <div data-reveal className="mb-8 border-b-2 border-rule-2 pb-8 lg:col-span-2">
          <h1 className="text-display-s">Checkout</h1>
          <p className="mt-3 text-ink-2">A secure mock checkout. No real payment is processed.</p>
        </div>
        
        {/* Order Summary */}
        <section data-reveal className="mb-6 border-y-2 border-rule-2 bg-paper-2 p-6 lg:col-start-2 lg:row-start-2 lg:row-span-3 lg:sticky lg:top-28 lg:mb-0 lg:p-7">
          <h2 className="text-lg font-bold text-on-surface mb-4 font-display flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Order Summary
          </h2>
          <div className="flex gap-4 mb-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-rule bg-paper-3 text-muted">
              <ShoppingBag size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-on-surface">{cart.name}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Size: {cart.size} • Qty: {cart.quantity}</p>
              <div className="flex justify-between items-end mt-2">
                 <span className="text-primary font-bold">₹{pricing.subtotal}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-surface-container-high flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-on-surface font-semibold">₹{pricing.subtotal}</span>
            </div>
            {pricing.subscriptionDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subscription saving</span>
                <span className="text-secondary font-semibold">-₹{pricing.subscriptionDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">NUTRIFLAT30</span>
              <span className="text-secondary font-semibold">-₹{pricing.promoDiscount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Demo delivery</span>
              <span className="text-secondary font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-lg pt-2 mt-2 border-t border-dashed border-surface-container-high">
              <span className="font-bold text-on-surface font-display">Total</span>
              <span className="font-bold text-primary">₹{pricing.total}</span>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading || paymentStatus !== 'idle'}
            className="editorial-action mt-6 hidden w-full lg:flex"
          >
            Pay ₹{pricing.total}
          </button>
        </section>

        {/* Shipping Address */}
        <div data-reveal className={`mb-4 w-full border-y bg-paper p-5 lg:col-start-1 lg:row-start-2 ${addressError ? 'border-error' : 'border-rule-2 focus-within:border-ink'}`}>
          <div className="flex items-center gap-4 text-left mb-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center ${addressError ? 'text-error' : 'text-ink'}`}>
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <label htmlFor="delivery-address" className={`font-bold text-sm ${addressError ? 'text-error' : 'text-on-surface'}`}>Delivery Address</label>
              <p className="text-xs text-on-surface-variant mt-0.5">Include your house number, street, and locality.</p>
            </div>
          </div>
          <textarea
            ref={addressRef}
            id="delivery-address"
            aria-invalid={addressError}
            aria-describedby={addressError ? 'delivery-address-error' : undefined}
            placeholder="Enter your complete delivery address..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (e.target.value.trim().length >= 10) setAddressError(false);
            }}
            className="min-h-24 w-full resize-y border border-muted bg-paper-2 p-3 text-base text-ink outline-2 outline-offset-[-3px] outline-transparent placeholder:text-muted focus-visible:outline-focus"
          />
          {addressError && (
            <p id="delivery-address-error" className="mt-2 text-sm font-medium text-error" role="alert">
              Enter at least 10 characters so we can deliver to the correct address.
            </p>
          )}
        </div>

        {/* Payment Method */}
        <section data-reveal aria-labelledby="payment-method-heading" className="mb-4 border-y border-rule-2 bg-paper p-5 lg:col-start-1 lg:row-start-3 lg:p-6">
          <div className="flex items-center gap-4 text-left mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-accent">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <h3 id="payment-method-heading" className="font-bold text-on-surface text-sm">Mock Online Payment</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">UPI, card, or netbanking sandbox flow</p>
            </div>
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
                  aria-pressed={isActive}
                  className={`min-h-[86px] border p-3 text-left transition-colors ${
                    isActive
                      ? 'border-ink bg-ink text-paper'
                      : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary/40'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-paper' : 'text-accent'} />
                  <p className="font-display font-bold text-sm mt-2">{method.label}</p>
                  <p className={`mt-1 text-sm leading-tight ${isActive ? 'text-paper-2' : 'text-ink-2'}`}>{method.detail}</p>
                </button>
              );
            })}
          </div>
        </section>

        {checkoutError && (
          <div className="mb-4 border-y border-error bg-error-container p-4 text-sm font-semibold text-on-error-container lg:col-start-1" role="alert">
            {checkoutError}
          </div>
        )}

        {/* Promo */}
        <div data-reveal className="mb-8 flex items-center justify-between border-y border-rule bg-paper-2 p-4 lg:col-start-1">
          <div className="flex items-center gap-2">
             <CheckCircle2 size={16} className="text-secondary" />
             <span className="text-sm font-medium text-accent">Demo promotion applied</span>
          </div>
           <span className="text-xs font-bold text-secondary">-₹{pricing.promoDiscount}</span>
        </div>
      </main>

      {/* Payment Processing Modal Overlay */}
      {paymentStatus !== 'idle' && !showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5">
          <motion.div 
            ref={gatewayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex w-full max-w-sm flex-col overflow-hidden border-y-2 border-rule-2 bg-paper p-6 text-left"
          >
            {paymentStatus === 'processing' ? (
              <>
                <div data-pay-animate className="flex items-center justify-between mb-6">
                  <div>
                    <h3 id="payment-dialog-title" className="text-xl font-bold font-display text-on-surface">Mock Gateway</h3>
                  </div>
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-4 border-surface-container rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <Wifi className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={20} />
                  </div>
                </div>
                <div data-pay-animate className="mb-4 border-y border-rule bg-paper-2 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-ink-2">Paying via {paymentMethod}</span>
                    <span className="text-sm font-bold text-primary">₹{pricing.total}</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-paper-3">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: (paymentStep + 1) / paymentSteps.length }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="h-full origin-left bg-ink"
                    />
                  </div>
                </div>
                <div data-pay-animate className="flex flex-col gap-3" aria-live="polite">
                  {paymentSteps.map((step, index) => {
                    const done = index < paymentStep;
                    const active = index === paymentStep;

                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center ${
                          done ? 'bg-ink text-paper' : active ? 'bg-paper-2 text-ink' : 'bg-paper-3 text-muted'
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
                <div data-pay-animate className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-ink text-paper">
                  <CheckCircle2 size={40} />
                </div>
                <h3 id="payment-dialog-title" data-pay-animate className="text-xl font-bold font-display text-on-surface mb-2 text-center">Payment Successful</h3>
                <p data-pay-animate className="text-sm text-on-surface-variant text-center mb-4">Mock transaction authorized. Confirming order…</p>
                <div data-pay-animate className="border-y border-rule bg-paper-2 p-4">
                  <p className="editorial-label">Transaction ID</p>
                  <p className="font-display font-bold text-on-surface">{transactionId}</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Pay Button Sticky */}
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-md mx-auto z-40 lg:hidden">
        <button 
          onClick={handlePlaceOrder}
          disabled={loading || paymentStatus !== 'idle'}
          className="editorial-action w-full"
          id="pay-now-button"
        >
          Pay ₹{pricing.total}
        </button>
      </div>
    </div>
  );
}
