// FRUZO Centralized LocalStorage Utility

export const STORAGE_KEYS = {
  USER: 'fruzo_user',
  SESSION: 'fruzo_session',
  CART: 'fruzo_cart',
  WISHLIST: 'fruzo_wishlist',
  ORDERS: 'fruzo_orders',
  RECENTLY_VIEWED: 'fruzo_recently_viewed',
  COUPON: 'fruzo_coupon',
  ACTIVE_ADDRESS: 'fruzo_active_address',
};

export const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
};
