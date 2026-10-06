import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

export const CountdownTimer = ({ initialSeconds = 1122, onStageAdvance }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        // Trigger stage progression checkpoints
        if (next === 900 && onStageAdvance) onStageAdvance(1); // Packing
        if (next === 500 && onStageAdvance) onStageAdvance(2); // Out for delivery
        if (next === 0 && onStageAdvance) onStageAdvance(3);   // Delivered
        return Math.max(0, next);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onStageAdvance]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  if (secondsLeft === 0) {
    return (
      <div className="inline-flex items-center gap-2 bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs shadow-sm">
        <span>🎉 Arrived at your doorstep!</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white font-mono font-black px-3.5 py-1.5 rounded-2xl shadow-sm text-xs sm:text-sm">
      <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0 duration-3000" />
      <span>Arriving in <strong className="text-amber-300">{mins}m {String(secs).padStart(2, '0')}s</strong></span>
    </div>
  );
};
