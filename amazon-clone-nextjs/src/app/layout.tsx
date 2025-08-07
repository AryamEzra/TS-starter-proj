// layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import { SearchProvider } from '../context/SearchContext'
import Header from '../components/Header'

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
      <body className="bg-gray-100 text-gray-900 antialiased">
        <SearchProvider>
          <CartProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}