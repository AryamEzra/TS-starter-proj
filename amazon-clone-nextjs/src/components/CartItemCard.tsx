import type { Product, CartItem } from '../types';
import { formatCurrency } from '../utils/money';
import { deliveryOptions, getDeliveryOptionById } from '../data/deliveryOptions';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CartItemCardProps {
  cartItem: CartItem;
  products: Product[];
}

function CartItemCard({ cartItem, products }: CartItemCardProps) {
  const { removeFromCart, updateQuantity, updateDeliveryOption } = useCart();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity.toString());

  const handleSaveClick = () => {
    const quantityNumber = Number(newQuantity);

    if (
      newQuantity !== "" &&
      quantityNumber > 0 &&
      quantityNumber < 1000
    ) {
      updateQuantity(cartItem.productId, quantityNumber);
      setIsEditing(false);
    }
  };
  
  const matchingProduct = products.find(p => p.id === cartItem.productId);

  if (!matchingProduct) {
    return null; 
  }
  
  const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
  const deliveryDate = dayjs().add(deliveryOption?.deliveryDays || 7, 'days').format('dddd, MMMM D');

  let quantityDisplay;

  if (isEditing) {
    quantityDisplay = (
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          className="w-16 p-1 border border-gray-300 rounded"
        />
        <span
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={handleSaveClick}
        >
          Save
        </span>
      </div>
    );
  } else {
    quantityDisplay = (
      <div className="flex items-center gap-2">
        <span>
          Quantity: <span className="font-medium">{cartItem.quantity}</span>
        </span>
        <span
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => {
            setIsEditing(true);
            setNewQuantity(cartItem.quantity.toString());
          }}
        >
          Update
        </span>
        <span 
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => removeFromCart(cartItem.productId)}
        >
          Delete
        </span>
      </div>
    );
  }

  return (
    <div className="mb-3 border border-gray-200 rounded p-4">
      <div className="text-green-700 font-bold text-lg mb-4">
        Delivery date: {deliveryDate}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-6 md:col-span-2">
          <img 
            className="w-24 h-24 object-contain" 
            src={`/${matchingProduct.image}`}
            alt={matchingProduct.name}
          />

          <div>
            <div className="font-bold text-lg mb-2">{matchingProduct.name}</div>
            <div className="text-red-700 font-bold mb-2">${formatCurrency(matchingProduct.priceCents)}</div>
            <div className="product-quantity">
              {quantityDisplay}
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold mb-2">Choose a delivery option:</div>
          {deliveryOptions.map(option => {
            const dateString = dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D');
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
            const isChecked = option.id === cartItem.deliveryOptionId;

            return (
              <div 
                key={option.id} 
                className="flex items-start gap-2 mb-3 cursor-pointer"
                onClick={() => updateDeliveryOption(cartItem.productId, option.id)}
              >
                <input 
                  type="radio" 
                  checked={isChecked} 
                  readOnly 
                  className="mt-3" 
                />
                <div>
                  <div className="text-green-700 font-medium">{dateString}</div>
                  <div className="text-gray-500 text-sm">{priceString} Shipping</div>
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