
import React, { useState, useEffect } from 'react';

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="text-[#d14d28] font-bold font-serif italic text-xl">Pesta sedang berlangsung!</div>;

  return (
    <div className="flex gap-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-2 border-[#d14d28]/20 rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black text-[#d14d28] shadow-sm transition-all hover:scale-110 hover:border-[#d14d28]">
            {value.toString().padStart(2, '0')}
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
