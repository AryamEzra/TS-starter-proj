import dayjs from 'dayjs';
import type {Order, Product} from '../types';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // We tell TypeScript that the JSON data will match our Product[] type
    const productsData: Product[] = await response.json();
    return productsData;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const response = await fetch('https://supersimplebackend.dev/orders');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: Order[] = await response.json();
    return data.sort((a, b) => dayjs(b.orderTime).unix() - dayjs(a.orderTime).unix());
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}