import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sliders, ChevronRight, RotateCcw, LogOut, Package, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { DemoOrder, DemoProfile, getDemoOrdersForUser, getDemoProducts, getDemoProfile } from '../lib/demoStore';

export default function Profile() {
  const { user, signOut } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchOrders = () => {
      setOrders(getDemoOrdersForUser(user.id));
      setProfile(getDemoProfile(user.id));
      setLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleReorder = (order: DemoOrder) => {
    const product = getDemoProducts().find((item) => item.id === order.product_id);

    addToCart({
      id: order.product_id,
      name: order.product_name,
      price: product?.price || Math.ceil(order.total_price / Math.max(1, order.quantity)),
      quantity: order.quantity,
      size: order.size,
      frequency: order.frequency,
      level: product?.level || 5,
    });
    navigate('/cart');
  };

  if (!user) return null;

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'Friend';

  return (
    <div className="flex flex-col min-h-full bg-surface px-5 sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-32 lg:pb-16 w-full max-w-7xl mx-auto">
      {/* Hero Greeting */}
      <section className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-on-surface lg:text-5xl">Hello, {firstName}</h1>
          <p className="text-sm text-on-surface-variant mt-1 lg:text-base">Welcome back to your nutrition hub.</p>
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-rule bg-paper-2 font-display text-2xl font-bold lg:h-20 lg:w-20">
          {firstName.slice(0, 1).toUpperCase()}
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="flex flex-col border-t-2 border-rule-2">
        {/* Profile Overview Card */}
        <div className="grid gap-6 border-b border-rule bg-paper-2 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-ink">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-display text-lg font-semibold text-on-surface">Account Details</h3>
              <p className="text-sm text-on-surface-variant truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-rule pt-3 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div>
              <span className="editorial-label">Status</span>
              <p className="text-base text-ink font-semibold">Demo member</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-semibold text-error hover:underline">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="grid gap-6 border-b border-rule bg-paper p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:p-7">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-accent">
                <Sliders size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Rice Recommendation</h3>
            </div>
            {profile?.recommendation_level ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="border-y border-rule px-3 py-1 text-sm font-medium text-ink">Provisional Level {profile.recommendation_level}</span>
                <button onClick={() => navigate('/match')} className="text-sm font-semibold text-primary hover:underline">View result</button>
              </div>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Complete the five-question rice preference questionnaire to see a provisional match.</p>
            )}
          </div>
          <div className="border-t border-rule pt-3 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <button onClick={() => navigate('/priority')} className="w-full flex justify-between items-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="text-sm font-medium">{profile?.recommendation_level ? 'Change questionnaire answers' : 'Start questionnaire'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Recent Orders List (Full Width) */}
        <div className="flex flex-col gap-4 border-b-2 border-rule-2 bg-paper p-5 lg:p-7">
          <div className="flex justify-between items-end">
            <h2 className="font-display text-xl font-bold text-on-surface">Recent Orders</h2>
            <span className="text-sm text-on-surface-variant font-medium">{orders.length} total</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={order.id} className="flex items-center justify-between border-b border-rule p-3 last:border-b-0 hover:bg-paper-2">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-rule bg-paper-2 text-muted">
                      <Package size={24} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-on-surface truncate">{order.product_name}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {order.status === 'completed' ? 'Delivered' : 'Pending'}, {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleReorder(order)} className={`hidden items-center gap-1.5 border-y px-4 py-2 text-sm font-semibold sm:flex ${index === 0 ? 'border-ink bg-ink text-paper hover:bg-ink-2' : 'border-rule-2 bg-paper text-ink hover:bg-paper-2'}`}>
                    <RotateCcw size={16} />
                    <span>Reorder</span>
                  </button>
                  <button onClick={() => handleReorder(order)} aria-label={`Reorder ${order.product_name}`} className="p-2 text-ink hover:bg-paper-2 sm:hidden">
                    <RotateCcw size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="border-y border-dashed border-rule p-8 text-center">
                <Package className="mx-auto text-surface-variant mb-2" size={32} />
                <p className="text-sm text-on-surface-variant font-medium">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
