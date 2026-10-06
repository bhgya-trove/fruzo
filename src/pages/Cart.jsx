import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Truck,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';
import { AVAILABLE_COUPONS } from '../data/coupons';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    appliedCoupon,
    couponDiscount,
    finalTotal,
    totalSavingsOnMRP,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const threshold = freeDeliveryThreshold || 499;
  const neededForFreeDelivery = amountNeededForFreeDelivery !== undefined ? amountNeededForFreeDelivery : Math.max(0, threshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / threshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    applyCoupon(couponCodeInput.trim());
    setCouponCodeInput('');
  };

  const handleQuickCouponClick = (code) => {
    applyCoupon(code);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
          Your cart is feeling a little empty.
        </h2>
        <p className="text-sm text-charcoal-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Fill it with nutrient-packed organic vegetables, succulent fruits, and crisp farm greens.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-6 py-3.5 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <span>Explore Fresh Picks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
            Review Your Basket
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
            {cart.length} unique produce item{cart.length > 1 ? 's' : ''} ready for fast dispatch
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Free Delivery Bar */}
          <div className="p-4 rounded-2xl bg-brand-50/80 border border-brand-200">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-brand-800">
                <Truck className="w-4 h-4" />
                {neededForFreeDelivery === 0
                  ? '🎉 You unlocked FREE Delivery!'
                  : `Add ${formatCurrency(neededForFreeDelivery)} more to get FREE Delivery!`}
              </span>
              <span className="text-charcoal-600 font-extrabold">
                {formatCurrency(subtotal)} / {formatCurrency(threshold)}
              </span>
            </div>
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                {/* Image + Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-bold text-xs sm:text-sm text-charcoal-900 hover:text-brand-700 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] font-semibold text-charcoal-400 mt-0.5">
                      {product.unit} • {formatCurrency(product.price)} each
                    </p>
                    <p className="text-xs sm:text-sm font-black text-charcoal-900 mt-1">
                      {formatCurrency(product.price * quantity)}
                    </p>
                  </div>
                </div>

                {/* Stepper + Remove */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 sm:p-2 hover:bg-slate-200 text-charcoal-700 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 sm:px-3 text-xs sm:text-sm font-extrabold text-charcoal-900 min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 sm:p-2 hover:bg-slate-200 text-charcoal-700 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 rounded-xl text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to keep shopping */}
          <div className="text-right">
            <Link
              to="/products"
              className="text-xs font-bold text-brand-700 hover:text-brand-800 hover:underline"
            >
              + Add more fruits or vegetables
            </Link>
          </div>
        </div>

        {/* Right Column: Coupon & Order Summary Bill */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupon Code Section */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-700">
              <Tag className="w-4 h-4 text-brand-600" />
              <span>Apply Promo Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-mono font-black text-xs text-emerald-900">
                      {appliedCoupon.code}
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      {couponDiscount > 0 ? `Saved ${formatCurrency(couponDiscount)}!` : appliedCoupon.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 text-emerald-700 hover:text-red-600 rounded-lg"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter FRESH10, SAVE50..."
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 uppercase font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Suggested Coupon Chips */}
            {!appliedCoupon && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] text-charcoal-400 font-semibold">Available for you:</p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_COUPONS.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleQuickCouponClick(c.code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 text-[11px] font-mono font-bold text-charcoal-700 transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Bill Breakdown */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-charcoal-700 border-b border-slate-100 pb-3">
              Bill Summary
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-charcoal-600">
                <span>Produce Items Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-charcoal-600">
                <div className="flex items-center gap-1">
                  <span>Delivery Partner Fee</span>
                  {subtotal >= freeDeliveryThreshold && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <span className="font-semibold text-charcoal-900">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">₹0</span> : formatCurrency(deliveryFee)}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}

              {totalSavingsOnMRP > 0 && (
                <div className="flex justify-between text-brand-700 font-medium text-xs">
                  <span>MRP Direct Savings</span>
                  <span>Saved {formatCurrency(totalSavingsOnMRP)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="font-black text-base text-charcoal-900 block">Total to Pay</span>
                  <span className="text-[11px] text-charcoal-400">Including all charges</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-brand-700">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Savings Highlight Badge */}
            {(totalSavingsOnMRP > 0 || couponDiscount > 0) && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>You are saving total {formatCurrency(totalSavingsOnMRP + couponDiscount)} on this order!</span>
              </div>
            )}

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-charcoal-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Contactless 18-minute delivery guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
