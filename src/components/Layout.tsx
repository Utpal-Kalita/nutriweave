import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBasket, ShoppingCart, BarChart2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { useCart } from '../contexts/CartContext';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const path = location.pathname;
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealItems = pageRef.current.querySelectorAll('[data-reveal]');
    if (revealItems.length === 0) return;

    gsap.fromTo(
      revealItems,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.06 }
    );
  }, [path]);

  // Decide visibility based on route
  // Welcome page has its own hero layout
  const showTopBar = !['/'].includes(path);
  // Main app tabs get the bottom nav
  const showBottomNav = ['/match', '/impact', '/profile', '/cart', '/scale', '/customize'].includes(path);
  // Sub-pages get the back button
  const showBackButton = !['/match', '/impact', '/profile', '/customize'].includes(path) && path !== '/';

  const navItems = [
    { label: 'My Match', icon: Home, path: '/match', id: 'match' },
    { label: 'Order', icon: ShoppingBasket, path: '/customize', id: 'order' },
    { label: 'Impact', icon: BarChart2, path: '/impact', id: 'impact' },
    { label: 'Profile', icon: User, path: '/profile', id: 'profile' },
    { label: 'Cart', icon: ShoppingCart, path: '/cart', id: 'cart' },
  ];
  const activePath = path === '/scale' ? '/match' : path === '/order-success' ? '/profile' : path;
  const backFallbacks: Record<string, string> = {
    '/auth': '/',
    '/how-it-works': '/',
    '/priority': '/',
    '/scale': '/match',
    '/cart': '/customize',
    '/order-success': '/profile',
  };

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
      return;
    }

    navigate(backFallbacks[path] || '/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-primary px-5 py-3 font-bold text-white focus:not-sr-only"
      >
        Skip to content
      </a>
      {/* Top App Bar */}
      <AnimatePresence mode="wait">
        {showTopBar && (
          <motion.header
            key="topbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="sticky top-0 z-50 w-full bg-[#F7F3EA]/95 border-b border-[#EFE8D8] backdrop-blur-xl"
            id="global-top-bar"
          >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8 lg:h-20 lg:px-10">
              <div className="flex min-w-10 flex-1 items-center gap-3 lg:flex-none">
                {showBackButton && (
                  <button
                    onClick={handleBack}
                    className="text-primary-container p-2 -ml-2 rounded-full hover:bg-surface-container transition-all active:scale-90"
                    aria-label="Go back"
                    id="back-button"
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <button
                  className="hidden font-display text-xl font-extrabold text-primary tracking-tight cursor-pointer lg:block"
                  onClick={() => navigate('/')}
                  id="global-logo-desktop"
                >
                  Nutrifibe
                </button>
              </div>

              <button
                className="font-display text-lg font-extrabold text-primary tracking-tight cursor-pointer lg:hidden"
                onClick={() => navigate('/')}
                id="global-logo"
              >
                Nutrifibe
              </button>

              <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
                {navItems.map((item) => {
                  const isActive = activePath === item.path;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(item.path)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                      }`}
                    >
                      <span className="relative">
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        {item.id === 'cart' && cart && (
                          <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tertiary px-1 text-[10px] font-bold text-white">
                            {cart.quantity}
                          </span>
                        )}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="min-w-10 flex-1 lg:hidden" />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main id="main-content" className={`flex-1 flex flex-col relative ${showBottomNav ? 'pb-24 lg:pb-0' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            ref={pageRef}
            key={path}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
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
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#EFE8D8] rounded-t-[24px] shadow-[0px_-6px_20px_rgba(0,0,0,0.04)] z-50 flex justify-around items-center px-2 pb-8 pt-3 lg:hidden"
            id="global-bottom-nav"
          >
            {navItems.map((item) => {
              // Path matching logic
              const isActive = activePath === item.path;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center transition-all duration-300 w-14 group ${
                    isActive ? 'text-primary' : 'text-neutral-400 hover:text-primary'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  <div className={`p-1.5 rounded-2xl transition-all duration-300 ${
                    isActive ? 'bg-secondary-container scale-110' : 'group-hover:bg-surface-container'
                  }`}>
                    <span className="relative block">
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className={isActive ? "fill-primary/20" : ""} />
                      {item.id === 'cart' && cart && (
                        <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-tertiary px-1 text-[10px] font-bold text-white">
                          {cart.quantity}
                        </span>
                      )}
                    </span>
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
