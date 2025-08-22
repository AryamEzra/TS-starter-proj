import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import { SearchProvider } from '../context/SearchContext'
import Header from '../components/Header'
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation'
import { HeaderWrapper } from './dashboard/checkout/checkoutHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Amazon Clone',
  description: 'Amazon clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        <SearchProvider>
          <CartProvider>
            <HeaderWrapper>
              {children}
            </HeaderWrapper>
          </CartProvider>
        </SearchProvider>
        <Toaster />
      </body>
    </html>
  )
}
