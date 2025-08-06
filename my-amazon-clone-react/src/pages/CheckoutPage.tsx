import { useState, useEffect, useMemo } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import PaymentSummary from '../components/PaymentSummary';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

function CheckoutPage() {
  const { cart, cartQuantity } = useCart();
  const { activeSearchTerm } = useSearch();
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

  // Filter products that are in the cart and match search term
  const filteredCartProducts = useMemo(() => {
    const cartProductIds = cart.map(item => item.productId);
    let filtered = products.filter(product => 
      cartProductIds.includes(product.id)
    );

    if (activeSearchTerm) {
      const searchTerm = activeSearchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    }
    return filtered;
  }, [products, cart, activeSearchTerm]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="bg-white fixed top-0 left-0 right-0 h-15 flex justify-center z-40 px-4">
        <div className="w-full max-w-6xl flex items-center">
          <div className="w-40">
            <Link to="/">
              <img className="w-24 hidden sm:block" src="/images/amazon-logo.png" alt="Amazon" />
              <img className="h-9 sm:hidden" src="/images/amazon-mobile-logo.png" alt="Amazon" />
            </Link>  
          </div>

          <div className="flex-1 text-center text-xl font-medium sm:mx-4">
            Checkout (<Link className="text-blue-600 hover:text-orange-700" to="/">{cartQuantity} items</Link>)
          </div>

          <div className="w-40 flex justify-end">
            <img className="h-6" src="/images/icons/checkout-lock-icon.png" alt="Secure" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 sm:px-8 mx-auto mt-32 mb-16">
        <div className="font-bold text-xl mb-5">
          {activeSearchTerm 
            ? `Search Results in Your Cart for "${activeSearchTerm}"`
            : 'Review your order'}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
          <OrderSummary products={filteredCartProducts} />
          <PaymentSummary products={products} />
        </div>

        {filteredCartProducts.length === 0 && activeSearchTerm && (
          <div className="text-center py-10">
            No matching products found in your cart for "{activeSearchTerm}"
          </div>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;