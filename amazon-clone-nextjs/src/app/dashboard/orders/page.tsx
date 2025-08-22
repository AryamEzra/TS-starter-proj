import { fetchProducts } from '@/services/api';
import { dummyOrders } from '@/data/dummyOrders';
import dayjs from 'dayjs';
import OrdersClient from './OrdersClientPage';
import type { Order } from '@/types';

export default async function OrdersPage() {
  const allProducts = await fetchProducts();
  
  const sortedOrders: Order[] = [...dummyOrders].sort((a, b) => 
    dayjs(b.orderTime).unix() - dayjs(a.orderTime).unix()
  );

  return <OrdersClient products={allProducts} orders={sortedOrders} />;
}