import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sliders, ChevronRight, RotateCcw, LogOut, Package, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { DemoOrder, getDemoOrdersForUser } from '../lib/demoStore';

const avatarImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC1jP0cW1YMNjiBTHcML_eyhiht1z7-2t-9oS4kMDogRMdIbGMu0-sQKSDu2qsIIwCy1AcWUgMZ9z4G0CwZGH86QeVKgS-c_wc9XSqzn-2WfMdJZyZCjBPaWYVGN7zEaGJ6IJ-r4yV13z2U_f20-WMLAElhUA1IZxXyMD917vjtRdiPLC4AULh8I8Pw5Pvxs75CnCR8IYKRsFXVe72r6-I5io43u-vPh5i5daFcxkJxMjaciQJIWCEEApeM3r40vQtG7_cY5eHkmU0";
const riceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchOrders = () => {
      setOrders(getDemoOrdersForUser(user.id));
      setLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
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
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container shadow-sm shrink-0 lg:w-20 lg:h-20">
          <img src={avatarImage} alt="Profile picture" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Overview Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-surface-container-lowest rounded-[20px] p-4 lg:p-6 shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-3 border border-surface-container-high/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-display text-lg font-semibold text-on-surface">Account Details</h3>
              <p className="text-sm text-on-surface-variant truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-2 border-t border-surface-variant pt-3 flex justify-between items-center">
            <div>
              <span className="text-xs tracking-wider font-bold text-on-surface-variant uppercase">Status</span>
              <p className="text-base text-primary font-semibold">NutriPlus Member</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-semibold text-error hover:text-error-container active:scale-95 transition-all">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Preferences Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-surface-container-lowest rounded-[20px] p-4 lg:p-6 shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-3 border border-surface-container-high/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <Sliders size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-on-surface">Dietary Preferences</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="bg-secondary-container/30 text-on-surface px-3 py-1 rounded-full text-xs font-bold">Vegan</span>
            <span className="bg-secondary-container/30 text-on-surface px-3 py-1 rounded-full text-xs font-bold">Gluten-Free</span>
            <span className="bg-secondary-container/30 text-on-surface px-3 py-1 rounded-full text-xs font-bold">Low Sodium</span>
          </div>
          <div className="mt-auto border-t border-surface-variant pt-3">
            <button className="w-full flex justify-between items-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="text-sm font-medium">Manage all settings</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Recent Orders List (Full Width) */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-[20px] p-5 lg:p-7 shadow-[0px_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-4 border border-surface-container-high/50">
          <div className="flex justify-between items-end">
            <h2 className="font-display text-xl font-bold text-on-surface">Recent Orders</h2>
            <button className="text-sm text-primary font-semibold hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border border-surface-variant hover:border-primary-container transition-colors">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <img src={riceImg} alt={order.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-on-surface truncate">{order.product_name}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {order.status === 'completed' ? 'Delivered' : 'Pending'} • {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <button className={`hidden sm:flex text-sm px-4 py-2 rounded-full font-semibold active:scale-95 transition-all flex items-center gap-1.5 shadow-sm ${index === 0 ? 'bg-primary text-white hover:bg-primary-container' : 'bg-surface text-primary border border-primary hover:bg-secondary-container'}`}>
                    <RotateCcw size={16} />
                    <span>Reorder</span>
                  </button>
                  <button className="sm:hidden text-primary p-2 hover:bg-surface-container rounded-full transition-colors">
                    <RotateCcw size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center p-8 border border-dashed border-surface-variant rounded-xl">
                <Package className="mx-auto text-surface-variant mb-2" size={32} />
                <p className="text-sm text-on-surface-variant font-medium">No orders yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
