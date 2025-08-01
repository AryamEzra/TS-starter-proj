import { useCart } from '../context/CartContext';
import type { Product, CartItem } from '../types';
import { formatCurrency } from '../utils/money';
import { deliveryOptions, getDeliveryOptionById } from '../data/deliveryOptions';
import dayjs from 'dayjs';

interface CartItemCardProps {
  cartItem: CartItem;
  products: Product[];
}

function CartItemCard({ cartItem, products }: CartItemCardProps) {
  const { removeFromCart, updateQuantity, updateDeliveryOption } = useCart();

  const matchingProduct = products.find(p => p.id === cartItem.productId);

  if (!matchingProduct) {
    return null; 
  }
  
  const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
  const deliveryDate = dayjs().add(deliveryOption?.deliveryDays || 7, 'days').format('dddd, MMMM D');

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {deliveryDate}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={matchingProduct.image} />

        <div className="cart-item-details">
          <div className="product-name">{matchingProduct.name}</div>
          <div className="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
          <div className="product-quantity">
            <span>
              Quantity: <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <span className="update-quantity-link link-primary">Update</span>
            <span 
              className="delete-quantity-link link-primary"
              onClick={() => removeFromCart(cartItem.productId)}
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">Choose a delivery option:</div>
          {deliveryOptions.map(option => {
            const dateString = dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D');
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
            const isChecked = option.id === cartItem.deliveryOptionId;

            return (
              <div 
                key={option.id} 
                className="delivery-option"
                onClick={() => updateDeliveryOption(cartItem.productId, option.id)}
              >
                <input type="radio" checked={isChecked} readOnly className="delivery-option-input" />
                <div>
                  <div className="delivery-option-date">{dateString}</div>
                  <div className="delivery-option-price">{priceString} Shipping</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;