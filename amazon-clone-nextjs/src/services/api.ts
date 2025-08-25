import { Product, Order } from "@/types";
import dayjs from "dayjs";

import { fetcher } from '@/lib/fetch-wrapper';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetcher('/api/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const productsData: Product[] = await response.json();
    return productsData;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const response = await fetcher('/api/orders');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: Order[] = await response.json();
    return data; // API already sorted it, just return the data
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}