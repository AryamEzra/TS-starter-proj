import { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/money';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart(); 
  const [quantity, setQuantity] = useState(1);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);

  const handleAddToCartClick = () => {
    addToCart(product.id, quantity);
    setAddedMessageVisible(true);
    setTimeout(() => {
      setAddedMessageVisible(false);
    }, 2000);
  };

  const getStarsUrl = (stars: number) => `/images/ratings/rating-${stars * 10}.png`;

  return (
    <div className="p-6 border-r border-b border-gray-200 flex flex-col">
      <div className="flex justify-center items-center h-48 mb-5">
        <img className="max-w-full max-h-full" src={product.image} alt={product.name} />
      </div>

      <div className="text-base font-medium mb-1 line-clamp-2 h-12">{product.name}</div>

      <div className="flex items-center mb-2">
        <img className="w-20 mr-1" src={getStarsUrl(product.rating.stars)} alt={`${product.rating.stars} stars`} />
        <div className="text-blue-600 text-sm cursor-pointer">{product.rating.count}</div>
      </div>

      <div className="font-bold text-lg mb-2">${formatCurrency(product.priceCents)}</div>

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
        <img className="w-5 mr-1" src="images/icons/checkmark.png" alt="Checkmark" />
        Added
      </div>

      <button 
        className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-full text-sm font-medium shadow-sm transition-colors"
        onClick={handleAddToCartClick}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;