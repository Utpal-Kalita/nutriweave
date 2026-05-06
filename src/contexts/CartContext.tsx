import React, { createContext, useContext, useState } from 'react';

interface CartItem {
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem | null>(null);

  const addToCart = (item: CartItem) => {
    setCart(item);
  };

  const clearCart = () => {
    setCart(null);
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
