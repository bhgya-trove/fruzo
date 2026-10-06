// Form validation helper utilities

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).trim().toLowerCase());
};

export const validateMobile = (mobile) => {
  const cleaned = String(mobile).replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
};

export const validatePincode = (pincode) => {
  const cleaned = String(pincode).replace(/\D/g, '');
  return cleaned.length === 6;
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
  if (score === 3 || score === 4) return { score: 3, label: 'Good', color: 'bg-emerald-500' };
  return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
};

export const validateUpiId = (upiId) => {
  return /^[\w.-]+@[\w.-]+$/.test(String(upiId).trim());
};

export const validateCardNumber = (cardNum) => {
  const clean = String(cardNum).replace(/\s+/g, '');
  return /^\d{16}$/.test(clean);
};

export const validateExpiry = (expiry) => {
  if (!/^(0[1-9]|1[0-2])\/?([2-9][0-9])$/.test(expiry)) return false;
  return true;
};

export const validateCvv = (cvv) => {
  return /^\d{3,4}$/.test(String(cvv).trim());
};
