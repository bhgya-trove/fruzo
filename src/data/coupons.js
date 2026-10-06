export const AVAILABLE_COUPONS = [
  { 
    code: 'FRESH10', 
    discountPercent: 10, 
    minOrder: 0, 
    description: '10% OFF on all fresh fruits & vegetables' 
  },
  { 
    code: 'SAVE50', 
    flatDiscount: 50, 
    minOrder: 299, 
    description: 'Flat ₹50 OFF on orders above ₹299' 
  },
  { 
    code: 'WELCOME20', 
    discountPercent: 20, 
    minOrder: 199, 
    maxDiscount: 100, 
    description: '20% OFF (up to ₹100) for your welcome order' 
  },
];
