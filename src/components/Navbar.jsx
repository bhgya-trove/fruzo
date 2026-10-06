import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  ChevronDown, 
  LogOut, 
  Package, 
  Sparkles, 
  X,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { LocationModal } from './LocationModal';
import { formatCurrency } from '../utils/helpers';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout, activeAddress } = useAuth();
  const { totalItems, subtotal } = useCart();
  const { totalWishlistItems } = useWishlist();

  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (location.pathname === '/products') {
      navigate('/products');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-emerald-900/10 shadow-sm transition-all">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-emerald-800 via-brand-700 to-emerald-900 text-white text-[11px] sm:text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>⚡ <strong>FRUZO Superfast Delivery</strong> • Free shipping on orders over ₹499 • Farm Harvested Today</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-2xl tracking-tighter">🌱</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-charcoal-900 flex items-center gap-1">
                  FRUZO
                  <span className="w-2 h-2 rounded-full bg-brand-500 inline-block animate-ping"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand-700 -mt-1 tracking-wider uppercase">
                  Freshness. Delivered.
                </span>
              </div>
            </Link>

            {/* NAVIGATION LINKS (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-charcoal-700">
              <Link to="/" className="hover:text-brand-700 transition-colors">
                Home
              </Link>
              <Link to="/products" className="hover:text-brand-700 transition-colors">
                Shop
              </Link>
              <a href="/#categories" className="hover:text-brand-700 transition-colors">
                Categories
              </a>
            </nav>

            {/* LOCATION PICKER (Desktop) */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-50 hover:bg-brand-50/70 border border-slate-200/80 hover:border-brand-300 transition-all text-left max-w-[190px]"
              title="Change Delivery Location"
            >
              <div className="w-7 h-7 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-charcoal-500 uppercase tracking-wider">
                  Deliver to <span className="text-brand-700 font-extrabold">{activeAddress?.label || 'Home'}</span>
                  <ChevronDown className="w-3 h-3 text-charcoal-400" />
                </div>
                <p className="text-xs font-semibold text-charcoal-800 truncate">
                  {activeAddress?.street || 'Indiranagar, 560038'}
                </p>
              </div>
            </button>

            {/* SEARCH BAR */}
            <div className="hidden sm:flex flex-1 max-w-xs md:max-w-sm lg:max-w-md mx-2">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search apples, tomatoes, exotic greens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-charcoal-400"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-400 hover:text-charcoal-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>

            {/* RIGHT ACTIONS: Wishlist, Cart, Profile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/50 text-charcoal-700 hover:text-red-500 transition-all flex items-center justify-center"
                title="View Saved Favorites"
              >
                <Heart className={`w-4 h-4 ${totalWishlistItems > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* CART BUTTON */}
              <Link
                to="/cart"
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl font-bold text-xs transition-all shadow-md ${
                  totalItems > 0
                    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-600/30'
                    : 'bg-charcoal-900 text-white hover:bg-charcoal-800'
                }`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-charcoal-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] font-semibold opacity-90">Cart</span>
                  <span className="text-xs font-extrabold">{totalItems > 0 ? formatCurrency(subtotal) : '0 items'}</span>
                </div>
              </Link>

              {/* USER PROFILE / AUTH */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 hover:border-brand-300 bg-white hover:bg-slate-50 transition-all"
                  >
                    <div className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold text-charcoal-800 max-w-[85px] truncate">
                      {currentUser?.name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-scale-in"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-charcoal-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-charcoal-500 truncate">{currentUser.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-charcoal-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        <User className="w-4 h-4 text-charcoal-400" />
                        My Profile & Addresses
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-charcoal-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        <Package className="w-4 h-4 text-charcoal-400" />
                        Order History
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-charcoal-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-charcoal-400" />
                        My Wishlist ({totalWishlistItems})
                      </Link>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-charcoal-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm shadow-brand-600/30 transition-all hidden sm:inline-flex"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE SEARCH & LOCATION BAR */}
          <div className="sm:hidden pb-3 pt-1 flex flex-col gap-2">
            <button
              onClick={() => setIsLocationOpen(true)}
              className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100/80 text-left text-xs"
            >
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="font-semibold text-charcoal-800 truncate">
                  Deliver to <strong>{activeAddress?.label || 'Home'}</strong>: {activeAddress?.street || 'Indiranagar'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
            </button>

            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search fruits, vegetables, greens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Address Switcher Modal */}
      <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </>
  );
};
