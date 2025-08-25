'use client'

import { useState } from 'react'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/money'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedMessageVisible, setAddedMessageVisible] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCartClick = () => {
    addToCart(product.id, quantity)
    setAddedMessageVisible(true)
    setTimeout(() => {
      setAddedMessageVisible(false)
    }, 2000)
  }

  // Fixed: Handle undefined rating and provide fallbacks
  const getStarsUrl = (stars: number | undefined) => {
    const validStars = stars && !isNaN(stars) ? Math.round(stars) : 0
    return `/images/ratings/rating-${validStars * 10}.png`
  }

  // Handle image errors for rating images
  const handleRatingImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  // Handle main product image errors
  const handleProductImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true)
  }

  // Safe values for rating
  const ratingStars = product.rating?.stars ?? 0
  const ratingCount = product.rating?.count ?? 0

  return (
    <div className="p-6 border-r border-b border-gray-200 flex flex-col">
      {/* Product image - server rendered */}
      <div className="flex justify-center items-center h-48 mb-5">
        {!imageError ? (
          <img 
            className="max-w-full max-h-full" 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            onError={handleProductImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Image not available
          </div>
        )}
      </div>

      {/* Product info - server rendered */}
      <div className="text-base font-medium mb-1 line-clamp-2 h-12">{product.name}</div>

      {/* Fixed rating section with safe access */}
      <div className="flex items-center mb-2">
        {ratingStars > 0 ? (
          <>
            <img 
              className="w-20 mr-1" 
              src={getStarsUrl(ratingStars)} 
              alt={`${ratingStars} stars`}
              onError={handleRatingImageError}
            />
            <div className="text-blue-600 text-sm cursor-pointer">
              {ratingCount > 0 ? ratingCount : 'No reviews'}
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-sm">No ratings yet</div>
        )}
      </div>

      <div className="font-bold text-lg mb-2">${formatCurrency(product.priceCents)}</div>

      {/* Interactive parts - client rendered */}
      <div className="mb-4">
        <select 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-1 bg-white border border-gray-200 rounded text-sm focus:outline-yellow-400"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="flex-1"></div>

      <div className={`flex items-center text-green-700 text-base mb-2 transition-opacity duration-200 ${addedMessageVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img 
          className="w-5 mr-1" 
          src="/images/icons/checkmark.png" 
          alt="Checkmark"
          onError={handleRatingImageError}
        />
        Added
      </div>

      <button 
        className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-full text-sm font-medium shadow-sm transition-colors"
        onClick={handleAddToCartClick}
      >
        Add to Cart
      </button>
    </div>
  )
}