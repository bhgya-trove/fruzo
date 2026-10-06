import React from 'react';

export const SkeletonProductCard = () => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between shimmer-card animate-pulse">
      <div>
        <div className="aspect-square w-full rounded-2xl bg-slate-100 mb-3" />
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-100 rounded" />
          <div className="h-4 w-3/4 bg-slate-200 rounded" />
          <div className="h-3 w-1/3 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="h-5 w-14 bg-slate-200 rounded" />
        <div className="h-8 w-16 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
};
