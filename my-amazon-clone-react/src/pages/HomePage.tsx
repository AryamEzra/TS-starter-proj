import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard'; // We'll create this next

function HomePage() {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // State to know when data is being loaded
  const [loading, setLoading] = useState(true);

  // useEffect runs after the component renders.
  // The empty array [] means it will only run once, like "on page load".
  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false); // Data has been loaded
    }
    loadProducts();
  }, []);

  if (loading) {
    return <div className="main">Loading products...</div>;
  }

  return (
    <main className="main">
      <div className="products-grid">
        {products.map(product => (
          // Render a ProductCard for each product in our state
          // The "key" is crucial for React to efficiently update the list
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;