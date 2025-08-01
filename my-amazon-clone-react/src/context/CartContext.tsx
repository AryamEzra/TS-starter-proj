import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { CartItem } from '../types'; // Import our type definition
 // Import our type definition

// 1. Define the shape of the context data and functions
interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  cartQuantity: number;
}

// 2. Create the context with an initial undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Create the "Provider" component. This component will wrap our app and provide the cart data.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render, so it persists.
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever the cart state changes.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // If new, add it to the cart array
      return [...prevCart, { productId, quantity, deliveryOptionId: '1' }];
    });
  };
  
  // You would add removeFromCart and updateQuantity functions here similarly...
  const removeFromCart = (productId: string) => {}; // Placeholder
  const updateQuantity = (productId: string, newQuantity: number) => {}; // Placeholder

  // Calculate the total number of items in the cart
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // The value that will be available to all children components
  const value = { cart, addToCart, removeFromCart, updateQuantity, cartQuantity };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. Create a custom "hook". This is a shortcut for components to easily access the cart context.
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}