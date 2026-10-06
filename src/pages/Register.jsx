import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Phone,
  Mail,
  User,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  validateEmail, 
  validateMobile, 
  getPasswordStrength 
} from '../utils/validation';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters)';
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim() || !validateMobile(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number starting with 6-9';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      const result = register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setIsLoading(false);

      if (result.success) {
        addToast('Account created successfully! Please login.', 'success');
        navigate('/login', { state: { email: formData.email } });
      } else {
        setErrors((prev) => ({ ...prev, form: result.error }));
        addToast(result.error, 'error');
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6 bg-gradient-to-b from-brand-50/40 via-white to-brand-50/20">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
              <span className="font-extrabold text-2xl tracking-tighter">F</span>
            </div>
            <span className="text-2xl font-black text-charcoal-900 tracking-tight">FRUZO</span>
          </Link>
          <h1 className="text-2xl font-bold text-charcoal-900 tracking-tight">Create your account</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Join FRUZO for fresh farm produce with superfast delivery
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-slate-100">
          {errors.form && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rohit Sharma"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="absolute inset-y-0 left-10 flex items-center text-xs font-bold text-charcoal-500">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    setFormData((prev) => ({ ...prev, phone: cleaned }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="9876543210"
                  className={`w-full pl-18 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-charcoal-500">Strength:</span>
                    <span className="font-bold text-charcoal-700">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          step <= passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 shadow-md shadow-brand-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-charcoal-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-700 hover:text-brand-800 underline underline-offset-2">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
