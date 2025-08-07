import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import { SearchProvider } from '../context/SearchContext'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amazon Clone',
  description: 'Amazon clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <CartProvider>
            <Header />
            <main className="pt-16"> {/* Add padding to account for fixed header */}
              {children}
            </main>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}