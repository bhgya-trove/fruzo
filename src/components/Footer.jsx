import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal-900 text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-charcoal-800">
      {/* Brand assurance banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-charcoal-800/80 border border-charcoal-700/60 shadow-inner">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Superfast Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Optimized local micro-fulfillment hubs near you.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Triple Quality Check</h4>
              <p className="text-xs text-slate-400 mt-0.5">Harvested today, graded, and ozone-rinsed fresh.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Cold-Chain Preserved</h4>
              <p className="text-xs text-slate-400 mt-0.5">Temperature-controlled till your front door.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md">
                <span className="font-extrabold text-2xl tracking-tighter">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">FRUZO</span>
                <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-widest -mt-1">
                  Freshness. Delivered.
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              FRUZO connects conscious homes directly with pesticide-conscious organic orchards and polyhouse farmers. Crisp nutrition harvested at dawn, delivered in minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              Live in Bengaluru, Pune, Mumbai & Hyderabad
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Shop Fresh</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/products?category=fruits" className="hover:text-brand-400 transition-colors">
                  Fresh Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="hover:text-brand-400 transition-colors">
                  Daily Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=leafy-greens" className="hover:text-brand-400 transition-colors">
                  Leafy Greens
                </Link>
              </li>
              <li>
                <Link to="/products?category=exotic" className="hover:text-brand-400 transition-colors">
                  Exotic Picks
                </Link>
              </li>
              <li>
                <Link to="/products?category=combos" className="hover:text-brand-400 transition-colors">
                  Value Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/products" className="hover:text-brand-400 transition-colors">
                  About FRUZO
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-400 transition-colors">
                  Farmer Direct Model
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-400 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/orders" className="hover:text-brand-400 transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-brand-400 transition-colors">
                  No-Questions Refund
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-brand-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <span className="text-slate-400">help@fruzo.com</span>
              </li>
              <li>
                <span className="text-slate-400">+91 1800-419-7888</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FRUZO. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>for natural health & freshness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
