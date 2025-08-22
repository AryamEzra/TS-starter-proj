import { fetchProducts } from '@/services/api';
import CheckoutClient from './CheckoutClientPage';

export default async function CheckoutPage() {
  const allProducts = await fetchProducts();

  return <CheckoutClient products={allProducts} />;
}