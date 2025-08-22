import type { Product } from '@/types';
import { fetchProducts } from '@/services/api';
import SearchAwareContent from './SearchAwareContent';

export default async function HomePage() {
  const allProducts: Product[] = await fetchProducts();

  // return (
  //   <div className="max-w-screen-2xl mx-auto">
  //     <SearchAwareContent products={allProducts} />
  //   </div>
  // );
  return (
    <div>
      <SearchAwareContent products={allProducts} />
    </div>
  );
}

