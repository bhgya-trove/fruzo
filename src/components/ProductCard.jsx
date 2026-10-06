import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FreshnessBadge } from './FreshnessBadge';
import { formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.image);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isFavorite = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Top Badges & Wishlist Heart */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-auto">
          <div className="flex flex-col gap-1 items-start">
            <FreshnessBadge freshness={product.freshness} size="sm" />

            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistClick}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              isFavorite
                ? 'bg-red-50 text-red-500 fill-red-500'
                : 'bg-white/90 hover:bg-white text-charcoal-400 hover:text-red-500 backdrop-blur-sm'
            }`}
            title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
        </div>

        {/* Product Meta */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
              {product.category}
            </span>

            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md text-[11px] font-bold">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-charcoal-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-brand-700 transition-colors pt-0.5">
            {product.name}
          </h3>

          <p className="text-[11px] font-semibold text-charcoal-500">
            {product.unit}
          </p>
        </div>
      </div>

      {/* Pricing and Action Stepper */}
      <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-charcoal-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-charcoal-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Quick Add or Stepper */}
        <div>
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="py-1.5 px-3.5 sm:px-4 rounded-xl font-bold text-xs bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white border border-brand-200 transition-all duration-200 flex items-center gap-1 active:scale-95 shadow-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-3.5 h-3.5" />
              ADD
            </button>
          ) : (
            <div 
              className="flex items-center bg-brand-600 text-white rounded-xl shadow-md shadow-brand-600/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecrement}
                className="p-1.5 px-2 hover:bg-brand-700 transition-colors active:scale-90"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-black min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1.5 px-2 hover:bg-brand-700 transition-colors active:scale-90"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
