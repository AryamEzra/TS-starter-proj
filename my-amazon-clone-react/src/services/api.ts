import type {Product} from '../types';

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