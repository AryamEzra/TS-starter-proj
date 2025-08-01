import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }


  return (
    <main className="main">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;