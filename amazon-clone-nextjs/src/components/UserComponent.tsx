'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { AuthUser } from '@/lib/auth-types';

export default function UserComponent() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { authClient } = await import('@/lib/auth-client');
        const session = await authClient.getSession();
        
        if (session && 'user' in session) {
          setUser(session.user as AuthUser);
        } else if (session && 'data' in session && session.data?.user) {
          setUser(session.data.user as AuthUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { authClient } = await import('@/lib/auth-client');
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-white hover:border-white p-2 rounded border border-transparent"
      >
        <div className="text-xs">Hello, sign in</div>
        <div className="text-sm font-bold">Account & Lists</div>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-white hover:border-white p-2 rounded border border-transparent flex items-center"
      >
        <div className="text-left">
          <div className="text-xs">Hello, {user.name?.split(' ')[0] || user.email}</div>
          <div className="text-sm font-bold flex items-center">
            Account & Lists
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 bg-white text-black w-48 shadow-lg py-2 mt-1 rounded-sm border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <div className="font-bold">{user.name || 'User'}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
          
          <Link
            href="/user"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            Your Account
          </Link>
          
          <Link
            href="/dashboard/orders"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            Your Orders
          </Link>
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}