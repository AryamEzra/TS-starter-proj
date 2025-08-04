import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { formatCurrency } from '../utils/money';
import type { Order, Product } from '../types';
import { fetchOrders } from '../services/api';
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
    
    /*
    const loadOrders = async () => {
      setOrdersLoading(true);
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setOrdersLoading(false);
    };
    loadOrders();
    */

  }, []);

  const findProductById = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  if (productsLoading || ordersLoading) {
    return <Spinner />;
  }

  const primaryButtonClasses = "bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200";
  const secondaryButtonClasses = "bg-white hover:bg-gray-50 border border-gray-300 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200";

  return (
    <>
      <Header />
      {/* main */}
      <main className="max-w-4xl mx-auto mt-24 mb-24 px-5">
        {/* page-title */}
        <div className="font-bold text-2xl mb-6">Your Orders</div>

        {/* orders-grid */}
        <div className="grid grid-cols-1 gap-y-12">
          {orders.length === 0 && !ordersLoading ? (
            <div className="border border-gray-300 rounded-lg p-6">You have no past orders.</div>
          ) : (
            orders.map(order => (
              // order-container (just a grid item)
              <div key={order.id} className="border border-gray-300 rounded-lg">
                {/* order-header */}
                <div className="bg-gray-100 p-6 rounded-t-lg border-b border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  {/* order-header-left-section */}
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:mr-12">
                      <div className="font-medium">Order Placed:</div>
                      <div>{dayjs(order.orderTime).format('MMMM D, YYYY')}</div>
                    </div>
                    <div>
                      <div className="font-medium">Total:</div>
                      <div>${formatCurrency(order.totalCostCents)}</div>
                    </div>
                  </div>
                  {/* order-header-right-section */}
                  <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <div className="font-medium">Order ID:</div>
                    <div className="text-sm break-all">{order.id}</div>
                  </div>
                </div>

                {/* order-details-grid: Using Tailwind's arbitrary values for precise grid columns */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-x-8 gap-y-10 items-center">
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
                        <button className={`${primaryButtonClasses} flex items-center justify-center w-40 h-9`}>
                          <img className="w-6 mr-3" src="/images/icons/buy-again.png" alt="Buy again" />
                          <span>Buy it again</span>
                        </button>
                      </div>,

                      <div key={`${product.id}-actions`} className="self-start w-full">
                        <Link to={`/tracking?orderId=${order.id}&productId=${product.id}`}>
                          <button className={`${secondaryButtonClasses} w-full`}>
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