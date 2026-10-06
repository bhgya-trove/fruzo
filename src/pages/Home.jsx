import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Tag, 
  ChevronRight, 
  CheckCircle, 
  Percent, 
  Zap, 
  Lock, 
  Heart,
  Clock,
  Flame
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { AVAILABLE_COUPONS } from '../data/coupons';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export const Home = () => {
  const navigate = useNavigate();
  const { applyCoupon } = useCart();
  const { recentlyViewed } = useRecentlyViewed();

  const customerFavorites = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const freshArrivals = PRODUCTS.filter((p) => p.isNew || p.freshness === 'Fresh Today').slice(0, 4);
  const freshPicksForYou = PRODUCTS.filter((p) => p.isPopular).slice(0, 4);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-emerald-900 via-brand-900 to-emerald-950 text-white overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-14">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-500/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-300 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Harvested at Dawn • Superfast Delivery</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                  Freshness, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-emerald-200 to-amber-200">
                    Delivered to Your Door.
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-xl">
                  Farm-fresh fruits and vegetables, carefully selected and delivered with care.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/products"
                    className="py-3.5 px-7 rounded-2xl bg-brand-500 hover:bg-brand-400 text-charcoal-900 font-extrabold text-sm sm:text-base shadow-lg shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    <span>Shop Fresh</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#categories"
                    className="py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>Explore Categories</span>
                  </a>
                </div>

                {/* Micro Perks Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 max-w-lg">
                  <div>
                    <p className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-1">
                      <Zap className="w-4 h-4 fill-amber-300" /> Superfast
                    </p>
                    <p className="text-[11px] text-emerald-200/80 font-medium">Express Drop</p>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black text-white">100%</p>
                    <p className="text-[11px] text-emerald-200/80 font-medium">Farm Direct Quality</p>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black text-brand-300">FREE</p>
                    <p className="text-[11px] text-emerald-200/80 font-medium">Orders Above ₹499</p>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual Composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 group">
                    <img
                      src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
                      alt="FRUZO Farm Fresh Produce Box"
                      className="w-full h-72 sm:h-84 lg:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
                    
                    {/* Bottom floating badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg text-charcoal-900 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                          🌱
                        </span>
                        <div>
                          <p className="text-xs font-extrabold">Morning Harvest Guarantee</p>
                          <p className="text-[10px] text-charcoal-500">Pesticide safe & freshly packed</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg">
                        Grade A
                      </span>
                    </div>
                  </div>

                  {/* Floating Pill Tag 1 */}
                  <div className="absolute -top-3 -left-3 sm:-left-6 bg-white text-charcoal-900 p-2.5 px-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-100 hidden sm:flex animate-bounce duration-1000">
                    <span className="text-lg">🍅</span>
                    <div>
                      <p className="text-[11px] font-bold">Vine Ripe Tomatoes</p>
                      <p className="text-[10px] text-brand-600 font-extrabold">₹38 / 500g</p>
                    </div>
                  </div>

                  {/* Floating Pill Tag 2 */}
                  <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-amber-500 text-white p-2.5 px-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-amber-400">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-black">20% Off: WELCOME20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK DELIVERY PROMISE (Trust Strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold shrink-0">
              <Zap className="w-5 h-5 fill-brand-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-charcoal-900">⚡ Fast Delivery</h4>
              <p className="text-[11px] text-charcoal-500">Hyper-local climate fleet</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold shrink-0">
              <Leaf className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-charcoal-900">🌱 Farm Fresh</h4>
              <p className="text-[11px] text-charcoal-500">Picked at dawn daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold shrink-0">
              <Lock className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-charcoal-900">🔒 Secure Checkout</h4>
              <p className="text-[11px] text-charcoal-500">Safe simulated pay</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-charcoal-900">💚 Quality Guaranteed</h4>
              <p className="text-[11px] text-charcoal-500">Instant no-hassle refund</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Explore Produce</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">Shop by Category</h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-100 hover:border-brand-300 hover:shadow-hover p-3 text-center transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-3 bg-slate-50 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-charcoal-900 group-hover:text-brand-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-charcoal-400 mt-0.5 line-clamp-1">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CUSTOMER FAVORITES (Best Sellers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">Best Sellers</h2>
          </div>
          <Link
            to="/products?filter=bestseller"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {customerFavorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. TODAY'S OFFERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200/90 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase">
                10% OFF Fresh Fruits
              </span>
              <h3 className="text-lg font-black text-charcoal-900 mt-2">Weekend Orchard Harvest</h3>
              <p className="text-xs text-charcoal-600 mt-1">Use code <strong>FRESH10</strong> for 10% instant discount.</p>
            </div>
            <button
              onClick={() => applyCoupon('FRESH10')}
              className="w-fit py-2 px-4 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors"
            >
              Apply FRESH10
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200/90 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                Buy More, Save More
              </span>
              <h3 className="text-lg font-black text-charcoal-900 mt-2">Flat ₹50 OFF</h3>
              <p className="text-xs text-charcoal-600 mt-1">Orders above ₹299 get an immediate ₹50 discount with <strong>SAVE50</strong>.</p>
            </div>
            <button
              onClick={() => applyCoupon('SAVE50')}
              className="w-fit py-2 px-4 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors"
            >
              Apply SAVE50
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-lime-50 border border-lime-200/90 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-lime-200 text-lime-900 text-[10px] font-black uppercase">
                Fresh Veggie Combos
              </span>
              <h3 className="text-lg font-black text-charcoal-900 mt-2">Kitchen Pantry Bundles</h3>
              <p className="text-xs text-charcoal-600 mt-1">Save up to 30% with daily essentials combos curated weekly.</p>
            </div>
            <Link
              to="/products?category=combos"
              className="w-fit py-2 px-4 rounded-xl bg-charcoal-900 text-white font-bold text-xs hover:bg-charcoal-800 transition-colors"
            >
              Explore Combos
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FRESH ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Fresh Today</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">Freshly Arrived</h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {freshArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. FRESH PICKS FOR YOU (Recommended) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Recommended</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">Fresh Picks For You</h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>Browse All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {freshPicksForYou.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. RECENTLY VIEWED (if available) */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">Your Browsing History</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">Recently Viewed</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 9. WHY FRUZO? SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-b from-brand-50/70 to-emerald-50/40 rounded-3xl p-8 sm:p-12 border border-brand-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">The FRUZO Promise</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
              Why our produce tastes noticeably fresher
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              We bypass traditional wholesale markets to eliminate multiple storage hand-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-charcoal-900">🌱 Farm Fresh</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                We partner with 240+ verified local farmers. Produce is picked at peak ripeness, not artificially forced.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-charcoal-900">⚡ Fast Delivery</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Hyper-local climate-regulated pods ensure your tender spinach and berries reach you without wilting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-charcoal-900">🔍 Quality Checked</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Every vegetable and fruit goes through rigorous grading. Damaged or inferior produce never leaves our hub.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-charcoal-900">💚 Freshness Guaranteed</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Not thrilled with the crispness of your apple or tomato? Instant 1-tap refund right from your order screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-100 via-brand-100 to-lime-100 p-8 sm:p-12 text-center space-y-4 border border-brand-200">
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
            Ready to bring freshness home?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
            Order clean, crisp produce harvested at dawn. Delivered in minutes with no hassle.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-lg shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Shop Fresh</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
