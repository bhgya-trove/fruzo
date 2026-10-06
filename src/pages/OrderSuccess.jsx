import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  CreditCard
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useOrders } from '../context/OrderContext';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useOrders();

  // Pick order from state or most recent from context
  const order = location.state?.order || orders[0];

  useEffect(() => {
    // Fire celebratory confetti!
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#22c55e', '#16a34a', '#f59e0b', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-charcoal-900">No active order found</h2>
        <Link to="/" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 animate-scale-in">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-premium text-center space-y-6">
        {/* Animated Green Checkmark Badge */}
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
          <div className="w-full h-full rounded-full bg-emerald-50 flex items-center justify-center text-brand-600 ring-8 ring-emerald-50/60 animate-pulse">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="absolute -top-1 -right-1 text-2xl">🌱</span>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-brand-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Verified & In Packing
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Our pickers are packing your farm-fresh items in climate-controlled pouches.
          </p>
        </div>

        {/* Order Details Highlight Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-charcoal-500 font-medium">Order Number:</span>
            <span className="font-mono font-black text-charcoal-900 text-sm">{order.id}</span>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-charcoal-500 font-medium">Estimated Arrival:</span>
            <span className="font-extrabold text-brand-700 flex items-center gap-1">
              <Clock className="w-4 h-4 text-brand-600" />
              {order.deliveryPreference === 'standard' ? '🌱 Standard (30–45 mins)' : '⚡ Express (15–25 mins)'}
            </span>
          </div>

          <div className="flex justify-between items-start pb-2.5 border-b border-slate-200">
            <span className="text-charcoal-500 font-medium shrink-0">Deliver to:</span>
            <span className="font-semibold text-charcoal-800 text-right truncate max-w-[240px]">
              {order.deliveryAddress?.house}, {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-charcoal-500 font-medium">Payment Mode:</span>
            <span className="font-semibold text-charcoal-800">
              {order.paymentMethod} • Paid
            </span>
          </div>

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-charcoal-900 font-bold">Total Amount Paid:</span>
            <span className="font-black text-lg text-charcoal-900">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(`/track-order/${order.id}`)}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Track Live Order</span>
          </button>

          <Link
            to="/"
            className="flex-1 py-3.5 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-charcoal-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
