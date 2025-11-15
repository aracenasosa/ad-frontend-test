'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '@/utils/endpoint';
import { CART_STORAGE_KEY, CART_UPDATED_EVENT } from '@/config/constants';

interface CartItem extends Game {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    }
  }, [cartItems, isMounted]);

  const addToCart = (game: Game) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === game.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (gameId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== gameId));
  };

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
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

