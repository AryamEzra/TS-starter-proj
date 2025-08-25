import { Product, Order, CartItem } from "@/types";

const API_BASE_URL = 'https://dummyjson.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    // CORRECTED: Remove /api from the endpoint
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    // DummyJSON returns { products: [...] } so we need to access data.products
    const apiProducts = data.products;
    
    // Transform DummyJSON data to match your Product type
    const productsData: Product[] = apiProducts.map((product: any) => ({
      id: product.id.toString(),
      name: product.title,
      priceCents: Math.round(product.price * 100), // Convert $ to cents
      image: product.thumbnail,
      rating: {
        stars: product.rating,
        count: product.stock || 0 // Using stock as a proxy for rating count
      },
      description: product.description
    }));
    
    // console.log(productsData);
    return productsData;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchCart(userId: string): Promise<CartItem[]> {
  try {
    // CORRECTED: DummyJSON cart endpoint format
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    // DummyJSON returns { carts: [...] } - get first cart's products
    const userCart = data.carts[0];
    
    if (!userCart) return [];
    
    return userCart.products.map((item: any) => ({
      productId: item.id.toString(),
      quantity: item.quantity,
      // You might want to store more product details here
    }));
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
}

export async function addToCart(userId: string, productId: string, quantity: number = 1): Promise<any> {
  try {
    // CORRECTED: DummyJSON add to cart endpoint
    const response = await fetch(`${API_BASE_URL}/carts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: parseInt(userId),
        products: [
          {
            id: parseInt(productId),
            quantity: quantity
          }
        ]
      })
    });
    
    return response.json();
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
}

// NOTE: DummyJSON doesn't have orders endpoints, so we'll simulate them
export async function createOrder(orderData: any): Promise<Order> {
  try {
    // Simulate order creation since DummyJSON doesn't have orders
    const simulatedOrder: Order = {
      id: Math.random().toString(36).substring(2, 15),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      // Add any other required fields from your Order type
    };
    
    return simulatedOrder;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}

export async function getOrderStatus(orderId: string): Promise<{ status: string; trackingId: string }> {
  try {
    // Simulate order status since DummyJSON doesn't have orders
    return {
      status: 'delivered', // or 'processing', 'shipped', etc.
      trackingId: `TRK${orderId.substring(0, 8).toUpperCase()}`
    };
  } catch (error) {
    console.error("Failed to fetch order status:", error);
    throw error;
  }
}