import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sliders, ChevronRight, RotateCcw, LogOut, Package, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const avatarImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC1jP0cW1YMNjiBTHcML_eyhiht1z7-2t-9oS4kMDogRMdIbGMu0-sQKSDu2qsIIwCy1AcWUgMZ9z4G0CwZGH86QeVKgS-c_wc9XSqzn-2WfMdJZyZCjBPaWYVGN7zEaGJ6IJ-r4yV13z2U_f20-WMLAElhUA1IZxXyMD917vjtRdiPLC4AULh8I8Pw5Pvxs75CnCR8IYKRsFXVe72r6-I5io43u-vPh5i5daFcxkJxMjaciQJIWCEEApeM3r40vQtG7_cY5eHkmU0";
const riceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg";

interface Order {
  id: string;
  product_name: string;
  total_price: number;
  quantity: number;
  status: string;
  created_at: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-low px-5 pt-8 pb-32">
      {/* Hero Greeting */}
      <section className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-on-surface font-display tracking-tight">
            Hello, {user.user_metadata?.full_name || 'Friend'}
          </h1>
          <p className="text-base text-on-surface-variant mt-1">Welcome back to your nutrition hub.</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-lg ring-4 ring-primary/10">
          <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="flex flex-col gap-5">
        {/* Account Details Card */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-3xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4 border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface font-display">Account</h3>
                <p className="text-sm text-on-surface-variant truncate max-w-[180px]">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-error-container/10 text-error flex items-center justify-center border border-error/10 hover:bg-error-container hover:text-white transition-all active:scale-95"
            >
              <LogOut size={18} />
            </button>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div 
           initial={{ y: 20, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ delay: 0.1 }} 
           className="bg-white rounded-3xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-6 border border-surface-container-high"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-on-surface font-display">Orders</h2>
            <div className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {orders.length} Total
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-outline gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm">Fetching your history...</p>
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl border border-surface-container-high hover:border-primary/20 transition-all bg-surface/50 group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-surface-container-high shadow-inner">
                      <img src={riceImg} alt={order.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{order.product_name}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {new Date(order.created_at).toLocaleDateString()} • ₹{order.total_price}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-emerald-100">
                        <div className="w-1 h-1 rounded-full bg-emerald-700"></div>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-container active:scale-90 transition-all shadow-md shadow-primary/20">
                    <RotateCcw size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-outline gap-4 border-2 border-dashed border-surface-container-high rounded-3xl">
                <Package size={48} className="opacity-20" />
                <div className="text-center">
                  <p className="font-bold text-on-surface">No orders yet</p>
                  <p className="text-xs mt-1">Your nutrition journey begins with your first order.</p>
                </div>
                <button 
                  onClick={() => navigate('/priority')}
                  className="mt-2 text-sm font-bold text-primary hover:underline"
                >
                  Find My Match
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
