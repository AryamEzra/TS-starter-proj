import { useState } from 'react'; 
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { getDeliveryOptionById } from '../data/deliveryOptions';
import { formatCurrency } from '../utils/money';
import { useNavigate } from 'react-router-dom';

interface PaymentSummaryProps {
  products: Product[];
}

function PaymentSummary({ products }: PaymentSummaryProps) {
  const { cart, cartQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      productPriceCents += product.priceCents * cartItem.quantity;
    }
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
    if (deliveryOption) {
      shippingPriceCents += deliveryOption.priceCents;
    }
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return; 
    setIsPlacingOrder(true); 

    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order.');
      }
      
      clearCart();
      navigate('/orders');

    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsPlacingOrder(false); 
    }
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Order Summary
      </div>
      <div className="payment-summary-row">
        <div>Items ({cartQuantity}):</div>
        <div className="payment-summary-money">${formatCurrency(productPriceCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping & handling:</div>
        <div className="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">${formatCurrency(totalCents)}</div>
      </div>

      <button 
        className="place-order-button button-primary"
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || isPlacingOrder}
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place your order'}
      </button>
    </div>
  );
}

export default PaymentSummary;