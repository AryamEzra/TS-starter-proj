import { fetchProducts } from '@/services/api';
import { dummyOrders } from '@/data/dummyOrders';
import Link from 'next/link';
import TrackingClient from './TrackingClientPage';
import type { Order, OrderProduct, Product } from '@/types';

interface TrackingPageProps {
  searchParams: {
    orderId?: string;
    productId?: string;
  }
}

export default async function TrackingPage({ searchParams }: TrackingPageProps) {
  const { orderId, productId } = searchParams;

  if (!orderId || !productId) {
    return (
      <main className="max-w-4xl mx-auto my-24 px-8">
        <h2 className="text-2xl font-bold">Invalid Tracking Request</h2>
        <p className="mt-2">Order ID and Product ID are required.</p>
        <Link href="/dashboard/orders" className="text-blue-600 hover:text-orange-700 mt-4 inline-block">
          View all orders
        </Link>
      </main>
    );
  }

  const products = await fetchProducts();
  const product = products.find(p => p.id === productId);
  const order = dummyOrders.find(o => o.id === orderId);
  const orderProduct = order?.products.find(p => p.productId === productId);

  if (!order || !product || !orderProduct) {
    return (
      <main className="max-w-4xl mx-auto my-24 px-8">
        <h2 className="text-2xl font-bold">Tracking Information Not Found</h2>
        <p className="mt-2">The requested order or product could not be found.</p>
        <Link href="/dashboard/orders" className="text-blue-600 hover:text-orange-700 mt-4 inline-block">
          View all orders
        </Link>
      </main>
    );
  }

  return <TrackingClient order={order} product={product} orderProduct={orderProduct} />;
}