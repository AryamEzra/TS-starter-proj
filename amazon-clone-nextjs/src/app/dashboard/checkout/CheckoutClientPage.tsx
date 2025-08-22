'use client';

import { useMemo } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import OrderSummary from '@/components/OrderSummary';
import PaymentSummary from '@/components/PaymentSummary';
import Link from 'next/link';
import Image from 'next/image';

interface CheckoutClientProps {
  products: Product[];
}

export default function CheckoutClient({ products }: CheckoutClientProps) {
  const { cart, cartQuantity } = useCart();
  const { activeSearchTerm } = useSearch();

  const filteredCartProducts = useMemo(() => {
    const cartProductIds = new Set(cart.map(item => item.productId));
    let filtered = products.filter(product => 
      cartProductIds.has(product.id)
    );

    if (activeSearchTerm) {
      const searchTerm = activeSearchTerm.toLowerCase();
      const searchFilteredProductIds = new Set(
        products
          .filter(p => p.name.toLowerCase().includes(searchTerm) || p.keywords?.some(k => k.toLowerCase().includes(searchTerm)))
          .map(p => p.id)
      );
      
      filtered = filtered.filter(product => searchFilteredProductIds.has(product.id));
    }
    return filtered;
  }, [products, cart, activeSearchTerm]);

  const filteredCart = useMemo(() => {
    const filteredProductIds = new Set(filteredCartProducts.map(p => p.id));
    return cart.filter(item => filteredProductIds.has(item.productId));
  }, [cart, filteredCartProducts]);

  return (
    <>
      {/* Checkout-specific header */}
      <header className="fixed top-2 left-0 right-0 z-50 bg-white ">
        <div className="flex items-center justify-between max-w-6xl px-4 mx-auto h-14">
          {/* Left section */}
          <section className="flex items-center w-40">
            <Link href="/dashboard" className="p-1">
              <Image 
                className="hidden w-24 sm:block" 
                src="/images/amazon-logo.png" 
                alt="Amazon" 
                width={96} 
                height={28} 
              />
              <Image 
                className="block h-9 sm:hidden" 
                src="/images/amazon-mobile-logo.png" 
                alt="Amazon" 
                width={36} 
                height={36} 
              />
            </Link>
          </section>

          {/* Middle section */}
          <section className="flex-1 text-center">
            <span className="text-xl font-bold font ">
              Checkout (<Link className="text-blue-600 hover:text-orange-700" href="/dashboard">{cartQuantity} items</Link>)
            </span>
          </section>

          {/* Right section */}
          <section className="flex justify-end w-40">
            <Image 
              className="h-6" 
              src="/images/icons/checkout-lock-icon.png" 
              alt="Secure" 
              width={24} 
              height={24} 
            />
          </section>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl px-4 sm:px-8 mx-auto mt-20 mb-16">
        <div className="font-bold text-xl mb-5">
          {activeSearchTerm 
            ? `Search Results in Your Cart for "${activeSearchTerm}"`
            : 'Review your order'}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
          <OrderSummary products={filteredCartProducts} />
          <PaymentSummary products={products} />
        </div>

        {filteredCartProducts.length === 0 && activeSearchTerm && (
          <div className="text-center py-10">
            No matching products found in your cart for "{activeSearchTerm}"
          </div>
        )}

        {cart.length === 0 && (
          <div className="text-center py-10">
            Your cart is empty. <Link href="/dashboard" className="text-blue-600 hover:text-orange-700">Continue shopping</Link>.
          </div>
        )}
      </div>
    </>
  );
}