import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { AVAILABLE_COUPONS } from '../data/coupons';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cart, setCart] = useState(() => {
    return getStorageItem(STORAGE_KEYS.CART, []);
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return getStorageItem(STORAGE_KEYS.COUPON, null);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.COUPON, appliedCoupon);
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, silent = false) => {
    if (!product || !product.id) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    if (!silent) {
      addToast(`🌱 ${product.name} added to your basket!`, 'cart');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId, showToast = true) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (showToast && item) {
      addToast(`Removed ${item.product.name} from basket`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculations
  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const originalSubtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
      0
    );
  }, [cart]);

  const totalSavingsOnMRP = useMemo(() => {
    return Math.max(0, originalSubtotal - subtotal);
  }, [originalSubtotal, subtotal]);

  // Delivery fee: ₹39 if subtotal < 499, Free if >= 499 (and 0 if cart is empty)
  const freeDeliveryThreshold = 499;
  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= freeDeliveryThreshold ? 0 : 39;
  }, [subtotal, freeDeliveryThreshold]);

  const amountNeededForFreeDelivery = useMemo(() => {
    return Math.max(0, freeDeliveryThreshold - subtotal);
  }, [subtotal, freeDeliveryThreshold]);

  // Coupon discount calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;

    if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) {
      return 0;
    }

    if (appliedCoupon.flatDiscount) {
      return Math.min(appliedCoupon.flatDiscount, subtotal);
    }

    if (appliedCoupon.discountPercent) {
      let calc = (subtotal * appliedCoupon.discountPercent) / 100;
      if (appliedCoupon.maxDiscount) {
        calc = Math.min(calc, appliedCoupon.maxDiscount);
      }
      return Math.round(calc);
    }

    return 0;
  }, [appliedCoupon, subtotal]);

  const finalTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal + deliveryFee - couponDiscount);
  }, [subtotal, deliveryFee, couponDiscount]);

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      addToast('Invalid coupon code. Try FRESH10, SAVE50, or WELCOME20', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      addToast(`Minimum cart value of ₹${coupon.minOrder} required for ${coupon.code}`, 'error');
      return {
        success: false,
        message: `Add ₹${coupon.minOrder - subtotal} more to unlock this coupon.`
      };
    }

    setAppliedCoupon(coupon);
    addToast(`Coupon "${coupon.code}" applied successfully!`, 'success');
    return { success: true, message: `Coupon ${coupon.code} applied.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotal,
        originalSubtotal,
        totalSavingsOnMRP,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        appliedCoupon,
        couponDiscount,
        finalTotal,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
