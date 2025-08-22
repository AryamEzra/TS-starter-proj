import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Image 
            src="/images/amazon-logo.png" 
            alt="Amazon" 
            width={96} 
            height={28} 
            className="w-24"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Amazon Clone
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Experience the convenience of online shopping with our Amazon-inspired platform. 
          Browse products, track orders, and enjoy seamless checkout.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">Start Shopping</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/shipping.png" alt="Fast Shipping" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your orders delivered quickly and reliably</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/secure.png" alt="Secure Payments" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your transactions are protected with encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/support.png" alt="24/7 Support" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}