'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import type { Order, OrderProduct, Product } from '@/types';

interface TrackingClientPageProps {
  order: Order;
  product: Product;
  orderProduct: OrderProduct;
}

export default function TrackingClientPage({ order, product, orderProduct }: TrackingClientPageProps) {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
    const totalDuration = deliveryTime.diff(orderTime);
    const elapsedDuration = dayjs().diff(orderTime);
    
    const calculatedProgress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    setProgressPercent(calculatedProgress);
  }, [order.orderTime, orderProduct.estimatedDeliveryTime]);

  const getStatus = (progress: number) => {
    if (progress < 50) return 'Preparing';
    if (progress < 100) return 'Shipped';
    return 'Delivered';
  };
  const currentStatus = getStatus(progressPercent);
  const deliveryTimeFormatted = dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D');

  return (
    <main className="max-w-4xl mx-auto my-8 px-8">
      <div className="order-tracking">
        <Link className="text-blue-600 hover:text-orange-700 inline-block mb-8" href="/dashboard/orders">
          &larr; View all orders
        </Link>

        <div className="text-2xl font-bold mb-2">
          {currentStatus === 'Delivered' ? `Delivered on ${deliveryTimeFormatted}` : `Arriving on ${deliveryTimeFormatted}`}
        </div>

        <div className="mb-1">{product.name}</div>
        <div className="mb-1">Quantity: {orderProduct.quantity}</div>
        {/* <Image 
          className="max-w-[150px] max-h-[150px] my-8" 
          src={product.image} 
          alt={product.name}
          width={150}
          height={150}
          style={{ objectFit: 'contain' }}
        /> */}
        <Image
          src={product.image.startsWith('http') ? product.image : `/${product.image}`}
          alt={product.name}
          width={110}
          height={110}
          className="inline-block max-w-[110px] max-h-[110px] object-contain"
          // Remove style prop and use className instead
        />

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
  );
}