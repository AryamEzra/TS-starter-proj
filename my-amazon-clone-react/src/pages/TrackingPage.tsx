import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import type { Order, OrderProduct, Product } from '../types';
import { dummyOrders } from '../data/dummyOrders';

function TrackingPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const { products, isLoading: productsLoading } = useProducts();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderProduct, setOrderProduct] = useState<OrderProduct | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrackingData = async () => {
      if (!orderId || !productId || products.length === 0) return;
      setIsLoading(true);
      const allOrders = dummyOrders;
      const foundOrder = allOrders.find(o => o.id === orderId);

      if (foundOrder) {
        const foundOrderProduct = foundOrder.products.find(p => p.productId === productId);
        const foundProduct = products.find(p => p.id === productId);
        if (foundOrderProduct && foundProduct) {
          setOrder(foundOrder);
          setOrderProduct(foundOrderProduct);
          setProduct(foundProduct);
        }
      }
      setIsLoading(false);
    };
    if (!productsLoading) {
      loadTrackingData();
    }
  }, [orderId, productId, products, productsLoading]);

  if (isLoading || productsLoading) return <Spinner />;

  if (!order || !product || !orderProduct) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto my-24 px-8">
          <h2 className="text-2xl font-bold">Tracking Information Not Found</h2>
          <p className="mt-2">The requested order or product could not be found.</p>
          <Link to="/orders" className="text-blue-600 hover:text-orange-700 mt-4 inline-block">
            View all orders
          </Link>
        </main>
      </>
    );
  }
  
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
  const totalDuration = deliveryTime.diff(orderTime);
  const elapsedDuration = dayjs().diff(orderTime);
  const progressPercent = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));

  const getStatus = () => {
    if (progressPercent < 50) return 'Preparing';
    if (progressPercent < 100) return 'Shipped';
    return 'Delivered';
  };
  const currentStatus = getStatus();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto my-24 px-8">
        <div className="order-tracking">
          <Link className="text-blue-600 hover:text-orange-700 inline-block mb-8" to="/orders">
            View all orders
          </Link>

          <div className="text-2xl font-bold mb-2">
            Arriving on {deliveryTime.format('dddd, MMMM D')}
          </div>

          <div className="mb-1">{product.name}</div>
          <div className="mb-1">Quantity: {orderProduct.quantity}</div>
          <img className="max-w-[150px] max-h-[150px] my-8" src={product.image} alt={product.name}/>

          <div className="flex flex-col sm:flex-row justify-between text-lg font-medium mb-4">
            <div className={currentStatus === 'Preparing' ? 'text-green-600' : 'text-gray-500'}>
              Preparing
            </div>
            <div className={currentStatus === 'Shipped' ? 'text-green-600' : 'text-gray-500'}>
              Shipped
            </div>
            <div className={currentStatus === 'Delivered' ? 'text-green-600' : 'text-gray-500'}>
              Delivered
            </div>
          </div>

          <div className="h-6 w-full border border-gray-300 rounded-full overflow-hidden bg-gray-200">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TrackingPage;