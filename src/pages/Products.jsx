import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  ArrowUpDown, 
  RotateCcw,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { SkeletonProductCard } from '../components/SkeletonProductCard';
import { useWishlist } from '../context/WishlistContext';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isInWishlist, totalWishlistItems } = useWishlist();

  // URL state sync
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const queryFilter = searchParams.get('filter') || '';

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState(500); // max price filter
  const [onlyBestSellers, setOnlyBestSellers] = useState(queryFilter === 'bestseller');
  const [onlyWishlist, setOnlyWishlist] = useState(queryFilter === 'wishlist');
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  // Sync state if URL query changes
  useEffect(() => {
    setSearchTerm(querySearch);
  }, [querySearch]);

  useEffect(() => {
    setSelectedCategory(queryCategory);
  }, [queryCategory]);

  useEffect(() => {
    if (queryFilter === 'bestseller') {
      setOnlyBestSellers(true);
    }
    if (queryFilter === 'wishlist') {
      setOnlyWishlist(true);
    }
  }, [queryFilter]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);

    // Brief smooth loader effect
    setIsSimulatingLoad(true);
    setTimeout(() => setIsSimulatingLoad(false), 200);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('relevance');
    setPriceRange(500);
    setOnlyBestSellers(false);
    setOnlyInStock(false);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchOrigin = item.origin?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchOrigin) return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (item.price > priceRange) {
        return false;
      }

      // Best sellers filter
      if (onlyBestSellers && !item.isBestSeller) {
        return false;
      }

      // Wishlist filter
      if (onlyWishlist && !isInWishlist(item.id)) {
        return false;
      }

      // In stock
      if (onlyInStock && item.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // relevance / default
    });
  }, [searchTerm, selectedCategory, priceRange, onlyBestSellers, onlyWishlist, onlyInStock, sortBy, isInWishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Header & Breadcrumbs */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
              Fresh Produce Market
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Showing {filteredProducts.length} farm-direct items
              {searchTerm && <span> for "{searchTerm}"</span>}
            </p>
          </div>

          {/* Controls: Search input & Sort dropdown */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Quick search inside page */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search in produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer shadow-xs"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Popularity</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-charcoal-800 hover:bg-slate-50 shadow-xs"
            >
              <Filter className="w-3.5 h-3.5 text-brand-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scrollable on mobile/tablet) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-3 border-y border-slate-100">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30 ring-1 ring-brand-600'
                    : 'bg-white text-charcoal-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-charcoal-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-sm text-charcoal-900">Filters</h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-charcoal-700">Max Price</label>
              <span className="text-xs font-extrabold text-brand-700">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
              <span>₹20</span>
              <span>₹500</span>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <label className="flex items-center justify-between text-xs font-medium text-charcoal-700 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Best Sellers Only
              </span>
              <input
                type="checkbox"
                checked={onlyBestSellers}
                onChange={(e) => setOnlyBestSellers(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 accent-brand-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-medium text-charcoal-700 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="text-red-500">❤️</span>
                Saved Favorites ({totalWishlistItems})
              </span>
              <input
                type="checkbox"
                checked={onlyWishlist}
                onChange={(e) => setOnlyWishlist(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 accent-brand-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-medium text-charcoal-700 cursor-pointer select-none">
              <span>In-Stock Only</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 accent-brand-600 cursor-pointer"
              />
            </label>
          </div>

          {/* Freshness Assurance Box */}
          <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 text-charcoal-700 text-xs space-y-1.5">
            <p className="font-bold text-brand-800 flex items-center gap-1.5">
              <span>🌿</span> Morning Harvest Guarantee
            </p>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Every item harvested within the last 12 hours. Zero artificial preservatives.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {isSimulatingLoad ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Beautiful Empty State */
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-100 shadow-sm max-w-md mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-4">
                🥗
              </div>
              <h3 className="text-xl font-bold text-charcoal-900">We couldn't find that.</h3>
              <p className="text-xs sm:text-sm text-charcoal-500 mt-1.5 max-w-xs mx-auto">
                Try searching for another fresh fruit, vegetable, or explore our curated categories.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-all shadow-md shadow-brand-600/30"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal-900/60 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-charcoal-900">Filters & Options</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-charcoal-500 hover:text-charcoal-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-2">
                Max Price: <span className="text-brand-700 font-extrabold">₹{priceRange}</span>
              </label>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-center justify-between text-xs font-medium text-charcoal-700">
                <span>Best Sellers Only</span>
                <input
                  type="checkbox"
                  checked={onlyBestSellers}
                  onChange={(e) => setOnlyBestSellers(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 accent-brand-600"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-medium text-charcoal-700">
                <span>In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 accent-brand-600"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-charcoal-700 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-600/30"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
