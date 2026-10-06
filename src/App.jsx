import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { OrderSuccess } from './pages/OrderSuccess';
import { TrackOrder } from './pages/TrackOrder';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';

// Helper to scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <CartProvider>
                <OrderProvider>
                  <ScrollToTop />
                  <div className="min-h-screen flex flex-col bg-[#FBFDFB] text-charcoal-800">
                    <Navbar />
                    
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                        
                        {/* Protected Routes */}
                        <Route
                          path="/checkout"
                          element={
                            <ProtectedRoute requireCart={true}>
                              <Checkout />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/payment"
                          element={
                            <ProtectedRoute requireCart={true}>
                              <Payment />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/track-order/:orderId" element={<TrackOrder />} />
                        
                        <Route
                          path="/orders"
                          element={
                            <ProtectedRoute>
                              <Orders />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          }
                        />

                        {/* Catch-all Fallback */}
                        <Route path="*" element={<Home />} />
                      </Routes>
                    </main>

                    <Footer />
                    <MobileNav />
                  </div>
                </OrderProvider>
              </CartProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </AuthProvider>
    </ToastProvider>
  </BrowserRouter>
  );
}
