
import React, { useState, useEffect } from 'react';
import FloatingElements from './components/FloatingElements';
import RSVPForm from './components/RSVPForm';
import AISuggestions from './components/AISuggestions';
import Countdown from './components/Countdown';
import ThemeModal from './components/ThemeModal';
import RSVPCheckIn from './components/RSVPCheckIn';
import { PartyTheme, RSVPData } from './types';

const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<PartyTheme>(PartyTheme.PERANAKAN);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);

  useEffect(() => {
    setRsvps([
      { name: "Siti Aminah", attendance: "yes", guests: 2, dietaryNotes: "", message: "Selamat ya!" },
      { name: "Budi Santoso", attendance: "maybe", guests: 1, dietaryNotes: "", message: "" }
    ]);
  }, []);

  const handleRSVPSubmit = (data: RSVPData) => {
    setRsvps(prev => [...prev, data]);
  };

  const eventDetails = {
    title: "Imeh's 27th Birthday",
    date: "Senin, 15 September 2025",
    isoDate: "2025-09-15T18:00:00",
    time: "18:00 - 21:00 WIB",
    location: "Tiban V Cendrawasih, Komp. Pajak, No. 97/A, RT. 02, RW. 08, Patam Lestari"
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-orange-100 pb-20">
      <FloatingElements />

      {isThemeModalOpen && (
        <ThemeModal theme={selectedTheme} onClose={() => setIsThemeModalOpen(false)} />
      )}

      {/* Header / Nav */}
      <header className="p-8 max-w-7xl mx-auto flex justify-between items-center reveal">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-[#d14d28] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:rotate-12 transition-transform">
            I
          </div>
          <span className="font-bold text-xl tracking-tighter text-[#1a4d6e] uppercase">
            Imeh's <span className="text-[#d14d28]">27th</span>
          </span>
        </div>
        <div className="flex gap-6 items-center">
            <div className="h-0.5 w-12 bg-[#d14d28]/20 hidden md:block"></div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#1a4d6e]">CELEBRATE WITH US</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          
          {/* Hero Section */}
          <div className="flex-1 space-y-12 reveal delay-1">
            <div className="relative inline-block group">
              {/* Dekorasi Bingkai Oval dari Undangan */}
              <div className="absolute inset-[-20px] border-2 border-[#d14d28] rounded-full opacity-30 group-hover:scale-105 transition-transform"></div>
              <div className="absolute inset-[-10px] border border-[#1a4d6e] rounded-full opacity-20 group-hover:scale-110 transition-transform delay-75"></div>
              
              <div className="bg-white/80 backdrop-blur-sm px-16 py-24 rounded-full border-4 border-[#d14d28] text-center animate-float shadow-xl relative z-10">
                <p className="font-serif italic text-[#1a4d6e] text-2xl mb-2">Imeh is turning</p>
                <h1 className="text-[120px] md:text-[160px] font-black text-[#d14d28] leading-none tracking-tighter mb-2">27</h1>
                <p className="font-serif italic text-[#1a4d6e] text-2xl">this year!</p>
                
                {/* Ikon Kue Biru Kecil */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">🎂</div>
              </div>
            </div>

            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-[#1a4d6e] font-serif italic">Peranakan Tea Party</h2>
                <div className="h-1.5 w-24 bg-[#d14d28] mx-auto lg:mx-0 rounded-full"></div>
              </div>

              <div className="py-4">
                <Countdown targetDate={eventDetails.isoDate} />
              </div>

              <p className="text-lg text-[#1a4d6e]/80 max-w-lg leading-relaxed font-medium">
                "Mari berkain bersama! Kenakan kebaya, Batik, Tenun, atau kain tradisi favoritmu. Make it casual, make it you."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="p-6 bg-white rounded-[30px] border border-[#d14d28]/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🗓️</div>
                  <h4 className="text-[10px] font-black uppercase text-[#d14d28] tracking-widest mb-1">When</h4>
                  <p className="font-bold text-[#1a4d6e]">{eventDetails.date}</p>
                  <p className="text-sm text-gray-500">{eventDetails.time}</p>
                </div>
                <div className="p-6 bg-white rounded-[30px] border border-[#d14d28]/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">📍</div>
                  <h4 className="text-[10px] font-black uppercase text-[#d14d28] tracking-widest mb-1">Where</h4>
                  <p className="font-bold text-[#1a4d6e] text-sm leading-tight">{eventDetails.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Side */}
          <div className="w-full lg:w-[460px] space-y-8 reveal delay-2">
            <div className="p-8 bg-[#1a4d6e] text-white rounded-[40px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d14d28] opacity-10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-2 text-orange-200">The Theme</h3>
              <p className="text-3xl font-serif italic mb-4">Indo Royalty & Tradisi</p>
              <button 
                onClick={() => setIsThemeModalOpen(true)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Learn More →
              </button>
            </div>

            <RSVPForm onSubmit={handleRSVPSubmit} />
            
            <div className="pt-4">
               <RSVPCheckIn rsvps={rsvps} />
            </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <section className="mt-40 reveal delay-3">
          <div className="bg-white/60 p-12 rounded-[60px] border-2 border-[#d14d28]/10">
            <AISuggestions theme={selectedTheme} />
          </div>
        </section>
      </main>

      <footer className="mt-40 text-center opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black tracking-[0.5em] text-[#1a4d6e]">IMEH • TWENTY SEVEN • 2025</p>
      </footer>
    </div>
  );
};

export default App;
