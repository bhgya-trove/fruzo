import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  Lock,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  const redirectPath = location.state?.from?.pathname || '/';

  const [identifier, setIdentifier] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoFill = () => {
    setIdentifier('aarav@fruzo.com');
    setPassword('Password@123');
    setError('');
    addToast('Demo credentials filled!', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please enter your email/mobile and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const res = login({ identifier, password });
      setIsLoading(false);

      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`, 'success');
        navigate(redirectPath, { replace: true });
      } else {
        setError(res.error);
        addToast(res.error, 'error');
      }
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 bg-gradient-to-b from-brand-50/40 via-white to-brand-50/20">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
              <span className="font-extrabold text-2xl tracking-tighter">F</span>
            </div>
            <span className="text-2xl font-black text-charcoal-900 tracking-tight">FRUZO</span>
          </Link>
          <h1 className="text-2xl font-bold text-charcoal-900 tracking-tight">Welcome back</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Log in to access your cart, addresses, and instant superfast delivery
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-slate-100">
          {/* Quick Demo Fill Helper Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-brand-50/70 border border-brand-200/80 flex items-center justify-between gap-3">
            <div className="text-xs text-charcoal-700">
              <span className="font-bold text-brand-800">Quick Test:</span>
              <p className="text-[11px] text-charcoal-500">Pre-seeded demo user available</p>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="py-1 px-2.5 rounded-lg bg-brand-600 text-white text-[11px] font-bold hover:bg-brand-700 transition-colors flex items-center gap-1 shadow-sm"
            >
              <UserCheck className="w-3 h-3" />
              Fill Demo
            </button>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Mobile */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError('');
                }}
                placeholder="aarav@fruzo.com or 9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-charcoal-400"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-charcoal-700">
                  Password
                </label>
                <span className="text-[11px] text-charcoal-400">Default: Password@123</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-charcoal-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* New to FRUZO Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-charcoal-500">
              New to FRUZO?{' '}
              <Link to="/register" className="font-bold text-brand-700 hover:text-brand-800 underline underline-offset-2">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
