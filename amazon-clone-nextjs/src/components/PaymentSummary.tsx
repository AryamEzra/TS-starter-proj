'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { getDeliveryOptionById } from '../data/deliveryOptions';
import { formatCurrency } from '../utils/money';
import { useRouter } from 'next/navigation';

interface PaymentSummaryProps {
  products: Product[];
}

function PaymentSummary({ products }: PaymentSummaryProps) {
  const { cart, cartQuantity, clearCart } = useCart();
  const router = useRouter();
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
      router.push('/orders');

    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded p-4 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="font-bold text-lg mb-3">
        Order Summary
      </div>
      <div className="grid grid-cols-2 mb-2">
        <div>Items ({cartQuantity}):</div>
        <div className="text-right">${formatCurrency(productPriceCents)}</div>
      </div>

      <div className="grid grid-cols-2 mb-2">
        <div>Shipping & handling:</div>
        <div className="text-right">${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div className="grid grid-cols-2 mb-2 pt-2 border-t border-gray-200">
        <div>Total before tax:</div>
        <div className="text-right">${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="grid grid-cols-2 mb-2">
        <div>Estimated tax (10%):</div>
        <div className="text-right">${formatCurrency(taxCents)}</div>
      </div>

      <div className="grid grid-cols-2 mb-4 pt-2 border-t border-gray-200 font-bold text-lg text-red-700">
        <div>Order total:</div>
        <div className="text-right">${formatCurrency(totalCents)}</div>
      </div>

      <button 
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 text-black font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || isPlacingOrder}
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place your order'}
      </button>
    </div>
  );
}

export default PaymentSummary;