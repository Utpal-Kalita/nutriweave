import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBasket, BarChart2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Decide visibility based on route
  // Welcome page has its own hero layout
  const showTopBar = !['/'].includes(path);
  // Main app tabs get the bottom nav
  const showBottomNav = ['/match', '/impact', '/profile', '/cart', '/scale', '/customize'].includes(path);
  // Sub-pages get the back button
  const showBackButton = !['/match', '/impact', '/profile', '/customize'].includes(path) && path !== '/';

  const navItems = [
    { label: 'Home', icon: Home, path: '/match', id: 'home' },
    { label: 'Order', icon: ShoppingBasket, path: '/customize', id: 'order' },
    { label: 'Impact', icon: BarChart2, path: '/impact', id: 'impact' },
    { label: 'Profile', icon: User, path: '/profile', id: 'profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background max-w-md mx-auto relative shadow-2xl shadow-black/10 overflow-x-hidden border-x border-surface-container">
      {/* Top App Bar */}
      <AnimatePresence mode="wait">
        {showTopBar && (
          <motion.header
            key="topbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="sticky top-0 z-50 flex justify-between items-center w-full px-5 py-4 bg-[#F7F3EA] border-b border-[#EFE8D8]"
            id="global-top-bar"
          >
            <div className="w-10">
              {showBackButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="text-primary-container p-2 -ml-2 rounded-full hover:bg-surface-container transition-all active:scale-90"
                  aria-label="Go back"
                  id="back-button"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
            </div>
            
            <div 
              className="font-display text-lg font-extrabold text-primary tracking-tight cursor-pointer"
              onClick={() => navigate('/')}
              id="global-logo"
            >
              Nutrifibe
            </div>
            
            <div className="w-10" />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col relative ${showBottomNav ? 'pb-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.nav
            key="bottomnav"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#EFE8D8] rounded-t-[24px] shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] z-50 flex justify-around items-center px-4 pb-8 pt-3"
            id="global-bottom-nav"
          >
            {navItems.map((item) => {
              // Path matching logic
              const isActive = path === item.path || (item.path === '/match' && path === '/match');
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center transition-all duration-300 w-16 group ${
                    isActive ? 'text-primary' : 'text-neutral-400 hover:text-primary'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  <div className={`p-1.5 rounded-2xl transition-all duration-300 ${
                    isActive ? 'bg-secondary-container scale-110' : 'group-hover:bg-surface-container'
                  }`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className={isActive ? "fill-primary/20" : ""} />
                  </div>
                  <span className={`font-display text-[11px] font-medium tracking-wide mt-1 transition-all ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
