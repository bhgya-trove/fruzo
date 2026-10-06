import React from 'react';
import { Sparkles, Leaf, AlertCircle } from 'lucide-react';

export const FreshnessBadge = ({ freshness, size = 'sm' }) => {
  if (!freshness) return null;

  const isSmall = size === 'sm';

  if (freshness === 'Limited Stock') {
    return (
      <span className={`inline-flex items-center gap-1 font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 shadow-2xs ${
        isSmall ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>Limited Stock</span>
      </span>
    );
  }

  if (freshness === 'Fresh Today') {
    return (
      <span className={`inline-flex items-center gap-1 font-bold rounded-full bg-emerald-900/85 text-emerald-100 backdrop-blur-md shadow-sm ${
        isSmall ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
        <span>Fresh Today</span>
      </span>
    );
  }

  // Farm Fresh or default
  return (
    <span className={`inline-flex items-center gap-1 font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs ${
      isSmall ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
    }`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
      <span>Farm Fresh</span>
    </span>
  );
};
