import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const ProtectedRoute = ({ children, requireCart = false }) => {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireCart && cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return children;
};
