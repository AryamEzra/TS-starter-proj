import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useSearch } from '../context/SearchContext';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { debouncedSearchTerm } = useSearch();

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const searchTerm = debouncedSearchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {/* Render filteredProducts instead of products */}
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && debouncedSearchTerm && (
        <div className="text-center py-10">
          No products found for "{debouncedSearchTerm}"
        </div>
      )}
    </main>
  );
}

export default HomePage;