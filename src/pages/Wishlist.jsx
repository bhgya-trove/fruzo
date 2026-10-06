import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 ring-8 ring-red-50/50">
          <Heart className="w-10 h-10 stroke-[2.2]" />
        </div>
        <h2 className="text-2xl font-black text-charcoal-900 tracking-tight">
          Your wishlist is waiting for something fresh.
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 max-w-xs mx-auto leading-relaxed">
          Save your favourite orchard fruits, crispy greens, and kitchen vegetables to order whenever you crave them.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-6 py-3.5 px-7 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
              My Wishlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            {wishlist.length} saved fresh produce item{wishlist.length > 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-1.5 rounded-xl transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="relative group flex flex-col justify-between">
            <ProductCard product={product} />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleMoveToCart(product)}
                className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="p-2 rounded-xl border border-slate-200 text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
