'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useSearch } from '@/context/SearchContext';
import { formatCurrency } from '@/utils/money';
import type { Order, Product } from '@/types';

interface OrdersClientPageProps {
  products: Product[];
  orders: Order[];
}

export default function OrdersClientPage({ products, orders }: OrdersClientPageProps) {
  const { activeSearchTerm } = useSearch();

  const findProductById = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  const filteredOrders = useMemo(() => {
    if (!activeSearchTerm) return orders;
    
    const searchTerm = activeSearchTerm.toLowerCase();
    return orders.filter(order => {
      return order.products.some(orderProduct => {
        const product = findProductById(orderProduct.productId);
        return (
          product?.name.toLowerCase().includes(searchTerm) ||
          product?.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
        );
      });
    });
  }, [orders, products, activeSearchTerm]);

  return (
    <main className="max-w-4xl mx-auto my-8 mb-24 px-5">
      <div className="font-bold text-2xl mb-6">
        {activeSearchTerm 
          ? `Search Results in Orders for "${activeSearchTerm}"`
          : 'Your Orders'}
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="border border-gray-300 rounded-lg p-6 text-center">
            {activeSearchTerm
              ? `No orders found matching "${activeSearchTerm}"`
              : 'You have no past orders.'
            }
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="border border-gray-300 rounded-lg">
              <div className="bg-gray-100 p-6 rounded-t-lg border-b border-gray-300 flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col sm:flex-row gap-8 mb-4 sm:mb-0">
                  <div>
                    <div className="font-medium">ORDER PLACED</div>
                    <div>{dayjs(order.orderTime).format('MMMM D, YYYY')}</div>
                  </div>
                  <div>
                    <div className="font-medium">TOTAL</div>
                    <div>${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-medium">ORDER #</div>
                  <div className="text-sm break-all">{order.id}</div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {order.products.map(orderProduct => {
                  const product = findProductById(orderProduct.productId);
                  if (!product) return null;

                  if (activeSearchTerm && 
                      !product.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) &&
                      !product.keywords?.some(k => k.toLowerCase().includes(activeSearchTerm.toLowerCase()))) {
                    return null;
                  }

                  return (
                    <div key={product.id} className="grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-6 md:gap-8 items-center">
                      <div className="text-center">
                        <Image 
                          src={product.image.startsWith('http') ? product.image : `/${product.image}`}
                          alt={product.name}
                          width={110}
                          height={110}
                          className="inline-block max-w-[110px] max-h-[110px] object-contain"
                        />
                      </div>
                      
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="mt-1">Arriving on: {dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D')}</div>
                        <div className="mt-1 mb-2">Quantity: {orderProduct.quantity}</div>
                        <button className="bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center w-40 h-9">
                          <Image 
                            src="/images/icons/buy-again.png" 
                            alt="Buy again" 
                            width={24} 
                            height={24} 
                            className="w-6 mr-3"
                          />
                          <span>Buy it again</span>
                        </button>
                      </div>

                      <div className="w-full">
                        <Link href={`/tracking?orderId=${order.id}&productId=${product.id}`}>
                          <button className="bg-white hover:bg-gray-50 border border-gray-300 text-black py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 w-full">
                            Track package
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}