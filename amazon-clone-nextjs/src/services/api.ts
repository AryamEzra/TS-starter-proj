import { Product, Order, CartItem } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`); // Added /api
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const productsData: Product[] = await response.json();
      console.log(productsData)
    return productsData;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchCart(userId: string): Promise<CartItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`); // Changed endpoint
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: CartItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
}

export async function addToCart(userId: string, productId: string, quantity: number = 1): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity })
    });
    return response.json();
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
}

export async function createOrder(orderData: any): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, { // Changed to /api/orders
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`Order creation failed: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}

export async function getOrderStatus(orderId: string): Promise<{ status: string; trackingId: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch order status:", error);
    throw error;
  }
}