import React from 'react';
import { 
  Sparkles, 
  Carrot, 
  Apple, 
  Salad, 
  Leaf, 
  Sparkle, 
  Package 
} from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Carrot: Carrot,
  Apple: Apple,
  Salad: Salad,
  Leaf: Leaf,
  Sparkle: Sparkle,
  Package: Package,
};

export const CategoryCard = ({ category, isSelected, onClick }) => {
  const IconComponent = ICON_MAP[category.icon] || Sparkles;

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`group flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 w-full shrink-0 ${
        isSelected
          ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600/20'
          : 'bg-white border-slate-200/80 text-charcoal-800 hover:border-brand-300 hover:bg-brand-50/40 shadow-sm'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-brand-50 text-brand-700'
        }`}
      >
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="truncate">
        <h4 className="font-bold text-xs sm:text-sm truncate leading-snug">
          {category.name}
        </h4>
        <p
          className={`text-[11px] truncate ${
            isSelected ? 'text-white/80' : 'text-charcoal-400'
          }`}
        >
          {category.count} items
        </p>
      </div>
    </button>
  );
};
