import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ShoppingBag,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { validateMobile, validatePincode } from '../utils/validation';
import { formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';

export const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser, activeAddress, setActiveAddress } = useAuth();
  const { cart, subtotal, deliveryFee, couponDiscount, finalTotal, appliedCoupon } = useCart();
  const { addToast } = useToast();

  const [addressForm, setAddressForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '9876543210',
    house: activeAddress?.house || 'Flat 402, Lotus Gardenia',
    street: activeAddress?.street || '12th Main Road, Indiranagar',
    city: activeAddress?.city || 'Bengaluru',
    state: activeAddress?.state || 'Karnataka',
    pincode: activeAddress?.pincode || '560038',
  });

  const [deliveryPreference, setDeliveryPreference] = useState('express'); // 'express' | 'standard'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [deliveryInstruction, setDeliveryInstruction] = useState('Leave at doorstep & ring bell');
  const [errors, setErrors] = useState({});
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!addressForm.fullName.trim() || addressForm.fullName.length < 2) {
      errs.fullName = 'Please enter recipient name';
    }
    if (!validateMobile(addressForm.phone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!addressForm.house.trim()) {
      errs.house = 'Please enter house/flat/apartment number';
    }
    if (!addressForm.street.trim()) {
      errs.street = 'Please enter street, area or locality';
    }
    if (!addressForm.city.trim()) {
      errs.city = 'Please enter city';
    }
    if (!validatePincode(addressForm.pincode)) {
      errs.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all delivery address fields', 'error');
      return;
    }

    // Update active address
    setActiveAddress({
      label: 'Home',
      house: addressForm.house,
      street: addressForm.street,
      city: addressForm.city,
      state: addressForm.state,
      pincode: addressForm.pincode,
    });

    // Navigate to payment page with validated data
    navigate('/payment', {
      state: {
        address: addressForm,
        paymentMethod: paymentMethod,
        deliveryPreference: deliveryPreference,
        deliveryInstruction: deliveryInstruction,
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
          Checkout & Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Review destination and select your preferred payment mode
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sections: Address, Contact, Payment Method */}
        <form onSubmit={handleProceedToPayment} className="lg:col-span-7 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-charcoal-900">1. Delivery Address</h2>
                <p className="text-xs text-charcoal-500">Superfast Express Delivery</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={addressForm.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Contact Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={addressForm.phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    setAddressForm((prev) => ({ ...prev, phone: cleaned }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="9876543210"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  House / Flat / Floor / Building <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="house"
                  value={addressForm.house}
                  onChange={handleInputChange}
                  placeholder="e.g. Flat 402, Lotus Gardenia"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.house ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.house && <p className="text-[11px] text-red-600 mt-1">{errors.house}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Street / Area / Landmark <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={addressForm.street}
                  onChange={handleInputChange}
                  placeholder="e.g. 12th Main Road, Indiranagar"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.street ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.street && <p className="text-[11px] text-red-600 mt-1">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressForm.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={addressForm.pincode}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setAddressForm((prev) => ({ ...prev, pincode: clean }));
                    if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.pincode ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Preference */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-charcoal-900">2. Delivery Preference</h2>
                <p className="text-xs text-charcoal-500">Select your preferred delivery speed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryPreference('express')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryPreference === 'express'
                    ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryPreference"
                  checked={deliveryPreference === 'express'}
                  onChange={() => setDeliveryPreference('express')}
                  className="mt-1 w-4 h-4 text-brand-600 accent-brand-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-charcoal-900">Express Delivery</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">⚡ 15–25 mins</span>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-1">Dispatched immediately from nearest cold hub</p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryPreference('standard')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryPreference === 'standard'
                    ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryPreference"
                  checked={deliveryPreference === 'standard'}
                  onChange={() => setDeliveryPreference('standard')}
                  className="mt-1 w-4 h-4 text-brand-600 accent-brand-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-charcoal-900">Standard Delivery</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-charcoal-700">🌱 30–45 mins</span>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-1">Eco-friendly consolidated dispatch batch</p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Delivery Instructions */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-charcoal-900">3. Delivery Instructions</h2>
                <p className="text-xs text-charcoal-500">Guide our rider for quick drop</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Leave at doorstep & ring bell',
                'Hand over to security guard',
                'Call before arriving',
                'Avoid ringing bell (baby sleeping)'
              ].map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => setDeliveryInstruction(inst)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    deliveryInstruction === inst
                      ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                      : 'bg-slate-50 text-charcoal-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {inst}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Select Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-charcoal-900">4. Select Payment Method</h2>
                <p className="text-xs text-charcoal-500">Simulation options ready for instant checkout</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* UPI option */}
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="font-bold text-sm text-charcoal-900">Instant UPI (Recommended)</p>
                    <p className="text-xs text-charcoal-500">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="w-4 h-4 text-brand-600 accent-brand-600"
                />
              </label>

              {/* Card option */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <p className="font-bold text-sm text-charcoal-900">Credit / Debit Card</p>
                    <p className="text-xs text-charcoal-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 text-brand-600 accent-brand-600"
                />
              </label>

              {/* COD option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💵</span>
                  <div>
                    <p className="font-bold text-sm text-charcoal-900">Cash on Delivery (COD)</p>
                    <p className="text-xs text-charcoal-500">Pay cash or scan QR on arrival</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-brand-600 accent-brand-600"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>Continue to Payment ({formatCurrency(finalTotal)})</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-600" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-charcoal-900">
                  Order Summary ({cart.length} items)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                className="lg:hidden text-xs font-bold text-brand-700 flex items-center gap-1"
              >
                {isSummaryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Collapsible / Responsive Item Preview */}
            <div className={`space-y-3 max-h-64 overflow-y-auto pr-1 ${!isSummaryExpanded ? 'hidden lg:block' : 'block'}`}>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-50"
                    />
                    <div className="truncate">
                      <p className="font-bold text-charcoal-900 truncate">{product.name}</p>
                      <p className="text-[11px] text-charcoal-400 font-medium">
                        {quantity} × {formatCurrency(product.price)} ({product.unit})
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-charcoal-900 shrink-0">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Delivery Charge</span>
                <span className="font-semibold text-charcoal-900">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(deliveryFee)}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline font-black">
                <span className="text-sm text-charcoal-900">Amount Due</span>
                <span className="text-xl text-brand-700">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* Reassurance */}
            <div className="p-3 rounded-2xl bg-brand-50/70 border border-brand-100 text-xs text-charcoal-700 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0" />
              <p className="text-[11px]">
                100% Quality Inspected before dispatch. Free contactless replacements if anything isn't fresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
