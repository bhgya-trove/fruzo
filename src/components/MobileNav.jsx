import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const MobileNav = () => {
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Categories', to: '/products', icon: Grid },
    { label: 'Wishlist', to: '/wishlist', icon: Heart, badge: totalWishlistItems },
    { label: 'Cart', to: '/cart', icon: ShoppingBag, badge: totalItems },
    { label: 'Profile', to: isAuthenticated ? '/profile' : '/login', icon: User },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                  isActive ? 'text-brand-600 font-bold' : 'text-charcoal-400 font-medium hover:text-charcoal-700'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
