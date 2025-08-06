import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { formatCurrency } from '../utils/money';
import type { Order, Product } from '../types';
import { dummyOrders } from '../data/dummyOrders';

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { products, isLoading: productsLoading } = useProducts();
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    setOrdersLoading(true);
    setTimeout(() => {
      const sortedOrders = [...dummyOrders].sort((a, b) => 
        dayjs(b.orderTime).unix() - dayjs(a.orderTime).unix()
      );
      setOrders(sortedOrders);
      setOrdersLoading(false);
    }, 500);
  }, []);

  const findProductById = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  if (productsLoading || ordersLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto mt-24 mb-24 px-5">
        <div className="font-bold text-2xl mb-6">Your Orders</div>

        <div className="space-y-6">
          {orders.length === 0 && !ordersLoading ? (
            <div className="border border-gray-300 rounded-lg p-6">You have no past orders.</div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="border border-gray-300 rounded-lg">
                <div className="bg-gray-100 p-6 rounded-t-lg border-b border-gray-300 flex flex-col sm:flex-row justify-between">
                  <div className="flex flex-col sm:flex-row gap-8 mb-4 sm:mb-0">
                    <div>
                      <div className="font-medium">Order Placed:</div>
                      <div>{dayjs(order.orderTime).format('MMMM D, YYYY')}</div>
                    </div>
                    <div>
                      <div className="font-medium">Total:</div>
                      <div>${formatCurrency(order.totalCostCents)}</div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-medium">Order ID:</div>
                    <div className="text-sm break-all">{order.id}</div>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-6 md:gap-8 items-center">
                  {order.products.flatMap(orderProduct => {
                    const product = findProductById(orderProduct.productId);
                    if (!product) return [];

                    return [
                      <div key={`${product.id}-img`} className="text-center">
                        <img src={product.image} alt={product.name} className="max-w-[110px] max-h-[110px] inline-block"/>
                      </div>,
                      
                      <div key={`${product.id}-details`}>
                        <div className="font-bold">{product.name}</div>
                        <div className="mt-1">Arriving on: {dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D')}</div>
                        <div className="mt-1 mb-2">Quantity: {orderProduct.quantity}</div>
                        <button className="bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center w-40 h-9">
                          <img className="w-6 mr-3" src="/images/icons/buy-again.png" alt="Buy again" />
                          <span>Buy it again</span>
                        </button>
                      </div>,

                      <div key={`${product.id}-actions`} className="w-full">
                        <Link to={`/tracking?orderId=${order.id}&productId=${product.id}`}>
                          <button className="bg-white hover:bg-gray-50 border border-gray-300 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 w-full">
                            Track package
                          </button>
                        </Link>
                      </div>
                    ];
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default OrdersPage;