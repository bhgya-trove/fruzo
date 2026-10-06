import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  CreditCard, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Leaf
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, activeAddress, setActiveAddress } = useAuth();
  const { orders } = useOrders();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast('You have been logged out safely.', 'info');
    navigate('/login');
  };

  const savedAddresses = currentUser?.savedAddresses || [
    {
      id: 'addr-default-1',
      label: 'Home',
      house: 'Flat 402, Lotus Gardenia',
      street: '12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-brand-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white flex items-center justify-center font-black text-3xl shadow-inner shrink-0">
          {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-black">{currentUser?.name || 'Customer'}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-300 text-[11px] font-bold border border-brand-400/30">
              Gold Member
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-emerald-100/80 mt-2">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              {currentUser?.email || 'user@fruzo.com'}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              +91 {currentUser?.phone || '9876543210'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 flex items-center gap-1.5 transition-all shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Orders Delivered</p>
          <p className="text-2xl font-black text-charcoal-900 mt-1">{orders.length}</p>
          <Link to="/orders" className="text-xs text-brand-700 font-bold mt-1 inline-block hover:underline">
            View orders →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Average Speed</p>
          <p className="text-xl sm:text-2xl font-black text-brand-700 mt-1">Superfast</p>
          <p className="text-[11px] text-charcoal-500 mt-1">Dedicated electric fleet</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Eco Packaging</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">100%</p>
          <p className="text-[11px] text-charcoal-500 mt-1">Zero plastic crates used</p>
        </div>
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-brand-600" />
            <h3 className="font-extrabold text-base text-charcoal-900">Saved Delivery Addresses</h3>
          </div>
          <span className="text-xs text-charcoal-400 font-semibold">{savedAddresses.length} saved</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {savedAddresses.map((addr) => {
            const isActive = activeAddress?.house === addr.house && activeAddress?.pincode === addr.pincode;

            return (
              <div
                key={addr.id || addr.house}
                onClick={() => {
                  setActiveAddress(addr);
                  addToast(`Default delivery address set to ${addr.label}`, 'info');
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isActive
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-charcoal-900">{addr.label || 'Home'}</span>
                  {isActive && (
                    <span className="text-[10px] bg-brand-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {addr.house}, {addr.street}, {addr.city} - {addr.pincode}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prototype Guarantees Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          <h3 className="font-extrabold text-base text-charcoal-900">Quality & Prototype Note</h3>
        </div>
        <p className="text-xs text-charcoal-600 leading-relaxed">
          FRUZO is running fully locally in your browser. All your registered credentials, cart selections, coupons, and orders are stored securely in browser <code>localStorage</code>.
        </p>
      </div>
    </div>
  );
};
