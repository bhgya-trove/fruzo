import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Calendar, 
  CheckCircle,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FreshnessBadge } from '../components/FreshnessBadge';
import { formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const { activeAddress } = useAuth();
  const { addToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(null);

  const product = PRODUCTS.find((p) => p.id === id);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-charcoal-900">Product not found</h2>
        <p className="text-sm text-charcoal-500 mt-2">The fresh pick you are looking for is currently unavailable.</p>
        <Link
          to="/products"
          className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
        >
          Back to Produce Market
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const currentImage = imgSrc || product.image;
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, true);
    addToast(`Proceeding to checkout with ${product.name}`, 'cart');
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-charcoal-600 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to browsing</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 shadow-2xs ${
              isFavorite
                ? 'bg-red-50 text-red-500 border-red-200'
                : 'bg-white border-slate-200 text-charcoal-600 hover:text-red-500 hover:border-red-200'
            }`}
            title={isFavorite ? 'Saved in wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Wishlisted' : 'Wishlist'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white border border-slate-200 text-charcoal-600 hover:text-brand-700 hover:border-brand-300 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-premium">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Product Image Box */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center">
              <img
                src={currentImage}
                alt={product.name}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <FreshnessBadge freshness={product.freshness} size="md" />

                {product.discount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-black px-2.5 py-0.5 rounded-lg shadow-sm w-fit">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand-100 text-center">
                <span className="text-base block mb-0.5">🌱</span>
                <span className="text-[11px] font-bold text-charcoal-800 block">Pesticide Safe</span>
                <span className="text-[10px] text-charcoal-500">Polyhouse Grown</span>
              </div>
              <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand-100 text-center">
                <span className="text-base block mb-0.5">❄️</span>
                <span className="text-[11px] font-bold text-charcoal-800 block">Cold-Chain</span>
                <span className="text-[10px] text-charcoal-500">Stored at 4°C</span>
              </div>
              <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand-100 text-center">
                <span className="text-base block mb-0.5">⚡</span>
                <span className="text-[11px] font-bold text-charcoal-800 block">Fast Delivery</span>
                <span className="text-[10px] text-charcoal-500">Direct to Door</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-charcoal-400">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title & Unit */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-charcoal-500 mt-1">
                  Pack Size: <span className="text-charcoal-900 font-bold">{product.unit}</span>
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-charcoal-900">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm sm:text-base text-charcoal-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save {formatCurrency(product.originalPrice - product.price)}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-400 mt-0.5">Inclusive of all local agricultural taxes</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-700">
                    <CheckCircle className="w-3.5 h-3.5" /> In Stock ({product.stock} units left)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">About this produce</h4>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Freshness & Quality Details */}
              <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 text-xs text-charcoal-700 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-800">Freshness:</span>
                  <span>Harvested recently and carefully packed in climate-controlled pouches.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-800">Quality:</span>
                  <span>Triple-point quality checked before dispatch.</span>
                </div>
              </div>

              {/* Origin & Shelf Life Information */}
              <div className="grid grid-cols-2 gap-3 py-1 text-xs">
                <div className="flex items-center gap-2 text-charcoal-600">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Origin: <strong>{product.origin || 'FRUZO Farm Direct'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-600">
                  <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Shelf Life: <strong>{product.shelfLife || '3-5 Days'}</strong></span>
                </div>
              </div>

              {/* Delivery ETA banner */}
              <div className="p-3 rounded-2xl bg-brand-50/80 border border-brand-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-charcoal-900">
                    Superfast Express Delivery
                  </p>
                  <p className="text-charcoal-600 text-[11px]">
                    Delivering to {activeAddress?.street || 'Indiranagar, Bengaluru'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-charcoal-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-charcoal-600 hover:bg-slate-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-black text-charcoal-900 min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-charcoal-600 hover:bg-slate-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs font-bold text-charcoal-500">
                  Total: {formatCurrency(product.price * quantity)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 rounded-2xl border-2 border-brand-600 text-brand-700 hover:bg-brand-50 font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products (You May Also Like) */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Pair With</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal-900 tracking-tight">
                You May Also Like
              </h3>
            </div>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs sm:text-sm font-bold text-brand-700 hover:underline"
            >
              See all in this category
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed && recentlyViewed.filter(p => p.id !== product.id).length > 0 && (
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Your History</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal-900 tracking-tight">
              Recently Viewed
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {recentlyViewed.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
