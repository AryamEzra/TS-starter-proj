'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import HeaderSearch from './HeaderSearch';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Logout } from './logout';

export default function Header() {
  const { cartQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-2 sm:px-4 z-50">
      {/* Left Section - Logo */}
      <div className="flex-shrink-0">
        <Link
          href="/dashboard"
          className="inline-block p-2 rounded border border-transparent hover:border-white"
        >
          <Image 
            src="/images/amazon-logo-white.png" 
            alt="Amazon Logo"
            width={96}
            height={36}
            className="mt-1 hidden sm:block"
          />
          <Image 
            src="/images/amazon-mobile-logo-white.png" 
            alt="Amazon Logo"
            width={30}
            height={30}
            className="block sm:hidden"
          />
        </Link>
      </div>

      {/* Middle Section - Search - Always visible */}
      <div className="flex-1 mx-2 sm:mx-4 max-w-2xl">
        <HeaderSearch />
      </div>

      {/* Right Section - Desktop Links */}
      <div className="hidden sm:flex items-center gap-4">
        <Link
          className="text-white hover:border-white p-2 rounded border border-transparent"
          href="/dashboard/orders"
        >
          <div className="text-xs">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        <Link
          className="text-white hover:border-white p-2 rounded border border-transparent flex items-center relative"
          href="/dashboard/checkout"
        >
          <div className="relative">
            <Image 
              src="/images/icons/cart-icon.png" 
              alt="Cart"
              width={55}
              height={40}
            />
            <div className="text-orange-400 text-base font-bold absolute -top-0 left-5 w-6 text-center">
              {cartQuantity}
            </div>
          </div>
          <div className="text-sm font-bold ml-1">Cart</div>
        </Link>

        {/* Desktop Logout Button */}
        <Logout />
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="sm:hidden flex items-center">
        <button 
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Image 
            src="/images/icons/hamburger-menu.png" 
            alt="Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 bg-gray-900 w-48 shadow-lg py-2 mt-1 rounded-sm sm:hidden">
          <Link
            className="block px-4 py-2 hover:bg-gray-800 text-white"
            href="/dashboard/orders"
            onClick={() => setIsMenuOpen(false)}
          >
            Returns & Orders
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-800 text-white"
            href="/dashboard/checkout"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart ({cartQuantity})
          </Link>

          {/* Mobile Logout Button */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              // You might want to handle logout directly here or refactor
              // to use the Logout component functionality
              const handleLogout = async () => {
                const { authClient } = await import('@/lib/auth-client');
                await authClient.signOut();
                const { useRouter } = await import('next/navigation');
                const router = useRouter();
                router.push("/");
              };
              handleLogout();
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 text-white flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}