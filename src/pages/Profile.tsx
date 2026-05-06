import React from 'react';
import { User, Sliders, ChevronRight, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

const avatarImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC1jP0cW1YMNjiBTHcML_eyhiht1z7-2t-9oS4kMDogRMdIbGMu0-sQKSDu2qsIIwCy1AcWUgMZ9z4G0CwZGH86QeVKgS-c_wc9XSqzn-2WfMdJZyZCjBPaWYVGN7zEaGJ6IJ-r4yV13z2U_f20-WMLAElhUA1IZxXyMD917vjtRdiPLC4AULh8I8Pw5Pvxs75CnCR8IYKRsFXVe72r6-I5io43u-vPh5i5daFcxkJxMjaciQJIWCEEApeM3r40vQtG7_cY5eHkmU0";
const orderImg1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kyYJT2bOKQFF1TMdw1ej9zs4wGU6L5v0sxGKh-wiZJCurIYIEhH01rANro4r3M_8HTXWdOF8ALo7hbHkGuIeZ0b265OgrEKdn4SatViWQb6Gxol0NSImCpbNyyRjeZ7ZAX86-ImHkNQ0u-6J7c94zvhgOPi8Lt03N-5USackmk5nZPqWR0rBIsjFPPckrXKM_s3HfBbv9kzaTJrxbo4rzflD0BLyS7ZtFqnd6wfUfvY6aMDtKb606rHir16ZTVhyzve-sHfPp5Q";
const orderImg2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCx6217hlEVZNRIb6opTSWX794tgU4_Dh9k1OLwq570slHfwc3lKKsRizbF_SKo5X5klZ3Xe9x__V7wvl42cPpVohriN-NernAfcLATs4vEXIYBBhJZmjwQynFJiW_bZFDuJLoik3tZ8AXq5_BZw4hD_kTB-rcqCubk-vxMOghbvmnMkF5YNqcBBwB2fhjJHPn2FFEhosYqegvyu8s2QjlYSUpp3uW4d2-wohU1SS1JGpNYkssuX_xTVeajGGQwfvLYQdOO-cF89h0";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-full bg-surface-container-low px-5 pt-8 pb-32">
      {/* Hero Greeting */}
      <section className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-on-surface font-display">Hello, Arjun</h1>
          <p className="text-base text-on-surface-variant mt-1">Welcome back to your nutrition hub.</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-md">
          <img src={avatarImage} alt="Arjun" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="flex flex-col gap-5">
        {/* Account Details Card */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-4 border border-surface-container-high">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface font-display">Account Details</h3>
              <p className="text-sm text-on-surface-variant">arjun.s@example.com</p>
            </div>
          </div>
          <div className="mt-2 border-t border-surface-container-high pt-4 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-0.5">Status</span>
              <p className="text-base text-primary font-bold">NutriPlus Member</p>
            </div>
            <button className="text-sm font-bold text-primary hover:opacity-80 active:scale-95 transition-all">Edit</button>
          </div>
        </motion.div>

        {/* Preferences Card */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 border border-surface-container-high">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shadow-sm">
              <Sliders size={20} />
            </div>
            <h3 className="text-xl font-bold text-on-surface font-display">Dietary Preferences</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Vegan', 'Gluten-Free', 'Low Sodium'].map(tag => (
              <span key={tag} className="bg-surface-container text-on-surface px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 border-t border-surface-container-high pt-4">
            <button className="w-full flex justify-between items-center text-on-surface-variant hover:text-primary transition-colors group">
              <span className="text-sm font-semibold">Manage all settings</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-6 border border-surface-container-high">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold text-on-surface font-display">Recent Orders</h2>
            <button className="text-sm font-bold text-primary hover:underline">View All</button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Order Item 1 */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-surface-container-high hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
                  <img src={orderImg1} alt="Veggie Box" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Farm Fresh Veggie Box</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Delivered • Oct 24</p>
                </div>
              </div>
              <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-container active:scale-90 transition-all shadow-md shadow-primary/10">
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Order Item 2 */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-surface-container-high hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
                  <img src={orderImg2} alt="Juice Pack" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Detox Juice Trio</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Delivered • Oct 18</p>
                </div>
              </div>
              <button className="border-2 border-primary text-primary p-3 rounded-full hover:bg-secondary-container active:scale-90 transition-all">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
