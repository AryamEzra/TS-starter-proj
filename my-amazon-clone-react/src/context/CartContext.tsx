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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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