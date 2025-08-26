'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  ArrowLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { AuthUser } from '@/lib/auth-types';

export default function UserPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { authClient } = await import('@/lib/auth-client');
        const session = await authClient.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        // Handle different session response structures
        let userData: AuthUser | null = null;
        
        if ('user' in session) {
          userData = session.user as AuthUser;
        } else if ('data' in session && session.data?.user) {
          userData = session.data.user as AuthUser;
        }

        if (!userData) {
          router.push('/login');
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-4xl mx-auto p-4">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name || 'User'}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Account Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Your Orders
            </h2>
            <p className="text-gray-600 mb-4">
              Track, return, or buy things again
            </p>
            <Link
              href="/dashboard/orders"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View order history →
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </h2>
            <p className="text-gray-600 mb-4">
              Manage your payment options
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Add payment method →
            </button>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Account Settings
            </h2>
            <p className="text-gray-600 mb-4">
              Manage your account preferences
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Edit account settings →
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-8 text-center">
          <Link
            href="/api/auth/signout"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}