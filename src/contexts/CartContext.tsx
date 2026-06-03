import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  frequency: string;
  level: number;
}

interface CartContextType {
  cart: CartItem | null;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_KEY = 'nutriweave:demo-cart';

function readSavedCart() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem) : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem | null>(() => readSavedCart());

  const addToCart = (item: CartItem) => {
    setCart(item);
    window.localStorage.setItem(CART_KEY, JSON.stringify(item));
  };

  const clearCart = () => {
    setCart(null);
    window.localStorage.removeItem(CART_KEY);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
