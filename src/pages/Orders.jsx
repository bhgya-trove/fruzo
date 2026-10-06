import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate, FALLBACK_IMAGE } from '../utils/helpers';

export const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleReorder = (order) => {
    order.items?.forEach((item) => {
      addToCart(item.product, item.quantity, true);
    });
    addToast(`Added all items from Order #${order.id} to your basket!`, 'success');
    navigate('/cart');
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-charcoal-900 tracking-tight">No orders yet</h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1 max-w-xs mx-auto">
          You haven't placed any orders yet. Discover farm-fresh produce with superfast delivery!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-6 py-3 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md shadow-brand-600/30 transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
          Your Orders
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Review recent farm-to-table deliveries and live status
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.status === 'delivered';

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-black text-xs">
                    FZ
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-charcoal-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-[11px] text-charcoal-400">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      isDelivered
                        ? 'bg-emerald-50 text-brand-800 border border-emerald-200'
                        : order.status === 'out_for_delivery'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : order.status === 'packing'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-brand-50 text-brand-800 border border-brand-200'
                    }`}
                  >
                    {isDelivered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>Delivered</span>
                      </>
                    ) : order.status === 'out_for_delivery' ? (
                      <>
                        <Truck className="w-3.5 h-3.5 text-amber-600" />
                        <span>Out for Delivery</span>
                      </>
                    ) : order.status === 'packing' ? (
                      <>
                        <Package className="w-3.5 h-3.5 text-blue-600" />
                        <span>Packing</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        <span>Confirmed</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Items Previews */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl shrink-0 border border-slate-100">
                    <img
                      src={item.product?.image || FALLBACK_IMAGE}
                      alt={item.product?.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="text-xs pr-2">
                      <p className="font-bold text-charcoal-900 truncate max-w-[120px]">
                        {item.product?.name}
                      </p>
                      <p className="text-[10px] text-charcoal-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-charcoal-400">Total Paid: </span>
                  <span className="font-black text-sm text-charcoal-900">
                    {formatCurrency(order.total)}
                  </span>
                  <span className="text-charcoal-400 ml-2">via {order.paymentMethod}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleReorder(order)}
                    className="py-2 px-3.5 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-charcoal-700 hover:text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                    title="Add all items to basket"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>

                  <button
                    onClick={() => navigate(`/track-order/${order.id}`)}
                    className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-charcoal-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => navigate(`/track-order/${order.id}`)}
                    className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Track Order</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
