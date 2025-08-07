'use client';
import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { CartItem } from '../types'; 

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void; 
  updateDeliveryOption: (productId: string, deliveryOptionId: string) => void; 
  clearCart: () => void; // Add this line
  cartQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// src/context/CartContext.tsx (New and Fixed)
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Effect to load cart from localStorage on initial client-side render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      setCart([]);
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to save cart to localStorage whenever it changes
  useEffect(() => {
    // We can add a check to avoid writing the initial empty array to storage
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // If cart becomes empty, remove it from storage
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // ... rest of the provider

  const addToCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productId, quantity, deliveryOptionId: '1' }];
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const updateDeliveryOption = (productId: string, deliveryOptionId: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId ? { ...item, deliveryOptionId } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]); // This will set the cart to an empty array
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const value = { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updateDeliveryOption, 
    clearCart, // Add it here
    cartQuantity 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}