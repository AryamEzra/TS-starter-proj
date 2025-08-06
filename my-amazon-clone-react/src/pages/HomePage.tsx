import { useState, useEffect, useMemo } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useSearch } from '../context/SearchContext';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeSearchTerm } = useSearch();

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    }
    loadProducts();
  }, []);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && activeSearchTerm ? (
        <div className="text-center py-10">
          No products found for "{activeSearchTerm}"
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          No products available
        </div>
      ) : null}
    </main>
  );
}

export default HomePage;