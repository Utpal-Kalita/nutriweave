import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { ArrowLeft, BarChart2, Home, ShoppingBasket, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const path = location.pathname;

  const showTopBar = path !== '/';
  const showBottomNav = ['/match', '/impact', '/profile', '/cart', '/scale', '/customize'].includes(path);
  const showBackButton = !['/match', '/impact', '/profile', '/customize'].includes(path) && path !== '/';

  const navItems = [
    { label: 'My match', icon: Home, path: '/match', id: 'match' },
    { label: 'Order', icon: ShoppingBasket, path: '/customize', id: 'order' },
    { label: 'Evidence', icon: BarChart2, path: '/impact', id: 'impact' },
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
    <div className="relative flex min-h-screen flex-col bg-paper text-ink">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[500] bg-ink px-5 py-3 font-bold text-paper focus:not-sr-only">
        Skip to content
      </a>

      {showTopBar && (
        <header className="sticky top-0 z-[300] bg-ink text-paper" id="global-top-bar">
          <div className="container flex h-16 items-center lg:h-20">
            <div className="flex min-w-11 flex-1 items-center gap-3 lg:flex-none">
              {showBackButton && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-11 w-11 items-center justify-center rounded-pill text-paper hover:bg-leaf"
                  aria-label="Go back"
                  id="back-button"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <button
                type="button"
                className="hidden font-display text-2xl font-extrabold text-paper lg:block"
                onClick={() => navigate('/')}
                aria-label="Nutrifibe home"
                id="global-logo-desktop"
              >
                Nutrifibe
              </button>
            </div>

            <button
              type="button"
              className="font-display text-xl font-extrabold text-paper lg:hidden"
              onClick={() => navigate('/')}
              aria-label="Nutrifibe home"
              id="global-logo"
            >
              Nutrifibe
            </button>

            <nav className="ml-auto hidden h-full items-center lg:flex" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = activePath === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex h-full items-center gap-2 border-b-2 px-4 text-sm font-medium ${
                      isActive ? 'border-harvest text-harvest' : 'border-transparent text-paper-2 hover:border-paper hover:text-paper'
                    }`}
                  >
                    <span className="relative">
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      {item.id === 'cart' && cart && (
                        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-pill bg-harvest px-1 font-outlier text-xs text-ink">
                          {cart.quantity}
                        </span>
                      )}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="min-w-11 flex-1 lg:hidden" />
          </div>
        </header>
      )}

      <main id="main-content" className={`relative flex flex-1 flex-col ${showBottomNav ? 'pb-24 lg:pb-0' : ''}`}>
        <Outlet />
      </main>

      {showBottomNav && (
        <nav className="fixed inset-x-0 bottom-0 z-[300] mx-auto flex max-w-md items-stretch border-t border-rule-2 bg-paper pb-4 lg:hidden" id="global-bottom-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-1 border-t-2 text-sm ${
                  isActive ? 'border-leaf text-leaf' : 'border-transparent text-muted'
                }`}
                id={`nav-item-${item.id}`}
              >
                <span className="relative">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  {item.id === 'cart' && cart && (
                    <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-pill bg-harvest px-1 font-outlier text-xs text-ink">
                      {cart.quantity}
                    </span>
                  )}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
