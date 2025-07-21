'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  mainImg: string;
  stock: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  wishlistCount: number; // <-- add this line
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) =>
    setWishlist((prev) => prev.filter((p) => p.id !== id));

  const clearWishlist = () => setWishlist([]);

  const wishlistCount = wishlist.length; // <-- add this line

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};