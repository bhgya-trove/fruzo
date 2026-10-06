import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Package, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw, 
  ChevronRight,
  Zap,
  Navigation
} from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate, FALLBACK_IMAGE } from '../utils/helpers';

const STAGES = [
  {
    key: 'confirmed',
    title: 'Order Confirmed',
    description: 'Received at local Indiranagar micro-fulfillment pod',
    statusLabel: 'Order Verified',
    icon: CheckCircle2,
  },
  {
    key: 'packing',
    title: 'Fresh Produce Being Packed',
    description: 'Sorting crisp vegetables & chilled fruits in paper pouches',
    statusLabel: 'Packing Quality Checked',
    icon: Package,
  },
  {
    key: 'out_for_delivery',
    title: 'Out for Delivery',
    description: 'Rider Ramesh Kumar is en route with climate-controlled box',
    statusLabel: 'Superfast Delivery In Transit',
    icon: Truck,
  },
  {
    key: 'delivered',
    title: 'Delivered Fresh',
    description: 'Handed over at your doorstep. Enjoy the harvest!',
    statusLabel: 'Completed at Doorstep',
    icon: Sparkles,
  },
];

export const TrackOrder = () => {
  const { orderId } = useParams();
  const { getOrderById, orders, updateOrderStatus } = useOrders();
  const { addToast } = useToast();

  const currentOrder = getOrderById(orderId) || orders[0];

  // Stage simulation: 0 = confirmed, 1 = packing, 2 = out_for_delivery, 3 = delivered
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (!currentOrder) return 0;
    if (currentOrder.status === 'delivered') return 3;
    if (currentOrder.status === 'out_for_delivery') return 2;
    if (currentOrder.status === 'packing') return 1;
    return 0;
  });

  // Auto-progress simulation
  useEffect(() => {
    if (currentStepIndex >= 3) return;

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        const next = Math.min(3, prev + 1);
        if (next === 1) addToast('Fresh produce is now being packed in chilled pouches!', 'info');
        if (next === 2) addToast('Rider Ramesh Kumar is en route with your fresh order!', 'info');
        if (next === 3) addToast('Your FRUZO order has been delivered!', 'success');
        if (currentOrder) updateOrderStatus(currentOrder.id, STAGES[next].key);
        return next;
      });
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentStepIndex, addToast, currentOrder, updateOrderStatus]);

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-charcoal-900">Order not found</h2>
        <Link to="/orders" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs">
          View All Orders
        </Link>
      </div>
    );
  }

  const handleCallRider = () => {
    addToast('Calling rider Ramesh Kumar (+91 98451 22319)...', 'info');
  };

  const handleMessageRider = () => {
    addToast('Opening live chat with delivery partner...', 'info');
  };

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => Math.min(3, prev + 1));
  };

  const handleResetStep = () => {
    setCurrentStepIndex(0);
    addToast('Simulation timeline reset to Order Confirmed', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Orders</span>
        </Link>

        {/* Manual Demo Progression Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-charcoal-400 hidden sm:inline">Demo Controls:</span>
          <button
            onClick={handleResetStep}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-charcoal-600 hover:bg-slate-50 flex items-center gap-1 shadow-2xs"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= 3}
            className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-[11px] font-bold text-brand-700 hover:bg-brand-100 flex items-center gap-1 shadow-2xs disabled:opacity-50"
          >
            Advance Step
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-brand-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-brand-300" />
              Live Superfast Delivery Tracking • {currentOrder.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              {currentStepIndex === 3 ? 'Delivered to your doorstep! 🎉' : 'Your order is on the way! ⚡'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Delivering to {currentOrder.deliveryAddress?.street || 'Indiranagar, Bengaluru'}
            </p>

            {currentStepIndex < 3 && (
              <div className="pt-2">
                <CountdownTimer
                  initialSeconds={1122}
                  onStageAdvance={(next) => {
                    setCurrentStepIndex(next);
                    if (currentOrder) updateOrderStatus(currentOrder.id, STAGES[next].key);
                  }}
                />
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl text-center shrink-0">
            <span className="text-[11px] font-bold text-emerald-200 block uppercase tracking-wider">
              Current Stage
            </span>
            <span className="text-sm sm:text-base font-extrabold text-white">
              {STAGES[currentStepIndex].title}
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VISUAL DELIVERY ROUTE SIMULATION MAP */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-brand-600" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-charcoal-900">
              Live Route Simulation
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {currentStepIndex === 3 ? 'Arrived at destination' : 'GPS Tracking Active'}
          </span>
        </div>

        {/* Route Illustration Map Graphic */}
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-50 via-slate-50 to-emerald-50 p-6 sm:p-8 border border-emerald-100/80 overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            {/* Fulfillment Hub */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-600/30">
                🏭
              </div>
              <span className="text-xs font-bold text-charcoal-900 mt-2">FRUZO Hub</span>
              <span className="text-[10px] text-charcoal-500">Indiranagar Pod #4</span>
            </div>

            {/* In-Transit EV Scooter Animated Marker */}
            <div className="flex-1 mx-4 sm:mx-8 relative flex flex-col items-center">
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-700"
                  style={{
                    width: currentStepIndex === 0 ? '20%' : currentStepIndex === 1 ? '45%' : currentStepIndex === 2 ? '80%' : '100%'
                  }}
                />
              </div>

              {/* Rider Scooter Indicator */}
              <div
                className="mt-3 flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-md border border-slate-200 transition-all duration-700"
              >
                <span className="text-sm">🛵</span>
                <span className="text-[11px] font-extrabold text-charcoal-800">
                  {currentStepIndex >= 2 ? 'Ramesh Kumar (En Route)' : 'Packing produce'}
                </span>
              </div>
            </div>

            {/* Destination Doorstep */}
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all ${
                currentStepIndex === 3
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-4 ring-emerald-200'
                  : 'bg-white border-2 border-slate-200 text-charcoal-700'
              }`}>
                🏡
              </div>
              <span className="text-xs font-bold text-charcoal-900 mt-2">Your Doorstep</span>
              <span className="text-[10px] text-charcoal-500 max-w-[100px] truncate">
                {currentOrder.deliveryAddress?.house || 'Home'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DELIVERY TIMELINE PROGRESSION CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium space-y-6">
        <h2 className="text-base font-extrabold text-charcoal-900 uppercase tracking-wider">
          Delivery Status Progression
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-100 space-y-8 ml-3 sm:ml-4">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            const Icon = stage.icon;

            return (
              <div key={stage.key} className="relative group">
                {/* Node Indicator Dot */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-brand-600 text-white ring-4 ring-emerald-100'
                      : isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm sm:text-base font-extrabold ${
                        isCurrent
                          ? 'text-brand-800'
                          : isCompleted
                          ? 'text-charcoal-900'
                          : 'text-charcoal-400'
                      }`}
                    >
                      {stage.title}
                    </h3>
                    {isCurrent && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      isPending ? 'text-charcoal-300' : 'text-charcoal-600'
                    }`}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DELIVERY PARTNER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-800 font-extrabold text-xl flex items-center justify-center shrink-0 border-2 border-brand-200">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-charcoal-900 text-sm sm:text-base">
                Ramesh Kumar
              </h3>
              <span className="text-[11px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                Verified Rider
              </span>
            </div>
            <p className="text-xs text-charcoal-500 mt-0.5">
              FRUZO EV Pod • KA-03-HA-8821 • 4.9 ★ (1,400+ trips)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleCallRider}
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Rider</span>
          </button>

          <button
            onClick={handleMessageRider}
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-slate-200 text-charcoal-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message</span>
          </button>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-charcoal-900 uppercase tracking-wider pb-3 border-b border-slate-100">
          Items in this delivery ({currentOrder.items?.length || 0})
        </h3>

        <div className="divide-y divide-slate-100">
          {currentOrder.items?.map((item, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product?.image || FALLBACK_IMAGE}
                  alt={item.product?.name}
                  className="w-10 h-10 rounded-xl object-cover bg-slate-50 shrink-0"
                />
                <div>
                  <p className="font-bold text-charcoal-900">{item.product?.name}</p>
                  <p className="text-[11px] text-charcoal-400">
                    {item.quantity} × {item.product?.unit}
                  </p>
                </div>
              </div>

              <span className="font-black text-charcoal-900">
                {formatCurrency(item.product?.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-charcoal-500">Paid Total:</span>
          <span className="font-black text-base text-brand-700">
            {formatCurrency(currentOrder.total)}
          </span>
        </div>
      </div>
    </div>
  );
};
