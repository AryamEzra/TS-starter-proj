'use client'; // Add this since we're using hooks

import { useMemo } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useSearch } from '@/context/SearchContext';
import Spinner from '@/components/Spinner';

export default function SearchAwareContent({ products }: { products: Product[] }) {
  const { activeSearchTerm } = useSearch();

  const filteredProducts = useMemo(() => {
    if (!activeSearchTerm) return products;

    const searchTerm = activeSearchTerm.toLowerCase();
    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    });
  }, [products, activeSearchTerm]);

  if (!products) {
    return <Spinner />;
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          {activeSearchTerm 
            ? `No products found for "${activeSearchTerm}"`
            : 'No products available'}
        </div>
      )}
    </div>
  );
}