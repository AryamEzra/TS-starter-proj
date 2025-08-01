import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import PaymentSummary from '../components/PaymentSummary';

import '../styles/pages/checkout/checkout.css';
import '../styles/pages/checkout/checkout-header.css';

function CheckoutPage() {
  const { cartQuantity } = useCart();
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
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="amazon.html">
              <img className="amazon-logo" src="/images/amazon-logo.png" />
              <img className="amazon-mobile-logo" src="/images/amazon-mobile-logo.png" />
            </a>  
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="amazon.html">{cartQuantity} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary products={products} />
          <PaymentSummary products={products} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;