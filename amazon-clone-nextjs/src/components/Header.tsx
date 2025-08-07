'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  const { cartQuantity } = useCart();

  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-4 z-50">
      <div className="w-48">
        <Link
          href="/"
          className="inline-block p-2 rounded border border-transparent hover:border-white"
        >
          <Image 
            src="/images/amazon-logo-white.png" 
            alt="Amazon Logo"
            width={96}
            height={36}
            className="mt-1"
          />
        </Link>
      </div>

      <HeaderSearch />

      <div className="flex items-center gap-4">
        <Link
          className="text-white hover:border-white p-2 rounded border border-transparent"
          href="/orders"
        >
          <div className="text-xs">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        <Link
          className="text-white hover:border-white p-2 rounded border border-transparent flex items-center relative"
          href="/checkout"
        >
          <div className="relative">
            <Image 
              src="/images/icons/cart-icon.png" 
              alt="Cart"
              width={48}
              height={48}
            />
            <div className="absolute -top-1 -right-1 bg-orange-400 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {cartQuantity}
            </div>
          </div>
          <div className="text-sm font-bold ml-1">Cart</div>
        </Link>
      </div>
    </div>
  );
}