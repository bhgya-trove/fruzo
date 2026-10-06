import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

const RecentlyViewedContext = createContext(null);

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return getStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, recentlyViewed);
  }, [recentlyViewed]);

  const addRecentlyViewed = (product) => {
    if (!product || !product.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 8); // keep last 8 viewed
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
