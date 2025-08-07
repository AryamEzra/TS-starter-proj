'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartProps {
  productId: string;
}

export default function AddToCart({ productId }: AddToCartProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);

  const handleAddToCartClick = () => {
    addToCart(productId, quantity);
    setAddedMessageVisible(true);
    setTimeout(() => {
      setAddedMessageVisible(false);
    }, 2000);
  };

  return (
    <>
      <div className="mb-4">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-1 bg-gray-100 border border-gray-200 rounded text-sm focus:outline-yellow-400"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="flex-1"></div>

      <div className={`flex items-center text-green-700 text-base mb-2 transition-opacity duration-200 ${addedMessageVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img className="w-5 mr-1" src="/images/icons/checkmark.png" alt="Checkmark" />
        Added
      </div>

      <button
        className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-full text-sm font-medium shadow-sm transition-colors"
        onClick={handleAddToCartClick}
      >
        Add to Cart
      </button>
    </>
  );
}