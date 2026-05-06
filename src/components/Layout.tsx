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
  const showTopBar = !['/'].includes(path);
  const showBottomNav = ['/match', '/impact', '/profile', '/order-success'].includes(path);
  const showBackButton = !['/match', '/impact', '/profile', '/'].includes(path);

  const navItems = [
    { label: 'Home', icon: Home, path: '/match', id: 'home' },
    { label: 'Order', icon: ShoppingBasket, path: '/order', id: 'order' },
    { label: 'Impact', icon: BarChart2, path: '/impact', id: 'impact' },
    { label: 'Profile', icon: ProfileRedirect, path: '/profile', id: 'profile' },
  ];

  function ProfileRedirect() {
    return <User className="w-6 h-6" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background max-w-md mx-auto relative shadow-xl overflow-x-hidden">
      {/* Top App Bar */}
      <AnimatePresence>
        {showTopBar && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="sticky top-0 z-50 flex justify-between items-center w-full px-5 py-4 bg-[#F7F3EA] border-b border-[#EFE8D8]"
            id="global-top-bar"
          >
            {showBackButton ? (
              <button
                onClick={() => navigate(-1)}
                className="text-primary-container p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors active:scale-95"
                aria-label="Go back"
                id="back-button"
              >
                <ArrowLeft size={24} />
              </button>
            ) : (
              <div className="w-10" />
            )}
            
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

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${showBottomNav ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Bottom Nav Bar */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface-container-lowest border-t border-[#EFE8D8] rounded-t-[24px] shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] z-50 flex justify-around items-center px-4 pb-8 pt-3"
            id="global-bottom-nav"
          >
            {navItems.map((item) => {
              const isActive = path === item.path || (item.path === '/match' && path === '/match'); // Simplification for home
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center transition-all duration-200 w-16 group ${
                    isActive ? 'text-primary' : 'text-outline hover:text-primary'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  <div className={`p-1.5 rounded-2xl transition-colors ${isActive ? 'bg-secondary-container' : 'group-hover:bg-surface-container'}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="font-display text-[11px] font-medium tracking-wide mt-1">
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
