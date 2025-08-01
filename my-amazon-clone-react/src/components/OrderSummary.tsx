import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import CartItemCard from './CartItemCard'; 

interface OrderSummaryProps {
  products: Product[];
}

function OrderSummary({ products }: OrderSummaryProps) {
  const { cart } = useCart();

  return (
    <div className="order-summary">
      {cart.map(cartItem => (
        <CartItemCard
          key={cartItem.productId}
          cartItem={cartItem}
          products={products}
        />
      ))}
    </div>
  );
}

export default OrderSummary;