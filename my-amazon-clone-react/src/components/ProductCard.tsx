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
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img className="product-rating-stars" src={getStarsUrl(product.rating.stars)} />
        <div className="product-rating-count link-primary">{product.rating.count}</div>
      </div>

      <div className="product-price">${formatCurrency(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {/* A little trick to generate 10 options */}
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${addedMessageVisible ? 'visible' : ''}`}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={handleAddToCartClick}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;