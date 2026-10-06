import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, ShoppingBag, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3200) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
      >
        {toasts.map((toast) => {
          let bg = 'bg-charcoal-900 text-white border-charcoal-700';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (toast.type === 'success') {
            bg = 'bg-emerald-900/95 text-emerald-50 border-emerald-700 shadow-emerald-950/20';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (toast.type === 'error') {
            bg = 'bg-red-900/95 text-red-50 border-red-700 shadow-red-950/20';
            icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
          } else if (toast.type === 'cart') {
            bg = 'bg-charcoal-900/95 text-white border-brand-500/50 shadow-emerald-950/25';
            icon = <ShoppingBag className="w-5 h-5 text-brand-400 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${bg}`}
              role="alert"
            >
              <div className="flex items-center gap-3">
                {icon}
                <p className="text-sm font-medium tracking-tight leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-md"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
