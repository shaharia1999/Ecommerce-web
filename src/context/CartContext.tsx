'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  title: string;
  selectedSize?:string;
  price: number;
  mainImg: string;
  quantity: number;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

const addToCart = (item: CartItem) => {
  setCart((prev) => {
    const found = prev.find((p) => p.id === item.id);
    if (found) {
      if (found.quantity >= found.stock) return prev; // Prevent over-adding
      return prev.map((p) =>
        p.id === item.id
          ? { ...p, quantity: Math.min(p.quantity + item.quantity, p.stock) }
          : p
      );
    }
    return [...prev, { ...item }];
  });
  setOpen(true);
};


  const removeFromCart = (id: string) => setCart((prev) => prev.filter((p) => p.id !== id));
  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, Math.min(quantity, p.stock)) } : p
      )
    );
  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};