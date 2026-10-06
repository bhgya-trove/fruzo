import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();

  const [wishlist, setWishlist] = useState(() => {
    return getStorageItem(STORAGE_KEYS.WISHLIST, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.WISHLIST, wishlist);
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`❤️ ${product.name} added to your wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    addToast('Item removed from wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
