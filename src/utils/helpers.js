// FRUZO Helper Functions & Formatters

export const formatCurrency = (amount) => {
  return `₹${Math.round(amount)}`;
};

export const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `FRZ-${dateStr}-${randomSuffix}`;
};

export const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
