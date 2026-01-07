
import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Soft color blobs inspired by the palette */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#f2a2b1] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#1a4d6e] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-[#d14d28] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Decorative icons inspired by the invite (Dragonfly & Flowers) */}
      <div className="absolute top-[15%] left-[10%] text-4xl opacity-20 animate-float">🦋</div>
      <div className="absolute top-[60%] right-[15%] text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🌸</div>
      <div className="absolute bottom-[20%] left-[25%] text-3xl opacity-15 animate-float" style={{ animationDelay: '4s' }}>✨</div>
      <div className="absolute top-[5%] right-[20%] text-5xl opacity-10 animate-pulse">🪷</div>
    </div>
  );
};

export default FloatingElements;
