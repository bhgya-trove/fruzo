import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle, 
  CreditCard, 
  Smartphone, 
  Banknote,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { 
  validateUpiId, 
  validateCardNumber, 
  validateExpiry, 
  validateCvv 
} from '../utils/validation';
import { formatCurrency } from '../utils/helpers';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, couponDiscount, finalTotal, clearCart, appliedCoupon } = useCart();
  const { placeOrder } = useOrders();
  const { addToast } = useToast();

  const checkoutState = location.state || {};
  const address = checkoutState.address || {
    fullName: 'Aarav Sharma',
    phone: '9876543210',
    house: 'Flat 402, Lotus Gardenia',
    street: '12th Main Road, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
  };

  const initialMethod = checkoutState.paymentMethod || 'upi';

  const [paymentMethod, setPaymentMethod] = useState(initialMethod);
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8921 4458 1928');
  const [cardHolder, setCardHolder] = useState(address.fullName || 'Aarav Sharma');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('834');

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-charcoal-900">Your basket is empty</h2>
        <Link to="/products" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs">
          Browse Fresh Produce
        </Link>
      </div>
    );
  }

  const validatePaymentDetails = () => {
    const errs = {};

    if (paymentMethod === 'upi') {
      if (!validateUpiId(upiId)) {
        errs.upi = 'Please enter a valid UPI ID (e.g. name@okhdfcbank)';
      }
    } else if (paymentMethod === 'card') {
      if (!validateCardNumber(cardNumber)) {
        errs.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!cardHolder.trim()) {
        errs.cardHolder = 'Please enter name on card';
      }
      if (!validateExpiry(expiry)) {
        errs.expiry = 'Valid MM/YY required';
      }
      if (!validateCvv(cvv)) {
        errs.cvv = 'Valid 3-digit CVV required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (!validatePaymentDetails()) return;

    setIsProcessing(true);
    setProcessingStep(1);

    // Simulated multi-stage payment confirmation
    setTimeout(() => {
      setProcessingStep(2);
    }, 700);

    setTimeout(() => {
      setProcessingStep(3);
    }, 1400);

    setTimeout(() => {
      let paymentDetailText = '';
      if (paymentMethod === 'upi') {
        paymentDetailText = `UPI ID: ${upiId}`;
      } else if (paymentMethod === 'card') {
        const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
        paymentDetailText = `Card ending in •••• ${last4}`;
      } else {
        paymentDetailText = 'Cash / QR on Delivery';
      }

      // Record order in OrderContext
      const createdOrder = placeOrder({
        items: cart,
        subtotal,
        deliveryFee,
        discount: couponDiscount,
        total: finalTotal,
        address,
        deliveryPreference: checkoutState.deliveryPreference || 'express',
        paymentMethod: paymentMethod.toUpperCase(),
        paymentDetails: paymentDetailText,
      });

      // Clear the shopping basket
      clearCart();
      addToast('Payment successful! Your fresh produce is being prepared.', 'success');

      // Navigate to order success screen
      navigate('/order-success', {
        state: { order: createdOrder },
        replace: true,
      });
    }, 2100);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to address details</span>
        </Link>
      </div>

      {/* Main Payment Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium relative overflow-hidden">
        {/* Prototype Banner */}
        <div className="p-3 mb-6 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-2.5 text-amber-900 text-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <strong>Interactive Prototype Simulation:</strong> No real bank account or card will be charged.
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-charcoal-900 tracking-tight">
              Complete Payment
            </h1>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Encrypted 256-bit safe checkout
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-charcoal-500 block">Total Due</span>
            <span className="text-2xl font-black text-brand-700">
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>

        {/* Payment Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setPaymentMethod('upi'); setErrors({}); }}
            className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              paymentMethod === 'upi' ? 'bg-white text-brand-700 shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI</span>
          </button>

          <button
            type="button"
            onClick={() => { setPaymentMethod('card'); setErrors({}); }}
            className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              paymentMethod === 'card' ? 'bg-white text-brand-700 shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </button>

          <button
            type="button"
            onClick={() => { setPaymentMethod('cod'); setErrors({}); }}
            className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              paymentMethod === 'cod' ? 'bg-white text-brand-700 shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>COD</span>
          </button>
        </div>

        {/* Tab Forms */}
        <form onSubmit={handlePayNow} className="space-y-5">
          {paymentMethod === 'upi' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Virtual Payment Address (UPI ID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      if (errors.upi) setErrors((prev) => ({ ...prev, upi: '' }));
                    }}
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 ${
                      errors.upi ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                    }`}
                  />
                </div>
                {errors.upi && <p className="text-[11px] text-red-600 mt-1">{errors.upi}</p>}
              </div>

              {/* Quick Handle Shortcuts */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-charcoal-400">Quick suffixes:</span>
                <div className="flex flex-wrap gap-2">
                  {['@okhdfcbank', '@okaxis', '@paytm', '@ybl'].map((suf) => (
                    <button
                      key={suf}
                      type="button"
                      onClick={() => setUpiId(`aarav${suf}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 text-[11px] font-mono text-charcoal-700"
                    >
                      aarav{suf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Card Number (16 Digits)
                </label>
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 16);
                    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
                    setCardNumber(formatted);
                    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: '' }));
                  }}
                  placeholder="4532 8921 4458 1928"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 ${
                    errors.cardNumber ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-500/40'
                  }`}
                />
                {errors.cardNumber && <p className="text-[11px] text-red-600 mt-1">{errors.cardNumber}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => {
                    setCardHolder(e.target.value);
                    if (errors.cardHolder) setErrors((prev) => ({ ...prev, cardHolder: '' }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
                {errors.cardHolder && <p className="text-[11px] text-red-600 mt-1">{errors.cardHolder}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(e.target.value);
                      if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: '' }));
                    }}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                  {errors.expiry && <p className="text-[11px] text-red-600 mt-1">{errors.expiry}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, ''));
                      if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: '' }));
                    }}
                    placeholder="•••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                  {errors.cvv && <p className="text-[11px] text-red-600 mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-charcoal-900 font-bold text-sm">
                <Banknote className="w-5 h-5 text-brand-600" />
                <span>Pay when your order arrives</span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Hand cash to our rider or scan the dynamic UPI QR code on the rider's phone upon doorstep arrival. Exact change preferred.
              </p>
            </div>
          )}

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-4 py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
          >
            <Lock className="w-4 h-4" />
            <span>Pay {formatCurrency(finalTotal)}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-charcoal-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>FRUZO Safe-Pay • Bank grade encryption active</span>
        </div>
      </div>

      {/* Processing Overlay Simulation Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-700">
                ⚡
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-charcoal-900 transition-all">
                {processingStep === 1 && 'Processing your payment...'}
                {processingStep === 2 && 'Securing your order...'}
                {processingStep === 3 && 'Confirming fresh produce...'}
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Please do not close or refresh this tab
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 text-xs font-mono text-charcoal-700 border border-slate-100">
              Transaction: ₹{finalTotal} via {paymentMethod.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
